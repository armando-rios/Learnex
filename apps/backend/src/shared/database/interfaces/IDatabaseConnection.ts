/**
 * Interface for database connection management.
 * Defines methods for connecting, disconnecting, and checking connection status.
 */
export interface IDatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
}
