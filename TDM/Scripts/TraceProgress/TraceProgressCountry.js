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

$(function () {
    ddlOnchange();

    setInterval(function () {
        if ($('#txtPoint_47_').val() == '') {
            //activateDraw_Point_Begin();
        }

        if ($('#txtTransactionPlanHdId_').val() == '') {
            hu = window.location.search.substring(1);
            gy = hu.split("&");
            for (i = 0; i < gy.length; i++) {
                ft = gy[i].split("=");
                if (ft[0] == "Id") {
                    $('#txtTransactionPlanHdId_').val(ft[1]);

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
                    $('#txtProvinceCode_').val(data[0].PRV_CODE);
                    $('#txtProvinceName_').val(data[0].PRV_NAME);
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
    var TransactionPlanHdId = $('#txtTransactionPlanHdId_').val();
    http.get("/api/TraceProgress/GetTransactionPlanDtByTransactionPlanHdId", { TransactionPlanHdId: TransactionPlanHdId }, function (responseDt) {
         
        var dataDt = JSON.parse(responseDt);
        var Htmltext = '<div class="col-sm-2 col-lg-2 col-md-2" style="text-align: center">'+ +'</div>';
        $.each(dataDt, function (index, rowDt) {
            console.log(rowDt);
        });

        Htmltext = $('#txtProvinceName_').val();
     

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