package com.accure.dms.manager;

import com.accure.dms.dto.Org;
import com.accure.dms.dto.OrgAddress;
import com.accure.dms.dto.Route;
import com.accure.dms.dto.Zone;
import com.accure.dms.utils.DmsConstants;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import org.apache.log4j.Logger;

/**
 *
 * @author Vinod
 */
public class DmsRetailerManager {
    private static Logger logger = Logger.getLogger(DmsRetailerManager.class);

    /**
     * view all Retailer list by parentorgid
     * @param strDistributorId
     * @return 
     */
    public String viewAllRetailers(String strDistributorId) {
        if (strDistributorId.equals("") || strDistributorId == null) {
            return null;
        }
        HashMap<String, String> condition = new HashMap<String, String>();
        condition.put("parentorgid", strDistributorId);
        condition.put("status", "active");
        String resultJson = new DmsDbManager().getDetailsByCondition(DmsConstants.ORG_TABLE, condition);
        Type type = new TypeToken<List<Org>>() {
        }.getType();
        List<Org> lstRetailers = new Gson().fromJson(resultJson, type);
        int iCount = lstRetailers.size();

        List<HashMap<String, Object>> lstMap = new ArrayList<HashMap<String, Object>>();

        for (int i = 0; i < iCount; i++) {

            Org retailerDto = lstRetailers.get(i);

            String strZoneId = retailerDto.getZoneid();
            String strZoneName = "";
            if ((strZoneId != null) && (!strZoneId.equals(""))) {
                strZoneName = getZoneName(strZoneId);
            }
            String strRouteId = retailerDto.getRouteid();
            String strRouteName = "";
            if ((strRouteId != null) && (!strRouteId.equals(""))) {
                strRouteName = getRouteName(strRouteId);
            }

            HashMap<String, Object> tempMap = new HashMap<String, Object>();
            tempMap.put("org", retailerDto);
            tempMap.put("ZoneName", strZoneName);
            tempMap.put("RouteName", strRouteName);
            lstMap.add(tempMap);
        }

        resultJson = new Gson().toJson(lstMap);
        return resultJson;
    }

    /**
     * 
     * @param strZoneId
     * @return 
     */
    public String getZoneName(String strZoneId) {
        String resultJson = new DmsDbManager().viewDetailsById(DmsConstants.ZONE_TABLE, strZoneId);
        Type type = new TypeToken<List<Zone>>() {
        }.getType();
        List<Zone> lstZones = new Gson().fromJson(resultJson, type);
        Zone zoneDto = lstZones.get(0);
        resultJson = zoneDto.getName();
        return resultJson;
    }

    /**
     * 
     * @param strRouteId
     * @return 
     */
    public String getRouteName(String strRouteId) {
        String resultJson = new DmsDbManager().viewDetailsById(DmsConstants.ROUTE_TABLE, strRouteId);
        Type type = new TypeToken<List<Route>>() {
        }.getType();
        List<Route> lstRoutes = new Gson().fromJson(resultJson, type);

        Route routeDto = lstRoutes.get(0);
        resultJson = routeDto.getName();
        return resultJson;
    }

    /**
     * create Retailer 
     * @param strRetailerJson
     * @param strAddressJson
     * @return 
     */
    public boolean createRetailer(String strRetailerJson, String strAddressJson) {
        if (strRetailerJson == "" || strRetailerJson.equals("")) {
            return false;
        }

        Type type = new TypeToken<Org>() {
        }.getType();
        Org RetailerDto = new Gson().fromJson(strRetailerJson, type);
        RetailerDto.setCreatedate((new Date()).getTime() + "");
        RetailerDto.setStatus("active");
        RetailerDto.setType("RT");
        RetailerDto.setDataflag("TRUE");
        String srtRetailerData = new Gson().toJson(RetailerDto, type);

        String strRetailerId = new DmsDbManager().save(DmsConstants.ORG_TABLE, srtRetailerData);

        type = new TypeToken<OrgAddress>() {
        }.getType();
        OrgAddress retailerAddressDto = new Gson().fromJson(strAddressJson, type);
        retailerAddressDto.setOwnerid(strRetailerId);
        retailerAddressDto.setStatus("active");
        retailerAddressDto.setOrgid(RetailerDto.getParentorgid());
        retailerAddressDto.setCreatedate((new Date()).getTime() + "");

        String srtAddressData = new Gson().toJson(retailerAddressDto, type);
        String strAddressId = new DmsDbManager().save(DmsConstants.ORGADDRESS_TABLE, srtAddressData);
        if ((strAddressId == null) || strAddressId.equals("")) {
            return false;
        }
        return true;
    }

