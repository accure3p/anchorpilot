package com.accure.dms.manager;

import com.accure.dms.db.MongodbDAO;
import com.accure.dms.utils.Common;
import com.accure.dms.utils.DmsConstants;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import org.apache.log4j.Logger;

/**
 *
 * @author Vinod
 */
public class DmsDbManager {

    private Logger logger = Logger.getLogger(DmsDbManager.class);

    /**
     * 
     * @return 
     */
    private MongodbDAO getMongoDao() {
        String strDbUrls = "";
        String[] strArrayDbUrls = Common.getPropObj().getStringArray("db-url");
        for (String strTemp : strArrayDbUrls) {
            if(!strDbUrls.equals("")){
                strDbUrls = strDbUrls.concat(",");
            }
            strDbUrls = strDbUrls.concat(strTemp);
        }
        String strDbSchema = Common.getPropObj().getProperty("db-schema").toString();

        MongodbDAO mngDao = MongodbDAO.getDefaultInstance(strDbUrls, strDbSchema);

        if (mngDao == null) {
            logger.info("dbinstance is null ...");

        } else {
            logger.error("got valid db instance ...");
        }
        return mngDao;
    }

    /**
     * 
     * @param strJsonData
     * @return 
     */
    public boolean writeJsonDataToMongodb(String strJsonData) {
        String strTableName = Common.getPropObj().getProperty("db-table").toString();
        boolean bFlag = false;
        String strRes = "";
        MongodbDAO mngDao = getMongoDao();
        try {
            logger.info("Inserting data into db...");
            strRes = mngDao.insertSingleRecord(strTableName, strJsonData);
            logger.info("mongo Response key..." + strRes);
            
            bFlag = true;
        } catch (Exception ex) {
            logger.error("Mongo Error:" + ex.getMessage());
            
        } finally {
            mngDao.close();
        }

        return bFlag;
    }

    /**
     * 
     * @param strTableName
     * @param strDtoJsonData
     * @return 
     */
    public String SaveDtoJsonDataToMongodb(String strTableName, String strDtoJsonData) {

        String strRes = "";
        MongodbDAO mngDao = getMongoDao();

        try {
            logger.info("Inserting data into db...");
            strRes = mngDao.insertSingleRecord(strTableName, strDtoJsonData);
            logger.info("mongo Response key..." + strRes);
            
        } catch (Exception ex) {
            logger.error("Mongo Error:" + ex.getMessage());
            
        } finally {
            mngDao.close();
        }
        return strRes;
    }

    /**
     * 
     * @param strStartDate
     * @param strEndDate
     * @param strPartyName
     * @return 
     */
    public String getAllPeriodicOrders(String strStartDate, String strEndDate, String strPartyName) {
        String strRes = "";
        MongodbDAO mngDao = getMongoDao();

        try {
            String strTableName = "Order";
            String strDateColName = "txndate";
            String strDateFormat = Common.getPropObj().getProperty("date-format-string").toString();
            if ((strDateFormat == null) || (strDateFormat.isEmpty())) {
                strDateFormat = "dd/MM/yyyy";
            }

            Map<String, Map<String, String>> condMap = new HashMap<String, Map<String, String>>();
            Map<String, String> cond = new HashMap<String, String>();
            cond.put("equal", "Sales Order");
            condMap.put("txntype", cond);

            if (!strPartyName.isEmpty()) {
                cond = new HashMap<String, String>();
                cond.put("equal", strPartyName);
                condMap.put("customername", cond);
            }

            strRes = mngDao.fetchRowsByDatePeriods(strTableName, strDateColName, strDateFormat, strStartDate, strEndDate, condMap);

            
            logger.info("mongo Response key..." + strRes);
        } catch (Exception ex) {
            logger.error("Mongo Error:" + ex.getMessage());
            
        } finally {
            mngDao.close();
        }
        return strRes;
    }

