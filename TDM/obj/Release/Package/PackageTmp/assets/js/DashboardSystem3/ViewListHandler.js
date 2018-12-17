
var sectionType = '0';
var code = '';
var tabSelect = '1';
var resultAll;
var viewListManager = {
    init: function () {
        searchForm.initComp();
        
    }

}

/*
1 Parcel
2 Market
*/
var _mapCurrModule = 1;


var searchForm = {

    initComp: function (eleName) {
        searchForm.setupSearchForm();

        SearchAll('0', '');
        setTimeout(function () {
            var target = $('#pnlSectionSearch1');
            
            $("body").append("<div id='overlay'><br/><br/><br/><br/><br/><br/><img style='display: block;margin-left: auto;margin-right: auto;' src='http://www.mytreedb.com/uploads/mytreedb/loader/ajax_loader_blue_64.gif' /></div>");

            $("#overlay")
               .height(target.height())
               .width(target.width()+20)
               .css({
                   'opacity': 0.4,
                   'position': 'absolute',
                   'top': target.offset().top,
                   'left': target.offset().left,
                   'background-color': 'black',
                   'z-index': 5000,
                   'margin-left': 'auto',
                   'margin-right': 'auto'
               })
                .hide();

        }, 5000);
        
    },
    ddlProvince: $("#ddlProvince"),
    ddlDistrict: $("#ddlDistrict"),
    ddlSubDistrict: $("#ddlSubdistrict"),
    clearDropDown: function (eleName) {
        var name = '#' + eleName;
        $(name).empty();
        $(name).append("<option value=''>-</option>");
        $(name).append("<option value='999999'>ทั้งหมด</option>");
    },
    setupSearchForm: function () {
        searchForm.clearDropDown('ddlDistrict');
        $('#ddlDistrict').prop('disabled', 'disabled');

        searchForm.clearDropDown('ddlSubdistrict');
        $('#ddlSubdistrict').prop('disabled', 'disabled');

        $('#bttSearch').click(function () {
            searchForm.search();
        });

        $('#bttClear').click(function () {
            document.getElementById('ddlProvince').selectedIndex = 0;
            document.getElementById('ddlDistrict').selectedIndex = 0;
            document.getElementById('ddlSubdistrict').selectedIndex = 0;

            $('#ddlDistrict').prop('disabled', 'disabled');
            $('#ddlSubdistrict').prop('disabled', 'disabled');

            map.clear();
        });


        $('#ddlProvince').empty();
        $('#ddlProvince').append("<option value='999999'>ทั้งหมด</option>");


        $('#ddlRegion').change(function () {

            var regionId = $('#ddlRegion').val();
            mapApi.getProvincesByRegion(regionId, function (provinces) {

                if (provinces != null && provinces.length > 0) {
                    $('#ddlProvince').empty();
                    $('#ddlProvince').append("<option value='999999'>ทั้งหมด</option>");

                    $.each(provinces, function (index, province) {
                        $("#ddlProvince").append("<option value='" + province.ID + "'>" + province.Name + "</option>");
                    });

                    $("#ddlProvince").change(function () {

                        var provinceId = $("#ddlProvince").val();
                        searchForm.clearDropDown('ddlDistrict');

                        if (provinceId == '' || provinceId == '999999') {
                            $('#ddlDistrict').prop('disabled', 'disabled');

                            searchForm.clearDropDown('ddlSubdistrict');
                            $('#ddlSubdistrict').prop('disabled', 'disabled');

                        } else {
                            $('#ddlDistrict').prop('disabled', false);
                            mapApi.getDistrictsByProvince(provinceId, function (districts) {
                                if (districts != null && districts.length > 0) {

                                    $.each(districts, function (index, district) {
                                        $("#ddlDistrict").append("<option value='" + district.ID + "'>" + district.Name + "</option>");
                                    });

                                    $('#ddlDistrict').change(function () {
                                        var districtId = $("#ddlDistrict").val();
                                        $('#ddlSubdistrict').empty();
                                        searchForm.clearDropDown('ddlSubdistrict');

                                        if (districtId == '' || districtId == '999999') {
                                            $('#ddlSubdistrict').prop('disabled', 'disabled');
                                        } else {
                                            mapApi.getSubDistrictsByDistrict(districtId, function (subDistricts) {
                                                $('#ddlSubdistrict').prop('disabled', false);

                                                $.each(subDistricts, function (index, subDistrict) {
                                                    $("#ddlSubdistrict").append("<option value='" + subDistrict.ID + "'>" + subDistrict.Name + "</option>");
                                                });
                                            })
                                        }



                                    });

                                }

                            });
                        }

                    });
                }
            });


        });
        $('#ddlRegion').trigger("change");
    },
    switchMode: function (mode) {
        if (_mapCurrModule == mode) {
            return;
        } else {
            if (mode < 1 || mode > 2) {
                mode = 1;
            }
            _mapCurrModule = mode;

            map.clear();
        }
        
        
    },
    search: function () {
        /**/

        $("#overlay").show();

        var idOfAll = '999999';
        var searchType = 'PROVINCE';
        var targetId = '';

        if ($("#ddlSubdistrict").val() != '') {
            searchType = 'SUB_DISTRICT';
            targetId = $("#ddlSubdistrict").val();
        } else if ($("#ddlDistrict").val() != '') {
            searchType = 'DISTRICT';
            targetId = $("#ddlDistrict").val();
        } else {
            searchType = 'PROVINCE';
            targetId = $("#ddlProvince").val();
        }


        if ($('#ddlSubdistrict').val() != "" && $("#ddlSubdistrict").val() != '999999') {
            sectionType = '4';
            code = $('#ddlSubdistrict').val();
        }
        else if ($("#ddlDistrict").val() != '' && $("#ddlDistrict").val() != '999999') {
            sectionType = '3';
            code = $('#ddlDistrict').val();
        }
        else if ($("#ddlProvince").val() != '' && $("#ddlProvince").val() != '999999') {
            sectionType = '2';
            code = $('#ddlProvince').val();
        }
        else if ($("#ddlRegion ").val() != '') {
            sectionType = '1';
            code = $('#ddlRegion').val();
        } else {
            sectionType = '0';

        }

        try {



            map.clear();
            if (searchType == 'PROVINCE') {/*render PROVINCE map*/
                if (targetId == idOfAll) {
                    mapApi.getProvinceShapeByRegion($('#ddlRegion').val(), function (data) {
                        
                        if (data != null && data.length > 0) {

                            $.each(data, function (index, shape) {

                                
                                ParcelMapController.draw(shape,ParcelMapController.ProvinceType);
                                $("#overlay").hide();
                                //drawCity(shape.SHAPE);
                            });
                        }
                    });
                } else {
                    mapApi.getProvinceShapeByID(targetId, function (data) {

                        if (data != null) {
                            
                            ParcelMapController.draw(data,ParcelMapController.ProvinceType);
                            $("#overlay").hide();
                            //drawCity(data.SHAPE);
                        }
                    });
                }

            } else if (searchType == 'DISTRICT') {/*render DISTRICT map*/
                if (targetId == idOfAll) {
                    mapApi.getDistrictShapeByProvince($("#ddlProvince").val(), function (data) {

                        if (data != null && data.length > 0) {
                            $.each(data, function (index, shape) {
                                ParcelMapController.draw(shape,ParcelMapController.DistrictType);
                                $("#overlay").hide();
                                //drawCity(shape.SHAPE);
                            });
                        }
                    });
                } else {
                    mapApi.getDistrictShapeByID(targetId, function (data) {

                        if (data != null) {
                            ParcelMapController.draw(data,ParcelMapController.DistrictType);
                            $("#overlay").hide();
                            //drawCity(data.SHAPE);
                        }
                    });
                }
            } else { /*render subdistrict map*/
                if (targetId == idOfAll) {
                    mapApi.getSubDistrictShapeByDistrict($("#ddlDistrict").val(), function (data) {

                        if (data != null && data.length > 0) {
                            $.each(data, function (index, shape) {
                                ParcelMapController.draw(shape,ParcelMapController.SubDistrictType);
                                $("#overlay").hide();
                                //drawCity(shape.SHAPE);
                            });
                        }
                    });
                } else {
                    mapApi.getSubDistrictShapeByID(targetId, function (data) {

                        if (data != null && data.length > 0) {
                            $.each(data, function (index, shape) {
                                ParcelMapController.draw(shape, ParcelMapController.SubDistrictType);
                                $("#overlay").hide();
                                //drawCity(shape.SHAPE);
                            });
                        }
                      /*  if (data != null) {
                            ParcelMapController.draw(data,ParcelMapController.SubDistrictType);
                            $("#overlay").hide();
                           
                        }*/
                    });
                }
            }

            SearchAll(sectionType, code)

        } catch (e) {
            alert(e.message);
        }

    }



}



