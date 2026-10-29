const url = "http://localhost:3000/sistema";/*Link para as rotas das operações nos membros*/

//Area para as operações nos membros presentes no laboratorio 

const divlistMembers = document.querySelector(".list-members");

//Requisição de listagem de membros

async function listMembers(){
    try{
        const response = await fetch(`${url}/membros`);
        const data = await response.json();
        
        //Verifica se a publicações na array de response

        if(data.length != 0){
            divlistMembers.textContent = "";
        }

        //Mostrar os membros que estão na array
        
        data.forEach(member => {

            //Cria uma estrutura de uma membro

            const divMember = document.createElement("div");
            const spanName = document.createElement("span");
            const spanCourse = document.createElement("span");
            const buttonEdt = document.createElement("button");
            const buttonDel = document.createElement("button");
            const divButtons = document.createElement("div");
            const divInfos = document.createElement("div");
            
            spanName.textContent = member.nome;
            spanCourse.textContent = `${member.curso} - ${member.time}`;
            buttonEdt.textContent = "Editar";
            buttonDel.textContent = "Deletar";
            
            buttonEdt.className = "button-edit-member";
            buttonDel.className = "button-delete-member";
            divMember.className = "member";
            divInfos.className = "member-infos";
            divButtons.className = "member-buttons";

            divInfos.appendChild(spanName);
            divInfos.appendChild(spanCourse)
            divButtons.appendChild(buttonEdt);
            divButtons.appendChild(buttonDel);
            divMember.appendChild(divInfos);
            divMember.appendChild(divButtons);
            divlistMembers.appendChild(divMember);

            //Fim da criação da estrutura de membro
            
            //Botão de requisição de exclusão de uma publicação
            
            buttonDel.addEventListener("click", ()=>{
                async function deleteMember(){
                    try{
                        const response = await fetch(`${url}/membros/${member.id}`,{
                            method: "DELETE",
                            headers: {
                                "Content-Type":"application/json"
                            }
                        })
                        
                        const data = await response.json();
                        console.log(data);
                        
                    }catch(err){
                        console.log(`ERRO delete membro: ${err}`);
                    }
                } 
                
                deleteMember();
                window.location.reload();
            })
            
            /*Area para editar os dados de um membro no banco de dados*/
            
            buttonEdt.addEventListener("click", ()=>{
                let divEditBlur = document.querySelector(".blur");
                let divEditmember = document.querySelector(".div-edit-member");
                let buttonClose = document.querySelector("#button-close-member");

                //Botão para fechar area de edição de publicação

                buttonClose.addEventListener("click", ()=>{
            
                    divEditBlur.style.display = "none";
                    divEditmember.style.display = "none";
                })

                divEditBlur.style.display = "flex";
                divEditmember.style.display = "flex";

                let inputName = document.querySelector("#input-name-edit");
                let inputCourse = document.querySelector("#input-course-edit");
                let inputTime = document.querySelector("#input-time-edit");
                let inputLattes = document.querySelector("#input-lattes-edit");
                let inputStatus = document.querySelector("#input-status-edit");

                inputName.value = member.nome;
                inputCourse.value = member.curso;
                inputTime.value = member.time;
                inputLattes.value = member.lattes;
                inputStatus.value = member.status;
                
                //Area de edição de membro

                let formEditMember = document.querySelector(".form-edit-member");

                formEditMember.addEventListener("submit", ()=>{  
                    let formData = new FormData(formEditMember);
                    let formObject = Object.fromEntries(formData);

                    //Botão de requisição de envio dos dados de edição de membro
             
                    async function editMembers(){
                        try{
                            const response = await fetch(`${url}/membros/${member.id}`, {
                                method: "PATCH",
                                headers: {
                                    "Content-Type":"application/json",
                                },
                                body: JSON.stringify({
                                    nome: formObject.nome,
                                    curso: formObject.curso,
                                    time: formObject.time,
                                    lattes: formObject.lattes,
                                    status: formObject.status
                                })

                            })

                            const data = await response.json();
                            console.log(data);

                        }catch(err){
                            console.log(`ERRO patch membro: ${err}`);
                        }
                    }

                    editMembers();

                })
                
            })

            //Fim edição de membro
        });
        
    }catch(err){
        console.log(`ERRO get membro: ${err}`);
    }
}

listMembers();

//Fim da listagem de membros e operações de exclusão e edição

const formInvitMember = document.querySelector(".invit-member");

//Area de requisição de envio de uma publicação para o banco de dados

formInvitMember.addEventListener("submit", ()=>{
    
    const formData = new FormData(formInvitMember);
    const formObject = Object.fromEntries(formData);
    
    console.log(formObject);
    
    async function insertMember(){
        try{
            const response = await fetch(`${url}/membros`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    nome: formObject.nome,
                    curso: formObject.curso,
                    time: formObject.time,
                    lattes: formObject.lattes,
                    status: formObject.status
    
                })
            })

            const data = await response.json();
            console.log(data);

        }catch(err){
            console.log(`ERRO post membro: ${err}`);
        }
    
    }

    insertMember();
    window.location.reload();
})

//Fim da operação de envio de um membro para o banco de dados

//Area para as operações das publicações feitas pelo laboratorio

const divListPublication = document.querySelector(".list-publications");

//Requisição de listagem de publicações

