# Collect Your Shopping Backend 

This is the Collect Your Shopping Backend, written in NestJS with Typescript, using Prisma as ORM. 

In order to get started with this project after cloning, you would need to undertake the following steps: 

1. Download Docker Desktop
2. Run the `docker compose up` command. You will now see the postgres instance running in the console and in the Docker Desktop progam. You can now kill the command and open the container again in the Docker Desktop program.
3. In the `env` file add the name of the container where it says `you-container-name-here`
4. Run the command: `npx prisma migrate dev --name "init"`. This will create the Prisma Client and run the migrations for the models in the Prisma Client. 
5. In order to easily check the database and interact with it, I recommend downloading PgAdmin. This can be downloaded [here](https://www.pgadmin.org/download/)
6. After downloading PgAdmin, go to *Servers* -> *Register* -> *Server..*
7. Give it any name you want and, use `localhost` as address with `5432` as port. Username and password can be copied from the `docker-compose.yml` file
8. Once you've added the server, you should see a database with the same name as your docker container
9. Enter this database and go to *Schemas* -> *public* -> *Tables*
10. Here you should see your database tables filled with some seed data 
11. Run `yarn start:dev` to run the NestJS server
12. If everything went correctly, you should be able to see the Swagger Documentation at `localhost:3000/api`
13. In order to use Authentication, add the `FIREBASE_AUDIENCE` and the `FIREBASE_ISSUER` entries in the `.envz`, which is the name of this project ;)
14. To easily make API requests within VS Code, use the `Thunder Client` extension. The requests are stored in the `thunder-tests` file, which allows use to share these requests for API testing. 



For easy seeding, try `npx prisma db push --force-reset && npx prisma db seed`