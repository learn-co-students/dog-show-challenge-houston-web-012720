document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.querySelector('#table-body')
    const dogForm = document.querySelector('#dog-form')
    const table = document.querySelector('table')

    // const table = document.querySelector('.margin flex')
    // const tr = document.querySelector('.padding')

    
    function onStart(){
        fetch('http://localhost:3000/dogs')
        
        .then(res => res.json())
        .then(dogs => {
        table.innerHTML = ''
        dogs.forEach(dog => {showDog(dog)})
        })
    }
    
    
    

    
    function showDog(dog){
        
        // const table = document.querySelector('table')
        const tr = document.createElement('tr')


        const td1 = document.createElement('td')
        td1.innerText = dog.name 
        const td2 = document.createElement('td')
        td2.innerText = dog.breed 
        const td3 = document.createElement('td')
        td3.innerText = dog.sex 
        const td4 = document.createElement('td')
    
        const edBtn = document.createElement('button')
        edBtn.innerText = 'Edit'

        edBtn.addEventListener('click',()=> {
            dogForm[0].value = dog.name
            dogForm[1].value = dog.breed
            dogForm[2].value = dog.sex
            //console.log('raul', dog)
            dogForm.setAttribute('dogId', dog.id)
            

        })
        td4.append(edBtn)
        tr.append(td1, td2, td3, td4)
        table.append(tr)
    }
        dogForm.addEventListener("submit", () => {
            event.preventDefault()
            let id = dogForm.getAttribute('dogId')
            console.log('submitted', id )
            fetch('http://localhost:3000/dogs/'+ id,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    // Accepted: 'application/json'
                },
                body: JSON.stringify({
                name: dogForm[0].value,
                breed: dogForm[1].value,
                sex:  dogForm[2].value 
            
                })
            })
            .then(res => res.json())
            .then(newDog => {
                console.log(newDog)
                onStart()
                // td1.innerText = dog.name
                // td2.innerText = dog.breed 
                // td3.innerText = dog.sex 
            })






        })

        
    


onStart()

})