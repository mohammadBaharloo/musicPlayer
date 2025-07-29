// variables
const audio = document.querySelector("#audio");
const playBtn = document.querySelector(".play-btn");
const forwardBtn = document.querySelector(".forward-btn");
const rewindBtn = document.querySelector(".rewind-btn");
const playPuseIcon = document.querySelector(".bi-play-circle-fill");
const songTitle = document.querySelector("#song-title");
const singer = document.querySelector("#singer");
const songImg = document.querySelector(".song-img");
const playList = document.querySelector(".play-list");
const progressContainer = document.querySelector(".progress-container");

const songs = [
  {
    title: "Fire to the rain",
    singer: "Adele",
    file: "assets/musics/setFireToTheRain.wav",
    cover: "assets/photos/adele.jpg",
  },
  {
    title: "Lovely",
    singer: "Billie Eilish",
    file: "assets/musics/Lovely.wav",
    cover: "assets/photos/BillieEilish-KhalidLovely.jpg",
  },
  {
    title: "save your tears",
    singer: "Weeknd & ariana grande",
    file: "assets/musics/saveYourTears.wav",
    cover: "assets/photos/the-weeknd-ariana-grande.jpg",
  },
];

let playFlag = true;
let songIndex = 0;

// play song

const playSong = () => {
  if (playFlag) {
    audio.play();
    playPuseIcon.classList.remove("bi-play-circle-fill");
    playPuseIcon.classList.add("bi-pause-circle-fill");
    playFlag = false;
  } else {
    audio.pause();
    playPuseIcon.classList.remove("bi-pause-circle-fill");
    playPuseIcon.classList.add("bi-play-circle-fill");
    playFlag = true;
  }
};

// load songs
const loadSongs = (index) => {
  songTitle.innerHTML = songs[index].title;
  singer.innerHTML = songs[index].singer;
  songImg.src = songs[index].cover;
  audio.src = songs[index].file;
  playFlag = true;
  playSong();
};

// next and Previous
forwardBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSongs(songIndex);
});
rewindBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1) % songs.length;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSongs(songIndex);
});

playBtn.addEventListener("click", playSong);
loadSongs(songIndex);

// play list
songs.forEach((song, index) => {
  playList.insertAdjacentHTML(
    "beforeend",
    `<div class="single-song" data-index="${index}"><img class="play-list-img" src="${song.cover}" alt="">
<p class="play-list-title">${song.title} - ${song.singer}</p>
</div>
  `
  );
});

document.querySelectorAll(".single-song").forEach((item) => {
  item.addEventListener("click", (e) => {
    const songIndex = e.currentTarget.dataset.index;
    loadSongs(songIndex);
  });
});

// progress

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60) || 0;
  const secs = Math.floor(seconds % 60) || 0;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

audio.addEventListener("loadedmetadata", () => {
  document.getElementById("music-time").textContent = formatTime(
    audio.duration
  );
});

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  document.getElementById("progres").style.width = percent + "%";
  document.getElementById("time-progress").textContent = formatTime(
    audio.currentTime
  );
});

progressContainer.addEventListener("click", (e) => {
  const rect = progressContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percent = clickX / rect.width;
  audio.currentTime = percent * audio.duration;
});
