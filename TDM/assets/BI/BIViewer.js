
var currentUrl = '/api/DBMgr/';
var chartMgrUrl = '/api/ChartMgr/';
var chartList = [];
$(document).ready(function () {

    LoadTemplateDropdownList();

  /*   CMPLTADMIN_SETTINGS.windowBasedLayout();
    CMPLTADMIN_SETTINGS.mainMenu();
    CMPLTADMIN_SETTINGS.mainmenuCollapsed();
    CMPLTADMIN_SETTINGS.mainmenuScroll();
    CMPLTADMIN_SETTINGS.sectionBoxActions();
    LoadChart1();
     LoadChart2();
     LoadChart3();
     LoadChartCondo1();
     LoadChartCondo2();
     LoadChartCondo3();
     LoadChartBuilding1();
    CMPLTADMIN_SETTINGS.chatAPI();
    CMPLTADMIN_SETTINGS.chatApiScroll();
    CMPLTADMIN_SETTINGS.chatApiWindow();
    CMPLTADMIN_SETTINGS.breadcrumbAutoHidden();*/
});


var mapApi = {
    getServerPath: function () {
        return rootUrl;
        //return '';
    }
}

$(window).on('resize', function () {
    if (chartList != null && chartList != undefined) {

        $.each(chartList, function (key, chartItem) {
            chartItem.resize();
        });
       
    }
});


function LoadTemplateDropdownList()
{

    var data = {};

    $(".BIMenu1").empty();
    $(".BIMenu2").empty();
    $(".BIMenu3").empty();
    $(".BIMenu4").empty();
    $(".BIMenu5").empty();
   
   


    $.get(mapApi.getServerPath()+chartMgrUrl + "/GetDropDownList", { Code:'TemplateHeader'}, function (data) {

        if (data != null && data.length > 0) {

            $.each(data, function (index, obj) {
                $(".ddlTemplateView").append("<option value='" + obj.Value + "'>" + obj.Name + "</option>");
                $(".ddlTemplate").append("<option value='" + obj.Value + "'>" + obj.Name + "</option>");

               // $(".menu2SelectMenu").append('<div class="col-md-3"><div class="card  btnMenu zoom" data="' + obj.Value+'" style="background-color:' + colorList[index]+'"><div class="card-body"><div class="row align-items-center"><div class="col-xs-9"> <h3 class="card-title ">' + obj.Name + '</h3></div><div class="col-xs-3"><i class=" fa fa-folder-open text-light fa-2x"></i> </div></div></div></div></div>');

                $(".BIMenu" + obj.Type).append('<div class="col-md-3"><div class="card  btnMenu zoom" data="' + obj.Value + '" style="background-color:' + colorList[index] + '"><div class="card-body"><div class="row align-items-center"><div class="col-xs-9"> <h3 class="card-title ">' + obj.Name + '</h3></div><div class="col-xs-3"><i class=" fa fa-folder-open text-light fa-2x"></i> </div></div></div><div class="footer"><span class="text-light">' + obj.CreateDate + '</span></div></div></div>');

            });

            $(".ddlTemplateView").prop('selectedIndex', 1);
            $(".ddlTemplateView").trigger("change");
           
            $(".menu2Modal").modal("show");
        }

         
    });

   
}
var resizeElement = [];



