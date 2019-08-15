/******************************
 initialize respective scripts 
 *****************************/


var selectLocationLevel = '';
var codeSearch = '';
var iframeElement = document.getElementById('tdmap');
var mapResult;
$(document).ready(function () {
    initialData();
});


function initialData() {

    CMPLTADMIN_SETTINGS.chatAPI();
    CMPLTADMIN_SETTINGS.sectionBoxActions();
    LoadData.initialData();
}



$(document).on("change", "#ddlRegion", function () {
    
    waitingDialog.show('Waiting for loading data', { dialogSize: 'md', progressType: 'success' });
 
  
    selectLocationLevel = 1;
    codeSearch = $(this).val()
    LoadData.LoadAll(selectLocationLevel, codeSearch);

    mapApi.getProvincesByRegion(selectLocationLevel, codeSearch, function (provinces) {

        $('#ddlProvince').empty();
        $('#ddlProvince').append("<option value=''>ทั้งหมด</option>");

        $.each(provinces, function (index, province) {
            $("#ddlProvince").append("<option value='" + province.ID + "'>" + province.Name + "</option>");
        });

    });

   
});


$(document).on("change", "#ddlProvince", function () {

    waitingDialog.show('Waiting for loading data', { dialogSize: 'md', progressType: 'success' });


    selectLocationLevel = 2;
    codeSearch = $(this).val()

    if (codeSearch == '') {
        selectLocationLevel = 1;
        codeSearch = $('#ddlRegion').val();
    }


    LoadData.LoadAll(selectLocationLevel, codeSearch);


});



var map = {

    addGraphic: function (shape, symbol) {
        var sridIn = 32647;
        var sridOut = [102100];
        var trans;

        try {

            if (gisIframeWindow == null) {
                return null;
            } else if (gisIframeWindow.GIS.name != "") {
                return null;
            }
        } catch (err) {
            waitingDialog.hide();
            return null;
        }

        trans=gisIframeWindow.GIS.transform(shape, sridIn, sridOut);

        symbol = symbol || {
            "type": "esriSLS",
            "style": "esriSLSSolid",
            "color": [0, 0, 0, 255],
            "width": 1
            , "text": "<client-side graphic text>" 
        }

        return gisIframeWindow.GIS.addGraphic(trans[0].shape, 102100, symbol);
    },
    removeGraphic: function (gId) {
        gisIframeWindow.GIS.removeGraphic(gId);
    },

    transform: function (x, y) {
        var shape = `POINT(${x} ${y})`,
            sridIn = 32647,
            sridOut = [102100];

        var transRes = gisIframeWindow.GIS.transform(shape, sridIn, sridOut);
        return transRes;
    },

    buffer: function (shape, r) {
        var srid = 102100,
            radius = parseInt(r),
            addGraphic = true;
        gisIframeWindow.GIS.buffer(shape, srid, radius, addGraphic);
    },

    transformShape: function (x, y) {
        var shape = `POINT(${x} ${y})`,
            sridIn = 32647,
            sridOut = [24047, 24048];

        var transRes = gisIframeWindow.GIS.transform(shape, sridIn, sridOut);
        return transRes;
    },

    transformPolygon: function (polygon) {
        var shape = polygon,
            sridIn = 32647,
            sridOut = [24047, 24048];

        var transRes = gisIframeWindow.GIS.transform(shape, sridIn, sridOut);
        return transRes;
    },

    openMeasurementTool : function (toolName) {
        gisIframeWindow.GIS.openFunction('measurement', { toolName: toolName });
    }
    ,activateDraw :function (callback) {
        // Input
        var toolType = 'polygon',
            clearGraphicWhenComplete = true;

        // Call method
        gisIframeWindow.GIS.activateDraw(toolType, clearGraphicWhenComplete, function (drawEvent) {
            var shape = drawEvent.shape,
                sridIn = drawEvent.srid,
                sridOut = [24047, 24048];

            // Call method
            var result = gisIframeWindow.GIS.transform(shape, sridIn, sridOut);

            callback(result);
        });
    },
    clear: function () {
        try {
            
            gisIframeWindow.GIS.removeGraphic();
        } catch{ }
       
    },
    zoom : function (data) {
        var jsonData = {
            zoomBy: "MapService",
            "graphicLayerId": "parcel1",
            mapServiceJsonList: [{
                layerName: "TD_VIEW",
                layerIndexName: "PARCEL_47_30",
                where: "PARCEL_47_30",
                titleField: "PARCEL_47_30",
                detailField: "",
                rendering: {
                }
            }]
        }

        var senderData = {
            event: 'zoom-map',
            data: jsonData
        }
        gisIframeWindow.GIS.zoomMap();
       /* senderData = JSON.stringify(senderData);
        encrpty(senderData).then(function (encryptData) {
            gisIframeWindow.postMessage(encryptData, 'https://p-staging.treasury.go.th/TD2');
        });*/
    }

}

