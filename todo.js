const form = document.getElementById("todo-form");
const list = document.querySelector(".list-group");
const todoInput = document.querySelector("#todo");
const cardBody = document.querySelectorAll(".card-body")[0];
const cardBody2 = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

form.addEventListener("submit", addTodo);
document.addEventListener("DOMContentLoaded",loadTodosFromStorage);
cardBody2.addEventListener("click",deleteTodos);
filter.addEventListener("keyup", filterTodos);
clearButton.addEventListener("click", clearAllTodos);

function clearAllTodos(e){
    if(confirm("Tüm Listeyi Silmek İstediğinizden Emin Misiniz ?")){

        while(list.firstElementChild != null){
            list.removeChild(list.firstElementChild);
        }
    }
    localStorage.removeItem("todos");
}

function filterTodos(e){
    let filterInput = e.target.value.toLowerCase();
    let listItems = document.querySelectorAll(".list-group-item");
    
    listItems.forEach(function(listItem){
        let listItemText = listItem.textContent.toLowerCase();

        if(listItemText.indexOf(filterInput) === -1)
        {
            listItem.setAttribute("style","display : none !important");

        }

        else{
            listItem.setAttribute("style", "display : flex !important");
        }
 
    })
}

function deleteTodos(e){

    if(e.target.className === "fa fa-remove"){
        deleteTodosFromStorage(e.target.parentElement.parentElement.textContent)
        e.target.parentElement.parentElement.remove();
        showAlert("success","Silme İşlmei Başarılı");



    }
}
function deleteTodosFromStorage(deletetodo){
    let todos = getTodosFromStorage();
    console.log(deletetodo);
    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodosFromStorage(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addListItem(todo);
    })
}
function addTodo(e){
    const value = todoInput.value.trim();
    if (value === ""){
        showAlert("danger", "Lütfen Bir Değer Giriniz");
    }
    else {
        addListItem(value);
        showAlert("success", "Todo Girişi Başarılı!");
        AddTodosToStorage(value);
    }
    e.preventDefault();
}
function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function AddTodosToStorage(value){
    let todos = getTodosFromStorage();
    todos.push(value);
    localStorage.setItem("todos",JSON.stringify(todos));
}
function showAlert(type, message){

    const alert = document.createElement("div");
    alert.className = `btn btn-${type}`
    alert.textContent = message;
    cardBody.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 1500); 
}
function addListItem(value){
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    const a = document.createElement("a");
    a.href ="#";
    a.className ="delete-item"; 
    a.innerHTML ="<i class ='fa fa-remove'></i>";
    li.appendChild(document.createTextNode(value));
    li.appendChild(a);
    list.appendChild(li);
    todoInput.value = "";
}
