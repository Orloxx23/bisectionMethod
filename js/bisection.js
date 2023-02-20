const table = document.querySelector("#result-table tbody");

function bisectionMethod(func, a, b, tol, maxIteraciones = 1000) {
  // Limpiar la tabla antes de agregar las nuevas filas
  limpiarTabla();

  let fa = func(a);
  let fb = func(b);

  if (fa * fb >= 0) {
    mostrarMensaje(
      "La función no cambia de signo en el intervalo dado.",
      "error"
    );
    return;
    // throw new Error("La función no cambia de signo en el intervalo dado.");
  }

  mostrarTabla();

  let c = (a + b) / 2;
  let fc = func(c);

  let contadorIteraciones = 0;

  const row = table.insertRow();
  row.insertCell().textContent = contadorIteraciones;
  row.insertCell().textContent = a;
  row.insertCell().textContent = b;
  row.insertCell().textContent = c;
  row.insertCell().textContent = fc;
  row.insertCell().textContent = (b - a) / 2;

  while (Math.abs(fc) > tol && contadorIteraciones < maxIteraciones) {
    if (fc * fa < 0) {
      b = c;
      fb = fc;
    } else {
      a = c;
      fa = fc;
    }

    c = (a + b) / 2;
    fc = func(c);
    const error = (b - a) / 2;

    const row = table.insertRow();
    row.insertCell().textContent = contadorIteraciones + 1;
    row.insertCell().textContent = a;
    row.insertCell().textContent = b;
    row.insertCell().textContent = c;
    row.insertCell().textContent = fc;
    row.insertCell().textContent = error;

    contadorIteraciones++;
  }

  return c;
}
