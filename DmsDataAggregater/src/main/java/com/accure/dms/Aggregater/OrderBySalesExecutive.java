package com.accure.dms.Aggregater;

/**
 *
 * @author Vinod
 */
public class OrderBySalesExecutive {
    private String salesman;
    private String success_count;
    private String Failure_count;
    private String date;
    private String order_amt;

    public String getSalesman() {
        return salesman;
    }

    public void setSalesman(String salesman) {
        this.salesman = salesman;
    }

    public String getSuccess_count() {
        return success_count;
    }

    public void setSuccess_count(String success_count) {
        this.success_count = success_count;
    }

    public String getFailure_count() {
        return Failure_count;
    }

    public void setFailure_count(String Failure_count) {
        this.Failure_count = Failure_count;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getOrder_amt() {
        return order_amt;
    }

    public void setOrder_amt(String order_amt) {
        this.order_amt = order_amt;
    }

}
