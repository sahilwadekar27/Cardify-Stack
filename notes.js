document.addEventListener("DOMContentLoaded", () => {

let addNote= document.querySelector("#addNote");
let form_card = document.querySelector(".modal");
let Upbtn=  document.querySelector("#up");
let downbtn=  document.querySelector("#down");

//choosing the form
const form= document.querySelector("form");

//choosing the form inputs
const imageURL= form.querySelector("#imageURL");
const fullname=form.querySelector("#name");
const town=form.querySelector("#town");
const purpose=form.querySelector("#purpose");

//choosing the category inputs
const Category=form.querySelectorAll("input[name=category]");

//choosing the form buttons
const  closeForm=form.querySelector(".closeForm");
const createBtn=form.querySelector(".create");
const inputs=document.querySelectorAll("input");

function savetolocalstorage(obj){   
  if(localStorage.getItem("tasks")==null){
    let oldTasks=[];
    oldTasks.push(obj);
    localStorage.setItem("tasks",JSON.stringify(oldTasks));
  }
  else{
    let oldTasks=JSON.parse(localStorage.getItem("tasks"));
    oldTasks.push(obj);
    localStorage.setItem("tasks",JSON.stringify(oldTasks));
  }
}

form.addEventListener("submit",function(dets){
  dets.preventDefault();

  let  selected=false;
  Category.forEach(function(cat){
    if(cat.checked){
      selected=cat.value;
    }
  });
  if(imageURL.value.trim()===""){
    return alert("Please enter an image url");
  }

  if (fullname.value.trim()===""){
    return alert("Please enter a name");
  }
  if(town.value.trim===""){
    return alert("please enter town");
  }
  if(purpose.value.trim===""){
    return alert("please enter purpose");
  }
  if(!selected){
    return alert("please select a category");
  }

  savetolocalstorage({
  imageURL: imageURL.value,
  fullname: fullname.value,
  town: town.value,
  purpose: purpose.value,
  category: selected
  
  })

  // this can be used to clear the form
  form.reset();
  form_card.classList.add("hidden");
  showCards();
  
  // inputs.forEach(function(input){ //or this can be used
  //   input.value="";
  //   form_card.classList.add("hidden");

  // })

});


const appWrapper = document.querySelector(".app-wrapper");
const cards_container = document.createElement("div");
cards_container.classList.add("cards-container");

// colors se pehle insert
appWrapper.insertBefore(
  cards_container,
  document.querySelector(".colors")
);

function showCards(){
cards_container.innerHTML = "";

let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
if (allTasks.length === 0) {
    updateStack();
    return;
}

allTasks.forEach(function(task,index) {
const card = document.createElement("div");
card.classList.add("card");  

const avatar=document.createElement("img");
avatar.src=task.imageURL;
avatar.alt="avatar";
avatar.classList.add("avatar");

const firstname=document.createElement("h2");
firstname.textContent=task.fullname;

const meta1=document.createElement("div");
meta1.classList.add("meta");

const meta1label=document.createElement("span");
meta1label.textContent="Home town";

const meta1value=document.createElement("span");
meta1value.textContent=task.town;

meta1.append(meta1label,meta1value);

const meta2=document.createElement("div");
meta2.classList.add("meta");

const meta2Label=document.createElement("span");
meta2Label.textContent="Bookings";

const meta2Value=document.createElement("span");
meta2Value.textContent=task.purpose;

meta2.append(meta2Label,meta2Value);

const actions=document.createElement("div");
actions.classList.add("actions");

//creating call button
const CallBtn=document.createElement("button");
CallBtn.textContent="Call";
CallBtn.classList.add("call");

//creating message button
const MessageBtn=document.createElement("button");
MessageBtn.textContent="Message";
MessageBtn.classList.add("message");


actions.append(CallBtn,MessageBtn); //appending call and message buttons to actions div

card.append(avatar,firstname,meta1,meta2,actions);
cards_container.appendChild(card);


})
};

showCards();

function updateStack(){
const allcards =document.querySelectorAll(".cards-container .card");

  allcards.forEach((card, index) => {

    card.style.zIndex = 0;
    card.style.opacity = 0;
    card.style.transform = "translateY(0) scale(1)";
    card.style.pointerEvents = "none";

  
    if(index < 3){
      card.style.zIndex = 3 - index;
      card.style.transform =
        `translateY(${index * 10}px) scale(${1 - index * 0.02})`;
      card.style.opacity = 1 - index * 0.2;
      card.style.pointerEvents = "auto";
    }
    
  });
  
  
   

}

Upbtn.addEventListener("click",function(){  
  let lastchild=cards_container.lastElementChild;
  if(lastchild){
    cards_container.insertBefore(
    lastchild,cards_container.firstElementChild);
    updateStack();
  }
});

downbtn.addEventListener("click",function(){
   let firstchild=cards_container.firstElementChild;
   if(firstchild){
    cards_container.appendChild(firstchild);
    updateStack();
   }
});

addNote.addEventListener("click",function(){
  form_card.classList.remove("hidden");
  fullname.focus();
});

closeForm.addEventListener("click",function(){
  form_card.classList.add("hidden");

});

});













