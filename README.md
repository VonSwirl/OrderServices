# OrderServices
Software Architecture Sub-Project. OrderService represents a micro service webapp which is part of a larger project. It is a standalone component in its own right.

//delete before publish

#######################################################################################################################

---------------------------------------
DOCKER COMMANDS
//display all RUNNING containters etc
docker ps

////display all RUNNING & stopped containters etc
docker ps -a

//creats a new container from image and starertd that container
docker run

//starts  an existing container that is not running
docker start <name||id>

//stops said running
docker stop <name||id>

//removes container/delte
docker rm <name||id>


NGINX REVERSE PROXY

docker stop site-a
docker stop site-b
docker stop site-c
docker stop site-d
docker stop site-e
docker stop site-f
docker stop site-g
docker stop nginx-proxy

docker rm site-a
docker rm site-b
docker rm site-c
docker rm site-d
docker rm site-e
docker rm site-f
docker rm site-g
docker rm nginx-proxy
cd
mkdir certs

docker run -d -p 8080:8080 -p 443:443 \
    --name nginx-proxy \
    -v $HOME/certs:/etc/nginx/certs:ro \
    -v /etc/nginx/vhost.d \
    -v /usr/share/nginx/html \
    -v /var/run/docker.sock:/tmp/docker.sock:ro \
    --label com.github.jrcs.letsencrypt_nginx_proxy_companion.nginx_proxy=true \
    jwilder/nginx-proxy
	
docker run -d \
    --name nginx-letsencrypt \
    --volumes-from nginx-proxy \
    -v $HOME/certs:/etc/nginx/certs:rw \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    jrcs/letsencrypt-nginx-proxy-companion
	
		
	docker run -d \
    --name site-a \
	-e 'LETSENCRYPT_EMAIL=webmaster@example.com' \
    -e 'LETSENCRYPT_HOST=a.jeromehurley-dev.co.uk' \
    -e 'VIRTUAL_HOST=a.jeromehurley-dev.co.uk' nginx
	
	docker logs nginx-letsencrypt
	
	docker run -d \
    --name site-b \
	-e 'LETSENCRYPT_EMAIL=webmaster@example.com' \
    -e 'LETSENCRYPT_HOST=b.jeromehurley-dev.co.uk' \
    -e 'VIRTUAL_HOST=b.jeromehurley-dev.co.uk' httpd
	
	docker logs nginx-letsencrypt
	
	docker run -d \
    --name site-c \
	-e 'LETSENCRYPT_EMAIL=webmaster@example.com' \
    -e 'LETSENCRYPT_HOST=c.jeromehurley-dev.co.uk' \
    -e 'VIRTUAL_HOST=c.jeromehurley-dev.co.uk' httpd
	
	docker logs nginx-letsencrypt
	
	docker run -d \
    --name site-d \
	-e 'LETSENCRYPT_EMAIL=webmaster@example.com' \
    -e 'LETSENCRYPT_HOST=d.jeromehurley-dev.co.uk' \
    -e 'VIRTUAL_HOST=d.jeromehurley-dev.co.uk' httpd
	
	docker logs nginx-letsencrypt
	
	docker run -d \
    --name site-e \
	-e 'LETSENCRYPT_EMAIL=webmaster@example.com' \
    -e 'LETSENCRYPT_HOST=e.jeromehurley-dev.co.uk' \
    -e 'VIRTUAL_HOST=e.jeromehurley-dev.co.uk' httpd
	
	docker logs nginx-letsencrypt
	
	docker run -d \
    --name site-f \
	-e 'LETSENCRYPT_EMAIL=webmaster@example.com' \
    -e 'LETSENCRYPT_HOST=f.jeromehurley-dev.co.uk' \
    -e 'VIRTUAL_HOST=f.jeromehurley-dev.co.uk' httpd
	
	docker logs nginx-letsencrypt
	
	docker run -d \
    --name site-g \
	-e 'LETSENCRYPT_EMAIL=webmaster@example.com' \
    -e 'LETSENCRYPT_HOST=g.jeromehurley-dev.co.uk' \
    -e 'VIRTUAL_HOST=g.jeromehurley-dev.co.uk' httpd
	
	docker logs nginx-letsencrypt
	------------------------------------------------
	//Bridge
	docker network inspect b2557f548b5f
	
	vonswirl@three-amigos-gcp:~$ docker network inspect b2557f548b5f
