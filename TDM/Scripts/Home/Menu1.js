
var LocationType = '1'

var regionObj = {
    "data": [
            { "name": "เลือกภาค", "value": "" },
          { "name": "ภาคกลาง", "value": "1" },
         { "name": "ภาคตะวันตก", "value": "2" },
         { "name": "ภาคเหนือ", "value": "3" },
         { "name": "ภาคตะวันออกเฉียงเหนือ", "value": "4" },
         { "name": "ภาคใต้", "value": "5" },
          { "name": "ภาคตะวันออก", "value": "6" }]
}

$(function () {

    LoadGraph1();
   LoadGraph2();
    searchForm.initComp();

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

            //$("body").append("<div id='overlay'><br/><br/><br/><br/><br/><br/><img style='display: block;margin-left: auto;margin-right: auto;' src='http://www.mytreedb.com/uploads/mytreedb/loader/ajax_loader_blue_64.gif' /></div>");

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

           
        }


    },
    search: function () {

        var sectionType = '';
        var code = '';
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


        var objSearch = {};


        objSearch = {
            SectionType: sectionType,
            code: code,
            Month: '',
            Year: $('#ddlYear').val()

        };


        $.ajax({
            url: rootUrl + "/api/PriceSys/GetRegisterLand",
            type: "POST",
            data: JSON.stringify(objSearch),
            dataType: "json",
            contentType: 'application/json',
            success: function (data) {

                var month = [];
                var newLandRegister = [];
                var LandRegister = [];
                if (data != null) {

                    setTimeout(function () {
                    $('.lbNewRegLand').text(data.summaryData.ParcelNewRegister);
                    $('.lbRegLand').text(data.summaryData.ParcelRegister);
                    $('.lbNewMonthRegLand').text(data.summaryData.ParcelMonthNewRegister);
                    $('.lbMonthRegLand').text(data.summaryData.ParcelMonthRegister);
                    }
        , 400);

                    var month = data.summaryByMonthData.map(x => x.MonthName);
                    var newLandRegister = data.summaryByMonthData.map(x => x.ParcelRegister);
                    var LandRegister = data.summaryByMonthData.map(x => x.ParcelNewRegister);

                    LoadGraph1Display(month, newLandRegister, LandRegister);
                    LoadGraph2Display(month, newLandRegister, LandRegister);
                }

               
            }
        });
    }
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
function LoadGraph2Display(months, newLandRegisters, LandRegisters) {

    var graph1 = echarts.init(document.getElementById('graph2'));

    var option = option = {
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
            data: ['จำนวนแปลงแบ่งแยกใหม่สะสมรายเดือน (แปลง)', 'จำนวนแปลงที่มีการซื้อขายจดทะเบียนสะสมรายเดือน (แปลง)']
        },
        toolbox: {
            show: false,
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
                type: 'category',
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
                name: 'จำนวนแปลงแบ่งแยกใหม่สะสมรายเดือน (แปลง)',
                type: 'bar',
                data: newLandRegisters,
                markPoint: {
                    data: [

                    ]
                },
                markLine: {

                }
            },
            {
                name: 'จำนวนแปลงที่มีการซื้อขายจดทะเบียนสะสมรายเดือน (แปลง)',
                type: 'bar',
                data: LandRegisters,
                markPoint: {
                    data: [

                    ]
                },
                markLine: {

                }
            }
        ]
    };


    setTimeout(function () {
        graph1.setOption(option, true);


    }, 1000);

}


function LoadGraph1()
{

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
                data: ['มค.', 'กพ.', 'มค.', 'มย.', 'พค.', 'มิย.', 'กค.', 'สค.', 'กย.', 'ตค.', 'พฤ.', 'ธค.']
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
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: 'จำนวนแปลงที่มีการซื้อขายจดทะเบียน',
                type: 'line',
                smooth: true,
                itemStyle: { normal: { areaStyle: { type: 'default' } } },
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        ]
    };

    setTimeout(function () {
        graph1.setOption(option,true);


    }, 1000);
   
}

function LoadGraph2() {

    var graph1 = echarts.init(document.getElementById('graph2'));

    var option = option = {
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
            data: ['จำนวนแปลงแบ่งแยกใหม่สะสมรายเดือน (แปลง)', 'จำนวนแปลงที่มีการซื้อขายจดทะเบียนสะสมรายเดือน (แปลง)']
        },
        toolbox: {
            show: false,
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
                type: 'category',
                data: ['มค.', 'กพ.', 'มค.', 'มย.', 'พค.', 'มิย.', 'กค.', 'สค.', 'กย.', 'ตค.', 'พฤ.', 'ธค.']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'จำนวนแปลงแบ่งแยกใหม่สะสมรายเดือน (แปลง)',
                type: 'bar',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                markPoint: {
                    data: [
                      
                    ]
                },
                markLine: {
                  
                }
            },
            {
                name: 'จำนวนแปลงที่มีการซื้อขายจดทะเบียนสะสมรายเดือน (แปลง)',
                type: 'bar',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                markPoint: {
                    data: [
                       
                    ]
                },
                markLine: {
                   
                }
            }
        ]
    };


    setTimeout(function () {
        graph1.setOption(option, true);


    }, 1000);

}