import Axios from "./axiosSetting"

let getAllProducts = () => {
    return Axios.get('/produits')
}

let getProduct = (uid) => {
    return Axios.get('/produits/'+uid)
}

let addProduct = (product) => {
    return Axios.post('/produits', product)
}

let updateProduct = (uid, product) => {
    return Axios.patch('/produits/'+uid, product)
}

let deleteProduct = (uid) => {
    return Axios.delete('/produits/'+uid)
}

let constructObject = (product) => {
    let object = {
        id: product.id,
        libelle: product.libelle,
        description: product.description,
        price: product.price,
        status: product.status === true ? true : false,
        categories: product.categories,
    }

    return object
}

// Décaraltion des esrvices pour import
export const productService = {
    getAllProducts, getProduct, addProduct, updateProduct, deleteProduct, constructObject
}