package com.accure.dms.dto;

/**
 *
 * @author Vinod
 */
public class Stock extends DMSBase {
    private String stockid;//for juno
    private String itemcode;
    private String itemname;
    private String instockqty;
    private String bookedqty;
    private String freestockqty;
    private String reorderlevel;


    public String getStockid() {
        return stockid;
    }

    public void setStockid(String stockid) {
        this.stockid = stockid;
    }

    public String getItemcode() {
        return itemcode;
    }

    public void setItemcode(String itemcode) {
        this.itemcode = itemcode;
    }

    public String getItemname() {
        return itemname;
    }

    public void setItemname(String itemname) {
        this.itemname = itemname;
    }

    public String getInstockqty() {
        return instockqty;
    }

    public void setInstockqty(String instockqty) {
        this.instockqty = instockqty;
    }

    public String getBookedqty() {
        return bookedqty;
    }

    public void setBookedqty(String bookedqty) {
        this.bookedqty = bookedqty;
    }

    public String getFreestockqty() {
        return freestockqty;
    }

    public void setFreestockqty(String freestockqty) {
        this.freestockqty = freestockqty;
    }

    public String getReorderlevel() {
        return reorderlevel;
    }

    public void setReorderlevel(String reorderlevel) {
        this.reorderlevel = reorderlevel;
    }

}
