﻿
var LocationType='1'
$(function () {

<<<<<<< HEAD
    LoadGraphView(null,null);
  
=======

>>>>>>> ec29944f7653ce33fcc471e5d3c0c864dc2e1290
    searchForm.initComp();

});

$(document).on("click", "#rdRegion", function () {
    DisplaySection2SearchRegionCluster(1)
});

$(document).on("click", "#rdCluster", function () {
    DisplaySection2SearchRegionCluster(2)

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

            $("body").append("<div id='overlay'><br/><br/><br/><br/><br/><br/><img style='display: block;margin-left: auto;margin-right: auto;' src='http://www.mytreedb.com/uploads/mytreedb/loader/ajax_loader_blue_64.gif' /></div>");

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

                   

                    $("#ddlProvince").change(function (event) {

                      
                        $("#ddlProvince2").empty();
                        var provinceId = $("#ddlProvince").val();
                        var proviceOption1 = $("#ddlProvince option:not([value='" + provinceId + "']):not([value='999999'])").clone();
                        //   var proviceOption2 = $("#ddlProvince option:not([value='" + provinceId + "'])").clone();

                       

                        
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


<<<<<<< HEAD
        var objSearch = {};


        objSearch = {
            SectionType: sectionType,
            Code: code,
            FromMonth: $('.ddlFromMonth').val(),
            FromYear: $('.ddlFromYear').val(),
            ToMonth: $('.ddlToMonth').val(),
            ToYear: $('.ddlToYear').val(),
            CondoName: $('.txtName').val()

        };


        $.ajax({
            url: rootUrl + "/api/PriceSys/GetCondoRegisterMenu2",
            type: "POST",
            data: JSON.stringify(objSearch),
            dataType: "json",
            contentType: 'application/json',
            success: function (data) {

             
                if (data != null && data.Table!=null) {
                    LoadTable(data.Table)
      
                }

                if (data != null && data.CondoLineGraphList != null) {
                    var yearMonthToArray = data.YearMonthList.map(x => x.MonthYearName);
                    LoadGraphView(yearMonthToArray, data.CondoLineGraphList);
                }


            }
        });
=======
>>>>>>> ec29944f7653ce33fcc471e5d3c0c864dc2e1290
    }
}


function LoadTable(data)
{

   
    var body = '';
    $(".divTable").empty();


    body += '<table class="table table-bordered table-striped tblInfo">';

    if (data != null && data.length > 0) {
        body += '<thead>';
        body += '<tr>';


        body += '<th scope="col" rowspan="2"  class="text-center" >ชื่ออาคารชุด</th>';
        body += '<th scope="col"  class="text-center"  colspan="' + (Object.keys(data[0]).length - 3) + '">ราคาซื้อขาย</th>';

        body += '</tr>';
        body += '<tr>';
        var col = 0;

        $.each(data, function (index, item) {
            $.each(item, function (key, val) {

                if (col > 2) {
                    body += '<th scope="col" class="text-center">' + key + '</th>';
                }
                col++;

            });

            return false;

        });


        body += '</tr>';
        body += '</thead>';
        body += '<tbody>';

        $.each(data, function (index, item) {

            body += '<tr>';
            col = 0;
            $.each(item, function (key, val) {

                if (col != 1 && col != 2) {
                    body += '<td>' + (val != null ? val : "") + '</td>';
                }
                col++;


            });
            body += '</tr>';
        });

        body += '</tbody>';

    }
    else {
        body += '<thead>';
        body += '<tr>';
        body += '<th scope="col"   class="text-center" >ชื่ออาคารชุด</th>';
        body += '</tr>';
        body += '</thead>';
        body += '<tbody>';
        body += '<tr><td>Not found</td></tr>';
        body += '</tbody>';
    }
        body += '</table>';
        $(".divTable").append(body);

        $(".divTable table").DataTable({ searching: false, info: false });
   

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
<<<<<<< HEAD
function LoadGraph1Display(months, newLandRegisters, LandRegisters) {

    var graph1 = echarts.init(document.getElementById('graph1'));

    var option = {
        title: {
            text: '',
            subtext: ''
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'none',
            }
        },
        legend: {
            data: ['จำนวนแปลงแบ่งแยกใหม่', 'จำนวนแปลงที่มีการซื้อขายจดทะเบียน']
        },
        toolbox: {
            show: false,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: months
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [

            {
                name: 'จำนวนแปลงแบ่งแยกใหม่',
                type: 'line',
                smooth: true,
                itemStyle: { normal: { areaStyle: { type: 'default' } } },
                data: newLandRegisters
            },
            {
                name: 'จำนวนแปลงที่มีการซื้อขายจดทะเบียน',
                type: 'line',
                smooth: true,
                itemStyle: { normal: { areaStyle: { type: 'default' } } },
                data: LandRegisters
            }
        ]
    };

    setTimeout(function () {
        graph1.setOption(option, true);


    }, 1000);

}


function LoadGraphView(YearMonthArray, CondoLineGraphList) {

    var graph1 = echarts.init(document.getElementById('graph1'));

    var condoNameList =CondoLineGraphList !=null? CondoLineGraphList.map(x => x.name):null;
    
    option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: condoNameList
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: false, type: ['line', 'bar', 'stack', 'tiled'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: YearMonthArray
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: CondoLineGraphList
    };



    /* option = {
         tooltip: {
             trigger: 'axis'
         },
         legend: {
             data: ['condo 1', 'condo 2', 'condo 3', 'condo 4', 'condo 5']
         },
         toolbox: {
             show: true,
             feature: {
                 mark: { show: true },
                 dataView: { show: true, readOnly: false },
                 magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                 restore: { show: true },
                 saveAsImage: { show: true }
             }
         },
         calculable: true,
         xAxis: [
             {
                 type: 'category',
                 boundaryGap: true,
                 data: ['ธค-60', 'มก-61', 'กพ-61', 'มีค-61', 'เมษา-61', 'พฤ-61', 'มิย-61']
             }
         ],
         yAxis: [
             {
                 type: 'value'
             }
         ],
         series: [
             {
                 name: 'condo 1',
                 type: 'line',
                 stack: 'test',
                 data: [120000, 130002, 100001, 134000, 90000, 230000, 210000]
             },
             {
                 name: 'condo 2',
                 type: 'line',
                 stack: 'test',
                 data: [220000, 182000, 191000, 234000, 290000, 330000, 310000]
             },
             {
                 name: 'condo 3',
                 type: 'line',
                 stack: 'test',
                 data: [150000, 232000, 201000, 154000, 190000, 330000, 410000]
             },
             {
                 name: 'condo 4',
                 type: 'line',
                 stack: 'test',
                 data: [320000, 332000, 301000, 334000, 390000, 330000, 320000]
             },
             {
                 name: 'condo 5',
                 type: 'line',
                 stack: 'test',
                 data: [320000, 332000, 301000, 334000, 390000, 330000, 320000]
             }
         ]
     };
     */

    setTimeout(function () {
        graph1.setOption(option, true);


    }, 1000);

}


function LoadGraph1() {

    var graph1 = echarts.init(document.getElementById('graph1'));

    option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['condo 1', 'condo 2', 'condo 3', 'condo 4', 'condo 5']
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: false, type: ['line', 'bar', 'stack', 'tiled'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: ['มค-61', 'กพ-61', 'มีค-61', 'เมษ-61', 'พฤ-61', 'มิย-61', 'กค-61']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'condo 1',
                type: 'line',
               
                data: [12000, 13200, 10100, 13400, 9000, 23000, 21000]
            },
            {
                name: 'condo 2',
                type: 'line',
              
                data: [22000, 18200, 19100, 23400, 29000, 33000, 31000]
            },
            {
                name: 'condo 3',
                type: 'line',
                
                data: [15000, 23200, 20100, 15400, 19000, 33000, 41000]
            },
            {
                name: 'condo 4',
                type: 'line',
               
                data: [32000, 33200, 30100, 33400, 39000, 33000, 32000]
            },
            {
                name: 'condo 5',
                type: 'line',
               
                data: [82000, 93200, 90100, 93400, 129000, 133000, 132000]
            }
        ]
    };



   /* option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['condo 1', 'condo 2', 'condo 3', 'condo 4', 'condo 5']
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: ['ธค-60', 'มก-61', 'กพ-61', 'มีค-61', 'เมษา-61', 'พฤ-61', 'มิย-61']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'condo 1',
                type: 'line',
                stack: 'test',
                data: [120000, 130002, 100001, 134000, 90000, 230000, 210000]
            },
            {
                name: 'condo 2',
                type: 'line',
                stack: 'test',
                data: [220000, 182000, 191000, 234000, 290000, 330000, 310000]
            },
            {
                name: 'condo 3',
                type: 'line',
                stack: 'test',
                data: [150000, 232000, 201000, 154000, 190000, 330000, 410000]
            },
            {
                name: 'condo 4',
                type: 'line',
                stack: 'test',
                data: [320000, 332000, 301000, 334000, 390000, 330000, 320000]
            },
            {
                name: 'condo 5',
                type: 'line',
                stack: 'test',
                data: [320000, 332000, 301000, 334000, 390000, 330000, 320000]
            }
        ]
    };
    */
=======
>>>>>>> ec29944f7653ce33fcc471e5d3c0c864dc2e1290


