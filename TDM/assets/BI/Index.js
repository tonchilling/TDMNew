
var selectLocationLevel = 1;
var tabSelect = 1;
var DisplayDataSection1;
var objQuery = {};
var selectCode = '';
var LocationType = '1'; // 1
var SectionRegion = [];

var SectionProvince = [];


var SectionAmphure = [];

var SectionTumbol = [];

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




var land_chart1_region = {
    "data": ['ภาคกลาง', 'ภาคตะวันออกเฉียงเหนือ', 'ภาคตะวันตก', 'ภาคตะวันออก', 'ภาคใต้', 'ภาคเหนือ'],
    "value": [
        { value: 550000, name: 'ภาคกลาง' },
        { value: 200000, name: 'ภาคตะวันออกเฉียงเหนือ' },
        { value: 120000, name: 'ภาคตะวันตก' },
        { value: 300000, name: 'ภาคตะวันออก' },
        { value: 230000, name: 'ภาคใต้' },
        { value: 200000, name: 'ภาคเหนือ' }],
    "value2": [
        { value: 600000, name: 'ภาคกลาง' },
        { value: 230000, name: 'ภาคตะวันออกเฉียงเหนือ' },
        { value: 150000, name: 'ภาคตะวันตก' },
        { value: 400000, name: 'ภาคตะวันออก' },
        { value: 260000, name: 'ภาคใต้' },
        { value:240000, name: 'ภาคเหนือ' }]
};


var land_chart1_province = {
    "data": ['นนทบุรี', 'ปทุมธานี', 'นครปฐม', 'สมุทปราการ', 'กรุงเทพ'],
    "value": [
        { value: 138000, name: 'นนทบุรี' },
        { value: 200000, name: 'ปทุมธานี' },
        { value: 120000, name: 'นครปฐม' },
        { value: 200000, name: 'สมุทปราการ' },
        { value: 550000, name: 'กรุงเทพ' }
    ],
    "value2": [
        { value: 150000, name: 'นนทบุรี' },
        { value: 230000, name: 'ปทุมธานี' },
        { value: 150000, name: 'นครปฐม' },
        { value: 230000, name: 'สมุทปราการ' },
        { value: 600000, name: 'กรุงเทพ' }
    ]
};


var land_chart1_amphure = {
    "data": ['สาธร', 'บางรัก', 'ดินแดง', 'ดอนเมือง', 'สุขุมวิท', 'จตุจักร'],
    "value": [
        { value: 550000, name: 'สาธร' },
        { value: 400000, name: 'บางรัก' },
        { value: 300000, name: 'ดินแดง' },
        { value: 200000, name: 'ดอนเมือง' },
        { value: 500000, name: 'สุขุมวิท' },
        { value: 450000, name: 'จตุจักร' }
    ],
    "value2": [
        { value: 600000, name: 'สาธร' },
        { value: 450000, name: 'บางรัก' },
        { value: 350000, name: 'ดินแดง' },
        { value: 250000, name: 'ดอนเมือง' },
        { value: 550000, name: 'สุขุมวิท' },
        { value: 500000, name: 'จตุจักร' }
    ]
};



var land_chart1_tumbol = {
    "data": ['ทุ่งมหาเมฆ', 'ยานนาวา', 'ทุ่งวัดดอน'],
    "value": [
        { value: 550000, name: 'ทุ่งมหาเมฆ' },
        { value: 450000, name: 'ยานนาวา' },
        { value: 400000, name: 'ทุ่งวัดดอน' }
    ],
    "value2": [
        { value: 600000, name: 'ทุ่งมหาเมฆ' },
        { value: 500000, name: 'ยานนาวา' },
        { value: 450000, name: 'ทุ่งวัดดอน' }
    ]
};




var land_chart1_chanod = {
    "data": ['11101', '11102', '11103', '11104', '11105', '11106'],
    "value": [
        { value: 160000, name: '11101' },
        { value: 150000, name: '11102' },
        { value: 140000, name: '11103' },
        { value: 130000, name: '11104' },
        { value: 120000, name: '11105' },
        { value: 110000, name: '11106' }
    ],
    "value2": [
        { value: 180000, name: '11101' },
        { value: 170000, name: '11102' },
        { value: 160000, name: '11103' },
        { value: 150000, name: '11104' },
        { value: 140000, name: '11105' },
        { value: 130000, name: '11106' }
    ]
};


/*"Data": [
    { "name": "11101", "RegionCode": "1", "Region": "ภาคกลาง", "ProvinceCode": "1", "Province": "กรุงเทพ", "Amphure": "สาธร", "AmphureCode": "1", "Tumbol": "ทุ่งมหาเมฆ", "TumbolCode": "1", "ChanodeNo": "11101", "MaxPrice": "160,000", "MinPrice": "100,000" },
    { "name": "11102", "RegionCode": "1", "Region": "ภาคกลาง", "ProvinceCode": "1", "Province": "กรุงเทพ", "Amphure": "สาธร", "AmphureCode": "1", "Tumbol": "ทุ่งมหาเมฆ", "TumbolCode": "1", "ChanodeNo": "11102", "MaxPrice": "150,000", "MinPrice": "60,000" },
    { "name": "11103", "RegionCode": "1", "Region": "ภาคกลาง", "ProvinceCode": "1", "Province": "กรุงเทพ", "Amphure": "สาธร", "AmphureCode": "1", "Tumbol": "ทุ่งมหาเมฆ", "TumbolCode": "1", "ChanodeNo": "11103", "MaxPrice": "140,000", "MinPrice": "60,000" },
    { "name": "11104", "RegionCode": "1", "Region": "ภาคกลาง", "ProvinceCode": "1", "Province": "กรุงเทพ", "Amphure": "สาธร", "AmphureCode": "1", "Tumbol": "ทุ่งมหาเมฆ", "TumbolCode": "1", "ChanodeNo": "11104", "MaxPrice": "130,000", "MinPrice": "60,000" },
    { "name": "11105", "RegionCode": "1", "Region": "ภาคกลาง", "ProvinceCode": "1", "Province": "กรุงเทพ", "Amphure": "สาธร", "AmphureCode": "1", "Tumbol": "ทุ่งมหาเมฆ", "TumbolCode": "1", "ChanodeNo": "11105", "MaxPrice": "120,000", "MinPrice": "60,000" },
    { "name": "11106", "RegionCode": "1", "Region": "ภาคกลาง", "ProvinceCode": "1", "Province": "กรุงเทพ", "Amphure": "สาธร", "AmphureCode": "1", "Tumbol": "ทุ่งมหาเมฆ", "TumbolCode": "1", "ChanodeNo": "11106", "MaxPrice": "110,000", "MinPrice": "60,000" }
]*/





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



/******************************
 initialize respective scripts 
 *****************************/
