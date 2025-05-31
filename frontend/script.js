const idadeRange = document.querySelector("#idadeAluno");
const idadeValor = document.querySelector("#idadeValue");
const abrirForm = document.querySelector("#abrirForm");
const formAddAluno = document.querySelector(".formAddAluno");
const idades = Array.from({length: 128 - 16 + 1}, (_, i) => i + 16);
const cancelAluno = document.querySelector("#cancelAluno");
const addAluno = document.querySelector("#addAluno");
const nomeAluno = document.querySelector("#nomeAluno");
const apelidoAluno = document.querySelector("#apelidoAluno");
const cursoAluno = document.querySelector("#cursoAluno");
const anoCurricular = document.querySelector("#anoCurricular");
const semestre = document.querySelector("#semestre");
const alunosList = document.querySelector("#alunosList");
const verAlunos = document.querySelector("#verAlunos");

abrirForm.addEventListener("click", function() {
    formAddAluno.classList.remove("hidden");
    abrirForm.classList.add("hidden");
    nomeAluno.value = "";
    apelidoAluno.value = "";
    cursoAluno.value = "4";
    anoCurricular.value = "1";
    semestre.value = "1";
    for (let i = idades.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [idades[i], idades[j]] = [idades[j], idades[i]];
    }
    idadeValor.textContent = idades[0];
    idadeRange.value = 0;
});

idadeRange.min = 0;
idadeRange.max = idades.length - 1;
idadeRange.value = 0;

idadeRange.addEventListener('input', function() {
    idadeValor.textContent = idades[this.value];
});

cancelAluno.addEventListener("click", function() {
    formAddAluno.classList.add("hidden");
    abrirForm.classList.remove("hidden");
});

addAluno.addEventListener("click", function(e) {
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
            idade: idades[idadeRange.value]
        };

        fetch("http://localhost:3058/alunos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aluno)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Aluno adicionado:", data);
            formAddAluno.classList.add("hidden");
            abrirForm.classList.remove("hidden");
        })
        .catch(error => {
            console.error("Erro ao adicionar aluno:", error);
        });
    }
});

verAlunos.addEventListener("click", function() {
    alunosList.innerHTML = "";
    fetch("http://localhost:3058/alunos")
        .then(response => response.json())
        .then(alunos => {
            alunos.forEach(aluno => {
                const alunoDiv = document.createElement("div");
                alunoDiv.classList.add("aluno");

                alunoDiv.innerHTML = `
                    <table>
                        <hr>
                        <tr>
                            <th class="headerTH">Nome</th>
                            <td id="nomeAluno" class="infoAluno">${aluno.nome} ${aluno.apelido}</td>
                        </tr>
                        <tr>
                            <th class="headerTH">Curso</th>
                            <td id="cursoAluno" class="infoAluno">${fixCurso(aluno.curso)}</td>
                        </tr>
                        <tr>
                            <th class="headerTH">Ano</th>
                            <td id="anoAluno" class="infoAluno">${fixAno(aluno.anoCurricular)}</td>
                        </tr>
                    </table>
                    <button class="delAluno btnRed" id="${aluno._id}">Apagar ${aluno.nome}</button>
                `;

                alunosList.appendChild(alunoDiv);
            });

            const delAlunos = document.querySelectorAll(".delAluno");
            delAlunos.forEach(button => {
                button.addEventListener("click", function() {
                    if (!confirm("Tem certeza que deseja apagar este aluno? Esta ação não pode ser desfeita.")) {
                        return;
                    }
                    const id = this.id;
                    fetch(`http://localhost:3058/alunos/${id}`, {
                        method: "DELETE"
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        verAlunos.click();
                    })
                    .catch(error => {
                        console.error("Erro ao deletar aluno:", error);
                    });
                });
            });
        })
        .catch(error => {
            console.error("Erro ao buscar alunos:", error);
        });
});

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