﻿
var sectionType = '0';
var code = '';
var tabSelect = '1';
var resultAll;

var section1Tab = '1';
var LocationTyp='1'
var regionSelectedId, provinceSelectedId;
var regionObj = { "data":[
        {"name":"เลือกภาค","value": ""},
      {"name":"ภาคกลาง","value": "1"} ,
     {"name":"ภาคตะวันตก","value": "2"} ,
     {"name":"ภาคเหนือ","value": "3"}, 
     {"name":"ภาคตะวันออกเฉียงเหนือ","value": "4"} ,
     {"name":"ภาคใต้","value": "5"} ,
      { "name": "ภาคตะวันออก", "value": "6" }]
}


var clusterObj = { "data":[
      {"name":"เลือก Cluster","value": ""},
        {"name":"47","value": "47"} ,
         {"name":"48","value": "48"} 
]
}

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

    }, 1000);
}


var minCostLimit = 0;
var maxCostLimit = 100000000;
var minCost = minCostLimit;
var maxCost = maxCostLimit;
var slider0 = null;
var slider1 = null;
var chartList = [];

$(document).ready(function () {

   // console.log("Hello world!");
    //  $('#overlay').invisible();
   
    $('.txtSFromDate').datetimepicker({
        format: 'mm-dd-yyyy',
        minView: 2,
        pickTime: false,
        autoclose: true
    });


    $('.txtSToDate').datetimepicker({
        format: 'mm-dd-yyyy',
        minView: 2,
        pickTime: false,
        autoclose: true
    });


    $('#ddlType').val(1)

    //   $("#ddlMaptype").selectpicker('refresh');
    $('.divSection2Building').addClass("invisible").css({ position: "absolute" });
    $('.divSection22').addClass("invisible").css({ position: "absolute" });

    // $('.divSection21').addClass("invisible").css({ position: "absolute" });


   /* CMPLTADMIN_SETTINGS.windowBasedLayout();
    CMPLTADMIN_SETTINGS.mainMenu();
    CMPLTADMIN_SETTINGS.mainmenuCollapsed();
    CMPLTADMIN_SETTINGS.mainmenuScroll();
    CMPLTADMIN_SETTINGS.sectionBoxActions();
    CMPLTADMIN_SETTINGS.chatAPI();
    CMPLTADMIN_SETTINGS.chatApiScroll();
    CMPLTADMIN_SETTINGS.chatApiWindow();
    CMPLTADMIN_SETTINGS.breadcrumbAutoHidden();
    */
    LoadSection1(1, '');
    LoadSlide();




    DisplaySection2SearchRegionCluster(1);
    /* $('#tdmap').load(function () {
         $('#tdmap').contents().find("head")
           .append($("<style type='text/css'>  path {fill-opacity:0.4} path:hover, polygon:hover { fill-opacity:0.6 !important; } </style>"));
     });*/




    waitingDialog.show('Waiting for Searching', { dialogSize: 'md', progressType: 'success' });
    SearchAll('0', '');
    LoadSection4();

    LoadConstructionType();

   

});


$(window).on('resize', function () {
    if (chartList != null && chartList != undefined) {

        $.each(chartList, function (key, chartItem) {
            chartItem.resize();
        });

    }
});

$(document).on("click", "#rdRegionSearch", function () {
    DisplaySection2SearchRegionCluster(1)
});

$(document).on("click", "#rdClusterSearch", function () {
    DisplaySection2SearchRegionCluster(2)

});


$(document).on("click", "#rdCost", function () {
    $('#ddlType').val(1)
    $('#ddlType').trigger("change")
});


$(document).on("click", "#rdMarket", function () {
    $('#ddlType').val(2)
    $('#ddlType').trigger("change")
});



$(document).on("change", "#ddlType", function () {
  //  alert($('#ddlType').val())
    switch ($('#ddlType').val()) {
        case '0':
            setTimeout(function () {
            $('#lblHeaderMain').text('ราคาประเมิน/ซื้อขาย');
            $('#lbHeader').text('ราคาประเมิน/ซื้อขาย');
            $('.divSection21').addClass("invisible").css({ position: "absolute" });
            $('.divSection22').addClass("invisible").css({ position: "absolute" });
            }
        , 400);
            searchForm.search();
            break;
        case '1':
            $('.divSection21').removeClass("invisible").css({ position: "relative" });
            $('.divSection22').addClass("invisible").css({ position: "absolute" });
            $('.divSection2Building').removeClass("invisible");

            $('.divSection2Building').addClass("invisible").css({ position: "absolute" });
            $('.divLand').removeClass("invisible").css({ position: "relative" });
            searchForm.search();

            setTimeout(function () {

                $('#lblHeaderMain').text($('#lblHeaderMain').text().replace('ราคาซื้อขาย', 'ราคาประเมิน').replace('ราคาประเมิน/ซื้อขาย', 'ราคาประเมิน'));
                $('#lbHeader').text($('#lbHeader').text().replace('ราคาซื้อขาย', 'ราคาประเมิน').replace('ราคาประเมิน/ซื้อขาย', 'ราคาประเมิน'));

                if (tabSelect == '2')
                {
                 
                        $('.lbType1').text("แบบพักอาศัย");
                        $('.lbType2').text("อื่นๆ");

                }
                else {
                    $('.lbType1').text("ราคาประเมิน/ตรว.");
                    $('.lbType2').text("ราคาประเมิน/แปลง");
                }
           
          
          
            }
        , 400);
            break;
        case '2':

            $('.divSection21').addClass("invisible").css({ position: "absolute" });
            setTimeout(function () {
               
                $('.divSection22').removeClass("invisible").css({ position: "relative" });
                searchForm.search();
                $('#lblHeaderMain').text($('#lblHeaderMain').text().replace('ราคาประเมิน', 'ราคาซื้อขาย').replace('ราคาประเมิน/ซื้อขาย', 'ราคาซื้อขาย'));
                $('#lbHeader').text($('#lbHeader').text().replace('ราคาประเมิน', 'ราคาซื้อขาย').replace('ราคาประเมิน/ซื้อขาย', 'ราคาซื้อขาย'));

            }
     , 300);
            break;
      
    }
});


