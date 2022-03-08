# Introduction

A template for an e-commerce application, made with React!  
This project is a submission for the Full stack open 2021 project.  
The hourbook is in the project directory as an Excel sheet: project-hourbook.xlsx  

Check out the client app live at [Heroku](https://fso-2021-recom.herokuapp.com/)!  
The live sample can take a while to launch since Heroku puts apps to sleep when they are not used.  

Disclaimer:  
This repo is only a personal project of mine, and it is not meant to be deployed irl.  
However, this project, and all of the code is under an MIT licence if someone wishes to use it.

# Showcase:  
Doodle Design sample site  

Homepage  
![homepage](https://user-images.githubusercontent.com/42767842/157247782-1f8a36c1-1b61-43ed-914a-3752f200b2fa.png)

The admin tools are used locally, and they should not be deployed online.

Administrative tools  
![admin-tools](https://user-images.githubusercontent.com/42767842/157247711-bffdfada-6124-4976-b921-93deac1b20eb.png)

Product management & creation  
![admin-tools-create-procut](https://user-images.githubusercontent.com/42767842/157247739-5a96c153-eb8d-4fb8-809f-57d7b43f000d.png)

Category management & creation  
![admin-tools-category](https://user-images.githubusercontent.com/42767842/157247736-7d703641-a625-46b3-808a-ba6d721066fa.png)

Account management  
![admin-tools-account](https://user-images.githubusercontent.com/42767842/157247722-bcc6ed19-2155-4338-bc45-190d9d21dd6d.png)

Features:  
- Client application
  - Users can browse products in different categories and search for products with keywords
  - Products can be added to the shopping cart with customization options
  - Users can place orders on products
  - Support for different delivery methods
  - **Different payment providers can be selected, but the actual payment functionality has not been implemented**
  - Users can create an account on the site and log in with token auth
  - Users can change their account settings, and view previous orders
- Admin application
  - Admins can add/remove/modify products
  - Products are put up for sale with pictures, language-specific names, descriptions, customization options, multiple different currencies, and also specific a category
  - By default the application supports English and Finnish, more languages can be added, but the client has to be modified some to support more
  - Also, by default the application supports Euro, but more can be added, however the frontend requires some tinkering
  - Admins can add/remove/modify categories
  - Admins can modify/remove accounts
- Server
  - The client and admin application talk to the server runnin in [Heroku](https://dashboard.heroku.com/). The server is running an Express http server and an Apollo GraphQL server.
  - The database solution is MongoDB. In production the server connects to a database running in [MongoDB](https://www.mongodb.com/)
  - In development a local [Docker Mongo container](https://hub.docker.com/_/mongo) is booted up with initial values.

The client and admin application use [Create React App](https://github.com/facebook/create-react-app).

# Setup

Start up by cloning this project on your machine!  

Requirements:  
- Make sure you have node.js installed
  - You can test this by opening a terminal and running `node -v`
  - This should print the node.js version, otherwise find out how to install node.js on your operating system
- Make sure you have Docker installed **and running** (for development only)
  - You can test this by opening a terminal and running `docker -v`
  - This should print the Docker version, otherwise find out how to install Docker on your operating system

## Admin tools

- If you haven't installed dependencies yet, open the project root directory with a terminal and run `npm run install:admin`
- In the root directory run `npm run admin`
  - This should launch a development server and a browser window which connects to the Heroku application at https://fso-2021-recom.herokuapp.com

You can change the admin tool connection string to administer your own deployment by changing the script as follows:  
`"admin": "cd ./admin && cross-env REACT_APP_BACKEND_URL=<heroku app url> PORT=3060 npm start"`  
You can find the heroku app url by opening your app from Heroku.  

## Development

Setting up the development environment  

Note: when starting the development environment for the first time, the mongo container might not launch fast enough and the backend application will throw a timeout exception (1 minute). Just Ctrl+C and then start the development environment again.  

- Open the project root directory with a terminal and run `npm run ins`
  - This should run `npm install` on all of the projects applications
  - However, if you encounter problems with `npm run ins`, you can install dependencies manually:
    - Run `npm install` in the project root directory
    - Open ./admin in your terminal and run `npm install`
    - Open ./client in your terminal and run `npm install`
    - Open ./server in your terminal and run `npm install`
- Start the development environment by running `npm run dev` in the project root directory
  - If this fails, you can try to fix the script string according to your platform or start up each development:x process seperately

After this, to connect to the client application, open a browser and connect to `localhost:3000`  
To connect to the admin application, connect to `localhost:3050`  
To connect to the GraphQL Explorer, connect to `localhost:4000/graphql`

The local mongo database is preserved after the environment is shut down.  
To force reinitialization, delete mongo/mongo_data folder and restart the environment.

## Production

Setting up a local production environment.  
Notice that this uses the data in MongoDB.  

- Make sure your .env file and MongoDB are configured correctly (see Envrionment variables section)
- Make sure you have Docker installed **and running**
  - You can test this by opening a terminal and running `docker -v`
  - This should print the Docker version, otherwise find out how to install Docker on your operating system
- If you haven't installed dependencies yet, open the project root directory with a terminal and run `npm run ins`
- Build the client application by running `npm run bld`
- Start the production envrionment by running `npm run prod`
- You can connect to this instance with admin tools by running `npm run development:admin` and opneing a browser with `localhost:3050`

## Environment variables

The application has two envrionment variables needed for a production build to run.  
**In a local production environment, the variables have to in a file named .env in the server directory (./server/.env)**  
In a Heroku deployment, the variables are defined in app Config Vars.  

- JWT_SECRET=\[value\]
  - This is the key used to encrypt/decrypt account tokens on the GraphQl server
  - Make sure this value is kept secret
  - It should be a lengthy string, like a good password, to make it more secure
- DB_URI=\[value\]
  - This key points to the Mongo database in production
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

## Deployment
  
Deploying to Heroku
  
- Create an account and a new app in [Heroku](https://dashboard.heroku.com/)
- Change got the Settings tab in your application
  - Click Reveal Config Vars (see Environment variables section for more details)
  - Enter two keys and values:
    - DB_URI - <MongoDB connection string>
    - JWT_SECRET - <jsonwebtoken encryption key>
- Install the Heroku CLI
- Open a terminal and login to Heroku using `heroku login`
- Change the active directory to recom
- Enter `heroku git:remote -a <your app name>`
- Enter `npm run deploy`
  
Managing categories, products, and users once the app is running in Heroku and the database is empty

- Open the store in your browser and register a new account
- Open [MongoDB](https://www.mongodb.com/) and open the database
- Select Browse Collections
- Select the accounts tab
- Change the accountType field from `Customer` to `Admin` and click Update
- Launch the admin application using `npm run admin`
- Create categories, create products, manage accounts...