//ton
$(document).on("click", ".liTab", function () {
    $(".liTab").removeClass("active");
    $(this).addClass("active");

    //  $('#lblHeaderMain').text("")
    // $('#lbHeader').text("")
    // alert($(this).attr("id"))
    if ($(this).attr("id") == "tab1") {
       
       
        setTimeout(function () {
            tabSelect = '1';
            InitailDataView(resultAll);
            $('#lblHeaderMain').text($('#lblHeaderMain').text().replace('ราคาซื้อขาย', 'ราคาประเมิน'));
            $('#lbHeader').text($('#lbHeader').text().replace('ราคาซื้อขาย', 'ราคาประเมิน'));

        }
        , 400);
    } ($(this).attr("id") == "tab2")
    {  
       
        
        setTimeout(function () {
            tabSelect = '2';
            InitailDataView(resultAll);
            $('#lblHeaderMain').text($('#lblHeaderMain').text().replace('ราคาประเมิน', 'ราคาซื้อขาย'));
            $('#lbHeader').text($('#lbHeader').text().replace('ราคาประเมิน', 'ราคาซื้อขาย'));

        }
       , 300);

    }


});
function SearchAll(sectionTypeTemp, codeTemp) {


    var objSearch = {};

    objSearch = { SectionType: sectionTypeTemp, code: codeTemp };

    $.ajax({
        type: "POST",
        url: mapApi.getServerPath()+ '/api/PriceSys/GetPrice',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(objSearch),
        success: function (data) {

            resultAll = data;
            InitailDataView(data);
        },
        error: function (response) {
            alert('failure');
        }
    });
}


