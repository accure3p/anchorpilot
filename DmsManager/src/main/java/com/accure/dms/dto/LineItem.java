package com.accure.dms.dto;

/**
 *
 * @author Vinod
 */
public class LineItem extends DMSTxnHeader {
    private String reference;
    private String itemcode;
    private String itemname;
    private String pkgunit;
    private String pkgunitrate;
    private String actqtypkgunits;
    private String billedqtypkgunits;
    private String billqtyamount;
    private String actqtyamount;
    private String discount;
    private String slno;
    private String taxid;
    private String taxAmount;
    private String itemtaxgroup;

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

//    public String getMngorderid() {
//        return mngorderid;
//    }
//
//    public void setMngorderid(String mngorderid) {
//        this.mngorderid = mngorderid;
//    }

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

    public String getPkgunit() {
        return pkgunit;
    }

    public void setPkgunit(String pkgunit) {
        this.pkgunit = pkgunit;
    }

    public String getPkgunitrate() {
        return pkgunitrate;
    }

    public void setPkgunitrate(String pkgunitrate) {
        this.pkgunitrate = pkgunitrate;
    }

    public String getActqtypkgunits() {
        return actqtypkgunits;
    }

    public void setActqtypkgunits(String actqtypkgunits) {
        this.actqtypkgunits = actqtypkgunits;
    }

    public String getBilledqtypkgunits() {
        return billedqtypkgunits;
    }

    public void setBilledqtypkgunits(String billedqtypkgunits) {
        this.billedqtypkgunits = billedqtypkgunits;
    }

    public String getBillqtyamount() {
        return billqtyamount;
    }

    public void setBillqtyamount(String billqtyamount) {
        this.billqtyamount = billqtyamount;
    }

    public String getDiscount() {
        return discount;
    }

    public void setDiscount(String discount) {
        this.discount = discount;
    }

    public String getSlno() {
        return slno;
    }

    public void setSlno(String slno) {
        this.slno = slno;
    }

    public String getTaxid() {
        return taxid;
    }

    public void setTaxid(String taxid) {
        this.taxid = taxid;
    }

    public String getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(String taxAmount) {
        this.taxAmount = taxAmount;
    }

    public String getItemtaxgroup() {
        return itemtaxgroup;
    }

    public void setItemtaxgroup(String itemtaxgroup) {
        this.itemtaxgroup = itemtaxgroup;
    }

    public String getActqtyamount() {
        return actqtyamount;
    }

    public void setActqtyamount(String actqtyamount) {
        this.actqtyamount = actqtyamount;
    }

}
