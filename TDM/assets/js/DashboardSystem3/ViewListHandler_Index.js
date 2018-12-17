
var sectionType = '0';
var code = '';
var viewListManager = {
    init: function () {
        searchForm.initComp();

    }

}

var searchForm = {

    initComp: function (eleName) {
        searchForm.setupSearchForm();
        SearchAll('0','');
    },
    ddlProvince: $("#ddlProvince"),
    ddlDistrict: $("#ddlDistrict"),
    ddlSubDistrict: $("#ddlSubdistrict"),
    clearDropDown: function (eleName) {
        var name = '#' + eleName;
        var firstOption = "";


        switch (eleName) {
            case "ddlProvince": firstOption = "เลือกจังหวัด"; break;
            case "ddlDistrict": firstOption = "เลือกอำเภอ"; break;
            case "ddlSubdistrict": firstOption = "เลือกตำบล"; break;
        }
        $(name).empty();
        $(name).append("<option value=''>" + firstOption + "</option>");
        $(name).append("<option value='999999'>ทั้งหมด</option>");
    },
    setupSearchForm: function () {
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

            map.clear();
        });


        $('#ddlProvince').empty();
        $('#ddlProvince').append("<option value=''>เลือกจังหวัด</option>");


        $('#ddlRegion').change(function () {

            // alert('getProvincesByRegion')
            var regionId = $('#ddlRegion').val();
            mapApi.getProvincesByRegion(regionId, function (provinces) {

                if (provinces != null && provinces.length > 0) {
                    $('#ddlProvince').empty();
                    $('#ddlProvince').append("<option value=''>เลือกจังหวัด</option>");

                    $.each(provinces, function (index, province) {
                        $("#ddlProvince").append("<option value='" + province.ID + "'>" + province.Name + "</option>");
                    });

                    $("#ddlProvince").change(function () {

                        var provinceId = $("#ddlProvince").val();
                        searchForm.clearDropDown('ddlDistrict');

                        if (provinceId == '' || provinceId == '999999') {
                            $('#ddlDistrict').prop('disabled', 'disabled');

                            searchForm.clearDropDown('ddlSubdistrict');
                            $('#ddlSubdistrict').prop('disabled', 'disabled');

                        } else {
                            $('#ddlDistrict').prop('disabled', false);
                            mapApi.getDistrictsByProvince(provinceId, function (districts) {
                                if (districts != null && districts.length > 0) {

                                    $.each(districts, function (index, district) {
                                        $("#ddlDistrict").append("<option value='" + district.ID + "'>" + district.Name + "</option>");
                                    });

                                    $('#ddlDistrict').change(function () {
                                        var districtId = $("#ddlDistrict").val();

                                        searchForm.clearDropDown('ddlSubdistrict');

                                        if (districtId == '' || districtId == '999999') {
                                            $('#ddlSubdistrict').prop('disabled', 'disabled');
                                        } else {
                                            mapApi.getSubDistrictsByDistrict(districtId, function (subDistricts) {
                                                $('#ddlSubdistrict').prop('disabled', false);

                                                $.each(subDistricts, function (index, subDistrict) {
                                                    $("#ddlSubdistrict").append("<option value='" + subDistrict.ID + "'>" + subDistrict.Name + "</option>");
                                                });
                                            })
                                        }



                                    });

                                }

                            });
                        }

                    });
                }
            });


        });
        $('#ddlRegion').trigger("change");
    },
    search: function () {
        /**/

        var idOfAll = '999999';
        var searchType = '';
        var targetId = '';

        if ($("#ddlSubdistrict").val() != '') {
            searchType = 'SUB_DISTRICT';
            targetId = $("#ddlSubdistrict").val();
        } else if ($("#ddlDistrict").val() != '') {
            searchType = 'DISTRICT';
            targetId = $("#ddlDistrict").val();
        }
           else if( $("#ddlProvince").val() != ''){
            searchType = 'PROVINCE';
            targetId = $("#ddlProvince").val();
        }



        if ($('#ddlSubdistrict').val() != "")
        {
            sectionType = '4';
            code = $('#ddlSubdistrict').val();
        }
        else if ($("#ddlDistrict").val() != '')
        {
            sectionType = '3';
            code = $('#ddlDistrict').val();
        }
        else if ($("#ddlProvince").val() != '')
        {
            sectionType = '2';
            code = $('#ddlProvince').val();
        }
        else if ($("#ddlRegion ").val() != '') {
            sectionType = '1';
            code = $('#ddlRegion').val();
        } else {
            sectionType = '0';
        }
        //  alert(searchType + '  ' + targetId);

        try {


          
          
          
            //  map.clear();
            if (searchType == 'PROVINCE') {/*render PROVINCE map*/
                //sectionType = '1';
               // code = $('#ddlRegion').val();
                if (targetId == idOfAll) {
                    mapApi.getProvinceShapeByRegion($('#ddlRegion').val(), function (data) {

                        if (data != null && data.length > 0) {

                            $.each(data, function (index, shape) {

                                drawCity(shape.SHAPE);
                            });
                        }
                    });
                } else {
                    mapApi.getProvinceShapeByID(targetId, function (data) {

                        if (data != null) {

                            drawCity(data.SHAPE);
                        }
                    });
                }

            } else if (searchType == 'DISTRICT') {/*render DISTRICT map*/

                //sectionType = '2';
               // code = $('#ddlProvince').val();
                if (targetId == idOfAll) {
                    mapApi.getDistrictShapeByProvince($("#ddlProvince").val(), function (data) {

                        if (data != null && data.length > 0) {
                            $.each(data, function (index, shape) {
                                drawCity(shape.SHAPE);
                            });
                        }
                    });
                } else {


                    mapApi.getDistrictShapeByID(targetId, function (data) {

                        if (data != null) {
                            drawCity(data.SHAPE);
                        }
                    });
                }
            } else { /*render subdistrict map*/
                if (targetId == idOfAll) {
                 //   sectionType = '3';
                 //   code = $('#ddlDistrict').val();
                    mapApi.getSubDistrictShapeByDistrict($("#ddlDistrict").val(), function (data) {

                        if (data != null && data.length > 0) {
                            $.each(data, function (index, shape) {
                                drawCity(shape.SHAPE);
                            });
                        }
                    });
                } else {
                    mapApi.getSubDistrictShapeByID(targetId, function (data) {

                        if (data != null) {
                            drawCity(data.SHAPE);
                        }
                    });
                }
            }

            SearchAll(sectionType, code)

        } catch (e) {
            alert(e.message);
        }

    }



}

