function loadLoginPage() {
    sessionStorage.clear();
    var cookies = $.cookie();
    for (var cookie in cookies) {
        $.removeCookie(cookie);
    }
}

//credentials validation in login page
function login() {
    var usernameValue = $("#username_id").val();
    var passwordValue = $("#password_id").val();
    if (usernameValue == "" && passwordValue == "") {
        addSomeClass("usernameDiv", "has-error");
        addSomeClass("passwordDiv", "has-error");
        displaySmallErrorMessages("uperror", "Please enter username / password.");
    } else if (usernameValue == "") {
        $("#username_id").focus();
        addSomeClass("usernameDiv", "has-error");
        displaySmallErrorMessages("uperror", "Please enter username.");
        return false;
    } else if (passwordValue == "") {
        $("#password_id").focus();
        addSomeClass("passwordDiv", "has-error");
        displaySmallErrorMessages("uperror", "Please enter password.");
        return false;
    } else {
        $.post(server_base_url + "Login", {
            user_txt: usernameValue,
            pwd_txt: passwordValue
        }).done(function(data) {
            if (data == fail) {
                addSomeClass("usernameDiv", "has-error");
                addSomeClass("passwordDiv", "has-error");
                $("#username_id").focus();
                $("#password_id").val("");
                displaySmallErrorMessages("uperror", "Invalid username / password");
            } else if (data == unauthorized) {
                $("#username_id").val("");
                $("#password_id").val("");
                displaySmallErrorMessages("uperror", unauthorizedMessage);
            } else if (data == invalidSession) {
                callSessionTimeout();
            } else if (data == statusException) {
                displaySmallErrorMessages("uperror", statusExceptionMessage);
            } else {
                loginUserData(data);
            }//end if
        });
    }
}//function end

//login page keypress
function login_key(event) {
    if ($("#username_id").val() != "") {
        $("#usernameDiv").removeClass("has-error");
        $("#uperror").text("");
    }
    if ($("#password_id").val() != "") {
        $("#passwordDiv").removeClass("has-error");
        $("#uperror").text("");
    }
    if ($("#username_id").val() != "" && $("#password_id").val() != "") {
        $("#uperror").text("");
    }
    if (event.which == 13) {
        $('#login_btn').click();
        return false;
    }
}

//all user related information
function loginUserData(data) {
    var flag = "active";
    sessionStorage.setItem("LoginJson", flag);
    sessionStorage.setItem("FullName", data.fname + " " + data.mname);//for fname
    sessionStorage.setItem("MiddleName", data.mname);//for mname
    sessionStorage.setItem("LastName", data.lname);//for lname
    sessionStorage.setItem("LoginId", data.loginid);//for loginid
    sessionStorage.setItem("CurrentUserId", data._id.$oid); //for Current User  
    sessionStorage.setItem("OrgId", data.orgid);
//    sessionStorage.setItem("Privileges", privileges);
    sessionStorage.setItem("RoleNames", data.roles);
    sessionStorage.setItem("UserType", data.type);
    getOrgName();
}
function getOrgName() {
    $.post(server_base_url + "FetchOrgName", {
        orgId: getUserSessionElement("OrgId")
    }).done(function(data) {
        if (data == fail) {
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            sessionStorage.setItem("OrgName", data[0].name);
            location.href = "dashboard.jsp";
        }//end if
    });
}

//logout
function logout() {
    sessionStorage.clear();
    location.href = "index.jsp";
    $.get(server_base_url + "Logout", {
    }).done(function(data) {
//        if (data == success) {
        sessionStorage.clear();
        location.href = "index.jsp";
//        }
    });
}

function callSessionTimeout() {
    sessionStorage.clear();
    location.href = "timeOut.jsp";
}

function closeSession() {
    window.history.forward(-1);
    sessionStorage.clear();
    setTimeout(function() {
        location.href = "index.jsp";
    }, 3000);
}

function displaySmallErrorMessages(divId, dispMessage) {
    $("#" + divId).text("").append("<span class='smallErrorMsg'>" + dispMessage + "</span>");
}

function displaySmallSuccessMessages(divId, dispMessage) {
    $("#" + divId).text("").append("<span class='smallSuccessMsg'>" + dispMessage + "</span>");
}

function displayLargeErrorMessages(divId, dispMessage) {
    $("#" + divId).text("").append("<span class='largeErrorMsg'>" + dispMessage + "</span>");
}

function displayLargeSuccessMessages(divId, dispMessage) {
    $("#" + divId).text("").append("<span class='largeSuccessMsg'>" + dispMessage + "</span>");
}

function addSomeClass(divId, className) {
    $("#" + divId).addClass(className);
}

function removeSomeClass(divId, className) {
    $("#" + divId).removeClass(className);
}

//removing all session elements
function removeSessionElements() {
    sessionStorage.removeItem("FullName");
    sessionStorage.removeItem("LastName");
    sessionStorage.removeItem("LoginId");
    sessionStorage.removeItem("OrgNames");
    sessionStorage.removeItem("user_selected_org");
    sessionStorage.removeItem("Privileges");
    sessionStorage.removeItem("RoleNames");
    sessionStorage.clear();
    location.href = "index.jsp";
}

//demo to send data from js to jsp
//$(document).ready(function() {
//    $('#getData').click(function() {
//        $.ajax({
//            url: server_base_url + '/3PTec-server/TestServlet',
//            type: 'post',
//            dataType: 'json',
//            success: function(data) {
//                $('#name').val(data.name);
//                $('#email').val(data.email);
//            }
//        });
//    });
//});