<html lang="en">
    <head>
        <%@include file="common.jsp"%>
        <!--patient search related file mandatory-->
        <script type="text/javascript" src="../js/uiTemplate/typeahead.min.js"></script>
        <!--patient search related file end-->
    </head>

    <body class="pace-done" onload="dashboardDefaults();">

        <header>
            <div class="headerwrapper" id="headerMainDiv">
                <div class="header-left" id="headerLeftDiv">
                    <a href="dashboard.jsp" class="logo" class="threeptec_logo"style=" width: 150px; height: 50px; margin-top: -15%;" ></a>
                    <img class="threeptec_logo" src="../images/anchor_logo.gif" alt="3PTec" style=" width: 140%;padding-bottom: 15px; padding-right: 140px" />
                    <div class="pull-right">
                        <a href="" class="menu-collapse"><i class="fa fa-bars"></i></a>
                    </div>
                </div> <!--header-left -->
            </div><!-- headerwrapper -->
        </header>

        <section>
            <div class="mainwrapper" id="mainDashboardDiv">
                <!--search header start-->
                <div id='mainPanelDiv' class='mainpanel'>
                    <div class="pageheader">
                        <div class="media">                            
                            <div class="media-body">
                                <!--<div class="has-success btn-bordered">-->
                                <!--<div class="col-sm-8 col-md-offset-2">-->
<!--                                <div class="bs-example">
                                    <input type="search" id="searchId" class="typeahead form-control" placeholder="Search patient" autocomplete="off" spellcheck="false">
                                </div>                                    -->
                                <!--</div>-->                                
                                <!--</div>-->
                                <br><br>
                            </div>
                        </div><!-- media -->
                    </div>
                </div>
                <!--search header end-->
            </div><!-- mainwrapper -->
        </section>
    </body>
</html>