$(document).ready(function () {

   

    initialData();
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



$(document).on("click", ".btnLand", function () {

    $("#ddlRegion").val('');
    $("#ddlProvince").val('');
    $("#ddlAmphure").val('');
    $("#ddlTumbol").val('');



    $("#ddlType1").val([1]).selectpicker('refresh').trigger('change');

    var types = $("#ddlType1").val();
    tabSelect = 1;
    selectLocationLevel = 0;
    LoadData(0, '');
    // LoadSection(types)
});

$(document).on("click", ".btnCondo", function () {
    $("#ddlType1").val([2]).selectpicker('refresh').trigger('change');
    var types = $("#ddlType1").val();

    tabSelect = 2;
    selectLocationLevel = 0;
    LoadData(0, '');
    //   LoadSection(types)
});

$(document).on("click", ".btnBuilding", function () {
    $("#ddlType1").val([3]).selectpicker('refresh').trigger('change');
    var types = $("#ddlType1").val();


    tabSelect = 3;
    selectLocationLevel = 0;
    LoadData(0, '');
});


$(document).on("click", ".btnGov", function () {
    $("#ddlType1").val([4]).selectpicker('refresh').trigger('change');
    var types = $("#ddlType1").val();


    tabSelect = 4;
    selectLocationLevel = 0;
    LoadData(0, '');
});


function ChartCallBack(param) {
    var mes = '【' + param.type + '】';
    if (typeof param.seriesIndex != 'undefined') {
        mes += '  seriesIndex : ' + param.seriesIndex;
        mes += '  dataIndex : ' + param.dataIndex;
        mes += '  data.name : ' + param.data.name;
        mes += '  data.name : ' + param.data.value;
    }

   
    if (param.type == 'hover') {
        document.getElementById('hover-console').innerHTML = 'Event Console : ' + mes;
    }
    else {
       // document.getElementById('console').innerHTML = mes;
    }

    if (selectLocationLevel == 0) {
        selectLocationLevel = 1;
    } else  if (selectLocationLevel < 4)
        selectLocationLevel += 1;

    if (tabSelect == '3') {

        if (selectLocationLevel <= 1) {
            selectCode = param.data.key;
            LoadData(selectLocationLevel, param.data.key);
        } else {
            selectLocationLevel = 1;
        }

    }

    else if (selectLocationLevel <= 4) {

        selectCode = param.data.key;
        ReLoadAddress(selectCode);
        LoadData(selectLocationLevel, param.data.key);
    }
    
    console.log(param);
}


function LoadData(locationLevel,code) {



    var html = '';
    var option1, option2, option3;
    var urlForSearch = mapApi.getServerPath() + '/api/PriceSys/GetPriceBI';
    var selectType = tabSelect;
    var provinceCode1 = $('#ddlProvince2').val();
    var constructionType = "";
    var percentCompare = $('#txtPercent').val();
    

    var chartData;
    var constructionType = $('#ddlConstructionType').val();
    var objSearch = {};


    waitingDialog.show('Waiting for loading data', { dialogSize: 'md', progressType: 'success' });



    $(".divGov").removeClass("m-fadeOut m-fadeIn").addClass("m-fadeOut absolute")

    $(".divLand").removeClass("m-fadeOut m-fadeIn").addClass("m-fadeOut absolute")
    $(".divCondo").removeClass("m-fadeOut m-fadeIn").addClass("m-fadeOut absolute")
    $(".divBuilding").removeClass("m-fadeOut m-fadeIn").addClass("m-fadeOut absolute")
    $(".divProvince1").removeClass("m-fadeOut m-fadeIn").addClass("m-fadeOut absolute")


    //$(".divLand .divSection1").empty();
    $(".divLand .divSection1").removeClass("m-fadeOut m-fadeIn").addClass("m-fadeOut")

    setTimeout(function () {

        LoadSection1(tabSelect, "")

    }, 1000);

   
    var menuBar = '';

    $('.divView').empty();
    menuBar ='<ul class="nav nav-tabs wizard">'
    switch (locationLevel) {
        case 1:
            menuBar += '<li class="completed active"><a href="#i9" data-toggle="tab" aria-expanded="true"><h3 class="text-lg btnRegion"  data="' + $("#ddlRegion").val() + '">' + $("#ddlRegion option:selected").text() +'</h4></a></li>';
          //  $('.divView').append("<h4> <span class='text-lg btnRegion'   data='" + $("#ddlRegion").val()+"'>" + $("#ddlRegion option:selected").text()+"</span></h4>");

            break;
        case 2:
            menuBar += '<li class="completed active"><a href="#i9" data-toggle="tab" aria-expanded="true"><h3 class="text-lg btnRegion"  data="' + $("#ddlRegion").val() + '">' + $("#ddlRegion option:selected").text() + '</h4></a></li>';
            menuBar += '<li class="completed active opacity"><a href="#i9" class="level2" data-toggle="tab" aria-expanded="true"><h3 class="text-lg btnProvince"  data="' + $("#ddlProvince").val() + '">' + $("#ddlProvince option:selected").text() + '</h4></a></li>';
           // $('.divView').append("<h4><span class='text-lg btnRegion' data='" + $("#ddlRegion").val() + "'>" + $("#ddlRegion option:selected").text() + "</h4> > <h4 class='btnProvince' data='" + $("#ddlProvince").val() + "'> " + $("#ddlProvince option:selected").text() + "</h4> </p>");
            break;
        case 3:
            menuBar += '<li class="completed active"><a href="#i9" data-toggle="tab" aria-expanded="true"><h3 class="text-lg btnRegion"  data="' + $("#ddlRegion").val() + '">' + $("#ddlRegion option:selected").text() + '</h3></a></li>';
            menuBar += '<li class="completed active opacity level2"><a href="#i9" data-toggle="tab" aria-expanded="true"><h3 class="text-lg btnProvince"  data="' + $("#ddlProvince").val() + '">' + $("#ddlProvince option:selected").text() + '</h3></a></li>';
            menuBar += '<li class="completed active opacity level3"><a href="#i9" data-toggle="tab" aria-expanded="true"><h3 class="text-lg btnAmphure"  data="' + $("#ddlDistrict").val() + '">' + $("#ddlDistrict option:selected").text() + '</h3></a></li>';
            //  $('.divView').append("<h3><span class=' text-lg btnRegion' data='" + $("#ddlRegion").val() + "'>" + $("#ddlRegion option:selected").text() + "</h3> > <h3 class='btnProvince' data='" + $("#ddlProvince").val() + "'> " + $("#ddlProvince option:selected").text() + "</h3> > <h3 class='btnAmphure' data='" + $("#ddlDistrict").val() + "'> " + $("#ddlDistrict option:selected").text() + "</h3> </p>");
            break;
        case 4:
            menuBar += '<li class="completed active"><a href="#i9" data-toggle="tab" aria-expanded="true"><h3 class="text-lg btnRegion"  data="' + $("#ddlRegion").val() + '">' + $("#ddlRegion option:selected").text() + '</h3></a></li>';
            menuBar += '<li class="completed active opacity level2"><a href="#i9" data-toggle="tab" aria-expanded="true"><h3 class="text-lg btnProvince"  data="' + $("#ddlProvince").val() + '">' + $("#ddlProvince option:selected").text() + '</h3></a></li>';
            menuBar += '<li class="completed active opacity level3"><a href="#i9" data-toggle="tab" aria-expanded="true"><h3 class="text-lg btnAmphure"  data="' + $("#ddlDistrict").val() + '">' + $("#ddlDistrict option:selected").text() + '</h4></a></li>';
            menuBar += '<li class="completed active opacity level4"><a href="#i9" data-toggle="tab" aria-expanded="true"><h3 class="text-lg btnTumbol"  data="' + $("#ddlSubdistrict").val() + '">' + $("#ddlSubdistrict option:selected").text() + '</h4></a></li>';
           // $('.divView').append("<h4><span class=' text-lg btnRegion' data='" + $("#ddlRegion").val() + "'>" + $("#ddlRegion option:selected").text() + "</h2> > <h2 class='btnProvince' data='" + $("#ddlProvince").val() + "'> " + $("#ddlProvince option:selected").text() + "</h2> > <h2 class='btnAmphure' data='" + $("#ddlDistrict").val() + "'> " + $("#ddlDistrict option:selected").text() + "</h2> > <h2 class='btnTumbol' data='" + $("#ddlSubdistrict").val() + "'> " + $("#ddlSubdistrict option:selected").text() + "</h2> </p>");   
                break;
           
        }
    
    menuBar += '</ul>'
    $('.divView').append(menuBar);
    $('#ddlProvince').removeClass("hide")
    $('#ddlDistrict').removeClass("hide")
    $('#ddlSubdistrict').removeClass("hide")
    switch (selectType) {
        case 1: urlForSearch = mapApi.getServerPath() + '/api/PriceSys/GetPriceBI';
            $('.btnLand').css('opacity', '1');
            $('.btnCondo').css('opacity', '0.3');
            $('.btnBuilding').css('opacity', '0.3');
            $('.btnGov').css('opacity', '0.3');

          
            break;
        case 2: urlForSearch = mapApi.getServerPath() + '/api/PriceSys/GetPriceOfCondoBI';
            $('.btnLand').css('opacity', '0.3');
            $('.btnCondo').css('opacity', '1');
            $('.btnBuilding').css('opacity', '0.3');
            $('.btnGov').css('opacity', '0.3');
            break;
        case 3: urlForSearch = mapApi.getServerPath() + '/api/PriceSys/GetPriceOfConstructionBI';
            $('.btnLand').css('opacity', '0.3');
            $('.btnCondo').css('opacity', '0.3');
            $('.btnBuilding').css('opacity', '1');
            $('.btnGov').css('opacity', '0.3');
            $('#ddlProvince').removeClass("hide").addClass("hide")
            $('#ddlDistrict').removeClass("hide").addClass("hide")
            $('#ddlSubdistrict').removeClass("hide").addClass("hide")
            break;
        case 4: urlForSearch = mapApi.getServerPath() + '/api/AreaAnalysis/GetAllProjectImpact';
            $('.btnLand').css('opacity', '0.3');
            $('.btnCondo').css('opacity', '0.3');
            $('.btnBuilding').css('opacity', '0.3');
            $('.btnGov').css('opacity', '1');
            break;
            codeTemp = $('#ddlProvince').val();
            break;
    }




    objSearch = {

        SectionType: locationLevel,
        code: code,
        LocationType:LocationType,
        ConStructionType: constructionType != null ? constructionType:"",
        ProvinceCodeCompare1: (provinceCode1 != null && provinceCode1.length > 0) ? provinceCode1.join() : "",
        PercentCompare: percentCompare

    };

    $.ajax({
        type: "POST",
        url: urlForSearch,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(objSearch),
        success: function (data) {

            if (data != null && data.EstimateData != null) {
                resultAll = data;
                DisplayDataSection1 = data.EstimateData;
                objQuery.data = data.Barchart;
                chartData = data.Barchart;
                var html = '';
                var count = 0;

                if (tabSelect == '1') {
                    LoadChartLand(DisplayDataSection1, chartData, locationLevel);

                } else if (tabSelect == '2') {
                    LoadChartCondo(DisplayDataSection1, chartData, locationLevel);
                } else if (tabSelect == '3') {
                    LoadChartBuilding(DisplayDataSection1, chartData);
                } else if (tabSelect == '4') {
                    LoadGovernment(resultAll);
                }


                if (DisplayDataSection1 != null && DisplayDataSection1.length > 0) {
                    if (locationLevel == "1") { }
                    else if (locationLevel == "2") {

                        if (DisplayDataSection1[0].RegionCode!="")
                        $("#ddlRegion").val(DisplayDataSection1[0].RegionCode)

                    }
                    else if (locationLevel == "3") { }
                }
            } else if (data != null && selectType == "4") {
                resultAll = data;
                LoadGovernment(resultAll);
            }

           // $('body').pleaseWait("stop");
            waitingDialog.hide();
        },
        error: function (response) {
            waitingDialog.hide();
          //  $('body').pleaseWait("stop");
            alert('failure');
        }
    });





  
   



  
}

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
    });
}

