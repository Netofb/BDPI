const anoAtual = new Date().getFullYear();
    document.getElementById("data").min = `${anoAtual}-01-01`;
    document.getElementById("data").max = `${anoAtual}-12-31`;






    document.querySelectorAll("input[name='cartao_sus']").forEach(input => {
        input.addEventListener("input", function() {
            let erro = this.nextElementSibling; // Pega o elemento de erro próximo ao input
            if (this.value.length === 15) {
                erro.style.display = "none";
            } else {
                erro.style.display = "block";
                erro.style.position = "absolute";
                erro.style.marginTop = "9rem";
            }
        });
    });