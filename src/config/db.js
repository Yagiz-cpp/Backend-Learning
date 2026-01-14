import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import pg from "pg"
import { PrismaPg } from "@prisma/adapter-pg";
// import { connectionString } from "pg/lib/defaults";

const { Pool } = pg;

// Postgres driver (pg) pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Prisma <-> Postgres adapter
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
});

const connectDB = async () => {
    try{
        await prisma.$connect();
        console.log("DB Connected via Prisma");
    } catch (error){
        console.error(`DB Connection error: ${error.message}`);
        process.exit(1);
    }
}


const disconnectDB = async () => {
    await prisma.$disconnect();
};

export {prisma, connectDB, disconnectDB}