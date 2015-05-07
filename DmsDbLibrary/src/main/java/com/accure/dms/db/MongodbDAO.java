package com.accure.dms.db;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.QueryBuilder;
import com.mongodb.ServerAddress;
import com.mongodb.WriteResult;
import com.mongodb.util.JSON;

import java.net.UnknownHostException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;
import org.apache.log4j.Logger;
import org.bson.types.ObjectId;

/**
 *
 * @author kalyank
 */
//public class MongodbDAO implements DAO {
public class MongodbDAO {

    private static Logger logger = Logger.getLogger(MongodbDAO.class);
    private static MongodbDAO mngDefaultDao = null;
    private DB mngDb = null;
    private MongoClient mngClient = null;
    private String strMngUrls = null;
    private String strMngSchema = null;

    private MongodbDAO(String strUrls) {
        try {
            ArrayList<ServerAddress> arlstAddr = new ArrayList<ServerAddress>();
            for (String strTemp : strUrls.split(",")) {
                arlstAddr.add(new ServerAddress(strTemp));
            }

            mngClient = new MongoClient(arlstAddr);
            strMngUrls = strUrls;

        } catch (UnknownHostException ex) {
            logger.error("error: " + ex.getMessage());
        }
    }

    /**
     *
     * @param strUrl
     * @param strSchema
     * @return
     */
    public static synchronized MongodbDAO getDefaultInstance(String strUrls, String strSchema) {
        //create new instance if it is null or host is different
        if (mngDefaultDao == null) {
            mngDefaultDao = new MongodbDAO(strUrls);
        } else if (mngDefaultDao.mngClient == null) {
            mngDefaultDao = new MongodbDAO(strUrls);
        } else if (!strUrls.equals(mngDefaultDao.strMngUrls)) {
            //first close the connection and recreate it
            mngDefaultDao.close();
            mngDefaultDao = new MongodbDAO(strUrls);
        }
        //update the schema
        if (!strSchema.equalsIgnoreCase(mngDefaultDao.strMngSchema)) {
            // if database doesn't exists, MongoDB will create it for you
            mngDefaultDao.mngDb = mngDefaultDao.mngClient.getDB(strSchema);
            mngDefaultDao.strMngSchema = strSchema;
        }

        //return instance for specified port
        return mngDefaultDao;
    }

    /**
     *
     * @return connected schema name
     */
    public String getDbName() {

        return strMngSchema;
    }

    /**
     * called only at the logout 
     */
    public void close() {
        if (mngClient != null) {
            mngClient.close();
            mngClient = null;
        }
    }

    /**
     * 
     * @param strTableName
     * @param strJsonData
     * @return newly inserted row key id
     * @throws Exception 
     */
    public String insertSingleRecord(String strTableName, String strJsonData) throws Exception {
        //System.out.println(primaryKey + "---------" + strTable);
        //_id field is reserved for primary key in mongodb, and that should be an unique value.
        //If you don't set anything to _id it ill automatically fill it with "MongoDB Id Object".
        //But you can put any unique info into that field.
        boolean bStatus = false;

        //mngDb.getMongo().getReplicaSetStatus().getMaster().
        // if collection doesn't exists, MongoDB will create it for you
        DBCollection dbTable = mngDb.getCollection(strTableName);

        // create a document to store key and value
        DBObject dbObject = (DBObject) JSON.parse(strJsonData);

        WriteResult wRes = dbTable.insert(dbObject);

        String result = ((ObjectId) dbObject.get("_id")).toString();
        if (result.length() > 0) {
            return result;
        } else {
            return null;
        }
    }

    /**
     * 
     * @param strTableName
     * @param strJsonListData
     * @return true on successfully insertion or false
     */
    public boolean insertMultiRecords(String strTableName, String strJsonListData) {

        DBCollection dbTable = mngDb.getCollection(strTableName);
        List<DBObject> dbObject = (List<DBObject>) JSON.parse(strJsonListData);

        dbTable.insert(dbObject);
        return true;
    }

    /**
     * 
     * @param strTable
     * @param strPrimaryKey
     * @return fetch result based on row key id
     * @throws Exception 
     */
    public String fetch(String strTable, String strPrimaryKey) throws Exception {
        DBCursor cursor = null;
        String row = null;
        DBCollection dbTable = mngDb.getCollection(strTable);
        BasicDBObject whereQuery = new BasicDBObject();
        whereQuery.put("_id", new ObjectId(strPrimaryKey));
        BasicDBObject fields = new BasicDBObject();

        cursor = dbTable.find(whereQuery);

            String lstRes = JSON.serialize(cursor);
            if(lstRes.equals("[ ]")){//for cheking empty result set.there should be a space inside bracket.
                lstRes = null;
            }
            cursor.close();
            return lstRes;
    }

