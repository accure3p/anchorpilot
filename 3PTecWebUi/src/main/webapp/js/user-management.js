
var user_selected_org = getUserSessionElement("user_selected_org");
function addNewUserTab() {
//for add new user menu    
//    $("#mainTabMenuDiv").append("<div class='tab-pane active' id='addNewUser' style='width:60%;' />");
    $("#addNewUser").append("<div id='newUserFormDiv' class='form-group' />");
    $("#newUserFormDiv").append("<label class='col-sm-3 control-label'>Select User Role</label>");
    $("#newUserFormDiv").append("<div id='userSelectField' class='col-sm-9' />");
    $("#userSelectField").append("<select id='roleSelect' name='roleSelect' class='form-control' onchange='getRoleInfo()' />");
    $("#roleSelect").append("<option>Choose One</option><option>Admin</option><option>CXO</option><option name='SalesHead' value='SalesHead'>Sales Head</option><option name='SuperAdmin' value='SuperAdmin'>Super Admin</option><option>ASM</option><option>RSM</option><option name='SalesManager' value='SalesManager' >Sales Manager</option><option name='SalesExecutive' value='SalesExecutive' >Sales Executive</option>");
    $('#allUserMenuTab').click(function() {
        getRoleInfo1();
    });
}

//user management start
function getRoleInfo1() {
    var roleIndex = document.getElementById("roleSelect").selectedIndex;
    document.getElementById("roleSelect").options[roleIndex].text = "Choose One";
    getRoleInfo();
}

//displying drop down in user management start
function getRoleInfo() {

    $("#addNewUser").text("").append("<div class='form-group' style='width:60%;' id='roleSelection' />");

    $("#roleSelection").append("<h4>User Details</h4><br>");
    $("#roleSelection").append("<center><span id='userInsertionStatus'></span></center>");
    $("#roleSelection").append("<lable class='col-sm-3 control-label'> Select Organization *</lable>");
    $("#roleSelection").append("<div class='col-sm-9' id='orgSelectElement'/>");
    $("#orgSelectElement").append("<select id='orgSelect' class='form-control'> ");
    selectOrganization();
    $("#orgSelectElement").append("<br/>");
    $("#roleSelection").append("<lable class='col-sm-3 control-label'>First name *</lable>");
    $("#roleSelection").append("<div class='col-sm-9' id='fnameElement'/>");
    $("#fnameElement").append("<input type='text' onkeyup='user_keypress(event)' id='userFirstNameElement' style='text-transform: capitalize;' class='form-control' placeholder='Enter First name'><span id='userFirstNameElementMsg' /><br />");

    $("#roleSelection").append("<lable class='col-sm-3 control-label'>Middle name</lable>");
    $("#roleSelection").append("<div class='col-sm-9' id='mnameElement'/>");
    $("#mnameElement").append("<input type='text' onkeyup='user_keypress(event)' id='userMiddleNameElement' style='text-transform: capitalize;' class='form-control' placeholder='Enter Middle name'><span id='userMiddleNameElementMsg' /><br />");

    $("#roleSelection").append("<lable class='col-sm-3 control-label'>Last name *</lable>");
    $("#roleSelection").append("<div class='col-sm-9' id='lnameElement'/>");
    $("#lnameElement").append("<input type='text' onkeyup='user_keypress(event)' id='userLastNameElement' style='text-transform: capitalize;' class='form-control' placeholder='Enter Last name'><span id='userLastNameElementMsg' /><br />");

    $("#roleSelection").append("<lable class='col-sm-3 control-label'>Gender</lable>");
    $("#roleSelection").append("<div id='genderElementDiv' class='btn-group col-sm-9' data-toggle='buttons' />");
    $("#genderElementDiv").append("<label class='btn blue btn-default active' style='border-radius: 3px; font-weight: 600;' id='r_gen_m'><input type='radio' id='r_gender_m' name='r_gender' value='Male' checked='true' />Male</label><label class='btn blue btn-default' style='margin-left: 15px; border-radius: 3px; font-weight: 600;' id='r_gen_f'><input type='radio' id='r_gender_f' name='r_gender' value='Female' />Female</label><br />");
    $("#roleSelection").append("<lable class='col-sm-3 control-label'>Date of Birth</lable>");
    $("#roleSelection").append("<div class='col-sm-9' id='dobElement'/>");

    $("#dobElement").append("<input type='text' id='userDobElement' class='form-control' placeholder='DD/MM/YYYY'><span id='userDobElementMsg' /><br />");

    jQuery("#userDobElement").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1950:2020',
        maxDate: new Date,
        minDate: new Date(1900, 0, 1),
        dateFormat: dateformate
    });
    jQuery("#userDobElement").mask("99/99/9999");

    $("#roleSelection").append("<lable class='col-sm-3 control-label'>Username *</lable>");
    $("#roleSelection").append("<div class='col-sm-9' id='userNameId'/>");
    $("#userNameId").append("<input type='text' onkeyup='user_keypress(event)' id='userNameElement' size=10 maxlength=10 class='form-control popovers' placeholder='Enter Username' data-toggle='popover' data-placement='top' data-content='UserName : Please enter username between 4-10 characters and 0-9 Numbers.' data-trigger='blur'><a href='javascript:checkusername()' id='checkAvailabilityId'><b>Check Availability</b></a><span id='userNameElementMsg' /><br /><br />");
    $("#checkAvailabilityId").show();

    $("#roleSelection").append("<lable class='col-sm-3 control-label'>Password *</lable>");
    $("#roleSelection").append("<div class='col-sm-9' id='PasswordElement'/>");
    $("#PasswordElement").append("<input type='password' onkeyup='user_keypress(event)' id='userPasswordElement' style='text-transform: capitalize;' class='form-control' placeholder='Enter Password'><span id='userPasswordElementMsg' /><br />");

    $("#roleSelection").append("<lable class='col-sm-3 control-label'>Re-Type Password *</lable>");
    $("#roleSelection").append("<div class='col-sm-9' id='RetypePassword'/>");
    $("#RetypePassword").append("<input type='password' onblur='checkPassword()' id='userReTypePasswordElement' style='text-transform: capitalize;' class='form-control' placeholder='Re-Type Password'><span id='userRetypePasswordElementMsg' /><br />");

//    $("#roleSelection").append("<lable class='col-sm-3 control-label'>Created By *</lable>");
//    $("#roleSelection").append("<div class='col-sm-9' id='createdByUser'/>");
//    $("#createdByUser").append("<input type='text' onkeyup='user_keypress(event)' id='userCreatedByElement' style='text-transform: capitalize;' class='form-control' placeholder='Created by'><span id='userCreatedByElementMsg' /><br />");

    $("#roleSelection").append("<lable class='col-sm-3 control-label'> Select User Role </lable>");
    $("#roleSelection").append("<div class='col-sm-9' id='roleSelectElement'/>");
    $("#roleSelectElement").append("<select id='roleSelect' class='form-control' onchange='selectReportingManagerRole()'> ");
    $("#roleSelect").append("<option value=''>Choose One</option>");
//    $("#roleSelect").append("<option  name='Super Admin' value='Super Admin'>Super Admin</option>");
    $("#roleSelect").append("<option>CEO</option>");
    $("#roleSelect").append("<option>CXO</option>");
    $("#roleSelect").append("<option name='Sales head' value='Sales Head' >Sales Head</option>");
    $("#roleSelect").append("<option>ASM</option>");
    $("#roleSelect").append("<option>RSM</option>");
    $("#roleSelect").append("<option name='Sales Manager' value='Sales Manager' >Sales Manager</option>");
    $("#roleSelect").append("<option name='Sales executive' value='Sales executive' >Sales Executive</option>");
    $("#roleSelectElement").append("<br/>");

    $("#roleSelection").append("<lable class='col-sm-3 control-label'>Reporting Manager Role </lable>");
    $("#roleSelection").append("<div class='col-sm-9' id='reportingManagerElement'/>");
    $("#reportingManagerElement").append("<select id='reportingManagerRoleSelect' class='form-control' onchange='repoertingManagerList()'> ");
    $("#reportingManagerElement").append("<br/>");

    $("#roleSelection").append("<center><span id='userInsertionStatus'></span></center>");
    $("#roleSelection").append("<lable class='col-sm-3 control-label'>Reporting Manager</lable>");
    $("#roleSelection").append("<div class='col-sm-9' id='reportingManagerSelectElement'/>");
    $("#reportingManagerSelectElement").append("<select id='reportingManagerSelect' class='form-control'> ");
    $("#reportingManagerSelectElement").append("<br/><br/>");
