const fetchCountryFields = 'name,capital,population,flags,languages';
export function fetchCountries(name){
    return fetch(`https://restcountries.com/v2/name/${name}?fields=${fetchCountryFields}`)
    .then(r => {
        if (!r.ok){
            throw new Error(r.status);
        }
        return r.json();

        }
    )
    .catch(e => console.log('Error', e))
}
    // .then(r => {
    //     const arr1 = r.map(value => value['name'])
    //     // console.log(arr1)

    //     const arr2 = arr1.filter(el => el['common'].toLowerCase().includes(name.toLowerCase()));
    //     // console.log(arr2)
    //     // console.log(arr2);        
    //     }
    //     )