function testx() {
    alert('xxxx');
    searchForm.setupSearchForm();

}

var mapApi = {
    getProvincesByRegion: function (regionId, fnSuccess) {


        $.get("/api/Map/GetProvincesByRegion", { id: regionId }, function (provinces) {
            fnSuccess(provinces);
        });
    },
    getDistricts: function (provinceId, fnSuccess) {

        $.get("/api/Map/GetDistrictsByProvince/", {}, function (data) {
            fnSuccess(data);
        });
    },
    getDistrictsByProvince: function (provinceId, fnSuccess) {

        $.get("/api/Map/GetDistrictsByProvince/", { id: provinceId }, function (data) {
            fnSuccess(data);
        });
    },
    getSubDistricts: function (districtId, fnSuccess) {

        $.get("/api/Map/GetSubDistricts/", {}, function (data) {
            fnSuccess(data);
        });
    },
    getSubDistrictsByDistrict: function (districtId, fnSuccess) {

        $.get("/api/Map/GetSubDistrictsByDistrict/", { id: districtId }, function (data) {
            fnSuccess(data);
        });
    },

    getProvinceShapByCode: function (provinceCode, fnSuccess) {
        $.get("/api/Address/GetProvinceShapeBy", { code: provinceCode }, function (data) {
            fnSuccess(data);
        });
    },
    getProvinceShapeByID: function (provinceID, fnSuccess) {
        $.get("/api/Map/GetProvinceShapeByID", { id: provinceID }, function (data) {
            fnSuccess(data);
        });
    },
    getProvinceShapeByRegion: function (regionId, fnSuccess) {
        $.get("/api/Map/GetProvinceShapeByRegion", { id: regionId }, function (data) {
            fnSuccess(data);
        });
    },
    getDistrictShapeByID: function (districtId, fnSuccess) {
        $.get("/api/Map/GetDistrictShapeByID", { id: districtId }, function (data) {
            fnSuccess(data);
        });
    },
    getDistrictShapeByProvince: function (provinceId, fnSuccess) {
        $.get("/api/Map/GetDistrictShapeByProvince", { id: provinceId }, function (data) {
            fnSuccess(data);
        });
    },
    getSubDistrictShapeByID: function (subDistrictId, fnSuccess) {
        $.get("/api/Map/GetSubDistrictShapeByID", { id: subDistrictId }, function (data) {
            fnSuccess(data);
        });
    },
    getSubDistrictShapeByDistrict: function (districtId, fnSuccess) {
        $.get("/api/Map/getSubDistrictShapeByDistrict", { id: districtId }, function (data) {
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

var jAjax = {
    get: function (url, fnSuccess, fnFailure, fnError) {
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: fnSuccess(response),
            failure: fnFailure(response),
            error: fnError(response)
        });
    }
}



function SearchAll(sectionTypeTemp, codeTemp) {


    var objSearch = {};

    objSearch = { SectionType: sectionTypeTemp, code: codeTemp };

    $.ajax({
        type: "POST",
        url: '/api/PriceSys/GetPrice',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(objSearch),
        success: function (data) {
            InitailDataView(data);
        },
        error: function (response) {
            alert('failure');
        }
    });
}


function InitailDataView(data)
{
    $("#lbHeader").text("ราคาประเมิน ราย" + GetSectionDisplayText(sectionType));
    $("#lbHeaderGraph").text("แผนภูมิแสดงราคาที่ดิน ราย" + GetSectionDisplayText(sectionType));
    LoadEvalBox1_LeftBox(data);
    LoadEvalBox1_Graph(data);
    LoadEvalBox1_Table(data);


}

function LoadEvalBox1_LeftBox(data)
{

    var body = "";
    $("#EvalBox1").empty();
    if (data != null) {
        if (data != null && data.length > 0) {
            $.each(data, function (index, data) {
                body += '<div class="alert leftbox leftbox-' + data.DisplayCode + ' msg pmvByAreaBox">';
                body += '<h4>' + data.DisplayName + '</h4>';
                body += '<h5>ราคาสูงสุด : ' + numberWithCommas(parseFloat(data.ParcelPriceMax).toFixed(2)) + ' บาท </h5>';
                body += ' <h5>ราคาต่ำสุด:  ' +   numberWithCommas(parseFloat(data.ParcelPriceMin).toFixed(2)) + ' บาท </h5>';
                body += '<h5>ราคาเฉลี่ย :  ' +  numberWithCommas(parseFloat(data.ParcelPriceAvg).toFixed(2)) + ' บาท </h5>';
                body += ' </div>';
            });
        }
    }

    $("#EvalBox1").append(body);

}

function GetSectionDisplayText(sectionType)
{
    var text = 'ภาค';
    
    switch (sectionType)
    {
        case '0': text = 'ภาค'; break;
        case '1': text = 'จังหวัด'; break;
        case '2': text = 'อำเภอ'; break;
        case '3': text = 'ตำบล'; break;
    }

    return text;
}
function LoadEvalBox1_Graph(data)
{
    var chartBar = echarts.init(document.getElementById('EvalBox1chartBar'));
    var caption = [];
    var maxValue = [];
    var minValue = [];
    var avgValue = [];


    if (data != null)
    {
        if (data != null && data.length > 0) {
            $.each(data, function (index, data) {
                caption.push(data.DisplayName);
                maxValue.push(parseFloat(data.ParcelPriceMax).toFixed(2));
                minValue.push(parseFloat(data.ParcelPriceMin).toFixed(2));
                avgValue.push(parseFloat(data.ParcelPriceAvg).toFixed(2));
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

function LoadEvalBox1_Table(data) {

    var body = "";
    $("#EvalBox1Table").empty();

    body += '<table class="table table-bordered table-striped tblInfo">';
    body += '<thead>';
    body += '<tr>';
    body += '<th scope="col">' + GetSectionDisplayText(sectionType) + '</th>';
    body += '<th scope="col">จำนวนแปลงที่ดิน</th>';
    body += '<th scope="col">พื้นที่รวม</th>';
    body += '<th scope="col">ราคาประเมินที่ดิน</th>';
    body += '</tr>';
    body += '</thead>';
    body += '<tbody>';
    if (data != null) {
        if (data != null && data.length > 0) {
            $.each(data, function (index, data) {
                body += '<tr>';
                body += '<td>' + data.DisplayName + '</td>';
                body += '<td>' + data.LAND_Total + ' แปลง</td>';
                body += '<td>' + data.LAND_AREA + ' ตารางวา</td>';
                body += '<td>' + data.ParcelPrice + ' บาท</td>';
                body += '</tr>';
            });
        }
    }

    body += ' </tbody>';
    body += ' </table>';

    $("#EvalBox1Table").append(body);
    $("#EvalBox1Table table").DataTable({ searching: false, info: false });
}

function searchSuccess(data) {
    if (data != null && data.length > 0) {
        $.each(data, function (index, data) {
            // drawCity(shape.SHAPE);
        });
    }

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



