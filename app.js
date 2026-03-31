const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn =document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg= document.querySelector(".msg");



// only to check if country name showing
// for (code in countryList){
//     console.log(code,countryList[code]);
// }

for (let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
       if(select.name==="from" && currCode ==="USD"){
        newOption.selected="selected";
       }else if (select.name==="to" && currCode ==="INR"){
        newOption.selected="selected";
       }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
      updateFlag(evt.target);
      updateBackground();
    });

}


const updateExchangeRate= async()=>{
    let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1){
    amtVal=1;
    amount.value="1"; 
  }
 
//   console.log(fromCurr.value,toCurr.value);
  const URL =`${BASE_URL}/currencies/${fromCurr.value.toLowerCase()}.json`;  // cause api dont work in capital letters.
  let response = await fetch(URL);
  let data = await response.json();

  let rate=data[fromCurr.value.toLowerCase()]
  [toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value}= ${finalAmount} ${toCurr.value}`;



}


// updateflag
const updateFlag =(element)=>{
    let currCode = element.value;
    let countryCode= countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


//here api are diff only for background
const updateBackground = () => {
    let fromCode = countryList[fromCurr.value];
    let toCode = countryList[toCurr.value];

  let fromFlag = `https://flagcdn.com/w1280/${fromCode.toLowerCase()}.png`;
  let toFlag = `https://flagcdn.com/w1280/${toCode.toLowerCase()}.png`;

    document.body.style.background = `
    url(${fromFlag}) left / cover no-repeat,
    url(${toFlag}) right / cover no-repeat
`;
};


btn.addEventListener("click", (evt)=>{  //cause down we have taken response await so first we have to make it async
  evt.preventDefault();
 updateExchangeRate();  
 updateBackground(); 
});

window.addEventListener("load",()=>{
updateExchangeRate();
updateBackground();
})

