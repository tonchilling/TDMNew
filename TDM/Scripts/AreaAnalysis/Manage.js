var paging = {
    start: 0,
    count: 1000
};

$(function () {
    $('#datetimepicker4').datetimepicker({
        format: 'mm-dd-yyyy',
        minView: 2,
        pickTime: false,
        autoclose: true
    });

    $('#datetimepicker5').datetimepicker({
        format: 'mm-dd-yyyy',
        minView: 2,
        pickTime: false,
        autoclose: true
    });


    $.get("/TDManagement/api/AreaAnalysis/GetAllProvince", {}, function (data) {
        console.log("GetAllProvince")
        $("#allProvince").empty();
        $("#allProvince").append("<option value=''>เลือกพื้นที่ที่กระทบกับโครงการ</option>");
        $.each(data, function (index, row) {
            $("#allProvince").append(`<option value="${row.NAME}">${row.NAME}</option>`);
        });
        $("#allProvince").selectpicker('refresh');
    });

    searchProjectImpactList(0, 1000, null);


    $.fn.serializeObject = function () {
        var o = Object.create(null),
            elementMapper = function (element) {
                element.name = $.camelCase(element.name);
                return element;
            },
            appendToResult = function (i, element) {
                var node = o[element.name];

                if ('undefined' !== typeof node && node !== null) {
                    o[element.name] = node.push ? node.push(element.value) : [node, element.value];
                } else {
                    o[element.name] = element.value;
                }
            };

        $.each($.map(this.serializeArray(), elementMapper), appendToResult);
        return o;
    };
});

function searchProjectImpactList(start, count, keyword) {
    var subject_id = "";
    var subject_name = "";
    var prov_name = "";
    var publish_date = "";
    console.log(keyword);
    if (keyword) {
        subject_id = keyword.ProjectID;
        subject_name = keyword.ProjectName;
        prov_name = keyword.ProvName;
        publish_date = keyword.PublishDate;
    }

    paging.start = start;
    paging.count = count;

    $.get("/TDManagement/api/AreaAnalysis/GetAllProjectImpact",
        { start, count, subject_id, subject_name, prov_name, publish_date }, function (data) {
            {

                console.log('GetAllProjectImpact');
            if ($.fn.dataTable.isDataTable('#tdProjectImpactList')) {
                var table = $('#tdProjectImpactList').DataTable();
                table.destroy();
            }

            $('#tdProjectImpactList').DataTable({
                responsive: false,
                searching: false,
                data: data,
                language: {
                    paginate: {
                        previous: "<",
                        next: ">"
                    }
                },
                columns: [
                    { title: "รหัสโครงการ" },
                    { title: "ชื่อโครงการ" },
                    { title: "จังหวัดที่ได้รับผลกระทบ" },
                    { title: "วันที่เผยแพร่ข้อมูล" },
                    { title: "เปิดเผยข้อมูล" },
                    { title: "วัน/ เวลาที่สร้าง" },
                    { title: "ผู้ใช้ที่สร้าง" },
                    { title: "วัน/ เวลาที่แก้ไข" },
                    { title: "ผู้ใช้ที่แก้ไข" },
                    { title: "สถานะ" },
                    { title: "แก้ไข" },
                    { title: "ลบ" },
                ],
                columnDefs: [
                    {
                        targets: 0,
                        data: function (row, type, val, meta) {
                            return row.SUBJECT_ID;
                        }
                    },
                    {
                        targets: 1,
                        data: function (row, type, val, meta) {
                            return row.SUBJECT_NAME;
                        }
                    },
                    {
                        targets: 2,
                        data: function (row, type, val, meta) {
                            var Province = row.PROVINCE.map(function (item) {
                                return item['ON_PRO_THA'];
                            });
                            return Province.join(',');
                        }
                    },
                    {
                        targets: 3,
                        data: function (row, type, val, meta) {
                            var PublishDate = moment(row.PUBLISH_DATE).format('DD/MM/YYYY');
                            if (row.IS_PUBLISHED === false) {
                                PublishDate = "-";
                                if (row.STATUS.ID === 1 || row.STATUS.ID === 2) {
                                    PublishDate = "ข้อมูลไม่สมบูรณ์";
                                }
                            }
                            return PublishDate;
                        }
                    },
                    {
                        targets: 4,
                        data: function (row, type, val, meta) {
                            var IsPublished = "ไม่เปิดเผย";
                            if (row.IS_PUBLISHED) {
                                IsPublished = "เปิดเผย";
                            }
                            return IsPublished;
                        }
                    },
                    {
                        targets: 5,
                        data: function (row, type, val, meta) {
                            return moment(row.CREATE_DATE).format('DD/MM/YYYY h:mm');
                        }
                    },
                    {
                        targets: 6,
                        data: function (row, type, val, meta) {
                            return row.CREATE_BY;
                        }
                    },
                    {
                        targets: 7,
                        data: function (row, type, val, meta) {
                            return moment(row.UPDATE_DATE).format('DD/MM/YYYY h:mm');
                        }
                    },
                    {
                        targets: 8,
                        data: function (row, type, val, meta) {
                            return row.UPDATE_BY;
                        }
                    },
                    {
                        targets: 9,
                        data: function (row, type, val, meta) {
                            return row.STATUS.STATUS_NAME;
                        }
                    },
                    {
                        targets: 10,
                        data: function (row, type, val, meta) {
                            return `<a href="#" class="btn btn-success" onclick="AddProject(${row.ID}, ${row.STATUS.ID})"><i class="glyphicon glyphicon-pencil"></i> </a>`;
                        }
                    },
                    {
                        targets: 11,
                        data: function (row, type, val, meta) {
                            return `<a href="#" class="btn btn-success" onclick="DelProvImpact(${row.ID}, '${row.SUBJECT_NAME}')"><i class="glyphicon glyphicon-trash"></i> </a>`;
                        }
                    }
                ]
            });
        }
    });
}

