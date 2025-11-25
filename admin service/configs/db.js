import { connect } from 'mongoose'
import { POSTGRES_DB } from './index.js'
import { neon } from '@neondatabase/serverless'



export const sql = neon(POSTGRES_DB)

export default async function connectDb() {
    try {
        // create tables
        await sql`
            CREATE TABLE IF NOT EXISTS albums(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            thumbnail VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`;

        // for song
        await sql`
            CREATE TABLE IF NOT EXISTS songs(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            thumbnail VARCHAR(255),
            audio VARCHAR(255) NOT NULL,
            album_id INTEGER REFERENCES albums(id) ON DELETE SET NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`;


        console.log(`database initialized success.`)
    } catch (error) {
        console.log("database initialized failed. due to :-  " + error.message)
    }
}