//address accordian start...
// for address
    $("#roleSelection").append("<h4>Address Details</h4><br>");
    $("#addNewUser").append("<div class='panel-group' style='width:60%;' id='accordion1' />");
    $("#accordion1").append("<div id='permanentAddr' class='panel panel-primary' />");

    $("#permanentAddr").append("<div id='firstPanelHeading' class='panel-heading'/>");
    $("#firstPanelHeading").append("<h4 id='firstHeader' class='panel-title' />");
    $("#firstHeader").append("<a data-toggle='collapse' style='font-weight:bold;font-size:15px;' data-parent='#accordion1' href='#collapseOne1'><center>Permanent Address</center></a>");

    $("#permanentAddr").append("<div id='collapseOne1' class='panel-collapse collapse in' />");
    $("#collapseOne1").append("<div id='ppanelMainBody' class = 'panel-body' />");
    $("#ppanelMainBody").append("<div id='ppanelRow' class='row' />");

    $("#ppanelRow").append("<center><span id='pregsuccessBefore'></span></center>");

//for first row
    $("#ppanelRow").append("<div id='paddr1FieldGroup' class='form-group' />");
    $("#paddr1FieldGroup").append("<label class='col-sm-3 control-label'>Address line1<span class='asterisk'> *</span></label>");
    $("#paddr1FieldGroup").append("<div id='paddr1FieldDiv' class='col-sm-9' />");
    $("#paddr1FieldDiv").append("<input type='text' id='p_address1' style='text-transform: capitalize;' class='form-control' placeholder='Address line1' onkeyup='patientreg_keypress(event)'>");
    $("#paddr1FieldDiv").append("<span id='padd1'></span>");

    $("#ppanelRow").append("<div id='paddr2FieldGroup' class='form-group' />");
    $("#paddr2FieldGroup").append("<label class='col-sm-3 control-label'>Address line2</label>");
    $("#paddr2FieldGroup").append("<div id='paddr2FieldDiv' class='col-sm-9' />");
    $("#paddr2FieldDiv").append("<input type='text' id='p_address2' style='text-transform: capitalize;' class='form-control' placeholder='Address line2' onkeyup='patientreg_keypress(event)'>");

    $("#ppanelRow").append("<div id='pcityFieldGroup' class='form-group' />");
    $("#pcityFieldGroup").append("<label class='col-sm-3 control-label'>City<span class='asterisk'> *</span></label>");
    $("#pcityFieldGroup").append("<div id='pcityFieldDiv' class='col-sm-9' />");
    $("#pcityFieldDiv").append("<input type='text' id='p_city' style='text-transform: capitalize;' class='form-control' placeholder='City' onkeyup='patientreg_keypress(event)'>");
    $("#pcityFieldDiv").append("<span id='pcity'></span>");

    $("#ppanelRow").append("<div id='pstateFieldGroup' class='form-group' />");
    $("#pstateFieldGroup").append("<label class='col-sm-3 control-label'>State<span class='asterisk'> *</span></label>");
    $("#pstateFieldGroup").append("<div id='pstateFieldDiv' class='col-sm-9' />");
    $("#pstateFieldDiv").append("<select id='p_state' class='form-control' onchange='patientreg_keypress(event)' />");
    $("#p_state").append("<option value=''>Choose One</option><option>Andaman and Nicobar Islands</option><option>Andhra Pradesh</option><option>Arunachal Pradesh</option><option>Assam</option><option>Bihar</option><option>Chandigarh</option><option>Chhattisgarh</option><option>Dadra and Nagar Haveli</option><option>Daman and Diu</option><option>Delhi</option><option>Goa</option><option>Gujarat</option><option>Haryana</option><option>Himachal Pradesh</option><option>Jammu and Kashmir</option><option>Jharkhand</option><option>Karnataka</option><option>Kerala</option><option>Lakshadweep</option><option>Madhya Pradesh</option><option>Maharashtra</option><option>Manipur</option><option>Meghalaya</option><option>Mizoram</option><option>Nagaland</option><option>Orissa</option><option>Pondicherry</option><option>Punjab</option><option>Rajasthan</option><option>Sikkim</option><option>Tamil Nadu</option><option>Telangana</option><option>Tripura</option><option>Uttaranchal</option><option>Uttar Pradesh</option><option>West Bengal</option>");
//<option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option><option>California</option><option>Colorado</option><option>Connecticut</option><option>D.C.</option><option>Delaware</option><option>Florida</option><option>Georgia</option><option>Hawaii</option><option>Idaho</option><option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option><option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option><option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option><option>Missouri</option><option>Montana</option><option>Nebraska</option><option>Nevada</option><option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option><option>New York</option><option>North Carolina</option><option>North Dakota</option><option>Ohio</option><option>Oklahoma</option><option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option><option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option><option>Vermont</option><option>Virginia</option><option>Washington</option><option>West Virginia</option><option>Wisconsin</option><option>Wyoming</option>\n\
    $("#pstateFieldDiv").append("<span id='pstate'></span>");

    $("#ppanelRow").append("<div id='pcountryFieldGroup' class='form-group' />");
    $("#pcountryFieldGroup").append("<label class='col-sm-3 control-label'>Country</label>");
    $("#pcountryFieldGroup").append("<div id='pcountryFieldDiv' class='col-sm-9' />");
    $("#pcountryFieldDiv").append("<select id='p_country' class='form-control' />");
    $("#p_country").append("<option>INDIA</option>");
    $("#pcountryFieldDiv").append("<span id='pcountry'></span>");

    $("#ppanelRow").append("<div id='pcodeFieldGroup' class='form-group' />");
    $("#pcodeFieldGroup").append("<label class='col-sm-3 control-label'>Zip</label>");
    $("#pcodeFieldGroup").append("<div id='pcodeFieldDiv' class='col-sm-9' />");
    $("#pcodeFieldDiv").append("<input type='text' id='p_postcode' class='form-control' placeholder='Zip' onkeyup='patientreg_keypress(event)'>");
    $("#pcodeFieldDiv").append("<span id='ppostcode'></span>");
    $('#p_postcode').mask('999999');

    $("#ppanelRow").append("<div id='phphoneFieldGroup' class='form-group' />");
    $("#phphoneFieldGroup").append("<label class='col-sm-3 control-label'>Home Phone<span class='asterisk'> *</span></label>");
    $("#phphoneFieldGroup").append("<div id='phphoneFieldDiv' class='col-sm-9' />");
    $("#phphoneFieldDiv").append("<input type='text' id='p_homephone' size=15 maxLength=15 class='form-control' placeholder='Home Phone' onkeyup='patientreg_keypress(event)'>");
    $("#phphoneFieldDiv").append("<span id='pphone'></span>");
