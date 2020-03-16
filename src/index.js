document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/dogs')
        .then(function(res) {
            return res.json()
        }).then(function(json) {
            showdog(json)
        })

    function showdog(dogarray) {
        dogarray.forEach(function(dog) {
            createdog(dog)
        })
    }

    function createdog(dog) {
        let table = document.getElementById("table-body")
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        td1.innerText = dog.name
        let td2 = document.createElement('td')
        td2.innerText = dog.breed
        let td3 = document.createElement('td')
        td3.innerText = dog.sex
        let edit = document.createElement('button')
        edit.innerText = "Edit Dog"
        edit.addEventListener('click', function() {
            let form = document.getElementById('dog-form')
            form[0].value = dog.name
            form[1].value = dog.breed
            form[2].value = dog.sex
            form.addEventListener('submit', function(event) {
                event.preventDefault()
                fetch(`http://localhost:3000/dogs/${dog.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: form[0].value,
                        breed: form[1].value,
                        sex: form[2].value
                    })
                }).then(function(res) {
                    return res.json()
                }).then(function(json) {
                    td1.innerText = json.name
                    debugger
                    td2.innerText = json.breed
                    td3.innerText = json.sex
                })
            })
        })
        tr.append(td1, td2, td3, edit)
        table.append(tr)
    }
})