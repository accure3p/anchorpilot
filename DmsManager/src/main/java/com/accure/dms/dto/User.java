package com.accure.dms.dto;

/**
 *
 * @author Vinod
 */
public class User extends DMSBase {
    private String fname;
    private String mname;
    private String lname;
    private String gender;
    private String dob;
    private String loginid;
    private String password;
    private String createdBy;
    private String roles;
    private String zoneid;
    private String reportingmanagerid;

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getMname() {
        return mname;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getloginid() {
        return loginid;
    }

    public void setloginid(String loginid) {
        this.loginid = loginid;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getcreatedBy() {
        return createdBy;
    }

    public void setcreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public String getZoneid() {
        return zoneid;
    }

    public void setZoneid(String zoneid) {
        this.zoneid = zoneid;
    }

    public String getReportingmanagerid() {
        return reportingmanagerid;
    }

    public void setReportingmanagerid(String reportingmanagerid) {
        this.reportingmanagerid = reportingmanagerid;
    }

}
