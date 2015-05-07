package com.accure.dms.manager;

import com.accure.dms.dto.LineItem;
import com.accure.dms.dto.Stock;
import com.accure.dms.utils.DmsConstants;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;

/**
 *
 * @author Vinod
 */
public class DmsStockManager {
    private static Logger logger = Logger.getLogger(DmsStockManager.class);

    /**
     * view all Item list
     * @param orgId
     * @return 
     */
    public String viewAllItem(String orgId) {
        if (orgId.equals("") || orgId == null) {
            return null;
        }
        HashMap<String, String> condition = new HashMap<String, String>();
        condition.put("orgid", orgId);
        condition.put("status", "TRUE");
        String resultJson = new DmsDbManager().getDetailsByCondition(DmsConstants.ITEMMASTER_TABLE, condition);

        return resultJson;
    }
    /**
     * view all tax list
     * @param orgId
     * @return 
     */
    public String viewAllTax(String orgId) {
        if (orgId.equals("") || orgId == null) {
            return null;
        }
        HashMap<String, String> condition = new HashMap<String, String>();
        condition.put("orgid", orgId);
        condition.put("status", "active");
        String resultJson = new DmsDbManager().getDetailsByCondition(DmsConstants.TAXMASTER_TABLE, condition);

        return resultJson;
    }

    /**
     * view all Stock list
     * @param strOrgId
     * @return 
     */
    public String viewStockPosition(String strOrgId) {
        if ((strOrgId == null) || strOrgId.equals("")) {
            return null;
        }
        HashMap<String, String> condition = new HashMap<String, String>();
        condition.put("orgid", strOrgId);
        condition.put("status", "active");
        String resultJson = new DmsDbManager().getDetailsByCondition(DmsConstants.STOCK_TABLE, condition);

        return resultJson;
    }


    /**
     * 
     * @param strOrgId
     * @param strOrderLineItemJson
     * @return 
     */
    public boolean updateOrderStockPosition(String strOrgId, String strOrderLineItemJson) {
        boolean bStatus = false;
        String strId = "";
        String strStockList = viewStockPosition(strOrgId);

        Type lstStockType = new TypeToken<List<Stock>>() {
        }.getType();

        List<Stock> lstFetchStock = new Gson().fromJson(strStockList, lstStockType);

        HashMap<String, Stock> lstFetchStockMap = new HashMap<String, Stock>();
        int iCount = lstFetchStock.size();
        for (int i = 0; i < iCount; i++) {
            lstFetchStockMap.put(lstFetchStock.get(i).getItemcode(), lstFetchStock.get(i));
        }

        Type lstLineItemType = new TypeToken<List<LineItem>>() {
        }.getType();

        List<LineItem> lstLineItemObj = new Gson().fromJson(strOrderLineItemJson, lstLineItemType);

        iCount = lstLineItemObj.size();
        DmsDbManager dbmgr = new DmsDbManager();

        Type StockType = new TypeToken<Stock>() {
        }.getType();
        String strJsonData = "";
        for (int i = 0; i < iCount; i++) {
            LineItem lineItemObj = lstLineItemObj.get(i);

            Stock fetchStockObj = lstFetchStockMap.get(lineItemObj.getItemcode());
            if (fetchStockObj != null) {
                int iBookedQty = 0;
                String strBookedqty = fetchStockObj.getBookedqty();
                if ((strBookedqty != null) && (!strBookedqty.equals(""))) {
                    iBookedQty = Integer.parseInt(strBookedqty);
                }
                int iOrderQty = Integer.parseInt(lineItemObj.getActqtypkgunits());
                iBookedQty += iOrderQty;
                fetchStockObj.setBookedqty(iBookedQty + "");
                fetchStockObj.setUpdatedate(new Date().getTime() + "");

                strId = ((Map<String, String>) fetchStockObj.getId()).get("$oid");
                strJsonData = new Gson().toJson(fetchStockObj, StockType);
                bStatus = dbmgr.update(DmsConstants.STOCK_TABLE, strId, strJsonData);
                if (!bStatus) {
                    logger.error("Update order stock failed for Item Id : " + strId);
                }
            }
        }

        return bStatus;
    }

    /**
     * 
     * @param strOrgId
     * @param strInvoiceLineItemJson
     * @return 
     */
    public boolean updateInvoiceStockPosition(String strOrgId, String strInvoiceLineItemJson) {

        boolean bStatus = false;
        String strId = "";
        String strStockList = viewStockPosition(strOrgId);

        Type lstStockType = new TypeToken<List<Stock>>() {
        }.getType();

        List<Stock> lstFetchStock = new Gson().fromJson(strStockList, lstStockType);

        HashMap<String, Stock> lstFetchStockMap = new HashMap<String, Stock>();
        int iCount = lstFetchStock.size();
        for (int i = 0; i < iCount; i++) {
            lstFetchStockMap.put(lstFetchStock.get(i).getItemcode(), lstFetchStock.get(i));
        }

        Type lstLineItemType = new TypeToken<List<LineItem>>() {
        }.getType();

        List<LineItem> lstLineItemObj = new Gson().fromJson(strInvoiceLineItemJson, lstLineItemType);

        iCount = lstLineItemObj.size();
        DmsDbManager dbmgr = new DmsDbManager();

        Type StockType = new TypeToken<Stock>() {
        }.getType();
        String strJsonData = "";
        for (int i = 0; i < iCount; i++) {
            LineItem lineItemObj = lstLineItemObj.get(i);

            Stock fetchStockObj = lstFetchStockMap.get(lineItemObj.getItemcode());
            if (fetchStockObj != null) {
                int iBookedQty = 0;
                String strBookedQty = fetchStockObj.getBookedqty();
                if ((strBookedQty != null) && (!strBookedQty.equals(""))) {
                    iBookedQty = Integer.parseInt(strBookedQty);
                }

                int iInstockQty = Integer.parseInt(fetchStockObj.getInstockqty());
                int iInvoiceQty = Integer.parseInt(lineItemObj.getBilledqtypkgunits());
                iInstockQty -= iInvoiceQty;
                iBookedQty -= iInvoiceQty;
                fetchStockObj.setInstockqty(iInstockQty + "");
                fetchStockObj.setBookedqty(iBookedQty + "");
                fetchStockObj.setUpdatedate(new Date().getTime() + "");

                strId = ((Map<String, String>) fetchStockObj.getId()).get("$oid");
                strJsonData = new Gson().toJson(fetchStockObj, StockType);
                bStatus = dbmgr.update(DmsConstants.STOCK_TABLE, strId, strJsonData);
                if (!bStatus) {
                    logger.error("Update order stock failed for Item Id : " + strId);
                }
            }
        }
        return bStatus;
    }
}
