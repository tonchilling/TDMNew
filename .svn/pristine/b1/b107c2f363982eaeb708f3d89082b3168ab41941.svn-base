var provincesMap = {};
var districtsMap = {};
var subDistrictsMap = {};
var branchMap = {};
var poiList = [];
var provinceList = {};

var paging = {
    start: 0,
    count: 1000
};

var shapes = {
    parcel_shape: null
}

$(function () {
    http.get("/api/Address/GetProvinces", {}, function (data) {

        $("#province").empty();
        $("#province").append("<option value=''>จังหวัด</option>");
        $.each(data, function (index, row) {
            provinceList[row.PROVINCE_ID] = row.PROVINCE_NAME_TH;
            provincesMap[row.PROVINCE_SEQ] = row;
            $("#province").append("<option value='" + row.PROVINCE_SEQ + "'>" + row.PROVINCE_NAME_TH + "</option>");
        });
        $("#province").selectpicker('refresh');

        searchProjectImpactList(0, 1000, null);
    });

    $("#province").change(function () {
        var provinceId = $("#province").val();
        http.get("/api/Address/GetStateById", { ID: provinceId }, function (data) {
            $("#district").empty();
            $("#district").append("<option value=''>เขต/อำเภอ</option>");

            districtsMap = {};

            $.each(data, function (index, row) {
                districtsMap[row.AMPHUR_SEQ] = row;
                $("#filter-search").css('display', 'inline-block');
                $("#district").append("<option value='" + row.AMPHUR_SEQ + "'>" + row.AMPHUR_NAME_TH + "</option>");
            });
            $("#district").selectpicker('refresh');

            $("#sub-district").empty();
            $("#sub-district").selectpicker('refresh');
        });

        http.get("/api/Address/GetProvinceShapeBy", { code: provincesMap[provinceId] ? provincesMap[provinceId].PROVINCE_ID : null }, function (data) {
            map.clear();
            drawCity(data.SHAPE)
        });

        http.get("/api/Address/GetBranchById", { PRO_C: provinceId, DIS_C: 0 }, function (data) {
            $("#branch").empty();
            $("#branch").append("<option value=''>ทั้งหมด</option>");

            branchMap = {};
            $.each(data, function (index, row) {
                branchMap[row.LANDOFFICE_ID] = row;
                $("#branch").append("<option value='" + row.LANDOFFICE_ID + "'>" + row.LANDOFFICE_NAME_TH.replace("สำนักงานที่ดิน", "สนง.") + "</option>");
            });
            $("#branch").selectpicker('refresh');
        });

    });

    $("#district").change(function () {
        var district = $("#district").val();
        var provinceId = $("#province").val();

        http.get("/api/Address/GetTambolById", { ID: district }, function (data) {
            $("#btn-search-address").removeAttr('disabled');
            $("#sub-district").empty();
            $("#sub-district").append("<option value=''>แขวง/ตำบล</option>");

            subDistrictsMap = {};
            $.each(data, function (index, row) {
                subDistrictsMap[row.TAMBOL_SEQ] = row;
                $("#sub-district").append("<option value='" + row.TAMBOL_SEQ + "'>" + row.TAMBOL_NAME_TH + "</option>");
            });
            $("#sub-district").selectpicker('refresh');
        });

        http.get("/api/Address/GetBranchById", { PRO_C: provinceId, DIS_C: district }, function (data) {
            console.log(data);
            $("#branch").empty();
            $("#branch").append("<option value='1'>ทั้งหมด</option>");
            $.each(data, function (index, row) {
                $("#branch").append("<option value='" + row.LANDOFFICE_ID + "'>" + row.LANDOFFICE_NAME_TH.replace("สำนักงานที่ดิน", "สนง.") + "</option>");
            });
            $("#branch").selectpicker('refresh');
        });

        http.get("/api/Address/GetAmphoeShapeBy", { code: districtsMap[district] ? districtsMap[district].AMPHUR_ID : null }, function (data) {
            map.clear();
            drawCity(data.SHAPE)
        });
    });

    $("#sub-district").change(function () {
        var subDistrict = $("#sub-district").val();

        http.get("/api/Address/GetTambolShapeBy", { code: subDistrictsMap[subDistrict] ? subDistrictsMap[subDistrict].TAMBOL_ID : null }, function (data) {
            map.clear();
            drawCity(data.SHAPE)
        });
    });

});

