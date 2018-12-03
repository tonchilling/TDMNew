
function ResultsDetail(props) {
    var container   = $('#results-detail ul.results.list > li'),
        instance = $('#results-detail'),
        backButton = $('#results-detail header a');
    this.data = (props.data || []);
    this.instance = instance;
    this.container = container;
    this.backButton = backButton;

    var clearContent = function () {
        container.empty();
        instance.hide();
        backButton.unbind();

        var header = new ResultsHeader(props);
        var pois = new ResultsPOIs(props);
        var detail = new DetailPOIs(props);
        var pager = new Pagination();

        header.clearContent();
        pois.clearContent();
        detail.clearContent();
        pager.clear(instance.parent());
    }


    this.clearContent = function () { clearContent() }

    var handleClickBack = function (event) {
        event.stopImmediatePropagation();
        clearContent();
        props.renderResultsDetailPOIs(props);
    }

    var handleOnPress = function (event) {
        event.stopImmediatePropagation();
        clearContent();
        props.renderPOIsList(props);
    }

    this.render = function () {
        this.clearContent();
        this.instance.show();
        if (props.isFetchingData) {
            this.container.html('<div>Loading...</div>');
        }
        else
        {
            var _resultHeader = new ResultsHeader(props);
            _resultHeader.hide();
            
            if (props.hasBackButtonResultDetail) {
                this.backButton.show();
                this.backButton.on('click', function (event) {
                    handleClickBack(event)
                });
            } else {
                this.backButton.hide();
            }
            if (this.data && !props.error) {
                var result = searchResults(props.data);
                this.container.html(result);
                var button = this.container.find('div.align-right a');
                button.on('click', function (event) {
                    handleOnPress(event)
                });
            } else {
                this.container.html('<div>No Data</div>');
            }
        }
    }

    var searchResults = function (data) {
        var content =  
                `<div class="item" id="1">
                        <div class="wrapper" style="text-align: left;">
                            <a href="javascript:void(0);" id="1"><h3>${data.NAME}</h3></a>
                            <figure>
                                จำนวนแปลงที่ดิน ${data.TOTAL_PARCEL_COUNT} แปลง
                            </figure>
                            <figure>
                                พื้นที่รวม ${data.TOTAL_AREA_RAI} ตารางวา
                            </figure>
                            <figure>
                                ราคาประเมินรวม  ${data.TOTAL_VAL_AMT} บาท
                            </figure>
                        </div>
                        <div class="wrapper align-right padding-top-0" style="vertical-align: bottom;">
                            <a onclick= "" href="javascript:void(0);" ><i class="fa fa-info-circle" style="font-size: 22px"></i></a>
                        </div>
                    </div>`;
        return content;
    }
}

function ResultsDetailPOIs(props) {
    var container = $('#results-detail ul.results.list > li'),
        instance = $('#results-detail'),
        backButton = $('#results-detail header a');
    this.data = (props.data || []);
    this.instance = instance;
    this.container = container;
    this.backButton = backButton;

    var clearContent = function () {
        container.empty();
        instance.hide();
        backButton.unbind();

        var header = new ResultsHeader(props);
        var pois = new ResultsPOIs(props);
        var detail = new DetailPOIs(props);
        var page = new Pagination();

        header.clearContent();
        pois.clearContent();
        detail.clearContent();
        page.clear(container);
    }

    this.clearContent = function () { clearContent() }

    var handleOnPress = function (event) {
        event.stopImmediatePropagation();
        clearContent();
        var a = $(event.currentTarget);
        var object_id = a.data('objectId'), x = a.data('x'), y = a.data('y');
        var shapes = helpers.transformPointToShape(x, y);
        setState({ x: x, y: y, objectId: object_id, shapes: shapes });
        props.renderResult(props);
    }

    var bindEvent = function (container) {
        var button = container.find('div.align-right a');
        button.on('click', function (event) {
            handleOnPress(event)
        });
    }

    this.render = function () {
        this.clearContent();
        this.instance.show();
        if (props.isFetchingData) {
            this.container.html('<div>Loading...</div>');
        }
        else
        {
            var _resultHeader = new ResultsHeader(props);
            _resultHeader.render();
            this.backButton.hide();

            var pager = new Pagination();

            if (this.data.length > 0) {
                var result = poisDetails(props.data);
                //this.container.html(result);
                pager.render(this.container, props.data, function (data) {
                    return poisDetails(data);
                }, function (container) { bindEvent(container) });
                
            } else {
                this.container.html('<div>No Data</div>');
            }
        }
    }

    var poisDetails = function (data) {
        return data.map(function (v, k) {
            var content =
                `<li>
                    <div class="item" >
                        <div class="wrapper">
                            <a href="javascript:void(0);" id="1"><h3>${v.NAME}</h3></a>
                            <figure>${v.AMPHUR_NAME} ${v.TUMBON_NAME} ${v.CHANGWAT_NAME} ${v.TUMBON_CODE}</figure>
                        </div>
                        <div class="wrapper align-right padding-top-0">
                            <a href="javascript:void(0);" data-object-id="${v.OBJECT_ID}" id="${k}" data-x="${v.X}" data-y="${v.Y}"><i class="fa fa-crosshairs" style="font-size: 22px"></i></a>
                        </div>
                    </div>
                </li>`;
            return content;
        })
    }
}

