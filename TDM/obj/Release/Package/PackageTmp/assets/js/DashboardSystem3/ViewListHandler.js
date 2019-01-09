﻿
var sectionType = '0'; // ton
var code = ''; // ton


var tabSelect = '1';
var resultAll;

var section1Tab = '1';
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
                        searchForm.clearDropDown('ddlSubdistrict');
                   
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

        //ton
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
        //ton

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

                      
                    });
                }
            }

            //ton
            SearchAll(sectionType, code)

        } catch (e) {
            alert(e.message);
        }

    }



}



//ton

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
      "imageData": "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",
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




