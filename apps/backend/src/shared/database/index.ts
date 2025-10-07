import type { IDatabaseConnection } from './interfaces/IDatabaseConnection';
import { MongoDBConnection } from './mongodb/MongoDBConnection';
// import { PostgreSQLConnection } from './postgres/PostgreSQLConnection';

const DB_TYPE = process.env.DB_TYPE || 'mongodb';

function createDatabaseConnection(): IDatabaseConnection {
  switch (DB_TYPE) {
    case 'mongodb':
      return new MongoDBConnection();
    // case 'postgres':
    //   return new PostgreSQLConnection();
    default:
      return new MongoDBConnection();
  }
}

export const databaseConnection = createDatabaseConnection();

// Re-exporting interfaces
export * from './interfaces/IDatabaseConnection';
