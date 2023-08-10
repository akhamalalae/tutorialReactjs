import { categoriesProductService } from "../services/categoriesProductService";
import { useState } from "react";

let ConstructObject = (product) => {
    console.log(product);
    const [categoriesProduct, setCategoriesProduct] = useState([]);

    let data = object.categories
    data.forEach( obj =>
        categoriesProductService.getCategorie(obj)
            .then(res => {
                console.log(res.data)
                setCategoriesProduct(...categoriesProduct,res.data.libelle)
            })
            .catch(error => console.log(error))
    )

    let object = {
        id: product.id,
        libelle: product.libelle,
        description: product.description,
        price: product.price,
        status: product.status === true ? true : false,
        categories: categoriesProduct,
    }

    console.log("constructObject");
    console.log(object);

    return object
}

// Décaraltion des esrvices pour import
export const Product = {
    ConstructObject
}