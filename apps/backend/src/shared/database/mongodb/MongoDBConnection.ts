import mongoose from 'mongoose';
import type { IDatabaseConnection } from '../interfaces/IDatabaseConnection';

/**
 * Class for managing MongoDB database connections using Mongoose.
 */
export class MongoDBConnection implements IDatabaseConnection {
  private connected: boolean = false;

  async connect(): Promise<void> {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI is not defined in environment variables');
      process.exit(1);
    }

    try {
      await mongoose.connect(MONGODB_URI);
      this.connected = true;
      console.log('✅ Connected to MongoDB');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      process.exit(1);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      this.connected = false;
      console.log('✅ Disconnected from MongoDB');
    } catch (error) {
      console.error('❌ MongoDB disconnection error:', error);
      throw error;
    }
  }

  isConnected(): boolean {
    return this.connected && mongoose.connection.readyState === 1;
  }
}
