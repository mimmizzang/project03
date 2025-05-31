const frame = document.querySelector("section");
const lists = frame.querySelectorAll("article");
const deg = 45;
const len = lists.length - 1;
let num = 0;
let active = 0;

// 초기 회전과 이미지 설정
lists.forEach((el, i) => {
  const pic = el.querySelector(".pic");
  el.style.transform = `rotate(${deg * i}deg) translateY(-100vh)`;
  pic.style.backgroundImage = `url(../img/member${i + 1}.jpg)`;

  // 버튼 이벤트 등록
  const playBtn = el.querySelector(".play");
  const pauseBtn = el.querySelector(".pause");
  const loadBtn = el.querySelector(".load");

  playBtn.addEventListener("click", () => handleAudioAction(el, "play"));
  pauseBtn.addEventListener("click", () => handleAudioAction(el, "pause"));
  loadBtn.addEventListener("click", () => handleAudioAction(el, "load"));
});

// 버튼 클릭 시 오디오 컨트롤 함수
function handleAudioAction(article, action) {
  if (!article.classList.contains("on")) return;
  const pic = article.querySelector(".pic");
  const audio = article.querySelector("audio");

  switch (action) {
    case "play":
      pic.classList.add("on");
      audio.play();
      break;
    case "pause":
      pic.classList.remove("on");
      audio.pause();
      break;
    case "load":
      pic.classList.add("on");
      audio.load();
      audio.play();
      break;
  }
}

// 회전 버튼 클릭 이벤트
document
  .querySelector(".btnPrev")
  .addEventListener("click", () => rotateFrame(1));
document
  .querySelector(".btnNext")
  .addEventListener("click", () => rotateFrame(-1));

function rotateFrame(direction) {
  initMusic();
  num += direction;
  frame.style.transform = `rotate(${deg * num}deg)`;
  active = (active - direction + lists.length) % lists.length; // 모듈러 연산으로 순환
  activateArticle(active);
}

// 현재 활성화된 article 처리
function activateArticle(index) {
  lists.forEach((el) => el.classList.remove("on"));
  lists[index].classList.add("on");
}

// 모든 오디오 초기화
function initMusic() {
  document.querySelectorAll("audio").forEach((audio) => {
    audio.pause();
    audio.load();
    audio.parentElement.previousElementSibling.classList.remove("on");
  });
}
