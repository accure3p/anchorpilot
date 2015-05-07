/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function addSubZoneMenu() {

    $("#zoneManagement").text("").append("<div class='col-md-13' id='zoneMenuTab' />");
    $("#zoneMenuTab").append("<ul class='nav nav-tabs nav-success' id='zoneMenuTabli' />");
    $("#zoneMenuTabli").append("<li class='active' style='cursor:pointer'><a onclick='viewZoneTab()' data-toggle='tab'><strong>View Zone</strong></a></li>");
//    $("#zoneMenuTabli").append("<li class='' style='cursor:pointer'><a onclick='addZoneTab()' data-toggle='tab'><strong>Add Zone</strong></a></li>");
    $("#zoneMenuTabli").append("<li class='' style='cursor:pointer'><a><strong>Add Zone</strong></a></li>");
    $("#zoneMenuTab").append("<div class='tab-content tab-content-primary mb30' id='zoneMenuMainContent' />");
    $("#zoneMenuMainContent").append("<br><div id='viewZoneFieldMsgId'>");
    $("#zoneMenuMainContent").append("<div class='tab-pane active' id='viewZoneField' ><div id='OrgData1'></div></div>");
    var parentzoneid = "";
    viewZoneTable(parentzoneid, "");
    $("#zoneMenuMainContent").append("<div class='tab-pane' id='addZoneField' ><div id='OrgData2'></div></div>");
    addZoneForm();
}
function viewZoneTab() {
    zoneHashmap = {};
    $("#viewZoneField").show();
    $("#addZoneField").hide();
    var parentzoneid = "";
    viewZoneTable(parentzoneid, "");
}
function addZoneTab() {
    $("#addZoneField").show();
    $("#viewZoneField").hide();
}

function addZoneForm() {

    $("#addZoneField").text("").append("<br><div class='form-group' id='addZoneForm' />");
    $("#addZoneForm").append("<lable class='col-sm-3 control-label'>Parent zone name *</lable>");
    $("#addZoneForm").append("<div class='col-sm-9' id='parentZoneNameId'/>");
//    $("#parentZoneNameId").append("<input type='text' onkeyup=common_keypress('parentZoneNameId') id='parentZoneNameIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Parent zone id'><span id='parentZoneNameIdElementMsg' /><br />");

    $("#parentZoneNameId").append("<select id='parentZoneNameIdElement' name='parentZoneNameIdElement' onchange=common_keypress('parentZoneNameId') class='form-control' />");
    $("#parentZoneNameIdElement").append("<option>Choose One</option><option>Service Tax</option><option>Sales Tax</option><option>Value Added Tax</option>");
    $("#parentZoneNameId").append("<span id='parentZoneNameIdElementMsg'></spam>");
    $("#addZoneForm").append("&nbsp;<br>");
    $("#addZoneForm").append("<lable class='col-sm-3 control-label'>Zone name *</lable>");
    $("#addZoneForm").append("<div class='col-sm-9' id='zoneNameId'/>");
    $("#zoneNameId").append("<input type='text' onkeyup=common_keypress('zoneNameId') id='zoneNameIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Zone name'><span id='zoneNameIdElementMsg' /><br />");
    $("#addZoneForm").append("<lable class='col-sm-3 control-label'>Group name *</lable>");
    $("#addZoneForm").append("<div class='col-sm-9' id='groupNameId'/>");
    $("#groupNameId").append("<input type='text' onkeyup=common_keypress('groupNameId') id='groupNameIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Zone name'><span id='groupNameIdElementMsg' /><br />");
//    $("#addZoneForm").append("<lable class='col-sm-3 control-label'>Zone Id *</lable>");
//    $("#addZoneForm").append("<div class='col-sm-9' id='zoneId'/>");
//    $("#zoneId").append("<input type='text' onkeyup=common_keypress('zoneId') id='zoneIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Zone Id'><span id='zoneIdElementMsg' /><br />");

    $("#addZoneForm").append("&nbsp;<br>");
    $("#addZoneForm").append("<lable class='col-sm-3 control-label'></lable>");
    $("#addZoneForm").append("<div class='col-sm-9' id='submitZonebutton'/>");
    $("#submitZonebutton").append("<button id='otherUserSubmitButton' class='btn btn-primary mr5' onclick='validate_Zone()'>Submit</button>");
    $("#submitZonebutton").append("<span id='stockItemErrorElementMsg'></span>");
}

