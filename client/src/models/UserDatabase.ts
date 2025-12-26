// src/models/UserDatabase.ts

import mongoose, { Schema, Document } from 'mongoose';

// 1. Define the Interface for the Document
// This helps with TypeScript strong typing
export interface IUserDatabase extends Document {
    user_id: string;
    // Add other fields in your collection if necessary (e.g., createdAt: Date)
}

// 2. Define the Schema
const UserDatabaseSchema: Schema = new Schema({
    user_id: { type: String, required: true, unique: true },
    // Mongoose automatically handles the database/collection mapping,
    // and it usually creates a default '_id' field.
});

// 3. Define and Export the Model
// Note: Mongoose will pluralize 'UserDatabase' to 'userdatabases' as the
// collection name by default. If your collection name is strictly 
// 'user_databases' (as per your original MongoDB code), you must specify it 
// explicitly in the third argument: { collection: 'user_databases' }
const UserDatabase = mongoose.model<IUserDatabase>(
    'UserDatabase', 
    UserDatabaseSchema, 
    'user_databases' // <-- IMPORTANT: Use the exact collection name
);

export default UserDatabase;