$(function () {
    $("#ContID").change(function () {
        $.get("/Address/GetStateById", { ID: $("#ContID").val() }, function (data) {
            $("#St").empty();
            $.each(data, function (index, row) {
                $("#St").append("<option value='" + row.AMPHUR_SEQ + "'>" + row.AMPHUR_NAME_TH + "</option>")
            });
            $("#St").selectpicker('refresh');

            $("#Ta").empty();
            $("#Ta").selectpicker('refresh');
        });
    });
});

$(function () {
    $("#St").change(function () {
        $.get("/Address/GetTambolById", { ID: $("#St").val() }, function (data) {
            $("#Ta").empty();
            $.each(data, function (index, row) {
                $("#Ta").append("<option value='" + row.TAMBOL_SEQ + "'>" + row.TAMBOL_NAME_TH + "</option>")
            });

            $("#Ta").selectpicker('refresh');

        });
    });
});