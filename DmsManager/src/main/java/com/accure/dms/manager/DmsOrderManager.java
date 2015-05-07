package com.accure.dms.manager;

import com.accure.dms.dto.LineItem;
import com.accure.dms.dto.Order;
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
public class DmsOrderManager {
    private static Logger logger = Logger.getLogger(DmsOrderManager.class);

    /**
     * search item list..
     * @param searchKey
     * @param input_sindex
     * @param input_limit
     * @param org_id
     * @return
     * @throws Exception 
     */
    public String searchItem(String searchKey, String input_sindex, String input_limit, String org_id) throws Exception {
        // check input parameter
        if (searchKey == null || searchKey.isEmpty() || input_sindex == null || input_sindex.isEmpty()
                || input_limit == null || input_limit.isEmpty() || org_id == null || org_id.isEmpty()) {
            return null;
        }
        String result = null;
        Map<String, String> smap = new HashMap<String, String>();
        Type type = new TypeToken<List<LineItem>>() {
        }.getType();
        int sindex = 0;
        int limit = 0;
        if (input_sindex != null && input_limit != null) {
            sindex = Integer.parseInt(input_sindex);
            limit = Integer.parseInt(input_limit);
        }
        if ((searchKey != null || !searchKey.equals("")) && searchKey.length() >= 0) {
            searchKey = "(^" + searchKey + "|\\W" + searchKey + ")";
            smap.put("description", searchKey);
            smap.put("orgid", org_id);
            smap.put("type", "DS");
            smap.put(DmsConstants.SORTKEY, DmsConstants.NAME);
            smap.put(DmsConstants.SORTORDER, DmsConstants.SORTORDER_TYPE);

            if (limit == 0 && sindex == 0) {
                limit = 10;
                // fetch item from data base
                result = new DmsDbManager().fetchDetailsLike(DmsConstants.ITEMMASTER_TABLE, smap, DmsConstants.LOGICAL_AND, sindex, limit);

            } else {
                // fetch item from data base
                result = new DmsDbManager().fetchDetailsLike(DmsConstants.ITEMMASTER_TABLE, smap, DmsConstants.LOGICAL_AND, sindex, limit);
            }
        }
        return result;
    }

    /**
     * get tax percentage....
     * @param orgId
     * @param taxType
     * @return 
     */
    public String getTaxPercentage(String orgId, String taxType) {
        if (orgId == null || orgId.equals("") || taxType == null || taxType.equals("")) {
            return null;
        }
        HashMap<String, String> condition = new HashMap<String, String>();
        condition.put("orgid", orgId);
        condition.put("taxgroup", taxType);
        condition.put("status", "active");
        String resultJson = new DmsDbManager().getDetailsByCondition(DmsConstants.TAXMASTER_TABLE, condition);
        if (resultJson.equals("") || resultJson == null) {
            return null;
        } else {
            return resultJson;
        }
    }

    /**
     * 
     * @param strOrderJson
     * @param strLineItemJson
     * @param bIsFailedOrder
     * @param strCreatedBy
     * @return 
     */
    public boolean createOrder(String strOrderJson, String strLineItemJson, boolean bIsFailedOrder, String strCreatedBy) {
        if ((strOrderJson == null) || strOrderJson.equals("")
                || (strLineItemJson == null)) {
            return false;
        }

        boolean bFlag = false;
        String strIdData = saveOrderData(strOrderJson, bIsFailedOrder, strCreatedBy);
        String[] arstrIdData = strIdData.split(",");
        String strOrgId = arstrIdData[0];
        String strOrderId = arstrIdData[1];

        if ((strOrderId != null) && (!strOrderId.equals(""))) {
            bFlag = true;
        }

        if (!bIsFailedOrder) {

            if (strLineItemJson.equals("")) {
                return false;
            }
            bFlag = saveOrderLineItemData(strOrderId, strLineItemJson);
            if (bFlag) {
                bFlag = new DmsStockManager().updateOrderStockPosition(strOrgId, strLineItemJson);
            }
        }
        return bFlag;
    }

    public String saveOrderData(String strOrderJson, boolean bIsFailedOrder, String strCreatedBy) {

        Type type = new TypeToken<Order>() {
        }.getType();

        Order orderDto = new Gson().fromJson(strOrderJson, type);
        String strOrgId = orderDto.getOrgid();
        orderDto.setCreatedate((new Date()).getTime() + "");
        if (bIsFailedOrder) {
            orderDto.setStatus("Failed");
        } else {
            orderDto.setStatus("Pending");
        }
        orderDto.setType("SalesOrder");
        orderDto.setReference("");
        orderDto.setDataflag("TRUE");

        orderDto.setCreatedby(strCreatedBy);

        type = new TypeToken<Order>() {
        }.getType();
        String srtOrderData = new Gson().toJson(orderDto, type);
        String strOrderId = new DmsDbManager().save(DmsConstants.ORDER_TABLE, srtOrderData);

        return (strOrgId + "," + strOrderId);
    }

