function ToArabicNumber(number){
  return number.toString().replace(/\d/g, d=> "٠١٢٣٤٥٦٧٨٩"[d]);
}
fetch("https://api.alquran.cloud/v1/surah")
  .then(response => response.json())
  .then(data => {
    const suralist = document.getElementById("surah-list");
    const suras = data.data;
    suras.forEach(sura => {
      const li = document.createElement("li");
      li.textContent=`${sura.name}`;
      suralist.appendChild(li);
      li.style.cursor = "pointer";

        li.addEventListener("click" , function (){
          document.getElementById("surah-list").style.display = "none";
         document.getElementById("back-to-index").style.display = "flex";
        fetch(`https://api.alquran.cloud/v1/surah/${sura.number}`)
        .then(response => response.json())
        .then(data => {
            const ayahsContainer = document.getElementById("ayahs");
            ayahsContainer.innerHTML = ""; 

        const p = document.createElement("p"); 
        data.data.ayahs.forEach(ayah => {
          p.innerHTML += `${ayah.text} <span class="ayah-number">\u06DD${ToArabicNumber(ayah.numberInSurah)}</span> `;
        });

        ayahsContainer.appendChild(p);

        })
    })
        })
      })

const btn = document.getElementById("back-to-index");
btn.addEventListener("click", function () {
  const suralist = document.getElementById("surah-list");
  suralist.style.display = "grid";
  document.getElementById("ayahs").innerHTML = "";
  btn.style.display="none";
});