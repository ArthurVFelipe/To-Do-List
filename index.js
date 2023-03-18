const localStorageKey = 'to-do-list-gn';


function validateTask(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let inputValue = $('#input-new-task').val();
    let exists = values.find(x => x.name == inputValue);

    return !exists ? false : true
}


function newTask(){
   
    let input = $('#input-new-task').val();
    $('#input-new-task').removeAttr('style');
    //validação
    if(!input){
        $('#input-new-task').css('border', ' 2px solid red');
        alert('Digite algo para inserir em sua lista')
    } else if(validateTask()){
        alert("Já existe uma tarefa com essa descrição")
    }
    else {
        //incremente to localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: input
        });
        localStorage.setItem(localStorageKey, JSON.stringify(values))
        showValues();
    }

    $('#input-new-task').val('');
}

function showValues(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = '';

    for(let i = 0; i <values.length; i++){
        list += '<li>' + values[i]['name'] + '<button id="btn-ok" onclick="removeItem(\'' + values[i]['name'] + '\')"><i class="fa-solid fa-check"></i></button></li>';
        }
        $('#list').html(list); 
}

function removeItem(item){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name === item)
    
    if (index !== -1) {
        values.splice(index, 1);
        localStorage.setItem(localStorageKey, JSON.stringify(values));
        showValues();
    } else {
        alert("Erro: Tarefa não encontrada");
    }
}

showValues()