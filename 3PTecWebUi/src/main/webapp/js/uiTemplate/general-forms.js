jQuery(document).ready(function() {

    jQuery("#phone1").mask("(999)999-9999");
    jQuery("#phone2").mask("(999)999-9999");
    jQuery("#ssn1").mask("999-99-9999");
    jQuery("#dob1").mask("99/99/9999");
    jQuery("#validity").mask("99/99/9999");
    jQuery("#dobu").mask("99/99/9999");
    jQuery("#ssnu").mask("999-99-9999");


    // Tags Input
    jQuery('#tags').tagsInput({width: 'auto'});

    // Textarea Autogrow
    jQuery('#autoResizeTA').autogrow();

    // Spinner
    var spinner = jQuery('#spinner').spinner();
    spinner.spinner('value', 0);

    // Form Toggles
    jQuery('.toggle').toggles({on: true});

    // Time Picker
    jQuery('#timepicker').timepicker({defaultTIme: false});
    jQuery('#timepicker2').timepicker({showMeridian: false});
    jQuery('#timepicker3').timepicker({minuteStep: 15});

    // Date Picker
    jQuery('#datepicker').datepicker();
    jQuery('#datepicker-inline').datepicker();
    jQuery('#datepicker-multiple').datepicker({
        numberOfMonths: 3,
        showButtonPanel: true
    });

//    // Input Masks
//    jQuery("#date").mask("99/99/9999");
//    jQuery("#phone").mask("(999) 999-9999");
//    jQuery("#ssn").mask("999-99-9999");

    // Select2
    jQuery("#select-basic, #select-multi").select2();
    jQuery('#select-search-hide').select2({
        minimumResultsForSearch: -1
    });

    function format(item) {
        return '<i class="fa ' + ((item.element[0].getAttribute('rel') === undefined) ? "" : item.element[0].getAttribute('rel')) + ' mr10"></i>' + item.text;
    }

    // This will empty first option in select to enable placeholder
    jQuery('select option:first-child').text('');

    jQuery("#select-templating").select2({
        formatResult: format,
        formatSelection: format,
        escapeMarkup: function(m) {
            return m;
        }
    });

    // Color Picker
    if (jQuery('#colorpicker').length > 0) {
        jQuery('#colorSelector').ColorPicker({
            onShow: function(colpkr) {
                jQuery(colpkr).fadeIn(500);
                return false;
            },
            onHide: function(colpkr) {
                jQuery(colpkr).fadeOut(500);
                return false;
            },
            onChange: function(hsb, hex, rgb) {
                jQuery('#colorSelector span').css('backgroundColor', '#' + hex);
                jQuery('#colorpicker').val('#' + hex);
            }
        });
    }

    // Color Picker Flat Mode
    jQuery('#colorpickerholder').ColorPicker({
        flat: true,
        onChange: function(hsb, hex, rgb) {
            jQuery('#colorpicker3').val('#' + hex);
        }
    });


});