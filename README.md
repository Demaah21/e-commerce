# E-Commerce App

The following Application is an implementation of the following E-Commerce design 
https://www.figma.com/design/HKuo2mv2DtbjlElwLqQVLv/Full-E-Commerce-Website-UI-UX-Design--Community-?node-id=1-3&t=nfQd214wZIQbuhfI-0
and backend
https://documenter.getpostman.com/view/5709532/2s93JqTRWN

### To-Do
#### Authentication
- [x] Navigation
- [x] Login
- [x] Register
- [x] Forgot Password
- [x] Change Password
- [x] Homepage
#### Homepage
- [x] Categories
- [x] Category Details
- [x] Brands
- [x] Brand Details
- [x] Products
- [x] Product Details
#### Wishlist
- [x] Wishlist operations 
- [x] Display, Add, Remove
#### Cart
- [x] Cart Operations
- [x] Display, Add, Remove, Update
#### Payments
- [x] Payment ways 
- [x] Online & cash 
- [x] Orders

#### Authentication

- login
curl -X POST \
-H "Content-Type: application/json" \
-d '{"email": "hamo123hamo@gmail.com", "password": "hamohamo"}' \
https://ecommerce.routemisr.com/api/v1/auth/signin

curl --location 'https://ecommerce.routemisr.com/api/v1/auth/signup' \
--header 'Content-Type: application/json' \
--request POST \
--data-raw '{
    "name": "Ahmed Abd Al-Muti",
    "email": "hamo123hamo@gmail.com",
    "password": "hamohamo",
    "rePassword": "hamohamo",
    "phone": "01010700701"
}'

