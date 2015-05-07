/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function displayRouteSubMenu() {

    $("#routeManagement").text("").append("<div class='col-md-13' id='routeMenuTab' />");
    $("#routeMenuTab").append("<ul class='nav nav-tabs nav-success' id='routeMenuItem' />");
//    $("#routeMenuItem").append("<li class='active' id='viewRouteTableLiId'><a href='#viewRouteTable' data-toggle='tab'><strong>View Route</strong></a></li>");
//    $("#routeMenuItem").append("<li class='' id='addRouteTableLiId'><a href='#addRouteField' data-toggle='tab'><strong>Add Route</strong></a></li>");
    $("#routeMenuItem").append("<li class='active' id='viewRouteTableLiId' style='cursor:pointer'><a onclick='viewRouteTab()' data-toggle='tab'><strong>View Route</strong></a></li>");
    $("#routeMenuItem").append("<li class='' id='addRouteTableLiId' style='cursor:pointer'><a onclick='addRouteTab()' data-toggle='tab'><strong>Add Route</strong></a></li>");
//$("#routeMenuItem").append("<li class='' id='addRouteTableLiId' style='cursor:pointer'><a><strong>Add Route</strong></a></li>");
    $("#routeMenuTab").append("<div class='tab-content tab-content-primary mb30' id='routeMenuMainContent' />");
    $("#routeMenuMainContent").append("<div class='tab-pane' id='addRouteField' ><div id='routeData1'></div></div>");
    addRouteField();
    $("#routeMenuMainContent").append("<div class='tab-pane active' id='viewRouteTable' ><div id='routeData2'></div></div>");
    viewRouteTable();
}

function viewRouteTab() {
    $("#viewRouteTable").show();
    $("#addRouteField").hide();
    viewRouteTable();
}

function addRouteTab() {
    $("#viewRouteTable").hide();
    $("#addRouteField").show();
    addRouteField();
}

function addRouteField() {

    $("#addRouteField").text("").append("<span style='font-size:15px;width:69%;' class=' btn btn-warning  btn-sm btn-block' id='displayZoneName'>Add route here...</span><input type='hidden' id='selectedHiddenZoneId'>");
    $("#addRouteField").append("<br><div class='form-group' id='addRouteForm' style='width:70%;' />");
    $("#addRouteForm").append("<lable class='col-sm-3 control-label'>Zone Name *</lable>");
    $("#addRouteForm").append("<div class='col-sm-9' id='selectZoneId'/>");
    $("#addRouteForm").append("&nbsp;<br>");
    $("#addRouteForm").append("<lable class='col-sm-3 control-label'>Route name *</lable>");
    $("#addRouteForm").append("<div class='col-sm-9' id='addRouteNameId'/>");
    $("#addRouteNameId").append("<input type='text' onkeyup=common_keypress('addRouteNameId') id='addRouteNameIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Route name'><span id='addRouteNameIdElementMsg' /><br />");
    $("#addRouteForm").append("<lable class='col-sm-3 control-label'>Sales Executive*</lable>");
    $("#addRouteForm").append("<div class='col-sm-9' id='addSalesExecutiveId'/>");
    $("#addSalesExecutiveId").append("<select id='addSalesExecutiveIdElement' name='addSalesExecutiveIdElement' onchange=common_keypress('addSalesExecutiveId') class='form-control' />");
    $("#addSalesExecutiveIdElement").append("<option value=''>Choose One</option>");
    $("#addSalesExecutiveId").append("<span id='addSalesExecutiveIdElementMsg'></spam>");
    $("#addRouteForm").append("&nbsp;<br>");


    $("#addRouteForm").append("<lable class='col-sm-3 control-label'>Frequency*</lable>");
    $("#addRouteForm").append("<div class='col-sm-9' id='selectFrequencyId'/>");
    $("#selectFrequencyId").append("<select id='selectFrequencyIdElement' name='selectFrequencyIdElement' onchange=manageFrequency_v1('selectFrequencyIdElement') class='form-control' />");
    $("#selectFrequencyIdElement").append("<option value=''>Choose One</option><option>Weekly</option><option>Monthly</option>");
    $("#selectFrequencyId").append("<span id='selectFrequencyIdElementMsg'></spam>");
    $("#addRouteForm").append("&nbsp;<br>");

    $("#addRouteForm").append("<div id='hiddenFrequencyId'></div>");
    $("#hiddenFrequencyId").hide();

    $("#addRouteForm").append("<lable class='col-sm-3 control-label'>Status *</lable>");
    $("#addRouteForm").append("<div class='col-sm-9' id='selectStatusId'/>");
    $("#selectStatusId").append("<select id='selectStatusIdElement' name='selectStatusIdElement' onchange=common_keypress('selectStatusId') class='form-control' />");
    $("#selectStatusIdElement").append("<option>Active</option><option>Inactive</option>");
    $("#selectStatusId").append("<span id='routeRetailerNameIdElementMsg'></spam>");
    $("#addRouteForm").append("&nbsp;<br>");
    $("#addRouteForm").append("&nbsp;<br>");
    $("#addRouteForm").append("<lable class='col-sm-3 control-label'></lable>");
    $("#addRouteForm").append("<div class='col-sm-9' id='submitRoutebutton'/>");
    $("#submitRoutebutton").text("").append("<button id='otherUserSubmitButton' class='btn btn-primary mr5' onclick='addRoute()'>Submit</button>");
    $("#submitRoutebutton").append("<span id='addRouteErrorElementMsg'></span>");
    fetchAllZone();
    selectSalesExecutive();
//    selectRetailerName();
}

