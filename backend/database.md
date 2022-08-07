npx sequelize-cli db:create
npx sequelize-cli db:migrate

npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string,salt:integer,birthday:date,gender:boolean,avatar:string,type:string

npx sequelize-cli model:generate --name Product --attributes name:string,desc:text,price:integer,weight:integer,length:integer,width:integer,height:integer,category:string,condition:string,totalSold:integer,rating:integer,views:integer,finalPrice:integer,imageSize:string,UserId:integer

npx sequelize-cli model:generate --name ProductImage --attributes filename:string,fileType:string,primary:boolean,ProductId:integer

npx sequelize-cli model:generate --name ProductStock --attributes ProductId:integer,size:string,color:string,stock:integer

npx sequelize-cli model:generate --name Promo --attributes potongan_harga:integer,tgl_mulai:date,tgl_akhir:date,ProductId:integer

npx sequelize-cli model:generate --name Order --attributes subtotal:integer,discount:integer,tax:integer,totalDue:integer,totalQty:integer,paymentTrasaction:string,status:string,UserId:integer

npx sequelize-cli model:generate --name ShoppingCart --attributes status:string,UserId:integer

npx sequelize-cli model:generate --name LineItem --attributes qty:integer,status:string,ProductId:integer,ProductStockId:integer,ShoppingCartId:integer,OrderId:integer

npx sequelize-cli model:generate --name BannerImages --attributes filename:string,fileType:string,body:string,active:boolean
