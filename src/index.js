document.addEventListener('DOMContentLoaded', () => {

  const DOGS_URL = "http://localhost:3000/dogs"

  const getDogs = () => {
    fetch(DOGS_URL)
      .then(res => res.json())
      .then(dogs => {
        dogs.map(dog => addToTable(dog))
      })
  }

  const addToTable = (dog) => {
    const table = document.querySelector("table")

    const dog_entry = document.createElement("tr")
    const dog_row = table.insertRow(1)

    const dog_name = dog_row.insertCell(0)
    const dog_breed = dog_row.insertCell(1)
    const dog_sex = dog_row.insertCell(2)
    const dog_edit = dog_row.insertCell(3)

    dog_name.innerText = dog.name
    dog_breed.innerText = dog.breed
    dog_sex.innerText = dog.sex
    dog_edit.innerText = "Edit Dog"

  }

  getDogs()

})
