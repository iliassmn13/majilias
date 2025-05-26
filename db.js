const { Pool } = require('pg');

const pool = new Pool({
  user: 'iliassmn13',
  host: 'db.ovtwdvccjotkwrndmcwn.supabase.co',
  database: 'majilias contact',
  password: 'Majdouline@2', // Mets ici le mot de passe de ta base Supabase
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool; 