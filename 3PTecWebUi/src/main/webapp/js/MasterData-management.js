/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function addSubMasterDataMenu() {

    $("#masterDataManagement").text("").append("<div class='col-md-13' id='masterDataMenuTab' />");
    $("#masterDataMenuTab").append("<ul class='nav nav-tabs nav-success' id='masterDataMenuTabli' />");

    $("#masterDataMenuTabli").append("<li class='active' style='cursor:pointer' id='viewItemDataFieldLiId' ><a onclick='viewItemDataTab()' data-toggle='tab'><strong>Item Management</strong></a></li>");
    // $("#masterDataMenuTabli").append("<li class='' style='cursor:pointer' id='viewPackageDataFieldLiId' ><a onclick='viewPackageDataTab()' data-toggle='tab'><strong>Package Management</strong></a></li>");
    $("#masterDataMenuTabli").append("<li class='' style='cursor:pointer' id='viewTaxFieldLiId' ><a onclick='viewTaxDataTab()' data-toggle='tab'><strong>Tax Management</strong></a></li>");

    $("#masterDataMenuTab").append("<div class='tab-content tab-content-primary mb30' id='masterDataMenuMainContent' />");

    $("#masterDataMenuMainContent").append("<div class='tab-pane active' id='viewItemDataField' ><div id='OrgData1'></div></div>");
    viewItemDataTable();

//    $("#masterDataMenuMainContent").append("<div class='tab-pane' id='viewPackageDataField' ><div id='OrgData2'></div></div>");
//    viewPackageDataTable();

    $("#masterDataMenuMainContent").append("<div class='tab-pane' id='viewTaxField' ><div id='OrgData2'></div></div>");
    viewTaxDataTable();
}

