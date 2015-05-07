package com.accure.dms.manager;

import com.accure.dms.dto.User;
import com.accure.dms.dto.UserAddress;
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
public class DmsUserManager {
    private static Logger logger = Logger.getLogger(DmsUserManager.class);

    /**
     * 
     * @param user
     * @return 
     */
    public String save(User user) {
        Type type = new TypeToken<User>() {
        }.getType();
        String userString = new Gson().toJson(user, type);

        String id = new DmsDbManager().save(DmsConstants.USER_TABLE, userString);
        return id;
    }

    /**
     * 
     * @param user
     * @param userId
     * @return 
     */
    public boolean update(User user, String userId) {
        Type type = new TypeToken<User>() {
        }.getType();
        String userString = new Gson().toJson(user, type);
        boolean status = new DmsDbManager().update(DmsConstants.USER_TABLE, userId, userString);
        return status;
    }

    /**
     * 
     * @param loginId
     * @return 
     */
    public boolean checkUserAvailability(String loginId) {
        //returns true if available
        HashMap<String, String> conditionMap = new HashMap<String, String>();
        conditionMap.put(DmsConstants.LOGIN_ID, loginId);
        String res = new DmsDbManager().getDetailsByCondition(DmsConstants.USER_TABLE, conditionMap);
        if (res == null || res.equals("")) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * for create user
     * @param strUserDetails
     * @param strUserAddress
     * @return 
     */
    public boolean createUser(String strUserDetails, String strUserAddress) {
        if (strUserDetails == null || strUserDetails.equals("") || strUserAddress == null || strUserAddress.equals("")) {
            return false;
        }

        Type type = new TypeToken<User>() {
        }.getType();
        User userDto = new Gson().fromJson(strUserDetails, type);

        userDto.setPassword(new DmsPasswordManager().getSecurePassword(userDto.getPassword(), userDto.getloginid()));
        String strUserTemp = new Gson().toJson(userDto, type);
        String strUserId = new DmsDbManager().save(DmsConstants.USER_TABLE, strUserTemp);

        if ((strUserId == null) || strUserId.equals("")) {
            return false;
        } else {
            type = new TypeToken<List<UserAddress>>() {
            }.getType();

            List<UserAddress> lstUserAddressDto = new Gson().fromJson(strUserAddress, type);
            int iCount = lstUserAddressDto.size();
            for (int i = 0; i < iCount; i++) {
                lstUserAddressDto.get(i).setOwnerid(strUserId);
                UserAddress userAddressTemp = lstUserAddressDto.get(i);
                userAddressTemp.setOwnerid(strUserId);

            }

            String strUserAddressTemp = new Gson().toJson(lstUserAddressDto, type);

            boolean bFlag = new DmsDbManager().insertMultiRecordsJsonData(DmsConstants.USERADDRESS_TABLE, strUserAddressTemp);

            return bFlag;
        }
    }

    /**
     * fetch all user list
     * @param orgId
     * @return 
     */
    public String viewAllUsers(String orgId) {
        String result = "";
        if (orgId == "" || orgId.equals("") || orgId == null) {
            return null;
        } else {
            HashMap<String, String> condition = new HashMap<String, String>();
            condition.put("orgid", orgId);
            result = new DmsDbManager().getDetailsByCondition(DmsConstants.USER_TABLE, condition);
        }
        return result;
    }

    /**
     * for fetch single user
     * @param userId
     * @return 
     */
    public String viewUserDetailById(String userId) {
        if (userId == null || userId.equals("")) {
            return null;
        }
        String result = new DmsDbManager().viewDetailsById(DmsConstants.USER_TABLE, userId);

        if (result != null && !result.isEmpty()) {
            return result;
        } else {
            return null;
        }
    }

    /**
     * for fetch single user
     * @param strUserId
     * @param strType
     * @return 
     */
    private UserAddress getUserAddressByType(String strUserId, String strType) {
        String resultJson = "";
        Type type = new TypeToken<List<UserAddress>>() {
        }.getType();
        if (strUserId.equals("") || (strUserId == null) || strType.equals("") || (strType == null)) {
            return null;
        } else {
            HashMap<String, String> condition = new HashMap<String, String>();
            condition.put("ownerid", strUserId);
            condition.put("addresstype", strType);
            resultJson = new DmsDbManager().getDetailsByCondition(DmsConstants.USERADDRESS_TABLE, condition);
        }

        List<UserAddress> lstFetchAddress = new Gson().fromJson(resultJson, type);

        UserAddress fetchUserAddressDto = null;
        if((lstFetchAddress !=null)&&(lstFetchAddress.size()>0)){
            fetchUserAddressDto = lstFetchAddress.get(0);
        }

        return fetchUserAddressDto;
    }

    /**
     * 
     * @param strUserId
     * @return 
     */
    public String viewUserAllAddress(String strUserId) {
        String resultJson = "";
        if (strUserId == "" || strUserId.equals("") || strUserId == null) {
            return null;
        } else {
            HashMap<String, String> condition = new HashMap<String, String>();
            condition.put("ownerid", strUserId);
            resultJson = new DmsDbManager().getDetailsByCondition(DmsConstants.USERADDRESS_TABLE, condition);
        }
        return resultJson;
    }

    /**
     * for update user Details
     * @param strUserjson
     * @param strAddressJson
     * @param strUserId
     * @return 
     */
    public boolean updateUser(String strUserjson, String strAddressJson, String strUserId) {
        if (strUserjson == null || strUserjson.equals("")) {
            return false;
        }

        //update user address
        boolean bUpdateStatus = updateUserAddress(strAddressJson, strUserId);
        if (!bUpdateStatus) {
            logger.error("User Address is not Updated....");
        }

        bUpdateStatus = false;
        Type type = new TypeToken<User>() {
        }.getType();
        User userDto = new Gson().fromJson(strUserjson, type);

        String fetchUserData = viewUserDetailById(strUserId);

        if (fetchUserData == null || fetchUserData.equals("")) {
            return false;
        } else {
            type = new TypeToken<List<User>>() {
            }.getType();
            List<User> fetchUserList = new Gson().fromJson(fetchUserData, type);
            User fUserDto = fetchUserList.get(0);
            fUserDto.setFname(userDto.getFname());
            fUserDto.setMname(userDto.getMname());
            fUserDto.setLname(userDto.getLname());
            fUserDto.setGender(userDto.getGender());
            fUserDto.setDob(userDto.getDob());
            bUpdateStatus = update(fUserDto, strUserId);
        }

        return bUpdateStatus;

    }

    /**
     * 
     * @param strAddressJson
     * @param strUserId
     * @return 
     */
    public boolean updateUserAddress(String strAddressJson, String strUserId) {
        boolean bFlag = true;//default in case of no any address provided 
        Type type = new TypeToken<List<UserAddress>>() {
        }.getType();
        List<UserAddress> getAddressList = new Gson().fromJson(strAddressJson, type);
        int iCount = getAddressList.size();
        for (int i = 0; i < iCount; i++) {

            UserAddress userAddressDto = getAddressList.get(i);
            String strAddressType = userAddressDto.getAddresstype();
            if ((strAddressType == null) || (strAddressType.equals(""))) {
                continue;
            }

            UserAddress fetchUserAddressDto = getUserAddressByType(strUserId, strAddressType);
            if (fetchUserAddressDto == null) {
                continue;
            }

            fetchUserAddressDto.setHomephone(userAddressDto.getHomephone());
            fetchUserAddressDto.setWorkphone(userAddressDto.getWorkphone());
            fetchUserAddressDto.setMobilephone(userAddressDto.getMobilephone());
            fetchUserAddressDto.setfax(userAddressDto.getfax());
            fetchUserAddressDto.setEmail1(userAddressDto.getEmail1());
            fetchUserAddressDto.setEmail2(userAddressDto.getEmail2());
            fetchUserAddressDto.setAddress1(userAddressDto.getAddress1());
            fetchUserAddressDto.setAddress2(userAddressDto.getAddress2());
            fetchUserAddressDto.setCity(userAddressDto.getCity());
            fetchUserAddressDto.setState(userAddressDto.getState());
            fetchUserAddressDto.setCountry(userAddressDto.getCountry());
            fetchUserAddressDto.setZipcode(userAddressDto.getZipcode());
            fetchUserAddressDto.setAddresstype(userAddressDto.getAddresstype());

            String strAddressId = ((Map<String, String>) (fetchUserAddressDto.getId())).get("$oid");
            type = new TypeToken<UserAddress>() {
            }.getType();

            String strAddressData = new Gson().toJson(fetchUserAddressDto, type);
            bFlag = new DmsDbManager().update(DmsConstants.USERADDRESS_TABLE, strAddressId, strAddressData);
            if(!bFlag){
                logger.error("user address update failed for address type : " + strAddressType);
            }
        }
        return bFlag;
    }

    /**
     * 
     * @param orgId
     * @return 
     */
    public String fetchOrgName(String orgId) {
        if (orgId == "" || orgId.equals("") || orgId == null) {
            return null;
        } else {
            String resultJson = new DmsDbManager().viewDetailsById(DmsConstants.ORG_TABLE, orgId);

            if (resultJson == "" || resultJson.equals("") || resultJson == null) {
                return null;
            } else {
                return resultJson;
            }
        }
    }

    /**
     * 
     * @param parentid
     * @return 
     */
    public String fetchChildOrganizations(String parentid) {
        if (parentid == null || parentid.equals("")) {
            return null;
        }
        HashMap<String, String> param = new HashMap<String, String>();
        param.put("parentorgid", parentid);

        String result = new DmsDbManager().getDetailsByCondition(DmsConstants.ORG_TABLE, param);
        return result;
    }

    /**
     * 
     * @param orgid
     * @param role
     * @return 
     */
    public String fetchUserByRoles(String orgid, String role) {
        if (orgid == null || orgid.equals("") || role == null || role.equals("")) {
            return null;
        }
        HashMap<String, String> param = new HashMap<String, String>();
        param.put("orgid", orgid);
        param.put("roles", role);

        String result = new DmsDbManager().getDetailsByCondition(DmsConstants.USER, param);

        return result;
    }
}
