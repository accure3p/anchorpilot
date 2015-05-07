package com.accure.dms.dto;

/**
 *
 * @author Vinod
 */
public class ItemMaster extends PackageMapper{
    private String parentorgid;
    private String itemcode;
    private String itemname;
    private String itemtaxgroup;
    private String price;


    public String getParentorgid() {
        return parentorgid;
    }

    public void setParentorgid(String parentorgid) {
        this.parentorgid = parentorgid;
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

    public String getItemtaxgroup() {
        return itemtaxgroup;
    }

    public void setItemtaxgroup(String itemtaxgroup) {
        this.itemtaxgroup = itemtaxgroup;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }
}
