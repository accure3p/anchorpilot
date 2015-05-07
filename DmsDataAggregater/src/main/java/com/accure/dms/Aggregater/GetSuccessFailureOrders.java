package com.accure.dms.Aggregater;

/**
 *
 * @author Vinod
 */
public class GetSuccessFailureOrders {
    public static void main( String[] args )
    {
        System.out.println( "Getting Success Failure Orders by Sales Executive." );
        boolean bOrdersDetails = new SuccessFailureOrder().saveSuccessFailureOrders();
        if(bOrdersDetails){
            System.out.println("Orders by Sales Executive inserted successfully.");
            
        }else{
            System.out.println("Orders by Sales Executive insertion failed.");
            
        }
    }
    
}
