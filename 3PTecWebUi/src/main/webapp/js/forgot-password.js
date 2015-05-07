//--------------------------------------------expressions start--------------------------------------
//expression for user name
function usernameExpression() {
    //var usernamePattern = /^[a-zA-Z0-9]{4,10}$/;
    var usernamePattern = /^[a-z]{4,10}$/;
    return usernamePattern;
}

//expression for password validation
function passwordExpression() {
    //var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,16}$/;
    var passwordPattern = /^(?=.*[a-z]).{6,16}$/;
    return passwordPattern;
}

//forgot password validation in login page
function ValidateEmail() {
    var emailPattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
//    var emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPattern;
}

//expression for space validation
function spaceExpression() {
    var spacePattern = /\s/g;
    return spacePattern;
}

//expression for city
function cityExpression() {
    var cityPattern = /^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/;
    return cityPattern;
}

//expression for zip code validation
function zipExpression() {
    var zipcodePattern = /(^\d{6}$)|(^\d{6}-\d{5}$)/;
    return zipcodePattern;
}

//it return word with Firstletter capital
function capitalize(s)
{
    //return s[0].toUpperCase() + s.slice(1);
    return s;
}

//to convert milis to date and time
function dateTimeConversion(date) {
    var date1 = date / 1000;
    var d = new Date(0);
    d.setUTCSeconds(date1);
    return d;
}

//to convert milis to date
function dateConversion(date) {
    var date1 = date / 1000;
    var d = new Date(0);
    d.setUTCSeconds(date1);
    var tempDate = new Date(d);
//    var temp = (tempDate.getMonth() + 1) + "/" + tempDate.getDate() + "/" + tempDate.getFullYear();
    var temp = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
    d = temp;
    return d;
}

//replace space with special char
function replaceString(inputData) {
    var outputData = inputData.replace(/\s/g, '^');
    return outputData;
}

function replaceSpecialChar(inputData) {
    var outputData = inputData.replace(new RegExp("\\^", "g"), ' ');
    return outputData;
}

function getAge(birthday) {
    birthday = indianDateFormate(birthday);
    var re = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d+$/;
    if (birthday != '') {
        if (re.test(birthday)) {
            birthdayDate = new Date(birthday);
            dateNow = new Date();

            var years = dateNow.getFullYear() - birthdayDate.getFullYear();
            var months = dateNow.getMonth() - birthdayDate.getMonth();
            var days = dateNow.getDate() - birthdayDate.getDate();
            if (isNaN(years)) {
                return false;
            } else {
                if (months < 0 || (months == 0 && days < 0)) {
                    years = parseInt(years) - 1;
                }
            }
        }
    }
    return years;
}

function getYears(startDate, endDate) {
    var re = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d+$/;
    if (startDate != '' && endDate != '') {
        if (re.test(startDate) && re.test(endDate)) {
            startDate1 = new Date(startDate);
            endDate1 = new Date(endDate);

            var years = endDate1.getFullYear() - startDate1.getFullYear();
            var months = endDate1.getMonth() - startDate1.getMonth();
            var days = endDate1.getDate() - startDate1.getDate();
            if (isNaN(years)) {
                return false;
            } else {
                if (months < 0 || (months == 0 && days < 0)) {
                    years = parseInt(years) - 1;
                }
            }
        }
    }
    return years;
}

//for date validation
function validateDate(dateStr) {
// var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{4})$/;
    var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{2}|\d{4})$/;
    var matchArray = dateStr.match(datePat); // is the format ok?
    if (matchArray == null) {
        return false;
    }
//    alert(matchArray);
//    month = matchArray[1];
//    day = matchArray[3];

    day = matchArray[1];
    month = matchArray[3];


    year = matchArray[4];
    if (month < 1 || month > 12) {
        return false;
    }
    if (day < 1 || day > 31) {
        return false;
    }
    if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
        return false
    }
    if (month == 2) { // check for february 29th
        var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
        if (day > 29 || (day == 29 && !isleap)) {
            return false;
        }
    }
    if (year.length != 4) {
        return false;
    }
    var current_year = new Date().getFullYear();
//    if ((year < 1920) || (year > current_year))
    if ((year < 1920))
    {
        return false;
    }

    return true;  // date is valid
}
//--------------------------------------------expressions end--------------------------------------

