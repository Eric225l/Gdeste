let url = "http://localhost:3000/sistema";
let listMembers = document.querySelectorAll("#list-members");

//Requisição de listagem dos membros em cada um dos times
async function MembersGet(){
    let response = await fetch(`${url}/membros`);
    let data = await response.json()

    data.forEach(member => {
        listMembers.forEach(group => {
            if(group.dataset.time == member.time){
                let divMember = document.createElement("div");
                let nameMember = document.createElement("span")
                let courseMember = document.createElement("span")

                divMember.className = "member";
                
                nameMember.textContent = member.nome;
                courseMember.textContent = member.curso;

                divMember.appendChild(nameMember);
                divMember.appendChild(courseMember);
                group.appendChild(divMember);
            }
        })
    })
}

MembersGet();

let listPublication = document.querySelector(".div-publicacoes")

//Requisição de listagem das três primeiras publicações
async function PublicationGet(){
    let response = await fetch(`${url}/publicacoes`);
    let data = await response.json();

    for(let indice = 0; indice <= 3; indice++){
        console.log(data[indice]);

            
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

            typeText.textContent = data[indice].tipo;
            titlePublication.textContent = data[indice].titulo;
            localPublication.textContent = data[indice].local;
            yearPublication.textContent = data[indice].ano;
            textPublication.textContent = data[indice].texto;

            typePublication.appendChild(typeText);
            divLocalization.appendChild(localPublication);
            divLocalization.appendChild(yearPublication);
            publication.appendChild(typePublication);
            publication.appendChild(titlePublication);
            publication.appendChild(divLocalization);
            publication.appendChild(textPublication);
            divPublication.appendChild(publication);
            listPublication.appendChild(divPublication);
    }

}

PublicationGet();