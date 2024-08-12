class Calculadora {
    // Atributos protegidos para acesso em classes derivadas
    protected operando_1 : number;
    protected operando_2 : number;

    // Constructor que inicializa os atributos
    constructor(operando_1 : number, operando_2 : number) {
        this.operando_1 = operando_1;
        this.operando_2 = operando_2;
    }

    // Método que retorna a soma dos dis atributos
    public somar(): number {
        return this.operando_1 + this.operando_2;
    }

    // Método que exibe  resultado da soma
    public mostrarResultado(): void {
        const resultado = this.somar();
        console.log(`A soma de ${this.operando_1} e ${this.operando_2} é ${resultado}.`);
    }
}

// Agora eu irei criar uma classe Calculadora Científica, herdada da classe Calculadora. Isto é, classe derivada CalculadoraCientífica

class CalculadoraCientifica extends Calculadora {
    // Irei criar um método exponenciar que retornará o priemeiro elemento elevado ao segundo
        public exponenciar(): number {
                return Math.pow(this.operando_1, this.operando_2);
        }
}

// Testando minha classe CalculadoraCientifica
const calculadoracientifica = new CalculadoraCientifica(2, 3);
calculadoracientifica.mostrarResultado();  // Resultdo esperado será a soma de 2 e 3 que dará 5.
console.log(`O número 2 elevado a 3 é ${calculadoracientifica.exponenciar()}.`)
      // Saída esperada será: 2 elevado a 3 que é 8.

// Fim da questão.

/* A pergunta da letra c é respondida levando em consideração que o teste da classe
cria uma instância de Calculadora Científica, exibe-se a soma dos operandos 1 e 2 e 
o resultado da exponenciação em seguida.

Sim, foi necessária a modificação! Foi necessário também modificar os atributos operando_1 e
operando_2 na classe Calculadora de private para protected para assim permitir que a classe 
Calculadora Científica pudesse acessá-los diretamente. Essa mudança é comum ao se implementar
a herança, onde classes derivadas precisam manipular diretamente os atributos da classe base. */


