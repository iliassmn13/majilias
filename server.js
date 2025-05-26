const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Ajouter un contact
app.post('/api/contact', async (req, res) => {
  const { prenom, nom, email, telephone, pays, profil, message } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO contacts (prenom, nom, email, telephone, pays, profil, message, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING id`,
      [prenom, nom, email, telephone, pays, profil, message]
    );
    res.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// Récupérer tous les contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer un contact
app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM contacts WHERE id = $1', [req.params.id]);
    res.json({ success: true, deleted: result.rowCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log('Serveur Node.js connecté à Supabase/PostgreSQL sur le port 3001');
});