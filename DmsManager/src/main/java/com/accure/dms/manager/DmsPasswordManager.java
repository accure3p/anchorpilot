package com.accure.dms.manager;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import org.apache.log4j.Logger;

/**
 *
 * @author Vinod
 */
public class DmsPasswordManager {
    private static Logger logger = Logger.getLogger(DmsPasswordManager.class);

    /**
     * 
     * @param strPasswordToHash
     * @param strSalt
     * @return 
     */
    public String getSecurePassword(String strPasswordToHash, String strSalt) {
        String generatedPassword = null;
        try {
            // Create MessageDigest instance for MD5
            MessageDigest md = MessageDigest.getInstance("MD5");
            //Add password bytes to digest
            md.update(strSalt.getBytes());
            //Get the hash's bytes
            byte[] bytes = md.digest(strPasswordToHash.getBytes());
            //This bytes[] has bytes in decimal format;
            //Convert it to hexadecimal format
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < bytes.length; i++) {
                sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
            }
            //Get complete hashed password in hex format
            generatedPassword = sb.toString();
        } catch (NoSuchAlgorithmException ex) {
            logger.error("No Such Algorithm Exception : "+ex.getMessage());;
        }
        return generatedPassword;
    }

}
