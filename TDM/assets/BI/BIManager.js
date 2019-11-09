


var Database = [];
var Tables = [];
var Columns = [];
var DataResult = [];
var currentUrl = '/api/DBMgr/';
var chartMgrUrl = '/api/ChartMgr/';
var tblResult;
var selX, selY, selX2, selY2;
var keepResult = {
    
    Charts: []

};


var editChart;

var keepChart;


var resultList;


var mapApi = {
    getServerPath: function () {
        return rootUrl;
        //return '';
    }
}



String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};



var DbManager = {
    InitialData: function () {

        tblResult = $('.tblResult').DataTable();
        setTimeout(function () { waitingDialog.hide(); }, 1500);
    },
    GetDB: function (server, user, password, callback) {
        var data = {};
        data.Server = server;
        data.User = user;
        data.Password = password;
        $.post(mapApi.getServerPath() +currentUrl + "/GetDatabaseList", data, function (data) {
            callback(data);
        }).fail(function (error) {
            alert("Error > " + error.responseJSON.ExceptionMessage);

            waitingDialog.hide();
        });;
    },
    GetDBPermission: function (callback) {
        var data = {};
        $.post(mapApi.getServerPath() + currentUrl + "/GetDatabaseList", data, function (data) {
            callback(data);
        }).fail(function (error) {
            alert("Error > " + error.responseJSON.ExceptionMessage);

            waitingDialog.hide();
        });;
    },
    GetQuery: function (server, user, password,query, callback) {
        var data = {};
        data.Server = server;
        data.User = user;
        data.Password = password;
        data.Query = query;
        $.post(mapApi.getServerPath() +currentUrl + "/QueryData", data, function (data) {
            callback(data);
        }).fail(function (error) {
            alert("Error > " + error.responseJSON.ExceptionMessage);

            waitingDialog.hide();
        });
    }


}


$(document).ready(function () {




  /*  CMPLTADMIN_SETTINGS.windowBasedLayout();
    CMPLTADMIN_SETTINGS.mainMenu();
    CMPLTADMIN_SETTINGS.mainmenuCollapsed();
    CMPLTADMIN_SETTINGS.mainmenuScroll();
    CMPLTADMIN_SETTINGS.sectionBoxActions();
    
    CMPLTADMIN_SETTINGS.chatAPI();
    CMPLTADMIN_SETTINGS.chatApiScroll();
    CMPLTADMIN_SETTINGS.chatApiWindow();
    CMPLTADMIN_SETTINGS.breadcrumbAutoHidden();*/

    LoadTemplateList();
    SortedTable();
});



function SortedTable() {
    // Sortable rows
    $('.sorted_table tbody').sortable({
        itemPath: '> tbody',
        itemSelector: 'tr',
        handle: '',
        cancel: '',

    });

  

}


$(document).on("click", ".rounded-list > li", function () {
   // $this.next().find('ol').toggleClass('show');
    $this.find('ol').slideToggle(350);
    return false;
 //   $(this).nextAll(".rounded-list:first").slideToggle();
})


$(document).on("click", ".btnConnect", function () {

    waitingDialog.show('Waiting for connecting', { dialogSize: 'md', progressType: 'success' });

    DbManager.GetDB($('.txtServer').val(), $('.txtUserName').val(), $('.txtPassword').val(), function (data) {

        Database = data;
        DisplayDatabase(Database);
        waitingDialog.hide();
    });

    return false;
});

