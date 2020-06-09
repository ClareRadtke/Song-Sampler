let term = "";
let limit = "9";
const songContainer = document.getElementById("songs");

const updateTerm = () => {
  term = document.getElementById("searchInput").value;
  if(!term || term === " ") {
    alert("Please enter a search term");
  } else {
    while(songContainer.firstChild) {
      songContainer.removeChild(songContainer.firstChild);
    }
      const url = `https://itunes.apple.com/search?limit=${limit}&media=music&term=${term}`;
      fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const artists = data.results
        return artists.map(result => {
          const article = document.createElement("article"),
                artist = document.createElement("p"),
                song = document.createElement("p"),
                img = document.createElement("img"),
                audio = document.createElement("audio"),
                audioSource = document.createElement("source")
                artist.innerHTML = result.artistName;
                song.innerHTML = result.trackName;
                img.src = result.artworkUrl100;
                audioSource.src = result.previewUrl
                audio.setAttribute("controls", "");
                article.appendChild(img);
                article.appendChild(artist);
                article.appendChild(song);
                article.appendChild(audio);
                audio.appendChild(audioSource);
                songContainer.appendChild(article);
        })
      })
      .catch(error => console.log("Request failed: ", error));
    }
};

const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", updateTerm);

//use ENTER to search
function altSearch(e) {
  if(e.keyCode === 13) {
    updateTerm();
  }
}
document.addEventListener("keyup", altSearch);

//issue can play multiple previews at once
document.addEventListener("play", event => {
  const audio = document.getElementsByTagName("audio");
  for(let i=0; i < audio.length; i++) {
    if(audio[i] != event.target){
      audio[i].pause();
    }
  }
}, true);

//add limit selector for number of page results listed
const limitTen = document.getElementById("ten");
const limitTwentyFive = document.getElementById("twentyFive");
const limitFifty = document.getElementById("fifty");
const limitOneHundred = document.getElementById("oneHundred");

limitTen.addEventListener("click", itemsPerPage);
limitTwentyFive.addEventListener("click", itemsPerPage);
limitFifty.addEventListener("click", itemsPerPage);
limitOneHundred.addEventListener("click", itemsPerPage);

function itemsPerPage(event) {
  console.log();
  if(event.target===limitTen) {
    limit = 10;
    updateTerm();
  } if(event.target===limitTwentyFive) {
    limit = 25;
    updateTerm();
  } if(event.target===limitFifty) {
    limit = 50;
    updateTerm();
  } if(event.target===limitOneHundred) {
    limit = 100;
    updateTerm();
  }
}

