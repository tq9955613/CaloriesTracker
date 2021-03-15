import axios from "axios"

const url = '/api/meals'

const getMeals = () => axios.get(url).then(res => res.data)

const addMeal = data => axios.post(url, data).then(res => res.data)

export {
    getMeals,
    addMeal,
}