$(document).on("click", ".btnSelectColumn", function (e) {

    var query = $('#txtQuery').val();

    if (query == '') {
        query = 'select ' + $(this).attr("column") + ' from ' + $(this).attr("database") + '.' + $(this).attr("table")
        $('#txtQuery').val(query);

    } else {
        query = query.splice(query.indexOf('from'), 0, ","+$(this).attr("column")+" ");

        $('#txtQuery').val(query)
    }

    return false;
    
});
$(document).on("click", ".toggle", function (e) {
    e.preventDefault();

    var $this = $(this);

    if ($this.next().hasClass('show')) {
        $this.next().removeClass('show');
        $this.next().slideUp(350);
    } else {
        $this.parent().parent().find('li .inner').removeClass('show');
        $this.parent().parent().find('li .inner').slideUp(350);
        $this.next().toggleClass('show');
        $this.next().slideToggle(350);
    }



    $("li a.toggle").not(this).removeClass('expanded'); //if clicking off from this toggle, will collapse all other list items

    $this.parents('.inner').siblings('a.toggle').addClass("expanded"); // ensures all ancestors of this class will also remain expanded

    $this.toggleClass("expanded"); // to expand or collapse arrow on click (toggle)
    return false;

});




$(document).on("change", "#ddlSelectGraph", function () {

    var menuDisplay = "";
    var yLable = "yAxis";
    var xLabel = "xAxis";
    $('.divSelected').addClass("hidden");
    switch ($(this).val()) {
        case "1":
            menuDisplay = "Bar Chart";
            break;

            break;
        case "3":
            menuDisplay = "Pie Chart";
            yLable = "Value";
            xLabel = "Lengend";
            break;
        case '4':
            menuDisplay = "Card Display";
            yLable = "Display";
            xLabel = "Value";
            break;

    }
    $('.divSelected1').removeClass("hidden");

    setTimeout(
        function () {
            $('.lblChartBar').text(menuDisplay);
            $("#lblxAxis").text(xLabel);
            $("#lblyAxis").text(yLable);
        }, 1000
    );
});



$(document).on("click", ".btnQuery", function (e) {
    waitingDialog.show('Waiting for query', { dialogSize: 'md', progressType: 'success' });
    DbManager.GetQuery("",
        "",
        "",
                 $('.txtQuery').val(),function (data) {

                     DataResult = data;
                     DisplayResult(DataResult);
                     waitingDialog.hide()

        });
    return false;

});


$(document).on("click", ".btnPreview", function (e) {
    // $('.divPreviewBody')
    // document.getElementById('divPreviewBody')

    waitingDialog.show('Waiting for query', { dialogSize: 'md', progressType: 'success' });


    var xAxisData = getColumnByKey(DataResult, $("#ddlxAxis").val());
    var yAxisData = getColumnByKey(DataResult, $("#ddlyAxis").val());

    var xAxisData2 = $("#ddlxAxis2").val()!="" ? getColumnByKey(DataResult, $("#ddlxAxis2").val()):"";
    var yAxisData2 = $("#ddlyAxis2").val() != "" ? getColumnByKey(DataResult, $("#ddlyAxis2").val()) : "";


    if ($("#ddlSelectGraph option:selected").val() == '4') {

        $("#divPreviewBody").empty();
        var html = "";
        for (var i = 0; i < xAxisData.length; i++) {
            html += ChartType[3].Option.ConvertToHTML(yAxisData[i], xAxisData[i],null, $("#ddlWidth option:selected").val());

        }
        keepChart = ChartType[3].Option;

        keepChart.xAxisData = xAxisData;
        keepChart.yAxisData = yAxisData;
        keepChart.xAxisData2 = xAxisData2;
        keepChart.yAxisData2 = yAxisData2;
        $("#divPreviewBody").append(html);
        setTimeout(function () {

            waitingDialog.hide()

        }, 1000);

    }
    else {

        switch ($("#ddlSelectGraph option:selected").val()) {

            case '1':

                if (typeof yAxisData[0] == 'number') {
                    keepChart = ChartType[0].Option;
                    keepChart.xAxis[0].data = xAxisData;
                    keepChart.series[0].data = yAxisData;
                    keepChart.series[0].name = $("#txtyAxis").val();
                    if ($("#ddlyAxis2").val() != "") {
                        keepChart.series[1].name = $("#txtyAxis2").val();
                        keepChart.series[1].data = yAxisData2;
                    } else {
                    keepChart.series[1].name = "";
                    keepChart.series[1].data = null;
                }
                    

                } else {
                    keepChart = ChartType[1].Option;
                    keepChart.yAxis[0].data = yAxisData;
                    keepChart.series[0].data = xAxisData;
                    keepChart.series[0].name = $("#txtxAxis").val();;
                    if ($("#ddlxAxis2").val() != "") {
                        keepChart.series[1].name = $("#txtxAxis2").val();;
                        keepChart.series[1].data = xAxisData2;
                    } else {
                        keepChart.series[1].name = "";
                        keepChart.series[1].data = null;
                    }

                }
                break;
            case '3':

                var series = [];

                for (var i = 0; i < xAxisData.length; i++) {

                    series.push({ value: yAxisData[i], name: xAxisData[i] });
                }



                keepChart = ChartType[2].Option;
                keepChart.legend.data = xAxisData;
                keepChart.series[0].data = series;
                break;
        }

        keepChart.xAxisData = xAxisData;
        keepChart.yAxisData = yAxisData;

        keepChart.xAxisData2 = xAxisData2;
        keepChart.yAxisData2 = yAxisData2;
        keepChart.GraphID = $("#ddlSelectGraph option:selected").val();
        keepChart.title.text = $("#txtTitle").val();



        LoadChart(keepChart, document.getElementById('divPreviewBody'))
        setTimeout(function () {

            waitingDialog.hide()

        }, 1000);

    }
    return false;
});

