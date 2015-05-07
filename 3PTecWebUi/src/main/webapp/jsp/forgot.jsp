<html lang="en">
    <%@include file="common.jsp"%>
    <body class="signin">
        <section>
            <div class="panel panel-signin">

                <div class="panel-body">
                    <div class="logo text-center">
                        <!--<img src="../images/accuresoftware.png" width="100%" style=" width: 100%"alt="3PTec" >-->
                    <div><center><img src="../images/anchor_logo.gif"  alt="3PTec"  style=" width: 50%;"></center></div>
                    </div>
                    <br />
                    <h4 class="text-center mb5">Forgot your password?</h4>
                    <p class="text-center">Please enter your email</p>

                    <div class="mb30"></div>

                    <div class="form-group">
                        <input type="email" class="form-control" id="email" placeholder="Enter EmailId" onkeyup="forgot_key(event)" autocomplete="off">
                    </div><span id="fgt"></span>

                    <div class="clearfix">
                        <div class="pull-right">
                            <button id="forgot_btn" class="btn btn-success" onclick="forgot()">Submit</button>
                        </div>
                    </div>                      
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
