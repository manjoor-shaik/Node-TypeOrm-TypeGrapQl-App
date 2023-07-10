import { connectDatabase } from "./connectDatabase";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./resolvers/BookResolver";
import Koa from "koa";
import { ApolloServer } from "apollo-server-koa";
require('dotenv').config();

async function main() {
   await connectDatabase();
  // Create a Koa app
  const app = new Koa();

   const schema = await buildSchema({
    resolvers: [BookResolver],
})
  const server = new ApolloServer({ schema }); // Apply Apollo Server middleware to the Koa app
  await server.start();
  server.applyMiddleware({ app });
  const port = process.env.PORT || 8090; 
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${port}`);
  });
}
main().catch((error) => { 
  console.error("Error starting server:", error);
});
