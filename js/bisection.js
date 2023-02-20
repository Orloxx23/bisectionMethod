function bisectionMethod(func, a, b, tol, maxIteraciones = 1000) {
  let fa = func(a);
  let fb = func(b);

  if (fa * fb >= 0) {
    throw new Error("La función no cambia de signo en el intervalo dado.");
  }

  let c = (a + b) / 2;
  let fc = func(c);

  let contadorIteraciones = 0;
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
    
    contadorIteraciones++;
  }

  return c;
}