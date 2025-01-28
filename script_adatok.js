const kurzusApiUrl = "https://vvri.pythonanywhere.com/api/courses";
const diakApiUrl = "https://vvri.pythonanywhere.com/api/students";
const kurzusokElem = document.getElementById("kurzusokLista");
const diakokElem = document.getElementById("diakokLista");
const kurzusForm = document.getElementById("kurzusForm");
const diakForm = document.getElementById("diakForm");
const hibaUzenetElem = document.getElementById("hibaUzenet");
const ujKurzusBtn = document.getElementById("ujKurzusBtn");
const ujDiakBtn = document.getElementById("ujDiakBtn");

function kurzusokMegjelenitese() {
  document.getElementById("kurzusok").style.display = "block";
  document.getElementById("diakok").style.display = "none";
  ujKurzusBtn.style.display = "block";
  ujDiakBtn.style.display = "none";
  kurzusokBetoltese();
}

function diakokMegjelenitese() {
  document.getElementById("diakok").style.display = "block";
  document.getElementById("kurzusok").style.display = "none";
  ujKurzusBtn.style.display = "none";
  ujDiakBtn.style.display = "block";
  diakokBetoltese();
}

function kurzusokBetoltese() {
  fetch(kurzusApiUrl)
    .then((response) => response.json())
    .then((data) => {
      kurzusokElem.innerHTML = "";
      data.forEach((kurzus) => {
        const li = document.createElement("li");
        li.textContent = `${kurzus.name}`;
        const torlesGomb = document.createElement("button");
        torlesGomb.textContent = "Törlés";
        torlesGomb.id = "torlesGomb";
        torlesGomb.onclick = () => kurzusTorles(kurzus.id);
        li.appendChild(torlesGomb);
        kurzusokElem.appendChild(li);
      });
    })
    .catch((error) => console.error("Hiba a kurzusok betöltésekor:", error));
}

function diakokBetoltese() {
  fetch(diakApiUrl)
    .then((response) => response.json())
    .then((data) => {
      diakokElem.innerHTML = "";
      data.forEach((diak) => {
        const li = document.createElement("li");
        li.textContent = `${diak.name}`;
        const torlesGomb = document.createElement("button");
        torlesGomb.textContent = "Törlés";
        torlesGomb.id = "torlesGomb";
        torlesGomb.onclick = () => diakTorles(diak.id);
        li.appendChild(torlesGomb);
        diakokElem.appendChild(li);
      });
    })
    .catch((error) => console.error("Hiba a diákok betöltésekor:", error));
}

function ujKurzus() {
  kurzusForm.style.display = "block";
  ujKurzusBtn.style.display = "none";
}

function ujDiak() {
  diakForm.style.display = "block";
  ujDiakBtn.style.display = "none";
}

function kurzusMentese() {
  const kurzusNev = document.getElementById("kurzusNev").value;

  if (!kurzusNev) {
    hibaUzenetElem.textContent = "Hiba: Kérlek add meg a kurzus nevét!";
    return;
  }

  fetch(kurzusApiUrl)
    .then((response) => response.json())
    .then((data) => {
      const kurzusExists = data.some((kurzus) => kurzus.name === kurzusNev);

      if (kurzusExists) {
        hibaUzenetElem.textContent = "Hiba: A kurzus már létezik!";
      } else {
        fetch(kurzusApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: kurzusNev }),
        })
          .then(() => {
            kurzusokBetoltese();
            kurzusFormMegerese();
          })
          .catch((error) => console.error("Hiba a kurzus mentésekor:", error));
        hibaUzenetElem.textContent = "";
      }
    })
    .catch((error) => console.error("Hiba a kurzusok betöltésekor:", error));
}

function diakMentese() {
  const diakNev = document.getElementById("diakNev").value;

  if (!diakNev) {
    hibaUzenetElem.textContent = "Hiba: Kérlek add meg a diák nevét!";
    return;
  }

  fetch(diakApiUrl)
    .then((response) => response.json())
    .then((data) => {
      const diakExists = data.some((diak) => diak.name === diakNev);

      if (diakExists) {
        hibaUzenetElem.textContent = "Hiba: A diák már létezik!";
      } else {
        fetch(diakApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: diakNev }),
        })
          .then(() => {
            diakokBetoltese();
            diakFormMegerese();
          })
          .catch((error) => console.error("Hiba a diák mentésekor:", error));
        hibaUzenetElem.textContent = "";
      }
    })
    .catch((error) => console.error("Hiba a diákok betöltésekor:", error));
}

function kurzusTorles(kurzusId) {
  fetch(`${kurzusApiUrl}/${kurzusId}`, {
    method: "DELETE",
  })
    .then(() => {
      kurzusokBetoltese();
    })
    .catch((error) => console.error("Hiba a kurzus törlésénél:", error));
}

function diakTorles(diakId) {
  fetch(`${diakApiUrl}/${diakId}`, {
    method: "DELETE",
  })
    .then(() => {
      diakokBetoltese();
    })
    .catch((error) => console.error("Hiba a diák törlésénél:", error));
}

function kurzusFormMegerese() {
  kurzusForm.style.display = "none";
}

function diakFormMegerese() {
  diakForm.style.display = "none";
}

kurzusokMegjelenitese();