function validate_Zone() {

    if ($("#parentZoneNameIdElement").val() == "" || $("#parentZoneNameIdElement").val() == "Choose One") {
        $("#parentZoneNameId").addClass("has-error");
        $("#parentZoneNameIdElement").focus();
        $("#parentZoneNameIdElementMsg").text("").append("<span class='smallErrorMsg'>Please select parent zone name.</span><br />");
    }
    if ($("#zoneNameIdElement").val() == "") {
        $("#zoneNameId").addClass("has-error");
        $("#zoneNameIdElement").focus();
        $("#zoneNameIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter zone name.</span><br />");
    }
    if ($("#groupNameIdElement").val() == "") {
        $("#groupNameId").addClass("has-error");
        $("#groupNameIdElement").focus();
        $("#groupNameIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter group name.</span><br />");
    }
    if ($("#zoneIdElement").val() == "") {
        $("#zoneId").addClass("has-error");
        $("#zoneIdElement").focus();
        $("#zoneIdElementMsg").text("").append("<span class='smallErrorMsg'>Please enter zone Item Id.</span><br />");
    }

    if ($("#parentZoneNameIdElement").val() == "" || $("#parentZoneNameIdElement").val() == "Choose One" || $("#zoneNameIdElement").val() == "" || $("#groupNameIdElement").val() == ""
            || $("#zoneIdElement").val() == "") {
        return false;
    } else {
        addZone();
    }
}

function addZone() {
    var parentZone = $("#parentZoneNameIdElement").val();
    var zoneName = $("#zoneNameIdElement").val();
    var groupName = $("#groupNameIdElement").val();
    var zoneId = $("#zoneIdElement").val();
}

