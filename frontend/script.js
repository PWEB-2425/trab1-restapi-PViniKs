// constantes para os elementos
const abrirForm = document.querySelector("#abrirForm");
const formAddAluno = document.querySelector(".formAddAluno");
const cancelAluno = document.querySelector("#cancelAluno");
const addAluno = document.querySelector("#addAluno");
const idadeRange = document.querySelector("#idadeAluno");
const idadeValor = document.querySelector("#idadeValue");
const idades = Array.from({ length: 128 - 16 + 1 }, (_, i) => i + 16);
const nomeAluno = document.querySelector("#nomeAluno");
const apelidoAluno = document.querySelector("#apelidoAluno");
const cursoAluno = document.querySelector("#cursoAluno");
const anoCurricular = document.querySelector("#anoCurricular");
const semestre = document.querySelector("#semestre");
const alunosList = document.querySelector("#alunosList");
const verAlunos = document.querySelector("#verAlunos");

// botão para abrir o form de adição de aluno
abrirForm.addEventListener("click", function () {
  formAddAluno.classList.remove("hidden");
  abrirForm.classList.add("hidden");
  nomeAluno.value = "";
  apelidoAluno.value = "";
  cursoAluno.value = "4";
  anoCurricular.value = "1";

  formAddCursos(getCursos());

  for (let i = idades.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idades[i], idades[j]] = [idades[j], idades[i]];
  }
  idadeValor.textContent = idades[0];
  idadeRange.value = 0;
});

// função para pegar os cursos pelo endpoint
function getCursos() {
  return fetch("http://localhost:3058/cursos")
    .then((response) => response.json())
    .then((cursos) => {
      return cursos;
    })
    .catch((error) => {
      console.error("Erro ao buscar cursos:", error);
      return [];
    });
}

// range de idades (16 a 128 anos)
idadeRange.min = 0;
idadeRange.max = idades.length - 1;
idadeRange.value = 0;
idadeRange.addEventListener("input", function () {
  idadeValor.textContent = idades[this.value];
});

// botão para cancelar a adição de aluno
cancelAluno.addEventListener("click", function () {
  formAddAluno.classList.add("hidden");
  abrirForm.classList.remove("hidden");
});

// botão para adicionar aluno
addAluno.addEventListener("click", function (e) {
  e.preventDefault();

  const nome = nomeAluno.value.trim();
  const apelido = apelidoAluno.value.trim();

  if (!nome || !apelido) {
    alert("Por favor, preencha todos os campos obrigatoriamente.");
    return;
  }

  if (nome && apelido) {
    const aluno = {
      nome: nome,
      apelido: apelido,
      curso: cursoAluno.value,
      anoCurricular: anoCurricular.value,
      idade: idades[idadeRange.value],
    };

    // solicita POST para adicionar aluno
    fetch("http://localhost:3058/alunos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aluno),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Aluno adicionado:", data);
        formAddAluno.classList.add("hidden");
        abrirForm.classList.remove("hidden");
        verAlunos.click();
      })
      .catch((error) => {
        console.error("Erro ao adicionar aluno:", error);
      });
  }
});