function ResultsHeader(props) {
    var instance = $('#results-list'),
        container = $('#results-list ul.results.list > li');
    this.data = (props.data || []);
    this.instance = instance;
    this.container = container;

    var clearContent = function () {
        container.empty();
        instance.hide();
    }

    this.clearContent = function () { clearContent() }
    this.hide = function () { this.instance.hide() }

    this.render = function () {
        if (props.isFetchingData) {
            this.instance.hide();
        }
        else
        {
            this.instance.show();
            var result = 
                `<header class="clearfix">
                    <h3 class="pull-left">
                        จำนวนผลลัพธ์ <span id="search-total">${(props.data || []).length}</span> รายการ
                    </h3>
                    <div class="buttons pull-right">
                        <a href="" class="link-icon" style="margin-right: 15px"><i class="fa fa-print" style="margin-right: 5px"></i>Print</a>
                        <a href="" class="link-icon" style="margin-right: 15px"><i class="fa fa-file-pdf-o" style="margin-right: 5px"></i>Pdf</a>
                        <a href="" class="link-icon" style="margin-right: 15px"><i class="fa fa-file-excel-o" style="margin-right: 5px"></i>Excel</a>
                    </div>
                </header>`;
            this.instance.html(result);
        }
    }

    this.hide = function () {
        this.instance.hide();
    }
}

function ResultsPOIs(props) {
    var instance = $('#plots-list'),
        container = $('#plots-list ul.results.list'),
        backButton = $('#plots-list header a'),
        header = $('#plots-list header h3');
    this.data = (props.data || []);
    this.instance = instance;
    this.container = container;
    this.backButton = backButton;

    var clearContent = function () {
        container.empty();
        instance.hide();
        backButton.unbind();

        var page = new Pagination();
        page.clear(container);
    }

    var renderHeader = function (data) {
        header.text(`จำนวนแปลงที่ดิน ${(data || []).length} แปลง`);
    }

    this.clearContent = function () { clearContent() }
    this.renderHeader = function (data) { renderHeader(data) };

    var handleClickBack = function (event) {
        event.stopImmediatePropagation();
        clearContent();
        props.renderResult(props);
    }

    var handleOnPress = function (event) {
        event.stopImmediatePropagation();
        clearContent();
        var a = $(event.currentTarget);
        var object_id = a.data('objectId'), chanod_no = a.data('chanodNo'), land_no = a.data('landNo');
        setState({ objectId: object_id, chanodNo: chanod_no, landNo: land_no });
        props.renderPOIDetail(props);
    }

    var bindEvent = function (container) {
        var button = container.find('div.align-right a');
        button.on('click', function (event) {
            handleOnPress(event)
        });
    }

    this.render = function () {
        if (props.isFetchingData) {
            this.instance.hide();
            this.container.html('<div>Loading...</div>');
        }
        else
        {
            this.instance.show();
            this.renderHeader(props.data)
            var _resultHeader = new ResultsHeader(props);
            _resultHeader.hide();

            var pager = new Pagination();

            if (this.data.length > 0) {
                //var result = pois(props.data);
                pager.render(this.container, props.data, function (data) {
                    return pois(data);
                }, function (container) { bindEvent(container) });

                this.backButton.on('click', function (event) {
                    handleClickBack(event);
                });

            } else {
                this.container.html('<div>No Data</div>');
            }
        }
    }

    var pois = function (data) {
        return data.map(function (v, k) {
            var content =
                `<li>
                            <div class="item" id="1">
                                <div class="wrapper">
                                    <figure>
                                        รูปแปลงที่ดิน: ${v.PARCEL_TYPE} พาดผ่าน: ${v.PASS_THROUGH}
                                    </figure>
                                    <figure>
                                        โฉนดเลขที่: ${v.CHANOD_NO} เลขที่ดิน: ${v.LAND_NO}
                                    </figure>
                                    <figure>
                                        ราคาประเมิน (บาท/ตร.ว.) ${v.VAL_AMT}
                                    </figure>
                                </div>
                                <div class="wrapper align-right padding-top-0" style="vertical-align: bottom;">
                                    <a href="javascript:void(0);" id="btn-plots-list" data-object-id="${v.OBJECT_ID}" data-chanod-no=${v.CHANOD_NO} data-land-no=${v.LAND_NO}><i class="fa fa-info-circle" style="font-size: 22px"></i></a>
                                </div>
                            </div>
                        </li>`;
            return content;
        })
    }
}

