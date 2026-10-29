//Função de troca de telas entre membros e publicações

let buttonMembers = document.querySelector("#button-operations-members");
let buttonPublication = document.querySelector("#button-operations-publications");

let groupMember = document.querySelector(".group-member");
let groupPublications = document.querySelector(".group-publications")

buttonPublication.addEventListener("click", ()=>{
    groupPublications.style.display = "flex";
    groupMember.style.display = "none"
})

buttonMembers.addEventListener("click", ()=>{
    groupMember.style.display = "flex"
    groupPublications.style.display = "none";
})

//Função de troca de telas de adicionar publicações e elista de publicações

let navigateLeft = document.querySelector("#button-left");
let navigateRight = document.querySelector("#button-right");

let invitPublication = document.querySelector(".invit-publication")
let listPublications = document.querySelector(".list-publications");

navigateLeft.addEventListener("click", ()=>{
    invitPublication.style.display = "flex";
    listPublications.style.display = "none";

    navigateLeft.style.display = "none";
    navigateRight.style.display = "flex";
})

navigateRight.addEventListener("click", ()=>{
    listPublications.style.display = "grid";
    invitPublication.style.display = "none";

    navigateRight.style.display = "none";
    navigateLeft.style.display = "flex";
})

