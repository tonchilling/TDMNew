

/******************************
 initialize respective scripts 
 *****************************/
$(document).ready(function () {

    $("#ddlType").val(['1', '2', '3']);
    $("#ddlType").selectpicker('refresh')
    $("#ddlProvince1").selectpicker('refresh').trigger('change');

    initialData();
    CMPLTADMIN_SETTINGS.windowBasedLayout();
    // CMPLTADMIN_SETTINGS.mainMenu();
    //  CMPLTADMIN_SETTINGS.mainmenuCollapsed();
    // CMPLTADMIN_SETTINGS.mainmenuScroll();

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
    CMPLTADMIN_SETTINGS.breadcrumbAutoHidden();

});

function LoadChart1() {
    var option = {
        title: {
            text: 'ราคาประเมินที่ดิน',
            subtext: 'สูงสุด',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            show: false,
            data: ['กรุงเทพ', 'นนทบุรี', 'ปทุมธานี', 'นครปฐม', 'สมุทปราการ']
        },
        toolbox: {
            show: false,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'left',
                            max: 1548
                        }
                    }
                },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        series: [
            {
                name: 'ราคาสูงสุด',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: 'นนทบุรี' },
                    { value: 310, name: 'ปทุมธานี' },
                    { value: 234, name: 'นครปฐม' },
                    { value: 135, name: 'สมุทปราการ' },
                    { value: 1548, name: 'กรุงเทพ' }
                ]
            }
        ]
    };

    LoadChart(option, document.getElementById('chart1'))
}

function LoadChart2() {
    var option = {
        title: {
            text: 'ราคาซื้อขายที่ดิน',
            subtext: 'สูงสุด',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            show: false,
            data: ['กรุงเทพ', 'นนทบุรี', 'ปทุมธานี', 'นครปฐม', 'สมุทปราการ']
        },
        toolbox: {
            show: false,
            feature: {
                mark: { show: false },
                dataView: { show: false, readOnly: false },
                magicType: {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'left',
                            max: 1548
                        }
                    }
                },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        series: [
            {
                name: 'ราคาสูงสุด',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 635, name: 'นนทบุรี' },
                    { value: 310, name: 'ปทุมธานี' },
                    { value: 234, name: 'นครปฐม' },
                    { value: 335, name: 'สมุทปราการ' },
                    { value: 1048, name: 'กรุงเทพ' }
                ]
            }
        ]
    };

    LoadChart(option, document.getElementById('chart2'))
}


function LoadChart3() {
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
            data: ['ราคาประเมิน', 'ราคาซื้อขาย']
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
                data: ['เขตสาธร', 'เขตบางรัก', 'เขตดินแดง', 'เขตจตุจักร', 'บางกระปิ']
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: false,
            }
        ],
        series: [
            {
                name: 'ราคาประเมิน',
                type: 'bar',
                data: [1000000, 300000, 400000, 230000, 450000],
                markPoint: {
                    data: [

                    ]
                },
                markLine: {

                },
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#B5C334'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: false,
                            position: 'top',
                            formatter: '{c}'
                            /*  formatter: '{b}\n{c}'*/
                        }
                    }
                }
            },
            {
                name: 'ราคาซื้อขาย',
                type: 'bar',
                data: [9000000, 200000, 300000, 200000, 400000],
                markPoint: {
                    data: [

                    ]
                },
                markLine: {

                },
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#C1232B'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: false,
                            position: 'top',
                            formatter: '{c}'
                        }
                    }
                }
            }
        ]
    };

    LoadChart(option, document.getElementById('chart3'))
}


function LoadChartCondo1() {
    var option = {
        title: {
            text: 'ราคาอาคารชุด',
            subtext: 'สูงสุด',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            show: false,
            data: ['กรุงเทพ', 'นนทบุรี', 'ปทุมธานี', 'นครปฐม', 'สมุทปราการ']
        },
        toolbox: {
            show: false,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'left',
                            max: 1548
                        }
                    }
                },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        series: [
            {
                name: 'ราคาสูงสุด',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: 'นนทบุรี' },
                    { value: 310, name: 'ปทุมธานี' },
                    { value: 234, name: 'นครปฐม' },
                    { value: 135, name: 'สมุทปราการ' },
                    { value: 1548, name: 'กรุงเทพ' }
                ]
            }
        ]
    };

    LoadChart(option, document.getElementById('chartCondo1'))
}

