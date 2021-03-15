import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'

import { addMeal, getMeals } from '../../api/meal'

const menuAdapter = createEntityAdapter()
const initialState = menuAdapter.getInitialState({
    status: 'initial'
})

export const fetchMenu = createAsyncThunk(
    'menu/fetchAll',
    async () => {
        const { meals } = await getMeals()
        return meals
    }
)

export const menuAdded = createAsyncThunk(
    'menu/menuAdded',
    async (newMeal) => {
        const { meal } = await addMeal(newMeal)
        return meal
    }
)

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        menuInit(state, payload) {
            state.status = 'initial'
            menuAdapter.setAll(state, payload)
        },
        menuDeleted: menuAdapter.removeOne,
    },
    extraReducers: {
        [fetchMenu.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchMenu.fulfilled]: (state, action) => {
            menuAdapter.setAll(state, action.payload)
            state.status = 'idle'
        },
        [fetchMenu.rejected]: (state) => {
            state.status = 'idle'
        },
        [menuAdded.fulfilled]: menuAdapter.addOne,
    }
})

export const {
    menuInit,
    menuDeleted,
} = menuSlice.actions

export const {
    selectById: selectMenuById,
    selectIds: selectMenuIds,
} = menuAdapter.getSelectors(state => state.menu)

export default menuSlice.reducer