
//=============================================== Get API JS ==========================================================
var provincesMap = {};
var districtsMap = {};
var subDistrictsMap = {};
var poiList = [];



$(function () {
    http.get("/api/TraceProgress/GetProvice", {}, function (data) {
        $("#province").empty();
        $("#province").append("<option value=''>จังหวัด</option>");
        $.each(data, function (index, row) {
            provincesMap[row.PROVINCE_SEQ] = row;
            //$("#province").append("<option value='" + row.PROVINCE_ID + "'>" + row.PROVINCE_NAME_TH + "</option>");
            //$("#province").append("<option value='" + row.PROVINCE_SEQ + "'>" + row.PROVINCE_NAME_TH + "</option>");
            $("#province").append("<option value='" + row.PRO_C + "'>" + row.ON_PRO_THA + "</option>");

        });
        //$("#province").selectpicker('refresh');
    });

    //http.get("/api/Address/GetProvinces", {}, function (data) {
    //    $("#province").empty();
    //    $("#province").append("<option value=''>จังหวัด</option>");
    //    $.each(data, function (index, row) {
    //        provincesMap[row.PROVINCE_SEQ] = row;
    //        //$("#province").append("<option value='" + row.PROVINCE_ID + "'>" + row.PROVINCE_NAME_TH + "</option>");
    //        $("#province").append("<option value='" + row.PROVINCE_SEQ + "'>" + row.PROVINCE_NAME_TH + "</option>");
    //    });
    //    //$("#province").selectpicker('refresh');
    //});

    //http.get("/api/TraceProgress/GetUMSystem", {}, function (data) {
    //    $("#ddlsystem").empty();
    //    $.each(data, function (index, row) {
    //        $("#ddlsystem").append("<option value='" + row.SYS_ID + "'>" + row.SYS_NAME + "</option>");
    //    });
    //    //$("#ddlsystem").selectpicker('refresh');
    //});
    
    http.get("/api/TraceProgress/GetLoginHistory", {}, function (data) {
        var htmlTable = '';
        $.each(data, function (index, row) {
            htmlTable += '<tr>';
            htmlTable += '<td>' + row.DATE_LOGIN + '</td>';
            htmlTable += '<td>' + row.DATE_LOGIN + '</td>';
            htmlTable += '</tr>';

        });
        $('#tTabletbody').empty();
        $('#tTabletbody').append(htmlTable);
 
        var pathname = window.location.pathname; // Returns path only
        var url = window.location.href;     // Returns full URL

        $.getScript(jquer3PathJS, function () {
            $.getScript(dataTableJS, function () {
                $.getScript(bootStrapDataDableJS, function () {
                    //$('#tTable').dataTable();
                });
            });
        });
    });

    GetRegion();

    // === on change DDL ===
    $("#province").change(function () {
        var provinceId = $("#province").val();
        //http.get("/api/Address/GetStateById", { ID: provinceId }, function (data) {
             
        //    // 1. Get อำเภอ
        //    $.getScript(jquer3PathJS, function () {
        //        $.getScript(bootStrapSelectJS, function () {
        //            $("#district").append("<option value=''>เขต/อำเภอ</option>");
        //        });
        //    });
            
        //    //districtsMap = {};
        //    $("#district").empty();
        //    $.each(data, function (index, row) {
        //        $("#district").append("<option value='" + row.AMPHUR_SEQ + "'>" + row.AMPHUR_NAME_TH + "</option>");
        //    });

        //    // 2. Get ตำบล
        //    //$.getScript(jquer3PathJS, function () {
        //    //    $.getScript(bootStrapSelectJS, function () {
        //    //        $("#district").selectpicker('refresh');
        //    //    });
        //    //});
        //    //$("#sub-district").empty();
        //    //$("#sub-district").selectpicker('refresh');
        //});

        http.get("/api/TraceProgress/GetDistrictByProvince", { ProvinceNo: provinceId }, function (data) {
            $("#district").empty();
            $("#district").append("<option value=''>เขต/อำเภอ</option>");
            $.each(data, function (index, row) {
                //provincesMap[row.PROVINCE_SEQ] = row;
                provincesMap[row.DIS_C_ONLY] = row;
                $("#district").append("<option value='" + row.DIS_C_ONLY + "'>" + row.ON_DIS_THA + "</option>");
            });
        });

        // 3. Zoom แผนที่
        console.log('=========x==========');
        console.log(provincesMap);
        console.log(provincesMap[provinceId]);
        //console.log(provincesMap[provinceId].PROVINCE_ID);
        //console.log(provinceId);
        console.log('=========y==========');

        //map.zoomProc(provincesMap[provinceId].PROVINCE_ID);
        console.log(provinceId);
        map.zoomProc(provinceId);

        //user Fix ไปก่อน
        var username = 'USER';
        var yearcode = 'Y2561';
        var documenttype = 'DC01';
            

        //GetProvinceReportSummaryByDocumentType_Land(username, yearcode, documenttype, provinceId); // วาด Charts ที่ดิน
        //GetProvinceReportSummaryByDocumentType_Condominium(username, yearcode, documenttype, provinceId); // วาด Charts อาคารชุด
        //GetProvinceReportSummaryByDocumentType_Building(username, yearcode, documenttype, provinceId); // วาด Charts สิ่งปลูกสร้าง
    });



    $("#district").change(function () {
        var province = $("#province").val();
        var district = $("#district").val();
        var dis4code = province + district;
        console.log(dis4code);

        http.get("/api/TraceProgress/GetTambonByProvinceDitinct", { Dis4code: dis4code }, function (data) {
            console.log(data);
            $("#tambol").empty();
            $("#tambol").append("<option value=''>แขวง/ตำบล</option>");
            $.each(data, function (index, row) {
                $("#tambol").append("<option value='" + row.SUB_C_ONLY + "'>" + row.ON_SUB_THA + "</option>");
            });
        });


        //http.get("/api/Address/GetTambolById", { ID: district }, function (data) {
        //    $("#btn-search-address").removeAttr('disabled');
        //    $("#sub-district").empty();
        //    $("#sub-district").append("<option value=''>แขวง/ตำบล</option>");

        //    subDistrictsMap = {};
        //    $.each(data, function (index, row) {
        //        subDistrictsMap[row.TAMBOL_SEQ] = row;
        //        $("#sub-district").append("<option value='" + row.TAMBOL_SEQ + "'>" + row.TAMBOL_NAME_TH + "</option>");
        //    });
        //    $("#sub-district").selectpicker('refresh');
        //});
        //map.zoomAmphoe(districtsMap[district].AMPHUR_ID);
    });

    $("#sub-district").change(function () {
        var subDistrict = $("#sub-district").val();
        map.zoomTambol(subDistrictsMap[subDistrict].TAMBOL_ID);
    });

    // === on click tab ===
    $("#btn-detail-price").click(function () {
        $('#blog-filter-detail').css('display', 'block');
        removeTab();
        $('#btn-detail-price').addClass('active');
    });
    $("#btn-change-price").click(function () {
        $('#blog-filter-detail').css('display', 'none');
        $('#blog-filter-progress').css('display', 'none');
        removeTab();
        $('#btn-change-price').addClass('active');
    });
    $("#btn-detail-building").click(function () {
        $('#blog-filter-detail').css('display', 'none');
        $('#blog-filter-progress').css('display', 'none');
        removeTab();
        $('#btn-detail-building').addClass('active');
    });
    $("#btn-analys").click(function () {
        $('#blog-filter-detail').css('display', 'none');
        $('#blog-filter-progress').css('display', 'none');
        removeTab();
        $('#btn-analys').addClass('active');
    });
    $("#btn-progress").click(function () {
        $('#blog-filter-detail').css('display', 'none');
        $('#blog-filter-progress').css('display', 'block');
        $('#blog-filter-loginhistory').css('display', 'none');
        removeTab();
        $('#btn-progress').addClass('active');
    });
    $("#btn-loginhistory").click(function () {
        $('#blog-filter-detail').css('display', 'none');
        $('#blog-filter-progress').css('display', 'none');
        $('#blog-filter-loginhistory').css('display', 'block');
        removeTab();
        $('#btn-loginhistory').addClass('active');
    });

    $("#btn-results-detail").click(function () {
        $('#results-detail').css('display', 'none');
        $('#plots-list').css('display', 'block');
    });
    $("#btn-plots-list").click(function () {
        $('#plots-list').css('display', 'none');
        $('#plots-detail').css('display', 'block');
    });

    $("#btn-back-results-detail").click(function () {
        $('#results-detail').css('display', 'none');
        $('#results-list').css('display', 'block');
    });

    $("#btn-back-plots-list").click(function () {
        $('#plots-list').css('display', 'none');
        $('#results-detail').css('display', 'block');
    });

    $("#btn-back-plots-detail").click(function () {
        $('#plots-detail').css('display', 'none');
        $('#plots-list').css('display', 'block');
    });

    //beginTable();

    console.log($('#ddlsystem'));
    $('.btn-group bootstrap-select show-tick show-menu-arrow').width(1300);
});
 




