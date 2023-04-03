# Local production environment

To run a local production environment, which connects to a database online, you
need to set up environment variables first.

## Environment variables

The application has two envrionment variables needed for a production build to
run. These values are defined in a file named `.env` in the root directory. Make
sure to keep these values safe and hidden.

- JWT_SECRET=\[value\]
  - This is the key used to encrypt/decrypt account tokens on the GraphQl server
  - It should be a lengthy string, like a good password, to make it more secure
- DB_URI=\[value\]
  - This key points to the Mongo database in production
  - **Setting up MongoDB**
  - Create an account on [MongoDB](https://www.mongodb.com/).
  - Create a new organization on the website (you can also use an existing one)
  - Create a nea branch is mergedalso be configured to allow connections from
    anywhere, but that is less secure
  - Then go to the deployment view, and press Connect on your database
  - Select Connect your application
  - The default settings should be Driver: "Node.js", and Version: "4.1 or
    later"
  - Copy the connection string, which should be something like:
    mongodb+srv://<user>:<password>@database.ishgo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    - The <user> field is filled in automatically with your username
    - Replace the <password> field with the password to your user
      - Note that this is different from the one to your account on MongoDB
      - You can change your user password from the Database Access section
    - Replace "myFirstDatabase" with the name of your database, for example
      "store"
  - After modifying the connection string, replace <value> in the .env file with
    the new string

The file should look something like this after setup:

```
JWT_SECRET=supergoodandsecretkey
DB_URI=mongodb+srv://myUser:myUserPassword@database.ishgo.mongodb.net/recom?retryWrites=true&w=majority
```

## Production

- Make sure you have Docker installed **and running**
  - You can test this by opening a terminal and running `docker -v`
  - This should print the Docker version, otherwise find out how to install
    Docker on your operating system

Build the production image by running

```
npm run build
```

Start the production container by running

```
npm run prod
```