async function listPublication(){
    try{
        const response = await fetch(`${url}/publicacoes`);
        const data = await response.json();

        //Verifica se a publicações na array de response

        if(data.length != 0){
            divListPublication.textContent = "";
        }

        //Mostrar as publicação que estão na array

        data.forEach(pbl => {

            //Cria uma estrutura de uma publicação 

            const divPublication = document.createElement("div");
            const publication = document.createElement("div");
            const typePublication = document.createElement("section");
            const typeText = document.createElement("p");  
            const divOperationPublication = document.createElement("div");
            const buttonEdt = document.createElement("button");
            const buttonDel = document.createElement("button");
            const titlePublication = document.createElement("div");
            const divLocalization = document.createElement("div");
            const localPublication = document.createElement("p");
            const yearPublication = document.createElement("p");
            const textPublication = document.createElement("p")

            divPublication.className = "div-publication";
            publication.className = "publication";
            typePublication.className = "type-publication"
            typeText.className = "type-text";
            divOperationPublication.className = "div-operation-publication";
            buttonEdt.className = "button-edit-publication";
            buttonDel.className = "button-delete-publication";
            titlePublication.className = "title-publication";
            divLocalization.className = "localization-publication";
            localPublication.className = "local-publication";
            yearPublication.className = "year-publication";
            textPublication.className = "text-publication";

            typeText.textContent = pbl.tipo;
            buttonEdt.textContent = "Editar";
            buttonDel.textContent = "Deletar";
            titlePublication.textContent = pbl.titulo;
            localPublication.textContent = pbl.local;
            yearPublication.textContent = pbl.ano;
            textPublication.textContent = pbl.texto;

            typePublication.appendChild(typeText)
            typePublication.appendChild(divOperationPublication)
            divOperationPublication.appendChild(buttonEdt);
            divOperationPublication.appendChild(buttonDel);
            divLocalization.appendChild(localPublication);
            divLocalization.appendChild(yearPublication);
            publication.appendChild(typePublication);
            publication.appendChild(titlePublication);
            publication.appendChild(divLocalization);
            publication.appendChild(textPublication);
            divPublication.appendChild(publication);
            divListPublication.appendChild(divPublication);

            //Fim da criação da estrutura de publicação

            //Botão de requisição de exclusão de uma publicação

            buttonDel.addEventListener("click", ()=>{
                async function deletePublication(){
                    try{
                        const res = await fetch(`${url}/publicacoes/${pbl.id}`, {
                            method: "DELETE",
                            headers:{
                                "Content-Type":"application/json",
                            }
                        });

                        const data = await res.json();
                        console.log(data);
                
                    }catch(err){
                        console.log(`ERRO delete publicação: ${err}`);
                    }
                }

                deletePublication();
                window.location.reload();
            })

            //Area de edição de publicação

            buttonEdt.addEventListener("click", ()=>{
                let divEditBlur = document.querySelector(".blur");
                let buttonClose = document.querySelector("#button-close-publication");
                let divEditPublication = document.querySelector(".div-edit-publication");

                //Botão para fechar area de edição de publicação
               
                buttonClose.addEventListener("click", ()=>{
                    console.log("fechou")
                    divEditBlur.style.display = "none";
                    divEditPublication.style.display = "none";
                })

                divEditBlur.style.display = "flex";
                divEditPublication.style.display = "flex";

                let tipoEdit = document.querySelector("#input-tipo-edit");
                let localEdit = document.querySelector("#input-local-edit");
                let anoEdit = document.querySelector("#input-ano-edit");
                let tituloEdit = document.querySelector("#textarea-titulo-edit");
                let textoEdit = document.querySelector("#textarea-texto-edit");
                
                tipoEdit.value = pbl.tipo;
                localEdit.value = pbl.local;
                anoEdit.value = pbl.ano; 
                tituloEdit.value = pbl.titulo;
                textoEdit.value = pbl.texto; 
                
                //Botão de requisição de envio dos dados de edição de publicação
                
                let formEditPublication = document.querySelector(".form-edit-publication");
                
                formEditPublication.addEventListener("submit", (evt)=>{
                    evt.preventDefault();
                    
                    let formData = new FormData(formEditPublication);
                    let formObject = Object.fromEntries(formData);
                    
                    console.log(formObject);

                    async function editPublication(){
                        try{
                             const res = await fetch(`${url}/publicacoes/${pbl.id}`, {
                                method: "PATCH",
                                headers: {
                                    "Content-type":"application/json",
                                },
                                body: JSON.stringify({
                                    tipo: formObject.tipo,
                                    local: formObject.local,
                                    ano: formObject.ano,
                                    titulo: formObject.titulo,
                                    texto: formObject.texto
                                })
                            })

                            const data = await res.json()
                            console.log(data);
                        }catch(err){
                            console.log(`ERRO patch publicacao: ${err}`);
                        }
                       
                    }

                    editPublication();

                })
            })
        })

    }catch(err){
        console.log(`ERRO get publicação: ${err}`);
    }
}

listPublication();

//Fim da listagem de publicações e operações de exclusão e edição

const formInvitPublication = document.querySelector(".invit-publication");

//Area requisição de envio de uma publicação para o banco de dados

formInvitPublication.addEventListener("submit", (evt)=>{

    const formData = new FormData(formInvitPublication);
    const formObject = Object.fromEntries(formData);

    console.log(formObject)

    async function insertPublication (){
        try{
            const response = await fetch(`${url}/publicacoes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tipo: formObject.tipo,
                    local: formObject.local,
                    ano: formObject.ano,
                    titulo: formObject.titulo,
                    texto: formObject.texto
                })
            })

            const data = await response.json();
            console.log(data)
            
        }catch(err){
            console.log(`ERRO post publicação: ${err}`);
        }
    }

    insertPublication();
})

//Fim da operação de envio de uma publicação para o banco de dados

