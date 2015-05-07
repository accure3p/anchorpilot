/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function viewRetailerSubMenu() {

    $("#retailerManagement").text("").append("<div class='col-md-13' id='retailerMenuTab' />");
    $("#retailerMenuTab").append("<ul class='nav nav-tabs nav-success' id='retailerMenuTabMenuTabli' />");

    $("#retailerMenuTabMenuTabli").append("<li class='active' style='cursor:pointer' id='viewRetailerFieldLiId' ><a onclick='viewRetailerTab()' data-toggle='tab'><strong>View Retailer</strong></a></li>");
    $("#retailerMenuTabMenuTabli").append("<li class='' style='cursor:pointer' id='addRetailerFieldLiId' ><a onclick='addRetailerTab()' data-toggle='tab'><strong>Add retailer</strong></a></li>");

    $("#retailerMenuTab").append("<div class='tab-content tab-content-primary mb30' id='retailerMenuMainContent' />");

    $("#retailerMenuMainContent").append("<div class='tab-pane active' id='viewRetailerField' ><div id='OrgData1'></div></div>");
    viewRetailerTable();

    $("#retailerMenuMainContent").append("<div class='tab-pane' id='addRetailerField' ><div id='OrgData2'></div></div>");
    addRetailerForm('addRetailerField');

}

function viewRetailerTab() {
    $("#viewRetailerField").show();
    $("#addRetailerField").hide();
    viewRetailerTable();
}
function addRetailerTab() {
    $("#viewRetailerField").hide();
    $("#addRetailerField").show();
    viewRetailerTable();
    addRetailerForm('addRetailerField');
}

