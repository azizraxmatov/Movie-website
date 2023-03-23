// var elList = document.querySelector("[data-ul]");

// // var currentDate = new Date();
// // var year = new Date().getFullYear();
// // var month = new Date().getMonth();
// // var date = new Date().getDate();
// // var fullMonth = month.toString().padStart(1, 0)
// // var fullDate = date.toString().padStart(2, 0)
// // elDate.textContent = `${year}.${fullMonth + 1}.${fullDate} `;
// // console.log(`${year}.${fullMonth + 1}.${fullDate} `);

//     for (var i = 0; i < movies.length; i++ ) {
//         var movie = movies[i];
//         // const voteRate = movies[i].vote_average;
//         // moviesName.push(`Name: ${name}) - ${voteRate}`)
    
//        var elItem = document.createElement("li")

//   elItem.textContent = movie.title
//  elList.appendChild(elItem)
//     }
// console.log(RenderMovie(movies));

var elVoteMovie = document.querySelector('[data-vote-movie]')
var elReleasetMovie = document.querySelector('[data-release-movie]')
var elImgUrlMovie = document.querySelector('[data-img-url-movie]')
var elPopularityMovie = document.querySelector('[data-popularity-movie]')
var elLangMovie = document.querySelector('[data-lang-movie]')
var elNameMovie = document.querySelector('[data-name-movie]')
var elForm = document.querySelector('[data-form]')
var elBoxAdd = document.querySelector('[data-add-box-movie]')
var elSearchMovie = document.querySelector('[data-search-movie]');
var elSelectMovie = document.querySelector('[data-select-movie]');
var elSortMovie = document.querySelector('[data-sort-movie]');
var elTemplate = document.querySelector('[data-template-card]');
var elFavoritesList = document.querySelector("[data-favorite-list]");
var elInfosList = document.querySelector("[data-info-list]");
var elIdBtn = document.querySelector("[data-id-movie");
var elAddBtn = document.querySelector("[data-add-movie");
var imgUrl = "https://image.tmdb.org/t/p/w500";
const favorites = getFavorites();
const infos = getInfos();
renderFavorites(favorites);
renderInfos(infos)
renderMovie(movies);
elForm.addEventListener("submit", function (evt){
    evt.preventDefault();
    const movie = {
        title: null,
        vote_average: null,
        release_date: null,
        popularity: null,
        poster_path:  null,
        overview:  null,
        original_language: null,
    };

    movie.title = elNameMovie.value;
    movie.vote_average = elVoteMovie.value;
    movie.release_date = elReleasetMovie.value;
    movie.popularity = elPopularityMovie.value;
    movie.overview = elOverviewMovie.value;
    movie.original_language = elLangMovie.value;
    movie.poster_path = elImgUrlMovie.value;

    movies.unshift(movie);
    elBoxAdd.prepend(createElBox(movie));

});     

function renderMovie(movies) {
    elBoxAdd.innerHTML = "";
    movies.forEach((movie) => {
    elBoxAdd.appendChild(createElBox(movie));        
    });
}

function createElBox(movie) {
    const elMoviesBox = elTemplate.content.cloneNode(true);
    elMoviesBox.querySelector("img").src = `${imgUrl}${movie.poster_path}`;
    elMoviesBox.querySelector("h4").textContent = movie.title;
    // elMoviesBox.querySelector("p").textContent = movie.overview; 
    elMoviesBox.querySelector("[data-movie-vote]").textContent = movie.vote_average;
    elMoviesBox.querySelector("[data-movie-release]").textContent = movie.release_date;
    // elMoviesBox.querySelector("[data-delete-button]").dataset.MovieId = movie.id;
    elMoviesBox.querySelector("[data-favorite-btn]").dataset.id = movie.id;
    elMoviesBox.querySelector("[data-info-btn]").dataset.id = movie.id;
    elMoviesBox.querySelector("[data-favorite-btn]").textContent = 
    favorites.includes(movie.id) ? "added" : "add";

    return elMoviesBox;
}


