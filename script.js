const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';


const cities = [];

// fetch(endpoint).then(blob => console.log(blob))



// our endpoint is a Json file, we need to fetch it. The current go is fetch() and it returs a PROMISE.
// then we add then against it, which returns a blob, which is the response of the promise, a chunk of data.
/*  like the following:
Response {type: "cors", url: "https://gist.githubusercontent.com/Miserlou/c5cd83…258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json", redirected: false, status: 200, ok: true, …}
body: (...)
bodyUsed: false
headers: Headers {}
ok: true
redirected: false
status: 200
statusText: "OK"
type: "cors"
url: "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json"
__proto__: Response 
*/

// this returns a RAW DATA, not a JSON, so we cannot parse it yet! 
// it needs to be converted from RAW data to JSON to be parsed. And this blob has a method called json.

fetch(endpoint)
.then(blob => blob.json())
.then(data => cities.push(...data))

/* 
step by step:

fetched the endpoint json. returned a promise
called .then() against it, and we called blob to what is returned.
then this promise has a json method, which we called against blob.
now we are with blob.json()
then we called .then against it and called `data`to the chunk of info that is returned.

then we console.logged that data which is a massive information.
*/

// in order to add this data to a const list, we could have used directly push method but then it would only add arrays into it not individuals.
// instead, we used `spread`method. to spread them all into the list. we did it by adding ... before the data var.  



// NOW FILTERING BY TYPING!

function findMatched(word, cities){
    return cities.filter(place => {
        // here we need to know if the city/state matches to query
        const regex = new RegExp(word, 'gi' );
        // creating a regex to match, passing word as word queried and passing arguments : g global i insentive for case
        return place.city.match(regex) || place.state.match(regex)
    });
}

/*   
what is happening up there ?

create a function called findMatched, takes 2 arguments: search string and cities list.

since the data that returned a lot of information, we filtered the returned value and called it place.

and some regex magic for search query

if state or city returns, this will be displayed on the hayda

*/


function displayMatches(){
    const matchArray = findMatched(this.value, cities);
    const html = matchArray.map(place =>{
        return `
        <li>
          <span class="name">${place.city},${place.state}</span>
          <span class="population">${place.population}</span>
        </li>`;
    }).join('');
        suggestions.innerHTML= html;
}




const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('keyup', displayMatches)