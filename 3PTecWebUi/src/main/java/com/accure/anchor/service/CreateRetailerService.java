/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.accure.anchor.service;

import com.accure.anchor.controller.AnchorSessionManager;
import com.accure.dms.dto.User;
import com.accure.dms.manager.DmsRetailerManager;
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
public class CreateRetailerService extends HttpServlet {

    Logger logger = Logger.getLogger(CreateRetailerService.class);

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
            if (AnchorSessionManager.checkUserSession(session)) {
                logger.info(Common.getLogMsg("CreateRetailerService", DmsConstants.CREATE, "started"));
                //check user having the privilizes to Create user
                User currentUser = (User) session.getAttribute(DmsConstants.USER);
                boolean authorized = true; //new UserManager().checkUserPrivilege(currentUser, "RegisterUser");
                if (authorized) {
                    logger.info(Common.getLogMsg("CreateRetailerService", DmsConstants.CREATE, DmsConstants.AUTHORIZED));
                    String retailerJson = request.getParameter("retailerJson");
                    String addressJson = request.getParameter("addressJson");
                    //for create retailer
                    boolean status = new DmsRetailerManager().createRetailer(retailerJson, addressJson);
                    if (status) {
                        request.setAttribute("statuscode", DmsConstants.HTTP_STATUS_SUCCESS);
                        out.write(new Gson().toJson(DmsConstants.HTTP_STATUS_SUCCESS));
                        logger.info(Common.getLogMsg("CreateRetailerService", DmsConstants.CREATE, DmsConstants.SUCCESS));
                    } else {
                        request.setAttribute("statuscode", DmsConstants.HTTP_STATUS_FAIL);
                        out.write(new Gson().toJson(DmsConstants.HTTP_STATUS_FAIL));
                        logger.info(Common.getLogMsg("CreateRetailerService", DmsConstants.CREATE, DmsConstants.FAIL));
                    }
                } else {
                    request.setAttribute("statuscode", DmsConstants.HTTP_STATUS_UNAUTHORIZED);
                    out.write(new Gson().toJson(DmsConstants.HTTP_STATUS_UNAUTHORIZED));
                    logger.info(Common.getLogMsg("CreateRetailerService", DmsConstants.FAIL, DmsConstants.UNAUTHORIZED_ACCESS));
                }
            } else {
                request.setAttribute("statuscode", DmsConstants.HTTP_STATUS_INVALID_SESSION);
                out.write(new Gson().toJson(DmsConstants.HTTP_STATUS_INVALID_SESSION));
                logger.info(Common.getLogMsg("CreateRetailerService", DmsConstants.FAIL, DmsConstants.INVALID_SESSION));
            }
        } catch (Exception ex) {
            request.setAttribute("statuscode", DmsConstants.HTTP_STATUS_EXCEPTION);
            StringWriter stack = new StringWriter();
            ex.printStackTrace(new PrintWriter(stack));
            logger.error(Common.getLogMsg("CreateRetailerService", DmsConstants.ERROR, stack.toString()));
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