//forgot password in login page 
function forgot()
{
    var userEmail = $("#email").val();
    if (userEmail == "") {
        $("#email").val("");
        $("#email").focus();
        displaySmallErrorMessages("fgt", "Email Id required.");
    } else if (userEmail.match(spaceExpression())) {
        $("#email").val("");
        $("#email").focus();
        displaySmallErrorMessages("fgt", "Spaces not allowed.");
    } else if (!userEmail.match((ValidateEmail()))) {
        $("#email").focus();
        displaySmallErrorMessages("fgt", "Invalid email address.");
    } else {
        $.get(server_base_url + "/3PTec-server/ForgotPassword", {
            email: userEmail
        }).done(function(data) {
            if (data == success) {
                $("#fgt").text("").append("<span id='msg1' style='color:#428bca;font-size:13px;'>Please check your email for password reset link. </span>");
                $('#forgot_btn').hide();
                setTimeout(function() {
                    sessionStorage.clear();
                    location.href = "index.jsp";
                }, 5000);
            } else if (data == fail) {
                displaySmallErrorMessages("fgt", "Unregistered EmailId.");
            } else if (data == unauthorized) {
                displaySmallErrorMessages("fgt", unauthorizedMessage);
            } else if (data == invalidSession) {
                callSessionTimeout();
            } else if (data == statusException) {
                displaySmallErrorMessages("fgt", statusExceptionMessage);
            }
        });
    }
}
//forgot key press in forgot page
function forgot_key(event) {
    if ($("#email").val() != "") {
        if ($("#email").val().match(spaceExpression())) {
            $("#email").val("");
            $("#email").focus();
            displaySmallErrorMessages("fgt", "Spaces not allowed.");
        }
        if ($("#email").val().length == 4 && !$("#email").val().match((ValidateEmail()))) {
            $("#email").focus();
            displaySmallErrorMessages("fgt", "Invalid email address.");
        } else if ($("#email").val().match((ValidateEmail()))) {
            $("#fgt").text("");
        }
    }
    if (event.which == 13) {
        $('#forgot_btn').click();
        return false;
    }
}
// convert in indian date formate dd/mm/yyyy
function indianDateFormate(inputdate) {
    var idate = inputdate.split("/");
    var ndate = idate[1] + "/" + idate[0] + "/" + idate[2];
    return ndate;
}

//to validate input date is less than current date or not.
//returns true if input date <= current daate and false if input date > current date
function checkFutureDate(inputdate) {
    inputdate = indianDateFormate(inputdate);
    var iDate = new Date(inputdate);
    var inputYear = iDate.getFullYear();
    var inputMonth = iDate.getMonth() + 1;
    var inputDate = iDate.getDate();
    var currentDate = new Date();

    if (currentDate.getFullYear() < inputYear) {
        return false;
    } else if (currentDate.getFullYear() > inputYear) {
        return true;
    } else if (currentDate.getFullYear() == inputYear) {
        if ((currentDate.getMonth() + 1) < inputMonth) {
            return false;
        } else if ((currentDate.getMonth() + 1) > inputMonth) {
            return true;
        } else if ((currentDate.getMonth() + 1) == inputMonth) {
            if (currentDate.getDate() < inputDate) {
                return false;
            } else if (currentDate.getDate() > inputDate) {
                return true;
            } else if (currentDate.getDate() == inputDate) {
                return true;
            }
        }
    }
}

function checkPastDate(inputdate) {
    inputdate = indianDateFormate(inputdate);
    var iDate = new Date(inputdate);
    var inputYear = iDate.getFullYear();
    var inputMonth = iDate.getMonth() + 1;
    var inputDate = iDate.getDate();
    var currentDate = new Date();

    if (currentDate.getFullYear() > inputYear) {
        return false;
    } else if (currentDate.getFullYear() < inputYear) {
        return true;
    } else if (currentDate.getFullYear() == inputYear) {
        if ((currentDate.getMonth() + 1) > inputMonth) {
            return false;
        } else if ((currentDate.getMonth() + 1) < inputMonth) {
            return true;
        } else if ((currentDate.getMonth() + 1) == inputMonth) {
            if (currentDate.getDate() > inputDate) {
                return false;
            } else if (currentDate.getDate() < inputDate) {
                return true;
            } else if (currentDate.getDate() == inputDate) {
                return true;
            }
        }
    }
}

//to compare two dates
//returns false if inputdate2 is less than inputdate1 vise versa.
function compareDates(inputdate1, inputdate2) {
    inputdate1 = indianDateFormate(inputdate1);
    inputdate2 = indianDateFormate(inputdate2);
    var iDate1 = new Date(inputdate1);
    var iDate2 = new Date(inputdate2);

    if (iDate2.getFullYear() < iDate1.getFullYear()) {
        return false;
    } else if (iDate2.getFullYear() > iDate1.getFullYear()) {
        return true;
    } else if (iDate2.getFullYear() == iDate1.getFullYear()) {
        if ((iDate2.getMonth() + 1) < (iDate1.getMonth() + 1)) {
            return false;
        } else if ((iDate2.getMonth() + 1) > (iDate1.getMonth() + 1)) {
            return true;
        } else if ((iDate2.getMonth() + 1) == (iDate1.getMonth() + 1)) {
            if (iDate2.getDate() < iDate1.getDate()) {
                return false;
            } else if (iDate2.getDate() > iDate1.getDate()) {
                return true;
            } else if (iDate2.getDate() == iDate1.getDate()) {
                return true;
            }
        }
    }
}

function allowNumbers() {
    var exp = /^[0-9?=.*!@#$%^&*]+$/;
    return exp;
}
