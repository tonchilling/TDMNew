
var sectionType = '0';
var code = '';
var tabSelect = '1';
var resultAll;

var section1Tab = '1';


function tab_1_1Onclick() {
    setTimeout(function () {

        LoadSection1(1, '')

    }, 1000);
}
function tab_1_2Onclick() {

    setTimeout(function () {

        LoadSection1(2, '')

    }, 1000);
}

function tab_1_3Onclick() {

    setTimeout(function () {

        LoadSection1(3, '')
        // MakeSpeedDometer('chartSpeedometer3_1', '', 19);
        // MakeSpeedDometer('chartSpeedometer3_2', '', 21);
        // MakeSpeedDometer('chartSpeedometer3_3', '', 32);
        // MakeSpeedDometer('chartSpeedometer3_4', '', 12);

    }, 1000);
}
$(document).on("click", ".liTab", function () {
    $(".liTab").removeClass("active");
    $(this).addClass("active");

    //  $('#lblHeaderMain').text("")
    // $('#lbHeader').text("")
    // alert($(this).attr("id"))
    if ($(this).attr("id") == "tab1") {


        setTimeout(function () {
            tabSelect = '1';
            LoadSection23(resultAll);
            $('#lblHeaderMain').text($('#lblHeaderMain').text().replace('ราคาซื้อขาย', 'ราคาประเมิน'));
            $('#lbHeader').text($('#lbHeader').text().replace('ราคาซื้อขาย', 'ราคาประเมิน'));

        }
        , 400);
    } ($(this).attr("id") == "tab2")
    {


        setTimeout(function () {
            tabSelect = '2';
            LoadSection23(resultAll);
            $('#lblHeaderMain').text($('#lblHeaderMain').text().replace('ราคาประเมิน', 'ราคาซื้อขาย'));
            $('#lbHeader').text($('#lbHeader').text().replace('ราคาประเมิน', 'ราคาซื้อขาย'));

        }
       , 300);

    }


});
function SearchAll(sectionTypeTemp, codeTemp) {


    var objSearch = {};

    objSearch = { SectionType: sectionTypeTemp, code: codeTemp };

    $.ajax({
        type: "POST",
        url: mapApi.getServerPath() + '/api/PriceSys/GetPrice',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(objSearch),
        success: function (data) {

            resultAll = data;
            LoadSection23(data);
        },
        error: function (response) {
            alert('failure');
        }
    });
}


function LoadSection1(tab, code) {
    var objSearch = {};

    section1Tab = tab;
    objSearch = { EstimateType: tab, code: code };

    $.ajax({
        type: "POST",
        url: mapApi.getServerPath() + '/api/AreaAnalysis/GetSection1EstimateList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(objSearch),
        success: function (data) {

            resultAll = data;
            LoadSection1View(data);
        },
        error: function (response) {
            alert('failure');
        }
    });

}

