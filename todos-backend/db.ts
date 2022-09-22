import {DB} from "https://deno.land/x/sqlite/mod.ts";

// Open a database
const db = new DB("todos.sqlite");

await db.execute(`CREATE TABLE IF NOT EXISTS todo
(
    id VARCHAR(64) PRIMARY KEY,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL
)`);

export default db;