function encrpty(json) {
    return $.post(mapApi.getServerPath() + "/api/GIS/Encrypt", { text: JSON.stringify(json) });
}


$(document).on("click", ".btnRefresh", function () {
    mapResult = null;
    LoadData.ReLoadMap(selectLocationLevel, codeSearch);
});





function LoadChart(Option, divChart) {
    var chartLoad = echarts.init(divChart);
    var option = Option;


    setTimeout(function () {
        chartLoad.setOption(option, true);
       // chartLoad.on("click", ChartCallBack);

    }, 1000);
}


var LoadData = {

    initialData: function () {

        LoadData.InitialMap();
        LoadData.LoadAll(1,'');
     




    }
    , LoadAll : function (level,code) {

        waitingDialog.show('Waiting for loading data', { dialogSize: 'md', progressType: 'success' });

        var criteria = { SectionType: level, Code: code };
        $.ajax({
            url: mapApi.getServerPath() + "/api/PriceSys/GetLandRatio",
            type: "POST",
            data: JSON.stringify(criteria),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data != null) {
                    LoadData.LoadGraph(data);
                    LoadData.LoadTable(data.Detail);
                    LoadData.LoadMap(data.Detail);

                    mapResult = data.Detail;
                }

                waitingDialog.hide();
            },
            error: function (error) {
                waitingDialog.hide();
            }
        });
    }
    , LoadGraph: function (result) {
        option = {
            title: {
                x: 'center',
                text: 'อัตราการเปลี่ยนแปลงที่ดิน',
                subtext: '',
                link: '#'
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
                    data: result.Category
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
                    name: 'อัตราการเปลี่ยนแปลงที่ดิน',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: function (params) {
                               

                                return LoadData.GetColor(params.data);
                            },
                            label: {
                                show: true,
                                position: 'top',
                                formatter: '{b}\n{c}'
                            }
                        }
                    },
                    data: result.Series,
                    markPoint: {
                        tooltip: {
                            trigger: 'item',
                            backgroundColor: 'rgba(0,0,0,0)',
                            formatter: function (params) {
                                return '<img src="'
                                    + params.data.symbol.replace('image://', '')
                                    + '"/>';
                            }
                        },
                        data: [

                        ]
                    }
                }
            ]
        };
        LoadChart(option, document.getElementById('chartSection1'))
    },
    GetColor: function (ratio) {
        var colorList = [
            'red', 'orange', 'yellow'
        ];

        var grade = 0;

        switch (true) {
            case (ratio > 80): grade = 0; break;
            case (ratio > 70): grade = 0; break;
            case (ratio > 60): grade = 0; break;
            case (ratio > 50): grade = 0; break;
            case (ratio> 40): grade = 0; break;
            case (ratio > 30): grade = 0; break;
            case (ratio > 20): grade = 0; break;
            case (ratio > 10): grade = 1; break;
            case (ratio >= 0): grade = 2; break;
        }

        return colorList[grade];

    }
    , LoadTable : function (result) {
        var html = '';
        $(".divSection2").empty();

        html += '<table class="table  table-striped"   id = "EstimateChartTable0">';
        html += '<thead>';
        html += '<tr class="bg-info" >';

        html += ' <th width="20%" scope="col">ภาค</th>';
        html += ' <th width="20%" scope="col">จังหวัด</th>';
        html += ' <th width="20%" scope="col">ช่วงเวลา</th>';
        html += ' <th scope="col">Ratio</th>';
        html += ' </tr>';
        html += '</thead>';
        html += '<tbody>';

        if (result != null) {

            $.each(result, function (index, item) {
                html += '<tr>';

                html += '<td class="btnRegion" data="' + item.RegionCode + '">' + item.RegionName + '</td>';
                html += '<td class="btnProvince" data="' + item.ProvinceCode + '">' + item.ProvinceName + '</td>';
                html += '<td>' + item.FromYear + ' - ' + item.ToYear + '</td>';
                html += '<td>' + item.Ratio + '</td>';


                html += '</tr>';
            });
        }

        html += '</tbody>';
        html += ' </table>';

        $(".divSection2").append(html);
        $(".divSection2 table").DataTable();

    }
    , LoadMap: function (result) {


        if (gisIframeWindow!=null && result != null && result.length > 0) {

            map.clear();
            $.each(result, function (index, shape) {
                MapController.draw(shape, MapController.ProvinceType);

            });
         //   map.zoom(null);
        }


    }
    , ReLoadMap: function (level,code) {

        waitingDialog.show('Waiting for loading map', { dialogSize: 'md', progressType: 'success' });
        var criteria = { SectionType: level, Code: code };

        if (mapResult != null) { }
        else {

            LoadData.LoadMap(mapResult);
        }
        $.ajax({
            url: mapApi.getServerPath() + "/api/PriceSys/GetLandRatio",
            type: "POST",
            data: JSON.stringify(criteria),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data != null) {

                    mapResult = data.Detail;
                    LoadData.LoadMap(data.Detail);

                    waitingDialog.hide();
                }
            },
            error: function (error) {
                waitingDialog.hide();
            }
        });


      


    }
    , InitialMap: function () {

     
        
        iframeElement.src = 'https://p-staging.treasury.go.th/TD2';
        gisIframeWindow = null;
        iframeElement.onload = function () {
            gisIframeWindow = iframeElement.contentWindow;

            setTimeout(function () {
                LoadData.ReLoadMap();
            }, 2000);
        }
    }
    , ClearMap: function () {

        map.clear = function () {
            gisIframeWindow.GIS.removeGraphic();
        }
    }
   
    
};


