//for recover password via link
function recoverPassword(loginid, email) {
    var newRecoveryPassword = $("#new_password").val();
    var recoveryConfirmPassword = $("#confirm_password").val();
    if (newRecoveryPassword == "") {
        $("#recoverySuccess").text("").append("<span style='color:brown;font-size:12px;'>New password required</span>");
        $("#new_password").focus();
        return false;
    } else if (newRecoveryPassword.match(spaceExpression())) {
        $("#recoverySuccess").text("").append("<span style='color:brown;font-size:12px;'>Spaces not allowed</span>");
        $("#new_password").val("");
        $("#new_password").focus();
        return false;
    } else if (!newRecoveryPassword.match(passwordExpression())) {
        $("#recoverySuccess").text("").append("<span style='color:brown;font-size:12px;'>Password length between 6 to 16 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character</span>");
        $("#new_password").val("");
        $("#new_password").focus();
        return false;
    } else if (recoveryConfirmPassword == "") {
        $("#recoverySuccess").text("").append("<span style='color:brown;font-size:12px;'>Confirm password required</span>");
        $("#confirm_password").focus();
        return false;
    } else if (recoveryConfirmPassword.match(spaceExpression())) {
        $("#recoverySuccess").text("").append("<span style='color:brown;font-size:12px;'>Spaces not allowed</span>");
        $("#confirm_password").val("");
        $("#confirm_password").focus();
        return false;
    } else if (newRecoveryPassword != recoveryConfirmPassword) {
        $("#recoverySuccess").text("").append("<span style='color:brown;font-size:12px;'>Password and Confirm Password must be same</span>");
        $("#confirm_password").val("");
        $("#confirm_password").focus();
        return false;
    } else {
        $.get(server_base_url + "UpdatePasswordLink", {
            newpass: newRecoveryPassword,
            loginid: loginid,
            email1: email
        }).done(function(data) {
            if (data == true) {
                $("#recover_pwd_btn").text("");
                $("#recoverySuccess").text("").append("<span id='msgg1' style='color:green;font-size:13px;'>Password changed successfully.</span>");
                $("#recoverySuccess").append("<span id='msgg2' style='font-size:13px;'><a href='index.jsp' style='color:#428bca;'>  click here to login</a></span>");
                setTimeout(function() {
                    sessionStorage.clear();
                    location.href = "index.jsp";
                }, 15000);
            } else if (data == false || data == null) {
                $("#recoverySuccess").text("").append("<span style='color:brown;font-size:12px;'>Password not changed please contact administrator</span>");
            }
        });
        return true;
    }
}
//for recovery password keypress
function recover_key(event) {
    $("#recoverySuccess").text("");
    if (event.which == 13) {
        $('#recover_btn').click();
        return false;
    }
}