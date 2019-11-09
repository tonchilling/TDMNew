var LocationType = '1'



$(function () {

   

   /* CMPLTADMIN_SETTINGS.windowBasedLayout();
    CMPLTADMIN_SETTINGS.mainMenu();
    CMPLTADMIN_SETTINGS.mainmenuCollapsed();
    CMPLTADMIN_SETTINGS.mainmenuScroll();
    CMPLTADMIN_SETTINGS.sectionBoxActions();
    CMPLTADMIN_SETTINGS.chatAPI();
    CMPLTADMIN_SETTINGS.chatApiScroll();
    CMPLTADMIN_SETTINGS.chatApiWindow();
    CMPLTADMIN_SETTINGS.breadcrumbAutoHidden();*/
    searchForm.initComp();

});

$(document).on("click", "#rdRegion", function () {
    DisplaySection2SearchRegionCluster(1)
});

$(document).on("click", "#rdCluster", function () {
    DisplaySection2SearchRegionCluster(2)

});







/// tabid=1 region
/// tabid=2 cluster
function DisplaySection2SearchRegionCluster(tabid) {
    $('#ddlRegion').empty();
    if (tabid == 1) // region
    {
        LocationType = '1';
        $.each(regionObj.data, function (index, obj) {
            $("#ddlRegion").append("<option value='" + obj.value + "'>" + obj.name + "</option>");
        });

        // $('.pnlRegion').visible().css("position", "relative");
        //  $('.pnlCluster').invisible().css("position", "absolute");

    } else ///// region
    {
        LocationType = '2';

        LoadCluster();
        //$('.pnlRegion').invisible().css("position", "absolute");
        //$('.pnlCluster').visible().css("position", "relative");

    }
}



function LoadCluster() {
    $("#ddlRegion").empty();

    $("#ddlRegion").append("<option value=''>เลือกครัสเตอร์</option>");
    $.ajax({
        url: rootUrl + "/api/Address/GetCluster",
        type: "POST",
        //  data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            if (data != null) {
                if (data != null && data.length > 0) {

                    $.each(data, function (index, obj) {
                        $("#ddlRegion").append("<option value='" + obj.Value + "'>" + obj.Name + "</option>");
                    });
                }
            }

            if (regionSelectedId != '') {
                $("#ddlRegion").val(regionSelectedId)
            }
        }
    });

}





