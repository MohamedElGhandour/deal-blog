import { connect } from "mongoose";
const databaseName = process.env.DATABASE_NAME;
const databaseUrl = process.env.MONGODB_URL;
const connectionURL = `${databaseUrl}${databaseName}`;
connect(connectionURL);
