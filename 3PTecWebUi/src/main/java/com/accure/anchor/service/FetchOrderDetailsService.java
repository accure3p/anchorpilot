/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.accure.anchor.service;

import com.accure.anchor.controller.AnchorSessionManager;
import com.accure.dms.dto.User;
import com.accure.dms.manager.DmsOrderManager;
import com.accure.dms.utils.Common;
import com.accure.dms.utils.DmsConstants;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
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
public class FetchOrderDetailsService extends HttpServlet {

    Logger logger = Logger.getLogger(FetchOrderDetailsService.class);

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
        try {
            HttpSession session = request.getSession(false);
            //check the session
            if (AnchorSessionManager.checkUserSession(session)) {
                logger.info(Common.getLogMsg("FetchOrderDetailsService", DmsConstants.VIEW, "started"));
                //check user having the privilizes to View user
                User currentUser = (User) session.getAttribute(DmsConstants.USER);
                boolean authorized = true; //new UserManager().checkUserPrivilege(currentUser, "ViewUsers");
                if (authorized) {

                    logger.info(Common.getLogMsg("FetchOrderDetailsService", DmsConstants.VIEW, DmsConstants.AUTHORIZED));
                    String orderid = request.getParameter("orderid");
                    String data = "orderid-" + orderid;
                    // Application level logging
//                    logger.info(Common.getLogMsg((String) currentUser.getId(), ((Map<String, String>) (currentUser.getId())).get("$oid"), new Gson().toJson(data), DmsConstants.VIEW, request.getRemoteAddr()));
                    String resultJson = new DmsOrderManager().viewPendingOrOpenOrderDetails(orderid);
                    request.setAttribute("statuscode", DmsConstants.HTTP_STATUS_SUCCESS);
                    out.write(resultJson);
                    logger.info(Common.getLogMsg("FetchOrderDetailsService", DmsConstants.VIEW, DmsConstants.SUCCESS));
                } else {
                    request.setAttribute("statuscode", DmsConstants.HTTP_STATUS_UNAUTHORIZED);
                    out.write(new Gson().toJson(DmsConstants.HTTP_STATUS_UNAUTHORIZED));
                    logger.info(Common.getLogMsg("FetchOrderDetailsService", DmsConstants.FAIL, DmsConstants.UNAUTHORIZED_ACCESS));
                }
            } else {
                request.setAttribute("statuscode", DmsConstants.HTTP_STATUS_INVALID_SESSION);
                out.write(new Gson().toJson(DmsConstants.HTTP_STATUS_INVALID_SESSION));
                logger.info(Common.getLogMsg("FetchOrderDetailsService", DmsConstants.FAIL, DmsConstants.INVALID_SESSION));
            }
        } catch (Exception ex) {
            request.setAttribute("statuscode", DmsConstants.HTTP_STATUS_EXCEPTION);
            StringWriter stack = new StringWriter();
            ex.printStackTrace(new PrintWriter(stack));
            logger.error(Common.getLogMsg("FetchOrderDetailsService", DmsConstants.ERROR, stack.toString()));
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
