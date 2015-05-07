package com.accure.dms.manager;

import com.accure.dms.dto.Org;
import com.accure.dms.dto.Route;
import com.accure.dms.dto.Zone;
import com.accure.dms.utils.DmsConstants;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;

/**
 *
 * @author Vinod
 */
public class DmsRouteManager {
    private static Logger logger = Logger.getLogger(DmsRouteManager.class);

    /**
     * fetch all zone on base of org Id
     * @param orgId
     * @return 
     */
    public String viewZones(String orgId) {
        if (orgId == "" || orgId.equals("") || orgId == null) {
            return null;
        } else {
            HashMap<String, String> condition = new HashMap<String, String>();
            condition.put("orgid", orgId);
            List<Zone> zoneList = new DmsRouteManager().getZoneByCondition(condition);
            Type type = new TypeToken<List<Zone>>() {
            }.getType();
            String resultJson = new Gson().toJson(zoneList, type);
            if (resultJson == "" || resultJson.equals("") || resultJson == null) {
                return null;
            } else {
                return resultJson;
            }
        }
    }

    /**
     * fetch list of all zone
     * @param columnCondition
     * @return 
     */
    public List<Zone> getZoneByCondition(HashMap<String, String> columnCondition) {
        String result = new DmsDbManager().getDetailsByCondition(DmsConstants.USER_ZONE, columnCondition);
        if (result != null && !result.equals("")) {
            Type type = new TypeToken<List<Zone>>() {
            }.getType();
            List<Zone> zones = new Gson().fromJson(result, type);
            return zones;
        } else {
            return null;
        }
    }

    /**
     * fetch all sales executive
     * @param orgId
     * @return 
     */
    public String viewSalesExecutive(String orgId) {
        if (orgId == "" || orgId.equals("") || orgId == null) {
            return null;
        } else {
            HashMap<String, String> condition = new HashMap<String, String>();
            condition.put("orgid", orgId);
            condition.put("roles", "Sales executive");
            String result = new DmsDbManager().getDetailsByCondition(DmsConstants.USER_TABLE, condition);
            return result;
        }
    }

    /**
     * fetch org name by zone id
     * @param zoneid
     * @return 
     */
    public String fetchOrgNameByZone(String zoneid) {
        if (zoneid == "" || zoneid.equals("") || zoneid == null) {
            return null;
        }
        HashMap<String, String> condition = new HashMap<String, String>();
        condition.put("zoneid", zoneid);
        condition.put("status", "active");
        String resultJson = new DmsDbManager().getDetailsByCondition(DmsConstants.ORG_TABLE, condition);
        if (resultJson == "" || resultJson.equals("") || resultJson == null) {
            return null;
        } else {
            return resultJson;
        }
    }

    /**
     * to fetch retailers
     * @param zoneid
     * @return 
     */
    public String fetchRetailersByZoneId(String zoneid) {
        if (zoneid == "" || zoneid.equals("") || zoneid == null) {
            return null;
        }
        List<Org> resultOrgList = new ArrayList<Org>();
        HashMap<String, String> condition = new HashMap<String, String>();
        condition.put("zoneid", zoneid);
        condition.put("type", "DS");
        condition.put("status", "active");
        String resultJson = new DmsDbManager().getDetailsByCondition(DmsConstants.ORG_TABLE, condition);
        List<Org> orgs = new Gson().fromJson(resultJson, new TypeToken<List<Org>>() {
        }.getType());
        for (Org org : orgs) {
            String id = ((Map<String, String>) org.getId()).get("$oid");
            condition = new HashMap<String, String>();
            condition.put("parentorgid", id);
            condition.put("type", "RT");
            condition.put("status", "active");
            String json = new DmsDbManager().getDetailsByCondition(DmsConstants.ORG_TABLE, condition);
            List<Org> childOrgs = new Gson().fromJson(json, new TypeToken<List<Org>>() {
            }.getType());
            resultOrgList.addAll(childOrgs);
        }
        String retailersJson = new Gson().toJson(resultOrgList, new TypeToken<List<Org>>() {
        }.getType());
        if (retailersJson == "" || retailersJson.equals("") || retailersJson == null) {
            return null;
        } else {
            return retailersJson;
        }
    }

    /**
     * for create zone
     * @param routeJson
     * @return 
     */
    public boolean createRoute(String routeJson) {
        if (routeJson == "" || routeJson.equals("") || routeJson == null) {
            return false;
        }
        String resultJson = new DmsDbManager().save(DmsConstants.ROUTE_TABLE, routeJson);
        if (resultJson == "" || resultJson.equals("") || resultJson == null) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * fetch route  by user id
     * @param strUserId
     * @return 
     */
    public String fetchRouteByUserId(String strUserId) {
        if ((strUserId == null) || strUserId.equals("")) {
            return null;
        }
        HashMap<String, String> condition = new HashMap<String, String>();
        condition.put("UserID", strUserId);
        String strResultJson = new DmsDbManager().getDetailsByCondition(DmsConstants.ROUTE_TABLE, condition);
        return strResultJson;
    }

    /**
     * fetch route  by id
     * @param routeId
     * @return 
     */
    public String fetchRouteById(String routeId) {
        if (routeId == "" || routeId.equals("") || routeId == null) {
            return null;
        }
        HashMap<String, Object> finalMap = new HashMap<String, Object>();
        int i = 0;
        //fetch Route from Route table using route Id
        String resultJson = new DmsDbManager().viewDetailsById(DmsConstants.ROUTE_TABLE, routeId);
        if (resultJson == "" || resultJson.equals("") || resultJson == null) {
            return null;
        } else {
            List<Route> routes = new Gson().fromJson(resultJson, new TypeToken<List<Route>>() {
            }.getType());
            Route route = routes.get(0);
            String zoneId = route.getZoneid();
            //fetch List<Zone> from zone table
            HashMap<String, String> conditionMap = new HashMap<String, String>();
            conditionMap.put("status", "active");
            String zoneJson = new DmsDbManager().getDetailsByCondition(DmsConstants.ZONE_TABLE, conditionMap);
            if (zoneJson == "" || zoneJson.equals("") || zoneJson == null) {
                return null;
            } else {
                HashMap<String, String> zoneMap = new HashMap<String, String>();
                List<Zone> zones = new Gson().fromJson(zoneJson, new TypeToken<List<Zone>>() {
                }.getType());
                //for each get the parent id and zone id and name and add it to a hashmap
                for (int j = 0; j < zones.size(); j++) {
                    Zone zn = zones.get(j);
                    if (((Map<String, String>) zn.getId()).get("$oid").equals(zoneId)) {
                        zoneMap.put((++i) + "", zoneId);
                        if (zn.getParentzoneid() != null && !zn.getParentzoneid().equals("")) {
                            zoneId = zn.getParentzoneid();
                            j = 0;
                        } else {
                            break;
                        }
                    }
                }
                finalMap.put("route", resultJson);
                finalMap.put("zone", zoneMap);
                //convert the hashmap into JSON and return it.
                String strJson = new Gson().toJson(finalMap, new TypeToken<HashMap<String, Object>>() {
                }.getType());
                return strJson;
            }
        }
    }

    /**
     * update route by Id
     * @param routeId
     * @param strJsonData
     * @return 
     */
    public boolean updateRoute(String routeId, String strJsonData) {
        if (routeId.equals("") || routeId == null
                || strJsonData.equals("") || strJsonData == null) {
            return true;
        }
        boolean resultJson = new DmsDbManager().update(DmsConstants.ROUTE_TABLE, routeId, strJsonData);
        if (resultJson == true) {
            return true;
        } else {
            return false;
        }
    }
}