function manageFrequency(id) {
    id = $("#" + id).val();
    if (id == "Daily") {
        $("#selectWeekday").text("");
        $("#selectMonthly").text("");
        $("#selectFortnightly").text("");
        $("#selectYearly").text("");
        $("#weekdayInYear").text("");
    }
    if (id == "Weekly") {
        $("#selectWeekday").text("");
        $("#selectMonthly").text("");
        $("#selectFortnightly").text("");
        $("#selectYearly").text("");
        $("#weekdayInYear").text("");
        $("#selectFrequencyId").append("<div id='selectWeekday' />");
        $("#selectWeekday").text("").append("<br><select id='selectWeeekIdElement' name='selectWeeekIdElement' class='form-control' />");
        $("#selectWeeekIdElement").append("<option>Choose One</option><option>Sunday</option><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option>");
    }
    if (id == "Monthly") {
        $("#selectWeekday").text("");
        $("#selectMonthly").text("");
        $("#selectFortnightly").text("");
        $("#selectYearly").text("");
        $("#weekdayInYear").text("");
        $("#selectFrequencyId").append("<div id='selectMonthly' />");
        $("#selectMonthly").text("").append("<div class = 'col-sm-7' id='selectWeekInMonthly'></div><div class = 'col-sm-3' id='frequencyInMonth'></div>");
        $("#selectWeekInMonthly").text("").append("<br><select id='selectWeeekInMonthIdElement' name='selectWeeekInMonthIdElement' class='form-control' />");
        $("#selectWeeekInMonthIdElement").append("<option>Choose One</option><option>Sunday</option><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option>");
        $("#frequencyInMonth").text("").append("<br><div  id='spinnerMainId' />");
        $("#spinnerMainId").append("<input type = 'text' id = 'frequencyInMonthElement' style='width:100%;' / >");
        var spinner = jQuery('#frequencyInMonthElement').spinner();
        spinner.spinner('value', 0);
    }
    if (id == "Fortnightly") {
        $("#selectWeekday").text("");
        $("#selectMonthly").text("");
        $("#selectFortnightly").text("");
        $("#selectYearly").text("");
        $("#weekdayInYear").text("");
        $("#selectFrequencyId").append("<div id='selectFortnightly' />");
        $("#selectFortnightly").text("").append("<div class = 'col-sm-7' id='selectWeekInFortnightly'></div><div class = 'col-sm-3' id='frequencyInFortnightly'></div>");
        $("#selectWeekInFortnightly").text("").append("<br><select id='selectWeeekInFortnightlyIdElement' name='selectWeeekInFortnightlyIdElement' class='form-control' />");
        $("#selectWeeekInFortnightlyIdElement").append("<option>Choose One</option><option>Sunday</option><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option>");
        $("#frequencyInFortnightly").text("").append("<br><div  id='spinnerMainId' />");
        $("#spinnerMainId").append("<input type = 'text' id = 'frequencyInFortnightlyElement' style='width:100%;' / >");
        var spinner = jQuery('#frequencyInFortnightlyElement').spinner();
        spinner.spinner('value', 0);
    }
    if (id == "Yearly") {
        $("#selectWeekday").text("");
        $("#selectMonthly").text("");
        $("#selectFortnightly").text("");
        $("#selectYearly").text("");
        $("#weekdayInYear").text("");
        $("#selectWeekday").text("");
        $("#selectFrequencyId").append("<div id='selectYearly' />");
        $("#selectYearly").text("").append("<br><select id='selectMonthInYearIdElement' name='selectMonthInYearIdElement' class='form-control' />");
        $("#selectMonthInYearIdElement").append("<option>Choose One</option>");
        $("#selectMonthInYearIdElement").append("<option>January</option><option>February</option><option>March</option><option>April</option><option>May</option>");
        $("#selectMonthInYearIdElement").append("<option>Jun</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option>");
        $("#selectFrequencyId").append("<div id='weekdayInYear' />");
        $("#weekdayInYear").text("").append("<div class = 'col-sm-7' id='selectWeekdayInYear'></div><div class = 'col-sm-3' id='frequencyInYearly'></div>");
        $("#selectWeekdayInYear").text("").append("<br><select id='selectWeekdayInYearElement' name='selectWeekdayInYearElement' class='form-control' />");
        $("#selectWeekdayInYearElement").append("<option>Choose One</option><option>Sunday</option><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option>");
        $("#frequencyInYearly").text("").append("<br><div  id='frequencyInYearlyMainId' />");
        $("#frequencyInYearlyMainId").append("<input type = 'text' id = 'frequencyInYearlyMainIdElement' style='width:100%;' / >");
        var spinner = jQuery('#frequencyInYearlyMainIdElement').spinner();
        spinner.spinner('value', 0);
    }
}

