package com.accure.anchor.controller;

import javax.servlet.http.HttpSession;

/**
 *
 * @author Manindar
 */
public class AnchorSessionManager {

    /**
     * 
     * @param loginSession
     * @return 
     */
    public static boolean checkUserSession(HttpSession loginSession) {
        if ((loginSession == null) || (loginSession.toString().isEmpty())) {
            return false;
        } else if (loginSession.isNew()) {
            return false;
        } else {
            return true;
        }
    }
}
