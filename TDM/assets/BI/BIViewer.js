
var currentUrl = '/api/DBMgr/';
var chartMgrUrl = '/api/ChartMgr/';
$(document).ready(function () {

    LoadTemplateDropdownList();

    CMPLTADMIN_SETTINGS.windowBasedLayout();
    CMPLTADMIN_SETTINGS.mainMenu();
    CMPLTADMIN_SETTINGS.mainmenuCollapsed();
    CMPLTADMIN_SETTINGS.mainmenuScroll();
    CMPLTADMIN_SETTINGS.sectionBoxActions();
    /* LoadChart1();
     LoadChart2();
     LoadChart3();
     LoadChartCondo1();
     LoadChartCondo2();
     LoadChartCondo3();
     LoadChartBuilding1();*/
    CMPLTADMIN_SETTINGS.chatAPI();
    CMPLTADMIN_SETTINGS.chatApiScroll();
    CMPLTADMIN_SETTINGS.chatApiWindow();
    CMPLTADMIN_SETTINGS.breadcrumbAutoHidden();
});


var mapApi = {
    getServerPath: function () {
        return rootUrl;
        //return '';
    }
}


function LoadTemplateDropdownList()
{

    var data = {};
   
    $.get(mapApi.getServerPath()+chartMgrUrl + "/GetDropDownList", { Code:'TemplateHeader'}, function (data) {

        if (data != null && data.length > 0) {

            $.each(data, function (index, obj) {
                $("#ddlTemplate").append("<option value='" + obj.Value + "'>" + obj.Name + "</option>");
            });

               $("#ddlTemplate").prop('selectedIndex',0);
        }
    });
}
var resizeElement = [];

$(document).on("change", "#ddlTemplate", function () {
    var html = '';
    var divChartID = '';
    var keepChart;
    $(".divDisplay").empty();
    $.get(mapApi.getServerPath()+chartMgrUrl + "/GetGraphList", { TemplateID: $(this).val() }, function (data) {

        if (data != null && data.Charts.length > 0) {

            setTimeout(function () {

            $(".lbCaption").html('> '+data.Name);
            }, 400);
            
            $.each(data.Charts, function (index, chartData) {
                divChartID = 'divChart' + index;
                html = '';
                var xAxisData = JSON.parse(chartData.xAxisData);
                var yAxisData = JSON.parse(chartData.yAxisData);

                if (chartData.GraphID == '4') {
                    for (var i = 0; i < xAxisData.length; i++) {
                        html += ChartType[3].Option.ConvertToHTML(yAxisData[i], xAxisData[i], (chartData.Width == '' ? '6' : chartData.Width));

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

                            } else {
                                keepChart = ChartType[1].Option;
                                keepChart.yAxis[0].data = yAxisData;
                                keepChart.series[0].data = xAxisData;


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
                    LoadChart(keepChart, document.getElementById(divChartID));
                }
            });

          
           // window.onresize = draw;

           
        }
    });

});



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