function LoadSection1View(data) {
    var strHtml = '';
    var no = 1;
    var chartSpeed = {
        Items: []
    };

    if (section1Tab == '1') {
        $("#ddlLand").empty();
        $(".divSection1Land").empty();
        if (data.EstimateDataTypeList != null && data.EstimateDataTypeList.length > 0) {
            $("#ddlLand").append("<option value=''>เลือกทั้งหมด</option>");
            $.each(data.EstimateDataTypeList, function (index, row) {
                $("#ddlLand").append(`<option value="${row.Code}">${row.Name}</option>`);
            });


        }


        if (data.EstimateDataDetailList != null && data.EstimateDataDetailList.length > 0) {

            strHtml += '<table class="tblChart">';
            strHtml += '<tr>';

            $.each(data.EstimateDataDetailList, function (index, row) {
                strHtml += '<td><div class="chartTab1 tab1"><h4>' + row.Title + '</h4><div class="chartSpeedometer" id="chartSpeedometer' + section1Tab + '_' + no + '" style="height:270px;width:270px;margin-top:0px;cursor:pointer"></div></div></td>';
                chartSpeed.Items.push({
                    id: 'chartSpeedometer' + section1Tab + '_' + no,
                    value: row.Value
                });
                no++;
            });
            strHtml += '</tr>';
            strHtml += '</table>';

        }

        $(".divSection1Land").append(strHtml);
        $.each(chartSpeed.Items, function (index, item) {
            MakeSpeedDometer(item.id, '', item.value);
        });

    }
    else if (section1Tab == '2') {
        $("#ddlTown").empty();
        $(".divSection2Town").empty();
        if (data.EstimateDataTypeList != null && data.EstimateDataTypeList.length > 0) {
            $("#ddlTown").append("<option value=''>เลือกทั้งหมด</option>");
            $.each(data.EstimateDataTypeList, function (index, row) {
                $("#ddlTown").append(`<option value="${row.Code}">${row.Name}</option>`);
            });


        }


        if (data.EstimateDataDetailList != null && data.EstimateDataDetailList.length > 0) {

            strHtml += '<table class="tblChart">';
            strHtml += '<tr>';

            $.each(data.EstimateDataDetailList, function (index, row) {
                strHtml += '<td><div class="chartTab1 tab1"><h4>' + row.Title + '</h4><div class="chartSpeedometer" id="chartSpeedometer' + section1Tab + '_' + no + '" style="height:270px;width:270px;margin-top:0px;cursor:pointer"></div></div></td>';
                chartSpeed.Items.push({
                    id: 'chartSpeedometer' + section1Tab + '_' + no,
                    value: row.Value
                });
                no++;
            });
            strHtml += '</tr>';
            strHtml += '</table>';

        }

        $(".divSection2Town").append(strHtml);
        $.each(chartSpeed.Items, function (index, item) {
            MakeSpeedDometer(item.id, '', item.value);
        });

    }
    else if (section1Tab == '3') {
        $("#ddlBuild").empty();
        $(".divSection3Build").empty();
        if (data.EstimateDataTypeList != null && data.EstimateDataTypeList.length > 0) {
            $("#ddlBuild").append("<option value=''>เลือกทั้งหมด</option>");
            $.each(data.EstimateDataTypeList, function (index, row) {
                $("#ddlBuild").append(`<option value="${row.Code}">${row.Name}</option>`);
            });


        }


        if (data.EstimateDataDetailList != null && data.EstimateDataDetailList.length > 0) {

            strHtml += '<table class="tblChart">';
            strHtml += '<tr>';

            $.each(data.EstimateDataDetailList, function (index, row) {
                strHtml += '<td><div class="chartTab1 tab1"><h4>' + row.Title + '</h4><div class="chartSpeedometer" id="chartSpeedometer' + section1Tab + '_' + no + '" style="height:270px;width:270px;margin-top:0px;cursor:pointer"></div></div></td>';
                chartSpeed.Items.push({
                    id: 'chartSpeedometer' + section1Tab + '_' + no,
                    value: row.Value
                });
                no++;
            });
            strHtml += '</tr>';
            strHtml += '</table>';

        }

        $(".divSection3Build").append(strHtml);
        $.each(chartSpeed.Items, function (index, item) {
            MakeSpeedDometer(item.id, '', item.value);
        });

    }

}
function LoadSection23(data) {


    //  $("#lbHeader").text(tabSelect == '1' ? "ราคาประเมิน ราย" : "ราคาซื้อขาย ราย" + GetSectionDisplayText(sectionType));
    // $("#lbHeaderGraph").text("แผนภูมิแสดงราคาที่ดิน ราย" + GetSectionDisplayText(sectionType));
    LoadSection2EvalBox1_LeftBox(data);
    LoadSection2EvalBox1_Graph(data);
    LoadSection2EvalBox1_Table(data);


}

