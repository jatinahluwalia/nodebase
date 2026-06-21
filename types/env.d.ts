export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      BETTER_AUTH_URL: string;
      BETTER_AUTH_SECRET: string;
      INNGEST_DEV: string;
      GOOGLE_GENERATIVE_AI_API_KEY: string;
      POLAR_ACCESS_TOKEN: string;
      POLAR_SUCCESS_URL: string;
    }
  }
}