function InitailDataView(data) {

   
  //  $("#lbHeader").text(tabSelect == '1' ? "ราคาประเมิน ราย" : "ราคาซื้อขาย ราย" + GetSectionDisplayText(sectionType));
   // $("#lbHeaderGraph").text("แผนภูมิแสดงราคาที่ดิน ราย" + GetSectionDisplayText(sectionType));
    LoadEvalBox1_LeftBox(data);
    LoadEvalBox1_Graph(data);
    LoadEvalBox1_Table(data);


}

function LoadEvalBox1_LeftBox(data) {

    var body = "";
    $("#EvalBox1").empty();
    if (data != null) {
        if (data != null && data.length > 0) {
            $.each(data, function (index, data) {
                body += '<div class="alert leftbox leftbox-' + data.DisplayCode + ' msg pmvByAreaBox">';
                body += '<h4>' + data.DisplayName + '</h4>';
                if (tabSelect == '1') {
                    body += '<h5>ราคาประเมิน : ' + numberWithCommas(parseFloat(data.ParcelPrice).toFixed(2)) + ' บาท </h5>';
                    body += '<h5>ราคาสูงสุด : ' + numberWithCommas(parseFloat(data.ParcelPriceMax).toFixed(2)) + ' บาท </h5>';
                    body += ' <h5>ราคาต่ำสุด:  ' + numberWithCommas(parseFloat(data.ParcelPriceMin).toFixed(2)) + ' บาท </h5>';
                    body += '<h5>ราคาเฉลี่ย :  ' + numberWithCommas(parseFloat(data.ParcelPriceAvg).toFixed(2)) + ' บาท </h5>';
                } else {
                    body += '<h5>ราคาซื้อขาย : ' + numberWithCommas(parseFloat(data.MarketPrice).toFixed(2)) + ' บาท </h5>';
                    body += '<h5>ราคาสูงสุด : ' + numberWithCommas(parseFloat(data.MarketPriceMax).toFixed(2)) + ' บาท </h5>';
                    body += ' <h5>ราคาต่ำสุด:  ' + numberWithCommas(parseFloat(data.MarketPriceMin).toFixed(2)) + ' บาท </h5>';
                    body += '<h5>ราคาเฉลี่ย :  ' + numberWithCommas(parseFloat(data.MarketPriceAvg).toFixed(2)) + ' บาท </h5>';
                }
                body += ' </div>';
            });
        }
    }

    $("#EvalBox1").append(body);

}

