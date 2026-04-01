import { db } from "../db.js";

db.exec(`


    
    DROP TABLE IF EXISTS items;
    DROP TABLE IF EXISTS sessions;
    DROP TABLE IF EXISTS users;

    CREATE TABLE users (
    username TEXT PRIMARY KEY,
    hashedPassword TEXT NOT NULL
    );

    CREATE TABLE sessions (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username)
    );
    
    CREATE TABLE items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT NOT NULL
    );
    
    INSERT INTO items (label) VALUES 
    ('apples'),
    ('bannaas'),
    ('cheerys');
        
        
        
    `)