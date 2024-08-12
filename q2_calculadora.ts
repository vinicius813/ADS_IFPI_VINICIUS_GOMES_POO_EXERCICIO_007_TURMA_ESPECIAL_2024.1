class Calculadora {
    // Atributos privados
    private operando_1 : number;
    private operando_2 : number;

    constructor(operando_1 : number, operando_2 : number) {
        this.operando_1 = operando_1;
        this.operando_2 = operando_2;
    }

// Método que retorna a soma dos dois atributos
        public somar(): number {
            return this.operando_1 + this.operando_2;
        }
}

// Teste da classe Calculadora
const calc = new Calculadora(10, 20);
console.log(calc.somar());

const calc_2 = new Calculadora(15, 25);
console.log(calc_2.somar());

