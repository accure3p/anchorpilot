/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function addSalesManagement() {
    addHover("addSalesmanagementMenu");
    displaySalesMenu();
}
function displaySalesMenu() {

    $("#dashboard-body").text("").append("<div class='col-md-13' id='salesManagementMenuTab' />");
    $("#salesManagementMenuTab").append("<ul class='nav nav-tabs nav-primary' id='salesManagementMenuItem' />");

    $("#salesManagementMenuItem").append("<li class='active' style='cursor:pointer;'><a onclick='viewStocksTab()' data-toggle='tab'><strong>Stock Management</strong></a></li>");
//$("#salesManagementMenuItem").append("<li class='' style='cursor:pointer;'><a onclick='viewRetailerSubTab()' data-toggle='tab'><strong>Retailer Management</strong></a></li>");
//    $("#salesManagementMenuItem").append("<li class='' style='cursor:pointer;'><a><strong>Stock Management</strong></a></li>");
    $("#salesManagementMenuItem").append("<li class='' style='cursor:pointer;'><a onclick='viewRetailerSubTab()' data-toggle='tab'><strong>Retailer Management</strong></a></li>");
    $("#salesManagementMenuItem").append("<li class='' style='cursor:pointer;'><a onclick='listOrderItemsTab()' data-toggle='tab'><strong>Order Management</strong></a></li>");
//    $("#salesManagementMenuItem").append("<li class='' style='cursor:pointer;'><a onclick='updateStockFromTab()' data-toggle='tab'><strong>Update Stocks</strong></a></li>");
//    $("#salesManagementMenuItem").append("<li class='' style='cursor:pointer;'><a><strong>Update Stocks</strong></a></li>");

    $("#salesManagementMenuTab").append("<div class='tab-content tab-content-primary mb30' id='salesManagementMainContent' />");

    $("#salesManagementMainContent").append("<div class='tab-pane active' id='stockManagement' ><div id='bulkUploadData1'></div></div>");
//    viewStocks();
    viewstockManagementSubMenu();

    $("#salesManagementMainContent").append("<div class='tab-pane' id='retailerManagement' ><div id='bulkUploadData2'></div></div>");
//    viewRetailerSubMenu();
//viewRetailerSubTab();
    $("#salesManagementMainContent").append("<div class='tab-pane' id='invoiceManagement' ><div id='bulkUploadData2'></div></div>");
//    listOrderItems();
    $("#salesManagementMainContent").append("<div class='tab-pane' id='updateStockManagement' ><div id='bulkUploadData2'></div></div>");
//    updateStockFrom();

}

function viewStocksTab() {
    $("#stockManagement").show();
    $("#retailerManagement").hide();
    $("#invoiceManagement").hide();
    $("#updateStockManagement").hide();
//    viewStocks();
    viewstockManagementSubMenu();
}
function viewRetailerSubTab() {
    $("#stockManagement").hide();
    $("#retailerManagement").show();
    $("#invoiceManagement").hide();
    $("#updateStockManagement").hide();
    viewRetailerSubMenu();
}
function listOrderItemsTab() {
    $("#stockManagement").hide();
    $("#retailerManagement").hide();
    $("#invoiceManagement").show();
    $("#updateStockManagement").hide();
    viewOrderSubMenu();
}
function updateStockFromTab() {
    $("#stockManagement").hide();
    $("#retailerManagement").hide();
    $("#invoiceManagement").hide();
    $("#updateStockManagement").show();
    updateStockFrom();
}


