
window.onload = function() {

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
        if(status === "checked"){
            chbox.checked = true;
        }
        chbox.addEventListener("click", function(){
            var txt = chbox.parentElement.innerText;
            var key = txt.substring(0, txt.length-3);
            var value = localStorage.getItem(key);
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
        p.appendChild(txt); 
        p.addEventListener("click", function(e) {
            var oldtxt = e.target.innerText;
            var newtxt = prompt("Change to do to");
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
            var txt = e.target.previousElementSibling.innerText;
            localStorage.removeItem(txt);
            window.location.reload();
        });
        delBtn.appendChild(txt);
        listElement.appendChild(delBtn);
    }
    
}