[
    {
        "Name": "bridge",
        "Id": "b2557f548b5ff4d5c8c96e287e74c3a34e51ad7b9e19f375e3268a56e887d0cf",
        "Created": "2017-11-23T13:28:02.940348142Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.18.0.0/16"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "Containers": {
            "0b99a3b9aa675644a652e9037d8c2b3af5ecdfcdf8ab582667f375b5c9775a27": {
                "Name": "site-d",
                "EndpointID": "0d0c40f567c181137fd7beb97b142b96d6b6179cd3d0b1597e3febafadf5650d",
                "MacAddress": "02:42:ac:12:00:07",
                "IPv4Address": "172.18.0.7/16",
                "IPv6Address": ""
            },
            "1f84814b10f2df78c8cfce8e5f4716251c966bc052a91e3007dba10b0d8f7e24": {
                "Name": "nginx-proxy",
                "EndpointID": "649de067fd5638ebdbc89df08126f2edcffe4c4f18fcdf3cbeb5f663602de170",
                "MacAddress": "02:42:ac:12:00:02",
                "IPv4Address": "172.18.0.2/16",
                "IPv6Address": ""
            },
            "69a4b59774395574a37f344d92da773aa6339739c9ddf52ad11c99813a731030": {
                "Name": "site-g",
                "EndpointID": "4a6ea583b5f2c16a18752afe859b273e49482360af32f8d38bb147510aae7bec",
                "MacAddress": "02:42:ac:12:00:0a",
                "IPv4Address": "172.18.0.10/16",
                "IPv6Address": ""
            },
            "762dc11d38dfdb7b88a6b529025372034c24962879c3f70a74ac9d5d89bb5212": {
                "Name": "site-a",
                "EndpointID": "1c37ca2c28d6df9597272d985c8e2b7db1e7fce1dcaa35c8551af3b8661d72b9",
                "MacAddress": "02:42:ac:12:00:04",
                "IPv4Address": "172.18.0.4/16",
                "IPv6Address": ""
            },
            "92c9ac239026b95c15c34a72a1a0306384ff23c3c2810a1ff8f38d36d728e720": {
                "Name": "site-c",
                "EndpointID": "555e102c1e2542f106216b8d21f56ed4cb180ad215bcc7a3ea7993a1e334d403",
                "MacAddress": "02:42:ac:12:00:06",
                "IPv4Address": "172.18.0.6/16",
                "IPv6Address": ""
            },
            "b2ee4c6e8584b13e8e247d597390440ae80e4ad41a68fa43261cfc555170410d": {
                "Name": "site-e",
                "EndpointID": "9f58057bdba328118c2e2e2a2468e9c19949be6da486699219c536a7088617d7",
                "MacAddress": "02:42:ac:12:00:08",
                "IPv4Address": "172.18.0.8/16",
                "IPv6Address": ""
            },
            "cab60329a9a2903131c1ddcc3bf08c3a3931f112cafd6c2c39a4f3b83a15333a": {
                "Name": "site-b",
                "EndpointID": "23fd647851a57ebfbe327cc4e4b754f74eaea238d0a22aecdbd5c02fe6df0727",
                "MacAddress": "02:42:ac:12:00:05",
                "IPv4Address": "172.18.0.5/16",
                "IPv6Address": ""
            },
            "d0516e4e0c26450c967649bf2538496c8033780ca29a8f61111da1e304392234": {
                "Name": "site-f",
                "EndpointID": "d33d3d57f62fbe8898b6f9e06fe500dc760709dd1d60566021c10281518d9aaa",
                "MacAddress": "02:42:ac:12:00:09",
                "IPv4Address": "172.18.0.9/16",
                "IPv6Address": ""
            },
            "dd5633b62db9444169ee1698129bd82f6fa5871b45d48a7bbc6a92e688b0511c": {
                "Name": "nginx-letsencrypt",
                "EndpointID": "51ee7340e88f41b8483bde0b7b923fd0a8eb517473ec8f2a5a8f5aae41706c63",
                "MacAddress": "02:42:ac:12:00:03",
                "IPv4Address": "172.18.0.3/16",
                "IPv6Address": ""
            }
        },
        "Options": {
            "com.docker.network.bridge.default_bridge": "true",
            "com.docker.network.bridge.enable_icc": "true",
            "com.docker.network.bridge.enable_ip_masquerade": "true",
            "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
            "com.docker.network.bridge.name": "docker0",
            "com.docker.network.driver.mtu": "1460"
        },
        "Labels": {}
    }
]

---------------------------------

npm install -g docker

C:\Users\DeepThought2\OrderServices (vonBranch -> origin) (orderservices@1.0.0)

λ docker build -t orderservice-app .

λ docker run -it --rm --name jay-orderservice-app  orderservice-app
c

	
	
#######################################################################################################################

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

	





