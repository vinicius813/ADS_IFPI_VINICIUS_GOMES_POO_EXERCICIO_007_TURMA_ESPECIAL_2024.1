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
var Produto = /** @class */ (function () {
    function Produto(id, descricao, quantidade, valorUnitario) {
        this.id = id;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.valorUnitario = valorUnitario;
    }
    Produto.prototype.repor = function (quantidade) {
        this.quantidade += quantidade;
    };
    Produto.prototype.darBaixa = function (quantidade) {
        if (this.quantidade >= quantidade) {
            this.quantidade -= quantidade;
        }
        else {
            throw new Error("Quantidade insuficiente em estoque.");
        }
    };
    Produto.prototype.getId = function () {
        return this.id;
    };
    Produto.prototype.getDescricao = function () {
        return this.descricao;
    };
    Produto.prototype.getQuantidade = function () {
        return this.quantidade;
    };
    Produto.prototype.getValorUnitario = function () {
        return this.valorUnitario;
    };
    return Produto;
}());
var ProdutoPerecivel = /** @class */ (function (_super) {
    __extends(ProdutoPerecivel, _super);
    function ProdutoPerecivel(id, descricao, quantidade, valorUnitario, dataValidade) {
        var _this = _super.call(this, id, descricao, quantidade, valorUnitario) || this;
        _this.dataValidade = dataValidade;
        return _this;
    }
    ProdutoPerecivel.prototype.isValido = function () {
        return this.dataValidade > new Date();
    };
    ProdutoPerecivel.prototype.repor = function (quantidade) {
        if (this.isValido()) {
            _super.prototype.repor.call(this, quantidade);
        }
        else {
            throw new Error("Produto perecível fora da validade, não pode ser reposto.");
        }
    };
    ProdutoPerecivel.prototype.darBaixa = function (quantidade) {
        if (this.isValido()) {
            _super.prototype.darBaixa.call(this, quantidade);
        }
        else {
            throw new Error("Produto perecível fora da validade, não pode dar baixa.");
        }
    };
    ProdutoPerecivel.prototype.getDataValidade = function () {
        return this.dataValidade;
    };
    return ProdutoPerecivel;
}(Produto));
var Estoque = /** @class */ (function () {
    function Estoque() {
        this.produtos = [];
    }
    Estoque.prototype.incluir = function (produto) {
        if (this.existe(produto.getId(), produto.getDescricao())) {
            throw new Error("Produto com mesmo ID ou descrição já existe.");
        }
        this.produtos.push(produto);
    };
    Estoque.prototype.consultar = function (id) {
        return this.produtos.find(function (produto) { return produto.getId() === id; });
    };
    Estoque.prototype.excluir = function (id) {
        this.produtos = this.produtos.filter(function (produto) { return produto.getId() !== id; });
    };
    Estoque.prototype.repor = function (id, quantidade) {
        var produto = this.consultar(id);
        if (produto) {
            produto.repor(quantidade);
        }
        else {
            throw new Error("Produto não encontrado.");
        }
    };
    Estoque.prototype.darBaixa = function (id, quantidade) {
        var produto = this.consultar(id);
        if (produto) {
            produto.darBaixa(quantidade);
        }
        else {
            throw new Error("Produto não encontrado.");
        }
    };
    Estoque.prototype.existe = function (id, descricao) {
        return this.produtos.some(function (produto) { return produto.getId() === id || produto.getDescricao() === descricao; });
    };
    Estoque.prototype.listarPereciveisVencidos = function () {
        return this.produtos
            .filter(function (produto) { return produto instanceof ProdutoPerecivel && !produto.isValido(); })
            .map(function (produto) { return produto; });
    };
    return Estoque;
}());
// Exemplo de uso:
var estoque = new Estoque();
var produto1 = new Produto(1, "Arroz", 100, 5.50);
var produtoPerecivel1 = new ProdutoPerecivel(2, "Leite", 50, 4.75, new Date("2024-08-10"));
estoque.incluir(produto1);
estoque.incluir(produtoPerecivel1);
try {
    estoque.repor(2, 10); // Tentativa de repor leite fora da validade
}
catch (error) {
    console.error(error.message);
}
var vencidos = estoque.listarPereciveisVencidos();
vencidos.forEach(function (produto) {
    console.log("Produto vencido: ".concat(produto.getDescricao(), ", Validade: ").concat(produto.getDataValidade()));
});