function LoadConstructionType() {

    $("#ddlConstructionType").empty();
   // $("#ddlConstructionType").append("<option value=''>กรุณาเลือก</option>");
    $.ajax({
        url: mapApi.getServerPath()  + "/api/Address/GetConstructionType",
        type: "POST",
        //  data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
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



function LoadChartCondo_Section1(locationLevel, code) {



    var html = '';
    var option1, option2, option3;

    $(".divLand .divSection1").empty();
    $(".divLand .divSection1").removeClass("m-fadeOut m-fadeIn").addClass("m-fadeOut")

    setTimeout(function () {

        LoadSection1(2, "")

    }, 1000);

    if (locationLevel == '1') // Region
    {
        objQuery = land_chart1_region;

        SearchAll(locationLevel, "1")

    } else if (locationLevel == '2') // Province 
    {
        objQuery = land_chart1_province;

        SearchAll(locationLevel, code)

    } else if (locationLevel == '3') // Amphure 
    {

        objQuery = land_chart1_amphure;
        SearchAll(locationLevel, code)
      
    }
    else if (locationLevel == '4') //  Tumbol
    {

        objQuery = land_chart1_tumbol;
        SearchAll(locationLevel, code)

      
    }

    else if (locationLevel == '5') //  Chanod
    {
        objQuery = land_chart1_chanod;
        $.each(SectionChanod.Data, function (index, item) {
            html += '<div class="card2 p-3 align-center col-12 col-md-6 col-lg-2">';
            html += '<div class="panel-item">';
            html += '<div class="icon-wrap ">';
            html += '<span class="fa fa-bar-chart "></span>';
            html += '</div>';
            html += ' <div class="card-text">';
            html += '<h3 class="mbr-content-header pt-3  mbr-fonts-style" data="' + item.TumbolCode + '">' + item.name + '</h3>';
            html += '<h4 class="mbr-content-header pt-3  mbr-fonts-style display-1">' + item.MaxPrice + '</h4>';
            html += '<h5 class="mbr-content-title mbr-light mbr-fonts-style display-5">' + item.Tumbol + ' <br>' + item.Amphure + '<br>' + item.Province + '</h5>';
            html += ' </div>';
            html += '</div>';
            html += '</div>';

        });
    }


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
            SectionProvince.Data = data;
            LoadSection1View(data);

            
           
        },
        error: function (response) {
            alert('failure');
        }
    });

  // SearchAll(section1Tab)

}


