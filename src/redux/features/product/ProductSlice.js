import { createSlice } from '@reduxjs/toolkit'

const initialState =[]

export const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
      addProduct: (state, action) => {
        state.push(action.payload);
      },
      editeProduct: (state, action) => {
        //const product = state.find((p) => p.id === action.payload)
        const product = action.payload
        state.map((p,k) => (p.id === product.id) ? state[k] = product : state[k] = p)
      },
      deleteProduct: (state, action) => {
        state = state.filter((p) => p.id !== action.payload)
        return state
      }
    }
})
