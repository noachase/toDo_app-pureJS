'use-strict'

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
    // countlist(listStorage);
    console.log(listStorage.length)
}else{
    listStorage = [];
    id = 0;
}

function loadlist(array) {
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    })
}


// function countlist(array) {
    
//     notifyJob()
// }



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
        if (toDo) {
            addToDo(toDo, id, false, false);

            listStorage.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
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
    
    el.classList.toggle(check);
    el.classList.toggle(uncheck);
    el.parentNode.querySelector('.text').classList.toggle(linethrough);

    listStorage[el.id].done = listStorage[el.id].done ? false : true;
}


    list.addEventListener('click', function(event) {
        
        try {
            const el = event.target;
            const elJob = el.attributes.job.value;
            
            if(elJob == 'complete'){
                completeToDo(el);
            }else if(elJob == 'delete'){
                removeToDo(el);
            }

        } catch (e) {
            console.log('zdorova')
        }
    
        localStorage.setItem('TODO', JSON.stringify(listStorage));
    });




//NOTIFICATIONS


// new Notification('Молодец, поц. Подписался!'); 
function notifyMe() {
    if (!('Notification' in window)) {
        alert ('Закройте Ваш єксплорер и установите уже новый браузер!');
    }else if(Notification.permission === 'granted') {
        notify();
    }else if(Notification.permission !== 'denied') {
        Notification.requestPermission(function(permission) {
            if (permission === 'granted') {
                notify();
            }
        });
    }
}

function notify() {
    let notification = new Notification('YO-YO here! You are subscribed!', {
        body: 'Hey there! Krasava!'
    });

    notification.onclick = function() {
        window.open('https://noachase.github.io/toDo_app-pureJS/');
    };
    setTimeout(notification.close.bind(notification), 5000);
}

function notifyJob() {

    let undone = [];
    
    listStorage.forEach(function(item) {
        if (item.done === false) {
            undone.push(item)
        }
    })
    // console.log(`${undone.length} asd`)
    if (undone.length > 0) {
        let notification = new Notification('ИДИ ЕБАШИТЬ!', {
            body: 'У ТЕБЯ ' + undone.length + ' Незанонченных дел!'
        });
        notification.onclick = function() {
            window.open('https://noachase.github.io/toDo_app-pureJS/');
        };
        setTimeout(notification.close.bind(notification), 10000);
    }

}

// window.setInterval(notifyJob, 10000)

// notifyMe();

document.addEventListener('click', (event) => {
    let eTarget = event.target
    console.log(eTarget)
    if (eTarget) {
        return;
    }
})

