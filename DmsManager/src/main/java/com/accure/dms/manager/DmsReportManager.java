package com.accure.dms.manager;

import com.accure.dms.dto.LineItem;
import com.accure.dms.dto.Order;
import com.accure.dms.dto.Stock;
import com.accure.dms.utils.Common;
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
public class DmsReportManager {
    private Logger logger = Logger.getLogger(DmsReportManager.class);

    /**
     * 
     * @param strStartDate
     * @param strEndDate
     * @param strPartyName
     * @return 
     */
    public String getOrderDeliveryReportData(String strStartDate, String strEndDate, String strPartyName) {
        DmsDbManager dbmgr = new DmsDbManager();
//        get all orders for this period

        String strPeriodicOrders = dbmgr.getAllPeriodicOrders(strStartDate, strEndDate, strPartyName);
        // for Orders

        Type lstOdrType = new TypeToken<List<Order>>() {
        }.getType();

        List<Order> lstOdrObj = new Gson().fromJson(strPeriodicOrders, lstOdrType);
        int lstSize = lstOdrObj.size();
        logger.info("order rec size " + lstSize);

        List<Map<String, String>> lstRptMap = new ArrayList<Map<String, String>>();

// iterate for each order
        for (int i = 0; i < lstSize; i++) {
            Order odrObj = lstOdrObj.get(i);

            //get order details
            strPartyName = odrObj.getCustomername();
            String strOrderDateNum = odrObj.getTxndate();
            String strOrderDate = Common.getDateFromMilliSec(strOrderDateNum);

            String strOrderRef = odrObj.getOrderid();
            String strMngOrderId = ((Map<String, String>) odrObj.getId()).get("$oid");

            //get invoice details
            String strInv = dbmgr.getOrderInvoiceDetail(strOrderRef);
            List<Order> lstInvObj = new Gson().fromJson(strInv, lstOdrType);

            Order invObj = lstInvObj.get(0);
            String strDeliveryDateNum = invObj.getTxndate();
            String strDeliveryDate = Common.getDateFromMilliSec(strDeliveryDateNum);
            String strTxnId = invObj.getTxnid();

            //get invoice line items details
            String strLineItems = dbmgr.getInvoiceLineItemsDetail(strTxnId);

            Type lstLineItemType = new TypeToken<List<LineItem>>() {
            }.getType();
            List<LineItem> lstInvLineItemObj = new Gson().fromJson(strLineItems, lstLineItemType);
            int lItemCount = lstInvLineItemObj.size();
            logger.info("ordered item rec size " + lItemCount);

            for (int j = 0; j < lItemCount; j++) {
                LineItem invLineItemObj = lstInvLineItemObj.get(j);
                Map<String, String> rptMap = new HashMap<String, String>();
                rptMap.put("Party Name", strPartyName);
                rptMap.put("Order Date", strOrderDate);
                rptMap.put("Delivery Date", strDeliveryDate);

                //get lineItem details
                String strItemCode = invLineItemObj.getItemcode();
                String strItemName = invLineItemObj.getItemname();
                String strOrderQty = invLineItemObj.getActqtypkgunits();
                String strDelveredQty = invLineItemObj.getBilledqtypkgunits();
                String strPkgUnit = invLineItemObj.getPkgunit();

                rptMap.put("Item Id", strItemCode);
                rptMap.put("Item Name", strItemName);
                rptMap.put("Order Qty", strOrderQty);
                rptMap.put("Delvered Qty", strDelveredQty);
                rptMap.put("Pkg Unit", strPkgUnit);

                int iday = getNoOfDays(strOrderDateNum, strDeliveryDateNum);
                rptMap.put("No Of Days", iday + "");

                lstRptMap.add(rptMap);
            }
        }

        String strLstRpt = new Gson().toJson(lstRptMap);

        return strLstRpt;
    }


