package com.accure.dms.dto;

/**
 *
 * @author Vinod
 */
public class Scheme extends DMSTxnHeader{
    private String mngOrderid;

    //dms linking information
    private String schemeid;
    private String itemcode;

    private String itemslno;
    private String schemename;
    private String schemetype;
    private String discount;


    public String getMngOrderid() {
        return mngOrderid;
    }

    public void setMngOrderid(String mngOrderid) {
        this.mngOrderid = mngOrderid;
    }

    public String getSchemeid() {
        return schemeid;
    }

    public void setSchemeid(String schemeid) {
        this.schemeid = schemeid;
    }

    public String getItemcode() {
        return itemcode;
    }

    public void setItemcode(String itemcode) {
        this.itemcode = itemcode;
    }


    public String getItemslno() {
        return itemslno;
    }

    public void setItemslno(String itemslno) {
        this.itemslno = itemslno;
    }
    
    public String getSchemename() {
        return schemename;
    }

    public void setSchemename(String schemename) {
        this.schemename = schemename;
    }

    public String getSchemetype() {
        return schemetype;
    }

    public void setSchemetype(String schemetype) {
        this.schemetype = schemetype;
    }

    public String getDiscount() {
        return discount;
    }

    public void setDiscount(String discount) {
        this.discount = discount;
    }


}
