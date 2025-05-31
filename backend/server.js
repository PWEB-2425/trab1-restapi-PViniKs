const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = 3058

const { MongoClient, ObjectId } = require('mongodb')
const url = 'mongodb+srv://pviniks:HE2e0Yd9D0ZsVBan@pw.1b8agc4.mongodb.net/'
const client = new MongoClient(url)
const dbName = 'trab1'
let alunosCollection

app.use(cors({ origin: "*" }))
app.use(express.json())
console.log('Iniciando o servidor...')

// Conectar MongoDB
async function conectarMongo() {
    await client.connect()
    const db = client.db(dbName)
    alunosCollection = db.collection('alunos')
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

app.post('/alunos', async (req, res) => {
    try {
        const aluno = req.body
        const result = await alunosCollection.insertOne(aluno)
        res.status(201).json({ _id: result.insertedId, ...aluno })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar aluno' })
    }
})

app.delete('/alunos/:id', async (req, res) => {
    const id = req.params.id
    try {
        const result = await alunosCollection.deleteOne({ _id: new ObjectId(id) })
        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Aluno deletado com sucesso' })
        } else {
            res.status(404).json({ error: 'Aluno não encontrado' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar aluno' })
    }
})

conectarMongo().then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`)
    })
})