var LoginId = getUserSessionElement("LoginId");

//view user profile display code
function viewUserProfile() {
//    alert(getUserSessionElement("CurrentUserId"));
    $.get(server_base_url + "FetchUserById", {
        userId: getUserSessionElement("CurrentUserId")
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("userDemogDisplayTable", failMessage);
        } else if (data == unauthorized) {
            displayLargeErrorMessages("userDemogDisplayTable", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("userDemogDisplayTable", statusExceptionMessage);
        } else {
            getViewUserProfileForm();//calling function to create display form

            $.each(data, function(index, value) {
//                alert(value.gender);
                $("#up_loginid_v").text("").text(value.loginid);
                $("#up_role_v").text("").text(value.roles);
                $("#up_fname_v").val("").val(value.fname);
                $("#up_mname_v").val("").val(value.mname);
                $("#up_lname_v").val("").val(value.lname);
                $("#up_dob_v").val("").val(value.dob);
//                $("#up_" + index + "_u").val("").val(value);
                if (value.gender == "Male") {
                    $('#u_gender_m').attr('checked', true);
                    $("#u_gen_f").removeClass("active");
                    $("#u_gen_m").addClass("active");
                    $("#u_gender_v").val("").value(value.gender);
                } else if (value.gender == "Female") {
                    $('#u_gender_f').attr('checked', true);
                    $("#u_gen_m").removeClass("active");
                    $("#u_gen_f").addClass("active");
                    $("#u_gender_v").val("").val(value.gender);
                }
//                } else {
//                    $("#up_gen_m").removeClass("active");
//                    $("#up_gen_f").removeClass("active");
//                }//end if
            });
        }
    });
    $.get(server_base_url + "FetchUserAddress", {
        userId: getUserSessionElement("CurrentUserId")
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("userDemogDisplayTable", failMessage);
        } else if (data == unauthorized) {
            displayLargeErrorMessages("userDemogDisplayTable", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("userDemogDisplayTable", statusExceptionMessage);
        } else {
//            getViewUserProfileForm();//calling function to create display form
//            alert(data);
            $.each(data, function(index, value) {
//                alert(value.addresstype);
                if (value.addresstype == "PERMANENT") {
                    $("#upp_address1").val("").val(value.address1);
                    $("#upp_address2").val("").val(value.address2);
                    $("#upp_city").val("").val(value.city);
                    $("#upp_state").val("").val(value.state)
                    $("#upp_country").val("").val(value.country.toUpperCase());
                    $("#upp_postcode").val("").val(value.zipcode);
                    $("#upp_homephone").val("").val(value.homephone);
                    $("#upp_mobilephone").val("").val(value.mobilephone);
                    $("#upp_workphone").val("").val(value.workphone);
                    $("#upp_email1").val("").val(value.email1);
                    $("#upp_email2").val("").val(value.email2);
                    $("#upp_fax").val("").val(value.fax);
                } else if (value.addresstype == "HOME") {
                    $("#uph_address1").val("").val(value.address1);
                    $("#uph_address2").val("").val(value.address2);
                    $("#uph_city").val("").val(value.city);
                    $("#uph_state").val("").val(value.state)
                    $("#uph_country").val("").val(value.country.toUpperCase());
                    $("#uph_postcode").val("").val(value.zipcode);
                    $("#uph_homephone").val("").val(value.homephone);
                    $("#uph_mobilephone").val("").val(value.mobilephone);
                    $("#uph_workphone").val("").val(value.workphone);
                    $("#uph_email1").val("").val(value.email1);
                    $("#uph_email2").val("").val(value.email2);
                    $("#uph_fax").val("").val(value.fax);
                } else if (value.addresstype == "OFFICE") {
                    $("#upo_address1").val("").val(value.address1);
                    $("#upo_address2").val("").val(value.address2);
                    $("#upo_city").val("").val(value.city);
                    $("#upo_state").val("").val(value.state)
                    $("#upo_country").val("").val(value.country.toUpperCase());
                    $("#upo_postcode").val("").val(value.zipcode);
                    $("#upo_homephone").val("").val(value.homephone);
                    $("#upo_mobilephone").val("").val(value.mobilephone);
                    $("#upo_workphone").val("").val(value.workphone);
                    $("#upo_email1").val("").val(value.email1);
                    $("#upo_email2").val("").val(value.email2);
                    $("#upo_fax").val("").val(value.fax);
                }
            });

        }
    });



}//view user profile end

