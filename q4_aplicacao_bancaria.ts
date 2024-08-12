class Cliente {
    id : number
    nome : string

    constructor(id : number, nome : string) {
        this.id = id
        this.nome = nome
    }
}

class Conta {
    numero : string
    cliente : Cliente
    private _saldo: number

    constructor(numero : string, saldo : number, cliente: Cliente) {
        this.numero = numero
        this.cliente = cliente
        if (this.validaValor(saldo)) {
            this._saldo = saldo
        } else {
            this._saldo = 0
        }
    }

    sacar(valor: number) {
        if (this._saldo > valor && this.validaValor(valor)) {
            this._saldo = this._saldo - valor
        }
    }

    private validaValor(valor : number): boolean {
        return valor > 0
    }

    depositar(valor : number): void {
        this._saldo = this._saldo + valor
    }

    get saldo(): number {
        return this._saldo
    }

    consultarSaldo(): number {
        return this._saldo
    }

    transferir(contaDestino : Conta, valor : number): void {
        /* 
        this._saldo = this.saldo - valor
        contaDestino.saldo = contaDestino.saldo + valor
        */
       this.sacar(valor)
       contaDestino.depositar(valor)
    }
}

// Agora irei aplicar minha ContaPoupança, herdada de Conta
class Poupanca extends Conta {
    private _taxaDeJuros: number

    constructor(numero: string, saldo : number, cliente : Cliente, taxaDeJuros: number) {
        super(numero, saldo, cliente)  // Minha superclasse herda estes atributos numero, saldo e cliente por critério de Herança.
        this._taxaDeJuros = taxaDeJuros  // Minha subclasse taxaDeJuros fica presente, derivando-se da minha classe Conta Poupança.
    }

    renderJuros(numero : string) : void {
        let conta = this.consultar(numero)
            if (conta instanceof Poupanca) {
                conta.renderJuros()
            }else{
                console.log("A conta informada não é uma conta poupança")
            }
    }
}

class Banco {
    private _contas: Conta[] = [];

    inserir(conta: Conta) {
        this._contas.push(conta);  // Empurra para a última posição como se fosse uma lista em Estrutura de Dados.
    }

    consultar(numero: string): Conta {
        let contaProcurada!: Conta;
        for (let i: number = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                contaProcurada = this._contas[i];
                break;
            }
        }

        return contaProcurada;
    }

    alterar(conta: Conta){
        let contaProcurada: Conta = this.consultar(conta.numero);
        //contaProcurada.saldo = conta.saldo;
        let saldoTemporario = contaProcurada.consultarSaldo();
        contaProcurada.sacar(saldoTemporario);
        contaProcurada.depositar(conta.consultarSaldo());

        contaProcurada.cliente = conta.cliente;        
    }

    alterarPorIndice(conta: Conta) {
        let indice: number = this.consultarPorIndice(conta.numero);
        if (indice != -1) {
            this._contas[indice] = conta;
        }
    }

    private consultarPorIndice(numero: string): number {
        let indiceProcurado: number = -1;
        for (let i: number = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }

        return indiceProcurado;
    }

    excluir(numero: string): void {
        let indice: number = this.consultarPorIndice(numero);
        if (indice!= -1) {
            for (let i: number = indice; i < this._contas.length; i++) {
                this._contas[i] = this._contas[i + 1];
                console.log(this._contas);
            }
            
            this._contas.pop();
            console.log(this._contas);
        }
    }    

    sacar(numero: string, valor: number): void {
        let conta: Conta = this.consultar(numero);
        if (conta != null) {
            conta.sacar(valor);
        }
    }

    depositar(numero: string, valor: number): void {
        let conta: Conta = this.consultar(numero);
        if (conta!= null) {
            conta.depositar(valor);
        }
    }

    transferir(numero: string, numeroContaDestino: string, valor: number): void {
        let contaOrigem: Conta = this.consultar(numero);
        let contaDestino: Conta = this.consultar(numeroContaDestino);
        
        if (contaOrigem != null && contaDestino != null) {
            contaOrigem.transferir(contaDestino, valor);
        }
    }

    consultarSaldo(numero: string): number {
        let conta: Conta = this.consultar(numero);
        return conta.consultarSaldo();
    }
}

let c1: Conta = new Conta("111-1", 1000, new Cliente(1, "Ely"));
let p1: Poupanca = new Poupanca("222-2", 1000, new Cliente(2, "João"), 0.05);
c1.transferir(p1, 100);
p1.renderJuros();
console.log(c1.saldo);
console.log(p1.saldo);

let banco: Banco = new Banco();
banco.inserir(c1);
banco.inserir(p1);

console.log(banco.consultar("222-2").cliente.nome);

banco.renderJuros("222-1")  // Deve render Juros pois é uma poupança.
banco.renderJuros("111-1")  // Não deve fazer nada, pois não é uma poupança.

// Fim de mais uma etapa.

// Agora irei adaptar para Conta Imposto
class ContaImposto extends Conta {
    private _taxaDeDesconto: number

    constructor(numero : string, saldo : number, cliente: Cliente, taxaDeDesconto: number) {
        super(numero, saldo, cliente)
        this._taxaDeDesconto = taxaDeDesconto
    }

    sacar(valor : number): void {
        const valorComDesconto = valor + valor * this._taxaDeDesconto
        super.sacar(valorComDesconto)
    }
}

// Agora irei alterar a aplicação para permitir o cadastro de ContaImposto
let c1: Conta = new Conta("111-1", 1000, new Cliente(1, "Ely"))
let p1 : Poupanca = new Poupanca("222-2", 1000, new Cliente(2, "João"), 0.05)
let c2: ContaImposto= new ContaImposto("333-3", 2000, new Cliente(3, "Maria"), 0.03)

banco.inserir(c1)
banco.inserir(p1)
banco.inserir(c2)

/*Agora, para a respectiva leitura e escrita de arquivo, instalar a biblioteca 'fs': File System, para uso da
aplicação bancária */









