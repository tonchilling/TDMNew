
var iframeElement = document.getElementById('tdmap');
iframeElement.src = config.mapUrl;//'http://tdwebsite/TD2';
gisIframeWindow = null;
iframeElement.onload = function () {
    gisIframeWindow = iframeElement.contentWindow;
}


function encrpty(json) {
    return http.post("/api/GIS/Encrypt", { text: JSON.stringify(json) });
}

function _mapPostMessage(senderData) {
    //var encryptData = fnEncryptData(senderData);//เข้ารหัสข้อมูลโดยใช้ encryption-helper

    //var iframe = document.getElementById('tdmap');
    // iframe.contentWindow.postMessage(encryptData, domain); //send the message and target URI
    encrpty(senderData).then(function (encryptData) {
        var domain = window.document.location.origin;
        gisIframeWindow.postMessage(encryptData, domain);
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
    console.log('xxxxxxxxxxxxxxxxx');
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
        //gisIframeWindow.postMessage(encryptData, 'https://tdwebsite/TD2');
          gisIframeWindow.postMessage(encryptData, 'https://p-staging.treasury.go.th/TD2');
    });
}


map.zoomProc = function (id) {
    var senderData = zoom_select_province(id);
    _mapPostMessage(senderData);
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

map.clear = function () {
    gisIframeWindow.GIS.removeGraphic();
}

map.addGraphic = function (shape, symbol) {
    var sridIn = 32647;
    var sridOut = [102100];
    var trans = gisIframeWindow.GIS.transform(shape, sridIn, sridOut);

    symbol = symbol || {
        "type": "esriSLS",
        "style": "esriSLSSolid",
        "color": [0, 0, 0, 255],
        "width": 1
    }

    return gisIframeWindow.GIS.addGraphic(trans[0].shape, 102100, symbol);
}

map.addGraphicCity = function (shape, symbol) {
    var sridIn = 32647;
    var sridOut = [102100];
    var trans = gisIframeWindow.GIS.transform(shape, sridIn, sridOut);

    symbol = symbol || {
        "type": "esriSLS",
        "style": "esriSLSSolid",
        "color": [115, 76, 0, 255],
        "width": 2
    }

    return gisIframeWindow.GIS.addGraphic(trans[0].shape, 102100, symbol);
}

map.removeGraphic = function (gId) {
    gisIframeWindow.GIS.removeGraphic(gId);
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

map.transformShape = function (x, y) {
    var shape = `POINT(${x} ${y})`,
        sridIn = 32647,
        sridOut = [24047, 24048];

    var transRes = gisIframeWindow.GIS.transform(shape, sridIn, sridOut);
    return transRes;
}

map.transformPolygon = function (polygon) {
    var shape = polygon,
        sridIn = 32647,
        sridOut = [24047, 24048];

    var transRes = gisIframeWindow.GIS.transform(shape, sridIn, sridOut);
    return transRes;
}

map.openMeasurementTool = function (toolName) {
    gisIframeWindow.GIS.openFunction('measurement', { toolName: toolName });
}

map.activateDraw = function (callback) {
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
}