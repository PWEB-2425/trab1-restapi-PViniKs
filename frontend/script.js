var idadeRange = document.querySelector("#idadeAluno"); // input range
var idadeValor = document.querySelector("#idadeValue"); // span

idadeRange.addEventListener("input", function() {
    idadeValor.textContent = idadeRange.value;
    console.log(idadeRange.value);    
});