// botão para ver a lista de alunos
verAlunos.addEventListener("click", function () {
  alunosList.innerHTML = "";

  // solicita GET para buscar alunos
  fetch("http://localhost:3058/alunos")
    .then((response) => response.json())
    .then((alunos) => {
      // para cada aluno cria um elemento div com as informações
      alunos.forEach((aluno) => {
        const alunoDiv = document.createElement("div");
        alunoDiv.classList.add("aluno");

        alunoDiv.innerHTML = `
                    <table>
                        <hr>
                        <tr>
                            <th class="headerTH">Nome</th>
                            <td id="nomeAluno" class="infoAluno">${
                              aluno.nome
                            }</td>
                        </tr>
                        <tr>
                            <th class="headerTH">Apelido</th>
                            <td id="apelidoAluno" class="infoAluno">${
                              aluno.apelido
                            }</td>
                        </tr>
                        <tr>
                            <th class="headerTH">Idade</th>
                            <td id="idadeAluno" class="infoAluno">${fixIdade(
                              aluno.idade
                            )}</td>
                        </tr>
                        <tr>
                            <th class="headerTH">Curso</th>
                            <td id="cursoAluno" class="infoAluno">${fixCurso(
                              aluno.curso
                            )}</td>
                        </tr>
                        <tr>
                            <th class="headerTH">Ano</th>
                            <td id="anoAluno" class="infoAluno">${fixAno(
                              aluno.anoCurricular
                            )}</td>
                        </tr>
                    </table>
                    <div id="doisBotoes">
                        <button class="editAluno meioBotao btnYlw" id="${
                          aluno._id
                        }">Editar ${aluno.nome}</button>
                        <button class="delAluno meioBotao btnRed" id="${
                          aluno._id
                        }">Apagar ${aluno.nome}</button>
                    </div>
                `;

        alunosList.appendChild(alunoDiv);

        // botão para editar aluno
        alunoDiv
          .querySelector(".editAluno")
          .addEventListener("click", function () {
            const original = {
              nome: aluno.nome,
              apelido: aluno.apelido,
              curso: aluno.curso,
              anoCurricular: aluno.anoCurricular,
              idade: aluno.idade,
            };
            console.log("Editando aluno:", original);
            alunoDiv.querySelector(
              "#nomeAluno"
            ).innerHTML = `<input type="text" id="nomeAlunoInput" value="${aluno.nome}" required autocomplete="off">`;
            alunoDiv.querySelector(
              "#apelidoAluno"
            ).innerHTML = `<input type="text" id="apelidoAlunoInput" value="${aluno.apelido}" required autocomplete="off">`;
            alunoDiv.querySelector(
              "#idadeAluno"
            ).innerHTML = `<input type="number" id="idadeAlunoInput" min="16" max="128" value="${aluno.idade}">`;

            alunoDiv.querySelector("#cursoAluno").innerHTML = `
                        <select id="cursoAlunoInput">
                            <option value="1" ${
                              aluno.curso === "1" ? "selected" : ""
                            }>Engenharia da Computação Gráfica e Multimédia</option>
                            <option value="2" ${
                              aluno.curso === "2" ? "selected" : ""
                            }>Engenharia de Redes e Sistemas de Computadores</option>
                            <option value="3" ${
                              aluno.curso === "3" ? "selected" : ""
                            }>Bacharelado em Sistemas de Informação</option>
                            <option value="4" ${
                              aluno.curso === "4" ? "selected" : ""
                            }>Curso de Graduação em Cinema</option>
                        </select>
                    `;

            alunoDiv.querySelector("#anoAluno").innerHTML = `
                        <select id="anoCurricularInput">
                            <option value="1" ${
                              aluno.anoCurricular === "1" ? "selected" : ""
                            }>1º Ano</option>
                            <option value="2" ${
                              aluno.anoCurricular === "2" ? "selected" : ""
                            }>2º Ano</option>
                            <option value="3" ${
                              aluno.anoCurricular === "3" ? "selected" : ""
                            }>3º Ano</option>
                            <option value="4" ${
                              aluno.anoCurricular === "4" ? "selected" : ""
                            }>4º Ano</option>
                        </select>
                    `;

            const btns = alunoDiv.querySelector("#doisBotoes");
            btns.innerHTML = `
                        <button class="confirmEdit meioBotao btnPrp" id="${aluno._id}">Salvar</button>
                        <button class="cancelEdit meioBotao btnRed" id="${aluno._id}">Cancelar</button>
                    `;

            btns
              .querySelector(".confirmEdit")
              .addEventListener("click", function () {
                const nome = alunoDiv
                  .querySelector("#nomeAlunoInput")
                  .value.trim();
                const apelido = alunoDiv
                  .querySelector("#apelidoAlunoInput")
                  .value.trim();
                const idade = parseInt(
                  alunoDiv.querySelector("#idadeAlunoInput").value,
                  10
                );
                const curso = alunoDiv.querySelector("#cursoAlunoInput").value;
                const ano = alunoDiv.querySelector("#anoCurricularInput").value;

                if (!nome || !apelido) {
                  alert(
                    "Por favor, preencha todos os campos obrigatoriamente."
                  );
                  return;
                }

                // solicita PUT para editar aluno
                fetch(`http://localhost:3058/alunos/update/${aluno._id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    nome: nome,
                    apelido: apelido,
                    curso: curso,
                    anoCurricular: ano,
                    idade: idade,
                  }),
                })
                  .then((response) => response.json())
                  .then(() => {
                    verAlunos.click();
                  })
                  .catch((error) => {
                    console.error("Erro ao editar aluno:", error);
                  });
              });

            // botão para cancelar edição
            btns
              .querySelector(".cancelEdit")
              .addEventListener("click", function () {
                verAlunos.click();
              });
          });

        // botão para deletar aluno
        alunoDiv
          .querySelector(".delAluno")
          .addEventListener("click", function () {
            if (
              !confirm(
                "Tem certeza que deseja apagar este aluno? Esta ação não pode ser desfeita."
              )
            ) {
              return;
            }
            const id = this.id;

            // solicita DELETE para deletar aluno
            fetch(`http://localhost:3058/alunos/delete/${id}`, {
              method: "DELETE",
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                verAlunos.click();
              })
              .catch((error) => {
                console.error("Erro ao deletar aluno:", error);
              });
          });
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar alunos:", error);
    });
});

// função para corrigir a exibição do curso
function fixCurso(curso) {
  switch (curso) {
    case "1":
      return "Engenharia da Computação Gráfica e Multimédia";
    case "2":
      return "Engenharia de Redes e Sistemas de Computadores";
    case "3":
      return "Bacharelado em Sistemas de Informação";
    case "4":
      return "Curso de Graduação em Cinema";
    default:
      return curso;
  }
}

// função para corrigir a exibição do ano curricular
function fixAno(ano) {
  switch (ano) {
    case "1":
      return "1º Ano";
    case "2":
      return "2º Ano";
    case "3":
      return "3º Ano";
    case "4":
      return "4º Ano";
    default:
      return ano;
  }
}

// função para corrigir a exibição da idade
function fixIdade(idade) {
  return idade + " anos";
}
