﻿var viewListManager = {
    init: function () {
        searchForm.initComp();
        
    }

}

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

                        if (data != null) {
                            ParcelMapController.draw(data,ParcelMapController.SubDistrictType);
                            $("#overlay").hide();
                            //drawCity(data.SHAPE);
                        }
                    });
                }
            }



        } catch (e) {
            alert(e.message);
        }

    }



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

var ParcelMapController = {
    ProvinceType:1,
    DistrictType:2,
    SubDistrictType:3,
    draw: function (targetInfo,type) {
	
        targetInfo.MapStructure.ParcelDrawingCode = ParcelMapController.getParcelMapColor(targetInfo.ParcelPrice, type);
        
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
            "imageData": "iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAMNJREFUSIntlcENwyAMRZ+lSMyQFcI8rJA50jWyQuahKzCDT+6h0EuL1BA1iip8Qg/Ex99fYuCkGv5bKK0EcB40YgSE7bnTxsa58LeOnMd0QhwGXkxB3L0w0IDxPaMqpBFxjLMuaSVmRjurWIcRDHxaiWZuEbRcEhpZpSNhE9O81GiMN5E0ZRt2M0iVjshek8UkTQfZy8JqGHYP/rJhODD4T6wehtbB9zD0MPQwlOphaAxD/uPLK7Z8MB5gFet+WKcJPQDx29XkRhqr/AAAAABJRU5ErkJggg==",
            "contentType": "image/png",
            "width": 19.5,
            "height": 19.5,
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0
        };
        var attributes = {
            "Target": targetInfo.Name + "<br/>",
            "Price": "<br/>&nbsp;&nbsp;&nbsp;&nbsp;ราคาประเมิน : " + targetInfo.ParcelPrice + "<br/>&nbsp;&nbsp;&nbsp;&nbsp;ราคาขาย : " + targetInfo.MarketPrice + "<br/><br/>"
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
        return '/TDManagement';
        //return '';
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