function searchProjectImpactList(start, count, keyword) {
    var district = $("#district").val();
    var provinceId = $("#province").val();
    var branch = $("#branch").val();

    paging.start = start;
    paging.count = count;

    http.get("/api/AreaAnalysis/SumAllProjectImpact", { start: start, count: count, subject_name: keyword }, function (data) {

        http.get("/api/AreaAnalysis/SumAllProjectImpact", {
            start: start,
            count: count,
            prov_code: provincesMap[provinceId] ? provincesMap[provinceId].PROVINCE_ID : null,
            amphur_code: districtsMap[district] ? districtsMap[district].AMPHUR_ID.substring(2, 4) : null,
            branch_code: branch ? branch : null,
            subject_name: keyword
        }, function (data) {
            {

                if ($.fn.dataTable.isDataTable('#tdProjectList')) {
                    //$('#tdProjectList').DataTable().clear().draw();
                }

                $('#tdProjectList').DataTable({
                    responsive: true,
                    searching: false,
                    data: data,
                    bDestroy: true,
                    language: {
                        paginate: {
                            previous: "<",
                            next: ">"
                        }
                    },
                    columns: [
                        { title: "ชื่อโครงการ" },
                        { title: "พื้นที่" },
                        { title: "จำนวนแปลงที่ดินที่กระทบ" },
                        { title: "ราคาประเมินทั้งหมด" },
                    ],
                    columnDefs: [
                        {
                            targets: 0,
                            data: function (row, type, val, meta) {
                                return row.SUBJECT_NAME;
                            }
                        },
                        {
                            targets: 1,
                            data: function (row, type, val, meta) {
                                return row.PROVINCE.map(function (val) {
                                    return val.ON_PRO_THA;
                                }).join(" ");
                            }
                        },
                        {
                            targets: 2,
                            data: function (row, type, val, meta) {
                                return row.PARCEL_IMPACT_COUNT;
                            }
                        },
                        {
                            targets: 3,
                            data: function (row, type, val, meta) {
                                return 'ไม่พบข้อมูล';//row.PARCEL_PRICE;
                            }
                        }
                    ]
                });



                $('#tdProjectList tbody').on('click', 'tr', function () {

                    var data = $('#tdProjectList').DataTable().row(this).data();

                    if (shapes.parcelShape_gid) {
                        map.removeGraphic(shapes.parcelShape_gid);
                        shapes.parcelShape_gid = null;
                    }

                    if (data.PARCEL_SHAPE) {
                        shapes.parcelShape_gid = drawParcel(data.PARCEL_SHAPE);
                    }
                    /*
                    if (shapes.parcelImpactShape_gid) {
                        map.removeGraphic(shapes.parcelImpactShape_gid);
                        shapes.parcelImpactShape_gid = null;
                    }
    
                    if (data.PARCEL_IMPACT_SHAPE) {
                        shapes.parcelImpactShape_gid = drawParcelImpact(data.PARCEL_IMPACT_SHAPE);
                    }
                    //*/

                    if (shapes.areaShape_gid) {
                        map.removeGraphic(shapes.areaShape_gid);
                        shapes.areaShape_gid = null;
                    }

                    if (data.PROJECT_AREA_SHAPE) {
                        shapes.areaShape_gid = drawAreaImpact(data.PROJECT_AREA_SHAPE);
                    }

                });
            }
        });
    });
}


function drawCity(shape) {
    shapes = {};

    var symbol = {
        "type": "esriSFS",
        "style": "esriSFSSolid",
        "color": [0, 0, 0, 20],
        "outline": {
            "type": "esriSLS",
            "style": "esriSLSSolid",
            "color": [0, 0, 0, 255],
            "width": 2
        }
    };
    return drawShape(shape, symbol);
}

function drawParcel(shape) {
    var symbol = {
        "type": "esriSFS",
        "style": "esriSFSSolid",
        "color": [0, 255, 163, 80],
        "outline": {
            "type": "esriSLS",
            "style": "esriSLSSolid",
            "color": [0, 0, 0, 255],
            "width": 1
        }
    };
    return drawShape(shape, symbol);
}

function drawParcelImpact(shape) {
    var symbol = {
        "type": "esriSFS",
        "style": "esriSFSSolid",
        "color": [255, 0, 0, 100],
        "outline": {
            "type": "esriSLS",
            "style": "esriSLSSolid",
            "color": [255, 0, 0, 255],
            "width": 1
        }
    };
    return drawShape(shape, symbol);
}


function drawAreaImpact(shape) {
    var symbol = {
        "type": "esriSLS",
        "style": "esriSLSDash",
        "color": [255, 0, 0, 255],
        "width": 2
    };
    return drawShape(shape, symbol);
}

function drawShape(shape, symbol) {
    if (shape) {
        return map.addGraphic(shape.split(';')[1], symbol);
    }
    return null;
}

function refreshMapDraw() {
    var province = $("#province").val();
    var district = $("#district").val();
    var subDistrict = $("#sub-district").val();

    var province_id = provincesMap[province] ? provincesMap[province].PROVINCE_ID : null;
    var district_id = districtsMap[district] ? districtsMap[district].AMPHUR_ID : null;
    var subDistrict_id = subDistrictsMap[subDistrict] ? subDistrictsMap[subDistrict].TAMBOL_ID : null;

    map.clear();
}

function onSearchClick() {
    searchProjectImpactList(0, 1000, $("#subject_name").val());
}

function onResetClick() {
    $("#subject_name").val("");
    searchProjectImpactList(0, 1000, null);
}