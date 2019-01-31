$(function () {

    LoadGraph1();
    LoadGraph2();


});


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
            data: ['จำนวนแปลงแบ่งแยกใหม่', 'จำนวนแปลงที่มีการซื้อขายจดทะเบียน', '成交']
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
                data: ['มค-61', 'กพ-61', 'มค-61', 'มย-61', 'พค-61', 'มิย-61', 'กค-61']
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
                data: [30, 182, 434, 791, 390, 30, 10]
            },
            {
                name: 'จำนวนแปลงที่มีการซื้อขายจดทะเบียน',
                type: 'line',
                smooth: true,
                itemStyle: { normal: { areaStyle: { type: 'default' } } },
                data: [1320, 1132, 601, 234, 120, 90, 20]
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
                data: ['มค', 'กพ', 'มค', 'มย', 'พค', 'มิย', 'กค', 'สค', 'กย', 'ตค', 'พฤ', 'ธค']
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
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
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
                data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
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