    /**
     * 
     * @param strOrderId
     * @param strLineItemJson
     * @return 
     */
    public boolean saveOrderLineItemData(String strOrderId, String strLineItemJson) {

        Type type = new TypeToken<List<LineItem>>() {
        }.getType();

        List<LineItem> lstLineItems = new Gson().fromJson(strLineItemJson, type);
        int iCount = lstLineItems.size();
        for (int i = 0; i < iCount; i++) {
            LineItem lineItemDto = lstLineItems.get(i);
            lineItemDto.setBilledqtypkgunits("0");
            lineItemDto.setReference(strOrderId);
            lineItemDto.setCreatedate((new Date()).getTime() + "");
            lineItemDto.setStatus("active");
            lineItemDto.setType("SalesOrder");
            lineItemDto.setDataflag("TRUE");

        }

        String srtLineItemData = new Gson().toJson(lstLineItems, type);
        boolean bFlag = new DmsDbManager().insertMultiRecordsJsonData(DmsConstants.LINEITEM_TABLE, srtLineItemData);
        return bFlag;
    }

    /**
     * 
     * @param orgId
     * @param userId
     * @return 
     */
    public String getPendingOrOpenOrdersList(String orgId, String userId) {
        if ((orgId == null) || orgId.equals("") || (userId == null) || userId.equals("")) {
            return null;
        }
        HashMap<String, String> condition = new HashMap<String, String>();
        condition.put("orgid", orgId);
        condition.put("type", "SalesOrder");

        String resultJson = new DmsDbManager().getDetailsByCondition(DmsConstants.ORDER_TABLE, condition);

        //filter the order list;
        Type lstOrderType = new TypeToken<List<Order>>() {
        }.getType();

        List<Order> lstFetchOrders = new Gson().fromJson(resultJson, lstOrderType);

        //for list of invoices
        HashMap<String, Order> finalMap = new HashMap<String, Order>();
        Type typeObj = new TypeToken<HashMap<String, Order>>() {
        }.getType();

        int iCount = lstFetchOrders.size();
        for (int i = 0; i < iCount; i++) {
            String strStatus = lstFetchOrders.get(i).getStatus();
            if (strStatus.equalsIgnoreCase("Pending") || strStatus.equalsIgnoreCase("Open")) {

                String strOrderId = ((Map<String, String>) lstFetchOrders.get(i).getId()).get("$oid");
                String strInvoiceIds = getOrderInvoiceIdsList(strOrderId);
                if (strInvoiceIds.equalsIgnoreCase("Empty")) {
                    strInvoiceIds = strInvoiceIds + i;
                }
                finalMap.put(strInvoiceIds, lstFetchOrders.get(i));
            }
        }

        resultJson = new Gson().toJson(finalMap, typeObj);

        return resultJson;
    }

    /**
     * 
     * @param strOrderId
     * @return 
     */
    public String getOrderInvoiceIdsList(String strOrderId) {
        String strInvoiceIds = "";
        HashMap<String, String> condition = new HashMap<String, String>();
        condition.put("reference", strOrderId);
        condition.put("type", "Invoice");
        String strInvoiceList = new DmsDbManager().getDetailsByCondition(DmsConstants.ORDER_TABLE, condition);

        if ((strInvoiceList != null) && (!strInvoiceList.equals(""))) {
            Type orderListType = new TypeToken<List<Order>>() {
            }.getType();
            List<Order> lstOrderObj = new Gson().fromJson(strInvoiceList, orderListType);
            int iCount = lstOrderObj.size();
            for (int i = 0; i < iCount; i++) {
                if (i > 0) {
                    strInvoiceIds += ",";
                }
                strInvoiceIds += ((Map<String, String>) lstOrderObj.get(i).getId()).get("$oid");
            }
        } else {
            strInvoiceIds = "Empty";
        }

        return strInvoiceIds;
    }

    /**
     * fetch invoice Details....
     * @param strOrderId
     * @return 
     */
    public String viewPendingOrOpenOrderDetails(String strOrderId) {
        if ((strOrderId == null) || strOrderId.equals("")) {
            return null;
        }
        String strOrderDetail = new DmsDbManager().viewDetailsById(DmsConstants.ORDER_TABLE, strOrderId);

        HashMap<String, String> condition = new HashMap<String, String>();
        condition.put("reference", strOrderId);
        condition.put("type", "SalesOrder");
        String strLineItem = new DmsDbManager().getDetailsByCondition(DmsConstants.LINEITEM_TABLE, condition);

        HashMap<String, Object> finalMap = new HashMap<String, Object>();
        Type typeObj = new TypeToken<HashMap<String, Object>>() {
        }.getType();
        finalMap.put("order", strOrderDetail);
        finalMap.put("lineItem", strLineItem);
        String resultJson = new Gson().toJson(finalMap, typeObj);

        return resultJson;
    }

