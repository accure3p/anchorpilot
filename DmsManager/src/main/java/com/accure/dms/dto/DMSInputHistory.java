package com.accure.dms.dto;

import java.util.List;

/**
 *
 * @author Vinod
 */
public class DMSInputHistory extends DMSTxnHeader{

    private Order order;
    //ledger information
    private List<Ledger> ledgers;
    private List<ItemLedger> itemledgers;
    //lineitem information
    private List<LineItem> lineitems;
    private List<LineItemBatch> lineitembatches;
    //discount schemes
    private List<Scheme> schemes;

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