    /**
     * 
     * @param strOrderId
     * @return 
     */
    public String getOrderInvoiceDetail(String strOrderId) {
        MongodbDAO mngDao = getMongoDao();
        String strRes = "";
        Map<String, Map<String, String>> condMap = new HashMap<String, Map<String, String>>();
        Map<String, String> cond = new HashMap<String, String>();
        cond.put("equal", "Invoice");
        condMap.put("txntype", cond);

        cond = new HashMap<String, String>();
        cond.put("equal", strOrderId);
        condMap.put("reference", cond);
        String strTableName = "Order";
        try {
            strRes = mngDao.fetchRowsByConditions(strTableName, condMap);
            
            logger.info("mongo Response key..." + strRes);
        } catch (Exception ex) {
            logger.error("Mongo Error:" + ex.getMessage());
        }

        return strRes;
    }

    /**
     * 
     * @param strTxnId
     * @return 
     */
    public String getInvoiceLineItemsDetail(String strTxnId) {
        MongodbDAO mngDao = getMongoDao();
        String strRes = "";
        Map<String, Map<String, String>> condMap = new HashMap<String, Map<String, String>>();
        Map<String, String> cond = new HashMap<String, String>();
        cond.put("equal", strTxnId);
        condMap.put("txnid", cond);

        String strTableName = "LineItem";
        try {
            strRes = mngDao.fetchRowsByConditions(strTableName, condMap);
            logger.info("mongo Response key..." + strRes);
            
        } catch (Exception ex) {
            logger.error("Mongo Error:" + ex.getMessage());
        }

        return strRes;
    }

    /**
     * 
     * @param strOrderId
     * @return 
     */
    public String getAllOrderedItemsDetail(String strOrderId) {
        MongodbDAO mngDao = getMongoDao();
        String strRes = "";
        Map<String, Map<String, String>> condMap = new HashMap<String, Map<String, String>>();
        Map<String, String> cond = new HashMap<String, String>();
        cond.put("equal", strOrderId);
        condMap.put("orderid", cond);

        String strTableName = "LineItem";
        try {
            strRes = mngDao.fetchRowsByConditions(strTableName, condMap);
            logger.info("mongo Response key..." + strRes);
            
        } catch (Exception ex) {
            logger.error("Mongo Error:" + ex.getMessage());
        }

        return strRes;
    }

    /**
     * 
     * @param strItemCode
     * @return 
     */
    public String getItemInStockQty(String strItemCode) {
        MongodbDAO mngDao = getMongoDao();
        String strRes = "";
        Map<String, Map<String, String>> condMap = new HashMap<String, Map<String, String>>();
        Map<String, String> cond = new HashMap<String, String>();
        cond.put("equal", strItemCode);
        condMap.put("itemcode", cond);

        String strTableName = "Stock";
        try {
            strRes = mngDao.fetchRowsByConditions(strTableName, condMap);
            
            logger.info("mongo Response key..." + strRes);
        } catch (Exception ex) {
            logger.error("Mongo Error:" + ex.getMessage());
        }
        return strRes;
    }

    /**
     * 
     * @param strTableName
     * @param strJsonData
     * @return 
     */
    public boolean insertMultiRecordsJsonData(String strTableName, String strJsonData) {
        boolean bFlag = false;
        MongodbDAO mngDao = getMongoDao();
        bFlag = mngDao.insertMultiRecords(strTableName, strJsonData);
        return bFlag;
    }

