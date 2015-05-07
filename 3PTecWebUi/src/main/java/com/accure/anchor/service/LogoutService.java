/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.accure.anchor.service;

import com.accure.dms.dto.User;
import com.accure.dms.utils.Common;
import com.accure.dms.utils.DmsConstants;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;

/**
 *
 * @author Abhishek
 */
public class LogoutService extends HttpServlet {

    Logger logger = Logger.getLogger(LogoutService.class);

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
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            HttpSession session = request.getSession(false);
            logger.info(Common.getLogMsg("LogoutService", DmsConstants.LOGOUT, "started"));

            User user = (User) session.getAttribute(DmsConstants.USER); // convert session object into User dto
            // Application level logging
//            logger.info(Common.getLogMsg((String) user.getOrgRole().get(0).getOrg().getId(), ((Map<String, String>) user.getId()).get("$oid"), "User logged out", DmsConstants.LOGOUT, request.getRemoteAddr()));

            session.invalidate();
            session = null;
            request.setAttribute("statuscode", DmsConstants.HTTP_STATUS_SUCCESS);
            out.write(DmsConstants.HTTP_STATUS_SUCCESS);
            logger.info(Common.getLogMsg("LogoutService", DmsConstants.LOGOUT, DmsConstants.SUCCESS));
        } catch (Exception ex) {
            request.setAttribute("statuscode", DmsConstants.HTTP_STATUS_EXCEPTION);
            StringWriter stack = new StringWriter();
            ex.printStackTrace(new PrintWriter(stack));
            logger.error(Common.getLogMsg("LogoutService", DmsConstants.ERROR, stack.toString()));
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
