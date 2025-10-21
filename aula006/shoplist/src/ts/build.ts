interface IProduct {
    produto: string;
    quantidade: number;
}

export class Product implements IProduct {
    static nextID = 1;

    id: number;
    produto: string;
    quantidade: number;

    constructor(produto: string, quantidade: number) {
        this.id = Product.nextID;
        Product.nextID++;
        this.produto = produto;
        this.quantidade = quantidade;
    }
}
