var Calculadora = /** @class */ (function () {
    function Calculadora(operando_1, operando_2) {
        this.operando_1 = operando_1;
        this.operando_2 = operando_2;
    }
    // Método que retorna a soma dos dois atributos
    Calculadora.prototype.somar = function () {
        return this.operando_1 + this.operando_2;
    };
    return Calculadora;
}());
// Teste da classe Calculadora
var calc = new Calculadora(10, 20);
console.log(calc.somar());
var calc_2 = new Calculadora(15, 25);
console.log(calc_2.somar());