function SearchAll(sectionTypeTemp, codeTemp) {


    var urlForSearch = mapApi.getServerPath() + '/api/PriceSys/GetPriceBI';

    var selectType = tabSelect;
    var provinceCode1 = $('#ddlProvince1').val();
    var constructionType = "";
    var percentCompare = $('#txtPercent').val();
    var provinceCode1 = "";

    var chartData;
    switch (selectType) {
        case '1': urlForSearch = mapApi.getServerPath() + '/api/PriceSys/GetPriceBI'; break;
        case '2': urlForSearch = mapApi.getServerPath() + '/api/PriceSys/GetPriceOfCondoBI'; break;
        case '3': urlForSearch = mapApi.getServerPath() + '/api/PriceSys/GetPriceOfConstructionBI';
            codeTemp = $('#ddlProvince').val();
            break;
    }

    var constructionType = $('#ddlConstructionType').val();
    var objSearch = {};


    objSearch = {

        SectionType: sectionTypeTemp,
        code: codeTemp,
        LocationType:LocationType,
        ConStructionType: constructionType,
        ProvinceCodeCompare1: (provinceCode1 != null && provinceCode1.length > 0) ? provinceCode1.join() : "",
        PercentCompare: percentCompare

    };

    $.ajax({
        type: "POST",
        url: urlForSearch,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(objSearch),
        success: function (data) {

            resultAll = data;
            DisplayDataSection1 = data.EstimateData;
            objQuery.data = data.Barchart;
            chartData = data.Barchart;
            var html = '';
            var count = 0;
          
            LoadChartLand(DisplayDataSection1,chartData);


         


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
    var selectValue = '';

  //  alert(section1Tab)
    if (section1Tab == '1') {
        selectValue = $("#ddlLand").val();
        console.log("#ddlLand>"+selectValue);
        $("#ddlLand").empty();
        $(".divSection1Land").empty();
        if (data.EstimateDataTypeList != null && data.EstimateDataTypeList.length > 0) {
            $("#ddlLand").append("<option value=''>เลือกทั้งหมด</option>");
            $.each(data.EstimateDataTypeList, function (index, row) {
                $("#ddlLand").append(`<option value="${row.Code}">${row.Name}</option>`);
            });
            
            if (selectValue != "" && selectValue!="0" )
            $("#ddlLand").val(selectValue);

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
        selectValue = $("#ddlCondo").val();
        console.log("#ddlCondo>" + selectValue);
        $("#ddlCondo").empty();
        $(".divSection1Condo").empty();
        if (data.EstimateDataTypeList != null && data.EstimateDataTypeList.length > 0) {
            $("#ddlCondo").append("<option value=''>เลือกทั้งหมด</option>");
            $.each(data.EstimateDataTypeList, function (index, row) {
                $("#ddlCondo").append(`<option value="${row.Code}">${row.Name}</option>`);
            });
            if (selectValue != "" && selectValue != "0")
                $("#ddlLand").val(selectValue);

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

        $(".divSection1Condo").append(strHtml);
        $.each(chartSpeed.Items, function (index, item) {
            MakeSpeedDometer(item.id, '', item.value);
        });

    }
    else if (section1Tab == '3') {

        selectValue = $("#ddlBuilding").val();
        console.log("#ddlBuilding>" + selectValue);
        $("#ddlBuilding").empty();
        $(".divSection1Building").empty();
        $("#EvalBox1chartBar").empty();

        if (data.EstimateDataTypeList != null && data.EstimateDataTypeList.length > 0) {
            $("#ddlBuilding").append("<option value=''>เลือกทั้งหมด</option>");
            $.each(data.EstimateDataTypeList, function (index, row) {
                $("#ddlBuilding").append(`<option value="${row.Code}">${row.Name}</option>`);
            });

            if (selectValue != "" && selectValue != "0")
                $("#ddlBuilding").val(selectValue);
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

        $(".divSection1Building").append(strHtml);

        $.each(chartSpeed.Items, function (index, item) {
            MakeSpeedDometer(item.id, '', item.value);
        });



    }

    $('[data-toggle="tooltip"]').tooltip();

}

$(document).on("change", "#ddlLand", function () {

    setTimeout(function () {

        LoadSection1(1, $('#ddlLand').val())

    }, 1000);

});

$(document).on("change", "#ddlCondo", function () {

    setTimeout(function () {

        LoadSection1(2, $('#ddlCondo').val())

    }, 1000);

});

$(document).on("change", "#ddlBuilding", function () {

    setTimeout(function () {

        LoadSection1(3, $('#ddlBuilding').val())

    }, 1000);

});

function CutString(data, maxLength) {
    var trimmedString = data;
    var maxDefault = 68;

    if (maxLength != null)
        maxDefault = maxLength;

    if (data.length > maxDefault) {
        //trim the string to the maximum length
        trimmedString = data.substr(0, maxDefault) + '..';

        //re-trim if we are in the middle of a word
        // trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))

    }
    return trimmedString;
}


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

function LoadChartLand(ObjData,chartData) {

    var data;
    var html = '';
    var count = 0;
    var btnSelect = 'btnRegion';

    $(".divLand").removeClass("m-fadeOut m-fadeIn absolute").addClass("m-fadeIn");
    $(".divLand .divSection1").empty();

    switch (selectLocationLevel) {

        case 1:
            btnSelect = 'btnProvince';
            break;
        case 2:
            btnSelect = 'btnAmphure';
            break;
        case 3:
            btnSelect = 'btnTumbol';
            break;
        case 4:
            btnSelect = '';
            break;
        case 5:
            btnSelect = '';
            break;
       
    }

    html += '<div class="row">'

    $.each(ObjData, function (index, item) {
        if (count > 3) {

            return;
        } else {


            html += '<div class="col-lg-3 col-sm-6 col-xs-12">'
            html += '<div class="card text-white bg-info mb-3">'
            html += '<div class="card-header   ' + btnSelect + '" data="' + item.DisplayCode + '">' + item.DisplayName + '</div>'
            html += '<div class="card-body ">'
           // html += '<h5 class="card-title text-left">' + item.RegionName + ' > ' + item.ProviceName + ' > ' + item.AmphureName + '</h5>'
            html += '<table class="table ">'
            html += '<thead >'
            html += '<tr class="text-primary font-weight-bolder text-light">'
            html += '<td></td>'
            html += '<td><h4><i class="fa fa-arrow-up text-info" aria-hidden="true"></i> ราคาสูงสุด</h4></td>'
            html += '<td><h4><i class="fa fa-arrow-down  text-warning" aria-hidden="true"></i> ราคาต่ำสุด</h4></td>'
            html += '</tr>'
            html += '</thead>'
            html += '<tbody>'
            html += '<tr>'
            html += '<td>ราคาประเมิน</td>'
            html += '<td>' + item.ParcelWAHPriceMax + '</td>'
            html += '<td>' + item.ParcelWAHPriceMin + '</td>'
            html += '</tr>'
            html += '<tr>'
            html += '<td>ราคาซื้อขาย</td>'
            html += '<td>' + item.MarketWAHPriceMax + '</td>'
            html += '<td>' + item.MarketWAHPriceMin + '</td>'
            html += '</tr>'
            html += '</tbody>'
            html += '</table>'
            html += '</div>'
            html += '</div>'
            html += '</div>'

/*
            html += '<div class="card2 p-3 align-center col-12 col-md-6 col-lg-2">';
            html += '<div class="panel-item">';
            html += '<div class="icon-wrap ">';
           
            html += '</div>';
            html += ' <div class="card-text">';
            html += '<h3 class="mbr-content-header pt-3  mbr-fonts-style ' + btnSelect+' " data="' + item.DisplayCode + '">' + item.DisplayName + '</h3>';
            html += '<h5 class="mbr-content-header pt-3  mbr-fonts-style display-1">ราคาประเมิน ' + item.ParcelWAHPriceMax + ' (บาท/ตารางวา)</h4>';
            html += '<h5 class="mbr-content-header pt-3  mbr-fonts-style display-1">ราคาขาย ' + item.MarketWAHPriceMax + ' (บาท/ตารางวา)</h4>';

            html += '<h5 class="mbr-content-title mbr-light mbr-fonts-style display-5">ภาค' + item.RegionName + ' <br>' + item.AmphureName + '<br>' + item.ProviceName + '</h5>';
            html += ' </div>';
            html += '</div>';
            html += '</div>';
            */
        }
        count++;

    });
    html += '</div>'
    $(".divLand .divSection1").append(html);

    setTimeout(function () {


        $(".divLand .divSection1").removeClass("m-fadeOut m-fadeIn").addClass("m-fadeIn")
    }, 400);


    html = '';

    $(".divLand .divSection2").empty();
    $(".divLand .divSection2").removeClass("m-fadeOut m-fadeIn").addClass("m-fadeOut")

    html += '<table class="table table-hover table-striped"   id = "EstimateChartTable0">';
    html += '<thead>';
    html += '<tr class="bg-info" >';

    if (LocationType == "1") {
        html += ' <th scope="col">ภาค</th>';
    }
    else {

        html += ' <th scope="col">ครัชเตอร์</th>';
    }
    html += ' <th scope="col">จังหวัด</th>';
    html += '<th scope="col">อำเภอ</th>';
    html += ' <th scope="col">ตำบล</th>';
   // html += ' <th scope="col">เลขที่ฉโนด</th>';
    html += '<th scope="col">ราคาประเมิน</th>';
    html += '<th scope="col">ราคาซื้อขาย</th>';
    html += ' </tr>';
    html += '</thead>';
    html += '<tbody>';

   
    data = ObjData;

    if (data != null) {

        $.each(data, function (index, item) {
            html += '<tr>';

            html += '<td class="btnRegion" data="' + item.RegionCode + '">' + item.RegionName + '</td>';
            html += '<td class="btnProvince" data="' + item.ProviceCode + '">' + item.ProviceName + '</td>';
            html += '<td class="btnAmphure" data="' + item.AmphureCode + '">' + item.AmphureName + '</td>';
            html += '<td class="btnTumbol" data="' + item.TAMBOLCode + '">' + item.TAMBOLName + '</td>';
          //  html += '<td class="text-center">' + item.MaxParcelCHANODE_NO + '</td>';
            html += '<td class="text-right">' + item.ParcelWAHPriceMax + '</td>';
            html += '<td class="text-right">' + item.MarketWAHPriceMax + '</td>';
          
            html += '</tr>';
        });
    }


    html += '</tbody>';
    html += ' </table>';
    setTimeout(function () {


        $(".divLand .divSection2").removeClass("m-fadeOut m-fadeIn").addClass("m-fadeIn")
    }, 400);
    $(".divLand .divSection2").append(html);
    $(".divLand .divSection2 table").DataTable();


    if (chartData.Data.length > 0) {

        option1 = {
            title: {
                text: 'ราคาประเมินที่ดิน',
                subtext: 'สูงสุด',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    var colorSpan = color => '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>';
                    let rez = '<p>' + params.name + ' : ' + formatCurrency(params.value) + '</p>';


                    return rez;
                }        
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                show: true,
                data: chartData.Data
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
                    data: chartData.Value,
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            }
                        }
                    }
                }
            ],
            scaleLabel:
                function (label) { return '$' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
        };


        option2 = {
            title: {
                text: 'ราคาซื้อขายที่ดิน',
                subtext: 'สูงสุด',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    var colorSpan = color => '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>';
                    let rez = '<p>' + params.name + ' : ' + formatCurrency(params.value) +'</p>';
                   

                    return rez;
                }        
              //  formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                show: true,
                data: chartData.Data
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
                    data: chartData.Value2,
                    itemStyle: {
                        normal: {
                            label: {
                                show: false,
                                position: 'top',
                                formatter: '{b}\{c}'
                                /*  formatter: '{b}\n{c}'*/
                            }
                        }
                    }
                }
            ],
            scaleLabel:
                function (label) { return '$' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
        };

        option3 = {
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
                    type: 'value',
                    show: false,
                }
            ],
            yAxis: [
                {
                    type: 'category',
                    data: chartData.Data
                   
                }
            ],
            series: [
                {
                    name: 'ราคาประเมิน',
                    type: 'bar',
                    data: chartData.Value,
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
                                    '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B'
                                   
                                ];
                                return colorList[params.dataIndex]
                            },
                            label: {
                                show: false,
                                position: 'top',
                                formatter: '{b}\{c}'
                                /*  formatter: '{b}\n{c}'*/
                            }
                        }
                    }
                },
                {
                    name: 'ราคาซื้อขาย',
                    type: 'bar',
                    data: chartData.Value2,
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
                                    '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD'
                                  
                                ];
                                return colorList[params.dataIndex]
                                return colorList[params.dataIndex]
                            },
                            label: {
                                show: false,
                                position: 'top',
                                formatter: function (params) {
                                    var val = params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    return val;
                                }
                            }
                        }
                    }
                }
            ]
        };

        LoadChart(option1, document.getElementById('chart1'))
        LoadChart(option2, document.getElementById('chart2'))

        LoadChart(option3, document.getElementById('chart3'))






    }

   
}


