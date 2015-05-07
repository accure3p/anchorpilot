package com.accure.dms.dto;

/**
 *
 * @author Vinod
 */
public class Order extends DMSTxnHeader{

   private String comments;
   private String customername;
   private String customerid;
   private String reference;
   private String txntype;
   private String txndate;
   private String createdby;
   private String orgname;
   
   // added by abhishek...
   private String routeid;
   
   // for order..
   private String discount;

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
    
    public String getCustomername() {
        return customername;
    }

    public void setCustomername(String customername) {
        this.customername = customername;
    }

    public String getCustomerid() {
        return customerid;
    }

    public void setCustomerid(String customerid) {
        this.customerid = customerid;
    }
        
    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getTxntype() {
        return txntype;
    }

    public void setTxntype(String txntype) {
        this.txntype = txntype;
    }

    public String getTxndate() {
        return txndate;
    }

    public void setTxndate(String txndate) {
        this.txndate = txndate;
    }

    public String getCreatedby() {
        return createdby;
    }

    public void setCreatedby(String createdby) {
        this.createdby = createdby;
    }

    public String getOrgname() {
        return orgname;
    }

    public void setOrgname(String orgname) {
        this.orgname = orgname;
    }

    public String getDiscount() {
        return discount;
    }

    public void setDiscount(String discount) {
        this.discount = discount;
    }

    public String getRouteid() {
        return routeid;
    }

    public void setRouteid(String routeid) {
        this.routeid = routeid;
    }
    
}
