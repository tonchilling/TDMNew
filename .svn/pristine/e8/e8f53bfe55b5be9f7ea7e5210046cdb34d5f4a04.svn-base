//alert ("path function map");
function roman_sheet(no) {
    var no_sheet;
    if (no == '1') {
        no_sheet = 'I';
    }
    if (no == '2') {
        no_sheet = 'II';
    }
    if (no == '3') {
        no_sheet = 'III';
    }
    else {
        no_sheet = 'IV';
    }
    return no_sheet;
}

// var pointJson = new Point( {
//     "x": 11111060.538097654, 
//     "y": 2261692.727185058, 
//     "spatialReference": {"wkid": 102100}, 
//     "color":{r:255,g:255,b:255},
//     "pointType": "square" 
// });

// jsonData = { 
//     zoomBy: "Point",
//     pointJsonList: [ pointJson, pointJson]
// };
// เพิ่มตำแหน่งจุด บนแผนที่โดยให้ symbol ต่างกัน


var province_zone = 0; // ตัวแปรโซนของจังหวัด (0 = จังหวัดนั้นมี 2 โซน) 
var parameter_where; // ตัวแปรสำหรับใส่ค่า parameter สำหรับค้นหาทั้ง mis และ GIS
var old_where_doctype = '';
var old_where_branch = '';
var old_where_amphur = '';
var old_where_tambol = '';
var old_where_scale = '';

// กำหนดค่าการแสดงผลบนแผนที่
function rendering_condition(p_field, p_type, p_condition, p_r, p_g, p_b, p_t) {
    var rendering = {};
    var v_condition = {};
    var array_condition = [];

    rendering.field = p_field;
    rendering.type = p_type;


    v_condition.equal = p_condition;
    v_condition.color = {};
    v_condition.color.r = p_r;
    v_condition.color.g = p_g;
    v_condition.color.b = p_b;
    if (p_t != null) {
        v_condition.color.t = p_t;
    }
    array_condition.push(v_condition);

    rendering.condition = array_condition;
    return rendering;
}

// ค้นหาชั้นข้อมูลจังหวัด id คือรหัสของจังหวัด
function zoom_select_province(id) {
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
    layer_province.layerIndexName = "PROVINCE";
    layer_province.where = "PRO_C = " + id;
    layer_province.rendering = rendering_condition("PRO_C", "Number", id, 232, 255, 204, 0.3);

    array_layers.push(layer_province);

    senderData.data.mapServiceJsonList = array_layers;
    return senderData;
}

function RoundNum(num, length) {
    var number = Math.round(num * Math.pow(10, length)) / Math.pow(10, length);
    return number;
}

function clear_map_data(layer) {
    var data_for_send = {};
    var data = {};
    data_for_send.event = "clear-graphic-layer-byid";
    data_for_send.data = data;
    data_for_send.data.graphicLayerId = layer;

    return data_for_send;
}

function clear_layer(LayerName, LayerIndexName) {
    var json_data = {};
    json_data.event = "close-service-map";
    json_data.data = {};
    json_data.data.mapServiceJsonList = [];
    var layer_list = {};
    layer_list.layerName = LayerName;
    layer_list.layerIndexName = LayerIndexName;
    json_data.data.mapServiceJsonList.push(layer_list);

    return json_data;
}

function zoomBy_MapService_baseMap(layerIndexName, id) {
    var param_field;
    var senderData = {};
    var data = {};
    var array_layers = [];

    var province_id = $("#sel_province").val();
    var branch = $("#sel_landoffice").val();

    senderData.event = "zoom-map";
    senderData.data = data;
    senderData.data.zoomBy = "MapService";
    senderData.data.graphicLayerId = "base_map";

    if (layerIndexName == "DOL_OFFICE") {
        param_field = "ORG_CODE";
        var layer_branch = {};
        layer_branch.layerName = "TD_BASEMAPS";
        layer_branch.layerIndexName = layerIndexName;
        layer_branch.where = param_field + " = " + id;
        layer_branch.rendering = rendering_condition(param_field, "Number", id, 255, 244, 201, 0);

        array_layers.push(layer_branch);
    }

    if (layerIndexName == "AMPHOE") {
        param_field = "DIS_C";
        var layer_amphur = {};
        layer_amphur.layerName = "TD_BASEMAPS";
        layer_amphur.layerIndexName = layerIndexName;
        layer_amphur.where = param_field + " = " + id;
        layer_amphur.rendering = rendering_condition(param_field, "Number", id, 255, 244, 201, 0);

        array_layers.push(layer_amphur);
    }

    if (layerIndexName == "TAMBOL") {
        param_field = "SUB_C";
        var layer_tambol = {};
        layer_tambol.layerName = "TD_BASEMAPS";
        layer_tambol.layerIndexName = layerIndexName;
        layer_tambol.where = param_field + " = " + id;
        layer_tambol.rendering = rendering_condition(param_field, "Number", id, 255, 244, 201, 0);

        array_layers.push(layer_tambol);
    }
    senderData.data.mapServiceJsonList = array_layers;
    return senderData;
}