function GetGraphText(graphid)
{
    var text = "";
    switch (graphid) {
        case "1": text = "Bar Chart"; break;
        case "3": text = "Pie Chart"; break;
        case "4": text = "Card Display"; break;

    }

    return text;
}



$(document).on("click", ".btnDelete", function (e) {
    var data = {
        TemplateID: $(this).attr('data')
    };
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

                
                $.ajax({
                    url: mapApi.getServerPath() + chartMgrUrl +"/DeleteTemplate",
                    type: "POST",
                    data: JSON.stringify(data),
                    dataType: "json",
                    contentType: 'application/json',
                    success: function () {
                        swal("Save", "Delete data complete!", "success");

                        setTimeout(function () {

                            $("#frmMain").submit();

                        }, 1000);
                       
                    }
                });

            }
        });

    return false;
});

$(document).on("click", ".btnEdit", function (e) {
    $.get(mapApi.getServerPath() + chartMgrUrl + "/GetGraphList", { TemplateID: $(this).attr('data') }, function (data) {

        if (data != null) {

            keepResult = data;
            $('#txtTemplateName').val(data.Name)
            $('#ddlTemplateType').val(data.TemplateType)
         
            if (data.Charts.length > 0) {
                $.each(keepResult.Charts, function (index, chartData) {
                    divChartID = 'divChart' + index;
                    html = '';
                  //  chartData.xAxisData = chartData.xAxisData);
                  //  chartData.yAxisData = JSON.parse(chartData.yAxisData);
                });


              
               DisplayListForEdit (keepResult);

               
            }

            /*$('.txtServer').val(data.Server),
                $('.txtUserName').val(data.User),
                $('.txtPassword').val(),
                $('.txtQuery').val()*/

        }
    });
    return false;

});



