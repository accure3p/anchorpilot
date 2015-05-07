package com.accure.anchor.controller;

import com.accure.dms.utils.Common;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

/**
 *
 * @author Manindar
 */
public class AnchorEmailManager {

    private Properties props = null;
    private String strEmailSender = null;
    private String strEmailSenderPassword = null;
    String host = "";

//    //todo send email later inside webui
//    //
//    String email = user.getUseraddress().getEmail1();
//    // Send email to the physician
//    String msg = "Please use this password to access irheum " + randomPassword;
//    new AnchorEmailManager().sendEmail(email, DmsConstants.NEW_USER_EMAIL_SUBJECT, msg);
    /**
     * 
     * @throws Exception 
     */
    public AnchorEmailManager() throws Exception {
        host = (String) Common.getPropObj().getProperty("mail-smtp-host");
        props = new Properties();
        props.put("mail.smtp.auth", (String) Common.getPropObj().getProperty("mail-smtp-auth"));
        props.put("mail.smtp.starttls.enable", (String) Common.getPropObj().getProperty("mail-smtp-starttls-enable"));
        props.put("mail.smtp.host", (String) Common.getPropObj().getProperty("mail-smtp-host"));
        props.put("mail.smtp.port", (String) Common.getPropObj().getProperty("mail-smtp-port"));
        //todo later with excel file
//        strEmailSender = Security.decrypt((String) Common.getPropObj().getProperty("Email-Sender"));
//        strEmailSenderPassword = Security.decrypt((String) Common.getPropObj().getProperty("EmailSender-Password"));
        props.put("mail.smtp.user", strEmailSender);
        props.put("mail.smtp.password", strEmailSenderPassword);
    }

    /**
     * 
     * @param to
     * @param subject
     * @param msg
     * @throws Exception 
     */
    public void sendEmail(String to, String subject, String msg) throws Exception {
        Session emailSession = Session.getDefaultInstance(props);
        Message message = new MimeMessage(emailSession);
        message.setFrom(new InternetAddress(strEmailSender));
        message.setRecipients(Message.RecipientType.TO,
                InternetAddress.parse(to));
        message.setSubject(subject);
        message.setContent(msg, "text/html");
        Transport transport = emailSession.getTransport("smtp");
        transport.connect(host, strEmailSender, strEmailSenderPassword);
        transport.sendMessage(message, message.getAllRecipients());
        transport.close();
    }
    
}
