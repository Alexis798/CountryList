const COUNTRIES = [];
const STATES = [];
const REGION = [];
const CITIES = [];

var headers = new Headers();
headers.append("X-CSCAPI-KEY", "API_KEY");

var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};

document.addEventListener('DOMContentLoaded', () => {
    
    const selectDrop = document.querySelector('#countries');
    //const selectedDrop = document.getElementById('countries');

    fetch('https://api.countrystatecity.in/v1/countries/', requestOptions).then(res => {
        return res.json();
    }).then(data => {

        data.map(country => {
            fetch(`https://api.countrystatecity.in/v1/countries/${country.iso2}`, requestOptions).then(res => {
                return res.json();
            }).then(result => {
            
                let output = "";

                output += `<option value="NULL">-- Select Country --</option>`;
                
                COUNTRIES.push({id: result.id, name: result.name, emoji: result.emoji, iso: result.iso2})

                COUNTRIES.sort((a, b) => {
                    return a.id - b.id;
                })

                COUNTRIES.forEach(countryDetail => {
                    output += `<option value="${countryDetail.name}">${countryDetail.emoji} ${countryDetail.name}</option>`
                })

                selectDrop.innerHTML = output
            }).catch(err => {
                console.log(err);
            })
        })

    }).catch(err => {
        console.log(err);
    })
})

document.addEventListener('change', (e) => {

    
    if(e.target.matches('#countries')) {
        COUNTRIES.forEach(country => {
            if(e.target.value == country.name) {

                REGION.length = 0;
                REGION.push(({idCountry: country.iso, idState: null}))

                fetch(`https://api.countrystatecity.in/v1/countries/${country.iso}/states`, requestOptions).then(res => {
                    return res.json();
                }).then(result => {
                    
                    STATES.length = 0;

                    result.map(state => {
                        STATES.push(({id: state.id, name: state.name, iso: state.iso2}))
                    })

                    const selectDrop2 = document.querySelector('#states');

                    let output = "";

                    output += `<option value="NULL">-- Select State --</option>`;

                    STATES.forEach(stateDetail => {
                        output += `<option value="${stateDetail.name}">${stateDetail.name}</option>`
                    })

                    selectDrop2.innerHTML = output
                })
            }
        })
    }

    if(e.target.matches('#states')) {
        STATES.forEach(state => {
            if(e.target.value == state.name) {
                REGION[0].idState = state.iso
                
                REGION.forEach(country => {
                    fetch(`https://api.countrystatecity.in/v1/countries/${country.idCountry}/states/${country.idState}/cities`, requestOptions).then(res => {
                        return res.json();
                    }).then(result => {
                        
                        const selectDrop3 = document.querySelector('#cities');

                        let output = "";

                        output += `<option value="NULL">-- Select City --</option>`;

                        result.forEach(city => {
                            output += `<option value="${city.name}">${city.name}</option>`
                        })

                        selectDrop3.innerHTML = output
                    })
                })
            }
        })
    }

    
})