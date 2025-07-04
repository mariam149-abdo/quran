function ToArabicNumber(number){
  return number.toString().replace(/\d/g, d=> "٠١٢٣٤٥٦٧٨٩"[d]);
}

fetch("https://api.quran.gading.dev/surah")
  .then(response => response.json())
  .then(data => {
    const suralist = document.getElementById("surah-list");
    const suras = data.data;
    const basmala=document.getElementById("basmala");
    suras.forEach(sura => {
      const li = document.createElement("li");
      li.textContent = `${sura.name.short}`;
      suralist.appendChild(li);
      li.style.cursor = "pointer";

      li.addEventListener("click", function () {
        basmala.style.display="flex";
        document.getElementById("surah-list").style.display = "none";
        document.getElementById("back-to-index").style.display = "flex";

        fetch(`https://api.quran.gading.dev/surah/${sura.number}`)
          .then(response => response.json())
          .then(data => {
            const ayahsContainer = document.getElementById("ayahs");
            ayahsContainer.innerHTML = "";

            const p = document.createElement("p");
            data.data.verses.forEach(ayah => {
              p.innerHTML += `${ayah.text.arab} <span class="ayah-number">\u06DD${ToArabicNumber(ayah.number.inSurah)}</span> `;
            });

            ayahsContainer.appendChild(p);
          });
      });
    });
  });

const btn = document.getElementById("back-to-index");
btn.addEventListener("click", function () {
  const suralist = document.getElementById("surah-list");
  suralist.style.display = "grid";
  document.getElementById("ayahs").innerHTML = "";
  btn.style.display = "none";
  basmala.style.display="none";
});

const menu = document.getElementById("mobile-menu");
const menubtn= document.getElementById("menu-icon");
const menua =document.querySelectorAll(".mobile-menu a");
const animation ="animation-menu";
menubtn.addEventListener("click", () => {
 if (menu.style.display === "flex") {
    menu.style.display = "none";
    menua.forEach(link =>{link.style.display="none"});
  } 
  else {
    menu.style.display = "flex";
    menua.forEach(link =>{link.style.display="flex"});
    menu.classList.add(animation);
  }
})   