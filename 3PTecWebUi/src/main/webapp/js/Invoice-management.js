/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function viewOrderSubMenu() {

    $("#invoiceManagement").text("").append("<div class='col-md-13' id='orderMenuTab' />");
    $("#orderMenuTab").append("<ul class='nav nav-tabs nav-success' id='orderMenuTabMenuTabli' />");
    $("#orderMenuTabMenuTabli").append("<li class='active' style='cursor:pointer' id='viewOrderTab' ><a onclick='viewOrderTab()' data-toggle='tab'><strong>View Order</strong></a></li>");
    $("#orderMenuTabMenuTabli").append("<li class='' style='cursor:pointer' id='createOrderTab' ><a onclick='createOrderTab()' data-toggle='tab'><strong>Create Order</strong></a></li>");
    $("#orderMenuTab").append("<div class='tab-content tab-content-primary mb30' id='orderMenuMainContent' />");
    $("#orderMenuMainContent").append("<div class='tab-pane active' id='viewOrderField' ><div id='OrgData1'></div></div>");
    viewOrderList();
    $("#orderMenuMainContent").append("<div class='tab-pane' id='addOrderField' ><div id='OrgData2'></div></div>");
//    addRetailerForm('addRetailerField');

}
function viewOrderTab() {
    $("#viewOrderField").show();
    $("#addOrderField").hide();
    viewOrderList();
}
function createOrderTab() {
    $("#addOrderField").show();
    $("#viewOrderField").hide();
    listOrderItems();
}

