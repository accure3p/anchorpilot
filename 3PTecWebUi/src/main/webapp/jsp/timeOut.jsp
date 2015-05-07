<!DOCTYPE html>
<html lang="en">
    <head>
        <%@include file="common.jsp"%>
    </head>
    <body onload="closeSession()">
        <section>
            <div class="notfoundpanel">
                <h2>Your session has timed out.<br /></h2>
                <h3>Please wait while redirecting to login page...</h3><br>
                <img alt="" src="../images/loaders/loader10.gif">
                <!--<p>The page you are looking for might have been removed, had its name changed, or unavailable. Maybe you could try a search:</p>-->
            </div>
        </section>
    </body>
</html>