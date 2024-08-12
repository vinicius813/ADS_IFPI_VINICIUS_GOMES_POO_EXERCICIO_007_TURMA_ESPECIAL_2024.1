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
var Cliente = /** @class */ (function () {
    function Cliente(id, nome) {
        this.id = id;
        this.nome = nome;
    }
    return Cliente;
}());
var Conta = /** @class */ (function () {
    function Conta(numero, saldo, cliente) {
        this.numero = numero;
        this.cliente = cliente;
        if (this.validaValor(saldo)) {
            this._saldo = saldo;
        }
        else {
            this._saldo = 0;
        }
    }
    Conta.prototype.sacar = function (valor) {
        if (this._saldo > valor && this.validaValor(valor)) {
            this._saldo = this._saldo - valor;
        }
    };
    Conta.prototype.validaValor = function (valor) {
        return valor > 0;
    };
    Conta.prototype.depositar = function (valor) {
        this._saldo = this._saldo + valor;
    };
    Object.defineProperty(Conta.prototype, "saldo", {
        get: function () {
            return this._saldo;
        },
        enumerable: false,
        configurable: true
    });
    Conta.prototype.consultarSaldo = function () {
        return this._saldo;
    };
    Conta.prototype.transferir = function (contaDestino, valor) {
        /*
        this._saldo = this.saldo - valor
        contaDestino.saldo = contaDestino.saldo + valor
        */
        this.sacar(valor);
        contaDestino.depositar(valor);
    };
    return Conta;
}());
// Agora irei aplicar minha ContaPoupança, herdada de Conta
var Poupanca = /** @class */ (function (_super) {
    __extends(Poupanca, _super);
    function Poupanca(numero, saldo, cliente, taxaDeJuros) {
        var _this = _super.call(this, numero, saldo, cliente) || this; // Minha superclasse herda estes atributos numero, saldo e cliente por critério de Herança.
        _this._taxaDeJuros = taxaDeJuros; // Minha subclasse taxaDeJuros fica presente, derivando-se da minha classe Conta Poupança.
        return _this;
    }
    Poupanca.prototype.renderJuros = function (numero) {
        var conta = this.consultar(numero);
        if (conta instanceof Poupanca) {
            conta.renderJuros();
        }
        else {
            console.log("A conta informada não é uma conta poupança");
        }
    };
    return Poupanca;
}(Conta));
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
aplicação bancária */
