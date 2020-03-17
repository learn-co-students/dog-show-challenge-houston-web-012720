document.addEventListener('DOMContentLoaded', () => {
  const doggosTable = document.querySelector("tbody#table-body")
  const doggosForm = document.querySelector("form#dog-form")
  const doggoName = doggosForm.elements["name"]
  const doggoBreed = doggosForm.elements["breed"]
  const doggoSex = doggosForm.elements["sex"]

  showDoggos()

  doggosForm.addEventListener("submit", (e) =>{
    e.preventDefault()
    editDoggo()
  })


  function showDoggos() {
    doggosTable.innerHTML = ""
    fetch("http://localhost:3000/dogs")
      .then(resp => resp.json())
      .then(dogs => dogs.forEach(doggo => showDoggo(doggo)))
  }

  function editDoggo(){
    let name = doggoName.value
    let breed = doggoBreed.value
    let sex = doggoSex.value
    let id = doggosForm.getAttribute("data-doggo-id")
    if (!!id){
      doggoName.value = ""
      doggoBreed.value = ""
      doggoSex.value = ""
      doggosForm.setAttribute("data-doggo-id", false)
      let params = {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name,
          breed,
          sex
        })
      }
      fetch(`http://localhost:3000/dogs/${id}`, params)
        .then(showDoggos())
    }
  }

  function showDoggo(doggo){
    let tr = document.createElement("tr")
    tr.className = "padding"
    let nameCell = document.createElement("td")
    nameCell.className = "padding center"
    nameCell.innerText = doggo.name
    let breed = document.createElement("td")
    breed.className = "padding center"
    breed.innerText = doggo.breed
    let sex = document.createElement("td")
    sex.className = "padding center"
    sex.innerText = doggo.sex
    let btnCell = document.createElement("td")
    let btn = document.createElement("button")
    btn.addEventListener("click", () =>{
      doggoName.value = doggo.name
      doggoBreed.value = doggo.breed
      doggoSex.value = doggo.sex
      doggosForm.setAttribute("data-doggo-id", doggo.id)
    })
    btn.innerText = "Edit Doggo"
    btnCell.append(btn)
    tr.append(nameCell, breed, sex, btnCell)
    doggosTable.append(tr)
  }


})