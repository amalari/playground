import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import Container from "typedi";
import StudentResolver from "./student/student.resolver";

async function apolloBootstrap(req, res) {
  const schema = await buildSchema({
    resolvers: [StudentResolver],
    container: Container,
    emitSchemaFile: process.cwd() + "/pages/api/graphql-schema.gql",
  });
  const apolloServer = await new ApolloServer({ schema });
  await apolloServer.start();

  apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await apolloBootstrap(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