function GetSectionDisplayText(sectionType) {
    var text = 'ภาค';

    switch (sectionType) {
        case '0': text = 'ภาค'; break;
        case '1': text = 'จังหวัด'; break;
        case '2': text = 'อำเภอ'; break;
        case '3': text = 'ตำบล'; break;
    }

    return text;
}
function LoadEvalBox1_Graph(data) {
    var chartBar = echarts.init(document.getElementById('EvalBox1chartBar'));
    var caption = [];
    var maxValue = [];
    var minValue = [];
    var avgValue = [];


    if (data != null) {
        if (data != null && data.length > 0) {
            $.each(data, function (index, data) {
                caption.push(data.DisplayName);
                if (tabSelect == '1') {
                    maxValue.push(parseFloat(data.ParcelPriceMax).toFixed(2));
                    minValue.push(parseFloat(data.ParcelPriceMin).toFixed(2));
                    avgValue.push(parseFloat(data.ParcelPriceAvg).toFixed(2));
                } else {
                    maxValue.push(parseFloat(data.MarketPriceMax).toFixed(2));
                    minValue.push(parseFloat(data.MarketPriceMin).toFixed(2));
                    avgValue.push(parseFloat(data.MarketPriceAvg).toFixed(2));
                }
            });
        }
    }

    var option2 = {
        title: {
            text: '',
            subtext: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['ราคาประเมินรวม']
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'value'
            }
        ],
        yAxis: [
            {
                type: 'category',
                data: caption
            }
        ],
        series: [
            {
                name: 'ราคาเฉลี่ย',
                type: 'bar',
                data: avgValue,
                itemStyle: {
                    normal: {
                        color: 'green'
                    },
                    emphasis: {
                        color: '#00e600'

                    }
                }
            },
     {
         name: 'ราคาต่ำสุด',
         type: 'bar',
         data: minValue,

         itemStyle: {
             normal: {
                 color: 'yellow'
             },
             emphasis: {


             }
         }
     },
     {
         name: 'สูงสุด',
         type: 'bar',
         data: maxValue,

         itemStyle: {
             normal: {
                 color: 'red'
             },
             emphasis: {


             }
         }
     }
        ]
    };

    chartBar.setOption(option2);
}

