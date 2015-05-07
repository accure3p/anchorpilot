package com.accure.dms.dto;

/**
 *
 * @author Vinod
 */
public class TaxMaster  extends DMSBase{
    private String taxid;
    private String description;
    private String taxgroup;
    private String taxpercent;
    private String state;
    private String country;

    public String getTaxid() {
        return taxid;
    }

    public void setTaxid(String taxid) {
        this.taxid = taxid;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTaxgroup() {
        return taxgroup;
    }

    public void setTaxgroup(String taxgroup) {
        this.taxgroup = taxgroup;
    }

    public String getTaxpercent() {
        return taxpercent;
    }

    public void setTaxpercent(String taxpercent) {
        this.taxpercent = taxpercent;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
