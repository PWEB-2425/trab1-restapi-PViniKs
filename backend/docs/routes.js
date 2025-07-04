/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Lista todos os alunos
 *     tags: [Rotas Alunos]
 *     responses:
 *       200:
 *         description: Lista de alunos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 683b584cd300f3c3ce1fdd85
 *                   nome:
 *                     type: string
 *                     example: Isadora
 *                   apelido:
 *                     type: string
 *                     example: Sopran Burigo
 *                   curso:
 *                     type: string
 *                     example: "4"
 *                   anoCurricular:
 *                     type: string
 *                     example: "1"
 *                   idade:
 *                     type: integer
 *                     example: 17
 */

/**
 * @swagger
 * /alunos:
 *   post:
 *     summary: Adiciona um novo aluno
 *     tags: [Rotas Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: John
 *               apelido:
 *                 type: string
 *                 example: Doe
 *               curso:
 *                 type: string
 *                 example: 1
 *               anoCurricular:
 *                 type: string
 *                 example: 2
 *               idade:
 *                 type: integer
 *                 example: 18
 *     responses:
 *       201:
 *         description: Aluno adicionado com sucesso
 *       500:
 *         description: Erro ao adicionar aluno
 */

/**
 * @swagger
 * /alunos/update/{id}:
 *   put:
 *     summary: Atualiza um aluno pelo ID
 *     tags: [Rotas Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do aluno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Jane
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso
 *       404:
 *         description: Aluno não encontrado
 *       500:
 *         description: Erro ao atualizar aluno
 */

/**
 * @swagger
 * /alunos/delete/{id}:
 *   delete:
 *     summary: Remove um aluno pelo ID
 *     tags: [Rotas Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Aluno deletado com sucesso
 *       404:
 *         description: Aluno não encontrado
 *       500:
 *         description: Erro ao deletar aluno
 */

/**
 * @swagger
 * /cursos:
 *   get:
 *     summary: Lista todos os cursos
 *     tags: [Rotas Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 683eb614406633b4945f25b1
 *                   nomeDoCurso:
 *                     type: string
 *                     example: Curso de Graduação em Cinema
 *                   id:
 *                     type: string
 *                     example: 4
 */

/**
 * @swagger
 * /cursos:
 *   post:
 *     summary: Adiciona um novo curso
 *     tags: [Rotas Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeDoCurso:
 *                 type: string
 *                 example: Ciência da Computação
 *               id:
 *                 type: string
 *                 example: 5
 *     responses:
 *       201:
 *         description: Aluno adicionado com sucesso
 *       500:
 *         description: Erro ao adicionar aluno
 */

/**
 * @swagger
 * /cursos/update/{id}:
 *   put:
 *     summary: Atualiza um curso pelo ID
 *     tags: [Rotas Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeDoCurso:
 *                 type: string
 *                 example: Ciência da Computação Avançada
 *     responses:
 *       200:
 *         description: Curso atualizado com sucesso
 *       404:
 *         description: Curso não encontrado
 *       500:
 *         description: Erro ao atualizar curso
 */

/**
 * @swagger
 * /cursos/delete/{id}:
 *   delete:
 *     summary: Remove um curso pelo ID
 *     tags: [Rotas Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do curso
 *     responses:
 *       200:
 *         description: Curso deletado com sucesso
 *       404:
 *         description: Curso não encontrado
 *       500:
 *         description: Erro ao deletar curso
 */