function LoadEvalBox1_Table(data) {

    var body = "";
    $("#EvalBox1Table").empty();

    body += '<table class="table table-bordered table-striped tblInfo">';
    body += '<thead>';
    body += '<tr>';
    body += '<th scope="col">' + GetSectionDisplayText(sectionType) + '</th>';
    body += '<th scope="col">จำนวนแปลงที่ดิน</th>';
    body += '<th scope="col">พื้นที่รวม</th>';
    if (tabSelect == "1") {
        body += '<th scope="col">ราคาประเมินที่ดิน</th>';
    } else {
        body += '<th scope="col">ราคาซื้อขายที่ดิน</th>';
    }
    body += '</tr>';
    body += '</thead>';
    body += '<tbody>';
    if (data != null) {
        if (data != null && data.length > 0) {
            $.each(data, function (index, data) {
                body += '<tr>';
                body += '<td>' + data.DisplayName + '</td>';
                body += '<td>' + numberWithCommas(data.LAND_Total) + ' แปลง</td>';
                body += '<td>' + numberWithCommas(data.LAND_AREA) + ' ตารางวา</td>';
                if (tabSelect == "1") {
                    body += '<td>' + numberWithCommas(data.ParcelPrice) + ' บาท</td>';
                } else {
                    body += '<td>' + numberWithCommas(data.MarketPrice) + ' บาท</td>';
                }
                body += '</tr>';
            });
        }
    }

    body += ' </tbody>';
    body += ' </table>';

    $("#EvalBox1Table").append(body);
    $("#EvalBox1Table table").DataTable({ searching: false, info: false });
}

function testx() {
    alert('xxxx');
    searchForm.setupSearchForm();

}

var TDMap = {
    getYellowSymbol: function () {
        return {
            "type": "esriSFS",
            "style": "esriSFSSolid",
            "color": [173, 255, 47],
            "outline": {
                "type": "esriSLS",
                "style": "esriSLSSolid",
                "color": [0, 0, 0, 255],
                "width": 1
            }
        };
    },
    getRedSymbol: function () {
        return {
            "type": "esriSFS",
            "style": "esriSFSSolid",
            "color": [255, 0, 0],
            "outline": {
                "type": "esriSLS",
                "style": "esriSLSSolid",
                "color": [0, 0, 0, 255],
                "width": 1
            }
        };
    },
    getGreenSymbol: function () {
        return {
            "type": "esriSFS",
            "style": "esriSFSSolid",
            "color": [0, 128, 0],
            "outline": {
                "type": "esriSLS",
                "style": "esriSLSSolid",
                "color": [0, 0, 0, 255],
                "width": 1
            }
        };
    }
}

function toDisplayDecimal(val) {
    return Number(parseFloat(val).toFixed(2)).toLocaleString('en');
}

