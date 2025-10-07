import { MongoUserRepository, MongoProfileRepository } from './mongodb';
import type { IUserRepository } from './interfaces/IUserRepository';
import type { IProfileRepository } from './interfaces/IProfileRepository';

// Here you can add other database implementations in the future
// import { PostgresUserRepository, PostgresProfileRepository } from './postgres';

const DB_TYPE = process.env.DB_TYPE || 'mongodb';

function createUserRepository(): IUserRepository {
  switch (DB_TYPE) {
    case 'mongodb':
      return new MongoUserRepository();
    // case 'postgres':
    //   return new PostgresUserRepository();
    default:
      return new MongoUserRepository();
  }
}

function createProfileRepository(): IProfileRepository {
  switch (DB_TYPE) {
    case 'mongodb':
      return new MongoProfileRepository();
    // case 'postgres':
    //   return new PostgresProfileRepository();
    default:
      return new MongoProfileRepository();
  }
}

// Export repository instances
export const userRepository = createUserRepository();
export const profileRepository = createProfileRepository();

// Re-export interfaces
export * from './interfaces';
