import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
 
interface IEnvironmentVariables {
    DATABASE_HOST: string;
    DATABASE_PORT: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string,
    PORT: string;
    JWT_SECRET: string;
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
    CALLBACK_URL: string;
    CLOUDINARY_API_SECRET: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_CLOUD_NAME: string;
}


const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_NAME,
    PORT,
    JWT_SECRET,
    GOOGLE_ID,
    GOOGLE_SECRET,
    CALLBACK_URL,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME
} = process.env as unknown as IEnvironmentVariables;

export default () => ({
    PORT: parseInt(PORT) || 4000,
    JWT_SECRET,
    GOOGLE_ID,
    GOOGLE_SECRET,
    CALLBACK_URL,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME,
    database: {
        type: 'postgres',
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        username: DATABASE_USERNAME,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
        entities: ["dist/modules/**/*.entity{.ts,.js}"],
        migrations: ["dist/database/migrations/*{.ts,.js}"],
        autoLoadEntities: true,
        synchronize: false,
    }
});
  
