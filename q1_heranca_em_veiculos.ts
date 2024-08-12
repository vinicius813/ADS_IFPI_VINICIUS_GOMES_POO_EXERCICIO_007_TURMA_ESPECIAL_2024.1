// Classe de base Veículo
class Veiculo {
    placa : string;
    ano : number;

    constructor(placa : string, ano : number) {
        this.placa = placa;
        this.ano = ano;
    }
}

// Agora eu crio uma classe derivada de Veículo, chamada Carro
class Carro extends Veiculo {
    modelo : string;

    constructor(placa : string, ano : number, modelo : string) { // Uma superclasse herda de uma subclasse
        super(placa, ano);  // Chamando atenção para a minha subclasse modelo.
        this.modelo = modelo;
    }
}

// Então, minha classe Carro derivará para Carro Elétrico
class CarroEletrico extends Carro {
    autonomia_de_bateria : number;

    constructor(placa : string, ano : number, modelo : string, autonomia_de_bateria : number) {  // Uma superclasse herdará de uma subclasse
        super(placa, ano, modelo)  // Chamando atenção para a minha subclasse autonomia de bateria
        this.autonomia_de_bateria = autonomia_de_bateria;
    }
}

// Exemplos de uso
const veiculo = new Veiculo("RFI-3465", 2022);
const carro = new Carro("XYZ-2301", 2020, "Hyundai");
const carroEletrico = new CarroEletrico("QAS-8714", 2024, "Toyota", 2400);

// Teste
console.log(veiculo)
console.log(carro);
console.log(carroEletrico);

// Fim.

