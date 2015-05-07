//dashboard onload
function dashboardDefaults() {
    window.history.forward(-1);
    userValidation(); //if user is invalid it redirects to index
    displayUserInfo();//displaying user related info
    prepareDashboard(); //removing divs if priviliges is not available.

//    if (getUserSessionElement("dashboard-div") == "profile") {
//        myProfile();
//        sessionStorage.removeItem("dashboard-div");
//    } else if (getUserSessionElement("dashboard-div") == "preferences") {
//        addPhysicianPreference();
//        sessionStorage.removeItem("dashboard-div");
//    } else {
//        sessionStorage.removeItem("dashboard-div");
//    }
}//dashboard onload end

function getUserSessionElement(element) {
    var elementResult = sessionStorage.getItem(element);
    return elementResult;
}
//user validation on dashboard
function userValidation() {
    var loginUser = getUserSessionElement("LoginJson");
    if (loginUser != "active" || loginUser == null || loginUser == "" || loginUser == undefined || loginUser == "undefined") {
        logout();
    }
}//user validation on dashboard end


//displaying details in dashboard
function displayUserInfo() {
    var FullName = getUserSessionElement("FullName");
    var LastName = getUserSessionElement("LastName");
    var LoginId = getUserSessionElement("LoginId");
    $("#headerMainDiv").append("<div class='header-right' id='headerRightDiv' />");
    $("#headerRightDiv").append("<div id='pullRight' class='pull-right' />");
//for displaying global comments option
    $("#pullRight").prepend("<div id='globalCommentsDivId' class='btn-group btn-group-list btn-group-messages' />");
//for displaying orgid
    $("#pullRight").append("<div id='orgDisplayDiv' class='btn-group btn-group-list btn-group-messages' />");
    $("#orgDisplayDiv").append("<button type='button' class='btn btn-dark dropdown-toggle'><span id='currentOrgId' class='fa fa-users' title='Current Organization' >" + getUserSessionElement("OrgName") + "</span></button>");
//for displaying loginid
    $("#pullRight").append("<div id='loginidDisplayDiv' class='btn-group btn-group-list btn-group-messages' />");
    $("#loginidDisplayDiv").append("<button type='button' class='btn btn-dark dropdown-toggle'><span id='currentUserId' class='glyphicon glyphicon-user' title='Current User' /></button>");
//for displaying dropdownmenu
    $("#pullRight").append("<div id='dropDownMenuDiv' class='btn-group btn-group-option' />");
    $("#dropDownMenuDiv").append("<button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown'><i class='fa fa-caret-down' /></button>");
    $("#dropDownMenuDiv").append("<ul class='dropdown-menu pull-right' role='menu' id='dropdownMenu' />");

    $("#dropdownMenu").append("<li class='divider' />");
    $("#dropdownMenu").append("<li><a href='javascript:logout()'><i class='glyphicon glyphicon-log-out'></i>Logout</a></li>");
//main div with dashboard body div created  
//    $("#mainDashboardDiv").append("<div id='mainPanelDiv' class='mainpanel' />");
//created left panel div for ul and li items start
    $("#mainDashboardDiv").append("<div class='leftpanel' id='leftPanelDiv' />");
    $("#leftPanelDiv").append("<ul class='nav nav-pills nav-stacked' id='activeList' />");
    $("#activeList").append("<li class='active'><a href='dashboard.jsp'><i class='glyphicon glyphicon-home'></i><span>Dashboard</span></a></li>");
//for user profile pic and display user name
    $("#leftPanelDiv").prepend("<div class='media profile-left' id='profilePicture' />");
//    $("#profilePicture").text("").append("<a class='pull-left profile-thumb' href='javascript:myProfile()'><img class='img-circle profilePic' src='../images/currentUser.jpg'></a>");
    $("#profilePicture").append("<div class='media-body' id='nameDisplay' />");
    $("#nameDisplay").append("<h4 id='ufname-disp' style='text-transform: capitalize;' class='media-heading' title='User Full Name' /><small id='ulname-disp' class='text-muted' title='User Last Name' />");
    $("#ufname-disp").append(FullName); //to display username in dashboard left side
    $("#ulname-disp").append(LastName);//to display username in dashboard left side
    $("#currentUserId").append(LoginId); //to display current loginid in dashboard right side
}//displaying details in dashboard end

//preparing dashboard if priviliges is not available removing divs start
function prepareDashboard() {
//dashboard body div is created here
    $("#mainPanelDiv").append("<div class='contentpanel' id='dashboard-body' />");
    prepareCommonPrivileges();
//    prepareUserManagement();
    prepareDmsManagement();
}

function checkUserType(type) {
    var types = getUserSessionElement("UserType");
    if (types.match(type)) {
        return true;
    } else {
        return false;
    }
    return true;
}

function checkUserRole(role) {
//    var roles = getUserSessionElement("RoleNames");
//    if (roles.match(role)) {
//        return true;
//    } else {
//        return false;
//    }
    return true;
}

function checkUserPrivelege(privilege) {
//    var privileges = getUserSessionElement("Privileges");
//    if (privileges.match(privilege)) {
//        return true;
//    } else {
//        return false;
//    }
    return true;
}