function formatCurrency(data) {
    data = parseFloat(data);
    return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function LoadChartCondo(ObjData, chartData) {



    var data;
    var html = '';
    var count = 0;
    var btnSelect = 'btnRegion';

    $(".divCondo").removeClass("m-fadeOut m-fadeIn absolute").addClass("m-fadeIn");
    $(".divCondo .divSection1").empty();

    switch (selectLocationLevel) {

        case 1:
            btnSelect = 'btnProvince';
            break;
        case 2:
            btnSelect = 'btnAmphure';
            break;
        case 3:
            btnSelect = 'btnTumbol';
            break;
        case 4:
            btnSelect = '';
            break;
        case 5:
            btnSelect = '';
            break;

    }

    html += '<div class="row">'

    $.each(ObjData, function (index, item) {
        if (count > 3) {

            return;
        } else {


            html += '<div class="col-lg-3 col-sm-6 col-xs-12">'
            html += '<div class="card text-white bg-danger mb-3">'
            html += '<div class="card-header   ' + btnSelect + '" data="' + item.DisplayCode + '">' + item.DisplayName + '</div>'
            html += '<div class="card-body ">'
            // html += '<h5 class="card-title text-left">' + item.RegionName + ' > ' + item.ProviceName + ' > ' + item.AmphureName + '</h5>'
            html += '<table class="table ">'
            html += '<thead >'
            html += '<tr class="text-primary font-weight-bolder text-light">'
            html += '<td>(ราคา/ตารางวา)</td>'
            if (selectLocationLevel == '4') {
                html += '<td><h4><i class="fa fa-arrow-up text-info" aria-hidden="true"></i> ราคา</h4></td>'
            } else {

                html += '<td><h4><i class="fa fa-arrow-up text-info" aria-hidden="true"></i> ราคาสูงสุด</h4></td>'
                html += '<td><h4><i class="fa fa-arrow-down  text-warning" aria-hidden="true"></i> ราคาต่ำสุด</h4></td>'
            }
            
            html += '</tr>'
            html += '</thead>'
            html += '<tbody>'
           
            html += '<tr>'
            html += '<td>ราคาซื้อขาย</td>'


            if (selectLocationLevel == '4') {
                html += '<td>' + formatCurrency(item.ParcelPriceMax) + '</td>'
            } else {
                html += '<td>' + formatCurrency(item.ParcelPriceMax) + '</td>'
                html += '<td>' + formatCurrency(item.ParcelPriceMin) + '</td>'
            }

           
            html += '</tr>'
            html += '</tbody>'
            html += '</table>'
            html += '</div>'
            html += '</div>'
            html += '</div>'

            /*
                        html += '<div class="card2 p-3 align-center col-12 col-md-6 col-lg-2">';
            html += '<div class="panel-item">';
            html += '<div class="icon-wrap ">';
            html += '<span class="fa fa-bar-chart "></span>';
            html += '</div>';
            html += ' <div class="card-text">';
            html += '<h3 class="mbr-content-header pt-3  mbr-fonts-style ' + btnSelect + ' " data="' + item.DisplayCode + '">' + item.DisplayName + '</h3>';
            html += '<h5 class="mbr-content-header pt-3  mbr-fonts-style display-1">ราคาขาย ' + item.ParcelPriceMax + '</h4>';

            html += '<h5 class="mbr-content-title mbr-light mbr-fonts-style display-5">ภาค' + item.RegionName + ' <br>' + item.AmphureName + '<br>' + item.ProviceName + '</h5>';
            html += ' </div>';
            html += '</div>';
            html += '</div>';
                        */
        }
        count++;

    });
    html += '</div>'
    $(".divCondo .divSection1").append(html);

    setTimeout(function () {


        $(".divCondo .divSection1").removeClass("m-fadeOut m-fadeIn").addClass("m-fadeIn")
    }, 400);


  


    html = '';

    $(".divCondo .divSection2").empty();
    $(".divCondo .divSection2").removeClass("m-fadeOut m-fadeIn").addClass("m-fadeOut")

    html += '<table class="table  table-striped"   id = "EstimateChartTable0">';
    html += '<thead>';
    html += '<tr class="bg-danger" >';

    if (LocationType == "1") {
        html += ' <th scope="col">ภาค</th>';
    }
    else {

        html += ' <th scope="col">ครัชเตอร์</th>';
    }

   // html += ' <th scope="col">ภาค</th>';
    html += ' <th scope="col">จังหวัด</th>';
    html += '<th scope="col">อำเภอ</th>';
    html += ' <th scope="col">ตำบล</th>';
    html += ' <th scope="col">ชื่อคอนโด</th>';
    html += '<th scope="col">ราคาซื้อขาย</th>';
    html += ' </tr>';
    html += '</thead>';
    html += '<tbody>';


    data = ObjData;

    if (data != null) {

        $.each(data, function (index, item) {
            html += '<tr>';

            html += '<td class="btnRegion" data="' + item.RegionCode + '">' + item.RegionName + '</td>';
            html += '<td class="btnProvince" data="' + item.ProviceCode + '">' + item.ProviceName + '</td>';
            html += '<td class="btnAmphure" data="' + item.AmphureCode + '">' + item.AmphureName + '</td>';
            html += '<td class="btnTumbol" data="' + item.TAMBOLCode + '">' + item.TAMBOLName + '</td>';
            html += '<td>' + item.CondoName + '</td>';
            html += '<td class="text-right">' + item.ParcelPriceMax + '</td>';

            html += '</tr>';
        });
    }


    html += '</tbody>';
    html += ' </table>';
    setTimeout(function () {


        $(".divCondo .divSection2").removeClass("m-fadeOut m-fadeIn").addClass("m-fadeIn")
    }, 400);
    $(".divCondo .divSection2").append(html);
    $(".divCondo .divSection2 table").DataTable();


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
            show: true,
            data: chartData.Data
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
            },
            formatter: function (params) {
                var colorSpan = color => '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>';
                let rez = '<p>' + params.name + ' : ' + formatCurrency(params.value) + '</p>';


                return rez;
            }   
        },
        calculable: true,
        series: [
            {
                name: 'ราคาสูงสุด',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: chartData.Value,
                itemStyle: {
                    normal: {
                        label: {
                            show: false,
                            position: 'top',
                            formatter: '{b}\{c}'
                            /*  formatter: '{b}\n{c}'*/
                        }
                    }
                }
            }
        ]
    };

    LoadChart(option, document.getElementById('chartCondo1'))



     labelTop = {
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
     labelFromatter = {
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
    labelBottom = {
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
    radius = [70, 85];

    option = {
        legend: {
            x: 'left',
            y: 'center',
            data: chartData.Data
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
            },
            formatter: function (params) {
                var colorSpan = color => '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>';
                let rez = '<p>' + params.name + ' : ' + formatCurrency(params.value) + '</p>';


                return rez;
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
   // LoadChart(option, document.getElementById('chartCondo2'))


    option = {
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
            data: ['ราคาขาย', 'ราคาต่ำสุด']
        },
        toolbox: {
            show: false,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            },
            formatter: function (params) {
                var colorSpan = color => '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>';
                let rez = '<p>' + params.name + ' : ' + formatCurrency(params.value) + '</p>';


                return rez;
            }  
        },
        calculable: true,
        xAxis: [
            {
                type: 'value',
                show: false,
            }
        ],
        yAxis: [
            {
                type: 'category',
                data: chartData.Data

             
            }
        ],
        series: [

            {
                name: 'ราคาขาย',
                type: 'bar',
                data: chartData.Value,
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
                            show: false,
                            position: 'top',
                            formatter: function (params) {
                                var colorSpan = color => '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>';
                                let rez = '<p>' + params.name + ' : ' + formatCurrency(params.value) + '</p>';


                                return rez;
                            }  
                        }
                    }
                }
            }
        ]
    };

    LoadChart(option, document.getElementById('chartCondo3'))
}