var ParcelMapController = {
    ProvinceType:1,
    DistrictType:2,
    SubDistrictType:3,
    draw: function (targetInfo,type) {
	
        var price = (_mapCurrModule == 1) ? targetInfo.ParcelPrice : targetInfo.MarketPrice;
        targetInfo.MapStructure.ParcelDrawingCode = ParcelMapController.getParcelMapColor(price, type);
        
        var symbol = ParcelMapController.getMapPhysicalInfo(targetInfo.MapStructure);
        
        
        if (targetInfo.MapStructure.Shape) {
            
            var targetShape = targetInfo.MapStructure.Shape;
            if (targetInfo.MapStructure.Shape.indexOf(';') !== -1) {
                targetShape=targetInfo.MapStructure.Shape.split(';')[1];
            }
            map.addGraphic(targetShape, symbol);
            ParcelMapController.drawWithInfo(targetInfo);
        } else {
            alert('Shap Not OK');
        }
        return null;
    },
    drawWithInfo: function (targetInfo) {
	
        /*
        var symbol = ParcelMapController.getMapPhysicalInfo(targetInfo.MapStructure);

       
        if (targetInfo.MapStructure.Shape) {
            var targetShape = targetInfo.MapStructure.Shape;
            if (targetInfo.MapStructure.Shape.indexOf(';') !== -1) {
                targetShape=targetInfo.MapStructure.Shape.split(';')[1];
            }
            return map.addGraphic(targetShape, symbol);
        }
        return null;*/

        var sridIn = 32647;
        var sridOut = [102100];
        var trans = gisIframeWindow.GIS.transform(targetInfo.MapStructure.Shape, sridIn, sridOut);



        var shape = trans[0].shape;
        var srid = 102100;
        var symbol = {
            "type": "esriPMS",
            "url": "471E7E31",
            "imageData":"iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAACXBIWXMAAAsTAAALEwEAmpwYAAADGGlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBFTAyMHy7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BSMDVQYqg4jIKAUICxE+CDEESC4tKoMHJQODAIMCgwGDA0MAQyJDPcMChqMMbxjFGV0YSxlXMN5jEmMKYprAdIFZmDmSeSHzGxZLlg6WW6x6rK2s99gs2aaxfWMPZ9/NocTRxfGFM5HzApcj1xZuTe4FPFI8U3mFeCfxCfNN45fhXyygI7BD0FXwilCq0A/hXhEVkb2i4aJfxCaJG4lfkaiQlJM8JpUvLS19QqZMVl32llyfvIv8H4WtioVKekpvldeqFKiaqP5UO6jepRGqqaT5QeuA9iSdVF0rPUG9V/pHDBYY1hrFGNuayJsym740u2C+02KJ5QSrOutcmzjbQDtXe2sHY0cdJzVnJRcFV3k3BXdlD3VPXS8Tbxsfd99gvwT//ID6wIlBS4N3hVwMfRnOFCEXaRUVEV0RMzN2T9yDBLZE3aSw5IaUNak30zkyLDIzs+ZmX8xlz7PPryjYVPiuWLskq3RV2ZsK/cqSql01jLVedVPrHzbqNdU0n22VaytsP9op3VXUfbpXta+x/+5Em0mzJ/+dGj/t8AyNmf2zvs9JmHt6vvmCpYtEFrcu+bYsc/m9lSGrTq9xWbtvveWGbZtMNm/ZarJt+w6rnft3u+45uy9s/4ODOYd+Hmk/Jn58xUnrU+fOJJ/9dX7SRe1LR68kXv13fc5Nm1t379TfU75/4mHeY7En+59lvhB5efB1/lv5dxc+NH0y/fzq64Lv4T8Ffp360/rP8f9/AA0ADzT6lvFdAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAA0SURBVHja7M0xAQAACAOgaf/OmsHDDwpQk38diUQikUgkEolEIpFIJBKJRHKyAAAA//8DAJSuAWNezU68AAAAAElFTkSuQmCC",
            //"imageData": "iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAMNJREFUSIntlcENwyAMRZ+lSMyQFcI8rJA50jWyQuahKzCDT+6h0EuL1BA1iip8Qg/Ex99fYuCkGv5bKK0EcB40YgSE7bnTxsa58LeOnMd0QhwGXkxB3L0w0IDxPaMqpBFxjLMuaSVmRjurWIcRDHxaiWZuEbRcEhpZpSNhE9O81GiMN5E0ZRt2M0iVjshek8UkTQfZy8JqGHYP/rJhODD4T6wehtbB9zD0MPQwlOphaAxD/uPLK7Z8MB5gFet+WKcJPQDx29XkRhqr/AAAAABJRU5ErkJggg==",

            "contentType": "image/png",
            "width": 32.0,
            "height": 32.0,
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0
        };
        var attributes = {
            "Target": targetInfo.Name + "<br/>",
            "Price": "<br/>&nbsp;&nbsp;&nbsp;&nbsp;ราคาประเมิน : " + toDisplayDecimal(targetInfo.ParcelPrice) + "<br/>&nbsp;&nbsp;&nbsp;&nbsp;ราคาขาย : " + toDisplayDecimal(targetInfo.MarketPrice) + "<br/><br/>"
        }

        gIdGlobal = gisIframeWindow.GIS.addGraphicWithInfoWindow(shape, srid, symbol, attributes);

    },
    getParcelMapColor:function(price,type){
        var provinceRangs = [{ min: 0.00, max: 100000.00, color: 'green' },
                                { min: 100000.01, max: 1000000.00, color: 'yellow' },
                                { min: 1000000.01, max: 100000000000000.00, color: 'red' }
        ];
        var districtRangs = [{ min: 0.00, max: 100000.00, color: 'green' },
                                { min: 100000.01, max: 1000000.00, color: 'yellow' },
                                { min: 1000000.01, max: 100000000000000.00, color: 'red' }
        ];
        var subDistrictRangs = [{ min: 0.00, max: 100000.00, color: 'green' },
                                { min: 100000.01, max: 1000000.00, color: 'yellow' },
                                { min: 1000000.01, max: 100000000000000.00, color: 'red' }
        ];

        var target = provinceRangs;
        switch (type) {
            case 1: target = provinceRangs; break;
            case 2: target = districtRangs; break;
            case 3: target = subDistrictRangs; break;
        }
        var color = 'green';
        target.forEach(function (item, index, arr) {
            if (item.min <= price && item.max >= price) {
                color = item.color;
            }
        });
        return color;

    },
    getMapPhysicalInfo: function (mapStructure) {
        var symbol = TDMap.getYellowSymbol();

        switch (mapStructure.ParcelDrawingCode) {
            case "yellow":
                symbol = TDMap.getYellowSymbol();
                break;
            case "red":
                symbol = TDMap.getRedSymbol();
                break;
            case "green":
                symbol = TDMap.getGreenSymbol();
                break;
            default:
                /*default to YELLOW*/
                symbol = TDMap.getYellowSymbol();
                break;

        }

        return symbol;

    }
}