$(document).on("click", ".btnSave", function (e) {

    var no = 0;
    var sortNo = 1;

    waitingDialog.show('Waiting for query', { dialogSize: 'md', progressType: 'success' });

    if (keepChart.xAxisData != null && keepChart.yAxisData != null) {

        if (editChart == null) {

          //  keepResult.TemplateID = '';
            keepResult.Name = $("#txtTemplateName").val();
            keepResult.TemplateType = $("#ddlTemplateType").val();
            no = keepResult.Charts == null ? 1 : keepResult.Charts.length + 1;
            keepResult.Charts.push({
                No: no,
                GraphID: $("#ddlSelectGraph option:selected").val(),
                Title: $("#txtTitle").val(),
                Width: $("#ddlWidth option:selected").val(),
                x: $("#ddlxAxis option:selected").val(),
                x2: $("#ddlxAxis2 option:selected").val(),
                y: $("#ddlyAxis option:selected").val(),
                y2: $("#ddlyAxis2 option:selected").val(),
                Desc: $("#ddlSelectGraph option:selected").text(),
                xCaption: $("#txtxAxis").val(),
                x2Caption: $("#txtxAxis2").val(),
                yCaption: $("#txtyAxis").val(),
                y2Caption: $("#txtyAxis2").val(),
                Connection: JSON.stringify({ Server: "", User: "", Password: "", Query: $("#txtQuery").val() }),
                ChartOptions: JSON.stringify(keepChart),
                xAxisData: JSON.stringify(keepChart.xAxisData),
                yAxisData: JSON.stringify(keepChart.yAxisData),
                xAxisData2: JSON.stringify(keepChart.xAxisData2),
                yAxisData2: JSON.stringify(keepChart.yAxisData2)
            });
        } else {

            $.each(keepResult.Charts, function (x, data) {

                if (data.No == editChart[0].No) {
                    data.GraphID = $("#ddlSelectGraph option:selected").val();
                    data.Title = $("#txtTitle").val();
                    data.Width = $("#ddlWidth option:selected").val();
                    data.x = $("#ddlxAxis option:selected").val();
                    data.x2 = $("#ddlxAxis2 option:selected").val();
                    data.y = $("#ddlyAxis option:selected").val();
                    data.y2 = $("#ddlyAxis2 option:selected").val();
                    data.Desc = $("#ddlSelectGraph option:selected").text();
                    data.Connection = JSON.stringify({ Server: "", User: "", Password: "", Query: $("#txtQuery").val() });
                    // data.Connection = { Server: $("#txtServer").val(), User: $("#txtUserName").val(), Password: $("#txtPassword").val(), Query: $("#txtQuery").val() };
                    data.ChartOptions = JSON.stringify(keepChart);
                    data.xCaption= $("#txtxAxis").val(),
                        data.x2Caption = $("#txtxAxis2").val(),
                        data.yCaption =$("#txtyAxis").val(),
                        data.y2Caption = $("#txtyAxis2").val();
                    data.xAxisData = JSON.stringify(keepChart.xAxisData);
                    data.yAxisData = JSON.stringify(keepChart.yAxisData);
                    data.xAxisData2 = JSON.stringify(keepChart.xAxisData2);
                    data.yAxisData2 = JSON.stringify(keepChart.yAxisData2);
                   
                }

            });


        }

        DisplayListForEdit(keepResult);

        editChart = null;
        ClearData();
    } else {
alert('Please preview')
    }
    
    setTimeout(function () {

        waitingDialog.hide()

    }, 1000);


    return false;
  
});

function ClearData() {
    $("#txtTitle").val('');

    $("#divPreviewBody").empty();
}



function LoadTemplateList() {
    $(".divAllList").empty();
    $(".lblTotal").empty();
    $(".lblTotal").val("0");
   var  html = "";
    $.get(mapApi.getServerPath() + chartMgrUrl + "/LoadAllList", function (data) {

        $.each(data, function (index, item) {
            html += ' <li> <a href="#" class="btnEdit" data="' + item.TemplateID + '"><i class="fa fa-bar-chart icon-success"></i> ' + item.Name + ' [' + item.CreateDate + ']</a>  <i class="fa fa-trash text-danger btnDelete" data="' + item.TemplateID + '"></i> </li>';
        });

        $(".divAllList").append(html);
        $(".lblTotal").text(data.length);
    });
  
  //  
}

$(document).on("click", ".btnSaveTemplate", function (e) {

    waitingDialog.show('Waiting for saving template', { dialogSize: 'md', progressType: 'success' });
    keepResult.Name = $("#txtTemplateName").val();
    keepResult.TemplateType = $("#ddlTemplateType").val();
    var SortNo = 1;
  


    $('.tblResult > tbody  > tr').each(function () {
        editChart = keepResult.Charts.filter(d => d.No == $(this).attr('data'));
        editChart[0].SortNo = SortNo;
        SortNo++;
    });



    $.post(mapApi.getServerPath() +chartMgrUrl + "/SaveTempate", keepResult, function (data) {

        swal("Save", "Save data complete!", "success");
        LoadTemplateList();
        setTimeout(function () {

            waitingDialog.hide()

        }, 1000);
    }).done(function () {
        setTimeout(function () {

            waitingDialog.hide()

        }, 1000);
    })
        .fail(function () {
            swal("Save", "Invaid saving data!", "warning");
            waitingDialog.hide()
        })
        .always(function () {
           
        });

    return false;
});





