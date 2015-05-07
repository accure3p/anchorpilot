package com.accure.dms.dto;

/**
 *
 * @author Vinod
 */
public class PackageMapper extends PackageMaster{
    private String pkgmapid;
    private String childpkgid;
    private String childpkgqty;

    public String getPkgmapid() {
        return pkgmapid;
    }

    public void setPkgmapid(String pkgmapid) {
        this.pkgmapid = pkgmapid;
    }

    public String getChildpkgid() {
        return childpkgid;
    }

    public void setChildpkgid(String childpkgid) {
        this.childpkgid = childpkgid;
    }

    public String getChildpkgqty() {
        return childpkgqty;
    }

    public void setChildpkgqty(String childpkgqty) {
        this.childpkgqty = childpkgqty;
    }
}