function DetailPOIs(props) {
    var instance = $('#results-detail'),
        backButton = $('#results-detail header a'),
        container = $('#results-detail ul.results.list > li');
    this.data = (props.data || []);
    this.instance = instance;
    this.container = container;
    this.backButton = backButton;

    var clearContent = function () {
        container.empty();
        instance.hide();
        backButton.unbind();
    }

    this.clearContent = function () { clearContent() }

    var handleClickBack = function (event) {
        event.stopImmediatePropagation();
        clearContent();
        props.renderPOIsList(props);
    }

    this.render = function () {
        this.instance.show();
        if (props.isFetchingData) {
            this.container.html('<div>Loading...</div>');
        }
        else
        {
            var _resultHeader = new ResultsHeader(props);
            _resultHeader.hide();
            this.backButton.show();
            if (this.data && !props.error) {
                var result = details(props.data);
                this.container.html(result);
                this.backButton.on('click', function (event) {
                    handleClickBack(event)
                })
            } else {
                this.container.html('<div>No Data</div>');
            }
        }
    }

    var details = function (data) {
            var content =
                `<div class="item" id="1">
                                <div class="wrapper">
                                    <h3>
                                        ข้อมูลแปลงที่ดิน
                                    </h3>
                                    <figure>
                                        ประเภทรูปแปลง: ${data.PARCEL_TYPE}
                                    </figure>
                                    <figure>
                                        หมายเลขระวางแผนที่ (1: 50,000): ${data.UTMMAP1}
                                    </figure>
                                    <figure>
                                        หมายเลขระวางแผนที่ (1: 4,000): ${data.UTMMAP3}
                                    </figure>
                                    <figure>
                                        เลขที่ดิน: ${data.LAND_NO}
                                    </figure>
                                    <figure>
                                        รหัสสำนักงานที่ดิน: ${data.BRANCH_CODE}
                                    </figure>
                                    <figure>
                                        รหัสจังหวัด: ${data.CHANGWAT_CODE}
                                    </figure>
                                    <figure>
                                        ชื่อจังหวัด: ${data.CHANGWAT_NAME}
                                    </figure>
                                    <figure>
                                        รหัสอำเภอ: ${data.AMPHUR_CODE}
                                    </figure>
                                    <figure>
                                        ชื่ออำเภอ: ${data.AMPHUR_NAME}
                                    </figure>
                                    <figure>
                                        รหัสตำบล: ${data.TUMBON_CODE}
                                    </figure>
                                    <figure>
                                        ชื่อตำบล: ${data.TUMBON_NAME}
                                    </figure>
                                    <figure>
                                        โฉนดเลขที่: ${data.CHANOD_NO}
                                    </figure>
                                    <figure>
                                        หน้าสำรวจ: ${data.SURVEY_NO}
                                    </figure>
                                    <figure>
                                        ไร่: ${data.NRAI}   งาน: ${data.NNHAN}  วา: ${data.NWAH}  เศษวา: ${data.DREMAIN}
                                    </figure>
                                    <figure>
                                        จำนวนผู้ถือกรรมสิทธิ: ${data.OWNERS}
                                    </figure>
                                    <figure>
                                        การพาดผ่าน: ${data.PASS_THROUGH}
                                    </figure>
                                    <figure>
                                        ราคาประเมิน (บาท/ตร.ว.)  : ${data.VAL_AMT}
                                    </figure>
                                </div>
                            </div>`;
            return content;
    }

}