function viewItemDataTab() {
    $("#viewItemDataField").show();
    $("#viewPackageDataField").hide();
    $("#viewTaxField").hide();
    viewItemDataTable();
}
function viewPackageDataTab() {
    $("#viewItemDataField").hide();
    $("#viewPackageDataField").show();
    $("#viewTaxField").hide();
    viewPackageDataTable();
}
function viewTaxDataTab() {
    $("#viewItemDataField").hide();
    $("#viewPackageDataField").hide();
    $("#viewTaxField").show();
    viewTaxDataTable();
}
// for Item menu
function viewItemDataTable() {

    $.post(server_base_url + "FetchItemMaster", {
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
                $("#viewItemDataField").text("").append("<br><div class='form-group' id='viewItemDataTableMainId' />");
                $("#viewItemDataTableMainId").append("<div id = 'viewItemDataSubDiv' class = 'panel panel-primary-head' />");
                //heading start
                $("#viewItemDataSubDiv").append("<div  id='viewItemDataSubDivHeading' />");
                $("#viewItemDataSubDivHeading").text("").append("<span class='btn btn-primary' onclick='addNewItem()'>Add New Item</span></h3>");
                $("#viewItemDataSubDiv").append("<table id='viewItemDataTable' class='table table-striped table-bordered'>");
//                $("#viewItemDataTable").append("<thead class=''><tr><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i>Item Id </th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i>Package Map Id</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i>Child Package Id</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i>Child Package Quantity</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i>Description </th><th style='min-width:15%;width:auto;'>Unit price </th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i>Tax Group</th><th style='min-width:18%;width:18%;'>Update/Delete</th></tr></thead>");
                $("#viewItemDataTable").append("<thead class=''><tr><th style='min-width:10%;width:auto;'>Item Id </th><th style='min-width:10%;width:auto;'>Package Map Id</th><th style='min-width:10%;width:auto;'>Child Package Id</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i>Child Package Quantity</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i>Description </th><th style='min-width:15%;width:auto;'>Unit price </th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i>Tax Group</th></tr></thead>");
                $("#viewItemDataTable").append("<tbody id='viewItemDataTableBody' />");

                $.each(data, function(index, value) {
//                  $("#viewItemDataTable").append("<tr><td>" + value.itemcode + "</td><td>" + value.group + "</td><td>" + value.createdate + "</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;'></span><span class='fa fa-trash-o' style='margin-left:15%;'></span></td></tr>");
                    $("#viewItemDataTableBody").append("<tr><td>" + value.itemcode + "</td><td>" + value.pkgmapid + "</td><td>" + value.childpkgid + "</td><td>" + value.childpkgqty + "</td><td>" + value.description + "</td><td>" + value.unitprice + "</td><td>" + value.taxgroup + "</td></tr>");
                });

                var shTable = jQuery('#viewItemDataTable').DataTable({
                    "fnDrawCallback": function(oSettings) {
                        jQuery('#viewItemDataTable ul').addClass('pagination-active-dark');
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


function addNewItem() {
//    viewItemDataTable();
    $("#viewItemDataField").text("").append("<br><div class='form-group' style='width:70%;' id='addItemForm' />");
    $("#addItemForm").append("<lable class='col-sm-3 control-label'>Package map name *</lable>");
    $("#addItemForm").append("<div class='col-sm-9' id='pkgmapId'/>");
    $("#pkgmapId").append("<input type='text' onkeyup=common_keypress('pkgmapId') id='pkgmapIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Package map name '><span id='pkgmapIdElementMsg' /><br />");
    $("#addItemForm").append("<lable class='col-sm-3 control-label'>Package Id *</lable>");
    $("#addItemForm").append("<div class='col-sm-9' id='pkgid'/>");
    $("#pkgid").append("<input type='text' onkeyup=common_keypress('pkgid') id='pkgidElement' style='text-transform: capitalize;' class='form-control' placeholder='Package Id'><span id='pkgidElementMsg' /><br />");
    $("#addItemForm").append("<lable class='col-sm-3 control-label'>Item Id *</lable>");
    $("#addItemForm").append("<div class='col-sm-9' id='itemId'/>");
    $("#itemId").append("<input type='text' onkeyup=common_keypress('itemId') id='itemIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Item Id'><span id='itemIdElementMsg' /><br />");
    $("#addItemForm").append("<lable class='col-sm-3 control-label'>Parent entity Id*</lable>");
    $("#addItemForm").append("<div class='col-sm-9' id='parententityId'/>");
    $("#parententityId").append("<input type='text' onkeyup=common_keypress('parententityId') id='parententityIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Parent entity Id '><span id='parententityIdElementMsg' /><br />");
    $("#addItemForm").append("<lable class='col-sm-3 control-label'>Entity Id*</lable>");
    $("#addItemForm").append("<div class='col-sm-9' id='entityId'/>");
    $("#entityId").append("<input type='text' onkeyup=common_keypress('entityId') id='entityIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Entity Id '><span id='entityIdElementMsg' /><br />");
    $("#addItemForm").append("<lable class='col-sm-3 control-label'>Child package name *</lable>");
    $("#addItemForm").append("<div class='col-sm-9' id='childpkgId'/>");
    $("#childpkgId").append("<input type='text' onkeyup=common_keypress('childpkgId') id='childpkgIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Child package name '><span id='childpkgIdElementMsg' /><br />");
    $("#addItemForm").append("<lable class='col-sm-3 control-label'>Child package quantity *</lable>");
    $("#addItemForm").append("<div class='col-sm-9' id='childpkgqtyId'/>");
    $("#childpkgqtyId").append("<input type='text' onkeyup=common_keypress('childpkgqtyId') id='childpkgqtyIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Child package quantity'><span id='childpkgqtyIdElementMsg' /><br />");
    $("#addItemForm").append("&nbsp;<br>");
    $("#addItemForm").append("<lable class='col-sm-3 control-label'></lable>");
    $("#addItemForm").append("<div class='col-sm-9' id='addItemFormbutton'/>");
    $("#addItemFormbutton").append("<button id='addItemSubmitButton' class='btn btn-primary mr5' onclick='validate_addItem()'>Submit</button>");
    $("#addItemFormbutton").append("<span id='addItemErrorElementMsg'></span>");
}
function validate_addItem() {
//    alert("service not complete");
    viewItemDataTable();
}

// for package
function viewPackageDataTable() {

    $("#viewPackageDataField").text("").append("<br><div class='form-group' id='viewPackageDataTableMainId' />");
    $("#viewPackageDataTableMainId").append("<div id = 'viewPackageDataSubDiv' class = 'panel panel-primary-head' />");
    $("#viewPackageDataSubDiv").append("<div  id='viewPackageDataSubDivHeading' />");
    $("#viewPackageDataSubDivHeading").text("").append("<span class='btn btn-primary' onclick='addPackageMaster()'>Add Package Master</span></h3>");
    $("#viewPackageDataSubDivHeading").append("<span class='btn btn-primary' onclick='addPackageMapper()' style='margin-left:2%;'>Add Package Mapper</span></h3>");
    // package master list
    $("#viewPackageDataSubDiv").append("<br><br><span style='font-size:15px' class=' btn btn-warning  btn-sm btn-block'>Package Master List</span>");
    $("#viewPackageDataSubDiv").append("<table id='viewPackageDataTable' class='table table-striped table-bordered'>");
    $("#viewPackageDataTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i>Package-Id</th><th style='min-width:15%;width:auto;'>Package Map-Id</th><th style='min-width:15%;width:auto;'>Package Child-Id</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i>Type</th><th style='min-width:15%;width:auto;'>Quantity</th><th style='min-width:18%;width:18%;'>Update/Delete</th></tr></thead>");
    $("#viewPackageDataTable").append("<tbody id='viewPackageDataTableBody' />");
    $("#viewPackageDataTableBody").append("<tr><td>AMSC001</td><td>AGC001</td><td>AGCH001</td><td>DS</td><td>10</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;'></span><span class='fa fa-trash-o' style='margin-left:15%;'></span></td></tr>");
    $("#viewPackageDataTableBody").append("<tr><td>AMSC002</td><td>AGC002</td><td>AGCH002</td><td>DS</td><td>50</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;'></span><span class='fa fa-trash-o' style='margin-left:15%;'></span></td></tr>");
    $("#viewPackageDataTableBody").append("<tr><td>AMSC003</td><td>AGC003</td><td>AGCH003</td><td>DS</td><td>550</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;'></span><span class='fa fa-trash-o' style='margin-left:15%;'></span></td></tr>");
    $("#viewPackageDataTableBody").append("<tr><td>AMSC004</td><td>AGC004</td><td>AGCH004</td><td>DS</td><td>80</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;'></span><span class='fa fa-trash-o' style='margin-left:15%;'></span></td></tr>");

    var shTable = jQuery('#viewPackageDataTable').DataTable({
        "fnDrawCallback": function(oSettings) {
            jQuery('#viewPackageDataTable ul').addClass('pagination-active-dark');
        },
        responsive: false
    });
    jQuery('div.dataTables_length select').removeClass('form-control input-sm');
    jQuery('div.dataTables_length select').css({width: '60px'});
    jQuery('div.dataTables_length select').select2({
        minimumResultsForSearch: -1
    });
    $("#viewPackageDataTableMainId").append("<div id = 'viewPackageDataSubDiv1' class = 'panel panel-primary-head' />");
    // package mapper list
    $("#viewPackageDataSubDiv1").append("<br><br><span style='font-size:15px' class=' btn btn-warning  btn-sm btn-block'>Package Mapper List</span>");
    $("#viewPackageDataSubDiv1").append("<table id='viewPackageMapperDataTable' class='table table-striped table-bordered'>");
//    $("#viewPackageMapperDataTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i>Package code</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i>Description</th><th style='min-width:15%;width:auto;'>Quantity </th><th style='min-width:18%;width:18%;'>Update/Delete</th></tr></thead>");
    $("#viewPackageMapperDataTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i>Package-Id</th><th style='min-width:15%;width:auto;'>Package Map-Id</th><th style='min-width:15%;width:auto;'>Package Child-Id</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i>Type</th><th style='min-width:15%;width:auto;'>Quantity</th><th style='min-width:18%;width:18%;'>Update/Delete</th></tr></thead>");
    $("#viewPackageMapperDataTable").append("<tbody id='viewPackageMapperDataTableBody' />");
    $("#viewPackageMapperDataTableBody").append("<tr><td>AMPC002</td><td>AGC001</td><td>AGCH001</td><td>DS</td><td>10</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;'></span><span class='fa fa-trash-o' style='margin-left:15%;'></span></td></tr>");
    $("#viewPackageMapperDataTableBody").append("<tr><td>AMPC002</td><td>AGC002</td><td>AGCH002</td><td>DS</td><td>50</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;'></span><span class='fa fa-trash-o' style='margin-left:15%;'></span></td></tr>");
    $("#viewPackageMapperDataTableBody").append("<tr><td>AMPC003</td><td>AGC003</td><td>AGCH003</td><td>DS</td><td>50</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;'></span><span class='fa fa-trash-o' style='margin-left:15%;'></span></td></tr>");
    $("#viewPackageMapperDataTableBody").append("<tr><td>AMPC004</td><td>AGC004</td><td>AGCH004</td><td>DS</td><td>50</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;'></span><span class='fa fa-trash-o' style='margin-left:15%;'></span></td></tr>");

    var shTable = jQuery('#viewPackageMapperDataTable').DataTable({
        "fnDrawCallback": function(oSettings) {
            jQuery('#viewPackageMapperDataTable ul').addClass('pagination-active-dark');
        },
        responsive: false
    });
    jQuery('div.dataTables_length select').removeClass('form-control input-sm');
    jQuery('div.dataTables_length select').css({width: '60px'});
    jQuery('div.dataTables_length select').select2({
        minimumResultsForSearch: -1
    });
}

function addPackageMaster() {

    $("#viewPackageDataField").text("").append("<span style='font-size:15px' class=' btn btn-warning  btn-sm btn-block'>Add Package Master</span>");
    $("#viewPackageDataField").append("<br><div class='form-group' id='mainPackageDataForm' />");
//    viewPackageDataTable();

    $("#mainPackageDataForm").append("<lable class='col-sm-3 control-label'>Package map Id *</lable>");
    $("#mainPackageDataForm").append("<div class='col-sm-9' id='pkgMasterMapId'/>");
    $("#pkgMasterMapId").append("<input type='text' onkeyup=common_keypress('pkgMasterMapId') id='pkgMasterMapIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Package map Id '><span id='pkgMasterMapIdElementMsg' /><br />");
    $("#mainPackageDataForm").append("<lable class='col-sm-3 control-label'>Package Id *</lable>");
    $("#mainPackageDataForm").append("<div class='col-sm-9' id='pkgMasterId'/>");
    $("#pkgMasterId").append("<input type='text' onkeyup=common_keypress('pkgMasterId') id='pkgMasterIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Package Id'><span id='pkgMasterIdElementMsg' /><br />");
    $("#mainPackageDataForm").append("<lable class='col-sm-3 control-label'>Child Package Id *</lable>");
    $("#mainPackageDataForm").append("<div class='col-sm-9' id='childpkgMasterId'/>");
    $("#childpkgMasterId").append("<input type='text' onkeyup=common_keypress('childpkgMasterId') id='childpkgMasterIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Childpkg package Id'><span id='childpkgMasterIdElementMsg' /><br />");
    $("#mainPackageDataForm").append("<lable class='col-sm-3 control-label'>Child Package quantity *</lable>");
    $("#mainPackageDataForm").append("<div class='col-sm-9' id='childpkgqtyMasterId'/>");
    $("#childpkgqtyMasterId").append("<input type='text' onkeyup=common_keypress('childpkgqtyMasterId') id='childpkgqtyMasterIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Child Package quantity '><span id='childpkgqtyMasterIdElementMsg' /><br />");
    $("#mainPackageDataForm").append("<lable class='col-sm-3 control-label'>Item Id *</lable>");
    $("#mainPackageDataForm").append("<div class='col-sm-9' id='itemMasterId'/>");
    $("#itemMasterId").append("<input type='text' onkeyup=common_keypress('itemMasterId') id='itemMasterIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Item Id'><span id='itemMasterIdElementMsg' /><br />");
    $("#mainPackageDataForm").append("<lable class='col-sm-3 control-label'>Parent Entity Id *</lable>");
    $("#mainPackageDataForm").append("<div class='col-sm-9' id='parentEntityMasterId'/>");
    $("#parentEntityMasterId").append("<input type='text' onkeyup=common_keypress('parentEntityMasterId') id='parentEntityMasterIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Parent Entity Id'><span id='parentEntityMasterIdElementMsg' /><br />");
    $("#mainPackageDataForm").append("<lable class='col-sm-3 control-label'>Entity Id *</lable>");
    $("#mainPackageDataForm").append("<div class='col-sm-9' id='entityMasterId'/>");
    $("#entityMasterId").append("<input type='text' onkeyup=common_keypress('entityMasterId') id='entityMasterIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Entity Id'><span id='entityMasterIdElementMsg' /><br />");
    $("#mainPackageDataForm").append("&nbsp;<br>");
    $("#mainPackageDataForm").append("<lable class='col-sm-3 control-label'></lable>");
    $("#mainPackageDataForm").append("<div class='col-sm-9' id='submitPkgMasterbutton'/>");
    $("#submitPkgMasterbutton").append("<button id='PkgMasterSubmitButton' class='btn btn-primary mr5' onclick='validate_PkgMaster()'>Submit</button>");
    $("#submitPkgMasterbutton").append("<span id='pkgMasterErrorElementMsg'></span>");
}

function validate_PkgMaster() {
    viewPackageDataTable();
}

// for package Master
function addPackageMapper() {

    $("#viewPackageDataField").text("").append("<span style='font-size:15px' class=' btn btn-warning  btn-sm btn-block'>Add Package Mapper</span>");
    $("#viewPackageDataField").append("<br><div class='form-group' id='mainPackageDataForm' />");
//    viewPackageDataTable();

    $("#mainPackageDataForm").append("<lable class='col-sm-3 control-label'>Package map Id *</lable>");
    $("#mainPackageDataForm").append("<div class='col-sm-9' id='pkgmapperMapId'/>");
    $("#pkgmapperMapId").append("<input type='text' onkeyup=common_keypress('pkgmapperMapId') id='pkgmapperMapIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Package map Id '><span id='pkgmapperMapIdElementMsg' /><br />");
    $("#mainPackageDataForm").append("<lable class='col-sm-3 control-label'>Package Id *</lable>");
    $("#mainPackageDataForm").append("<div class='col-sm-9' id='pkgMapperId'/>");
    $("#pkgMapperId").append("<input type='text' onkeyup=common_keypress('pkgMapperId') id='pkgMapperIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Package Id'><span id='pkgMapperIdElementMsg' /><br />");
    $("#mainPackageDataForm").append("<lable class='col-sm-3 control-label'>Child Package Id *</lable>");
    $("#mainPackageDataForm").append("<div class='col-sm-9' id='childpkgMapperId'/>");
    $("#childpkgMapperId").append("<input type='text' onkeyup=common_keypress('childpkgMapperId') id='childpkgMapperIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Childpkg package Id'><span id='childpkgMapperIdElementMsg' /><br />");
    $("#mainPackageDataForm").append("<lable class='col-sm-3 control-label'>Child Package quantity *</lable>");
    $("#mainPackageDataForm").append("<div class='col-sm-9' id='childpkgqtyMapperId'/>");
    $("#childpkgqtyMapperId").append("<input type='text' onkeyup=common_keypress('childpkgqtyMapperId') id='childpkgqtyMapperIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Child Package quantity '><span id='childpkgqtyMapperIdElementMsg' /><br />");
    $("#mainPackageDataForm").append("<lable class='col-sm-3 control-label'>Item Id *</lable>");
    $("#mainPackageDataForm").append("<div class='col-sm-9' id='itemMapperId'/>");
    $("#itemMapperId").append("<input type='text' onkeyup=common_keypress('itemMapperId') id='itemMapperIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Item Id'><span id='itemMapperIdElementMsg' /><br />");
    $("#mainPackageDataForm").append("&nbsp;<br>");
    $("#mainPackageDataForm").append("<lable class='col-sm-3 control-label'></lable>");
    $("#mainPackageDataForm").append("<div class='col-sm-9' id='submitPkgMapperbutton'/>");
    $("#submitPkgMapperbutton").append("<button id='pkgMapperSubmitButton' class='btn btn-primary mr5' onclick='validate_PkgMapper()'>Submit</button>");
    $("#submitPkgMapperbutton").append("<span id='pkgMapperErrorElementMsg'></span>");
}

function validate_PkgMapper() {
    viewPackageDataTable();
}

//for tax field
function viewTaxDataTable() {


    $.post(server_base_url + "FetchTaxMaster", {
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
                $("#viewTaxField").text("").append("<br><div class='form-group' id='viewTaxDataTableMainId' />");
                $("#viewTaxDataTableMainId").append("<div id = 'ViewTaxDataSubDiv' class = 'panel panel-primary-head' />");
                //heading start
                $("#ViewTaxDataSubDiv").append("<div  id='ViewTaxDataSubDivHeading' />");
                $("#ViewTaxDataSubDivHeading").text("").append("<span class='btn btn-primary' onclick='addNewTaxItem()'>Add New Tax Item</span></h3>");
                $("#ViewTaxDataSubDiv").append("<table id='ViewTaxDataTable' class='table table-striped table-bordered'>");
                $("#ViewTaxDataTable").append("<thead class=''><tr><th style='min-width:30%;width:auto;'><i class='glyphicon glyphicon-user'></i>Tex-Id</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i>Type</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i>Description </th><th style='min-width:15%;width:auto;'>Percentage</th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i>State </th><th style='min-width:10%;width:auto;'><i class='fa fa-calendar'></i>Country</th><th style='min-width:18%;width:18%;'>Update/Delete</th></tr></thead>");
                $("#ViewTaxDataTable").append("<tbody id='ViewTaxDataTableBody' />");
//                alert(data);
                $.each(data, function(index, value) {
//                    $("#ViewTaxDataTableBody").append("<tr><td>AF-TAX-1001</td><td>VAT</td><td>Tax on commodities</td><td>18.5%</td><td>Karnataka</td><td>India</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;'></span><span class='fa fa-trash-o' style='margin-left:15%;'></span></td></tr>");
                    $("#ViewTaxDataTableBody").append("<tr><td>" + value.taxid + "</td><td>" + value.type + "</td><td>" + value.description + "</td><td>" + value.taxpercent + "%</td><td>" + value.state + "</td><td>" + value.country + "</td><td align='center'><span class='fa fa-edit' style='margin-left:2%;'></span><span class='fa fa-trash-o' style='margin-left:15%;'></span></td></tr>");
                });

                var shTable = jQuery('#ViewTaxDataTable').DataTable({
                    "fnDrawCallback": function(oSettings) {
                        jQuery('#ViewTaxDataTable ul').addClass('pagination-active-dark');
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

function addNewTaxItem() {

    $("#viewTaxField").text("").append("<br><div class='form-group' id='mainTaxDataForm' />");
//    viewTaxDataTable();

    $("#mainTaxDataForm").append("<lable class='col-sm-3 control-label'>Tax Id *</lable>");
    $("#mainTaxDataForm").append("<div class='col-sm-9' id='taxId'/>");
    $("#taxId").append("<input type='text' onkeyup=common_keypress('taxId') id='taxIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Tax Id'><span id='taxIdElementMsg' /><br />");
    $("#mainTaxDataForm").append("<lable class='col-sm-3 control-label'>Description *</lable>");
    $("#mainTaxDataForm").append("<div class='col-sm-9' id='descriptionId'/>");
    $("#descriptionId").append("<input type='text' onkeyup=common_keypress('descriptionId') id='descriptionIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Description'><span id='descriptionIdElementMsg' /><br />");
    $("#mainTaxDataForm").append("<lable class='col-sm-3 control-label'>Item tax group *</lable>");
    $("#mainTaxDataForm").append("<div class='col-sm-9' id='itemtaxgroupId'/>");
    $("#itemtaxgroupId").append("<input type='text' onkeyup=common_keypress('itemtaxgroupId') id='itemtaxgroupIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Item tax group'><span id='itemtaxgroupIdElementMsg' /><br />");
    $("#mainTaxDataForm").append("<lable class='col-sm-3 control-label'>Tax percent</lable>");
    $("#mainTaxDataForm").append("<div class='col-sm-9' id='taxpercentId'/>");
    $("#taxpercentId").append("<input type='text' onkeyup=common_keypress('taxpercentId') id='taxpercentIdElement' style='text-transform: capitalize;' class='form-control' placeholder='Tax percent'><span id='taxpercentIdElementMsg' /><br />");
    $("#mainTaxDataForm").append("<lable class='col-sm-3 control-label'>State *</lable>");
    $("#mainTaxDataForm").append("<div class='col-sm-9' id='stateTaxId' onchange=common_keypress('stateTaxId') />");
    $("#stateTaxId").append("<select id='stateTaxIdElement' class='form-control' /><span id='stateTaxIdElementMsg' /><br />");
    $("#stateTaxIdElement").append("<option value=''>Choose One</option>\n\
\n\<option>Andaman and Nicobar Islands</option><option>Andhra Pradesh</option><option>Arunachal Pradesh</option><option>Assam</option><option>Bihar</option><option>Chandigarh</option><option>Chhattisgarh</option><option>Dadra and Nagar Haveli</option><option>Daman and Diu</option><option>Delhi</option><option>Goa</option><option>Gujarat</option><option>Haryana</option><option>Himachal Pradesh</option><option>Jammu and Kashmir</option><option>Jharkhand</option><option>Karnataka</option><option>Kerala</option><option>Lakshadweep</option><option>Madhya Pradesh</option><option>Maharashtra</option><option>Manipur</option><option>Meghalaya</option><option>Mizoram</option><option>Nagaland</option><option>Orissa</option><option>Pondicherry</option><option>Punjab</option><option>Rajasthan</option><option>Sikkim</option><option>Tamil Nadu</option><option>Telangana</option><option>Tripura</option><option>Uttaranchal</option><option>Uttar Pradesh</option><option>West Bengal</option>");
    $("#mainTaxDataForm").append("<lable class='col-sm-3 control-label'>Country</lable>");
    $("#mainTaxDataForm").append("<div class='col-sm-9' id='countryTaxId'/>");
    $("#countryTaxId").append("<select id='countryTaxIdElement' class='form-control' /><br />");
    $("#countryTaxIdElement").append("<option>INDIA</option>");
    $("#mainTaxDataForm").append("&nbsp;<br>");
    $("#mainTaxDataForm").append("<lable class='col-sm-3 control-label'></lable>");
    $("#mainTaxDataForm").append("<div class='col-sm-9' id='submitTaxbutton'/>");
    $("#submitTaxbutton").append("<button id='submitTaxbuttonSubmitButton' class='btn btn-primary mr5' onclick='validate_Tax()'>Submit</button>");
    $("#submitTaxbutton").append("<span id='taxErrorElementMsg'></span>");
}
// validate tax
function validate_Tax() {
    viewTaxDataTable();
}