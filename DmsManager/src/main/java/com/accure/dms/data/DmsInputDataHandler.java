package com.accure.dms.data;

import com.accure.dms.dto.ItemLedger;
import com.accure.dms.dto.Ledger;
import com.accure.dms.dto.LineItem;
import com.accure.dms.dto.LineItemBatch;
import com.accure.dms.dto.Order;
import com.accure.dms.dto.Scheme;
import java.util.List;

/**
 *
 * @author Vinod
 */
public class DmsInputDataHandler {
        //dms linking information
    private String orgid;
    private String orderid;
    private String entityid;
    private String userid;
    private String version;
    private String timezone;
    private String txnid;
    private String errormsgqid;
    private String future1;
    private String future2;
    private String future3;
    
    private Order order;
    //ledger information
    private List<Ledger> ledgers;
    private List<ItemLedger> itemledgers;
    //lineitem information
    private List<LineItem> lineitems;
    private List<LineItemBatch> lineitembatches;
    //discount schemes
    private List<Scheme> schemes;

    public String getOrgid() {
        return orgid;
    }

    public void setOrgid(String orgid) {
        this.orgid = orgid;
    }

    public String getOrderid() {
        return orderid;
    }

    public void setOrderid(String orderid) {
        this.orderid = orderid;
    }

    public String getEntityid() {
        return entityid;
    }

    public void setEntityid(String entityid) {
        this.entityid = entityid;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

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

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public List<Ledger> getLedgers() {
        return ledgers;
    }

    public void setLedgers(List<Ledger> ledgers) {
        this.ledgers = ledgers;
    }

    public List<ItemLedger> getItemledgers() {
        return itemledgers;
    }

    public void setItemledgers(List<ItemLedger> itemledgers) {
        this.itemledgers = itemledgers;
    }

    public List<LineItem> getLineitems() {
        return lineitems;
    }

    public void setLineitems(List<LineItem> lineitems) {
        this.lineitems = lineitems;
    }

    public List<LineItemBatch> getLineitembatches() {
        return lineitembatches;
    }

    public void setLineitembatches(List<LineItemBatch> lineitembatches) {
        this.lineitembatches = lineitembatches;
    }

    public List<Scheme> getSchemes() {
        return schemes;
    }

    public void setSchemes(List<Scheme> schemes) {
        this.schemes = schemes;
    }

}
