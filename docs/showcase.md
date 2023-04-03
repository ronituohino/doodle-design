# Showcase

- Client application
  - Users can browse products in different categories and search for products
    with keywords
  - Products can be added to the shopping cart with customization options
  - Users can place orders on products
  - Support for different delivery methods
  - **Different payment providers can be selected, but the actual payment
    functionality has not been implemented**
  - Users can create an account on the site and log in with token auth
  - Users can change their account settings, and view previous orders
- Admin application
  - Admins can add/remove/modify products
  - Products are put up for sale with pictures, language-specific names,
    descriptions, customization options, multiple different currencies, and also
    specific a category
  - By default the application supports English and Finnish, more languages can
    be added, but the client has to be modified some to support more
  - Also, by default the application supports Euro, but more can be added,
    however the frontend requires some tinkering
  - Admins can add/remove/modify categories
  - Admins can modify/remove accounts
- Server
  - The server is running an Express http server and an Apollo GraphQL server.
  - In production the server connects to a database running in
    [MongoDB](https://www.mongodb.com/)

Homepage  
![homepage](https://user-images.githubusercontent.com/42767842/157247782-1f8a36c1-1b61-43ed-914a-3752f200b2fa.png)

Administrative tools  
![admin-tools](https://user-images.githubusercontent.com/42767842/157247711-bffdfada-6124-4976-b921-93deac1b20eb.png)

Product management & creation  
![admin-tools-create-procut](https://user-images.githubusercontent.com/42767842/157247739-5a96c153-eb8d-4fb8-809f-57d7b43f000d.png)

Category management & creation  
![admin-tools-category](https://user-images.githubusercontent.com/42767842/157247736-7d703641-a625-46b3-808a-ba6d721066fa.png)

Account management  
![admin-tools-account](https://user-images.githubusercontent.com/42767842/157247722-bcc6ed19-2155-4338-bc45-190d9d21dd6d.png)
