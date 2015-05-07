package com.accure.dms.utils;

/**
 *
 * @author Vinod
 */
public class DmsConstants {

    public static final String VIEW = "view";
    public static final String CREATE = "create";
    public static final String ADD = "add";
    public static final String CHECK = "check";
    public static final String UPDATE = "update";
    public static final String SEND_EMAIL = "sendEmail";
    public static final String AUTHENTICATION = "authenticate";
    public static final String LOGOUT = "logout";
    
    //HTTP status codes
    public static final String HTTP_STATUS_SUCCESS = "200";
    public static final String HTTP_STATUS_FAIL = "501";
    public static final String HTTP_STATUS_UNAUTHORIZED = "401";
    public static final String HTTP_STATUS_INVALID_SESSION = "403";
    public static final String HTTP_STATUS_EXCEPTION = "500";
    
    //System Messages
    public static final String SUCCESS = "success";
    public static final String FAIL = "fail";
    public static final String ERROR = "error";
    public static final String FATAL_ERROR = "fatal error";
    public static final String WARNING = "warning";
    public static final String AUTHORIZED = "authorized";
    public static final String UNAUTHORIZED_ACCESS = "unauthorized access";
    public static final String INVALID_INPUT = "invalid input";
    public static final String INVALID_SESSION = "Invalid Session";
    public static final String INSUFFICIENT_PRIVILEGE = "Insufficient Privilege";
    public static final String USER_TABLE = "user";
    public static final String USERADDRESS_TABLE = "useraddress";
    public static final String USER_ZONE = "zone";
    public static final String EQUAL = "equal";
    public static final String NEW_USER_EMAIL_SUBJECT = "new user created";
    public static final String USER_LOGIN_ID = "loginid";
    public static final String EMAIL1 = "email1";
    public static final String EMAIL2 = "email2";
    public static final String RETYPE_EMAILID = "reTypeEmailId";
    public static final String USER_EMAIL_EXIST_MESSAGE = "Email is already registered";
    public static final String USER = "user";

    //user management constant
    public static final String USER_ROLES = "userroles";
    public static final String LOGIN_ID = "loginid";
    public static final String USER_NAME_EXIST_MESSAGE = "User name already exist";
    
    //TABLE name constants 
    public static final String ROLE_TABLE = "role";
    public static final String ORG_TABLE = "org";
    public static final String ROUTE_TABLE = "route";
    public static final String ZONE_TABLE = "zone";
    public static final String ITEMMASTER_TABLE = "itemmaster";
    public static final String TAXMASTER_TABLE = "taxmaster";
    public static final String STOCK_TABLE = "stock";
    public static final String ORGADDRESS_TABLE = "orgaddress";
    public static final String LINEITEM_TABLE = "lineitem";
    public static final String ORDER_TABLE = "order";
    
    //common query field name constants
    public static final String SORTKEY = "SORTKEY";
    public static final String SORTORDER = "SORTORDER";
    public static final String SORTORDER_TYPE = "1";
    public static final String NAME = "name";
    public static final String LOGICAL_AND = "and";
    
    public static final String USER_PASSWORD = "password";
}