function viewZoneTable(parentzoneid, parentZoneName) {

    $.post(server_base_url + "FetchZone", {
        orgId: getUserSessionElement("OrgId"),
        parentZoneId: parentzoneid
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
//                if (parentZoneName != "") {
//                    $("#viewZoneFieldMsgId").text("").append("<center>Parent Zone : " + parentZoneName + "</center>");
//                }

                $("#viewZoneFieldMsgId").text("").append("<span id='viewZoneHierarchyHomeId' />")
                $("#viewZoneFieldMsgId").append("<span id='viewZoneHierarchy' />")
                var mapLength = Object.keys(zoneHashmap).length;
                if (mapLength != 0) {
                    for (var ln = 0; ln < mapLength; ln++) {
                        if (parentZoneName != "") {
                            $("#viewZoneHierarchyHomeId").text("").append("<span style='margin-left:10px;font-size:17px;' class='btn btn-success glyphicon glyphicon-home' onclick=viewZoneTab() ></span>");
                            $("#viewZoneHierarchy").append("<span style='cursor:pointer;color:blue;margin-left:10px;font-size:17px;' onclick=updateZoneHash('" + Object.keys(zoneHashmap)[ln] + "','" + zoneHashmap[Object.keys(zoneHashmap)[ln]] + "')> " + zoneHashmap[Object.keys(zoneHashmap)[ln]] + " </span><span class='glyphicon glyphicon-circle-arrow-right' />");
                        }
                    }
                }
                $("#viewZoneField").text("").append("<div class='form-group' id='viewZoneTableMainId' />");
                $("#viewZoneTableMainId").append("<div id = 'viewZoneSubDiv' class = 'panel panel-primary-head' />");
                $("#viewZoneSubDiv").append("<table id='viewZoneTable' class='table table-striped table-bordered'>");
//                $("#viewZoneTable").append("<thead class=''><tr><th style='min-width:41%;width:auto;'><i class='glyphicon glyphicon-user'></i>Zone name</th><th style='min-width:41%;width:auto;'><i class='fa fa-calendar'></i>Group name</th><th style='min-width:41%;width:auto;'><i class='fa fa-calendar'></i>Created Date</th><th style='min-width:18%;width:100px;'>Update/Delete</th></tr></thead>");
                $("#viewZoneTable").append("<thead class=''><tr><th style='min-width:41%;width:auto;'><i class='glyphicon glyphicon-user'></i>Zone name</th><th style='min-width:41%;width:auto;'><i class='fa fa-calendar'></i>Group name</th><th style='min-width:18%;width:100px;'>Update/Delete</th></tr></thead>");
                $("#viewZoneTable").append("<tbody id='viewZoneTableBody' />");
                $.each(data, function(index, value) {
                    $("#viewZoneTableBody").append("<tr><td onclick=viewChieldZoneTable('" + value._id.$oid + "','" + value.name + "') style='cursor:pointer;color:blue'>" + value.name + "</td><td>" + value.groupname + "</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;'></span><span class='fa fa-trash-o' style='margin-left:15%;'></span></td></tr>");
                });
                var shTable = jQuery('#viewZoneTable').DataTable({
                    "fnDrawCallback": function(oSettings) {
                        jQuery('#viewZoneTable ul').addClass('pagination-active-dark');
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

// for zone hashmap....
var zoneHashmap = {};
function viewChieldZoneTable(zoneId, zoneName) {
    zoneHashmap[zoneId] = zoneName;
    viewZoneTable(zoneId, zoneName)
}

// update zone hash map...
function updateZoneHash(zoneId, zoneName) {

    var tempHash = {};
    var mapLength = Object.keys(zoneHashmap).length;
    if (mapLength != 0) {
        for (var ln = 0; ln < mapLength; ln++) {
            tempHash[Object.keys(zoneHashmap)[ln]] = zoneHashmap[Object.keys(zoneHashmap)[ln]];
            if (zoneId == Object.keys(zoneHashmap)[ln]) {
                break;
            }
        }
    }
    zoneHashmap = tempHash;
    viewZoneTable(zoneId, zoneName);
}

//Org structure.........
function addSubOrgStructureMenu() {

    $("#orgStructure").text("").append("<div class='col-md-13' id='orgStructureMenuTab' />");
    $("#orgStructureMenuTab").append("<ul class='nav nav-tabs nav-success' id='orgStructureMenuTabMenuTabli' />");
    $("#orgStructureMenuTabMenuTabli").append("<li class='active' style='cursor:pointer'><a onclick='viewNetworkHierarchyTab()' data-toggle='tab'><strong>Network Hierarchy</strong></a></li>");
    // disable org network hierarchy 
    //    $("#orgStructureMenuTabMenuTabli").append("<li class='' style='cursor:pointer'><a onclick='viewNetworkTab()' data-toggle='tab'><strong>Org Network</strong></a></li>");
    $("#orgStructureMenuTabMenuTabli").append("<li class='' style='cursor:pointer'><a onclick='addDistributorTab()' data-toggle='tab'><strong>Distributors</strong></a></li>");
    //added new
    $("#orgStructureMenuTabMenuTabli").append("<li class='' style='cursor:pointer'><a onclick='viewDistributorHierarchyTab()' data-toggle='tab'><strong>Stock Summary</strong></a></li>");
    $("#orgStructureMenuTab").append("<div class='tab-content tab-content-primary mb30' id='orgStructureMenuMainContent' />");
    $("#orgStructureMenuMainContent").append("<div class='tab-pane active' id='viewNetworkHierarchyField' ><div id='OrgData1'></div></div>");
    viewNetworkHierarchyTab();
    $("#orgStructureMenuMainContent").append("<div class='tab-pane' id='viewNetworkField' ><div id='OrgData1'></div></div>");
//    viewNetworkTable();
    $("#orgStructureMenuMainContent").append("<div id='viewDistributorFieldMsgId' ></div>");
    $("#orgStructureMenuMainContent").append("<div class='tab-pane' id='viewDistributorField' ><div id='OrgData2'></div></div>");
    viewDistributorTable();
    //added
    $("#orgStructureMenuMainContent").append("<div class='tab-pane' id='viewDistributorStockField' ><div id='OrgData3'></div></div>");
//    viewDistributorHierarchyTab();
}

function viewNetworkTab() {
    $("#viewDistributorStockField").hide();
    $("#viewNetworkField").show();
    $("#viewDistributorField").hide();
    $("#viewNetworkHierarchyField").hide();
    var parentzoneid = "";
    viewZoneTable(parentzoneid, "");
}
function addDistributorTab() {
    $("#viewDistributorField").show();
    $("#viewNetworkField").hide();
    $("#viewNetworkHierarchyField").hide();
    $("#viewDistributorStockField").hide();
    viewDistributorTable();
}
function viewNetworkHierarchyTab() {
    $("#viewNetworkField").hide();
    $("#viewDistributorField").hide();
    $("#viewNetworkHierarchyField").show();
    $("#viewDistributorStockField").hide();
    viewNetworkHierarchy();
}
//added 
function viewDistributorHierarchyTab() {
    $("#viewNetworkField").hide();
    $("#viewDistributorField").hide();
    $("#viewNetworkHierarchyField").hide();
    $("#viewDistributorStockField").show();
    viewDistributorHierarchyTable();
}

function viewNetworkHierarchy() {

    $("#viewNetworkHierarchyField").text("").append("<br><div class='form-group' id='viewNetworkHierarchyTableMainId' />");
    $("#viewNetworkHierarchyTableMainId").append("<div id='orgChartContainer'><div id='NetworkChart'></div></div>");
    $("#viewNetworkHierarchyTableMainId").append("<div id='consoleOutput'></div>");
    var testData = [
        {id: 1, name: 'Principal', parent: 0},
        {id: 2, name: 'Super stockist', parent: 1},
        {id: 3, name: 'Distributor', parent: 2},
        {id: 4, name: 'Retailer', parent: 3},
    ];
    org_chart = $('#NetworkChart').orgChart({
        data: testData,
        showControls: false,
        allowEdit: false,
        onAddNode: function(node) {
            log('Created new organization on organization ' + node.data.name);
            org_chart.newNode(node.data.id);
        },
        onDeleteNode: function(node) {
            log('Deleted organization ' + node.data.name);
            org_chart.deleteNode(node.data.id);
        }
//        onClickNode: function(node) {
//            log('Clicked organization ' + node.data.name);
//        }
    });
}
// for network table
function viewNetworkTable() {

    $("#viewNetworkField").text("").append("<br><div class='form-group' id='viewNetworkTableMainId' />");
    $("#viewNetworkTableMainId").append("<div id='orgChartContainer'><div id='orgChart'></div></div>");
    $("#viewNetworkTableMainId").append("<div id='consoleOutput'></div>");
    createOrgStructure();
}
// create Org hierarchy
function createOrgStructure() {
    var orgString = "";
    $.post(server_base_url + "FetchAllOrg", {
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
            org_chart = $('#orgChart').orgChart({
                data: data,
                showControls: true,
                allowEdit: true,
                onAddNode: function(node) {
                    log('Created new organization on organization ' + node.data.name);
                    org_chart.newNode(node.data.id);
                },
                onDeleteNode: function(node) {
                    log('Deleted organization ' + node.data.name);
                    org_chart.deleteNode(node.data.id);
                },
                onClickNode: function(node) {
                    log('Clicked organization ' + node.data.name);
                }
            });
        }
    });
//    var testData = [
//        {id: 1, name: 'Anchor', parent: 0},
//        {id: 2, name: 'World Traders', parent: 1},
//        {id: 4, name: 'Handy Traders', parent: 1},
//        {id: 6, name: 'Sun Traders', parent: 1},
//        {id: 7, name: 'Jug Traders', parent: 1},
//        {id: 5, name: 'Reliance Fresh', parent: 4},
//        {id: 9, name: 'Food World', parent: 4},
//        {id: 10, name: 'Nilgiris', parent: 7},
//    ];
//    org_chart = $('#orgChart').orgChart({
//        data: testData,
//        showControls: true,
//        allowEdit: true,
//        onAddNode: function(node) {
//            log('Created new node on node ' + node.data.id);
//            org_chart.newNode(node.data.id);
//        },
//        onDeleteNode: function(node) {
//            log('Deleted node ' + node.data.id);
//            org_chart.deleteNode(node.data.id);
//        },
//        onClickNode: function(node) {
//            log('Clicked node ' + node.data.id);
//        }
//    });

}


function log(text) {
    $('#consoleOutput').append('<p>' + text + '</p>')
}

function showChildNetwork() {

    $("#viewNetworkTableBody").text("").append("<tr><td>Blank</td><td>Retailer</td><td>pending</td><td align='center'><span class='glyphicon glyphicon-book' style='margin-left:2%;cursor:pointer;' onclick='showChildNetwork()'></span></td></tr>");
    $("#viewNetworkSubDiv").append("<span class='btn btn-primary btn-xs' onclick='viewNetworkTable()'>Back To Parent Newtork</span>");
}

function viewDistributorTable() {

    $.post(server_base_url + "FetchDistributorList", {
        parentorgid: getUserSessionElement("OrgId")
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

                $("#viewDistributorField").text("").append("<div id='viewDistributorFieldMsg' />");
                $("#viewDistributorField").append("<div id='viewDistributorFieldTable' />");
                $("#viewDistributorFieldTable").append("<br><div class='form-group' id='viewDistributorTableMainId' />");
                $("#viewDistributorTableMainId").append("<div id = 'viewDistributorSubDiv' class = 'panel panel-primary-head' />");
                $("#viewDistributorSubDiv").append("<table id='viewDistributorTable' class='table table-striped table-bordered'>");
                $("#viewDistributorTable").append("<thead class=''><tr><th style='min-width:41%;width:auto;'>Entity Name</th><th style='min-width:41%;width:auto;'>Group name</th><th style='min-width:41%;width:auto;'>Zone name</th></tr></thead>");
                $("#viewDistributorTable").append("<tbody id='viewDistributorTableBody' />");
                var parentOrgname = "";
                $.each(JSON.parse(data.parentOrgDetails), function(index, value) {
                    parentOrgname = value.name;
                });
                $("#viewDistributorFieldMsg").append("<center>Parent Entity : " + parentOrgname + "</center>");
                $.each(JSON.parse(data.Distributor), function(index, value) {
                    var zoneName = "";
                    $.each(data.zone, function(ind, val) {
                        if (value.zoneid == ind) {
                            zoneName = val;
                        }
                    });
                    var entityName = value.name;
                    entityName = entityName.replace(' ', '^');
                    $("#viewDistributorTableBody").append("<tr><td style='cursor:pointer;color:blue' onclick=viewRetailer('" + value._id.$oid + "','" + entityName + "')>" + value.name + "</td><td>" + value.groupname + "</td><td>" + zoneName + "</td></tr>");
                });
                var shTable = jQuery('#viewDistributorTable').DataTable({
                    "fnDrawCallback": function(oSettings) {
                        jQuery('#viewDistributorTable ul').addClass('pagination-active-dark');
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

function viewRetailer(parentOrgId, parentOrgName) {

    parentOrgName = parentOrgName.replace('^', ' ');
    $.post(server_base_url + "FetchRetailerList", {
        parentorgid: parentOrgId
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
                $("#viewDistributorFieldMsgId").text("");
                $("#viewDistributorField").text("").append("<span style='font-size:15px;' class=' btn btn-warning  btn-sm btn-block' id='displayZoneName'>Parent Entity : " + parentOrgName + "</span>");
                $("#viewDistributorField").append("<br><div class='form-group' id='viewDistributorTableMainId' />");
                $("#viewDistributorTableMainId").append("<div id = 'viewDistributorSubDiv' class = 'panel panel-primary-head' />");
                $("#viewDistributorSubDiv").append("<table id='viewDistributorTable' class='table table-striped table-bordered'>");
                $("#viewDistributorTable").append("<thead class=''><tr><th style='min-width:41%;width:auto;'>Retailer name</th><th style='min-width:41%;width:auto;'>Group name</th></tr></thead>");
                $("#viewDistributorTable").append("<tbody id='viewDistributorTableBody' />");
                $.each(data, function(index, value) {
                    $("#viewDistributorTableBody").append("<tr><td>" + value.name + "</td><td>" + value.groupname + "</td></tr>");
                });
                var shTable = jQuery('#viewDistributorTable').DataTable({
                    "fnDrawCallback": function(oSettings) {
                        jQuery('#viewDistributorTable ul').addClass('pagination-active-dark');
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

function viewDistributorHierarchyTable() {
    viewDistributorsForStock();
}

function viewDistributorsForStock() {
    $("#viewDistributorStockField").append("<div style='width:30%;'class='form-group' id='viewDisSelectId' />");
    $("#viewDisSelectId").text("").append("<lable><b>Select Distributor</b></lable><select id='DistributorSelect' class='form-control' onchange='disOnClick()'> ");
    $("#DistributorSelect").append("<option>Select Distributor...</option>");
    $.post(server_base_url + "FetchDistributorList", {
        parentorgid: getUserSessionElement("OrgId")
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
                $.each(JSON.parse(data.Distributor), function(index, value) {
                    $("#DistributorSelect").append("<option value='" + value._id.$oid + "'>" + value.name + "</option>");
                });
            }
        }
    });
}

function disOnClick() {
    $.post(server_base_url + "FetchAllStocks", {
        orgId: $("#DistributorSelect").val()
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
                $("#viewDistributorStockField").append("<div class='form-group' id='viewDisStockTableMainId' />");
                $("#viewDisStockTableMainId").text("").append("<div id = 'viewDisStockSubDiv' class = 'panel panel-primary-head' />");
                $("#viewDisStockSubDiv").append("<table id='viewDisStockTable' class='table table-striped table-bordered'>");
                $("#viewDisStockTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i>Item Code</th>\n\
                    <th style='min-width:15%;width:auto;'>Item name</th><th style='max-width:100px;'>In Stock Quantity</th><th style='max-width:100px;'>Booked Quantity</th><th style='max-width:100px;'>Re-Order Level</th></tr></thead>");
                $("#viewDisStockTable").append("<tbody id='viewDisStockTableBody' />");
                $.each(data, function(index, value) {
                    $("#viewDisStockTableBody").append("<tr><td>" + value.itemcode + "</td><td>" +
                            value.itemname + "</td><td>" + value.instockqty + "</td><td>" + value.bookedqty + "</td><td>" + value.reorderlevel + "</td></tr>");
                });
                var shTable = jQuery('#viewDisStockTable').DataTable({
                    "fnDrawCallback": function(oSettings) {
                        jQuery('#viewDisStockTable ul').addClass('pagination-active-dark');
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