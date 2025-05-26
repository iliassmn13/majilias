const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Créer une connexion à la base de données
const db = new sqlite3.Database(path.join(__dirname, 'contacts.db'), (err) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données:', err);
    } else {
        console.log('Connecté à la base de données SQLite');
        // Créer la table contacts si elle n'existe pas
        db.run(`CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            prenom TEXT NOT NULL,
            nom TEXT NOT NULL,
            email TEXT NOT NULL,
            telephone TEXT,
            pays TEXT,
            profil TEXT NOT NULL,
            message TEXT NOT NULL,
            date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

module.exports = db; 