$(document).on("click", ".liTab", function (event) {
    $(".liTab").removeClass("active");
    $(this).addClass("active");

    //  $('#lblHeaderMain').text("")
    // $('#lbHeader').text("")
    // alert($(this).attr("id"))
    $('.divSection21').removeClass("invisible");
    $('.divSection22').removeClass("invisible");
    $('.divSection2Building').removeClass("invisible");


    $('.divSection21').addClass("invisible").css({ position: "absolute"});
    $('.divSection22').addClass("invisible").css({ position: "absolute" });
    $('.divSection2Building').addClass("invisible").css({ position: "absolute" });

    switchTabExten($(this).attr("id"));
   // alert($(this).attr("id"))

    if ($(this).attr("id") == "tab1") {


        $('.divTab2').removeClass("col-md-12 col-sm-12")
        // $('.divTab2').addClass("col-md-10 col-sm-10")
        $('.divTab1').removeClass("invisible").css({ position: "relative" });
        $(".chartBar").removeClass("invisible").css({ position: "relative" });
        $(".tableLand").removeClass("invisible").css({ position: "relative" });
        $('.divLand').removeClass("invisible").css({ position: "relative" });
        $("#ddlType").empty();
        $("#ddlType").append("<option value='0'>เลือกทั้งหมด</option>");
        $("#ddlType").append("<option value='1' selected>ราคาประเมิน</option>");
        $("#ddlType").append("<option value='2'>ราคาซื้อขาย</option>");
        tabSelect = '1';

        setTimeout(function () {
            $("#lbHeaderGraph").text("กราฟแสดงราคาที่ดิน");
            $("#lbHeaderTable").text("ตารางแสดงราคาที่ดิน");

            $('.divSection21').removeClass("invisible").css({ position: "relative" });
            $('.divSection22').removeClass("invisible").addClass("invisible").css({ position: "absolute" });

            searchForm.search();

            $('.lbType1').text("ราคาประเมิน/ตรว.");
            $('.lbType2').text("ราคาประเมิน/แปลง");
        }
            , 400);
    }
    else if ($(this).attr("id") == "tab2") {

        tabSelect = '2';
        $('.divTab2').removeClass("col-md-12 col-sm-12")
        // $('.divTab2').addClass("col-md-10 col-sm-10")
        $('.divTab1').removeClass("invisible").css({ position: "relative" });
         $('.divLand').removeClass("invisible").css({ position: "relative" });
        $("#ddlType").empty();
        $("#ddlType").append("<option value='0'>เลือกทั้งหมด</option>");
        $("#ddlType").append("<option value='1' selected>ราคาประเมิน</option>");
        $("#ddlType").append("<option value='2'>ราคาซื้อขาย</option>");
        tabSelect = '2';

        $(".chartBar").removeClass("invisible").css({ position: "relative" });
        $(".tableLand").removeClass("invisible").css({ position: "relative" });

        $('.divSection21').removeClass("invisible").css({ position: "relative" });
        $('.divSection22').removeClass("invisible").addClass("invisible").css({ position: "absolute" });
        $('.divSection2Building').addClass("invisible").css({ position: "absolute" });
        
        setTimeout(function () {

            $("#lbHeaderGraph").text("กราฟแสดงราคาอาคารชุด");
            $("#lbHeaderTable").text("ตารางแสดงราคาอาคารชุด");
            $('#lblHeaderMain').text($('#lblHeaderMain').text().replace('ราคาซื้อขาย', 'ราคาประเมิน').replace('ราคาประเมิน/ซื้อขาย', 'ราคาประเมิน'));
            $('#lbHeader').text($('#lbHeader').text().replace('ราคาซื้อขาย', 'ราคาประเมิน').replace('ราคาประเมิน/ซื้อขาย', 'ราคาประเมิน'));
            searchForm.search();
            $('.lbType1').text("แบบพักอาศัย");
            $('.lbType2').text("อื่นๆ");
        }
            , 400);




    }
    else if ($(this).attr("id") == "tab3") {

        tabSelect = '3';
        $(".chartBar").addClass("invisible").css({ position: "absolute" });
        $(".tableLand").removeClass("invisible").css({ position: "absolute" });
        $('.divTab1').addClass("invisible").css({ position: "absolute" });


        $('.divTab2').removeClass("col-md-10 col-sm-10")
        $('.divTab2').addClass("col-md-12 col-sm-12")
        //   searchForm.search();
        $("#ddlType").empty();
        $("#ddlType").append("<option value='1'>ราคาประเมิน</option>");
        $('.divLand').addClass("invisible").css({ position: "absolute" });

        regionSelectedId = $('#ddlRegion').val();
        provinceSelectedId = $('#ddlProvince').val();
        var proviceOption1 = $("#ddlProvince option:not([value='" + provinceSelectedId + "']):not([value='999999'])").clone();
        var proviceOption2 = $("#ddlProvince option:not([value='" + provinceSelectedId + "']):not([value='999999'])").clone();
        // $("#rdCluster").trigger("click");


        $("#ddlProvince1 option[value='" + provinceSelectedId + "']").remove();
        //  $("#ddlProvince2 option[value='" + provinceSelectedId + "']").remove();

        $("#ddlProvince1").selectpicker('refresh')
        searchForm.search();

        //  $('#rdCluster').find('span').addClass('checked');
        // $('#rdCluster').prop('checked', true);

        // var proviceOption1 = $("#ddlProvince option").clone();
        //  var proviceOption2 = $("#ddlProvince option").clone();
        //   $("#ddlProvince1").empty();
        //  $("#ddlProvince2").empty();
        tabSelect = '3';
        //  $("#ddlProvince1").append(proviceOption1);
        //  $("#ddlProvince2").append(proviceOption2);

        $('.divSection2Building').removeClass("invisible").css({ position: "relative" });

        setTimeout(function () {
            $("#lbHeaderTable").text("ตารางแสดงสิ่งปลูกสร้าง");
            //    LoadSection2Construction(resultAll)
        }, 400);
    }
    else if ($(this).attr("id") == "tab4") {
 
        $('.divLand').addClass("invisible").css({ position: "absolute" });
    }
    setTimeout(function () {

        $('#lblHeaderMain').text($('#lblHeaderMain').text().replace('ราคาซื้อขาย', 'ราคาประเมิน').replace('ราคาประเมิน/ซื้อขาย', 'ราคาประเมิน'));
        $('#lbHeader').text($('#lbHeader').text().replace('ราคาซื้อขาย', 'ราคาประเมิน').replace('ราคาประเมิน/ซื้อขาย', 'ราคาประเมิน'));
    }
   , 400);

    event.stopPropagation();


});
function SearchAll(sectionTypeTemp, codeTemp) {
   

    var urlForSearch = mapApi.getServerPath() + '/api/PriceSys/GetPrice';

    var selectType = tabSelect;
    var provinceCode1 = $('#ddlProvince1').val();
 //   var provinceCode2 = $('#ddlProvince2').val();
    var percentCompare = $('#txtPercent').val();
    switch (selectType)
    {
        case '1': urlForSearch = mapApi.getServerPath() + '/api/PriceSys/GetPrice'; break;
        case '2': urlForSearch = mapApi.getServerPath() + '/api/PriceSys/GetPriceOfCondo'; break;
        case '3': urlForSearch = mapApi.getServerPath() + '/api/PriceSys/GetPriceOfConstruction';
            if (sectionTypeTemp == 1) {
                codeTemp = $('#ddlRegion').val();
            }
            else if (sectionTypeTemp == 2) {
                codeTemp = $('#ddlProvince').val();
            } 
          
            break;
    }

    var constructionType = $('#ddlConstructionType').val();
    var objSearch = {};

 waitingDialog.show('Waiting for loading data', { dialogSize: 'md', progressType: 'success' });


    objSearch = {
        SectionType: sectionTypeTemp,
        code: codeTemp,
        ConStructionType: constructionType,
        ProvinceCodeCompare1: (provinceCode1!=null && provinceCode1.length > 0) ? provinceCode1.join() : "",
        PercentCompare: percentCompare,
        costEstMin: $('.MinCostEstimate0').val(),
        costEstMax: $('.MaxCostEstimate0').val(),
        costEstUnitType: $('#ddlType').val()

    };
   
   
    $.ajax({
        type: "POST",
        url: urlForSearch,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(objSearch),
        success: function (data) {

            chartList = [];
            resultAll = data;
            $("#EvalBox1").empty();
            $("#EvalBox1chartBar").empty();
            $("#EvalBox1Table").empty();

            if (data != null && data.length > 0) {
                var lbMessage = "";

               
                $(".lblLocation").empty();
                if ($("#ddlRegion").val() != "") {
                    lbMessage += $("#ddlRegion option:selected").text();
                }
                if ($("#ddlProvince").val() != "") {
                    lbMessage += " > " + $("#ddlProvince option:selected").text();
                }

                if ($("#ddlDistrict").val() != "") {
                    lbMessage += " > " + $("#ddlDistrict option:selected").text();
                }

                if ($("#ddlSubdistrict").val() != "") {
                    lbMessage += " > " + $("#ddlSubdistrict option:selected").text();
                }

                setTimeout(function () {
                    
                    $(".lblType").text($("#ddlType option:selected").text());
                    $(".lblLocation").text(lbMessage);
                }, 1000);
                
                if (selectType == '3') {
                    $("#EvalBox1").invisible();
                    setTimeout(function () {
                        LoadSection2Construction(data);
                       
                    }, 1000);


                }
                else {
                    $("#EvalBox1").visible();
                    setTimeout(function () {
                        LoadSection23(data);
                     
                    }, 1000);
                }



                console.log(sectionTypeTemp);
                if (sectionTypeTemp == 4) {
                    $("#EvalBox1").addClass("absolute").invisible();
                } else {
                    $("#EvalBox1").removeClass("absolute")
                }



            } else {

                
                $("#EvalBox1").visible();
                if (selectType == '3') {
                    $("#EvalBox1").invisible();
                    setTimeout(function () {
                        LoadSection2Construction(data);
                       
                    }, 1000);
                }

                

              
                map.clear();
              
            }


            setTimeout(function () {
                waitingDialog.hide();
            }, 2000);
           
        },
        error: function (response) {
            alert('failure');
            waitingDialog.hide();
        }
    });

   // alert(sectionTypeTemp);
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

function CutString(data,maxLength)
{
    var trimmedString = data;
    var maxDefault = 68;

    if (maxLength != null)
        maxDefault = maxLength;

    if (data.length > maxDefault) {
        //trim the string to the maximum length
        trimmedString = data.substr(0, maxDefault)+'..';

        //re-trim if we are in the middle of a word
       // trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))

    }
    return trimmedString;
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
                strHtml += '<td width="120px"><div class="chartTab1 tab1" style="height:120px"><a href="' + rootUrl + "/Home/System_3_with_Layout?Menu=4&Id=" + row.Id + '" data-toggle="tooltip" title="' + row.Title + '" data-placement="bottom">' + CutString(row.Title) + '</a><div class="chartSpeedometer" id="chartSpeedometer' + section1Tab + '_' + no + '" style="height:270px;width:270px;margin-top:0px;cursor:pointer"></div></div></td>';
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
                strHtml += '<td width="120px"><div class="chartTab1 tab1"><a href="' + rootUrl + "/Home/System_3_with_Layout?Menu=4&Id=" + row.Id + '"  data-toggle="tooltip" title="' + row.Title + '" data-placement="bottom">' + CutString(row.Title) + '</a><div class="chartSpeedometer" id="chartSpeedometer' + section1Tab + '_' + no + '" style="height:270px;width:270px;margin-top:0px;cursor:pointer"></div></div></td>';
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
        $("#EvalBox1chartBar").empty();
        
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
                strHtml += '<td width="120px"><div class="chartTab1 tab1"><a href="' + rootUrl + "/Home/System_3_with_Layout?Menu=4&Id=" + row.Id + '" data-toggle="tooltip" title="' + row.Title + '" data-placement="bottom">' + CutString(row.Title) + '</a><div class="chartSpeedometer" id="chartSpeedometer' + section1Tab + '_' + no + '" style="height:270px;width:270px;margin-top:0px;cursor:pointer"></div></div></td>';
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

    $('[data-toggle="tooltip"]').tooltip();



}
function LoadSection23(data) {
    
    /*
    $(".tdmapSec4").empty();
    $("#tdmap").clone().appendTo(".tdmapSec4");
    */
    //  $("#lbHeader").text(tabSelect == '1' ? "ราคาประเมิน ราย" : "ราคาซื้อขาย ราย" + GetSectionDisplayText(sectionType));
    // $("#lbHeaderGraph").text("แผนภูมิแสดงราคาที่ดิน ราย" + GetSectionDisplayText(sectionType));
    LoadSection2EvalBox1_LeftBox(data);
    LoadSection2EvalBox1_Graph(data);
    LoadSection2EvalBox1_Table(data);


//    $(iframe).contents().find('body').clone().html().appendTo('#somedestinationelmment');

}

function LoadSection2EvalBox1_LeftBox(data) {

    var body = "";
   
    $("#EvalBox1").empty();
    if (data != null) {
        if (data != null && data.length > 0) {

            body += '<table class="table tblChart">';
            body += '<tr>';


            $.each(data, function (index, data) {
                body += '<td><div class="card text-white bg-info mb-3 box400 zoom">';
                body += '<div class="card-header "><h3>' + data.DisplayName + '</h3></div>';
                body += '<div class="card-body">';
                if (tabSelect == '1') {
                    if (sectionType == "4") {

                        body += '<h5>ราคา : ' + data.ParcelWAHPrice + ' บาท  </h5>';
                    }
                    else {
                        if ($('#ddlType').val() == "1") {
                               body += '<h5>ราคาสูงสุด : ' + data.ParcelWAHPriceMax + ' บาท  </h5>';
                            body += ' <h5>ราคาต่ำสุด:  ' + data.ParcelWAHPriceMin + ' บาท </h5>';
                            body += '<h5>ราคาเฉลี่ย :  ' + data.ParcelWAHPriceAvg + ' บาท </h5>';
                           // body += '<i class="btn btn-success">ราคาสูงสุด</button>';

                          //  body += '<h5>ราคาสูงสุด : ' + data.ParcelWAHPriceMax + ' บาท <i class="fa fa-chevron-circle-right btnViewChanode" data-province="' + data.MaxParcelWAHAddrCode + '" data-chanode="' + data.MaxParcelWAHCHANODE_NO + '"></i> </h5>';
                           // body += ' <h5>ราคาต่ำสุด:  ' + data.ParcelWAHPriceMin + ' บาท <i class="fa fa-chevron-circle-right btnViewChanode" data-province="' + data.MinParcelWAHProvinceCode + '" data-chanode="' + data.MinParcelWAHCHANODE_NO + '"></i></h5>';
                           // body += '<h5>ราคาเฉลี่ย :  ' + data.ParcelWAHPriceAvg + ' บาท </h5>';
                        } else if ($('#ddlType').val() == "2") {
                            body += '<h5>ราคาสูงสุด : ' + data.MarketWAHPriceMax + ' บาท </h5>';
                            body += ' <h5>ราคาต่ำสุด:  ' + data.MarketWAHPriceMin + ' บาท </h5>';
                            body += '<h5>ราคาเฉลี่ย :  ' + data.MarketWAHPriceAvg + ' บาท </h5>';

                           // body += '<h5>ราคาสูงสุด : ' + data.MarketWAHPriceMax + ' บาท <i class="fa fa-chevron-circle-right btnViewChanode" data-province="' + data.MaxMarketWAHAddrCode + '" data-chanode="' + data.MaxMarketWAHCHANODE_NO + '"></i></h5>';
                           // body += ' <h5>ราคาต่ำสุด:  ' + data.MarketWAHPriceMin + ' บาท <i class="fa fa-chevron-circle-right btnViewChanode" data-province="' + data.MinMarketWAHAddrCode + '" data-chanode="' + data.MinMarketWAHCHANODE_NO + '"></i></h5>';
                           // body += '<h5>ราคาเฉลี่ย :  ' + data.MarketWAHPriceAvg + ' บาท </h5>';
                        } else {

                            body += '<h4>ราคาประเมิน</h4>';
                            body += '<h5>ราคาสูงสุด : ' + data.ParcelWAHPriceMax + ' บาท </h5>';
                            body += ' <h5>ราคาต่ำสุด:  ' + data.ParcelWAHPriceMin + ' บาท </h5>';
                            body += '<h5>ราคาเฉลี่ย :  ' + data.ParcelWAHPriceAvg + ' บาท </h5>';
                            body += '<hr class="style1">';
                            body += '<h4>ราคาซื้อขาย</h4>';
                            body += '<h5>ราคาสูงสุด : ' + data.MarketWAHPriceMax + ' บาท </h5>';
                            body += ' <h5>ราคาต่ำสุด:  ' + data.MarketWAHPriceMin + ' บาท </h5>';
                            body += '<h5>ราคาเฉลี่ย :  ' + data.MarketWAHPriceAvg + ' บาท </h5>';

                           /* body += '<h4>ราคาประเมิน</h4>';
                            body += '<h5>ราคาสูงสุด : ' + data.ParcelWAHPriceMax + ' บาท <i class="fa fa-chevron-circle-right btnViewChanode" data-province="' + data.MaxParcelWAHAddrCode + '"  data-chanode="' + data.MaxParcelWAHCHANODE_NO + '"></i></h5>';
                            body += ' <h5>ราคาต่ำสุด:  ' + data.ParcelWAHPriceMin + ' บาท <i class="fa fa-chevron-circle-right btnViewChanode" data-province="' + data.MinParcelWAHAddrCode + '" data-chanode="' + data.MinParcelWAHCHANODE_NO + '"></i></h5>';
                            body += '<h5>ราคาเฉลี่ย :  ' + data.ParcelWAHPriceAvg + ' บาท </h5>';
                            body += '<hr class="style1">';
                            body += '<h4>ราคาซื้อขาย</h4>';
                            body += '<h5>ราคาสูงสุด : ' + data.MarketWAHPriceMax + ' บาท <i class="fa fa-chevron-circle-right btnViewChanode" data-province="' + data.MaxMarketWAHAddrCode + '" data-chanode="' + data.MaxMarketWAHCHANODE_NO + '"></i></h5>';
                            body += ' <h5>ราคาต่ำสุด:  ' + data.MarketWAHPriceMin + ' บาท <i class="fa fa-chevron-circle-right btnViewChanode" data-province="' + data.MinMarketWAHAddrCode + '" data-chanode="' + data.MinMarketWAHCHANODE_NO + '"></i></h5>';
                            body += '<h5>ราคาเฉลี่ย :  ' + data.MarketWAHPriceAvg + ' บาท </h5>';*/
                        }
                    }
                } else if (tabSelect == '2') {
                    if ($('#ddlType').val() == "1") {

                        body += '<h4>ราคาประเมิน</h4>';
                        body += '<h5>ราคาสูงสุด : ' + data.ParcelPriceMax + ' บาท </h5>';
                        body += ' <h5>ราคาต่ำสุด:  ' + data.ParcelPriceMin + ' บาท </h5>';
                        body += '<h5>ราคาเฉลี่ย :  ' + data.ParcelPriceAvg + ' บาท </h5>';
                        body += '<hr class="style1">';
                        body += '<h4>ราคาประเมิน(ตรว.)</h4>';
                        body += '<h5>ราคาสูงสุด : ' + data.ParcelWAHPriceMax + ' บาท </h5>';
                        body += ' <h5>ราคาต่ำสุด:  ' + data.ParcelWAHPriceMin + ' บาท </h5>';
                        body += '<h5>ราคาเฉลี่ย :  ' + data.ParcelWAHPriceAvg + ' บาท </h5>';

                       /* body += '<h4>ราคาประเมิน</h4>';
                        body += '<h5>ราคาสูงสุด : ' + data.ParcelPriceMax + ' บาท <i class="fa fa-chevron-circle-right btnViewChanode" data-province="' + data.MaxParcelWAHAddrCode + '"  data-chanode="' + data.MaxParcelWAHCHANODE_NO + '"></i></h5>';
                        body += ' <h5>ราคาต่ำสุด:  ' + data.ParcelPriceMin + ' บาท <i class="fa fa-chevron-circle-right btnViewChanode" data-province="' + data.MinParcelWAHAddrCode + '" data-chanode="' + data.MinParcelWAHCHANODE_NO + '"></i></h5>';
                        body += '<h5>ราคาเฉลี่ย :  ' + data.ParcelPriceAvg + ' บาท </h5>';
                        body += '<hr class="style1">';
                        body += '<h4>ราคาประเมิน(ตรว.)</h4>';
                        body += '<h5>ราคาสูงสุด : ' + data.ParcelWAHPriceMax + ' บาท <i class="fa fa-chevron-circle-right btnViewChanode" data-province="' + data.MaxMarketWAHAddrCode + '" data-chanode="' + data.MaxMarketWAHCHANODE_NO + '"></i></h5>';
                        body += ' <h5>ราคาต่ำสุด:  ' + data.ParcelWAHPriceMin + ' บาท <i class="fa fa-chevron-circle-right btnViewChanode" data-province="' + data.MinMarketWAHAddrCode + '" data-chanode="' + data.MinMarketWAHCHANODE_NO + '"></i></h5>';
                        body += '<h5>ราคาเฉลี่ย :  ' + data.ParcelWAHPriceAvg + ' บาท </h5>';*/
                    }
                    else if ($('#ddlType').val() == "2") {
                        body += '<h4>ราคาซื้อขาย</h4>';
                        body += '<h5>ราคาสูงสุด : ' + data.MarketPriceMax + ' บาท </h5>';
                        body += ' <h5>ราคาต่ำสุด:  ' + data.MarketPriceMin + ' บาท </h5>';
                        body += '<h5>ราคาเฉลี่ย :  ' + data.MarketPriceAvg + ' บาท </h5>';
                        body += '<hr class="style1">';
                        body += '<h4>ราคาซื้อขาย(ตรว.)</h4>';
                        body += '<h5>ราคาสูงสุด : ' + data.MarketWAHPriceMax + ' บาท </h5>';
                        body += ' <h5>ราคาต่ำสุด:  ' + data.MarketWAHPriceMin + ' บาท</h5>';
                        body += '<h5>ราคาเฉลี่ย :  ' + data.MarketWAHPriceAvg + ' บาท </h5>';
                       /* body += '<h4>ราคาซื้อขาย</h4>';
                        body += '<h5>ราคาสูงสุด : ' + data.MarketPriceMax + ' บาท <i class="fa fa-chevron-circle-right btnViewChanode" data-province="' + data.MaxParcelWAHAddrCode + '"  data-chanode="' + data.MaxParcelWAHCHANODE_NO + '"></i></h5>';
                        body += ' <h5>ราคาต่ำสุด:  ' + data.MarketPriceMin + ' บาท <i class="fa fa-chevron-circle-right btnViewChanode" data-province="' + data.MinParcelWAHAddrCode + '" data-chanode="' + data.MinParcelWAHCHANODE_NO + '"></i></h5>';
                        body += '<h5>ราคาเฉลี่ย :  ' + data.MarketPriceAvg + ' บาท </h5>';
                        body += '<hr class="style1">';
                        body += '<h4>ราคาซื้อขาย(ตรว.)</h4>';
                        body += '<h5>ราคาสูงสุด : ' + data.MarketWAHPriceMax + ' บาท <i class="fa fa-chevron-circle-right btnViewChanode" data-province="' + data.MaxMarketWAHAddrCode + '" data-chanode="' + data.MaxMarketWAHCHANODE_NO + '"></i></h5>';
                        body += ' <h5>ราคาต่ำสุด:  ' + data.MarketWAHPriceMin + ' บาท <i class="fa fa-chevron-circle-right btnViewChanode" data-province="' + data.MinMarketWAHAddrCode + '" data-chanode="' + data.MinMarketWAHCHANODE_NO + '"></i></h5>';
                        body += '<h5>ราคาเฉลี่ย :  ' + data.MarketWAHPriceAvg + ' บาท </h5>';*/
                    }
                }


            
                body += ' </div></div></td>';
            });
            body += '</tr>';
            body += '</table>';
        }
    }

    $("#EvalBox1").append(body);

}

function LoadSection2Construction(data)
{
    var body = '';
    $("#divConstruction").empty();

    body += '<table class="table table-bordered table-striped ">';
    body += '<thead>';
    body += '<tr class="bg-info">';
    body += '<th scope="col">ลำดับ</th>';
    body += '<th scope="col">รหัส</th>';
    body += '<th scope="col">ชื่อ</th>';
    body += '<th scope="col">จังหวัด</th>';
   
    body += '<th scope="col">ราคา<br>(บาท/ตารางเมตร)</th>';
    body += '</tr>';
    body += '</thead>';
    body += '<tbody>';
    if (data != null) {
        if (data != null && data.length > 0) {
            $.each(data, function (index, data) {

                body += '<tr>';
                body += '<td>' + (index+1) + '</td>';
                body += '<td>' + data.ConstructionType + '</td>';
                body += '<td>' + data.ConstructionName + '</td>';
                body += '<td>' + data.DisplayName + '</td>';
                if (data.Color == '')
                {
                    body += '<td class="text-right">' + numeral(data.ParcelPrice).format('0,0.00') + '</td>';
                } else {
                    body += '<td class="text-right"><span style="color:' + data.Color + '">' + numeral(data.ParcelPrice).format('0,0.00') + '</span></td>';
                }
               
                body += '</tr>';
            });
            }
    }
    body += '</tbody>';
    body += '</table>';
    $("#divConstruction").append(body);

    $("#divConstruction table").DataTable({
        searching: false, info: false
    });


  

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
                    if ($('#ddlType').val() == "1" || $('#ddlType').val() == "0") {
                        maxValue.push(data.ParcelWAHPriceMax != null ? data.ParcelWAHPriceMax.replaceAll(',', '') : 0);
                        minValue.push(data.ParcelWAHPriceMin != null ? data.ParcelWAHPriceMin.replaceAll(',', '') : 0);
                        avgValue.push(data.ParcelWAHPriceAvg != null ? data.ParcelWAHPriceAvg.replaceAll(',', '') : 0);
                    } else {
                        maxValue.push(data.MarketWAHPriceMax != null ? data.MarketWAHPriceMax.replaceAll(',', '') : 0);
                        minValue.push(data.MarketWAHPriceMin != null ? data.MarketWAHPriceMin.replaceAll(',', '') : 0);
                        avgValue.push(data.MarketWAHPriceAvg != null ? data.MarketWAHPriceAvg.replaceAll(',', '') : 0);

                    }
                   
                } else {
                    maxValue.push(data.MarketPriceMax != null ? data.MarketPriceMax.replaceAll(',', '') : 0);
                    minValue.push(data.MarketPriceMin != null ? data.MarketPriceMin.replaceAll(',', '') : 0);
                    avgValue.push(data.MarketPriceAvg != null ? data.MarketPriceAvg.replaceAll(',', '') : 0);
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
            trigger: 'axis',
            axisPointer: {
                type: 'none',
            }
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
                type: 'category',
                data: caption
            }
        ],
        yAxis: [
            {
                type: 'value'
                
            }
        ],
        series: [
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
            }, {
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
            }
    
        ]
    };

    chartBar.setOption(option2);

    chartList.push(chartBar);
}

