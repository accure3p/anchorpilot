package com.accure.dms.manager;

import com.accure.dms.data.DMSInputHistory;
import com.accure.dms.data.DMSInputStock;
import com.accure.dms.dto.DMSBase;
import com.accure.dms.dto.DMSTxnHeader;
import com.accure.dms.dto.ItemLedger;
import com.accure.dms.dto.Ledger;
import com.accure.dms.dto.LineItem;
import com.accure.dms.dto.LineItemBatch;
import com.accure.dms.dto.Order;
import com.accure.dms.dto.Scheme;
import com.accure.dms.dto.Stock;
import com.accure.dms.dto.Zone;
import com.accure.dms.utils.Common;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mongodb.DBObject;
import com.mongodb.util.JSON;
import java.lang.reflect.Type;
import java.util.Date;
import java.util.List;
import org.apache.log4j.Logger;

/**
 *
 * @author Vinod
 */
public class DmsInputManager {

    private Logger logger = Logger.getLogger(DmsInputManager.class);

    /**
     * 
     * @return 
     */
    public DMSBase getDmsBaseData(){
        DMSBase tempObj = new DMSBase();
        tempObj.setCreatedate(new Date().getTime() + "");
        tempObj.setOrgid("101");
        tempObj.setTenantid("1001");
        tempObj.setStatus("Active");
        
        return tempObj;
    }
    
    /**
     * 
     * @param strJsonDataString
     * @param strTableName
     * @return 
     */
    public boolean InitializeDmsData(String strJsonDataString, String strTableName){
        DmsDbManager dbmgr = new DmsDbManager();
        // for Zone
        Type lstZoneType = new TypeToken<List<Zone>>() {
        }.getType();
        List<Zone> lstZoneObj = new Gson().fromJson(strJsonDataString, lstZoneType);;

        int lstSize = lstZoneObj.size();
        return false;
    }
    
    /**
     * 
     * @param strJsonDataString
     * @return 
     */
    public boolean processDMSInputData(String strJsonDataString) {
        String strMngOrgId = "1001";

        DmsDbManager dbmgr = new DmsDbManager();
        Type trType = new TypeToken<DMSInputHistory>() {
        }.getType();
        DMSInputHistory dmsInDataObj = new Gson().fromJson(strJsonDataString, trType);

        //do processing here
        dmsInDataObj.setCreatedate(new Date().getTime() + "");
        dmsInDataObj.setStatus("success");

        boolean bStatus = false;
        String strData = new Gson().toJson(dmsInDataObj, trType);
        String strId = dbmgr.SaveDtoJsonDataToMongodb("DMSInputHistory", strData);

        //do processing for other tables
        // for Order
        Type trOdrType = new TypeToken<Order>() {
        }.getType();
        Order odrObj = (Order) setTableDmsHeaders(dmsInDataObj.getOrder(), dmsInDataObj);

        //do processing here
        odrObj.setCreatedate(new Date().getTime() + "");

        odrObj.setStatus("success");

        //change the datestring to millisec...
        String strDate = odrObj.getTxndate();
        odrObj.setTxndate(Common.getDateMilliSecString(strDate));

        strData = new Gson().toJson(odrObj, trOdrType);
        String strMngOrderId = dbmgr.SaveDtoJsonDataToMongodb("Order", strData);

        // for Ledger
        Type trLgrType = new TypeToken<Ledger>() {
        }.getType();
        List<Ledger> lstLgrObj = dmsInDataObj.getLedgers();

        int lstSize = lstLgrObj.size();
        for (int i = 0; i < lstSize; i++) {
            Ledger lgrObj = (Ledger) setTableDmsHeaders(lstLgrObj.get(i), dmsInDataObj);

            //do processing here
            //set DMSBase members
            lgrObj.setCreatedate(new Date().getTime() + "");
            lgrObj.setStatus("success");

            //todo          
            lgrObj.setMngOrgid(strMngOrgId);

            lgrObj.setMngOrderid(strMngOrderId);

            strData = new Gson().toJson(lgrObj, trLgrType);
            strId = dbmgr.SaveDtoJsonDataToMongodb("Ledger", strData);
        }

        // for ItemLedger
        Type trItemLgrType = new TypeToken<ItemLedger>() {
        }.getType();
        List<ItemLedger> lstItemLgrObj = dmsInDataObj.getItemledgers();
        lstSize = lstItemLgrObj.size();
        for (int i = 0; i < lstSize; i++) {
            ItemLedger itemLgrObj = (ItemLedger) setTableDmsHeaders(lstItemLgrObj.get(i), dmsInDataObj);

            //do processing here
            //set DMSBase members
            itemLgrObj.setCreatedate(new Date().getTime() + "");
            itemLgrObj.setStatus("success");

            //todo          
            itemLgrObj.setMngOrgid(strMngOrgId);
            itemLgrObj.setMngOrderid(strMngOrderId);

            strData = new Gson().toJson(itemLgrObj, trItemLgrType);
            strId = dbmgr.SaveDtoJsonDataToMongodb("ItemLedger", strData);
        }

        // for LineItem
        Type trLItemType = new TypeToken<LineItem>() {
        }.getType();
        List<LineItem> lstLItemObj = dmsInDataObj.getLineitems();
        lstSize = lstLItemObj.size();
        for (int i = 0; i < lstSize; i++) {
            LineItem lItemObj = (LineItem) setTableDmsHeaders(lstLItemObj.get(i), dmsInDataObj);

            //do processing here
            //set DMSBase members
            lItemObj.setCreatedate(new Date().getTime() + "");
            lItemObj.setStatus("success");

            strData = new Gson().toJson(lItemObj, trLItemType);
            strId = dbmgr.SaveDtoJsonDataToMongodb("LineItem", strData);
        }

        // for LineItemBatch
        Type trLItemBatchType = new TypeToken<LineItemBatch>() {
        }.getType();
        List<LineItemBatch> lstLItemBatchObj = dmsInDataObj.getLineitembatches();
        lstSize = lstLItemBatchObj.size();
        for (int i = 0; i < lstSize; i++) {
            LineItemBatch lItemBatchObj = (LineItemBatch) setTableDmsHeaders(lstLItemBatchObj.get(i), dmsInDataObj);

            //do processing here
            //set DMSBase members
            lItemBatchObj.setCreatedate(new Date().getTime() + "");
            lItemBatchObj.setStatus("success");

            //change the datestring to millisec...
            strDate = lItemBatchObj.getExpirydate();
            lItemBatchObj.setExpirydate(Common.getDateMilliSecString(strDate));

            strDate = lItemBatchObj.getOrderduedate();
            lItemBatchObj.setOrderduedate(Common.getDateMilliSecString(strDate));

            strData = new Gson().toJson(lItemBatchObj, trLItemBatchType);
            strId = dbmgr.SaveDtoJsonDataToMongodb("LineItemBatch", strData);
        }

        // for Scheme
        Type trSchemeType = new TypeToken<Scheme>() {
        }.getType();
        List<Scheme> lstSchemeObj = dmsInDataObj.getSchemes();
        lstSize = lstSchemeObj.size();
        for (int i = 0; i < lstSize; i++) {
            Scheme schemeObj = (Scheme) setTableDmsHeaders(lstSchemeObj.get(i), dmsInDataObj);

            //do processing here
            //set DMSBase members
            schemeObj.setCreatedate(new Date().getTime() + "");
            schemeObj.setStatus("success");

            schemeObj.setMngOrderid(strMngOrderId);

            strData = new Gson().toJson(schemeObj, trSchemeType);
            strId = dbmgr.SaveDtoJsonDataToMongodb("Scheme", strData);
        }

        if ((strId != null) && (!strId.isEmpty())) {
            bStatus = true;
        }

        return bStatus;
    }

