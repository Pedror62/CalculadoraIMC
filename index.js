const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
  ];

const imcTable = document.querySelector("#imc-table")

const inputHeight = document.querySelector("#height");
const inputWight = document.querySelector("#width");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn")
const imcNunber = document.querySelector('#imc-nunber span');
const imcInfo = document.querySelector('#imc-info span');
const calccontainer = document.querySelector('#calc-container');
const resultcontainer = document.querySelector('#result-container');

const btnPreto = document.querySelector('#btn-preto');

function creatTable(data) {
    data.forEach((items) => {
        
        const div = document.createElement("div")
        div.classList.add("table-data")

        const classification = document.createElement('p')
        classification.innerText = items.classification;

        const info = document.createElement('p')
        info.innerText = items.info;

        const obesity = document.createElement('p')
        obesity.innerText = items.obesity;

        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        imcTable.appendChild(div);
    });
   
}

function resultHIde(){
  calccontainer.classList.toggle("hide");
  resultcontainer.classList.toggle("hide");
 
}
function inputClear(){
  inputHeight.value =""
  inputWight.value = ""
  imcNunber.classList.value =""
  imcInfo.classList.value =""
  
}
 function valideitInput(text) {
  return text.replace(/[^0-9,]/g, "");
 }

 function calIMC(weight, height){
  const imc = (weight / (height * height)).toFixed(1);

  return imc;
 }

//eventos

[inputHeight, inputWight].forEach((el) => {
  el.addEventListener("input", (e) =>{
    const apdateValor = valideitInput(e.target.value);

    e.target.value = apdateValor;
  });
});


calcBtn.addEventListener("click", (e) =>{
 e.preventDefault();

  const height = +inputHeight.value.replace (",", ".")
  const weight = +inputWight.value.replace (",", ".")

  if (!weight || !height) return;


  const imc = calIMC(weight, height);

 let info;

  data.forEach((items) =>{
      if (imc >= items.min && imc <= items.max){
          info = items.info; 
      }
      console.log(imc);
  });  
   if(!info) return;

  imcNunber.innerText = imc;
  imcInfo.innerText = info;

  switch (info) {
    case "Magreza":
      imcNunber.classList.add('low')
      imcInfo.classList.add('low')
    break;

    case "Normal":
      imcNunber.classList.add('good')
      imcInfo.classList.add('good')
    break;

    case "Sobrepeso":
      imcNunber.classList.add('low')
      imcInfo.classList.add('low')
    break;

    case "Obesidade":
      imcNunber.classList.add('medium')
      imcInfo.classList.add('medium')
    break;

    case "Obesidade grave":
      imcNunber.classList.add('high')
      imcInfo.classList.add('high')
    break;

    default:
    break;
};

  resultHIde()

});
btnPreto.addEventListener("click", (e) =>{
  e.preventDefault()
  resultHIde()

  inputClear()
})
  


clearBtn.addEventListener("click", (e) =>{
  e.preventDefault()
 

  inputClear();
})
// iniciaização
creatTable(data);