function LoadSection2EvalBox1_LeftBox(data) {

    var body = "";
    $("#EvalBox1").empty();
    if (data != null) {
        if (data != null && data.length > 0) {
            $.each(data, function (index, data) {
                body += '<div class="alert leftbox alert-' + data.DisplayCode + ' msg pmvByAreaBox">';
                body += '<h4>' + data.DisplayName + '</h4>';
                if (tabSelect == '1') {
                    body += '<h5>ราคาสูงสุด : ' + numberWithCommas(parseFloat(data.ParcelPriceMax).toFixed(2)) + ' บาท </h5>';
                    body += ' <h5>ราคาต่ำสุด:  ' + numberWithCommas(parseFloat(data.ParcelPriceMin).toFixed(2)) + ' บาท </h5>';
                    body += '<h5>ราคาเฉลี่ย :  ' + numberWithCommas(parseFloat(data.ParcelPriceAvg).toFixed(2)) + ' บาท </h5>';
                } else {
                    body += '<h5>ราคาสูงสุด : ' + numberWithCommas(parseFloat(data.MarketPriceMax).toFixed(2)) + ' บาท </h5>';
                    body += ' <h5>ราคาต่ำสุด:  ' + numberWithCommas(parseFloat(data.MarketPriceMin).toFixed(2)) + ' บาท </h5>';
                    body += '<h5>ราคาเฉลี่ย :  ' + numberWithCommas(parseFloat(data.MarketPriceAvg).toFixed(2)) + ' บาท </h5>';
                }
                body += ' </div>';
            });
        }
    }

    $("#EvalBox1").append(body);

}


function LoadSection2EvalBox1_Graph(data) {
    var chartBar = echarts.init(document.getElementById('EvalBox1chartBar'));
    var caption = [];
    var maxValue = [];
    var minValue = [];
    var avgValue = [];


    if (data != null) {
        if (data != null && data.length > 0) {
            $.each(data, function (index, data) {
                caption.push(data.DisplayName);
                if (tabSelect == '1') {
                    maxValue.push(parseFloat(data.ParcelPriceMax).toFixed(2));
                    minValue.push(parseFloat(data.ParcelPriceMin).toFixed(2));
                    avgValue.push(parseFloat(data.ParcelPriceAvg).toFixed(2));
                } else {
                    maxValue.push(parseFloat(data.MarketPriceMax).toFixed(2));
                    minValue.push(parseFloat(data.MarketPriceMin).toFixed(2));
                    avgValue.push(parseFloat(data.MarketPriceAvg).toFixed(2));
                }
            });
        }
    }

    var option2 = {
        title: {
            text: '',
            subtext: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['ราคาประเมินรวม']
        },
        toolbox: {
            show: true,
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
                type: 'value'
            }
        ],
        yAxis: [
            {
                type: 'category',
                data: caption
            }
        ],
        series: [
            {
                name: 'ราคาเฉลี่ย',
                type: 'bar',
                data: avgValue,
                itemStyle: {
                    normal: {
                        color: 'green'
                    },
                    emphasis: {
                        color: '#00e600'

                    }
                }
            },
     {
         name: 'ราคาต่ำสุด',
         type: 'bar',
         data: minValue,

         itemStyle: {
             normal: {
                 color: 'yellow'
             },
             emphasis: {


             }
         }
     },
     {
         name: 'สูงสุด',
         type: 'bar',
         data: maxValue,

         itemStyle: {
             normal: {
                 color: 'red'
             },
             emphasis: {


             }
         }
     }
        ]
    };

    chartBar.setOption(option2);
}

