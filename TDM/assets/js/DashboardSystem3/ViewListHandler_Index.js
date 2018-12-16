
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
            var sectionType = '1';
            var code = '';
            SearchAll(sectionType, code)
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
            InitailData(data);
        },
        error: function (response) {
            alert('failure');
        }
    });
}


function InitailData(data)
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

var minCostLimit = 0;
var maxCostLimit = 10000000;
var minCost = minCostLimit;
var maxCost = maxCostLimit;
var slider = null;
var datetimepickerFormat = {format: 'mm-dd-yyyy', minView: 2, pickTime: false, autoclose: true};

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(document).ready(function(){
	controlBS = $('.col-xs-12');
	$('.chartBarNormal').css({'width' : $(controlBS[0]).width()});
	$('.date').datetimepicker(datetimepickerFormat);
	$('#ddlLand, #ddlTown, #ddlBuild').change(function(){
		switch ($(this).val()) {
			case "0": $("." + $(this).attr("data-tab")).fadeIn();
				break;
			default:
				$("." + $(this).attr("data-tab")).fadeOut(0);
				$("." + $(this).attr("data-tab") + ".tab" + $(this).val()).fadeIn();
		}
	});
	$('#ddlLand').change(function(){
		switch($(this).val()) {
			case "0" : $('.chartTab1').fadeIn();
				break;
			default : $('.chartTab1').fadeOut(0);
				$('#tab1primary .tab' + $(this).val()).fadeIn();
				break;
		}
	});
	$('#ddlTown').change(function(){
		switch($(this).val()) {
			case "0" : $('.chartTab2').fadeIn();
				break;
			default : $('.chartTab2').fadeOut(0);
				$('#tab2primary .tab' + $(this).val()).fadeIn();
				break;
		}
	});
	$('#ddlBuild').change(function(){
		switch($(this).val()) {
			case "0" : $('.chartTab3').fadeIn();
				break;
			default : $('.chartTab3').fadeOut(0);
				$('#tab3primary .tab' + $(this).val()).fadeIn();
				break;
		}
	});
	$('.SearchType').click(function() {
		if ($(this).val() == "Region") {
			$('#ddlCluster').attr("disabled", "disabled");
		}
		else {
			$('#ddlCluster').removeAttr("disabled");
		}
	});
    slider = $("#CostEstimateSlider").slider({
		range: true,
		min: minCostLimit,
		max: maxCostLimit,
		step: 10,
		values: [minCost,maxCost],
		slide: function( event, ui ) {
			$("#MinCostEstimate").val(ui.values[0]);
			$("#MaxCostEstimate").val(ui.values[1]);
		}
    });
	$('.MinCostEstimate').val(minCost);
	$('.MaxCostEstimate').val(maxCost);
	$("#MinCostEstimate").on( "change", function() {
		value = $(this).val();
		if (!isNaN(value)) {
			minCost = parseFloat($(this).val());
		}
		else {
			value = minCostLimit;
		}
		slider.slider("values", [minCost,maxCost]);
		slider.slider('refresh');
	});
	$("#MaxCostEstimate").on( "change", function() {
		value = $(this).val();
		if (!isNaN(value)) {
			maxCost = parseFloat($(this).val());
		}
		else {
			value = maxCostLimit;
		}
		slider.slider("values", [minCost,maxCost]);
		slider.slider('refresh');
	});
	$('#CostEstimateType').change(function(){
		indexSelect = $(this)[0].selectedIndex;
		typeSelect = $(this).val();
		$('#CostListTitle').html('ราคาประเมิน' + typeSelect + ' รายภาค');
		$('#CostChartTitle').html('แผนภูมิแสดงราคา' + typeSelect + 'รายภาค');
		$('#CostChartBar').html('');
		$('.CostChartTable, .pmvByArea').fadeOut();
		$('#CostChartTable' + indexSelect).fadeIn();
		$('#pmvByArea' + indexSelect).fadeIn();
		optionChart = null;
		switch (indexSelect) {
			case 1 : 
				optionChart = {
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
							type: 'value',
							boundaryGap: [0, 0.01]
						}
					],
					yAxis: [
						{
							type: 'category',
							data: [{ label: 'ใต้', value: 'ใต้', labelColor: 'yellow' }, 'กลาง', 'เหนือ', 'ตะวันตก', 'ตะวันออก', 'ตะวันออกเฉียงเหนือ']
						}
					],
					series: [
						{
							name: 'ราคาประเมินรวม',
							type: 'bar',
							data: [18203, 23489, 29034, 104970, 131744, 630230],
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
										show: false,
										position: 'top',
										formatter: '{b}\n{c}'
									}
								}
							}

						}
					]
				};
				break;
			case 2 : 
				optionChart = {
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
							type: 'value',
							boundaryGap: [0, 0.01]
						}
					],
					yAxis: [
						{
							type: 'category',
							data: [{ label: 'ใต้', value: 'ใต้', labelColor: 'yellow' }, 'กลาง', 'เหนือ', 'ตะวันตก', 'ตะวันออก', 'ตะวันออกเฉียงเหนือ']
						}
					],
					series: [
						{
							name: 'ราคาประเมินรวม',
							type: 'bar',
							data: [18203, 23489, 29034, 104970, 131744, 630230],
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
										show: false,
										position: 'top',
										formatter: '{b}\n{c}'
									}
								}
							}
						}
					]
				};
				break;
			default : 
				optionChart = {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['蒸发量', '降水量']
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
							data: ['เชียงราย', 'เชียงใหม่', 'แพร่', 'น่าน', 'พะเยา', 'ลำพูน', 'ลำปาง', 'แม่ฮ่องสอน']
						}
					],
					yAxis: [
						{
							type: 'value',
							splitArea: { show: true }
						}
					],
					series: [
						{
							name: 'ราคาซื้อขายที่ดินเฉลี่ยต่อตารางวา',
							type: 'bar',
							data: [150000, 300000, 200000, 90000, 70000, 150000, 190000, 30000],
							itemStyle: {
								normal: {
									color: '#017b01'
								},
								emphasis: {
									color: '#00e600'

								}
							}
						},
						{
							name: 'ราคาซื้อขายที่ดินต่ำสุดเต่อตารางวา',
							type: 'bar',
							data: [30000, 60000, 200000, 43000, 32000, 50000, 60000, 10000],
							itemStyle: {
								normal: {
									color: '#bf9001'
								},
								emphasis: {
									color: '#ffff00'

								}
							}
						}
						,
						{
							name: 'ราคาซื้อขายที่ดินสูงสุดเต่อตารางวา',
							type: 'bar',
							data: [200000, 500000, 250000, 170000, 89000, 260000, 390000, 10000],
							itemStyle: {
								normal: {
									color: '#d61c00'
								},
								emphasis: {
									color: '#ff7043'

								}
							}
						}
					]
				};
		}
		var CostChartBar = echarts.init(document.getElementById('CostChartBar'));
		CostChartBar.setOption(optionChart);
	});
	$('#CostEstimateType').change();
	$('.tabSection').click(function(){
		$('#tabLabelTitle').html($(this).attr('data-tab'));
		$('.sectionTab0, .sectionTab1, .sectionTab2').fadeOut(0);
		$('#CostListTitle').fadeOut(0);
		indexSelect = $(this).attr('data-index');
		$('.CostChartTable, .pmvByArea').fadeOut();
		switch (indexSelect) {
			case "0" : 
				$('#CostEstimateType').change();
				$('#CostListTitle').fadeIn();
				$('#CostChartTable0').fadeIn();
				$('.sectionTab0').fadeIn();
				break;
			case "1" : $('#CostListTitle').html('ภาพรวมราคาซื้อขายจดทะเบียน').fadeIn();
				$('#CostChartBar').html('');
				$('#CostChartTable' + indexSelect).fadeIn();
				$('#pmvByArea' + indexSelect).fadeIn();
				var CostChartBar = echarts.init(document.getElementById('CostChartBar'));
				var option = {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['蒸发量', '降水量']
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
							data: ['เชียงราย', 'เชียงใหม่', 'แพร่', 'น่าน', 'พะเยา', 'ลำพูน', 'ลำปาง', 'แม่ฮ่องสอน']
						}
					],
					yAxis: [
						{
							type: 'value',
							splitArea: { show: true }
						}
					],
					series: [
						{
							name: 'ราคาซื้อขายที่ดินเฉลี่ยต่อตารางวา',
							type: 'bar',
							data: [150000, 300000, 200000, 90000, 70000, 150000, 190000, 30000],
							itemStyle: {
								normal: {
									color: '#017b01'
								},
								emphasis: {
									color: '#00e600'

								}
							}
						},
						{
							name: 'ราคาซื้อขายที่ดินต่ำสุดเต่อตารางวา',
							type: 'bar',
							data: [30000, 60000, 200000, 43000, 32000, 50000, 60000, 10000],
							itemStyle: {
								normal: {
									color: '#bf9001'
								},
								emphasis: {
									color: '#ffff00'

								}
							}
						}
						,
						{
							name: 'ราคาซื้อขายที่ดินสูงสุดเต่อตารางวา',
							type: 'bar',
							data: [200000, 500000, 250000, 170000, 89000, 260000, 390000, 10000],
							itemStyle: {
								normal: {
									color: '#d61c00'
								},
								emphasis: {
									color: '#ff7043'

								}
							}
						}
					]
				};
				CostChartBar.setOption(option);
				SalePriceProvinceChartBar = echarts.init(document.getElementById('SalePriceProvinceChartBar'));
				var SalePriceProvinceChartBarOption = {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['蒸发量', '降水量']
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
							data: ['เชียงราย', 'เชียงใหม่', 'แพร่', 'น่าน', 'พะเยา', 'ลำพูน', 'ลำปาง', 'แม่ฮ่องสอน']
						}
					],
					yAxis: [
						{
							type: 'value',
							splitArea: { show: true }
						}
					],
					series: [
						{
							name: 'ราคาซื้อขายที่ดินเฉลี่ยต่อตารางวา',
							type: 'bar',
							data: [150000, 300000, 200000, 90000, 70000, 150000, 190000, 30000],
							itemStyle: {
								normal: {
									color: '#017b01'
								},
								emphasis: {
									color: '#00e600'

								}
							}
						},
						{
							name: 'ราคาซื้อขายที่ดินต่ำสุดเต่อตารางวา',
							type: 'bar',
							data: [30000, 60000, 200000, 43000, 32000, 50000, 60000, 10000],
							itemStyle: {
								normal: {
									color: '#bf9001'
								},
								emphasis: {
									color: '#ffff00'

								}
							}
						}
						,
						{
							name: 'ราคาซื้อขายที่ดินสูงสุดเต่อตารางวา',
							type: 'bar',
							data: [200000, 500000, 250000, 170000, 89000, 260000, 390000, 10000],
							itemStyle: {
								normal: {
									color: '#d61c00'
								},
								emphasis: {
									color: '#ff7043'

								}
							}
						}
					]
				}
				SalePriceProvinceChartBar.setOption(SalePriceProvinceChartBarOption);
				$('.sectionTab1').fadeIn();
				break;
			default : $('.sectionTab2').fadeIn();
		}
		$('#tabSection').fadeIn();
	});
	$('.tabSection')[0].click();
	$('#example').DataTable();
	//$("#projectListTable").DataTable();
});