function beginTable() {
    $.getScript(jquer3PathJS, function () {
        $.getScript(dataTableJS, function () {
            $.getScript(bootStrapDataDableJS, function () {
                http.get("/api/TraceProgress/GetTraceProgressByRegion", { Username: 'USER', YearCode: 'Y2561', DocumentType: 'DC01' }, function (data) {
                    console.log(data);
                    var table = $('#tTableTraceProgressByRegion').DataTable({
                        "responsive": true,
                        "data": (data),
                        "columnDefs": [
                            { responsivePriority: 1, targets: 0 }
                        ],
                        "columns": [
                            {
                                "data": "RegionName", className: "dt-center"
                            },
                            {
                                "data": "TotalCount", className: "dt-left"
                            },
                            {
                                "data": "PercentSuccess", className: "dt-center"
                            },
                            {
                                "data": "PercentSuccess", className: "dt-left"
                            },
                            {
                                "data": "PercentSuccess", className: "dt-left"
                            }
                        ],
                        "bFilter": false,
                        "ordering": true,
                        "bPaginate": true,
                        "sPaginationType": "full_numbers",
                        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                    });
                });

            });
        });
    });
}

function GetRegion() {

    $.getScript(jquer3PathJS, function () {
        var radiotype = $('input[name=RadioTabTypeSearch]:checked').val();
        if (radiotype == undefined) {
            radiotype = 'DC01';
        }

        http.get("/api/TraceProgress/GetTraceProgressByRegion", { Username: 'USER', YearCode: 'Y2561', DocumentType: radiotype }, function (data) {
            var htmlTable = '';
            $.each(data, function (index, row) {
                htmlTable += '<tr>';
                htmlTable += '<td style="text-align:center"><u style="cursor: pointer;"><a onclick="GetTraceProgressByProvince(' + row.Id + ')">' + row.RegionName + '</a></u></td>';
                htmlTable += '<td style="text-align:center">' + row.TotalCount + '</td>';
                htmlTable += '<td style="text-align:center">' + row.PercentSuccess + '</td>';
                htmlTable += '<td style="text-align:center">' + row.PercentOnProcess + '</td>';
                htmlTable += '<td style="text-align:center">' + row.PercentNoAction + '</td>';
                htmlTable += '</tr>';
            });


            $.getScript(jquer3PathJS, function () {
                $.getScript(dataTableJS, function () {
                    $.getScript(bootStrapDataDableJS, function () {
                        $('#tTraceProgressByRegion').empty();
                        $('#tTraceProgressByRegion').append(htmlTable);
                    });
                });
            });
        }), function (error) {
            console.log(error);
        };
    });
}
//string Username, string YearCode, string DocumentType, string RegionId)