function viewstockManagementSubMenu() {

    $("#stockManagement").text("").append("<div class='col-md-13' id='StockManagementMenuTab' />");
    $("#StockManagementMenuTab").append("<ul class='nav nav-tabs nav-success' id='StockManagementMenuTabMenuTabli' />");

    $("#StockManagementMenuTabMenuTabli").append("<li class='active' style='cursor:pointer' id='viewStockMenuFieldLiId' ><a onclick='viewStocksMenuTab()' data-toggle='tab'><strong>View stock position</strong></a></li>");
//    $("#StockManagementMenuTabMenuTabli").append("<li class='' style='cursor:pointer' id='uploadStockMenuFieldLiId' ><a onclick='uploadStockTab()' data-toggle='tab'><strong>Update stock position</strong></a></li>");
    
    $("#StockManagementMenuTabMenuTabli").append("<li class='' style='cursor:pointer' ><a><strong>Update stock position</strong></a></li>");

    $("#StockManagementMenuTab").append("<div class='tab-content tab-content-primary mb30' id='StockManagementMenuMainContent' />");

    $("#StockManagementMenuMainContent").append("<div class='tab-pane active' id='viewStockMenuId' ><div id='OrgData1'></div></div>");
//    viewRetailerTable();
    viewStocks();
    $("#StockManagementMenuMainContent").append("<div class='tab-pane' id='uploadStockMenu' ><div id='OrgData2'></div></div>");

}

function viewStocksMenuTab() {
    $("#viewStockMenuId").show();
    $("#uploadStockMenu").hide();
    viewStocks();
}
function uploadStockTab() {
    $("#uploadStockMenu").show();
    $("#viewStockMenuId").hide();
    uploadStock();
}

