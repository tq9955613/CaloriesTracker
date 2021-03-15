import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { makeServer } from "./server"
import axios from "axios"

import { Provider } from 'react-redux'
import store from './store'

import { menuInit, menuAdded, fetchMenu } from './features/menu/menuSlice'

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" })

  // store.dispatch(fetchMenu())

  //test()

  async function test() {
    let url = '/api/meals'

    // get inital meals
    const { meals } = await getMeals()
    store.dispatch(menuInit(meals))

    // add test
    let newMeal = {
      meal: {
        name: "新餐點",
        calories: 999,
      }
    }
    let {data: {meal: {id: newMealId}}} = await axios.post(url, newMeal)
    getMeals()

    // update test
    let updatedMeal = {
      meal: {
        calories: 100
      }
    }
    await axios.patch(`${url}/${newMealId}`, updatedMeal)
    getMeals()

    // delete test
    await axios.delete(`${url}/${newMealId}`)
    getMeals()

    async function getMeals() {
      let {data} = await axios.get(url)
      return data
      // return console.log(data)
    }
  }
}


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