function convertShapetoPolygon(response) {
    var data = JSON.parse(response.d);
    var PolygonString = "POLYGON (";
    $.each(data, function (index, row) {
        PolygonString += '(' + row.SHAPE.replace("POLYGON ", "").replace("POLYGON", "").replace("((", "").replace("))", "") + ')' + ',';
    });

    if (data.length > 0)
        PolygonString = (PolygonString.substr(0, PolygonString.length - 1));
    PolygonString += ")";

    return PolygonString;
}

var MapController = {
    ProvinceType: 1,
    DistrictType: 2,
    SubDistrictType: 3,
    draw: function (targetInfo, type) {

      
        var symbol = MapController.getMapPhysicalInfo(LoadData.GetColor(targetInfo.Ratio));
        //var symbolPoint = TDMap.getPoint();

        if (targetInfo.Shape) {

            var targetShape = targetInfo.Shape;
            if (targetInfo.Shape.indexOf(';') !== -1) {
                targetShape = targetInfo.Shape.split(';')[1];
            }
            map.addGraphic(targetShape, symbol);
            MapController.drawWithInfo(targetInfo);
        } else {
            alert('Shape Not OK');
        }
        return null;
    },
    drawWithInfo: function (targetInfo) {
      

        var sridIn = 32647;
        var sridOut = [102100];
        var trans = gisIframeWindow.GIS.transform(targetInfo.Shape, sridIn, sridOut);


        if (trans == null)
            return false;
        var shape = trans[0].shape;
        var srid = 102100;
        var symbol = {
            "type": "esriPMS",
            "url": "471E7E31",
            "imageData": "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",
            "contentType": "image/png",
            "width": 32.0,
            "height": 32.0,
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0
        };
        symbol = MapController.getMapPhysicalInfo(LoadData.GetColor(targetInfo.Ratio));
     
        var price = '';
        try {


         
        } catch (e) {
            alert(e.message);
        }
        var attributes = {
            "จังหวัด": targetInfo.ProvinceName + "<br/>",
            "Ratio": targetInfo.Ratio



        }

        gIdGlobal = gisIframeWindow.GIS.addGraphicWithInfoWindow(shape, srid, symbol, attributes);

    },
    getParcelMapColor: function (price, type) {
        return (price > 0) ? 'green' : 'black';

    },
    getMapPhysicalInfo: function (drawingCode) {
        var symbol = TDMap.getYellowSymbol();

        switch (drawingCode) {
            case "yellow":
                symbol = TDMap.getYellowSymbol();
                break;
            case "orange":
                symbol = TDMap.getOrangeSymbol();
                break;
            case "blue":
                        symbol = TDMap.getBlueSymbol();
                        break;
                
            case "red":
                symbol = TDMap.getRedSymbol();
                break;
            case "green":
                symbol = TDMap.getGreenSymbol();
                break;
            case "black":
                symbol = TDMap.getBlackSymbol();
                break;
            case "poin":
                symbol = TDMap.getPoint();
                break;
            default:
                /*default to YELLOW*/
                symbol = TDMap.getYellowSymbol();
                break;

        }

        return symbol;

    }
}


