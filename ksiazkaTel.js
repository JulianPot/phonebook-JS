document.addEventListener("DOMContentLoaded", function () {
  let kontakty;
  let kontaktyStr;

  let pobieranieKT = () => {
    if (localStorage.getItem("KT") == null) {
      kontakty = [];
    } else {
      kontaktyStr = localStorage.getItem("KT");
      kontakty = JSON.parse(kontaktyStr);
    }
  };

  let zapisywanieKT = () => {
    kontaktyStr = JSON.stringify(kontakty);
    localStorage.setItem("KT", kontaktyStr);
  };

  document.querySelector("input[type = 'button']").onclick = function () {
    if (document.querySelector("input[value='dodaj']").checked) {
      let imie = prompt(`Podaj imię dodawanej osoby:`);
      let nazwisko = prompt(`Podaj nazwisko dodawanej osoby:`);
      let nrTel = prompt(`Podaj numer telefonu dodawanej osoby:`);
      let dane = [imie, nazwisko, nrTel];

      pobieranieKT();

      kontakty.push(dane);

      zapisywanieKT();
    }

    if (document.querySelector("input[value='pokaz']").checked) {
      let szukanaOsoba = prompt(
        `Podaj nazwisko osoby którą chcesz wyświetlić:`
      );
      let i = 0;

      pobieranieKT();

      for (let x of kontakty) {
        if (x[1] === szukanaOsoba) {
          document.querySelector(
            "#komunikaty"
          ).innerHTML = `Imię: ${x[0]}, Nazwisko: ${x[1]}, Numer telefonu: ${x[2]}`;
          break;
        } else if (i === kontakty.length - 1) {
          document.querySelector("#komunikaty").innerHTML =
            "Brak osoby o podanym nazwisku";
        } else {
          i++;
        }
      }
    }

    if (document.querySelector("input[value='usun']").checked) {
      let szukanaOsoba = prompt(`Podaj nazwisko osoby którą chcesz usunąć:`);
      let i = 0;

      pobieranieKT();

      for (let x of kontakty) {
        if (x[1] === szukanaOsoba) {
          document.querySelector(
            "#komunikaty"
          ).innerHTML = `Osoba o nazwisku: ${x[1]} została usunięta`;
          kontakty.splice(kontakty.indexOf(x), 1);
          zapisywanieKT();
          break;
        } else if (i === kontakty.length - 1) {
          document.querySelector("#komunikaty").innerHTML =
            "Brak osoby o podanym nazwisku";
        } else {
          i++;
        }
      }
    }

    if (document.querySelector("input[value='zmien']").checked) {
      let szukanaOsoba = prompt(
        `Podaj nazwisko osoby której kontakt chcesz zmienić:`
      );
      let noweImie = prompt(`Podaj nowe imię:`);
      let noweNazwisko = prompt(`Podaj nowe nazwisko:`);
      let nowyTel = prompt(`Podaj nowy numer telefonu:`);
      let noweDane = [noweImie, noweNazwisko, nowyTel];
      let i = 0;

      pobieranieKT();

      for (let x of kontakty) {
        if (x[1] === szukanaOsoba) {
          document.querySelector(
            "#komunikaty"
          ).innerHTML = `Kontakt został edytowany`;
          kontakty.splice(kontakty.indexOf(x), 1, noweDane);
          zapisywanieKT();
          break;
        } else if (i === kontakty.length - 1) {
          document.querySelector("#komunikaty").innerHTML =
            "Brak osoby o podanym nazwisku";
        } else {
          i++;
        }
      }
    }

    if (document.querySelector("input[value='koniec']").checked) {
      close();
    }
  };
});
