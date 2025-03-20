let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
let editandoIndex = null;

document.addEventListener("DOMContentLoaded", function () {
    const dataInput = document.getElementById("dataNascimento");
    const dataInput2 = document.getElementById("dataColeta");
    
    const anoAtual = new Date().getFullYear();
    dataInput.min = `${anoAtual}-01-01`;
    dataInput.max = `${anoAtual}-12-31`;
    dataInput2.min = `${anoAtual}-01-01`;
    dataInput2.max = `${anoAtual}-12-31`;
});



function adicionarPaciente() {
    

    
    const cartaoSus = document.getElementById("cartaoSus").value.trim();
    if (cartaoSus.length !== 15) {
        alert("O Cartão SUS deve ter exatamente 15 números!");
        return;
    }

    const nome = document.getElementById("nome").value.trim();
    const dataNascimento = document.getElementById("dataNascimento").value;
    const endereco = document.getElementById("endereco").value.trim();
    const procedimento = document.getElementById("procedimento").value.trim();

    if (!cartaoSus || !nome || !dataNascimento || !endereco || !procedimento || !nomeUnidade || !cnes || !nomeProfissional || !dataColeta) {
        alert("Preencha todos os campos!");
        return;
    }

    if (editandoIndex !== null) {
        
        pacientes[editandoIndex] = { cartaoSus, nome, dataNascimento, endereco, procedimento, nomeUnidade };
        editandoIndex = null; 
    } else {
       
        pacientes.push({ cartaoSus, nome, dataNascimento, endereco, procedimento, nomeUnidade });
    }

    localStorage.setItem("pacientes", JSON.stringify(pacientes));
    atualizarLista();
    limparCampos();
}

function formatarDataParaBR(data) {
    const partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}



function atualizarLista() {
    const tabela = document.querySelector("#tabelaPacientes tbody");
    tabela.innerHTML = "";
    pacientes.forEach((paciente, index) => {
        let dataFormatada = formatarDataParaBR(paciente.dataNascimento);

        let linha = `
            <tr>
                <td>${paciente.cartaoSus}</td>
                <td>${paciente.nome}</td>
                <td>${dataFormatada}</td>
                <td>${paciente.endereco}</td>
                <td>${paciente.procedimento}</td>
                <td class="edit_btn_box">
                    <button class="edit-btn" onclick="editarPaciente(${index})"><img src="./img/pencil-simple.svg" alt="Editar"></button>
                    <button class="delete-btn" onclick="excluirPaciente(${index})"><img src="./img/trash.svg" alt="Excluir"></button>
                </td>
            </tr>
        `;
        tabela.innerHTML += linha;
    });
}

function limparCampos() {
    document.getElementById("cartaoSus").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("dataNascimento").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("procedimento").value = "";
    editandoIndex = null;
}

function excluirPaciente(index) {
    pacientes.splice(index, 1);
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
    atualizarLista();
}

function editarPaciente(index) {
    const paciente = pacientes[index];
    document.getElementById("cartaoSus").value = paciente.cartaoSus;
    document.getElementById("nome").value = paciente.nome;
    document.getElementById("dataNascimento").value = paciente.dataNascimento;
    document.getElementById("endereco").value = paciente.endereco;
    document.getElementById("procedimento").value = paciente.procedimento;

    editandoIndex = index; 
}

function imprimirTabela() {
    let printContent = document.getElementById("tabelaPacientes").outerHTML;
    let janela = window.open("", "", "width=800,height=1200");

    let nomeUnidade = document.getElementById("nomeUnidade").value.trim();
    let cnes = document.getElementById("cnes").value.trim();
    let nomeProfissional = document.getElementById("nomeProfissional").value.trim();
    let dataColeta = document.getElementById("dataColeta").value;


    janela.document.write(`
        <html>
        <head>
            <title>Impressão</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    margin: 20px;
                }
                h2 {
                    margin-bottom: 20px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    border: 1px solid #000;
                    padding: 10px;
                    text-align: center;
                    flex-wrap: wrap;
                }
                th {
                    background-color: #f2f2f2;
                }
                img.logo {
                    max-width: 20%;
                    margin-bottom: 20px;
                    display: block !important;
                }

                @media print {
                    body {
                        margin: 0;
                        padding: 10px;
                        
                    }
                    button{
                        display:none;
                        }
                    .edit_btn_box{
                        border: none;
                    }
                    .container_titulo_imp{
                        display: flex;
                        gap: 2rem;
                        justify-content: space-between;
                        font-size: 14px;
                    }
                    .edit_btn_box{
                        border: none;
                    }
                   .container_titulo{
                        display: flex;
                        justify-content: space-between;
                    }
                    img.logo {
                        display: block !important;
                        max-width: 150px;
                        height: auto;
                    }
                    .container_titulo h2{
                        font-size: 1rem;
                    }
                        

                }
            </style>
        </head>
        <body>
            <div class="container_titulo">
                <img src="./img/logo.png" class="logo"  alt="logo">
                <h2>Boletim Diário de Atendimento Ambulatorial Individual - BDPI</h2>
            </div>
            
            <div class="container_titulo_imp">
                <h3>Nome da Unidade: ${nomeUnidade}</h3>
                <h3>CNES: ${cnes}</h3>
                <h3>Nome do Profissional: ${nomeProfissional}</h3>
                <h3>Data da Coleta: ${dataColeta}</h3>
            </div>
            ${printContent}
        </body>
        </html>
    `);

    janela.document.close();
    janela.print();
}


atualizarLista();
