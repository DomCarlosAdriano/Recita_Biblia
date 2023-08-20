const conteiner = document.querySelector(".conteiner");
const h1 = document.querySelector(".cap");
const box = document.querySelector(".box");
const ul = document.querySelector(".slide");
const play = document.querySelector(".play");
const back = document.querySelector(".back");
const time = document.querySelector(".time");
const audio = new Audio("./audio/sino.mp3");

let contadorVersos = 0;
let timeWait = Number(localStorage.getItem("time"));

let currentTime = 0;

const inserirVersos = (arrayVersos) => {
  const versiculos = arrayVersos.verses.map((index) => {
    return `<li class="verso"> ${index.number}. ${index.text} </li>`;
  });

  ul.innerHTML = versiculos.join(" ");
  h1.innerText = `${arrayVersos.book.name} ${arrayVersos.chapter.number}`;
};

const leitor = () => {
  let arryDeLi = Array.from(ul.getElementsByTagName("li")).map(
    (item) => item.textContent
  );

  if (contadorVersos < arryDeLi.length) {
    var utterance = new SpeechSynthesisUtterance(arryDeLi[contadorVersos]);
    speechSynthesis.speak(utterance);

    contadorVersos++;

    utterance.addEventListener("end", () => {
      audio.play();
      const interval = setInterval(() => {
        if (currentTime <= timeWait) {
          time.innerText = currentTime;
          currentTime++;
        } else if (time.innerText == timeWait) {
          clearInterval(interval);
          box.scrollBy(document.querySelector(".verso").scrollWidth, 0);
          currentTime = 0;
          time.innerText = "0";

          leitor();
        }
      }, 1000);
    });
  }
};

play.addEventListener("click", () => {
  const data = JSON.parse(localStorage.getItem("data"));
  inserirVersos(data);
  back.style.display = "inline-block";
  play.style.display = "none";
  leitor();
});

back.addEventListener("click", () => {
  back.style.display = "none";
  play.style.display = "inline-block";

  speechSynthesis.cancel();
  window.location.href = "./index.html";
});
