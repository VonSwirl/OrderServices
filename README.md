# OrderServices
Software Architecture Sub-Project. OrderService represents a micro service webapp which is part of a larger project. It is a standalone component in its own right.

//delete before publish

JAVA DOC COMMENTING STRUCTURE:{

/**
 *
 */
 
}

//Mlab connection string
// mong.connect('mongodb://orderServiceUsr:osuser@ds042527.mlab.com:42527/orderservicedb', { useMongoClient: true });
CONSOLE COMMANDS:{
CMD:
cd orderservic*
----------------------------------
NODEMON:
nodemon orderServiceController.js
nodemon -h
rs
----------------------------------
MONGODB:
"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"
----------------------------------
}


COMPLETE JSON ORDER STRUCTURE:{  


REQUIRED JSON FROM STOCK SERVICE{  
  {
	"products":[
      {  
         "ean":"1A",
         "name":"A",
         "description":"A",
         "productPrice":"1.00",
         "qtyReq":"1000",
         "stockQty":"4",
         "nowAvailable": ""
      },
      {  
         "ean":"3C",
         "name":"C",
         "description":"C",
         "productPrice":"4.00",
         "qtyReq":"250",
         "stockQty":"1",
         "nowAvailable": ""
      }
   ],
   "stocked": "",
   "orderStatus":"",
   "custoRef":"allo1ut2t",
   "custoAuth":"true",
   "orderTotal":"0.00"
}
}


TODO{
create tests for restful methods.
need to generate orderRef.
need to create date.
need to create status.
need to send chris stock to order in.
need to add product values to generate total.
}


JSON STRUCTURE FOR PROCESSING SERVICE:(Sherzod){
//////////NOT COMPLETE//////////////////////
	"orderRef":"123456789",
	"orderDate":"01/01/2001",
	"orderTotal":"",
	"custoRef":"ABC123EFG"
	}


JSON STRUCTURE FOR PURCHASING SERVICE:(Chris){  
   
   "orderRef":"",
   "productsReq":[  
      {  
         "ean":"1111",
         "qtyReq":"10"
      },
      {  
         "ean":"2222",
         "qtyReq":"20"
      }
   ]
}



