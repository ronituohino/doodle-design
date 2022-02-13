## Introduction

A template for an e-commerce application, made with React!

Disclaimer:
This repo is only a personal project of mine, and it is not meant to be deployed irl.
However, this project, and all of the code is under an MIT licence if someone wishes to use it.

Showcase:
**_pics_**

Features:
- Client application
  - Users can browse products in different categories and search for products with keywords
  - Products can be added to the shopping cart with customization options
  - Users can place orders on products
  - The process of placing an order is very user-friendly
  - Orders support different delivery methods:
    - Home delivery
    - Postal services
    - Store pickup
  - **Different payment providers can be selected, but they have not been implemented**
  - Users can create an account on the site
  - Users can change their account settings, and view previous orders
- Admin application
  - Admins can add/remove/modify products
  - Products are put up for sale with pictures, language-specific names, descriptions, customization options, multiple different currencies, and also specific a category
  - By default the application supports English and Finnish, more languages can be added, but the client has to be modified some to support more
  - Also, by default the application supports Euro, but more can be added, however the frontend requires some tinkering
  - Admins can add/remove/modify categories
- GraphQL server
  - Both of these applications talk with a GraphQL server, which handles saving/fetching data to/from a Mongo database.

The database solution is Mongo. During development a local [Docker Mongo container](https://hub.docker.com/_/mongo) is booted up with initial values.
During production the GraphQL server connects to a server set up in [MongoDB](https://www.mongodb.com/).

All of these parts are served in Docker containers in production.
The development environment is not containerized, except for the local Mongo server.

In production, a reverse proxy container (Traefik) takes care of connecting to the different applications.
The configuration for Traefik is in the labels of containers in docker-compose.yml

The client and admin application use [Create React App](https://github.com/facebook/create-react-app).

## Setup

Start up by cloning this project on your machine!

### .env file

Open the project folder and create a new file in the root directory and name it .env
Add the following keys to the file:

- JWT_SECRET=\[value\]
  - This is the key used to encrypt/decrypt account tokens on the GraphQl server
  - Make sure this value is kept secret
  - It should be a lengthy string, like a good password, to make it more secure
- DB_URI=\[value\]
  - This key points to the MongoDB server in production
    - Which means that this field is not needed in development mode
  - **Setting up MongoDB**
  - Create an account on [MongoDB](https://www.mongodb.com/).
  - Create a new organization on the website (you can also use an existing one)
  - Create a new database in your organization
  - Configure database access to use password authentication, and select Update User (this should be on by default)
  - Configure network access to include your current IP address
    - If you are working in a team, include others' IP addresses as well
    - This can also be configured to allow connections from anywhere, but that is less secure
  - Then go to the deployment view, and press Connect on your database
  - Select Connect your application
  - The default settings should be Driver: "Node.js", and Version: "4.0 or later"
  - Copy the connection string, which should be something like: mongodb+srv://<user>:<password>@database.ishgo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    - The <user> field is filled in automatically with your username
    - Replace the <password> field with the password to your user
      - Note that this is different from the one to your account on MongoDB
      - You can change your user password from the Database Access section
    - Replace "myFirstDatabase" with the name of your database, for example "store"
  - After modifying the connection string, replace <value> in the .env file with the new string

The file should look something like this after setup:
```
JWT_SECRET=supergoodandsecretkey
DB_URI=mongodb+srv://myUser:myUserPassword@database.ishgo.mongodb.net/recom?retryWrites=true&w=majority
```

### Development

Setting up the development environment is very simple:

- Make sure your .env file has at least the JWT_SECRET field
- Make sure you have node.js installed
  - You can test this by opening a terminal and running `node -v`
  - This should print the node.js version, otherwise find out how to install node.js on your operating system
- Make sure you have Docker installed
  - You can test this by opening a terminal and running `docker -v`
  - This should print the Docker version, otherwise find out how to install Docker on your operating system
- Open the project root directory with a terminal and run `npm run ins`
  - This should run `npm install` on all of the projects applications
  - However, if you encounter problems with `npm run ins`, you can install dependencies manually:
    - Run `npm install` in the project root directory
    - Open ./admin in your terminal and run `npm install`
    - Open ./client in your terminal and run `npm install`
    - Open ./server in your terminal and run `npm install`
- Start the development environment by running `npm run dev` in the project root directory

After this, to connect to the client application, open a browser and connect to `localhost:3000`
To connect to the admin application, open a browser and connect to `localhost:3050`
To connect to the GraphQL Explorer, open a browser and connect to `localhost:4000`

### Production

Setting up the production environment is also very easy:

- Make sure your .env file and MongoDB are configured correctly
- Make sure you have Docker installed
  - You can test this by opening a terminal and running `docker -v`
  - This should print the Docker version, otherwise find out how to install Docker on your operating system
- Open the project root directory with a terminal and run `npm run docker-up`

In case you need to rebuild the docker images, run `npm run docker-build`

When the production environment is up & running you can connect to the client application by opening a browser and connecting to `localhost`
You can also connect to the admin application by opening a browser and connecting to `admin.localhost`
You can also connect to GraphQL Explorer by opening a browser and connecting to `api.localhost`
