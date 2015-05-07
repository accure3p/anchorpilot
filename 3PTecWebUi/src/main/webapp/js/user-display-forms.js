//for register new user start
function addNewUser() {
//    addHover("add3PtecUserManagementMenu");
    $("#userManagement").text("").append("<div id='addingUser' />");
    $("#addingUser").append("<div id='mainTabMenu' class='col-md-13'  />");
    $("#mainTabMenu").append("<ul id='allUserMenuTab' class='nav nav-tabs nav-success' />");

    if (checkUserPrivelege("ViewUsers") == true) {
        $("#allUserMenuTab").append("<li id='viewEditUserTabId' class='active'><a href='#viewUserDataField' data-toggle='tab'><strong>View user</strong></a></li>");
    }
    if (checkUserPrivelege("RegisterUser") == true) {
        $("#allUserMenuTab").append("<li id='addNewUserTabId' class=''><a href='#addNewUser' data-toggle='tab'><strong>Add user</strong></a></li>");
    }
    $("#viewEditUserTabId").click(function() {
        viewUserTable();
    });
    $("#mainTabMenu").append("<div id='mainTabMenuDiv' class='tab-content tab-content-primary mb30' />");
    $("#mainTabMenuDiv").append("<div class='tab-pane active' id='viewUserDataField' ><div id='OrgData1'></div></div>");
    viewUserTable();
    $("#mainTabMenuDiv").append("<div class='tab-pane' id='addNewUser' ><div id='OrgData1'></div></div>");
//    addNewUserTab();//for add new user tab
    getRoleInfo();

}//for register new user end