$(document).on("click", ".btnPreviewGraph", function (e) {
   // data.filter(d => d.age > 37);

    editChart = keepResult.Charts.filter(d => d.No == $(this).attr('data'));
    var connection = JSON.parse(editChart[0].Connection);
    $("#ddlSelectGraph").val(editChart[0].GraphID);
    $("#txtQuery").val(connection.Query);



    selX = editChart[0].x;
    selY = editChart[0].y;
    selX2 = editChart[0].x2;
    selY2 = editChart[0].y2;
   // $("#ddlxAxis").val(editChart[0].x);
   // $("#ddlyAxis").val(editChart[0].y);

    DbManager.GetQuery("",
        "",
        "",
        $('.txtQuery').val(), function (data) {

            DataResult = data;
            DisplayResult(DataResult);
            waitingDialog.hide()

       
  

    $("#ddlWidth").val(editChart[0].Width);

            $("#txtTitle").val(editChart[0].Title);
            $("#txtyAxis").val(editChart[0].yCaption);
            $("#txtxAxis").val(editChart[0].xCaption);
            $("#txtyAxis2").val(editChart[0].y2Caption);
            $("#txtxAxis2").val(editChart[0].x2Caption);
            



    var xAxisData = JSON.parse(editChart[0].xAxisData);
    var yAxisData = JSON.parse(editChart[0].yAxisData);
            var xAxisData2 = JSON.parse(editChart[0].xAxisData2);
            var yAxisData2 = JSON.parse(editChart[0].yAxisData2);
    $("#ddlSelectGraph").trigger('change');

    if ($("#ddlSelectGraph option:selected").val() == '4') {

         //xAxisData = JSON.parse(editChart[0].xAxisData);
        // yAxisData = JSON.parse(editChart[0].yAxisData);

     

        keepChart = ChartType[3].Option;
        $("#divPreviewBody").empty();
        var html = "";
        for (var i = 0; i < xAxisData.length; i++) {
            html += ChartType[3].Option.ConvertToHTML(yAxisData[i], xAxisData[i],null, $("#ddlWidth option:selected").val());

        }


        $("#divPreviewBody").append(html);
        setTimeout(function () {
            setTimeout(function () {
                $("#lblxAxis").text('Display');
                $("#lblyAxis").text('Value');
            }, 400);
            waitingDialog.hide()

        }, 1000);

        DbManager.GetQuery("",
            "",
            "",
            $('.txtQuery').val(), function (data) {

                DataResult = data;
                DisplayResult(DataResult);
                waitingDialog.hide()

            });


    }
    else {


        switch ($("#ddlSelectGraph option:selected").val()) {

            case '1':

                if (typeof yAxisData[0] == 'number') {
                    keepChart = ChartType[0].Option;
                    keepChart.xAxis[0].data = xAxisData;
                    keepChart.series[0].data = yAxisData;
                    keepChart.series[0].name = $("#txtyAxis").val();
                    if ($("#ddlyAxis2").val() != "") {
                        keepChart.series[1].name = $("#txtyAxis2").val();
                        keepChart.series[1].data = yAxisData2;
                    } else {
                        keepChart.series[1].name = "";
                        keepChart.series[1].data = null;
                    }
                

                } else {
                    keepChart = ChartType[1].Option;
                    keepChart.yAxis[0].data = yAxisData;
                    keepChart.series[0].data = xAxisData;
                    keepChart.series[0].name = $("#txtxAxis").val();;
                    if ($("#ddlxAxis2").val() != "") {
                        keepChart.series[1].name = $("#txtxAxis2").val();;
                        keepChart.series[1].data = xAxisData2;
                    } else {
                        keepChart.series[1].name = "";
                        keepChart.series[1].data = null;
                    }

                }

                setTimeout(function () {
                    $("#lblxAxis").text('xAxis');
                    $("#lblyAxis").text('yAxis');
                }, 400);

                break;
            case '3':

                setTimeout(function () {
                    $("#lblxAxis").text('Lengend');
                    $("#lblyAxis").text('Value');
                }, 400);

                var series = [];

                for (var i = 0; i < xAxisData.length; i++) {

                    series.push({ value: yAxisData[i], name: xAxisData[i] });
                }


                keepChart = ChartType[2].Option;
                keepChart.legend.data = xAxisData;
                keepChart.series[0].data = series;
                break;

            case '4':
                setTimeout(function () {
                    $("#lblxAxis").text('Title');
                    $("#lblyAxis").text('Value');
                }, 400);
                break;



                DbManager.GetQuery("",
                    "",
                    "",
                    $('.txtQuery').val(), function (data) {

                        DataResult = data;
                        DisplayResult(DataResult);
                        waitingDialog.hide()

                    });
        }




        $('#divPreviewBody').empty();

        // keepChart = JSON.parse(editChart[0].ChartOptions);
        LoadChart(keepChart, document.getElementById('divPreviewBody'))
            }

        });

    return false;
});





