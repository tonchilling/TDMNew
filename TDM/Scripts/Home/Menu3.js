
var LocationType = '1'
var SectionProvince =null;
var SectionAmphure = null;
var SectionTumbol = null;

var labelOption = {
    normal: {
        position: 'top',
        show: true
    }
};


var colorList = [
    '#D7504B', '#B5C334', '#26C0C0', '#E87C25', '#27727B',
    '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
    '#C6E579', '#C1232B', '#F4E001', '#F0805A', '#FCCE10'
];


var posList = [
    'left', 'right', 'top', 'bottom',
    'inside',
    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
];


var land_chart1_region = {
    "data": ['ไตรมาส 1', 'ไตรมาส 2', 'ไตรมาส 3', 'ไตรมาส 4'],
    "display": [],
    "value": [
        { value: 550000, name: 'ไตรมาส 1' },
        { value: 200000, name: 'ไตรมาส 2' },
        { value: 120000, name: 'ไตรมาส 3' },
        { value: 300000, name: 'ไตรมาส 4' }],
    "value2": [
        { value: 600000, name: 'ไตรมาส 1' },
        { value: 230000, name: 'ไตรมาส 2' },
        { value: 150000, name: 'ไตรมาส 3' },
        { value: 400000, name: 'ไตรมาส 4' }]
    ,
    "value3": [
        { value: 600000, name: 'ไตรมาส 1' },
        { value: 230000, name: 'ไตรมาส 2' },
        { value: 150000, name: 'ไตรมาส 3' },
        { value: 400000, name: 'ไตรมาส 4' }],
"value4": [
    { value: 600000, name: 'ไตรมาส 1' },
    { value: 230000, name: 'ไตรมาส 2' },
    { value: 150000, name: 'ไตรมาส 3' },
    { value: 400000, name: 'ไตรมาส 4' }]
};

ChartOption = {
    color: ['#006699', '#4cabce', '#003366', '#e5323e'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: land_chart1_region.data
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
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
            axisTick: { show: false },
            data: land_chart1_region.display
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: 'ไตรมาส 1',
            type: 'bar',
            barGap: 0,
            label: labelOption,

            itemStyle: {
                normal: {
                    color: function (params) {
                        return colorList[0]
                        // return colorList[params.dataIndex]
                    }
                }
            },
            data: null
        },
        {
            name: 'ไตรมาส 2',
            type: 'bar',
            label: labelOption,
            itemStyle: {
                normal: {
                    color: function (params) {
                        return colorList[1]
                        // return colorList[params.dataIndex]
                    }
                }
            },
            data: null
        },
        {
            name: 'ไตรมาส 3',
            type: 'bar',
            label: labelOption,
            itemStyle: {
                normal: {
                    color: function (params) {
                        return colorList[2]
                        // return colorList[params.dataIndex]
                    }
                }
            },
            data: null
        },
        {
            name: 'ไตรมาส 4',
            type: 'bar',
            label: labelOption,
            itemStyle: {
                normal: {
                    color: function (params) {
                        return colorList[3]
                        // return colorList[params.dataIndex]
                    }
                }
            },
            data: null
        }
    ]
};


$(function () {



    $.get(mapApi.getServerPath() + "/api/PriceSys/GetDropDownList", { Code: 'land' }, function (data) {
        $("#ddlYear").empty();
        if (data != null && data.length > 0) {

         
            $("#ddlYear").append("<option value=''>เลือกทั้งหมด</option>");
            $.each(data, function (index, row) {
                $("#ddlYear").append(`<option value="${row.Value}">${row.Name}</option>`);
            });

            $("#ddlYear").val(currentYear);
            


        }
    });


    LoadAddress();


   

  /*  CMPLTADMIN_SETTINGS.windowBasedLayout();
    CMPLTADMIN_SETTINGS.mainMenu();
    CMPLTADMIN_SETTINGS.mainmenuCollapsed();
    CMPLTADMIN_SETTINGS.mainmenuScroll();
    CMPLTADMIN_SETTINGS.sectionBoxActions();
    CMPLTADMIN_SETTINGS.chatAPI();
    CMPLTADMIN_SETTINGS.chatApiScroll();
    CMPLTADMIN_SETTINGS.chatApiWindow();
    CMPLTADMIN_SETTINGS.breadcrumbAutoHidden();
    */
    searchForm.initComp();
    $("#ddlProvince1").selectpicker({
        liveSearch: true,
        size: 10,
    });
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
        proviceOption1 = $("#ddlProvince1 option:not([value='" + $(this).val() + "']):not([value='999999']):not([value=''])").clone();
    }



});




