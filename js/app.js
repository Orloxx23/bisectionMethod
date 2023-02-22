const table = document.querySelector("#result-table tbody");
const tol = 1e-6;
const toast = document.getElementById("toast");
let mensajeState = false;
let tablaState = false;
const form = document.getElementById("content");

function encontrarRaiz() {
  // Obtener la función a evaluar y los extremos del intervalo ingresados por el usuario
  let funcion = document.getElementById("funcion-input").value;
  let a = Number(document.getElementById("a-input").value);
  let b = Number(document.getElementById("b-input").value);
  let maxIteraciones = Number(document.getElementById("max-iteraciones").value);

  if (a > b) {
    mostrarMensaje("El intervalo es incorrecto.", "error");
    return;
  }

  // Validar la entrada del usuario
  let expresionRegular = /^[-+*\/\s\d()xX^.]+$/; // Permitir solo los caracteres válidos
  if (!expresionRegular.test(funcion)) {
    mostrarMensaje("La función ingresada es inválida.", "error");
    return;
  }

  limpiarTabla();
  form.classList.add("acortar");

  // Reemplazar e por el valor numérico de Euler
  funcion = funcion.replace(/e/gi, Math.E);

  // Reemplazar (x) o x( por *x y )x por x*
  funcion = funcion.replace(/\(x\)|x\(/gi, "*x");
  funcion = funcion.replace(/\)x/gi, "x*");

  // Reemplazar -( por -1*(
  funcion = funcion.replace(/-\(/g, "-1*(");

  // Reemplazar x por *x para que la función sea válida
  funcion = funcion.replace(/(?<![+\-*/^xX\s])x/g, "*x");

  // Reemplazar ^ por ** para que la función sea válida
  const newFuncion = convertirPotencia(funcion);

  // Evaluar la función utilizando eval()
  let f = (x) => eval(newFuncion.replace(/x/gi, `(${x})`)); // Reemplazar x por el valor de x y evaluar la función

  let resultado = bisectionMethod(f, a, b, tol, maxIteraciones);

  mostrarMensaje(
    "La raíz es: " +
      resultado.toFixed(6) +
      " después de " +
      maxIteraciones +
      " iteraciones."
  );
}

function mostrarMensaje(mensaje, type = "normal") {
  let toast = document.getElementById("toast");
  document.getElementById("resultado").textContent = mensaje;

  if (mensajeState) return;

  toast.classList.toggle("resultado__container-show");
  mensajeState = true;

  if (type === "error") {
    toast.classList.add("resultado__container-error");
    setTimeout(() => {
      toast.classList.remove("resultado__container-show");
      mensajeState = false;
      toast.classList.remove("resultado__container-error");
    }, 5000);
  }
}

function esconderMensaje() {
  if (!mensajeState) return;
  mensajeState = false;
  let toast = document.getElementById("toast");
  toast.classList.remove("resultado__container-show");
  toast.classList.remove("resultado__container-error");
}

function mostrarTabla() {
  tablaState = true;
  const table = document.getElementById("table-container");
  if (tablaState) {
    table.classList.remove("hide");
  } else {
    table.classList.add("hide");
  }
}

function limpiarTabla() {
  table.innerHTML = "";
}

function agregarFila(contadorIteraciones, a, b, c, fc, error, errort) {
  const row = table.insertRow();
  row.insertCell().textContent = contadorIteraciones;
  row.insertCell().textContent = a;
  row.insertCell().textContent = b;
  row.insertCell().textContent = c;
  row.insertCell().textContent = fc;
  row.insertCell().textContent = `${error} ${
    error === "" ? "" : "(" + (error * 100).toFixed(2) + "%)"
  }`;
  row.insertCell().textContent = `${errort} ${
    errort === "" ? "" : "(" + (errort * 100).toFixed(2) + "%)"
  }`;
}

function convertirPotencia(str) {
  return str.replace(/\^/g, "**");
}
