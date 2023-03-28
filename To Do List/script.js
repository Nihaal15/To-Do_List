const colors = ["#d2ceff", "#d1e5f7", "#ffcece", "#daf2d6"];
const Cat = [];
const CatColor = [];

function addCatFunc() {
    document.getElementById("popup-form").style.display = 'block';
}

function closeCatFunc() {
    document.getElementById("popup-form").style.display = 'none';
    document.getElementById("warning-message").style.display = 'none';
}

function addCat() {
    document.getElementById("warning-message").style.display = 'none';
    const newCat = document.getElementById("task-name").value;
    const listItem = document.createElement("li")
    const lst = document.getElementById("category")
    const maxItems = 10

    listItem.textContent = newCat;

    if (newCat.trim() !== "" && lst.children.length < maxItems) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const item = `
        <li class="list-item">
        <div class="list-item__circle" style="background-color: ${color}"></div>
        <div class="list-item__name">${newCat}</div>
        <button class="list-item__trash" title="Delete"><i class="fa-solid fa-trash-can trash-button" onclick="deleteCat()"></i></button>
        </li>`;
        document.getElementById("category").insertAdjacentHTML('beforeend', item);
        Cat.push(newCat);
        CatColor.push(color);
        document.getElementById("task-name").value = "";
        document.getElementById("popup-form").style.display = 'none';
    } else if (newCat.trim() === "") {
        document.getElementById("warning-message").textContent = "Category cannot be empty!"
        document.getElementById("warning-message").style.display = 'block';
    } else if (lst.children.length >= maxItems) {
        document.getElementById("warning-message").textContent = "Limit Reached!"
        document.getElementById("warning-message").style.display = 'block';
    }
}

function deleteCat() {
    const selector = document.getElementsByClassName("fa-trash-can");
    for (let i = 0; i < selector.length; i++) {
        selector[i].addEventListener('click', () => {
            const x = selector[i].closest('.list-item');
            document.getElementById("category").removeChild(x);
            Cat.splice(i, 1)
            CatColor.splice(i, 1)
        });
    }
    // document.getElementById("category").removeChild(listItem);

}


function taskPrompt() {
    if (Cat.length !== 0) {
        document.getElementById("catList").innerHTML = '';
        const disabled = '<option id="disabled" selected disabled>Choose an option</option>'
        document.getElementById("catList").insertAdjacentHTML('beforeend', disabled);
        document.getElementById("taskPrompt").style.display = "block";
        const select = document.getElementById("catList");
        Cat.forEach((item) => {
            const option = document.createElement("option");
            option.value = item;
            option.text = item;
            select.appendChild(option);
        });
    } else {
        addCatFunc()
    }
}

function closeTask() {
    document.getElementById("taskPrompt").style.display = "none";
    document.getElementById("task-message").style.display = 'none';
    document.getElementById("taskName").value = '';
    document.getElementById("taskDesc").value = '';
}

function addTaskFunc() {
    document.getElementById("task-message").style.display = 'none';
    const tName = document.getElementById("taskName").value;
    const tDesc = document.getElementById("taskDesc").value;
    const catValue = document.getElementById("catList").selectedIndex;
    const grid = document.getElementById("grid-container");

    const item = `
        <div class="card">
            <div>
                <header class="card-row">
                    <p class="task-head">${tName}</p>
                    <div class="opt-container" id="optContainer">
                     <button class="options-btn editBtn" onclick="editTask()"><i class="fa-solid fa-pen-to-square edit"></i></button>
                     <button class="options-btn delBtn func" onclick="deleteTask()"><i class="fa-solid fa-trash-can deleteTask"></i></button>
                     </div>
                </header>
            </div>
            <br>
            <p class="card-des">${tDesc}</p>
            <br>
            <div>
                <header class="card-footer">
                    <div class="cat-ico" style="background-color: ${CatColor[catValue - 1]}"></div>
                    <div class="done-container">
                        <button class="done" type="button" onclick="toogle()">
                            <i class="fa-regular fa-square"></i>
                            <span class="done-txt opaque">Done</span>
                        </button>
                    </div>
                </header>
            </div>
        </div>`;

    if (tName === '') {
        document.getElementById("task-message").textContent = "Title cannot be empty!"
        document.getElementById("task-message").style.display = 'block';
    } else if (tDesc === '') {
        document.getElementById("task-message").textContent = "Description cannot be empty!"
        document.getElementById("task-message").style.display = 'block';
    } else if (catValue <= 0) {
        document.getElementById("task-message").textContent = "Category must be selected!"
        document.getElementById("task-message").style.display = 'block';
    } else {
        grid.insertAdjacentHTML('beforeend', item);
        closeTask();
        document.getElementById("taskName").value = "";
        document.getElementById("taskDesc").value = "";
    }
}

