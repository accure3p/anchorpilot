<html lang="en">
    <head>
        <%@include file="common.jsp"%>
        <title>3PTec</title>
    </head>
    <body class="signin">
        <section>
            <div class="panel panel-signin">

                <div class="panel-body">
                    <div class="logo text-center">
                        <!--<img src="../images/accuresoftware.png" width="100%" alt="3PTec" >-->
                        <div><center><img src="../images/anchor_logo.gif"  alt="3PTec"  style=" width: 50%;"></center></div>
                    </div>
                    <br />
                    <h4 class="text-center mb5">Please Enter new credentials</h4>
                    <div class="mb30"></div>
                    email id: &nbsp;vkumar@accuresoftware.com<br>
                    login id: &nbsp;vkumar
                    <p></p>

                    <div class="form-group">
                        <input type="password" class="form-control" id="new_password" placeholder="New Password" onkeypress="recover_key(event)" required="required">
                    </div><!-- form-group -->
                    <div class="form-group">
                        <input type="password" class="form-control" id="confirm_password" placeholder="Confirm Password" onkeypress="recover_key(event)" required="required">
                    </div><!-- form-group -->
                    <div class="clearfix" id="recover_pwd_btn">
                        <div class="pull-right">
                            <button id="recover_btn" class="btn btn-success" onclick="recoverPassword('<%=request.getParameter("loginid")%>', '<%=request.getParameter("email1")%>')">Submit</button>
                        </div>
                    </div>   
                    <span id="recoverySuccess"></span>
                </div><!-- panel-body -->
                <div class="panel-footer" style="height:70px;">
                    <center>
                        <a href="http://www.accuresoftware.com" target="_blank"><img src="../images/accuresoftware.png" style=" height: 30px; min-width: 70px"></a><br>
                        <span style="color:green;">&copy; 2014 <a href="http://www.accuresoftware.com" target="_blank" style="color:green;">Accure Pvt Ltd.</a> All rights reserved.</span>
                    </center>
                </div>
            </div><!-- panel -->
        </section>
    </body>
</html>