function onSearchProjectClick(value) {

    if (value === 'Reset') {
        $("#allProvince").val('');
        $("#allProvince").change();
    }

    var searchData = JSON.stringify($('#formSearch').serializeObject());
    searchProjectImpactList(0, 1000, JSON.parse(searchData));
}

function AddProject(projectId, statusId) {

    $("#myModal1").modal("show");
    $("#myModal1").appendTo("body");
   /* var url = http.url("/AreaAnalysis/AddEditProject?projectId=" + projectId + "&statusId=" + statusId);
   
    $("#myModalBodyDiv1").load(url, function () {
        $("#myModal1").modal("show");
        $("#myModal1").appendTo("body");
    });*/
}

function DelProvImpact(projectId, projectName) {
    bootbox.confirm({
        title: "ยืนยันการลบข้อมูล",
        message: `ยืนยันการลบข้อมูล ${projectName} หรือไม่`,
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> ยกเลิก',
                className: 'btn-default'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> ยืนยัน',
                className: 'btn-primary'
            }
        },
        callback: function (result) {
            if (result) {
                var data = {
                    ID: projectId,
                    IS_DELETED: true
                };

                $.ajax({
                    url: http.url("/TDManagement/api/AreaAnalysis/DeleteProject"),
                    type: "POST",
                    data: JSON.stringify(data),
                    dataType: "json",
                    contentType: 'application/json',
                    success: function () {
                        DelSuccess(projectName);
                    }
                });
            }
        }
    });
}

function DelSuccess(projectName) {
    bootbox.alert({
        title: "ยืนยันการลบข้อมูล",
        message: `ยืนยันการลบข้อมูล ${projectName} เรียบร้อยแล้ว`,
        callback: function () {
            window.location.href = http.url("/AreaAnalysis/Manage");
        }
    });
}

