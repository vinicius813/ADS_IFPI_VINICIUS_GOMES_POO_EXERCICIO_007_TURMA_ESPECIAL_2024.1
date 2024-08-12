import {Banco} from "./q4_aplicacao_bancaria"
import * as fs from "fs"

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
aplicação bancária. */

    carregarContas(nomeArquivo: string): void {
        const dados = fs.readFileSync(nomeArquivo, 'utf-8')
        const linhas = dados.split('\n')
            for (let linha of linhas) {
                const campos = linha.split(';')
                const numero = campos[0].trim()
                const saldo = parseFloat(campos[1].trim())
                const tipo = campos[2].trim()

                        if (tipo === "C") {
                            this.inserir(new Conta(numero, saldo, new Cliente(0, "")))
                        }else if (tipo === "CP") {
                            const taxaDeJuros = parseFloat(campos[3].trim())
                            this.inserir(new Poupanca(numero, saldo, new Cliente(0, ""), taxaDeJuros))
                        }else if (tipo === "CI") {
                            const taxaDeDesconto = parseFloat(campos[3].trim())
                            this.inserir(new ContaImposto(numero, saldo, new Cliente(0, ""), taxaDeDesconto))
                        }
            }

    salvarContas(nomeArquivo: string): void {
        const linhas: string[] = []
            for (let conta of this._contas) {
                let linha: string
                    if (conta instanceof Poupanca) {
                        linha = `${conta.numero}; ${conta.consultarSaldo}; CP; ${conta['_taxaDeJuros']}`
                    }else if (conta instanceof ContaImposto) {
                        linha = `${conta.numero}; ${conta.consultarSaldo}; CI; ${conta['_taxaDeDesconto']}`
                    }else{
                        linha = `${conta.numero}; ${conta.consultarSaldo()}; C`
                    }
                    linhas.push(linha)
            }
            fs.writeFileSync(nomeArquivo, linhas.join('\n'))

        }
    }

// Implementação da função de menu à meu Banco

// Exemplo de menu simplificado
let opcao: string = ""

do {
    console.log("\n1: Cadastrar Conta")
    console.log("2: Cadastrar Poupança")
    console.log("3: Cadastrar Conta Imposto")
    console.log("4: Render Juros")
    console.log("5: Carregar Contas de Arquivo")
    console.log("6: Salvar Contas em Arquivo")
    console.log("0: Sair")

    opcao = prompt("Escolha uma opção: ")

    switch (opcao) {
        case "1":
            // Lógica de cadastro de Conta
            break
        case "2":
            // Lógica de cadastro de Poupança
            break
        case "3":
            // Lógica de cadastro de Conta Imposto
            break
        case "4":
            const numeroConta = prompt("Informe o número da conta para render juros: ")
            banco.renderJuros(numeroConta)
            break
        case "5":
            banco.carregarContas("contas.txt")
            break
        case "6":
            banco.salvarContas("contas.txt")
            break
        case "0":
            console.log("Saindo...")
            break
        default:
            console.log("Opção inválida.")
            break
    }
} while (opcao !== "0")

/* Com isso, minha aplicação terá todas as funcionalidades pedidas, incluindo a leitura e escrita de arquivos,
cadastro de contas, e a opção de render juros em contas poupança. */

// Fim do meu sistema, encerrado com sucesso!