//        jQuery("#preg_homephone").mask("9999999999");
    //jQuery("#preg_homephone").mask("99999999")
    jQuery("#p_homephone").mask("99999999");

    $("#ppanelRow").append("<div id='pmphoneFieldGroup' class='form-group' />");
    $("#pmphoneFieldGroup").append("<label class='col-sm-3 control-label'>Mobile Phone<span class='asterisk'> *</span></label>");
    $("#pmphoneFieldGroup").append("<div id='pmphoneFieldDiv' class='col-sm-9' />");
    $("#pmphoneFieldDiv").append("<input type='text' id='p_mobilephone' size=15 maxLength=15 class='form-control' placeholder='Mobile Phone' onkeyup='patientreg_keypress(event)'>");
    $("#pmphoneFieldDiv").append("<span id='pmphone'></span>");
    jQuery("#p_mobilephone").mask("9999999999");

    $("#ppanelRow").append("<div id='pwphoneFieldGroup' class='form-group' />");
    $("#pwphoneFieldGroup").append("<label class='col-sm-3 control-label'>Office Phone<span class='asterisk'> *</span></label>");
    $("#pwphoneFieldGroup").append("<div id='pwphoneFieldDiv' class='col-sm-9' />");
    $("#pwphoneFieldDiv").append("<input type='text' id='p_workephone' size=15 maxLength=15 class='form-control' placeholder='Office Phone' onkeyup='patientreg_keypress(event)'>");
    $("#pwphoneFieldDiv").append("<span id='pwphone'></span>");
    jQuery("#p_workephone").mask("9999999999");

    $("#ppanelRow").append("<div id='pemailFieldGroup1' class='form-group' />");
    $("#pemailFieldGroup1").append("<label class='col-sm-3 control-label'>Email1 </label>");
    $("#pemailFieldGroup1").append("<div id='pemailFieldDiv1' class='col-sm-9' />");
    $("#pemailFieldDiv1").append("<input type='email1' id='p_email1' class='form-control' placeholder='Email1' onkeyup='patientreg_keypress(event)'>");
    $("#pemailFieldDiv1").append("<span id='pemail1'></span>");

    $("#ppanelRow").append("<div id='pemailFieldGroup2' class='form-group' />");
    $("#pemailFieldGroup2").append("<label class='col-sm-3 control-label'>Email2 </label>");
    $("#pemailFieldGroup2").append("<div id='pemailFieldDiv2' class='col-sm-9' />");
    $("#pemailFieldDiv2").append("<input type='email2' id='p_email2' class='form-control' placeholder='Email2' onkeyup='patientreg_keypress(event)'>");
    $("#pemailFieldDiv2").append("<span id='pemail2'></span>");

    $("#ppanelRow").append("<div id='pfaxFieldGroup' class='form-group' />");
    $("#pfaxFieldGroup").append("<label class='col-sm-3 control-label'>Fax </label>");
    $("#pfaxFieldGroup").append("<div id='pfaxFieldDiv' class='col-sm-9' />");
    $("#pfaxFieldDiv").append("<input type='text' id='p_fax' class='form-control' placeholder='Fax' onkeyup='patientreg_keypress(event)'>");
    $("#pfaxFieldDiv").append("<span id='pfax'></span>");
    jQuery("#p_fax").mask("9999999999");

    //for home address
    $("#accordion1").append("<div id='homeAddr' class='panel panel-primary' />");

    $("#homeAddr").append("<div id='secondPanelHeading' class='panel-heading'/>");
    $("#secondPanelHeading").append("<h4 id='secondHeader' class='panel-title' />");
    $("#secondHeader").append("<a data-toggle='collapse' style='font-weight:bold;font-size:15px;' data-parent='#accordion1' href='#collapseOne2'><center>Home Address</center></a>");

    $("#homeAddr").append("<div id='collapseOne2' class='panel-collapse collapse' />");
    $("#collapseOne2").append("<div id='hpanelMainBody' class = 'panel-body' />");
    $("#hpanelMainBody").append("<div id='hpanelRow' class='row' />");

    $("#hpanelRow").append("<center><span id='hpregsuccessBefore'></span></center>");

    $("#hpanelRow").append("<div id='haddr1FieldGroup' class='form-group' />");
    $("#haddr1FieldGroup").append("<label class='col-sm-3 control-label'>Address line1<span class='asterisk'> *</span></label>");
    $("#haddr1FieldGroup").append("<div id='haddr1FieldDiv' class='col-sm-9' />");
    $("#haddr1FieldDiv").append("<input type='text' id='h_address1' style='text-transform: capitalize;' class='form-control' placeholder='Address line1' onkeyup='patientreg_keypress(event)'>");
    $("#haddr1FieldDiv").append("<span id='hadd1'></span>");

    $("#hpanelRow").append("<div id='haddr2FieldGroup' class='form-group' />");
    $("#haddr2FieldGroup").append("<label class='col-sm-3 control-label'>Address line2</label>");
    $("#haddr2FieldGroup").append("<div id='haddr2FieldDiv' class='col-sm-9' />");
    $("#haddr2FieldDiv").append("<input type='text' id='h_address2' style='text-transform: capitalize;' class='form-control' placeholder='Address line2' onkeyup='patientreg_keypress(event)'>");

    $("#hpanelRow").append("<div id='hcityFieldGroup' class='form-group' />");
    $("#hcityFieldGroup").append("<label class='col-sm-3 control-label'>City<span class='asterisk'> *</span></label>");
    $("#hcityFieldGroup").append("<div id='hcityFieldDiv' class='col-sm-9' />");
    $("#hcityFieldDiv").append("<input type='text' id='h_city' style='text-transform: capitalize;' class='form-control' placeholder='City' onkeyup='patientreg_keypress(event)'>");
    $("#hcityFieldDiv").append("<span id='pcity'></span>");

    $("#hpanelRow").append("<div id='hstateFieldGroup' class='form-group' />");
    $("#hstateFieldGroup").append("<label class='col-sm-3 control-label'>State<span class='asterisk'> *</span></label>");
    $("#hstateFieldGroup").append("<div id='hstateFieldDiv' class='col-sm-9' />");
    $("#hstateFieldDiv").append("<select id='h_state' class='form-control' onchange='patientreg_keypress(event)' />");
    $("#h_state").append("<option value=''>Choose One</option><option>Andaman and Nicobar Islands</option><option>Andhra Pradesh</option><option>Arunachal Pradesh</option><option>Assam</option><option>Bihar</option><option>Chandigarh</option><option>Chhattisgarh</option><option>Dadra and Nagar Haveli</option><option>Daman and Diu</option><option>Delhi</option><option>Goa</option><option>Gujarat</option><option>Haryana</option><option>Himachal Pradesh</option><option>Jammu and Kashmir</option><option>Jharkhand</option><option>Karnataka</option><option>Kerala</option><option>Lakshadweep</option><option>Madhya Pradesh</option><option>Maharashtra</option><option>Manipur</option><option>Meghalaya</option><option>Mizoram</option><option>Nagaland</option><option>Orissa</option><option>Pondicherry</option><option>Punjab</option><option>Rajasthan</option><option>Sikkim</option><option>Tamil Nadu</option><option>Telangana</option><option>Tripura</option><option>Uttaranchal</option><option>Uttar Pradesh</option><option>West Bengal</option>");
//<option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option><option>California</option><option>Colorado</option><option>Connecticut</option><option>D.C.</option><option>Delaware</option><option>Florida</option><option>Georgia</option><option>Hawaii</option><option>Idaho</option><option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option><option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option><option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option><option>Missouri</option><option>Montana</option><option>Nebraska</option><option>Nevada</option><option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option><option>New York</option><option>North Carolina</option><option>North Dakota</option><option>Ohio</option><option>Oklahoma</option><option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option><option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option><option>Vermont</option><option>Virginia</option><option>Washington</option><option>West Virginia</option><option>Wisconsin</option><option>Wyoming</option>\n\
    $("#pstateFieldDiv").append("<span id='hstate'></span>");

    $("#hpanelRow").append("<div id='hcountryFieldGroup' class='form-group' />");
    $("#hcountryFieldGroup").append("<label class='col-sm-3 control-label'>Country</label>");
    $("#hcountryFieldGroup").append("<div id='hcountryFieldDiv' class='col-sm-9' />");
    $("#hcountryFieldDiv").append("<select id='h_country' class='form-control' />");
    $("#h_country").append("<option>INDIA</option>");
    $("#hcountryFieldDiv").append("<span id='hcountry'></span>");

    $("#hpanelRow").append("<div id='hcodeFieldGroup' class='form-group' />");
    $("#hcodeFieldGroup").append("<label class='col-sm-3 control-label'>Zip</label>");
    $("#hcodeFieldGroup").append("<div id='hcodeFieldDiv' class='col-sm-9' />");
    $("#hcodeFieldDiv").append("<input type='text' id='h_postcode' class='form-control' placeholder='Zip' onkeyup='patientreg_keypress(event)'>");
    $("#hcodeFieldDiv").append("<span id='hpostcode'></span>");
    $('#h_postcode').mask('999999');

    $("#hpanelRow").append("<div id='hhphoneFieldGroup' class='form-group' />");
    $("#hhphoneFieldGroup").append("<label class='col-sm-3 control-label'>Home Phone<span class='asterisk'> *</span></label>");
    $("#hhphoneFieldGroup").append("<div id='hhphoneFieldDiv' class='col-sm-9' />");
    $("#hhphoneFieldDiv").append("<input type='text' id='h_homephone' size=15 maxLength=15 class='form-control' placeholder='Home Phone' onkeyup='patientreg_keypress(event)'>");
    $("#hhphoneFieldDiv").append("<span id='hphone'></span>");
    jQuery("#h_homephone").mask("9999999999");
