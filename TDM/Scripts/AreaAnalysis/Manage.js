

var ifrm = document.createElement("iframe");
var gisIframeWindow;

var paging = {
    start: 0,
    count: 1000
};


var mapType = 1;

var defaultSymbol = {
    "type": "esriSFS",
    "style": "esriSFSSolid",
    "color": [255, 255, 0],
    "outline": {
        "type": "esriSLS",
        "style": "esriSLSSolid",
        "color": [0, 255, 0, 0],
        "width": 2
    }
};


var polygonSymbol = {
    "type": "esriSFS",
    "style": "esriSFSSolid",
    "color": [255, 0, 0],
    "outline": {
        "type": "esriSLS",
        "style": "esriSLSSolid",
        "color": [0, 255, 0, 0],
        "width": 2
    }
};

var pointSymbol = {
    "type": "esriSMS",
    "style": "esriSMSCircle",
    "color": [255, 0, 0],
    "size": 8,
    "angle": 0,
    "outline":
    {
        "type": "esriSLS",
        "style": "esriSLSSolid",
        "color": [0, 0, 0, 255],
        "width": 1
    }
};
var polylineSymbol = {
    "type": "esriSLS",
    "style": "esriSLSSolid",
    "color": [255, 0, 0],
    "width": 3
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
                        //{ title: "เปิดเผยข้อมูล" },
                        { title: "เครื่องมือในการวาด" },

                        { title: "จำนวนแปลงที่ได้รับผลกระทบ" },
                        { title: "เนื้อที่แปลงที่ได้รับผลกระทบ" },

                        { title: "วัน-เวลาที่สร้าง / ผู้ใช้" },
                        
                        { title: "วัน/ เวลาที่แก้ไข / ผู้ใช้" },
                        
                        //{ title: "สถานะแผนที่" },
                        { title: "สถานะ" },
                        { title: "แก้ไข" },
                        { title: "ลบ" }
                        
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
                        
                        /*{
                            targets: 3,
                            data: function (row, type, val, meta) {
                                var IsPublished = "ไม่เปิดเผย";
                                if (row.IS_PUBLISHED) {
                                    IsPublished = "เปิดเผย";
                                }
                                return IsPublished;
                            }
                        },*/
                        {
                            targets: 3,
                            data: function (row, type, val, meta) {
                                return row.SHAPETOOLTYPE;
                            }
                        },

                        {
                            targets: 4,
                            data: function (row, type, val, meta) {
                                return row.TotalImpactCount.toLocaleString();
                            }
                        },

                        {
                            targets: 5,
                            data: function (row, type, val, meta) {
                                return row.TotalImpactArea.toLocaleString();
                            }
                        },




                        {
                            targets: 6,
                            data: function (row, type, val, meta) {
                                return moment(row.CREATE_DATE).format('DD/MM/YYYY h:mm') + ' / ' + row.CREATE_BY;
                            }
                        },
                        
                        {
                            targets: 7,
                            data: function (row, type, val, meta) {
                                return moment(row.UPDATE_DATE).format('DD/MM/YYYY h:mm') + ' / ' + row.UPDATE_BY;
                            }
                        },
                        
                        /*{
                            targets: 7,
                            data: function (row, type, val, meta) {
                                return row.STATUS.STATUS_NAME;
                            }
                        },*/
                        {
                            targets: 8,
                            data: function (row, type, val, meta) {
                                return (row.ACTIVE)?'ใช้งาน':'ไม่ใช้งาน';
                            }
                        },
                        {
                            targets: 9,
                            data: function (row, type, val, meta) {
                                return `<a href="#" class="btn btn-success" onclick="AddProject(${row.ID}, ${row.STATUS.ID})"><i class="glyphicon glyphicon-pencil"></i> </a>`;
                            }
                        },
                        {
                            targets: 10,
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
    /*
    var file = $('input[type=file]')[0].files[0];
    console.log("fileName", file.name)
    ImportShape.ShapeFileX(file);
   */

    if (value === 'Reset') {
        $("#allProvince").val('');
        $("#allProvince").change();
    }

    var searchData = JSON.stringify($('#formSearch').serializeObject());
    searchProjectImpactList(0, 1000, JSON.parse(searchData));
}



function uploadShapeData(formData) {

    var data = new FormData();
    var files = $('#myForm').find('input[type=file]').get(0).files;

    /*validate
    var inputData = JSON.parse(formData);
    if (inputData.SUBJECT_ID == '' ||
        inputData.SUBJECT_NAME == '' ||
        inputData.PROVINCE_ID == '' ||
        inputData.AMPHOE_ID == '' ||
        inputData.TAMBOL_ID == '' ||
        files.length == 0
        ) {
        alert('กรุณาตรวจสอบข้อมูล "รหัสโครงการ","ชื่อโครงการ","พื้นที่กระทบ","อำเภอ","ตำบล","ไฟล์ข้อมูล"');
        return;
    }*/

    /*Add input form data*/
    data.append("ImageInfo", formData);
    /*Add the uploaded image content to the form data collection*/
    data.append("UploadedImage", files[0]);

    /*Make Ajax request with the contentType = false, and procesDate = false*/
    var ajaxRequest = $.ajax({
        type: "POST",
        url: http.url(rootUrl + "/api/AreaAnalysis/UploadMapShape"),
        contentType: false,
        processData: false,
        data: data
    });

    $("#myModal1").modal("hide");
    dlWaiting.show();
    ajaxRequest.done(function (xhr, textStatus) {
        dlWaiting.hide();
        alert('success');


    });


}

var map = {};


function _mapPostMessage(senderData) {
    encrpty(senderData).then(function (encryptData) {
        var domain = window.document.location.origin;
        gisIframeWindow.postMessage(encryptData, domain);
    });
}

map.zoom = function (data) {
    var jsonData = {
        zoomBy: "MapService",
        "graphicLayerId": "parcel1",
        mapServiceJsonList: [{
            layerName: "TD_VIEW",
            layerIndexName: "PARCEL_47_50",
            where: "PARCEL_47_50",
            titleField: "PARCEL_47_50",
            detailField: "",
            rendering: {
            }
        }]
    }

    var senderData = {
        event: 'zoom-map',
        data: jsonData
    }
    senderData = JSON.stringify(senderData);
    encrpty(senderData).then(function (encryptData) {
        gisIframeWindow.postMessage(encryptData, 'https://p-staging.treasury.go.th/TD2');
    });
}


function encrpty(json) {
    return http.post("/api/GIS/Encrypt", { text: JSON.stringify(json) });
}

function _mapPostMessage(senderData) {
    encrpty(senderData).then(function (encryptData) {
        var domain = window.document.location.origin;
        gisIframeWindow.postMessage(encryptData, domain);
    });
}

map.zoom = function (data) {
    var jsonData = {
        zoomBy: "MapService",
        "graphicLayerId": "parcel1",
        mapServiceJsonList: [{
            layerName: "TD_VIEW",
            layerIndexName: "PARCEL_47_50",
            where: "PARCEL_47_50",
            titleField: "PARCEL_47_50",
            detailField: "",
            rendering: {
            }
        }]
    }

    var senderData = {
        event: 'zoom-map',
        data: jsonData
    }
    senderData = JSON.stringify(senderData);
    encrpty(senderData).then(function (encryptData) {
        gisIframeWindow.postMessage(encryptData, 'https://p-staging.treasury.go.th/TD2');
    });
}


function encrpty(json) {
    return http.post("/api/GIS/Encrypt", { text: JSON.stringify(json) });
}


var _gisIframeWindow = null;
function AddProject(projectId, statusId) {

    


    try {


        var url = http.url("/AreaAnalysis/AddEditProject?projectId=" + projectId + "&statusId=" + 0);

        $("#myModalBodyDiv1").load(url, function (response, status, xhr) {
            if (status == "error") {
            } else {
                $("#myModal1").modal("show");

                $("#myModal1").appendTo("body");
                //$('#btnSubmit').click(uploadShapeData);

                try {
                    var iframeElement = document.getElementById('tdmap');
                    iframeElement.src = 'https://p-staging.treasury.go.th/TD2';
                    var gisIframeWindow = null;
                    iframeElement.onload = function () {
                        gisIframeWindow = iframeElement.contentWindow;

                        _gisIframeWindow = gisIframeWindow;
                        gisIframeWindow.SYSTEM_READY(function (evt) {
                            console.log("SYSTEM_READY >>> ", evt);


                            var sridIn = 24047;
                            var sridOut = [102100];
                            var trans = gisIframeWindow.GIS.transform(modalModel.Shape, sridIn, sridOut);
                            var symbol;

                            var reqZoomTAMBOL = false;

                            if (modalModel.Shape.toLowerCase().indexOf('linestring') > -1) {
                                symbol = polylineSymbol;
                                mapType = 'polyline';

                            }
                            else if (modalModel.Shape.toLowerCase().indexOf('polygon') > -1) {
                                symbol = polygonSymbol;
                                mapType = 'polygon';
                            } else if (modalModel.Shape.toLowerCase().indexOf('point') > -1) {
                                symbol = pointSymbol;
                                mapType = 'point';
                                reqZoomTAMBOL = true;

                            }
                            $("#ddlDrawToolsType").val(mapType);
                           // map.zoom();
                           // return false;

                            gisIframeWindow.GIS.removeGraphic();


                         /*   symbol = {
                                "type": "esriSFS",
                                "style": "esriSFSSolid",
                                "color": [255, 0, 0],
                                "outline": {
                                    "type": "esriSLS",
                                    "style": "esriSLSSolid",
                                    "color": [0, 255, 0, 0],
                                    "width": 2
                                }
                            };*/
                            
                            if (reqZoomTAMBOL) {
                                
                                var tumbolId = $("#TAMBOL_ID").val();
                                var provinceId = $("#PROVINCE_ID").val();
                                var amphureId = $("#AMPHOE_ID").val();

                                $.get(rootUrl + "/api/Map/GetSubDistrictsById", { provinceId: provinceId, amphureId: amphureId, id: tumbolId }, function (data) {
                                    var sridIn = 24047;
                                    var sridOut = [102100];

                                    map.addGraphic(data[0].Shape);

                                });

                            }

                            gisIframeWindow.GIS.buffer(trans[0].shape, sridIn, parseInt(modalModel.Buffer) * 100, true);
                            gisIframeWindow.GIS.addGraphic(trans[0].shape, 102100, symbol);
                            
                            

                            //activateDraw(gisIframeWindow);
                        });




                    }
                } catch (e) {
                    alert(e.message);
                }




            }
        });

    } catch (e) {
        alert(e.message);
    }

}

function activateDraw(gisIframeWindow) {

    // Input
    var toolType = document.getElementById('ddlDrawToolsType').value,
        clearGraphicWhenComplete = true;

    if (toolType == '') {
        alert('กรุณาระบุ ประเภทเครื่องมือในการวาด');
        return;
    }
    //alert(toolType);
    try {

        gisIframeWindow.GIS.removeGraphic();
        // Call method
        gisIframeWindow.GIS.activateDraw(toolType, clearGraphicWhenComplete, function (drawEvent) {
            console.log(drawEvent);
            // var shape = 'POINT(11295346.5239 1477904.2036)',
            var shape = drawEvent.shape,
                sridIn = drawEvent.srid,
                sridOut = [24047, 24048];

            // Call method
            console.log(gisIframeWindow.GIS.transform(shape, sridIn, sridOut));
            var result = gisIframeWindow.GIS.transform(shape, sridIn, sridOut);
            var txt = "";
            var i = 0;

            if (result.length > 0) {
                txt = JSON.stringify(result[0]);
            }
            document.getElementById("hddShape").value = txt;
            //alert(document.getElementById("hddShape").value);
            /*
            result.forEach(function (item) {

                txt = txt +JSON.stringify(item) + (i==0)?',':'';
                i++;
            });
            
            document.getElementById("hddShape").value = '['+txt+']';

            alert(JSON.parse(document.getElementById("hddShape").value).length);
            */
        });
    } catch (e) {
        alert(e.message);
    }

}


function DelProvImpact(projectId, projectName) {


    swal({
        title: "Delete",
        text: "Do you want to delete?",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    },
        function (isConfirm) {
            if (isConfirm) {

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
        });





}

function DelSuccess(projectName) {

    swal("ลบข้อมูลเรียบร้อย", {
        icon: "success",
    });

    window.location.href = http.url(rootUrl + "/AreaAnalysis/Manage");



}

function btnSubmitV2(id) {

   




    try
    {
        var mode = (id == 0) ? 'SAVE' : 'EDIT';


        var formData = $('#myForm').serializeObject();
        if (formData.PUBLISH_DATE == '00/00/0000 00:00') {
            formData.PUBLISH_DATE = formData.CREATE_DATE;
        }

        if (formData.SUBJECT_ID == '') {
            alert('กรุณาระบุรหัสโครงการ');
            return;
        } else if (formData.SUBJECT_NAME == '') {
            alert('กรุณาระบุชื่อโครงการ');
            return;
        } else if (formData.PROVINCE_ID == '') {
            alert('กรุณาระบุจังหวัด');
            return;
        } else if (formData.AMPHOE_ID == '') {
            alert('กรุณาระบุอำเภอ');
            return;
        } else if (formData.TAMBOL_ID == '') {
            alert('กรุณาระบุตำบล');
            return;
        } else if (formData.Buffer == '') {
            alert('กรุณาระบุบัฟเฟอร์ (Buffer)');
            return;
        } else if (formData.Shape == null || formData.Shape[1] == "") {
            alert('กรุณาวาดแผนที่ ที่ได้รับผลกระทบ');
            return;
        }

        var shape = {};
        if (mode == 'SAVE') {
            if (formData.Shape[1] == '') {
                formData.Shape[1] = '{}';
            }

            shape = eval("(" + formData.Shape[1] + ')');
        } else {

            var hddVal = document.getElementById("hddShape").value;
            /*
            if (hddVal.startsWith("POLYGON")) {
                shape = {
                    srid: 24047,
                    shape: hddVal
                };
            } else {
                shape = eval("(" + hddVal + ')');
            }
            */
            shape = {
                srid: 24047,
                shape: hddVal
            };
            
            
        }
        
        

        //formData.Shape = shape.shape;

        var sridIn = shape.srid;
        var sridOut = [24047];


        formData.Shape = (gisIframeWindow.GIS.transform(shape.shape, sridIn, sridOut)[0]).shape;
        //formData.Shape = modalModel.Shape;
        var myFormData = JSON.stringify(formData); 

        /*mode save data*/
        if (id > 0) {
            /*update*/


            //uploadShapeData(myFormData);

            

            swal({
                title: "Save",
                text: "Do you want to save?",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
                confirmButtonClass: "confirm btn btn-lg btn-default",
                cancelButtonClass: "cancel btn btn-lg btn-primary"
            },
                function (isConfirm) {
                    if (isConfirm) {
                        //     waitingDialog.show('Waiting for saving', { dialogSize: 'md', progressType: 'success' });
                        url = "/api/AreaAnalysis/UpdateProject";
                        url = http.url(url);

                        $.ajax({
                            url,
                                type: "POST",
                                data: myFormData,
                                dataType: "json",
                                contentType: 'application/json',
                                success: function (response) {
                                alert(JSON.stringify(response));
                                setTimeout(function () {

                                 //   waitingDialog.hide()
                                    $("#myModal").modal("hide");
                                    window.location.href = http.url("/AreaAnalysis/Manage");
                            }, 1000);

                            }
                            });

                    }
           });


        } else {


            swal({
                title: "Save",
                text: "Do you want to save?",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
                confirmButtonClass: "confirm btn btn-lg btn-default",
                cancelButtonClass: "cancel btn btn-lg btn-primary"
            },
                function (isConfirm) {
                    if (isConfirm) {
                        //     waitingDialog.show('Waiting for saving', { dialogSize: 'md', progressType: 'success' });
                        url = "/api/AreaAnalysis/AddProject";
                        url = http.url(url);

                        $.ajax({
                            url,
                            type: "POST",
                            data: myFormData,
                            dataType: "json",
                            contentType: 'application/json',
                            success: function (response) {

                                setTimeout(function () {

                                    //   waitingDialog.hide()
                                    $("#myModal").modal("hide");
                                    window.location.href = http.url("/AreaAnalysis/Manage");
                                }, 1000);



                            }
                        });

                    }
                });
        }
    } catch (e) {
        alert(e.message);
    }






}


var ImportShape = {

    ShapeFileX: function (shpZip) {
        this.unZip(shpZip, function (decompressed) {
            alert('yyyy');
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
        require(["http://localhost:50029/assets/js/JSZip/jszip.js"], function (JSZip) {

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

                /* var row = [
                     a['CODE'],
                     a['NAME_E'],
                     a['NAME_T'],
                     point.x,
                     point.y,
                   
                 ].join('^');*/
                //    return datas;
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

var dlWaiting = {
    show: function () {
        var modalLoading = '<div class="modal" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false role="dialog" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; margin: auto; width: 300px; height: 300px;">\
                <div class="modal-dialog">\
                    <div class="modal-content">\
                        <div class="modal-body">\
                            <h3>Processing your request...</h3>\
                        </div>\
                    </div>\
                </div>\
            </div>';
        $(document.body).append(modalLoading);
        $("#pleaseWaitDialog").modal("show");
    },

    hide: function () {
        $("#pleaseWaitDialog").modal("hide");
    }
};



$(function () {
    bs_input_file();
});





var AddProvince = [];
var RemoveProvince = [];

var provinceId, amphureId,tumbolId;
$(document).on("change", "#PROVINCE_ID", function () {
    $('#AMPHOE_ID').empty();
    $('#TAMBOL_ID').empty();
    $('#AMPHOE_ID').append("<option value=''>เลือกอำเภอ</option>");
    $('#TAMBOL_ID').append("<option value=''>เลือกตำบล</option>");
     provinceId = $(this).val();
    $.get(rootUrl + "/api/Map/GetDistrictsByProvince", { id: provinceId }, function (data) {
        if (data != null && data.length > 0) {


            $.each(data, function (index, data) {
                $("#AMPHOE_ID").append("<option value='" + data.ID + "'>" + data.Name + "</option>");
               

              
            });

            $.get(rootUrl + "/api/Map/GetProvinceById", { id: provinceId }, function (data) {
                var sridIn = 24047;
                var sridOut = [102100];

                map.addGraphic(data[0].Shape);
            
            });
        }
    });

    $(document).on("change", "#AMPHOE_ID", function () {
         amphureId = $(this).val();
        $('#TAMBOL_ID').empty();
        $('#TAMBOL_ID').append("<option value=''>เลือกตำบล</option>");
        $.get(rootUrl + "/api/Map/GetSubDistrictsByDistrict", { id: $(this).val() }, function (data) {
            if (data != null && data.length > 0) {


                $.each(data, function (index, item) {
                    $("#TAMBOL_ID").append("<option value='" + item[0].ID + "'>" + item[0].Name + "</option>");
                });
            }

            $.get(rootUrl + "/api/Map/GetDistrictsById", { provinceId: provinceId, id: amphureId }, function (data) {
                var sridIn = 24047;
                var sridOut = [102100];

                map.addGraphic(data[0].Shape);

            });
        });



    });

    $(document).on("change", "#TAMBOL_ID", function () {
        var tumbolId = $(this).val();
      
        $.get(rootUrl + "/api/Map/GetSubDistrictsById", { provinceId: provinceId, amphureId: amphureId, id: tumbolId }, function (data) {
            var sridIn = 24047;
            var sridOut = [102100];

            map.addGraphic(data[0].Shape);

        });



    });


$(document).ready(function () {
    var isPublished = $('input[name=IS_PUBLISHED]:checked').val();
    var statusID = $('#StatusID').val();

    if ($("#ProjectID").val() > 0 && statusID === "3") {
        if (isPublished === "True") {
            $('#publishedYes').addClass('active');
            $('#publishedNo').removeClass('active');
        } else {
            $('#publishedNo').addClass('active');
            $('#publishedYes').removeClass('active');
            $('#PublishedDate').css('display', 'none');
        }
    } else {
        $('input:radio[name=IS_PUBLISHED]')[0].checked = false;
        $('#publishDateSet').val('00/00/0000 00:00');
        $("#test3").val("Dolly Duck");
        $('#publishedNo').addClass('active');
        $('#publishedYes').removeClass('active');
        $('#PublishedDate').css('display', 'none');
        $('#PublishedCheck').css('display', 'none');
    }


    $('#PublishedDate').datetimepicker({
        format: 'mm-dd-yyyy',
        minView: 2,
        pickTime: false,
        autoclose: true
    });







    });




    // $("#ddlProvince").selectpicker('refresh');
    // $("#ddlDistrict").selectpicker('refresh');
    // $("#ddlSubdistrict").selectpicker('refresh');
});

function checkPublished(value) {
    if (value) {
        $('#PublishedDate').css('display', 'block');
    } else {
        $('#PublishedDate').css('display', 'none');
    }
}


function btnSubmit(id) {

    try {
        var formData = $('#myForm').serializeObject();
        if (formData.PUBLISH_DATE == '00/00/0000 00:00') {
            formData.PUBLISH_DATE = formData.CREATE_DATE;
        }


        var myFormData = JSON.stringify(formData);

        /*mode save data*/
        if (id <= 0) {
            /// ImportShape.ShapeFile($('input[type=file]')[0].files);
            url = rootUrl + "/api/AreaAnalysis/AddProject";
            url = http.url(url);

            $.ajax({
                url,
                type: "POST",
                data: myFormData,
                dataType: "json",
                contentType: 'application/json',
                success: function (response) {
                    $("#myModal").modal("hide");
                    window.location.href = http.url(rootUrl + "/AreaAnalysis/Manage");
                }
            });


        } else {
            ImportShape.ShapeFile($('input[type=file]')[0].files);
            url = rootUrl + "/api/AreaAnalysis/UpdateProject";
            url = http.url(url);

            $.ajax({
                url,
                type: "POST",
                data: myFormData,
                dataType: "json",
                contentType: 'application/json',
                success: function (response) {
                    $("#myModal").modal("hide");
                    window.location.href = http.url(rootUrl + "/AreaAnalysis/Manage");
                }
            });
        }
    } catch (e) {
        alert(e.message);
    }






}

var map = {};


map.addGraphic = function (shape, symbol) {
    var sridIn = 24047;
    var sridOut = [102100];
    var trans = _gisIframeWindow.GIS.transform(shape, sridIn, sridOut);
     trans = _gisIframeWindow.GIS.transform(shape, sridIn, sridOut);
    symbol = symbol || {
        "type": "esriSLS",
        "style": "esriSLSSolid",
        "color": [0, 0, 0, 255],
        "width": 0
    }

    return _gisIframeWindow.GIS.addGraphic(trans[0].shape, 102100, symbol);
}