    /**
     * update retailer..
     * @param strRetailerId
     * @param strAddressId
     * @param strRetailerJson
     * @param strRetailerAddressJson
     * @return 
     */
    public boolean updateRetailer(String strRetailerId, String strAddressId, String strRetailerJson, String strRetailerAddressJson) {
        if (strRetailerId == "" || strRetailerId.equals("")) {
            return false;
        }

        //update Retailer details
        boolean bUpdateStatus = false;
        Type type = new TypeToken<Org>() {
        }.getType();
        Org orgDto = new Gson().fromJson(strRetailerJson, type);

        String strRetailerData = fetchRetailerById(strRetailerId);

        if (strRetailerData == null || strRetailerData.equals("")) {
            return false;
        } else {
            type = new TypeToken<List<Org>>() {
            }.getType();
            List<Org> lstRetailer = new Gson().fromJson(strRetailerData, type);
            Org fRetailerDto = lstRetailer.get(0);
            fRetailerDto.setName(orgDto.getName());
            fRetailerDto.setGroupname(orgDto.getGroupname());
            fRetailerDto.setUpdatedate((new Date()).getTime() + "");

            type = new TypeToken<Org>() {
            }.getType();
            String strJsonData = new Gson().toJson(fRetailerDto, type);
            bUpdateStatus = new DmsDbManager().update(DmsConstants.ORG_TABLE, strRetailerId, strJsonData);

        }

        //update Retailer Address
        bUpdateStatus = updateRetailerAddress(strRetailerId, strAddressId, strRetailerAddressJson);
        if (!bUpdateStatus) {
            logger.error("Retailer Address is not Updated....");
        }

        return bUpdateStatus;
    }

    /**
     * 
     * @param strRetailerId
     * @param strAddressId
     * @param strRetailerAddressJson
     * @return 
     */
    public boolean updateRetailerAddress(String strRetailerId, String strAddressId, String strRetailerAddressJson) {

        boolean bFlag = false;
        Type type = new TypeToken<List<OrgAddress>>() {
        }.getType();
        List<OrgAddress> getAddressList = new Gson().fromJson(strRetailerAddressJson, type);
        int iCount = getAddressList.size();
        for (int i = 0; i < iCount; i++) {

            OrgAddress orgAddressDto = getAddressList.get(i);

            OrgAddress fetchRetailerAddressDto = getRetailerAddressByType(strRetailerId, orgAddressDto.getAddresstype());

            fetchRetailerAddressDto.setHomephone(orgAddressDto.getHomephone());
            fetchRetailerAddressDto.setWorkphone(orgAddressDto.getWorkphone());
            fetchRetailerAddressDto.setMobilephone(orgAddressDto.getMobilephone());
            fetchRetailerAddressDto.setfax(orgAddressDto.getfax());
            fetchRetailerAddressDto.setEmail1(orgAddressDto.getEmail1());
            fetchRetailerAddressDto.setEmail2(orgAddressDto.getEmail2());
            fetchRetailerAddressDto.setAddress1(orgAddressDto.getAddress1());
            fetchRetailerAddressDto.setAddress2(orgAddressDto.getAddress2());
            fetchRetailerAddressDto.setCity(orgAddressDto.getCity());
            fetchRetailerAddressDto.setState(orgAddressDto.getState());
            fetchRetailerAddressDto.setCountry(orgAddressDto.getCountry());
            fetchRetailerAddressDto.setZipcode(orgAddressDto.getZipcode());
            fetchRetailerAddressDto.setUpdatedate((new Date()).getTime() + "");

            type = new TypeToken<OrgAddress>() {
            }.getType();

            String strAddressData = new Gson().toJson(fetchRetailerAddressDto, type);
            bFlag = new DmsDbManager().update(DmsConstants.ORGADDRESS_TABLE, strAddressId, strAddressData);
        }
        return bFlag;
    }

