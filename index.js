
//SE CREA LA SIGUIENTE CLASE MANJADORA DE PRODUCTOS, QUE COMIENZA CON UN ARRAY VACIO.
class ProductManager {
    products;
    constructor() {
        this.products = [];
    }
    //EL METODO ADDPRODUCT RECIBE LOS PARAMETROS SEÑALADOS Y CREA UN NUEVO PRODUCTO (INSTANCIA LA CLASE ANTERIOR).
    //LUEGO, LO PUSHEA AL ARRAY VACÍO DE PRODUCTOS, O SEA, LO AGREGA.
    static correlativoId = 0;
    addProduct(
        title, description, price, thumbnail, code, stock
    ) {
        //SE VALIDA QUE TODOS LOS CAMPOS ESTEN COMPLETOS.
        if (
            title == undefined ||
            description == undefined ||
            price == undefined ||
            thumbnail == undefined ||
            code == undefined ||
            stock == undefined
        ) {
            throw new Error("All the fields must be filled.")
        }

        //SE VALIDA QUE NO SE REPITA EL CAMPO CODE.
        let codeExists = this.products.some((dato) => dato.code == code);
        if (codeExists) {
            throw new Error("Entered code already exists.");
        } else {
            //CADA VEZ QUE SE CREA UN PRODUCTO, EL ID (AUTOINCREMENTAL) AUMENTA EN +1.
            ProductManager.correlativoId++;
            const newProduct = {
                id: ProductManager.correlativoId, title, description, price, thumbnail, code, stock
            };
            this.products.push(newProduct);
        }
    }

    //METODO QUE DEVUELVE LOS PRODUCTOS.
    getProducts() {
        return this.products;
    }

    //METODO QUE PERMITE FILTRAR EL ARRAY PRODUCTOS POR EL ID QUE RECIBA POR PARAMETRO.
    getProductById(id) {
        let product = this.products.find((dato) => dato.id == id);
        //SI NO ES UNDEFINED, DEVUELVE EL PRODUCTO. SINO, DEVUELVE ERROR.
        if (product !== undefined) {
            return product;
        } else {
            return "ERROR: Product is not found."
        }
    }


    //METODO QUE ACTUALIZA/MODIFICA UN CAMPO DEL PRODUCTO.
    updateProduct(id, updatedFields) {
        let productIndex = this.products.findIndex((dato) => dato.id === id);
        if (productIndex !== -1) {
            let updatedProduct = { ...this.products[productIndex], ...updatedFields };
            this.products[productIndex] = updatedProduct;
        } else {
            throw new Error("Product is not found.");
        }
    }

    //METODO QUE ELIMINA PRODUCTOS.
    deleteProduct(id) {
        let productIndex = this.products.findIndex((dato) => dato.id === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            console.log("Product", {id} ,"has been deleted successfully.")
        } else {
            throw new Error("ERROR: Product is not found.");
        }
    }
}


//__________________CONSIGNAS__________________________

//Se creará una instancia de la clase “ProductManager”.
let testProduct = new ProductManager();

//Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío [].
let noProducts = testProduct.getProducts();
console.log("\n", "No products added yet: ", noProducts, "\n");

//Se llama al método “addProduct” con los campos requeridos.
testProduct.addProduct(
    "product testing",
    "This is a testing",
    200,
    "no img",
    "abc123",
    25
)

//Se llama al método “getProducts” nuevamente, aparece el producto recién agregado con el ID autogenerado.
let productCheck = testProduct.getProducts();
console.log("The getProducts method is executed", productCheck, "\n");

//Se llama al método al método “getProductById” que devuelve el producto correspondiente a dicho ID.
const productId = 1; 
let productById = testProduct.getProductById(productId);
console.log("Product with ID  ", productId, ":", productById, "\n");

//Se llama al método “updateProduct".
const updatedFields = {price: 351};
testProduct.updateProduct(productId, updatedFields);
let updatedProduct = testProduct.getProducts();
console.log("Product update: ", updatedProduct, "\n");

//Se llama al método “deleteProduct".
testProduct.deleteProduct(productId);
console.log("The array is empty: ", testProduct.getProducts());