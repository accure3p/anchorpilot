package com.accure.dms.dto;

/**
 *
 * @author Vinod
 */
public class PackageMaster extends DMSBase{
    private String pkgid;
    private String uom;

    public String getPkgid() {
        return pkgid;
    }

    public void setPkgid(String pkgid) {
        this.pkgid = pkgid;
    }

    public String getUom() {
        return uom;
    }

    public void setUom(String uom) {
        this.uom = uom;
    }
}
