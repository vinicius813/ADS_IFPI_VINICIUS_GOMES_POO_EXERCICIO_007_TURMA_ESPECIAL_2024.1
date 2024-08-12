var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Calculadora = /** @class */ (function () {
    // Constructor que inicializa os atributos
    function Calculadora(operando_1, operando_2) {
        this.operando_1 = operando_1;
        this.operando_2 = operando_2;
    }
    // Método que retorna a soma dos dis atributos
    Calculadora.prototype.somar = function () {
        return this.operando_1 + this.operando_2;
    };
    // Método que exibe  resultado da soma
    Calculadora.prototype.mostrarResultado = function () {
        var resultado = this.somar();
        console.log("A soma de ".concat(this.operando_1, " e ").concat(this.operando_2, " \u00E9 ").concat(resultado, "."));
    };
    return Calculadora;
}());
// Agora eu irei criar uma classe Calculadora Científica, herdada da classe Calculadora. Isto é, classe derivada CalculadoraCientífica
var CalculadoraCientifica = /** @class */ (function (_super) {
    __extends(CalculadoraCientifica, _super);
    function CalculadoraCientifica() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Irei criar um método exponenciar que retornará o priemeiro elemento elevado ao segundo
    CalculadoraCientifica.prototype.exponenciar = function () {
        return Math.pow(this.operando_1, this.operando_2);
    };
    return CalculadoraCientifica;
}(Calculadora));
// Testando minha classe CalculadoraCientifica
var calculadoracientifica = new CalculadoraCientifica(2, 3);
calculadoracientifica.mostrarResultado(); // Resultdo esperado será a soma de 2 e 3 que dará 5.
console.log("O n\u00FAmero 2 elevado a 3 \u00E9 ".concat(calculadoracientifica.exponenciar(), "."));
// Saída esperada será: 2 elevado a 3 que é 8.
// Fim da questão.
/* A pergunta da letra c é respondida levando em consideração que o teste da classe
cria uma instância de Calculadora Científica, exibe-se a soma dos operandos 1 e 2 e
o resultado da exponenciação em seguida.

Sim, foi necessária a modificação! Foi necessário também modificar os atributos operando_1 e
operando_2 na classe Calculadora de private para protected para assim permitir que a classe
Calculadora Científica pudesse acessá-los diretamente. Essa mudança é comum ao se implementar
a herança, onde classes derivadas precisam manipular diretamente os atributos da classe base. */