{"message":"success","user":{"name":"Ahmed Abd Al-Muti","email":"hamo123hamo@gmail.com","role":"user"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Yzg4NzI2OTg3MDQyNmEzOTIyZTM1NCIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3OTcyMjYzLCJleHAiOjE3NjU3NDgyNjN9.fFe9rBWZIFptahT1HILKmPBOlF7kvBY8m2_kJ5Sf05E"}

curl --location 'https://ecommerce.routemisr.com/api/v1/orders/65cb72e38462ab02c71ee050' \
--header 'Content-Type: application/json' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzljMDIzMDM3YjQ5Nzk0NjlhMjVlMSIsIm5hbWUiOiJrZWtvIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTgwNTIzODgsImV4cCI6MTc2NTgyODM4OH0._oHBKDMga2hV3dbZpjbTNR7Ee2ZnQVu0DcTFM0nPZhk' \
--data '{
    "shippingAddress":{
        "details": "details",
        "phone": "01010800921",
        "city": "Cairo"
        }
}'

curl --location 'https://ecommerce.routemisr.com/api/v1/cart' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzljMDIzMDM3YjQ5Nzk0NjlhMjVlMSIsIm5hbWUiOiJrZWtvIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTgwNTIzODgsImV4cCI6MTc2NTgyODM4OH0._oHBKDMga2hV3dbZpjbTNR7Ee2ZnQVu0DcTFM0nPZhk' \
--header 'Content-Type: application/json' \
--data '{
    "productId": "6428eb43dc1175abc65ca0b3"
}'

curl --location --request PUT 'https://ecommerce.routemisr.com/api/v1/cart/6428ebc6dc1175abc65ca0b9' \
--header 'Content-Type: application/json' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzljMDIzMDM3YjQ5Nzk0NjlhMjVlMSIsIm5hbWUiOiJrZWtvIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTgwNTIzODgsImV4cCI6MTc2NTgyODM4OH0._oHBKDMga2hV3dbZpjbTNR7Ee2ZnQVu0DcTFM0nPZhk' \
--data '{
    "count": "1"
}'

curl --location 'https://ecommerce.routemisr.com/api/v1/cart' \
--header 'Content-Type: application/json' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzljMDIzMDM3YjQ5Nzk0NjlhMjVlMSIsIm5hbWUiOiJrZWtvIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTgwNTIzODgsImV4cCI6MTc2NTgyODM4OH0._oHBKDMga2hV3dbZpjbTNR7Ee2ZnQVu0DcTFM0nPZhk' \
--data ''

curl --location --request DELETE 'https://ecommerce.routemisr.com/api/v1/cart/6428eb43dc1175abc65ca0b3' --header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzljMDIzMDM3YjQ5Nzk0NjlhMjVlMSIsIm5hbWUiOiJrZWtvIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTgwNTIzODgsImV4cCI6MTc2NTgyODM4OH0._oHBKDMga2hV3dbZpjbTNR7Ee2ZnQVu0DcTFM0nPZhk'


curl --location --request DELETE 'https://ecommerce.routemisr.com/api/v1/cart' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzljMDIzMDM3YjQ5Nzk0NjlhMjVlMSIsIm5hbWUiOiJrZWtvIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTgwNTIzODgsImV4cCI6MTc2NTgyODM4OH0._oHBKDMga2hV3dbZpjbTNR7Ee2ZnQVu0DcTFM0nPZhk' \

curl --location 'https://ecommerce.routemisr.com/api/v1/cart' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzljMDIzMDM3YjQ5Nzk0NjlhMjVlMSIsIm5hbWUiOiJrZWtvIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTgwNTIzODgsImV4cCI6MTc2NTgyODM4OH0._oHBKDMga2hV3dbZpjbTNR7Ee2ZnQVu0DcTFM0nPZhk'

astyrisk@marble:~/Programming/dema/API$ curl --location 'https://ecommerce.routemisr.com/api/v1/cart' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzljMDIzMDM3YjQ5Nzk0NjlhMjVlMSIsIm5hbWUiOiJrZWtvIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTgwNTIzODgsImV4cCI6MTc2NTgyODM4OH0._oHBKDMga2hV3dbZpjbTNR7Ee2ZnQVu0DcTFM0nPZhk'
{"status":"success","numOfCartItems":1,"cartId":"68c9e43a037b4979469b827f","data":{"_id":"68c9e43a037b4979469b827f","cartOwner":"68c9c023037b4979469a25e1","products":[{"count":1,"_id":"68c9e43a037b4979469b8280","product":{"subcategory":[{"_id":"6407f1bcb575d3b90bf95797","name":"Women's Clothing","slug":"women's-clothing","category":"6439d58a0049ad0b52b9003f"}],"_id":"6428ebc6dc1175abc65ca0b9","title":"Woman Shawl","quantity":225,"imageCover":"https://ecommerce.routemisr.com/Route-Academy-products/1680403397402-cover.jpeg","category":{"_id":"6439d58a0049ad0b52b9003f","name":"Women's Fashion","slug":"women's-fashion","image":"https://ecommerce.routemisr.com/Route-Academy-categories/1681511818071.jpeg"},"brand":{"_id":"64089bbe24b25627a253158b","name":"DeFacto","slug":"defacto","image":"https://ecommerce.routemisr.com/Route-Academy-brands/1678285758109.png"},"ratingsAverage":4.8,"id":"6428ebc6dc1175abc65ca0b9"},"price":191}],"createdAt":"2025-09-16T22:27:06.577Z","updatedAt":"2025-09-16T22:27:06.791Z","__v":0,"totalCartPrice":191}}

id = 68c9e43a037b4979469b827f

astyrisk@marble:~/Programming/dema/API$ curl --location 'https://ecommerce.routemisr.com/api/v1/orders/:id' \
--header 'Content-Type: application/json' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzljMDIzMDM3YjQ5Nzk0NjlhMjVlMSIsIm5hbWUiOiJrZWtvIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTgwNTIzODgsImV4cCI6MTc2NTgyODM4OH0._oHBKDMga2hV3dbZpjbTNR7Ee2ZnQVu0DcTFM0nPZhk' \
--data '{
    "shippingAddress":{
        "details": "details",
        "phone": "01010800921",
        "city": "Cairo"
        }
}'
{"status":"success","data":{"taxPrice":0,"shippingPrice":0,"totalOrderPrice":191,"paymentMethodType":"cash","isPaid":false,"isDelivered":false,"_id":"68c9e378037b4979469b7de5","user":"68c9c023037b4979469a25e1","cartItems":[{"count":1,"_id":"68c9e349037b4979469b7c57","product":"6428ebc6dc1175abc65ca0b9","price":191}],"shippingAddress":{"details":"details","phone":"01010800921","city":"Cairo"},"createdAt":"2025-09-16T22:23:52.120Z","updatedAt":"2025-09-16T22:23:52.120Z","id":64130,"__v":0}}astyrisk@marble:~/Programming/dema/API$ 

curl --location 'https://ecommerce.routemisr.com/api/v1/orders/checkout-session/68c9d876037b4979469b1ed8'?url=http%3A%2F%2Flocalhost%3A3000' \
--header 'Content-Type: application/json' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzljMDIzMDM3YjQ5Nzk0NjlhMjVlMSIsIm5hbWUiOiJrZWtvIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTgwNTIzODgsImV4cCI6MTc2NTgyODM4OH0._oHBKDMga2hV3dbZpjbTNR7Ee2ZnQVu0DcTFM0nPZhk' \
--data '{
    "shippingAddress":{
        "details": "details",
        "phone": "01010700999",
        "city": "Cairo"
        }
}'
