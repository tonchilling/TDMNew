
var objTableFieldSelect = [];
var objBarchartXFieldSelect = [];
var objBarchartYFieldSelect = [];

var objSelection = [];

$(document).ready(function () {
    initialData();
});


function initialData() {

  //  $("#ddlOperation").selectpicker('refresh').trigger('change');

    $("#tblSelection").dataTable();
    
    

    $(".draggable").draggable({
        revert: 'invalid'
    });

    $(".droppable").droppable({
        accept: function (item) {
            return $(this).data("color") == item.data("color");
        },
        drop: function (event, ui) {
            var $this = $(this);
         /*   ui.draggable.position({
                my: "center",
                at: "center",
                of: $this,
                using: function (pos) {
                    $(this).animate(pos, 200, "linear");
                }
            });*/
        }
    });

   
    CMPLTADMIN_SETTINGS.chatAPI();
    CMPLTADMIN_SETTINGS.sectionBoxActions();
 
}


$(document).on("click", ".btnQuery", function () {
    $(".boxfield").removeClass("m-fadeOut m-fadeIn absolute").addClass("m-fadeIn");
    GeneratePreview();
});


$(document).on("click", ".btnPreview", function () {
   
    GeneratePreview();
});

function GeneratePreview() {
    $(".divPreview").removeClass("m-fadeOut m-fadeIn absolute").addClass("m-fadeIn");
    $(".divPreviewBody").empty();

    var html = "";
    html +='<div class="row">';

    if (objSelection != null && objSelection.length>0 ) {

        $.each(objSelection, function (index, item) {
            if (item.GType == '1') {
                html +='<div class="col-xs-12">'
                html +='<section class="box " >'
                html +='<header class="panel_header bg-info">'
                html +='<i class="fa fa-2x fa-table " aria-hidden="true"> Table</i>'
                html +='</header>'
                html +='<div class="content-body">'
                html +='<div class="row">'
                html +='<div class="col-md-12 col-sm-12 col-xs-12">'
                html += '<div class="divTablePreview">'
                if (item.Fields != null && item.Fields.length > 0) {
                    html += '<table class="table  table-striped"   id = "EstimateChartTable0">';
                    html += '<thead>';
                    html += '<tr class="bg-info" >';


                    $.each(item.Fields, function (index, item) {
                        html += ' <th  scope="col">' + item.dataname + '</th>';
                    });

                    html += ' </tr>';
                    html += '</thead>';

                    html += ' </table>';

                  
                }

            } if (item.GType == '2') {
                html +='<div class="col-xs-4">'
                html +='<div class="divBarchartPreview">'
            }
            if (item.GType == '3') {
                html +='<div class="col-xs-4">'
                html +='<div class="divLinechartPreview">'
            }
            if (item.GType == '4') {
                html +='<div class="col-xs-4">'
                html +='<div class="divPiePreview">'
            }


            html += '</div>'
            html += '</div>'
            html += '</div>'
            html += '</div>'
            html += '</div>'
        });

      
    }


 
  
       
        html +='</div>'

    $(".divPreviewBody").append(html);

    $(".divTablePreview table").DataTable();

    

   

}


$(document).on("change", "#ddlSelectGraph", function () {

    var menuDisplay = "";
    $('.divSelected').addClass("hidden");
    switch ($(this).val()) {
        case "1":
            menuDisplay = "Table";
            $('.divSelected1').removeClass("hidden");
            break;
        case "2":
            menuDisplay = "Bar Chart";
            $('.divSelected2').removeClass("hidden");
            break;
        case "3":
            menuDisplay = "Line Chart";
            $('.divSelected3').removeClass("hidden");
            break;
        case "4":
            menuDisplay = "Pie Chart";
            $('.divSelected4').removeClass("hidden");
            break;
    }

    setTimeout(
        function () { 
            $('.lblChartBar').text(menuDisplay);
        },1000
    );
});



$(document).on("click", ".btnSave", function () {

    var obj = {};
    var menuDisplay = "";
    switch ($("#ddlSelectGraph").val()) {
        case "1":
            menuDisplay = "Table";
           
            break;
        case "2":
            menuDisplay = "Bar Chart";
            
            break;
        case "3":
            menuDisplay = "Line Chart";
           
            break;
        case "4":
            menuDisplay = "Pie Chart";
            
            break;
    }

    obj.No = objSelection != null ? objSelection.length + 1 : 1;
    obj.GType = $("#ddlSelectGraph option:selected").val();
    obj.GtypeName = $("#ddlSelectGraph option:selected").text();
    obj.Fields = objTableFieldSelect;
    objSelection.push(obj);

    LoadSelectionTable(objSelection);
});

function LoadSelectionTable(objSelection) {

    var html = '';
    $(".divTableSelection").empty();

    html += '<table class="table  table-striped"   id = "EstimateChartTable0">';
    html += '<thead>';
    html += '<tr class="bg-info" >';

    html += ' <th width="20%" scope="col">No</th>';
    html += ' <th width="40%" scope="col">Type</th>';
    html += ' <th width="20%" scope="col">Delete</th>';
   
    html += ' </tr>';
    html += '</thead>';
    html += '<tbody>';

    if (objSelection != null) {

        $.each(objSelection, function (index, item) {
            html += '<tr>';
            html += '<td>' + item.No + '</td>';
            html += '<td>' + item.GtypeName + '</td>';
            html += '<td><i class="fa fa-remove text-danger"></i></td>';


            html += '</tr>';
        });
    }

    html += '</tbody>';
    html += ' </table>';

    $(".divTableSelection").append(html);
    $(".divTableSelection table").DataTable();
}