function DisplayResult(dataResult)
{
    var html = "";
    var columns = [
        { "title": "One" },
        { "title": "Two" },
        { "title": "Three" }
    ];

    columns = [];
    var columnsIn = dataResult[0];
    for (var key in columnsIn) {
        columns.push({ "data": key, "title": key});
    } 


    
    
    $("#ddlxAxis").empty();
    $("#ddlyAxis").empty();
    $("#ddlxAxis2").empty();
    $("#ddlyAxis2").empty();
    $("#ddlxAxis").append("<option value=''>กรุณาเลือก</option>");
    $("#ddlyAxis").append("<option value=''>กรุณาเลือก</option>");
    $("#ddlxAxis2").append("<option value=''>กรุณาเลือก</option>");
    $("#ddlyAxis2").append("<option value=''>กรุณาเลือก</option>");

    for (var key in columnsIn) {
        $("#ddlxAxis").append("<option value='" + key + "'>" + key + "</option>");
        $("#ddlxAxis2").append("<option value='" + key + "'>" + key + "</option>");
        $("#ddlyAxis").append("<option value='" + key + "'>" + key + "</option>");
        $("#ddlyAxis2").append("<option value='" + key + "'>" + key + "</option>");
    }

    $("#ddlxAxis").val(selX);
    $("#ddlyAxis").val(selY);
    $("#ddlxAxis2").val(selX2);
    $("#ddlyAxis2").val(selY2);

    $('.divResult').empty();



    if (columns != null && columns.length > 0) {
        html += '<table class="table sorted_table  table-striped"   id = "EstimateChartTable0">';
        html += '<thead>';
        html += '<tr class="bg-info" >';


        $.each(columns, function (index, item) {
            html += ' <th  scope="col">' + item.title + '</th>';
        });

        html += ' </tr>';
        html += '</thead>';
        html += '<tbody>';

        $.each(dataResult, function (x, data) {
            html += '<tr>';
            $.each(data, function (key, value) {
                    html += ' <td>' + value + '</td>';
            });
           html += ' </tr>';
           
        });


        html += '</tbody>';

        html += ' </table>';

        $('.divResult').append(html);
        $(".divResult table").DataTable();

    }

    



 
}

function getObjects(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key));
        } else if (i == key) {
            objects.push(obj);
        }
    }
    return objects;
}


function getColumnByKey(obj, searchKey) {
    var arrNames = []
    Object.keys(DataResult).forEach(function (key) {
        //get the value of name
        var val = DataResult[key][searchKey];
        //push the name string in the array
        arrNames.push(val);
    });

    return arrNames;

}





