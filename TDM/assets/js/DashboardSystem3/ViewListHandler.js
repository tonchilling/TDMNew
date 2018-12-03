var viewListManager = {
    init: function () {
        searchForm.initComp();
    }

}

var searchForm = {

    initComp: function (eleName) {
        searchForm.setupSearchForm();
    },
    ddlProvince: $("#ddlProvince"),
    ddlDistrict: $("#ddlDistrict"),
    ddlSubDistrict: $("#ddlSubdistrict"),
    clearDropDown: function (eleName) {
        var name = '#' + eleName;
        var firstOption = "";

        
        switch (eleName) {
            case "ddlProvince": firstOption = "เลือกจังหวัด"; break;
            case "ddlDistrict": firstOption = "เลือกอำเภอ";  break;
            case "ddlSubdistrict": firstOption = "เลือกตำบล"; break;
        }
        $(name).empty();
        $(name).append("<option value=''>" + firstOption + "</option>");
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
        $('#ddlProvince').append("<option value=''>เลือกจังหวัด</option>");


        $('#ddlRegion').change(function () {

           // alert('getProvincesByRegion')
            var regionId = $('#ddlRegion').val();
            mapApi.getProvincesByRegion(regionId, function (provinces) {

                if (provinces != null && provinces.length > 0) {
                    $('#ddlProvince').empty();
                    $('#ddlProvince').append("<option value=''>เลือกจังหวัด</option>");

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


      //  alert(searchType + '  ' + targetId);

        try {


            var sectionType = '1';
            var code = '';
            SearchAll(sectionType, code)
          //  map.clear();
            if (searchType == 'PROVINCE') {/*render PROVINCE map*/
                sectionType = '1';
                code = $('#ddlRegion').val();
                if (targetId == idOfAll) {
                    mapApi.getProvinceShapeByRegion($('#ddlRegion').val(), function (data) {

                        if (data != null && data.length > 0) {

                            $.each(data, function (index, shape) {

                                drawCity(shape.SHAPE);
                            });
                        }
                    });
                } else {
                    mapApi.getProvinceShapeByID(targetId, function (data) {

                        if (data != null) {

                            drawCity(data.SHAPE);
                        }
                    });
                }

            } else if (searchType == 'DISTRICT') {/*render DISTRICT map*/

                sectionType = '2';
                code = $('#ddlProvince').val();
                if (targetId == idOfAll) {
                    mapApi.getDistrictShapeByProvince($("#ddlProvince").val(), function (data) {

                        if (data != null && data.length > 0) {
                            $.each(data, function (index, shape) {
                                drawCity(shape.SHAPE);
                            });
                        }
                    });
                } else {

                
                    mapApi.getDistrictShapeByID(targetId, function (data) {

                        if (data != null) {
                            drawCity(data.SHAPE);
                        }
                    });
                }
            } else { /*render subdistrict map*/
                if (targetId == idOfAll) {
                    sectionType = '3';
                    code = $('#ddlDistrict').val();
                    mapApi.getSubDistrictShapeByDistrict($("#ddlDistrict").val(), function (data) {

                        if (data != null && data.length > 0) {
                            $.each(data, function (index, shape) {
                                drawCity(shape.SHAPE);
                            });
                        }
                    });
                } else {
                    mapApi.getSubDistrictShapeByID(targetId, function (data) {

                        if (data != null) {
                            drawCity(data.SHAPE);
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

var mapApi = {
    getProvincesByRegion: function (regionId, fnSuccess) {

       
        $.get("/api/Map/GetProvincesByRegion", { id: regionId }, function (provinces) {
            fnSuccess(provinces);
        });
    },
    getDistricts: function (provinceId, fnSuccess) {

        $.get("/api/Map/GetDistrictsByProvince/", {}, function (data) {
            fnSuccess(data);
        });
    },
    getDistrictsByProvince: function (provinceId, fnSuccess) {

        $.get("/api/Map/GetDistrictsByProvince/", { id: provinceId }, function (data) {
            fnSuccess(data);
        });
    },
    getSubDistricts: function (districtId, fnSuccess) {

        $.get("/api/Map/GetSubDistricts/", {}, function (data) {
            fnSuccess(data);
        });
    },
    getSubDistrictsByDistrict: function (districtId, fnSuccess) {

        $.get("/api/Map/GetSubDistrictsByDistrict/", { id: districtId }, function (data) {
            fnSuccess(data);
        });
    },

    getProvinceShapByCode: function (provinceCode, fnSuccess) {
        $.get("/api/Address/GetProvinceShapeBy", { code: provinceCode }, function (data) {
            fnSuccess(data);
        });
    },
    getProvinceShapeByID: function (provinceID, fnSuccess) {
        $.get("/api/Map/GetProvinceShapeByID", { id: provinceID }, function (data) {
            fnSuccess(data);
        });
    },
    getProvinceShapeByRegion: function (regionId, fnSuccess) {
        $.get("/api/Map/GetProvinceShapeByRegion", { id: regionId }, function (data) {
            fnSuccess(data);
        });
    },
    getDistrictShapeByID: function (districtId, fnSuccess) {
        $.get("/api/Map/GetDistrictShapeByID", { id: districtId }, function (data) {
            fnSuccess(data);
        });
    },
    getDistrictShapeByProvince: function (provinceId, fnSuccess) {
        $.get("/api/Map/GetDistrictShapeByProvince", { id: provinceId }, function (data) {
            fnSuccess(data);
        });
    },
    getSubDistrictShapeByID: function (subDistrictId, fnSuccess) {
        $.get("/api/Map/GetSubDistrictShapeByID", { id: subDistrictId }, function (data) {
            fnSuccess(data);
        });
    },
    getSubDistrictShapeByDistrict: function (districtId, fnSuccess) {
        $.get("/api/Map/getSubDistrictShapeByDistrict", { id: districtId }, function (data) {
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



function SearchAll(sectionTypeTemp, codeTemp)
{
    
  
    var objSearch = {};

    objSearch = { SectionType: sectionTypeTemp, code: "1" };

    $.ajax({
        type: "POST",
        url: '/api/PriceSys/GetPrice',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(objSearch),
        success: function (response) {
            alert('success');
        },
        error: function (response) {
            alert('failure');
        }
    });
}


function searchSuccess(data)
{
    if (data != null && data.length > 0) {
        $.each(data, function (index, data) {
           // drawCity(shape.SHAPE);
        });
    }

}