var mapApi = {
    getServerPath:function(){
      //  return '/TDManagement';
        return '';
    },
    getProvincesByRegion: function (regionId, fnSuccess) {

        $.get(mapApi.getServerPath()+ "/api/Map/GetProvincesByRegion", { id: regionId }, function (provinces) {
            fnSuccess(provinces);
        });
    },
    getDistricts: function (provinceId, fnSuccess) {

        $.get(mapApi.getServerPath()+ "/api/Map/GetDistrictsByProvince/", {}, function (data) {
            fnSuccess(data);
        });
    },
    getDistrictsByProvince: function (provinceId, fnSuccess) {

        $.get(mapApi.getServerPath()+ "/api/Map/GetDistrictsByProvince/", { id: provinceId }, function (data) {
            fnSuccess(data);
        });
    },
    getSubDistricts: function (districtId, fnSuccess) {

        $.get(mapApi.getServerPath()+ "/api/Map/GetSubDistricts/", {}, function (data) {
            fnSuccess(data);
        });
    },
    getSubDistrictsByDistrict: function (districtId, fnSuccess) {

        $.get(mapApi.getServerPath()+ "/api/Map/GetSubDistrictsByDistrict/", { id: districtId }, function (data) {
            fnSuccess(data);
        });
    },

    getProvinceShapByCode: function (provinceCode, fnSuccess) {
        $.get(mapApi.getServerPath()+ "/api/Address/GetProvinceShapeBy", { code: provinceCode }, function (data) {
            fnSuccess(data);
        });
    },
    getProvinceShapeByID: function (provinceID, fnSuccess) {
        $.get(mapApi.getServerPath()+ "/api/Map/GetProvinceShapeByID", { id: provinceID }, function (data) {
            fnSuccess(data);
        });
    },
    getProvinceShapeByRegion: function (regionId, fnSuccess) {
        $.get(mapApi.getServerPath()+ "/api/Map/GetProvinceShapeByRegion", { id: regionId }, function (data) {
            fnSuccess(data);
        });
    },
    getDistrictShapeByID: function (districtId, fnSuccess) {
        $.get(mapApi.getServerPath()+ "/api/Map/GetDistrictShapeByID", { id: districtId }, function (data) {
            fnSuccess(data);
        });
    },
    getDistrictShapeByProvince: function (provinceId, fnSuccess) {
        $.get(mapApi.getServerPath()+ "/api/Map/GetDistrictShapeByProvince", { id: provinceId }, function (data) {
            fnSuccess(data);
        });
    },
    getSubDistrictShapeByID: function (subDistrictId, fnSuccess) {
        $.get(mapApi.getServerPath()+ "/api/Map/GetSubDistrictShapeByID", { id: subDistrictId }, function (data) {
            fnSuccess(data);
        });
    },
    getSubDistrictShapeByDistrict: function (districtId, fnSuccess) {
        $.get(mapApi.getServerPath()+ "/api/Map/getSubDistrictShapeByDistrict", { id: districtId }, function (data) {
            fnSuccess(data);
        });
    },
    onFailure: function (response) {
        alert(response.responseText);
    },
    onError: function (response) {
        alert(response.responseText);
    }
}


