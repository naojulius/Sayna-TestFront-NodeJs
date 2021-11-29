import { Schema, model, connect } from 'mongoose';
export async function connectDatabase(): Promise<void> {
    //"mongodb+srv://naojulius:naojulius@cluster0.pvbsa.mongodb.net/SaynaApi?retryWrites=true&w=majority"
    await connect("mongodb://127.0.0.1:27017", {dbName:"SaynaDb"});
}