    /**
     * 
     * @param strInvoiceId
     * @return 
     */
    public String getInvoiceDetailsById(String strInvoiceId) {
        if ((strInvoiceId == null) || strInvoiceId.equals("")) {
            return null;
        }

        String strInvoiceDetailList = new DmsDbManager().viewDetailsById(DmsConstants.ORDER_TABLE, strInvoiceId);

        Type lstInvoiceType = new TypeToken<List<Order>>() {
        }.getType();

        List<Order> lstInvoiceObj = new Gson().fromJson(strInvoiceDetailList, lstInvoiceType);

        Order InvoiceObj = lstInvoiceObj.get(0);

        Type invoiceType = new TypeToken<Order>() {
        }.getType();

        String strInvoiceDetail = new Gson().toJson(InvoiceObj, invoiceType);

        HashMap<String, String> condition = new HashMap<String, String>();
        condition.put("reference", strInvoiceId);
        condition.put("status", "active");

        String strInvoiceLineItemDetails = new DmsDbManager().getDetailsByCondition(DmsConstants.LINEITEM_TABLE, condition);

        HashMap<String, Object> finalMap = new HashMap<String, Object>();
        finalMap.put("order", strInvoiceDetail);
        finalMap.put("lineItem", strInvoiceLineItemDetails);
        String resultJson = new Gson().toJson(finalMap, new TypeToken<HashMap<String, Object>>() {
        }.getType());

        return resultJson;
    }

    /**
     * 
     * @param strOrderId
     * @param strInvoiceJson
     * @param strInvoiceLineItemJson
     * @param strCreatedBy
     * @return 
     */
    public String createInvoice(String strOrderId, String strInvoiceJson, String strInvoiceLineItemJson, String strCreatedBy) {
        if ((strInvoiceJson == null) || strInvoiceJson.equals("")
                || (strOrderId == null) || strOrderId.equals("")
                || (strInvoiceLineItemJson == null) || strInvoiceLineItemJson.equals("")) {
            return null;
        }

        String strIdData = saveInvoiceData(strOrderId, strInvoiceJson, strCreatedBy);
        String[] arstrIdData = strIdData.split(",");
        String strOrgId = arstrIdData[0];
        String strInvoiceId = arstrIdData[1];
        boolean bFlag = saveInvoiceLineItemData(strOrderId, strInvoiceId, strInvoiceLineItemJson);

        if (bFlag) {
            bFlag = updateOrderLineItemData(strOrderId, strInvoiceLineItemJson);
            if (bFlag) {
                bFlag = new DmsStockManager().updateInvoiceStockPosition(strOrgId, strInvoiceLineItemJson);
            }
        } else {
            logger.error("Invoice Item Creation failed...");
        }

        String strJsonData = new Gson().toJson(strInvoiceId);

        return strJsonData;
    }

    /**
     * 
     * @param strOrderId
     * @param strInvoiceJson
     * @param strCreatedBy
     * @return 
     */
    public String saveInvoiceData(String strOrderId, String strInvoiceJson, String strCreatedBy) {
        Type type = new TypeToken<Order>() {
        }.getType();

        Order orderDto = new Gson().fromJson(strInvoiceJson, type);
        String strOrgId = orderDto.getOrgid();
        orderDto.setCreatedate((new Date()).getTime() + "");
        orderDto.setStatus("active");
        orderDto.setType("Invoice");
        orderDto.setReference(strOrderId);
        orderDto.setDataflag("TRUE");

        orderDto.setCreatedby(strCreatedBy);

        type = new TypeToken<Order>() {
        }.getType();
        String srtInvoiceData = new Gson().toJson(orderDto, type);
        String strInvoiceId = new DmsDbManager().save(DmsConstants.ORDER_TABLE, srtInvoiceData);

        return (strOrgId + "," + strInvoiceId);
    }