//update user profile code start
function updateUserProfile() {
//    getUpdateUserProfileForm();//calling function to create update form
//getViewUserProfileForm();
//    $("#userUpdateButton").click(function() {
//getting data from fields
    var fname = $("#up_fname_v").val();
    var mname = $("#up_mname_v").val();
    var lname = $("#up_lname_v").val();
    var loginid = $("#up_loginid_v").text();
    var role = $("#up_role_v").text();
    var gender = $('input[name=u_gender_u]:checked').val();
    var dob = $("#up_dob_v").val();

    //for permanent
    var homephone = $("#upp_homephone").val();
    var workphone = $("#upp_workphone").val();
    var mobilephone = $("#upp_mobilephone").val();
    var fax = $("#upp_fax").val();
    var email1 = $("#upp_email1").val();
    var email2 = $("#upp_email2").val();
    var address1 = $("#upp_address1").val();
    var address2 = $("#upp_address2").val();
    var city = $("#upp_city").val();
    var state = $("#upp_state").val();
    var country = $("#upp_country").val();
    var zipcode = $("#upp_postcode").val();
    var addresType = "PERMANENT";
//for home
    var h_homephone = $("#uph_homephone").val();
    var h_workphone = $("#uph_workphone").val();
    var h_mobilephone = $("#uph_mobilephone").val();
    var h_fax = $("#uph_fax").val();
    var h_email1 = $("#uph_email1").val();
    var h_email2 = $("#uph_email2").val();
    var h_address1 = $("#uph_address1").val();
    var h_address2 = $("#uph_address2").val();
    var h_city = $("#uph_city").val();
    var h_state = $("#uph_state").val();
    var h_country = $("#uph_country").val();
    var h_zipcode = $("#uph_postcode").val();
    var h_addresType = "HOME";
    //for office
    var o_homephone = $("#upo_homephone").val();
    var o_workphone = $("#upo_workphone").val();
    var o_mobilephone = $("#upo_mobilephone").val();
    var o_fax = $("#upo_fax").val();
    var o_email1 = $("#upo_email1").val();
    var o_email2 = $("#upo_email2").val();
    var o_address1 = $("#upo_address1").val();
    var o_address2 = $("#upo_address2").val();
    var o_city = $("#upo_city").val();
    var o_state = $("#upo_state").val();
    var o_country = $("#upo_country").val();
    var o_zipcode = $("#upo_postcode").val();
    var o_addresType = "OFFICE";


    var userAddressJson = "";

    var userDetailJson = "";
    if (fname != null || fname != undefined) {
        userDetailJson = userDetailJson + "\"fname\":\"" + fname + "\",";
    }
    if (mname != null || mname != undefined) {
        userDetailJson = userDetailJson + "\"mname\":\"" + mname + "\",";
    }
    if (lname != null || lname != undefined) {
        userDetailJson = userDetailJson + "\"lname\":\"" + lname + "\",";
    }
    if (gender != null || gender != undefined) {
        userDetailJson = userDetailJson + "\"gender\":\"" + gender + "\",";
    }
    if (dob != null || dob != undefined) {
        userDetailJson = userDetailJson + "\"dob\":\"" + dob + "\",";
    }



    var userPermanentAddressJson = "";
    if (homephone != null || homephone != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"homephone\":\"" + homephone + "\",";
    }
    if (workphone != null || workphone != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"workphone\":\"" + workphone + "\",";
    }
    if (mobilephone != null || mobilephone != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"mobilephone\":\"" + mobilephone + "\",";
    }
    if (fax != null || fax != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"fax\":\"" + fax + "\",";
    }
    if (email1 != null || email1 != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"email1\":\"" + email1 + "\",";
    }
    if (email2 != null || email2 != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"email2\":\"" + email2 + "\",";
    }
    if (address1 != null || address1 != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"address1\":\"" + address1 + "\",";
    }
    if (address2 != null || address2 != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"address2\":\"" + address2 + "\",";
    }
    if (city != null || city != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"city\":\"" + city + "\",";
    }
    if (state != null || state != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"state\":\"" + state + "\",";
    }
    if (country != null || country != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"country\":\"" + country + "\",";
    }
    if (zipcode != null || zipcode != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"zipcode\":\"" + zipcode + "\",";
    }
    if (addresType != null || addresType != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"addresstype\":\"" + addresType + "\"";
    }

    //for home
    var userHomeAddressJson = "";
    if (h_homephone != null || h_homephone != undefined) {
        userHomeAddressJson = userHomeAddressJson + "\"homephone\":\"" + h_homephone + "\",";
    }
    if (h_workphone != null || h_workphone != undefined) {
        userHomeAddressJson = userHomeAddressJson + "\"workphone\":\"" + h_workphone + "\",";
    }
    if (h_mobilephone != null || h_mobilephone != undefined) {
        userHomeAddressJson = userHomeAddressJson + "\"mobilephone\":\"" + h_mobilephone + "\",";
    }
    if (h_fax != null || h_fax != undefined) {
        userHomeAddressJson = userHomeAddressJson + "\"fax\":\"" + h_fax + "\",";
    }
    if (h_email1 != null || h_email1 != undefined) {
        userHomeAddressJson = userHomeAddressJson + "\"email1\":\"" + h_email1 + "\",";
    }
    if (h_email2 != null || h_email2 != undefined) {
        userHomeAddressJson = userHomeAddressJson + "\"email2\":\"" + h_email2 + "\",";
    }
    if (h_address1 != null || h_address1 != undefined) {
        userHomeAddressJson = userHomeAddressJson + "\"address1\":\"" + h_address1 + "\",";
    }
    if (h_address2 != null || h_address2 != undefined) {
        userHomeAddressJson = userHomeAddressJson + "\"address2\":\"" + h_address2 + "\",";
    }
    if (h_city != null || h_city != undefined) {
        userHomeAddressJson = userHomeAddressJson + "\"city\":\"" + h_city + "\",";
    }
    if (h_state != null || h_state != undefined) {
        userHomeAddressJson = userHomeAddressJson + "\"state\":\"" + h_state + "\",";
    }
    if (h_country != null || h_country != undefined) {
        userHomeAddressJson = userHomeAddressJson + "\"country\":\"" + h_country + "\",";
    }
    if (h_zipcode != null || h_zipcode != undefined) {
        userHomeAddressJson = userHomeAddressJson + "\"zipcode\":\"" + h_zipcode + "\",";
    }
    if (h_addresType != null || h_addresType != undefined) {
        userHomeAddressJson = userHomeAddressJson + "\"addresstype\":\"" + h_addresType + "\"";
    }
    //for office
    var userOfficeAddressJson = "";
    if (o_homephone != null || o_homephone != undefined) {
        userOfficeAddressJson = userOfficeAddressJson + "\"homephone\":\"" + o_homephone + "\",";
    }
    if (o_workphone != null || o_workphone != undefined) {
        userOfficeAddressJson = userOfficeAddressJson + "\"workphone\":\"" + o_workphone + "\",";
    }
    if (o_mobilephone != null || o_mobilephone != undefined) {
        userOfficeAddressJson = userOfficeAddressJson + "\"mobilephone\":\"" + o_mobilephone + "\",";
    }
    if (o_fax != null || o_fax != undefined) {
        userOfficeAddressJson = userOfficeAddressJson + "\"fax\":\"" + o_fax + "\",";
    }
    if (o_email1 != null || o_email1 != undefined) {
        userOfficeAddressJson = userOfficeAddressJson + "\"email1\":\"" + o_email1 + "\",";
    }
    if (o_email2 != null || o_email2 != undefined) {
        userOfficeAddressJson = userOfficeAddressJson + "\"email2\":\"" + o_email2 + "\",";
    }
    if (o_address1 != null || o_address1 != undefined) {
        userOfficeAddressJson = userOfficeAddressJson + "\"address1\":\"" + o_address1 + "\",";
    }
    if (o_address2 != null || o_address2 != undefined) {
        userOfficeAddressJson = userOfficeAddressJson + "\"address2\":\"" + o_address2 + "\",";
    }
    if (o_city != null || o_city != undefined) {
        userOfficeAddressJson = userOfficeAddressJson + "\"city\":\"" + o_city + "\",";
    }
    if (o_state != null || o_state != undefined) {
        userOfficeAddressJson = userOfficeAddressJson + "\"state\":\"" + o_state + "\",";
    }
    if (o_country != null || o_country != undefined) {
        userOfficeAddressJson = userOfficeAddressJson + "\"country\":\"" + o_country + "\",";
    }
    if (o_zipcode != null || o_zipcode != undefined) {
        userOfficeAddressJson = userOfficeAddressJson + "\"zipcode\":\"" + o_zipcode + "\",";
    }
    if (o_addresType != null || o_addresType != undefined) {
        userOfficeAddressJson = userOfficeAddressJson + "\"addresstype\":\"" + o_addresType + "\"";
    }
    userAddressJson = "[{" + userPermanentAddressJson + "},{" + userHomeAddressJson + "},{" + userOfficeAddressJson + "}]";
//    alert(userAddressJson);


    //    userDetailJson = userDetailJson + "\"address\":[{" + userAddressJson + "}]";
    userDetailJson = userDetailJson.substring(0, userDetailJson.length - 1);
    userDetailJson = "{" + userDetailJson + "}";

//    alert(fname + " " + mname + " " + lname + " " + loginid + " " + dob + " " + role + "" + gender);
//        var education = $("#u_education_u").val();
//        var email1 = $("#u_email1_u").val();
//        var email2 = $("#u_email2_u").val();
//        var address1 = $("#u_address1_u").val();
//        var address2 = $("#u_address2_u").val();
//        var city = $("#u_city_u").val();
//        var state = $("#u_state_u").val();
//        var country = $("#u_country_u").val();
//        var zipcode = $("#u_zipcode_u").val();
//        var fax = $("#u_fax_u").val();
//        var homephone = $("#u_homephone_u").val();
//        var workphone = $("#u_workphone_u").val();
//        var mobilephone = $("#u_mobilephone_u").val();

//    alert(userAddressJson);

//alert(userDetailJson);
//alert(userPermanentAddressJson);
//alert(userHomeAddressJson);
//alert(userOfficeAddressJson);

//    $.get(server_base_url + "UpdateUserProfile", {
    $.get(server_base_url + "UpdateUser", {
        userDetails: userDetailJson,
        userAdress: userAddressJson,
        userId: sessionStorage.getItem("CurrentUserId")
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("updateBeforeSuccessMsg", failMessage);
            displayLargeErrorMessages("updateAfterSuccessMsg", failMessage);
        } else if (data == unauthorized) {
            displayLargeErrorMessages("updateBeforeSuccessMsg", unauthorizedMessage);
            displayLargeErrorMessages("updateAfterSuccessMsg", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("updateBeforeSuccessMsg", statusExceptionMessage);
            displayLargeErrorMessages("updateAfterSuccessMsg", statusExceptionMessage);
        } else {
            $("#userUpdateButton").hide();
            displayLargeSuccessMessages("updateBeforeSuccessMsg", successMessage);
            displayLargeSuccessMessages("updateAfterSuccessMsg", successMessage);
            $("#u_gen_m").attr("disabled", true);
            $("#u_gen_f").attr("disabled", true);
            $("input[type='text']").attr('readonly', true);
            $("select").attr('disabled', true);

            sessionStorage.setItem("FullName", data.fname);//for fname
            sessionStorage.setItem("LastName", data.lname);//for lname    
//            $("#upaccordion1").text("").append("<center><button id='updateProfileUserButton' class='btn btn-primary' onclick='updateUserProfile()' >Update Profile</button></center>");
            $("#upaccordion1").text("").append("<br/><center><button id='editUserButton' class='btn btn-primary' onclick='editUserProfile()' >Edit Profile</button></center>");
            viewUserProfile().reload();
        }
    });//servlet end
//        }
//    });
}//update user profile code end  

