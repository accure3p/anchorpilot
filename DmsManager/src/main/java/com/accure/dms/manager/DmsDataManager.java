package com.accure.dms.manager;

import com.accure.dms.dto.DMSBase;
import com.accure.dms.utils.Common;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mongodb.DBObject;
import com.mongodb.util.JSON;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import org.apache.log4j.Logger;
import org.apache.commons.io.FileUtils;
import org.json.CDL;
import org.json.JSONArray;
import org.json.JSONException;

public final class DmsDataManager {

    private static Logger logger = Logger.getLogger(DmsDataManager.class);

    public DmsDataManager() {
    }

    /**
     * 
     * @return 
     */
    public boolean InitializeDmsApplication() {
        boolean bFlag = false;
        //initialize application with csv Bulk Upload of Files;
        String strCsvFolderPath = Common.getPropObj().getProperty("csv-bulk-upload-folder-path").toString();
        File pathName = new File(strCsvFolderPath); // gets the element at the index of the List 
        String[] fileNames = pathName.list();

        String strParsedData = "";
        //iterate for each table data
        for (int i = 0; i < fileNames.length; i++) {
            String strTableName = fileNames[i].substring(0, (fileNames[i].length() - 4));
        
            String strCsvFilePath = pathName.getAbsolutePath() + "/" + fileNames[i];
            
            
            strParsedData = getParsedJsonFromExcel(strCsvFilePath, strTableName);

            bFlag = new DmsDbManager().insertMultiRecordsJsonData(strTableName, strParsedData);
        }
        return bFlag;
    }

    /**
     * 
     * @param strJsonArrayData
     * @return 
     */
    public String getCsvStringFromJsonData(String strJsonArrayData) {
        String csvData = "";
        try {
            JSONArray docs = new JSONArray(strJsonArrayData);
            csvData = CDL.toString(docs);

        } catch (JSONException ex) {
            logger.error(ex);
        }

        return csvData;
    }

    /**
     * 
     * @param strJsonArrayData
     * @param strCsvFilePath
     * @return 
     */
    public boolean createCsvFileFromJsonData(String strJsonArrayData, String strCsvFilePath) {
        boolean bStatus = false;
        try {

            JSONArray docs = new JSONArray(strJsonArrayData);
            File file = new File(strCsvFilePath);
            String csv = CDL.toString(docs);

            FileUtils.writeStringToFile(file, csv);
            bStatus = true;
        } catch (IOException ex) {
            logger.error(ex);
        } catch (JSONException ex) {
            logger.error(ex);
        }

        return bStatus;
    }

    /**
     * 
     * @param strJsonFile
     * @return 
     */
    public String createDmsJsonFromJson(String strJsonFile) {
        String strJsonData = "";
        try {
            logger.info("reading the json file...");
            InputStream inStreamObj = new FileInputStream(new File(
                    strJsonFile));
            BufferedReader bfrRdr = new BufferedReader(new InputStreamReader(
                    inStreamObj));
            StringBuilder strbldr = new StringBuilder();
            String line;
            while ((line = bfrRdr.readLine()) != null) {
                strbldr.append(line);
            }
            strJsonData = strbldr.toString();
            bfrRdr.close();
            inStreamObj.close();
        } catch (FileNotFoundException ex) {
            logger.error("Error: " + ex.getMessage());
        } catch (IOException ex) {
            logger.error("Error: " + ex.getMessage());
        }
        return strJsonData;
    }

    /**
     * 
     * @param strCsvFilePath
     * @param strTableName
     * @return 
     */
    public String getParsedJsonFromExcel(String strCsvFilePath, String strTableName) {

        JSONArray arJsonData = createJsonArrayFromCsvFile(strCsvFilePath);
        DMSBase tempObj = new DmsInputManager().getDmsBaseData();

        Type trType = new TypeToken<DMSBase>() {
        }.getType();

        String strData = new Gson().toJson(tempObj, trType);
        DBObject obj2 = (DBObject) JSON.parse(strData);
        String strJsonData = new DmsInputManager().addDmsHeaderToJsonData(arJsonData, obj2);
        return strJsonData;
    }

    /**
     * 
     * @param strCsvDataString
     * @return 
     */
    public String createJsonFromCsvDataString(String strCsvDataString) {
        org.json.JSONArray arJsonData = null;
        try {
            arJsonData = CDL.toJSONArray(strCsvDataString);
        } catch (JSONException ex) {
            logger.error("Error: " + ex.getMessage());
        }
        return arJsonData.toString();
    }

    /**
     * 
     * @param strCsvFile
     * @return 
     */
    public JSONArray createJsonArrayFromCsvFile(String strCsvFile) {

        org.json.JSONArray arJsonData = null;
        try {
            logger.info("reading the json file...");
            InputStream inStreamObj = new FileInputStream(new File(
                    strCsvFile));
            BufferedReader bfrRdr = new BufferedReader(new InputStreamReader(
                    inStreamObj));
            StringBuilder strbldr = new StringBuilder();
            String line;
            while ((line = bfrRdr.readLine()) != null) {
                strbldr.append(line);
                strbldr.append("\n");
            }
            String strCsvData = strbldr.toString();
            bfrRdr.close();
            inStreamObj.close();
            arJsonData = CDL.toJSONArray(strCsvData);

        } catch (FileNotFoundException ex) {
            logger.error("Error: " + ex.getMessage());
        } catch (IOException ex) {
            logger.error("Error: " + ex.getMessage());
        } catch (JSONException ex) {
            logger.error("Error: " + ex.getMessage());
        }

        return arJsonData;
    }

    /**
     * 
     * @param strCsvFile
     * @return 
     */
    public String createJsonDataFromCsvFile(String strCsvFile) {

        String strJsonData = "";
        try {
            logger.info("reading the json file...");
            InputStream inStreamObj = new FileInputStream(new File(
                    strCsvFile));
            BufferedReader bfrRdr = new BufferedReader(new InputStreamReader(
                    inStreamObj));
            StringBuilder strbldr = new StringBuilder();
            String line;
            while ((line = bfrRdr.readLine()) != null) {
                strbldr.append(line);
                strbldr.append("\n");
            }
            String strCsvData = strbldr.toString();
            bfrRdr.close();
            inStreamObj.close();
            org.json.JSONArray arJsonData = CDL.toJSONArray(strCsvData);

            strJsonData = arJsonData.toString();
        } catch (FileNotFoundException ex) {
            logger.error("Error: " + ex.getMessage());
        } catch (IOException ex) {
            logger.error("Error: " + ex.getMessage());
        } catch (JSONException ex) {
            logger.error("Error: " + ex.getMessage());
        }

        return strJsonData;
    }

}
