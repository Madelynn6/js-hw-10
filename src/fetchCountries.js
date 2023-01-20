export function fetchCountries(name){
    return fetch("https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages")
    .then(r => {
        if(r.length===0){
            throw new Error(r.status);
        }
        return r.json(name);

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