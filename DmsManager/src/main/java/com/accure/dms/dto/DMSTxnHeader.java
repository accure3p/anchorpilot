package com.accure.dms.dto;

/**
 *
 * @author Vinod
 */
public class DMSTxnHeader extends DMSBase{
    //dms transaction header
    private String version;
    private String timezone;
    private String txnid;
    private String errormsgqid;
    private String future1;
    private String future2;
    private String future3;
    
    //dms linking information
    private String userid;
    private String orderid;

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public String getTxnid() {
        return txnid;
    }

    public void setTxnid(String txnid) {
        this.txnid = txnid;
    }

    public String getErrormsgqid() {
        return errormsgqid;
    }

    public void setErrormsgqid(String errormsgqid) {
        this.errormsgqid = errormsgqid;
    }

    public String getFuture1() {
        return future1;
    }

    public void setFuture1(String future1) {
        this.future1 = future1;
    }

    public String getFuture2() {
        return future2;
    }

    public void setFuture2(String future2) {
        this.future2 = future2;
    }

    public String getFuture3() {
        return future3;
    }

    public void setFuture3(String future3) {
        this.future3 = future3;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getOrderid() {
        return orderid;
    }

    public void setOrderid(String orderid) {
        this.orderid = orderid;
    }
}
