package com.accure.dms.dto;

import java.util.Map;

/**
 *
 * @author Vinod
 */
public class DMSBase {
    //dms header
    private Object _id;
    private String orgid;
    private String tenantid;
    private String createdate;
    private String updatedate;
    private String status;
    private String type;
    private String dataflag;
    private Map<String,String> files;  //<locationid,filename>
    

    public Object getId() {
        return _id;
    }

    public void setId(Object _id) {
        this._id = _id;
    }

    public String getOrgid() {
        return orgid;
    }

    public void setOrgid(String orgid) {
        this.orgid = orgid;
    }

    public String getTenantid() {
        return tenantid;
    }

    public void setTenantid(String tenantid) {
        this.tenantid = tenantid;
    }
    
    public String getCreatedate() {
        return createdate;
    }

    public void setCreatedate(String createdate) {
        this.createdate = createdate;
    }

    public String getUpdatedate() {
        return updatedate;
    }

    public void setUpdatedate(String updatedate) {
        this.updatedate = updatedate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDataflag() {
        return dataflag;
    }

    public void setDataflag(String dataflag) {
        this.dataflag = dataflag;
    }

    public Map<String,String> getFiles() {
        return files;
    }

    public void setFiles(Map<String,String> files) {
        this.files = files;
    }
}