//for fetch all stocks
function viewStocks() {

    $.post(server_base_url + "FetchAllStocks", {
        orgId: getUserSessionElement("OrgId")
    }).done(function(data) {
        if (data == fail) {
            displaySmallErrorMessages("addRouteErrorElementMsg", failMessage);
            displaySmallErrorMessages("addRouteErrorElementMsg", failMessage);
        } else if (data == unauthorized) {
            displaySmallErrorMessages()("addRouteErrorElementMsg", unauthorizedMessage);
            displaySmallErrorMessages("addRouteErrorElementMsg", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            if (data == null) {
            } else {
                $("#viewStockMenuId").text("").append("<div class='form-group' id='viewStockTableMainId' />");
                $("#viewStockTableMainId").append("<div id = 'viewStockSubDiv' class = 'panel panel-primary-head' />");

                $("#viewStockSubDiv").append("<table id='viewStockTable' class='table table-striped table-bordered'>");
                $("#viewStockTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'>Item Code</th>"
                        + "<th style='min-width:15%;width:auto;'>Item name</th>"
                        + "<th style='min-width:15%;width:auto;'>In Stock Quantity</th>"
                        + "<th style='min-width:15%;width:auto;'>Booked Quantity</th>"
                        + "<th style='max-width:100px;'>Re-order Level</th></tr></thead>");
//                 $("#viewStockTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i>Item-ID</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i>Item name</th><th style='min-width:15%;width:auto;'>Quantity</th><th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i>Group</th><th style='min-width:18%;width:18%;'>Update/Delete</th></tr></thead>");
                $("#viewStockTable").append("<tbody id='viewStockTableBody' />");
                $.each(data, function(index, value) {
//                    $("#viewStockTableBody").append("<tr><td>FGBRADF000002700</td><td>Advance Flexi Tooth Brush MRP 27</td><td>200</td><td>FGTB</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;'></span><span class='fa fa-trash-o' style='margin-left:15%;'></span></td></tr>");
                    $("#viewStockTableBody").append("<tr><td>" + value.itemcode + "</td>"
                            + "<td>" + value.itemname + "</td>"
                            + "<td>" + value.instockqty + "</td><td>" + value.bookedqty + "</td><td>" + value.reorderlevel + "</td></tr>");
                });
                var shTable = jQuery('#viewStockTable').DataTable({
                    "fnDrawCallback": function(oSettings) {
                        jQuery('#viewStockTable ul').addClass('pagination-active-dark');
                    },
                    responsive: false
                });
                jQuery('div.dataTables_length select').removeClass('form-control input-sm');
                jQuery('div.dataTables_length select').css({width: '60px'});
                jQuery('div.dataTables_length select').select2({
                    minimumResultsForSearch: -1
                });
            }
        }
    });
}


function uploadStock() {

//    $("#uploadStockMenu").text("").append("<center>"
//            + "<form name='fileuploadForm' method='post' enctype='multipart/form-data'>"
//            + "<table><tr><td><input type='file' name='fileContent' id='fileContent' >"
//            + "</td><td><input type='button' class='btn btn-primary' value='Update Stock'  margin-top: -40px;' onclick=uploadStockFile('fileContent')></td></tr>"
//            + "<tr><td colspan='2'>Upload Message &nbsp;&nbsp; <span id='uploadMsg' /></td></tr></table></form> </center>"
//            );

    $("#uploadStockMenu").text("").append("<center>"
            + "<form name='fileuploadForm' method='post' enctype='multipart/form-data' action='UploadStock' >"
            + "<table><tr><td><input type='file' name='fileContent' id='fileContent' >"
            + "</td><td><input type='submit' class='btn btn-primary' value='Update Stock'  margin-top: -40px;' onclick=getConformationMsg() ></td></tr>"
            + "<tr><td colspan='2'>Upload Message &nbsp;&nbsp; <span id='uploadMsg' /></td></tr></table></form> </center>"
            );
}

function getConformationMsg() {
//    alert("hii");
}



function uploadStockFile(fileContent) {
    var fileControl = document.getElementById(fileContent);
    var lstfiles = fileControl.files;
    var len = lstfiles.length;
    var fileName = lstfiles[0].name;

    alert(len);
    alert(fileName);
    var reader = new FileReader();
    reader.onload = function() {
        var text = reader.result;
        console.log(reader.result.substring(0, 200));
    };
//    reader.readAsText(lstfiles[0]);
    reader.readAsDataURL(lstfiles[0]);
//    
    alert(reader.result.substring(0, 200));

    var finalJson = "upload ";
//    $.get(server_base_url + "UploadStock", {
//        stockJson: finalJson
//    }).done(function(data) {
//        alert(data);
//    });

}


function stockInputForm() {

    $("#StockDetailsId").text("").append("<br><br><div class='form-group' id='addStockForm' />");

    $("#addStockForm").append("<lable class='col-sm-3 control-label'>Stock Item Id *</lable>");
    $("#addStockForm").append("<div class='col-sm-9' id='stockItemId'/>");
    $("#stockItemId").append("<input type='text' onkeyup=common_keypress('stockItemId') id='stockItemIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Stock item id'><span id='stockItemIdElementMsg' /><br />");

    $("#addStockForm").append("<lable class='col-sm-3 control-label'>Stock Item name *</lable>");
    $("#addStockForm").append("<div class='col-sm-9' id='stockItemNameId'/>");
    $("#stockItemNameId").append("<input type='text' onkeyup=common_keypress('stockItemNameId') id='stockItemNameIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Stock item name'><span id='stockItemNameIdElementMsg' /><br />");

    $("#addStockForm").append("<lable class='col-sm-3 control-label'>Stock quantity *</lable>");
    $("#addStockForm").append("<div class='col-sm-9' id='stockItemQtyId'/>");
    $("#stockItemQtyId").append("<input type='text' onkeyup=common_keypress('stockItemQtyId') id='stockItemQtyIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Stock quantity'><span id='stockItemQtyIdElementMsg' /><br />");

    $("#addStockForm").append("<lable class='col-sm-3 control-label'>Entity Id *</lable>");
    $("#addStockForm").append("<div class='col-sm-9' id='stockEntityId'/>");
    $("#stockEntityId").append("<input type='text' onkeyup=common_keypress('stockEntityId') id='stockEntityIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Entity id'><span id='stockEntityIdElementMsg' /><br />");

    $("#addStockForm").append("<label class='col-sm-3 control-label'>Item Tax Group *</label>");
    $("#addStockForm").append("<div id='stockItemTaxId' class='col-sm-9' />");
    $("#stockItemTaxId").append("<select id='stockItemTaxIdElement' name='stockItemTaxIdElement' onchange=common_keypress('stockItemTaxId') class='form-control' />");
    $("#stockItemTaxIdElement").append("<option>Choose One</option><option>Service Tax</option><option>Sales Tax</option><option>Value Added Tax</option>");
    $("#stockItemTaxId").append("<span id='stockItemTaxIdElementMsg'></spam>");

    $("#addStockForm").append("&nbsp;<br>");
    $("#addStockForm").append("<lable class='col-sm-3 control-label'></lable>");
    $("#addStockForm").append("<div class='col-sm-9' id='submitStockbutton'/>");
    $("#submitStockbutton").append("<button id='otherUserSubmitButton' class='btn btn-primary mr5' onclick='validate_stockItem()'>Submit</button>");
    $("#submitStockbutton").append("<span id='stockItemErrorElementMsg'></span>");

}

//function stockItem_keypress(id) {
//    if ($("#" + id + "Element").val() != "" || $("#" + id + "Element").val() != undefined || $("#" + id + "Element").val() != null) {
//        $("#" + id).removeClass("has-error");
//        $("#" + id + "ElementMsg").text("");
//    }
//}

function common_keypress(id) {
    if ($("#" + id + "Element").val() != "" || $("#" + id + "Element").val() != undefined || $("#" + id + "Element").val() != null) {
        $("#" + id).removeClass("has-error");
        $("#" + id + "ElementMsg").text("");
    }
}

function validate_stockItem() {

    if ($("#stockItemIdElement").val() == "") {
        $("#stockItemId").addClass("has-error");
        $("#stockItemIdElement").focus();
        $("#stockItemIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter stock Item Id.</span><br />");
    }
    if ($("#stockItemNameIdElement").val() == "") {
        $("#stockItemNameId").addClass("has-error");
        $("#stockItemNameIdElement").focus();
        $("#stockItemNameIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter stock Item name.</span><br />");
    }
    if ($("#stockItemQtyIdElement").val() == "") {
        $("#stockItemQtyId").addClass("has-error");
        $("#stockItemQtyIdElement").focus();
        $("#stockItemQtyIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter stock quantity.</span><br />");
    }
    if ($("#stockEntityIdElement").val() == "") {
        $("#stockEntityId").addClass("has-error");
        $("#stockEntityIdElement").focus();
        $("#stockEntityIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter entity Id.</span><br />");
    }
    if ($("#stockItemTaxIdElement").val() == "" || $("#stockItemTaxIdElement").val() == "Choose One") {
        $("#stockItemTaxId").addClass("has-error");
        $("#stockItemTaxIdElement").focus();
        $("#stockItemTaxIdElementMsg").text("").append("<span class='smallErrorMsg'>Please select item tax group.</span><br />");
    }
    if ($("#stockItemIdElement").val() == "" || $("#stockItemNameIdElement").val() == "" || $("#stockItemQtyIdElement").val() == ""
            || $("#stockEntityIdElement").val() == "" || $("#stockItemTaxIdElement").val() == "" || $("#stockItemTaxIdElement").val() == "Choose One") {
        return false;
    } else {
        stockItemInsert();
    }
}
function stockItemInsert() {

    var stockItemId = $("#stockItemIdElement").val();
    var stockItemName = $("#stockItemNameIdElement").val();
    var stockItemQty = $("#stockItemQtyIdElement").val();
    var stockEntity = $("#stockEntityIdElement").val();
    var stockItemTax = $("#stockItemTaxIdElement").val();

    var stockJSON = "";
    if (stockItemId != null || stockItemId != undefined) {
        stockJSON = stockJSON + "\"itemid\":\"" + stockItemId + "\",";
    }
    if (stockItemName != null || stockItemName != undefined) {
        stockJSON = stockJSON + "\"itemname\":\"" + stockItemName + "\",";
    }
    if (stockItemQty != null || stockItemQty != undefined) {
        stockJSON = stockJSON + "\"actqty\":\"" + stockItemQty + "\",";
    }
    if (stockEntity != null || stockEntity != undefined) {
        stockJSON = stockJSON + "\"entity\":\"" + stockEntity + "\",";
    }
    if (stockItemTax != null || stockItemTax != undefined) {
        stockJSON = stockJSON + "\"stockItemTax\":\"" + stockItemTax + "\"";
    }
    var finalJson = "[{" + stockJSON + "}]";

    $.get(server_base_url + "TakeOrders", {
        stockJson: finalJson
    }).done(function(data) {
        alert(data);
    });
}
