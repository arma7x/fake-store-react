import { createSlice } from '@reduxjs/toolkit'

export const databaseSlice = createSlice({
  name: 'database',
  initialState: {
    loading: false,
    searchText: '',
    database: [],
    products: [],
    productsRegistry: {}
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    storeProducts: (state, action) => {
      state.database = []
      state.database = [...action.payload]
      state.products = [...state.database]
    },
    searchProducts: (state, action) => {
      state.searchText = action.payload
      if (state.database.length > 0 && state.searchText.length > 0) {
        let temp = []
        temp = state.database.filter((product) => {
          if (product.id.toString().toLowerCase().indexOf(state.searchText) > -1) {
            return true
          } else if (product.title.toLowerCase().indexOf(state.searchText) > -1) {
            return true
          } else if (product.category.toLowerCase().indexOf(state.searchText) > -1) {
            return true
          } else if (product.description.toLowerCase().indexOf(state.searchText) > -1) {
            return true
          }
          return false
        });
        state.products = temp
      } else {
        state.products = [...state.database]
      }
    },
    pushProductsRegistry: (state, action) => {
      const product = action.payload
      if (state.productsRegistry[product.id] == null) {
        state.productsRegistry[product.id] = product
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoading, storeProducts, searchProducts, pushProductsRegistry } = databaseSlice.actions

export default databaseSlice.reducer
