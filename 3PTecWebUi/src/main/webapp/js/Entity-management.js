/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function addEntityManagement() {
    addHover("addEntityManagementMenu");
    displayEntitySubMenu();
}

function displayEntitySubMenu() {

    $("#dashboard-body").text("").append("<div class='col-md-12' id='orgMenuTab' />");
    $("#orgMenuTab").append("<ul class='nav nav-tabs nav-justified nav-metro nav-primary' id='OrgMenuItem' />");

    $("#OrgMenuItem").append("<li class='active'><a href='#distributorManagement' data-toggle='tab'><strong>Distributor Management</strong></a></li>");
    $("#OrgMenuItem").append("<li class=''><a href='#zoneManagement' data-toggle='tab'><strong>Zone Management</strong></a></li>");
    $("#OrgMenuItem").append("<li class=''><a href='#routeManagement' data-toggle='tab'><strong>Route Management</strong></a></li>");
    $("#OrgMenuItem").append("<li class=''><a href='#masterDataManagement' data-toggle='tab'><strong>Master Data Management</strong></a></li>");
    $("#OrgMenuItem").append("<li class=''><a href='#userManagement' data-toggle='tab'><strong>User Management</strong></a></li>");

    $("#orgMenuTab").append("<div class='tab-content tab-content-primary mb30' id='OrgMenuMainContent' />");

    $("#OrgMenuMainContent").append("<div class='tab-pane active' id='distributorManagement' ><div id='OrgData1'></div></div>");
    distributorMenu();

    $("#OrgMenuMainContent").append("<div class='tab-pane' id='zoneManagement' ><div id='OrgData1'></div></div>");
    addSubZoneMenu();

    $("#OrgMenuMainContent").append("<div class='tab-pane' id='userManagement' ><div id='OrgData2'></div></div>");
    addNewUser();

    $("#OrgMenuMainContent").append("<div class='tab-pane' id='routeManagement' ><div id='OrgData2'></div></div>");
    displayRouteSubMenu();

    $("#OrgMenuMainContent").append("<div class='tab-pane' id='masterDataManagement' ><div id='OrgData2'></div></div>");
    addSubMasterDataMenu();

}



function distributorMenu() {

    $("#distributorManagement").text("").append("<div class='col-md-13' id='entityMenuTab' />");
    $("#entityMenuTab").append("<ul class='nav nav-tabs nav-success' id='entityMenuItem' />");

    $("#entityMenuItem").append("<li class='active'><a href='#viewEntityTable' data-toggle='tab'><strong>View distributor</strong></a></li>");
    $("#entityMenuItem").append("<li class=''><a href='#addEntityField' data-toggle='tab'><strong>Add distributor</strong></a></li>");

    $("#entityMenuTab").append("<div class='tab-content tab-content-primary mb30' id='entityMenuMainContent' />");

    $("#entityMenuMainContent").append("<div class='tab-pane ' id='addEntityField' ><div id='entityData1'></div></div>");
    entityForm();

    $("#entityMenuMainContent").append("<div class='tab-pane active' id='viewEntityTable' ><div id='entityData2'></div></div>");
    viewEntityField();

}

function viewEntityField() {

    $("#viewEntityTable").text("").append("<br><div class='form-group' id='viewEntityTableMainId' />");
    $("#viewEntityTableMainId").append("<div id = 'displayViewEntitySubDiv' class = 'panel panel-primary-head' />");
    $("#displayViewEntitySubDiv").append("<table id='displayViewEntityTable' class='table table-striped table-bordered'>");
    $("#displayViewEntityTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i>Entity name</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i>Group name</th><th style='min-width:15%;width:auto;'>Entity Type</th><th style='min-width:18%;width:18%;'>Update/Delete</th></tr></thead>");
    $("#displayViewEntityTable").append("<tbody id='displayViewEntityTableBody' />");

    $("#displayViewEntityTableBody").append("<tr><td>Abhishek Kumar</td><td>Accure</td><td>Accure</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;'></span><span class='fa fa-trash-o' style='margin-left:15%;'></span></td></tr>");
    $("#displayViewEntityTableBody").append("<tr><td>Somesh Kumar</td><td>Accure</td><td>Accure</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;'></span><span class='fa fa-trash-o' style='margin-left:15%;'></span></td></tr>");
    $("#displayViewEntityTableBody").append("<tr><td>Mani Kumar</td><td>Accure</td><td>Accure</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;'></span><span class='fa fa-trash-o' style='margin-left:15%;'></span></td></tr>");

    var shTable = jQuery('#displayViewEntityTable').DataTable({
        "fnDrawCallback": function(oSettings) {
            jQuery('#displayViewEntityTable ul').addClass('pagination-active-dark');
        },
        responsive: false
    });

    jQuery('div.dataTables_length select').removeClass('form-control input-sm');
    jQuery('div.dataTables_length select').css({width: '60px'});
    jQuery('div.dataTables_length select').select2({
        minimumResultsForSearch: -1
    });

}


