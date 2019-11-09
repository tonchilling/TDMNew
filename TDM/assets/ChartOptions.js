

var posList = [
    'left', 'right', 'top', 'bottom',
    'inside',
    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
];

var app = {};
app = {
    configParameters: null, config: null};
app.configParameters = {
    rotate: {
        min: -90,
        max: 90
    },
    align: {
        options: {
            left: 'left',
            center: 'center',
            right: 'right'
        }
    },
    verticalAlign: {
        options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
        }
    },
    position: {
        options: posList[1]
    },
    distance: {
        min: 0,
        max: 100
    }
};

app.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
    onChange: function () {
        var labelOption = {
            normal: {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
            }
        };
        myChart.setOption({
            series: [{
                label: labelOption
            }, {
                label: labelOption
            }, {
                label: labelOption
            }, {
                label: labelOption
            }]
        });
    }
};

var labelOption = {
    normal: {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
            name: {
                textBorderColor: '#fff'
            }
        }
    }
};

var colorList = [
    '#C1232B', '#32c5d2', '#FCCE10', '#E87C25', '#27727B',
    '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
    '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
];

var BarOption = {
    title: {
        x: 'center',
        text: '',
        subtext: '',
        link: ''
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        },
        formatter: tooltripFormat,
    },
    legend: {
        data: null
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    calculable: true,
    grid: {
        borderWidth: 1,
        y: 40,
        y2: 40
    },
    xAxis: [
        {
            type: 'category',
            show: true,
            data: null,
            axisLabel: {
                show: true,
                rotate: 45 , 
                margin: 8,
                fontSize: 24,
                color:'#32c5d2',
                formatter: function (params) {
                    return params;
                }
            },
            splitLine: {
                show: true,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10,
                lineStyle: {
                    color: '#ccc',
                    width: 0.8
                },
                shadowBlur: 2,
            },
        }
    ],
    yAxis: [
        {
            type: 'value',
            show: true,
            axisLabel: {
                show: true,
                margin: 8,
                color: 'red',
                formatter: function (params) {
                    return numeral(params).format('0.0a');  
                }
            },
            splitLine: {
                show: true,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10,
                lineStyle: {
                    color: '#ccc',
                    width: 0.8
                },
                shadowBlur: 2,
            },
            splitArea: {
                show: true,
                color: ['rgba(250,250,250,0.8)', 'rgba(200,200,200,0.8)'],
                shadowColor: '#F8FFFF',
                shadowBlur: 2,
                lineStyle: {
                    color: '#ccc',
                    width: 0.8
                },
                shadowBlur: 2,
            }

        }
    ],
    series: [
        {
            name: '',
            type: 'bar',
            label: {
            normal: {
                show: true,
                fontSize: 18,
                color: '#000',
                position: 'top',

                rotate: 180,
                formatter: function (params) {
                    return numeral(params.value).format('0.0a');
                }
            }
        },
            itemStyle: {
                normal: {
                    color: function (params) {
                        return colorList[1]
                        // return colorList[params.dataIndex]
                    }
                }
            },
            data: null,
            markPoint: {
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(0,0,0,0)',
                    formatter: function (params) {
                        return '';
                    }
                },

            }
        },
        {
            name: '',
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    fontSize: 18,
                    color: '#000',
                    position: 'top',

                    rotate: 180,
                    formatter: function (params) {
                        return numeral(params.value).format('0.0a');
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: function (params) {
                        return colorList[3]
                        // return colorList[params.dataIndex]
                    }
                }
            },
            data: null,
            markPoint: {
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(0,0,0,0)',
                    formatter: function (params) {
                        return '';
                    }
                },

            }
        }
    ]
};

