const sequelize = require("./config/database"); 
const app = require("./server"); 

const PORT = process.env.PORT || 3000;

// Connection to DB
sequelize.authenticate()
    .then(() => {
        console.log("✅ Database connesso con successo");
        
        
        app.listen(PORT, () => {
            console.log(`🚀 Server avviato su http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("❌ Errore di connessione al database:", err);
    });
