const fs = require("fs");
const path = require("path");
const sequelize = require("../src/config/database"); 

async function initializeDatabase() {
    try {
        // read file migrations.sql
        const migrationsPath = path.join(__dirname, "../../migrations.sql");
        const migrationsSQL = fs.readFileSync(migrationsPath, "utf-8");

        // initialize the database with the SQL file
        await sequelize.query(migrationsSQL, { raw: true });

        console.log("✅ Database inizializzato con successo!");
    } catch (error) {
        console.error("❌ Errore durante l'inizializzazione del database:", error);
    } finally {
        
        await sequelize.close();
    }
}

// initilize the database with `node initDatabase.js`
if (require.main === module) {
    initializeDatabase();
}

module.exports = initializeDatabase;
