const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3058;

const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb+srv://pviniks:HE2e0Yd9D0ZsVBan@pw.1b8agc4.mongodb.net/";
const client = new MongoClient(url);
const dbName = "trab1";
let alunosCollection;

const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("swagger-jsdoc");

const swaggerSpec = swaggerDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Alunos",
      version: "1.0.0",
      description: "API para gerenciar alunos",
    },
    tags: [
      {
        name: "Rotas",
        description: "Rotas para gerenciamento de alunos",
      },
    ],
  },
  apis: ["./docs/routes.js"],
});

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log("Iniciando o servidor...");

// conecta MongoDB
async function conectarMongo() {
  await client.connect();
  const db = client.db(dbName);
  alunosCollection = db.collection("alunos");
  console.log("Conectado ao MongoDB");
}

// Frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});
app.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/style.css"));
});
app.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/script.js"));
});

// rota GET
app.get("/alunos", async (req, res) => {
  try {
    const alunos = await alunosCollection.find().toArray();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar alunos" });
  }
});

// rota POST
app.post("/alunos", async (req, res) => {
  try {
    const aluno = req.body;
    const result = await alunosCollection.insertOne(aluno);
    res
      .status(201)
      .json(
        { _id: result.insertedId, ...aluno },
        { message: "Aluno adicionado com sucesso" }
      );
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar aluno" });
  }
});

// rota PUT
app.put("/alunos/update/:id", async (req, res) => {
  const id = req.params.id;
  const alunoAtualizado = req.body;
  try {
    const result = await alunosCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: alunoAtualizado }
    );
    if (result.matchedCount === 1) {
      res.status(200).json({ message: "Aluno atualizado com sucesso" });
    } else {
      res.status(404).json({ error: "Aluno não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar aluno" });
  }
});

// rota DELETE
app.delete("/alunos/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await alunosCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Aluno deletado com sucesso" });
    } else {
      res.status(404).json({ error: "Aluno não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar aluno" });
  }
});

// inicializa o servidor
conectarMongo().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
});
