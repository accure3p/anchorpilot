package com.accure.dms.dto;

/**
 *
 * @author Vinod
 */
public class LineItemBatch extends LineItem {
    //dms linking information
    private String warehouseid;

    private String expirydate;
    private String warehousename;
    private String orderduedate;
    private String batchname;

    public String getWarehouseid() {
        return warehouseid;
    }

    public void setWarehouseid(String warehouseid) {
        this.warehouseid = warehouseid;
    }

    public String getExpirydate() {
        return expirydate;
    }

    public void setExpirydate(String expirydate) {
        this.expirydate = expirydate;
    }

    public String getWarehousename() {
        return warehousename;
    }

    public void setWarehousename(String warehousename) {
        this.warehousename = warehousename;
    }

    public String getOrderduedate() {
        return orderduedate;
    }

    public void setOrderduedate(String orderduedate) {
        this.orderduedate = orderduedate;
    }

    public String getBatchname() {
        return batchname;
    }

    public void setBatchname(String batchname) {
        this.batchname = batchname;
    }
}
