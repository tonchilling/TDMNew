//======================= ดึงข้อมูลจาก ระบบ 4 =======================
function TransactionPlan(provincecode) {
    
}


//======================= M A P =======================

//iframeElement = document.getElementById('gisIframe__');
iframeElement = document.getElementById('tdmap');
iframeElement.src = window.document.location.origin + '/TD2';

gisIframeWindow = null;
iframeElement.onload = function () {
    gisIframeWindow = iframeElement.contentWindow;
}
gIdGlobal = null;
var fadeInIsShow = false;
$('#fade-in').css('z-index', -1);

symbolZoom = {
    "type": "esriSFS",
    "style": "esriSFSDiagonalCross",
    "color": [255, 255, 255, 1], //สี map
    "outline": {
        "type": "esriSLS",
        "style": "esriSLSSolid",
        "color": [0, 0, 0, 5], //สีเส้น
        "width": 1
    } 
}


symbolLate = {
            "type": "esriSFS",
            "style": "esriSFSSolid",
            "color": [0, 0, 0, 255],
            "outline": {
                "type": "esriSLS",
                "style": "esriSLSSolid",
                "color": [255, 0, 0, 255],
                "width": 2
            }
        }

var sridIn = 32647;
var sridOut = [102100];

$(function () {
    ddlOnchange();

    setInterval(function () {
        if ($('#txtPoint_47_').val() == '') {
            activateDraw_Point_Begin();
        }

        if ($('#txtTransactionPlanHdId_').val() == '') {
            hu = window.location.search.substring(1);
            gy = hu.split("&");
            for (i = 0; i < gy.length; i++) {
                ft = gy[i].split("=");
                if (ft[0] == "Id") {
                    $('#txtTransactionPlanHdId_').val(ft[1]);
                    GetSHAPETransactionPlanHdByCode(ft[1]);

                    http.get("/api/TraceProgress/GetTransactionPlanHdByCode_TOP1", { Code: ft[1] }, function (responseHd) {
                        var dataHd = JSON.parse(responseHd);
                        $.each(dataHd, function (index, rowHd) {
                            $('#txtTransactionPlanName').text(rowHd.Name);
                        });
                    });

                }
            }
        }
    }, 1000);

});

function GetSHAPETransactionPlanHdByCode(TransactionPlanCode_) {
    //TransactionPlanCode
    http.get("/api/TraceProgress/GetSHAPETransactionPlanHdByCode", { Code: TransactionPlanCode_ }, function (data) {
        if (data != null) {
            var data = JSON.parse(data);
            $.each(data, function (index, value) {
                drawCity_Late(value.Shape);
            });
        }
    });
}

function ddlOnchange() {
    $('input[type=radio][name=Type1]').change(function () {
        //$('#fade-in').toggleClass('show');
        //$('#fade-in').css('z-index', 3000);
    });
}

function CloseFadeIn() {
    $('#fade-in').toggleClass('show');
    $('#fade-in').css('z-index', -1);
    fadeInIsShow = false;
}

function activateDraw_Point_Begin() {
    var toolType = 'point',
    clearGraphicWhenComplete = false;

    gisIframeWindow.GIS.activateDraw(toolType, clearGraphicWhenComplete, function (drawEvent) {
        var shape = drawEvent.shape,
        sridIn = drawEvent.srid,
        sridOut = [24047, 24048];

        var result = gisIframeWindow.GIS.transform(shape, sridIn, sridOut);

        if ($("[id*='txtPoint_47_']").val() != undefined && $("[id*='txtPoint_48_']").val() != undefined) {
            $("[id*='txtPoint_47_']").val(result[0].shape);
            $("[id*='txtPoint_48_']").val(result[1].shape);
        }

        GetMapOnClick();
        return result;
    });
}

function GetMapOnClick() {
    var Point_47_ = $('#txtPoint_47_').val();
    var Point_48_ = $('#txtPoint_48_').val();

    http.get("/api/TraceProgress/GetSHPByPoint", { Point_47: Point_47_, Point_48: Point_48_ }, function (data) {
        if (data != null) {
            var data = JSON.parse(data);

            if (data.length > 0) {
                if (data[0].PRV_CODE != '') {
                    setZoomType(data[0]);
                    TransactionPlan(data[0].PRV_CODE);
                    ChangeContentTransactionOnClickMap();
                    FadeShowHide();
                }
                else {
                    iziToast.info({
                        title: 'ไม่มีข้อมูล',
                        message: 'กรุณาตรวจสอบ'
                    });
                }
            } else {
            }
        }
    });
}
function setZoomType(data) {
    var ProvinceCode = $('#txtProvinceCode_').val();
    var DistrictCode = $('#txtDistrictCode_').val();
    var ZoomType = '';

    if (ProvinceCode == '') {
        ZoomType = 'District';
    } else {
        if (data.AMP_CODE == DistrictCode)
            ZoomType = 'Tambon';
        else
            ZoomType = 'District';
    }

    $('#txtZomeType_').val(ZoomType);

    $('#txtProvinceCode_').val(data.PRV_CODE);
    $('#txtProvinceName_').val(data.PRV_NAME);

    $('#txtDistrictCode_').val(data.AMP_CODE);
    $('#txtDistrictName_').val(data.AMP_NAME);

    $('#txtTambonCode_').val(data.TAM_CODE);
    $('#txtTambonName_').val(data.TAM_NAME);

    ZoomMap();
}