    /**
     * 
     * @param tblObj
     * @param dmsInDataObj
     * @return 
     */
    private DMSTxnHeader setTableDmsHeaders(DMSTxnHeader tblObj, DMSInputHistory dmsInDataObj) {
        tblObj.setOrgid(dmsInDataObj.getOrgid());
        tblObj.setUserid(dmsInDataObj.getUserid());
        tblObj.setOrderid(dmsInDataObj.getOrderid());

        tblObj.setVersion(dmsInDataObj.getVersion());
        tblObj.setTimezone(dmsInDataObj.getTimezone());
        tblObj.setTxnid(dmsInDataObj.getTxnid());
        tblObj.setErrormsgqid(dmsInDataObj.getErrormsgqid());

        tblObj.setFuture1(dmsInDataObj.getFuture1());
        tblObj.setFuture2(dmsInDataObj.getFuture2());
        tblObj.setFuture3(dmsInDataObj.getFuture3());
        return tblObj;
    }

    /**
     * 
     * @param strJsonDataString
     * @return 
     */
    public boolean fillStockData(String strJsonDataString) {
        boolean bStatus = false;
        String strId = "";

        DmsDbManager dbmgr = new DmsDbManager();

        TypeToken inStockToken = new TypeToken<DMSInputStock>() {
        };
        DMSInputStock dmsInputStockObj = new Gson().fromJson(strJsonDataString, inStockToken.getType());

        List<Stock> lstStockObj = dmsInputStockObj.getStocks();

        int lstSize = lstStockObj.size();
        Type trType = new TypeToken<Stock>() {
        }.getType();

        for (int i = 0; i < lstSize; i++) {
            Stock stkObj = lstStockObj.get(i);
            stkObj.setCreatedate(new Date().getTime() + "");
            stkObj.setStatus("success");

            String strData = new Gson().toJson(stkObj, trType);
            strId = dbmgr.SaveDtoJsonDataToMongodb("Stock", strData);
        }
        if ((strId != null) && (!strId.isEmpty())) {
            bStatus = true;
        }

        return bStatus;
    }

    /**
     * 
     * @param arJsonData
     * @param obj2
     * @return 
     */
    public String addDmsHeaderToJsonData(org.json.JSONArray arJsonData, DBObject obj2) {
        String strData = "";
        // convert JSON to DBObject directly
        DBObject dbObject = (DBObject) JSON.parse(arJsonData.toString());

        int iCount = dbObject.keySet().size();
        for (int i = 0; i < iCount; i++) {
            DBObject obj1 = (DBObject) dbObject.get(i + "");
            obj1.putAll(obj2);
        }
        
        strData = JSON.serialize(dbObject);
        return strData;
    }
}