$(document).on("click", ".btnRemove", function () {


   
    switch ($(this).closest("div").attr("id")) {
        case "divDragTable":
            objTableFieldSelect = objTableFieldSelect.filter(d => d.elementid != $(this).closest("button").attr("id"));
            setTimeout(function () {
               // TableManage.Fields = objTableFieldSelect;
                //TableManage.Display("divTableDisplay");
            }, 1000);
            break;
        case "divBarchartX":
            objBarchartXFieldSelect = objBarchartXFieldSelect.filter(d => d.elementid != $(this).closest("button").attr("id"));
            break;
        case "divBarchartY":
            objBarchartYFieldSelect = objBarchartYFieldSelect.filter(d => d.elementid != $(this).closest("button").attr("id"));
            break;

    }

   


    $(this).closest("button").remove();
   
});


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dropgraph(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");


    var selectElement = $("#" + data);
    $(ev.target).append(selectElement);

   
    
}
function drop(ev) {
    ev.preventDefault();

    if ($(ev.target)[0].tagName.toLowerCase() != "div") {
        return;
    }

    switch ($(ev.target)[0].id)
    {
        case "divDragTable":
            GenerateTable(ev);
            break;
        case "divBarchartX":
            GenerateBarchartX(ev);
            break;
        case "divBarchartY":
            GenerateBarchartY(ev);
            break;

    }
   

    
   
}

function GenerateBarchartY(ev) {

    var data = ev.dataTransfer.getData("text");
    var selectElement = $("#" + data);
    var alreadyEle = objBarchartYFieldSelect.filter(d => d.elementid == data);
    if (alreadyEle.length > 0) {

        objBarchartYFieldSelect = objBarchartYFieldSelect.filter(d => d.elementid != $(selectElement).closest("button").attr("id"));
        $(ev.target).find("#" + data).remove();
    }

    var obj = {};
    obj.elementid = data;
    obj.dataid = selectElement.attr("dataid");
    obj.dataname = selectElement.attr("dataname");
    objBarchartYFieldSelect.push(obj);
    $(ev.target).append(selectElement.clone().append("<i class='fa fa-remove fa-2x text-danger btnRemove'>"));

}

function GenerateBarchartX(ev) {

    var data = ev.dataTransfer.getData("text");
    var selectElement = $("#" + data);
    var alreadyEle = objBarchartXFieldSelect.filter(d => d.elementid == data);
    if (alreadyEle.length > 0) {

        objBarchartXFieldSelect = objBarchartXFieldSelect.filter(d => d.elementid != $(selectElement).closest("button").attr("id"));
        $(ev.target).find("#" + data).remove();
    }

    var obj = {};
    obj.elementid = data;
    obj.dataid = selectElement.attr("dataid");
    obj.dataname = selectElement.attr("dataname");
    objBarchartXFieldSelect.push(obj);
    $(ev.target).append(selectElement.clone().append("<i class='fa fa-remove fa-2x text-danger btnRemove'>"));

}


function GenerateTable(ev) {

    var data = ev.dataTransfer.getData("text");
    var selectElement = $("#" + data);
    var alreadyEle = objTableFieldSelect.filter(d => d.elementid == data);

    if (alreadyEle.length > 0) {

        objTableFieldSelect = objTableFieldSelect.filter(d => d.elementid != $(selectElement).closest("button").attr("id"));
        $(ev.target).find("#" + data).remove();
    }



    var obj = {};
    obj.elementid = data;
    obj.dataid = selectElement.attr("dataid");
    obj.dataname = selectElement.attr("dataname");
    objTableFieldSelect.push(obj);
    $(ev.target).append(selectElement.clone().append("<i class='fa fa-remove fa-2x text-danger btnRemove'>"));

    setTimeout(function () {
     //   TableManage.Fields = objTableFieldSelect;
      //  TableManage.Display("divTableDisplay");
    }, 1000);


 //   $(ev.target).append(selectElement.clone().append("<i class='fa fa-remove fa-2x text-danger btnRemove'>"));
}

function newdrop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var selectElement = $("#" + data);
    $(ev.target).append(selectElement);
}



var TableManage = {

    Fields:[],
    Display: function (eleClassName) {
        var html = "";
        var selectEle = "." + eleClassName;
        $(selectEle).empty();
        if (TableManage.Fields != null && TableManage.Fields.length > 0) {
            html += '<table class="table  table-striped"   id = "EstimateChartTable0">';
            html += '<thead>';
            html += '<tr class="bg-info" >';


            $.each(TableManage.Fields, function (index, item) {
                html += ' <th  scope="col">' + item.dataname+'</th>';
            });

            html += ' </tr>';
            html += '</thead>';

            html += ' </table>';

            $(selectEle).append(html);
            $(selectEle + " table").DataTable();
        }


    },

}


$('.rightAction').mousedown(function (event) {
    switch (event.which) {
        case 1:
         //   alert('Left Mouse button pressed.');
            break;
        case 2:
         //   alert('Middle Mouse button pressed.');
            break;
        case 3:
      //    $(this).contextmenu(function () {
          //      alert("Handler for .contextmenu() called.");
          //  });
            break;
        default:
          //  alert('You have a strange Mouse!');
    }
});