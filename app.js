const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  //Sound
  const sounds = document.querySelectorAll(".sound-picker button");
  //Time Display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");
  //Get the lenght of the outline
  const outlineLenght = outline.getTotalLength();
  //Duration
  let fakeDuration = 120;

  outline.style.strokeDasharray = outlineLenght;
  outline.style.strokeDashoffset = outlineLenght;

  //Pick diferente sounds
  sounds.forEach(sound => {
    sound.addEventListener("click", function() {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  // Play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  //Select Time
  timeSelect.forEach(option => {
    option.addEventListener("click", function() {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  // Create a function to stop and play the sound
  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./meditation-app-master/svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./meditation-app-master/svg/play.svg";
    }
  };

  //We can animate the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // Animate the Circle
    let progress = outlineLenght - (currentTime / fakeDuration) * outlineLenght;
    outline.style.strokeDashoffset = progress;
    // Animate the Text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./meditation-app-master/svg/play.svg";
      video.pause();
    }
  };
};

app();
