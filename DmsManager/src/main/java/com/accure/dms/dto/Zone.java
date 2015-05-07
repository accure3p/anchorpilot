package com.accure.dms.dto;

/**
 *
 * @author Vinod
 */
public class Zone extends DMSBase {

    private String parentzoneid;
    private String zoneid;
    private String name;
    private String groupname;

    public String getParentzoneid() {
        return parentzoneid;
    }

    public void setParentzoneid(String parentzoneid) {
        this.parentzoneid = parentzoneid;
    }

    public String getZoneid() {
        return zoneid;
    }

    public void setZoneid(String zoneid) {
        this.zoneid = zoneid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGroupname() {
        return groupname;
    }

    public void setGroupname(String groupname) {
        this.groupname = groupname;
    }

}
