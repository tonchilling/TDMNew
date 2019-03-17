
var LocationType='1'
$(function () {

  
    searchForm.initComp();
    $("#ddlProvince1").selectpicker('refresh')
    $(".divTable table").DataTable({
        searching: false
        , info: false
       , drawCallback: function (setting) {
           MergeCommonRows($(".divTable table"),1)
    }
    }).on('draw.dt', function () {
        MergeCommonRows($(".divTable table"), 1)
    });;
   
});

$(document).on("click", "#rdRegion", function () {
    DisplaySection2SearchRegionCluster(1)
});

$(document).on("click", "#rdCluster", function () {
    DisplaySection2SearchRegionCluster(2)

});

$(document).on("click", ".btnSearch", function () {
    searchForm.search();

});


$(document).on("change", "#ddlProvince1", function () {
    var proviceOption1;

    if ($(this).val() == "999999") {
        proviceOption1 = $("#ddlProvince1 option").clone();
    }
    else {
        proviceOption1 = $("#ddlProvince1 option:not([value='" + $(this).val() + "'])").clone();
    }



});


/// tabid=1 region
/// tabid=2 cluster
function DisplaySection2SearchRegionCluster(tabid) {
    $('#ddlRegion').empty();
    if (tabid == 1) // region
    {
        LocationType = '1';
        $.each(regionObj.data, function (index, obj) {
            $("#ddlRegion").append("<option value='" + obj.value + "'>" + obj.name + "</option>");
        });

        // $('.pnlRegion').visible().css("position", "relative");
        //  $('.pnlCluster').invisible().css("position", "absolute");

    } else ///// region
    {
        LocationType = '2';

        LoadCluster();
        //$('.pnlRegion').invisible().css("position", "absolute");
        //$('.pnlCluster').visible().css("position", "relative");

    }
}



function LoadCluster() {
    $("#ddlRegion").empty();

    $("#ddlRegion").append("<option value=''>กรุณาเลือก</option>");
    $.ajax({
        url: rootUrl + "/api/Address/GetCluster",
        type: "POST",
        //  data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            if (data != null) {
                if (data != null && data.length > 0) {

                    $.each(data, function (index, obj) {
                        $("#ddlRegion").append("<option value='" + obj.Value + "'>" + obj.Name + "</option>");
                    });
                }
            }

            if (regionSelectedId != '') {
                $("#ddlRegion").val(regionSelectedId)
            }
        }
    });

}



