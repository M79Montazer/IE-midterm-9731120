// in this section of code we access HTML elements and save them as objects
const alert = document.getElementsByClassName("alert")[0];
const main = document.getElementById("main");
var ships = [];

// this section is responsible for displaying the main  movie list
async function show_movies() {
    main.innerHTML = '';
    for (var i = 3; i < 9; i++) {
        //to create the sequence 4 5 6 1 2 3
        var j = ((i % 6) + 1);
        await fetch('https://swapi.dev/api/films/' + j).then(response => {
            if (response.ok) {
                // parsing the response body
                response.json().then(data => {
                    const sec = document.createElement("section");
                    sec.classList.add("movie-section");
                    const h1 = document.createElement("h1");
                    h1.innerHTML = data.title;
                    const p1 = document.createElement("p");
                    p1.innerHTML = 'episode id: ' + data.episode_id;
                    p1.innerHTML += '<br />release date: ' + data.release_date;
                    sec.appendChild(h1);
                    sec.appendChild(p1);
                    sec.appendChild(document.createElement("br"));
                    const b = document.createElement("button");
                    b.innerHTML = 'starships!';
                    b.addEventListener('click', starships);
                    b.setAttribute("e_id", data.episode_id);
                    sec.appendChild(b);

                    main.appendChild(sec);
                    ships[data.episode_id] = data.starships;
                }).catch(error => {
                    // error on parsing the response
                    console.error(error);
                })
            } else {
                // the response doesn't have an OK state
                response.json().then(error => {
                    // display suitable alert
                    alert.innerHTML = `status code ${response.status}: ${error.error}`
                    alert.style = "display: flex";
                });
            }
        }).catch(() => {
            //the server didn't send any response back
            // display suitable alert
            alert.innerHTML = `Connection Error`
            alert.style = "display: flex";
        });

    }
}

// this section displayes the starships list of a movie
async function starships() {
    var id = this.getAttribute("e_id");
    main.innerHTML = '';
    s = ships[id];

    const b = document.createElement("button");
    b.innerHTML = 'back to movies!';
    b.addEventListener('click', show_movies);
    b.setAttribute("class", "back");
    main.appendChild(b);

    for (var i = 0; i < s.length; i++) {
        await fetch(s[i]).then(response => {
            if (response.ok) {
                // parsing the response body
                response.json().then(data => {
                    const sec = document.createElement("section");
                    sec.classList.add("movie-section");
                    const h1 = document.createElement("h1");
                    h1.innerHTML = data.name;
                    h1.addEventListener('click', show_ship);
                    h1.setAttribute("s_name", data.name);
                    sec.appendChild(h1);
                    sec.appendChild(document.createElement("br"));


                    const p1 = document.createElement("p");
                    p1.setAttribute("id", data.name);
                    p1.innerHTML = 'model: ' + data.model;
                    p1.innerHTML += '<br />manufacturer: ' + data.manufacturer;
                    p1.innerHTML += '<br />crew: ' + data.crew;
                    p1.innerHTML += '<br />passengers: ' + data.passengers;
                    p1.style.display= "none";
                    sec.appendChild(p1);

                    main.appendChild(sec);
                }).catch(error => {
                    // error on parsing the response
                    console.error(error);
                })
            } else {
                // the response doesn't have an OK state
                response.json().then(error => {
                    // display suitable alert
                    alert.innerHTML = `status code ${response.status}: ${error.error}`
                    alert.style = "display: flex";
                });
            }
        }).catch(() => {
            //the server didn't send any response back
            // display suitable alert
            alert.innerHTML = `Connection Error`
            alert.style = "display: flex";
        });
    }
}

// showing detailed info of a single ship
function show_ship() {
    var id = this.getAttribute("s_name");
    const p1 = document.getElementById(id);
    const p2 = document.createElement("p");
    p2.innerHTML = p1.innerHTML;
    main.innerHTML = '';
    const b = document.createElement("button");
    b.innerHTML = 'back to movies!';
    b.addEventListener('click', show_movies);
    b.setAttribute("class", "back");
    main.appendChild(b);

    const sec = document.createElement("section");
    sec.classList.add("movie-section");

    const h1 = document.createElement("h1");
    h1.innerHTML = id;
    sec.appendChild(h1);
    sec.appendChild(p2);
    main.appendChild(sec);
}


document.addEventListener('DOMContentLoaded', (event) => {
    show_movies();
})