function manageFrequency_v1(id) {

    var val = $("#" + id).val();
    $("#selectFrequencyId").append("<div id='MainId" + id + "' />");
    if (val == "Daily") {
        $("#MainId" + id).text("").append("<br /><div class = 'col-sm-4' style='margin-left:-2%;' id='labelType'></div><div class = 'col-sm-3' style='margin-left:-8%;' id='selectDays' ></div>");
        $("#labelType").append("Repeat every days:");
        $("#selectDays").append("<select id='selectRepeatDays' name='selectRepeatDays' class='form-control' style='padding-top:2px;' />");
        $("#selectRepeatDays").append("<option value=''>Frequency</option>");
        $("#selectRepeatDays").append("<option>1</option>");
        $("#selectRepeatDays").append("<option>2</option>");
        $("#selectRepeatDays").append("<option>3</option>");
        $("#selectRepeatDays").append("<option>4</option>");
    }
    if (val == "Weekly") {
        $("#MainId" + id).text("").append("<br /><div class = 'col-sm-4' style='margin-left:-2%;' id='labelType'></div><div class = 'col-sm-3' style='margin-left:-8%;' id='selectDays' ></div><div id='selectWeeks' ></div>");
        $("#labelType").append("Repeat every weeks:");
        $("#selectDays").append("<select id='selectRepeatDays' name='selectRepeatDays' class='form-control' style='padding-top:2px;' />");
        $("#selectRepeatDays").append("<option value=''>Frequency</option>");
        $("#selectRepeatDays").append("<option>1</option>");
        $("#selectRepeatDays").append("<option>2</option>");
        $("#selectRepeatDays").append("<option>3</option>");
        $("#selectRepeatDays").append("<option>4</option>");
        weekDays('selectWeeks', 'Id1');
    }

// contain weeks days on base of month...
//    if (val == "Monthly") {
//        $("#MainId" + id).text("").append("<br /><div class = 'col-sm-4' style='margin-left:-2%;' id='labelType'></div><div class = 'col-sm-3' style='margin-left:-8%;' id='selectDays' ></div><div class = 'col-sm-4' id='weekLabel'  style='margin-left:-1%;'></div><div class = 'col-sm-3' style='margin-left:-12%;' id='selectWeeks' ></div><div id='selectWeeksOnMonth' ></div>");
//        $("#labelType").append("Repeat every months: ");
//        $("#selectDays").append("<select id='selectRepeatDays' name='selectRepeatDays' class='form-control' style='padding-top:2px;' />");
//        $("#selectRepeatDays").append("<option value=''>Frequency</option>");
//        $("#selectRepeatDays").append("<option>1</option><option>2</option>");
//        $("#selectRepeatDays").append("<option>3</option><option>4</option>");
//        $("#selectRepeatDays").append("<option>5</option><option>6</option>");
//
//        $("#weekLabel").append("select weeks: ");
////        $("#selectWeeks").append("<select id='selectWeeksId' name='selectWeeksId' class='form-control' style='padding-top:2px;' onchange=weekDays('selectWeeksOnMonth','selectWeeksId') />");
//        $("#selectWeeks").append("<select id='selectWeeksId' name='selectWeeksId' class='form-control' style='padding-top:2px;' />");
//        $("#selectWeeksId").append("<option value=''>select</option>");
//        $("#selectWeeksId").append("<option>1<sup>st</sup> week</option>");
//        $("#selectWeeksId").append("<option>2<sup>nd</sup> week</option>");
//        $("#selectWeeksId").append("<option>3<sup>rd</sup> week</option>");
//        $("#selectWeeksId").append("<option>4<sup>th</sup> week</option>");
//        weekDays('selectWeeksOnMonth', 'selectWeeksId');
//    }

    if (val == "Monthly") {
        $("#MainId" + id).text("").append("<br/><input type='text' id='selectDate' class='form-control' placeholder='DD/MM/YYYY' onchange='callFetchRetailerName(this.id)' ><span id='selectDateMsg' />");
        jQuery("#selectDate").datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: '1950:2020',
            maxDate: new Date(2050, 0, 1),
            minDate: new Date,
            dateFormat: dateformate
        });

//        $("#MainId" + id).append("<select id='selectRepeatDays' name='selectRepeatDays' onchange=callFetchRetailerName('selectRetailerMainDivId') class='form-control' style='padding-top:2px;' />");
//        $("#selectRepeatDays").append("<option value=''>Frequency</option>");
//        $("#selectRepeatDays").append("<option>1</option><option>2</option>");
//        $("#selectRepeatDays").append("<option>3</option><option>4</option>");
//        $("#selectRepeatDays").append("<option>5</option><option>6</option>");
        $("#MainId" + id).append("<div id='selectRetailerMainDivId' />");
        $("#MainId" + id).append("<div id='displayRetailerMainDivId' />");
    }
//    callFetchRetailerName();
    $("#hiddenFrequencyId").text("");
}

function callFetchRetailerName(divId) {
//    var date = $("#divId").val();
    var date = $("#" + divId).val();
    date = date.split('/');
    date = date[0] + "_" + date[1] + "_" + date[2]
    fetchRetailerName('selectRetailerMainDivId', date);
}

function getWeeksByMonth(divId, uniqueId) {

    var val = $("#" + uniqueId).val();
    if (val != "select") {
        var div = val.replace(" ", "");
        $("#" + divId).append("<div id='" + div + "'>");
        weekDays(div, val);
    }
}

