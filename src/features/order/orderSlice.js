import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const orderAdapter = createEntityAdapter()

const initialState = orderAdapter.getInitialState()

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        orderAdded: orderAdapter.addOne,
        orderDeleted: orderAdapter.removeOne,
    }
})

export const {
    orderAdded,
    orderDeleted,
} = orderSlice.actions

export const {
    selectById: selectOrderById,
    selectIds: selectOrderIds,
    selectEntities: selectOrder,
} = orderAdapter.getSelectors(state => state.order)

export default orderSlice.reducer