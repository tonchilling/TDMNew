

var ifrm = document.createElement("iframe");
var gisIframeWindow;

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

    $.get(rootUrl + "/api/AreaAnalysis/GetAllProvince", {}, function (data) {
        console.log("GetAllProvince")
        $("#allProvince").empty();
        $("#allProvince").append("<option value=''>เลือกพื้นที่ที่กระทบกับโครงการ</option>");
        $.each(data, function (index, row) {
            $("#allProvince").append(`<option value="${row.NAME}">${row.NAME}</option>`);
        });
        $("#allProvince").selectpicker('refresh');
    });

    searchProjectImpactList(0, 1000, null);


    $("#ddlProvince").change(function () {
        $('#ddlDistrict').empty();
        $.get(rootUrl + "/api/Map/GetDistrictsByProvince/", { id: $(this).val() }, function (data) {
            $('#ddlDistrict').empty();
            if (data != null && data.length > 0) {


                $.each(data, function (index, data) {
                    $("#ddlDistrict").append("<option value='" + data.ID + "'>" + district.Name + "</option>");
                });
            }
        });
    });
    $("#ddlDistrict").change(function () {
        $.get(rootUrl + "/api/Map/GetSubDistrictsByDistrict/", { id: $(this).val() }, function (data) {
            $('#ddlSubdistrict').empty();
            if (data != null && data.length > 0) {


                $.each(data, function (index, data) {
                    $("#ddlSubdistrict").append("<option value='" + data.ID + "'>" + district.Name + "</option>");
                });
            }
        });
    });
   

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


  
    ifrm.setAttribute("src", "https://p-staging.treasury.go.th/TD2");
    ifrm.style.width = "0px";
    ifrm.style.height = "0px";
    document.body.appendChild(ifrm);
    ifrm.onload = function () {
        gisIframeWindow = ifrm.contentWindow;
    }
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

    $.get(rootUrl + "/api/AreaAnalysis/GetAllProjectImpact",
        { start, count, subject_id, subject_name, prov_name, publish_date }, function (data) {
            {

                console.log('GetAllProjectImpact');
            if ($.fn.dataTable.isDataTable('#tdProjectImpactList')) {
                var table = $('#tdProjectImpactList').DataTable();
                table.destroy();
            }

            $('#tdProjectImpactList').DataTable({
                responsive: true,
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
                                return item['NAME_T'];
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
    var file = $('input[type=file]')[0].files[0];
    console.log("fileName", file.name)
    ImportShape.ShapeFileX(file);
   
    return false;
    if (value === 'Reset') {
        $("#allProvince").val('');
        $("#allProvince").change();
    }

    var searchData = JSON.stringify($('#formSearch').serializeObject());
    searchProjectImpactList(0, 1000, JSON.parse(searchData));
}

function AddProject(projectId, statusId) {

   
    var url = http.url("/AreaAnalysis/AddEditProject?projectId=" + projectId + "&statusId=" + statusId);

    $("#myModalBodyDiv1").load(url, function (response, status, xhr) {
        if (status == "error") {
        } else {
            $("#myModal1").modal("show");
            $("#myModal1").appendTo("body");
        }
    });
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
                    url: http.url(rootUrl + "/api/AreaAnalysis/DeleteProject"),
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
            window.location.href = http.url(rootUrl + "/AreaAnalysis/Manage");
        }
    });
}



var ImportShape = {

    ShapeFileX: function (shpZip) {
        this.unZip(shpZip, function (decompressed) {
            var shpDefObj = { shp: null, dbf: null };
            var hasShp = false;
            var hasDbf = false;
            var keys = Object.keys(decompressed.files);
            for (var i = 0; i < keys.length; i++) {
                var name = keys[i];

                if (name.endsWith('.shp')) {
                    hasShp = true;
                    decompressed.file(name).async("blob").then(

                               function success(content) {
                                   ImportShape.setShapeFile(shpDefObj, "shp", content)
                               }, function error(e) {
                                   console.log("decompressed.file", e)
                               })

                   /* decompressed.file(name).async("blob").then(
                        setShapeFile(shpDefObj, "shp")
                        );*/
                      //  lang.hitch(this, "setShapeFile", shpDefObj, "shp"));
                }
                else if (name.endsWith('.dbf')) {
                    hasDbf = true;
                    decompressed.file(name).async("blob").then(
                        function success(content) {
                            ImportShape.setShapeFile(shpDefObj, "dbf", content)
                        }, function error(e) {
                            console.log("decompressed.file", e)
                        }
                      
                      );
                }

                if (hasShp && hasDbf) break;

            }
        });
    },
    TextFile: function (file) {

    },
    KML_KMZFile: function (file) {

    },
    unZip: function (zipFile, callback) {
        require(["https://p-staging.treasury.go.th/TDManagement/assets/js/JSZip/jszip.js"], function (JSZip) {
       
            (new JSZip()).loadAsync(zipFile).then(callback);
        });
    },
       // (new JSZip()).loadAsync(zipFile).then(callback)

    setShapeFile: function (shpDefObj, strType, blob) {
        if (strType == "shp") {
            shpDefObj.shp = blob;
        }
        else if (strType == "dbf") {
            shpDefObj.dbf = blob;
        }

        if (shpDefObj.shp && shpDefObj.dbf) {
            ImportShape.readShapeFile(shpDefObj);
        }
    },
     readShapeFile: function (obj) {
            new Shapefile(obj, function (data) {
                if (data.dbf) {
                    this.dataInJSON = geojsonToArcGIS(data.geojson);
                    var params = ImportShape.prepareSP_Params(this.dataInJSON)
                    console.log("esriJSON", this.dataInJSON)
                   // this.hideLoading();
                    // data returned
                }
            });
     },
     prepareSP_Params: function (dataArray) {
         if (!dataArray.length) return;
         if (!dataArray[0].geometry.x && dataArray[0].geometry.Y) {
             this.alert('Accept point geometry only');
             return;
         }

         var datas = dataArray.map(
             function (feature) {
                 var a = feature.attributes;
                 var geometry = null; var point = null;
                 require(["esri/geometry/support/jsonUtils"], function (jsonUtils) {
                     geometry = jsonUtils.fromJson(feature.geometry);
                 });
                 require(["esri/geometry/SpatialReference"], function (SpatialReference) {
                     point = ImportShape.changeSpatialReference(geometry);
                 });

                 var row = [
                     a['CODE'],
                     a['NAME_E'],
                     a['NAME_T'],
                     point.x,
                     point.y,
                   
                 ].join('^');
                 return row;
             });

         //console.log("datas", datas)

         return {
             USER_ID: '',
             DATA: datas.join('|')
         }
     },
     changeSpatialReference: function (geometry) {
         var SRID = 32647;
         geometry.spatialReference.wkid = SRID;
         try {

           

             return gisIframeWindow.GIS.transform(geometry, 32647);
         } catch (E) {
             console.log(E)
             this.alert("Incorrect spatial reference")
         }

         return
     },

}



function bs_input_file() {
    $(".input-file").before(
        function () {
            if (!$(this).prev().hasClass('input-ghost')) {
                var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0'>");
                element.attr("name", $(this).attr("name"));
                element.change(function () {
                    element.next(element).find('input').val((element.val()).split('\\').pop());
                });
                $(this).find("button.btn-choose").click(function () {
                    element.click();
                });
                $(this).find("button.btn-reset").click(function () {
                    element.val(null);
                    $(this).parents(".input-file").find('input').val('');
                });
                $(this).find('input').css("cursor", "pointer");
                $(this).find('input').mousedown(function () {
                    $(this).parents('.input-file').prev().click();
                    return false;
                });
                return element;
            }
        }
    );
}
$(function () {
    bs_input_file();
});



