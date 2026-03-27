import { db } from "../db.js";

db.exec(`

    DROP TABLE IF EXISTS items;
    
    CREATE TABLE items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT NOT NULL
    );
    
    INSERT INTO items (label) VALUES 
    ('apples'),
    ('bannaas'),
    ('cheerys');
        
        
        
    `)