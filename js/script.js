const form = document.getElementById("converterForm");

const amount = document.getElementById("amount"); //valor que o usuario vai inserir
const fromCurrency = document.getElementById("fromCurrency"); //o tipo de moeda que o usuario possui
const toCurrency = document.getElementById("toCurrency"); //o tipo de moeda que o usuario quer converter
const convertedAmount = document.getElementById("convertedAmount"); //recebe o resultado da conversão
const converterBtn = document.getElementById("converterBtn");
const loading = document.querySelector(".loading");
const result = document.querySelector(".result");
const error = document.querySelector(".error");

//variavel recebe api
const API_URL = "https://api.exchangerate-api.com/v4/latest/";

//converte o dinheiro
async function convertMoney() {
  converterBtn.style.display = "none"; /*talvez não precise*/
  loading.style.display = "block";
  error.style.display = "none";
  result.style.display = "none";

  //tenta acessar o servidor
  try {
    //captura o valor (moeda escolhida)
    const response = await fetch(API_URL + fromCurrency.value);
    //converte os dados da API em json
    const data = await response.json();
    //filtra dentro da api nos rates a moeda(valor) que escolhemos no toCurrency
    const rate = data.rates[toCurrency.value];
    //pega o valor que o usuario digitou e converte referente a moeda escolhida
    const convertedValue = (amount.value * rate).toFixed(2 /*casas decimais*/);
    //exibe o valor convertido dentro da label resultado
    convertedAmount.value = convertedValue;
    error.style.display = "none";
    result.style.display = "block";
    // exibir o valor escolhido e o convertido
    result.innerHTML = `
        <div style="font-size: 1.4rem;">
            ${amount.value} ${fromCurrency.value} = ${convertedAmount.value} ${toCurrency.value}
        </div>
        <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 10px;">
            Taxa: 1 ${fromCurrency.value} = ${rate} ${toCurrency.value}
        </div>
    
    `;
    converterBtn.style.display = "block"; /*talvez não precise*/
  } catch (err) {
    error.style.display = "block";
    error.innerHTML = `Falha ao converter moeda! Tente novamente`;
  }
  loading.style.display = "none";
}

//Evento assim que o botão submit é clicado
form.addEventListener("submit", function (event) {
  event.preventDefault(); //não reinicia/limpa o formulario
  convertMoney();
});