    /**
     * 
     * @param strTable
     * @param columns
     * Map<String, Map<String, String>> ==> column: condition: value
     * map.put("col1", nul); map.put("col2", map1.put("equal", "amit"));
     * dao.fetchRowsByConditions("person", map);
     * @return recored in form of json list
     * @throws Exception 
     */
    public String fetchRowsByConditions(String strTable, Map<String, Map<String, String>> columns) throws Exception {
        //  int limit = 100;
        DBCollection dbTable = mngDb.getCollection(strTable);
        BasicDBObject searchObject = new BasicDBObject();
        List<BasicDBObject> lstSearchArgs = new ArrayList<BasicDBObject>();
        lstSearchArgs.clear();

        if (columns != null && !columns.isEmpty()) {

            Set keys = columns.keySet();
            Iterator it = keys.iterator();
            while (it.hasNext()) {
                String column = (String) it.next();

                if (column.equalsIgnoreCase("SORTINFOKEY") || column.equalsIgnoreCase("SORTORDERKEY")) {
                    continue;
                }

                Map<String, String> columnAttribute = columns.get(column);
                if (columnAttribute != null) {
                    String condition = columnAttribute.keySet().iterator().next();
                    String value = columnAttribute.get(condition);
                    if (condition.equalsIgnoreCase("equal")) {
                        lstSearchArgs.add(new BasicDBObject(column, value));

                    } else if (condition.equalsIgnoreCase("lt")) {

                        lstSearchArgs.add(new BasicDBObject(column, new BasicDBObject("$lt", value)));
                    } else if (condition.equalsIgnoreCase("lte")) {
                        lstSearchArgs.add(new BasicDBObject(column, new BasicDBObject("$lte", value)));
                    } else if (condition.equalsIgnoreCase("gt")) {
                        lstSearchArgs.add(new BasicDBObject(column, new BasicDBObject("$gt", value)));

                    } else if (condition.equalsIgnoreCase("gte")) {
                        lstSearchArgs.add(new BasicDBObject(column, new BasicDBObject("$gte", value)));
                    } else { // default
                        lstSearchArgs.add(new BasicDBObject(column, value));

                    }
                }
            }
            searchObject.put("$and", lstSearchArgs);
            DBCursor cursor = dbTable.find(searchObject);

            String lstRes = JSON.serialize(cursor);
            if(lstRes.equals("[ ]")){//for cheking empty result set.there should be a space inside bracket.
                lstRes = null;
            }else{
                sortLogicalResults(cursor, columns);
                lstRes = JSON.serialize(cursor);
            }
            cursor.close();
            return lstRes;
        } else {
            throw new Exception("Must specify a conditional column");
        }
    }

    /**
     *
     * @param strTable // mongodb table name
     * @param strDateColName // mongodb table's date column name
     * @param strDateFormat // date format string default:"dd-MM-yyyy"
     * @param strStartDate // start date search string
     * @param strEndDate // start date search string
     * @param columns // other columns conditional map, default:null
     * @return // records in json string format
     */
    public String fetchRowsByDatePeriods(String strTable, String strDateColName, String strDateFormat, String strStartDate, String strEndDate, Map<String, Map<String, String>> columns) {

        SimpleDateFormat formatter = new SimpleDateFormat(strDateFormat);
        String lstRes = "";

        QueryBuilder qbObj = QueryBuilder.start();
        long idtStart;
        long idtEnd;
        try {
            idtStart = formatter.parse(strStartDate).getTime();
            idtEnd = formatter.parse(strEndDate).getTime();
            qbObj.put(strDateColName).greaterThanEquals(idtStart + "");
            qbObj.put(strDateColName).lessThanEquals(idtEnd + "");

        } catch (ParseException ex) {
            logger.error(ex.getMessage());
        }

        if (columns != null && !columns.isEmpty()) {

            Set keys = columns.keySet();
            Iterator it = keys.iterator();
            while (it.hasNext()) {
                String strCol = (String) it.next();

                if (strCol.equalsIgnoreCase("SORTINFOKEY") || strCol.equalsIgnoreCase("SORTORDERKEY")) {
                    continue;
                }

                Map<String, String> columnAttribute = columns.get(strCol);
                if (columnAttribute != null) {
                    String condition = columnAttribute.keySet().iterator().next();
                    String value = columnAttribute.get(condition);
                    if (condition.equalsIgnoreCase("equal")) {
                        qbObj.and(new BasicDBObject(strCol, value));
                    } else if (condition.equalsIgnoreCase("lt")) {
                        qbObj.put(strCol).lessThan(value);
                    } else if (condition.equalsIgnoreCase("lte")) {
                        qbObj.put(strCol).lessThanEquals(value);
                    } else if (condition.equalsIgnoreCase("gt")) {
                        qbObj.put(strCol).greaterThan(value);

                    } else if (condition.equalsIgnoreCase("gte")) {
                        qbObj.put(strCol).greaterThanEquals(value);
                    }
                }
            }
        }

        DBObject query = qbObj.get();

        DBCollection dbTable = mngDb.getCollection(strTable);

        DBCursor cursor = dbTable.find(query);
            lstRes = JSON.serialize(cursor);
            if(lstRes.equals("[ ]")){//for cheking empty result set.there should be a space inside bracket.
                lstRes = null;
            }
            cursor.close();
            return lstRes;
        
    }