function entityForm() {

    $("#addEntityField").text("").append("<br><br><div class='form-group' id='addEntityForm' />");

    $("#addEntityForm").append("<lable class='col-sm-3 control-label'>Parent entity Id *</lable>");
    $("#addEntityForm").append("<div class='col-sm-9' id='parentEntityId'/>");
    $("#parentEntityId").append("<input type='text' onkeyup=common_keypress('parentEntityId') id='parentEntityIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Parent zone id'><span id='parentEntityIdElementMsg' /><br />");

    $("#addEntityForm").append("<lable class='col-sm-3 control-label'>Entity Id *</lable>");
    $("#addEntityForm").append("<div class='col-sm-9' id='addEntityId'/>");
    $("#addEntityId").append("<input type='text' onkeyup=common_keypress('addEntityId') id='addEntityIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Entity id'><span id='addEntityIdElementMsg' /><br />");

    $("#addEntityForm").append("<lable class='col-sm-3 control-label'>Group Name *</lable>");
    $("#addEntityForm").append("<div class='col-sm-9' id='groupEntityId'/>");
    $("#groupEntityId").append("<input type='text' onkeyup=common_keypress('groupEntityId') id='groupEntityIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Group name'><span id='groupEntityIdElementMsg' /><br />");

    $("#addEntityForm").append("<lable class='col-sm-3 control-label'>Zone Id *</lable>");
    $("#addEntityForm").append("<div class='col-sm-9' id='entityZoneId'/>");
    $("#entityZoneId").append("<input type='text' onkeyup=common_keypress('entityZoneId') id='entityZoneIdElement' style='text-transform: capitalize;' class='form-control' placeholder='zone id'><span id='entityZoneIdElementMsg' /><br />");

    $("#addEntityForm").append("<lable class='col-sm-3 control-label'>Entity Type *</lable>");
    $("#addEntityForm").append("<div class='col-sm-9' id='entityTypeId'/>");
    $("#entityTypeId").append("<input type='text' onkeyup=common_keypress('entityTypeId') id='entityTypeIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Entity Type '><span id='entityTypeIdElementMsg' /><br />");

    $("#addEntityForm").append("<lable class='col-sm-3 control-label'>Route Id *</lable>");
    $("#addEntityForm").append("<div class='col-sm-9' id='entityRouteId'/>");
    $("#entityRouteId").append("<input type='text' onkeyup=common_keypress('entityRouteId') id='entityRouteIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Route Id'><span id='entityRouteIdElementMsg' /><br />");

    $("#addEntityForm").append("<lable class='col-sm-3 control-label'>Home phone</lable>");
    $("#addEntityForm").append("<div class='col-sm-9' id='homePhoneId'/>");
    $("#homePhoneId").append("<input type='text' onkeyup=common_keypress('homePhoneId') id='homePhoneIdElement' style='text-transform: capitalize;' class='form-control' placeholder='home PhoneId'><span id='homePhoneIdElementMsg' /><br />");

    $("#addEntityForm").append("<lable class='col-sm-3 control-label'>Work phone</lable>");
    $("#addEntityForm").append("<div class='col-sm-9' id='workPhoneId'/>");
    $("#workPhoneId").append("<input type='text' onkeyup=common_keypress('workPhoneId') id='workPhoneIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Work PhoneId'><span id='workPhoneIdElementMsg' /><br />");

    $("#addEntityForm").append("<lable class='col-sm-3 control-label'>Mobile phone *</lable>");
    $("#addEntityForm").append("<div class='col-sm-9' id='mobilePhoneId'/>");
    $("#mobilePhoneId").append("<input type='text' onkeyup=common_keypress('mobilePhoneId') id='mobilePhoneIdElement' style='text-transform: capitalize;' class='form-control' placeholder='mobile Phone '><span id='mobilePhoneIdElementMsg' /><br />");


    $("#addEntityForm").append("<lable class='col-sm-3 control-label'>Fax </lable>");
    $("#addEntityForm").append("<div class='col-sm-9' id='faxId'/>");
    $("#faxId").append("<input type='text' onkeyup=common_keypress('faxId') id='faxIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Fax'><span id='faxIdElementMsg' /><br />");

    $("#addEntityForm").append("<lable class='col-sm-3 control-label'>Email 1 *</lable>");
    $("#addEntityForm").append("<div class='col-sm-9' id='email1Id'/>");
    $("#email1Id").append("<input type='text' onkeyup=common_keypress('email1Id') id='email1IdElement' style='text-transform: capitalize;' class='form-control' placeholder='email 1'><span id='email1IdElementMsg' /><br />");

    $("#addEntityForm").append("<lable class='col-sm-3 control-label'>email 2 </lable>");
    $("#addEntityForm").append("<div class='col-sm-9' id='email2Id'/>");
    $("#email2Id").append("<input type='text' onkeyup=common_keypress('email2Id') id='email2IdElement' style='text-transform: capitalize;' class='form-control' placeholder='Email 2'><span id='email2IdElementMsg' /><br />");

    $("#addEntityForm").append("<lable class='col-sm-3 control-label'>Address 1 *</lable>");
    $("#addEntityForm").append("<div class='col-sm-9' id='address1Id'/>");
    $("#address1Id").append("<input type='text' onkeyup=common_keypress('address1Id') id='address1IdElement' style='text-transform: capitalize;' class='form-control' placeholder='Address 1'><span id='address1IdElementMsg' /><br />");

    $("#addEntityForm").append("<lable class='col-sm-3 control-label'>Address 2</lable>");
    $("#addEntityForm").append("<div class='col-sm-9' id='address2Id'/>");
    $("#address2Id").append("<input type='text' onkeyup=common_keypress('address2Id') id='address2IdElement' style='text-transform: capitalize;' class='form-control' placeholder='Address 2'><span id='address2IdElementMsg' /><br />");

    $("#addEntityForm").append("<lable class='col-sm-3 control-label'>city *</lable>");
    $("#addEntityForm").append("<div class='col-sm-9' id='cityId'/>");
    $("#cityId").append("<input type='text' onkeyup=common_keypress('cityId') id='cityIdElement' style='text-transform: capitalize;' class='form-control' placeholder='City'><span id='cityIdElementMsg' /><br />");

    $("#addEntityForm").append("<lable class='col-sm-3 control-label'>State *</lable>");
    $("#addEntityForm").append("<div class='col-sm-9' id='stateId' onchange='otherUser_keypress(event)' />");
    $("#stateId").append("<select id='stateIdElement' class='form-control' /><span id='stateIdElementMsg' /><br />");
    $("#stateIdElement").append("<option value=''>Choose One</option>\n\
\n\<option>Andaman and Nicobar Islands</option><option>Andhra Pradesh</option><option>Arunachal Pradesh</option><option>Assam</option><option>Bihar</option><option>Chandigarh</option><option>Chhattisgarh</option><option>Dadra and Nagar Haveli</option><option>Daman and Diu</option><option>Delhi</option><option>Goa</option><option>Gujarat</option><option>Haryana</option><option>Himachal Pradesh</option><option>Jammu and Kashmir</option><option>Jharkhand</option><option>Karnataka</option><option>Kerala</option><option>Lakshadweep</option><option>Madhya Pradesh</option><option>Maharashtra</option><option>Manipur</option><option>Meghalaya</option><option>Mizoram</option><option>Nagaland</option><option>Orissa</option><option>Pondicherry</option><option>Punjab</option><option>Rajasthan</option><option>Sikkim</option><option>Tamil Nadu</option><option>Telangana</option><option>Tripura</option><option>Uttaranchal</option><option>Uttar Pradesh</option><option>West Bengal</option>");

    $("#addEntityForm").append("<lable class='col-sm-3 control-label'>Country</lable>");
    $("#addEntityForm").append("<div class='col-sm-9' id='countryId'/>");
    $("#countryId").append("<select id='countryIdElement' class='form-control' /><br />");
    $("#countryIdElement").append("<option>INDIA</option>");

    $("#addEntityForm").append("<lable class='col-sm-3 control-label'>Zip</lable>");
    $("#addEntityForm").append("<div class='col-sm-9' id='zipId'/>");
    $("#zipId").append("<input type='text' onkeyup='otherUser_keypress(event)' id='zipIdElement' class='form-control' placeholder='Enter Zip'><br />");
    jQuery("#zipIdElement").mask('999999');

    $("#addEntityForm").append("<lable class='col-sm-3 control-label'> Select Address Type </lable>");
    $("#addEntityForm").append("<div class='col-sm-9' id='addressTypeId'/>");
    $("#addressTypeId").append("<select id='addressTypeIdElement' class='form-control'>");
    $("#addressTypeIdElement").append("<option>Choose One</option>");
    $("#addressTypeIdElement").append("<option>Home</option>");
    $("#addressTypeIdElement").append("<option>Office</option>");

    $("#addEntityForm").append("&nbsp<br>");


    $("#addEntityForm").append("&nbsp;<br>");
    $("#addEntityForm").append("<lable class='col-sm-3 control-label'></lable>");
    $("#addEntityForm").append("<div class='col-sm-9' id='submitEntitybutton'/>");
    $("#submitEntitybutton").append("<button id='otherUserSubmitButton' class='btn btn-primary mr5' onclick='validate_Entity()'>Submit</button>");
    $("#submitEntitybutton").append("<span id='stockItemErrorElementMsg'></span>");

}