    /**
     * 
     * @param strRetailerId
     * @param strType
     * @return 
     */
    private OrgAddress getRetailerAddressByType(String strRetailerId, String strType) {
        String resultJson = "";
        Type type = new TypeToken<List<OrgAddress>>() {
        }.getType();
        if (strRetailerId.equals("") || (strRetailerId == null) || strType.equals("") || (strType == null)) {
            return null;
        } else {
            HashMap<String, String> condition = new HashMap<String, String>();
            condition.put("ownerid", strRetailerId);
            condition.put("addresstype", strType);
            resultJson = new DmsDbManager().getDetailsByCondition(DmsConstants.ORGADDRESS_TABLE, condition);
        }

        List<OrgAddress> lstFetchAddress = new Gson().fromJson(resultJson, type);

        OrgAddress fetchRetailerAddressDto = lstFetchAddress.get(0);

        return fetchRetailerAddressDto;
    }

    /**
     * 
     * @param strRetailerId
     * @return 
     */
    public String fetchRetailerById(String strRetailerId) {
        String strJsonData = "";
        if (strRetailerId == "" || strRetailerId.equals("")) {
            return null;
        }

        strJsonData = new DmsDbManager().viewDetailsById(DmsConstants.ORG_TABLE, strRetailerId);
        return strJsonData;
    }

    /**
     * 
     * @param strRetailerId
     * @return 
     */
    public String fetchRetailerAddress(String strRetailerId) {
        String strJsonData = "";
        if (strRetailerId == "" || strRetailerId.equals("")) {
            return null;
        }
        HashMap<String, String> condition = new HashMap<String, String>();
        condition.put("ownerid", strRetailerId);
        strJsonData = new DmsDbManager().getDetailsByCondition(DmsConstants.ORGADDRESS_TABLE, condition);

        return strJsonData;
    }

    /**
     * 
     * @param strDistributorId
     * @return 
     */
    public String getDistributorAllZones(String strDistributorId) {

        String resultJson = "";
        if (strDistributorId.equals("") || strDistributorId == null) {
            return null;
        }

        resultJson = new DmsDbManager().viewDetailsById(DmsConstants.ORG_TABLE, strDistributorId);

        Type type = new TypeToken<List<Org>>() {
        }.getType();
        List<Org> lstOrg = new Gson().fromJson(resultJson, type);
        Org orgDto = lstOrg.get(0);
        String strZoneId = orgDto.getZoneid();

        HashMap<String, String> condition = new HashMap<String, String>();
        condition.put("parentzoneid", strZoneId);
        resultJson = new DmsDbManager().viewDetailsById(DmsConstants.ZONE_TABLE, strZoneId);
        return resultJson;

    }

    /**
     * 
     * @param strDistributorId
     * @param strZoneId
     * @return 
     */
    public String getDistributorRoutes(String strDistributorId, String strZoneId) {
        String resultJson = "";
        if (strDistributorId.equals("") || (strDistributorId == null)
                || strZoneId.equals("") || (strZoneId == null)) {
            return null;
        }
        HashMap<String, String> condition = new HashMap<String, String>();
        condition.put("orgid", strDistributorId);
        condition.put("zoneid", strZoneId);
        condition.put("status", "active");
        resultJson = new DmsDbManager().getDetailsByCondition(DmsConstants.ROUTE_TABLE, condition);

        return resultJson;

    }
}
