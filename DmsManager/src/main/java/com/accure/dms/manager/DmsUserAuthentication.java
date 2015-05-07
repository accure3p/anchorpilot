package com.accure.dms.manager;

import com.accure.dms.dto.User;
import com.accure.dms.utils.DmsConstants;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;

/**
 *
 * @author Vinod
 */
public class DmsUserAuthentication {
    private static Logger logger = Logger.getLogger(DmsUserAuthentication.class);

    /**
     * 
     * @param strUserId
     * @param strPassword
     * @return 
     */
    public User authenticate(String strUserId, String strPassword) {
        HashMap<String, String> conditionMap = new HashMap<String, String>();
        String strPasswdTemp = new DmsPasswordManager().getSecurePassword(strPassword, strUserId);

        conditionMap.put("loginid", strUserId);
        conditionMap.put("password", strPasswdTemp);
        String result = new DmsDbManager().getDetailsByCondition(DmsConstants.USER_TABLE, conditionMap);

        Type type = new TypeToken<List<User>>() {
        }.getType();
        List<User> users = new Gson().fromJson(result, type);
        if (users != null && users.size() > 0) {
            User user = users.get(0);
            return user;
        } else {
            return null;
        }
    }

    /**
     * 
     * @param oldPass
     * @param newPass
     * @param user
     * @return
     * @throws Exception 
     */
    public boolean changePassword(String oldPass, String newPass, User user) throws Exception {
        HashMap<String, String> conditionMap = new HashMap<String, String>();//9d7dae5e292b19f041cdd81b1c6adc02
        conditionMap.put(DmsConstants.USER_PASSWORD, new DmsPasswordManager().getSecurePassword(oldPass, user.getloginid()));
        conditionMap.put(DmsConstants.USER_LOGIN_ID, user.getloginid());
        String usersJson = new DmsDbManager().getDetailsByCondition(DmsConstants.USER_TABLE, conditionMap);
        List<User> users = new Gson().fromJson(usersJson, new TypeToken<List<User>>() {
        }.getType());
        if (users != null && !users.isEmpty()) {
            user = users.get(0);
            user.setPassword(new DmsPasswordManager().getSecurePassword(newPass, user.getloginid()));
            Map<String, String> idMap = (Map<String, String>) user.getId();
            String userJson = new Gson().toJson(user, new TypeToken<User>() {
            }.getType());
            boolean status = new DmsDbManager().update(DmsConstants.USER_TABLE, idMap.get("$oid"), userJson);
            user.setPassword("");
            return status;
        } else {
            return false;
        }
    }
}