    /**
     * 
     * @param strTable
     * @param strPrimaryKey
     * @param json
     * @return update status tru or false
     * @throws Exception 
     */
    public boolean update(String strTable, String strPrimaryKey, String json) throws Exception {

        boolean status = false;

        DBCollection dbTable = mngDb.getCollection(strTable);

        BasicDBObject whereQuery = new BasicDBObject();
        whereQuery.put("_id", new ObjectId(strPrimaryKey));

        DBObject dbObject = (DBObject) JSON.parse(json);

        WriteResult result = dbTable.update(whereQuery, dbObject);

        return result.isUpdateOfExisting();

    }

    /**
     * 
     * @param cursor
     * @param conditions 
     */
    private void sortLogicalResults(DBCursor cursor, Map<String, Map<String, String>> conditions) {
        if (cursor.size() > 1) {

            try {
                Map<String, String> sortkeyinfo = conditions.get("SORTINFOKEY");
                Map<String, String> sortorderinfo = conditions.get("SORTORDERKEY");

                if ((Integer.parseInt(sortorderinfo.get("SORTORDER"))) == -1) {
                    cursor.sort(new BasicDBObject(sortkeyinfo.get("SORTKEY"), -1));
                } else {
                    cursor.sort(new BasicDBObject(sortkeyinfo.get("SORTKEY"), 1));
                }
            } catch (Exception ex) {
                //ignore and continue since there is no sort key and order specified.
            }
        }

    }

    /**
     * 
     * @param strTable
     * @param conditions
     * @param strLogic
     * @param fromIndex
     * @param limit
     * @return
     * @throws Exception 
     */
    public String fetchRowsLike(String strTable, Map<String, String> conditions, String strLogic, int fromIndex, int limit) throws Exception {

        DBCollection dbTable = mngDb.getCollection(strTable);
        BasicDBObject regexQuery = new BasicDBObject();
        List<BasicDBObject> lstObj = new ArrayList<BasicDBObject>();

        Set<String> keys = conditions.keySet();
        for (String key : keys) {
            if (key.equalsIgnoreCase("SORTKEY") || key.equalsIgnoreCase("SORTORDER")) {
                continue;
            }
            lstObj.add(new BasicDBObject(key, java.util.regex.Pattern.compile(conditions.get(key), Pattern.CASE_INSENSITIVE)));

        }
        if (strLogic != null && !strLogic.isEmpty()) {

            if (strLogic.equalsIgnoreCase("and")) {
                regexQuery.put("$and", lstObj);

            } else if (strLogic.equalsIgnoreCase("or")) {

                regexQuery.put("$or", lstObj);
            } else if (strLogic.equalsIgnoreCase("nor")) {
                regexQuery.put("$nor", lstObj);

            } else { // default AND logic
                regexQuery.put("and", lstObj);

            }

            DBCursor cursor = dbTable.find(regexQuery);
            String lstRes = JSON.serialize(cursor);
            if(lstRes.equals("[ ]")){//for cheking empty result set.there should be a space inside bracket.
                lstRes = null;
            }else{
                //Sort cursor results
                sortResults(cursor, conditions);
                if ((fromIndex > -1) && (limit > -1)) {
                    cursor.skip(fromIndex);
                    cursor.limit(limit);
                }
                lstRes = JSON.serialize(cursor);
            }
            cursor.close();
            return lstRes;
        } else {
            throw new Exception("Must specify a logic type to be applied eg : and , or ");
        }
    }

    /**
     * 
     * @param cursor
     * @param conditions 
     */
    private void sortResults(DBCursor cursor, Map<String, String> conditions) {
        if (cursor.size() > 1) {

            try {

                if ((Integer.parseInt(conditions.get("SORTORDER"))) == -1) {
                    cursor.sort(new BasicDBObject(conditions.get("SORTKEY"), -1));
                } else {
                    cursor.sort(new BasicDBObject(conditions.get("SORTKEY"), 1));
                }
            } catch (Exception ex) {
                //ignore and continue since there is no sort key and order specified.
            }
        }

    }
    
    /**
     * 
     * @param strTableName 
     * drop the collection from db.
     */
    public void detaleTableAllData(String strTableName){

        DBCollection dbTable = mngDb.getCollection(strTableName);
        dbTable.drop();

    }    
}