function DisplayDatabase(Database) {

    var html = '';
    html += '<ol class="rounded-list accordion" >'

    $.each(Database, function (index, dbObj) {
        html += '<li class="br-menu-item">'
        html += '<a id="top" class="toggle br-menu-link " href="javascript:void(0);"><i class="fa fa-database icon-gold"></i> ' + dbObj.Database + '</a>'
        html += '<ol class="br-menu-sub">'
        $.each(dbObj.Tables, function (index, tableObj) {
            html += '<li class="sub-item"><a  class="toggle" href="javascript:void(0);"><i class="fa fa-table icon-info"></i> ' + tableObj.Table + '</a>'
            html += '<ol class="br-menu-sub">'
            $.each(tableObj.Columns, function (index, columnObj) {
                html += '<li><a class="btnSelectColumn "  href="javascript:void(0);" database="' + columnObj.Database + '" table="' + columnObj.Table + '" column="' + columnObj.Column +'"><i class="fa fa-list-alt icon-success"></i> ' + columnObj.Column + '</a></li>'
            })
                html += ' </ol>'
            html += '</li>'
        })
        html += ' </ol>'
        html += '</li>'

    })

    html += '</ol>'

 



    $('.sectionDB').append(html);

    $(".rounded-list").find("ol").hide();



}

function DisplayListForEdit(chartList) {


    var body = '';
    $(".divList").empty();

    body += '<table class="table table-bordered sorted_table  table-striped tblResult">';
    body += '<thead>';
    body += '<tr class="bg-success" >';
    body += '<th scope="col">No</th>';
    body += '<th scope="col">Title</th>';
    body += '<th scope="col">Chart Type</th>';
    body += '<th scope="col">Preview</th>';
    body += '</tr>';
    body += '</thead>';
    body += '<tbody>';
    if (chartList != null) {
        if (chartList != null && chartList.Charts.length > 0) {
            $.each(chartList.Charts, function (index, data) {

                body += '<tr data="' + data.No + '">';
                body += '<td><span>' + data.SortNo + '</span></td>';
                body += '<td><span>' + data.Title + '</span></td>';
                body += '<td><span>' + GetGraphText(data.GraphID) + '</span></td>';

                body += '<td class="text-center"><span><button data="' + data.No + '" class="btn btn-info btnPreviewGraph"><i class="fa text-mute fa-bar-chart"></button></span></td>';



                body += '</tr>';
            });
        }
    }
    body += '</tbody>';
    body += '</table>';
    $(".divList").append(body);




    // $(".divList table").DataTable({ searching: false, info: false });

    SortedTable();

}
function DisplayList(chartList) {


    var body = '';
    $(".divList").empty();

    body += '<table class="table table-bordered sorted_table  table-striped tblResult">';
    body += '<thead>';
    body += '<tr class="bg-success" >';
    body += '<th scope="col">No</th>';
    body += '<th scope="col">Title</th>';
    body += '<th scope="col">Chart Type</th>';
    body += '<th scope="col">Preview</th>';
    body += '</tr>';
    body += '</thead>';
    body += '<tbody>';
    if (chartList != null) {
        if (chartList != null && chartList.Charts.length > 0) {
            $.each(chartList.Charts, function (index, data) {

                body += '<tr data="' + data.No +'">';
                body += '<td><span>' + data.SortNo + '</span></td>';
                body += '<td><span>' + data.Title + '</span></td>';
                body += '<td><span>' + data.Desc + '</span></td>';

                body += '<td class="text-center"><span><button data="' + data.No +'" class="btn btn-info btnPreviewGraph"><i class="fa text-mute fa-bar-chart"></button></span></td>';



                body += '</tr>';
            });
        }
    }
    body += '</tbody>';
    body += '</table>';
    $(".divList").append(body);

 


   // $(".divList table").DataTable({ searching: false, info: false });

    SortedTable();

}



function LoadChart(Option, divChart) {
    var chartLoad = echarts.init(divChart);
    var option = Option;


    window.onresize = chartLoad.resize;





    setTimeout(function () {
        chartLoad.setOption(option, true);
       // chartLoad.on("click", ChartCallBack);


    }, 1000);
}






