package com.accure.dms.dto;

/**
 *
 * @author Vinod
 */
public class OrgAddress extends Address {
    //dms transaction header
    private String addresstype;

    public String getAddresstype() {
        return addresstype;
    }

    public void setAddresstype(String addresstype) {
        this.addresstype = addresstype;
    }

}
