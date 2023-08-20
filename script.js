const url = `https://www.abibliadigital.com.br/api/`;
const selectBook = document.querySelector("#livrosBiblia");
const selectCap = document.querySelector("#cap");
const selectTime = document.querySelector("#time");
const search = document.querySelector(".search");

const fetchChapters = async (book) => {
  const resposta = await fetch(`${url}/books/${book}`);
  const data = await resposta.json();
  return data.chapters;
};

const fetchVerses = async (book, cap) => {
  const resposta = await fetch(`${url}/verses/nvi/${book}/${cap}`);
  return resposta.json();
};

const showChapters = async () => {
  const book = selectBook.value;
  const chapters = await fetchChapters(book);

  let caps = "";

  for (let x = 1; x <= chapters; x++) {
    caps += ` <option value="${x}">${x} </option>`;
  }

  selectCap.innerHTML = caps;
};

const setDate = async () => {
  const book = selectBook.value;
  const cap = selectCap.value;
  const time = selectTime.value;
  const data = await fetchVerses(book, cap);

  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("time", time);
  window.location.href = "./leitor.html";
};

selectBook.addEventListener("change", showChapters);
search.addEventListener("click", setDate);
