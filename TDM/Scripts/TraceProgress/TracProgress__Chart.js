 
//=============================================== Control Chart ==========================================================

//=====================================  Bar Module 5 =================================================
//======= USER DEF =========

 
 
var textEmpty = '-ไม่มีข้อมูล-';

$(function () {
    DateTime();

    //=== Fix User ===
    var username = 'USER';
    var yearcode = 'Y2561';
    var documenttype = 'DC01';
    var province = '30';

    GetProvinceReportSummaryByDocumentType_Land(username, yearcode, 'DC01', province);
    GetProvinceReportSummaryByDocumentType_Condominium(username, yearcode, 'DC02', province);
    GetProvinceReportSummaryByDocumentType_Building(username, yearcode, 'DC03', province);
});

//ราคาที่ดิน
function GetProvinceReportSummaryByDocumentType_Land(username, yearcode, documenttype, province) {
    http.get("/api/TraceProgress/GetProvinceReportSummaryByDocumentType", { Username: username, YearCode: yearcode, DocumentType: documenttype, Province: province }, function (data) {
        //======= chartPie 1 =======
        if (data.length > 0) {
            $.each(data, function (indexRow, dataRow) {
                var dataPie = [{ value: dataRow.PercentSuccess, name: 'ดำเนินการแล้วเสร็จ' },
                        { value: dataRow.PercentNoAction, name: 'ยังไม่ดำเนินการ' },
                        { value: dataRow.PercentOnProcess, name: 'อยู่ระหว่างดำเนินการ' }];

                var dataBar = [dataRow.PercentSuccess, dataRow.PercentNoAction, dataRow.PercentOnProcess];
                var chartPie1 = echarts.init(document.getElementById('chartPie1'));

                optionPie1 = {
                    title: {
                        text: 'สถานะการประเมินราคาที่ดิน',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        left: 'center',
                        data: ['ดำเนินการแล้วเสร็จ', 'ยังไม่ดำเนินการ', 'อยู่ระหว่างดำเนินการ'],
                        y: '90%'
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: dataPie,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                chartPie1.setOption(optionPie1);

                //======= chartSpeedometer 1 =======
                var chartSpeedometer1 = echarts.init(document.getElementById('chartSpeedometer1'));
                optionchartSpeedometer1 = {
                    title: {
                        text: 'การแสดงความก้าวหน้าที่ดิน',
                        x: 'center'
                    },
                    tooltip: {
                        formatter: "{b} : {c}%"
                    },
                    series: [
                        {
                            name: 'การแสดงความก้าวหน้าที่ดิน',
                            type: 'gauge',
                            detail: { formatter: '{value}%' },
                            //data: [{ value: 70, name: '' }]
                            data: [{ value: dataRow.PercentSuccess, name: '' }]
                        }
                    ]
                };
                chartSpeedometer1.setOption(optionchartSpeedometer1);

                //====== chartBar1 =====
                var chart1 = echarts.init(document.getElementById('chartBar1'));
                var chartOptions1 = {
                    xAxis: {
                        type: 'category',
                        data: ['ดำเนินการแล้วเสร็จ', 'ยังไม่ดำเนินการ', 'อยู่ระหว่างดำเนินการ']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        //data: [100, 50, 23],
                        data: dataBar,
                        type: 'bar'
                    }]
                };
                chart1.setOption(chartOptions1);
                BuildTrafficLight(data[0].PercentSuccess, 'chartTrafficLight1');
                //GetRegion();
            });
        } else {
            $('#chartPie1').text(textEmpty);
            $('#chartPie1').css("line-height", "300px");
            $('#chartSpeedometer1').text(textEmpty);
            $('#chartSpeedometer1').css("line-height", "300px");
            $('#chartTrafficLight1').text(textEmpty);
            $('#chartTrafficLight1').css("line-height", "300px");
        }
    });
}

function GetProvinceReportSummaryByDocumentType_Condominium(username, yearcode, documenttype, province) {
    http.get("/api/TraceProgress/GetProvinceReportSummaryByDocumentType", { Username: username, YearCode: yearcode, DocumentType: documenttype, Province: province }, function (data) {
        //======= chartPie 2 =======

        $.each(data, function (indexRow, dataRow) {
            var dataPie = [{ value: dataRow.PercentSuccess, name: 'ดำเนินการแล้วเสร็จ' },
                    { value: dataRow.PercentNoAction, name: 'ยังไม่ดำเนินการ' },
                    { value: dataRow.PercentOnProcess, name: 'อยู่ระหว่างดำเนินการ' }];


            var dataBar = [dataRow.PercentSuccess, dataRow.PercentNoAction, dataRow.PercentOnProcess];

            var chartPie2 = echarts.init(document.getElementById('chartPie2'));
            optionPie2 = {
                title: {
                    text: 'สถานะการประเมินราคาอาคารชุด',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    left: 'center',
                    data: ['ดำเนินการแล้วเสร็จ', 'ยังไม่ดำเนินการ', 'อยู่ระหว่างดำเนินการ'],
                    y: '90%'
                },
                series: [
                    {
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        //data: [
                        //    { value: 100, name: 'ดำเนินการแล้วเสร็จ' },
                        //    { value: 50, name: 'ยังไม่ดำเนินการ' },
                        //    { value: 23, name: 'อยู่ระหว่างดำเนินการ' }

                        //],
                        data: dataPie,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            chartPie2.setOption(optionPie2);

            //======= chartSpeedometer 2 =======
            var chartSpeedometer2 = echarts.init(document.getElementById('chartSpeedometer2'));
            optionchartSpeedometer2 = {
                title: {
                    text: 'การแสดงความก้าวหน้าที่ดิน',
                    x: 'center'
                },
                tooltip: {
                    formatter: "{b} : {c}%"
                },
                series: [
                    {
                        name: 'การแสดงความก้าวหน้าที่ดิน',
                        type: 'gauge',
                        detail: { formatter: '{value}%' },
                        data: [{ value: dataRow.PercentSuccess, name: '' }]
                    }
                ]
            };
            chartSpeedometer2.setOption(optionchartSpeedometer2);


            //====== chartBar2 =====
            var chart2 = echarts.init(document.getElementById('chartBar2'));
            var chartOptions2 = {
                xAxis: {
                    type: 'category',
                    data: ['ดำเนินการแล้วเสร็จ', 'ยังไม่ดำเนินการ', 'อยู่ระหว่างดำเนินการ']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    //data: [100, 50, 23],
                    data: dataBar,
                    type: 'bar'
                }]
            };
            chart2.setOption(chartOptions2);
            BuildTrafficLight(data[0].PercentSuccess, 'chartTrafficLight2');
        });
    });
}

function GetProvinceReportSummaryByDocumentType_Building(username, yearcode, documenttype, province) {
    http.get("/api/TraceProgress/GetProvinceReportSummaryByDocumentType", { Username: username, YearCode: yearcode, DocumentType: documenttype, Province: province }, function (data) {
        //======= chartPie 3 =======
        $.each(data, function (indexRow, dataRow) {
            var dataPie = [{ value: dataRow.PercentSuccess, name: 'ดำเนินการแล้วเสร็จ' },
                    { value: dataRow.PercentNoAction, name: 'ยังไม่ดำเนินการ' },
                    { value: dataRow.PercentOnProcess, name: 'อยู่ระหว่างดำเนินการ' }];

            var dataBar = [dataRow.PercentSuccess, dataRow.PercentNoAction, dataRow.PercentOnProcess];

            var chartPie3 = echarts.init(document.getElementById('chartPie3'));
            optionPie3 = {
                title: {
                    text: 'สถานะการประเมินราคาสิ่งปลูกสร้าง',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    left: 'center',
                    data: ['ดำเนินการแล้วเสร็จ', 'ยังไม่ดำเนินการ', 'อยู่ระหว่างดำเนินการ'],
                    y: '90%'
                },
                series: [
                    {
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: dataPie,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            chartPie3.setOption(optionPie3);

            //======= chartSpeedometer 3 =======
            var chartSpeedometer3 = echarts.init(document.getElementById('chartSpeedometer3'));
            optionchartSpeedometer3 = {
                title: {
                    text: 'กราฟแสดงความก้าวหน้าของงาน',
                    x: 'center'
                },
                tooltip: {
                    formatter: "{b} : {c}%"
                },
                series: [
                    {
                        name: 'กราฟแสดงความก้าวหน้าของงาน',
                        type: 'gauge',
                        detail: { formatter: '{value}%' },
                        data: [{ value: dataRow.PercentSuccess, name: '' }]
                    }
                ]
            };
            chartSpeedometer3.setOption(optionchartSpeedometer3);


            //====== chartBar2 =====
            var chart3 = echarts.init(document.getElementById('chartBar3'));
            var chartOptions3 = {
                xAxis: {
                    type: 'category',
                    data: ['ดำเนินการแล้วเสร็จ', 'ยังไม่ดำเนินการ', 'อยู่ระหว่างดำเนินการ']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    //data: [100, 50, 23],
                    data: dataBar,
                    type: 'bar'
                }]
            };
            chart3.setOption(chartOptions3);
            BuildTrafficLight(data[0].PercentSuccess, 'chartTrafficLight3');
        });
    });
}

function BuildTrafficLight(PercentSuccess, chartName) {
    $('#' + chartName).empty();
    if (PercentSuccess != undefined && PercentSuccess.trim != "") {
        if (parseInt(PercentSuccess) > 75)
            $('#' + chartName).prepend('<img id="theImg" src="../assets/img/TrafficLights/Green.png" style="height:80%" />');
        else if (parseInt(PercentSuccess) > 50)
            $('#' + chartName).prepend('<img id="theImg" src="../assets/img/TrafficLights/Yellow.png" style="height:80%" />');
        else
            $('#' + chartName).prepend('<img id="theImg" src="../assets/img/TrafficLights/Red.png" style="height:80%" />');
    }
}

function DateTime() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var prefix_mm = today.getMonth() - 1;
    var next_mm = today.getMonth() + 2;

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    if (prefix_mm < 10) {
        prefix_mm = '0' + prefix_mm;
    }

    if (next_mm < 10) {
        next_mm = '0' + next_mm;
    }

    today = dd + '/' + mm + '/' + yyyy;

    var prefixmonth = dd + '/' + prefix_mm + '/' + yyyy;
    var nextmonth = dd + '/' + next_mm + '/' + yyyy;

    $('#dateOnlyStart').val(prefixmonth);
    $('#dateOnlyEnd').val(nextmonth);

    $('#timeOnlyStart').val('08:00');
    $('#timeOnlyEnd').val('18:00');
}





//======================================= Version Old =======================================
//=====================================  graph Tab 1 =================================================

//new Chart(document.getElementById("divgraph1_Chart1"), {
//    type: 'pie',
//    data: {
//        labels: ["ก", "ข", "ค"],
//        datasets: [{
//            label: "Population (millions)",
//            backgroundColor: ["#F7FE2E", "#8e5ea2"],
//            data: [25, 15, 60]
//        }]
//    },
//    options: {
//        title: {
//            display: true,
//            text: 'สถานะการประเมินราคาที่ดิน'
//        }
//    }
//});

//new Chart(document.getElementById("divgraph1_Chart2"), {
//    type: 'pie',
//    data: {
//        labels: ["ก", "ข"],
//        datasets: [{
//            label: "Population (millions)",
//            backgroundColor: ["#F7FE2E", "#8e5ea2"],
//            data: [20, 80]
//        }]
//    },
//    options: {
//        title: {
//            display: true,
//            text: 'สถานะการประเมินราคาอาคารชุด'
//        }
//    }
//});

//new Chart(document.getElementById("divgraph1_Chart3"), {
//    type: 'pie',
//    data: {
//        labels: ["ก", "ข", "ค", "ง"],
//        datasets: [{
//            label: "Population (millions)",
//            backgroundColor: ["#F7FE2E", "#8e5ea2", "#0B0B61"],
//            data: [50, 10, 10, 30]
//        }]
//    },
//    options: {
//        title: {
//            display: true,
//            text: 'สถานะการประเมินราคาสิ่งปลูกสร้าง'
//        }
//    }
//});





//http.get("/api/TraceProgress/GetTraceProgressByRegion", { Username: 'USER', YearCode: 'Y2561', DocumentType: 'DC01' }, function (data) {
//    var dataPercentSuccess = [];
//    var dataPercentOnProcess = [];
//    var dataPercentNoAction = [];

//    $.each(data, function (indexRow, dataRow) {
//        $.each(dataRow, function (index, data) {
//            if (index == 'PercentSuccess') {
//                dataPercentSuccess.push(data);
//            } else if (index == 'PercentOnProcess') {
//                dataPercentOnProcess.push(data);
//            } else if (index == 'PercentNoAction') {
//                dataPercentNoAction.push(data);
//            }
//        });
//    });

//    Chart.defaults.global.defaultFontFamily = "Kanit Light";
//    var densityCanvas = document.getElementById("divgraph1_ChartBar");
//    Chart.defaults.global.defaultFontSize = 18;
//    var data1 = {
//        label: 'ประเมินราคาเสร็จสิ้น (%)',
//        //data: [60, 40, 40, 50, 60, 70],
//        data: dataPercentSuccess,
//        backgroundColor: 'rgba(0,0,255,0.3)',
//        borderWidth: 0

//    };

//    var data2 = {
//        label: 'อยู่ระหว่างการประเมินราคา (%)',
//        //data: [40, 30, 20, 45, 50, 25],
//        data: dataPercentOnProcess,
//        backgroundColor: 'rgba(0,255,0,0.3)',
//        borderWidth: 0
//    };

//    var data3 = {
//        label: 'อยู่ไม่ได้ประเมินราคา (%)',
//        data: dataPercentNoAction,
//        backgroundColor: 'rgba(192,192,192,0.3)',
//        borderWidth: 0,

//    };

//    var planetData = {
//        labels: ["ภาคเหนือ", "ภาคตะวันออกเฉียงเหนือ", "ภาคตะวันตก", "ภาคกลาง", "ภาคตะวันออก", "ภาคใต้"],
//        datasets: [data1, data2, data3]
//    };

//    var chartOptions = {
//        scales: {
//            xAxes: [{
//                barPercentage: 1,
//                categoryPercentage: 0.6
//            }],
//            yAxes: [{
//                id: "y-axis-density"
//            }, {
//                id: "y-axis-gravity"
//            }]
//        }
//    };

//    var barChart = new Chart(densityCanvas, {
//        type: 'bar',
//        data: planetData,
//        options: chartOptions
//    });

//});


