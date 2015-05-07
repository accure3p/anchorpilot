/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.accure.anchor.service;

//import com.accure.anchor.test.Common;
//import com.accure.anchor.managers.UserManagers;
import com.accure.dms.dto.User;
import com.accure.dms.manager.DmsUserAuthentication;
import com.accure.dms.manager.DmsUserManager;
import com.accure.dms.utils.Common;
import com.accure.dms.utils.DmsConstants;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.Type;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;

/**
 *
 * @author rajeev
 */
public class LoginService extends HttpServlet {

    Logger logger = Logger.getLogger(LoginService.class);

    /**
     * Processes requests for both HTTP
     * <code>GET</code> and
     * <code>POST</code> methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        HttpSession session = request.getSession(true);
        try {

            String userJSON = request.getParameter("userJSON");

            logger.info(Common.getLogMsg("LoginService", DmsConstants.AUTHENTICATION, "started"));
            Map<String, String[]> arMap = request.getParameterMap();
            Map<String, String> mStringMap = Common.getSingleMapValue(arMap);

            String data = "UserName-" + mStringMap.get("user_txt") + ":" + "Password-" + mStringMap.get("pwd_txt");
            // Application level logging
//            logger.info(Common.getLogMsg("", "", new Gson().toJson(data), DmsConstants.AUTHENTICATION, request.getRemoteAddr()));
//authonticate USER here
            User user = new DmsUserAuthentication().authenticate(mStringMap.get("user_txt"), mStringMap.get("pwd_txt"));
            if (user != null) {
                session.setAttribute("user", user);
                Type type = new TypeToken<User>() {
                }.getType();
                String result = new Gson().toJson(user, type);
                request.setAttribute("statuscode", DmsConstants.HTTP_STATUS_SUCCESS);
                out.write(result);
                logger.info(Common.getLogMsg("LoginService", DmsConstants.AUTHENTICATION, DmsConstants.SUCCESS));
            } else {
                request.setAttribute("statuscode", DmsConstants.HTTP_STATUS_FAIL);
                out.write(new Gson().toJson(DmsConstants.HTTP_STATUS_FAIL));
                logger.info(Common.getLogMsg("LoginService", DmsConstants.AUTHENTICATION, DmsConstants.FAIL));
            }
        } catch (Exception ex) {
            request.setAttribute("statuscode", DmsConstants.HTTP_STATUS_EXCEPTION);
            StringWriter stack = new StringWriter();
            ex.printStackTrace(new PrintWriter(stack));
            logger.error(Common.getLogMsg("LoginService", DmsConstants.ERROR, stack.toString()));
        } finally {
            out.close();
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP
     * <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP
     * <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
