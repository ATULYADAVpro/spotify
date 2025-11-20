import { connect } from 'mongoose'
import { MONGODB_URL } from './index.js'

export default async function connectDb() {
    try {
        await connect(MONGODB_URL, { dbName: 'spotify' })
        console.log(`database connection success.`)
    } catch (error) {
        console.log("database connection failed. due to :-  " + error.message)
    }
}