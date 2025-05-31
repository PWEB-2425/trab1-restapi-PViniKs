const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const port = 3058

const { MongoClient, ObjectId } = require('mongodb')
const url = 'mongodb+srv://pviniks:HE2e0Yd9D0ZsVBan@pw.1b8agc4.mongodb.net/'
const client = new MongoClient(url)
const dbName = 'trab1'
let alunosCollection
let cursosCollection

app.use(cors({ origin: "*" }))
app.use(express.json())
console.log('Iniciando o servidor...')

// Conectar MongoDB
async function conectarMongo() {
    await client.connect()
    const db = client.db(dbName)
    alunosCollection = db.collection('alunos')
    cursosCollection = db.collection('cursos')
    console.log('Conectado ao MongoDB')
}

// Frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'))
})
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/style.css'))
})
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/script.js'))
})

app.get('/alunos', async (req, res) => {
    try {
        const alunos = await alunosCollection.find().toArray()
        res.json(alunos)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar alunos' })
    }
})

app.get('/cursos', async (req, res) => {
    try {
        const cursos = await cursosCollection.find().toArray()
        res.json(cursos)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar cursos' })
    }
})

conectarMongo().then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`)
    })
})