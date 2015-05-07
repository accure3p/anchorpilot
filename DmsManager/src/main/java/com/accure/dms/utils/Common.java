package com.accure.dms.utils;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.log4j.Logger;

/**
 *
 * @author Vinod
 */
public class Common {
    private static Logger logger = Logger.getLogger(Common.class);
    
    /**
     * 
     * @return 
     */
    public static PropertiesConfiguration getPropObj() {
        PropertiesConfiguration config = null;
        try {
            config = new PropertiesConfiguration("dms-manager-config.properties");
        } catch (ConfigurationException ex) {
        }
        logger.info("prop Obj : " + config);
        return config;
    }

    /**
     * 
     * @param strDate
     * @return 
     */
    public static String getDateMilliSecString(String strDate) {
        String strDateNum = "";
        try {
            SimpleDateFormat formatter = new SimpleDateFormat(getPropObj().getProperty("date-format-string").toString());

            long idtStart = formatter.parse(strDate).getTime();
            strDateNum = String.valueOf(idtStart);
        } catch (java.text.ParseException ex) {
            logger.error(ex.getMessage());
        }
        return strDateNum;

    }

    /**
     * 
     * @param strMilliSec
     * @return 
     */
    public static String getDateFromMilliSec(String strMilliSec) {
        String strDate = "";
        SimpleDateFormat formatter = new SimpleDateFormat(getPropObj().getProperty("date-format-string").toString());

        strDate = formatter.format(Long.valueOf(strMilliSec));
        return strDate;

    }

    /**
     * 
     * @param strProcessName
     * @param strCurrentStatus
     * @param strErrorMsg
     * @return 
     */
    public static String getLogMsg(String strProcessName, String strCurrentStatus, String strErrorMsg) {
        String processId = UUID.randomUUID().toString();
        String strLogMsg = "process_id:" + processId + ",process_name:" + strProcessName + ","
                + "status:" + strCurrentStatus + ",error:" + strErrorMsg;
        return strLogMsg;
    }

    /**
     * 
     * @param map
     * @return 
     */
    public static Map<String, String> getSingleMapValue(Map<String, String[]> map) {
        if ((map == null) || (map.isEmpty())) {
            return null;
        }
        Map<String, String> newMap = new HashMap<String, String>();
        if (map != null && !map.isEmpty()) {
            Set keyset = map.keySet();
            Iterator it = keyset.iterator();
            while (it.hasNext()) {
                String key = (String) it.next();
                if (map.get(key) != null && map.get(key).length > 0) {
                    newMap.put(key, map.get(key)[0]);
                }
            }
        }
        return newMap;
    }

}