function  viewUserTable() {
    $.post(server_base_url + "FetchUser", {
        orgId: getUserSessionElement("OrgId")
    }).done(function(data) {
//        alert(data);
        if (data == fail) {
            displayLargeErrorMessages("userInsertionStatus", failMessage);
            displayLargeErrorMessages("userMessage", failMessage);
        } else if (data == unauthorized) {
            displayLargeErrorMessages("userInsertionStatus", unauthorizedMessage);
            displayLargeErrorMessages("userMessage", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            if (data == null) {
                alert("no data");
            } else {
                $("#viewUserDataField").text("").append("<div class='form-group' id='viewUserDataTableMainId' />");
                $("#viewUserDataTableMainId").append("<div id = 'viewUserDataSubDiv' class = 'panel panel-primary-head' />");
                $("#viewUserDataSubDiv").append("<table id='viewUserDataTable' class='table table-striped table-bordered'>");
                $("#viewUserDataTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i>Name</th><th style='min-width:10%;width:auto;'><i class='glyphicon glyphicon-user'></i>User name</th><th style='min-width:15%;width:auto;'>Gender</th><th style='min-width:15%;width:auto;'><i class='fa fa-mobile'></i>Role</th><th style='min-width:18%;width:18%;'>Update/Delete</th></tr></thead>");
                $("#viewUserDataTable").append("<tbody id='viewUserDataTableBody' />");
                $.each(data, function(index, value) {
                    $("#viewUserDataTableBody").append("<tr><td>" + value.fname + " " + value.mname + " " + value.lname + "</td><td>" + value.loginid + "</td><td>" + value.gender + "</td><td>" + value.roles + "</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;cursor:pointer;' onclick=updateUser('" + value._id.$oid + "')></span><span class='fa fa-trash-o' style='margin-left:15%;'></span></td></tr>");
                });
                var shTable = jQuery('#viewUserDataTable').DataTable({
                    "fnDrawCallback": function(oSettings) {
                        jQuery('#viewUserDataTable ul').addClass('pagination-active-dark');
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

function updateUser(userId) {
//    getUpdateUserProfileForm();
    getUpdateUserForm();
    $.post(server_base_url + "FetchUserById", {
        userId: userId
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("userInsertionStatus", failMessage);
            displayLargeErrorMessages("userMessage", failMessage);
        } else if (data == unauthorized) {
            displayLargeErrorMessages("userInsertionStatus", unauthorizedMessage);
            displayLargeErrorMessages("userMessage", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            $.each(data, function(index, value) {
                $("#u_userId_u").text("").val(value._id.$oid);
                $.each(value, function(index, value) {
                    $("#u_" + index + "_u").val(value);

                    if (index == "gender") {
                        if (value == "Male") {
                            $('input[name=u_gender_u]').val([value]);
                            $("#u_gen_f").removeClass("active");
                            $("#u_gen_m").addClass("active");
                        } else if (value == "Female") {
                            $('input[name=u_gender_u]').val([value]);
                            $("#u_gen_m").removeClass("active");
                            $("#u_gen_f").addClass("active");
                        } else {
                            $("#u_gen_m").removeClass("active");
                            $("#u_gen_f").removeClass("active");
                        }//end if
                    }
                });
            });
        }
    });

    $.post(server_base_url + "FetchUserAddress", {
        userId: userId
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("userInsertionStatus", failMessage);
            displayLargeErrorMessages("userMessage", failMessage);
        } else if (data == unauthorized) {
            displayLargeErrorMessages("userInsertionStatus", unauthorizedMessage);
            displayLargeErrorMessages("userMessage", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            $.each(data, function(index, value) {
                var addresstype1 = value.addresstype;
                if (addresstype1 == "PERMANENT") {
                    $("#p_address1_u").val("").val(value.address1);
                    $("#p_address2_u").val("").val(value.address2);
                    $("#p_city_u").val("").val(value.city);
                    $("#p_state_u").val("").val(value.state)
                    $("#p_country_u").val("").val(value.country.toUpperCase());
                    $("#p_postcode_u").val("").val(value.zipcode);
                    $("#p_homephone_u").val("").val(value.homephone);
                    $("#p_mobilephone_u").val("").val(value.mobilephone);
                    $("#p_workphone_u").val("").val(value.workphone);
                    $("#p_email1_u").val("").val(value.email1);
                    $("#p_email2_u").val("").val(value.email2);
                    $("#p_fax_u").val("").val(value.fax);
                } else if (addresstype1 == "HOME") {
                    $("#h_address1_u").val("").val(value.address1);
                    $("#h_address2_u").val("").val(value.address2);
                    $("#h_city_u").val("").val(value.city);
                    $("#h_state_u").val("").val(value.state)
                    $("#h_country_u").val("").val(value.country.toUpperCase());
                    $("#h_postcode_u").val("").val(value.zipcode);
                    $("#h_homephone_u").val("").val(value.homephone);
                    $("#h_mobilephone_u").val("").val(value.mobilephone);
                    $("#h_workphone_u").val("").val(value.workphone);
                    $("#h_email1_u").val("").val(value.email1);
                    $("#h_email2_u").val("").val(value.email2);
                    $("#h_fax_u").val("").val(value.fax);
                } else if (addresstype1 == "OFFICE") {
                    $("#o_address1_u").val("").val(value.address1);
                    $("#o_address2_u").val("").val(value.address2);
                    $("#o_city_u").val("").val(value.city);
                    $("#o_state_u").val("").val(value.state)
                    $("#o_country_u").val("").val(value.country.toUpperCase());
                    $("#o_postcode_u").val("").val(value.zipcode);
                    $("#o_homephone_u").val("").val(value.homephone);
                    $("#o_mobilephone_u").val("").val(value.mobilephone);
                    $("#o_workphone_u").val("").val(value.workphone);
                    $("#o_email1_u").val("").val(value.email1);
                    $("#o_email2_u").val("").val(value.email2);
                    $("#o_fax_u").val("").val(value.fax);
                }
            });
        }
    });
}
p_fax_u

//for user profile view
function myProfile() {
    $("#dashboard-body").text("").append("<div id='viewProfileMainDiv' />");
    $("#viewProfileMainDiv").append("<div id='mainProfileTabMenu' class='col-md-6' style='min-width:65%;max-width:100%;' />");
    $("#mainProfileTabMenu").append("<ul id='allProfileMenuTab' class='nav nav-tabs nav-justified nav-metro nav-success' />");
//    $("#allProfileMenuTab").append("<li class='active' id='viewProfileMenu'><a href='#viewFieldsDiv' data-toggle='tab'><strong>View profile</strong></a></li>");
    $("#allProfileMenuTab").append("<li class='active' id='updateProfileMenu'><a href='#viewFieldsDiv' data-toggle='tab'><strong>View profile</strong></a></li>");
    $("#allProfileMenuTab").append("<li class='' id='changePasswordmenu'><a href='#changePasswordDiv' data-toggle='tab'><strong>Change password</strong></a></li>");
//    $("#allProfileMenuTab").append("<li class='' id='changePinMenu'><a href='#changePinDiv' data-toggle='tab'><strong>Change PIN</strong></a></li>");
    $("#mainProfileTabMenu").append("<div id='mainProfileTabMenuDiv' class='tab-content tab-content-success mb30' />");

    viewUserProfile();//for view user profile tab
    changeUserPassword();//for change user password tab
    $("#updateProfileMenu").click(function() {
        $("#updateBeforeSuccessMsg").text("");
        $("#updateAfterSuccessMsg").text("");
        $("#userUpdateButton").show();
        $("#u_gen_m").attr("disabled", true);
        $("#u_gen_f").attr("disabled", true);
        $("input[type='text']").attr('disabled', true);
        $("input[type='email']").attr('disabled', true);
        $("select").attr('disabled', true);
        $("input[type='email']").attr('disabled', true);
    });
    $("#changePasswordmenu").click(function() {
        $("#changeAfterSuccessMsg").text("");
    });
    $("#changePinMenu").click(function() {
        $("#changePinAfterSuccessMsg").text("");
        $("#u_resumePin_u").attr('readonly', false);
        $("#change_pin_btn").show();
    });
}


//view user profile form start
function getViewUserProfileForm() {
    $("#mainProfileTabMenuDiv").append("<div id='viewFieldsDiv' class='tab-pane active' />");
//table starts
    $("#viewFieldsDiv").text("").append("<table id='userDemogDisplayTable' class='table table-striped table-bordered responsive no-footer' role='grid' aria-describedby='basicTable_info' />");
    $("#userDemogDisplayTable").append("<tbody id='userDemogDisplayTableBody' />");
    $("#userDemogDisplayTableBody").append("<tr><td>Username</td><td id='up_loginid_v'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td>Role</td><td id='up_role_v'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td style='width:30%;'>First name</td><td ><input type='text' id='up_fname_v' style='text-transform: capitalize;' class='form-control' placeholder='First Name' onkeyup='patientreg_keypress(event)'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td>Middle name</td><td ><input type='text' id='up_mname_v' style='text-transform: capitalize;' class='form-control' placeholder='Middle Name' onkeyup='patientreg_keypress(event)'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td>Last name</td><td ><input type='text' id='up_lname_v' style='text-transform: capitalize;' class='form-control' placeholder='Last Name' onkeyup='patientreg_keypress(event)'></td></tr>");
//    $("#userDemogDisplayTableBody").append("<tr><td>Gender</td><td id='up_gender_v'></td></tr>");
    $("#userDemogDisplayTableBody").append("<tr><td><label class='control-label'>Gender</label></td><td><div id='u_genderButtonDiv' class='btn-group' data-toggle='buttons' /></td></tr>");
    $("#u_genderButtonDiv").append("<label class='btn blue btn-default' style='border-radius: 3px; font-weight: 600;' id='u_gen_m'><input type='radio' id='u_gender_m' name='u_gender_u' value='Male' />Male</label><label class='btn blue btn-default' style='margin-left: 15px; border-radius: 3px; font-weight: 600;' id='u_gen_f'><input type='radio' id='u_gender_f' name='u_gender_u' value='Female' />Female</label>");

    $("#userDemogDisplayTableBody").append("<tr><td>Date of Birth</td><td ><input type='text' id='up_dob_v' style='text-transform: capitalize;' class='form-control' placeholder='DOB' ></td></tr>");
    jQuery("#up_dob_v").mask("99/99/9999");
    jQuery("#up_dob_v").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1950:2020',
        maxDate: new Date,
        minDate: new Date(1900, 0, 1),
        dateFormat: dateformate
    });

    //accordion fr user profile.
    $("#viewFieldsDiv").append("<div class='panel-group' id='upaccordion1' />");
    $("#upaccordion1").text("").append("<div id='uppermanentAddr' class='panel panel-primary' />");

    $("#uppermanentAddr").append("<div id='upfirstPanelHeading' class='panel-heading'/>");
    $("#upfirstPanelHeading").append("<h4 id='upfirstHeader' class='panel-title' />");
    $("#upfirstHeader").append("<a data-toggle='collapse' style='font-weight:bold;font-size:15px;' data-parent='#upaccordion1' href='#upcollapseOne1'><center>Permanent Address</center></a>");

    $("#uppermanentAddr").append("<div id='upcollapseOne1' class='panel-collapse collapse in' />");
    $("#upcollapseOne1").append("<div id='upppanelMainBody' class = 'panel-body' />");
    $("#upppanelMainBody").append("<div id='upppanelRow' class='row' />");

    $("#upppanelRow").append("<center><span id='uppregsuccessBefore'></span></center>");

//for first row

    $("#upppanelRow").append("<div id='uppaddr1FieldGroup' class='form-group' />");
    $("#uppaddr1FieldGroup").append("<label class='col-sm-3 control-label'>Address line1<span class='asterisk'> *</span></label>");
    $("#uppaddr1FieldGroup").append("<div id='uppaddr1FieldDiv' class='col-sm-9' />");
    $("#uppaddr1FieldDiv").append("<input type='text' id='upp_address1' style='text-transform: capitalize;' class='form-control' placeholder='Address line1' onkeyup='patientreg_keypress(event)'>");
    $("#uppaddr1FieldDiv").append("<span id='uppadd1'></span>");

    $("#upppanelRow").append("<div id='uppaddr2FieldGroup' class='form-group' />");
    $("#uppaddr2FieldGroup").append("<label class='col-sm-3 control-label'>Address line2</label>");
    $("#uppaddr2FieldGroup").append("<div id='uppaddr2FieldDiv' class='col-sm-9' />");
    $("#uppaddr2FieldDiv").append("<input type='text' id='upp_address2' style='text-transform: capitalize;' class='form-control' placeholder='Address line2' onkeyup='patientreg_keypress(event)'>");

    $("#upppanelRow").append("<div id='uppcityFieldGroup' class='form-group' />");
    $("#uppcityFieldGroup").append("<label class='col-sm-3 control-label'>City<span class='asterisk'> *</span></label>");
    $("#uppcityFieldGroup").append("<div id='uppcityFieldDiv' class='col-sm-9' />");
    $("#uppcityFieldDiv").append("<input type='text' id='upp_city' style='text-transform: capitalize;' class='form-control' placeholder='City' onkeyup='patientreg_keypress(event)'>");
    $("#uppcityFieldDiv").append("<span id='uppcity'></span>");

    $("#upppanelRow").append("<div id='uppstateFieldGroup' class='form-group' />");
    $("#uppstateFieldGroup").append("<label class='col-sm-3 control-label'>State<span class='asterisk'> *</span></label>");
    $("#uppstateFieldGroup").append("<div id='uppstateFieldDiv' class='col-sm-9' />");
    $("#uppstateFieldDiv").append("<select id='upp_state' class='form-control' onchange='patientreg_keypress(event)' />");
    $("#upp_state").append("<option value=''>Choose One</option><option>Andaman and Nicobar Islands</option><option>Andhra Pradesh</option><option>Arunachal Pradesh</option><option>Assam</option><option>Bihar</option><option>Chandigarh</option><option>Chhattisgarh</option><option>Dadra and Nagar Haveli</option><option>Daman and Diu</option><option>Delhi</option><option>Goa</option><option>Gujarat</option><option>Haryana</option><option>Himachal Pradesh</option><option>Jammu and Kashmir</option><option>Jharkhand</option><option>Karnataka</option><option>Kerala</option><option>Lakshadweep</option><option>Madhya Pradesh</option><option>Maharashtra</option><option>Manipur</option><option>Meghalaya</option><option>Mizoram</option><option>Nagaland</option><option>Orissa</option><option>Pondicherry</option><option>Punjab</option><option>Rajasthan</option><option>Sikkim</option><option>Tamil Nadu</option><option>Telangana</option><option>Tripura</option><option>Uttaranchal</option><option>Uttar Pradesh</option><option>West Bengal</option>");
//<option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option><option>California</option><option>Colorado</option><option>Connecticut</option><option>D.C.</option><option>Delaware</option><option>Florida</option><option>Georgia</option><option>Hawaii</option><option>Idaho</option><option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option><option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option><option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option><option>Missouri</option><option>Montana</option><option>Nebraska</option><option>Nevada</option><option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option><option>New York</option><option>North Carolina</option><option>North Dakota</option><option>Ohio</option><option>Oklahoma</option><option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option><option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option><option>Vermont</option><option>Virginia</option><option>Washington</option><option>West Virginia</option><option>Wisconsin</option><option>Wyoming</option>\n\
    $("#uppstateFieldDiv").append("<span id='uppstate'></span>");

    $("#upppanelRow").append("<div id='uppcountryFieldGroup' class='form-group' />");
    $("#uppcountryFieldGroup").append("<label class='col-sm-3 control-label'>Country</label>");
    $("#uppcountryFieldGroup").append("<div id='uppcountryFieldDiv' class='col-sm-9' />");
    $("#uppcountryFieldDiv").append("<select id='upp_country' class='form-control' />");
    $("#upp_country").append("<option>INDIA</option>");
    $("#uppcountryFieldDiv").append("<span id='uppcountry'></span>");

    $("#upppanelRow").append("<div id='uppcodeFieldGroup' class='form-group' />");
    $("#uppcodeFieldGroup").append("<label class='col-sm-3 control-label'>Zip</label>");
    $("#uppcodeFieldGroup").append("<div id='uppcodeFieldDiv' class='col-sm-9' />");
    $("#uppcodeFieldDiv").append("<input type='text' id='upp_postcode' class='form-control' placeholder='Zip' onkeyup='patientreg_keypress(event)'>");
    $("#uppcodeFieldDiv").append("<span id='upppostcode'></span>");
    $('#p_postcode').mask('999999');

    $("#upppanelRow").append("<div id='upphphoneFieldGroup' class='form-group' />");
    $("#upphphoneFieldGroup").append("<label class='col-sm-3 control-label'>Home Phone<span class='asterisk'> *</span></label>");
    $("#upphphoneFieldGroup").append("<div id='upphphoneFieldDiv' class='col-sm-9' />");
    $("#upphphoneFieldDiv").append("<input type='text' id='upp_homephone' size=15 maxLength=15 class='form-control' placeholder='Home Phone' onkeyup='patientreg_keypress(event)'>");
    $("#upphphoneFieldDiv").append("<span id='uppphone'></span>");
//        jQuery("#preg_homephone").mask("9999999999");
    //jQuery("#preg_homephone").mask("99999999")

    $("#upppanelRow").append("<div id='uppmphoneFieldGroup' class='form-group' />");
    $("#uppmphoneFieldGroup").append("<label class='col-sm-3 control-label'>Mobile Phone<span class='asterisk'> *</span></label>");
    $("#uppmphoneFieldGroup").append("<div id='uppmphoneFieldDiv' class='col-sm-9' />");
    $("#uppmphoneFieldDiv").append("<input type='text' id='upp_mobilephone' size=15 maxLength=15 class='form-control' placeholder='Mobile Phone' onkeyup='patientreg_keypress(event)'>");
    $("#uppmphoneFieldDiv").append("<span id='uppmphone'></span>");

    $("#upppanelRow").append("<div id='uppwphoneFieldGroup' class='form-group' />");
    $("#uppwphoneFieldGroup").append("<label class='col-sm-3 control-label'>Office Phone<span class='asterisk'> *</span></label>");
    $("#uppwphoneFieldGroup").append("<div id='uppwphoneFieldDiv' class='col-sm-9' />");
    $("#uppwphoneFieldDiv").append("<input type='text' id='upp_workphone' size=15 maxLength=15 class='form-control' placeholder='Office Phone' onkeyup='patientreg_keypress(event)'>");
    $("#uppwphoneFieldDiv").append("<span id='uppwphone'></span>");


    $("#upppanelRow").append("<div id='uppemailFieldGroup1' class='form-group' />");
    $("#uppemailFieldGroup1").append("<label class='col-sm-3 control-label'>Email1 </label>");
    $("#uppemailFieldGroup1").append("<div id='uppemailFieldDiv1' class='col-sm-9' />");
    $("#uppemailFieldDiv1").append("<input type='email' id='upp_email1' class='form-control' placeholder='Email1' onkeyup='patientreg_keypress(event)'>");
    $("#uppemailFieldDiv1").append("<span id='uppemail1'></span>");

    $("#upppanelRow").append("<div id='uppemailFieldGroup2' class='form-group' />");
    $("#uppemailFieldGroup2").append("<label class='col-sm-3 control-label'>Email2 </label>");
    $("#uppemailFieldGroup2").append("<div id='uppemailFieldDiv2' class='col-sm-9' />");
    $("#uppemailFieldDiv2").append("<input type='email' id='upp_email2' class='form-control' placeholder='Email2' onkeyup='patientreg_keypress(event)'>");
    $("#uppemailFieldDiv2").append("<span id='uppemail2'></span>");

    $("#upppanelRow").append("<div id='uppfaxFieldGroup' class='form-group' />");
    $("#uppfaxFieldGroup").append("<label class='col-sm-3 control-label'>Fax </label>");
    $("#uppfaxFieldGroup").append("<div id='uppfaxFieldDiv' class='col-sm-9' />");
    $("#uppfaxFieldDiv").append("<input type='text' id='upp_fax' class='form-control' placeholder='Fax' onkeyup='patientreg_keypress(event)'>");
    $("#uppfaxFieldDiv").append("<span id='uppfax'></span>");

    //for home address
    $("#upaccordion1").append("<div id='uphomeAddr' class='panel panel-primary' />");

    $("#uphomeAddr").append("<div id='upsecondPanelHeading' class='panel-heading'/>");
    $("#upsecondPanelHeading").append("<h4 id='upsecondHeader' class='panel-title' />");
    $("#upsecondHeader").append("<a data-toggle='collapse' style='font-weight:bold;font-size:15px;' data-parent='#upaccordion1' href='#upcollapseOne2'><center>Home Address</center></a>");

    $("#uphomeAddr").append("<div id='upcollapseOne2' class='panel-collapse collapse' />");
    $("#upcollapseOne2").append("<div id='uphpanelMainBody' class = 'panel-body' />");
    $("#uphpanelMainBody").append("<div id='uphpanelRow' class='row' />");

    $("#uphpanelRow").append("<center><span id='uphpregsuccessBefore'></span></center>");

    $("#uphpanelRow").append("<div id='uphaddr1FieldGroup' class='form-group' />");
    $("#uphaddr1FieldGroup").append("<label class='col-sm-3 control-label'>Address line1<span class='asterisk'> *</span></label>");
    $("#uphaddr1FieldGroup").append("<div id='uphaddr1FieldDiv' class='col-sm-9' />");
    $("#uphaddr1FieldDiv").append("<input type='text' id='uph_address1' style='text-transform: capitalize;' class='form-control' placeholder='Address line1' onkeyup='patientreg_keypress(event)'>");
    $("#uphaddr1FieldDiv").append("<span id='uphadd1'></span>");

    $("#uphpanelRow").append("<div id='uphaddr2FieldGroup' class='form-group' />");
    $("#uphaddr2FieldGroup").append("<label class='col-sm-3 control-label'>Address line2</label>");
    $("#uphaddr2FieldGroup").append("<div id='uphaddr2FieldDiv' class='col-sm-9' />");
    $("#uphaddr2FieldDiv").append("<input type='text' id='uph_address2' style='text-transform: capitalize;' class='form-control' placeholder='Address line2' onkeyup='patientreg_keypress(event)'>");

    $("#uphpanelRow").append("<div id='uphcityFieldGroup' class='form-group' />");
    $("#uphcityFieldGroup").append("<label class='col-sm-3 control-label'>City<span class='asterisk'> *</span></label>");
    $("#uphcityFieldGroup").append("<div id='uphcityFieldDiv' class='col-sm-9' />");
    $("#uphcityFieldDiv").append("<input type='text' id='uph_city' style='text-transform: capitalize;' class='form-control' placeholder='City' onkeyup='patientreg_keypress(event)'>");
    $("#uphcityFieldDiv").append("<span id='uppcity'></span>");

    $("#uphpanelRow").append("<div id='uphstateFieldGroup' class='form-group' />");
    $("#uphstateFieldGroup").append("<label class='col-sm-3 control-label'>State<span class='asterisk'> *</span></label>");
    $("#uphstateFieldGroup").append("<div id='uphstateFieldDiv' class='col-sm-9' />");
    $("#uphstateFieldDiv").append("<select id='uph_state' class='form-control' onchange='patientreg_keypress(event)' />");
    $("#uph_state").append("<option value=''>Choose One</option><option>Andaman and Nicobar Islands</option><option>Andhra Pradesh</option><option>Arunachal Pradesh</option><option>Assam</option><option>Bihar</option><option>Chandigarh</option><option>Chhattisgarh</option><option>Dadra and Nagar Haveli</option><option>Daman and Diu</option><option>Delhi</option><option>Goa</option><option>Gujarat</option><option>Haryana</option><option>Himachal Pradesh</option><option>Jammu and Kashmir</option><option>Jharkhand</option><option>Karnataka</option><option>Kerala</option><option>Lakshadweep</option><option>Madhya Pradesh</option><option>Maharashtra</option><option>Manipur</option><option>Meghalaya</option><option>Mizoram</option><option>Nagaland</option><option>Orissa</option><option>Pondicherry</option><option>Punjab</option><option>Rajasthan</option><option>Sikkim</option><option>Tamil Nadu</option><option>Telangana</option><option>Tripura</option><option>Uttaranchal</option><option>Uttar Pradesh</option><option>West Bengal</option>");
    $("#uppstateFieldDiv").append("<span id='uphstate'></span>");

    $("#uphpanelRow").append("<div id='uphcountryFieldGroup' class='form-group' />");
    $("#uphcountryFieldGroup").append("<label class='col-sm-3 control-label'>Country</label>");
    $("#uphcountryFieldGroup").append("<div id='uphcountryFieldDiv' class='col-sm-9' />");
    $("#uphcountryFieldDiv").append("<select id='uph_country' class='form-control' />");
    $("#uph_country").append("<option>INDIA</option>");
    $("#uphcountryFieldDiv").append("<span id='uphcountry'></span>");

    $("#uphpanelRow").append("<div id='uphcodeFieldGroup' class='form-group' />");
    $("#uphcodeFieldGroup").append("<label class='col-sm-3 control-label'>Zip</label>");
    $("#uphcodeFieldGroup").append("<div id='uphcodeFieldDiv' class='col-sm-9' />");
    $("#uphcodeFieldDiv").append("<input type='text' id='uph_postcode' class='form-control' placeholder='Zip' onkeyup='patientreg_keypress(event)'>");
    $("#uphcodeFieldDiv").append("<span id='uphpostcode'></span>");
    $('#h_postcode').mask('999999');

    $("#uphpanelRow").append("<div id='uphhphoneFieldGroup' class='form-group' />");
    $("#uphhphoneFieldGroup").append("<label class='col-sm-3 control-label'>Home Phone<span class='asterisk'> *</span></label>");
    $("#uphhphoneFieldGroup").append("<div id='uphhphoneFieldDiv' class='col-sm-9' />");
    $("#uphhphoneFieldDiv").append("<input type='text' id='uph_homephone' size=15 maxLength=15 class='form-control' placeholder='Home Phone' onkeyup='patientreg_keypress(event)'>");
    $("#uphhphoneFieldDiv").append("<span id='uphphone'></span>");
//        jQuery("#preg_homephone").mask("9999999999");
    //jQuery("#preg_homephone").mask("99999999")

    $("#uphpanelRow").append("<div id='uphmphoneFieldGroup' class='form-group' />");
    $("#uphmphoneFieldGroup").append("<label class='col-sm-3 control-label'>Mobile Phone<span class='asterisk'> *</span></label>");
    $("#uphmphoneFieldGroup").append("<div id='uphmphoneFieldDiv' class='col-sm-9' />");
    $("#uphmphoneFieldDiv").append("<input type='text' id='uph_mobilephone' size=15 maxLength=15 class='form-control' placeholder='Mobile Phone' onkeyup='patientreg_keypress(event)'>");
    $("#uphmphoneFieldDiv").append("<span id='uphmphone'></span>");

    $("#uphpanelRow").append("<div id='uphwphoneFieldGroup' class='form-group' />");
    $("#uphwphoneFieldGroup").append("<label class='col-sm-3 control-label'>Office Phone<span class='asterisk'> *</span></label>");
    $("#uphwphoneFieldGroup").append("<div id='uphwphoneFieldDiv' class='col-sm-9' />");
    $("#uphwphoneFieldDiv").append("<input type='text' id='uph_workphone' size=15 maxLength=15 class='form-control' placeholder='Office Phone' onkeyup='patientreg_keypress(event)'>");
    $("#uphwphoneFieldDiv").append("<span id='uphwphone'></span>");

    $("#uphpanelRow").append("<div id='uphemailFieldGroup1' class='form-group' />");
    $("#uphemailFieldGroup1").append("<label class='col-sm-3 control-label'>Email1 </label>");
    $("#uphemailFieldGroup1").append("<div id='uphemailFieldDiv1' class='col-sm-9' />");
    $("#uphemailFieldDiv1").append("<input type='email' id='uph_email1' class='form-control' placeholder='Email1' onkeyup='patientreg_keypress(event)'>");
    $("#uphemailFieldDiv1").append("<span id='uphemail1'></span>");

    $("#uphpanelRow").append("<div id='uphemailFieldGroup2' class='form-group' />");
    $("#uphemailFieldGroup2").append("<label class='col-sm-3 control-label'>Email2 </label>");
    $("#uphemailFieldGroup2").append("<div id='uphemailFieldDiv2' class='col-sm-9' />");
    $("#uphemailFieldDiv2").append("<input type='email' id='uph_email2' class='form-control' placeholder='Email2' onkeyup='patientreg_keypress(event)'>");
    $("#uphemailFieldDiv2").append("<span id='uphemail2'></span>");

    $("#uphpanelRow").append("<div id='uphfaxFieldGroup' class='form-group' />");
    $("#uphfaxFieldGroup").append("<label class='col-sm-3 control-label'>Fax </label>");
    $("#uphfaxFieldGroup").append("<div id='uphfaxFieldDiv' class='col-sm-9' />");
    $("#uphfaxFieldDiv").append("<input type='text' id='uph_fax' class='form-control' placeholder='Fax' onkeyup='patientreg_keypress(event)'>");
    $("#uphfaxFieldDiv").append("<span id='uphfax'></span>");

    //for office
    $("#upaccordion1").append("<div id='upofficeAddr' class='panel panel-primary' />");

    $("#upofficeAddr").append("<div id='upthirdPanelHeading' class='panel-heading'/>");
    $("#upthirdPanelHeading").append("<h4 id='upthirdHeader' class='panel-title' />");
    $("#upthirdHeader").append("<a data-toggle='collapse' style='font-weight:bold;font-size:15px;' data-parent='#upaccordion1' href='#upcollapseOne3'><center>Office Address</center></a>");

    $("#upofficeAddr").append("<div id='upcollapseOne3' class='panel-collapse collapse' />");
    $("#upcollapseOne3").append("<div id='upopanelMainBody' class = 'panel-body' />");
    $("#upopanelMainBody").append("<div id='upopanelRow' class='row' />");

    $("#upopanelRow").append("<center><span id='upopregsuccessBefore'></span></center>");

    $("#upopanelRow").append("<div id='upoaddr1FieldGroup' class='form-group' />");
    $("#upoaddr1FieldGroup").append("<label class='col-sm-3 control-label'>Address line1<span class='asterisk'> *</span></label>");
    $("#upoaddr1FieldGroup").append("<div id='upoaddr1FieldDiv' class='col-sm-9' />");
    $("#upoaddr1FieldDiv").append("<input type='text' id='upo_address1' style='text-transform: capitalize;' class='form-control' placeholder='Address line1' onkeyup='patientreg_keypress(event)'>");
    $("#upoaddr1FieldDiv").append("<span id='upoadd1'></span>");

    $("#upopanelRow").append("<div id='upoaddr2FieldGroup' class='form-group' />");
    $("#upoaddr2FieldGroup").append("<label class='col-sm-3 control-label'>Address line2</label>");
    $("#upoaddr2FieldGroup").append("<div id='upoaddr2FieldDiv' class='col-sm-9' />");
    $("#upoaddr2FieldDiv").append("<input type='text' id='upo_address2' style='text-transform: capitalize;' class='form-control' placeholder='Address line2' onkeyup='patientreg_keypress(event)'>");

    $("#upopanelRow").append("<div id='upocityFieldGroup' class='form-group' />");
    $("#upocityFieldGroup").append("<label class='col-sm-3 control-label'>City<span class='asterisk'> *</span></label>");
    $("#upocityFieldGroup").append("<div id='upocityFieldDiv' class='col-sm-9' />");
    $("#upocityFieldDiv").append("<input type='text' id='upo_city' style='text-transform: capitalize;' class='form-control' placeholder='City' onkeyup='patientreg_keypress(event)'>");
    $("#upocityFieldDiv").append("<span id='upocity'></span>");

    $("#upopanelRow").append("<div id='upostateFieldGroup' class='form-group' />");
    $("#upostateFieldGroup").append("<label class='col-sm-3 control-label'>State<span class='asterisk'> *</span></label>");
    $("#upostateFieldGroup").append("<div id='upostateFieldDiv' class='col-sm-9' />");
    $("#upostateFieldDiv").append("<select id='upo_state' class='form-control' onchange='patientreg_keypress(event)' />");
    $("#upo_state").append("<option value=''>Choose One</option><option>Andaman and Nicobar Islands</option><option>Andhra Pradesh</option><option>Arunachal Pradesh</option><option>Assam</option><option>Bihar</option><option>Chandigarh</option><option>Chhattisgarh</option><option>Dadra and Nagar Haveli</option><option>Daman and Diu</option><option>Delhi</option><option>Goa</option><option>Gujarat</option><option>Haryana</option><option>Himachal Pradesh</option><option>Jammu and Kashmir</option><option>Jharkhand</option><option>Karnataka</option><option>Kerala</option><option>Lakshadweep</option><option>Madhya Pradesh</option><option>Maharashtra</option><option>Manipur</option><option>Meghalaya</option><option>Mizoram</option><option>Nagaland</option><option>Orissa</option><option>Pondicherry</option><option>Punjab</option><option>Rajasthan</option><option>Sikkim</option><option>Tamil Nadu</option><option>Telangana</option><option>Tripura</option><option>Uttaranchal</option><option>Uttar Pradesh</option><option>West Bengal</option>");
    $("#upostateFieldDiv").append("<span id='upostate'></span>");

    $("#upopanelRow").append("<div id='upocountryFieldGroup' class='form-group' />");
    $("#upocountryFieldGroup").append("<label class='col-sm-3 control-label'>Country</label>");
    $("#upocountryFieldGroup").append("<div id='upocountryFieldDiv' class='col-sm-9' />");
    $("#upocountryFieldDiv").append("<select id='upo_country' class='form-control' />");
    $("#upo_country").append("<option>INDIA</option>");
    $("#upocountryFieldDiv").append("<span id='upocountry'></span>");

    $("#upopanelRow").append("<div id='upocodeFieldGroup' class='form-group' />");
    $("#upocodeFieldGroup").append("<label class='col-sm-3 control-label'>Zip</label>");
    $("#upocodeFieldGroup").append("<div id='upocodeFieldDiv' class='col-sm-9' />");
    $("#upocodeFieldDiv").append("<input type='text' id='upo_postcode' class='form-control' placeholder='Zip' onkeyup='patientreg_keypress(event)'>");
    $("#upocodeFieldDiv").append("<span id='upopostcode'></span>");
    $('#o_postcode').mask('999999');

    $("#upopanelRow").append("<div id='upohphoneFieldGroup' class='form-group' />");
    $("#upohphoneFieldGroup").append("<label class='col-sm-3 control-label'>Home Phone<span class='asterisk'> *</span></label>");
    $("#upohphoneFieldGroup").append("<div id='upohphoneFieldDiv' class='col-sm-9' />");
    $("#upohphoneFieldDiv").append("<input type='text' id='upo_homephone' size=15 maxLength=15 class='form-control' placeholder='Home Phone' onkeyup='patientreg_keypress(event)'>");
    $("#upohphoneFieldDiv").append("<span id='upophone'></span>");
//        jQuery("#preg_homephone").mask("9999999999");
    //jQuery("#preg_homephone").mask("99999999")

    $("#upopanelRow").append("<div id='upomphoneFieldGroup' class='form-group' />");
    $("#upomphoneFieldGroup").append("<label class='col-sm-3 control-label'>Mobile Phone<span class='asterisk'> *</span></label>");
    $("#upomphoneFieldGroup").append("<div id='upomphoneFieldDiv' class='col-sm-9' />");
    $("#upomphoneFieldDiv").append("<input type='text' id='upo_mobilephone' size=15 maxLength=15 class='form-control' placeholder='Mobile Phone' onkeyup='patientreg_keypress(event)'>");
    $("#upomphoneFieldDiv").append("<span id='upomphone'></span>");

    $("#upopanelRow").append("<div id='upowphoneFieldGroup' class='form-group' />");
    $("#upowphoneFieldGroup").append("<label class='col-sm-3 control-label'>Office Phone<span class='asterisk'> *</span></label>");
    $("#upowphoneFieldGroup").append("<div id='upowphoneFieldDiv' class='col-sm-9' />");
    $("#upowphoneFieldDiv").append("<input type='text' id='upo_workphone' size=15 maxLength=15 class='form-control' placeholder='Office Phone' onkeyup='patientreg_keypress(event)'>");
    $("#upowphoneFieldDiv").append("<span id='upowphone'></span>");

    $("#upopanelRow").append("<div id='upoemailFieldGroup1' class='form-group' />");
    $("#upoemailFieldGroup1").append("<label class='col-sm-3 control-label'>Email1 </label>");
    $("#upoemailFieldGroup1").append("<div id='upoemailFieldDiv1' class='col-sm-9' />");
    $("#upoemailFieldDiv1").append("<input type='email' id='upo_email1' class='form-control' placeholder='Email1' onkeyup='patientreg_keypress(event)'>");
    $("#upoemailFieldDiv1").append("<span id='upoemail1'></span>");

    $("#upopanelRow").append("<div id='upoemailFieldGroup2' class='form-group' />");
    $("#upoemailFieldGroup2").append("<label class='col-sm-3 control-label'>Email2 </label>");
    $("#upoemailFieldGroup2").append("<div id='upoemailFieldDiv2' class='col-sm-9' />");
    $("#upoemailFieldDiv2").append("<input type='email' id='upo_email2' class='form-control' placeholder='Email2' onkeyup='patientreg_keypress(event)'>");
    $("#upoemailFieldDiv2").append("<span id='upoemail2'></span>");

    $("#upopanelRow").append("<div id='upofaxFieldGroup' class='form-group' />");
    $("#upofaxFieldGroup").append("<label class='col-sm-3 control-label'>Fax </label>");
    $("#upofaxFieldGroup").append("<div id='upofaxFieldDiv' class='col-sm-9' />");
    $("#upofaxFieldDiv").append("<input type='text' id='upo_fax' class='form-control' placeholder='Fax' onkeyup='patientreg_keypress(event)'>");
    $("#upofaxFieldDiv").append("<span id='upofax'></span>");

    $("#upaccordion1").append("<br/><center><button id='editUserButton' class='btn btn-primary' onclick='editUserProfile()' >Edit Profile</button></center>");

    $("input[type='text']").attr('disabled', true);
    $("input[type='email']").attr('disabled', true);
    $("select").attr('disabled', true);
    $("#u_gen_m").attr("disabled", true);
    $("#u_gen_f").attr("disabled", true);
//table end
}//view user profile form end


function getUpdateUserProfileForm() {
    $("#viewUserDataField").text("").append("<div id='updateProfileDiv' class='tab-pane' />");
    //for message
    $("#updateProfileDiv").prepend("<center><span id='updateBeforeSuccessMsg' /></center>");
//table starts
    $("#updateProfileDiv").append("<br><br><span style='font-size:15px;width:67%;' class=' btn btn-warning  btn-sm btn-block'>Update user</span>");
    $("#updateProfileDiv").append("<input type='hidden' id='u_userId_u'>");
    $("#updateProfileDiv").append("<input type='hidden' id='u_createdBy_u'>");

    $("#updateProfileDiv").append("<table style='width:68%;' id='userDemogUpdateTable' class='table userTable responsive no-footer' role = 'grid' aria - describedby = 'basicTable_info' />");
    $("#userDemogUpdateTable").append("<tbody id='userDemogUpdateTableBody' />");

    $("#userDemogUpdateTableBody").append("<tr id='u_loginid_error'><td><label class='control-label'>Username</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' readonly='readonly' class='form-control' placeholder='Username' id='u_loginid_u'><span id='u_loginid_msg' /></td></tr>");
    $("#u_loginid_u").attr('disabled', true);

    $("#userDemogUpdateTableBody").append("<tr><td><label class='control-label'>Role</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' readonly='readonly' class='form-control' placeholder='Role' id='u_roles_u'></td></tr>");
    $("#u_role_u").attr('disabled', true);

    $("#userDemogUpdateTableBody").append("<tr id='u_fname_error'><td style='width:30%;'><label class='control-label'>First name *</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' class='form-control' placeholder='First name' id='u_fname_u' style='text-transform: capitalize;' /><span id='u_fname_msg' /></td></tr>");
    $("#userDemogUpdateTableBody").append("<tr id='u_mname_error'><td><label class='control-label'>Middle name</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' class='form-control' placeholder='Middle name' id='u_mname_u' style='text-transform: capitalize;' /><span id='u_mname_msg' /></td></tr>");
    $("#userDemogUpdateTableBody").append("<tr id='u_lname_error'><td><label class='control-label'>Last name *</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' class='form-control' placeholder='Last name' id='u_lname_u' style='text-transform: capitalize;'><span id='u_lname_msg' style='text-transform: capitalize;' /></td></tr>");

    p
    $("#userDemogUpdateTableBody").append("<tr id='u_dob_error'><td><label class='control-label'>Date of Birth</label></td><td><input type='text' class='form-control' placeholder='DD/MM/YYYY' id='u_dob_u' size=10 maxlength=10><span id='u_dob_msg' /></td></tr>");
    jQuery("#u_dob_u").mask("99/99/9999");
    jQuery("#u_dob_u").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1950:2020',
        maxDate: new Date,
        minDate: new Date(1900, 0, 1),
        dateFormat: dateformate
    });

    $("#updateProfileDiv").append("<div class='panel-group' style='width:70%;' id='accordion3' />");
    $("#accordion3").append("<div id='permanentAddru' class='panel panel-primary' />");

    $("#permanentAddru").append("<div id='firstPanelHeadingu' class='panel-heading'/>");
    $("#firstPanelHeadingu").append("<h4 id='firstHeaderu' class='panel-title' />");
    $("#firstHeaderu").append("<a data-toggle='collapse' style='font-weight:bold;font-size:15px;' data-parent='#accordion3' href='#collapseOne11'><center>Permanent Address</center></a>");

    $("#permanentAddru").append("<div id='collapseOne11' class='panel-collapse collapse in' />");
    $("#collapseOne11").append("<div id='ppanelMainBodyu' class = 'panel-body' />");
    $("#ppanelMainBodyu").append("<div id='ppanelRowu' class='row' />");

    $("#ppanelRowu").append("<center><span id='pregsuccessBeforeu'></span></center>");

//for first row

    $("#ppanelRowu").append("<div id='paddr1FieldGroupu' class='form-group' />");
    $("#paddr1FieldGroupu").append("<label class='col-sm-3 control-label'>Address line1<span class='asterisk'> *</span></label>");
    $("#paddr1FieldGroupu").append("<div id='paddr1FieldDivu' class='col-sm-9' />");
    $("#paddr1FieldDivu").append("<input type='text' id='p_address1_u' style='text-transform: capitalize;' class='form-control' placeholder='Address line1' onkeyup='patientreg_keypress(event)'>");
    $("#paddr1FieldDivu").append("<span id='padd1_u'></span>");

    $("#ppanelRowu").append("<div id='paddr2FieldGroupu' class='form-group' />");
    $("#paddr2FieldGroup").append("<label class='col-sm-3 control-label'>Address line2</label>");
    $("#paddr2FieldGroup").append("<div id='paddr2FieldDivu' class='col-sm-9' />");
    $("#paddr2FieldDivu").append("<input type='text' id='p_address2_u' style='text-transform: capitalize;' class='form-control' placeholder='Address line2' onkeyup='patientreg_keypress(event)'>");

    $("#ppanelRowu").append("<div id='pcityFieldGroupu' class='form-group' />");
    $("#pcityFieldGroupu").append("<label class='col-sm-3 control-label'>City<span class='asterisk'> *</span></label>");
    $("#pcityFieldGroupu").append("<div id='pcityFieldDivu' class='col-sm-9' />");
    $("#pcityFieldDivu").append("<input type='text' id='p_city_u' style='text-transform: capitalize;' class='form-control' placeholder='City' onkeyup='patientreg_keypress(event)'>");
    $("#pcityFieldDivu").append("<span id='pcity_u'></span>");

    $("#ppanelRowu").append("<div id='pstateFieldGroupu' class='form-group' />");
    $("#pstateFieldGroupu").append("<label class='col-sm-3 control-label'>State<span class='asterisk'> *</span></label>");
    $("#pstateFieldGroupu").append("<div id='pstateFieldDivu' class='col-sm-9' />");
    $("#pstateFieldDivu").append("<select id='p_state_u' class='form-control' onchange='patientreg_keypress(event)' />");
    $("#p_state_u").append("<option value=''>Choose One</option><option>Andaman and Nicobar Islands</option><option>Andhra Pradesh</option><option>Arunachal Pradesh</option><option>Assam</option><option>Bihar</option><option>Chandigarh</option><option>Chhattisgarh</option><option>Dadra and Nagar Haveli</option><option>Daman and Diu</option><option>Delhi</option><option>Goa</option><option>Gujarat</option><option>Haryana</option><option>Himachal Pradesh</option><option>Jammu and Kashmir</option><option>Jharkhand</option><option>Karnataka</option><option>Kerala</option><option>Lakshadweep</option><option>Madhya Pradesh</option><option>Maharashtra</option><option>Manipur</option><option>Meghalaya</option><option>Mizoram</option><option>Nagaland</option><option>Orissa</option><option>Pondicherry</option><option>Punjab</option><option>Rajasthan</option><option>Sikkim</option><option>Tamil Nadu</option><option>Telangana</option><option>Tripura</option><option>Uttaranchal</option><option>Uttar Pradesh</option><option>West Bengal</option>");
//<option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option><option>California</option><option>Colorado</option><option>Connecticut</option><option>D.C.</option><option>Delaware</option><option>Florida</option><option>Georgia</option><option>Hawaii</option><option>Idaho</option><option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option><option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option><option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option><option>Missouri</option><option>Montana</option><option>Nebraska</option><option>Nevada</option><option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option><option>New York</option><option>North Carolina</option><option>North Dakota</option><option>Ohio</option><option>Oklahoma</option><option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option><option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option><option>Vermont</option><option>Virginia</option><option>Washington</option><option>West Virginia</option><option>Wisconsin</option><option>Wyoming</option>\n\
    $("#pstateFieldDivu").append("<span id='pstate'></span>");

    $("#ppanelRowu").append("<div id='pcountryFieldGroupu' class='form-group' />");
    $("#pcountryFieldGroupu").append("<label class='col-sm-3 control-label'>Country</label>");
    $("#pcountryFieldGroupu").append("<div id='pcountryFieldDivu' class='col-sm-9' />");
    $("#pcountryFieldDivu").append("<select id='p_country_u' class='form-control' />");
    $("#p_country_u").append("<option>INDIA</option>");
    $("#pcountryFieldDivu").append("<span id='pcountry_u'></span>");

    $("#ppanelRowu").append("<div id='pcodeFieldGroupu' class='form-group' />");
    $("#pcodeFieldGroupu").append("<label class='col-sm-3 control-label'>Zip</label>");
    $("#pcodeFieldGroupu").append("<div id='pcodeFieldDivu' class='col-sm-9' />");
    $("#pcodeFieldDivu").append("<input type='text' id='p_postcode_u' class='form-control' placeholder='Zip' onkeyup='patientreg_keypress(event)'>");
    $("#pcodeFieldDivu").append("<span id='ppostcode_u'></span>");
    $('#p_postcode_u').mask('999999');

    $("#ppanelRowu").append("<div id='phphoneFieldGroupu' class='form-group' />");
    $("#phphoneFieldGroupu").append("<label class='col-sm-3 control-label'>Home Phone<span class='asterisk'> *</span></label>");
    $("#phphoneFieldGroupu").append("<div id='phphoneFieldDivu' class='col-sm-9' />");
    $("#phphoneFieldDivu").append("<input type='text' id='p_homephone_u' size=15 maxLength=15 class='form-control' placeholder='Home Phone' onkeyup='patientreg_keypress(event)'>");
    $("#phphoneFieldDivu").append("<span id='pphone_u'></span>");
//        jQuery("#preg_homephone").mask("9999999999");
    //jQuery("#preg_homephone").mask("99999999")

    $("#ppanelRowu").append("<div id='pmphoneFieldGroupu' class='form-group' />");
    $("#pmphoneFieldGroupu").append("<label class='col-sm-3 control-label'>Mobile Phone<span class='asterisk'> *</span></label>");
    $("#pmphoneFieldGroupu").append("<div id='pmphoneFieldDivu' class='col-sm-9' />");
    $("#pmphoneFieldDivu").append("<input type='text' id='p_mobilephone_u' size=15 maxLength=15 class='form-control' placeholder='Mobile Phone' onkeyup='patientreg_keypress(event)'>");
    $("#pmphoneFieldDivu").append("<span id='pmphone_u'></span>");

    $("#ppanelRowu").append("<div id='pwphoneFieldGroupu' class='form-group' />");
    $("#pwphoneFieldGroupu").append("<label class='col-sm-3 control-label'>Office Phone<span class='asterisk'> *</span></label>");
    $("#pwphoneFieldGroupu").append("<div id='pwphoneFieldDivu' class='col-sm-9' />");
    $("#pwphoneFieldDivu").append("<input type='text' id='p_workphone_u' size=15 maxLength=15 class='form-control' placeholder='Office Phone' onkeyup='patientreg_keypress(event)'>");
    $("#pwphoneFieldDivu").append("<span id='pwphone_u'></span>");


    $("#ppanelRowu").append("<div id='pemailFieldGroup1u' class='form-group' />");
    $("#pemailFieldGroup1u").append("<label class='col-sm-3 control-label'>Email1 </label>");
    $("#pemailFieldGroup1u").append("<div id='pemailFieldDiv1u' class='col-sm-9' />");
    $("#pemailFieldDiv1u").append("<input type='email' id='p_email1_u' class='form-control' placeholder='Email1' onkeyup='patientreg_keypress(event)'>");
    $("#pemailFieldDiv1u").append("<span id='pemail1_u'></span>");

    $("#ppanelRowu").append("<div id='pemailFieldGroup2u' class='form-group' />");
    $("#pemailFieldGroup2u").append("<label class='col-sm-3 control-label'>Email2 </label>");
    $("#pemailFieldGroup2u").append("<div id='pemailFieldDiv2u' class='col-sm-9' />");
    $("#pemailFieldDiv2u").append("<input type='email' id='p_email2_u' class='form-control' placeholder='Email2' onkeyup='patientreg_keypress(event)'>");
    $("#pemailFieldDiv2u").append("<span id='pemail2_u'></span>");

    $("#ppanelRowu").append("<div id='pfaxFieldGroupu' class='form-group' />");
    $("#pfaxFieldGroupu").append("<label class='col-sm-3 control-label'>Fax </label>");
    $("#pfaxFieldGroupu").append("<div id='pfaxFieldDivu' class='col-sm-9' />");
    $("#pfaxFieldDivu").append("<input type='text' id='p_fax_u' class='form-control' placeholder='Fax' onkeyup='patientreg_keypress(event)'>");
    $("#pfaxFieldDivu").append("<span id='pfax_u'></span>");

    //for home address
    $("#accordion3").append("<div id='homeAddr' class='panel panel-primary' />");

    $("#homeAddr").append("<div id='secondPanelHeading' class='panel-heading'/>");
    $("#secondPanelHeading").append("<h4 id='secondHeader' class='panel-title' />");
    $("#secondHeader").append("<a data-toggle='collapse' style='font-weight:bold;font-size:15px;' data-parent='#accordion3' href='#collapseOne22'><center>Home Address</center></a>");

    $("#homeAddr").append("<div id='collapseOne22' class='panel-collapse collapse' />");
    $("#collapseOne22").append("<div id='hpanelMainBody' class = 'panel-body' />");
    $("#hpanelMainBody").append("<div id='hpanelRow' class='row' />");

    $("#hpanelRow").append("<center><span id='hpregsuccessBefore'></span></center>");

    $("#hpanelRow").append("<div id='haddr1FieldGroup' class='form-group' />");
    $("#haddr1FieldGroup").append("<label class='col-sm-3 control-label'>Address line1<span class='asterisk'> *</span></label>");
    $("#haddr1FieldGroup").append("<div id='haddr1FieldDiv' class='col-sm-9' />");
    $("#haddr1FieldDiv").append("<input type='text' id='h_address1_u' style='text-transform: capitalize;' class='form-control' placeholder='Address line1' onkeyup='patientreg_keypress(event)'>");
    $("#haddr1FieldDiv").append("<span id='hadd1'></span>");

    $("#hpanelRow").append("<div id='haddr2FieldGroup' class='form-group' />");
    $("#haddr2FieldGroup").append("<label class='col-sm-3 control-label'>Address line2</label>");
    $("#haddr2FieldGroup").append("<div id='haddr2FieldDiv' class='col-sm-9' />");
    $("#haddr2FieldDiv").append("<input type='text' id='h_address2_u' style='text-transform: capitalize;' class='form-control' placeholder='Address line2' onkeyup='patientreg_keypress(event)'>");

    $("#hpanelRow").append("<div id='hcityFieldGroup' class='form-group' />");
    $("#hcityFieldGroup").append("<label class='col-sm-3 control-label'>City<span class='asterisk'> *</span></label>");
    $("#hcityFieldGroup").append("<div id='hcityFieldDiv' class='col-sm-9' />");
    $("#hcityFieldDiv").append("<input type='text' id='h_city_u' style='text-transform: capitalize;' class='form-control' placeholder='City' onkeyup='patientreg_keypress(event)'>");
    $("#hcityFieldDiv").append("<span id='pcity_u'></span>");

    $("#hpanelRow").append("<div id='hstateFieldGroup' class='form-group' />");
    $("#hstateFieldGroup").append("<label class='col-sm-3 control-label'>State<span class='asterisk'> *</span></label>");
    $("#hstateFieldGroup").append("<div id='hstateFieldDiv' class='col-sm-9' />");
    $("#hstateFieldDiv").append("<select id='h_state_u' class='form-control' onchange='patientreg_keypress(event)' />");
    $("#h_state_u").append("<option value=''>Choose One</option><option>Andaman and Nicobar Islands</option><option>Andhra Pradesh</option><option>Arunachal Pradesh</option><option>Assam</option><option>Bihar</option><option>Chandigarh</option><option>Chhattisgarh</option><option>Dadra and Nagar Haveli</option><option>Daman and Diu</option><option>Delhi</option><option>Goa</option><option>Gujarat</option><option>Haryana</option><option>Himachal Pradesh</option><option>Jammu and Kashmir</option><option>Jharkhand</option><option>Karnataka</option><option>Kerala</option><option>Lakshadweep</option><option>Madhya Pradesh</option><option>Maharashtra</option><option>Manipur</option><option>Meghalaya</option><option>Mizoram</option><option>Nagaland</option><option>Orissa</option><option>Pondicherry</option><option>Punjab</option><option>Rajasthan</option><option>Sikkim</option><option>Tamil Nadu</option><option>Telangana</option><option>Tripura</option><option>Uttaranchal</option><option>Uttar Pradesh</option><option>West Bengal</option>");
//<option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option><option>California</option><option>Colorado</option><option>Connecticut</option><option>D.C.</option><option>Delaware</option><option>Florida</option><option>Georgia</option><option>Hawaii</option><option>Idaho</option><option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option><option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option><option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option><option>Missouri</option><option>Montana</option><option>Nebraska</option><option>Nevada</option><option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option><option>New York</option><option>North Carolina</option><option>North Dakota</option><option>Ohio</option><option>Oklahoma</option><option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option><option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option><option>Vermont</option><option>Virginia</option><option>Washington</option><option>West Virginia</option><option>Wisconsin</option><option>Wyoming</option>\n\
    $("#pstateFieldDiv").append("<span id='hstate_u'></span>");

    $("#hpanelRow").append("<div id='hcountryFieldGroup' class='form-group' />");
    $("#hcountryFieldGroup").append("<label class='col-sm-3 control-label'>Country</label>");
    $("#hcountryFieldGroup").append("<div id='hcountryFieldDiv' class='col-sm-9' />");
    $("#hcountryFieldDiv").append("<select id='h_country_u' class='form-control' />");
    $("#h_country_u").append("<option>INDIA</option>");
    $("#hcountryFieldDiv").append("<span id='hcountry_u'></span>");

    $("#hpanelRow").append("<div id='hcodeFieldGroup' class='form-group' />");
    $("#hcodeFieldGroup").append("<label class='col-sm-3 control-label'>Zip</label>");
    $("#hcodeFieldGroup").append("<div id='hcodeFieldDiv' class='col-sm-9' />");
    $("#hcodeFieldDiv").append("<input type='text' id='h_postcode_u' class='form-control' placeholder='Zip' onkeyup='patientreg_keypress(event)'>");
    $("#hcodeFieldDiv").append("<span id='hpostcode_u'></span>");
    $('#h_postcode_u').mask('999999');

    $("#hpanelRow").append("<div id='hhphoneFieldGroup' class='form-group' />");
    $("#hhphoneFieldGroup").append("<label class='col-sm-3 control-label'>Home Phone<span class='asterisk'> *</span></label>");
    $("#hhphoneFieldGroup").append("<div id='hhphoneFieldDiv' class='col-sm-9' />");
    $("#hhphoneFieldDiv").append("<input type='text' id='h_homephone_u' size=15 maxLength=15 class='form-control' placeholder='Home Phone' onkeyup='patientreg_keypress(event)'>");
    $("#hhphoneFieldDiv").append("<span id='hphone_u'></span>");
//        jQuery("#preg_homephone").mask("9999999999");
    //jQuery("#preg_homephone").mask("99999999")

    $("#hpanelRow").append("<div id='hmphoneFieldGroup' class='form-group' />");
    $("#hmphoneFieldGroup").append("<label class='col-sm-3 control-label'>Mobile Phone<span class='asterisk'> *</span></label>");
    $("#hmphoneFieldGroup").append("<div id='hmphoneFieldDiv' class='col-sm-9' />");
    $("#hmphoneFieldDiv").append("<input type='text' id='h_mobilephone_u' size=15 maxLength=15 class='form-control' placeholder='Mobile Phone' onkeyup='patientreg_keypress(event)'>");
    $("#hmphoneFieldDiv").append("<span id='hmphone_u'></span>");

    $("#hpanelRow").append("<div id='hwphoneFieldGroup' class='form-group' />");
    $("#hwphoneFieldGroup").append("<label class='col-sm-3 control-label'>Office Phone<span class='asterisk'> *</span></label>");
    $("#hwphoneFieldGroup").append("<div id='hwphoneFieldDiv' class='col-sm-9' />");
    $("#hwphoneFieldDiv").append("<input type='text' id='h_workphone_u' size=15 maxLength=15 class='form-control' placeholder='Office Phone' onkeyup='patientreg_keypress(event)'>");
    $("#hwphoneFieldDiv").append("<span id='hwphone_u'></span>");


    $("#hpanelRow").append("<div id='hemailFieldGroup1' class='form-group' />");
    $("#hemailFieldGroup1").append("<label class='col-sm-3 control-label'>Email1 </label>");
    $("#hemailFieldGroup1").append("<div id='hemailFieldDiv1' class='col-sm-9' />");
    $("#hemailFieldDiv1").append("<input type='email' id='h_email1_u' class='form-control' placeholder='Email1' onkeyup='patientreg_keypress(event)'>");
    $("#hemailFieldDiv1").append("<span id='hemail1_u'></span>");

    $("#hpanelRow").append("<div id='hemailFieldGroup2' class='form-group' />");
    $("#hemailFieldGroup2").append("<label class='col-sm-3 control-label'>Email2 </label>");
    $("#hemailFieldGroup2").append("<div id='hemailFieldDiv2' class='col-sm-9' />");
    $("#hemailFieldDiv2").append("<input type='email' id='h_email2_u' class='form-control' placeholder='Email2' onkeyup='patientreg_keypress(event)'>");
    $("#hemailFieldDiv2").append("<span id='hemail2_u'></span>");

    $("#hpanelRow").append("<div id='hfaxFieldGroup' class='form-group' />");
    $("#hfaxFieldGroup").append("<label class='col-sm-3 control-label'>Fax </label>");
    $("#hfaxFieldGroup").append("<div id='hfaxFieldDiv' class='col-sm-9' />");
    $("#hfaxFieldDiv").append("<input type='text' id='h_fax_u' class='form-control' placeholder='Fax' onkeyup='patientreg_keypress(event)'>");
    $("#hfaxFieldDiv").append("<span id='hfax_u'></span>");

    //for office
    $("#accordion3").append("<div id='officeAddr' class='panel panel-primary' />");

    $("#officeAddr").append("<div id='thirdPanelHeading' class='panel-heading'/>");
    $("#thirdPanelHeading").append("<h4 id='thirdHeader' class='panel-title' />");
    $("#thirdHeader").append("<a data-toggle='collapse' style='font-weight:bold;font-size:15px;' data-parent='#accordion3' href='#collapseOne33'><center>Office Address</center></a>");

    $("#officeAddr").append("<div id='collapseOne33' class='panel-collapse collapse' />");
    $("#collapseOne33").append("<div id='opanelMainBody' class = 'panel-body' />");
    $("#opanelMainBody").append("<div id='opanelRow' class='row' />");

    $("#opanelRow").append("<center><span id='opregsuccessBefore'></span></center>");

    $("#opanelRow").append("<div id='oaddr1FieldGroup' class='form-group' />");
    $("#oaddr1FieldGroup").append("<label class='col-sm-3 control-label'>Address line1<span class='asterisk'> *</span></label>");
    $("#oaddr1FieldGroup").append("<div id='oaddr1FieldDiv' class='col-sm-9' />");
    $("#oaddr1FieldDiv").append("<input type='text' id='o_address1_u' style='text-transform: capitalize;' class='form-control' placeholder='Address line1' onkeyup='patientreg_keypress(event)'>");
    $("#oaddr1FieldDiv").append("<span id='oadd1_u'></span>");

    $("#opanelRow").append("<div id='oaddr2FieldGroup' class='form-group' />");
    $("#oaddr2FieldGroup").append("<label class='col-sm-3 control-label'>Address line2</label>");
    $("#oaddr2FieldGroup").append("<div id='oaddr2FieldDiv' class='col-sm-9' />");
    $("#oaddr2FieldDiv").append("<input type='text' id='o_address2_u' style='text-transform: capitalize;' class='form-control' placeholder='Address line2' onkeyup='patientreg_keypress(event)'>");

    $("#opanelRow").append("<div id='ocityFieldGroup' class='form-group' />");
    $("#ocityFieldGroup").append("<label class='col-sm-3 control-label'>City<span class='asterisk'> *</span></label>");
    $("#ocityFieldGroup").append("<div id='ocityFieldDiv' class='col-sm-9' />");
    $("#ocityFieldDiv").append("<input type='text' id='o_city_u' style='text-transform: capitalize;' class='form-control' placeholder='City' onkeyup='patientreg_keypress(event)'>");
    $("#ocityFieldDiv").append("<span id='ocity_u'></span>");

    $("#opanelRow").append("<div id='ostateFieldGroup' class='form-group' />");
    $("#ostateFieldGroup").append("<label class='col-sm-3 control-label'>State<span class='asterisk'> *</span></label>");
    $("#ostateFieldGroup").append("<div id='ostateFieldDiv' class='col-sm-9' />");
    $("#ostateFieldDiv").append("<select id='o_state_u' class='form-control' onchange='patientreg_keypress(event)' />");
    $("#o_state_u").append("<option value=''>Choose One</option><option>Andaman and Nicobar Islands</option><option>Andhra Pradesh</option><option>Arunachal Pradesh</option><option>Assam</option><option>Bihar</option><option>Chandigarh</option><option>Chhattisgarh</option><option>Dadra and Nagar Haveli</option><option>Daman and Diu</option><option>Delhi</option><option>Goa</option><option>Gujarat</option><option>Haryana</option><option>Himachal Pradesh</option><option>Jammu and Kashmir</option><option>Jharkhand</option><option>Karnataka</option><option>Kerala</option><option>Lakshadweep</option><option>Madhya Pradesh</option><option>Maharashtra</option><option>Manipur</option><option>Meghalaya</option><option>Mizoram</option><option>Nagaland</option><option>Orissa</option><option>Pondicherry</option><option>Punjab</option><option>Rajasthan</option><option>Sikkim</option><option>Tamil Nadu</option><option>Telangana</option><option>Tripura</option><option>Uttaranchal</option><option>Uttar Pradesh</option><option>West Bengal</option>");
//<option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option><option>California</option><option>Colorado</option><option>Connecticut</option><option>D.C.</option><option>Delaware</option><option>Florida</option><option>Georgia</option><option>Hawaii</option><option>Idaho</option><option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option><option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option><option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option><option>Missouri</option><option>Montana</option><option>Nebraska</option><option>Nevada</option><option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option><option>New York</option><option>North Carolina</option><option>North Dakota</option><option>Ohio</option><option>Oklahoma</option><option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option><option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option><option>Vermont</option><option>Virginia</option><option>Washington</option><option>West Virginia</option><option>Wisconsin</option><option>Wyoming</option>\n\
    $("#ostateFieldDiv").append("<span id='ostate_u'></span>");

    $("#opanelRow").append("<div id='ocountryFieldGroup' class='form-group' />");
    $("#ocountryFieldGroup").append("<label class='col-sm-3 control-label'>Country</label>");
    $("#ocountryFieldGroup").append("<div id='ocountryFieldDiv' class='col-sm-9' />");
    $("#ocountryFieldDiv").append("<select id='o_country_u' class='form-control' />");
    $("#o_country_u").append("<option>INDIA</option>");
    $("#ocountryFieldDiv").append("<span id='ocountry_u'></span>");

    $("#opanelRow").append("<div id='ocodeFieldGroup' class='form-group' />");
    $("#ocodeFieldGroup").append("<label class='col-sm-3 control-label'>Zip</label>");
    $("#ocodeFieldGroup").append("<div id='ocodeFieldDiv' class='col-sm-9' />");
    $("#ocodeFieldDiv").append("<input type='text' id='o_postcode_u' class='form-control' placeholder='Zip' onkeyup='patientreg_keypress(event)'>");
    $("#ocodeFieldDiv").append("<span id='opostcode_u'></span>");
    $('#o_postcode_u').mask('999999');

    $("#opanelRow").append("<div id='ohphoneFieldGroup' class='form-group' />");
    $("#ohphoneFieldGroup").append("<label class='col-sm-3 control-label'>Home Phone<span class='asterisk'> *</span></label>");
    $("#ohphoneFieldGroup").append("<div id='ohphoneFieldDiv' class='col-sm-9' />");
    $("#ohphoneFieldDiv").append("<input type='text' id='o_homephone_u' size=15 maxLength=15 class='form-control' placeholder='Home Phone' onkeyup='patientreg_keypress(event)'>");
    $("#ohphoneFieldDiv").append("<span id='ophone_u'></span>");
//        jQuery("#preg_homephone").mask("9999999999");
    //jQuery("#preg_homephone").mask("99999999")

    $("#opanelRow").append("<div id='omphoneFieldGroup' class='form-group' />");
    $("#omphoneFieldGroup").append("<label class='col-sm-3 control-label'>Mobile Phone<span class='asterisk'> *</span></label>");
    $("#omphoneFieldGroup").append("<div id='omphoneFieldDiv' class='col-sm-9' />");
    $("#omphoneFieldDiv").append("<input type='text' id='o_mobilephone_u' size=15 maxLength=15 class='form-control' placeholder='Mobile Phone' onkeyup='patientreg_keypress(event)'>");
    $("#omphoneFieldDiv").append("<span id='omphone_u'></span>");

    $("#opanelRow").append("<div id='owphoneFieldGroup' class='form-group' />");
    $("#owphoneFieldGroup").append("<label class='col-sm-3 control-label'>Office Phone<span class='asterisk'> *</span></label>");
    $("#owphoneFieldGroup").append("<div id='owphoneFieldDiv' class='col-sm-9' />");
    $("#owphoneFieldDiv").append("<input type='text' id='o_workphone_u' size=15 maxLength=15 class='form-control' placeholder='Office Phone' onkeyup='patientreg_keypress(event)'>");
    $("#owphoneFieldDiv").append("<span id='owphone_u'></span>");

    $("#opanelRow").append("<div id='oemailFieldGroup1' class='form-group' />");
    $("#oemailFieldGroup1").append("<label class='col-sm-3 control-label'>Email1 </label>");
    $("#oemailFieldGroup1").append("<div id='oemailFieldDiv1' class='col-sm-9' />");
    $("#oemailFieldDiv1").append("<input type='email' id='o_email1_u' class='form-control' placeholder='Email1' onkeyup='patientreg_keypress(event)'>");
    $("#oemailFieldDiv1").append("<span id='oemail1_u'></span>");

    $("#opanelRow").append("<div id='oemailFieldGroup2' class='form-group' />");
    $("#oemailFieldGroup2").append("<label class='col-sm-3 control-label'>Email2 </label>");
    $("#oemailFieldGroup2").append("<div id='oemailFieldDiv2' class='col-sm-9' />");
    $("#oemailFieldDiv2").append("<input type='email' id='o_email2_u' class='form-control' placeholder='Email2' onkeyup='patientreg_keypress(event)'>");
    $("#oemailFieldDiv2").append("<span id='oemail2_u'></span>");

    $("#opanelRow").append("<div id='ofaxFieldGroup' class='form-group' />");
    $("#ofaxFieldGroup").append("<label class='col-sm-3 control-label'>Fax </label>");
    $("#ofaxFieldGroup").append("<div id='ofaxFieldDiv' class='col-sm-9' />");
    $("#ofaxFieldDiv").append("<input type='text' id='o_fax_u' class='form-control' placeholder='Fax' onkeyup='patientreg_keypress(event)'>");
    $("#ofaxFieldDiv").append("<span id='ofax_u'></span>");

    //for update button viewUserDataField
    $("#viewUserDataField").append("<center><span id='updateAfterSuccessMsg' /></center><br>");
    $("#viewUserDataField").append("<center><button id='userUpdateButton' class='btn btn-primary mr5' onclick='updateUserDetails()'>Update user</button></center>");
}

//for change pssword form
function getChangeUserPasswordForm() {
    $("#changePasswordDiv").remove();
    $("#mainProfileTabMenuDiv").append("<div id='changePasswordDiv' class='tab-pane' />");
    //for message
    $("#changePasswordDiv").prepend("<center><span id='changeAfterSuccessMsg' /></center>");
    $("#changePasswordDiv").append("<table id='changePasswordTable' class='table userTable responsive no-footer' role = 'grid' aria - describedby = 'basicTable_info' />");
    $("#changePasswordTable").append("<tbody id='changePasswordTableBody' />");
    $("#changePasswordTableBody").append("<tr id='old_pass_error'><td style='width:30%;'><label class='control-label'>Old password *</label></td><td><input type='password' name='old_pass' id='old_pass' class='form-control' placeholder='Old password' onkeyup='change_pass(event)'><span id='old_pass_msg' /></td></tr>");
    $("#changePasswordTableBody").append("<tr id='new_pass_error'><td><label class='control-label'>New password *</label></td><td><input type='password' name='new_pass' id='new_pass' class='form-control' placeholder='New password' onkeyup='change_pass(event)'><span id='new_pass_msg' /></td></tr>");
    $("#changePasswordTableBody").append("<tr id='cnf_pass_error'><td><label class='control-label'>Confirm password *</label></td><td><input type='password' name='cnf_pass' id='cnf_pass' class='form-control' placeholder='Confirm password' onkeyup='change_pass(event)'><span id='cnf_pass_msg' /></td></tr>");
//for update button
    $("#changePasswordDiv").append("<center><button class='btn btn-primary mr5' id='change_pass_btn'>Update</button></center>");
    $("#change_pass_btn").show();
}

//for change pin form
function getChangeUserPinForm() {
    $("#mainProfileTabMenuDiv").append("<div id='changePinDiv' class='tab-pane' />");
    //for message
    $("#changePinDiv").prepend("<center><span id='changePinAfterSuccessMsg' /></center>");
    $("#changePinDiv").append("<table id='changePinTable' class='table userTable responsive no-footer' role = 'grid' aria - describedby = 'basicTable_info' />");
    $("#changePinTable").append("<tbody id='changePinTableBody' />");
    $("#changePinTableBody").append("<tr id='u_resumePin_error'><td style='width:30%;'><label class='control-label'>Resume PIN *</label></td><td><input type='password' class='form-control' placeholder='Enter your PIN' id='u_resumePin_u' onkeyup='changePinKeyup(event)' size=4 maxlength=4><span id='u_resumePin_msg' /></td></tr>");
//for update button
    $("#changePinDiv").append("<center><button class='btn btn-primary mr5' id='change_pin_btn'>Save</button></center>");
}

function updateUserDetails() {
//    var userRole = document.getElementById("u_roles_u").value;

    var userId = $("#u_userId_u").val();
    var userRole = $("#u_roles_u").val();
    var userName = $("#u_loginid_u").val();
    var userFName = $("#u_fname_u").val();
    var userMName = $("#u_mname_u").val();
    var userLName = $("#u_lname_u").val();
    var userGender = $('input[name=u_gender_u]:checked').val();
    var userDOB = $("#u_dob_u").val();
    var createdBy = $("#u_createdBy_u").val(); // take from session
    var reportingManager = $("#reportingManagerSelect").val();
    var orgId = getUserSessionElement("OrgId");
//for permanent
    var homephone = $("#p_homephone_u").val();
    var workphone = $("#p_workphone_u").val();
    var mobilephone = $("#p_mobilephone_u").val();
    var fax = $("#p_fax_u").val();
    var email1 = $("#p_email1_u").val();
    var email2 = $("#p_email2_u").val();
    var address1 = $("#p_address1_u").val();
    var address2 = $("#p_address2_u").val();
    var city = $("#p_city_u").val();
    var state = $("#p_state_u").val();
    var country = $("#p_country_u").val();
    var zipcode = $("#p_postcode_u").val();
    var addresType = "PERMANENT";
//for home
    var h_homephone = $("#h_homephone_u").val();
    var h_workphone = $("#h_workphone_u").val();
    var h_mobilephone = $("#h_mobilephone_u").val();
    var h_fax = $("#h_fax_u").val();
    var h_email1 = $("#h_email1_u").val();
    var h_email2 = $("#h_email2_u").val();
    var h_address1 = $("#h_address1_u").val();
    var h_address2 = $("#h_address2_u").val();
    var h_city = $("#h_city_u").val();
    var h_state = $("#h_state_u").val();
    var h_country = $("#h_country_u").val();
    var h_zipcode = $("#h_postcode_u").val();
    var h_addresType = "HOME";
    //for office
    var o_homephone = $("#o_homephone_u").val();
    var o_workphone = $("#o_workphone_u").val();
    var o_mobilephone = $("#o_mobilephone_u").val();
    var o_fax = $("#o_fax_u").val();
    var o_email1 = $("#o_email1_u").val();
    var o_email2 = $("#o_email2_u").val();
    var o_address1 = $("#o_address1_u").val();
    var o_address2 = $("#o_address2_u").val();
    var o_city = $("#o_city_u").val();
    var o_state = $("#o_state_u").val();
    var o_country = $("#o_country_u").val();
    var o_zipcode = $("#o_postcode_u").val();
    var o_addresType = "OFFICE";

    var userDetailJson = "";

//    if (userId != null || userId != undefined) {
//        var pid = "{$oid=" + userId + "}";
//        userDetailJson = userDetailJson + "\"_id\":\"" + pid + "\",";
//    }
    if (userFName != null || userFName != undefined) {
        userDetailJson = userDetailJson + "\"fname\":\"" + userFName + "\",";
    }
    if (userMName != null || userMName != undefined) {
        userDetailJson = userDetailJson + "\"mname\":\"" + userMName + "\",";
    }
    if (userLName != null || userLName != undefined) {
        userDetailJson = userDetailJson + "\"lname\":\"" + userLName + "\",";
    }
    if (userGender != null || userGender != undefined) {
        userDetailJson = userDetailJson + "\"gender\":\"" + userGender + "\",";
    }
    if (userDOB != null || userDOB != undefined) {
        userDetailJson = userDetailJson + "\"dob\":\"" + userDOB + "\",";
    }
    if (userName != null || userName != undefined) {
        userDetailJson = userDetailJson + "\"loginid\":\"" + userName + "\",";
    }
    if (createdBy != null || createdBy != undefined) {
        userDetailJson = userDetailJson + "\"createdBy\":\"" + createdBy + "\",";
    }
    if (userRole != null || userRole != undefined) {
        userDetailJson = userDetailJson + "\"roles\":\"" + userRole + "\",";
    }
    if (reportingManager != null || reportingManager != undefined) {
        userDetailJson = userDetailJson + "\"reportingmanagerid\":\"" + reportingManager + "\",";
    }
    if (orgId != null || orgId != undefined) {
        userDetailJson = userDetailJson + "\"orgid\":\"" + orgId + "\",";
    }

    var userAddressJson = "";
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
        userHomeAddressJson = userHomeAddressJson + "\"email1\":\"" + email1 + "\",";
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
        userOfficeAddressJson = userOfficeAddressJson + "\"email1\":\"" + email1 + "\",";
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
//    userAddressJson = "[{" + userAddressJson + "}]"
    var user_selected_org = getUserSessionElement("user_selected_org");

    $.post(server_base_url + "UpdateUser", {
        userDetails: userDetailJson,
        userAdress: userAddressJson,
        userId: userId
    }).done(function(data) {
        if (data == success) {
            viewUserTable();
        } else if (data == fail) {
            displayLargeErrorMessages("userInsertionStatus", failMessage);
            displayLargeErrorMessages("userMessage", failMessage);
        } else if (data == unauthorized) {
            displayLargeErrorMessages("userInsertionStatus", unauthorizedMessage);
            displayLargeErrorMessages("userMessage", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        }
    });
}


function getUpdateUserForm() {
    $("#viewUserDataField").text("").append("<div id='updateProfileDiv' class='tab-pane' />");
    //for message
    $("#updateProfileDiv").prepend("<center><span id='updateBeforeSuccessMsg' /></center>");
//table starts
    $("#updateProfileDiv").append("<br><br><span style='font-size:15px;width:67%;' class=' btn btn-warning  btn-sm btn-block'>Update user</span>");
    $("#updateProfileDiv").append("<input type='hidden' id='u_userId_u'>");
    $("#updateProfileDiv").append("<input type='hidden' id='u_createdBy_u'>");

    $("#updateProfileDiv").append("<table style='width:68%;' id='userDemogUpdateTable' class='table userTable responsive no-footer' role = 'grid' aria - describedby = 'basicTable_info' />");
    $("#userDemogUpdateTable").append("<tbody id='userDemogUpdateTableBody' />");

    $("#userDemogUpdateTableBody").append("<tr id='u_loginid_error'><td><label class='control-label'>Username</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' readonly='readonly' class='form-control' placeholder='Username' id='u_loginid_u'><span id='u_loginid_msg' /></td></tr>");
    $("#u_loginid_u").attr('disabled', true);

    $("#userDemogUpdateTableBody").append("<tr><td><label class='control-label'>Role</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' readonly='readonly' class='form-control' placeholder='Role' id='u_roles_u'></td></tr>");
    $("#u_role_u").attr('disabled', true);

    $("#userDemogUpdateTableBody").append("<tr id='u_fname_error'><td style='width:30%;'><label class='control-label'>First name *</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' class='form-control' placeholder='First name' id='u_fname_u' style='text-transform: capitalize;' /><span id='u_fname_msg' /></td></tr>");
    $("#userDemogUpdateTableBody").append("<tr id='u_mname_error'><td><label class='control-label'>Middle name</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' class='form-control' placeholder='Middle name' id='u_mname_u' style='text-transform: capitalize;' /><span id='u_mname_msg' /></td></tr>");
    $("#userDemogUpdateTableBody").append("<tr id='u_lname_error'><td><label class='control-label'>Last name *</label></td><td><input type='text' onkeyup='updateUserProfile_keypress(event)' class='form-control' placeholder='Last name' id='u_lname_u' style='text-transform: capitalize;'><span id='u_lname_msg' style='text-transform: capitalize;' /></td></tr>");

    $("#userDemogUpdateTableBody").append("<tr><td><label class='control-label'>Gender</label></td><td><div id='u_genderButtonDiv' class='btn-group' data-toggle='buttons' /></td></tr>");
    $("#u_genderButtonDiv").append("<label class='btn blue btn-default' style='border-radius: 3px; font-weight: 600;' id='u_gen_m'><input type='radio' id='u_gender_m' name='u_gender_u' value='Male' />Male</label><label class='btn blue btn-default' style='margin-left: 15px; border-radius: 3px; font-weight: 600;' id='u_gen_f'><input type='radio' id='u_gender_f' name='u_gender_u' value='Female' />Female</label>");

    $("#userDemogUpdateTableBody").append("<tr id='u_dob_error'><td><label class='control-label'>Date of Birth</label></td><td><input type='text' class='form-control' placeholder='DD/MM/YYYY' id='u_dob_u' size=10 maxlength=10><span id='u_dob_msg' /></td></tr>");
    jQuery("#u_dob_u").mask("99/99/9999");
    jQuery("#u_dob_u").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1950:2020',
        maxDate: new Date,
        minDate: new Date(1900, 0, 1),
        dateFormat: dateformate
    });

    $("#updateProfileDiv").append("<div class='panel-group' style='width:70%;' id='accordion3' />");
    $("#accordion3").append("<div id='permanentAddru' class='panel panel-primary' />");

    $("#permanentAddru").append("<div id='firstPanelHeadingu' class='panel-heading'/>");
    $("#firstPanelHeadingu").append("<h4 id='firstHeaderu' class='panel-title' />");
    $("#firstHeaderu").append("<a data-toggle='collapse' style='font-weight:bold;font-size:15px;' data-parent='#accordion3' href='#collapseOne11'><center>Permanent Address</center></a>");

    $("#permanentAddru").append("<div id='collapseOne11' class='panel-collapse collapse in' />");
    $("#collapseOne11").append("<div id='ppanelMainBodyu' class = 'panel-body' />");
    $("#ppanelMainBodyu").append("<div id='ppanelRowu' class='row' />");

    $("#ppanelRowu").append("<center><span id='pregsuccessBeforeu'></span></center>");

//for first row
    $("#ppanelRowu").append("<div id='paddr1FieldGroupu' class='form-group' />");
    $("#paddr1FieldGroupu").append("<label class='col-sm-3 control-label'>Address line1<span class='asterisk'> *</span></label>");
    $("#paddr1FieldGroupu").append("<div id='paddr1FieldDivu' class='col-sm-9' />");
    $("#paddr1FieldDivu").append("<input type='text' id='p_address1_u' style='text-transform: capitalize;' class='form-control' placeholder='Address line1' onkeyup='patientreg_keypress(event)'>");
    $("#paddr1FieldDivu").append("<span id='padd1_u'></span>");

    $("#ppanelRowu").append("<div id='paddr2FieldGroupu' class='form-group' />");
    $("#paddr2FieldGroup").append("<label class='col-sm-3 control-label'>Address line2</label>");
    $("#paddr2FieldGroup").append("<div id='paddr2FieldDivu' class='col-sm-9' />");
    $("#paddr2FieldDivu").append("<input type='text' id='p_address2_u' style='text-transform: capitalize;' class='form-control' placeholder='Address line2' onkeyup='patientreg_keypress(event)'>");

    $("#ppanelRowu").append("<div id='pcityFieldGroupu' class='form-group' />");
    $("#pcityFieldGroupu").append("<label class='col-sm-3 control-label'>City<span class='asterisk'> *</span></label>");
    $("#pcityFieldGroupu").append("<div id='pcityFieldDivu' class='col-sm-9' />");
    $("#pcityFieldDivu").append("<input type='text' id='p_city_u' style='text-transform: capitalize;' class='form-control' placeholder='City' onkeyup='patientreg_keypress(event)'>");
    $("#pcityFieldDivu").append("<span id='pcity_u'></span>");

    $("#ppanelRowu").append("<div id='pstateFieldGroupu' class='form-group' />");
    $("#pstateFieldGroupu").append("<label class='col-sm-3 control-label'>State<span class='asterisk'> *</span></label>");
    $("#pstateFieldGroupu").append("<div id='pstateFieldDivu' class='col-sm-9' />");
    $("#pstateFieldDivu").append("<select id='p_state_u' class='form-control' onchange='patientreg_keypress(event)' />");
    $("#p_state_u").append("<option value=''>Choose One</option><option>Andaman and Nicobar Islands</option><option>Andhra Pradesh</option><option>Arunachal Pradesh</option><option>Assam</option><option>Bihar</option><option>Chandigarh</option><option>Chhattisgarh</option><option>Dadra and Nagar Haveli</option><option>Daman and Diu</option><option>Delhi</option><option>Goa</option><option>Gujarat</option><option>Haryana</option><option>Himachal Pradesh</option><option>Jammu and Kashmir</option><option>Jharkhand</option><option>Karnataka</option><option>Kerala</option><option>Lakshadweep</option><option>Madhya Pradesh</option><option>Maharashtra</option><option>Manipur</option><option>Meghalaya</option><option>Mizoram</option><option>Nagaland</option><option>Orissa</option><option>Pondicherry</option><option>Punjab</option><option>Rajasthan</option><option>Sikkim</option><option>Tamil Nadu</option><option>Telangana</option><option>Tripura</option><option>Uttaranchal</option><option>Uttar Pradesh</option><option>West Bengal</option>");
//<option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option><option>California</option><option>Colorado</option><option>Connecticut</option><option>D.C.</option><option>Delaware</option><option>Florida</option><option>Georgia</option><option>Hawaii</option><option>Idaho</option><option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option><option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option><option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option><option>Missouri</option><option>Montana</option><option>Nebraska</option><option>Nevada</option><option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option><option>New York</option><option>North Carolina</option><option>North Dakota</option><option>Ohio</option><option>Oklahoma</option><option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option><option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option><option>Vermont</option><option>Virginia</option><option>Washington</option><option>West Virginia</option><option>Wisconsin</option><option>Wyoming</option>\n\
    $("#pstateFieldDivu").append("<span id='pstate'></span>");

    $("#ppanelRowu").append("<div id='pcountryFieldGroupu' class='form-group' />");
    $("#pcountryFieldGroupu").append("<label class='col-sm-3 control-label'>Country</label>");
    $("#pcountryFieldGroupu").append("<div id='pcountryFieldDivu' class='col-sm-9' />");
    $("#pcountryFieldDivu").append("<select id='p_country_u' class='form-control' />");
    $("#p_country_u").append("<option>INDIA</option>");
    $("#pcountryFieldDivu").append("<span id='pcountry_u'></span>");

    $("#ppanelRowu").append("<div id='pcodeFieldGroupu' class='form-group' />");
    $("#pcodeFieldGroupu").append("<label class='col-sm-3 control-label'>Zip</label>");
    $("#pcodeFieldGroupu").append("<div id='pcodeFieldDivu' class='col-sm-9' />");
    $("#pcodeFieldDivu").append("<input type='text' id='p_postcode_u' class='form-control' placeholder='Zip' onkeyup='patientreg_keypress(event)'>");
    $("#pcodeFieldDivu").append("<span id='ppostcode_u'></span>");
    $('#p_postcode_u').mask('999999');

    $("#ppanelRowu").append("<div id='phphoneFieldGroupu' class='form-group' />");
    $("#phphoneFieldGroupu").append("<label class='col-sm-3 control-label'>Home Phone<span class='asterisk'> *</span></label>");
    $("#phphoneFieldGroupu").append("<div id='phphoneFieldDivu' class='col-sm-9' />");
    $("#phphoneFieldDivu").append("<input type='text' id='p_homephone_u' size=15 maxLength=15 class='form-control' placeholder='Home Phone' onkeyup='patientreg_keypress(event)'>");
    $("#phphoneFieldDivu").append("<span id='pphone_u'></span>");
//        jQuery("#preg_homephone").mask("9999999999");
    //jQuery("#preg_homephone").mask("99999999")

    $("#ppanelRowu").append("<div id='pmphoneFieldGroupu' class='form-group' />");
    $("#pmphoneFieldGroupu").append("<label class='col-sm-3 control-label'>Mobile Phone<span class='asterisk'> *</span></label>");
    $("#pmphoneFieldGroupu").append("<div id='pmphoneFieldDivu' class='col-sm-9' />");
    $("#pmphoneFieldDivu").append("<input type='text' id='p_mobilephone_u' size=15 maxLength=15 class='form-control' placeholder='Mobile Phone' onkeyup='patientreg_keypress(event)'>");
    $("#pmphoneFieldDivu").append("<span id='pmphone_u'></span>");

    $("#ppanelRowu").append("<div id='pwphoneFieldGroupu' class='form-group' />");
    $("#pwphoneFieldGroupu").append("<label class='col-sm-3 control-label'>Office Phone<span class='asterisk'> *</span></label>");
    $("#pwphoneFieldGroupu").append("<div id='pwphoneFieldDivu' class='col-sm-9' />");
    $("#pwphoneFieldDivu").append("<input type='text' id='p_workphone_u' size=15 maxLength=15 class='form-control' placeholder='Office Phone' onkeyup='patientreg_keypress(event)'>");
    $("#pwphoneFieldDivu").append("<span id='pwphone_u'></span>");


    $("#ppanelRowu").append("<div id='pemailFieldGroup1u' class='form-group' />");
    $("#pemailFieldGroup1u").append("<label class='col-sm-3 control-label'>Email1 </label>");
    $("#pemailFieldGroup1u").append("<div id='pemailFieldDiv1u' class='col-sm-9' />");
    $("#pemailFieldDiv1u").append("<input type='email' id='p_email1_u' class='form-control' placeholder='Email1' onkeyup='patientreg_keypress(event)'>");
    $("#pemailFieldDiv1u").append("<span id='pemail1_u'></span>");

    $("#ppanelRowu").append("<div id='pemailFieldGroup2u' class='form-group' />");
    $("#pemailFieldGroup2u").append("<label class='col-sm-3 control-label'>Email2 </label>");
    $("#pemailFieldGroup2u").append("<div id='pemailFieldDiv2u' class='col-sm-9' />");
    $("#pemailFieldDiv2u").append("<input type='email' id='p_email2_u' class='form-control' placeholder='Email2' onkeyup='patientreg_keypress(event)'>");
    $("#pemailFieldDiv2u").append("<span id='pemail2_u'></span>");

    $("#ppanelRowu").append("<div id='pfaxFieldGroupu' class='form-group' />");
    $("#pfaxFieldGroupu").append("<label class='col-sm-3 control-label'>Fax </label>");
    $("#pfaxFieldGroupu").append("<div id='pfaxFieldDivu' class='col-sm-9' />");
    $("#pfaxFieldDivu").append("<input type='text' id='p_fax_u' class='form-control' placeholder='Fax' onkeyup='patientreg_keypress(event)'>");
    $("#pfaxFieldDivu").append("<span id='pfax_u'></span>");

    //for home address
    $("#accordion3").append("<div id='homeAddr' class='panel panel-primary' />");

    $("#homeAddr").append("<div id='secondPanelHeading' class='panel-heading'/>");
    $("#secondPanelHeading").append("<h4 id='secondHeader' class='panel-title' />");
    $("#secondHeader").append("<a data-toggle='collapse' style='font-weight:bold;font-size:15px;' data-parent='#accordion3' href='#collapseOne22'><center>Home Address</center></a>");

    $("#homeAddr").append("<div id='collapseOne22' class='panel-collapse collapse' />");
    $("#collapseOne22").append("<div id='hpanelMainBody' class = 'panel-body' />");
    $("#hpanelMainBody").append("<div id='hpanelRow' class='row' />");

    $("#hpanelRow").append("<center><span id='hpregsuccessBefore'></span></center>");

    $("#hpanelRow").append("<div id='haddr1FieldGroup' class='form-group' />");
    $("#haddr1FieldGroup").append("<label class='col-sm-3 control-label'>Address line1<span class='asterisk'> *</span></label>");
    $("#haddr1FieldGroup").append("<div id='haddr1FieldDiv' class='col-sm-9' />");
    $("#haddr1FieldDiv").append("<input type='text' id='h_address1_u' style='text-transform: capitalize;' class='form-control' placeholder='Address line1' onkeyup='patientreg_keypress(event)'>");
    $("#haddr1FieldDiv").append("<span id='hadd1'></span>");

    $("#hpanelRow").append("<div id='haddr2FieldGroup' class='form-group' />");
    $("#haddr2FieldGroup").append("<label class='col-sm-3 control-label'>Address line2</label>");
    $("#haddr2FieldGroup").append("<div id='haddr2FieldDiv' class='col-sm-9' />");
    $("#haddr2FieldDiv").append("<input type='text' id='h_address2_u' style='text-transform: capitalize;' class='form-control' placeholder='Address line2' onkeyup='patientreg_keypress(event)'>");

    $("#hpanelRow").append("<div id='hcityFieldGroup' class='form-group' />");
    $("#hcityFieldGroup").append("<label class='col-sm-3 control-label'>City<span class='asterisk'> *</span></label>");
    $("#hcityFieldGroup").append("<div id='hcityFieldDiv' class='col-sm-9' />");
    $("#hcityFieldDiv").append("<input type='text' id='h_city_u' style='text-transform: capitalize;' class='form-control' placeholder='City' onkeyup='patientreg_keypress(event)'>");
    $("#hcityFieldDiv").append("<span id='pcity_u'></span>");

    $("#hpanelRow").append("<div id='hstateFieldGroup' class='form-group' />");
    $("#hstateFieldGroup").append("<label class='col-sm-3 control-label'>State<span class='asterisk'> *</span></label>");
    $("#hstateFieldGroup").append("<div id='hstateFieldDiv' class='col-sm-9' />");
    $("#hstateFieldDiv").append("<select id='h_state_u' class='form-control' onchange='patientreg_keypress(event)' />");
    $("#h_state_u").append("<option value=''>Choose One</option><option>Andaman and Nicobar Islands</option><option>Andhra Pradesh</option><option>Arunachal Pradesh</option><option>Assam</option><option>Bihar</option><option>Chandigarh</option><option>Chhattisgarh</option><option>Dadra and Nagar Haveli</option><option>Daman and Diu</option><option>Delhi</option><option>Goa</option><option>Gujarat</option><option>Haryana</option><option>Himachal Pradesh</option><option>Jammu and Kashmir</option><option>Jharkhand</option><option>Karnataka</option><option>Kerala</option><option>Lakshadweep</option><option>Madhya Pradesh</option><option>Maharashtra</option><option>Manipur</option><option>Meghalaya</option><option>Mizoram</option><option>Nagaland</option><option>Orissa</option><option>Pondicherry</option><option>Punjab</option><option>Rajasthan</option><option>Sikkim</option><option>Tamil Nadu</option><option>Telangana</option><option>Tripura</option><option>Uttaranchal</option><option>Uttar Pradesh</option><option>West Bengal</option>");
//<option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option><option>California</option><option>Colorado</option><option>Connecticut</option><option>D.C.</option><option>Delaware</option><option>Florida</option><option>Georgia</option><option>Hawaii</option><option>Idaho</option><option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option><option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option><option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option><option>Missouri</option><option>Montana</option><option>Nebraska</option><option>Nevada</option><option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option><option>New York</option><option>North Carolina</option><option>North Dakota</option><option>Ohio</option><option>Oklahoma</option><option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option><option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option><option>Vermont</option><option>Virginia</option><option>Washington</option><option>West Virginia</option><option>Wisconsin</option><option>Wyoming</option>\n\
    $("#pstateFieldDiv").append("<span id='hstate_u'></span>");

    $("#hpanelRow").append("<div id='hcountryFieldGroup' class='form-group' />");
    $("#hcountryFieldGroup").append("<label class='col-sm-3 control-label'>Country</label>");
    $("#hcountryFieldGroup").append("<div id='hcountryFieldDiv' class='col-sm-9' />");
    $("#hcountryFieldDiv").append("<select id='h_country_u' class='form-control' />");
    $("#h_country_u").append("<option>INDIA</option>");
    $("#hcountryFieldDiv").append("<span id='hcountry_u'></span>");

    $("#hpanelRow").append("<div id='hcodeFieldGroup' class='form-group' />");
    $("#hcodeFieldGroup").append("<label class='col-sm-3 control-label'>Zip</label>");
    $("#hcodeFieldGroup").append("<div id='hcodeFieldDiv' class='col-sm-9' />");
    $("#hcodeFieldDiv").append("<input type='text' id='h_postcode_u' class='form-control' placeholder='Zip' onkeyup='patientreg_keypress(event)'>");
    $("#hcodeFieldDiv").append("<span id='hpostcode_u'></span>");
    $('#h_postcode_u').mask('999999');

    $("#hpanelRow").append("<div id='hhphoneFieldGroup' class='form-group' />");
    $("#hhphoneFieldGroup").append("<label class='col-sm-3 control-label'>Home Phone<span class='asterisk'> *</span></label>");
    $("#hhphoneFieldGroup").append("<div id='hhphoneFieldDiv' class='col-sm-9' />");
    $("#hhphoneFieldDiv").append("<input type='text' id='h_homephone_u' size=15 maxLength=15 class='form-control' placeholder='Home Phone' onkeyup='patientreg_keypress(event)'>");
    $("#hhphoneFieldDiv").append("<span id='hphone_u'></span>");
//        jQuery("#preg_homephone").mask("9999999999");
    //jQuery("#preg_homephone").mask("99999999")

    $("#hpanelRow").append("<div id='hmphoneFieldGroup' class='form-group' />");
    $("#hmphoneFieldGroup").append("<label class='col-sm-3 control-label'>Mobile Phone<span class='asterisk'> *</span></label>");
    $("#hmphoneFieldGroup").append("<div id='hmphoneFieldDiv' class='col-sm-9' />");
    $("#hmphoneFieldDiv").append("<input type='text' id='h_mobilephone_u' size=15 maxLength=15 class='form-control' placeholder='Mobile Phone' onkeyup='patientreg_keypress(event)'>");
    $("#hmphoneFieldDiv").append("<span id='hmphone_u'></span>");

    $("#hpanelRow").append("<div id='hwphoneFieldGroup' class='form-group' />");
    $("#hwphoneFieldGroup").append("<label class='col-sm-3 control-label'>Office Phone<span class='asterisk'> *</span></label>");
    $("#hwphoneFieldGroup").append("<div id='hwphoneFieldDiv' class='col-sm-9' />");
    $("#hwphoneFieldDiv").append("<input type='text' id='h_workphone_u' size=15 maxLength=15 class='form-control' placeholder='Office Phone' onkeyup='patientreg_keypress(event)'>");
    $("#hwphoneFieldDiv").append("<span id='hwphone_u'></span>");


    $("#hpanelRow").append("<div id='hemailFieldGroup1' class='form-group' />");
    $("#hemailFieldGroup1").append("<label class='col-sm-3 control-label'>Email1 </label>");
    $("#hemailFieldGroup1").append("<div id='hemailFieldDiv1' class='col-sm-9' />");
    $("#hemailFieldDiv1").append("<input type='email' id='h_email1_u' class='form-control' placeholder='Email1' onkeyup='patientreg_keypress(event)'>");
    $("#hemailFieldDiv1").append("<span id='hemail1_u'></span>");

    $("#hpanelRow").append("<div id='hemailFieldGroup2' class='form-group' />");
    $("#hemailFieldGroup2").append("<label class='col-sm-3 control-label'>Email2 </label>");
    $("#hemailFieldGroup2").append("<div id='hemailFieldDiv2' class='col-sm-9' />");
    $("#hemailFieldDiv2").append("<input type='email' id='h_email2_u' class='form-control' placeholder='Email2' onkeyup='patientreg_keypress(event)'>");
    $("#hemailFieldDiv2").append("<span id='hemail2_u'></span>");

    $("#hpanelRow").append("<div id='hfaxFieldGroup' class='form-group' />");
    $("#hfaxFieldGroup").append("<label class='col-sm-3 control-label'>Fax </label>");
    $("#hfaxFieldGroup").append("<div id='hfaxFieldDiv' class='col-sm-9' />");
    $("#hfaxFieldDiv").append("<input type='text' id='h_fax_u' class='form-control' placeholder='Fax' onkeyup='patientreg_keypress(event)'>");
    $("#hfaxFieldDiv").append("<span id='hfax_u'></span>");

    //for office
    $("#accordion3").append("<div id='officeAddr' class='panel panel-primary' />");

    $("#officeAddr").append("<div id='thirdPanelHeading' class='panel-heading'/>");
    $("#thirdPanelHeading").append("<h4 id='thirdHeader' class='panel-title' />");
    $("#thirdHeader").append("<a data-toggle='collapse' style='font-weight:bold;font-size:15px;' data-parent='#accordion3' href='#collapseOne33'><center>Office Address</center></a>");

    $("#officeAddr").append("<div id='collapseOne33' class='panel-collapse collapse' />");
    $("#collapseOne33").append("<div id='opanelMainBody' class = 'panel-body' />");
    $("#opanelMainBody").append("<div id='opanelRow' class='row' />");

    $("#opanelRow").append("<center><span id='opregsuccessBefore'></span></center>");

    $("#opanelRow").append("<div id='oaddr1FieldGroup' class='form-group' />");
    $("#oaddr1FieldGroup").append("<label class='col-sm-3 control-label'>Address line1<span class='asterisk'> *</span></label>");
    $("#oaddr1FieldGroup").append("<div id='oaddr1FieldDiv' class='col-sm-9' />");
    $("#oaddr1FieldDiv").append("<input type='text' id='o_address1_u' style='text-transform: capitalize;' class='form-control' placeholder='Address line1' onkeyup='patientreg_keypress(event)'>");
    $("#oaddr1FieldDiv").append("<span id='oadd1_u'></span>");

    $("#opanelRow").append("<div id='oaddr2FieldGroup' class='form-group' />");
    $("#oaddr2FieldGroup").append("<label class='col-sm-3 control-label'>Address line2</label>");
    $("#oaddr2FieldGroup").append("<div id='oaddr2FieldDiv' class='col-sm-9' />");
    $("#oaddr2FieldDiv").append("<input type='text' id='o_address2_u' style='text-transform: capitalize;' class='form-control' placeholder='Address line2' onkeyup='patientreg_keypress(event)'>");

    $("#opanelRow").append("<div id='ocityFieldGroup' class='form-group' />");
    $("#ocityFieldGroup").append("<label class='col-sm-3 control-label'>City<span class='asterisk'> *</span></label>");
    $("#ocityFieldGroup").append("<div id='ocityFieldDiv' class='col-sm-9' />");
    $("#ocityFieldDiv").append("<input type='text' id='o_city_u' style='text-transform: capitalize;' class='form-control' placeholder='City' onkeyup='patientreg_keypress(event)'>");
    $("#ocityFieldDiv").append("<span id='ocity_u'></span>");

    $("#opanelRow").append("<div id='ostateFieldGroup' class='form-group' />");
    $("#ostateFieldGroup").append("<label class='col-sm-3 control-label'>State<span class='asterisk'> *</span></label>");
    $("#ostateFieldGroup").append("<div id='ostateFieldDiv' class='col-sm-9' />");
    $("#ostateFieldDiv").append("<select id='o_state_u' class='form-control' onchange='patientreg_keypress(event)' />");
    $("#o_state_u").append("<option value=''>Choose One</option><option>Andaman and Nicobar Islands</option><option>Andhra Pradesh</option><option>Arunachal Pradesh</option><option>Assam</option><option>Bihar</option><option>Chandigarh</option><option>Chhattisgarh</option><option>Dadra and Nagar Haveli</option><option>Daman and Diu</option><option>Delhi</option><option>Goa</option><option>Gujarat</option><option>Haryana</option><option>Himachal Pradesh</option><option>Jammu and Kashmir</option><option>Jharkhand</option><option>Karnataka</option><option>Kerala</option><option>Lakshadweep</option><option>Madhya Pradesh</option><option>Maharashtra</option><option>Manipur</option><option>Meghalaya</option><option>Mizoram</option><option>Nagaland</option><option>Orissa</option><option>Pondicherry</option><option>Punjab</option><option>Rajasthan</option><option>Sikkim</option><option>Tamil Nadu</option><option>Telangana</option><option>Tripura</option><option>Uttaranchal</option><option>Uttar Pradesh</option><option>West Bengal</option>");
//<option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option><option>California</option><option>Colorado</option><option>Connecticut</option><option>D.C.</option><option>Delaware</option><option>Florida</option><option>Georgia</option><option>Hawaii</option><option>Idaho</option><option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option><option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option><option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option><option>Missouri</option><option>Montana</option><option>Nebraska</option><option>Nevada</option><option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option><option>New York</option><option>North Carolina</option><option>North Dakota</option><option>Ohio</option><option>Oklahoma</option><option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option><option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option><option>Vermont</option><option>Virginia</option><option>Washington</option><option>West Virginia</option><option>Wisconsin</option><option>Wyoming</option>\n\
    $("#ostateFieldDiv").append("<span id='ostate_u'></span>");

    $("#opanelRow").append("<div id='ocountryFieldGroup' class='form-group' />");
    $("#ocountryFieldGroup").append("<label class='col-sm-3 control-label'>Country</label>");
    $("#ocountryFieldGroup").append("<div id='ocountryFieldDiv' class='col-sm-9' />");
    $("#ocountryFieldDiv").append("<select id='o_country_u' class='form-control' />");
    $("#o_country_u").append("<option>INDIA</option>");
    $("#ocountryFieldDiv").append("<span id='ocountry_u'></span>");

    $("#opanelRow").append("<div id='ocodeFieldGroup' class='form-group' />");
    $("#ocodeFieldGroup").append("<label class='col-sm-3 control-label'>Zip</label>");
    $("#ocodeFieldGroup").append("<div id='ocodeFieldDiv' class='col-sm-9' />");
    $("#ocodeFieldDiv").append("<input type='text' id='o_postcode_u' class='form-control' placeholder='Zip' onkeyup='patientreg_keypress(event)'>");
    $("#ocodeFieldDiv").append("<span id='opostcode_u'></span>");
    $('#o_postcode_u').mask('999999');

    $("#opanelRow").append("<div id='ohphoneFieldGroup' class='form-group' />");
    $("#ohphoneFieldGroup").append("<label class='col-sm-3 control-label'>Home Phone<span class='asterisk'> *</span></label>");
    $("#ohphoneFieldGroup").append("<div id='ohphoneFieldDiv' class='col-sm-9' />");
    $("#ohphoneFieldDiv").append("<input type='text' id='o_homephone_u' size=15 maxLength=15 class='form-control' placeholder='Home Phone' onkeyup='patientreg_keypress(event)'>");
    $("#ohphoneFieldDiv").append("<span id='ophone_u'></span>");
//        jQuery("#preg_homephone").mask("9999999999");
    //jQuery("#preg_homephone").mask("99999999")

    $("#opanelRow").append("<div id='omphoneFieldGroup' class='form-group' />");
    $("#omphoneFieldGroup").append("<label class='col-sm-3 control-label'>Mobile Phone<span class='asterisk'> *</span></label>");
    $("#omphoneFieldGroup").append("<div id='omphoneFieldDiv' class='col-sm-9' />");
    $("#omphoneFieldDiv").append("<input type='text' id='o_mobilephone_u' size=15 maxLength=15 class='form-control' placeholder='Mobile Phone' onkeyup='patientreg_keypress(event)'>");
    $("#omphoneFieldDiv").append("<span id='omphone_u'></span>");

    $("#opanelRow").append("<div id='owphoneFieldGroup' class='form-group' />");
    $("#owphoneFieldGroup").append("<label class='col-sm-3 control-label'>Office Phone<span class='asterisk'> *</span></label>");
    $("#owphoneFieldGroup").append("<div id='owphoneFieldDiv' class='col-sm-9' />");
    $("#owphoneFieldDiv").append("<input type='text' id='o_workphone_u' size=15 maxLength=15 class='form-control' placeholder='Office Phone' onkeyup='patientreg_keypress(event)'>");
    $("#owphoneFieldDiv").append("<span id='owphone_u'></span>");


    $("#opanelRow").append("<div id='oemailFieldGroup1' class='form-group' />");
    $("#oemailFieldGroup1").append("<label class='col-sm-3 control-label'>Email1 </label>");
    $("#oemailFieldGroup1").append("<div id='oemailFieldDiv1' class='col-sm-9' />");
    $("#oemailFieldDiv1").append("<input type='email' id='o_email1_u' class='form-control' placeholder='Email1' onkeyup='patientreg_keypress(event)'>");
    $("#oemailFieldDiv1").append("<span id='oemail1_u'></span>");

    $("#opanelRow").append("<div id='oemailFieldGroup2' class='form-group' />");
    $("#oemailFieldGroup2").append("<label class='col-sm-3 control-label'>Email2 </label>");
    $("#oemailFieldGroup2").append("<div id='oemailFieldDiv2' class='col-sm-9' />");
    $("#oemailFieldDiv2").append("<input type='email' id='o_email2_u' class='form-control' placeholder='Email2' onkeyup='patientreg_keypress(event)'>");
    $("#oemailFieldDiv2").append("<span id='oemail2_u'></span>");

    $("#opanelRow").append("<div id='ofaxFieldGroup' class='form-group' />");
    $("#ofaxFieldGroup").append("<label class='col-sm-3 control-label'>Fax </label>");
    $("#ofaxFieldGroup").append("<div id='ofaxFieldDiv' class='col-sm-9' />");
    $("#ofaxFieldDiv").append("<input type='text' id='o_fax_u' class='form-control' placeholder='Fax' onkeyup='patientreg_keypress(event)'>");
    $("#ofaxFieldDiv").append("<span id='ofax_u'></span>");

    //for update button viewUserDataField
    $("#viewUserDataField").append("<center><span id='updateAfterSuccessMsg' /></center><br>");
    $("#viewUserDataField").append("<center><button id='userUpdateButton' class='btn btn-primary mr5' onclick='updateUserDetails()'>Update user</button></center>");
}
