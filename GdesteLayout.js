let buttonEquipe = document.querySelectorAll("#equipe");
let divPrincipal = document.querySelector("#EQUIPES");
let divEquipes = document.querySelector("#div-equipes");
let listMembersGeral = document.querySelectorAll('#list-members')
let setaMembrosGeral = document.querySelectorAll("#seta-equipes")

buttonEquipe.forEach((sectionAbrir) => {
    sectionAbrir.addEventListener("click", (section)=>{
        let setaMembros = section.currentTarget.querySelector("#seta-equipes");
        let listMembers = section.currentTarget.querySelector("#list-members");

        if(sectionAbrir.className == "equipe"){
    
            buttonEquipe.forEach((sectionsFechar) =>{
                sectionsFechar.className = "equipe";
            })

            setaMembrosGeral.forEach((setaGeralFechar) => {
                setaGeralFechar.className = "seta-equipes";
            })

            listMembersGeral.forEach((listMembersClose) => {
                listMembersClose.className = "list-members";
            })

            sectionAbrir.className = "equipe-active";
            divPrincipal.className = "EQUIPES-ACTIVE";
            divEquipes.className = "div-equipes-active";
            setaMembros.className = "seta-equipes-active";
            listMembers.className = "list-members-active";
            
        }
        else if(sectionAbrir.className == "equipe-active"){
            sectionAbrir.className = "equipe";
            divPrincipal.className = "EQUIPES";
            divEquipes.className = "div-equipes";
            setaMembros.className = "seta-equipes";
            listMembers.className = "list-members";
        }
    
    })
})

let buttonVerMais = document.querySelector("#button-ver-mais");
let buttonFechar = document.querySelector("#button-fechar");
let overlay = document.querySelector("#overlay");
let popUp = document.querySelector("#pop-up-historia");
let body = document.getElementsByTagName("body")[0];

buttonVerMais.addEventListener("click", ()=>{
    overlay.className = "overlay-active";
    popUp.className = "pop-up-historia-active";
    body.style.overflow = "hidden";
})

buttonFechar.addEventListener("click", ()=>{
    overlay.className = "overlay";
    popUp.className = "pop-up-historia";
    body.style.overflow = "auto";
})
