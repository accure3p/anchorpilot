jQuery(document).ready(function() {

    // Basic Form for registration
    jQuery("#basicForm").validate({
        highlight: function(element) {
            jQuery(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        success: function(element) {
            jQuery(element).closest('.form-group').removeClass('has-error');
        }
    });


    // Basic Form for user registration
    jQuery("#userRegForm").validate({
        highlight: function(element) {
            jQuery(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        success: function(element) {
            jQuery(element).closest('.form-group').removeClass('has-error');
        }
    });


    // Error Message In One Container
    jQuery("#basicForm2").validate({
        errorLabelContainer: jQuery("#basicForm2 div.errorForm")
    });

    // With Checkboxes and Radio Buttons

    jQuery('#genderError').attr('for', 'gender');
    jQuery('#intError').attr('for', 'int[]');

    jQuery("#basicForm3").validate({
        highlight: function(element) {
            jQuery(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        success: function(element) {
            jQuery(element).closest('.form-group').removeClass('has-error');
        }
    });

    jQuery("#basicForm4").validate({
        highlight: function(element) {
            jQuery(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        success: function(element) {
            jQuery(element).closest('.form-group').removeClass('has-error');
        },
        ignore: null
    });

    // Validation with select boxes
    jQuery("#flowers, #fruits").select2({
        minimumResultsForSearch: -1
    });

});