import { createSlice } from '@reduxjs/toolkit'

const initialState =[]

export const CategoriesProductSlice = createSlice({
    name: 'categoriesProduct',
    initialState,
    reducers: {
      addCategoriesProduct: (state, action) => {
        const categorie = action.payload
        state.push(categorie);
      },
      editeCategoriesProduct: (state, action) => {
        const categorie = action.payload
        state.map((c,k) => (c.id === categorie.id) ? state[k] = categorie : state[k] = c)
      },
      deleteCategoriesProduct: (state, action) => {
        state = state.filter((p) => p.id !== action.payload)
        return state
      }
    }
})