function rendering_condition(p_field, p_type, p_condition, p_r, p_g, p_b, p_t) {
    var rendering = {};
    var v_condition = {};
    var array_condition = [];

    rendering.field = p_field;
    rendering.type = p_type;


    v_condition.equal = p_condition;
    v_condition.color = {};
    v_condition.color.r = p_r;
    v_condition.color.g = p_g;
    v_condition.color.b = p_b;
    if (p_t != null) {
        v_condition.color.t = p_t;
    }
    array_condition.push(v_condition);

    rendering.condition = array_condition;
    return rendering;
}

function parcel_base_branch(province_id, branch) {
    var senderData = {};
    var data = {};
    var array_layers = [];
    var layer_parcel = {};
    var layer_ns3k = {};
    var layer_parcel47 = {};
    var layer_parcel48 = {};
    var layer_ns3k47 = {};
    var layer_ns3k48 = {};
    var layer_road_47 = {};
    var layer_road_48 = {};
    var layer_road = {};
    senderData.event = "zoom-map";
    senderData.data = data;
    senderData.data.zoomBy = "MapService";
    senderData.data.graphicLayerId = "parcel_base";

    var rendering_road = {};
    var condition_road = {};
    var array_condition_road = [];
    rendering_road.field = "STREET_CODE";
    rendering_road.type = "Text";
    condition_road.like = "S";
    condition_road.color = { "r": 255, "g": 255, "b": 255, "t": 0.5 };
    array_condition_road.push(condition_road);
    var condition_road = {};
    condition_road.notlike = "S";
    condition_road.color = { "r": 126, "g": 192, "b": 238, "t": 0.5 };
    array_condition_road.push(condition_road);

    rendering_road.condition = array_condition_road;


    layer_road.layerName = "TD_VIEW";
    layer_road.layerIndexName = "ROAD_" + province_zone;
    layer_road.where = "BRANCH_CODE = " + branch;
    layer_road.rendering = rendering_road;


    layer_road_47.layerName = "TD_VIEW";
    layer_road_47.layerIndexName = "ROAD_47";
    layer_road_47.where = "BRANCH_CODE = " + branch;
    layer_road_47.rendering = rendering_road;

    layer_road_48.layerName = "TD_VIEW";
    layer_road_48.layerIndexName = "ROAD_48";
    layer_road_48.where = "BRANCH_CODE = " + branch;
    layer_road_48.rendering = rendering_road;

    layer_parcel.layerName = "TD_VIEW";
    layer_parcel.layerIndexName = "PARCEL_" + province_zone + "_" + province_id;
    layer_parcel.where = "BRANCH_CODE = " + branch;
    layer_parcel.rendering = rendering_condition("BRANCH_CODE", "Number", branch, 255, 255, 255, 0);

    layer_parcel47.layerName = "TD_VIEW";
    layer_parcel47.layerIndexName = "PARCEL_47_" + province_id;
    layer_parcel47.where = "BRANCH_CODE = " + branch + "AND PARCEL_TYPE = 1";
    layer_parcel47.rendering = rendering_condition("BRANCH_CODE", "Number", branch, 255, 255, 255, 0);

    layer_parcel48.layerName = "TD_VIEW";
    layer_parcel48.layerIndexName = "PARCEL_48_" + province_id;
    layer_parcel48.where = "BRANCH_CODE = " + branch + "AND PARCEL_TYPE = 1";
    layer_parcel48.rendering = rendering_condition("BRANCH_CODE", "Number", branch, 255, 255, 255, 0);

    layer_ns3k.layerName = "TD_VIEW";
    layer_ns3k.layerIndexName = "PARCEL_" + province_zone + "_NS3K_" + province_id;
    layer_ns3k.where = "BRANCH_CODE = " + branch;
    layer_ns3k.rendering = rendering_condition("BRANCH_CODE", "Number", branch, 255, 255, 255, 0);

    layer_ns3k47.layerName = "TD_VIEW";
    layer_ns3k47.layerIndexName = "PARCEL_47_NS3K_" + province_id;
    layer_ns3k47.where = "BRANCH_CODE = " + branch;
    layer_ns3k47.rendering = rendering_condition("BRANCH_CODE", "Number", branch, 255, 255, 255, 0);

    layer_ns3k48.layerName = "TD_VIEW";
    layer_ns3k48.layerIndexName = "PARCEL_48_NS3K_" + province_id;
    layer_ns3k48.where = "BRANCH_CODE = " + branch;
    layer_ns3k48.rendering = rendering_condition("BRANCH_CODE", "Number", branch, 255, 255, 255, 0);

    if (province_zone == 0) {
        array_layers.push(layer_road_48);
        array_layers.push(layer_road_47);
        array_layers.push(layer_parcel47);
        array_layers.push(layer_parcel48);
        array_layers.push(layer_ns3k47);
        array_layers.push(layer_ns3k48);
    }
    else {
        array_layers.push(layer_road);
        array_layers.push(layer_parcel);
        array_layers.push(layer_ns3k);
    }


    senderData.data.mapServiceJsonList = array_layers;

    //console.log(JSON.stringify(senderData));
    return senderData;
}

