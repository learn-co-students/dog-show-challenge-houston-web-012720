document.addEventListener('DOMContentLoaded', () => {

  const table = document.querySelector("thead")
  const nameField = document.querySelectorAll("input")[0]
  const breedField = document.querySelectorAll("input")[1]
  const sexField= document.querySelectorAll("input")[2]
  const form = document.querySelector("form")

  fetch("http://localhost:3000/dogs")
  .then(resp => resp.json())
  .then(dogsData => showDogs(dogsData))

  function showDogs(dogsData){
    dogsData.map(dog => showDog(dog))
  }

  function showDog(dog){
    const tr = document.createElement("tr")
    const tdName = document.createElement("td")
    tdName.innerText = dog.name
    const tdBreed = document.createElement("td")
    tdBreed.innerText = dog.breed
    const tdSex = document.createElement("td")
    tdSex.innerText = dog.sex
    const tdEdit = document.createElement("td")
    const button = document.createElement("button")
    tdEdit.append(button)
    button.addEventListener("click", ()=>{
      nameField.value = dog.name
      breedField.value = dog.breed
      sexField.value = dog.sex
      form.addEventListener("submit", () => {
        event.preventDefault()
        fetch("http://localhost:3000/dogs/" + dog.id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify ({
            name: nameField.value,
            breed: breedField.value,
            sex: sexField.value
          })
        })
        .then (resp => resp.json())
        .then(updatedDog => {
          dog = updatedDog
          tdName.innerText = dog.name
          tdBreed.innerText = dog.breed
          tdSex.innerText = dog.sex
          form.reset()
        })
      })
    })
    tr.append(tdName, tdBreed, tdSex, tdEdit)
    table.append(tr)
  }



})