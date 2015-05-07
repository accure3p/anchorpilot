/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

// for org management


function displayOrgSubMenu() {

    $("#dashboard-body").text("").append("<div class='col-md-12' id='orgMenuTab' />");
    $("#orgMenuTab").append("<ul class='nav nav-tabs nav-justified nav-metro nav-primary' id='OrgMenuItem' />");

    $("#OrgMenuItem").append("<li class='active' style='cursor:pointer;'><a onclick='addSubOrgStructureTab()' data-toggle='tab'><strong>Org Structure</strong></a></li>");
    $("#OrgMenuItem").append("<li class='' style='cursor:pointer;'><a onclick='addSubZoneTab()' data-toggle='tab'><strong>Zones</strong></a></li>");
    $("#OrgMenuItem").append("<li class='' style='cursor:pointer;'><a onclick='displayRouteSubTab()' data-toggle='tab'><strong>Routes</strong></a></li>");
//    $("#OrgMenuItem").append("<li class='' style='cursor:pointer;'><a onclick='addSubMasterDataTab()' data-toggle='tab'><strong>Master Data</strong></a></li>");
$("#OrgMenuItem").append("<li class='' style='cursor:pointer;'><a><strong>Master Data</strong></a></li>");
    $("#OrgMenuItem").append("<li class='' style='cursor:pointer;'><a onclick='addNewUserTab()' data-toggle='tab'><strong>Users</strong></a></li>");

    $("#orgMenuTab").append("<div class='tab-content tab-content-primary mb30' id='OrgMenuMainContent' />");

    $("#OrgMenuMainContent").append("<div class='tab-pane active' id='orgStructure' ><div id='OrgData1'></div></div>");
    addSubOrgStructureMenu();

    $("#OrgMenuMainContent").append("<div class='tab-pane' id='zoneManagement' ><div id='OrgData1'></div></div>");

    $("#OrgMenuMainContent").append("<div class='tab-pane' id='userManagement' ><div id='OrgData2'></div></div>");

    $("#OrgMenuMainContent").append("<div class='tab-pane' id='routeManagement' ><div id='OrgData2'></div></div>");

    $("#OrgMenuMainContent").append("<div class='tab-pane' id='masterDataManagement' ><div id='OrgData2'></div></div>");

}

function addSubOrgStructureTab() {
    $("#orgStructure").show();
    $("#zoneManagement").hide();
    $("#userManagement").hide();
    $("#routeManagement").hide();
    $("#masterDataManagement").hide();
    addSubOrgStructureMenu();
}
function addSubZoneTab() {
    $("#orgStructure").hide();
    $("#zoneManagement").show();
    $("#userManagement").hide();
    $("#routeManagement").hide();
    $("#masterDataManagement").hide();
    addSubZoneMenu();
}
function displayRouteSubTab() {
    $("#orgStructure").hide();
    $("#zoneManagement").hide();
    $("#userManagement").hide();
    $("#routeManagement").show();
    $("#masterDataManagement").hide();
    displayRouteSubMenu();
}
function addSubMasterDataTab() {
    $("#orgStructure").hide();
    $("#zoneManagement").hide();
    $("#userManagement").hide();
    $("#routeManagement").hide();
    $("#masterDataManagement").show();
    addSubMasterDataMenu();
}
function addNewUserTab() {
    $("#orgStructure").hide();
    $("#zoneManagement").hide();
    $("#userManagement").show();
    $("#routeManagement").hide();
    $("#masterDataManagement").hide();
    addNewUser();
}


// for zone management
function displayZoneSubMenu() {

    $("#dashboard-body").text("").append("<div class='col-md-9' id='zoneMenuTab' />");
    $("#zoneMenuTab").append("<ul class='nav nav-tabs nav-justified nav-metro nav-primary' id='zoneMenuItem' />");

    $("#zoneMenuItem").append("<li class='active'><a href='#addZoneField' data-toggle='tab'><strong>Add Zone</strong></a></li>");
    $("#zoneMenuItem").append("<li class=''><a href='#contact4' data-toggle='tab'><strong>Remove Zone</strong></a></li>");

    $("#zoneMenuTab").append("<div class='tab-content tab-content-primary mb30' id='zoneMenuMainContent' />");

    $("#zoneMenuMainContent").append("<div class='tab-pane active' id='addZoneField' ><div id='zoneData1'></div></div>");
    addZoneForm();


    $("#zoneMenuMainContent").append("<div class='tab-pane' id='contact4' ><div id='zoneData2'></div></div>");
    $("#zoneData2").append("<center><h4 style='margin-top:15%' >Remove Zone goes here...</h4></center>");
    $("#zoneData2").append("<center><h4 style='margin-top:25%'></h4></center>");

}

