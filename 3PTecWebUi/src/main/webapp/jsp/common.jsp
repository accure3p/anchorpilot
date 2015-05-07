<!--head start-->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<title>3PTec</title>
<!--head end-->

<!--disable right click start-->
<!--<script type="text/javascript" src="../js/jquery-1.9.1.js"></script>
<script>
    $(document).bind('contextmenu', function(e) {
        e.preventDefault();
        alert('Right Click is not allowed');
    });
</script>-->
<!--disable right click end-->

<!--disable F5-->
<!--<script>
    document.onkeydown = function() {
        if (event.keyCode == 116) {
            event.returnValue = false;
            event.keyCode = 0;
            return false;
        }
    }
</script>-->
<!--disable F5--> 
<!---- css start--->
<link href="../css/style.default.css" rel="stylesheet">
<link href="../css/jquery.gritter.css" rel="stylesheet">
<link href="../css/jquery.tagsinput.css" rel="stylesheet" />
<link href="../css/toggles.css" rel="stylesheet" />
<link href="../css/bootstrap-timepicker.min.css" rel="stylesheet" />
<link href="../css/select2.css" rel="stylesheet" />
<link href="../css/style.datatables.css" rel="stylesheet">
<link href="../css/dataTables.responsive.css" rel="stylesheet">
<link href="../css/colorpicker.css" rel="stylesheet" />
<link href="../css/dropzone.css" rel="stylesheet" />
<link href="../css/jquery-ui-slider-pips.css" rel="stylesheet" />

<!--for file uploading-->
<link href="../css/prettyPhoto.css" rel="stylesheet">

<!--patient search related css files-->
<link href="../css/style.css" rel="stylesheet" type="text/css" media="all" >
<!--patient search related css files end-->

<link href="../css/invoice.css" rel="stylesheet" >
<link href="../css/jquery.orgchart.css" rel="stylesheet">
<!--<link href="../css/appointment.css" rel="stylesheet" />-->

<!-- Css ends -->

<!--to connect js to servlet-->
<!--for search bar and connect to servlet common file ../js/jquery-latest.js-->
<script type="text/javascript" src="../js/flot/jquery.flot.min.js"></script>
<script type="text/javascript" src="../js/flot/jquery.flot.resize.min.js"></script>
<script type="text/javascript" src="../js/flot/plugins/curvedLines.js"></script>

<script type="text/javascript" src="../js/uiTemplate/jquery-latest.js"></script>

<!--to hide particular ids-->
<script type="text/javascript" src="../js/uiTemplate/jquery.min.js"></script>
<script type="text/javascript" src="../js/uiTemplate/jquery-1.10.2.js"></script>
<!-- template js files start -->
<script type="text/javascript" src="../js/uiTemplate/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="../js/uiTemplate/jquery-migrate-1.2.1.min.js"></script>
<script type="text/javascript" src="../js/uiTemplate/jquery-ui-1.10.3.min.js"></script>
<script type="text/javascript" src="../js/uiTemplate/bootstrap.min.js"></script>
<script type="text/javascript" src="../js/uiTemplate/modernizr.min.js"></script>
<script type="text/javascript" src="../js/uiTemplate/pace.min.js"></script>
<script type="text/javascript" src="../js/uiTemplate/retina.min.js"></script>
<script type="text/javascript" src="../js/uiTemplate/jquery.cookies.js"></script><!--upto common for all-->
<script type="text/javascript" src="../js/uiTemplate/jquery.gritter.min.js"></script>

<script type="text/javascript" src="../js/uiTemplate/jquery.autogrow-textarea.js"></script>
<script type="text/javascript" src="../js/uiTemplate/jquery.mousewheel.js"></script>
<script type="text/javascript" src="../js/uiTemplate/toggles.min.js"></script>
<script type="text/javascript" src="../js/uiTemplate/bootstrap-timepicker.min.js"></script>
<script type="text/javascript" src="../js/uiTemplate/jquery.maskedinput.min.js"></script>