function weekDays(divId, uniqueId) {
    var week = uniqueId;
    uniqueId = uniqueId.replace(" ", "");
    $("#" + divId).append("<div id='weeksLabelId" + divId + "'>");
//    $("#weeksLabelId" + divId).text("").append("<br /><br />" + week + " : <label id='SundayLabel" + uniqueId + "' class='btn quest btn-default btn-xs' style='text-align:center;font-weight:bold;font-size:12px;border-radius:3px;'><input type = 'checkbox' style='display:none;' value='Sunday' id='SundayId" + uniqueId + "' onclick=weeksOnClick('SundayLabel" + uniqueId + "','SundayId" + uniqueId + "')  />Su</label>");
    $("#weeksLabelId" + divId).text("").append("<br /><br /><br /><label id='SundayLabel" + uniqueId + "' class='btn quest btn-default btn-xs' style='text-align:center;font-weight:bold;font-size:12px;border-radius:3px;'><input type = 'checkbox' style='display:none;' value='Sunday' id='SundayId" + uniqueId + "' onclick=weeksOnClick('SundayLabel" + uniqueId + "','SundayId" + uniqueId + "')  />Su</label>");
    $("#weeksLabelId" + divId).append("<label id='MondayLabel" + uniqueId + "' class='btn quest btn-default btn-xs' style='text-align:center;font-weight:bold;font-size:12px;border-radius:3px;margin-left:20px;'><input type = 'checkbox' style='display:none;' value='Monday' id='MondayId" + uniqueId + "' onclick=weeksOnClick('MondayLabel" + uniqueId + "','MondayId" + uniqueId + "')  />Mo</label>");
    $("#weeksLabelId" + divId).append("<label id='TuesdayLabel" + uniqueId + "' class='btn quest btn-default btn-xs' style='text-align:center;font-weight:bold;font-size:12px;border-radius:3px;margin-left:20px;'><input type = 'checkbox' style='display:none;' value='Tuesday' id='TuesdayId" + uniqueId + "' onclick=weeksOnClick('TuesdayLabel" + uniqueId + "','TuesdayId" + uniqueId + "')  />Tu</label>");
    $("#weeksLabelId" + divId).append("<label id='WednesdayLabel" + uniqueId + "' class='btn quest btn-default btn-xs' style='text-align:center;font-weight:bold;font-size:12px;border-radius:3px;margin-left:20px;'><input type = 'checkbox' style='display:none;' value='Wednesday' id='WednesdayId" + uniqueId + "' onclick=weeksOnClick('WednesdayLabel" + uniqueId + "','WednesdayId" + uniqueId + "')  />We</label>");
    $("#weeksLabelId" + divId).append("<label id='ThursdayLabel" + uniqueId + "' class='btn quest btn-default btn-xs' style='text-align:center;font-weight:bold;font-size:12px;border-radius:3px;margin-left:20px;'><input type = 'checkbox' style='display:none;' value='Thursday' id='ThursdayId" + uniqueId + "' onclick=weeksOnClick('ThursdayLabel" + uniqueId + "','ThursdayId" + uniqueId + "')  />Th</label>");
    $("#weeksLabelId" + divId).append("<label id='FridayLabel" + uniqueId + "' class='btn quest btn-default btn-xs' style='text-align:center;font-weight:bold;font-size:12px;border-radius:3px;margin-left:20px;'><input type = 'checkbox' style='display:none;' value='Friday' id='FridayId" + uniqueId + "' onclick=weeksOnClick('FridayLabel" + uniqueId + "','FridayId" + uniqueId + "')  />Fr</label>");
    $("#weeksLabelId" + divId).append("<label id='SaturdayLabel" + uniqueId + "' class='btn quest btn-default btn-xs' style='text-align:center;font-weight:bold;font-size:12px;border-radius:3px;margin-left:20px;'><input type = 'checkbox' style='display:none;' value='Saturday' id='SaturdayId" + uniqueId + "' onclick=weeksOnClick('SaturdayLabel" + uniqueId + "','SaturdayId" + uniqueId + "')  />Sa</label>");
//    $("#weeksLabelId" + divId).append("<input type='text' id='hidddenWeekDays'>");
    $("#weeksLabelId" + divId).append("<div id='hidddenWeekDays' />");
    $("#weeksLabelId" + divId).append("<div id='selectRetailerMainDivId' />");
    $("#weeksLabelId" + divId).append("<div id='displayRetailerMainDivId' />");
    $("#hidddenWeekDays").hide();
}


function weeksOnClick(labelId, cbId) {

    var val = $("#" + cbId).val();
    if ($("#" + cbId).is(":checked") == true) {
        $('#' + labelId).addClass("active");
        $("#hidddenWeekDays").append(val + ",");
    } else {
        $('#' + labelId).removeClass("active");
        var hiddenValue = $("#hidddenWeekDays").text();
        val = val + ",";
        hiddenValue = hiddenValue.replace(val, '');
        $("#hidddenWeekDays").text(hiddenValue);
    }
    fetchRetailerName('selectRetailerMainDivId', val);
}

// call service for fetch retailer...
function fetchRetailerName(divId, val) {

    $("#" + divId).append("<div id='selectRetailer" + val + "' />");
    $("#selectRetailer" + val).text("").append("<br><div id='selectRetailerDivId' class='has-success btn-bordered'><div class='col-sm-18'><select id='select-cc' data-placeholder='Select Retailer' multiple class='width100p' onClick=validateRetailer('select-cc') ><option value=''>select Retailer</option></select></div></div><span id='selRetailer'></span>");
    jQuery("#select-cc").select2();
    $("#selectRetailer" + val).append("<br /><button id='createRouteBtn' class='btn btn-primary mr5 btn-xs' onclick=createRoute('" + val + "')>Create Route</button>");

    var zoneId = $("#selectedHiddenZoneId").val();
    var retailerList = "";
    $.post(server_base_url + "FetchRetailerName", {
        zonId: zoneId
    }).done(function(idata) {
        $.each(idata, function(index, value) {
            retailerList = retailerList + "<option value='" + value._id.$oid + "^" + value.name + "' >" + value.name + "</option>";
        });
        $("#select-cc").text("").append(retailerList);
    });
}

function createRoute(days) {
    var retailerData = $("#select-cc").val();
    var retailerList = "";
//    alert($("#select-cc").val().length);
    if (!retailerData == null || !retailerData == "") {
        for (var i = 0; i < $("#select-cc").val().length; i++) {
            if ($("#select-cc").val() != "") {
                retailerList = retailerList + "\"" + $("#select-cc").val()[i] + "\";";
            }
        }
    }
    $("#selectRetailer" + days).text("");
    $("#hiddenFrequencyId").append(days + ",");

    var unit = $("#selectFrequencyIdElement").val();
    viewRetailerList(retailerList, days, unit);
}

function viewRetailerList(retailerList, days, unit) {
    retailerList = retailerList.split(';');
//    alert("1----" + retailerList[2].split('^')[1].slice(0, -1));
    var length = retailerList.length;
    if (length != null || length != 0) {
        $("#displayRetailerMainDivId").append("<br/><div id='displayRetailerTable" + days + "'></div>");
        $("#displayRetailerTable" + days).append("<table border='1' class='table' id='tableRow" + days + "' />");
        if (unit == "Monthly") {
            var tempdays = days.split('_');
            var date = tempdays[0] + "/" + tempdays[1] + "/" + tempdays[2];
            $("#tableRow" + days).append("<tr style='height:30px;'><td colspan='2' id='days" + days + "'>" + date + "</td></tr>");
        } else {
            $("#tableRow" + days).append("<tr style='height:30px;'><td colspan='2' id='days" + days + "'>" + days + "</td></tr>");
        }
        for (var i = 0; i < length; i++) {
            $("#tableRow" + days).append("<tr style='height:30px;' id='row" + days + i + "'><td><span style='cursor:pointer;' onclick=removeRetailer('rew" + i + "') >*</span></td><td id='retailerNameId" + days + i + "'>" + retailerList[i].split('^')[1].slice(0, -1) + "</td></tr>");
        }
    }
}

