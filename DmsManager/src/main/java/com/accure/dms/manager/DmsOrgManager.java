package com.accure.dms.manager;

import com.accure.dms.dto.Org;
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
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author Vinod
 */
public class DmsOrgManager {
    private static Logger logger = Logger.getLogger(DmsOrgManager.class);

    /**
     * fetch all Organization..
     * @return 
     */
    public String fetchAllOrg() {
        HashMap<String, String> condition = new HashMap<String, String>();
        condition.put("status", "active");
        String resultJson = new DmsDbManager().getDetailsByCondition(DmsConstants.ORG_TABLE, condition);
        Type type = new TypeToken<List<Org>>() {
        }.getType();
        List<Org> zones = new Gson().fromJson(resultJson, type);
        ArrayList list = new ArrayList();
        HashMap<String, String> mMap = new HashMap<String, String>();
        for (int i = 0; i < zones.size(); i++) {
            mMap.put("id", ((Map<String, String>) (zones.get(i).getId())).get("$oid"));
            mMap.put("name", zones.get(i).getName());
            if ((zones.get(i).getParentorgid() == null) || (zones.get(i).getParentorgid().equals(""))) {
                mMap.put("parent", "0");
            } else {
                mMap.put("parent", zones.get(i).getParentorgid());
            }
            list.add(mMap);
            mMap = new HashMap();
        }
        String strJson = listMapToJsonString(list);

        return strJson;

    }

    /**
     * 
     * @param list
     * @return 
     */ 
    public String listMapToJsonString(List<Map<String, String>> list) {
        JSONArray jsonArray = new JSONArray();
        for (Map<String, String> map : list) {
            JSONObject jsonObj = new JSONObject();
            for (Map.Entry<String, String> entry : map.entrySet()) {
                String key = entry.getKey();
                String val = entry.getValue();
                try {
                    jsonObj.put(key, val);
                } catch (JSONException ex) {
                   logger.error("Error: " + ex.getMessage());
                }
            }
            jsonArray.put(jsonObj);
        }
        return jsonArray.toString();
    }

    /**
     * 
     * @param orgId
     * @return 
     */
    public String fetchDistrByOrgId(String orgId) {
        if (orgId.equals("") || orgId == null) {
            return null;
        }
        HashMap<String, String> condition = new HashMap<String, String>();
        condition.put("orgId", orgId);
        String resultJson = new DmsDbManager().getDetailsByCondition(DmsConstants.ROUTE_TABLE, condition);

        return resultJson;
    }

    /**
     * fetch all zone
     * @param orgId
     * @param parentZoneId
     * @return 
     */
    public String fetchZoneByOrgId(String orgId, String parentZoneId) {
        if (orgId.equals("") || orgId == null) {
            return null;
        }
        HashMap<String, String> condition = new HashMap<String, String>();
        condition.put("orgid", orgId);
        condition.put("parentzoneid", parentZoneId);
        String resultJson = new DmsDbManager().getDetailsByCondition(DmsConstants.ZONE_TABLE, condition);

        return resultJson;
    }

    /**
     * fetch all distributor by OrgId
     * @param parentorgid
     * @return 
     */
    public String viewAllDistributor(String parentorgid) {
        if (parentorgid.equals("") || parentorgid == null) {
            return null;
        } else {
            HashMap<String, Object> finalMap = new HashMap<String, Object>();
            HashMap<String, String> condition = new HashMap<String, String>();
            condition.put("parentorgid", parentorgid);
            condition.put("type", "DS");
            String result = new DmsDbManager().getDetailsByCondition(DmsConstants.ORG_TABLE, condition);
            String parentOrgDetails = new DmsDbManager().viewDetailsById(DmsConstants.ORG_TABLE, parentorgid);
            Type type = new TypeToken<List<Org>>() {
            }.getType();
            List<Org> orgList = new Gson().fromJson(result, type);
            HashMap<String, String> conditionMap = new HashMap<String, String>();
            conditionMap.put("status", "active");
            String zoneJson = new DmsDbManager().getDetailsByCondition(DmsConstants.ZONE_TABLE, conditionMap);
            HashMap<String, String> zoneMap = new HashMap<String, String>();
            if (zoneJson == "" || zoneJson.equals("") || zoneJson == null) {
                return null;
            } else {
                type = new TypeToken<List<Zone>>() {
                }.getType();
                List<Zone> zoneList = new Gson().fromJson(zoneJson, type);
                for (int i = 0; i < orgList.size(); i++) {
                    Org org = orgList.get(i);
                    for (int j = 0; j < zoneList.size(); j++) {
                        Zone zn = zoneList.get(j);
                        if (((Map<String, String>) zn.getId()).get("$oid").equals(org.getZoneid())) {
                            zoneMap.put(org.getZoneid(), zn.getName());
                        }
                    }
                }
            }
            finalMap.put("Distributor", result);
            finalMap.put("parentOrgDetails", parentOrgDetails);
            finalMap.put("zone", zoneMap);
            String json = new Gson().toJson(finalMap, new TypeToken<HashMap<String, String>>() {
            }.getType());
            return json;
        }
    }

    /**
     * view all retailer list
     * @param parentOrgId
     * @return 
     */
    public String viewAllRetailer(String parentOrgId) {
        if (parentOrgId.equals("") || parentOrgId == null) {
            return null;
        }
        HashMap<String, String> condition = new HashMap<String, String>();
        condition.put("parentorgid", parentOrgId);
        condition.put("status", "active");
        condition.put("type", "RT");
        String resultJson = new DmsDbManager().getDetailsByCondition(DmsConstants.ORG_TABLE, condition);
        return resultJson;
    }
}
