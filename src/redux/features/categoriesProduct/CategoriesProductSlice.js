import { createSlice } from '@reduxjs/toolkit'

const initialState =[]

export const CategoriesProductSlice = createSlice({
    name: 'categoriesProduct',
    initialState,
    reducers: {
      addCategoriesProduct: (state, action) => {
        state.push(action.payload);
      },
      editeCategoriesProduct: (state, action) => {
        const categorie = action.payload
        state.map((p,k) => (p.id === categorie.id) ? state[k] = categorie : state[k] = p)
      },
      deleteCategoriesProduct: (state, action) => {
        state = state.filter((p) => p.id !== action.payload)
        return state
      }
    }
})
