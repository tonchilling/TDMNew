//======================= ดึงข้อมูลจาก ระบบ 4 =======================
function TransactionPlan(provincecode) {
    
}


//======================= M A P =======================

iframeElement = document.getElementById('gisIframe__');
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
            activateDraw_Point_Begin();
        }

        if ($('#txtTransactionPlanHdId_').val() == '') {
            hu = window.location.search.substring(1);
            gy = hu.split("&");
            for (i = 0; i < gy.length; i++) {
                ft = gy[i].split("=");
                console.log(ft);
                if (ft[0] == "Id") {
                    $('#txtTransactionPlanHdId_').val(ft[1]);
                }
            }
        }
    }, 1000);

});

function ddlOnchange() {
    $('input[type=radio][name=Type1]').change(function () {
        console.log(this.value);
        $('#fade-in').toggleClass('show');
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
        console.log(data);
        if (data != null) {
            var data = JSON.parse(data);

            if (data.length > 0) {
                if (data[0].PRV_CODE != '') {
                    $('#txtProvinceCode_').val(data[0].PRV_CODE);
                    $('#txtProvinceName_').val(data[0].PRV_NAME);
                    TransactionPlan(data[0].PRV_CODE);

                    //change text Header Fade
                    var check = ($('input[type=radio][name=Type1]').val());

                    $('#headerFadeIn').text(data[0].PRV_NAME);

                    //โช ซ้อน Fade
                    if (!fadeInIsShow) {
                        $('#fade-in').toggleClass('show');
                        $('#fade-in').css('z-index', 3000);
                        fadeInIsShow = true;
                    }
                }
                else {
                    console.log('show notification');
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