// for view order...
function viewOrderList() {
    $.post(server_base_url + "FetchOrderList", {
        orgId: getUserSessionElement("OrgId"),
        userId: getUserSessionElement("CurrentUserId")
    }).done(function(data) {
        if (data == fail) {
            displaySmallErrorMessages("viewRetailerErrorMsgId", failMessage);
            displaySmallErrorMessages("viewRetailerErrorMsgId", failMessage);
        } else if (data == unauthorized) {
            displaySmallErrorMessages()("viewRetailerErrorMsgId", unauthorizedMessage);
            displaySmallErrorMessages("viewRetailerErrorMsgId", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            if (data == null) {
            } else {

                $("#viewOrderField").text("").append("<div class='form-group' id='viewOrderTableMainId' />");
                $("#viewOrderTableMainId").append("<div id = 'viewOrderSubDiv' class = 'panel panel-primary-head' />");
                $("#viewOrderSubDiv").append("<table id='viewOrderTable' class='table table-striped table-bordered'>");
                $("#viewOrderTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i>Customer Name</th><th style='min-width:30%;width:auto;'>Route Id</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i>Created Date</th><th style='min-width:10%;width:auto;'>Status</th></tr></thead>");
                $("#viewOrderTable").append("<tbody id='viewOrderTableBody' />");
                $.each(data, function(index, value) {
                    var dateValue = new Date(parseInt(value.createdate));
                    if (value.type == "SalesOrder") {
                        var mc = value.routeid;
                        if (mc == undefined) {
                            mc = "";
                        }
                        $("#viewOrderTableBody").append("<tr><td><span onclick=createInvoice('" + value._id.$oid + "') style='cursor:pointer;'>" + value.customername + "</span></td><td>" + mc + "</td><td>" + dateValue.toDateString() + "</td><td>" + value.status + "</td></tr>");
                    }
                });
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
        }
    });
}
// fetch invoive data...
function createInvoice(orderid) {

    $.post(server_base_url + "FetchOrderDetails", {
        orderid: orderid
    }).done(function(data) {
        if (data == fail) {
            displaySmallErrorMessages("viewRetailerErrorMsgId", failMessage);
            displaySmallErrorMessages("viewRetailerErrorMsgId", failMessage);
        } else if (data == unauthorized) {
            displaySmallErrorMessages()("viewRetailerErrorMsgId", unauthorizedMessage);
            displaySmallErrorMessages("viewRetailerErrorMsgId", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            if (data == null) {
            } else {
                createBillingItems(data);
//                printInvoiceData(data);
            }
        }
    });
}
// for billing table...
function createBillingItems(data) {

    $("#viewOrderField").text("").append("<br/><div id='createInvoiveMainId' />");
    $("#createInvoiveMainId").text("").append("<span style='font-size:15px;' class=' btn btn-warning  btn-sm btn-block' >Create Invoice</span>");
    $("#createInvoiveMainId").append("<br/><div id='orderDetails' style='margin-left:1%;font-size:17px;' />");
    $.each(JSON.parse(data.order), function(index, value) {
        $("#orderDetails").append("<table border='0' id='displayOrderDetails' />");
        $("#displayOrderDetails").append("<tr style='height:30px;'><td>Sold To : &nbsp;  </td><td id='customerNameId'> " + value.customername + "<input type='hidden' id='customerId' value='" + value.customerid + "' /></td></tr>");
        $("#displayOrderDetails").append("<tr style='height:30px;'><td>Order Date: &nbsp; </td><td> " + dateConversion(value.createdate) + "<input type='hidden' id='refrenceId' value='" + value._id.$oid + "' /></td></tr>");
        $("#displayOrderDetails").append("<tr style='height:30px;'><td>Order Id: &nbsp; </td><td> " + value._id.$oid + "</td></tr>");
    });
    var count = (JSON.parse(data.lineItem)).length;
    $("#createInvoiveMainId").append("<br/><table id='billingItemId' class='invoice-table' RULES=COLS FRAME=BOX ></table>");
    $("#billingItemId").append("<thead><tr class='invoice-header'><th style='width:8%;'>&nbsp;  SR. NO.</th><th style='width:19%;'>&nbsp;  Item Code</th><th style='width:44%;'>&nbsp;  Item Name</th><th style='width:9%;'>&nbsp; Quantity</th><th style='width:9%;'>&nbsp; Billing Quantity</th><th style='width:9%;'>&nbsp; Rate</th><th style='width:11%;'>&nbsp; Amount</th></tr></thead>");
    $("#billingItemId").append("<tfoot><tr class='invoice-header'><th style='width:60%;text-align:right;' colspan='6'>Total amount</th><th style='width:10%;text-align:center;' id='finalTotalAmountId'>00</th></tr></tfoot>");
    $("#createInvoiveMainId").append("<br/><br/>");
    $("#createInvoiveMainId").append("<div id='billingTaxTable' />");
    $("#createInvoiveMainId").append("<div id='billingTaxDivId' />");
    $("#createInvoiveMainId").append("<div id='billingTaxViewBtn' />");
//    $("#billingTaxViewBtn").append("<span class='btn btn-success btn-xs' style='width:150px;margin-left: 1%;' onclick=viewTaxGroupAmnt('" + count + "') ><b>view tax amount</b></span>");
    $("#billingTaxTable").append("<table id='billingTaxId' class='invoice-table' RULES=COLS FRAME=none ></table>");
    $("#billingTaxId").append("<thead><tr class='invoice-header'><th style='width:90%;text-align:right;'colspan='4'>Tax Type</th><th style='width:10%;'></th></tr><thead>");
    $("#billingTaxId").append("<tfoot><tr class='invoice-header'><th style='width:90%;text-align:right;' colspan='4'>Gross amount</th><th style='width:10%;text-align:center;' id='netTotalAmountId'>00</th></tr></tfoot>");
    $("#createInvoiveMainId").append("<input type='hidden' id='totalItemHiddenId' readonly />");
    $("#billingTaxDivId").append("<table id='billingTaxDivTableId' class='invoice-table' RULES=COLS FRAME=none ></table>");
    $("#billingTaxDivTableId").append("<thead><tr class='invoice-header'><th style='width:90%;text-align:right;'colspan='4'>Tax Type</th><th style='width:10%;'></th></tr><thead>");
    $("#billingTaxDivTableId").append("<tfoot><tr class='invoice-header'><th style='width:90%;text-align:right;' colspan='4'>Gross amount</th><th style='width:10%;text-align:center;' id='netTotalAmount'>00</th></tr></tfoot>");
    $("#billingTaxDivTableId").append("<tbody id='billingTaxDivTableTbodyId'></tbody>");
    $("#billingTaxDivId").append("<table id='discountDivTableId' class='invoice-table' RULES=COLS FRAME=none ></table>");
    $("#discountDivTableId").append("<thead><tr class='invoice-header'><th style='width:90%;text-align:right;'colspan='4'></th><th style='width:10%;'></th></tr><thead>");
    $("#discountDivTableId").append("<tfoot><tr class='invoice-header'><th style='width:90%;text-align:right;' colspan='4'>Net</th><th style='width:10%;text-align:center;' id='displayDiscountAmnt' >00.00</th></tr></tfoot>");
    $("#discountDivTableId").append("<tbody id='discountDivTableTbodyId'></tbody>");
    $("#discountDivTableTbodyId").append("<tr height='30px'><td colspan='4' align='right'>Discount <span><input type='text' id='discountPercentageId' value='00' onkeyup='calculateDisAmount()' style='width:70px;margin-left: 20px;'></span> % </td><td align='center'><span id='discountAmountId' /></td></tr>");
    $("#totalItemHiddenId").val(count);
    var hashmap = new Object();
    $.each(JSON.parse(data.lineItem), function(index, value) {

        var taxFlag = true;
        var mc = 0;
        var length = Object.keys(hashmap).length;
        for (mc = 0; mc < length; mc++) {
            if (Object.keys(hashmap)[mc] == value.itemtaxgroup) {
                taxFlag = false;
                break;
            }
        }
        if (taxFlag) {
            hashmap[value.itemtaxgroup] = value.taxAmount;
        } else {
            hashmap[value.itemtaxgroup] = parseFloat(hashmap[Object.keys(hashmap)[parseInt(mc)]]) + parseFloat(value.taxAmount);
        }

        $("#billingItemId").append("<tbody><tr id='itemRow" + value.slno + "' height='40px'>"
                + "<td id='itenNo" + value.slno + "'><input type='hidden' id='hiddenItemId" + value.slno + "' value='" + value._id.$oid + "'><span style='margin-left:5px;'>" + value.slno + "</span></td>"
                + "<td id='itemcode" + value.slno + "'><span style='margin-left:5px;'>" + value.itemcode + "</span></td>"
                + "<td id='itemName" + value.slno + "'><span style='margin-left:5px;'>" + value.itemname + "</span></td>"
                + "<td id='itemQuantityTd" + value.slno + "' align='center' ><input type='text' id='itemQuantity" + value.slno + "' style='width:90%;' value='" + value.actqtypkgunits + "' readonly ></td>"
                + "<td id='itemQuantityTd" + value.slno + "' align='center' ><input type='text' id='billingQuantity" + value.slno + "' onkeyup=calculateBillOnClick('" + value.slno + "','" + count + "','" + value.itemtaxgroup.trim() + "') style='width:90%;' ></td>"
                + "<td id='itemRateTd" + value.slno + "' align='center' ><input type='text' id='itemRate" + value.slno + "' value='" + value.pkgunitrate + "' style='width:90%;' readonly /><input type='hidden' id='actTotalAmount" + value.slno + "'>"
                + "<td id='totalAmount" + value.slno + "' align='center'>00</td></tr><tbody>");
        $("#billingTaxId").append("<tbody><tr id='taxGroupRow" + value.slno + "' height='30px'><td id='taxGroupName" + value.slno + "' colspan='4' align='right'>" + value.itemtaxgroup + " &nbsp;<input type='hidden' id='hiddenTaxPercentageId" + value.slno + "' value='" + value.taxAmount + "' readonly /></td><td id='taxGroupValue" + value.slno + "' align='center'>00</td></tr><tbody>");
        calculateActualTotal(value.slno);
    });
    for (var mc = 0; mc < Object.keys(hashmap).length; mc++) {
//        $("#billingTaxDivTableTbodyId").append("<tr height='30px'><td id='viewTaxGroup" + (mc + 1) + "' colspan='4' align='right'>" + Object.keys(hashmap)[mc] + " &nbsp;</td><td id='viewTaxAmount" + (mc + 1) + "' align='center'>" + hashmap[Object.keys(hashmap)[mc]] + "</td></tr>");
        $("#billingTaxDivTableTbodyId").append("<tr height='30px'><td id='viewTaxGroup" + (mc + 1) + "' colspan='4' align='right'>" + Object.keys(hashmap)[mc] + " &nbsp;</td><td id='viewTaxAmount" + (mc + 1) + "' align='center'>00</td></tr>");
    }
    sessionStorage.setItem("taxhashmap", JSON.stringify(hashmap));
    $("#viewOrderField").append("<textarea id='orderCommentId' class='form-control' rows='5' style='height: 50px;width:90%;margin-left:1%;margin-top: 1%;' placeholder='add your comments...' >" + JSON.parse(data.order)[0].comments + "</textarea>");
    $("#viewOrderField").append("<div id='invoiceBtnDiv' />");
    $("#invoiceBtnDiv").append("<br><br><center><span class='btn btn-success' style='width:120px;float:center;' onclick='createBilling()'><b>Create invoice</b></span>"
            + "<span class='btn btn-success' style='width:120px;float:center;  margin-left: 4%;' onclick='cancelBilling()'><b>Cancel</b></span></center>");
    $("#viewOrderField").append("<br><br><center><span id='createInvoiceMsg' ></span></center>");
    $("#billingTaxTable").hide();
    $("#billingTaxDivId").hide();
    calculateDisAmount();
}

// calculate discount amount...
function calculateDisAmount() {

    var disPecent = $("#discountPercentageId").val();
    var totalAmnt = $("#netTotalAmount").text();
    disPecent = parseFloat(disPecent);
    totalAmnt = parseFloat(totalAmnt);
    if (isNaN(disPecent)) {
        disPecent = 0;
    }
    var discAmount = ((disPecent * totalAmnt) / 100);
    var result = (totalAmnt - discAmount);
    $("#discountAmountId").text(discAmount.toFixed(2));
    $("#displayDiscountAmnt").text(result.toFixed(2));
}


function cancelBilling() {
    viewOrderList();
}


function viewTaxGroupAmnt(flag) {

    var hashmap = sessionStorage.getItem("taxhashmap");
    hashmap = JSON.parse(hashmap);
    var length = Object.keys(hashmap).length;
    var mc = 0;
    var totalAmount = "0";
    totalAmount = parseFloat(totalAmount);
    var count = $("#totalItemHiddenId").val();
    for (var i = 1; i <= count; i++) {
        var taxType = $("#taxGroupName" + i).text();
        var amount = $("#taxGroupValue" + i).text();
        amount = parseFloat(amount);
        for (mc = 1; mc < length + 1; mc++) {
            var viewtax = $("#viewTaxGroup" + mc).text();
            var viewAmnt = $("#viewTaxAmount" + mc).text();
            if (flag == "billing") {
                if (i == 1) {
                    viewAmnt = 0;
                }
            }
            viewAmnt = parseFloat(viewAmnt);
            if (viewtax.trim() == taxType.trim()) {
                viewAmnt = viewAmnt + amount;
                $("#viewTaxAmount" + mc).text(viewAmnt.toFixed(2));
            }
        }
    }
    for (mc = 1; mc < length + 1; mc++) {
        var viewAmnt = $("#viewTaxAmount" + mc).text();
        if (amount != null || amount != undefined) {
            totalAmount = totalAmount + viewAmnt;
        }
    }
    var total = $("#finalTotalAmountId").text();
    totalAmount = parseFloat(totalAmount).toFixed(2);
    var finalTotal = parseFloat(totalAmount) + parseFloat(total);
    $("#netTotalAmount").text(finalTotal);
    $("#displayDiscountAmnt").text(finalTotal);
    $("#billingTaxDivId").show();
}
// insert billing...
function createBilling() {

    var customerId = $("#customerId").val();
    var customerName = $("#customerNameId").text();
    var comment = $("#orderCommentId").val();
    var userId = getUserSessionElement("CurrentUserId");
    var orgId = getUserSessionElement("OrgId");
    var OrgName = getUserSessionElement("OrgName");
    var refrence = $("#refrenceId").val();
    var disPercentage = $("#discountPercentageId").val();
//    alert(refrence);

    var count = $("#totalItemHiddenId").val();
    var orderJson = "";
    if (customerId != null || customerId != undefined) {
        orderJson = orderJson + "\"customerid\":\"" + customerId + "\",";
    }
    if (customerName != null || customerName != undefined) {
        orderJson = orderJson + "\"customername\":\"" + customerName + "\",";
    }
    if (comment != null || comment != undefined) {
        orderJson = orderJson + "\"comments\":\"" + comment + "\",";
    }
    if (OrgName != null || OrgName != undefined) {
        orderJson = orderJson + "\"OrgName\":\"" + OrgName + "\",";
    }
    if (userId != null || userId != undefined) {
        orderJson = orderJson + "\"userid\":\"" + userId + "\",";
    }
    if (refrence != null || refrence != undefined) {
        orderJson = orderJson + "\"reference\":\"" + refrence + "\",";
    }
    if (disPercentage != null || disPercentage != undefined) {
        orderJson = orderJson + "\"discount\":\"" + disPercentage + "\",";
    }
    if (orgId != null || orgId != undefined) {
        orderJson = orderJson + "\"orgid\":\"" + orgId + "\"";
    }
    orderJson = "{" + orderJson + "}";
    var finalJson = "";
    count = parseInt(count);
    if (count == null || count == undefined) {
        return false;
    } else {
        var strJson = "";
        for (var i = 1; i <= count; i++) {
            var id = $("#hiddenItemId" + i).val();
            var item_id = "{\"$oid\"=\"" + id + "\"}";
//            strJson = strJson + "\"_id\":" + item_id + ",";
            strJson = strJson + "\"slno\":\"" + $("#itenNo" + i).text() + "\",";
            strJson = strJson + "\"itemcode\":\"" + $("#itemcode" + i).text() + "\",";
            strJson = strJson + "\"itemname\":\"" + $("#itemName" + i).text() + "\",";
            strJson = strJson + "\"actqtypkgunits\":\"" + $("#itemQuantity" + i).val() + "\",";
            strJson = strJson + "\"billedqtypkgunits\":\"" + $("#billingQuantity" + i).val() + "\",";
            strJson = strJson + "\"pkgunitrate\":\"" + $("#itemRate" + i).val() + "\",";
            strJson = strJson + "\"billqtyamount\":\"" + $("#totalAmount" + i).text() + "\",";
            strJson = strJson + "\"itemtaxgroup\":\"" + $("#taxGroupName" + i).text() + "\",";
            strJson = strJson + "\"actqtyamount\":\"" + $("#actTotalAmount" + i).val() + "\",";
            strJson = strJson + "\"taxAmount\":\"" + $("#taxGroupValue" + i).text() + "\",";
            strJson = strJson + "\"orgid\":\"" + orgId + "\"";
            finalJson = finalJson + "{" + strJson + "},";
            strJson = "";
        }
    }
    finalJson = finalJson.substr(0, finalJson.length - 1);
    var lineItemJson = "[" + finalJson + "]";
//    return false;
    $.post(server_base_url + "CreateInvoice", {
        orderId: refrence,
        invoiceJson: orderJson,
        invoiceLineItemJson: lineItemJson
    }).done(function(data) {
        if (data == fail) {
            displaySmallErrorMessages("createInvoiceMsg", failMessage);
            displaySmallErrorMessages("createInvoiceMsg", failMessage);
        } else if (data == unauthorized) {
            displaySmallErrorMessages()("createInvoiceMsg", unauthorizedMessage);
            displaySmallErrorMessages("createInvoiceMsg", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
//            alert(data);
            $("#invoiceBtnDiv").hide();
            displayLargeSuccessMessages("createInvoiceMsg", "<center> Invoice created successfully.</center>");
            $("#createInvoiceMsg").append("<br/><span id='printInvoiceItemsId' class='btn btn-success' style='width:120px;float:center;  margin-left: 4%;' onclick=printInvoiceItems('" + data + "')><b>Print Invoice</b></span>");
            $("#printInvoiceItemsId").click();
        }
    });
}
// call service to fetch invoice printalble data....
function printInvoiceItems(orderid) {

    $.post(server_base_url + "PrintInvoice", {
        orderid: orderid
    }).done(function(data) {
//        alert(data)
        if (data == fail) {
            displaySmallErrorMessages("createInvoiceMsg", failMessage);
            displaySmallErrorMessages("createInvoiceMsg", failMessage);
        } else if (data == unauthorized) {
            displaySmallErrorMessages()("createInvoiceMsg", unauthorizedMessage);
            displaySmallErrorMessages("createInvoiceMsg", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            if (data == null) {
            } else {
//                createBillingItems(data);
                printInvoiceData(data);
            }
        }
    });
}

// create list of order...
function listOrderItems() {

    $("#addOrderField").text("").append("<div id='invoiceManagementMainId' />");
    $("#invoiceManagementMainId").append("<div id='invoicePrintMainId' />");
    $("#invoicePrintMainId").text("").append("<br><div class='form-group' style='width:100%;' id='invoicePrintForm' />");
    $("#invoicePrintForm").append("<lable class='col-sm-3 control-label'>Customer Name *</lable>");
    $("#invoicePrintForm").append("<div class='col-sm-9' id='retailerNamePrintId'/>");
    $("#retailerNamePrintId").append("<select id='retailerNamePrintIdElement' name='retailerNamePrintIdElement' class='form-control' style='width:92%;' />");
//    $("#retailerNamePrintId").append("<button class='btn btn-primary mr5' onclick='' style='float: left; margin-top: -6px; margin-left: -14px;'>Failed Order</button>");
    $("#retailerNamePrintIdElement").append("<option value=''>Choose One</option>");
    fetchRetailerList();
    $("#invoicePrintForm").append("&nbsp;<br>");
    $("#invoicePrintForm").append("<lable class='col-sm-3 control-label'>Route Id</lable>");
    $("#invoicePrintForm").append("<div class='col-sm-9' id='salesPersonPrintId'/>");
    $("#salesPersonPrintId").append("<input type='text' id='uniqueRouteId' style='text-transform: capitalize;' class='form-control' placeholder='Route id'>");
    $("#invoicePrintForm").append("&nbsp;<br>");
    $("#invoicePrintMainId").append("<div id='printCompanyInfo' />");
    $("#invoicePrintMainId").append("<div id='retailerHiddenId' style='margin-left:1%' ><span>Customer Name :</span> <span id='printRetailerName'></span></div>")
    $("#invoicePrintMainId").append("<br /><div id='routeHiddenId' style='margin-left:1%' ><span>Route :</span> <span id='printRoute'></span></div><br />")
    $("#retailerHiddenId").hide();
    $("#routeHiddenId").hide();
    $("#printCompanyInfo").hide();
//for search item
    $("#invoicePrintForm").append("<lable id='searchlable' class='col-sm-3 control-label'>Search Item </lable>");
    $("#invoicePrintForm").append("<div class='col-sm-9' id='searchPrintableItemId'/>");
    $("#searchPrintableItemId").append("<button id='failedOrderButton' class='btn btn-primary mr5' onclick='failedOrder()' style='float:right'>Failed visit</button>");
    $("#searchPrintableItemId").append("<div class='media' id='mediaMainId' />");
    $("#mediaMainId").append("<div id='searchDisplay' class='media-body' />");
    $("#searchDisplay").append("<div class='bs-example' style='width:100%;'><input type='search' class='typeahead form-control' id='searchItemId' placeholder='Search item' autocomplete='off' /></div>");
    $("#searchPrintableItemId").append("<br>");
    $("#searchPrintableItemId").append("<div id='searchErrorMsg' >&nbsp; </div>");
//    searchItemList();
    $("#invoicePrintMainId").append("<div id='noOfItemData' style='margin-left:1%;'><input type='hidden' id='countItem' /></div>");
    $("#invoicePrintMainId").append("<div id='lineItemMsg' style='margin-left:1%;'></div>");
    $("#invoicePrintMainId").append("<div id='addItemMenuId' />");
    $("#invoicePrintMainId").append("<div id='orderErrorMsg' />");

// for search item data...
    $("#searchItemId").keyup(function() {
        var itemData = "";
        $("#searchMsg").text("&nbsp;");
        $.post(server_base_url + "SearchItem", {
            name: $('#searchItemId').val(), sindex: "0", limit: "1000",
            parentorgid: getUserSessionElement("OrgId")
        }).done(function(pdata) {
            if (pdata == fail) {
                displayLargeErrorMessages("searchErrorMsg", failMessage);
            } else if (pdata == unauthorized) {
                displayLargeErrorMessages("searchErrorMsg", unauthorizedMessage);
            } else if (pdata == invalidSession) {
                callSessionTimeout();
            } else if (pdata == statusException) {
                displayLargeErrorMessages("searchErrorMsg", statusExceptionMessage);
            } else if (pdata == null) {
                displayLargeErrorMessages("searchErrorMsg", "<span style='margin-left:10px;'>No matches found.</span>");
            } else {
                $("#searchErrorMsg").text(" ");
                if (pdata != null) {
                    if (pdata.length > 0) {
                        itemData = "[{";
                        for (var i = 0; i < pdata.length; i++) {
                            itemData = itemData + "value: '" + pdata[i].description + "',id: '" + pdata[i]._id.$oid + "',itemcode: '" + pdata[i].itemcode + "',group: '" + pdata[i].group + "',itemtaxgroup: '" + pdata[i].itemtaxgroup + "',unitprice: '" + pdata[i].unitprice + "'";
                            if (i == pdata.length - 1) {
                                itemData = itemData + "}];";
                            } else {
                                itemData = itemData + "},{";
                            }
                        }//for loop end
                        itemData = eval(itemData);
                        if (itemData != undefined && itemData.length > 0) {
                            $('#searchItemId').typeahead({
                                local: itemData,
                                limit: 100
                            }).bind('typeahead:selected', function(e, suggestion) {
                                $('#searchItemId').val("");
                                $(".tt-dropdown-menu").remove();
//                                alert(JSON.stringify(suggestion));
                                addItemData(suggestion);
                                //added
                                $('#failedOrderButton').hide();
                                //
                                $('#searchItemId').typeahead().off('keyup');
                            });
                            $('#searchItemId').text("");
                            $('#searchItemId').focus();
                        }
                    }
                }
            }
        }); //search servlet part end    
    }); //keypress end
//    printCompanyInfo();
}

//fetch retailer list...
function fetchRetailerList() {

    $.post(server_base_url + "FetchRetailerByDistributor", {
        orgId: getUserSessionElement("OrgId")
    }).done(function(data) {
        if (data == fail) {
            displaySmallErrorMessages("viewRetailerErrorMsgId", failMessage);
            displaySmallErrorMessages("viewRetailerErrorMsgId", failMessage);
        } else if (data == unauthorized) {
            displaySmallErrorMessages()("viewRetailerErrorMsgId", unauthorizedMessage);
            displaySmallErrorMessages("viewRetailerErrorMsgId", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            if (data == null) {
            } else {
                $.each(data, function(index, value) {
                    $("#retailerNamePrintIdElement").append("<option value='" + value.org._id.$oid + "'>" + value.org.name + "</option>");
                });
            }
        }
    });
}

// print invoice...
function printInvoiceData(data) {

    $("#viewOrderField").text("").append("<br/><div id='printInvoiveHeader' />");
    $("#printInvoiveHeader").text("").append("<span style='font-size:15px;' class=' btn btn-warning  btn-sm btn-block' >Create Invoice</span>");
    $("#viewOrderField").text("").append("<br/><div id='printInvoiveMainId' />");
    $("#printInvoiveMainId").append("<br/><div id='printOtherDetailsId' style='margin-left:1%;font-size:17px;' />");
    $("#printOtherDetailsId").append("<div><span id='printOrgInformation' style='float: left;' /><span id='orderDetails' style='float: right;margin-right: 8.5%;' /></div>")
    printCompanyInfo();
//    $.each(JSON.parse(data.order), function(index, value) {
    $("#orderDetails").append("<table border='0' id='displayOrderDetails' />");
    $("#displayOrderDetails").append("<tr style='height:30px;'><td>Sold To : &nbsp;  </td><td> " + JSON.parse(data.order).customername + "</td></tr>");
    $("#displayOrderDetails").append("<tr style='height:30px;'><td>Invoice Date: &nbsp; </td><td> " + dateConversion(JSON.parse(data.order).createdate) + "</td></tr>");
    $("#displayOrderDetails").append("<tr style='height:30px;'><td>Order Id: &nbsp; </td><td> " + JSON.parse(data.order)._id.$oid + "</td></tr>");
//    });

    $("#printInvoiveMainId").append("<br/><table id='billingItemId' class='invoice-table' RULES=COLS FRAME=BOX ></table>");
    $("#billingItemId").append("<thead><tr class='invoice-header'><th style='width:8%;'>&nbsp;  SR. NO.</th><th style='width:19%;'>&nbsp;  Item Code</th><th style='width:44%;'>&nbsp;  Item Name</th><th style='width:9%;'>&nbsp; Billed quantity</th><th style='width:9%;'>&nbsp; Rate</th><th style='width:11%;'>&nbsp; Amount</th></tr></thead>");
    $("#billingItemId").append("<tfoot><tr class='invoice-header'><th style='width:60%;text-align:right;' colspan='5'>Total amount</th><th style='width:10%;text-align:center;' id='finalTotalAmountId'>00</th></tr></tfoot>");
    $("#printInvoiveMainId").append("<br/><br/>");
    $("#printInvoiveMainId").append("<div id='billingTaxTable' />");
    $("#printInvoiveMainId").append("<div id='billingTaxDivId' />");
//    $("#billingTaxViewBtn").append("<span class='btn btn-success btn-xs' style='width:150px;margin-left: 1%;' onclick=viewTaxGroupAmnt('" + count + "') ><b>view tax amount</b></span>");
    $("#billingTaxTable").append("<table id='billingTaxId' class='invoice-table' RULES=COLS FRAME=none ></table>");
    $("#billingTaxId").append("<thead><tr class='invoice-header'><th style='width:90%;text-align:right;'colspan='4'>Tax Type</th><th style='width:10%;'></th></tr><thead>");
    $("#billingTaxId").append("<tfoot><tr class='invoice-header'><th style='width:90%;text-align:right;' colspan='4'>Gross amount</th><th style='width:10%;text-align:center;' id='netTotalAmountId'>00</th></tr></tfoot>");
    $("#printInvoiveMainId").append("<input type='hidden' id='totalItemHiddenId' readonly /><input type='hidden' id='countItem' readonly />");
    $("#billingTaxDivId").append("<table id='billingTaxDivTableId' class='invoice-table' RULES=COLS FRAME=none ></table>");
    $("#billingTaxDivTableId").append("<thead><tr class='invoice-header'><th style='width:90%;text-align:right;'colspan='4'>Tax Type</th><th style='width:10%;'></th></tr><thead>");
    $("#billingTaxDivTableId").append("<tfoot><tr class='invoice-header'><th style='width:90%;text-align:right;' colspan='4'>Gross amount</th><th style='width:10%;text-align:center;' id='netTotalAmount'>00</th></tr></tfoot>");
    $("#billingTaxDivTableId").append("<tbody id='billingTaxDivTableTbodyId'></tbody>");
    $("#billingTaxDivId").append("<table id='discountDivTableId' class='invoice-table' RULES=COLS FRAME=none ></table>");
    $("#discountDivTableId").append("<thead><tr class='invoice-header'><th style='width:90%;text-align:right;'colspan='4'></th><th style='width:10%;'></th></tr><thead>");
    $("#discountDivTableId").append("<tfoot><tr class='invoice-header'><th style='width:90%;text-align:right;' colspan='4'>Net</th><th style='width:10%;text-align:center;' id='displayDiscountAmnt' >00.00</th></tr></tfoot>");
    $("#discountDivTableId").append("<tbody id='discountDivTableTbodyId'></tbody>");
//    $("#discountDivTableTbodyId").append("<tr height='30px'><td colspan='4' align='right'>Discount % </td><td align='center'><input type='text' id='discountPercentageId' value='" + JSON.parse(data.order)[0].discount + "' onkeyup='calculateDisAmount()' style='width:90%;' ></td></tr>");
    $("#discountDivTableTbodyId").append("<tr height='30px'><td colspan='4' align='right'>Discount <span><input type='text' id='discountPercentageId' value='" + JSON.parse(data.order).discount + "' onkeyup='calculateDisAmount()' style='width:70px;margin-left: 20px;' readonly></span> % </td><td align='center'><span id='discountAmountId' /></td></tr>");

    $("#totalItemHiddenId").val(count);
    var hashmap = new Object();
    $.each(JSON.parse(data.lineItem), function(index, value) {
        var taxFlag = true;
        var mc = 0;
        var length = Object.keys(hashmap).length;
        for (mc = 0; mc < length; mc++) {
            if (Object.keys(hashmap)[mc] == value.itemtaxgroup) {
                taxFlag = false;
                break;
            }
        }
        if (taxFlag) {
            hashmap[value.itemtaxgroup] = value.taxAmount;
        } else {
            hashmap[value.itemtaxgroup] = parseFloat(hashmap[Object.keys(hashmap)[parseInt(mc)]]) + parseFloat(value.taxAmount);
        }
    });
    var count = (JSON.parse(data.lineItem)).length;
    $("#totalItemHiddenId").val(count);
    $("#countItem").val(count);
    $.each(JSON.parse(data.lineItem), function(index, value) {
        $("#billingItemId").append("<tbody><tr id='itemRow" + value.slno + "' height='40px'>"
                + "<td id='itenNo" + value.slno + "'><input type='hidden' id='hiddenItemId" + value.slno + "' value='" + value._id.$oid + "'><span style='margin-left:5px;'>" + value.slno + "</span></td>"
                + "<td id='itemcode" + value.slno + "'><span style='margin-left:5px;'>" + value.itemcode + "</span></td>"
                + "<td id='itemName" + value.slno + "'><span style='margin-left:5px;'>" + value.itemname + "</span></td>"
//                + "<td id='itemQuantityTd" + value.slno + "' align='center' ><input type='text' id='itemQuantity" + value.slno + "' style='width:90%;' value='" + value.actqtypkgunits + "' readonly ></td>"
                + "<td id='itemQuantityTd" + value.slno + "' align='center' >" + value.billedqtypkgunits + "</td>"
//                + "<td id='itemRateTd" + value.slno + "' align='center' ><input type='text' id='itemRate" + value.slno + "' value='" + value.pkgunitrate + "' style='width:90%;' readonly /></td>"
                + "<td id='itemRateTd" + value.slno + "' align='center' >" + value.pkgunitrate + "</td>"
                + "<td id='totalAmount" + value.slno + "' align='center'>" + value.billqtyamount + "</td></tr><tbody>");
        $("#billingTaxId").append("<tbody><tr id='taxGroupRow" + value.slno + "' height='30px'><td id='taxGroupName" + value.slno + "' colspan='4' align='right'>" + value.itemtaxgroup + " &nbsp;<input type='hidden' id='hiddenTaxPercentageId" + value.slno + "' value='" + value.taxAmount + "' readonly /></td><td id='taxGroupValue" + value.slno + "' align='center'>00</td></tr><tbody>");
    });

    for (var mc = 0; mc < Object.keys(hashmap).length; mc++) {
        var taxAmnt = hashmap[Object.keys(hashmap)[mc]];
//        $("#billingTaxDivTableTbodyId").append("<tr height='30px'><td id='viewTaxGroup" + (mc + 1) + "' colspan='4' align='right'>" + Object.keys(hashmap)[mc] + " &nbsp;</td><td id='viewTaxAmount" + (mc + 1) + "' align='center'>" + taxAmnt.toFixed(2) + "</td></tr>");
        $("#billingTaxDivTableTbodyId").append("<tr height='30px'><td id='viewTaxGroup" + (mc + 1) + "' colspan='4' align='right'>" + Object.keys(hashmap)[mc] + " &nbsp;</td><td id='viewTaxAmount" + (mc + 1) + "' align='center'>" + hashmap[Object.keys(hashmap)[mc]] + "</td></tr>");
    }
    $("#viewOrderField").append("<br><br><center><span class='btn btn-success' style='width:120px;float:center;' onclick=printInvoice('printInvoiveMainId')><b>Print invoice</b></span>");
//            + "<span class='btn btn-success' style='width:120px;float:center;  margin-left: 4%;' onclick='cancelBilling()'><b>Cancel</b></span></center>");
    $("#billingTaxTable").hide();
    totalAmount();
    $("#printOrgInformation").hide();
//    alert(totalAmount());
    viewTaxGroupAmnt("invoice");
    calculateDisAmount();
}

//fetch sales person...
function getSalesPerson() {
//    $.post(server_base_url + "FetchSalesPerson", {
//        orgId: getUserSessionElement("OrgId")
//        
//    }).done(function(data) {
//        if (data == fail) {
//            displaySmallErrorMessages("viewRetailerErrorMsgId", failMessage);
//            displaySmallErrorMessages("viewRetailerErrorMsgId", failMessage);
//        } else if (data == unauthorized) {
//            displaySmallErrorMessages()("viewRetailerErrorMsgId", unauthorizedMessage);
//            displaySmallErrorMessages("viewRetailerErrorMsgId", unauthorizedMessage);
//        } else if (data == invalidSession) {
//            callSessionTimeout();
//        } else {
//            if (data == null) {
//            } else {
//                $.each(data, function(index, value) {
////                    alert(index, value);
//                    $("#salesPersonPrintIdElement").append("<option value='" + value.org._id.$oid + "'>" + value.org.name + "</option>");
//                });
//            }
//        }
//    });
}

// add line item data..
function addItemData(suggestion) {
//    alert(suggestion.itemtaxgroup);
    var count = $("#countItem").val();
    if (count == "" || count == null || count == undefined) {
        count = "0";
        count = parseInt(count);
        count++;
        $("#addItemMenuId").text("").append("<table id='lineItemID' class='invoice-table' RULES=COLS FRAME=BOX ></table>");
        $("#lineItemID").append("<thead><tr class='invoice-header'><th style='width:8%;'>&nbsp;  SR. NO.</th><th style='width:19%;'>&nbsp;  Item Code</th><th style='width:44%;'>&nbsp;  Item Name</th><th style='width:9%;'>&nbsp; Quantity</th><th style='width:9%;'>&nbsp; Rate</th><th style='width:11%;'>&nbsp; Amount</th></tr></thead>");
        $("#lineItemID").append("<tfoot><tr class='invoice-header'><th style='width:60%;text-align:right;' colspan='5'>Total amount</th><th style='width:10%;text-align:center;' id='finalTotalAmountId'>00</th></tr></tfoot>");
        $("#lineItemID").append("<tbody><tr id='itemRow" + count + "' height='40px'>"
                + "<td id='itenNo" + count + "'><input type='hidden' id='hiddenItemId" + count + "' value='" + suggestion.id + "'><span style='margin-left:5px;'>" + count + "</span></td>"
                + "<td id='itemcode" + count + "'><span style='margin-left:5px;'>" + suggestion.itemcode + "</span></td>"
                + "<td id='itemName" + count + "'><span style='margin-left:5px;'>" + suggestion.value + "</span></td>"
                + "<td id='itemQuantityTd" + count + "' align='center' ><input type='text' id='itemQuantity" + count + "' onkeyup=calculateTotalOnClick('" + count + "') style='width:90%;' value='1' ></td>"
                + "<td id='itemRateTd" + count + "' align='center' ><input type='text' id='itemRate" + count + "' value='" + suggestion.unitprice + "' style='width:90%;' readonly />"
                + "<input type='hidden' id='taxGroupName" + count + "' value='" + suggestion.itemtaxgroup + "'>"
                + "<input type='hidden' id='taxPercentage" + count + "'>"
                + "<input type='hidden' id='taxAmount" + count + "'></td>"

                + "<td id='totalAmount" + count + "' align='center'>00</td></tr><tbody>");
        $("#countItem").val(count);
        $("#addItemMenuId").append("<textarea id='orderCommentId' class='form-control' rows='5' style='height: 50px;width:90%;margin-left:1%;margin-top: 1%;' placeholder='add your comments...' ></textarea>");
        $("#addItemMenuId").append("<br><br><center><span class='btn btn-success' style='width:120px;float:center;' onclick='createOrder()'><b>Create order</b></span>"
                + "<span class='btn btn-success' style='width:120px;float:center;  margin-left: 4%;' onclick='cancelOrder()'><b>Cancel</b></span></center>");
        getTaxPercent(suggestion.itemtaxgroup, count);
    } else {
        count = parseInt(count);
        for (var i = 1; i <= count; i++) {
            var hiddenItemId = $("#hiddenItemId" + i).val();
            if (hiddenItemId == suggestion.id) {
                displayLargeErrorMessages("lineItemMsg", "<center>already selected, please select another item.</center>");
                return false;
            } else {
                $("#lineItemMsg").text("");
            }
        }
        count++;
        $("#lineItemID").append("<tbody><tr id='itemRow" + count + "' height='40px'>"
                + "<td id='itenNo" + count + "'><input type='hidden' id='hiddenItemId" + count + "' value='" + suggestion.id + "'><span style='margin-left:5px;'>" + count + "</span></td>"
                + "<td id='itemcode" + count + "'><span style='margin-left:5px;'>" + suggestion.itemcode + "</span></td>"
                + "<td id='itemName" + count + "'><span style='margin-left:5px;'>" + suggestion.value + "</span></td>" + "<td id='itemQuantityTd" + count + "' align='center' ><input type='text' id='itemQuantity" + count + "' onkeyup=calculateTotalOnClick('" + count + "') style='width:90%;' value='1' ></td>"
                + "<td id='itemRateTd" + count + "' align='center' ><input type='text' id='itemRate" + count + "' value='" + suggestion.unitprice + "' style='width:90%;' readonly />"
                + "<input type='hidden' id='taxGroupName" + count + "' value='" + suggestion.itemtaxgroup + "'>"
                + "<input type='hidden' id='taxPercentage" + count + "'>"
                + "<input type='hidden' id='taxAmount" + count + "'></td>"
                + "<td id='totalAmount" + count + "' align='center'>00</td></tr><tbody>");
        $("#countItem").val(count);
        getTaxPercent(suggestion.itemtaxgroup, count);
    }
}

//for cancel order...
function cancelOrder() {
    listOrderItems();
}

// for calculate total amount...
function calculateTotal(index) {
    var itemQuantity = $("#itemQuantity" + index).val();
    var itemRate = $("#itemRate" + index).val();
    itemQuantity = parseFloat(itemQuantity);
    itemRate = parseFloat(itemRate);
    var result = itemQuantity * itemRate;
    $("#totalAmount" + index).text(result);
    calculateTaxAmount(result, index);
    totalAmount();
}

// calculate actual amount...
function calculateActualTotal(index) {

    var itemQuantity = $("#itemQuantity" + index).val();
    var itemRate = $("#itemRate" + index).val();
    itemQuantity = parseFloat(itemQuantity);
    itemRate = parseFloat(itemRate);
    var result = itemQuantity * itemRate;
    $("#actTotalAmount" + index).val(result);
}

//calculate tax amount....
function calculateTaxAmount(amount, index) {
    var taxPercent = $("#taxPercentage" + index).val();
    taxPercent = parseFloat(taxPercent);
    var taxAmount = ((amount * taxPercent) / 100);
    $("#taxAmount" + index).val(taxAmount);
}

// calculate tatal amount of single item...
function calculateTotalOnClick(index) {

    var itemQuantity = $("#itemQuantity" + index).val();
    var itemRate = $("#itemRate" + index).val();
    itemQuantity = parseFloat(itemQuantity);
    itemRate = parseFloat(itemRate);
    var result = itemQuantity * itemRate;
    $("#totalAmount" + index).text(result);
    calculateTaxAmount(result, index);
    totalAmount();
}

// calculate bill..
function calculateBillOnClick(index, count, vatName) {
    var itemQuantity = $("#billingQuantity" + index).val();
    var itemRate = $("#itemRate" + index).val();
    itemQuantity = parseFloat(itemQuantity);
    itemRate = parseFloat(itemRate);
    var result = itemQuantity * itemRate;
    $("#totalAmount" + index).text(result);
    totalBillAmount(count);
    var taxAmnt = calculateBillingTax(result, index, totalBillAmount(count));
    viewTaxGroupAmnt("billing");
}

function calculateBillOnClick_v1(index, count, vatName) {
    var hashmap = sessionStorage.getItem("taxhashmap");
    var itemQuantity = $("#billingQuantity" + index).val();
    var itemRate = $("#itemRate" + index).val();
    itemQuantity = parseFloat(itemQuantity);
    itemRate = parseFloat(itemRate);
    var result = itemQuantity * itemRate;
    $("#totalAmount" + index).text(result);
    totalBillAmount(count);
    var taxAmnt = calculateBillingTax(result, index, totalBillAmount(count));
    hashmap = JSON.parse(hashmap);
//    alert(JSON.parse(hashmap));
    var taxFlag = true;
    var mc = 0;
    var length = Object.keys(hashmap).length;
    for (mc = 0; mc < length; mc++) {
//        alert(Object.keys(hashmap)[mc]);
        if (Object.keys(hashmap)[mc] == vatName) {
            taxFlag = false;
            break;
        }
    }
    if (taxFlag) {
        hashmap[vatName] = taxAmnt;
    } else {
        hashmap[vatName] = parseFloat(hashmap[Object.keys(hashmap)[parseInt(mc)]]) + parseFloat(taxAmnt);
    }

    $("#billingTaxDivTableTbodyId").text("");
    for (var mc = 0; mc < Object.keys(hashmap).length; mc++) {
        $("#billingTaxDivTableTbodyId").append("<tr height='30px'><td colspan='4' align='right'>" + Object.keys(hashmap)[mc] + " &nbsp;</td><td align='center'>" + hashmap[Object.keys(hashmap)[mc]] + "</td></tr>");
    }
}

// for total bill amount...
function totalBillAmount(count) {
    var totalAmount = "0";
    totalAmount = parseFloat(totalAmount);
//    var count = $("#countItem").val();
    for (var i = 1; i <= count; i++) {
        var amount = $("#totalAmount" + i).text();
        amount = parseFloat(amount);
        if (amount != null || amount != undefined || amount != "") {
            totalAmount = totalAmount + amount;
        }
    }
    $("#finalTotalAmountId").text(totalAmount);
    return totalAmount;
}

// calculate Billing Tax..
function calculateBillingTax(amount, index, totalAmount) {
    var taxPercent = $("#hiddenTaxPercentageId" + index).val();
    taxPercent = parseFloat(taxPercent);
    if (isNaN(taxPercent)) {
        taxPercent = 0;
    }
    var taxAmount = ((amount * taxPercent) / 100);
    $("#taxGroupValue" + index).text(taxAmount.toFixed(2));
    calculateTotalTaxAmount(totalAmount);
    return taxAmount.toFixed(2);
}

// calculate total tax amount...
function calculateTotalTaxAmount(total) {
    var totalAmount = "0";
    totalAmount = parseFloat(totalAmount);
    var count = $("#totalItemHiddenId").val();
    for (var i = 1; i <= count; i++) {
        var amount = $("#taxGroupValue" + i).text();
        amount = parseFloat(amount);
        if (amount != null || amount != undefined) {
            totalAmount = totalAmount + amount;
        }
    }
    totalAmount = parseFloat(totalAmount).toFixed(2);
    var finalTotal = parseFloat(totalAmount) + parseFloat(total);
    $("#netTotalAmountId").text(finalTotal);
}

// for total amount of item...
function totalAmount() {
    var totalAmount = "0";
    totalAmount = parseFloat(totalAmount);
    var count = $("#countItem").val();
    for (var i = 1; i <= count; i++) {
        var amount = $("#totalAmount" + i).text();
        amount = parseFloat(amount);
        if (amount != null || amount != undefined || amount != "") {
            totalAmount = totalAmount + amount;
        }
    }
    $("#finalTotalAmountId").text(totalAmount);
    return totalAmount;
}

// fetch tax percentage....
function getTaxPercent(taxType, count) {
    $.post(server_base_url + "FetchTaxPercentage", {
        orgId: getUserSessionElement("OrgId"),
        taxType: taxType
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
            $.each(data, function(index, value) {
                $("#taxPercentage" + count).val(value.taxpercent);
            });
            calculateTotal(count);
        }
    });
}

// for call create order services....
function createOrder() {

    var retailerId = $("#retailerNamePrintIdElement").val();
    var retailerName = $("#retailerNamePrintIdElement option:selected").text();
    var userId = getUserSessionElement("CurrentUserId");
    var orgId = getUserSessionElement("OrgId");
    var OrgName = getUserSessionElement("OrgName");
    var comment = $("#orderCommentId").val();
    var uniqueRouteId = $("#uniqueRouteId").val();
    var count = $("#countItem").val();
    var orderJson = "";
    if (uniqueRouteId != null || uniqueRouteId != undefined) {
        orderJson = orderJson + "\"routeid\":\"" + uniqueRouteId + "\",";
    }
    if (comment != null || comment != undefined) {
        orderJson = orderJson + "\"comments\":\"" + comment + "\",";
    }
    if (retailerName != null || retailerName != undefined) {
        orderJson = orderJson + "\"customername\":\"" + retailerName + "\",";
    }
    if (retailerId != null || retailerId != undefined) {
        orderJson = orderJson + "\"customerid\":\"" + retailerId + "\",";
    }
    if (userId != null || userId != undefined) {
        orderJson = orderJson + "\"userid\":\"" + userId + "\",";
    }
    if (orgId != null || orgId != undefined) {
        orderJson = orderJson + "\"orgid\":\"" + orgId + "\",";
    }
    if (OrgName != null || OrgName != undefined) {
        orderJson = orderJson + "\"OrgName\":\"" + OrgName + "\"";
    }

    var finalJson = "";
    count = parseInt(count);
    if (count == null || count == undefined) {
        return false;
    } else {
        var strJson = "";
        for (var i = 1; i <= count; i++) {
            var id = $("#hiddenItemId" + i).val();
            var item_id = "{\"$oid\"=\"" + id + "\"}";
//            strJson = strJson + "\"_id\":" + item_id + ",";
            strJson = strJson + "\"slno\":\"" + $("#itenNo" + i).text() + "\",";
            strJson = strJson + "\"itemcode\":\"" + $("#itemcode" + i).text() + "\",";
            strJson = strJson + "\"itemname\":\"" + $("#itemName" + i).text() + "\",";
            strJson = strJson + "\"actqtypkgunits\":\"" + $("#itemQuantity" + i).val() + "\",";
            strJson = strJson + "\"pkgunitrate\":\"" + $("#itemRate" + i).val() + "\",";
            strJson = strJson + "\"actqtyamount\":\"" + $("#totalAmount" + i).text() + "\",";
            strJson = strJson + "\"itemtaxgroup\":\"" + $("#taxGroupName" + i).val() + "\",";
//            strJson = strJson + "\"taxAmount\":\"" + $("#taxAmount" + i).val() + "\",";
            strJson = strJson + "\"taxAmount\":\"" + $("#taxPercentage" + i).val() + "\",";
            strJson = strJson + "\"orgid\":\"" + orgId + "\"";
            finalJson = finalJson + "{" + strJson + "},";
            strJson = "";
        }
    }
    orderJson = "{" + orderJson + "}";
    finalJson = finalJson.substr(0, finalJson.length - 1);
    var lineItemJson = "[" + finalJson + "]";
//    return false;
    $.post(server_base_url + "CreateOrder", {
        orderData: orderJson,
        lineItemData: lineItemJson
    }).done(function(data) {
        if (data == fail) {
            displaySmallErrorMessages("addItemMenuId", failMessage);
            displaySmallErrorMessages("addItemMenuId", failMessage);
        } else if (data == unauthorized) {
            displaySmallErrorMessages()("addItemMenuId", unauthorizedMessage);
            displaySmallErrorMessages("addItemMenuId", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
//            if (data == "200") {
            $("#addItemMenuId").text("");
            $("#largeErrorMsg").text("");
            displayLargeSuccessMessages("addItemMenuId", "<center> order created successfully.</center>");
//            }
        }
    });
}

// for print invoice
function printInvoice(divId) {
//alert("hiii");
//    $("#invoicePrintForm").hide();
    $("#printOrgInformation").show();
    var restorepage = document.body.innerHTML;
    var printcontent = document.getElementById(divId).innerHTML;
    document.body.innerHTML = printcontent;
    window.print();
    document.body.innerHTML = restorepage;
    $("#printOrgInformation").hide();
}

//for company info
function printCompanyInfo() {

    $.post(server_base_url + "FetchUserAddress", {
        userId: getUserSessionElement("CurrentUserId")
    }).done(function(data) {
        if (data == fail) {
            displaySmallErrorMessages("createInvoiceMsg", failMessage);
            displaySmallErrorMessages("createInvoiceMsg", failMessage);
        } else if (data == unauthorized) {
            displaySmallErrorMessages()("createInvoiceMsg", unauthorizedMessage);
            displaySmallErrorMessages("createInvoiceMsg", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            if (data == null) {
            } else {
                $.each(data, function(index, value) {
                    $("#printOrgInformation").text("").append("<table border='0' id='companyDetails' style='margin-left:1%;'/>");
                    $("#companyDetails").append("<tr style='height:30px;' ><td><span style='font-size:20px;'>" + getUserSessionElement("OrgName") + "</span></td></tr>");
                    $("#companyDetails").append("<tr style='height:30px;' ><td>" + value.address1 + "</td></tr>");
                    $("#companyDetails").append("<tr style='height:30px;' ><td>" + value.city + ", " + value.state + ", " + value.zipcode + " </td></tr > ");
//                    $("#companyDetails").append("<tr style='height:30px;' ><td>" + value.workphone + ", " + value.email1 + "</td></tr>");
                    $("#companyDetails").append("<tr style='height:30px;' ><td></td></tr>");
                });
            }
        }
    });
}

function failedOrder() {
    $("#searchItemId").hide();
    $("#searchlable").hide();
    $("#failedOrderButton").hide();
    $("#searchPrintableItemId").append("<lable id='addcommentlableid' class='col-sm-4 control-label' >Add Comment </lable>");
    $("#searchPrintableItemId").append("<textarea id='addcommentid' class='form-control' style='width:60%;height:10%;'></textarea>");
    $("#searchPrintableItemId").append("<br/><center><button id='submitcommentid' class='btn btn-primary mr5' onclick='createFailedOrder()'>Submit</button></center>");
}

// create failed order...
function createFailedOrder() {

    var retailerId = $("#retailerNamePrintIdElement").val();
    var retailerName = $("#retailerNamePrintIdElement option:selected").text();
    var userId = getUserSessionElement("CurrentUserId");
    var orgId = getUserSessionElement("OrgId");
    var OrgName = getUserSessionElement("OrgName");
    var comment = $("#addcommentid").val();
    var count = $("#countItem").val();
    var routeId = $("#uniqueRouteId").val();

    var orderJson = "";
    if (routeId != null || routeId != undefined) {
        orderJson = orderJson + "\"routeid\":\"" + routeId + "\",";
    }
    if (comment != null || comment != undefined) {
        orderJson = orderJson + "\"comments\":\"" + comment + "\",";
    }
    if (retailerName != null || retailerName != undefined) {
        orderJson = orderJson + "\"customername\":\"" + retailerName + "\",";
    }
    if (retailerId != null || retailerId != undefined) {
        orderJson = orderJson + "\"customerid\":\"" + retailerId + "\",";
    }
    if (userId != null || userId != undefined) {
        orderJson = orderJson + "\"userid\":\"" + userId + "\",";
    }
    if (orgId != null || orgId != undefined) {
        orderJson = orderJson + "\"orgid\":\"" + orgId + "\",";
    }
    if (OrgName != null || OrgName != undefined) {
        orderJson = orderJson + "\"OrgName\":\"" + OrgName + "\"";
    }

    var finalJson = "";
    orderJson = "{" + orderJson + "}";
    finalJson = finalJson.substr(0, finalJson.length - 1);
    var lineItemJson = "[" + finalJson + "]";
//    return false;
    $.post(server_base_url + "CreateOrder", {
        orderData: orderJson,
        lineItemData: lineItemJson,
        failedOrder: "true"
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
            if (data == "200") {
                $("#addItemMenuId").text("");
                $("#largeErrorMsg").text("");
                displayLargeSuccessMessages("addItemMenuId", "<center> order submitted successfully.</center>");
            }
        }
    });
}