function LoadAddress() {

    //  $('#ddlProvince').empty();
    //$('#ddlDistrict').empty();
    //$('#ddlSubdistrict').empty();


    $('#ddlRegion').prop('disabled', true);
    $("#ddlProvince").prop('disabled', true);
    $('#ddlDistrict').prop('disabled', true);
    $('#ddlSubdistrict').prop('disabled', true);
    $.get(mapApi.getServerPath() + "/api/Address/GetAddressList", function (addressList) {

        SectionProvince = addressList.ProvinceList;
        SectionAmphure = addressList.AmphoeList;
        SectionTumbol = addressList.TambolList;

       
        $('#ddlRegion').prop('disabled', false);
        $("#ddlProvince").prop('disabled', false);
        $('#ddlDistrict').prop('disabled', false);
        $('#ddlSubdistrict').prop('disabled', false);
        $('#ddlRegion').trigger("change");
    });

}



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

    $("#ddlRegion").append("<option value=''>เลือกครัสเตอร์</option>");
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

        LoadChart(ChartOption, document.getElementById('chart1'));
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

           // map.clear();
        });


        $('#ddlProvince').empty();
        $('#ddlProvince').append("<option value='999999'>ทั้งหมด</option>");





        $('#ddlRegion').change(function (event) {

            var regionId = $('#ddlRegion').val();
            console.debug("#ddlRegion change ");

            $('#ddlProvince').empty();
            $('#ddlProvince1').empty();

            $('#ddlProvince').append("<option value=''>เลือกจังหวัด</option>");



            if (SectionProvince != null && SectionProvince.length > 0) {
                $('#ddlProvince').empty();
                $('#ddlProvince').append("<option value=''>เลือกจังหวัด</option>");


                if (regionId == "") {

                    $.each(SectionProvince, function (index, province) {
                        $("#ddlProvince").append("<option value='" + province.PRO_C + "'>" + province.NAME_T + "</option>");
                    });

                    var proviceOption1 = $("#ddlProvince option").clone();
                    $("#ddlProvince1").empty();

                    $("#ddlProvince1").append(proviceOption1);

                    $("#ddlProvince1").selectpicker('refresh');
                }
                /// Load by Region Code
                else if (LocationType == "1") {
                    $.each(SectionProvince.filter(p => p.RegionCode == regionId), function (index, province) {
                        $("#ddlProvince").append("<option value='" + province.PRO_C + "'>" + province.NAME_T + "</option>");
                    });

                    var proviceOption1 = $("#ddlProvince option").clone();
                    $("#ddlProvince1").empty();

                    $("#ddlProvince1").append(proviceOption1);

                    $("#ddlProvince1").selectpicker("refresh");
                   /* $("#ddlProvince1").selectpicker({
                        liveSearch: true,
                        size: 5,
                    });*/
                }


                /// Load by Cluster Code
                else if (LocationType == "2") {
                    $.each(SectionProvince.filter(p => p.ClusterCode == regionId), function (index, province) {
                        $("#ddlProvince").append("<option value='" + province.PRO_C + "'>" + province.NAME_T + "</option>");
                    });
                }

           

              //  if (provincecode != null)
                  //  $('#ddlProvince').val(provincecode);

                var proviceOption1 = $("#ddlProvince option").clone();


                $("#ddlProvince1").empty();
                $("#ddlProvince1").append(proviceOption1);
                $("#ddlProvince1").selectpicker({
                    liveSearch: true,
                    size: 5,
                });


              


            }



         

            event.stopPropagation();
        });


        $("#ddlProvince").change(function (event) {

            $("#ddlProvince1").empty();

            var provinceId = $("#ddlProvince").val();
            var proviceOption1 = $("#ddlProvince option:not([value='" + provinceId + "']):not([value='999999']):not([value=''])").clone();

            $("#ddlProvince1").append(proviceOption1);
            $("#ddlProvince1").selectpicker("refresh");
           /* $("#ddlProvince1").selectpicker({
                liveSearch: true,
                size: 5,
            });*/

        });

       
     


       

    },
    switchMode: function (mode) {
        if (_mapCurrModule == mode) {
            return;
        } else {
            if (mode < 1 || mode > 2) {
                mode = 1;
            }
            _mapCurrModule = mode;

           // map.clear();
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
            //    map.clear();
                
                if (data != null && data.MapInfoList != null) {
                    try {
                    //    TransformMap(data.MapInfoList, objSearch.ProvinceCodeCompare1.split(","));
                    } catch (e) {
                        alert(e.message);
                    }
                    //TransformMap(data.MapInfoList);
                    
                }
                if (data != null && data.DataList != null) {
                    LoadTable(data.DataList)

                    ChartOption.xAxis[0].data = $.map(data.MapInfoList, function (n, i) {
                        return n.ProvinceName;
                    });
                    ChartOption.series[0].data = $.map(data.MapInfoList, function (n, i) {
                        return n.Q1MaxPrice;
                    });
                    ChartOption.series[1].data = $.map(data.MapInfoList, function (n, i) {
                        return n.Q2MaxPrice;
                    });
                    ChartOption.series[2].data = $.map(data.MapInfoList, function (n, i) {
                        return n.Q3MaxPrice;
                    });
                    ChartOption.series[3].data = $.map(data.MapInfoList, function (n, i) {
                        return n.Q4MaxPrice;
                    });
                    LoadChart(ChartOption, document.getElementById('chart1'));

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
    },
    getPolygonSymbolByGroup: function (isComparison) {
        return {
            "type": "esriSFS",
            "style": "esriSFSSolid",
            "color": (isComparison) ? [255, 102, 255] : [0, 153, 76],
            "outline": {
                "type": "esriSLS",
                "style": "esriSLSSolid",
                "color": [0, 0, 0, 255],
                "width": 1
            }
        };
    }
}

function TransformMap(data) {
    TransformMap(data,null)
}
function TransformMap(data,compareList)
{

    var sridIn = 32647;
    var sridOut = [102100];
    var trans;
    //map.clear();
    if (data != null) {
        if (data != null && data.length > 0) {
            $.each(data, function (index, item) {
                if (item.Shape) {

                    var targetShape = item.Shape;
                    if (item.Shape.indexOf(';') !== -1) {
                        targetShape = item.Shape.split(';')[1];
                    }
                    var symbol = null;
                    if (compareList == null) {
                        
                        symbol = TDMap.getPolygonSymbol();
                    } else {
                        
                        symbol = TDMap.getPolygonSymbolByGroup(compareList.includes(item.ProvinceCode));
                    }

                    map.addGraphic(targetShape, symbol);
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

    body += '<table class="table table-bordered table-striped">';
    body += '<thead>';
    body += '<tr  class="bg-info">';
    body += '<th scope="col" class="center">จังหวัด</th>';
    body += '<th scope="col" class="center">ช่วงเวลา</th>';
    body += '<th scope="col" class="center">SA/Ratio<br>สูงสุด</th>';
    body += '<th scope="col" class="center">SA/Ratio<br>ต่ำสุด</th>';
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
                body += '<td class="text-right">' + item.MaxPrice + '</td>';
                body += '<td class="text-right">' + item.MinPrice + '</td>';
             
                body += '<td class="text-right">' + item.AvgPrice + '</td>';

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


function LoadChart(Option, divChart) {
    var chartLoad = echarts.init(divChart);
    var option = Option;

    chartLoad.setOption(option, true);
    window.onresize = chartLoad.resize;





    // setTimeout(function () {
    //     chartLoad.setOption(option, true);
    // chartLoad.on("click", ChartCallBack);


    // }, 1000);
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
    getProvincesAll: function (locationType, regionId, fnSuccess) {

        $.get(mapApi.getServerPath() + "/api/Map/GetProvinces", function (provinces) {
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



function compare(a, b) {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}