// for user Management
function displayUserSubMenu() {

    $("#dashboard-body").text("").append("<div class='col-md-9' id='userMenuTab' />");
    $("#userMenuTab").append("<ul class='nav nav-tabs nav-justified nav-metro nav-primary' id='userMenuItem' />");

    $("#userMenuItem").append("<li class='active'><a href='#home4' data-toggle='tab'><strong>Add User</strong></a></li>");
    $("#userMenuItem").append("<li class=''><a href='#contact4' data-toggle='tab'><strong>Update/Remove User</strong></a></li>");

    $("#userMenuTab").append("<div class='tab-content tab-content-primary mb30' id='userMenuMainContent' />");

    $("#userMenuMainContent").append("<div class='tab-pane active' id='home4' ><div id='userData1'></div></div>");
    $("#userData1").append("<center><h4 style='margin-top:15%' >Add user goes here...</h4></center>");
    $("#userData1").append("<center><h4 style='margin-top:25%'></h4></center>");

    $("#userMenuMainContent").append("<div class='tab-pane' id='contact4' ><div id='userData2'></div></div>");
    $("#userData2").append("<center><h4 style='margin-top:15%' >Update/remove user goes here...</h4></center>");
    $("#userData2").append("<center><h4 style='margin-top:25%'></h4></center>");

}

// for Route Management


// for Stock Management
function displayStockSubMenu() {

    $("#dashboard-body").text("").append("<div class='col-md-9' id='stockMenuTab' />");
    $("#stockMenuTab").append("<ul class='nav nav-tabs nav-justified nav-metro nav-primary' id='stockMenuItem' />");

    $("#stockMenuItem").append("<li class='active'><a href='#StockDetailsId' data-toggle='tab'><strong>Stock Details</strong></a></li>");
    $("#stockMenuItem").append("<li class=''><a href='#ItemDetailsId' data-toggle='tab'><strong>Item Details</strong></a></li>");

    $("#stockMenuTab").append("<div class='tab-content tab-content-primary mb30' id='stockMenuMainContent' />");

    $("#stockMenuMainContent").append("<div class='tab-pane active' id='StockDetailsId' ><div id='stockData1'></div></div>");
    stockInputForm();


    $("#stockMenuMainContent").append("<div class='tab-pane' id='ItemDetailsId' ><div id='stockData2'></div></div>");
    $("#stockData2").append("<center><h4 style='margin-top:15%' >Item Details route goes here...</h4></center>");
    $("#stockData2").append("<center><h4 style='margin-top:25%'></h4></center>");

}