//        jQuery("#preg_homephone").mask("9999999999");
    //jQuery("#preg_homephone").mask("99999999")

    $("#hpanelRow").append("<div id='hmphoneFieldGroup' class='form-group' />");
    $("#hmphoneFieldGroup").append("<label class='col-sm-3 control-label'>Mobile Phone<span class='asterisk'> *</span></label>");
    $("#hmphoneFieldGroup").append("<div id='hmphoneFieldDiv' class='col-sm-9' />");
    $("#hmphoneFieldDiv").append("<input type='text' id='h_mobilephone' size=15 maxLength=15 class='form-control' placeholder='Mobile Phone' onkeyup='patientreg_keypress(event)'>");
    $("#hmphoneFieldDiv").append("<span id='hmphone'></span>");
    jQuery("#h_mobilephone").mask("9999999999");

    $("#hpanelRow").append("<div id='hwphoneFieldGroup' class='form-group' />");
    $("#hwphoneFieldGroup").append("<label class='col-sm-3 control-label'>Office Phone<span class='asterisk'> *</span></label>");
    $("#hwphoneFieldGroup").append("<div id='hwphoneFieldDiv' class='col-sm-9' />");
    $("#hwphoneFieldDiv").append("<input type='text' id='h_workephone' size=15 maxLength=15 class='form-control' placeholder='Office Phone' onkeyup='patientreg_keypress(event)'>");
    $("#hwphoneFieldDiv").append("<span id='hwphone'></span>");
    jQuery("#h_workephone").mask("9999999999");

    $("#hpanelRow").append("<div id='hemailFieldGroup1' class='form-group' />");
    $("#hemailFieldGroup1").append("<label class='col-sm-3 control-label'>Email1 </label>");
    $("#hemailFieldGroup1").append("<div id='hemailFieldDiv1' class='col-sm-9' />");
    $("#hemailFieldDiv1").append("<input type='email1' id='h_email1' class='form-control' placeholder='Email1' onkeyup='patientreg_keypress(event)'>");
    $("#hemailFieldDiv1").append("<span id='hemail1'></span>");

    $("#hpanelRow").append("<div id='hemailFieldGroup2' class='form-group' />");
    $("#hemailFieldGroup2").append("<label class='col-sm-3 control-label'>Email2 </label>");
    $("#hemailFieldGroup2").append("<div id='hemailFieldDiv2' class='col-sm-9' />");
    $("#hemailFieldDiv2").append("<input type='email2' id='h_email2' class='form-control' placeholder='Email2' onkeyup='patientreg_keypress(event)'>");
    $("#hemailFieldDiv2").append("<span id='hemail2'></span>");

    $("#hpanelRow").append("<div id='hfaxFieldGroup' class='form-group' />");
    $("#hfaxFieldGroup").append("<label class='col-sm-3 control-label'>Fax </label>");
    $("#hfaxFieldGroup").append("<div id='hfaxFieldDiv' class='col-sm-9' />");
    $("#hfaxFieldDiv").append("<input type='text' id='h_fax' class='form-control' placeholder='Fax' onkeyup='patientreg_keypress(event)'>");
    $("#hfaxFieldDiv").append("<span id='hfax'></span>");
    jQuery("#h_fax").mask("9999999999");

    //for office
    $("#accordion1").append("<div id='officeAddr' class='panel panel-primary' />");

    $("#officeAddr").append("<div id='thirdPanelHeading' class='panel-heading'/>");
    $("#thirdPanelHeading").append("<h4 id='thirdHeader' class='panel-title' />");
    $("#thirdHeader").append("<a data-toggle='collapse' style='font-weight:bold;font-size:15px;' data-parent='#accordion1' href='#collapseOne3'><center>Office Address</center></a>");

    $("#officeAddr").append("<div id='collapseOne3' class='panel-collapse collapse' />");
    $("#collapseOne3").append("<div id='opanelMainBody' class = 'panel-body' />");
    $("#opanelMainBody").append("<div id='opanelRow' class='row' />");

    $("#opanelRow").append("<center><span id='opregsuccessBefore'></span></center>");

    $("#opanelRow").append("<div id='oaddr1FieldGroup' class='form-group' />");
    $("#oaddr1FieldGroup").append("<label class='col-sm-3 control-label'>Address line1<span class='asterisk'> *</span></label>");
    $("#oaddr1FieldGroup").append("<div id='oaddr1FieldDiv' class='col-sm-9' />");
    $("#oaddr1FieldDiv").append("<input type='text' id='o_address1' style='text-transform: capitalize;' class='form-control' placeholder='Address line1' onkeyup='patientreg_keypress(event)'>");
    $("#oaddr1FieldDiv").append("<span id='oadd1'></span>");

    $("#opanelRow").append("<div id='oaddr2FieldGroup' class='form-group' />");
    $("#oaddr2FieldGroup").append("<label class='col-sm-3 control-label'>Address line2</label>");
    $("#oaddr2FieldGroup").append("<div id='oaddr2FieldDiv' class='col-sm-9' />");
    $("#oaddr2FieldDiv").append("<input type='text' id='o_address2' style='text-transform: capitalize;' class='form-control' placeholder='Address line2' onkeyup='patientreg_keypress(event)'>");

    $("#opanelRow").append("<div id='ocityFieldGroup' class='form-group' />");
    $("#ocityFieldGroup").append("<label class='col-sm-3 control-label'>City<span class='asterisk'> *</span></label>");
    $("#ocityFieldGroup").append("<div id='ocityFieldDiv' class='col-sm-9' />");
    $("#ocityFieldDiv").append("<input type='text' id='o_city' style='text-transform: capitalize;' class='form-control' placeholder='City' onkeyup='patientreg_keypress(event)'>");
    $("#ocityFieldDiv").append("<span id='ocity'></span>");

    $("#opanelRow").append("<div id='ostateFieldGroup' class='form-group' />");
    $("#ostateFieldGroup").append("<label class='col-sm-3 control-label'>State<span class='asterisk'> *</span></label>");
    $("#ostateFieldGroup").append("<div id='ostateFieldDiv' class='col-sm-9' />");
    $("#ostateFieldDiv").append("<select id='o_state' class='form-control' onchange='patientreg_keypress(event)' />");
    $("#o_state").append("<option value=''>Choose One</option><option>Andaman and Nicobar Islands</option><option>Andhra Pradesh</option><option>Arunachal Pradesh</option><option>Assam</option><option>Bihar</option><option>Chandigarh</option><option>Chhattisgarh</option><option>Dadra and Nagar Haveli</option><option>Daman and Diu</option><option>Delhi</option><option>Goa</option><option>Gujarat</option><option>Haryana</option><option>Himachal Pradesh</option><option>Jammu and Kashmir</option><option>Jharkhand</option><option>Karnataka</option><option>Kerala</option><option>Lakshadweep</option><option>Madhya Pradesh</option><option>Maharashtra</option><option>Manipur</option><option>Meghalaya</option><option>Mizoram</option><option>Nagaland</option><option>Orissa</option><option>Pondicherry</option><option>Punjab</option><option>Rajasthan</option><option>Sikkim</option><option>Tamil Nadu</option><option>Telangana</option><option>Tripura</option><option>Uttaranchal</option><option>Uttar Pradesh</option><option>West Bengal</option>");
//<option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option><option>California</option><option>Colorado</option><option>Connecticut</option><option>D.C.</option><option>Delaware</option><option>Florida</option><option>Georgia</option><option>Hawaii</option><option>Idaho</option><option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option><option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option><option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option><option>Missouri</option><option>Montana</option><option>Nebraska</option><option>Nevada</option><option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option><option>New York</option><option>North Carolina</option><option>North Dakota</option><option>Ohio</option><option>Oklahoma</option><option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option><option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option><option>Vermont</option><option>Virginia</option><option>Washington</option><option>West Virginia</option><option>Wisconsin</option><option>Wyoming</option>\n\
    $("#ostateFieldDiv").append("<span id='ostate'></span>");

    $("#opanelRow").append("<div id='ocountryFieldGroup' class='form-group' />");
    $("#ocountryFieldGroup").append("<label class='col-sm-3 control-label'>Country</label>");
    $("#ocountryFieldGroup").append("<div id='ocountryFieldDiv' class='col-sm-9' />");
    $("#ocountryFieldDiv").append("<select id='o_country' class='form-control' />");
    $("#o_country").append("<option>INDIA</option>");
    $("#ocountryFieldDiv").append("<span id='ocountry'></span>");

    $("#opanelRow").append("<div id='ocodeFieldGroup' class='form-group' />");
    $("#ocodeFieldGroup").append("<label class='col-sm-3 control-label'>Zip</label>");
    $("#ocodeFieldGroup").append("<div id='ocodeFieldDiv' class='col-sm-9' />");
    $("#ocodeFieldDiv").append("<input type='text' id='o_postcode' class='form-control' placeholder='Zip' onkeyup='patientreg_keypress(event)'>");
    $("#ocodeFieldDiv").append("<span id='opostcode'></span>");
    $('#o_postcode').mask('999999');

    $("#opanelRow").append("<div id='ohphoneFieldGroup' class='form-group' />");
    $("#ohphoneFieldGroup").append("<label class='col-sm-3 control-label'>Home Phone<span class='asterisk'> *</span></label>");
    $("#ohphoneFieldGroup").append("<div id='ohphoneFieldDiv' class='col-sm-9' />");
    $("#ohphoneFieldDiv").append("<input type='text' id='o_homephone' size=15 maxLength=15 class='form-control' placeholder='Home Phone' onkeyup='patientreg_keypress(event)'>");
    $("#ohphoneFieldDiv").append("<span id='ophone'></span>");
    jQuery("#o_homephone").mask("9999999999");