var searchForm = {

    initComp: function (eleName) {
        searchForm.setupSearchForm();
        setTimeout(function () {
  

        }, 5000);

    },
    ddlProvince: $("#ddlProvince"),
    ddlDistrict: $("#ddlDistrict"),
    ddlSubDistrict: $("#ddlSubdistrict"),
    clearDropDown: function (eleName) {
        var name = '#' + eleName;
        $(name).empty();
        $(name).append("<option value=''>-</option>");
        $(name).append("<option value='999999'>ทั้งหมด</option>");
    },
    setupSearchForm: function () {


        searchForm.clearDropDown('ddlDistrict');
        $('#ddlDistrict').prop('disabled', 'disabled');

        searchForm.clearDropDown('ddlSubdistrict');
        $('#ddlSubdistrict').prop('disabled', 'disabled');

        $('#bttSearch').click(function () {
            searchForm.search();
        });

        $('#bttClear').click(function () {
            document.getElementById('ddlProvince').selectedIndex = 0;
            document.getElementById('ddlDistrict').selectedIndex = 0;
            document.getElementById('ddlSubdistrict').selectedIndex = 0;

            $('#ddlDistrict').prop('disabled', 'disabled');
            $('#ddlSubdistrict').prop('disabled', 'disabled');


        });


        $('#ddlProvince').empty();
        $('#ddlProvince').append("<option value='999999'>ทั้งหมด</option>");

        LoadAddress();



        $('#ddlRegion').change(function (event) {
            selectCode = $(this).val();
            selectLocationLevel = 0;
            $('#ddlProvince').empty();
            $('#ddlProvince1').empty();
            $('#ddlDistrict').empty();
            $('#ddlSubdistrict').empty();

            $('#ddlProvince').append("<option value=''>เลือกจังหวัด</option>");
            $('#ddlDistrict').append("<option value=''>เลือกอำเภอ</option>");
            $('#ddlSubdistrict').append("<option value=''>เลือกตำบล</option>");


            ReLoadAddress(selectCode);
        });
        $('#ddlProvince').change(function (event) {
            var selectCode = $("#ddlProvince").val();

            $('#ddlDistrict').empty();
            $('#ddlSubdistrict').empty();
            $('#ddlSubdistrict').append("<option value=''>เลือกตำบล</option>");


            var proviceOption1 = $("#ddlProvince option:not([value='" + selectCode + "']):not([value='999999'])").clone();
            $("#ddlProvince1").empty();
            $("#ddlProvince1").append(proviceOption1);
            $("#ddlProvince1").selectpicker('refresh')


            if (selectCode == '') {
                selectLocationLevel = 1;
                selectCode = $('#ddlRegion').val();
                $('#ddlDistrict').append("<option value=''>เลือกอำเภอ</option>");


            }

            else {
                // $("#ddlProvince").val(selectId)

                selectLocationLevel = 2;


            }

            ReLoadAddress(selectCode);
        });
        $('#ddlDistrict').change(function (event) {
            selectCode = $(this).val();

            $('#ddlSubdistrict').empty();
            if (selectCode == '') {
                selectLocationLevel = 2;
                selectCode = $("#ddlProvince").val();
                $('#ddlSubdistrict').append("<option value=''>เลือกตำบล</option>");

            }

            else {

                selectLocationLevel = 3;

            }

            ReLoadAddress(selectCode);
        });
        $('#ddlSubdistrict').change(function (event) {

        });



      
        $('#ddlRegion').trigger("change");

    },
    switchMode: function (mode) {
        if (_mapCurrModule == mode) {
            return;
        } else {
            if (mode < 1 || mode > 2) {
                mode = 1;
            }
            _mapCurrModule = mode;


        }


    },
    search: function () {

        var sectionType = '';
        var code = '';


        waitingDialog.show('Waiting for loading data', { dialogSize: 'md', progressType: 'success' });

        if ($('#ddlSubdistrict').val() != "" && $("#ddlSubdistrict").val() != '999999') {
            sectionType = '4';
            code = $('#ddlSubdistrict').val();
        }
        else if ($("#ddlDistrict").val() != '' && $("#ddlDistrict").val() != '999999') {
            sectionType = '3';
            code = $('#ddlDistrict').val();
        }
        else if ($("#ddlProvince").val() != '' && $("#ddlProvince").val() != '999999') {
            sectionType = '2';
            code = $('#ddlProvince').val();
        }
        else if ($("#ddlRegion ").val() != '') {
            sectionType = '1';
            code = $('#ddlRegion').val();
        } else {
            sectionType = '0';

        }


        var objSearch = {};


        objSearch = {
            SectionType: sectionType,
            code: code,
            Month: '',
            Year: $('#ddlYear').val()

        };


        $.ajax({
            url: rootUrl + "/api/PriceSys/GetRegisterLand",
            type: "POST",
            data: JSON.stringify(objSearch),
            dataType: "json",
            contentType: 'application/json',
            success: function (data) {

                var month = [];
                var newLandRegister = [];
                var LandRegister = [];
                if (data != null) {

                    setTimeout(function () {
                        $('.lbNewRegLand').text(data.summaryData.ParcelNewRegister.toLocaleString());
                        $('.lbRegLand').text(data.summaryData.ParcelRegister.toLocaleString());
                        $('.lbNewMonthRegLand').text(data.summaryData.ParcelMonthNewRegister.toLocaleString());
                        $('.lbMonthRegLand').text(data.summaryData.ParcelMonthRegister.toLocaleString());
                    }
        , 400);

                    var month = data.summaryByMonthData.map(x => x.MonthName);
                    var newLandRegister = data.summaryByMonthData.map(x => x.ParcelNewRegister);
                    var LandRegister = data.summaryByMonthData.map(x => x.ParcelRegister);

                    LoadGraph1Display(month, newLandRegister, LandRegister);
                    LoadGraph2Display(month, newLandRegister, LandRegister);
                }

                setTimeout(function () {
                    waitingDialog.hide();
                }
                      , 1000);
            }
        });
    }
}


function LoadAddress() {

    //  $('#ddlProvince').empty();
    //$('#ddlDistrict').empty();
    //$('#ddlSubdistrict').empty();


    $('#ddlRegion').prop('disabled', true);
    $("#ddlProvince").prop('disabled', true);
    $('#ddlDistrict').prop('disabled', true);
    $('#ddlSubdistrict').prop('disabled', true);
    $.get(mapApi.getServerPath() + "/api/Address/GetAddressList", function (addressList) {

        SectionProvince = addressList.ProvinceList;
        SectionAmphure = addressList.AmphoeList;
        SectionTumbol = addressList.TambolList;


        $('#ddlRegion').prop('disabled', false);
        $("#ddlProvince").prop('disabled', false);
        $('#ddlDistrict').prop('disabled', false);
        $('#ddlSubdistrict').prop('disabled', false);
    });
}

