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

    // Save a new list item to localstorage when newListBtn is activated 
    function newList() {
        var listName = document.getElementById("inpNewList").value;

        // The zero element is used to tell whether a list is showed
        let todos = [true]; 
        
        // listName is used as key and stored with an array as value
        localStorage.setItem(listName, JSON.stringify(todos));
        
        // Reload the page, with the added list
        location.reload(); 
    }

    
    // Create the list on the page with a button in the sidenav and check if the list should be shown
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
            // Retrives the first value in the array of the clicked list, which tells if a list is shown
            var listName = e.target.innerHTML;
            let retrivedTodos = JSON.parse(localStorage.getItem(listName));
            let show = retrivedTodos[0];
            
            // Switch the value of shown between true and falls, when clicked
            if(show) {
                retrivedTodos[0] = false;
            } else {
                retrivedTodos[0] = true;
            }
            
            // Save the list, with the updated value
            localStorage.setItem(listName, JSON.stringify(retrivedTodos));

            // Reload the page, to implement the change
            location.reload();
        });

        // Make it possible to drop todos 
        listBtn.addEventListener("dragenter", function(e) {
            e.preventDefault();
            listBtn.classList.add("drag-over");
        });
        listBtn.addEventListener("dragover", function(e) {
            e.preventDefault();
            listBtn.classList.add("drag-over");
        });
        listBtn.addEventListener("dragleave", function(e) {
            listBtn.classList.remove("drag-over");
        });
        listBtn.addEventListener("drop", function(e) {
            listBtn.classList.remove("drag-over");
            
            // Retrive data from old todo
            let todoTxt = e.dataTransfer.getData("txt");
            let status = e.dataTransfer.getData("status");
            let oldListName = e.dataTransfer.getData("listName");

            // Save todo in new list
            let newRetrivedTodos = JSON.parse(localStorage.getItem(listName))
            let movedTodo = {checked: status, text: todoTxt};
            newRetrivedTodos.push(movedTodo);
            localStorage.setItem(listName, JSON.stringify(newRetrivedTodos));
            
            // Delete todo in old list
            var oldRetrivedTodos = JSON.parse(localStorage.getItem(oldListName));
            for (let i = 1; i < oldRetrivedTodos.length; i++) {
                let someTodo = [oldRetrivedTodos[i].checked, oldRetrivedTodos[i].text];
                if(todoTxt === someTodo[1]) {
                    oldRetrivedTodos.splice(i, 1);
                }
            }
            localStorage.setItem(oldListName, JSON.stringify(oldRetrivedTodos))
            
            // Reload the page, to implement the change
            location.reload();
        });

        // Add the button to the sidenavigation
        var sideNav = document.getElementById("sidenav");
        sideNav.appendChild(listBtn);
    }

    // Chow the list by generating a box at the page
    function showList(listName) {
        // Create box    
        var listBox = document.createElement("div");
        listBox.id=listName

        // Add header to the box
        var header = document.createElement("H2");
        header.innerText = listName;
        listBox.appendChild(header);

        // Add box to page (listContainer)
        var listContainer = document.getElementById('listContainer');
        listContainer.appendChild(listBox);

        addInputBar(listName)
        showTodos(listName)
    }

    // Create inputbar and add button to create new todos
    function addInputBar(listName) {
        var todoList = document.getElementById(listName);

        // Create inputpar
        var inpToDo = document.createElement("input");
        inpToDo.id = "inpToDo";
        inpToDo.type = "text";
        inpToDo.placeholder = "New to-do...";

        // A todo is saved if user type "enter" while typing in the inputbar
        inpToDo.addEventListener("keyup", function(event) {
            if(event.keyCode === 13) {
                event.preventDefault();
                // Calls method which save the todo
                newToDoBtn.click();
            }
        });
        todoList.appendChild(inpToDo);

        // Create add button
        var newToDoBtn = document.createElement("button");
        newToDoBtn.id = "newToDoBtn";
        newToDoBtn.type = "button";
        newToDoBtn.innerHTML = "+";
        
        // Save a new todo if add button is clicked
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

    // Show todos in a list
    function showTodos(listName) {
        // retrieve the list of todos
        var todoList = document.getElementById(listName);
        let retrivedTodos = JSON.parse(localStorage.getItem(listName));

        // loop through each todo and show the todo 
        for (let i = 1; i < retrivedTodos.length; i++) {
            var aTodo = document.createElement("div");
            let todo = [retrivedTodos[i].checked, retrivedTodos[i].text]
            let checked = todo[0];
            let txt = todo[1];
            
            addCheckbox(listName, aTodo, txt, checked);
            addInput(listName, aTodo, txt, checked);
            addMenuButton(listName, aTodo, txt, checked);

            todoList.appendChild(aTodo);
        }
    }

    // Generate the checkbox and mark if it checked
    function addCheckbox(listName, listElement, todo, status) {
        // Create the checkbox
        var chbox = document.createElement("input");
        chbox.type = "checkbox";
        chbox.id = "chbox"
        
        // Mark it as chechekd if checked
        if(status === true){
            chbox.checked = true;
        }

        // Stores whether a todo is checked or not
        chbox.addEventListener("click", function(e){
            var retrivedTodos = JSON.parse(localStorage.getItem(listName));
            let newTodo;
            for (let i = 1; i < retrivedTodos.length; i++) {
                let someTodo = [retrivedTodos[i].checked, retrivedTodos[i].text];
                if(todo === someTodo[1]) {
                    // Remove the old information
                    retrivedTodos.splice(i, 1);
                    if(someTodo[0] === true) {
                        newTodo = {checked: false, text: todo};
                    } else {
                        newTodo = {checked: true, text: todo};
                        
                    }
                }
            }
            // Stores the new status of the todo
            retrivedTodos.push(newTodo);
            localStorage.setItem(listName, JSON.stringify(retrivedTodos)) 
        });

        listElement.appendChild(chbox);
    }

    // Generate the text of the todo
    function addInput(listName, listElement, input, status) {
        // Create the text element
        var txt = document.createTextNode(input);
        var p = document.createElement("p");
        p.id = "txt"
        p.appendChild(txt);

        // Make the text dragable
        p.draggable = true;
        p.addEventListener("dragstart", function(e) {
            e.dataTransfer.setData("txt", input);
            e.dataTransfer.setData("status", status);
            e.dataTransfer.setData("listName", listName);
        });

        listElement.appendChild(p);
    } 

    // Generate the menubutton and the popout-menu
    function addMenuButton(listName, listElement, todo, status) {
        // Create the menuButton
        var menuBtn = document.createElement("div");
        menuBtn.tabIndex = "0;"
        menuBtn.id = "menuBtn";
        var txt = document.createTextNode("menu");
        menuBtn.appendChild(txt);

        // Create the popout-menu
        var menuContent = document.createElement("div");
        menuContent.class = "content"
        menuContent.id = "dropDown";

        // Create the edit-button in the popout-menu
        var edit = document.createElement("div");
        edit.id = "menuItem";
        var etxt = document.createTextNode("edit");
        edit.appendChild(etxt)
        // Make it possible to edit a todo throug a prompt
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

        // Create the move-button
        var move = document.createElement("div");
        move.id = "menuItem";
        var mtxt = document.createTextNode("move");
        move.appendChild(mtxt);
        // Make it possible to move a todo throug a prompt
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

        // Create the delete-button
        var remove = document.createElement("div");
        remove.id = "menuItem";
        var rtxt = document.createTextNode("delete");
        remove.appendChild(rtxt);
        // Make it possible to remove a todo.
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
        menuBtn.appendChild(menuContent);
        listElement.appendChild(menuBtn);
    }    
}