function LoadChartCondo2() {
    var labelTop = {
        normal: {
            label: {
                show: true,
                position: 'center',
                formatter: '{b}',
                textStyle: {
                    baseline: 'bottom'
                }
            },
            labelLine: {
                show: false
            }
        }
    };
    var labelFromatter = {
        normal: {
            label: {
                formatter: function (params) {
                    return params.value
                },
                textStyle: {
                    baseline: 'top'
                }
            }
        },
    }
    var labelBottom = {
        normal: {
            color: '#A8EB12',
            label: {
                show: true,
                position: 'center'
            },
            labelLine: {
                show: false
            }
        },
        emphasis: {
            color: '#93CD10'
        }
    };
    var radius = [70, 85];

    var option = {
        legend: {
            x: 'left',
            y: 'center',
            data: [
                'คอนโด 1'
            ]
        },
        title: {
            text: 'ราคาอาคารชุดสูงสุด',
            subtext: '',
            x: 'center'
        },
        toolbox: {
            show: false,
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: {
                    show: true,
                    type: ['funnel'],
                    option: {
                        funnel: {
                            width: '100%',
                            height: '100%',
                            itemStyle: {
                                normal: {
                                    label: {
                                        formatter: function (params) {
                                            return ''
                                        },
                                        textStyle: {
                                            baseline: 'middle'
                                        }
                                    }
                                },
                            }
                        }
                    }
                },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                type: 'pie',
                center: ['50%', '50%'],
                radius: radius,
                x: '0%', // for funnel
                itemStyle: labelFromatter,
                data: [
                    { name: 'คอนโด 1', value: 500000, itemStyle: labelBottom },
                    { name: 'other', value: 200000, itemStyle: labelTop }

                ]
            }
        ]
    };
    LoadChart(option, document.getElementById('chartCondo2'))

}

function LoadChartCondo3() {
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
            data: ['ราคาสูงสุด', 'ราคาต่ำสุด']
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
                data: ['เขตสาธร', 'เขตบางรัก', 'เขตดินแดง', 'เขตจตุจักร', 'บางกระปิ']
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: false,
            }
        ],
        series: [

            {
                name: 'ราคาสูงสุด',
                type: 'bar',
                data: [1000000, 500000, 400000, 230000, 550000],
                markPoint: {
                    data: [

                    ]
                },
                markLine: {

                },
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#B5C334'
                            ];
                            return colorList[params.dataIndex]
                        },
                        emphasis: {
                            color: '#93CD10'
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}'
                            /*  formatter: '{b}\n{c}'*/
                        }
                    }
                }
            },
            {
                name: 'ราคาต่ำสุด',
                type: 'bar',
                data: [200000, 100000, 130000, 130000, 150000],
                markPoint: {
                    data: [

                    ]
                },

                markLine: {

                },
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#C1232B'
                            ];
                            return colorList[params.dataIndex]
                        },
                        emphasis: {
                            color: '#93CD10'
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}'
                        }
                    }
                }
            }
        ]
    };

    LoadChart(option, document.getElementById('chartCondo3'))
}



function LoadChartBuilding1() {


    var colorList = [
        '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
        '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0'
    ];
    var itemStyle1 = {
        normal: {
            color: '#FB2844',
            label: {
                show: true,
                position: 'top',
                formatter: '{a}\n{c}'
            }
        }
    }

    var itemStyle2 = {
        normal: {
            color: '#28FB3A',
            label: {
                show: true,
                position: 'top',
                formatter: '{a}\n{c}'
            }
        }
    }
    var itemStyle3 = {
        normal: {
            color: '#287BFB',
            label: {
                show: true,
                position: 'top',
                formatter: '{a}\n{c}'
            }
        }
    }


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
            data: ['กรุงเทพ', 'นนทบุรี', 'นครปฐม']
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
                data: ['กรุงเทพ', 'นนทบุรี', 'นครปฐม']
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: false,
            }
        ],
        series: [


            {
                name: 'ประเภทบ้านเดี่ยว',
                type: 'bar',
                itemStyle: itemStyle3,
                data: [6040, 1823.4, 1484.3]
            },

            {
                name: 'ประเภททาวน์เฮ้าส์',
                type: 'bar',
                itemStyle: itemStyle1,
                data: [4804, 1444.3, 1332.1]
            },
            {
                name: 'ประเภทห้องแถว',
                type: 'bar',
                itemStyle: itemStyle2,
                data: [5506, 1674.7, 1405]
            }
        ]
    };

    LoadChart(option, document.getElementById('chartBuilding1'))
}



function LoadChart(Option, divChart) {
    var chartLoad = echarts.init(divChart);
    var option = Option;


    setTimeout(function () {
        chartLoad.setOption(option, true);


    }, 1000);
}





function LoadSection(types) {
    var land = $.grep(types, function (n, i) {
        return n == 1;
    });

    var condo = $.grep(types, function (n, i) {
        return n == 2;
    });


    var building = $.grep(types, function (n, i) {
        return n == 3;
    });



    if (land.length > 0) {
        $(".divLand").removeClass("invisible absolute")
    } else {
        $(".divLand").removeClass("invisible").addClass("invisible absolute")
    }

    if (condo.length > 0) {
        $(".divCondo").removeClass("invisible absolute")
    } else {
        $(".divCondo").removeClass("invisible").addClass("invisible absolute")
    }

    if (building.length > 0) {
        $(".divBuilding").removeClass("invisible absolute")
        $(".divProvince1").removeClass("invisible absolute")

    } else {
        $(".divBuilding").removeClass("invisible").addClass("invisible absolute")
        $(".divProvince1").removeClass("invisible").addClass("invisible absolute")
    }
}
function initialData() {

    var types = $("#ddlType").val();
    LoadSection(types);
}



/******************************
Start Event button
 *****************************/
$(document).on("change", "#ddlType", function () {

    var types = $(this).val();

    LoadSection(types)

});

$(document).on("click", ".btnLand", function () {

    
});

/******************************
End Event button
 *****************************/