function LoadSection2EvalBox1_Table(data) {

    var body = "";
    $("#EvalBox1Table").empty();

    body += '<table class="table table-bordered table-striped tblInfo">';
    body += '<thead>';
    body += '<tr>';
    body += '<th scope="col">' + GetSectionDisplayText(sectionType) + '</th>';
    body += '<th scope="col">จำนวนแปลงที่ดิน</th>';
    body += '<th scope="col">พื้นที่รวม</th>';
    if (tabSelect == "1") {
        body += '<th scope="col">ราคาประเมินที่ดิน</th>';
    } else {
        body += '<th scope="col">ราคาซื้อขายที่ดิน</th>';
    }
    body += '</tr>';
    body += '</thead>';
    body += '<tbody>';
    if (data != null) {
        if (data != null && data.length > 0) {
            $.each(data, function (index, data) {
                body += '<tr>';
                body += '<td>' + data.DisplayName + '</td>';
                body += '<td>' + numberWithCommas(data.LAND_Total) + ' แปลง</td>';
                body += '<td>' + numberWithCommas(data.LAND_AREA) + ' ตารางวา</td>';
                if (tabSelect == "1") {
                    body += '<td>' + numberWithCommas(data.ParcelPrice) + ' บาท</td>';
                } else {
                    body += '<td>' + numberWithCommas(data.MarketPrice) + ' บาท</td>';
                }
                body += '</tr>';
            });
        }
    }

    body += ' </tbody>';
    body += ' </table>';

    $("#EvalBox1Table").append(body);
    $("#EvalBox1Table table").DataTable({ searching: false, info: false });
}
function GetSectionDisplayText(sectionType) {
    var text = 'ภาค';

    switch (sectionType) {
        case '0': text = 'ภาค'; break;
        case '1': text = 'จังหวัด'; break;
        case '2': text = 'อำเภอ'; break;
        case '3': text = 'ตำบล'; break;
    }

    return text;
}

function LoadSection4() {

    var subject_id = "";
    var subject_name = "";
    var prov_name = "";
    var publish_date = "";
    var start = "1";
    var count = "1000";
    var tableStr = "";

    subject_id = "";
    subject_name = "";
    prov_name = "";
    publish_date = "";
    var data = {
        SUBJECT_NAME:subject_id,
        PROVINCE_ID:prov_name,
AMPHOE_ID:"",
TAMBOL_ID:""
    }
    $(".divInfoSection4").empty();
 

    tableStr += '<table id="datatable4" class="table   datatable4 tblInfoSection4">';
    tableStr += '<thead>';
    tableStr += '<tr>';
    tableStr += '<th class="th__center">ชื่อโครงการ</th>';
    tableStr += '<th class="th__center">พื้นที่</th>';
    tableStr += '<th class="th__center">จำนวนแปลงที่ดินที่กระทบ</th>';
    tableStr += '<th class="th__center">เนื้อที่รวม</th>';
    tableStr += '<th class="th__center">ราคาประเมินทั้งหมด</th>';
    tableStr += '</tr>';
    tableStr += '</thead>';
    tableStr += '<tbody>';

    $.ajax({
        url: rootUrl + "/api/AreaAnalysis/GetAllProjectImpact",
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            if (data != null) {
                if (data != null && data.length > 0) {
                    $.each(data, function (index, item) {

                        tableStr += '<tr data-toggle="collapse" data-target="#accordion" class="clickable">';
                        tableStr += ' <td class="td__Center">' + item.SUBJECT_NAME + '</td>';
                        tableStr += '<td class="td__Center">' + item.ProvinceName + '</td>';
                        tableStr += '<td class="td__Center">xx</td>';
                        tableStr += '<td class="td__Center">xx</td>';
                        tableStr += '<td class="td__Center">xx</td>';
                        tableStr += '</tr>';

                        tableStr += ' <tr class="tdDetail">';
                        tableStr += '<td colspan="5" class="td__Center">';
                        tableStr += '<div id="accordion" class="collapse">';
                        tableStr += '<div class="panel ">';
                        tableStr += '<div class="panel-heading">';
                        tableStr += '<label> จำนวนแปลงที่ดิน 31 แปลง</label>';
                        tableStr += '<label class="pull-right clickable" data-toggle="collapse" data-target="#accordion"><i class="glyphicon glyphicon-circle-arrow-left"> Back</i></label>';
                        tableStr += '</div>';
                        tableStr += '<div class="panel-body">';
                        tableStr += '<table class="table table-hover table-bordered tblDetail">';
                        tableStr += '<thead style="visibility:hidden;position:absolute">';
                        tableStr += '<tr>';
                        tableStr += '<th class="th__center">';
                        tableStr += '</th>';
                        tableStr += '</thead>';
                        tableStr += '<tbody>';
                        tableStr += '<tr>';
                        tableStr += '<td>';
                        tableStr += ' <p> รูปแปลงที่ดิน โฉนด พาดผ่าน : 100</p>';
                        tableStr += '<p> โฉนดเลขที่ : 232  เลขที่ดิน: 12</p>';
                        tableStr += '<p> ราคาประเมิน(บาท/ตร.ว) : 39,000</p>';
                        tableStr += '</td>';
                        tableStr += ' </tr>';
                        tableStr += ' </tbody>';
                        tableStr += '</table>';
                        tableStr += '</div>';
                        tableStr += ' </div>';
                        tableStr += ' </div>';
                        tableStr += ' </td>';
                        tableStr += '</tr>';
                    });

                    tableStr += ' </tbody>';
                    tableStr += ' </table>';
                    $(".divInfoSection4").append(tableStr);
                    //   $(".tblInfoSection4").DataTable({ searching: true, info: false });
                }
            }
        }
    });


  /*  public string ID { get; set; }
    public string SUBJECT_ID { get; set; }
    public string SUBJECT_NAME { get; set; }
    public string CREATE_DATE { get; set; }
    public string CREATE_BY { get; set; }
    public string UPDATE_DATE { get; set; }
    public string UPDATE_BY { get; set; }
    public string PUBLISH_DATE { get; set; }
    public string IS_PUBLISHED { get; set; }
    public string IS_DELETED { get; set; }
    public string PROVINCE_ID { get; set; }
    public string ProvinceName { get; set; }
    public string Description { get; set; }
    public string ShapeText { get; set; }
    public string AMPHOE_ID { get; set; }

    public string AmphoeName { get; set; }
    public string TAMBOL_ID { get; set; }

    public string TambolName { get; set; }
    public string Shape { get; set; }
    */
  
  
    /*  $.ajax({
          type: "POST",
          url: mapApi.getServerPath() + '/api/PriceSys/GetPrice',
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          data: JSON.stringify(objSearch),
          success: function (data) {
  
              resultAll = data;
              InitailDataViewSection23(data);
          },
          error: function (response) {
              alert('failure');
          }
      });*/

}