function editTask() {
    const toggleButtons = document.querySelectorAll('.editBtn');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.card');
            const tick = card.querySelector('.deleteTask');
            const editBtn = card.querySelector(".fa-pen-to-square");
            const delBtn = card.querySelector('.func');
            const doneCon = card.querySelector('.done-container');

            const taskHead = card.querySelector('.task-head');
            const taskHeadText = taskHead.innerText;

            const taskDesc = card.querySelector(".card-des");
            const taskDescText = taskDesc.innerText;

            const input = document.createElement('input');
            input.type = 'text';
            input.className = "card-title";
            input.value = taskHeadText;

            const inputDesc = document.createElement('textarea');
            inputDesc.rows = 3;
            inputDesc.className = "card-desc";
            inputDesc.value = taskDescText;

            taskHead.replaceWith(input);
            taskDesc.replaceWith(inputDesc);

            tick.classList.toggle('fa-trash-can');
            tick.classList.toggle('fa-check');
            editBtn.classList.toggle('hidden');
            delBtn.classList.toggle('delBtn');
            delBtn.classList.toggle('tickBtn');
            doneCon.classList.toggle('hidden');

        });
    });
}

function toogle() {
    const grid = document.getElementById("grid-container");
    const toggleButtons = grid.querySelectorAll('.done');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.card');
            const doneContainer = card.querySelector('.done-container');
            const doneIcon = card.querySelector('.done-container i');
            const donetxt = card.querySelector('.done-txt');
            const desc = card.querySelector('.card-des');
            const taskHead = card.querySelector('.task-head');
            const editBtn = card.querySelector(".fa-pen-to-square");

            doneIcon.classList.toggle('fa-square');
            doneIcon.classList.toggle('fa-square-check');
            doneContainer.classList.toggle('done');
            donetxt.classList.toggle('opaque');
            desc.classList.toggle('strikethrough');
            taskHead.classList.toggle('strikethrough');
            editBtn.classList.toggle('hidden');
        });
    });
}

function deleteTask() {
    const delButtons = document.querySelectorAll('.delBtn');

    delButtons.forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.card');
            document.getElementById("grid-container").removeChild(card);
        });
    });

    const checkButtons = document.querySelectorAll('.tickBtn');

    checkButtons.forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.card');
            const tick = card.querySelector('.deleteTask');
            const editBtn = card.querySelector(".fa-pen-to-square");
            const delBtn = card.querySelector('.func');
            const doneCon = card.querySelector('.done-container');

            const taskHead = card.querySelector('.card-title');
            const taskHeadText = taskHead.value;

            const taskDesc = card.querySelector(".card-desc");
            const taskDescText = taskDesc.value;

            const input = document.createElement('p');
            input.className = "task-head";
            input.textContent = taskHeadText;

            const inputDesc = document.createElement('p');
            inputDesc.className = "card-des";
            inputDesc.textContent = taskDescText;

            taskHead.replaceWith(input);
            taskDesc.replaceWith(inputDesc);

            tick.classList.toggle('fa-trash-can');
            tick.classList.toggle('fa-check');
            editBtn.classList.toggle('hidden');
            delBtn.classList.toggle('delBtn');
            delBtn.classList.toggle('tickBtn');
            doneCon.classList.toggle('hidden');
        })
    })
}