var jAjax = {
    get: function (url, fnSuccess, fnFailure, fnError) {
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: fnSuccess(response),
            failure: fnFailure(response),
            error: fnError(response)
        });
    }
}




$(document).on("change", "#ddlLand", function () {

    switch ($(this).val()) {
        case "0": $(".chartTab1").visible();
            $(".chartTab1").css({
                position: 'relative',
                top: '10px',
                left: '10px'
            });
            break;
        default:
            $(".chartTab1").visible().invisible();
            $(".chartTab1.tab" + $(this).val()).visible();
            $(".chartTab1.tab" + $(this).val()).css({
                position: 'absolute',
                top: '10px',
                left: '10px'
            });
    }
});



$(document).on("change", "#ddlTown", function () {

    switch ($(this).val()) {
        case "0": $(".chartTab2").visible();
            $(".chartTab2").css({
                position: 'relative',
                top: '10px',
                left: '10px'
            });
            break;
        default:
            $(".chartTab2").visible().invisible();
            $(".chartTab2.tab" + $(this).val()).visible();
            $(".chartTab2.tab" + $(this).val()).css({
                position: 'absolute',
                top: '10px',
                left: '10px'
            });
    }
});

$(document).on("change", "#ddlBuild", function () {

    switch ($(this).val()) {
        case "0": $(".chartTab3").visible();
            $(".chartTab3").css({
                position: 'relative',
                top: '10px',
                left: '10px'
            });
            break;
        default:
            $(".chartTab3").visible().invisible();
            $(".chartTab3.tab" + $(this).val()).visible();
            $(".chartTab3.tab" + $(this).val()).css({
                position: 'absolute',
                top: '10px',
                left: '10px'
            });
    }
});


var minCostLimit = 0;
var maxCostLimit = 10000000;
var minCost = minCostLimit;
var maxCost = maxCostLimit;
var slider0 = null;
var slider1 = null;


$(document).ready(function () {

    slider0 = $("#CostEstimateSlider0").slider({
        range: true,
        min: minCostLimit,
        max: maxCostLimit,
        values: [minCost, maxCost],
        slide: function (event, ui) {
            $("#MinCostEstimate0").val(ui.values[0]);
            $("#MaxCostEstimate0").val(ui.values[1]);
            $('#minDiv0').html(numberWithCommas(ui.values[0]));
            $('#maxDiv0').html(numberWithCommas(ui.values[1]));
        }
    });
    slider1 = $("#CostEstimateSlider1").slider({
        range: true,
        min: minCostLimit,
        max: maxCostLimit,
        values: [minCost, maxCost],
        slide: function (event, ui) {
            $("#MinCostEstimate1").val(ui.values[0]);
            $("#MaxCostEstimate1").val(ui.values[1]);
            $('#minDiv1').html(numberWithCommas(ui.values[0]));
            $('#maxDiv1').html(numberWithCommas(ui.values[1]));
        }
    });
    $('.minDiv').html(numberWithCommas(minCost));
    $('.maxDiv').html(numberWithCommas(maxCost));
});