var searchForm = {

    initComp: function (eleName) {
        searchForm.setupSearchForm();
        setTimeout(function () {
            var target = $('#pnlSectionSearch1');

          //  $("body").append("<div id='overlay'><br/><br/><br/><br/><br/><br/><img style='display: block;margin-left: auto;margin-right: auto;' src='http://www.mytreedb.com/uploads/mytreedb/loader/ajax_loader_blue_64.gif' /></div>");

            $("#overlay")
               .height(target.height())
               .width(target.width() + 20)
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





        $('#ddlRegion').change(function (event) {

            var regionId = $('#ddlRegion').val();
            mapApi.getProvincesByRegion(LocationType, regionId, function (provinces) {

                if (provinces != null && provinces.length > 0) {
                    $('#ddlProvince').empty();
                    $('#ddlProvince').append("<option value='999999'>ทั้งหมด</option>");

                    $.each(provinces, function (index, province) {
                        $("#ddlProvince").append("<option value='" + province.ID + "'>" + province.Name + "</option>");
                    });


                    var proviceOption1 = $("#ddlProvince option:not([value='999999'])").clone();

                    var proviceOption1 = $("#ddlProvince option:not([value='999999'])").clone();

                    $("#ddlProvince1").empty();

                    $("#ddlProvince1").append(proviceOption1);

                    $("#ddlProvince1").selectpicker('refresh')

                    $("#ddlProvince").change(function (event) {

                        $("#ddlProvince1").empty();
                   
                        var provinceId = $("#ddlProvince").val();
                        var proviceOption1 = $("#ddlProvince option:not([value='" + provinceId + "']):not([value='999999'])").clone();

                        $("#ddlProvince1").append(proviceOption1);
                        $("#ddlProvince1").selectpicker('refresh')
                       

                        
                        if (provinceId == '' || provinceId == '999999') {
                            $('#ddlDistrict').prop('disabled', 'disabled');
                            $('#ddlSubdistrict').prop('disabled', 'disabled');

                        } else {
                            $('#ddlDistrict').prop('disabled', false);
                            mapApi.getDistrictsByProvince(regionId, provinceId, function (districts) {
                                if (districts != null && districts.length > 0) {

                                    searchForm.clearDropDown('ddlDistrict');
                                    searchForm.clearDropDown('ddlSubdistrict');



                                    $.each(districts, function (index, district) {
                                        $("#ddlDistrict").append("<option value='" + district.ID + "'>" + district.Name + "</option>");
                                    });

                                    $('#ddlDistrict').change(function (event) {
                                        var districtId = $("#ddlDistrict").val();


                                        if (districtId == '' || districtId == '999999') {
                                            $('#ddlSubdistrict').prop('disabled', 'disabled');
                                        } else {
                                            mapApi.getSubDistrictsByDistrict(regionId, districtId, function (subDistricts) {

                                                searchForm.clearDropDown('ddlSubdistrict');
                                                // $('#ddlSubdistrict').empty();
                                                // $('#ddlSubdistrict').append("<option value='999999'>ทั้งหมด</option>");

                                                $('#ddlSubdistrict').prop('disabled', false);




                                                $.each(subDistricts, function (index, subDistrict) {
                                                    $("#ddlSubdistrict").append("<option value='" + subDistrict.ID + "'>" + subDistrict.Name + "</option>");
                                                });
                                            })
                                        }

                                        event.stopPropagation();

                                    });

                                }

                            });
                        }
                        event.stopPropagation();
                    });
                }
            });

            event.stopPropagation();
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

        var sectionType = '';
        var code = '';
        //ton
       /* if ($('#ddlSubdistrict').val() != "" && $("#ddlSubdistrict").val() != '999999') {
            sectionType = '4';
            code = $('#ddlSubdistrict').val();
        }
        else if ($("#ddlDistrict").val() != '' && $("#ddlDistrict").val() != '999999') {
            sectionType = '3';
            code = $('#ddlDistrict').val();
        }
        else*/ if ($("#ddlProvince").val() != '' && $("#ddlProvince").val() != '999999') {
            sectionType = '2';
            code = $('#ddlProvince').val();
        }
        else if ($("#ddlRegion ").val() != '') {
            sectionType = '1';
            code = $('#ddlRegion').val();
        } else {
            sectionType = '0';

        }


        var objSearch = {};
        var provinceCode1 = $('#ddlProvince1').val();

        objSearch = {
            SectionType: sectionType,
            LocationType:LocationType,
            Code: code,
            Year: $('.ddlYear').val(),
            ProvinceCodeCompare1: (provinceCode1 != null && provinceCode1.length > 0) ? provinceCode1.join() : ""

        };


        $.ajax({
            url: rootUrl + "/api/PriceSys/GetLandPriceCompareMenu3",
            type: "POST",
            data: JSON.stringify(objSearch),
            dataType: "json",
            contentType: 'application/json',
            success: function (data) {

                if (data != null && data.MapInfoList != null) {
                    TransformMap(data.MapInfoList);
                }
                if (data != null && data.DataList != null) {
                    LoadTable(data.DataList)

                }

               

               


            }
        });
    }
}


var TDMap = {
    getPolygonSymbol: function () {
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
    }
}
function TransformMap(data)
{

    var sridIn = 32647;
    var sridOut = [102100];
    var trans;
    map.clear();
    if (data != null) {
        if (data != null && data.length > 0) {
            $.each(data, function (index, item) {
                if (item.Shape) {

                    var targetShape = item.Shape;
                    if (item.Shape.indexOf(';') !== -1) {
                        targetShape = item.Shape.split(';')[1];
                    }
                    map.addGraphic(targetShape, TDMap.getPolygonSymbol());
                   // ParcelMapController.drawWithInfo(targetInfo);
                } else {
                    alert('Shape Not OK');
                }


               // trans = gisIframeWindow.GIS.transform(item.Shape, sridIn, sridOut);
            });
            }
    }
}

function LoadTable(data)
{
    var body = '';
    $(".divTable").empty();

    body += '<table class="table table-bordered table-striped tblInfo">';
    body += '<thead>';
    body += '<tr>';
    body += '<th scope="col" class="center">จังหวัด</th>';
    body += '<th scope="col" class="center">ช่วงเวลา</th>';
    body += '<th scope="col" class="center">SA/Ratio<br>ต่ำสุด</th>';
    body += '<th scope="col" class="center">SA/Ratio<br>สูงสุด</th>';
    body += '<th scope="col" class="center">SA/Ratio<br>เฉลี่ย</th>';
    body += '</tr>';
    body += '</thead>';
;
    body += '<tbody>';
    if (data != null) {
        if (data != null && data.length > 0) {
            $.each(data, function (index, item) {

                body += '<tr>';
                body += '<td>' + item.ProvinceName + '</td>';
                body += '<td>ไตรมาส ' + item.Quater + ' </td>';
                body += '<td>' + item.MinPrice + '</td>';
                body += '<td>' + item.MaxPrice + '</td>';
                body += '<td>' + item.AvgPrice + '</td>';

                body += '</tr>';
            });
        }
    }
    body += '</tbody>';
    body += '</table>';
    $(".divTable").append(body);

   // $(".divTable table").DataTable({ searching: false, info: false });

    $(".divTable table").DataTable({
        searching: false
       , info: false
      , drawCallback: function (setting) {
          MergeCommonRows($(".divTable table"), 1)
      }
    }).on('draw.dt', function () {
        MergeCommonRows($(".divTable table"), 1)
    });;

}




function MergeCommonRows(table, columnIndexToMerge) {
    previous = null;
    cellToExtend = null;
    table.find("td:nth-child(" + columnIndexToMerge + ")").each(function () {
        jthis = $(this);
        content = jthis.text()
        if (previous == content && content !== "") {
            jthis.remove();
            if (cellToExtend.attr("rowspan") == undefined) {
                cellToExtend.attr("rowspan", 2);
            }
            else {
                currentrowspan = parseInt(cellToExtend.attr("rowspan"));
                cellToExtend.attr("rowspan", currentrowspan + 1);
            }
        }
        else {
            previous = content;
            cellToExtend = jthis;
        }
    });
}


var mapApi = {
    getServerPath: function () {
        return rootUrl;
        //return '';
    },
    getProvincesByRegion: function (locationType, regionId, fnSuccess) {

        $.get(mapApi.getServerPath() + "/api/Map/GetProvincesByRegion", { LocationType: locationType, id: regionId }, function (provinces) {
            fnSuccess(provinces);
        });
    },
    getDistricts: function (provinceId, fnSuccess) {

        $.get(mapApi.getServerPath() + "/api/Map/GetDistrictsByProvince/", {}, function (data) {
            fnSuccess(data);
        });
    },
    getDistrictsByProvince: function (locationType, provinceId, fnSuccess) {

        $.get(mapApi.getServerPath() + "/api/Map/GetDistrictsByProvince/", { LocationType: locationType, id: provinceId }, function (data) {
            fnSuccess(data);
        });
    },
    getSubDistricts: function (districtId, fnSuccess) {

        $.get(mapApi.getServerPath() + "/api/Map/GetSubDistricts/", {}, function (data) {
            fnSuccess(data);
        });
    },
    getSubDistrictsByDistrict: function (locationType, districtId, fnSuccess) {

        $.get(mapApi.getServerPath() + "/api/Map/GetSubDistrictsByDistrict/", { LocationType: locationType, id: districtId }, function (data) {
            fnSuccess(data);
        });
    },

    getProvinceShapByCode: function (shapeCriteria, fnSuccess) {
        $.get(mapApi.getServerPath() + "/api/Address/GetProvinceShapeBy", shapeCriteria, function (data) {
            fnSuccess(data);
        });
    },
    getProvinceShapeByID: function (shapeCriteria, fnSuccess) {
        try {
            $.get(mapApi.getServerPath() + "/api/Map/GetProvinceShapeByID", shapeCriteria, function (data) {
                fnSuccess(data);
            });
        } catch (e) {
            alert(e.message);
        }

    },
    getProvinceShapeByRegion: function (shapeCriteria, fnSuccess) {
        $.get(mapApi.getServerPath() + "/api/Map/GetProvinceShapeByRegion", shapeCriteria, function (data) {
            fnSuccess(data);
        });
    },
    getDistrictShapeByID: function (shapeCriteria, fnSuccess) {
        $.get(mapApi.getServerPath() + "/api/Map/GetDistrictShapeByID", shapeCriteria, function (data) {
            fnSuccess(data);
        });
    },
    getDistrictShapeByProvince: function (shapeCriteria, fnSuccess) {
        $.get(mapApi.getServerPath() + "/api/Map/GetDistrictShapeByProvince", shapeCriteria, function (data) {
            fnSuccess(data);
        });
    },
    getSubDistrictShapeByID: function (shapeCriteria, fnSuccess) {
        $.get(mapApi.getServerPath() + "/api/Map/GetSubDistrictShapeByID", shapeCriteria, function (data) {
            fnSuccess(data);
        });
    },
    getSubDistrictShapeByDistrict: function (shapeCriteria, fnSuccess) {
        $.get(mapApi.getServerPath() + "/api/Map/getSubDistrictShapeByDistrict", shapeCriteria, function (data) {
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


