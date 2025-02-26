# Recom

A template for an e-commerce application, made with React!  
This project is a submission for the Full stack open 2021 project.  
The hourbook is in the project directory as an Excel sheet:
project-hourbook.xlsx

## Showcase

All screenshots of the app available here: https://github.com/ronituohino/doodle-design/issues/1

### Client application

- Users can browse and search products
  - Products divided into categories
- Shopping cart system
- Checkout experience (address, payment method, etc...)
- Users can create an account on the site and log in with token auth
  - Users can change their account settings, and view previous orders

![homepage](https://user-images.githubusercontent.com/42767842/157247782-1f8a36c1-1b61-43ed-914a-3752f200b2fa.png)
![product-page](https://user-images.githubusercontent.com/42767842/157247775-3914c53c-32ea-44ac-bf8a-12905ffac016.png)
![payment](https://user-images.githubusercontent.com/42767842/157247781-a6074b88-c2b2-42bd-970f-6da301eabdf3.png)

### Admin application (CMS)

- Admins can add/remove/modify products, product categories, and accounts
- Products are put up for sale with pictures, language-specific names,
  descriptions, customization options, multiple different currencies, and also
  specific a category

![admin-tools](https://user-images.githubusercontent.com/42767842/157247711-bffdfada-6124-4976-b921-93deac1b20eb.png)
![admin-tools-create-procut](https://user-images.githubusercontent.com/42767842/157247739-5a96c153-eb8d-4fb8-809f-57d7b43f000d.png)

### Server

- The server is running an [Express](https://expressjs.com/) http server and an [Apollo GraphQL](https://www.apollographql.com/) server
- In production the server connects to a database running in [MongoDB](https://www.mongodb.com/)

## Docs

[Showcase, with some pics of the admin tools](./docs/showcase.md)  
[Setting up the development environment](./docs/development.md)  
[Setting up a local production container](./docs/local-production.md)  
[Deployment to Google Cloud Run](./docs/deployment.md)
