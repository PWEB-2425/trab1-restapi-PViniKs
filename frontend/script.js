const idadeRange = document.querySelector("#idadeAluno");
const idadeValor = document.querySelector("#idadeValue");
const abrirForm = document.querySelector("#abrirForm");
const formAddAluno = document.querySelector(".formAddAluno");
const idades = Array.from({length: 128 - 16 + 1}, (_, i) => i + 17);
const cancelAluno = document.querySelector("#cancelAluno");
const addAluno = document.querySelector("#addAluno");

abrirForm.addEventListener("click", function() {
    formAddAluno.classList.remove("hidden");
    abrirForm.classList.add("hidden");
});

for (let i = idades.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idades[i], idades[j]] = [idades[j], idades[i]];
}

idadeRange.min = 0;
idadeRange.max = idades.length - 1;
idadeRange.value = 0;
idadeValor.textContent = idades[0];

idadeRange.addEventListener('input', function() {
    idadeValor.textContent = idades[this.value];
});

cancelAluno.addEventListener("click", function() {
    formAddAluno.classList.add("hidden");
    abrirForm.classList.remove("hidden");
});