function DetailPOIsCondominiums(props) {
    var instance = $('#list-condominium'),
        backButton = $('#list-condominium  a'),
        container = $('#list-condominium table body');
    this.data = (props.data || []);
    this.instance = instance;
    this.container = container;
    this.backButton = backButton;

    var clearContent = function () {
        container.empty();
        instance.hide();
        backButton.unbind();
    }

    this.mapInstance = new GISMap();
    this.clearContent = function () { clearContent() }

    var handleClickBack = function (event) {
        event.stopImmediatePropagation();
        clearContent();
        props.renderPOIsList(props);
    }

    this.render = function () {
        this.mapInstance.handleHeight();
        this.instance.show();
        if (props.isFetchingData) {
            this.container.html('<div>Loading...</div>');
        }
        else {
            //var _resultHeader = new ResultsHeader(props);
            //_resultHeader.hide();
            //this.backButton.show();
            this.data = [1, 2, 3, 4];
            if (this.data && !props.error) {
                var result = details(props.data);
                this.container.html(result);
                this.backButton.on('click', function (event) {
                    //handleClickBack(event)
                })
            } else {
                this.container.html('<div>No Data</div>');
            }
        }
    }

    var details = function (data) {
        var html = data.map(function (v, i) {
            var content = `
                    <tr>
                        <td>กมล</td>
                        <td>เขตบางแค จ.กรุงเทพมหานคร</td>
                        <td>2</td>
                        <td>5</td>
                        <td>150</td>
                        <td>9,000-15,000</td>
                        <td>1/01/2559</td>
                    </tr>
                `;
            return content;
        })
        return html;
    }

}

function ResultDetailConstructions() {

}

function ResultDetailConstructionsComparison() {

}

function Pagination() {
    var pager = $('<div id="jquery_pager" style="padding: 10px 0px 4px 0px;"></div>');
    this.pager = pager;

    this.render = function (dataContainer, data, template, bindEvent) {
        this.clear(dataContainer);
        this.pager.pagination({
            dataSource: (data || []),
            pageSize: 10,
            showPrevious: false,
            showNext: false,
            callback: function (data, pagination) {
                var html = template(data);
                dataContainer.html(html);
                bindEvent(dataContainer);
            }
        })
        dataContainer.css({ 'max-height': '480px', 'overflow': 'auto'} );
        this.pager.appendTo(dataContainer.parent());
    }

    var clear = function (dataContainer) {
        var p = dataContainer.parent().find('#jquery_pager');
        if (p.length > 0) {
            p.remove();
        }
    }

    this.clear = function (dataContainer) { clear(dataContainer) }
}

function LoadingPlaceHolder() {

    var currentState = getCurrentState();
    var header = new ResultsHeader(currentState);
    this.render = function (container) {
        destroy();
        container.hide();
        header.hide();
        container.before(placeholder());
    }

    var destroy = function () {
        var placeholderContainer = $('div.text-input__loading');
        if (placeholderContainer.length > 0) {
            placeholderContainer.remove();
        }
    }

    this.destroy = function () { destroy() }

    var placeholder = function () {
        var html = `
            <div class='text-input__loading'>
              <div class='text-input__loading--line'></div>
              <div class='text-input__loading--line'></div>
              <div class='text-input__loading--line'></div>
              <div class='text-input__loading--line'></div>
              <div class='text-input__loading--line'></div>
              <div class='text-input__loading--line'></div>
              <div class='text-input__loading--line'></div>
              <div class='text-input__loading--line'></div>
              <div class='text-input__loading--line'></div>
              <div class='text-input__loading--line'></div>
            </div>`;
        return html;
    }
}

function GISMap() {
    var instance = $('#tdmap');
    var defaultHeight = instance.css('height').replace('px', '');

    this.instance = instance;

    if (this.instance.data('height') == undefined) {
        this.instance.data('height', defaultHeight);
    }

    this.handleHeight = function (height = 300) {
        this.instance.css({ 'height': height + 'px' });
    }

    this.restoreHeight = function () {
        var height = this.instance.data('height');
        this.instance.css({ 'height': height + 'px' });
    }
}