function validate_Entity() {

    if ($("#parentEntityIdElement").val() == "") {
        $("#parentEntityId").addClass("has-error");
        $("#parentEntityIdElement").focus();
        $("#parentEntityIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter parent entity Id.</span><br />");
    }
    if ($("#addEntityIdElement").val() == "") {
        $("#addEntityId").addClass("has-error");
        $("#addEntityIdElement").focus();
        $("#addEntityIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter entity Id.</span><br />");
    }
    if ($("#groupEntityIdElement").val() == "") {
        $("#groupEntityId").addClass("has-error");
        $("#groupEntityIdElement").focus();
        $("#groupEntityIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter group Name.</span><br />");
    }
    if ($("#entityZoneIdElement").val() == "") {
        $("#entityZoneId").addClass("has-error");
        $("#entityZoneIdElement").focus();
        $("#entityZoneIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter zone Id.</span><br />");
    }
    if ($("#entityTypeIdElement").val() == "") {
        $("#entityTypeId").addClass("has-error");
        $("#entityTypeIdElement").focus();
        $("#entityTypeIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter entity Type.</span><br />");
    }
    if ($("#entityRouteIdElement").val() == "") {
        $("#entityRouteId").addClass("has-error");
        $("#entityRouteIdElement").focus();
        $("#entityRouteIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter route Id.</span><br />");
    }
    if ($("#parentEntityIdElement").val() == "" || $("#addEntityIdElement").val() == "" || $("#groupEntityIdElement").val() == ""
            || $("#entityZoneIdElement").val() == "" || $("#entityTypeIdElement").val() == "" || $("#entityRouteIdElement").val() == "") {
        return false;
    } else {
        addEntity();
    }

}
function addEntity() {
    var parentEntityId = $("#parentEntityIdElement").val();
    var entityId = $("#addEntityIdElement").val();
    var entityGroup = $("#groupEntityIdElement").val();
    var entityZoneId = $("#entityZoneIdElement").val();
    var entityTypeId = $("#entityTypeIdElement").val();
    var entityRouteId = $("#entityRouteIdElement").val();

}