//(string Username, string YearCode, string DocumentType, string Province)
function GetTraceProgressByDistrict2(Province) {
    if (Province != '') {
        http.get("/api/TraceProgress/GetTraceProgressByDistrict", { Username: 'USER', YearCode: 'Y2561', DocumentType: 'DC01', Province: Province }, function (data) {
            var htmlTable = '';

            TabTraceProgressByDistrictOnclick();
            $.each(data, function (index, row) {
                htmlTable += '<tr>';
                htmlTable += '<td style="text-align:center"><u style="cursor: pointer;"><a onclick="GetTraceProgressByTambon(' + Province + ',' + row.District + ')">' + row.DistrictName + '</a></u></td>';
                htmlTable += '<td style="text-align:center">' + row.TotalCountTambon + '</td>';
                htmlTable += '<td style="text-align:center">' + row.PercentSuccess + '</td>';
                htmlTable += '<td style="text-align:center">' + row.PercentOnProcess + '</td>';
                htmlTable += '<td style="text-align:center">' + row.PercentNoAction + '</td>';
                //htmlTable += '<td style="text-align:center"><i class="fa fa-user" style="cursor:pointer" aria-hidden="true" onclick="GetAssignmentDistrict(' + Province + ',' + row.District + ')"></i></td>';
                
                htmlTable += '</tr>';
            });

            //$('#tTableTraceProgressByDistrict').DataTable().destroy();
            $('#tTraceProgressByDistrict').empty();
            $('#tTraceProgressByDistrict').append(htmlTable);

            //$.getScript(jquer3PathJS, function () {
            //    $.getScript(dataTableJS, function () {
            //        $.getScript(bootStrapDataDableJS, function () {
            //            $('#tTableTraceProgressByDistrict').dataTable();
            //        });
            //    });
            //});
        })
    }
}

