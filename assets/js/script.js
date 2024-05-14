const container = document.querySelector(".container")
let data = []

////////////////READ//////////////////////

function read() {
    let data = (localStorage.getItem("data")) ? JSON.parse(localStorage.getItem("data")) : []
    container.innerHTML= ""
    data.forEach(element => {
        addIteam(element)
    });
}

////////////////ADD ITEAM//////////////////
const addIteam = (element)=> {
    container.innerHTML += `<div class="card ${(element.done)?"done":""}">
                                <span id="name${element.id}">${element.taskName}</span>
                                <input type="text" placeholder="task name" value="" id="updateNameInput${element.id}" class="updateName">
                                <button onclick="updateName(${element.id})" class="updateName save" id="updateNameButton${element.id}">save</button>
                                <button onclick="updateState(${element.id})" class="state">updateState</button>
                                <button onclick="showUpdateForm(${element.id})" class="form" id="show${element.id}">updateName</button>
                                <button onclick="deleteItem(${element.id})" class="delete">delete</button>
                                </div>`
}

///////////////CREATE//////////////////////
const form = document.querySelector("form")
form.addEventListener("submit", (event)=> {
    event.preventDefault()
    const input = document.querySelector("#taskName")
    let  id = (localStorage.getItem("id")) ? parseInt(localStorage.getItem("id"))+1 : 1
    const task = {id:id , taskName:input.value , done:false}
    data.push(task)
    addIteam(task)
    input.value = ""
    localStorage.setItem("data" , JSON.stringify(data))
    localStorage.setItem("id" , id)
})

///////////////UPDATE STATE /////////////////
function updateState(id) {
    data = data.map(element => {
        if (element.id == id) {
            element.done = ! element.done
        }
        return element
    })
    localStorage.setItem("data" , JSON.stringify(data))
    read()
}
////////////////UPDATE NAME////////////////////
function updateName(id) {
    const updateButton = document.querySelector(`#show${id}`)
    const name = document.querySelector(`#name${id}`)
    const input = document.querySelector(`#updateNameInput${id}`)
    const button = document.querySelector(`#updateNameButton${id}`)
    data = data.map(element => {
        if (element.id == id) {
            element.taskName = input.value
        }
        return element
    })
    localStorage.setItem("data" , JSON.stringify(data))
    input.style.display = "none"
    button.style.display = "none"
    name.style.display = "inline"
    updateButton.style.display = "inline"
    read()
}

///////////////SHOW UPDATE FORM/////////////////
function showUpdateForm(id) {
    const updateButton = document.querySelector(`#show${id}`)
    const name = document.querySelector(`#name${id}`)
    const input = document.querySelector(`#updateNameInput${id}`)
    const button = document.querySelector(`#updateNameButton${id}`)
    input.style.display = "inline"
    button.style.display = "inline"
    name.style.display = "none"
    updateButton.style.display = "none"
    const value = data.find(element => {return element.id == id})
    input.value = value.taskName
}

////////////////////DELETE////////////////////////
function deleteItem(id) {
    data = data.filter(element => {return element.id != id})
    localStorage.setItem("data" , JSON.stringify(data))
    read()
}
read()