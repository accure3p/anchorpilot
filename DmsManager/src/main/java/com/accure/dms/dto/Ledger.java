package com.accure.dms.dto;

/**
 *
 * @author Vinod
 */
public class Ledger extends DMSTxnHeader{
    private String mngOrgid;
    private String mngOrderid;

    private String ledgername;
    private String amount;
    private String txntype;

    public String getMngOrgid() {
        return mngOrgid;
    }

    public void setMngOrgid(String mngOrgid) {
        this.mngOrgid = mngOrgid;
    }

    public String getMngOrderid() {
        return mngOrderid;
    }

    public void setMngOrderid(String mngOrderid) {
        this.mngOrderid = mngOrderid;
    }
    
    public String getLedgername() {
        return ledgername;
    }

    public void setLedgername(String ledgername) {
        this.ledgername = ledgername;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getTxntype() {
        return txntype;
    }

    public void setTxntype(String txntype) {
        this.txntype = txntype;
    }
    
}
