# Development

Running the development environment

```
npm run dev
```

The entire development environment has been dockerized, and handled by
docker-compose. This starts the server, client, and admin application.

After this, to connect to the client application, open a browser and connect to
`localhost:3000`  
To connect to the admin application, connect to `localhost:3050`  
To connect to the GraphQL Explorer, connect to `localhost:4000/graphql`

The local mongo database is preserved after the environment is shut down.  
To force reinitialization, delete mongo/mongo_data folder and restart the
environment.
