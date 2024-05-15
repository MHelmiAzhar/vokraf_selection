import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, any> => ({
    appEnv: process.env.APP_ENV,
    host: process.env.APP_HOST,
    port: {
      api: process.env.APP_PORT,
    },
    appName: process.env.APP_NAME,
  }),
);
