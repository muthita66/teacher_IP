import pg from "pg";

export const pool = new pg.Pool({
    host: "26.47.10.181",
    user: "postgres",
    pssword: "1234",
    database: "presentBAMBAM",
    port: 5432
});