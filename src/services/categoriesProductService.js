import Axios from "./axiosSetting"

let getAllCategories = () => {
    return Axios.get('/categorie_produits')
}

let getCategorie = (uid) => {
    return Axios.get('/categorie_produits/'+uid)
}

let addCategorie = (product) => {
    return Axios.post('/categorie_produits', product)
}

let updateCategorie = (uid, product) => {
    return Axios.patch('/categorie_produits/'+uid, product)
}

let deleteCategorie  = (uid) => {
    return Axios.delete('/categorie_produits/'+uid)
}

let constructObject = (categorie) => {
    let object = {
        id: categorie.id,
        libelle: categorie.libelle,
        url: categorie['@id'],
    }

    return object
}

// Décaraltion des esrvices pour import
export const categoriesProductService = {
    getAllCategories, getCategorie, addCategorie, updateCategorie, deleteCategorie, constructObject
}