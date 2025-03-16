const anoAtual = new Date().getFullYear();
    document.getElementById("data").min = `${anoAtual}-01-01`;
    document.getElementById("data").max = `${anoAtual}-12-31`;






    document.getElementById("cartao_sus").addEventListener("input", function() {
        let erro = document.getElementById("erro");
        if (this.value.length === 15) {
            erro.style.display = "none";
        } else {
            erro.style.display = "block";
            erro.style.position = "absolute"
            erro.style.marginTop = "-3rem"
        }
    });