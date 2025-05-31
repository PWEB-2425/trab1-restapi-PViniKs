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