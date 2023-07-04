class Product{
    id = "";
    code = "";
    label = "";
    price = "";

    constructor(){
        this.id = "";
        this.code = "";
        this.label = "";
        this.price = "";
    }

    set(data){
        this.id = data['id'];
        this.code = data['code'];
        this.label = data['label'];
        this.price = data['price'];
    }
}

export default Product;