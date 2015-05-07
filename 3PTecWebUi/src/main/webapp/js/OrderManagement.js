/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function ViewStockOrderTable() {

    $("#orderManagement").text("").append("<div class='form-group' id='viewOrderTableMainId' />");
    $("#viewOrderTableMainId").append("<div  id='viewItemDataSubDivHeading' />");
    $("#viewItemDataSubDivHeading").text("").append("<span class='btn btn-primary' onclick='takeOrderinputForm()'>New Order</span></h3>");
    jQuery("#viewStockFromDate").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1950:2020',
        //maxDate: new Date,
        minDate: new Date(1900, 0, 1),
        dateFormat: dateformate
    });
    jQuery("#viewStockToDate").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1950:2020',
        //maxDate: new Date,
        minDate: new Date(1900, 0, 1),
        dateFormat: dateformate
    });
    $("#viewOrderTableMainId").append("<div id = 'viewOrderSubDiv' class = 'panel panel-primary-head' />");
    //  $("#viewOrderSubDivHeading").text("").append("<center><h3 class='pt-label' style='margin-top:-7px;font-size:18px;'><b>View stocks List</b><span style='font-size:13px;'><br />Please click on column header to sort.</span></h3></center>");
    $("#viewOrderSubDiv").append("<table id='viewOrderTable' class='table table-striped table-bordered'>");
    $("#viewOrderTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i>Stock Item Id</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i>Stock Item name</th><th style='min-width:15%;width:auto;'><i class='fa fa-mobile'></i>Stock quantity</th><th style='min-width:15%;width:auto;'>Created by</th><th style='min-width:18%;width:18%;'>Update/Delete</th></tr></thead>");
    $("#viewOrderTable").append("<tbody id='viewOrderTableBody' />");

    $("#viewOrderTableBody").append("<tr><td>Abhishek Kumar</td><td>Accure</td><td>Accure</td><td>Mani</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;'></span><span class='fa fa-trash-o' style='margin-left:15%;'></span></td></tr>");
    $("#viewOrderTableBody").append("<tr><td>Abhishek Kumar</td><td>Accure</td><td>Accure</td><td>Mani</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;'></span><span class='fa fa-trash-o' style='margin-left:15%;'></span></td></tr>");
    $("#viewOrderTableBody").append("<tr><td>Abhishek Kumar</td><td>Accure</td><td>Accure</td><td>Mani</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;'></span><span class='fa fa-trash-o' style='margin-left:15%;'></span></td></tr>");
    var shTable = jQuery('#viewOrderTable').DataTable({
        "fnDrawCallback": function(oSettings) {
            jQuery('#viewOrderTable ul').addClass('pagination-active-dark');
        },
        responsive: false
    });

    jQuery('div.dataTables_length select').removeClass('form-control input-sm');
    jQuery('div.dataTables_length select').css({width: '60px'});
    jQuery('div.dataTables_length select').select2({
        minimumResultsForSearch: -1
    });

}

function takeOrderinputForm() {

    $("#orderManagement").text("").append("<br><br><div class='form-group' id='takeOrderForm' />");

    $("#takeOrderForm").append("<lable class='col-sm-3 control-label'>Comment *</lable>");
    $("#takeOrderForm").append("<div class='col-sm-9' id='orderCommentId'/>");
    $("#orderCommentId").append("<input type='text' onkeyup=common_keypress('orderCommentId') id='orderCommentIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Comment'><span id='orderCommentIdElementMsg' /><br />");

    $("#takeOrderForm").append("<lable class='col-sm-3 control-label'>Retailer name *</lable>");
    $("#takeOrderForm").append("<div class='col-sm-9' id='orderRetailerNameId'/>");
    $("#orderRetailerNameId").append("<input type='text' onkeyup=common_keypress('orderRetailerNameId') id='orderRetailerNameIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Retailer name'><span id='orderRetailerNameIdElementMsg' /><br />");

    $("#takeOrderForm").append("<lable class='col-sm-3 control-label'>Reference *</lable>");
    $("#takeOrderForm").append("<div class='col-sm-9' id='orderReferenceId'/>");
    $("#orderReferenceId").append("<input type='text' onkeyup=common_keypress('orderReferenceId') id='orderReferenceIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Reference'><span id='orderReferenceIdElementMsg' /><br />");

    $("#takeOrderForm").append("<label class='col-sm-3 control-label'>Transaction type *</label>");
    $("#takeOrderForm").append("<div id='orderTxntypeId' class='col-sm-9' />");
    $("#orderTxntypeId").append("<select id='orderTxntypeIdElement' name='orderTxntypeIdElement' onchange=common_keypress('orderTxntypeId') class='form-control' />");
    $("#orderTxntypeIdElement").append("<option>Choose One</option><option>Service Tax</option><option>Sales Tax</option><option>Value Added Tax</option>");
    $("#orderTxntypeId").append("<span id='orderTxntypeIdElementMsg'></spam>");
    $("#orderTxntypeId").append("<br>");

    $("#takeOrderForm").append("<lable class='col-sm-3 control-label'>Transaction date *</lable>");
    $("#takeOrderForm").append("<div class='col-sm-9' id='orderTxndateId'/>");
    $("#orderTxndateId").append("<input type='text' onchange=common_keypress('orderTxndateId') id='orderTxndateIdElement' placeholder='dd/mm/yyyy' class='form-control'  /><span id='orderTxndateIdElementMsg' /><br />");
    jQuery("#orderTxndateIdElement").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1950:2020',
        //maxDate: new Date,
        minDate: new Date(1900, 0, 1),
        dateFormat: dateformate
    });

    $("#takeOrderForm").append("<lable class='col-sm-3 control-label'>Created by *</lable>");
    $("#takeOrderForm").append("<div class='col-sm-9' id='orderCreatedbyId'/>");
    $("#orderCreatedbyId").append("<input type='text' onkeyup=common_keypress('orderCreatedbyId') id='orderCreatedbyIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Created By'><span id='orderCreatedbyIdElementMsg' /><br />");

    $("#takeOrderForm").append("<lable class='col-sm-3 control-label'>Entity name *</lable>");
    $("#takeOrderForm").append("<div class='col-sm-9' id='orderEntityNameId'/>");
    $("#orderEntityNameId").append("<input type='text' onkeyup=common_keypress('orderEntityNameId') id='orderEntityNameIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Entity name'><span id='orderEntityNameIdElementMsg' /><br />");


    $("#takeOrderForm").append("&nbsp;<br>");
    $("#takeOrderForm").append("<lable class='col-sm-3 control-label'></lable>");
    $("#takeOrderForm").append("<div class='col-sm-9' id='submitStockbutton'/>");
    $("#submitStockbutton").append("<button id='otherUserSubmitButton' class='btn btn-primary mr5' onclick='validate_TakeOrder()'>Submit</button>");
    $("#submitStockbutton").append("<span id='stockItemErrorElementMsg'></span>");

}