//update user profile code keypress start
function updateUserProfile_keypress(event) {
    if ($("#u_fname_u").val() != "") {
        $("#u_fname_u").val(capitalize($("#u_fname_u").val()));
        if (!$("#u_fname_u").val().match((cityExpression()))) {
            $("#u_fname_error").addClass("has-error");
            $("#u_fname_u").focus();
            $("#u_fname_msg").text("").append("<span class='smallErrorMsg'>Please enter valid first name.</span>");
            return false;
        }
        $("#u_fname_error").removeClass("has-error");
        $("#u_fname_msg").text("");
    }

    if ($("#u_mname_u").val() != "") {
        $("#u_mname_u").val(capitalize($("#u_mname_u").val()));
        if (!$("#u_mname_u").val().match((cityExpression()))) {
            $("#u_mname_error").addClass("has-error");
            $("#u_mname_u").focus();
            $("#u_mname_msg").text("").append("<span class='smallErrorMsg'>Please enter valid middle name.</span>");
            return false;
        }
        $("#u_mname_error").removeClass("has-error");
        $("#u_mname_msg").text("");
    }

    if ($("#u_lname_u").val() != "") {
        $("#u_lname_u").val(capitalize($("#u_lname_u").val()));
        if (!$("#u_lname_u").val().match((cityExpression()))) {
            $("#u_lname_error").addClass("has-error");
            $("#u_lname_u").focus();
            $("#u_lname_msg").text("").append("<span class='smallErrorMsg'>Please enter valid last name.</span>");
            return false;
        }
        $("#u_lname_error").removeClass("has-error");
        $("#u_lname_msg").text("");
    }
    if ($("#u_dob_u").val() != "" && validateDate($("#u_dob_u").val()) != true) {
        $("#u_dob_error").addClass("has-error");
        $("#u_dob_msg").text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
        return false;
    } else {
        $("#u_dob_error").removeClass("has-error");
        $("#u_dob_msg").text("");
    }


    if ($("#u_email1_u").val() != "") {
        if (!$("#u_email1_u").val().match((ValidateEmail()))) {
            $("#u_email1_error").addClass("has-error");
            $("#u_email1_u").focus();
            $("#u_email1_msg").text("").append("<span class='smallErrorMsg'>Invalid email address.</span>");
        }
        $("#u_email1_error").removeClass("has-error");
        $("#u_email1_msg").text("");
    }

    if ($("#u_address1_u").val() != "") {
        $("#u_address1_error").removeClass("has-error");
        $("#u_address1_msg").text("")
    }

    if ($("#u_city_u").val() != "") {
        $("#u_city_u").val(capitalize($("#u_city_u").val()));
        if (!$("#u_city_u").val().match((cityExpression()))) {
            $("#u_city_error").addClass("has-error");
            $("#u_city_u").focus();
            $("#u_city_msg").text("").append("<span class='smallErrorMsg'>Please enter valid city.</span>");
            return false;
        }
        $("#u_city_error").removeClass("has-error");
        $("#u_city_msg").text("");
    }

    if ($("#u_state_u").val() != "") {
        $("#u_state_error").removeClass("has-error");
        $("#u_state_msg").text("");
    }

    if ($("#u_zipcode_u").val() != "") {
        $("#u_zipcode_error").removeClass("has-error");
        $("#u_zipcode_msg").text("");
    }

    if ($("#u_mobilephone_u").val() != "") {
        $("#u_mobilephone_error").removeClass("has-error");
        $("#u_mobilephone_msg").text("");
    }

    $("#updateBeforeSuccessMsg").text("");
    $("#updateAfterSuccessMsg").text("");
    if (event.which == 13) {
        $("#userUpdateButton").click();
        return false;
    }
}//update user profile code keypress end