// remove Retailer from list..
//function removeRetailer(rowId) {
//    alert(rowId);
//    $("#" + rowId).text("");
//}


var zoneDetail = "";
function fetchAllZone() {
    $.get(server_base_url + "FetchAllZone", {
//        orgId: "5526547bdbf229d402756dba"
        orgId: getUserSessionElement("OrgId")
    }).done(function(data) {
        if (data == fail) {
            displayLargeErrorMessages("selectZoneIdElementMsg", failMessage);
            $("#old_pass").val("").focus();
        } else if (data == unauthorized) {
            displayLargeErrorMessages("selectZoneIdElementMsg", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else if (data == statusException) {
            displayLargeErrorMessages("selectZoneIdElementMsg", statusExceptionMessage);
        } else {
            zoneDetail = JSON.stringify(data);
            $.each(data, function(index, value) {
                $.each(value, function(ind, val) {
                    if (ind == "parentzoneid") {
                        if (val == "" || val == null) {
                            $("#selectZoneIdElement").text("").append("<option>Choose One</option>");
                            $("#selectZoneId").append("<select id='selectZoneIdElement' name='selectZoneIdElement' onchange=selectChildZone(this.id) class='form-control' />");
                            $("#selectZoneIdElement").append("<option>Choose Zone</option>");
                            $("#selectZoneIdElement").append("<option value='" + value._id.$oid + "'>" + value.name + "</option>");
                            $("#selectZoneId").append("<span id='selectZoneIdElementMsg'></spam>");
                        }
                    }
                });
            });
        }
    });
}

function selectChildZone(id, paId) {
    var data = JSON.parse(zoneDetail);
    id = $("#" + id).val();
    for (var i = 0; i < data.length; i++) {
        if (data[i]._id.$oid == id) {
            $("#selectedHiddenZoneId").val(data[i]._id.$oid);
            $("#displayZoneName").text("").append("If you want to create route under " + data[i].name + ", don't select child zone");
        }
    }
    $("#selectZoneId").append("<div id='selectzone" + paId + "' />");
    for (var i = 0; i < data.length; i++) {
        if (data[i].parentzoneid == id) {
            $("#selectzone" + paId).text("").append("<br><select id='selectChildZoneIdElement" + id + "' name='selectChildZoneIdElement" + id + "' onchange=selectChildZone(this.id,'" + data[i]._id.$oid + "') class='form-control' />");
            $("#selectChildZoneIdElement" + id).append("<option>Select child zone</option>");
        }
    }
    $.each(data, function(index, value) {
        if (value.parentzoneid == id) {
            $("#selectChildZoneIdElement" + id).append("<option value='" + value._id.$oid + "' >" + value.name + "</option>");
        }
    });
}

function selectSalesExecutive() {
    $.post(server_base_url + "FetchSalesExecutive", {
        orgId: getUserSessionElement("OrgId")
    }).done(function(data) {
        if (data == fail) {
            displaySmallErrorMessages()("addSalesExecutiveIdElementMsg", failMessage);
            displaySmallErrorMessages("addSalesExecutiveIdElementMsg", failMessage);
        } else if (data == unauthorized) {
            displaySmallErrorMessages("addSalesExecutiveIdElementMsg", unauthorizedMessage);
            displaySmallErrorMessages("addSalesExecutiveIdElementMsg", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            if (data == null) {
                displaySmallErrorMessages("addSalesExecutiveIdElementMsg", "no sales executive");
            } else {
                $.each(data, function(index, value) {
                    $("#addSalesExecutiveIdElement").append("<option value='" + value._id.$oid + "'>" + value.fname + " " + value.mname + " " + value.lname + "</option>");
                });
            }
        }
    });
}

//function selectRetailerName() {
//    $.post(server_base_url + "FetchRetailerName", {
////        orgId: getUserSessionElement("OrgId")
//        zonId: "55265a8edbf229d402756e8e"
//    }).done(function(data) {
//        if (data == fail) {
//            displaySmallErrorMessages()("addSalesExecutiveIdElementMsg", failMessage);
//            displaySmallErrorMessages("addSalesExecutiveIdElementMsg", failMessage);
//        } else if (data == unauthorized) {
//            displaySmallErrorMessages("addSalesExecutiveIdElementMsg", unauthorizedMessage);
//            displaySmallErrorMessages("addSalesExecutiveIdElementMsg", unauthorizedMessage);
//        } else if (data == invalidSession) {
//            callSessionTimeout();
//        } else {
//            if (data == null) {
//                displaySmallErrorMessages("addSalesExecutiveIdElementMsg", "no sales executive");
//            } else {
//                $.each(data, function(index, value) {
//                    $("#routeRetailerNameIdElement").append("<option value='" + value._id.$oid + "'>" + value.name + "</option>");
////                    $("#addSalesExecutiveIdElement").append("<option value='" + value._id.$oid + "'>" + value.fname + " " + value.mname + " " + value.lname + "</option>");
//                });
//            }
//        }
//    });
//}

function validate_Route() {

    if ($("#selectZoneIdElement").val() == "" || $("#selectZoneIdElement").val() == "Choose One") {
        $("#selectZoneId").addClass("has-error");
        $("#selectZoneIdElement").focus();
        $("#selectZoneIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter route Id.</span><br />");
    }
    if ($("#addRouteNameIdElement").val() == "") {
        $("#addRouteNameId").addClass("has-error");
        $("#addRouteNameIdElement").focus();
        $("#addRouteNameIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter route name Id.</span><br />");
    }
    if ($("#addZoneIdElement").val() == "") {
        $("#addZoneId").addClass("has-error");
        $("#addZoneIdElement").focus();
        $("#addZoneIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter zone Id.</span><br />");
    }
    if ($("#addSalesManIdElement").val() == "" || $("#addSalesManIdElement").val() == "Choose One") {
        $("#addSalesManId").addClass("has-error");
        $("#addSalesManIdElement").focus();
        $("#addSalesManIdElementMsg").text("").append("<span class='smallErrorMsg'>Please select sales man name.</span><br />");
    }
    if ($("#addFrequencyIdElement").val() == "") {
        $("#addFrequencyId").addClass("has-error");
        $("#addFrequencyIdElement").focus();
        $("#addFrequencyIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter frequency Id.</span><br />");
    }
    if ($("#selectStatusIdElement").val() == "") {
        $("#selectStatusId").addClass("has-error");
        $("#selectStatusIdElement").focus();
        $("#selectStatusIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter status.</span><br />");
    }
    if ($("#addEntityIdElement").val() == "") {
        $("#addEntityId").addClass("has-error");
        $("#addEntityIdElement").focus();
        $("#addEntityIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter entity Id.</span><br />");
    }
    if ($("#selectZoneIdElement").val() == "" || $("#selectZoneIdElement").val() == "Choose One" || $("#addRouteNameIdElement").val() == "" || $("#addZoneIdElement").val() == ""
            || $("#addSalesManIdElement").val() == "" || $("#addSalesManIdElement").val() == "Choose One" || $("#addFrequencyIdElement").val() == "" || $("#selectStatusIdElement").val() == "" || $("#addEntityIdElement").val() == "") {
        return false;
    } else {
        addRoute();
    }
}

function createRouteJson() {

    var days = $("#hiddenFrequencyId").text();
    days = days.split(',');
    var frequency = $("#selectFrequencyIdElement").val();
    var route = "";
    for (var i = 0; i < days.length - 1; i++) {
        var rowCount = $('#tableRow' + days[i] + ' tr').length;
        if (rowCount != 0) {
            var Json = "";
            var day = $("#days" + days[i]).text();
            Json = Json + "\"frequency\":\"" + frequency + "\",";
            Json = Json + "\"Day\":\"" + day + "\",";
            var temp = "";
            for (var j = 0; j < rowCount; j++) {
                var retailerNameId = $("#retailerNameId" + days[i] + j).text();
                temp = temp + retailerNameId + ",";
            }
            temp = temp.substr(0, temp.length - 2);
            Json = Json + "\"Retailer\":\"" + temp + "\",";
            Json = Json.substr(0, Json.length - 1);
            route = route + "{" + Json + "},";
        }
    }
    route = route.substr(0, route.length - 1);
    route = "[" + route + "]";
    return route;
}



// create route and call services...
function addRoute() {

    var routeName = $("#addRouteNameIdElement").val();
    var userId = getUserSessionElement("CurrentUserId");
    var retailerId = $("#routeRetailerNameIdElement").val();
    var retailerName = $("#routeRetailerNameIdElement").text();
    retailerName = retailerName.replace("Choose name", '');
    var type = "ROUTE";
    var Category = "VISIT";
    var zoneId = $("#selectedHiddenZoneId").val();
    var salesExecutiveId = $("#addSalesExecutiveIdElement").val();
// later it remove , insert id..
    var salesExecutiveName = $("#addSalesExecutiveIdElement option:selected").text();
    var status = $("#selectStatusIdElement").val();
    var routeJson = "";
    if (routeName != null || routeName != undefined) {
        routeJson = routeJson + "\"Name\":\"" + routeName + "\",";
    }
    if (userId != null || userId != undefined) {
        routeJson = routeJson + "\"UserID\":\"" + userId + "\",";
    }
    if (retailerId != null || retailerId != undefined) {
        routeJson = routeJson + "\"Retailerid\":\"" + retailerId + "\",";
    }
    if (retailerName != null || retailerName != undefined) {
        routeJson = routeJson + "\"RetailerName\":\"" + retailerName + "\",";
    }

// old route json.....
//----------------------------------------------------------------------------
//    var unit = $("#selectFrequencyIdElement").val();
//    var Frequency = $("#selectRepeatDays").val();
//    var DOW = $("#hidddenWeekDays").text();
//    var week = $("#selectWeeksId").val();
//    var month = "";
//    if (unit != null || unit != undefined) {
//        routeJson = routeJson + "\"Units\":\"" + unit + "\",";
//    }
//    if (Frequency != null || Frequency != undefined) {
//        routeJson = routeJson + "\"Freq\":\"" + Frequency + "\",";
//    }
//    if (DOW != null || DOW != undefined) {
//        routeJson = routeJson + "\"dow\":\"" + DOW + "\",";
//    }
//    if (week != null || week != undefined) {
//        routeJson = routeJson + "\"Week\":\"" + week + "\",";
//    }
//    if (month != null || month != undefined) {
//        routeJson = routeJson + "\"Month\":\"" + month + "\",";
//    }
//-------------end---------------------------------------------------------------

// new route json....
    var rJson = createRouteJson();
    if (rJson != null || rJson != undefined) {
        routeJson = routeJson + "\"route\":" + rJson + "\,";
    }
//----------------------------------------------------------------------------
// for route id.. later it write in back-end
    routeJson = routeJson + "\"routeid\":\"" + parseInt(Math.random() * 1000) + "\",";

    if (type != null || type != undefined) {
        routeJson = routeJson + "\"Type\":\"" + type + "\",";
    }
    if (Category != null || Category != undefined) {
        routeJson = routeJson + "\"Category\":\"" + Category + "\",";
    }
    // uncomment after demo..
//    if (salesExecutiveId != null || salesExecutiveId != undefined) {
//        routeJson = routeJson + "\"SalesExecutiveId\":\"" + salesExecutiveId + "\",";
//    }

// later it will remove..
    if (salesExecutiveName != null || salesExecutiveName != undefined) {
        routeJson = routeJson + "\"SalesExecutiveId\":\"" + salesExecutiveName + "\",";
    }
    if (zoneId != null || zoneId != undefined) {
        routeJson = routeJson + "\"zoneid\":\"" + zoneId + "\",";
    }
    if (status != null || status != undefined) {
        routeJson = routeJson + "\"status\":\"" + status + "\"";
    }
    var finalJSON = "{" + routeJson + "}";
    $.post(server_base_url + "AddRoute", {
        routeJson: finalJSON
    }).done(function(data) {
        if (data == fail) {
            displaySmallErrorMessages()("addRouteErrorElementMsg", failMessage);
            displaySmallErrorMessages("addRouteErrorElementMsg", failMessage);
        } else if (data == unauthorized) {
            displaySmallErrorMessages("addRouteErrorElementMsg", unauthorizedMessage);
            displaySmallErrorMessages("addRouteErrorElementMsg", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            viewRouteTable();
            $("#viewRouteTable").show();
            $("#addRouteField").hide();
            $("#addRouteTableLiId").removeClass("active");
            $("#viewRouteTableLiId").addClass("active");
        }
    });
}

function viewRouteTable() {

    $.post(server_base_url + "FetchRouteByUserId", {
        userId: getUserSessionElement("CurrentUserId")
    }).done(function(data) {
        if (data == fail) {
            displaySmallErrorMessages("addRouteErrorElementMsg", failMessage);
            displaySmallErrorMessages("addRouteErrorElementMsg", failMessage);
        } else if (data == unauthorized) {
            displaySmallErrorMessages()("addRouteErrorElementMsg", unauthorizedMessage);
            displaySmallErrorMessages("addRouteErrorElementMsg", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            if (data == null) {
            } else {
                $("#viewRouteTable").text("").append("<br><div class='form-group' id='viewRouteTableMainId' />");
                $("#viewRouteTableMainId").append("<div id = 'displayViewRouteSubDiv' class = 'panel panel-primary-head' />");
                $("#displayViewRouteSubDiv").append("<table id='displayViewRouteTable' class='table table-striped table-bordered'>");
//                $("#displayViewRouteTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'><i class='fa fa-calendar'></i>Route Name</th><th style='min-width:10%;width:auto;'><i class='glyphicon glyphicon-user'></i>Retailer Name</th><th style='min-width:30%;width:auto;'><i class='fa fa-calendar'></i>Frequency</th><th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i>Status</th><th style='min-width:20%;width:20%;'>Update/Delete</th></tr></thead>");
                $("#displayViewRouteTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'>Route Id</th><th style='min-width:30%;width:auto;'>Route Name</th><th style='min-width:10%;width:auto;'><i class='glyphicon glyphicon-user'></i>Sales Executive</th><th style='min-width:30%;width:auto;'><i class='fa fa-calendar'></i>Frequency Type</th><th style='min-width:30%;width:auto;'>Status</th></tr></thead>");
                $("#displayViewRouteTable").append("<tbody id='displayViewRouteTableBody' />");
                $.each(data, function(index, value) {
                    if (value.status != "Inactive") {
                        var routeDetails = JSON.stringify(value.route);
                        var mc = value.routeid;
                        if (value.routeid == undefined) {
                            mc = "";
                        }
                        $("#displayViewRouteTableBody").append("<tr><td>" + mc + "</td><td>" + value.Name + "</td><td>" + value.SalesExecutiveId + "</td>"
                                + "<td><span style='cursor:pointer' onclick=viewFrequency('" + index + "') >" + value.route[0].frequency + "</span><br /><br /><span id='routeDisplayId" + index + "' />"
                                + "<input type='hidden' id='hiddenRouteDetails" + index + "' value='" + routeDetails + "' readonly></td>"
                                + "<td>" + value.status + "</td></tr>");
                    }
                });

                var shTable = jQuery('#displayViewRouteTable').DataTable({
                    "fnDrawCallback": function(oSettings) {
                        jQuery('#displayViewRouteTable ul').addClass('pagination-active-dark');
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

// for view frequency....
function viewFrequency(index) {
    var routeDetails = $("#hiddenRouteDetails" + index).val();
    var route = JSON.parse(routeDetails);
    $("#routeDisplayId" + index).append("<div id='routeDaysId" + index + "' />");
    $("#routeDaysId" + index).text("").append("<div id='routeDaysUlId" + index + "' />");
    $.each(route, function(ind, value) {
        $("#routeDaysUlId" + index).append("<span id='retailerDisplay" + index + ind + "'  onclick=viewRetailers('" + index + "','" + ind + "','" + value.Day + "') ><div style='cursor:pointer;color:blue;'>" + value.Day + "</div></span>");
    });
}

// view retailer on perticular frequency...
function viewRetailers(index, DivInd, days) {

    var routeDetails = $("#hiddenRouteDetails" + index).val();
    var route = JSON.parse(routeDetails);
    $("#retailerDisplay" + index + DivInd).append("<div id='displayRetailerLiId" + index + DivInd + "' />");
    $("#displayRetailerLiId" + index + DivInd).text("").append("<div id='displayRetailerId" + index + DivInd + "' />");
    $.each(route, function(ind, value) {
        if (value.Day == days) {
            var retail = (value.Retailer).split(',');
            for (var i = 0; i < retail.length; i++) {
                $("#displayRetailerLiId" + index + DivInd).append("<li>" + retail[i] + "</li>");
            }
        }
    });
}

// fetch route by Id
function editRoute(routeId) {
    $("#viewRouteTable").hide();
    $("#addRouteField").show();
    $("#viewRouteTableLiId").removeClass("active");
    $("#addRouteTableLiId").addClass("active");
    $.post(server_base_url + "FetchRouteById", {
        routeId: routeId
    }).done(function(data) {
        if (data == fail) {
            displaySmallErrorMessages()("addRouteErrorElementMsg", failMessage);
            displaySmallErrorMessages("addRouteErrorElementMsg", failMessage);
        } else if (data == unauthorized) {
            displaySmallErrorMessages("addRouteErrorElementMsg", unauthorizedMessage);
            displaySmallErrorMessages("addRouteErrorElementMsg", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            $.each(JSON.parse(data.route), function(index, value) {
                displayZone(value.zoneid);
                $("#addRouteNameIdElement").val(value.Name);
                $("#addSalesExecutiveIdElement").val(value.SalesExecutiveId);
                $("#selectFrequencyIdElement").val(value.Units);
                manageFrequency_v1('selectFrequencyIdElement');
                $("#selectRepeatDays").val(value.Freq);
                $("#selectWeeksId").val(value.Week);
                $("#routeRetailerNameIdElement").val(value.Retailerid);
                $("#selectStatusIdElement").val(value.status);
                $("#submitRoutebutton").text("").append("<button id='otherUserSubmitButton' class='btn btn-primary mr5' onclick=updateRoute('" + value._id.$oid + "')>Update</button>");
                $("#submitRoutebutton").append("<span id='addRouteErrorElementMsg'></span>");
                var dows = value.dow.split(',');

                $.each(dows, function(ind, val) {
                    if (value.Units == "Monthly") {
                        $("#" + val + "IdselectWeeksId").prop("checked", true);
                        weeksOnClick(val + 'LabelselectWeeksId', val + 'IdselectWeeksId');
                    }
                    if (value.Units == "Weekly") {
                        $("#" + val + "IdId1").prop("checked", true);
                        weeksOnClick(val + 'LabelId1', val + 'IdId1');
                    }
                });
                var hashmap = {};
                $.each(data.zone, function(index, value) {
                    hashmap[index] = value;
                });
//                alert(Object.keys(hashmap).length);
//                alert(Object.keys(hashmap)[0]);
                var prefix = "";
                var g = 0;
                for (var mc = Object.keys(hashmap).length; mc > 0; mc--) {
                    if ((++g) == 1) {
                        $("#selectZoneIdElement" + prefix).val(hashmap[Object.keys(hashmap)[parseInt(mc) - 1]]);
                        selectChildZone("selectZoneIdElement" + prefix, hashmap[Object.keys(hashmap)[parseInt(mc) - 1]]);
                        prefix = hashmap[Object.keys(hashmap)[parseInt(mc) - 1]];
                    } else {
                        $("#selectChildZoneIdElement" + prefix).val(hashmap[Object.keys(hashmap)[parseInt(mc) - 1]]);
                        selectChildZone("selectChildZoneIdElement" + prefix, hashmap[Object.keys(hashmap)[parseInt(mc) - 1]]);
                        prefix = hashmap[Object.keys(hashmap)[parseInt(mc) - 1]];
                    }
                }
            });
        }
    });
}

//display zone
function displayZone(zoneId) {
//    alert(zoneId);
}

// for update route...
function updateRoute(routeId) {

    var routeName = $("#addRouteNameIdElement").val();
    var userId = getUserSessionElement("CurrentUserId");
    var retailerId = $("#routeRetailerNameIdElement").val();
    var retailerName = $("#routeRetailerNameIdElement").text();
    retailerName = retailerName.replace("Choose name", '');
    var type = "ROUTE";
    var Category = "VISIT";
    var zoneId = $("#selectedHiddenZoneId").val();
    var salesExecutiveId = $("#addSalesExecutiveIdElement").val();
    var status = $("#selectStatusIdElement").val();

    var unit = $("#selectFrequencyIdElement").val();
    var Frequency = $("#selectRepeatDays").val();
    var DOW = $("#hidddenWeekDays").text();
    var week = $("#selectWeeksId").val();

    var month = "";

    var routeJson = "";
    if (routeName != null || routeName != undefined) {
        routeJson = routeJson + "\"Name\":\"" + routeName + "\",";
    }
    if (userId != null || userId != undefined) {
        routeJson = routeJson + "\"UserID\":\"" + userId + "\",";
    }
    if (retailerId != null || retailerId != undefined) {
        routeJson = routeJson + "\"Retailerid\":\"" + retailerId + "\",";
    }
    if (retailerName != null || retailerName != undefined) {
        routeJson = routeJson + "\"RetailerName\":\"" + retailerName + "\",";
    }
    if (unit != null || unit != undefined) {
        routeJson = routeJson + "\"Units\":\"" + unit + "\",";
    }
    if (Frequency != null || Frequency != undefined) {
        routeJson = routeJson + "\"Freq\":\"" + Frequency + "\",";
    }
    if (DOW != null || DOW != undefined) {
        routeJson = routeJson + "\"dow\":\"" + DOW + "\",";
    }
    if (week != null || week != undefined) {
        routeJson = routeJson + "\"Week\":\"" + week + "\",";
    }
    if (month != null || month != undefined) {
        routeJson = routeJson + "\"Month\":\"" + month + "\",";
    }
    if (type != null || type != undefined) {
        routeJson = routeJson + "\"Type\":\"" + type + "\",";
    }
    if (Category != null || Category != undefined) {
        routeJson = routeJson + "\"Category\":\"" + Category + "\",";
    }
    if (salesExecutiveId != null || salesExecutiveId != undefined) {
        routeJson = routeJson + "\"SalesExecutiveId\":\"" + salesExecutiveId + "\",";
    }
    if (zoneId != null || zoneId != undefined) {
        routeJson = routeJson + "\"zoneid\":\"" + zoneId + "\",";
    }
    if (status != null || status != undefined) {
        routeJson = routeJson + "\"status\":\"" + status + "\"";
    }
    var finalJSON = "{" + routeJson + "}";

    $.post(server_base_url + "UpdateRoute", {
        routeJson: finalJSON,
        routeId: routeId
    }).done(function(data) {
        if (data == fail) {
            displaySmallErrorMessages()("addRouteErrorElementMsg", failMessage);
            displaySmallErrorMessages("addRouteErrorElementMsg", failMessage);
        } else if (data == unauthorized) {
            displaySmallErrorMessages("addRouteErrorElementMsg", unauthorizedMessage);
            displaySmallErrorMessages("addRouteErrorElementMsg", unauthorizedMessage);
        } else if (data == invalidSession) {
            callSessionTimeout();
        } else {
            viewRouteTable();
            $("#viewRouteTable").show();
            $("#addRouteField").hide();
            $("#addRouteTableLiId").removeClass("active");
            $("#viewRouteTableLiId").addClass("active");
        }
    });
}
