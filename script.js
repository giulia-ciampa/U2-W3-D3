//recuperiamo i libri da un API con il metodo fetch() in una funzione
//che viene lanciata al caricamento della pagina
const getBook = function () {
  //nella funzione uso il metodo fetch() per instaurare una HTTP REQUEST
  // fetch() TORNA UNA PROMISE! con al suo interno la HTTP RESPONSE
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      //then ha il parametro response
      console.log("RESPONSE", response);
      // qui definisco il finale POSITIVO della Promise

      if (response.ok) {
        //// quello che però questo oggetto response NON contiene è il JSON della risposta
        //estrazione del JSON da questa response si può fare comodamente con un metodo
        return response.json(); //Il problema è questo metodo A SUA VOLTA è asincrono e torna una Promise
      } else {
        // qui dentro ci finireste se siete riusciti a contattare il server ma non avete ottenuto una risposta ok
        // qui dovremmo gestire l'errore!
        throw new Error("Risposta ricevuta, ma errore!", response.status);
      }
    })

    .then((data) => {
      console.log("LIBRI", data);
      const row = document.getElementById("books-container");

      for (let i = 0; i < data.length; i++) {
        const book = data[i];
        const formattedTitle = book.title.replace(" (", "<br>(");
        row.innerHTML += `<div class="col-12 col-md-6 col-lg-3">
      <div class="card h-100 text-warning-emphasis border-0">
            <div class="card-body d-flex flex-column p-0">
           <img src="${book.img}" 
          alt="cover" 
          class="card-img-top rounded-top" 
  style="width: 100%; aspect-ratio: 3 / 4;">
              <h5 class="card-title mt-3 fs-5 flex-grow-1 d-flex align-items-center justify-content-center text-center">${formattedTitle}</h5>
              <p class="card-text text-end mt-auto pe-2 pb-2">
            ${book.price}&euro;
              </p>
            </div>
          </div>
        </div>`;
      }
    })

    .catch((error) => {
      console.log("ERRORE", error);
    });
  //// qui definisco il finale NEGATIVO della Promise
  // qui finisco se la Promise è REJECTED
  // qui finite quando la vostra Promise NON RIESCE A CONTATTARE IL SERVER
};

getBook();
