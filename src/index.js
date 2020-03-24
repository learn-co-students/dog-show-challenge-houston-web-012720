document.addEventListener('DOMContentLoaded', () => {

    

    fetch("http://localhost:3000/dogs")
    .then(res => res.json())
    .then(dogs => {
        dogs.forEach(dog => showDog(dog))
    })

    function showDog(dog){
        // `<tr>
        // <td>Dog *Name*</td> 
        // <td>*Dog Breed*</td> 
        // <td>*Dog Sex*</td> 
        // <td><button>Edit</button></td>
        // </tr>`
        const table = document.querySelector("table.margin")
        const tr = document.createElement("tr")
        const td1 = document.createElement("td")
        td1.innerText = dog.name
        const td2 = document.createElement("td")
        td2.innerText = dog.breed
        const td3 = document.createElement("td")
        td3.innerText = dog.sex
        const td4 = document.createElement("td")
        const btn = document.createElement("button")
        btn.innerText = "Edit"

        btn.addEventListener("click", ()=>{
            let form = document.querySelector("form")
            form[0].value = dog.name
            form[1].value = dog.breed
            form[2].value = dog.sex
            form.addEventListener("submit", () => {
              event.preventDefault()
              fetch("http://localhost:3000/dogs/" + dog.id, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify ({
                  name: form[0].value,
                  breed: form[1].value,
                  sex: form[2].value
                })
              })
              .then (resp => resp.json())
              .then(updatedDog => {
                dog = updatedDog
                td1.innerText = dog.name
                td2.innerText = dog.breed
                td3.innerText = dog.sex
                form.reset()
              })
            })
        })
        
        // btn.addEventListener("click", () => {
        //     let form = document.querySelector("form")
        //     form[0].value = dog.name
        //     form[1].value = dog.breed
        //     form[2].value = dog.sex
        //     form.addEventListener("submit", () => {
        //         event.preventDefault()
        //     fetch("http://localhost:3000/dogs/:id" {
        //         method: "PATCH"
        //         headers:{
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             name: form[0].value
        //             breed: form[1].value
        //             sex: form[2].value
        //         })
        //     })
        //     .then(function(res) {
        //         return res.json()
        //     }).then(function(json) {
        //         td1.innerText = json.name
        //         td2.innerText = json.breed
        //         td3.innerText = json.sex
        // })

        
        td4.append(btn)
        tr.append(td1,td2,td3,td4)
        table.append(tr)
    }
})