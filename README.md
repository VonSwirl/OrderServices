# OrderServices
Software Architecture Sub-Project. OrderService represents a micro service webapp which is part of a larger project. It is a standalone component in its own right.

//delete before publish

JAVA DOC COMMENTING STRUCTURE:{

/**
 *
 */
 
}


CONSOLE COMMANDS:{
CMD:
cd orderServ*
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
	"products":[
      {  
         "ean":"111111",
         "name":"AAA",
         "description":"AAAAAA",
         "productPrice":"1.00",
         "qtyReq":"10",
         "stockQty":"9"
      },
      {  
         "ean":"222222",
         "name":"BBB",
         "description":"BBBBBB",
         "productPrice":"2.00",
         "qtyReq":"10",
         "stockQty":"20"
      }
   ],
   "stocked": "true",
   "orderStatus":"Delivered",
   "custoRef":"LLLLLLLLLLLLLLLLLLLLLLLL",
   "custoAuth":"true",
   "orderTotal":"0.00"
}


REQUIRED JSON FROM STOCK SERVICE{  
   "custoRef":"ABC123EFG",
   "custoAuth":"true",
   "products":[  
      {  
         "ean":"111111",
         "name":"AAA",
         "description":"AAAAAA",
         "productPrice":"1.00",
         "qtyReq":"10",
         "stockQty":"9",
         
      },
      {  
         "ean":"222222",
         "name":"BBB",
         "description":"BBBBBB",
         "productPrice":"2.00",
         "qtyReq":"10",
         "stockQty":"20",
      }
   ]
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