function GetAssignmentDistrict(Province, District) {
    console.log(Province, District);

    http.get("/api/TraceProgress/GetAppraiseMemberDistrict", { District: District, Province: Province }, function (data) {
        console.log(data);
    });
}


//(string Username, string YearCode, string DocumentType, string Province,string District)
function GetTraceProgressByTambon2(Province, District) {
    if (District != '') {
        http.get("/api/TraceProgress/GetTraceProgressByTambon", { Username: 'USER', YearCode: 'Y2561', DocumentType: 'DC01', Province: Province, District: District }, function (data) {
            var htmlTable = '';

            TabTraceProgressByTambonOnclick();
            $.each(data, function (index, row) {
                htmlTable += '<tr>';
                htmlTable += '<td style="text-align:center">' + row.TambonName + '</td>';
                htmlTable += '<td style="text-align:center">' + row.PercentSuccess + '</td>';
                htmlTable += '<td style="text-align:center">' + row.PercentOnProcess + '</td>';
                htmlTable += '<td style="text-align:center">' + row.PercentNoAction + '</td>';
                htmlTable += '</tr>';
            });

            //$('#tTableTraceProgressByRegion').DataTable().destroy();
            //$('#tTraceProgressByRegion').empty();
             
            //$('#tTableTraceProgressByProvince').DataTable().destroy();
            //$('#tTraceProgressByProvince').empty();

            //$('#tTableTraceProgressByDistrict').DataTable().destroy();
            //$('#tTraceProgressByDistrict').empty();

            //$('#tTableTraceProgressByTambon').DataTable().destroy();
            $('#tTraceProgressByTambon').empty();

            $('#tTableTraceProgressByTambon').append(htmlTable);

            //$.getScript(jquer3PathJS, function () {
            //    $.getScript(dataTableJS, function () {
            //        $.getScript(bootStrapDataDableJS, function () {
            //            $('#tTableTraceProgressByTambon').dataTable();
            //        });
            //    });
            //});
        })
    }
}


//=============================================================================



function removeTab() {
    $('#btn-detail-price').removeClass('active');
    $('#btn-change-price').removeClass('active');
    $('#btn-analys').removeClass('active');
    $('#btn-progress').removeClass('active');
    $('#btn-loginhistory').removeClass('active');
    $('#btn-detail-building').removeClass('active');
}

