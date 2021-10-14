window.onload = function() {

    for (let i = 0; i < localStorage.length; i++) {
        let listName = localStorage.key(i);
        createList(listName);
    }

    // Eventlistener on newListBtn on mouseclick
    var addList = document.getElementById("newListBtn");
    addList.addEventListener("click", newList);

    // Eventlistener on newListBtn on "enter"
    var input = document.getElementById("newListBtn");
    input.addEventListener("keyup", function(event) {
        if(event.keyCode === 13) {
            event.preventDefault();
            addBtn.click();
        }
    });

    function newList() {
        var listName = document.getElementById("inpNewList").value;
        let todos = [true, {checked: true, text: "Hente Gunvor"}]; // det 0 element indikere om en liste skal vises
        localStorage.setItem(listName, JSON.stringify(todos));
        location.reload(); // Generate the window, with the added list
    }

    function createList(listName) {
        generateMenuButton(listName);

        let retrivedTodos = JSON.parse(localStorage.getItem(listName));
        let show = retrivedTodos[0];
        if(show) {showList(listName);}
    }

    function generateMenuButton(listName) {
        var listBtn = document.createElement("button");
        listBtn.id = "listBtn";
        listBtn.type = "button";
        listBtn.innerHTML = listName;

        var sideNav = document.getElementById("sidenav");
        sideNav.appendChild(listBtn);
    }

    function showList(listName) {    
        var listBox = document.createElement("div");
        listBox.id=listName
        var header = document.createElement("H2");
        header.innerText = listName;
        listBox.appendChild(header);

        
        
        var listContainer = document.getElementById('listContainer');
        listContainer.appendChild(listBox);

        addInputBar(listName)
    }


    function addInputBar(listName) {
        var todoList = document.getElementById(listName);

        var inpToDo = document.createElement("input");
        inpToDo.id = "inpToDo";
        inpToDo.type = "text";
        inpToDo.placeholder = "New to-do...";
        todoList.appendChild(inpToDo);

        var newToDoBtn = document.createElement("button");
        newToDoBtn.id = "newToDoBtn";
        newToDoBtn.type = "button";
        newToDoBtn.innerHTML = "+";
        todoList.appendChild(newToDoBtn);
    }









/*
    for (let i = 0; i < localStorage.length; i++) {
        let input = localStorage.key(i);
        let status = localStorage.getItem(input);
        addToList(input, status);
    }

    var addBtn = document.getElementById("btnInsert"); 
    addBtn.addEventListener("click", addToDo);

    var input = document.getElementById("inpToDo");
    input.addEventListener("keyup", function(event) {
        if(event.keyCode === 13) {
            event.preventDefault();
            addBtn.click();
        }
    });

    function addToDo() {
        let key = document.getElementById("inpToDo").value;
        let value = "unchecked"
            
        // check if the value is null: returns true if there is a value
        if (key){
            localStorage.setItem(key, value);
            location.reload();
        }
    };

    function addToList(input, status) {
        var aToDo = document.createElement("li");
        
        addCheckbox(aToDo, status);
        addInput(aToDo, input);
        addDeleteButton(aToDo);

        var theList = document.getElementById("todolist");
        theList.appendChild(aToDo);
    }

    function addCheckbox(listElement, status) {
        var chbox = document.createElement("input");
        chbox.type = "checkbox";
        chbox.id = "chbox"
        if(status === "checked"){
            chbox.checked = true;
        }
        chbox.addEventListener("click", function(e){
            var key = e.target.nextElementSibling.innerText;
            var value = localStorage.getItem(key);
            console.log(key);
            if(value === "unchecked") {
                localStorage.setItem(key, "checked");
            } else {
                localStorage.setItem(key, "unchecked");
            }   
        });

        listElement.appendChild(chbox);
    }

    function addInput(listElement, input) {
        var txt = document.createTextNode(input);
        var p = document.createElement("p");
        p.id = "txt"
        p.appendChild(txt); 
        p.addEventListener("click", function(e) {
            var oldtxt = e.target.innerText;
            var newtxt = prompt("Change to do to", oldtxt);
            if(newtxt) {
                e.target.innerText = newtxt;

                var status = localStorage.getItem(oldtxt);
                localStorage.removeItem(oldtxt);
                localStorage.setItem(newtxt, status);
            };
        });

        listElement.appendChild(p);
    }   

    function addDeleteButton(listElement) {
        var delBtn = document.createElement("button");
        var txt = document.createTextNode("DEL");
        delBtn.id = "delBtn";
        delBtn.addEventListener("click", function(e) {
            var key = e.target.previousElementSibling.innerText;
            localStorage.removeItem(key);
            console.log(key);
            window.location.reload();
        });
        delBtn.appendChild(txt);
        listElement.appendChild(delBtn);
    }
    */
    
}
