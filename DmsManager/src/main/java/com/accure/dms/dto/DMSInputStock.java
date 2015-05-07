package com.accure.dms.dto;

import java.util.List;

/**
 *
 * @author Vinod
 */
public class DMSInputStock{
    private List<Stock> stocks;

    public List<Stock> getStocks() {
        return stocks;
    }

    public void setStocks(List<Stock> stocks) {
        this.stocks = stocks;
    }
}