function gen_where_option(parameter_where) {
    var province_id = $("#sel_province").val();
    var doctype = $("#sel_doctype").val();
    var doc_type = "&doctype=" + doctype;

    if (province_zone == 0 && doctype == "") {
        var ns3k = "&ns3k47=PARCEL_47_NS3K_" + province_id + "&ns3k48=PARCEL_48_NS3K_" + province_id;
        var parcel = "&parcel47=PARCEL_47_" + province_id + "&parcel48=PARCEL_48_" + province_id;

        parameter_where = parameter_where.replace(parcel, '');
        parameter_where = parameter_where.replace(ns3k, '');
        parameter_where = parameter_where.replace(old_where_doctype, '');
        parameter_where = parameter_where + parcel + ns3k + doc_type;
        old_where_doctype = doc_type;
    }
    if (province_zone == 0 && doctype == "PARCEL") {
        var ns3k = "&ns3k47=PARCEL_47_NS3K_" + province_id + "&ns3k48=PARCEL_48_NS3K_" + province_id;
        var parcel = "&parcel47=PARCEL_47_" + province_id + "&parcel48=PARCEL_48_" + province_id;
        parameter_where = parameter_where.replace(parcel, '');
        parameter_where = parameter_where.replace(ns3k, '');
        parameter_where = parameter_where.replace(old_where_doctype, '');
        parameter_where = parameter_where + parcel + doc_type;
        old_where_doctype = doc_type;
    }
    if (province_zone == 0 && doctype == "NS3K") {
        var ns3k = "&ns3k47=PARCEL_47_NS3K_" + province_id + "&ns3k48=PARCEL_48_NS3K_" + province_id;
        var parcel = "&parcel47=PARCEL_47_" + province_id + "&parcel48=PARCEL_48_" + province_id;
        parameter_where = parameter_where.replace(parcel, '');
        parameter_where = parameter_where.replace(ns3k, '');
        parameter_where = parameter_where.replace(old_where_doctype, '');
        parameter_where = parameter_where + ns3k + doc_type;
        old_where_doctype = doc_type;
    }
    if (province_zone != 0 && doctype == "") {
        var ns3k = "&ns3k=PARCEL_" + province_zone + "_NS3K_" + province_id;
        var parcel = "&parcel=PARCEL_" + province_zone + "_" + province_id;
        parameter_where = parameter_where.replace(parcel, '');
        parameter_where = parameter_where.replace(ns3k, '');
        parameter_where = parameter_where.replace(old_where_doctype, '');
        parameter_where = parameter_where + parcel + ns3k + doc_type;
        old_where_doctype = doc_type;
    }
    if (province_zone != 0 && doctype == "PARCEL") {
        var ns3k = "&ns3k=PARCEL_" + province_zone + "_NS3K_" + province_id;
        var parcel = "&parcel=PARCEL_" + province_zone + "_" + province_id;
        parameter_where = parameter_where.replace(parcel, '');
        parameter_where = parameter_where.replace(ns3k, '');
        parameter_where = parameter_where.replace(old_where_doctype, '');
        parameter_where = parameter_where + parcel + doc_type;
        old_where_doctype = doc_type;
    }
    if (province_zone != 0 && doctype == "NS3K") {
        var ns3k = "&ns3k=PARCEL_" + province_zone + "_NS3K_" + province_id;
        var parcel = "&parcel=PARCEL_" + province_zone + "_" + province_id;
        parameter_where = parameter_where.replace(parcel, '');
        parameter_where = parameter_where.replace(ns3k, '');
        parameter_where = parameter_where.replace(old_where_doctype, '');
        parameter_where = parameter_where + ns3k + doc_type;
        old_where_doctype = doc_type;
    }
    return parameter_where;
}