function LoadGovernment(tempData) {

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


 
    $(".divGov").removeClass("m-fadeOut m-fadeIn absolute").addClass("m-fadeIn");
    $(".divGov .divSection1").empty();


    tableStr += '<table id="datatable4" class="table  table-striped">';
    tableStr += '<thead>';
    tableStr += '<tr class="bg-warning" >';
    tableStr += '<th class="th__center">ชื่อโครงการ</th>';
    tableStr += '<th class="th__center">พื้นที่</th>';
    tableStr += '<th class="th__center">จำนวนแปลงที่ดินที่กระทบ</th>';
    tableStr += '<th class="th__center">เนื้อที่รวม</th>';
   // tableStr += '<th class="th__center">ราคาประเมินทั้งหมด</th>';
    tableStr += '</tr>';
    tableStr += '</thead>';
    tableStr += '<tbody>';

  
    if (tempData != null) {
        if (tempData != null && tempData.length > 0) {
            $.each(tempData, function (index, item) {

                        tableStr += '<tr data-toggle="collapse" data-target="#accordion" class="clickable">';
                        tableStr += ' <td class="td__Center">' + item.SUBJECT_NAME + '</td>';
                        tableStr += '<td class="td__Center">' + item.ProvinceName + '</td>';
                tableStr += '<td class="td__Center">' + formatCurrency(item.ParcelTotal) + '</td>';
                tableStr += '<td class="td__Center">' + formatCurrency(item.Area) + '</td>';
                   //     tableStr += '<td class="td__Center"></td>';
                        tableStr += '</tr>';

                      
                    });

                    tableStr += ' </tbody>';
                    tableStr += ' </table>';
            $(".divGov .divSection1").append(tableStr);

            $(".divGov .divSection1 table").DataTable({ searching: false, info: false });
                    //   $(".tblInfoSection4").DataTable({ searching: true, info: false });
                }
            }
    

   
}



function LoadChartBuilding(data, chartData) {


    $(".divBuilding").removeClass("m-fadeOut m-fadeIn absolute").addClass("m-fadeIn");
    $(".divBuilding .divSection1").empty();

    var body = '';
    $(".divBuilding .divSection1").empty();

    body += '<table class="table table-bordered table-striped">';
    body += '<thead>';
    body += '<tr class="bg-success" >';
    body += '<th scope="col">รหัส</th>';
    body += '<th scope="col">ประเภทสิ่งปลูกสร้าง</th>';
    body += '<th scope="col">จังหวัด</th>';

    body += '<th scope="col">ราคา<br>(บาท/ตารางเมตร)</th>';
    body += '<th scope="col">Percent</th>';
    body += '</tr>';
    body += '</thead>';
    body += '<tbody>';
    if (data != null) {
        if (data != null && data.length > 0) {
            $.each(data, function (index, data) {

                body += '<tr>';
               // body += '<td class="btnRegion" data="' + data.RegionCode + '">' + data.RegionName + '</td>';
                body += '<td><span>' + data.ConstructionType + '</span></td>';
                body += '<td><span>' + data.ConstructionName + '</span></td>';
                body += '<td><span>' + data.ProviceName + '</span></td>';
                if (data.Color == '') {
                    body += '<td class="text-right"><span>' + formatCurrency(data.ParcelPrice) + '</span></td>';
                } else {
                    body += '<td class="text-right"><span style="color:' + data.Color + '">' +formatCurrency(data.ParcelPrice)  + '</span></td>';
                }

                body += '<td><span>' + data.Percent + '</span></td>';
                
               

                body += '</tr>';
            });
        }
    }
    body += '</tbody>';
    body += '</table>';
    $(".divBuilding .divSection1").append(body);

    $(".divBuilding .divSection1 table").DataTable({ searching: false, info: false });



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


    option = {
        title: {
            x: 'center',
            text: $("#ddlConstructionType option:selected").text() ,
            subtext: 'ราคาประเมิน',
            link: 'http://echarts.baidu.com/doc/example.html'
        },
        tooltip: {
            trigger: 'item'
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { show: true, readOnly: false },
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
                type: 'category',
                show: false,
                data: chartData.Data
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: false
            }
        ],
        series: [
            {
                name: 'ราคาประเมิน',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                data: chartData.Value,
                markPoint: {
                    tooltip: {
                        trigger: 'item',
                        backgroundColor: 'rgba(0,0,0,0)',
                        formatter: function (params) {
                            return'';
                        }
                    },
                  
                }
            }
        ]
    };

    LoadChart(option, document.getElementById('chartBuilding1'))
}