function GetLoginHistory2() {
    TabLoginHistoryOnclick();

    var timeOnlyStart = $('#timeOnlyStart').val();
    timeOnlyStart = timeOnlyStart.substr(0, 2);
    timeOnlyStart = parseInt(timeOnlyStart);

    var timeOnlyEnd = $('#timeOnlyEnd').val();
    timeOnlyEnd = timeOnlyEnd.substr(0, 2);
    timeOnlyEnd = parseInt(timeOnlyEnd);

    var ddlsystem = $('#ddlsystem').val();
    var ddlsystemparameter = "ALL";
    var first = true;
    $.each(ddlsystem,function (index, value) {
         
        if(first){
            ddlsystemparameter = value;
            first = false;
        } else {
            ddlsystemparameter += ',';
            ddlsystemparameter += value;
        }
    });
    
    var dateOnlyStart = $('#dateOnlyStart').val();
    var dateOnlyEnd = $('#dateOnlyEnd').val();

    if (timeOnlyStart < timeOnlyEnd) {
        http.get("/api/TraceProgress/GetLoginHistory", { datestart: dateOnlyStart, dateend: dateOnlyEnd, timestart: timeOnlyStart, timeend: timeOnlyEnd, sysid: ddlsystemparameter }, function (data) {
            //==== Genarate TABLE 
            // Create Header
            var HTMLHEADER = '<tr>';
            var HTMLDETAIL = '<tr>';
            HTMLHEADER += '<th style="text-align:center">ชื่อระบบ</th>';

            $.each(data.Table, function (index, row) {
                HTMLHEADER += '<th style="text-align:center">' + row.TimeRange + '</th>';
            });
            HTMLHEADER += '</tr>';
            $('#tLoginHistorythead').empty();
            $('#tLoginHistorythead').append(HTMLHEADER);

            // Cereate Deatali
            $.each(data.Table1, function (index, row) {
                HTMLDETAIL += '<tr>';
                HTMLDETAIL += '<td style="text-align:center">' + row.SYS_NAME + '</td>';
                $.each(row, function (index, row2) {
                    if (index != 'SYS_NAME' && index != 'SYS_ID')
                        HTMLDETAIL += '<td style="text-align:center">' + row2 + '</td>';
                });
                HTMLDETAIL += '</tr>';

                $('#tLoginHistorytdody').empty();
                $('#tLoginHistorytdody').append(HTMLDETAIL);
            });

            //==== Genarate Chart Bar ====

            var TimeRange = [];
            var arrayBarData = [];
            var arrayValueTemp = [];
            var colorTemp = "";

            $.each(data.Table, function (index, row) {
                TimeRange.push(row.TimeRange);
            });
            $.each(data.Table1, function (index1, row) {
                arrayValueTemp = [];
                $.each(row, function (index2, row2) {
                    if (index2 != 'SYS_NAME' && index2 != 'SYS_ID') {
                        arrayValueTemp.push(row2);
                    }
                     
                    $.each(data.Table2, function (index3, row3) {
                        if (row.SYS_ID == row3.SYS_ID) {
                            colorTemp = row3.Color;
                        }
                    });
                });


                var DataTemp = {
                    label: row.SYS_NAME,
                    data: arrayValueTemp,
                    backgroundColor: colorTemp,
                    borderWidth: 0,
                };
                arrayBarData.push(DataTemp);
            });

            

            Chart.defaults.global.defaultFontFamily = "Kanit Light";
            var densityCanvas = document.getElementById("divgraph4_ChartBar");
            Chart.defaults.global.defaultFontSize = 18;
             
            var planetData = {
                labels: TimeRange,
                
                datasets: arrayBarData
            };

            var chartOptions = {
                scales: {
                    xAxes: [{
                        barPercentage: 1,
                        categoryPercentage: 0.6,
                        stacked: true
                    }],
                    yAxes: [{
                        id: "y-axis-density"
                        , stacked: true
                    }, {
                        id: "y-axis-gravity"
                    }]
                }
            };

            var barChart = new Chart(densityCanvas, {
                type: 'bar',
                data: planetData,
                options: chartOptions
            });

            barChart.destroy();

            new Chart(densityCanvas, {
                type: 'bar',
                data: planetData,
                options: chartOptions
            });
        });
    } else {
        alert('เวลาเริ่มต้น ต้องน้อยกว่าเวลาสิ้นสุด');
    }

    //console.log('window.innerHeight-->', window.innerHeight);
    //$(window).resize(function () {
    //    $("body").prepend("<div>" + $(window).width() + "</div>");
    //});
     
}
 