// for Order Management
function displayOrderSubMenu() {

    $("#dashboard-body").text("").append("<div class='col-md-11' id='orderMenuTab' />");
    $("#orderMenuTab").append("<ul class='nav nav-tabs nav-justified nav-metro nav-primary' id='orderMenuItem' />");

    $("#orderMenuItem").append("<li class='active'><a href='#takeOrderDetailsId' data-toggle='tab'><strong>Take Orders</strong></a></li>");
    $("#orderMenuItem").append("<li class=''><a href='#contact4' data-toggle='tab'><strong>View orders</strong></a></li>");
    $("#orderMenuItem").append("<li class=''><a href='#contact5' data-toggle='tab'><strong>Generate Invoice</strong></a></li>");
    $("#orderMenuItem").append("<li class=''><a href='#viewOrderDetailsId' data-toggle='tab'><strong>View Stocks</strong></a></li>");
    $("#orderMenuItem").append("<li class=''><a href='#contact7' data-toggle='tab'><strong>Update/Remove Order</strong></a></li>");

    $("#orderMenuTab").append("<div class='tab-content tab-content-primary mb30' id='orderMenuMainContent' />");

    $("#orderMenuMainContent").append("<div class='tab-pane active' id='takeOrderDetailsId' ><div id='orderData1'></div></div>");
    takeOrderinputForm();

    $("#orderMenuMainContent").append("<div class='tab-pane' id='contact4' ><div id='orderData2'></div></div>");
    $("#orderData2").append("<center><h4 style='margin-top:15%' >View orders route goes here...</h4></center>");
    $("#orderData2").append("<center><h4 style='margin-top:25%'></h4></center>");

    $("#orderMenuMainContent").append("<div class='tab-pane' id='contact5' ><div id='orderData3'></div></div>");
    $("#orderData3").append("<center><h4 style='margin-top:15%' >Generate Invoice route goes here...</h4></center>");
    $("#orderData3").append("<center><h4 style='margin-top:25%'></h4></center>");

    $("#orderMenuMainContent").append("<div class='tab-pane' id='viewOrderDetailsId' ><div id='orderData4'></div></div>");
    ViewStockOrderTable();

    $("#orderMenuMainContent").append("<div class='tab-pane' id='contact7' ><div id='orderData5'></div></div>");
    $("#orderData5").append("<center><h4 style='margin-top:15%' >Delete Order goes here...</h4></center>");
    $("#orderData5").append("<center><h4 style='margin-top:25%'></h4></center>");

}


// for Report Management
function displayReportSubMenu() {

    $("#dashboard-body").text("").append("<div class='col-md-9' id='reportMenuTab' />");
    $("#reportMenuTab").append("<ul class='nav nav-tabs nav-justified nav-metro nav-primary' id='reportMenuItem' />");

    $("#reportMenuItem").append("<li class='active'><a href='#home4' data-toggle='tab'><strong>Stock Report</strong></a></li>");
    $("#reportMenuTab").append("<div class='tab-content tab-content-primary mb30' id='reportMenuMainContent' />");

    $("#reportMenuMainContent").append("<div class='tab-pane active' id='home4' ><div id='reportData1'></div></div>");
    $("#reportData1").append("<center><h4 style='margin-top:15%' >Stock Report goes here...</h4></center>");
    $("#reportData1").append("<center><h4 style='margin-top:25%'></h4></center>");
}

// for Synchronize  Management
function displaySynchronizeSubMenu() {

    $("#dashboard-body").text("").append("<div class='col-md-9' id='synchronizeMenuTab' />");
    $("#synchronizeMenuTab").append("<ul class='nav nav-tabs nav-primary' id='synchronizeMenuItem' />");

    $("#synchronizeMenuItem").append("<li class='active'><a href='#home4' data-toggle='tab'><strong>Synchronize</strong></a></li>");

    $("#synchronizeMenuTab").append("<div class='tab-content tab-content-primary mb30' id='synchronizeMenuMainContent' />");

    $("#synchronizeMenuMainContent").append("<div class='tab-pane active' id='home4' ><div id='synchronizeData1'></div></div>");
    $("#synchronizeData1").append("<center><h4 style='margin-top:15%' >synchronize goes here...</h4></center>");
    $("#synchronizeData1").append("<center><h4 style='margin-top:25%'></h4></center>");

}

// for Bulk Upload  Management
function displayBulkUploadSubMenu() {

    $("#dashboard-body").text("").append("<div class='col-md-9' id='bulkUploadMenuTab' />");
    $("#bulkUploadMenuTab").append("<ul class='nav nav-tabs nav-primary' id='bulkUploadMenuItem' />");

    $("#bulkUploadMenuItem").append("<li class='active'><a href='#home4' data-toggle='tab'><strong>Bulk Upload</strong></a></li>");

    $("#bulkUploadMenuTab").append("<div class='tab-content tab-content-primary mb30' id='bulkUploadMenuMainContent' />");

    $("#bulkUploadMenuMainContent").append("<div class='tab-pane active' id='home4' ><div id='bulkUploadData1'></div></div>");
    $("#bulkUploadData1").append("<center><h4 style='margin-top:15%' >Bulk Upload goes here...</h4></center>");
    $("#bulkUploadData1").append("<center><h4 style='margin-top:25%'></h4></center>");

}

