class Produto {
    private id: number;
    private descricao: string;
    private quantidade: number;
    private valorUnitario: number;

    constructor(id: number, descricao: string, quantidade: number, valorUnitario: number) {
        this.id = id;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.valorUnitario = valorUnitario;
    }

    public repor(quantidade: number): void {
        this.quantidade += quantidade;
    }

    public darBaixa(quantidade: number): void {
        if (this.quantidade >= quantidade) {
            this.quantidade -= quantidade;
        } else {
            throw new Error("Quantidade insuficiente em estoque.");
        }
    }

    public getId(): number {
        return this.id;
    }

    public getDescricao(): string {
        return this.descricao;
    }

    public getQuantidade(): number {
        return this.quantidade;
    }

    public getValorUnitario(): number {
        return this.valorUnitario;
    }
}

class ProdutoPerecivel extends Produto {
    private dataValidade: Date;

    constructor(id: number, descricao: string, quantidade: number, valorUnitario: number, dataValidade: Date) {
        super(id, descricao, quantidade, valorUnitario);
        this.dataValidade = dataValidade;
    }

    public isValido(): boolean {
        return this.dataValidade > new Date();
    }

    public override repor(quantidade: number): void {
        if (this.isValido()) {
            super.repor(quantidade);
        } else {
            throw new Error("Produto perecível fora da validade, não pode ser reposto.");
        }
    }

    public override darBaixa(quantidade: number): void {
        if (this.isValido()) {
            super.darBaixa(quantidade);
        } else {
            throw new Error("Produto perecível fora da validade, não pode dar baixa.");
        }
    }

    public getDataValidade(): Date {
        return this.dataValidade;
    }
}

class Estoque {
    private produtos: (Produto | ProdutoPerecivel)[];

    constructor() {
        this.produtos = [];
    }

    public incluir(produto: Produto | ProdutoPerecivel): void {
        if (this.existe(produto.getId(), produto.getDescricao())) {
            throw new Error("Produto com mesmo ID ou descrição já existe.");
        }
        this.produtos.push(produto);
    }

    public consultar(id: number): Produto | ProdutoPerecivel | undefined {
        return this.produtos.find(produto => produto.getId() === id);
    }

    public excluir(id: number): void {
        this.produtos = this.produtos.filter(produto => produto.getId() !== id);
    }

    public repor(id: number, quantidade: number): void {
        const produto = this.consultar(id);
        if (produto) {
            produto.repor(quantidade);
        } else {
            throw new Error("Produto não encontrado.");
        }
    }

    public darBaixa(id: number, quantidade: number): void {
        const produto = this.consultar(id);
        if (produto) {
            produto.darBaixa(quantidade);
        } else {
            throw new Error("Produto não encontrado.");
        }
    }

    public existe(id: number, descricao: string): boolean {
        return this.produtos.some(produto => produto.getId() === id || produto.getDescricao() === descricao);
    }

    public listarPereciveisVencidos(): ProdutoPerecivel[] {
        return this.produtos
            .filter(produto => produto instanceof ProdutoPerecivel && !produto.isValido())
            .map(produto => produto as ProdutoPerecivel);
    }
}

// Exemplo de uso:

const estoque = new Estoque();

const produto1 = new Produto(1, "Arroz", 100, 5.50);
const produtoPerecivel1 = new ProdutoPerecivel(2, "Leite", 50, 4.75, new Date("2024-08-10"));

estoque.incluir(produto1);
estoque.incluir(produtoPerecivel1);

try {
    estoque.repor(2, 10); // Tentativa de repor leite fora da validade
} catch (error) {
    console.error(error.message);
}

const vencidos = estoque.listarPereciveisVencidos();
vencidos.forEach(produto => {
    console.log(`Produto vencido: ${produto.getDescricao()}, Validade: ${produto.getDataValidade()}`);
});