//change user password
function changeUserPassword() {
    getChangeUserPasswordForm();
    $("#change_pass_btn").click(function() {
        var getOldPassword = $("#old_pass").val();
        var getNewPassword = $("#new_pass").val();
        var getConfirmPassword = $("#cnf_pass").val();
//        alert(getOldPassword+""+getNewPassword+""+getConfirmPassword);
        if (getOldPassword == "") {
            $("#old_pass_error").addClass("has-error");
            $("#old_pass_msg").text("").append("<span class='smallErrorMsg'>Old password required</span>");
            $("#old_pass").focus();
        } else if (getOldPassword.match(spaceExpression())) {
            $("#old_pass_error").addClass("has-error");
            $("#old_pass_msg").text("").append("<span class='smallErrorMsg'>Spaces not allowed</span>");
            $("#old_pass").val("").focus();
            return false;
        }
        if (getNewPassword == "") {
            $("#new_pass_error").addClass("has-error");
            $("#new_pass_msg").text("").append("<span class='smallErrorMsg'>New password required</span>");
            $("#new_pass").focus();
        } else if (getNewPassword.match(spaceExpression())) {
            $("#new_pass_error").addClass("has-error");
            $("#new_pass_msg").text("").append("<span class='smallErrorMsg'>Spaces not allowed</span>");
            $("#new_pass").val("").focus();
            return false;
        } else if (!getNewPassword.match(passwordExpression())) {
            $("#new_pass_error").addClass("has-error");
            $("#new_pass_msg").text("").append("<span class='smallErrorMsg'>Please enter a password between 6-16 characters with 1 special character, 1 capital letter and 1 number, it should not contain any spaces.</span>");
            $("#new_pass").val("").focus();
            return false;
        }
        if (getConfirmPassword == "") {
            $("#cnf_pass_error").addClass("has-error");
            $("#cnf_pass_msg").text("").append("<span class='smallErrorMsg'>Confirm password required</span>");
            $("#cnf_pass").focus();
        } else if (getConfirmPassword.match(spaceExpression())) {
            $("#cnf_pass_error").addClass("has-error");
            $("#cnf_pass_msg").text("").append("<span class='smallErrorMsg'>Spaces not allowed</span>");
            $("#cnf_pass").val("").focus();
            return false;
        } else if (getNewPassword != getConfirmPassword) {
            $("#cnf_pass_error").addClass("has-error");
            $("#cnf_pass_msg").text("").append("<span class='smallErrorMsg'>Password and Confirm Password must be same</span>");
            $("#cnf_pass").val("").focus();
            return false;
        }
        if (getOldPassword == "" || getNewPassword == "" || getConfirmPassword == "") {
            $("#changeAfterSuccessMsg").text("").prepend("<span id='updMsg' class='largeErrorMsg'>Please fill all * marked fields.</span>");
            return false;
        } else {
            $.get(server_base_url + "ChangePassword", {
                oldpass: getOldPassword,
                newpass: getNewPassword
            }).done(function(data) {
                if (data == success) {
                    $("#change_pass_btn").hide();
                    displayLargeSuccessMessages("changeAfterSuccessMsg", "Password changed successfully.");
                    $("input[type='password']").attr('readonly', true);
                    $("input[type='password']").val("");
                    setTimeout(function() {
                        sessionStorage.clear();
                        location.href = "index.jsp";
                    }, 3000);
                } else if (data == fail) {
                    displayLargeErrorMessages("changeAfterSuccessMsg", failMessage);
                    $("#old_pass").val("").focus();
                } else if (data == unauthorized) {
                    displayLargeErrorMessages("changeAfterSuccessMsg", unauthorizedMessage);
                } else if (data == invalidSession) {
                    callSessionTimeout();
                } else if (data == statusException) {
                    displayLargeErrorMessages("changeAfterSuccessMsg", statusExceptionMessage);
                }
            });
        }
    });
}

