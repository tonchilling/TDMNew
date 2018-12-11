
 
 
var iframeElement = document.getElementById('tdmap');
iframeElement.src = config.mapUrl;//window.document.location.origin + '/TD2';
gisIframeWindow = null;
iframeElement.onload = function () {
    gisIframeWindow = iframeElement.contentWindow;
}

var iframeElement2 = document.getElementById('tdmap2');
iframeElement2.src = config.mapUrl;//window.document.location.origin + '/TD2';
gisIframeWindow2 = null;
iframeElement2.onload = function () {
    gisIframeWindow2 = iframeElement2.contentWindow;
}

function MapAppraiser(Appraiser, Province) {
    
    http.get("/api/TraceProgress/GetShapeByAppraise", { Appraiser: Appraiser, ProvinceCode: '30' }, function (data) {
        var i = 0;
        var PolygonString = "POLYGON (";
        
        $.each(data, function (index, row) {
            PolygonString += '(' + row.SHAPE.replace("POLYGON ", "").replace("POLYGON", "").replace("((", "").replace("))", "") + ')' + ',';
        });

        PolygonString = (PolygonString.substr(0, PolygonString.length - 1));
        
       
        PolygonString += ")";

        //204, 255, 102
        var sridIn = 32647;
        var sridOut = [102100];
        var ParcelAddaddGraphic = gisIframeWindow2.GIS.transform(PolygonString, sridIn, sridOut);
        var symbol = {
            "type": "esriSFS", "style": "esriSFSSolid", "color": [51, 51, 204, 150],
            "outline": { "type": "esriSLS", "style": "esriSLSSolid", "color": [255, 0, 0, 255], "width": 1 }
        }

        console.log(PolygonString);
        console.log(ParcelAddaddGraphic[0].shape);

        setTimeout(function () {
            console.log('Process Map');
            gisIframeWindow2.GIS.addGraphic(ParcelAddaddGraphic[0].shape, 102100, symbol);
        }, 4000);

        

        //$.each(data, function (index, row) {
        //});
    });
}



function addGraphicWithInfoWindow() {
    console.log('addGraphicWithInfoWindow');
    var shape = "POINT(11295346.5239 1477904.2036)";
    var srid = 102100;
    var symbol = {
        "type": "esriPMS",
        "url": "471E7E31",
        "imageData": "iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAMNJREFUSIntlcENwyAMRZ+lSMyQFcI8rJA50jWyQuahKzCDT+6h0EuL1BA1iip8Qg/Ex99fYuCkGv5bKK0EcB40YgSE7bnTxsa58LeOnMd0QhwGXkxB3L0w0IDxPaMqpBFxjLMuaSVmRjurWIcRDHxaiWZuEbRcEhpZpSNhE9O81GiMN5E0ZRt2M0iVjshek8UkTQfZy8JqGHYP/rJhODD4T6wehtbB9zD0MPQwlOphaAxD/uPLK7Z8MB5gFet+WKcJPQDx29XkRhqr/AAAAABJRU5ErkJggg==",
        "contentType": "image/png",
        "width": 19.5,
        "height": 19.5,
        "angle": 0,
        "xoffset": 0,
        "yoffset": 0
    };
    var attributes = {
        "title": "Hello",
        "content": "Detail<br>test1<br>test2"
    }

    gIdGlobal = gisIframeWindow2.GIS.addGraphicWithInfoWindow(shape, srid, symbol, attributes);
    console.log(gIdGlobal);
}

function dynamicRenderer() {
    var layerName = 'PARCEL_47_50',
    renderer = {
        field1: 'BRANCH_CODE',
        field2: 'UTMMAP3',
        fieldDelimiter: ':',
        infos: [
            {
              value: '50080000:9268',
              symbol: {
                  "type": "esriSFS", "style": "esriSFSSolid", "color": [255, 255, 0, 255],
                  "outline": { "type": "esriSLS", "style": "esriSLSSolid", "color": [110, 110, 110, 255], "width": 1 }
              }
          }
        ]
    },

    defaultSymbol = null;

    //console.log(gisIframeWindow2.GIS.dynamicRenderer(layerName, renderer, defaultSymbol, true));
    //gisIframeWindow2.GIS.dynamicRenderer(layerName, renderer, defaultSymbol, true);

    gIdGlobal = gisIframeWindow2.GIS.dynamicRenderer(layerName, renderer, defaultSymbol, true);
    console.log(gIdGlobal);
}




function encrpty(json) {
    return http.post("/api/GIS/Encrypt", { text: JSON.stringify(json)});
}

function _mapPostMessage(senderData) {
    encrpty(senderData).then(function (encryptData) {
        var domain = window.document.location.origin;
        gisIframeWindow.postMessage(encryptData, domain);
    });
}

function _mapPostMessage2(senderData) {
    encrpty(senderData).then(function (encryptData) {
        var domain = window.document.location.origin;
        gisIframeWindow2.postMessage(encryptData, domain);
    });
}



