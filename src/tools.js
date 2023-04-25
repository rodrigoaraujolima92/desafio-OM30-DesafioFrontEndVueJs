export const validar_cns = function (cns) {
  const validaTamanho = cns.length == 15;
  const validaInicio = ["1", "2", "7", "8", "9"].includes(cns[0]);

  if (validaTamanho && validaInicio) {
    //CNS Iniciados em 7, 8 ou 9
    if (["7", "8", "9"].includes(cns[0])) {
      let soma = cns
        .split("")
        .reduce((total, value, index) => total + value * (15 - index), 0);
      return soma % 11 == 0;
    } else {
      //CNS Iniciados em 1, 2
      let pis = cns.substring(0, 11);
      let soma = pis
        .split("")
        .reduce((total, value, index) => total + value * (15 - index), 0);

      let resto = soma % 11;
      let dv = resto == 0 ? 0 : 11 - resto;

      let resultado =
        dv == 10 ? `${pis}001${11 - ((soma + 2) % 11)}` : `${pis}000${dv}`;
      return resultado == cns;
    }
  }

  return false;
};
