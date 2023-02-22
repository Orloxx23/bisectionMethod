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
  let cAnterior = c;
  let fc = func(c);

  let contadorIteraciones = 0;

  agregarFila(contadorIteraciones, a, b, c, fc, "", "");

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
    // const error = (b - a) / 2;
    const errorAproximado = Math.abs((c - cAnterior) / c);
    console.log(errorAproximado);
    const errorVerdadero = Math.abs(errorAproximado / c);
    console.log(errorVerdadero);

    agregarFila(contadorIteraciones + 1, a, b, c, fc, errorAproximado, errorVerdadero)

    cAnterior = c;
    contadorIteraciones++;
  }

  return c;
}