$(document).on("click", ".btnMenu", function (e) {

    var html = '';
    var divChartID = '';
    var keepChart;
    $(".divDisplay").empty();
    $.get(mapApi.getServerPath() + chartMgrUrl + "/GetGraphList", { TemplateID: $(this).attr("data") }, function (data) {

        if (data != null && data.Charts.length > 0) {

            setTimeout(function () {

                $(".lbCaption").html('> ' + data.Name);
            }, 400);

            chartList = [];

            $.each(data.Charts, function (index, chartData) {
                divChartID = 'divChart' + index;
                html = '';
                var xAxisData = JSON.parse(chartData.xAxisData);
                var yAxisData = JSON.parse(chartData.yAxisData);
                var xAxisData2 = JSON.parse(chartData.xAxisData2);
                var yAxisData2 = JSON.parse(chartData.yAxisData2);

                if (chartData.GraphID == '4') {
                    for (var i = 0; i < xAxisData.length; i++) {
                        html += ChartType[3].Option.ConvertToHTML(yAxisData[i], xAxisData[i], null, (chartData.Width == '' ? '6' : chartData.Width));

                    }

                    html = '  <div class="clearfix"></div><div class="row">' + html + '</div>'
                    $(".divDisplay").append(html);
                }
                else {

                    html += '<div class="col-xs-' + (chartData.Width == '' ? '6' : chartData.Width) + '">';
                    html += '<section class="box">'
                    html += '<div class="content-body">'
                    html += '<div id="' + divChartID + '" style="height:400px;"></div>';
                    html += '</div>';
                    html += '</section>';
                    html += '</div>';
                    $(".divDisplay").append(html);






                    switch (chartData.GraphID) {

                        case '1':

                            if (typeof yAxisData[0] == 'number') {
                                keepChart = ChartType[0].Option;
                                keepChart.xAxis[0].data = xAxisData;
                                keepChart.series[0].data = yAxisData;
                                keepChart.series[0].name = chartData.yCaption;
                                if (yAxisData2 != null) {
                                    keepChart.series[1].name = chartData.y2Caption;
                                    keepChart.series[1].data = yAxisData2;
                                } else {
                                    keepChart.series[1].name = "";
                                    keepChart.series[1].data = null;
                                }

                            } else {
                                keepChart = ChartType[1].Option;
                                keepChart.yAxis[0].data = yAxisData;
                                keepChart.series[0].data = xAxisData;
                                keepChart.series[0].name = chartData.xCaption;
                                if (xAxisData2 != null) {
                                    keepChart.series[1].name = chartData.x2Caption;
                                    keepChart.series[1].data = xAxisData2;
                                } else {
                                    keepChart.series[1].name = "";
                                    keepChart.series[1].data = null;
                                }

                            }



                            break;
                        case '3':

                            var series = [];

                            for (var i = 0; i < xAxisData.length; i++) {

                                series.push({ value: yAxisData[i], name: xAxisData[i] });
                            }


                            keepChart = ChartType[2].Option;
                            keepChart.legend.data = xAxisData;
                            keepChart.series[0].data = series;
                            break;
                    }

                    keepChart.title.text = chartData.Title;



                    // window.onresize = chartLoad.resize;
                    var chartTemp = LoadChart(keepChart, document.getElementById(divChartID));

                    chartList.push(chartTemp);
                }
            });


            // window.onresize = draw;


        }
    });

    $(".menu2Modal").modal("hide");
    e.stopPropagation();

});
$(document).on("change", ".ddlTemplateView,.ddlTemplate", function (e) {
    var html = '';
    var divChartID = '';
    var keepChart;
    $(".divDisplay").empty();
    $.get(mapApi.getServerPath()+chartMgrUrl + "/GetGraphList", { TemplateID: $(this).val() }, function (data) {

        if (data != null && data.Charts.length > 0) {

            setTimeout(function () {

            $(".lbCaption").html('> '+data.Name);
            }, 400);

            chartList = [];
            
            $.each(data.Charts, function (index, chartData) {
                divChartID = 'divChart' + index;
                html = '';
                var xAxisData = JSON.parse(chartData.xAxisData);
                var yAxisData = JSON.parse(chartData.yAxisData);
                var xAxisData2 = JSON.parse(chartData.xAxisData2);
                var yAxisData2 = JSON.parse(chartData.yAxisData2);

                if (chartData.GraphID == '4') {
                    for (var i = 0; i < xAxisData.length; i++) {
                        html += ChartType[3].Option.ConvertToHTML(yAxisData[i], xAxisData[i],null, (chartData.Width == '' ? '6' : chartData.Width));

                    }

                    html = '  <div class="clearfix"></div><div class="row">' + html+'</div>'
                    $(".divDisplay").append(html);
                }
                else {

                    html += '<div class="col-xs-' + (chartData.Width == '' ? '6' : chartData.Width)+'">';
                    html += '<section class="box">'
                    html += '<div class="content-body">'
                    html += '<div id="' + divChartID + '" style="height:400px;"></div>';
                    html += '</div>';
                    html += '</section>';
                    html += '</div>';
                    $(".divDisplay").append(html);


                



                    switch (chartData.GraphID) {

                        case '1':

                            if (typeof yAxisData[0] == 'number') {
                                keepChart = ChartType[0].Option;
                                keepChart.xAxis[0].data = xAxisData;
                                keepChart.series[0].data = yAxisData;
                                keepChart.series[0].name = chartData.yCaption;
                                if (yAxisData2 != null) {
                                    keepChart.series[1].name = chartData.y2Caption;
                                    keepChart.series[1].data = yAxisData2;
                                } else {
                                    keepChart.series[1].name = "";
                                    keepChart.series[1].data = null;
                                }

                            } else {
                                keepChart = ChartType[1].Option;
                                keepChart.yAxis[0].data = yAxisData;
                                keepChart.series[0].data = xAxisData;
                                keepChart.series[0].name = chartData.xCaption;
                                if (xAxisData2 != null) {
                                    keepChart.series[1].name = chartData.x2Caption;
                                    keepChart.series[1].data = xAxisData2;
                                } else {
                                    keepChart.series[1].name = "";
                                    keepChart.series[1].data = null;
                                }

                            }



                            break;
                        case '3':

                            var series = [];

                            for (var i = 0; i < xAxisData.length; i++) {

                                series.push({ value: yAxisData[i], name: xAxisData[i] });
                            }


                            keepChart = ChartType[2].Option;
                            keepChart.legend.data = xAxisData;
                            keepChart.series[0].data = series;
                            break;
                    }

                    keepChart.title.text = chartData.Title;



                    // window.onresize = chartLoad.resize;
                  var chartTemp=  LoadChart(keepChart, document.getElementById(divChartID));

                    chartList.push(chartTemp);
                }
            });

          
           // window.onresize = draw;

           
        }
    });
    e.stopPropagation();
});



function LoadChart(Option, divChart) {
    var chartLoad = echarts.init(divChart);
    var option = Option;

    chartLoad.setOption(option, true);
    window.onresize = chartLoad.resize;

    return chartLoad;



   // setTimeout(function () {
   //     chartLoad.setOption(option, true);
        // chartLoad.on("click", ChartCallBack);


   // }, 1000);
}