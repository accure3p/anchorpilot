<html>
    <%@include file="common.jsp"%>
    <body class="signin" onload="loadLoginPage()">
        <section>
            <div class="panel panel-signin"><!--main div-->

                <div class="panel-body"><!--panel body-->
                    <div><center><img src="../images/anchor_logo.gif"  alt="3PTec"  style=" width: 50%;"></center></div>
                    <br />

                    <h4 class="text-center mb5">Please use your 3PTec credentials</h4>
                    <p class="text-center">Login to your account</p>
                    <div class="mb30"></div>

                    <div id="usernameDiv" class="input-group mb15">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                        <input type="text" class="form-control" id="username_id" placeholder="Username" onkeyup="login_key(event)">
                    </div><!-- input-group -->

                    <div id="passwordDiv" class="input-group mb15">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                        <input type="password" class="form-control" id="password_id" placeholder="Password" onkeyup="login_key(event)">
                    </div><!-- input-group -->

                    <div class="clearfix">
                        <div class="pull-left">
                            <div class="mt10">
                                <!--<a href="../jsp/forgot.jsp"><label class="fg-ps">Forgot your password?</label></a>-->
                            </div>
                        </div>
                        <div class="pull-right">
                            <button  id="login_btn" class="btn btn-success" onclick="login()">Login<i class="fa fa-angle-right ml5"></i></button>
                            <!--<a href="dashboard.jsp"><button  id="login_btn" class="btn btn-success" >Login<i class="fa fa-angle-right ml5"></i></button></a>-->
                        </div>
                    </div><span id="uperror"></span>
                </div><!-- panel-body -->

                <div class="panel-footer" style="height:70px;">
                    <center>
                        <a href="http://www.accuresoftware.com" target="_blank"><img src="../images/accuresoftware.png" style=" height: 30px; min-width: 70px"></a><br>
                        <span style="color:green;">&copy; 2014 <a href="http://www.accuresoftware.com" target="_blank" style="color:green;">Accure Pvt Ltd.</a> All rights reserved.</span>
                    </center>
                </div>
            </div><!--main div ends-->
        </section>
    </body>
</html>