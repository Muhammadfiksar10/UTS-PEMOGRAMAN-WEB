const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Konfigurasi Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kampus_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Database Connected!');
});

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Konfigurasi Upload Foto (Multer)
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// --- ROUTES ---

// READ: Menampilkan Data
app.get('/', (req, res) => {
    db.query('SELECT * FROM mahasiswa', (err, results) => {
        if (err) throw err;
        res.render('index', { mahasiswa: results });
    });
});

// CREATE: Form Tambah
app.get('/tambah', (req, res) => {
    res.render('tambah');
});

// CREATE: Proses Simpan
app.post('/simpan', upload.single('foto'), (req, res) => {
    const { nim, nama, jurusan } = req.body;
    const foto = req.file.filename;
    
    const sql = "INSERT INTO mahasiswa (nim, nama, jurusan, foto) VALUES (?, ?, ?, ?)";
    db.query(sql, [nim, nama, jurusan, foto], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// DELETE: Hapus Data
app.get('/hapus/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM mahasiswa WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});