$(document).on("change", "#ddlLand", function () {

    switch ($(this).val()) {
        case "0": $(".chartTab1").visible();
            $(".chartTab1").css({
                position: 'relative',
                top: '10px',
                left: '10px'
            });
            break;
        default:
            $(".chartTab1").visible().invisible();
            $(".chartTab1.tab" + $(this).val()).visible();
            $(".chartTab1.tab" + $(this).val()).css({
                position: 'absolute',
                top: '10px',
                left: '10px'
            });
    }
});



$(document).on("change", "#ddlTown", function () {

    switch ($(this).val()) {
        case "0": $(".chartTab2").visible();
            $(".chartTab2").css({
                position: 'relative',
                top: '10px',
                left: '10px'
            });
            break;
        default:
            $(".chartTab2").visible().invisible();
            $(".chartTab2.tab" + $(this).val()).visible();
            $(".chartTab2.tab" + $(this).val()).css({
                position: 'absolute',
                top: '10px',
                left: '10px'
            });
    }
});

$(document).on("change", "#ddlBuild", function () {

    switch ($(this).val()) {
        case "0": $(".chartTab3").visible();
            $(".chartTab3").css({
                position: 'relative',
                top: '10px',
                left: '10px'
            });
            break;
        default:
            $(".chartTab3").visible().invisible();
            $(".chartTab3.tab" + $(this).val()).visible();
            $(".chartTab3.tab" + $(this).val()).css({
                position: 'absolute',
                top: '10px',
                left: '10px'
            });
    }
});