    /**
     * 
     * @param strCsvFilePath
     * @param strTableName
     * @return 
     */
    public String csvBulkUpdateItemStock(String strCsvFilePath, String strTableName) {

//        String strDbUrls = "";
//        String[] strArrayDbUrls = Common.getPropObj().getStringArray("db-url");
//        for (String strTemp : strArrayDbUrls) {
//            if(!strDbUrls.equals("")){
//                strDbUrls = strDbUrls.concat(",");
//            }
//            strDbUrls = strDbUrls.concat(strTemp);
//        }                

        String strHost = "192.168.2.172";
        String strPort = "27017";
        
        String strDbName = Common.getPropObj().getProperty("db-schema").toString();
        

        try {
//            String strCsvImportCmd = "mongoimport --host " + strDbUrls
//                    + " --db " + strDbName + " --collection " + strTableName
//                    + " --type csv --file " + strCsvFilePath + " --headerline";
            
            String strCsvImportCmd = "mongoimport --host " + strHost + " --port " + strPort
                    + " --db " + strDbName + " --collection " + strTableName
                    + " --type csv --file " + strCsvFilePath + " --headerline";

            Process proc = Runtime.getRuntime().exec(strCsvImportCmd); //Whatever you want to execute
            logger.info("Runtime exec finished....");

            BufferedReader bufreadr = new BufferedReader(new InputStreamReader(
                    proc.getInputStream()));

            BufferedReader stdError = new BufferedReader(new InputStreamReader(proc.getErrorStream()));
            int iwaitFor = proc.waitFor();
            logger.info("waitFor:: " + iwaitFor);
            logger.info("Runtime waitfor finished....");

            //print the Output
            while (bufreadr.ready()) {
                logger.info(bufreadr.readLine());
            }

            // read the output from the command
            String strTemp = "";

            while ((strTemp = stdError.readLine()) != null) {
                logger.info("Std ERROR : " + strTemp);
            }

            int exitCode = proc.exitValue();
            logger.info("exitCode.. " + exitCode);

        } catch (InterruptedException e) {
            logger.error("Error: Interrupted Exception...." + e.getMessage());
        } catch (IOException e) {
            logger.error("Error: IO Exception : " + e.getMessage());
        } catch (Exception e) {
            logger.error("Error: Exception : " + e.getMessage());
        }
        logger.info("runtime exec completed....");

        return "";
    }

    /**
     * 
     * @param strTableName
     * @param strJsonData
     * @return 
     */
    public String save(String strTableName, String strJsonData) {
        String strId = "";
        try {
            strId = getMongoDao().insertSingleRecord(strTableName, strJsonData);
        } catch (Exception ex) {
            logger.error("exception occured during save...");
        }
        return strId;
    }

    /**
     * 
     * @param strTableName
     * @param strId
     * @param strJsonData
     * @return 
     */
    public boolean update(String strTableName, String strId, String strJsonData) {
        boolean status = false;
        try {
            status = getMongoDao().update(strTableName, strId, strJsonData);
        } catch (Exception ex) {
            logger.error("exception occured during update...");
        }
        return status;
    }

    /**
     * 
     * @param strTableName
     * @param columnCondition
     * @return 
     */
    public String getDetailsByCondition(String strTableName, HashMap<String, String> columnCondition) {
        Map<String, Map<String, String>> condition = new HashMap<String, Map<String, String>>();
        Set<String> keys = columnCondition.keySet();
        Iterator it = keys.iterator();
        while (it.hasNext()) {
            Map<String, String> cond = new HashMap<String, String>();
            String key = (String) it.next();
            cond.put(DmsConstants.EQUAL, columnCondition.get(key));
            condition.put(key, cond);
        }
        String strDetails = "";
        try {
            strDetails = getMongoDao().fetchRowsByConditions(strTableName, condition);
        } catch (Exception ex) {
            logger.error(ex);
        }
        return strDetails;
    }

    /**
     * 
     * @param strTableName
     * @param strId
     * @return 
     */
    public String viewDetailsById(String strTableName, String strId) {
        String strDetails = "";
        try {
            strDetails = getMongoDao().fetch(strTableName, strId);
        } catch (Exception ex) {
            logger.error(ex);
        }
        return strDetails;

    }

    /**
     * 
     * @param table
     * @param conditions
     * @param strLogic
     * @param fromIndex
     * @param limit
     * @return 
     */
    public String fetchDetailsLike(String table, Map<String, String> conditions, String strLogic, int fromIndex, int limit) {
        String strDetails = "";
        try {
            strDetails = getMongoDao().fetchRowsLike(table, conditions, strLogic, fromIndex, limit);
        } catch (Exception ex) {
            logger.error(ex);
        }
        return strDetails;

    }

    /**
     * 
     * @param strTableName 
     */
    public void detaleTableAllData(String strTableName) {
        getMongoDao().detaleTableAllData(strTableName);
    }
}
