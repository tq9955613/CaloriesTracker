import { configureStore } from '@reduxjs/toolkit'

import orderReducer from './features/order/orderSlice'
import menuReducer from './features/menu/menuSlice'

const store = configureStore({
    reducer: {
        order: orderReducer,
        menu: menuReducer,
    },
})

export default store