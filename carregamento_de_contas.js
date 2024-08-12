"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Banco = /** @class */ (function () {
    function Banco() {
        this._contas = [];
    }
    Banco.prototype.inserir = function (conta) {
        this._contas.push(conta); // Empurra para a última posição como se fosse uma lista em Estrutura de Dados.
    };
    Banco.prototype.consultar = function (numero) {
        var contaProcurada;
        for (var i = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                contaProcurada = this._contas[i];
                break;
            }
        }
        return contaProcurada;
    };
    Banco.prototype.alterar = function (conta) {
        var contaProcurada = this.consultar(conta.numero);
        //contaProcurada.saldo = conta.saldo;
        var saldoTemporario = contaProcurada.consultarSaldo();
        contaProcurada.sacar(saldoTemporario);
        contaProcurada.depositar(conta.consultarSaldo());
        contaProcurada.cliente = conta.cliente;
    };
    Banco.prototype.alterarPorIndice = function (conta) {
        var indice = this.consultarPorIndice(conta.numero);
        if (indice != -1) {
            this._contas[indice] = conta;
        }
    };
    Banco.prototype.consultarPorIndice = function (numero) {
        var indiceProcurado = -1;
        for (var i = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }
        return indiceProcurado;
    };
    Banco.prototype.excluir = function (numero) {
        var indice = this.consultarPorIndice(numero);
        if (indice != -1) {
            for (var i = indice; i < this._contas.length; i++) {
                this._contas[i] = this._contas[i + 1];
                console.log(this._contas);
            }
            this._contas.pop();
            console.log(this._contas);
        }
    };
    Banco.prototype.sacar = function (numero, valor) {
        var conta = this.consultar(numero);
        if (conta != null) {
            conta.sacar(valor);
        }
    };
    Banco.prototype.depositar = function (numero, valor) {
        var conta = this.consultar(numero);
        if (conta != null) {
            conta.depositar(valor);
        }
    };
    Banco.prototype.transferir = function (numero, numeroContaDestino, valor) {
        var contaOrigem = this.consultar(numero);
        var contaDestino = this.consultar(numeroContaDestino);
        if (contaOrigem != null && contaDestino != null) {
            contaOrigem.transferir(contaDestino, valor);
        }
    };
    Banco.prototype.consultarSaldo = function (numero) {
        var conta = this.consultar(numero);
        return conta.consultarSaldo();
    };
    return Banco;
}());
var c1 = new Conta("111-1", 1000, new Cliente(1, "Ely"));
var p1 = new Poupanca("222-2", 1000, new Cliente(2, "João"), 0.05);
c1.transferir(p1, 100);
p1.renderJuros();
console.log(c1.saldo);
console.log(p1.saldo);
var banco = new Banco();
banco.inserir(c1);
banco.inserir(p1);
console.log(banco.consultar("222-2").cliente.nome);
banco.renderJuros("222-1"); // Deve render Juros pois é uma poupança.
banco.renderJuros("111-1"); // Não deve fazer nada, pois não é uma poupança.
// Fim de mais uma etapa.
// Agora irei adaptar para Conta Imposto
var ContaImposto = /** @class */ (function (_super) {
    __extends(ContaImposto, _super);
    function ContaImposto(numero, saldo, cliente, taxaDeDesconto) {
        var _this = _super.call(this, numero, saldo, cliente) || this;
        _this._taxaDeDesconto = taxaDeDesconto;
        return _this;
    }
    ContaImposto.prototype.sacar = function (valor) {
        var valorComDesconto = valor + valor * this._taxaDeDesconto;
        _super.prototype.sacar.call(this, valorComDesconto);
    };
    return ContaImposto;
}(Conta));
// Agora irei alterar a aplicação para permitir o cadastro de ContaImposto
var c1 = new Conta("111-1", 1000, new Cliente(1, "Ely"));
var p1 = new Poupanca("222-2", 1000, new Cliente(2, "João"), 0.05);
var c2 = new ContaImposto("333-3", 2000, new Cliente(3, "Maria"), 0.03);
banco.inserir(c1);
banco.inserir(p1);
banco.inserir(c2);
/*Agora, para a respectiva leitura e escrita de arquivo, instalar a biblioteca 'fs': File System, para uso da
aplicação bancária. */
carregarContas(nomeArquivo, string);
void {
    const: dados = fs.readFileSync(nomeArquivo, 'utf-8'),
    const: linhas = dados.split('\n'),
    for: function (let, linha, of, linhas) {
        var campos = linha.split(';');
        var numero = campos[0].trim();
        var saldo = parseFloat(campos[1].trim());
        var tipo = campos[2].trim();
        if (tipo === "C") {
            this.inserir(new Conta(numero, saldo, new Cliente(0, "")));
        }
        else if (tipo === "CP") {
            var taxaDeJuros = parseFloat(campos[3].trim());
            this.inserir(new Poupanca(numero, saldo, new Cliente(0, ""), taxaDeJuros));
        }
        else if (tipo === "CI") {
            var taxaDeDesconto = parseFloat(campos[3].trim());
            this.inserir(new ContaImposto(numero, saldo, new Cliente(0, ""), taxaDeDesconto));
        }
    },
    salvarContas: function (nomeArquivo) {
        var linhas = [];
        for (var _i = 0, _a = this._contas; _i < _a.length; _i++) {
            var conta = _a[_i];
            var linha = void 0;
            if (conta instanceof Poupanca) {
                linha = "".concat(conta.numero, "; ").concat(conta.consultarSaldo, "; CP; ").concat(conta['_taxaDeJuros']);
            }
            else if (conta instanceof ContaImposto) {
                linha = "".concat(conta.numero, "; ").concat(conta.consultarSaldo, "; CI; ").concat(conta['_taxaDeDesconto']);
            }
            else {
                linha = "".concat(conta.numero, "; ").concat(conta.consultarSaldo(), "; C");
            }
            linhas.push(linha);
        }
        fs.writeFileSync(nomeArquivo, linhas.join('\n'));
    }
};
// Implementação da função de menu à meu Banco
// Exemplo de menu simplificado
var opcao = "";
do {
    console.log("\n1: Cadastrar Conta");
    console.log("2: Cadastrar Poupança");
    console.log("3: Cadastrar Conta Imposto");
    console.log("4: Render Juros");
    console.log("5: Carregar Contas de Arquivo");
    console.log("6: Salvar Contas em Arquivo");
    console.log("0: Sair");
    opcao = prompt("Escolha uma opção: ");
    switch (opcao) {
        case "1":
            // Lógica de cadastro de Conta
            break;
        case "2":
            // Lógica de cadastro de Poupança
            break;
        case "3":
            // Lógica de cadastro de Conta Imposto
            break;
        case "4":
            var numeroConta = prompt("Informe o número da conta para render juros: ");
            banco.renderJuros(numeroConta);
            break;
        case "5":
            banco.carregarContas("contas.txt");
            break;
        case "6":
            banco.salvarContas("contas.txt");
            break;
        case "0":
            console.log("Saindo...");
            break;
        default:
            console.log("Opção inválida.");
            break;
    }
} while (opcao !== "0");
/* Com isso, minha aplicação terá todas as funcionalidades pedidas, incluindo a leitura e escrita de arquivos,
cadastro de contas, e a opção de render juros em contas poupança. */
// Fim do meu sistema, encerrado com sucesso!