function ZoomMap() {
    var ZomeType = $('#txtZomeType_').val();
    var DistrictCode_ = $('#txtDistrictCode_').val();
    var TambolCode_ = $('#txtTambonCode_').val();

    if (ZomeType == 'District') {
        http.get("/api/TraceProgress/GetSHAPEDistrictByDistrictCode", { DistrictCode: DistrictCode_ }, function (data) {
            if (data != null) {
                var data = JSON.parse(data);               
                $.each(data, function (index, value) {
                    drawCity(value.Shape);
                });
            }
        });

    } else if (ZomeType == 'Tambon') {
        http.get("/api/TraceProgress/GetSHAPETambolByTambolCode", { TambolCode: TambolCode_ }, function (data) {
            if (data != null) {
                var data = JSON.parse(data);
                $.each(data, function (index, value) {
                    drawCity(value.Shape);
                });
            }
        });
    }
}



function ChangeContentTransactionOnClickMap() {
    var ChoiceType = $("input[name='Type1']:checked").val();
    var strHeader = '';

    // Change  Header
    if (ChoiceType == 'Region') {
        strHeader = 'แสดงข้อมูลรายภาค'
    } else if (ChoiceType == 'Cluster') {
        strHeader = 'แสดงข้อมูลรายคลัสเตอร์'
    } else if (ChoiceType == 'Province') {
        strHeader = 'แสดงข้อมูลรายจังหวัด'
    }
    $('#headerFadeIn').text(strHeader);

    // Change  Body
    var TransactionPlanHdId_ = $('#txtTransactionPlanHdId_').val();
    var ProvinceCode_ = $('#txtProvinceCode_').val();
    var ProvinceName_ = $('#txtProvinceName_').val();
    var DistrictName_ = $('#txtDistrictName_').val();
    var TambonName_ = $('#txtTambonName_').val();

    //Province
    var Htmltext = '';
    http.get("/api/TraceProgress/GetTransactionPlanDtByCodeAndProvince", { Code: TransactionPlanHdId_, Province: ProvinceCode_ }, function (responseDt) {
         
        var dataDt = JSON.parse(responseDt);
        //txtProvinceAssign
        if (txtZomeType_ == 'District') {
            Htmltext += '<div class="col-sm-2 col-lg-2 col-md-2" style="text-align: center">' + ProvinceName_ + '</div>';

        } else if (txtZomeType_ == 'Tambon'){
            Htmltext += '<div class="col-sm-2 col-lg-2 col-md-2" style="text-align: center">' + ProvinceName_ + '</div>';
        }

        //Htmltext += '<div class="col-sm-2 col-lg-2 col-md-2" style="text-align: center">' + ProvinceName_ + '</div>';
        Htmltext += '<div class="col-sm-10 col-lg-10 col-md-10">';
        Htmltext += '<ul class="progressbar">';
        $.each(dataDt, function (index, rowDt) {
          
            Htmltext += '<li class="complete workperfect" title="' + rowDt.ActivityName  + '"></li>';
        });
        Htmltext += '</ul>';
        Htmltext += '</div>';

        $('#fadeContent').empty();
        $('#fadeContent').append(Htmltext);

    });

}

function FadeShowHide() {
    if (!fadeInIsShow) {
        $('#fade-in').toggleClass('show');
        $('#fade-in').css('z-index', 3000);
        fadeInIsShow = true;
    }
}


//============================== MAP Render ====================================
function drawCity(shape) {
    console.log('drawCity');
    var trans = gisIframeWindow.GIS.transform(shape, sridIn, sridOut);
    return gisIframeWindow.GIS.addGraphic(trans[0].shape, 102100, symbolZoom);
}

function drawCity_Late(shape) {
    console.log('drawCity_Late');
    var trans = gisIframeWindow.GIS.transform(shape, sridIn, sridOut);
    return gisIframeWindow.GIS.addGraphic(trans[0].shape, 102100, symbolLate);
}
