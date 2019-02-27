require([

    "esri/tasks/IdentifyTask",
    "esri/tasks/IdentifyParameters",
    "esri/graphic",
    "esri/layers/GraphicsLayer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",
    "esri/geometry/geometryEngine",

    "dojo/i18n!nls/global",
    "dojo/on",
    "dojo/_base/lang",
	"dojo/_base/array",
	"dojo/query",
	"dojo/dom-construct",
	"dojo/dom-class",
    "dojo/dom-style",
    "dojo/_base/declare"
], function (


    IdentifyTask,
    IdentifyParameters,
    Graphic,
    GraphicsLayer,
    SimpleMarkerSymbol,
    SimpleFillSymbol,
    SimpleLineSymbol,
    Color,
    geometryEngine,

    nlsGlobal,
    on,
    lang,
	array,
    query,
	domConstruct,
	domClass,
    domStyle,
    declare
    ) {
    return declare([
        _WidgetBase, _ProjectionMixin, _GeometryMixin
    ], {
        baseClass: "identify",
        templateString: template,
        nlsGlobal: nlsGlobal,
        mainPanel: null,
        identifyTaskUrl: null,
        graphic: null,
        dataArr: null,
        initialContent: null,
        _drawTools: null,

        constructor: function (params, srcNodeRef) {
            params = params || {};
        },

        postCreate: function () {
            this.inherited(arguments);
            this.createPanel();
            this.createInitialContent();

            this._drawTools = this.map.esrith.tools.draw.activate({
                type: "point",
                tooltip: nlsGlobal.message.Identify.clickOnMapForInfo,
                callback: lang.hitch(this, "_map_Click")
            })[0];
            this._initEvent();

            this.sessionManager = SessionManager.getInstance().getSession();
            this.configures = ConfigManager.getInstance().getAllConfig();
        },

        _initEvent: function () {
            this.own(
                //on(this._drawTools, "click", lang.hitch(this, "_map_Click")),
                on(this.mainPanel, "index-change", lang.hitch(this, "_mainPanel_IndexChange"))
                );
        },

        createPanel: function () {
            this.mainPanel = new AwesomePanel({
                title: "Layer",
                minimizeButtonVisibility: false,
                maximizeButtonVisibility: false,
                closeButtonVisibility: false
            });
        },

        _map_Click: function (evt) {
            console.log("evt", evt);
            this.prepareIdentify(evt.geometry);
        },

        getStringGeometry: function (geometry) {
            //console.log("getStringGeometry", geometry)

            var geo_wgs = this.geometry.toST(this.project.transform(geometry, 32647));
            //var geo_wgs = this.project.transform(geometry, 4326);
            var geo_47 = this.geometry.toST(this.project.transform(geometry, 24047));
            var geo_48 = this.geometry.toST(this.project.transform(geometry, 24048));


            return {
                GEO_WGS: geo_wgs,
                GEO_47: geo_47,
                GEO_48: geo_48
            }
        },

        getGCSGeometryFromUTM: function (ST_UTM_Geometry, spatialReference) {

            ////"this.geometry" is came from _GeometryMixin.js
            var utmGeometry = this.geometry.fromST(ST_UTM_Geometry, spatialReference);

            ////"this.project" is came from _ProjectionMixin.js
            var geometry = this.project.transform(utmGeometry, this.map.spatialReference.wkid);
            //console.log("getGCSGeometryFromUTM", geometry);
            return geometry;
        },

        prepareIdentify: function (mapPoint) {
            identifyTask = new IdentifyTask(this.identifyTaskUrl);
            identifyParams = new IdentifyParameters();

            identifyParams.tolerance = 5; // รัศมี pixel ที่วัดจากหน้าจอ 
            identifyParams.returnGeometry = true;
            identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_TOP;
            identifyParams.geometry = mapPoint;
            identifyParams.layerIds = [];
            identifyParams.mapExtent = this.map.extent;
            identifyParams.spatialReference = mapPoint.spatialReference;

            geometryParam = this.getStringGeometry(mapPoint)
            geometryParam.LANGUAGE = this.viewport.language.toUpperCase();
            geometryParam.CONCAT = "|";
            geometryParam.LAYER_IDS = "";

            for (serviceName in this.configures.layerConfig) {

                if (serviceName != "TD_BASEMAPS" && serviceName != "TD_VIEW") continue;

                for (layerName in this.configures.layerConfig[serviceName]) {

                    layerId = this.configures.layerConfig[serviceName][layerName].index;

                    // if (layerName == "__") identifyParams.layerIds.push(12);

                    var layer = this.map.getLayer(serviceName);

                    if (layer === undefined) continue;

                    if (layer.visibleLayers.indexOf(layerId) > -1) {
                        if (geometryParam.LAYER_IDS !== "") {
                            geometryParam.LAYER_IDS += geometryParam.CONCAT;
                        }
                        geometryParam.LAYER_IDS += layerName;
                    }
                }

                if (serviceName == "TD_BASEMAPS") {
                    let layer = this.map.getLayer(serviceName);

                    if (layer === undefined) continue;

                    if (layer.visibleLayers.indexOf(12) > -1) {
                        identifyParams.layerIds.push(12);
                    }
                }
            }

            console.log(geometryParam.LAYER_IDS);

            console.log(geometryParam);
            this.showLoading();
            this.reqSP("GIS_Q_IDENT_TEST", geometryParam).query(lang.hitch(this, function (response) {
                this.hideLoading();
                console.log("GIS_Q_IDENT", response);
                var item = null, tempObj = null, areaDetail = null;
                item = [];
                if (response.success == true) {
                    if (response.data) {
                        for (var i = 1, index = 'data', tempObj = {} ; response[index]; i++, index = 'data' + i, tempObj = {}) {
                            console.log(index);
                            console.log(response[index]);
                            response[index].map(lang.hitch(this, function (attribute) {
                                for (var key in attribute) {
                                    tempObj[key] = attribute[key];
                                }
                                item.push({
                                    layerName: tempObj['LAYER_NAME'] = tempObj.LAYER_NAME,
                                    feature: {
                                        attributes: tempObj,
                                        geometry: this.getGCSGeometryFromUTM(tempObj.SHAPE, tempObj.SRID)
                                    }
                                });
                            }));
                        }
                    }

                    //console.log(item);
                    //this._identComplete(item);
                    console.log(this.identifyTaskUrl);
                    console.log(identifyParams);
                    identifyTask.execute(identifyParams, lang.hitch(this, function (res) {
                        console.log("identyfyTask", res);
                        if (identifyParams.layerIds.indexOf(12) > -1) {
                            if (res.length > 0) {
                                item.push(res[res.length - 1]);
                            }
                        }
                        this._identComplete(item);
                    }),
                    lang.hitch(this, "_identError"));
                }
            }),
                lang.hitch(this, function (err) {
                    console.log("GIS_Q_IDENT fail", err);
                    //this._identError(err);
                    this.hideLoading();
                })
            )

            //identifyTask.execute(identifyParams, lang.hitch(this, "_identComplete"),
            //    lang.hitch(this, "_identError"));
        },


        _identComplete: function (res) {
            this.hideLoading();
            //console.log("Identify success", res);
            if (!res.length) {
                //console.log("no data")
                this.alert("ไม่มีข้อมูล");
                this.createInitialContent();
                return;
            };

            this.dataArr = res.map(lang.hitch(this, function (item) {
                if (item.feature.attributes.SRID) {
                    delete item.feature.attributes.SRID;
                }
                item.domNode = this.createItemNode(item);
                if (item.layerName == "แปลงที่ดินโฉนด" || item.layerName == "Deed Parcel" || item.layerName == "แปลงที่ดินน.ส. 3 ก " || item.layerName == "N.S. 3 K Parcel") {
                    var label;
                    this.viewport.language.toUpperCase() == "TH" ? label = "แสดงรูปภาพ" : label = "Show picture";
                    var domPic = domConstruct.create("div", {
                        className: "iden-pic",
                        innerHTML: label
                    });
                    domConstruct.place(domPic, item.domNode);
                    this.own(on(domPic, "click", lang.hitch(this, "_getMisPic", item)));
                }
                return item;
            }));

            this.addContents(this.dataArr);

            domConstruct.place(this.mainPanel.domNode, this.domNode, "only");
        },

        _getMisPic: function (data) {
            this.showLoading();
            // for test
            //var params = {
            //    KEY1: "5136",
            //    KEY2: "3",
            //    KEY3: "6820",
            //    KEY4: "05",
            //    KEY5: "1000",
            //    KEY6: "174"
            //}
            var k1, k2, k3, k4, k5, k6;
            if (this.viewport.language.toUpperCase() == "TH") {
                k1 = "ระวางภูมิประเทศ";
                k2 = "แผ่นระวางภูมิประเทศ";
                k3 = "ระวาง UTM";
                k4 = "แผ่นระวาง UTM";
                k5 = "มาตราส่วน";
                k6 = "เลขที่ดิน";
            }
            else {
                k1 = "Mapsheet 1:50,000";
                k2 = "Mapsheet 1:50,000 (Sheet number)";
                k3 = "Mapsheet 1:4,000";
                k4 = "Mapsheet 1:4,000 (Sheet number)";
                k5 = "Scale of Mapsheet";
                k6 = "Land Number";
            }
            var params = {
                KEY1: data.feature.attributes[k1],
                KEY2: data.feature.attributes[k2],
                KEY3: data.feature.attributes[k3],
                KEY4: data.feature.attributes[k4],
                KEY5: data.feature.attributes[k5],
                KEY6: data.feature.attributes[k6]
            }
            this.reqDS("GET_MIS_PIC", params).query(lang.hitch(this, "_getMisPic_Success"), lang.hitch(this, "_getMisPic_Error"));
        },

        _getMisPic_Success(res) {
            if (res.data.length > 0) {
                this.show(this.viewport.picViewer);
                res.data.forEach(lang.hitch(this, function (item) {
                    var divImg = domConstruct.create("div", {
                        style: "display:none;width:100%;cursor:pointer;height:100%;background-position: center;background-repeat: no-repeat;background-size: contain;background-image:url(" + item + ")"
                    });
                    domConstruct.place(divImg, this.viewport.divPic, "last");
                    this.own(on(divImg, "click", lang.hitch(this, function () {
                        window.open(item);
                    })));
                }));
                this.viewport.divPic.children[0].style.display = "block"
                if (this.viewport.divPic.childElementCount < 2) {
                    this.hide(this.viewport.divPicBtn);
                }
                else {
                    this.show(this.viewport.divPicBtn);
                }
            }
            else {
                this.alert("ไม่มีรูปภาพ");
            }
            this.hideLoading();
        },

        _getMisPic_Error(res) {
            console.log(res)
            this.hideLoading();
            this.alert("ไม่สามารถเชื่อมโยงรูปภาพจากระบบ PV SURVEY ได้");
        },

        addContents: function (dataArr) {
            var domNodes = dataArr.reduce(function (arr, item) {
                return arr.concat(item.domNode);
            }, []);
            this.mainPanel.place(domNodes);
        },

        createGraphic: function (geometry) {
            if (this.graphic) this.map.graphics.remove(this.graphic);

            var symbol, type = geometry.type.toLowerCase();

            if (type == "point") {
                symbol = new SimpleMarkerSymbol();
                symbol.setColor(new Color([255, 143, 0, 1]));
            }
            else if (type == "polyline") {
                symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                         new Color([0, 255, 255]), 2);
            }
            else if (type == "polygon") {
                symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                         new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                         new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25]));
            }

            this.graphic = new Graphic(geometry, symbol);
            this.map.graphics.add(this.graphic);


            this.map.esrith.zoomToFeatures(this.graphic, 2);
            setTimeout(lang.hitch(this, function () {
                if (this.map.getScale() < this._defaultScale) {
                    this.map.setScale(this._defaultScale);
                }
            }), 1000);
        },

        _mainPanel_IndexChange: function (evt) {
            var title = nlsGlobal.label.layer + ": " + evt.currentWidget.getAttribute("name");
            this.mainPanel.set("title", title);
            this.createGraphic(this.dataArr[evt.currentIndex].feature.geometry);
        },

        _identError: function (err) {
            this.hideLoading();
            this.alert(nlsGlobal.message.FAIL);
            console.log("Identify Error", err)
        },

        createItemNode: function (item) {
            var text = "";
            var ignoredAttr = ["OBJECTID", "SHAPE", "FID", "OGR_FID", "Stretched value", "LAYER_NAME"];
            for (var key in item.feature.attributes) {
                //Ignore
                if (this.arrIncludes(ignoredAttr, key)) { continue; }

                if (key == "Pixel Value") {
                    if (this.sessionManager.LANGUAGE_MENU.toUpperCase() == "TH") {
                        text += "ความสูง (จากระดับน้ำทะเล)" + " : " + parseFloat(item.feature.attributes[key]).toLocaleString() + " เมตร<br/>";
                    }
                    else if (this.sessionManager.LANGUAGE_MENU.toUpperCase() == "EN") {
                        text += "metres above sea level(MAMSL)" + " : " + parseFloat(item.feature.attributes[key]).toLocaleString() + " meters<br/>";
                    }
                }
                else {
                    text += key + " : " + item.feature.attributes[key] + "<br/>";
                }
            }

            var attributes = {
                className: "content",
                name: item.layerName,
                innerHTML: text
            };

            return domConstruct.create("div", attributes);
        },

        createInitialContent: function () {
            this.initialContent = domConstruct.create("div", {
                className: "content",
                innerHTML: nlsGlobal.message.Identify.clickOnMapForInfo
            });
            domConstruct.place(this.initialContent, this.domNode, "only");
            if (this.graphic) this.map.graphics.remove(this.graphic);
        },
        deactivate: function () {
            this._drawTools.deactivate();
        },
        destroy: function () {
            if (this.graphic) this.map.graphics.remove(this.graphic);
            this._drawTools.deactivate();
            this.map.graphics.clear();

            this.inherited(arguments);
        }
    });
});