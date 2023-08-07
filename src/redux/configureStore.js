

import { configureStore } from '@reduxjs/toolkit'
import { ProductSlice } from './features/product/ProductSlice'
import { CategoriesProductSlice } from './features/categoriesProduct/CategoriesProductSlice'

export const store = configureStore(
    {
      reducer: {
        product: ProductSlice.reducer,
        categoriesProduct: CategoriesProductSlice.reducer
      }
    }
)