function validate_TakeOrder() {

    if ($("#orderCommentIdElement").val() == "") {
        $("#orderCommentId").addClass("has-error");
        $("#orderCommentIdElement").focus();
        $("#orderCommentIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter comment.</span><br />");
    }
    if ($("#orderRetailerNameIdElement").val() == "") {
        $("#orderRetailerNameId").addClass("has-error");
        $("#orderRetailerNameIdElement").focus();
        $("#orderRetailerNameIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter retailer name.</span><br />");
    }
    if ($("#orderReferenceIdElement").val() == "") {
        $("#orderReferenceId").addClass("has-error");
        $("#orderReferenceIdElement").focus();
        $("#orderReferenceIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter reference.</span><br />");
    }
    if ($("#orderTxntypeIdElement").val() == "" || $("#orderTxntypeIdElement").val() == "Choose One") {
        $("#orderTxntypeId").addClass("has-error");
        $("#orderTxntypeIdElement").focus();
        $("#orderTxntypeIdElementMsg").text("").append("<span class='smallErrorMsg'>Please select txn type.</span></br>");
    }
    if ($("#orderTxndateIdElement").val() == "") {
        $("#orderTxndateId").addClass("has-error");
        $("#orderTxndateIdElement").focus();
        $("#orderTxndateIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter txn date.</span><br />");
    }
    if ($("#orderCreatedbyIdElement").val() == "") {
        $("#orderCreatedbyId").addClass("has-error");
        $("#orderCreatedbyIdElement").focus();
        $("#orderCreatedbyIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter created by.</span><br />");
    }
    if ($("#orderEntityNameIdElement").val() == "") {
        $("#orderEntityNameId").addClass("has-error");
        $("#orderEntityNameIdElement").focus();
        $("#orderEntityNameIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter entity name.</span><br />");
    }


    if ($("#orderCommentIdElement").val() == "" || $("#orderRetailerNameIdElement").val() == "" || $("#orderReferenceIdElement").val() == ""
            || $("#orderTxntypeIdElement").val() == "" || $("#orderTxntypeIdElement").val() == "Choose One" || $("#orderTxndateIdElement").val() == ""
            || $("#orderCreatedbyIdElement").val() == "" || $("#orderEntityNameIdElement").val() == "") {
        return false;
    } else {
        takeOrderInsert();
    }
}

function takeOrderInsert() {
    var orderComment = $("#orderCommentIdElement").val();
    var orderRetailerName = $("#orderRetailerNameIdElement").val();
    var orderReference = $("#orderReferenceIdElement").val();
    var orderTxntype = $("#orderTxntypeIdElement").val();
    var orderTxndate = $("#orderTxndateIdElement").val();
    var orderCreatedby = $("#orderCreatedbyIdElement").val();
    var orderEntityName = $("#orderEntityNameIdElement").val();

    var takeOderJSON = "";
    if (orderComment != null || orderComment != undefined) {
        takeOderJSON = takeOderJSON + "\"comments\":\"" + orderComment + "\",";
    }
    if (orderRetailerName != null || orderRetailerName != undefined) {
        takeOderJSON = takeOderJSON + "\"retailername\":\"" + orderRetailerName + "\",";
    }
    if (orderReference != null || orderReference != undefined) {
        takeOderJSON = takeOderJSON + "\"reference\":\"" + orderReference + "\",";
    }
    if (orderTxntype != null || orderTxntype != undefined) {
        takeOderJSON = takeOderJSON + "\"txntype\":\"" + orderTxntype + "\",";
    }
    if (orderTxndate != null || orderTxndate != undefined) {
        takeOderJSON = takeOderJSON + "\"txndate\":\"" + orderTxndate + "\","
    }
    if (orderCreatedby != null || orderCreatedby != undefined) {
        takeOderJSON = takeOderJSON + "\"createdby\":\"" + orderCreatedby + "\","
    }
    if (orderEntityName != null || orderEntityName != undefined) {
        takeOderJSON = takeOderJSON + "\"entityname\":\"" + orderEntityName + "\""
    }
    var finalJSON = "[{" + takeOderJSON + "}]";
    $.get(server_base_url + "TakeOrders", {
        json: finalJSON
    }).done(function(data) {
        alert(data);
    });
    ViewStockOrderTable();
}