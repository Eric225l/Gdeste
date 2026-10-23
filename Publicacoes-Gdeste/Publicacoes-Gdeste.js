//url geral da api

let url = "http://localhost:3000/sistema"

//Botões de navegação e a lista de publicações

let buttonsNavigate = document.querySelectorAll("#button-type-publication");
let listPublications = document.querySelector(".list-publications");

//função para criar o card de publicações

function CardPublication(tipo, titulo, local, ano, texto){
    const divPublication = document.createElement("div");
    const publication = document.createElement("div");
    const typePublication = document.createElement("section");
    const typeText = document.createElement("p");  
                
    const titlePublication = document.createElement("div");
    const divLocalization = document.createElement("div");
    const localPublication = document.createElement("p");
    const yearPublication = document.createElement("p");
    const textPublication = document.createElement("p")
    
    divPublication.className = "div-publication";
    publication.className = "publication";
    typePublication.className = "type-publication"
    typeText.className = "type-text";
    titlePublication.className = "title-publication";
    divLocalization.className = "localization-publication";
    localPublication.className = "local-publication";
    yearPublication.className = "year-publication";
    textPublication.className = "text-publication";
    
    typeText.textContent = tipo;
    titlePublication.textContent = titulo;
    localPublication.textContent = local;
    yearPublication.textContent = ano;
    textPublication.textContent = texto;
    
    typePublication.appendChild(typeText);
    divLocalization.appendChild(localPublication);
    divLocalization.appendChild(yearPublication);
    publication.appendChild(typePublication);
    publication.appendChild(titlePublication);
    publication.appendChild(divLocalization);
    publication.appendChild(textPublication);
    divPublication.appendChild(publication);
    listPublications.appendChild(divPublication);
}

//função de requisição da api

async function GetTodos(typePublication){
    let response = await fetch(`${url}/publicacoes`);
    let data = await response.json();

    data.forEach(publication=>{
        let type = publication.tipo;
        
        if(typePublication == undefined){
            CardPublication(publication.tipo, publication.titulo, publication.local, publication.ano, publication.texto);
        }
        else if(typePublication == "todos"){
            CardPublication(publication.tipo, publication.titulo, publication.local, publication.ano, publication.texto);
        }
        else if(type.toLowerCase() == typePublication){
            CardPublication(publication.tipo, publication.titulo, publication.local, publication.ano, publication.texto);
        }
    })
}

if(listPublications.dataset.filter == "desactive"){
    GetTodos()
}

//Filtro

buttonsNavigate.forEach(button => {

    button.addEventListener("click", ()=>{
        
        buttonsNavigate.forEach(active => {
            active.className = "button-type-publication";
        })
        
        button.className = "button-type-publication-active";

        if(button.dataset.tipo == "todos"){
            listPublications.textContent = " ";
            listPublications.dataset.filter = "active"
            GetTodos(button.dataset.tipo);
        }
        else if(button.dataset.tipo == "tcc"){
            listPublications.textContent = " ";
            listPublications.dataset.filter = "active"
            GetTodos(button.dataset.tipo);
        }
        else if(button.dataset.tipo == "iniciação"){
            listPublications.textContent = " ";
            listPublications.dataset.filter = "active"
            GetTodos(button.dataset.tipo);
        }
        else if(button.dataset.tipo == "extensão"){
             listPublications.textContent = " ";
            listPublications.dataset.filter = "active"
            GetTodos(button.dataset.tipo);
        }
    })
})