function ReLoadAddress(selectCode) {

    var filterData = {};

    if (selectLocationLevel == '4') {

        filterData = SectionTumbol.filter(t => t.SUB_C == selectCode);
        filterData = filterData[0];

        if (LocationType == '2')
            LoadProvice(filterData.ClusterCode, filterData.PRO_C);
        else
            LoadProvice(filterData.RegionCode != null ? filterData.RegionCode : null, filterData.PRO_C);


        $("#ddlRegion").val(filterData.RegionCode);
        LoadDistinct(filterData.PRO_C, filterData.DIS_C);
        LoadSubDistinct(filterData.DIS_C, filterData.SUB_C);
    } else if (selectLocationLevel == '3') {

        filterData = SectionAmphure.filter(t => t.DIS_C == selectCode);
        filterData = filterData[0];

        if (LocationType == '2')
            LoadProvice(filterData.ClusterCode, filterData.PRO_C);
        else
            LoadProvice(filterData.RegionCode, filterData.PRO_C);

        $("#ddlRegion").val(filterData.RegionCode);
        LoadDistinct(filterData.PRO_C, filterData.DIS_C);
        LoadSubDistinct(filterData.DIS_C);
    } else if (selectLocationLevel == '2') {

        filterData = SectionProvince.filter(t => t.PRO_C == selectCode);

        filterData = filterData[0];

        if (LocationType == '2')
            LoadProvice(filterData.ClusterCode, filterData.PRO_C);
        else {

            $("#ddlRegion").val(filterData.RegionCode);
            LoadProvice(filterData.RegionCode, filterData.PRO_C);

        }
        LoadDistinct(filterData.PRO_C);
        LoadSubDistinct(null);
    } else if (selectLocationLevel == '1') {

        LoadProvice(selectCode, '');
        LoadDistinct(null);
        LoadSubDistinct(null);
    } else if (selectLocationLevel == '0') {
        LoadProvice(selectCode, '');
        LoadDistinct(null);
        LoadSubDistinct(null);
    }

}


function LoadProvice(regionId, provincecode) {

    $('#ddlProvince').empty();
    $('#ddlProvince').append("<option value=''>เลือกจังหวัด</option>");
    $('#ddlProvince').prop('disabled', false);

    if (SectionProvince != null && SectionProvince.length > 0) {
        $('#ddlProvince').empty();
        $('#ddlProvince').append("<option value=''>เลือกจังหวัด</option>");

        /// Load by Region Code
        if (LocationType == "1") {
            $.each(SectionProvince.filter(p => p.RegionCode == regionId), function (index, province) {
                $("#ddlProvince").append("<option value='" + province.PRO_C + "'>" + province.NAME_T + "</option>");
            });

            var proviceOption1 = $("#ddlProvince option").clone();
            $("#ddlProvince1").empty();

            $("#ddlProvince1").append(proviceOption1);

            $("#ddlProvince1").selectpicker('refresh');
        }


        /// Load by Cluster Code
        else if (LocationType == "2") {
            $.each(SectionProvince.filter(p => p.ClusterCode == regionId), function (index, province) {
                $("#ddlProvince").append("<option value='" + province.PRO_C + "'>" + province.NAME_T + "</option>");
            });
        }


        if (provincecode != null)
            $('#ddlProvince').val(provincecode);

        var proviceOption1 = $("#ddlProvince option").clone();


        $("#ddlProvince1").empty();
        $("#ddlProvince1").append(proviceOption1);
        $("#ddlProvince1").selectpicker('refresh')


        var proviceOption2 = $("#ddlProvince option:not([value='" + provincecode + "']):not([value='999999'])").clone();
        $("#ddlProvince2").empty();
        $("#ddlProvince2").append(proviceOption2);
        $("#ddlProvince2").selectpicker('refresh')


    }
}


function LoadDistinct(provinceid, distinctid) {

    $('#ddlDistrict').empty();
    $('#ddlDistrict').append("<option value=''>เลือกอำเภอ</option>");
    $('#ddlDistrict').prop('disabled', false);

    if (SectionAmphure != null && SectionAmphure.length > 0) {



        $.each(SectionAmphure.filter(p => p.PRO_C == provinceid), function (index, district) {
            $("#ddlDistrict").append("<option value='" + district.DIS_C + "'>" + district.NAME_T + "</option>");
        });

        if (distinctid != null && distinctid != '')
            $('#ddlDistrict').val(distinctid);

    }
}


function LoadSubDistinct(districtId, subdistinctid) {

    $('#ddlSubdistrict').empty();
    $('#ddlSubdistrict').append("<option value=''>เลือกตำบล</option>");
    $('#ddlSubdistrict').prop('disabled', false);

    if (SectionTumbol != null && SectionTumbol.length > 0) {



        $.each(SectionTumbol.filter(p => p.DIS_C == districtId), function (index, subDistricts) {
            $("#ddlSubdistrict").append("<option value='" + subDistricts.SUB_C + "'>" + subDistricts.NAME_T + "</option>");
        });

        if (subdistinctid != null && subdistinctid != "")
            $('#ddlSubdistrict').val(subdistinctid);

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