function LoadSection2EvalBox1_Table(data) {

    var body = "";
    var orderBy = [[2, "desc"]];
    $("#EvalBox1Table").empty();

    body += '<table class="table table-bordered table-striped ">';
    body += '<thead>';
    body += '<tr class="bg-info">';
    body += '<th scope="col">' + GetSectionDisplayText(sectionType) + '</th>';

    if (tabSelect=='1') {

        body += '<th scope="col">จำนวนแปลงที่ดิน</th>';

        if (sectionType == "4") {
            body += '<th scope="col">ราคา</th>';
        } else {
            body += '<th scope="col">ราคาสูงสุด</th>';
            body += '<th scope="col">ราคาต่ำสุด</th>';
            body += '<th scope="col">ราคาเฉลี่ย</th>';
        }
       
        orderBy = [[2, "desc"]];

    } else if (tabSelect == '2')
    {
        if (sectionType == "4") {

            body += '<th scope="col">ชื่ออาคาร</th>';
            body += '<th scope="col">จำนวนชั้น</th>';

            body += '<th scope="col">ราคาชั้นกลาง</th>';
            orderBy = [[2, "desc"]];
        } else {
            orderBy = [[1, "desc"]];
            body += '<th scope="col">ราคาสูงสุด</th>';
            body += '<th scope="col">ราคาต่ำสุด</th>';
            body += '<th scope="col">ราคาเฉลี่ย</th>';

        }
    }

  
    body += '</tr>';
    body += '</thead>';
    body += '<tbody>';
    if (data != null) {
        if (data != null && data.length > 0) {
            $.each(data, function (index, data) {
                body += '<tr>';
                body += '<td>' + data.DisplayName + '</td>';

                if (tabSelect == '1') {

                    body += '<td class="text-center">' + data.LAND_Total + ' แปลง</td>';
                  
                    if ($('#ddlType').val() == "1" || $('#ddlType').val() == "0" ) {

                        if (sectionType == "4") {
                            body += '<td class="text-right">' + data.ParcelWAHPrice + '</td>';
                        } else {
                            body += '<td class="text-right">' + data.ParcelWAHPriceMax + '</td>';
                            body += '<td class="text-right">' + data.ParcelWAHPriceMin + '</td>';
                            body += '<td class="text-right">' + data.ParcelWAHPriceAvg + '</td>';
                        }
                    } else {
                        if (sectionType == "4") {
                            body += '<td class="text-right">' + data.MarketWAHPrice + '</td>';
                        } else {
                            body += '<td class="text-right">' + data.MarketWAHPriceMax + '</td>';
                            body += '<td class="text-right">' +data.MarketWAHPriceMin + '</td>';
                            body += '<td class="text-right">' +data.MarketWAHPriceAvg+ '</td>';
                        }
                    }
                } else if (tabSelect == '2') {

                    if (sectionType == "4") {

                        body += '<td></td>';
                        body += '<td>0 ชั้น</td>';
                        if ($('#ddlType').val() == "1") {
                            body += '<td class="text-right">' + data.ParcelWAHPriceMax + '</td>';
                        } else if ($('#ddlType').val() == "2") {
                            body += '<td class="text-right">' + data.MarketWAHPriceMax + '</td>';
                        }
                       
                    } else {
                        if ($('#ddlType').val() == "1") {
                            body += '<td class="text-right">' + data.ParcelWAHPriceMax + '</td>';
                            body += '<td class="text-right">' + data.ParcelWAHPriceMin + '</td>';
                            body += '<td class="text-right">' + data.ParcelWAHPriceAvg + '</td>';
                       
                    } else if ($('#ddlType').val() == "2") {
                        body += '<td class="text-right">' + data.MarketPriceMax + '</td>';
                        body += '<td class="text-right">' + data.MarketPriceMin + '</td>';
                        body += '<td class="text-right">' + data.MarketPriceAvg + '</td>';
                    }

                    }
                  

                }
                body += '</tr>';
            });
        }
    }

    body += ' </tbody>';
    body += ' </table>';

    $("#EvalBox1Table").append(body);


    $("#EvalBox1Table table").DataTable({
        searching: true, info: false,
        "order": orderBy
    });
}
function GetSectionDisplayText(sectionType) {
    var text = 'ภาค';
  //  alert(sectionType)
    switch (sectionType) {
        case '0': text = 'ภาค'; break;
        case '1': text = 'จังหวัด'; break;
        case '2': text = 'อำเภอ'; break;
        case '3': text = 'ตำบล'; break;
        case '4':
            switch (tabSelect) {
                case '1': text = 'ฉโนด'; break;
                case '2': text = 'ชื่ออาคาร'; break;
            }
          //  text = 'ฉโนด';

            break;
    }

  /*  switch ($('#ddlType').val()) {
        case '2': text = 'ชื่ออาคาร'; break;
    }*/

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
        SUBJECT_NAME: subject_id,
        PROVINCE_ID: prov_name,
        AMPHOE_ID: "",
        TAMBOL_ID: ""
    }
    $(".divInfoSection4").empty();

    
        tableStr += '<table id="datatable4" class="table   table-bordered table-striped  tblInfoSection4">';
    tableStr += '<thead>';
    tableStr += '<tr class="bg-info">';
    tableStr += '<th class=""></th>';
    tableStr += '<th class="">ชื่อโครงการ</th>';
    tableStr += '<th class="">พื้นที่</th>';
    tableStr += '<th class="">จำนวนแปลงที่ดินที่กระทบ</th>';
    tableStr += '<th class="">เนื้อที่รวม</th>';
    //tableStr += '<th class="th__center">ราคาประเมินทั้งหมด</th>';
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

                        tableStr += '<tr data-toggle="collapse" class="clickable"   data="' + item.ID+'">';
                        tableStr += '<td class="td__Center"><i class="fa fa-2x  fa-search-plus btnViewImpact icon-danger" ></i></td>';
                        tableStr += ' <td class="td__Center">' + item.SUBJECT_NAME + '</td>';
                        tableStr += '<td class="td__Center">' + item.ProvinceName + '</td>';
                        tableStr += '<td class="td__Center text-right" >' + item.ParcelTotal.toLocaleString() + '</td>';
                        tableStr += '<td class="td__Center text-right">' + item.Area.toLocaleString() + '</td>';
                        //tableStr += '<td class="td__Center">xx</td>';
                        tableStr += '</tr>';

                        /*
                        tableStr += ' <tr class="tdDetail">';
                        tableStr += '   <td colspan="5" class="td__Center">';
                        tableStr += '       <div id="accordion" class="collapse">';
                        tableStr += '           <div class="panel ">';
                        tableStr += '               <div class="panel-heading">';
                        tableStr += '                   <label> จำนวนแปลงที่ดิน 31 แปลง</label>';
                        tableStr += '                   <label class="pull-right clickable" data-toggle="collapse" data-target="#accordion"><i class="glyphicon glyphicon-circle-arrow-left"> Back</i></label>';
                        tableStr += '               </div>';
                        tableStr += '           <div class="panel-body">';
                        tableStr += '           <table class="table table-hover table-bordered tblDetail">';
                        tableStr += '               <thead style="visibility:hidden;position:absolute">';
                        tableStr += '               <tr>';
                        tableStr += '                   <th class="th__center">';
                        tableStr += '                   </th>';
                        tableStr += '               </thead>';
                        tableStr += '               <tbody>';
                        tableStr += '               <tr>';
                        tableStr += '                   <td>';
                        tableStr += '                       <p> รูปแปลงที่ดิน โฉนด พาดผ่าน : 100</p>';
                        tableStr += '                       <p> โฉนดเลขที่ : 232  เลขที่ดิน: 12</p>';
                        //tableStr += '                       <p> ราคาประเมิน(บาท/ตร.ว) : 39,000</p>';
                        tableStr += '                   </td>';
                        tableStr += '               </tr>';
                        tableStr += '               </tbody>';
                        tableStr += '           </table>';
                        tableStr += '           </div>';
                        tableStr += '           </div>';
                        tableStr += '       </div>';
                        tableStr += ' </td>';
                        tableStr += '</tr>';*/
                    });

                    tableStr += ' </tbody>';
                    tableStr += ' </table>';
                    $(".divInfoSection4").append(tableStr);
                    $(".divInfoSection4 .tblInfoSection4").DataTable({ searching: false, info: false });
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


