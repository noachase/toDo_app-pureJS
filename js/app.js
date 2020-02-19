const clear =document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

const check = 'fa-check-circle';
const uncheck = 'fa-circle-thin';
const linethrough = 'lineThrough';

let listStorage, id;
let data = localStorage.getItem('TODO');

if (data) {
    listStorage = JSON.parse(data);
    id = listStorage.length;
    loadlist(listStorage);
}else{
    listStorage = [];
    id = 0;
}

function loadlist(array) {
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    })
}

clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
})

const options = {weekday: 'long', month: 'short', day: 'numeric'};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString('ru-RU', options);

function addToDo (toDo, id, done, trash) {

    if (trash) {return;};

    const doneCheck = done ? check : uncheck;
    const line = done ? linethrough : '';

    const position = 'beforeend';

    const item = `<li class="item">
                    <i class="fa ${doneCheck} co" job="complete" id="${id}"></i>
                    <p class="text ${line}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
                </li>`;

    list.insertAdjacentHTML(position, item);

}

document.addEventListener('keyup', function(event) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        console.log(toDo);
        if (toDo) {
            addToDo(toDo, id, false, false);

            listStorage.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            console.log(listStorage)
            localStorage.setItem('TODO', JSON.stringify(listStorage));
            id++;
        }
        input.value = '';
    }
})


function removeToDo(el) {
    el.parentNode.parentNode.removeChild(el.parentNode);
    
    listStorage[el.id].trash = true;
    
}

function completeToDo (el) {
    
    console.log(el.classlist)
    el.classList.toggle(check);
    el.classList.toggle(uncheck);
    el.parentNode.querySelector('.text').classList.toggle(linethrough);

    listStorage[el.id].done = listStorage[el.id].done ? false : true;
}

list.addEventListener('click', function(event) {
    const el = event.target;
    console.log(el)
    const elJob = el.attributes.job.value;

    if(elJob == 'complete'){
        completeToDo(el);
    }else if(elJob == 'delete'){
        removeToDo(el);
    }
    localStorage.setItem('TODO', JSON.stringify(listStorage));
});