function LoadSlide()
{


    slider0 = $("#CostEstimateSlider0").slider({
        range: true,
        min: minCostLimit,
        max: maxCostLimit,
        values: [minCost, maxCost],
        slide: function (event, ui) {
            $("#MinCostEstimate0").val(ui.values[0]);
            $("#MaxCostEstimate0").val(ui.values[1]);
         //   $('#minDiv0').html(numberWithCommas(ui.values[0]));
          //  $('#maxDiv0').html(numberWithCommas(ui.values[1]));
        }
    });
    slider1 = $("#CostEstimateSlider1").slider({
        range: true,
        min: minCostLimit,
        max: maxCostLimit,
        values: [minCost, maxCost],
        slide: function (event, ui) {
            $("#MinCostEstimate1").val(ui.values[0]);
            $("#MaxCostEstimate1").val(ui.values[1]);
           // $('#minDiv1').html(numberWithCommas(ui.values[0]));
           // $('#maxDiv1').html(numberWithCommas(ui.values[1]));
        }
    });
   // $('.minDiv').html(numberWithCommas(minCost));
    //$('.maxDiv').html(numberWithCommas(maxCost));
}



$(document).on("change", "#ddlLand", function () {

    switch ($(this).val()) {
        case "0": $(".chartTab1").visible();
            $(".chartTab1").css({
                position: 'relative',
                top: '10px',
                left: '10px'
            });
            break;
        default:
            $(".chartTab1").visible().invisible();
            $(".chartTab1.tab" + $(this).val()).visible();
            $(".chartTab1.tab" + $(this).val()).css({
                position: 'absolute',
                top: '10px',
                left: '10px'
            });
    }
});



$(document).on("change", "#ddlTown", function () {

    switch ($(this).val()) {
        case "0": $(".chartTab2").visible();
            $(".chartTab2").css({
                position: 'relative',
                top: '10px',
                left: '10px'
            });
            break;
        default:
            $(".chartTab2").visible().invisible();
            $(".chartTab2.tab" + $(this).val()).visible();
            $(".chartTab2.tab" + $(this).val()).css({
                position: 'absolute',
                top: '10px',
                left: '10px'
            });
    }
});

$(document).on("change", "#ddlBuild", function () {

    switch ($(this).val()) {
        case "0": $(".chartTab3").visible();
            $(".chartTab3").css({
                position: 'relative',
                top: '10px',
                left: '10px'
            });
            break;
        default:
            $(".chartTab3").visible().invisible();
            $(".chartTab3.tab" + $(this).val()).visible();
            $(".chartTab3.tab" + $(this).val()).css({
                position: 'absolute',
                top: '10px',
                left: '10px'
            });
    }
});


function MakeSpeedDometer(name, tital, data) {
    var chartSpeedometer = echarts.init(document.getElementById(name));
    optionchartSpeedometer = {
        title: {
            text: tital,
            x: 'center',
            y: '-5%',
            textStyle: {
                fontSize: '18'
            }
        },
        tooltip: {
            formatter: "{b} : {c}%"
        },
        series: [
            {
                name: tital,
                type: 'gauge',
                detail: {
                    formatter: '{value}%',
                    show: true,
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderWidth: 0,
                    borderColor: '#ccc',
                    width: 100,
                    height: 40,
                    offsetCenter: ['0%', 65],
                    formatter: '{value}%',
                    textStyle: {
                        color: 'auto',
                        fontSize: 24
                    }
                },
                data: [{ value: data, name: '' }],
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: [[0.35, '#d61c00'], [0.7, '#bf9001'], [1, '#017b01']],
                        width: 30
                    }

                }
            }
        ]
    };
    chartSpeedometer.setOption(optionchartSpeedometer);
    window.chartSpeedometer = function () {
        plot.resize();
    };
}


var minCostLimit = 0;
var maxCostLimit = 10000000;
var minCost = minCostLimit;
var maxCost = maxCostLimit;
var slider0 = null;
var slider1 = null;


$(document).ready(function () {


    LoadSection1(1, '');
  //  SearchAll('0', '');
    LoadSection4();
    LoadSlide();


   
});






