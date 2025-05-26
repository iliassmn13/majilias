const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Route pour recevoir les messages de contact
app.post('/api/contact', (req, res) => {
    const { prenom, nom, email, telephone, pays, profil, message } = req.body;

    const sql = `INSERT INTO contacts (prenom, nom, email, telephone, pays, profil, message) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(sql, [prenom, nom, email, telephone, pays, profil, message], function(err) {
        if (err) {
            console.error('Erreur lors de l\'insertion:', err);
            res.status(500).json({ success: false, error: err.message });
            return;
        }
        res.json({ success: true, id: this.lastID });
    });
});

// Route pour récupérer tous les contacts
app.get('/api/contacts', (req, res) => {
    db.all('SELECT * FROM contacts ORDER BY date_creation DESC', [], (err, rows) => {
        if (err) {
            console.error('Erreur lors de la récupération des contacts:', err);
            res.status(500).json({ success: false, error: err.message });
            return;
        }
        res.json({ success: true, contacts: rows });
    });
});

// Route pour supprimer un contact
app.delete('/api/contacts/:id', (req, res) => {
    db.run('DELETE FROM contacts WHERE id = ?', req.params.id, function(err) {
        if (err) {
            console.error('Erreur lors de la suppression:', err);
            res.status(500).json({ success: false, error: err.message });
            return;
        }
        res.json({ success: true, deleted: this.changes });
    });
});

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
}); 