<script type="text/javascript" src="../js/uiTemplate/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="../js/uiTemplate/dataTables.bootstrap.js"></script>
<script type="text/javascript" src="../js/uiTemplate/dataTables.responsive.js"></script>
<script type="text/javascript" src="../js/uiTemplate/jquery.sparkline.min.js"></script>
<script type="text/javascript" src="../js/uiTemplate/morris.min.js"></script>
<script type="text/javascript" src="../js/uiTemplate/raphael-2.1.0.min.js"></script>
<script type="text/javascript" src="../js/uiTemplate/bootstrap-wizard.min.js"></script>
<script type="text/javascript" src="../js/uiTemplate/jquery.validate.min.js"></script>
<script type="text/javascript" src="../js/uiTemplate/select2.min.js"></script>

<script type="text/javascript" src="../js/uiTemplate/colorpicker.js"></script>
<script type="text/javascript" src="../js/uiTemplate/dropzone.min.js"></script>
<script type="text/javascript" src="../js/uiTemplate/jquery.ui.touch-punch.min.js"></script>
<script type="text/javascript" src="../js/uiTemplate/jquery-ui-slider-pips.js"></script>
<script type="text/javascript" src="../js/uiTemplate/jquery-ui-slider-pips.min.js"></script>
<script type="text/javascript" src="../js/uiTemplate/tables.js"></script>
<script type="text/javascript" src="../js/uiTemplate/jquery.prettyPhoto.js"></script>
<script type="text/javascript" src="../js/uiTemplate/dashboard.js"></script>
<script type="text/javascript" src="../js/uiTemplate/general-forms.js"></script>
<script type="text/javascript" src="../js/uiTemplate/form-validation.js"></script>
<script type="text/javascript" src="../js/uiTemplate/custom.js"></script>

<!--<script type="text/javascript" src="../js/patientdata-autocomplete.js"></script>
<script type="text/javascript" src="../js/patient-exam-demographics.js"></script>-->

<!--local js files start-->
<script>
    var server_base_url = "/3ptec-webui/";
</script>
<script type="text/javascript" src="../js/authentication.js"></script>
<script type="text/javascript" src="../js/dashboard-defaults.js"></script>
<script type="text/javascript" src="../js/prepare-dashboard.js"></script>
<script type="text/javascript" src="../js/organization-selection.js"></script>

<script type="text/javascript" src="../js/user-display-forms.js"></script>
<script type="text/javascript" src="../js/user-management.js"></script>
<script type="text/javascript" src="../js/user-profile.js"></script>
<script type="text/javascript" src="../js/forgot-password.js"></script>
<script type="text/javascript" src="../js/recovery-password.js"></script>



<!--3ptec Js File-->
<!--for org hierarchy-->
<script type="text/javascript" src="../js/jquery.orgchart.js"></script>

<script type="text/javascript" src="../js/management-dashboard.js"></script>
<script type="text/javascript" src="../js/OrgManagement.js"></script>
<!--for stock management-->
<script type="text/javascript" src="../js/Stock-management.js"></script>
<!--for order management-->
<script type="text/javascript" src="../js/OrderManagement.js"></script>
<!--for zone management-->
<script type="text/javascript" src="../js/Zone-management.js"></script>
<!--for entity management-->
<script type="text/javascript" src="../js/Entity-management.js"></script>
<!--for route management-->
<script type="text/javascript" src="../js/Route-management.js"></script>
<!--for master data management-->
<script type="text/javascript" src="../js/MasterData-management.js"></script>
<!--for Retailer management-->
<script type="text/javascript" src="../js/Retailer-management.js"></script>
<!--for Invoice management-->
<script type="text/javascript" src="../js/Invoice-management.js"></script>

<script>
    var success = "200";
    var fail = "501";
    var unauthorized = "401";
    var invalidSession = "403";
    var statusException = "500";
    var successMessage = "Successfully saved.";
    var failMessage = "Operation failed.";
    var unauthorizedMessage = "You have insufficient privilege to access this feature.";
    var invalidSessionMessage = "Your session has timed out.<br /> please wait while redirecting to login page...";
    var statusExceptionMessage = "Internal error occured please contact admin.";

    var datePickerRange = "1950:2035";
    var dateformate = "dd/mm/yy";

    //var catForm = "56296D2D-C919-40F1-AFC7-6F544FCA7772";
    var analyticsFlag = "true";
    $.ajaxSetup({cache: false});
</script>