var BarHorizentalOption = {
    title: {
        x: 'center',
        text: '',
        subtext: '',
        link: ''
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        },
        formatter: tooltripFormat,
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    calculable: true,
    grid: {
        borderWidth: 0,
        y: 80,
        y2: 60
    },
    xAxis: [
        {
            type: 'value',
            show: true,
            axisLabel: {
                show: true,
                color: '#000',
                position: 'inside',
                rotate: -90,
                margin: 8,
                formatter: function (params) {
                    return numeral(params).format('0.0a'); 
                }
            }
        }
    ],
    yAxis: [
        {
            type: 'category',
            show: true,
            data: null,
            axisLabel: {
                show: true,
                fontSize: 18,
                color: '#000',
                margin: 8,
                formatter: function (params) {
                    return (params != null && params.length > 15) ? params.substring(0, 15) + '..' : params;
                }
            },
            splitLine: {
                show: true,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10,
                lineStyle: {
                    color: '#ccc',
                    width: 2
                },
                shadowBlur: 10,
            },
            splitArea: {
                show: true,
                color: ['rgba(250,250,250,0.8)', 'rgba(200,200,200,0.8)'],
                shadowColor: '#F8FFFF',
                shadowBlur: 10,
            }

        }
    ],
    series: [
        {
            name: '',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: function (params) {
                        return colorList[1]
                        // return colorList[params.dataIndex]
                    },
                    label: {
                        show: true,
                        fontSize: 16,
                        color: '#000',
                        position: 'inside',
                        rotate: -90,
                        formatter: function (params) {
                            return numeral(params.value).format('0.0a');
                        } 
                    }
                }
            },
            data: null,
            markPoint: {
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(0,0,0,0)',
                    formatter: function (params) {
                        return '';
                    }
                },

            }
        },
        {
            name: '',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: function (params) {
                        return colorList[2]
                        // return colorList[params.dataIndex]
                    },
                    label: {
                        show: true,
                        fontSize: 18,
                        color: '#000',
                        position: 'inside',
                        rotate: -90,
                        formatter: function (params) {
                            return numeral(params.value).format('0.0a');
                        }
                    }
                }
            },
            data: null,
            markPoint: {
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(0,0,0,0)',
                    formatter: function (params) {
                        return '';
                    }
                },

            }
        }
    ]
};

PieOption = {
    title: {
        text: '',
        subtext: '',
        x: 'center'
    },

    tooltip: {
        trigger: 'item',
        formatter: tooltripPieFormat,
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        show: true,
        itemWidth: 10,
        data: null
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        color: ['#1e90ff', '#22bb22', '#4b0082', '#d2691e'],
        backgroundColor: 'rgba(0,0,0,0)', // 工具箱背景颜色
        borderColor: '#ccc',       // 工具箱边框颜色
        borderWidth: 0,            // 工具箱边框线宽，单位px，默认为0（无边框）
        padding: 5,                // 工具箱内边距，单位px，默认各方向内边距为5，
        showTitle: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: true },
            magicType: {
                show: true,
                type: ['line', 'bar'],
                option: {
                    'line': {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'red' // color at 0% position
                            }, {
                                offset: 1, color: 'blue' // color at 100% position
                            }],
                            global: false // false by default
                        }
                    },
                    'bar': { color: '#1e90ff'},
                    // stack: {...},
                    // tiled: {...},
                    // force: {...},
                    // chord: {...},
                    // pie: {...},
                    // funnel: {...}
                },
               
            },
            restore: { show: true },
            saveAsImage: { show: true }
        },
      
    },
    calculable: true,
    series: [
        {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: null,
            smooth: true,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'outside',
                        formatter: function (params) {
                            return numeral(params.value).format('0.0a');
                        },
                        color: '#000',
                        fontSize: 18
                    },
                    color: function (params) {
                        return colorList[params.dataIndex]
                        // return colorList[params.dataIndex]
                    }
                }
            }
        }
    ],
    scaleLabel:
        function (label) { return label.value.toLocaleString() }
};


var CardOption = {
    title: {
        x: 'center',
        text: '',
        subtext: '',
        link: ''
    },
    xAxisData: [],
    yAxisData: [],
    xAxisData2: [],
    yAxisData2: [],
    ConvertToHTML: function (display, value, value2,width,bgclass) {
        var html = ' <div class="col-md-' + width+' col-sm-12">';
        if (bgclass == null) {
            html += '<div class="card  bg-info">';
        } else {
            html += '<div class="card  ' + bgclass+'">';
        }
        html += '<div class="card-body">';
        html += '<div class="row align-items-center">';
        html += '<div class="col-xs-9">';
        html += ' <h3 class="card-title ">';
        html += display
        html += '</h3>'
        html += '<span class="h3 mb-0">'
        html += formatCurrency(value);
        html += '</span>';
        html += '</div>';
        html += '<div class="col-xs-3">';
        html += '<i class=" fa fa-television fa-2x"></i>';
        html += ' </div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        return html;
    }

}

var ChartType = 

    [
        { ID: 1,Name:'Bar Chart', Option: BarOption },       
        { ID: 2, Name: 'Bar Chart(Horizontal)', Option: BarHorizentalOption }, 
        { ID: 3, Name: 'Pie Chart', Option: PieOption },
        { ID: 4, Name: 'CardOption', Option: CardOption }
    ]



function tooltripFormat(params) {
    let rez = '<p class="text-light">' + params.name + ' : ' + params.value.toLocaleString() + '</p>';
    return rez;
}


function tooltripPieFormat(params) {
    let rez = '<p class="text-light">' + params.name + ' : ' + params.value.toLocaleString() + '(' + params.percent + '%)' + '</p>';
    return rez;
}   


function formatCurrency(data) {
    data = parseFloat(data).toFixed(2);

    if (isNaN(data)) {
        data = "";
    }
    return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


