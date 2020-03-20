const table = document.querySelector("tbody#table-body")
const form = document.querySelector("form#dog-form")

 function allDogs(){ fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(dogs => {
        table.innerHTML = "";
        dogs.forEach(dog => makeDogTable(dog))
    })
 }

function makeDogTable(dog){
    const tr = document.createElement("tr")
    

    const tdName = document.createElement("td")
    tdName.innerText = dog.name

    const tdBreed = document.createElement("td")
    tdBreed.innerText = dog.breed

    const tdSex = document.createElement("td")
    tdSex.innerText = dog.sex


    const tdBtn = document.createElement("td")


    const btn = document.createElement("button")
    btn.innerText = "Edit Info"

    btn.addEventListener("click", () => {
       form[0].value = dog.name
       form[1].value = dog.breed
       form[2].value = dog.sex
        form.setAttribute('dogId', dog.id)
    })

    tdBtn.append(btn)
    tr.append(tdName,tdBreed,tdSex,tdBtn)
    table.append(tr)

}

form.addEventListener("submit", () => {
    event.preventDefault()
    let id = form.getAttribute('dogId')
    fetch(`http://localhost:3000/dogs/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: form[0].value,
            breed: form[1].value,
            sex: form[2].value  
        })
   })
   .then(resp => resp.json())
   .then(newInfo => {
    //    tdName.innerText = dog.name
    //    tdBreed.innerText = dog.breed
    //    tdSex.innerText = dog.sex
        allDogs()
        form.reset()
    })
})

allDogs()