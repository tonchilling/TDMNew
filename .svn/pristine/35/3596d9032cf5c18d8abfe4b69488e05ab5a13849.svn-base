var provincesMap = {};
var districtsMap = {};
var subDistrictsMap = {};
var poiList = [];

var TMD_CRITERIAS = { LAND: 'LAND', CONDOMINIUM: 'CONDOMINIUM', CONSTRUCTION: 'CONSTRUCTION' }
var TMD_MEASURE_TYPES = { POLYGON: 'POLYGON', LINE: 'LINE' }
var TMD_STATES = { TMD_SEARCH: 'TMD_SEARCH' }

jQuery.fn.extend({
    tmd_getCurrentState: function (stateName) {
        var state = $(this).state()[stateName];
        if (state) return state[state.length - 1];
        return null;
    },
})

String.prototype.toStateEvent = function () {
    return `state:${this}`;
}

$(function () {

    var initialState = {
        changwatCode: '',
        amphurCode: '',
        tumbonCode: '',
        branchCodes: '',
        chanodNo: '',
        landNo: '',
        parcelType: '1',
        priceType: '1',
        location: '',
        valType: '1',
        shapes: [],
        data: [],
        measureType: '',
        radius: 100,
        x: 0,
        y: 0,
        objectId: '',
        dataType: TMD_CRITERIAS.LAND,
        searchCriteria: '',
        level: 0,
        isFetchingData: false,
        error: false,
        hasBackButtonResultDetail: false,
        renderResult: renderResult,
        renderPOIsList: renderPOIsList,
        renderPOIDetail: renderPOIDetail,
        renderResultsDetailPOIs: renderResultsDetailPOIs,
    }

    console.log('state xxx');
    var btnSearch = $('.btn-search');
    btnSearch.state(initialState, TMD_STATES.TMD_SEARCH);

    var btnSearch$ = Rx.Observable
        .fromEvent(btnSearch, 'click')
        .throttleTime(1000);

    var results = $('#results-list');
    var searchResult = $('#search-result');

    btnSearch$.subscribe(function (event) {
        setState({ isFetchingData: true, error: false });
        var currentState = getCurrentState();
        switch (currentState.dataType) {
            case TMD_CRITERIAS.LAND:
                renderSearchResult(currentState);
                break;
            case TMD_CRITERIAS.CONDOMINIUM:
                renderSearchResultCondominiums(currentState);
                break;
            case TMD_CRITERIAS.CONSTRUCTION:
                renderSearchResultConstructions(currentState);
                break;
            default:
                throw new Error('Data type is missing!');
                break;
        }
    })

    var loadingPlaceholder = new LoadingPlaceHolder();

    function renderSearchResult(state) {
        switch (state.searchCriteria) {
            case 'map':
                if (state.measureType.length > 0) {
                    if (state.shapes.length > 0) {
                        renderResultsDetail();
                    } else {
                        alert("กรุณาวาดพื้นที่ที่สนใจ");
                    }
                } else {
                    alert('กรุณาเลือกเครื่องมือวาด');
                }
                break;
            case 'rawang':
                if (state.shapes.length > 0) {
                    renderResultsDetail();
                } else {
                    alert("กรุณาวาดพื้นที่ที่สนใจ");
                }
                break;
            case 'condition':
                renderResultsDetailPOIs();
                break;
            default:
                break;
        }
    }

    function renderSearchResultCondominiums(state) {
        renderResultsDetailPOIs();
    }

    function renderResultsDetail() {
        var render = function (state) {
            var resultDetail = new ResultsDetail(state);
            resultDetail.render();
            loadingPlaceholder.destroy();
        }
        loadingPlaceholder.render(new ResultsDetail(initialState).instance);
        fetchResultData(render)
    }

    function renderResultsDetailPOIs() {
        var render = function (state) {
            var resultDetailPOIs = new ResultsDetailPOIs(state);
            resultDetailPOIs.render();
            loadingPlaceholder.destroy();
        }
        loadingPlaceholder.render(new ResultsDetailPOIs(initialState).instance);
        fetchData(render)
    }

    function renderResult(props) {
        switch (props.dataType) {
            case TMD_CRITERIAS.LAND:
                _renderResult(props);
                break;
            case TMD_CRITERIAS.CONDOMINIUM:
                _renderResultCondominiums(props);
                break;
            case TMD_CRITERIAS.CONSTRUCTION:
                _renderResultConstructions(props);
                break;

        }
    }

    function _renderResult(props) {
        var render = function (state) {
            var resultDatail = new ResultsDetail(state);
            resultDatail.render();
            loadingPlaceholder.destroy();
        }
        var currentState = getCurrentState();
        map.drawPOI(currentState.x, currentState.y, currentState.radius);
        loadingPlaceholder.render(new ResultsDetail(initialState).instance);
        fetchResultData(render);
    }

    function _renderResultCondominiums(props) {
        var render = function (state) {
            var resultDatail = new DetailPOIsCondominiums(state);
            resultDatail.render();
            loadingPlaceholder.destroy();
        }
        var currentState = getCurrentState();
        //map.drawPOI(currentState.x, currentState.y, currentState.radius);
        loadingPlaceholder.render(new DetailPOIsCondominiums(initialState).instance);
        fetchPOIsDetailDataCondominiums(render);
    }

    function _renderResultConstructions(props) {
        throw new Error('Not implemented!')
    }

    function renderPOIsList(props) {
        var render = function (state) {
            var poisResults = new ResultsPOIs(state);
            poisResults.render();
            loadingPlaceholder.destroy();
        }
        loadingPlaceholder.render(new ResultsPOIs(initialState).instance);
        fetchPOIsListData(render)
    }

    function renderPOIDetail(props) {
        switch (props.dataType) {
            case TMD_CRITERIAS.LAND:
                _renderPOIDetils(props);
                break;
            case TMD_CRITERIAS.CONDOMINIUM:
                _renderPOIDetialsCondominiums(props);
                break;
            case TMD_CRITERIAS.CONSTRUCTION:
                _renderPOIDetialsConstructions(props);
                break;

        }
    }

    function _renderPOIDetils(props) {
        var render = function (state) {
            var detail = new DetailPOIs(state);
            detail.render();
            loadingPlaceholder.destroy();
        }
        loadingPlaceholder.render(new DetailPOIs(initialState).instance);
        fetchPOIsDetailData(render);
    }

    function _renderPOIDetialsCondominiums(props) {
        var render = function (state) {
            var detail = new DetailPOIsCondominiums(state);
            detail.render();
            loadingPlaceholder.destroy();
        }
        loadingPlaceholder.render(new DetailPOIsCondominiums(initialState).instance);
        fetchPOIsDetailData(render);
    }

    function _renderPOIDetialsConstructions(props) {
        throw new Error('Not implemented!');
    }

    function clearSearchResult() {
        var result = new ResultsDetail(initialState);
        result.clearContent();

        new GISMap().restoreHeight();
    }

    $('#province').on('change', function (event) {
        console.log('yyyyyyyyyyyyyyyy');
        setState({ changwatCode: provincesMap[this.value].PROVINCE_ID, amphurCode: '', tumbonCode: '' });
    })

    $('#district').on('change', function (event) {
        setState({ amphurCode: districtsMap[this.value].AMPHUR_ID, tumbonCode: '' });
    })

    $('#sub-district').on('change', function (event) {
        setState({ tumbonCode: subDistrictsMap[this.value].TAMBOL_ID });
    })

    $('#branch').on('change', function (event) {
        setState({ branchCodes: $(this).val() });
    })

    $('#btn-search-condition, #btn-search-map, #btn-search-rawang').on('click', function (event) {
        var searchCriteria = $(this).data('searchCriteria');
        setState({ searchCriteria: searchCriteria, hasBackButtonResultDetail: searchCriteria == "condition" });
    })

    $('ul.nav-tabs.data-types a').on('click', function (event) {
        setState({ dataType: $(this).data('dataType') });
        clearSearchResult();
    })

    $('#btn-search-point, #btn-search-line').on('click', function (event) {
        setState({ measureType: $(this).data('measureType') });
        var state = getCurrentState();
        setState({ shapes: [] });
        helpers.activateGISDrawTool(state.measureType, function (result) {
            setState({ shapes:  result })
        })
        switch (state.measureType) {
            case 'areaCycle':
                $('#btn-search-line').removeClass('active');
                $('#btn-search-point').addClass('active');
                break;
            default:
                $('#btn-search-point').removeClass('active');
                $('#btn-search-line').addClass('active');
                break;
        }
    })

    $('#radius').on('click', function (event) {
        setState({ radius: this.value });
    })

    $('#type').on('change', function (event) {
        setState({ parcelType: this.value });
    })

    $('#valType').on('change', function (event) {
        setState({ valType: this.value });
    })

    $('body').on(TMD_STATES.TMD_SEARCH.toStateEvent(), function (event, fullState, currentState) {
        console.log(fullState, currentState);
    })

    http.get("/api/Address/GetProvinces", {}, function (data) {
        $("#province").empty();
        $("#province").append("<option value=''>จังหวัด</option>");
        $.each(data, function (index, row) {
            provincesMap[row.PROVINCE_SEQ] = row;
            $("#province").append("<option value='" + row.PROVINCE_SEQ + "'>" + row.PROVINCE_NAME_TH + "</option>");
        });
        $("#province").selectpicker('refresh');
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

        console.log('Zoom');
        map.zoomProc(provincesMap[provinceId].PROVINCE_ID);
    });

    $("#district").change(function () {
        var district = $("#district").val();
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

        map.zoomAmphoe(districtsMap[district].AMPHUR_ID);
    });

    $("#sub-district").change(function () {
        var subDistrict = $("#sub-district").val();
        map.zoomTambol(subDistrictsMap[subDistrict].TAMBOL_ID);
    });

    $("#province").change(function () {
        var district = $('#district').val() + '';
        http.get("/api/Address/GetBranchById", { PRO_C: $("#province").val(), DIS_C: district.length == 0 ? 0 : parseInt(district) }, function (data) {
            $("#branch").empty();
            $("#branch").append("<option value='1'>ทั้งหมด</option>");
            $.each(data, function (index, row) {
                $("#branch").append("<option value='" + row.LANDOFFICE_ID + "'>" + row.LANDOFFICE_NAME_TH + "</option>");
            });
            $("#branch").selectpicker('refresh');
        });
    });

    //on click tab
    $("#btn-detail-price").click(function () {
        $('#blog-filter-detail').css('display', 'block');
        removeTab();
        $('#btn-detail-price').addClass('active');
    });
    $("#btn-change-price").click(function () {
        $('#blog-filter-detail').css('display', 'none');
        removeTab();
        $('#btn-change-price').addClass('active');
    });
    $("#btn-detail-building").click(function () {
        $('#blog-filter-detail').css('display', 'none');
        removeTab();
        $('#btn-detail-building').addClass('active');
    });
    $("#btn-analys").click(function () {
        $('#blog-filter-detail').css('display', 'none');
        removeTab();
        $('#btn-analys').addClass('active');
    });
    $("#btn-progress").click(function () {
        $('#blog-filter-detail').css('display', 'none');
        removeTab();
        $('#btn-progress').addClass('active');
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
});

function removeTab() {
    $('#btn-detail-price').removeClass('active');
    $('#btn-change-price').removeClass('active');
    $('#btn-analys').removeClass('active');
    $('#btn-progress').removeClass('active');
    $('#btn-detail-building').removeClass('active');
}

var PARCEL_TYPES = { CHANOD: 1, NS3K: 2 };

function onSearchPriceClick() {


    var province = $("#province").val();
    var district = $("#district").val();
    var subDistrict = $("#sub-district").val();

    var province_id = provincesMap[province] ? provincesMap[province].PROVINCE_ID : null;
    var district_id = districtsMap[district] ? districtsMap[district].AMPHUR_ID : null;
    var subDistrict_id = subDistrictsMap[subDistrict] ? subDistrictsMap[subDistrict].TAMBOL_ID : null;

    //$('#results-list').css('display', 'inline-block');
    $('#results-list').css('display', 'block');
    $('#results-detail').css('display', 'none');
    $('#plots-list').css('display', 'none');
    $('#plots-detail').css('display', 'none');

}

function searchByCondition(province_id, district_id, subDistrict_id) {
    http.get("/api/PriceSys/GetPOIs", {
        prov_id: province_id, amph_id: district_id, tumb_id: subDistrict_id
    }, function (list) {
        poiList = list;
        $('#results-list header h3').html('จำนวนผลลัพธ์ <span id="search-total"></span> รายการ');
        $('#search-total').text(list.length);
        $('#results-list header').show();
        $('#results-list header .buttons').show();
        $('#search-result').empty();

        $.each(list, function (index, row) {
            var html = `<li>
                            <div class="item" >
                                <div class="wrapper poi-parcel-result" id="btn-search-result-${index}" data-index="${index}" >
                                    <a href="#" id="1"><h3>${row.NAME_T}</h3></a>
                                    <figure>${row.AMPH_NAME_T} ${row.TUMB_NAME_T} ${row.PROV_NAME_T} ${row.TUMB_CODE}</figure>
                                </div>
                                <div class="wrapper align-right padding-top-0">
                                    <a href="javascript:void(0);"  onclick="$('#btn-search-result-${index}').trigger('click');" index="${index}" ><i class="fa fa-crosshairs" style="font-size: 22px"></i></a>
                                </div>
                            </div>
                        </li>`;
            $("#search-result").append(html);
        });
    });
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

    $(document).data('searchCondition', value);

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

    var toolName = value;

    if (value === 'point') {
        $('#btn-search-point').addClass('active');
    } else if (value === 'line') {
        $('#btn-search-line').addClass('active');
    }

}

function setMeasurementResult(toolName) {
    var data = '{result: 64270552280.33008, unit: "area-rai", shape: "POLYGON((11058221.876185538 2364573.7317723273,10822009.207177242 2141989.1054060003,11085093.914785365 2092279.3246206867,11346848.09499071 2039257.7393906196,11346848.09499028 2039257.7393907076,11056494.250654243 2364573.7317722477))", srid: 102100}';
}