// document.addEventListener('DOMContentLoaded', () => {

// })
const tbody = document.querySelector("#table-body")
let dog_id

const display_data = (datas) =>{
    datas.forEach(dog => {
        add_dog(dog)
    });
}

const add_dog = (dog) => {
    const button = document.createElement("button")
    const tr = document.createElement("tr")
    tr.id = dog.id

    let tdName , tdBreed , tdGender

    tdName = document.createElement("td")
    tdName.innerText = dog.name

    tdBreed = document.createElement("td")
    tdBreed.innerText = dog.breed 

    tdGender = document.createElement("td")
    tdGender.innerText = dog.sex

    button.innerText = "Edit Dog"
    button.style.width = "100%"

    button.addEventListener("click", () => {
        // const form = document.querySelector("#dog-form")
        document.querySelector("#form-name").value = tdName.innerText
        document.querySelector("#form-breed").value = tdBreed.innerText 
        document.querySelector("#form-sex").value = tdGender.innerText
        // form[0].value = tdName.innerText
        // form[1].value = tdBreed.innerText
        // form[2].value = tdGender.innerText
        dog_id = dog.id 
        edit_dog_info()
    })

    tr.append(tdName,tdBreed,tdGender,button)
    tbody.append(tr)
}

const edit_dog_info = () => {
    const form = document.querySelector("#dog-form")
    form.addEventListener("submit", () => {
        event.preventDefault()
        fetch(`http://localhost:3000/dogs/${dog_id}`,{
            method: "PATCH",
            headers: {
                "Content-Type":  "application/json"
            },
            body: JSON.stringify({
                name: form[0].value,
                age: form[1].value,
                sex: form[2].value
            })
        })
        .then(res => res.json())
        .then(updateDog => {
            form.reset()
            update_view(updateDog)
        })
    })

}


const update_view = (updateDog) => {
    let tr = document.getElementById(updateDog.id)
    tr.children[0].innerText = updateDog.name 
    tr.children[1].innerText = updateDog.breed
    tr.children[2].innerText = updateDog.sex
}



fetch("http://localhost:3000/dogs")
.then(res => res.json())
.then(dog_datas => display_data(dog_datas))