//        jQuery("#preg_homephone").mask("9999999999");
    //jQuery("#preg_homephone").mask("99999999")

    $("#opanelRow").append("<div id='omphoneFieldGroup' class='form-group' />");
    $("#omphoneFieldGroup").append("<label class='col-sm-3 control-label'>Mobile Phone<span class='asterisk'> *</span></label>");
    $("#omphoneFieldGroup").append("<div id='omphoneFieldDiv' class='col-sm-9' />");
    $("#omphoneFieldDiv").append("<input type='text' id='o_mobilephone' size=15 maxLength=15 class='form-control' placeholder='Mobile Phone' onkeyup='patientreg_keypress(event)'>");
    $("#omphoneFieldDiv").append("<span id='omphone'></span>");
    jQuery("#o_mobilephone").mask("9999999999");

    $("#opanelRow").append("<div id='owphoneFieldGroup' class='form-group' />");
    $("#owphoneFieldGroup").append("<label class='col-sm-3 control-label'>Office Phone<span class='asterisk'> *</span></label>");
    $("#owphoneFieldGroup").append("<div id='owphoneFieldDiv' class='col-sm-9' />");
    $("#owphoneFieldDiv").append("<input type='text' id='o_workephone' size=15 maxLength=15 class='form-control' placeholder='Office Phone' onkeyup='patientreg_keypress(event)'>");
    $("#owphoneFieldDiv").append("<span id='owphone'></span>");
    jQuery("#o_workephone").mask("9999999999");

    $("#opanelRow").append("<div id='oemailFieldGroup1' class='form-group' />");
    $("#oemailFieldGroup1").append("<label class='col-sm-3 control-label'>Email1 </label>");
    $("#oemailFieldGroup1").append("<div id='oemailFieldDiv1' class='col-sm-9' />");
    $("#oemailFieldDiv1").append("<input type='email1' id='o_email1' class='form-control' placeholder='Email1' onkeyup='patientreg_keypress(event)'>");
    $("#oemailFieldDiv1").append("<span id='oemail1'></span>");

    $("#opanelRow").append("<div id='oemailFieldGroup2' class='form-group' />");
    $("#oemailFieldGroup2").append("<label class='col-sm-3 control-label'>Email2 </label>");
    $("#oemailFieldGroup2").append("<div id='oemailFieldDiv2' class='col-sm-9' />");
    $("#oemailFieldDiv2").append("<input type='email2' id='o_email2' class='form-control' placeholder='Email2' onkeyup='patientreg_keypress(event)'>");
    $("#oemailFieldDiv2").append("<span id='oemail2'></span>");

    $("#opanelRow").append("<div id='ofaxFieldGroup' class='form-group' />");
    $("#ofaxFieldGroup").append("<label class='col-sm-3 control-label'>Fax </label>");
    $("#ofaxFieldGroup").append("<div id='ofaxFieldDiv' class='col-sm-9' />");
    $("#ofaxFieldDiv").append("<input type='text' id='o_fax' class='form-control' placeholder='Fax' onkeyup='patientreg_keypress(event)'>");
    $("#ofaxFieldDiv").append("<span id='ofax'></span>");
    jQuery("#o_fax").mask("9999999999");

    $("#addNewUser").append("<div class='col-sm-9 col-sm-offset-3' id='submitButtonElement' />");
    $("#submitButtonElement").append("<button id='userSubmitButton' class='btn btn-primary mr5' onclick='userInsert()'>Create user</button>");
    $("#submitButtonElement").append("<span id='userMessage'></span>");

    $("#addNewUser").append("&nbsp<br>");

//    $("#addNewUser").append("<div class='col-sm-9 col-sm-offset-3' id='submitButtonElement' />");
//    $("#submitButtonElement").append("<button id='userSubmitButton' class='btn btn-primary mr5' onclick='userInsert()'>Submit</button>");
//    $("#submitButtonElement").append("<span id='userMessage'></span>");
//    }
}//displying drop down in user management end


function selectReportingManagerRole() {
    var managerRole = document.getElementById("roleSelect").value;

    if (managerRole == "") {
        $("#reportingManagerRoleSelect").text("").append("<option value=''>Choose One</option>");
    }
    if (managerRole == "Super Admin") {
        $("#reportingManagerRoleSelect").text("").append("<option value=''>Choose One</option>");
        $("#reportingManagerRoleSelect").append("<option  name='SuperAdmin' value='Super Admin'>Super Admin</option>");
    }
    if (managerRole == "CEO") {
        $("#reportingManagerRoleSelect").text("").append("<option value=''>Choose One</option>");
        $("#reportingManagerRoleSelect").append("<option  name='CEO' value='CEO'>CEO</option>");
    }
    if (managerRole == "CXO") {
        $("#reportingManagerRoleSelect").text("").append("<option value=''>Choose One</option>");
        $("#reportingManagerRoleSelect").append("<option  name='CEO' value='CEO'>CEO</option>");
    }
    if (managerRole == "Sales Head") {
        $("#reportingManagerRoleSelect").text("").append("<option value=''>Choose One</option>");
//        $("#reportingManagerRoleSelect").append("<option  name='SuperAdmin' value='SuperAdmin'>Super Admin</option>");
        $("#reportingManagerRoleSelect").append("<option>CEO</option>");
        $("#reportingManagerRoleSelect").append("<option>CXO</option>");
    }
    if (managerRole == "ASM") {
        $("#reportingManagerRoleSelect").text("").append("<option value=''>Choose One</option>");
//        $("#reportingManagerRoleSelect").append("<option  name='SuperAdmin' value='SuperAdmin'>Super Admin</option>");
        $("#reportingManagerRoleSelect").append("<option>CEO</option>");
        $("#reportingManagerRoleSelect").append("<option>CXO</option>");
        $("#reportingManagerRoleSelect").append("<option name='Sales Head' value='Sales head' >Sales Head</option>");
    }
    if (managerRole == "RSM") {
        $("#reportingManagerRoleSelect").text("").append("<option value=''>Choose One</option>");
//        $("#reportingManagerRoleSelect").append("<option  name='SuperAdmin' value='SuperAdmin'>Super Admin</option>");
        $("#reportingManagerRoleSelect").append("<option>CEO</option>");
        $("#reportingManagerRoleSelect").append("<option>CXO</option>");
        $("#reportingManagerRoleSelect").append("<option name='Sales Head' value='Sales head' >Sales Head</option>");
        $("#reportingManagerRoleSelect").append("<option>ASM</option>");
    }
    if (managerRole == "Sales Manager") {
        $("#reportingManagerRoleSelect").text("").append("<option value=''>Choose One</option>");
//        $("#reportingManagerRoleSelect").append("<option  name='SuperAdmin' value='SuperAdmin'>Super Admin</option>");
        $("#reportingManagerRoleSelect").append("<option>CEO</option>");
        $("#reportingManagerRoleSelect").append("<option>CXO</option>");
        $("#reportingManagerRoleSelect").append("<option name='Sales Head' value='Sales head' >Sales Head</option>");
        $("#reportingManagerRoleSelect").append("<option>ASM</option>");
        $("#reportingManagerRoleSelect").append("<option>RSM</option>");
    }
    if (managerRole == "Sales executive") {
        $("#reportingManagerRoleSelect").text("").append("<option value=''>Choose One</option>");
//        $("#reportingManagerRoleSelect").append("<option  name='SuperAdmin' value='SuperAdmin'>Super Admin</option>");
        $("#reportingManagerRoleSelect").append("<option>CEO</option>");
        $("#reportingManagerRoleSelect").append("<option>CXO</option>");
        $("#reportingManagerRoleSelect").append("<option name='Sales Head' value='Sales head' >Sales Head</option>");
        $("#reportingManagerRoleSelect").append("<option>ASM</option>");
        $("#reportingManagerRoleSelect").append("<option>RSM</option>");
        $("#reportingManagerRoleSelect").append("<option name='Sales Manager' value='Sales Manager' >Sales Manager</option>");
    }
}