var TDMap = {
    getYellowSymbol: function () {
        return {
            "type": "esriSFS",
            "style": "esriSFSSolid",
            "color": [255, 255, 153],
            "outline": {
                "type": "esriSLS",
                "style": "esriSLSSolid",
                "color": [0, 0, 0, 255],
                "width": 1
            }
        };
    },
    getOrangeSymbol: function () {
        return {
            "type": "esriSFS",
            "style": "esriSFSSolid",
            "color": [255, 165, 0],
            "outline": {
                "type": "esriSLS",
                "style": "esriSLSSolid",
                "color": [0, 0, 0, 255],
                "width": 1
            }
        };
    },

    getBlueSymbol: function () {
        return {
            "type": "esriSFS",
            "style": "esriSFSSolid",
            "color": [0, 0, 255],
            "outline": {
                "type": "esriSLS",
                "style": "esriSLSSolid",
                "color": [0, 0, 0, 255],
                "width": 1
            }
        };
    },

    getRedTextSymbol: function (text) {
        return {
            "type": "esriTS",
            "color": [78, 78, 78, 255],
            "backgroundColor": [0, 0, 0, 0],
            "borderLineSize": 2,
            "borderLineColor": [255, 0, 255, 255],
            "haloSize": 2,
            "haloColor": [0, 255, 0, 255],
            "verticalAlignment": "bottom",
            "horizontalAlignment": "left",
            "rightToLeft": false,
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0,
            "kerning": true,
            "font": {
                "family": "Arial",
                "size": 12,
                "style": "normal",
                "weight": "bold",
                "decoration": "none"
            },
               "text": text
        };
    }   ,
                                                              
    getRedSymbol: function () {
        return {
            "type": "esriSFS",
            "style": "esriSFSSolid",
            "color": [255, 0, 0],
            "outline": {
                "type": "esriSLS",
                "style": "esriSLSSolid",
                "color": [0, 0, 0, 255],
                "width": 1
            }
        };
    },
    getGreenSymbol: function () {
        return {
            "type": "esriSFS",
            "style": "esriSFSSolid",
            "color": [0, 128, 0],
            "outline": {
                "type": "esriSLS",
                "style": "esriSLSSolid",
                "color": [0, 0, 0, 255],
                "width": 1
            }
        };
    },
    getBlackSymbol: function () {
        return {
            "type": "esriSFS",
            "style": "esriSFSSolid",
            "color": [0, 0, 0],
            "outline": {
                "type": "esriSLS",
                "style": "esriSLSSolid",
                "color": [0, 0, 0],
                "width": 1
            }
        };
    },

    getPoint: function () {
        return {
            "type": "esriSMS",
            "style": "esriSMSSquare",
            "color": [76, 115, 0, 255],
            "size": 8,
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0,
            "outline":
            {
                "color": [152, 230, 0, 255],
                "width": 1
            }
        };
    }
}


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