var map = {};
map.zoom2 = function (data) {
    // var shape = "POINkT(11295346.5239 1477904.2036)";
    var shape = "POLYGON((11192608.387724396 1878156.1069176663,11265987.934878146 1770532.7710921667,11119228.840570647 1741180.9522306668,11192608.387724396 1878156.1069176663))";
    var srid = 102100;
    // point
    // var symbol = {
    //   "type": "esriPMS",
    //   "url": "471E7E31",
    //   "imageData": "iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAMNJREFUSIntlcENwyAMRZ+lSMyQFcI8rJA50jWyQuahKzCDT+6h0EuL1BA1iip8Qg/Ex99fYuCkGv5bKK0EcB40YgSE7bnTxsa58LeOnMd0QhwGXkxB3L0w0IDxPaMqpBFxjLMuaSVmRjurWIcRDHxaiWZuEbRcEhpZpSNhE9O81GiMN5E0ZRt2M0iVjshek8UkTQfZy8JqGHYP/rJhODD4T6wehtbB9zD0MPQwlOphaAxD/uPLK7Z8MB5gFet+WKcJPQDx29XkRhqr/AAAAABJRU5ErkJggg==",
    //   "contentType": "image/png",
    //   "width": 19.5,
    //   "height": 19.5,
    //   "angle": 0,
    //   "xoffset": 0,
    //   "yoffset": 0
    // };
    //  // polygon
    //  var symbol = {
    //   "type": "esriSFS",
    //   "style": "esriSFSSolid",
    //   "color": [115,76,0,255],
    //     "outline": {
    //      "type": "esriSLS",
    //      "style": "esriSLSSolid",
    //      "color": [110,110,110,255],
    //      "width": 1
    //    }
    // }
    // line
    var symbol = {
        "type": "esriSLS",
        "style": "esriSLSSolid",
        "color": [115, 76, 0, 255],
        "width": 1
    }

    var gIdGlobal = gisIframeWindow.GIS.addGraphic(shape, srid, symbol);
    console.log(gIdGlobal);
}

map.zoom = function (data) {
    console.log('this zoom');
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
    /*
    senderData = {
        "event": "zoom-map",
        "data": {
            "graphicLayerId": "bb_layer",
            "zoomBy": "MapService",
            "mapServiceJsonList": [{
                "layerIndexName": "PROVINCE",
                "layerName": "TD_BASEMAPS",
                "rendering": {
                    "condition": [{
                        "color": {
                            "r": 232,
                            "g": 255,
                            "b": 204,
                            "t": 0.3
                        },
                        "equal": id
                    }],
                    "field": "PRO_C",
                    "type": "Number"
                },
                "where": "PRO_C = 39"
            }]
        }
    };//*/

    senderData = JSON.stringify(senderData);

    // senderData = 58E93CEB3C710C6DCE6391FFE832DB2C26CC780CAF3B04999618904A6256AC55AE7C14297F5D3DDABE486433DA91D5F30B26D07CEE246E22B988B1F8DE0859F8A604A60B986E8FB3E8D9B5E4855F242AEB79B6238CA851524A9F9DA88C9F6D8B9E7EEEB2BF69AC511B833A965001D87E91F65E8F071695553AEC8BF62053951D4ECD9883BCA4D6A872625D1E89E41AFF05A044DFC8D423E9B265DF3ACA866193F945BB346091BEE3FAB541025BF235ED1F7B4C8197AD4D39F87E62577FF336ED927681FA6EFF5F9DF28FE2DB550E8D6FE9925B108ABD0A0AFE800C3A6359453D10113686BB163FD42272CAF7A0ED672FF45F187221B18A26

    encrpty(senderData).then(function (encryptData) {
        gisIframeWindow.postMessage(encryptData, window.document.location.origin + '/TD2');
    });
}


map.zoomProc = function (id) {
    console.log('============ MAP ===============');
    console.log(id);
    var senderData = zoom_select_province(id);
    _mapPostMessage(senderData);
}

map.zoomProc2 = function (id) {
    var senderData = zoom_select_SHP_4000_47(id);
    _mapPostMessage2(senderData);
}
 


function zoom_select_SHP_4000_47(id) {
    id = 9270;
    var LANDOFFICE = '50000000'


    var senderData = {};
    var data = {};
    var array_layers = [];
    senderData.event = "zoom-map";
    senderData.data = data;
    senderData.data.zoomBy = "MapService";
    senderData.data.graphicFlag = false;
    senderData.data.graphicLayerId = "province_layer";

    var layer_province = {};
    layer_province.layerName = "TD_BASEMAPS";
    layer_province.layerIndexName = "PARCEL_47_30";
    layer_province.where = "OBJECTID = " + id;
    layer_province.rendering = rendering_condition("OBJECTID", "Number", id, 232, 255, 204, 0.3);

    array_layers.push(layer_province);

    senderData.data.mapServiceJsonList = array_layers;
    //return senderData;

    var dataFix = { "event": "zoom-map", "data": { "graphicLayerId": "bb_layer", "zoomBy": "MapService", "mapServiceJsonList": [{ "layerIndexName": "SHP_2000_47", "layerName": "TD_VIEW", "rendering": { "condition": [{ "color": { "r": 239, "g": 245, "b": 154, "t": 0.3 }, "equal": "40975" }], "field": "OBJECTID", "type": "Number" }, "where": "OBJECTID = 40975" }] } };
    return dataFix;
}


map.zoomAmphoe = function (id) {
    var senderData = zoomBy_MapService_baseMap('AMPHOE', id);
    _mapPostMessage(senderData);
}

map.zoomTambol = function (id) {
    var senderData = zoomBy_MapService_baseMap('TAMBOL', id);
    _mapPostMessage(senderData);
}

map.drawPOI = function (x, y, r) {
    var transRes = map.transform(x, y);
    map.buffer(transRes[0].shape, r);
}

map.transform = function (x, y) {
    var shape = `POINT(${x} ${y})`,
        sridIn = 32647,
        sridOut = [102100];

    var transRes = gisIframeWindow.GIS.transform(shape, sridIn, sridOut);
    return transRes;
}

map.buffer = function (shape, r) {
    var srid = 102100,
        radius = parseInt(r),
        addGraphic = true;
    gisIframeWindow.GIS.buffer(shape, srid, radius, addGraphic);
}
