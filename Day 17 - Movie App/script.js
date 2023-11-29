const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=38567b7c3359452d13704f8cb740efcb';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=38567b7c3359452d13704f8cb740efcb&query="';

const genres = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
];
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const tagsEl = document.getElementById('tags');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const current = document.getElementById('current');

let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let lastUrl = '';
let totalPages = 100;
let selectedGenre = [];
setGenre();

function setGenre() {
  tagsEl.innerHTML = '';
  genres.forEach((genre) => {
    const t = document.createElement('div');
    t.classList.add('tag');
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener('click', () => {
      if (selectedGenre.length === 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, idx) => {
            if (id === genre.id) {
              selectedGenre.splice(idx, 1);
            }
          });
        } else {
          selectedGenre.push(genre.id);
        }
      }
      console.log(selectedGenre);
      getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')));
      highlightSelection();
    });
    tagsEl.append(t);
  });
}

function highlightSelection() {
  const tags = document.querySelectorAll('.tag');
  tags.forEach((tag) => {
    tag.classList.remove('highlight');
  });
  clearBtn();
  if (selectedGenre.length !== 0) {
    selectedGenre.forEach((id) => {
      const highlightedTag = document.getElementById(id);
      highlightedTag.classList.add('highlight');
    });
  }
}

function clearBtn() {
  let clearBtn = document.getElementById('clear');
  if (clearBtn) {
    clearBtn.classList.add('highlight');
  } else {
    let clear = document.createElement('div');
    clear.classList.add('tag', 'highlight');
    clear.id = 'clear';
    clear.innerText = 'Clear x';
    clear.addEventListener('click', () => {
      selectedGenre = [];
      setGenre();
      getMovies(API_URL);
    });
    tagsEl.append(clear);
  }
}

getMovies(API_URL);

async function getMovies(url) {
  lastUrl = url;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results);
  currentPage = data.page;
  nextPage = currentPage + 1;
  prevPage = currentPage - 1;
  totalPages = data.total_pages;
  if (data.results.length !== 0) {
    showMovies(data.results);
  } else {
    main.innerHTML = `<h1 class="no-results"> No Results Found</h1>`;
  }
}

function showMovies(movies) {
  main.innerHTML = '';
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
        
        <img
          src="${
            poster_path ? IMG_PATH + poster_path : './images/no-poster.jpg'
          }"alt="${title}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average.toFixed(
      1
    )}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
         ${overview}
        </div>
     `;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  selectedGenre = [];
  setGenre();
  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);
    search.value = '';
  } else {
    getMovies(API_URL);
  }
});
next.addEventListener('click', () => {
  if (nextPage <= totalPages) {
    pageCall(nextPage);
  }
});

function pageCall(page) {}
