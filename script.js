//localStorage.setItem("miGato", "Juan");
//let cat = localStorage.getItem("miGato");
//console.log(cat)
let notas = JSON.parse(localStorage.getItem("notasTotales")) || [
  {
    titulo: "Algo",
    cuerpo: "esto es una nota",
    id: 1,
  },
];
let container_notas = document.querySelector(".notas-container");
function agregarLocalStorage(lista) {
  localStorage.setItem("notasTotales", lista);
}
function borrarLocalStorage() {
  localStorage.removeItem("notasTotales");
}

function impresion_notas() {
  container_notas.innerHTML = "";
  notas.map((nota) => {
    container_notas.innerHTML += `
    <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${nota.titulo}</h5>
    <p class="card-text">${nota.cuerpo}</p>
    <button type="submit" class="btn btn-secondary" data-id =${nota.id}>Editar</button>
    <button type="submit" class="btn btn-danger" data-id =${nota.id}>Eliminar</button>


    
  </div>
</div>
    `;
  });
}
impresion_notas();

let titulo_ingresado = document.getElementById("titulo");
let cuerpo_ingresado = document.getElementById("cuerpo");
let titulo_error = document.getElementById("titulo-error");
let cuerpo_error = document.getElementById("cuerpo-error");
let confirmacion = document.getElementById("confirm");
let boton = document.getElementById("boton");
let notaEnEdicion = null

boton.addEventListener("click", (e) => {
  e.preventDefault();
  const nuevoId =
    notas.length > 0 ? Math.max(...notas.map((t) => t.id)) + 1 : 1;
  if (titulo_ingresado.value.trim() == "") {
    titulo_error.style.display = "block";
  } else {
    titulo_error.style.display = "none";
  }

  if (cuerpo_ingresado.value.trim() == "") {
    cuerpo_error.style.display = "block";
  } else {
    cuerpo_error.style.display = "none";
  }
  if  (
    titulo_ingresado.value.trim() !== "" &&
    cuerpo_ingresado.value.trim() !== ""
  ){    confirmacion.style.display = "block";


  }
  
  if (notaEnEdicion){
    notaEnEdicion.titulo = titulo_ingresado.value;
      notaEnEdicion.cuerpo = cuerpo_ingresado.value;
      notaEnEdicion = null; 
    } else {
      notas.push({
        titulo: titulo_ingresado.value,
        cuerpo: cuerpo_ingresado.value,
        id: nuevoId,
      });
  }
  
  impresion_notas();
  agregarLocalStorage(JSON.stringify(notas));
  titulo_ingresado.value = "";
  cuerpo_ingresado.value = "";
  confirmacion.style.display = "none";
});



container_notas.addEventListener("click", (e) => {
  let boton = e.target.closest(".btn-danger");
  if (boton) {
    let botonId = boton.dataset.id;
    let notaEliminada = notas.find((nota) => nota.id == botonId);
    let nueva_lista = eliminarNota(notaEliminada);
    localStorage.removeItem("notasTotales");
    notas = nueva_lista;
    agregarLocalStorage(JSON.stringify(notas));
    impresion_notas();
  }
});

container_notas.addEventListener("click", (e) => {
  let botonEditar = e.target.closest(".btn-secondary");
  if (botonEditar) {
    let botonId = botonEditar.dataset.id;
    let notaEditada = notas.find((nota) => nota.id == botonId);
    console.log(notaEditada);
    titulo_ingresado.value = notaEditada.titulo
    cuerpo_ingresado.value = notaEditada.cuerpo
    notaEnEdicion = notaEditada

  }
});

function eliminarNota(nota) {
  nueva_lista = [];
  for (let index = 0; index < notas.length; index++) {
    if (notas[index] != nota) {
      nueva_lista.push(notas[index]);
    }
  }
  return nueva_lista;
}
