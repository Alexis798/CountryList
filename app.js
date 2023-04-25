document.addEventListener('DOMContentLoaded', () => {
    
    const selectDrop = document.querySelector('#countries');
    //const selectedDrop = document.getElementById('countries');


    fetch('https://restcountries.com/v3.1/all').then(res => {
        return res.json();
    }).then(data => {

        let output = "";

        output += `<option value="NULL">-- Select Country --</option>`


        data.map(country => {
            output += `<option value="${country.name.common}">${country.flag} ${country.name.common}</option>`
        })

        selectDrop.innerHTML = output

    }).catch(err => {
        console.log(err);
    })
})