//change user password keypress
function change_pass(event) {
    if ($("#old_pass").val() != "") {
        $("#old_pass_error").removeClass("has-error");
        $("#old_pass_msg").text("");
    }
    if ($("#new_pass").val() != "") {
        $("#new_pass_error").removeClass("has-error");
        $("#new_pass_msg").text("");
    }
    if ($("#cnf_pass").val() != "") {
        $("#cnf_pass_error").removeClass("has-error");
        $("#cnf_pass_msg").text("");
    }
    $("#changeAfterSuccessMsg").text("");
    if (event.which == 13) {
        $('#change_pass_btn').click();
        return false;
    }
}//change password end

//change user password keypress
function changePinKeyup(event) {
    if ($("#u_resumePin_u").val() != "") {
        $("#u_resumePin_error").removeClass("has-error");
        $("#u_resumePin_msg").text("");
    }
    if (event.which == 13) {
        $('#change_pin_btn').click();
        return false;
    }
}//change password end

function editUserProfile() {
    $("input[type='text']").attr('disabled', false);
    $("select").attr('disabled', false);
    $("input[type='email']").attr('disabled', false);
    $("#editUserButton").remove();
    $("#upaccordion1").append("<center><button id='updateProfileUserButton' class='btn btn-primary' onclick='updateUserProfile()' >Update Profile</button></center>");
    $("#u_gen_f").attr('disabled', false);
    $("#u_gen_m").attr('disabled', false);
}