$(document).on("click", ".btnViewChanode", function ()
{
    var objSearch = {};

    var priceType = $('#ddlType').val();
    sectionType = 4;
    objSearch = { id: $(this).attr("data-province"), priceType: priceType, AreaType: LocationType, ChanodeNo: $(this).attr("data-chanode") };

    $.get(mapApi.getServerPath() + "/api/Map/GetParcelShapeByChanode/", objSearch, function (data) {
        if (data != null) {
            map.clear();
            $.each(data, function (index, shape) {
                ParcelMapController.draw(shape, ParcelMapController.SubDistrictType);
                $("#overlay").hide();
                //drawCity(shape.SHAPE);
            });
        }
    });

   


});
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

$(document).on("change", "#ddlProvince1", function () {
    var proviceOption1;
    
    if ($(this).val() == "999999")
    {
        proviceOption1 = $("#ddlProvince1 option").clone();
    }
    else {
        proviceOption1 = $("#ddlProvince1 option:not([value='" + $(this).val() + "'])").clone();
    }
    
    $("#ddlProvince2").empty();
   // $('#ddlProvince2').append("<option value='999999'>ทั้งหมด</option>");
    $("#ddlProvince2").append(proviceOption1);
 

});

$(document).on("change", "#ddlProvince2", function () {
    var proviceOption1 = $("#ddlProvince2 option:not([value='" + provinceId + "'])").clone();
   // $("#ddlProvince1").append(proviceOption1);
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

function LoadSlide() {


    slider0 = $(".CostEstimateSlider0").slider({
        range: true,
        min: minCostLimit,
        max: maxCostLimit,
        step: 30000,
        values: [minCost, maxCost],
        slide: function (event, ui) {
            $(".MinCostEstimate0").val(ui.values[0]);
            $(".MaxCostEstimate0").val(ui.values[1]);
            //   $('#minDiv0').html(ui.values[0]));
            //  $('#maxDiv0').html(ui.values[1]));
        }
    });
    slider1 = $(".CostEstimateSlider1").slider({
        range: true,
        step: 10000000,
        min: minCostLimit,
        max: maxCostLimit,
        values: [minCost, maxCost],
        slide: function (event, ui) {
            $(".MinCostEstimate1").val(ui.values[0]);
            $(".MaxCostEstimate1").val(ui.values[1]);
            // $('#minDiv1').html(ui.values[0]));
            // $('#maxDiv1').html(ui.values[1]));
        }
    });
    // $('.minDiv').html(minCost));
    //$('.maxDiv').html(maxCost));
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




$(document).on("mouseover", ".popup", function () {
    var data = $(this).attr("data");
    //alert(data)
}).on('mouseout', '.popup', function () {
    var data = $(this).attr("data");
   // alert(data)
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


function LoadConstructionType() {

    $("#ddlConstructionType").empty();
    $("#ddlConstructionType").append("<option value=''>กรุณาเลือก</option>");
    $.ajax({
        url: rootUrl + "/api/Address/GetConstructionType",
        type: "POST",
        //  data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            if (data != null) {
                if (data != null && data.length > 0) {

                    $.each(data, function (index, obj) {
                        $("#ddlConstructionType").append("<option value='" + obj.Value + "'>" + obj.Name + "</option>");
                    });
                }
            }


        }
    });

}




function LoadCluster()
{
    $("#ddlRegion").empty();

    $("#ddlRegion").append("<option value=''>เลือกครัชเตอร์</option>");
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

            if (regionSelectedId != '')
            {
                $("#ddlRegion").val(regionSelectedId)
            }
        }
    });

}






