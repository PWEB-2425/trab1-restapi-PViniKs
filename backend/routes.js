/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Lista todos os alunos
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