function onSearchPriceClick() {

    var province = $("#province").val();
    var district = $("#district").val();
    var subDistrict = $("#sub-district").val();

    var province_id = provincesMap[province] ? provincesMap[province].PROVINCE_ID : null;
    var district_id = districtsMap[district] ? districtsMap[district].AMPHUR_ID : null;
    var subDistrict_id = subDistrictsMap[subDistrict] ? subDistrictsMap[subDistrict].TAMBOL_ID : null;

    http.get("/api/PriceSys/GetPOI", {
        prov_id: province_id, amph_id: district_id, tumb_id: subDistrict_id
    }, function (list) {
        poiList = list;
        $('#search-total').text(list.length);
        $('#search-result').empty();

        $.each(list, function (index, row) {
            var html = `<li>
                            <div class="item" >
                                <div class="wrapper" id="btn-search-result" index="${index}" >
                                    <a href="#" id="1"><h3>${row.NAME_T}</h3></a>
                                    <figure>${row.AMPH_NAME_T} ${row.TUMB_NAME_T} ${row.PROV_NAME_T} ${row.TUMB_CODE}</figure>
                                </div>
                                <div class="wrapper align-right padding-top-0">
                                    <a href="#" id="btn-results-list" index="${index}" ><i class="fa fa-crosshairs" style="font-size: 22px"></i></a>
                                </div>
                            </div>
                        </li>`;
            $("#search-result").append(html);
        });

        $('#search-result').on('click', "#btn-results-list", function (e) {
            var radius = $("#radius").val();
            var poi = poiList[parseInt($(this).attr('index'))];

            map.drawPOI(poi.X, poi.Y, radius);
            e.stopPropagation();
        });

        $('#search-result').on('click', "#btn-search-result", function (e) {
            var poi = poiList[parseInt($(this).attr('index'))];

            var province = $("#province").val();
            var district = $("#district").val();
            var subDistrict = $("#sub-district").val();

            var province_id = provincesMap[province] ? provincesMap[province].PROVINCE_ID : null;
            var district_id = districtsMap[district] ? districtsMap[district].AMPHUR_ID : null;
            var subDistrict_id = subDistrictsMap[subDistrict] ? subDistrictsMap[subDistrict].TAMBOL_ID : null;

            http.get('/api/PriceSys/GetParcelSummary', {
                point: 'POINT(11195621.807372887 1543041.14262334)',
                prov_id: province_id,
                amph_id: district_id,
                tumb_id: subDistrict_id
            }).then(function (result) {
            });


            e.stopPropagation();
        });
    });

    //$('#results-list').css('display', 'inline-block');
    $('#results-list').css('display', 'block');
    $('#results-detail').css('display', 'none');
    $('#plots-list').css('display', 'none');
    $('#plots-detail').css('display', 'none');

}

function conditionSearchMap(value) {
    $('#search-area').css('display', 'none');
    $('#search-map-choice').css('display', 'none');
    $('#btn-search-condition').removeClass('active');
    $('#btn-search-map').removeClass('active');
    $('#btn-search-rawang').removeClass('active');
    $('#blog-filter-search').css('display', 'block');
    $('#results-list').css('display', 'none');
    $('#results-detail').css('display', 'none');
    $('#plots-list').css('display', 'none');
    $('#plots-detail').css('display', 'none');
    $('#filter-location').css('display', 'none');
    $('#filter-rawang').css('display', 'none');

    if (value === 'condition') {
        $('#search-area').css('display', 'block');
        $('#btn-search-condition').addClass('active');
        $('#results-detail').css('display', 'none');
        $('#filter-location').css('display', 'block');
    } else if (value === 'map') {
        $('#search-map-choice').css('display', 'block');
        $('#btn-search-map').addClass('active');
        $('#results-list').css('display', 'none');
        $('#filter-location').css('display', 'block');
    } else if (value === 'rawang') {
        $('#btn-search-rawang').addClass('active');
        $('#results-list').css('display', 'none');
        $('#filter-rawang').css('display', 'block');
    }
}

function onSearchMapStyle(value) {
    $('#results-detail').css('display', 'block');
    $('#btn-search-point').removeClass('active');
    $('#btn-search-line').removeClass('active');

    if (value === 'point') {
        $('#btn-search-point').addClass('active');
    } else if (value === 'line') {
        $('#btn-search-line').addClass('active');
    }

}
 