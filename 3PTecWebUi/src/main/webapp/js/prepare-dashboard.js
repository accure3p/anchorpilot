//add hover to selected item in dashboard
function addHover(obj) {
    $("li").removeClass("active");
    $("#" + obj).addClass("active");
}

function prepareCommonPrivileges() {
    getProfileMenu();//for profile
}
function prepareUserManagement() {
    getUserManagementMenu();//for user registration
}
function prepareDmsManagement() {
    getOrgmanagementMenu();         // for Org management
//    getEntityManagementMenu();      // for Entity management
    getSalesmanagementMenu();       // for sales management
//    getZoneManagementMenu();        // for Zone management
//    get3PtecUserManagementMenu();   // for User management
//    getRouteManagementMenu();       // for Route management
//    getStockManagementMenu();       // for Stock management
//    getOrderManagementMenu();       // for Order management
//    getReportManagementMenu();      // for Report management
//    getSynchronizeManagementMenu(); // for Synchronize management
//    getBulkUploadManagementMenu();  // for Bulk Upload management

}

//profile management start-------------------------------------------------------------------------------------------
function getProfileMenu() {
    if (checkUserPrivelege("ProfileView") == true || checkUserPrivelege("ProfileUpdate") == true || checkUserPrivelege("ChangePassword") == true) {
        $("#dropdownMenu").prepend("<li id='showProfileMenu'><a href='javascript:myProfile()'><i class='glyphicon glyphicon-user'></i> My profile</a></li>");
    }
}
//user management start-------------------------------------------------------------------------------------------
function getUserManagementMenu() {
    if (checkUserPrivelege("RegisterUser") == true) {
        $("#dropdownMenu").prepend("<li id='addUserMenu'><a href='javascript:addNewUser();'><i class='glyphicon glyphicon-star' /><span>User management</span></a></li>");
    } else {
        $("#addUserMenu").remove();
    }
}
//Org ManagementMenu() start-------------------------------------------------------------------------------------------
function getOrgmanagementMenu() {
    if (checkUserType("PL") == true) {
        $("#activeList").append("<li id='addOrgmanagementMenu'><a href='javascript:addOrgManagement();'><i class='glyphicon glyphicon-asterisk'/><span>Administration</span></a></li>");
    } else {

    }
}
function getSalesmanagementMenu() {
    if (checkUserType("DS") == true) {
        $("#activeList").append("<li id='addSalesmanagementMenu'><a href='javascript:addSalesManagement();'><i class='fa fa-sitemap'/><span>Sales management</span></a></li>");
    } else {

    }
}
//Zone management start-------------------------------------------------------------------------------------------
function getZoneManagementMenu() {
//    if (checkUserPrivelege("RegisterPatient") == true) {
    $("#activeList").append("<li id='addZoneManagementMenu'><a href='javascript:addZoneManagement();'><i class='fa fa-sitemap'/><span>Zone management</span></a></li>");
//    } else {

//    }
}
//Org EntityManagementMenu() start-------------------------------------------------------------------------------------------
function getEntityManagementMenu() {
//    if (checkUserPrivelege("RegisterPatient") == true) {
    $("#activeList").append("<li id='addEntityManagementMenu'><a href='javascript:addEntityManagement();'><i class='fa fa-sitemap'/><span>Distribution network</span></a></li>");
//    } else {

//    }
}
//Org get3PtecUserManagement() start-------------------------------------------------------------------------------------------
function get3PtecUserManagementMenu() {
//    if (checkUserPrivelege("RegisterPatient") == true) {
    $("#activeList").append("<li id='add3PtecUserManagementMenu'><a href='javascript:addNewUser();'><i class='glyphicon glyphicon-user'/><span>User management</span></a></li>");
//    } else {

//    }
}
//Org RouteManagement() start-------------------------------------------------------------------------------------------
function getRouteManagementMenu() {
    if (checkUserPrivelege("RegisterPatient") == true) {
        $("#activeList").append("<li id='addRouteManagementMenu'><a href='javascript:addRouteManagement();'><i class='glyphicon glyphicon-map-marker'/><span>Route management</span></a></li>");
    } else {
        $("#addPatientMenu").remove();
    }
}
//Org StockManagement() start-------------------------------------------------------------------------------------------
function getStockManagementMenu() {
    if (checkUserPrivelege("RegisterPatient") == true) {
        $("#activeList").append("<li id='addStockManagementMenu'><a href='javascript:addStockManagement();'><i class='fa fa-folder-open-o'/><span>Stock management</span></a></li>");
    } else {
        $("#addPatientMenu").remove();
    }
}
//Org OrderManagement() start-------------------------------------------------------------------------------------------
function getOrderManagementMenu() {
    if (checkUserPrivelege("RegisterPatient") == true) {
        $("#activeList").append("<li id='addOrderManagementMenu'><a href='javascript:addOrderManagement();'><i class='fa fa-edit'/><span>Order management</span></a></li>");
    } else {
        $("#addPatientMenu").remove();
    }
}
//Org ReportManagement() start-------------------------------------------------------------------------------------------
function getReportManagementMenu() {
    if (checkUserPrivelege("RegisterPatient") == true) {
        $("#activeList").append("<li id='addReportManagementMenu'><a href='javascript:addReportManagement();'><i class='fa fa-file-text'/><span>Reports management</span></a></li>");
    } else {
        $("#addPatientMenu").remove();
    }
}
//Org SynchronizeManagement() start-------------------------------------------------------------------------------------------
function getSynchronizeManagementMenu() {
    if (checkUserPrivelege("RegisterPatient") == true) {
        $("#activeList").append("<li id='addSynchronizeManagementMenu'><a href='javascript:addSynchronizeManagement();'><i class='glyphicon glyphicon-retweet'/><span>Synchronize management</span></a></li>");
    } else {
        $("#addPatientMenu").remove();
    }
}
//Org BulkUploadManagement() start-------------------------------------------------------------------------------------------
function getBulkUploadManagementMenu() {
    if (checkUserPrivelege("RegisterPatient") == true) {
        $("#activeList").append("<li id='addBulkUploadManagementMenu'><a href='javascript:addBulkUploadManagement();'><i class='glyphicon glyphicon-upload'/><span>Bulk Upload management</span></a></li>");
    } else {
        $("#addPatientMenu").remove();
    }
}