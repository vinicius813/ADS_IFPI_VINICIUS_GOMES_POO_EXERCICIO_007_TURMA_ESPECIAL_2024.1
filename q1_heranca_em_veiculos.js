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
// Classe de base Veículo
var Veiculo = /** @class */ (function () {
    function Veiculo(placa, ano) {
        this.placa = placa;
        this.ano = ano;
    }
    return Veiculo;
}());
// Agora eu crio uma classe derivada de Veículo, chamada Carro
var Carro = /** @class */ (function (_super) {
    __extends(Carro, _super);
    function Carro(placa, ano, modelo) {
        var _this = _super.call(this, placa, ano) || this; // Chamando atenção para a minha subclasse modelo.
        _this.modelo = modelo;
        return _this;
    }
    return Carro;
}(Veiculo));
// Então, minha classe Carro derivará para Carro Elétrico
var CarroEletrico = /** @class */ (function (_super) {
    __extends(CarroEletrico, _super);
    function CarroEletrico(placa, ano, modelo, autonomia_de_bateria) {
        var _this = _super.call(this, placa, ano, modelo) || this; // Chamando atenção para a minha subclasse autonomia de bateria
        _this.autonomia_de_bateria = autonomia_de_bateria;
        return _this;
    }
    return CarroEletrico;
}(Carro));
// Exemplos de uso
var veiculo = new Veiculo("RFI-3465", 2022);
var carro = new Carro("XYZ-2301", 2020, "Hyundai");
var carroEletrico = new CarroEletrico("QAS-8714", 2024, "Toyota", 2400);
// Teste
console.log(veiculo);
console.log(carro);
console.log(carroEletrico);
// Fim.