// reporting manager List
function repoertingManagerList() {
    $("#reportingManagerSelect").text("");
    var org = $("#orgSelect").val();
    var role = $("#reportingManagerRoleSelect").val();

    $("#reportingManagerSelect").append("<option value=''>Choose Reporting Manager</option>");
    $.get(server_base_url + "FetchUserByRoles", {
        role: role,
        orgId: org
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("userInsertionStatus", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("userInsertionStatus", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            $.each(data, function(index, value) {
                if (value.status == "active") {
                    $("#reportingManagerSelect").append("<option value='" + value._id.$oid + "^^^" + value.type + "'>" + value.fname + " " + value.mname + " " + value.lname + "</option>");
                }
            });
        }

    });
}

//if other roles is selected submit button function start
function userInsert() {
//validation start

//    alert(org.Name);

//    if ($("#userNameElement").val() == "") {
//        $("#userNameElement").addClass("has-error");
//        $("#userNameElement").focus();
//        $("#userNameElementMsg").text("").append("<br /><span class='smallErrorMsg'>Please enter user name.</span>");
//    } else if ($("#userNameElement").val() != "") {
//        $("#userNameElement").removeClass("has-error");
//        $("#userNameElementMsg").text("");
//        if (!isNaN($("#userNameElement").val()) == true) {
//            $("#userNameElement").addClass("has-error");
//            $('#userNameElement').popover('show');
//            $("#userNameElement").focus();
//            $("#userNameElementMsg").text("").append("<br /><span class='smallErrorMsg'>Please enter valid username.</span>");
//            return false;
//        } else if (!$("#userNameElement").val().match(usernameExpression()) && $("#userNameElement").val().length < 4) {
//            $("#userNameElement").addClass("has-error");
//            $('#userNameElement').popover('show');
//            $("#userNameElement").focus();
//            return false;
//        } else if ($("#userNameElement").val().match(usernameExpression()) || $("#userNameElement").val().length >= 4) {
//            $("#userNameElement").removeClass("has-error");
//            $('#userNameElement').popover('hide');
//        }
    checkusername();
//    }
//    if ($("#userFirstNameElement").val() == "") {
//        $("#fnameElement").addClass("has-error");
//        $("#userFirstNameElement").focus();
//        $("#userFirstNameElementMsg").text("").append("<span class='smallErrorMsg'>Please enter first name.</span>");
//    } else if ($("#userFirstNameElement").val() != "") {
//        if (!$("#userFirstNameElement").val().match((cityExpression()))) {
//            $("#userFirstNameElement").focus();
//            $("#fnameElement").addClass("has-error");
//            $("#userFirstNameElementMsg").text("").append("<span class='smallErrorMsg'>Please enter valid first name.</span>");
//            return false;
//        } else {
//            $("#fnameElement").removeClass("has-error");
//            $("#userFirstNameElementMsg").text("");
//        }
//    }
//
//    if ($("#userMiddleNameElement").val() != "") {
//        if (!$("#userMiddleNameElement").val().match((cityExpression()))) {
//            $("#userMiddleNameElement").focus();
//            $("#mnameElement").addClass("has-error");
//            $("#userMiddleNameElementMsg").text("").append("<span class='smallErrorMsg'>Please enter valid middle name.</span>");
//            return false;
//        } else {
//            $("#mnameElement").removeClass("has-error");
//            $("#userMiddleNameElementMsg").text("");
//        }
//    }
//
//    if ($("#userLastNameElement").val() == "") {
//        $("#lnameElement").addClass("has-error");
//        $("#userLastNameElement").focus();
//        $("#userLastNameElementMsg").text("").append("<span class='smallErrorMsg'>Please enter last name.</span>");
//    } else if ($("#userLastNameElement").val() != "") {
//        if (!$("#userLastNameElement").val().match((cityExpression()))) {
//            $("#userLastNameElement").focus();
//            $("#lnameElement").addClass("has-error");
//            $("#userLastNameElementMsg").text("").append("<span class='smallErrorMsg'>Please enter valid last name.</span>");
//            return false;
//        } else {
//            $("#lnameElement").removeClass("has-error");
//            $("#userLastNameElementMsg").text("");
//        }
//    }
//
//    if ($("#userReTypePasswordElement").val() == "" || $("#userPasswordElement").val() == "") {
//        $("#RetypePassword").addClass("has-error");
//        $("#PasswordElement").addClass("has-error");
//        $("#userReTypePasswordElement").focus();
//        $("#userPasswordElement").focus();
//        $("#userRetypePasswordElementMsg").text("").append("<span class='smallErrorMsg'>Please enter password.</span>");
//    } else if ($("#userReTypePasswordElement").val() != "" && $("#userPasswordElement").val() != "") {
//        $("#PasswordElement").removeClass("has-error");
//        $("#RetypePassword").removeClass("has-error");
//        $("#userRetypePasswordElementMsg").text("");
//    }
//
//    if ($("#userCreatedByElement").val() == "") {
//        $("#createdByUser").addClass("has-error");
//        $("#userCreatedByElement").focus();
//        $("#userCreatedByElementMsg").text("").append("<span class='smallErrorMsg'>Please enter created by.</span>");
//    } else if ($("#userCreatedByElement").val() != "") {
//        $("#createdByUser").removeClass("has-error");
//        $("#userCreatedByElementMsg").text("");
//    }
//
//
//    if ($("#userDobElement").val() != "" && validateDate($("#userDobElement").val()) != true) {
//        $("#dobElement").addClass("has-error");
//        $("#userDobElementMsg").text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
//        return false;
//    } else {
//        $("#dobElement").removeClass("has-error");
//        $("#userDobElementMsg").text("");
//    }
//
//    if ($("#userEmail1Element").val() == "") {
//        $("#email1Element").addClass("has-error");
//        $("#userEmail1Element").focus();
//        $("#userEmail1ElementMsg").text("").append("<span class='smallErrorMsg'>Please enter email address.</span>");
//    } else if ($("#userEmail1Element").val() != "") {
//        if ($("#userEmail1Element").val().length > 5) {
//            if (!$("#userEmail1Element").val().match((ValidateEmail()))) {
//                $("#email1Element").addClass("has-error");
//                $("#userEmail1Element").focus();
//                $("#userEmail1ElementMsg").text("").append("<span class='smallErrorMsg'>Invalid email address.</span>");
//                return false;
//            } else {
//                $("#email1Element").removeClass("has-error");
//                $("#userEmail1ElementMsg").text("");
//            }
//        } else {
//            $("#email1Element").removeClass("has-error");
//            $("#userEmail1ElementMsg").text("");
//        }
//    }
//    if ($("#userAddress1Element").val() == "") {
//        $("#address1Element").addClass("has-error");
//        $("#userAddress1Element").focus();
//        $("#userAddress1ElementMsg").text("").append("<span class='smallErrorMsg'>Please enter address.</span>");
//    }
//    if ($("#userStateElement").val() == "") {
//        $("#stateElement").addClass("has-error");
//        $("#userStateElement").focus();
//        $("#userStateElementMsg").text("").append("<span class='smallErrorMsg'>Please select state.</span>");
//    }
//
//    if ($("#userMobilePhoneElement").val() == "") {
//        $("#MobileElement").addClass("has-error");
//        $("#userMobilePhoneElement").focus();
//        $("#userMobilePhoneElementMsg").text("").append("<span class='smallErrorMsg'>Please enter mobile phone.</span>");
//    }
//
//    if ($("#userCityElement").val() == "") {
//        $("#cityElement").addClass("has-error");
//        $("#userCityElement").focus();
//        $("#userCityElementMsg").text("").append("<span class='smallErrorMsg'>Please enter city.</span>");
//    } else if (!$("#userCityElement").val().match((cityExpression()))) {
//        $("#cityElement").addClass("has-error");
//        $("#userCityElement").focus();
//        $("#userCityElementMsg").text("").append("<span class='smallErrorMsg'>Please enter valid city.</span>");
//        return false;
//    }
//
////
//////    if ($("#userNameElement").val().length > 11 || $("#userNameElement").val().length < 4) {
//////        alert("hi");
//////        $("#userNameElement").addClass("has-error");
//////        $("#userNameElement").focus();
//////        $("#userNameElementMsg").text("").append("<br /><span class='smallErrorMsg'>User name length should be 4 to 10 characters.</span>");
//////        return false;
//////    }
//
//
//    if ($("#userNameElement").val() == "" ||
//            $("#userFirstNameElement").val() == "" ||
//            $("#userLastNameElement").val() == "" ||
//            $("#userEmailElement").val() == "" ||
//            $("#userAddress1Element").val() == "" ||
//            $("#userCityElement").val() == "" ||
//            $("#userStateElement").val() == "" ||
//            $("#userMobilePhoneElement").val() == "") {
//        $("#userInsertionStatus").text("").prepend("<span id='updMsg' class='largeErrorMsg'>Please fill all * marked fields.12</span>");
//        $("#userMessage").text("").prepend("<span id='updMsg' class='largeErrorMsg'>Please fill all * marked fields.12</span>");
//    } else {
//        $("#userMessage").text("");
//        $("#userInsertionStatus").text("");

    var userRole = document.getElementById("roleSelect").value;
    var userName = $("#userNameElement").val();
    var userFName = $("#userFirstNameElement").val();
    var userMName = $("#userMiddleNameElement").val();
    var userLName = $("#userLastNameElement").val();
    var userGender = $('input[name=r_gender]:checked').val();
    var userDOB = $("#userDobElement").val();
    var userPassword = $("#userReTypePasswordElement").val();
    var createdBy = getUserSessionElement("CurrentUserId");
    var orgId = getUserSessionElement("OrgId");
    var orgName = $("#orgSelect").val();
    var type = getUserSessionElement("UserType");
    var randt = $("#reportingManagerSelect").val();

//    var createdBy = getUserSessionElement("FullName");
//    alert(createdBy);

//    alert(randt);
    randt = randt.split("^^^");
//    alert(randt);
    var reportingManager = randt[0];
    var usertype = randt[1];

//         permanent adddress
    var p_address1 = $("#p_address1").val();
    var p_address2 = $("#p_address2").val();
    var p_city = $("#p_city").val();
    var p_state = $("#p_state").val();
    var p_country = $("#p_country").val();
    var p_homephone = $("#p_homephone").val();
    var p_mobilephone = $("#p_mobilephone").val();
    var p_workphone = $("#p_workephone").val();
    var p_email1 = $("#p_email1").val();
    var p_email2 = $("#p_email2").val();
    var p_fax = $("#p_fax").val();
    var p_zip = $("#p_postcode").val();
//alert(p_address1);
    // home address
    var h_address1 = $("#h_address1").val();
    var h_address2 = $("#h_address2").val();
    var h_city = $("#h_city").val();
    var h_state = $("#h_state").val();
    var h_country = $("#h_country").val();
    var h_homephone = $("#h_homephone").val();
    var h_mobilephone = $("#h_mobilephone").val();
    var h_email1 = $("#h_email1").val();
    var h_email2 = $("#h_email2").val();
    var h_fax = $("#h_fax").val();
    var h_workphone = $("#h_workephone").val();
    var h_zip = $("#h_postcode").val();
//alert(h_address1);
    //office address
    var o_address1 = $("#o_address1").val();
    var o_address2 = $("#o_address2").val();
    var o_city = $("#o_city").val();
    var o_state = $("#o_state").val();
    var o_country = $("#o_country").val();
    var o_homephone = $("#o_homephone").val();
    var o_mobilephone = $("#o_mobilephone").val();
    var o_email1 = $("#o_email1").val();
    var o_email2 = $("#o_email2").val();
    var o_fax = $("#o_fax").val();
    var o_workphone = $("#o_workephone").val();
    var o_zip = $("#o_postcode").val();
//alert(o_address1);
    var userDetailJson = "";
    if (userFName != null || userFName != undefined) {
        userDetailJson = userDetailJson + "\"fname\":\"" + userFName + "\",";
    }
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
    if (userPassword != null || userPassword != undefined) {
        userDetailJson = userDetailJson + "\"password\":\"" + userPassword + "\",";
    }
    if (createdBy != null || createdBy != undefined) {
        userDetailJson = userDetailJson + "\"createdBy\":\"" + createdBy + "\",";
    }
    if (userRole != null || userRole != undefined) {
        userDetailJson = userDetailJson + "\"roles\":\"" + userRole + "\",";
    }
    if (orgId != null || orgId != undefined) {
        userDetailJson = userDetailJson + "\"orgid\":\"" + orgId + "\",";
    }
    if (type != null || type != undefined) {
        userDetailJson = userDetailJson + "\"type\":\"" + type + "\",";
    }
    if (reportingManager != null || reportingManager != undefined) {
        userDetailJson = userDetailJson + "\"reportingmanagerid\":\"" + reportingManager + "\"";
    }

//premanent address json
    var userPermanentAddressJson = "";
    if (usertype != null || usertype != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"type\":\"" + usertype + "\",";
    }
    if (p_homephone != null || p_homephone != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"homephone\":\"" + p_homephone + "\",";
    }
    if (p_workphone != null || p_workphone != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"workphone\":\"" + p_workphone + "\",";
    }
    if (p_mobilephone != null || p_mobilephone != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"mobilephone\":\"" + p_mobilephone + "\",";
    }
    if (p_fax != null || p_fax != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"fax\":\"" + p_fax + "\",";
    }
    if (p_email1 != null || p_email1 != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"email1\":\"" + p_email1 + "\",";
    }
    if (p_email2 != null || p_email2 != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"email2\":\"" + p_email2 + "\",";
    }
    if (p_address1 != null || p_address1 != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"address1\":\"" + p_address1 + "\",";
    }
    if (p_address2 != null || p_address2 != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"address2\":\"" + p_address2 + "\",";
    }
    if (p_city != null || p_city != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"city\":\"" + p_city + "\",";
    }
    if (p_state != null || p_state != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"state\":\"" + p_state + "\",";
    }
    if (p_country != null || p_country != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"country\":\"" + p_country + "\",";
    }
    if (p_zip != null || p_zip != undefined) {
        userPermanentAddressJson = userPermanentAddressJson + "\"zipcode\":\"" + p_zip + "\",";
    }
    userPermanentAddressJson = userPermanentAddressJson + "\"addresstype\":\"PERMANENT\"";

//    userPermanentAddressJson = "[{" + userPermanentAddressJson + "}]"


    //home address json
    var userHomeAddressJson = "";
    if (usertype != null || usertype != undefined) {
        userHomeAddressJson = userHomeAddressJson + "\"type\":\"" + usertype + "\",";
    }
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
    if (h_zip != null || h_zip != undefined) {
        userHomeAddressJson = userHomeAddressJson + "\"zipcode\":\"" + h_zip + "\",";
    }
    userHomeAddressJson = userHomeAddressJson + "\"addresstype\":\"HOME\"";

//    userHomeAddressJson = "[{" + userHomeAddressJson + "}]"

    //office address json
    var userOfficeAddressJson = "";
    if (usertype != null || usertype != undefined) {
        userOfficeAddressJson = userOfficeAddressJson + "\"type\":\"" + usertype + "\",";
    }
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
    if (o_zip != null || o_zip != undefined) {
        userOfficeAddressJson = userOfficeAddressJson + "\"zipcode\":\"" + o_zip + "\",";
    }
    userOfficeAddressJson = userOfficeAddressJson + "\"addresstype\":\"OFFICE\"";

//userOfficeAddressJson = "[{" + userOfficeAddressJson + "}]"

//    userDetailJson = userDetailJson + "\"address\":[{" + userAddressJson + "}]";

    userDetailJson = "{" + userDetailJson + "}";

    var userAddressJson = "";
//    alert(userPermanentAddressJson);

    userAddressJson = "[{" + userPermanentAddressJson + "},{" + userHomeAddressJson + "},{" + userOfficeAddressJson + "}]";

//    var user_selected_org = getUserSessionElement("user_selected_org");

    $.post(server_base_url + "CreateUser", {
        userDetails: userDetailJson,
        userAddress: userAddressJson
    }).done(function(data) {
        if (data == success) {
            $("#userSubmitButton").hide();
            $("#roleSelection").prepend("<button style='float:right;' class='btn btn-primary mr5' onclick='getRoleInfo1()'>Add New</button>");
            $("#submitButtonElement").append("<button style='float:center;' class='btn btn-primary mr5' onclick='getRoleInfo1()'>Add New</button>");
            $("#userInsertionStatus").text("").append("<span class='largeSuccessMsg'>Account creation successful.</span><br /><br />");
            $("select").attr('disabled', true);
            $("input[type='text']").attr('readonly', true);
            $("input[type='email']").attr('readonly', true);
            $("#r_gen_m").attr("disabled", true);
            $("#r_gen_f").attr("disabled", true);
            $("#roleSelect").attr('disabled', false);
            $("#checkAvailabilityId").hide();
            $("#userNameElementMsg").text("");
        } else if (data == "Email is already registered") {
            displayLargeErrorMessages("userInsertionStatus", "Email is already registered.<br /><br />");
            displaySmallErrorMessages("userEmail1ElementMsg", "Email is already registered.");
            displaySmallErrorMessages("userMessage", "Email is already registered.");
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
//    }//validation if end
}//if other roles is selected submit button function end

//provider form keypress start
function user_keypress(event) {

    if ($("#userCreatedByElement").val() != "") {
        $("#createdByUser").removeClass("has-error");
        $("#userCreatedByElementMsg").text("");
    }
    if ($("#userNameElement").val() != "") {
        $("#userNameElement").val(capitalize($("#userNameElement").val()));
        $("#userNameElement").removeClass("has-error");
        $("#userNameElementMsg").text("");
        if (!isNaN($("#userNameElement").val()) == true) {
            $("#userNameElement").addClass("has-error");
            $('#userNameElement').popover('show');
            $("#userNameElement").focus();
            $("#userNameElementMsg").text("").append("<br /><span class='smallErrorMsg'>Please enter valid username.</span>");
            return false;
        } else if (!$("#userNameElement").val().match(usernameExpression()) && $("#userNameElement").val().length < 4) {
            $("#userNameElement").addClass("has-error");
            $('#userNameElement').popover('show');
            $("#userNameElement").focus();
            return false;
        } else if ($("#userNameElement").val().match(usernameExpression()) || $("#userNameElement").val().length >= 4) {
            $("#userNameElement").removeClass("has-error");
            $('#userNameElement').popover('hide');
        }
    }

    if ($("#userFirstNameElement").val() != "") {
        $("#userFirstNameElement").val(capitalize($("#userFirstNameElement").val()));
        if (!$("#userFirstNameElement").val().match((cityExpression()))) {
            $("#userFirstNameElement").focus();
            $("#fnameElement").addClass("has-error");
            $("#userFirstNameElementMsg").text("").append("<span class='smallErrorMsg'>Please enter valid first name.</span>");
            return false;
        } else {
            $("#fnameElement").removeClass("has-error");
            $("#userFirstNameElementMsg").text("");
        }
    }

    if ($("#userMiddleNameElement").val() != "") {
        $("#userMiddleNameElement").val(capitalize($("#userMiddleNameElement").val()));
        if (!$("#userMiddleNameElement").val().match((cityExpression()))) {
            $("#userMiddleNameElement").focus();
            $("#mnameElement").addClass("has-error");
            $("#userMiddleNameElementMsg").text("").append("<span class='smallErrorMsg'>Please enter valid middle name.</span>");
            return false;
        } else {
            $("#mnameElement").removeClass("has-error");
            $("#userMiddleNameElementMsg").text("");
        }
    }

    if ($("#userLastNameElement").val() != "") {
        $("#userLastNameElement").val(capitalize($("#userLastNameElement").val()));
        if (!$("#userLastNameElement").val().match((cityExpression()))) {
            $("#userLastNameElement").focus();
            $("#lnameElement").addClass("has-error");
            $("#userLastNameElementMsg").text("").append("<span class='smallErrorMsg'>Please enter valid last name.</span>");
            return false;
        } else {
            $("#lnameElement").removeClass("has-error");
            $("#userLastNameElementMsg").text("");
        }
    }

    if ($("#userDobElement").val() != "" && validateDate($("#userDobElement").val()) != true) {
        $("#dobElement").addClass("has-error");
        $("#userDobElementMsg").text("").append("<span class='smallErrorMsg'>Please enter valid date.</span>");
        return false;
    } else {
        $("#dobElement").removeClass("has-error");
        $("#userDobElementMsg").text("");
    }

    if ($("#userEmail1Element").val() != "") {
        if ($("#userEmail1Element").val().length > 5) {
            if (!$("#userEmail1Element").val().match((ValidateEmail()))) {
                $("#email1Element").addClass("has-error");
                $("#userEmail1Element").focus();
                $("#userEmail1ElementMsg").text("").append("<span class='smallErrorMsg'>Invalid email address.</span>");
                return false;
            } else {
                $("#email1Element").removeClass("has-error");
                $("#userEmail1ElementMsg").text("");
            }
        } else {
            $("#email1Element").removeClass("has-error");
            $("#userEmail1ElementMsg").text("");
        }
    }


    if ($("#userAddress1Element").val() != "") {
        $("#userAddress1Element").val(capitalize($("#userAddress1Element").val()));
        $("#address1Element").removeClass("has-error");
        $("#userAddress1ElementMsg").text("");
    }

    if ($("#userCityElement").val() != "") {
        $("#userCityElement").val(capitalize($("#userCityElement").val()));
        if (!$("#userCityElement").val().match((cityExpression()))) {
            $("#cityElement").addClass("has-error");
            $("#userCityElement").focus();
            $("#userCityElementMsg").text("").append("<span class='smallErrorMsg'>Please enter valid city.</span>");
            return false;
        }
        $("#cityElement").removeClass("has-error");
        $("#userCityElementMsg").text("");
    }

    if ($("#userStateElement").val() != "") {
        $("#stateElement").removeClass("has-error");
        $("#userStateElementMsg").text("");
    }

    if ($("#userMobilePhoneElement").val() != "") {
        $("#MobileElement").removeClass("has-error");
        $("#userMobilePhoneElementMsg").text("");
    }



    if ($("#userNameElement").val() != "" &&
            $("#userFirstNameElement").val() != "" &&
            $("#userLastNameElement").val() != "" &&
            $("#userEmailElement").val() != "" &&
            $("#userAddress1Element").val() != "" &&
            $("#userCityElement").val() != "" &&
            $("#userStateElement").val() != "" &&
            $("#userMobilePhoneElement").val() != "") {
        $("#userInsertionStatus").text("");
        $("#userMessage").text("");
    }
}//provider form keypress end
// check password..
function checkPassword() {
    var password = $("#userReTypePasswordElement").val();
    var conformPassword = $("#userPasswordElement").val();
    if (password != conformPassword) {
        $("#RetypePassword").addClass("has-error");
        $("#userRetypePasswordElementMsg").text("").append("<span class='smallErrorMsg'>Password and Re-Type Password must be same</span>");
        $("#userReTypePasswordElement").val("").focus();
        $("#userPasswordElement").focus();
        return false;
    } else {
        $("#RetypePassword").removeClass("has-error");
        $("#PasswordElement").removeClass("has-error");
        $("#userRetypePasswordElementMsg").text("");
    }
}

function resetUserPassword(id) {
    $.get(server_base_url + "/3PTec-server/ResetPassword", {
        loginId: id
    }).done(function(data) {
        if (data == success) {
            displayLargeSuccessMessages("ViewUserSelectionMainDivHeader", "<center>" + successMessage + "</center>");
        } else if (data == fail) {
            displayLargeErrorMessages("ViewUserSelectionMainDivHeader", "<center>" + failMessage + "</center>");
        } else if (data == unauthorized) {
            displayLargeErrorMessages("ViewUserSelectionMainDivHeader", "<center>" + unauthorizedMessage + "</center>");
        } else if (data == invalidSession) {
            callSessionTimeout();
        }
    });
}//reset user password end

//checking username availability
function checkusername() {
    if ($("#userNameElement").val().length >= 4) {
        $.post(server_base_url + "CheckUserAvailability", {
            loginId: $("#userNameElement").val()
        }).done(function(data) {
            if (data == fail || data == "fail") {
                displaySmallErrorMessages("userNameElementMsg", "<br />Username already exists.");
                displayLargeErrorMessages("userInsertionStatus", "Please fill all * marked fields.");
                displayLargeErrorMessages("userMessage", "Please fill all * marked fields.");
                $("#userNameElement").addClass("has-error");
                $('#userNameElement').popover('show');
                $("#userNameElement").focus();
                return false;
            } else if (data == success) {
                displaySmallSuccessMessages("userNameElementMsg", "<br />Username available.");
                $("#userNameElement").removeClass("has-error");
                $('#userNameElement').popover('hide');
                return true;
            }
        });
    }
}

function showLicenseDocument(div) {
//    $("#showLicenseDiv").text("").append("<iframe src='../TermsAndConditions/TermsAndConditions.pdf' frameborder='1' scrolling='auto' toolbar='disabled' height='30%' width='100%' target='_blank'></iframe>");
    $("#" + div).text("").append("<object type='application/pdf' data='../TermsAndConditions/TermsAndConditions.pdf' width='100%' height='30%' />");
}

//sam...
function selectOrganization() {
    $("#orgSelect").text("");
    $.get(server_base_url + "FetchChildOrganizations", {
        orgId: getUserSessionElement("OrgId")
    }).done(function(data) {
        $("#orgSelect").append("<option value=''>Choose Organization</option>");
        $("#orgSelect").append("<option value='" + getUserSessionElement("OrgId") + "'>" + getUserSessionElement("OrgName") + "</option>");
        $.each(data, function(index, value) {
            if (value.status == "active") {
                $("#orgSelect").append("<option value='" + value._id.$oid + "'>" + value.name + "</option>");
            }
        });
    });
}