elSelectMovie.addEventListener("click", (evt)=>{
    evt.preventDefault();
    let selectMovie = movies.filter((movie) => movie.original_language.includes(elSelectMovie.value)
);
renderMovie(selectMovie);
});

elSortMovie.addEventListener('change', (e) =>{
    e.preventDefault()
    renderMovie(sortMovie(movies));
})

elBoxAdd.addEventListener('click', (e) =>{
    
    onFavoriteClick(e);
    onInfoClick(e)
});

function sortMovie(movies) {

    if (elSortMovie.value === "A-z") {
      movies.sort((a, b)=> a.title.toLowerCase().charCodeAt() - b.title.toLowerCase().charCodeAt());  
    }
    else if (elSortMovie.value === "z-A") {
         movies.sort((a, b)=>b.title.toLowerCase().charCodeAt() - a.title.toLowerCase().charCodeAt());   
    }
    else if (elSortMovie.value === "Vote-up") {
         movies.sort((a, b)=> b.vote_average - a.vote_average);   
    }
    else if (elSortMovie.value === "Vote-down") {
         movies.sort((a, b)=> a.vote_average - b.vote_average);  
    }
    else if (elSortMovie.value === "Popularity-up") {
         movies.sort((a, b)=>a.popularity - b.popularity);   
    }
    else if (elSortMovie.value === "Popularity-down") {
         movies.sort((a, b)=> b.popularity- a.popularity);   
    }
    else{
        return "error";
    }
    return movies
}
function onFavoriteClick(evt) {
    const el = evt.target.closest("[data-favorite-btn]");
    if(!el) return;
    const id = +el.dataset.id;
    if(favorites.includes(id)){
        favorites.splice(favorites.indexOf(id), 1);
    }else{
            favorites.push(id);
        }
        setFavorites(favorites);
        renderMovie(movies)
    };

    function setFavorites(favorites) {
        localStorage.setItem("favorites", JSON.stringify(favorites));
        renderFavorites(favorites);
    };

    function renderFavorites(favorites) {
        let html = "";
        favorites.forEach((item) => {
            const movie = movies.find((movie) => {
                return movie.id === item;
            });
            html += `<span class = "badge bg-primary m-2 >${movie.title}</span>`
         });
    elFavoritesList.innerHTML = html;
    };

    function getFavorites(favorites) {
        const stringsMovies = localStorage.getItem("favorites") || "[]";
        return JSON.parse(stringsMovies);
    }






///mana
    function onInfoClick(evt) {
        const el = evt.target.closest("[data-info-btn]");
        if(!el) return;
        
        const id = +el.dataset.id;
        if(infos.includes(id)){
            infos.splice(infos.indexOf(id), 1);
        }else{
                infos.push(id);
            }
            setInfos(infos);
            renderMovie(movies)
        };
    
        function setInfos(infos) {
            localStorage.setItem("infos", JSON.stringify(infos));
            renderInfos(infos);
        };
    
        function renderInfos(infos) {
            let html = "";
            infos.forEach((item) => {
                const movie = movies.find((movie) => {
                    return movie.id === item;
                });
                html += `<span class = "badge bg-dark m-2 d-block">${movie.overview}</span>`
             });
        elInfosList.innerHTML = html;
        };
    
        function getInfos(infos) {
            const stringsMovies = localStorage.getItem("infos") || "[]";
            return JSON.parse(stringsMovies);
        }
    
// elBoxAdd.addEventListener("click" , (e)=>{
// if (!e.target.matches("[data-delete-button]")) return;
//     const elT= e.target.dataset.MovieId;
// deleteMovie(elT); 
// });


//  function deleteMovie(id) {
//     const index = Movies.findIndex((movie)=> movie.id === +id);
//     Movies.splice(index , 1);
//     renderMovie(Movies);
//  };