    /**
     * 
     * @param strStartDate
     * @param strEndDate
     * @return 
     */
    public String getSalesOrderReportData(String strStartDate, String strEndDate) {
        //get all orderid
        DmsDbManager dbmgr = new DmsDbManager();

        //get all orders for this period
        String strPartyName = "";
        String strPeriodicOrders = dbmgr.getAllPeriodicOrders(strStartDate, strEndDate, strPartyName);
        
        // for Orders
        Type lstOdrType = new TypeToken<List<Order>>() {
        }.getType();

        List<Order> lstOdrObj = new Gson().fromJson(strPeriodicOrders, lstOdrType);
        int lstSize = lstOdrObj.size();
        logger.info("Order rec size " + lstSize);

        List<Map<String, String>> lstRptMap = new ArrayList<Map<String, String>>();

        // iterate for each order
        for (int i = 0; i < lstSize; i++) {
            Order odrObj = lstOdrObj.get(i);
            //get order details
            strPartyName = odrObj.getCustomername();
            String strOrderDateNum = odrObj.getTxndate();
            String strOrderDate = Common.getDateFromMilliSec(strOrderDateNum);

            String strOrderRef = odrObj.getOrderid();
            String strMngOrderId = ((Map<String, String>) odrObj.getId()).get("$oid");

            //get all items for this order
            String strOrderedItems = dbmgr.getAllOrderedItemsDetail(strOrderRef);
            Type lstLineItemType = new TypeToken<List<LineItem>>() {
            }.getType();
            List<LineItem> lstLineItemObj = new Gson().fromJson(strOrderedItems, lstLineItemType);
            int iCount = lstLineItemObj.size();
            logger.info("LineItem rec size " + iCount);

            for (int j = 0; j < iCount; j++) {
                Map<String, String> rptMap = new HashMap<String, String>();
                LineItem lineItemObj = lstLineItemObj.get(j);

                //get lineItem details
                String strItemId = lineItemObj.getItemcode();
                String strItemName = lineItemObj.getItemname();
                String strOrderQty = lineItemObj.getActqtypkgunits();
                String strPkgUnit = lineItemObj.getPkgunit();

                String strStockData = dbmgr.getItemInStockQty(strItemId);
                Type lstStockType = new TypeToken<List<Stock>>() {
                }.getType();
                List<Stock> lstStockObj = new Gson().fromJson(strStockData, lstStockType);
                int iStockCount = lstStockObj.size();
                logger.info("Stock rec size " + iStockCount);
                Stock stockObj = lstStockObj.get(0);
                String strItemInStockQty = stockObj.getInstockqty();
                logger.info("Item InStock Qty" + strItemInStockQty);

                rptMap.put("Party Name", strPartyName);
                rptMap.put("Order Date", strOrderDate);
                rptMap.put("Order Id", strOrderRef);
                rptMap.put("Item Id", strItemId);
                rptMap.put("Item Name", strItemName);
                rptMap.put("Order Qty", strOrderQty);
                rptMap.put("Order Pkg Unit", strPkgUnit);
                rptMap.put("Item InStock Qty", strItemInStockQty);

                lstRptMap.add(rptMap);
            }
        }

        List<Map<String, String>> lstMap = getMergedItemsSalesData(lstRptMap);
        String strLstRpt = new Gson().toJson(lstMap);
        return strLstRpt;
    }

    /**
     * 
     * @param strStartDate
     * @param strEndDate
     * @param strPartyName
     * @return 
     */
    public String getInventoyTurnaroundReportData(String strStartDate, String strEndDate, String strPartyName) {
        DmsDbManager dbmgr = new DmsDbManager();

        String strPeriodicOrders = dbmgr.getAllPeriodicOrders(strStartDate, strEndDate, strPartyName);

        Type lstOdrType = new TypeToken<List<Order>>() {
        }.getType();

        List<Order> lstOdrObj = new Gson().fromJson(strPeriodicOrders, lstOdrType);
        int lstSize = lstOdrObj.size();
        logger.info("rec size " + lstSize);
        List<Map<String, String>> lstRptMap = new ArrayList<Map<String, String>>();

        // iterate for each order
        for (int i = 0; i < lstSize; i++) {
            Map<String, String> rptMap = new HashMap<String, String>();
            Order odrObj = lstOdrObj.get(i);

            //get order details
            strPartyName = odrObj.getCustomername();
            String strOrderDateNum = odrObj.getTxndate();
            String strOrderDate = Common.getDateFromMilliSec(strOrderDateNum);

            String strOrderRef = odrObj.getOrderid();
            String strMngOrderId = ((Map<String, String>) odrObj.getId()).get("$oid");

            rptMap.put("Party Name", strPartyName);
            rptMap.put("Order Date", strOrderDate);

            lstRptMap.add(rptMap);
        }

        String strLstRpt = new Gson().toJson(lstRptMap);
        return strLstRpt;
    }

    /**
     * 
     * @param strOrderDate
     * @param strDeliveryDate
     * @return 
     */
    public int getNoOfDays(String strOrderDate, String strDeliveryDate) {

        int i = (int) (Long.valueOf(strDeliveryDate) - Long.valueOf(strOrderDate)) / (1000 * 60 * 60 * 24);
        return i;
    }

    /**
     * 
     * @param lstRptMap
     * @return 
     */
    public List<Map<String, String>> getMergedItemsSalesData(List<Map<String, String>> lstRptMap) {
        Map<String, Map<String, String>> tmpMap = new HashMap<String, Map<String, String>>();
        List<Map<String, String>> lstTempMap = new ArrayList<Map<String, String>>();

        int iCount = lstRptMap.size();
        logger.info("LineItem size " + iCount);

        for (int j = 0; j < iCount; j++) {
            Map<String, String> mtemp = lstRptMap.get(j);
            String strTemp = mtemp.get("Item Id");

            if (tmpMap.containsKey(strTemp)) {
                int iOldQty = Integer.valueOf(tmpMap.get(strTemp).get("Order Qty"));
                int iNewQty = iOldQty + Integer.valueOf(mtemp.get("Order Qty"));
                logger.info("iNewQty " + iNewQty);

                //update Order Qty
                tmpMap.get(strTemp).put("Order Qty", iNewQty + "");
            } else {
                tmpMap.put(strTemp, mtemp);
            }
        }

        for (Map.Entry<String, Map<String, String>> entry : tmpMap.entrySet()) {
            lstTempMap.add(entry.getValue());
        }

        return lstTempMap;
    }
}