function LoadChart(Option, divChart) {
    var chartLoad = echarts.init(divChart);
    var option = Option;

 
    window.onresize = chartLoad.resize;
   
   


   
    setTimeout(function () {
        chartLoad.setOption(option, true);
        chartLoad.on("click", ChartCallBack);


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

    var gov = $.grep(types, function (n, i) {
        return n == 4;
    });

    $(".divGov").removeClass("m-fadeOut m-fadeIn").addClass("m-fadeOut absolute")

    $(".divLand").removeClass("m-fadeOut m-fadeIn").addClass("m-fadeOut absolute")
    $(".divCondo").removeClass("m-fadeOut m-fadeIn").addClass("m-fadeOut absolute")
    $(".divBuilding").removeClass("m-fadeOut m-fadeIn").addClass("m-fadeOut absolute")
    $(".divProvince1").removeClass("m-fadeOut m-fadeIn").addClass("m-fadeOut absolute")
   
    if (land.length > 0) {
        $(".divLand").removeClass("m-fadeOut m-fadeIn absolute").addClass("m-fadeIn");
        LoadChartLand(land_chart1_region);
    } else {
       
    }

    if (condo.length > 0) {
        $(".divCondo").removeClass("m-fadeOut m-fadeIn absolute").addClass("m-fadeIn");
        LoadChartCondo()
    } else {
      
    }

    if (building.length > 0) {
        $(".divBuilding").removeClass("m-fadeOut m-fadeIn absolute").addClass("m-fadeIn");
        $(".divProvince1").removeClass("m-fadeOut m-fadeIn absolute").addClass("m-fadeIn");

        LoadChartBuilding();

    } else {
      
    }


    if (gov.length > 0) {
        $(".divGov").removeClass("m-fadeOut m-fadeIn absolute").addClass("m-fadeIn");
       
    } else {
       
    }
}
function initialData() {

    $("#ddlType1").val([1]).selectpicker('refresh').trigger('change');
   
    $("#ddlProvince1").selectpicker('refresh').trigger('change');
    $("#ddlProvince2").selectpicker('refresh').trigger('change');
   
    var types = $("#ddlType1").val();

    selectLocationLevel = 0;
    LoadConstructionType();
    LoadAddress();
    LoadData(selectLocationLevel, "");


    $.get(mapApi.getServerPath() + "/api/PriceSys/GetDropDownList", { Code: 'construction'}, function (data) {
        if (data != null && data.length > 0) {
            $("#ddlYear").append("<option value=''>เลือกทั้งหมด</option>");
            $.each(data, function (index, row) {
                $("#ddlYear").append(`<option value="${row.Value}">${row.Name}</option>`);
            });


        }
        });

}



/******************************
Start Event button
 *****************************/

$(document).on("change", "#ddlConstructionType", function () {
    LoadData(selectLocationLevel, selectCode);
});



$(document).on("click", ".btnRegion", function () {
 //   alert($(this).attr('data'))
  //  $('body').pleaseWait();
    selectCode = $(this).attr('data');
    $("#ddlRegion").val($(this).attr('data'))
    if (selectCode == "") {
        selectLocationLevel = 0;
    } else {
        selectLocationLevel = 1;
    }
    
    ReLoadAddress(selectCode);
    LoadData(selectLocationLevel, $(this).attr('data'));

  
});


$(document).on("click", ".btnSearchBuiding", function () {

    selectCode = $("#ddlRegion").val();
   
    if (selectCode == "") {
        selectLocationLevel = 0;
    } else {
        selectLocationLevel = 1;
    }

    selectCode = $("#ddlProvince1").val();

    if (selectCode != "") {
        selectLocationLevel = 2;
    }
    LoadData(selectLocationLevel, selectCode);

   
   

});




$(document).on("click", ".btnProvince", function () {
    //   alert($(this).attr('data'))

   // $('body').pleaseWait();
    selectCode = $(this).attr('data');
    selectLocationLevel = 2;
    $("#ddlProvince").val($(this).attr('data'))

    ReLoadAddress(selectCode);
    LoadData(selectLocationLevel, $(this).attr('data'));

    
});

$(document).on("click", ".btnAmphure", function () {
   // $('body').pleaseWait();
    selectCode = $(this).attr('data');
    $("#ddlDistrict").val($(this).attr('data'))
    selectLocationLevel = 3;
    ReLoadAddress(selectCode);
    LoadData(selectLocationLevel, $(this).attr('data'));
   
});


$(document).on("click", ".btnTumbol", function () {
  //  $('body').pleaseWait();
    selectLocationLevel = 4;
    selectCode = $(this).attr('data');
    $("#ddlSubdistrict").val($(this).attr('data'))
    ReLoadAddress(selectCode);
  //  $("#ddlSubdistrict").trigger("change");
    LoadData(selectLocationLevel, $(this).attr('data'));
});


var regionId = '';
var provinceId = '';
var districtId = '';


function ReLoadAddress(selectCode) {

    var filterData = {};

    if (selectLocationLevel == '4') {

        filterData = SectionTumbol.filter(t => t.SUB_C == selectCode);
        filterData = filterData[0];

        if (LocationType == '2')
            LoadProvice(filterData.ClusterCode, filterData.PRO_C);
        else
            LoadProvice(filterData.RegionCode != null ? filterData.RegionCode : null, filterData.PRO_C);

       
        LoadDistinct(filterData.PRO_C, filterData.DIS_C);
        LoadSubDistinct(filterData.DIS_C, filterData.SUB_C);
    } else if (selectLocationLevel == '3') {

        filterData = SectionAmphure.filter(t => t.DIS_C == selectCode);
        filterData = filterData[0];

        if (LocationType == '2')
            LoadProvice(filterData.ClusterCode, filterData.PRO_C);
        else
            LoadProvice(filterData.RegionCode, filterData.PRO_C);

      
        LoadDistinct(filterData.PRO_C, filterData.DIS_C);
        LoadSubDistinct(filterData.DIS_C);
    } else if (selectLocationLevel == '2') {

        filterData = SectionProvince.filter(t => t.PRO_C == selectCode);

        filterData = filterData[0];

        if (LocationType == '2')
            LoadProvice(filterData.ClusterCode, filterData.PRO_C);
            else
        LoadProvice(filterData.RegionCode, filterData.PRO_C);
        LoadDistinct(filterData.PRO_C);
        LoadSubDistinct(null);
    } else if (selectLocationLevel == '1') {

        LoadProvice(selectCode, '');
        LoadDistinct(null);
        LoadSubDistinct(null);
    } else if (selectLocationLevel == '0') {
        LoadProvice(selectCode, '');
        LoadDistinct(null);
        LoadSubDistinct(null);
    }

}


function LoadProvice(regionId,provincecode) {

    $('#ddlProvince').empty();
    $('#ddlProvince').append("<option value=''>เลือกจังหวัด</option>");
    $('#ddlProvince').prop('disabled', false);

    if (SectionProvince != null && SectionProvince.length > 0) {
        $('#ddlProvince').empty();
        $('#ddlProvince').append("<option value=''>เลือกจังหวัด</option>");

        /// Load by Region Code
        if (LocationType == "1") {
            $.each(SectionProvince.filter(p => p.RegionCode == regionId), function (index, province) {
                $("#ddlProvince").append("<option value='" + province.PRO_C + "'>" + province.NAME_T + "</option>");
            });
        }

        /// Load by Cluster Code
        else if (LocationType == "2") {
            $.each(SectionProvince.filter(p => p.ClusterCode == regionId), function (index, province) {
                $("#ddlProvince").append("<option value='" + province.PRO_C + "'>" + province.NAME_T + "</option>");
            });
        }


        if (provincecode != null)
            $('#ddlProvince').val(provincecode);  

        var proviceOption1 = $("#ddlProvince option").clone();


        $("#ddlProvince1").empty();
        $("#ddlProvince1").append(proviceOption1);
        $("#ddlProvince1").selectpicker('refresh')


        var proviceOption2 = $("#ddlProvince option:not([value='" + provincecode + "']):not([value='999999'])").clone();
        $("#ddlProvince2").empty();
        $("#ddlProvince2").append(proviceOption2);
        $("#ddlProvince2").selectpicker('refresh')


    }
}


function LoadDistinct(provinceid,distinctid) {

    $('#ddlDistrict').empty();
    $('#ddlDistrict').append("<option value=''>เลือกอำเภอ</option>");
    $('#ddlDistrict').prop('disabled', false);

    if (SectionAmphure != null && SectionAmphure.length > 0) {
       
     

        $.each(SectionAmphure.filter(p => p.PRO_C == provinceid), function (index, district) {
            $("#ddlDistrict").append("<option value='" + district.DIS_C + "'>" + district.NAME_T + "</option>");
        });

        if (distinctid != null && distinctid!='')
            $('#ddlDistrict').val(distinctid);  

    }
}


function LoadSubDistinct(districtId,subdistinctid) {

    $('#ddlSubdistrict').empty();
    $('#ddlSubdistrict').append("<option value=''>เลือกตำบล</option>");
    $('#ddlSubdistrict').prop('disabled', false);

    if (SectionTumbol != null && SectionTumbol.length > 0) {
      
       

        $.each(SectionTumbol.filter(p => p.DIS_C == districtId), function (index, subDistricts) {
            $("#ddlSubdistrict").append("<option value='" + subDistricts.SUB_C + "'>" + subDistricts.NAME_T + "</option>");
        });

        if (subdistinctid != null && subdistinctid!="")
            $('#ddlSubdistrict').val(subdistinctid);  

    }
}




$(document).on("change", "#ddlRegion", function () {

    var selectId = $(this).val();
    selectLocationLevel = selectId==''? 0 : 1; // 0 all region ,1 select region

   
    LoadData(selectLocationLevel, selectId);

    $('#ddlProvince').empty();
    $('#ddlProvince1').empty();
   // $('#ddlProvince2').empty();
    $('#ddlDistrict').empty();
    $('#ddlSubdistrict').empty();

    $('#ddlProvince').append("<option value=''>เลือกจังหวัด</option>");
    $('#ddlDistrict').append("<option value=''>เลือกอำเภอ</option>");
    $('#ddlSubdistrict').append("<option value=''>เลือกตำบล</option>");

    regionId = $('#ddlRegion').val();


    ReLoadAddress(regionId);
   // LoadProvice(regionId);
    
   /* mapApi.getProvincesByRegion(LocationType, regionId, function (provinces) {

        if (provinces != null && provinces.length > 0) {
            $('#ddlProvince').empty();
            $('#ddlProvince').append("<option value=''>เลือกจังหวัด</option>");

            $.each(provinces, function (index, province) {
                $("#ddlProvince").append("<option value='" + province.ID + "'>" + province.Name + "</option>");
            });

       

            
        }
    });*/
  
});


$(document).on("change", "#ddlProvince", function (event) {


   var selectId = $("#ddlProvince").val();

    $('#ddlDistrict').empty();
    $('#ddlSubdistrict').empty();
    $('#ddlSubdistrict').append("<option value=''>เลือกตำบล</option>");


    var proviceOption1 = $("#ddlProvince option:not([value='" + selectId + "']):not([value='999999'])").clone();
    $("#ddlProvince1").empty();
    $("#ddlProvince1").append(proviceOption1);
    $("#ddlProvince1").selectpicker('refresh')


    if (selectId == '') {
        selectLocationLevel = 1;
        selectId = $('#ddlRegion').val();
        $('#ddlDistrict').append("<option value=''>เลือกอำเภอ</option>");
        LoadData(1, selectId);

    }

    else {
        selectLocationLevel = 2;
        LoadData(2, selectId);

    }

    ReLoadAddress(selectId);
   




   

   /* mapApi.getDistrictsByProvince(regionId, provinceId, function (districts) {

        if (districts != null && districts.length > 0) {

            $('#ddlDistrict').append("<option value=''>เลือกอำเภอ</option>");

            $.each(districts, function (index, district) {
                $("#ddlDistrict").append("<option value='" + district.ID + "'>" + district.Name + "</option>");
            });
          
        }
    });*/

    // event.stopPropagation();
});





$(document).on("change", "#ddlDistrict", function () {
    var selectId = $("#ddlDistrict").val();
    $('#ddlSubdistrict').empty();
    if (selectId == '') {
        selectLocationLevel = 2;
        selectId = $("#ddlProvince").val();
        $('#ddlSubdistrict').append("<option value=''>เลือกตำบล</option>");
        LoadData(2, selectId);
    }

    else {

        selectLocationLevel = 3;
        LoadData(3, selectId);
    }

    ReLoadAddress(selectId);



/*

    mapApi.getSubDistrictsByDistrict(regionId, districtId, function (subDistricts) {

        $('#ddlSubdistrict').append("<option value=''>เลือกตำบล</option>");
        $('#ddlSubdistrict').prop('disabled', false);
        $.each(subDistricts, function (index, subDistrict) {
            $("#ddlSubdistrict").append("<option value='" + subDistrict.ID + "'>" + subDistrict.Name + "</option>");
        });
    });*/
});



    $(document).on("change", "#ddlSubdistrict", function () {
        var selectId = $(this).val();

        if (selectId == '') {
            selectLocationLevel = 3;
            var districtId = $("#ddlDistrict").val();
            selectId = districtId;
            LoadData(3, districtId);
        }
        else {
            selectLocationLevel = 4;
            LoadData(4, selectId);
        }

        ReLoadAddress(selectId);
    
});

$(document).on("change", "#ddlType1", function () {

    var types = $(this).val();

   // LoadSection(types)

});




$("#ddlProvince1").change(function (event) {

    $("#ddlProvince2").empty();

    var provinceId = $("#ddlProvince1").val();
    var proviceOption1 = $("#ddlProvince1 option:not([value='" + provinceId + "']):not([value='999999'])").clone();

    $("#ddlProvince2").append(proviceOption1);
    $("#ddlProvince2").selectpicker('refresh');


});






function LoadGovment() {

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
    $(".divGov").empty();


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

                        tableStr += '<tr data-toggle="collapse" data-target="#accordion" class="clickable" onclick="loadImpactShapes(' + item.ID + ',0)">';
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
                    $(".divGov").append(tableStr);
                    //   $(".tblInfoSection4").DataTable({ searching: true, info: false });
                }
            }
        }
    });



}


$(document).on("click", "#rdCluster", function () {

    if ($(this).prop("checked")) {
        DisplaySection2SearchRegionCluster(2)
    } else {
        DisplaySection2SearchRegionCluster(1)
    }

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

      

    } else ///// cluster
    {
        LocationType = '2';

        LoadCluster();
     

    }
}



function LoadCluster() {
    $("#ddlRegion").empty();

    $("#ddlRegion").append("<option value=''>กรุณาเลือก</option>");
    $.ajax({
        url: mapApi.getServerPath()  + "/api/Address/GetCluster",
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

            //if (regionSelectedId != '') {
            //    $("#ddlRegion").val(regionSelectedId)
            //}
        }
    });

}




/******************************
End Event button
 *****************************/


