package com.accure.dms.Aggregater;

import com.accure.dms.dto.LineItem;
import com.accure.dms.dto.Order;
import com.accure.dms.dto.Route;
import com.accure.dms.manager.DmsDbManager;
import com.accure.dms.utils.Common;
import com.accure.dms.utils.DmsConstants;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class SuccessFailureOrder {

    /**
     * 
     * @return 
     */
    public boolean saveSuccessFailureOrders() {
        System.out.println("fetchSuccessFailureOrder");
        HashMap<String, String> condition = new HashMap<String, String>();
        condition.put("type", "SalesOrder");

        String resultJson = new DmsDbManager().getDetailsByCondition(DmsConstants.ORDER_TABLE, condition);

        //filter the order list;
        Type lstOrderType = new TypeToken<List<Order>>() {
        }.getType();

        List<Order> lstFetchOrders = new Gson().fromJson(resultJson, lstOrderType);

        List<OrderBySalesExecutive> seOrderList = new ArrayList<OrderBySalesExecutive>();
        Type typeObj = new TypeToken<List<OrderBySalesExecutive>>() {
        }.getType();
        int iCount = 0;
        if (lstFetchOrders != null) {
            iCount = lstFetchOrders.size();
        }
        for (int i = 0; i < iCount; i++) {
            OrderBySalesExecutive seOrder = new OrderBySalesExecutive();

            Order fetchOrderDto = lstFetchOrders.get(i);
            String strOrderStatus = fetchOrderDto.getStatus();
            int iFailedCount = 0;
            int iSuccessCount = 0;
            String strOrderDate = "";
            double dOrderAmount = 0.0;
            String strSalesExecutive = "";

            if (strOrderStatus.equalsIgnoreCase("Failed")) {
                iFailedCount = 1;
            } else {
                iSuccessCount = 1;
            }
            String strRouteId = fetchOrderDto.getRouteid();
            if ((strRouteId == null) || (strRouteId.equals(""))) {
                continue;
            }

            String strStatus = fetchOrderDto.getStatus();

            String strOrderId = ((Map<String, String>) fetchOrderDto.getId()).get("$oid");
            strOrderDate = fetchOrderDto.getCreatedate();
            strOrderDate = Common.getDateFromMilliSec(strOrderDate);

            String strCustomerId = fetchOrderDto.getCustomerid();
            String strCustomerName = fetchOrderDto.getCustomername();

            condition = new HashMap<String, String>();
            condition.put("routeid", strRouteId);
            String strRouteJsonList = new DmsDbManager().getDetailsByCondition(DmsConstants.ROUTE_TABLE, condition);
            if ((strRouteJsonList == null) || (strRouteJsonList.equals(""))) {
                continue;
            }

            Type type = new TypeToken<List<Route>>() {
            }.getType();

            try {
                JSONArray newJArray = new JSONArray(strRouteJsonList);
                String strRouteJson = newJArray.get(0).toString();

                JSONObject jsonObj = new JSONObject(strRouteJson);

                strSalesExecutive = jsonObj.getString("SalesExecutiveId");
            } catch (JSONException ex) {
                System.out.println("JSONException : " + ex.getMessage());
            }
            if (!strOrderStatus.equalsIgnoreCase("Failed")) {
                condition = new HashMap<String, String>();
                condition.put("reference", strOrderId);
                condition.put("type", "SalesOrder");
                String strLineItemList = new DmsDbManager().getDetailsByCondition(DmsConstants.LINEITEM_TABLE, condition);

                if ((strLineItemList == null) || (strLineItemList.equals(""))) {
                    continue;
                }
                type = new TypeToken<List<LineItem>>() {
                }.getType();
                List<LineItem> lstLineItems = new Gson().fromJson(strLineItemList, type);
                int iLineItemCount = lstLineItems.size();

                for (int idx = 0; idx < iLineItemCount; idx++) {
                    LineItem lineItemDto = lstLineItems.get(idx);

                    double dAmount = 0.0;
                    String strAmount = lineItemDto.getActqtyamount();
                    if ((strAmount != null) && (!strAmount.equals(""))) {
                        dAmount = Double.parseDouble(strAmount);
                    }
                    dOrderAmount += dAmount;
                }
            }

            seOrder.setSalesman(strSalesExecutive);
            seOrder.setSuccess_count(iSuccessCount + "");
            seOrder.setFailure_count(iFailedCount + "");
            seOrder.setDate(strOrderDate);
            seOrder.setOrder_amt(dOrderAmount + "");

            seOrderList.add(seOrder);
        }

        HashMap<String, OrderBySalesExecutive> lstSeOrderMap = new HashMap<String, OrderBySalesExecutive>();

        List<OrderBySalesExecutive> finalseOrderList = new ArrayList<OrderBySalesExecutive>();

        iCount = seOrderList.size();
        for (int i = 0; i < iCount; i++) {
            OrderBySalesExecutive seOrderObj = seOrderList.get(i);
            String strSeName = seOrderObj.getSalesman();

            String strKey = seOrderObj.getSalesman() + seOrderObj.getDate();
            if (lstSeOrderMap.containsKey(strKey)) {
                OrderBySalesExecutive fetchseOrderObj = lstSeOrderMap.get(strKey);

                String strOrderAmount = fetchseOrderObj.getOrder_amt();
                if ((strOrderAmount == null) || (strOrderAmount.equals(""))) {
                    strOrderAmount = "0.0";
                }
                String strFailedCount = fetchseOrderObj.getFailure_count();
                if ((strFailedCount == null) || (strFailedCount.equals(""))) {
                    strFailedCount = "0";

                }
                String strSuccessCount = fetchseOrderObj.getSuccess_count();
                if ((strSuccessCount == null) || (strSuccessCount.equals(""))) {
                    strSuccessCount = "0";
                }
                double dOrderAmount = Double.parseDouble(strOrderAmount) + Double.parseDouble(seOrderObj.getOrder_amt());

                int iFailedCount = Integer.parseInt(strFailedCount) + Integer.parseInt(seOrderObj.getFailure_count());

                int iSuccessCount = Integer.parseInt(strSuccessCount) + Integer.parseInt(seOrderObj.getSuccess_count());

                seOrderObj.setOrder_amt(dOrderAmount + "");
                seOrderObj.setFailure_count(iFailedCount + "");
                seOrderObj.setSuccess_count(iSuccessCount + "");
                lstSeOrderMap.remove(strKey);
                lstSeOrderMap.put(strKey, seOrderObj);
            } else {
                lstSeOrderMap.put(strKey, seOrderObj);
            }

        }

        Iterator<Map.Entry<String, OrderBySalesExecutive>> iterator = lstSeOrderMap.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, OrderBySalesExecutive> orderEntry = iterator.next();
            System.out.println(orderEntry.getKey() + " :: " + orderEntry.getValue());
            finalseOrderList.add(orderEntry.getValue());
        }

        boolean bStatus = false;
        if (finalseOrderList.size() > 0) {
            resultJson = new Gson().toJson(finalseOrderList, typeObj);

            new DmsDbManager().detaleTableAllData("orderbysalesman");
            bStatus = new DmsDbManager().insertMultiRecordsJsonData("orderbysalesman", resultJson);
        }
        return bStatus;
    }
}