    /**
     * 
     * @param strOrderId
     * @param strInvoiceId
     * @param strInvoiceLineItemJson
     * @return 
     */
    public boolean saveInvoiceLineItemData(String strOrderId, String strInvoiceId, String strInvoiceLineItemJson) {

        Type type = new TypeToken<List<LineItem>>() {
        }.getType();

        List<LineItem> lstLineItems = new Gson().fromJson(strInvoiceLineItemJson, type);
        int iCount = lstLineItems.size();
        for (int i = 0; i < iCount; i++) {
            LineItem lineItemDto = lstLineItems.get(i);

            lineItemDto.setReference(strInvoiceId);
            lineItemDto.setCreatedate((new Date()).getTime() + "");
            lineItemDto.setStatus("active");
            lineItemDto.setType("Invoice");
            lineItemDto.setDataflag("TRUE");

        }

        String srtLineItemData = new Gson().toJson(lstLineItems, type);
        boolean bFlag = new DmsDbManager().insertMultiRecordsJsonData(DmsConstants.LINEITEM_TABLE, srtLineItemData);
        if (!bFlag) {
            logger.error("save Invoice line item failed for Invoice Id : " + strInvoiceId);
        }
        return bFlag;
    }

    /**
     * 
     * @param strOrderId
     * @param strInvoiceLineItemJson
     * @return 
     */
    public boolean updateOrderLineItemData(String strOrderId, String strInvoiceLineItemJson) {

        String strOrderStatus = "Closed";
        boolean bStatus = false;
        String strId = "";
        HashMap<String, String> condition = new HashMap<String, String>();
        condition = new HashMap<String, String>();
        condition.put("reference", strOrderId);
        condition.put("status", "active");

        String strOrderLineItemList = new DmsDbManager().getDetailsByCondition(DmsConstants.LINEITEM_TABLE, condition);

        Type lstLineItemType = new TypeToken<List<LineItem>>() {
        }.getType();

        List<LineItem> lstOrderLineItem = new Gson().fromJson(strOrderLineItemList, lstLineItemType);

        HashMap<String, LineItem> lstFetchOrderLineItemMap = new HashMap<String, LineItem>();
        int iCount = lstOrderLineItem.size();
        for (int i = 0; i < iCount; i++) {
            lstFetchOrderLineItemMap.put(lstOrderLineItem.get(i).getItemcode(), lstOrderLineItem.get(i));
        }

        DmsDbManager dbmgr = new DmsDbManager();
        Type lineItemType = new TypeToken<LineItem>() {
        }.getType();
        String strJsonData = "";

        List<LineItem> lstLineItemObj = new Gson().fromJson(strInvoiceLineItemJson, lstLineItemType);
        iCount = lstLineItemObj.size();
        for (int i = 0; i < iCount; i++) {
            LineItem lineItemObj = lstLineItemObj.get(i);
            LineItem fetchlineItemObj = lstFetchOrderLineItemMap.get(lineItemObj.getItemcode());

            int iActQty = Integer.parseInt(fetchlineItemObj.getActqtypkgunits());
            int iOrderBilledQty = Integer.parseInt(fetchlineItemObj.getBilledqtypkgunits());
            int iInvoiceBilledQty = Integer.parseInt(lineItemObj.getBilledqtypkgunits());
            iOrderBilledQty += iInvoiceBilledQty;
            if ((iActQty > iOrderBilledQty)
                    && (strOrderStatus.equalsIgnoreCase("Closed"))) {
                strOrderStatus = "Open";
            }

            fetchlineItemObj.setBilledqtypkgunits(iOrderBilledQty + "");
            fetchlineItemObj.setUpdatedate(new Date().getTime() + "");

            strId = ((Map<String, String>) fetchlineItemObj.getId()).get("$oid");
            strJsonData = new Gson().toJson(fetchlineItemObj, lineItemType);

            bStatus = dbmgr.update(DmsConstants.LINEITEM_TABLE, strId, strJsonData);
            if (!bStatus) {

                logger.error("Update order line Item failed for Item Id : " + strId);
            }
        }

        if (bStatus) {
            bStatus = updateOrderStatus(strOrderId, strOrderStatus);
        } else {
            logger.error("Update order status failed for order id : " + strOrderId);
        }
        return bStatus;
    }

    /**
     * 
     * @param strOrderId
     * @param strOrderStatus
     * @return 
     */
    public boolean updateOrderStatus(String strOrderId, String strOrderStatus) {
        boolean bStatus = false;

        Type lstOrderType = new TypeToken<List<Order>>() {
        }.getType();
        String strOrderJson = new DmsDbManager().viewDetailsById(DmsConstants.ORDER_TABLE, strOrderId);

        List<Order> lstOrderObj = new Gson().fromJson(strOrderJson, lstOrderType);
        Order orderObj = lstOrderObj.get(0);

        orderObj.setStatus(strOrderStatus);
        orderObj.setUpdatedate((new Date()).getTime() + "");

        Type orderType = new TypeToken<Order>() {
        }.getType();

        String srtOrderData = new Gson().toJson(orderObj, orderType);
        bStatus = new DmsDbManager().update(DmsConstants.ORDER_TABLE, strOrderId, srtOrderData);
        if (!bStatus) {
            logger.error("Update order Status failed for Order Id : " + strOrderId);
        }
        return bStatus;
    }
}
