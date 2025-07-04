# Trabalho Prático #1 — Consumo e Implementação de APIs RESTful

## Sumário

- [Visão Geral](#Visão-Geral)
- [Demonstração Online](#Demonstração-Online)
- [Estrutura do Projeto](#Estrutura-do-Projeto)
- [Estruturação da Base de Dados](#1-Estruturação-da-Base-de-Dados)
- [API Simulada com JSON-Server](#2-API-Simulada-com-JSON-Server)
- [Interface Web (Front-end)](#3-Interface-Web-Front-end)
- [API RESTful Real (Node.js + Express + MongoDB Atlas)](#4-api-restful-real-nodejs--express--mongodb-atlas)
- [Deploy](#5-Deploy)
- [Documentação da API (Swagger)](#6-Documentação-da-API-Swagger)
- [Como Rodar Localmente](#Como-Rodar-Localmente)
- [Testes](#Testes)
- [Observações](#Observações)
- [Créditos](#Créditos)

---

## Visão Geral

Este projeto é o desenvolvimento de uma aplicação web com front-end e back-end separados, incluindo testes, deploy e documentação. O objetivo foi consolidar conhecimentos de desenvolvimento web, especialmente na criação, consumo e implementação de APIs RESTful utilizando Node.js, Express, MongoDB, JSON-Server, Fetch API e Swagger.

---

## Demonstração Online

- **Front-end (Vercel):** [https://trab1-pw-frontend.vercel.app/](https://trab1-pw-frontend.vercel.app/)
- **API RESTful (Render):** [https://trab1-pw-backend.onrender.com/alunos/](https://trab1-pw-backend.onrender.com/alunos/)
- **Documentação Swagger:** [https://trab1-pw-backend.onrender.com/api-docs/](https://trab1-pw-backend.onrender.com/api-docs/)

---

## Estrutura do Projeto

```
trab1-restapi-PViniKs/
  │
  ├── .github/         # GitHub Classroom Feedback
  ├── backend/         # API RESTful com Node.js + MongoDB
  ├── frontend/        # Interface web (HTML/CSS/JS)
  ├── mock-data/       # Base de dados JSON
  ├── mock-server/     # API simulada com JSON-server
  ├── tests/           # Coleção de testes Postman
  ├── .gitignore       # Arquivo para indicar ao git o que ignorar
  └── README.md        # Este arquivo
```

---

## 1. Estruturação da Base de Dados

- O arquivo [`mock-data/bd.json`](mock-data/bd.json) contém:
  - Lista de alunos: `nome`, `apelido`, `curso`, `anoCurricular`, `idade`, `id`
  - Lista de cursos: `id`, `nomeDoCurso`

---

## 2. API Simulada com JSON-Server

- O diretório [`mock-server/`](mock-server/) possui a configuração do JSON-server.
- Para rodar a API simulada localmente:
  ```sh
  npx json-server -p 3030 ../mock-data/bd.json
  ```
- Endpoints disponíveis:
  - `GET /alunos`
  - `GET /cursos`
  - `GET /alunos/:id`
  - `GET /cursos/:id`
  - `POST /alunos`
  - `POST /cursos`
  - `DELETE /alunos/:id`
  - `DELETE /cursos/:id`
- Testes automatizados com Postman disponíveis em [`tests/postman-collection.json`](tests/postman-collection.json).

---

## 3. Interface Web (Front-end)

- Localizada em [`frontend/`](frontend/)
- Página HTML: [`frontend/index.html`](frontend/index.html)
- Estilos: [`frontend/style.css`](frontend/style.css)
- Scripts: [`frontend/script.js`](frontend/script.js)
- Funcionalidades:
  - Visualizar alunos
  - Adicionar aluno
  - Editar aluno
  - Apagar aluno
- Comunicação com a API via Fetch API.

---

## 4. API RESTful Real (Node.js + Express + MongoDB Atlas)

- Código-fonte em [`backend/`](backend/)
- Principais arquivos:
  - [`backend/server.js`](backend/server.js): Implementação dos endpoints RESTful.
  - [`backend/docs/routes.js`](backend/docs/routes.js): Documentação Swagger dos endpoints.
- Endpoints implementados:
  - `GET /alunos` — Lista todos os alunos
  - `POST /alunos` — Adiciona um novo aluno
  - `PUT /alunos/update/:id` — Atualiza um aluno pelo ID
  - `DELETE /alunos/delete/:id` — Remove um aluno pelo ID
  - `GET /cursos` — Lista todos os cursos
  - `POST /cursos` — Adiciona um novo curso
  - `PUT /cursos/update/:id` — Atualiza um curso pelo ID
  - `DELETE /cursos/delete/:id` — Remove um curso pelo ID
- Conexão com MongoDB Atlas para persistência dos dados.

---

## 5. Deploy

- **Front-end:** Deploy realizado no Vercel ([https://vercel.com](https://vercel.com)).
- **Back-end:** Deploy realizado no Render ([https://render.com](https://render.com)).
- O front-end consome a API real em produção.

---

## 6. Documentação da API (Swagger)

- Documentação dos endpoints disponível em `/api-docs` na API real.
- Arquivo de configuração Swagger: [`backend/docs/routes.js`](backend/docs/routes.js)
- Acesse: [https://trab1-pw-backend.onrender.com/api-docs/](https://trab1-pw-backend.onrender.com/api-docs/)

---

## Como Rodar Localmente

### 1. Clonar o repositório

```sh
git clone https://github.com/PWEB-2425/trab1-restapi-PViniKs.git
cd trab1-restapi-PViniKs
```

### 2. Testar o Mock Server

```sh
cd mock-server
npm install
npm start
```

### 3. Rodar o Back-end Real

```sh
cd backend
npm install
npm start
```

### 4. Rodar o Front-end

Abra [`frontend/index.html`](frontend/index.html) no navegador ou por meio de um servidor local (ex.: [`http://localhost:3058/`](http://localhost:3058/)).

---

## Testes

- Coleção Postman disponível em [`tests/postman-collection.json`](tests/postman-collection.json).
- Teste realizado de todos os endpoints principais da API simulada.

---

## Observações

- O projeto segue a estrutura RESTful.
- O front-end consome corretamente a API real, mas também pode ser adaptado para consumir a API simulada.
- Documentação Swagger facilita o entendimento e uso da API.

---

## Créditos

- Autor: Paulo Vinícius Kuss – 35093 ([pviniks@gmail.com](mailto:pviniks@gmail.com))
- Projeto desenvolvido para a disciplina de Programação Web

---