function viewRetailerTable() {

    $("#viewRetailerField").text("").append("<div class='form-group' id='viewRetailerErrorMsgId' />");
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
                $("#viewRetailerField").append("<div class='form-group' id='viewRetailerTableMainId' />");
                $("#viewRetailerTableMainId").append("<div id = 'viewRetailerSubDiv' class = 'panel panel-primary-head' />");

                $("#viewRetailerSubDiv").append("<table id='viewRetailerTable' class='table table-striped table-bordered'>");
                $("#viewRetailerTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'>Zone Name</th>\n\
                <th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i>Retailer name</th>\n\
                <th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i>Group name</th>\n\
                <th style='min-width:18%;width:18%;'>Update</th></tr></thead>");
                $("#viewRetailerTable").append("<tbody id='viewRetailerTableBody' />");

                $.each(data, function(index, value) {
//                $("#viewRetailerTableBody").append("<tr><td>Jug Traders</td><td>FMCG</td><td>25/2/2015</td><td>RT</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;'></span><span class='fa fa-trash-o' style='margin-left:15%;'></span></td></tr>");
                    $("#viewRetailerTableBody").append("<tr><td>" + value.ZoneName + "</td><td>" + value.org.name + "</td><td>" + value.org.groupname + "</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;cursor:pointer' onclick=editRetailer('" + value.org._id.$oid + "','" + value.ZoneName.replace(/\s/g, '^') + "','" + value.RouteName.replace(/\s/g, '^') + "')></span></td></tr>");
                });
                var shTable = jQuery('#viewRetailerTable').DataTable({
                    "fnDrawCallback": function(oSettings) {
                        jQuery('#viewRetailerTable ul').addClass('pagination-active-dark');
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

function populateRetailerZones() {
    $("#retailerZoneIdElement").text("");
    $("#retailerZoneIdElement").append("<option value=''>Choose Zone</option>");
    $.get(server_base_url + "FetchDistributorAllZones", {
        distributorId: getUserSessionElement("OrgId")
    }).done(function(data) {
        $.each(data, function(index, value) {
            if (value.status == "active") {
                // alert(value._id.$oid);
                $("#retailerZoneIdElement").append("<option value='" + value._id.$oid + "'>" + value.name + "</option>");
            }
        });
    });
}
//function populateDistributorRoutes(zoneid) {
//
//    $("#retailerRouteIdElement").text("");
//    $("#retailerRouteIdElement").append("<option value=''>Choose Route</option>");
//    var zoneidTemp = $("#" + zoneid).val();
//    $.get(server_base_url + "FetchDistributorRoutes", {
//        distributorId: getUserSessionElement("OrgId"),
//        zoneId: zoneidTemp
//    }).done(function(data) {
//        $.each(data, function(index, value) {
//            if (value.status == "active") {
////                alert(value._id.$oid);
//                $("#retailerRouteIdElement").append("<option value='" + value._id.$oid + "'>" + value.name + "</option>");
//            }
//        });
//    });
//}

//for add retailer
function  addRetailerForm(id) {

    if (id == "viewRetailerField") {
        $("#" + id).text("").append("<span style='font-size:15px;' class=' btn btn-warning  btn-sm btn-block' >update retailer field..</span>");
    }
    if (id == "addRetailerField") {
        $("#" + id).text("").append("<span style='font-size:15px;' class=' btn btn-warning  btn-sm btn-block' >Add retailer..</span>");
    }
//    $("#" + id).text("").append("<span style='font-size:15px;' class=' btn btn-warning  btn-sm btn-block' >update retailer field..</span>");
    $("#" + id).append("<br><div class='form-group' id='addRetailerForm' />");

    $("#addRetailerForm").append("<lable class='col-sm-3 control-label'>Zone Name</lable>");
    $("#addRetailerForm").append("<div class='col-sm-9' id='retailerZoneId'/>");
    $("#retailerZoneId").append("<select id='retailerZoneIdElement' name='retailerZoneIdElement' onchange=populateDistributorRoutes('retailerZoneIdElement') class='form-control' />");
    $("#retailerZoneId").append("<span id='retailerZoneIdElementMsg'></spam>");

    $("#addRetailerForm").append("&nbsp;<br>");

    populateRetailerZones();

//    $("#addRetailerForm").append("<lable class='col-sm-3 control-label'>Route Name</lable>");
//    $("#addRetailerForm").append("<div class='col-sm-9' id='retailerRouteId'/>");
//    $("#retailerRouteId").append("<select id='retailerRouteIdElement' name='retailerRouteIdElement' onchange=common_keypress('retailerTypeId') class='form-control' />");
//    $("#retailerRouteIdElement").append("<option value=''>Choose Route</option>");
//    $("#retailerRouteId").append("<span id='retailerRouteIdElementMsg'></spam>");
//    $("#addRetailerForm").append("&nbsp;<br>");

    $("#addRetailerForm").append("<lable class='col-sm-3 control-label'>Retailer Name</lable>");
    $("#addRetailerForm").append("<div class='col-sm-9' id='retailerNameId'/>");
    $("#retailerNameId").append("<input type='text' onkeyup=common_keypress('retailerNameId') id='retailerNameIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Retailer Name'><span id='retailerNameIdElementMsg' /><br />");

    $("#addRetailerForm").append("<lable class='col-sm-3 control-label'>Group Name</lable>");
    $("#addRetailerForm").append("<div class='col-sm-9' id='retailerGroupNameId'/>");

    $("#retailerGroupNameId").append("<select id='retailerGroupNameIdElement' name='retailerGroupNameIdElement' onchange=common_keypress('retailerTypeId') class='form-control' />");
    $("#retailerGroupNameIdElement").append("<option value=''>Choose One</option><option>FMCG</option>");
    $("#retailerGroupNameId").append("<span id='retailerTypeIdElementMsg'></spam>");

    $("#addRetailerForm").append("&nbsp;<br>");

//for address
    $("#addRetailerForm").append("<lable class='col-sm-3 control-label'>Address Details</lable>");
    $("#addRetailerForm").append("<div class='col-sm-9' id='retailerAddressFieldId'/>");

    $("#retailerAddressFieldId").append("<div class='panel-group' style='' id='retailerAddressAccordion1' />");
    $("#retailerAddressAccordion1").append("<div id='retailerAddress' class='panel panel-primary' />");

    $("#retailerAddress").append("<div id='firstPanelHeading' class='panel-heading'/>");
    $("#firstPanelHeading").append("<h4 id='firstHeader' class='panel-title' />");
    $("#firstHeader").append("<a data-toggle='collapse' style='font-weight:bold;font-size:15px;' data-parent='#retailerAddressAccordion1' href='#collapseOne1'><center> Shop Address</center></a>");

    $("#retailerAddress").append("<div id='collapseOne1' class='panel-collapse collapse' />");
    $("#collapseOne1").append("<div id='retailer_panelMainBody' class = 'panel-body' />");
    $("#retailer_panelMainBody").append("<div id='retailer_panelRow' class='row' />");

    $("#retailer_panelRow").append("<center><span id='retailer_regsuccessBefore'></span></center>");

//for first row

    $("#retailer_panelRow").append("<div id='retailer_addr1FieldGroup' class='form-group' />");
    $("#retailer_addr1FieldGroup").append("<label class='col-sm-3 control-label'>Address line1<span class='asterisk'> *</span></label>");
    $("#retailer_addr1FieldGroup").append("<div id='retailer_addr1FieldDiv' class='col-sm-9' />");
    $("#retailer_addr1FieldDiv").append("<input type='text' id='retailer_address1' style='text-transform: capitalize;' class='form-control' placeholder='Address line1' onkeyup='patientreg_keypress(event)'>");
//    $("#retailer_addr1FieldDiv").append("<span id='retailer_add1'></span>");

    $("#retailer_panelRow").append("<div id='retailer_addr2FieldGroup' class='form-group' />");
    $("#retailer_addr2FieldGroup").append("<label class='col-sm-3 control-label'>Address line2</label>");
    $("#retailer_addr2FieldGroup").append("<div id='retailer_addr2FieldDiv' class='col-sm-9' />");
    $("#retailer_addr2FieldDiv").append("<input type='text' id='retailer_address2' style='text-transform: capitalize;' class='form-control' placeholder='Address line2' onkeyup='patientreg_keypress(event)'>");

    $("#retailer_panelRow").append("<div id='retailer_cityFieldGroup' class='form-group' />");
    $("#retailer_cityFieldGroup").append("<label class='col-sm-3 control-label'>City<span class='asterisk'> *</span></label>");
    $("#retailer_cityFieldGroup").append("<div id='retailer_cityFieldDiv' class='col-sm-9' />");
    $("#retailer_cityFieldDiv").append("<input type='text' id='retailer_city' style='text-transform: capitalize;' class='form-control' placeholder='City' onkeyup='patientreg_keypress(event)'>");
//    $("#retailer_cityFieldDiv").append("<span id='retailer_city'></span>");

    $("#retailer_panelRow").append("<div id='retailer_stateFieldGroup' class='form-group' />");
    $("#retailer_stateFieldGroup").append("<label class='col-sm-3 control-label'>State<span class='asterisk'> *</span></label>");
    $("#retailer_stateFieldGroup").append("<div id='retailer_stateFieldDiv' class='col-sm-9' />");
    $("#retailer_stateFieldDiv").append("<select id='retailer_state' class='form-control' onchange='patientreg_keypress(event)' />");
    $("#retailer_state").append("<option value=''>Choose One</option><option>Andaman and Nicobar Islands</option><option>Andhra Pradesh</option><option>Arunachal Pradesh</option><option>Assam</option><option>Bihar</option><option>Chandigarh</option><option>Chhattisgarh</option><option>Dadra and Nagar Haveli</option><option>Daman and Diu</option><option>Delhi</option><option>Goa</option><option>Gujarat</option><option>Haryana</option><option>Himachal Pradesh</option><option>Jammu and Kashmir</option><option>Jharkhand</option><option>Karnataka</option><option>Kerala</option><option>Lakshadweep</option><option>Madhya Pradesh</option><option>Maharashtra</option><option>Manipur</option><option>Meghalaya</option><option>Mizoram</option><option>Nagaland</option><option>Orissa</option><option>Pondicherry</option><option>Punjab</option><option>Rajasthan</option><option>Sikkim</option><option>Tamil Nadu</option><option>Telangana</option><option>Tripura</option><option>Uttaranchal</option><option>Uttar Pradesh</option><option>West Bengal</option>");
//    $("#retailer_stateFieldDiv").append("<span id='retailer_state'></span>");

    $("#retailer_panelRow").append("<div id='retailer_countryFieldGroup' class='form-group' />");
    $("#retailer_countryFieldGroup").append("<label class='col-sm-3 control-label'>Country</label>");
    $("#retailer_countryFieldGroup").append("<div id='retailer_countryFieldDiv' class='col-sm-9' />");
    $("#retailer_countryFieldDiv").append("<select id='retailer_country' class='form-control' />");
    $("#retailer_country").append("<option>INDIA</option>");
//    $("#retailer_country").append("<span id='retailer_country'></span>");

    $("#retailer_panelRow").append("<div id='retailer_codeFieldGroup' class='form-group' />");
    $("#retailer_codeFieldGroup").append("<label class='col-sm-3 control-label'>Zip</label>");
    $("#retailer_codeFieldGroup").append("<div id='retailer_codeFieldDiv' class='col-sm-9' />");
    $("#retailer_codeFieldDiv").append("<input type='text' id='retailer_zipcode' class='form-control' placeholder='Zip' onkeyup='patientreg_keypress(event)'>");
//    $("#retailer_codeFieldDiv").append("<span id='retailer_zipcode'></span>");
    jQuery("#retailer_zipcode").mask("999999");

    $("#retailer_panelRow").append("<div id='retailer_hphoneFieldGroup' class='form-group' />");
    $("#retailer_hphoneFieldGroup").append("<label class='col-sm-3 control-label'>Home Phone<span class='asterisk'> *</span></label>");
    $("#retailer_hphoneFieldGroup").append("<div id='retailer_hphoneFieldDiv' class='col-sm-9' />");
    $("#retailer_hphoneFieldDiv").append("<input type='text' id='retailer_homephone' size=15 maxLength=15 class='form-control' placeholder='Home Phone' onkeyup='patientreg_keypress(event)'>");
//    $("#retailer_hphoneFieldDiv").append("<span id='retailer_phone'></span>");
    jQuery("#retailer_homephone").mask("9999999999");

    $("#retailer_panelRow").append("<div id='retailer_mphoneFieldGroup' class='form-group' />");
    $("#retailer_mphoneFieldGroup").append("<label class='col-sm-3 control-label'>Mobile Phone<span class='asterisk'> *</span></label>");
    $("#retailer_mphoneFieldGroup").append("<div id='retailer_mphoneFieldDiv' class='col-sm-9' />");
    $("#retailer_mphoneFieldDiv").append("<input type='text' id='retailer_mobilephone' size=15 maxLength=15 class='form-control' placeholder='Mobile Phone' onkeyup='patientreg_keypress(event)'>");
//    $("#retailer_mphoneFieldDiv").append("<span id='retailer_mphone'></span>");
    jQuery("#retailer_mobilephone").mask("9999999999");

    $("#retailer_panelRow").append("<div id='retailer_wphoneFieldGroup' class='form-group' />");
    $("#retailer_wphoneFieldGroup").append("<label class='col-sm-3 control-label'>Office Phone<span class='asterisk'> *</span></label>");
    $("#retailer_wphoneFieldGroup").append("<div id='retailer_wphoneFieldDiv' class='col-sm-9' />");
    $("#retailer_wphoneFieldDiv").append("<input type='text' id='retailer_workphone' size=15 maxLength=15 class='form-control' placeholder='Office Phone' onkeyup='patientreg_keypress(event)'>");
//    $("#retailer_wphoneFieldDiv").append("<span id='retailer_wphone'></span>");
    jQuery("#retailer_workphone").mask("9999999999");

    $("#retailer_panelRow").append("<div id='retailer_emailFieldGroup1' class='form-group' />");
    $("#retailer_emailFieldGroup1").append("<label class='col-sm-3 control-label'>Email1 </label>");
    $("#retailer_emailFieldGroup1").append("<div id='retailer_emailFieldDiv1' class='col-sm-9' />");
    $("#retailer_emailFieldDiv1").append("<input type='email1' id='retailer_email1' class='form-control' placeholder='Email1' onkeyup='patientreg_keypress(event)'>");
//    $("#retailer_emailFieldDiv1").append("<span id='retailer_email1'></span>");

    $("#retailer_panelRow").append("<div id='retailer_emailFieldGroup2' class='form-group' />");
    $("#retailer_emailFieldGroup2").append("<label class='col-sm-3 control-label'>Email2 </label>");
    $("#retailer_emailFieldGroup2").append("<div id='retailer_emailFieldDiv2' class='col-sm-9' />");
    $("#retailer_emailFieldDiv2").append("<input type='email2' id='retailer_email2' class='form-control' placeholder='Email2' onkeyup='patientreg_keypress(event)'>");
//    $("#retailer_emailFieldDiv2").append("<span id='retailer_email2'></span>");

    $("#retailer_panelRow").append("<div id='retailer_faxFieldGroup' class='form-group' />");
    $("#retailer_faxFieldGroup").append("<label class='col-sm-3 control-label'>Fax </label>");
    $("#retailer_faxFieldGroup").append("<div id='retailer_faxFieldDiv' class='col-sm-9' />");
    $("#retailer_faxFieldDiv").append("<input type='text' id='retailer_fax' class='form-control' placeholder='Fax' onkeyup='patientreg_keypress(event)'>");
//    $("#retailer_faxFieldDiv").append("<span id='retailer_fax'></span>");
    jQuery("#retailer_fax").mask("9999999999");

    $("#addRetailerForm").append("&nbsp;<br>");
    $("#addRetailerForm").append("<lable class='col-sm-3 control-label'></lable>");
    $("#addRetailerForm").append("<div class='col-sm-9' id='submitRetailerbutton'/>");
    $("#submitRetailerbutton").text("").append("<button id='RetailerSubmitButton' class='btn btn-primary mr5' onclick='addRetailer()'>Create Retailer</button>");
    $("#submitRetailerbutton").append("<span id='addRetailerErrorElementMsg'></span>");

}

function addRetailer() {

    var name = $("#retailerNameIdElement").val();
    var groupName = $("#retailerGroupNameIdElement").val();
    var parentOrgid = getUserSessionElement("OrgId");
    var zoneId = $("#retailerZoneIdElement").val();
    var routeId = $("#retailerRouteIdElement").val();
    var retailerJson = "";

    if (name != null || name != undefined) {
        retailerJson = retailerJson + "\"name\":\"" + name + "\",";
    }
    if (groupName != null || groupName != undefined) {
        retailerJson = retailerJson + "\"groupname\":\"" + groupName + "\",";
    }
    if (zoneId != null || zoneId != undefined) {
        retailerJson = retailerJson + "\"zoneid\":\"" + zoneId + "\",";
    }
    if (routeId != null || routeId != undefined) {
        retailerJson = retailerJson + "\"routeid\":\"" + routeId + "\",";
    }


    retailerJson = retailerJson + "\"parentorgid\":\"" + parentOrgid + "\"";
    retailerJson = "{" + retailerJson + "}";

//    alert(retailerJson);

//for address
    var address1 = $("#retailer_address1").val();
    var address2 = $("#retailer_address2").val();
    var city = $("#retailer_city").val();
    var state = $("#retailer_state").val();
    var country = $("#retailer_country").val();
    var zip = $("#retailer_zipcode").val();
    var h_phone = $("#retailer_homephone").val();
    var m_phone = $("#retailer_mobilephone").val();
    var w_phone = $("#retailer_workphone").val();
    var email1 = $("#retailer_email1").val();
    var email2 = $("#retailer_email2").val();
    var fax = $("#retailer_fax").val();
    var addresstype = "SHOP";

    var addressJson = "";
    if (address1 != null || address1 != undefined) {
        addressJson = addressJson + "\"address1\":\"" + address1 + "\",";
    }
    if (address2 != null || address2 != undefined) {
        addressJson = addressJson + "\"address2\":\"" + address2 + "\",";
    }
    if (city != null || city != undefined) {
        addressJson = addressJson + "\"city\":\"" + city + "\",";
    }
    if (state != null || state != undefined) {
        addressJson = addressJson + "\"state\":\"" + state + "\",";
    }
    if (country != null || country != undefined) {
        addressJson = addressJson + "\"country\":\"" + country + "\",";
    }
    if (zip != null || zip != undefined) {
        addressJson = addressJson + "\"zipcode\":\"" + zip + "\",";
    }
    if (h_phone != null || h_phone != undefined) {
        addressJson = addressJson + "\"homephone\":\"" + h_phone + "\",";
    }
    if (m_phone != null || m_phone != undefined) {
        addressJson = addressJson + "\"mobilephone\":\"" + m_phone + "\",";
    }
    if (w_phone != null || w_phone != undefined) {
        addressJson = addressJson + "\"workphone\":\"" + w_phone + "\",";
    }
    if (email1 != null || email1 != undefined) {
        addressJson = addressJson + "\"email1\":\"" + email1 + "\",";
    }
    if (email2 != null || email2 != undefined) {
        addressJson = addressJson + "\"email2\":\"" + email2 + "\",";
    }
    if (fax != null || fax != undefined) {
        addressJson = addressJson + "\"fax\":\"" + fax + "\",";
    }
    if (addresstype != null || addresstype != undefined) {
        addressJson = addressJson + "\"addresstype\":\"" + addresstype + "\"";
    }

    addressJson = "{" + addressJson + "}";
//    return false;
    $.post(server_base_url + "CreateRetailer", {
        retailerJson: retailerJson,
        addressJson: addressJson
    }).done(function(data) {
        if (data == fail) {
            displaySmallErrorMessages("addRetailerErrorElementMsg", failMessage);
            displaySmallErrorMessages("addRetailerErrorElementMsg", failMessage);
        } else if (data == unauthorized) {
            displaySmallErrorMessages()("addRetailerErrorElementMsg", unauthorizedMessage);
            displaySmallErrorMessages("addRetailerErrorElementMsg", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            viewRetailerTable();
            $("#viewRetailerField").show();
            $("#addRetailerField").hide()();
            $("#viewRetailerFieldLiId").addClass("active");
            $("#addRetailerFieldLiId").removeClass("active");
        }
    });
}


function editRetailer(custId, zoneName, routeName) {

    addRetailerForm('viewRetailerField');
    if (custId != "" || custId != undefined) {
        $.post(server_base_url + "FetchRetailerDetails", {
            retailerId: custId
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
                var retailerId = "";
                var addressId = "";
                $.each(JSON.parse(data.customerDetails), function(index, value) {
                    retailerId = value._id.$oid;
                    $("#retailerNameIdElement").val(value.name);
                    $("#retailerGroupNameIdElement").val(value.groupname);
                    $("#retailerZoneIdElement").text("").append("<option value='" + value.zoneid + "'>" + zoneName.replace('^', ' ') + "</option>");
                    $("#retailerZoneIdElement").attr("disabled", true);
//                    $("#retailerRouteIdElement").text("").append("<option value='" + value.routeid + "'>" + routeName.replace('^', ' ') + "</option>");
//                    $("#retailerRouteIdElement").attr("disabled", true);
                });
                if (data.customerAddress != undefined) {
                    $.each(JSON.parse(data.customerAddress), function(index, value) {
                        addressId = value._id.$oid;
                        $.each(value, function(ind, val) {
                            $("#retailer_" + ind).val(val);
                        });
                    });
                }
                $("#submitRetailerbutton").text("").append("<button id='RetailerSubmitButton' class='btn btn-primary mr5' onclick=updateRetailer('" + retailerId + "','" + addressId + "')>Update</button>");
                $("#submitRetailerbutton").append("<span id='addRetailerErrorElementMsg'></span>");
            }
        });
    }
}

function updateRetailer(retailerId, addressId) {

    var name = $("#retailerNameIdElement").val();
    var groupName = $("#retailerGroupNameIdElement").val();
    var retailerJson = "";

    if (name != null || name != undefined) {
        retailerJson = retailerJson + "\"name\":\"" + name + "\",";
    }
    if (groupName != null || groupName != undefined) {
        retailerJson = retailerJson + "\"groupname\":\"" + groupName + "\"";
    }
    retailerJson = "{" + retailerJson + "}";

//for address
    var address1 = $("#retailer_address1").val();
    var address2 = $("#retailer_address2").val();
    var city = $("#retailer_city").val();
    var state = $("#retailer_state").val();
    var country = $("#retailer_country").val();
    var zip = $("#retailer_zipcode").val();
    var h_phone = $("#retailer_homephone").val();
    var m_phone = $("#retailer_mobilephone").val();
    var w_phone = $("#retailer_workphone").val();
    var email1 = $("#retailer_email1").val();
    var email2 = $("#retailer_email2").val();
    var fax = $("#retailer_fax").val();
    var addresstype = "SHOP";

    var addressJson = "";
    if (address1 != null || address1 != undefined) {
        addressJson = addressJson + "\"address1\":\"" + address1 + "\",";
    }
    if (address2 != null || address2 != undefined) {
        addressJson = addressJson + "\"address2\":\"" + address2 + "\",";
    }
    if (city != null || city != undefined) {
        addressJson = addressJson + "\"city\":\"" + city + "\",";
    }
    if (state != null || state != undefined) {
        addressJson = addressJson + "\"state\":\"" + state + "\",";
    }
    if (country != null || country != undefined) {
        addressJson = addressJson + "\"country\":\"" + country + "\",";
    }
    if (zip != null || zip != undefined) {
        addressJson = addressJson + "\"zipcode\":\"" + zip + "\",";
    }
    if (h_phone != null || h_phone != undefined) {
        addressJson = addressJson + "\"homephone\":\"" + h_phone + "\",";
    }
    if (m_phone != null || m_phone != undefined) {
        addressJson = addressJson + "\"mobilephone\":\"" + m_phone + "\",";
    }
    if (w_phone != null || w_phone != undefined) {
        addressJson = addressJson + "\"workphone\":\"" + w_phone + "\",";
    }
    if (email1 != null || email1 != undefined) {
        addressJson = addressJson + "\"email1\":\"" + email1 + "\",";
    }
    if (email2 != null || email2 != undefined) {
        addressJson = addressJson + "\"email2\":\"" + email2 + "\",";
    }
    if (fax != null || fax != undefined) {
        addressJson = addressJson + "\"fax\":\"" + fax + "\",";
    }
    if (addresstype != null || addresstype != undefined) {
        addressJson = addressJson + "\"addresstype\":\"" + addresstype + "\"";
    }
//    if (retailerId != null || retailerId != undefined) {
//        addressJson = addressJson + "\"ownerid\":\"" + retailerId + "\"";
//    }

    addressJson = "[{" + addressJson + "}]";

    $.post(server_base_url + "UpdateRetailer", {
        retailerId: retailerId,
        addressId: addressId,
        retailerJson: retailerJson,
        addressJson: addressJson
    }).done(function(data) {
        if (data == fail) {
            displaySmallErrorMessages("addRetailerErrorElementMsg", failMessage);
            displaySmallErrorMessages("addRetailerErrorElementMsg", failMessage);
        } else if (data == unauthorized) {
            displaySmallErrorMessages()("addRetailerErrorElementMsg", unauthorizedMessage);
            displaySmallErrorMessages("addRetailerErrorElementMsg", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            viewRetailerTable();
            $("#viewRetailerField").show();
            $("#addRetailerField").hide()();
            $("#viewRetailerFieldLiId").addClass("active");
            $("#addRetailerFieldLiId").removeClass("active");
        }
    });
}