window.onload = function() {

    // Generate the page each time the page is loaded with updated lists
    for (let i = 0; i < localStorage.length; i++) {
        let listName = localStorage.key(i);
        createList(listName);
    }

    // Eventlistener on newListBtn on mouseclick
    var addList = document.getElementById("newListBtn");
    addList.addEventListener("click", newList);

    // Eventlistener on newListBtn on "enter"
    var input = document.getElementById("inpNewList");
    input.addEventListener("keyup", function(event) {
        if(event.keyCode === 13) {
            event.preventDefault();
            addList.click();
        }
    });

    /* 
    Saves a new list item to localstorage when newListBtn is activated
    Generates a name (key) an a list (value), which is stored in localstorage
    */
    function newList() {
        var listName = document.getElementById("inpNewList").value;

        // The zero elements is used to tell whether a list is showed
        let todos = [true]; 
        
        localStorage.setItem(listName, JSON.stringify(todos));
        
        // Reload the page, with the added list
        location.reload(); 
    }

    /*
    Create the list on the page
    Creates a button in the sidebar
    If the list is shown, show the list on the page
    */
    function createList(listName) {
        generateMenuButton(listName);

        //Retrieves the zero element of the lists values, which tell whether a list should be shown
        let retrivedTodos = JSON.parse(localStorage.getItem(listName));
        let show = retrivedTodos[0];
        if(show) {showList(listName);}
    }

    // Generate the lists menubutton in the sidenavigation
    function generateMenuButton(listName) {
        // Create the button
        var listBtn = document.createElement("button");
        listBtn.id = "listBtn";
        listBtn.type = "button";
        listBtn.innerHTML = listName;

        // The list switch between being shown/not shown when clicked
        listBtn.addEventListener("click", function(e) {
            var listName = e.target.innerHTML;
            let retrivedTodos = JSON.parse(localStorage.getItem(listName));
            let show = retrivedTodos[0];
            console.log(show);
            if(show) {
                retrivedTodos[0] = false;
            } else {
                retrivedTodos[0] = true;
            }
            console.log(retrivedTodos[0]);
            
            localStorage.setItem(listName, JSON.stringify(retrivedTodos));
            location.reload();
        });

        // Add the button to the sidenavigation
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

        showTodos(listName)
    }


    function addInputBar(listName) {
        var todoList = document.getElementById(listName);

        var inpToDo = document.createElement("input");
        inpToDo.id = "inpToDo";
        inpToDo.type = "text";
        inpToDo.placeholder = "New to-do...";
        inpToDo.addEventListener("keyup", function(event) {
            if(event.keyCode === 13) {
                event.preventDefault();
                newToDoBtn.click();
            }
        });
        todoList.appendChild(inpToDo);

        var newToDoBtn = document.createElement("button");
        newToDoBtn.id = "newToDoBtn";
        newToDoBtn.type = "button";
        newToDoBtn.innerHTML = "+";
        newToDoBtn.addEventListener("click", function(e) {
            var listName = e.target.parentElement.firstChild.innerHTML;
            let retrivedTodos = JSON.parse(localStorage.getItem(listName));
            var todo = e.target.previousSibling.value;
            if(todo) {
                retrivedTodos.push({checked: false, text: todo});
                console.log(retrivedTodos);
                localStorage.setItem(listName, JSON.stringify(retrivedTodos));
                location.reload();
            }
        });
        todoList.appendChild(newToDoBtn);
    }

    
    function showTodos(listName) {
        var todoList = document.getElementById(listName);
        let retrivedTodos = JSON.parse(localStorage.getItem(listName));
        for (let i = 1; i < retrivedTodos.length; i++) {
            var aTodo = document.createElement("div");
            let todo = [retrivedTodos[i].checked, retrivedTodos[i].text]
            let checked = todo[0];
            let txt = todo[1];
            
            addCheckbox(listName, aTodo, txt, checked);
            addInput(aTodo, txt);
            addMenuButton(listName, aTodo, txt, checked);

            todoList.appendChild(aTodo);
        }
    }

    function addCheckbox(listName, listElement, todo, status) {
        var chbox = document.createElement("input");
        chbox.type = "checkbox";
        chbox.id = "chbox"
        if(status === true){
            chbox.checked = true;
        }

        chbox.addEventListener("click", function(e){
            var retrivedTodos = JSON.parse(localStorage.getItem(listName));
            let newTodo;
            for (let i = 1; i < retrivedTodos.length; i++) {
                let someTodo = [retrivedTodos[i].checked, retrivedTodos[i].text];
                if(todo === someTodo[1]) {
                    retrivedTodos.splice(i, 1);
                    if(someTodo[0] === true) {
                        newTodo = {checked: false, text: todo};
                    } else {
                        newTodo = {checked: true, text: todo};
                        
                    }
                }
            }
            retrivedTodos.push(newTodo);
            localStorage.setItem(listName, JSON.stringify(retrivedTodos)) 
        });

        listElement.appendChild(chbox);
    }

    function addInput(listElement, input) {
        var txt = document.createTextNode(input);
        var p = document.createElement("p");
        p.id = "txt"
        p.appendChild(txt); 
        listElement.appendChild(p);
    } 

    function addMenuButton(listName, listElement, todo, status) {
        var menuBtn = document.createElement("button");
        menuBtn.type = "button";
        menuBtn.class = "collapsible";
        menuBtn.id = "menuBtn";

        var txt = document.createTextNode("menu");
        menuBtn.appendChild(txt);

        menuBtn.addEventListener("click", function(){
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });

        listElement.appendChild(menuBtn);

        var menuContent = document.createElement("div");
        menuContent.class = "content"
        menuContent.id = "dropDown";

        var edit = document.createElement("p");
        var etxt = document.createTextNode("edit");
        edit.appendChild(etxt)
        edit.addEventListener("click", function() {
            var newtxt = prompt("Change to do to", todo);
            if(newtxt) {
                var retrivedTodos = JSON.parse(localStorage.getItem(listName));
                let newTodo;
                for (let i = 1; i < retrivedTodos.length; i++) {
                    let someTodo = [retrivedTodos[i].checked, retrivedTodos[i].text];
                    if(todo === someTodo[1]) {
                        retrivedTodos.splice(i, 1);
                        newTodo = {checked: someTodo[1], text: newtxt};
                    }
                }
                retrivedTodos.push(newTodo);
                localStorage.setItem(listName, JSON.stringify(retrivedTodos))
                location.reload();
            };
        });
        menuContent.appendChild(edit);

        var move = document.createElement("p");
        var mtxt = document.createTextNode("move");
        move.appendChild(mtxt);
        move.addEventListener("click", function() {
            var newList = prompt("Move to", "Type name of new list here"); //Det ville være nice med dropdown menu her
            let theTodo = {checked: status, text: todo};
            // Error handling virker, men ved ikke helt hvorfor
            var retrivedTodos = JSON.parse(localStorage.getItem(newList));
            retrivedTodos.push(theTodo);
            localStorage.setItem(newList, JSON.stringify(retrivedTodos))
            remove.click();
            location.reload();
        });
        menuContent.appendChild(move);

        var remove = document.createElement("p");
        var rtxt = document.createTextNode("delete");
        remove.appendChild(rtxt);
        remove.addEventListener("click", function() {
            var retrivedTodos = JSON.parse(localStorage.getItem(listName));
            for (let i = 1; i < retrivedTodos.length; i++) {
                let someTodo = [retrivedTodos[i].checked, retrivedTodos[i].text];
                if(todo === someTodo[1]) {
                    retrivedTodos.splice(i, 1);
                }
            }
            localStorage.setItem(listName, JSON.stringify(retrivedTodos))
            location.reload();
            
        });
        menuContent.appendChild(remove);

        listElement.appendChild(menuContent);
    }



/*
    

    var addBtn = document.getElementById("btnInsert"); 
    addBtn.addEventListener("click", addToDo);

    var input = document.getElementById("inpToDo");
    input.addEventListener("keyup", function(event) {
        if(event.keyCode === 13) {
            event.preventDefault();
            addBtn.click();
        }


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

   
    */
    
}
