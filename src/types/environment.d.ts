declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SQL_CONNECTION_STRING: string;
      DB_MIN_CONNECTIONS: string;
      DB_MAX_CONNECTIONS: string;

      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_DB: string;

      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;

      SALT: string;

      FRONTEND_BASE_URL: string;
      BACKEND_BASE_URL: string;

      PORT: string;

      TZ: string;
    }
  }
}

export {};
