import { useEffect, useState } from 'react'
import { 
    useParams,
    useLocation,
    useHistory,
    Redirect
} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { orderAdded } from '../order/orderSlice'
import {
    fetchMenu,
    menuInit,
    menuAdded,
    selectMenuIds,
    selectMenuById
} from './menuSlice'

import { BsPlus, BsCheck } from 'react-icons/bs'

function Menu() {
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    
    const [isNewMealOpen, setIsNewMealOpen] = useState(false)
    const menuIds = useSelector(selectMenuIds)
    const loadingStatus = useSelector(state => state.menu.status)

    useEffect(() => {
        dispatch(fetchMenu())
        return () => {
            dispatch(menuInit([]))
        }
    }, [])

    
    if(pathname !== "/menu") {
        return <Redirect to="/menu"></Redirect>
    }

    const renderedMenuItems = menuIds.map(menuId => {
        return <MenuItem key={menuId} id={menuId}/>
    })

    return (
        <div className="menu">
            <div className="categories"></div>
            <div className="meals">
                <div className="top">
                    <h1 className="category">ALL</h1>
                    <button
                        className="menuAdded"
                        onClick={e => setIsNewMealOpen(state => !state)}
                    >
                        <BsPlus className="iconBtn"/>
                    </button>
                </div>
                {isNewMealOpen && <NewMeal />}
                {
                    loadingStatus !== 'idle' ?
                    <span>Loading ...</span> :
                    <ul>
                        {renderedMenuItems}
                    </ul>
                }
            </div>
        </div>
    )
}

function MenuItem({id}) {
    const dispatch = useDispatch()
    const history = useHistory()

    const meal = useSelector(state => selectMenuById(state, id))

    function handleClick(e) {
        dispatch(orderAdded(meal))
        history.push('/order')
    }

    if (meal === undefined)
        return null

    const {
        name,
        calories
    } = meal

    return (
        <li>
            <button onClick={handleClick}>
                <div>
                    {name}
                </div>
                <div>
                    {calories} Kcal
                </div>
            </button>
        </li>
    )
}

function NewMeal() {
    const [newMealName, setNewMealName] = useState("")
    const [newMealCalories, setNewMealCalories] = useState("")

    const dispatch = useDispatch()

    function createMeal(e) {
        e.preventDefault();

        if(!newMealName || isNaN(+newMealCalories) || +newMealCalories < 0)
            return

        dispatch(
            menuAdded({
                meal: {
                    name: newMealName, 
                    calories: +newMealCalories,
                }
            })
        )
        
        setNewMealName("")
        setNewMealCalories("")
    }

    return (
        <form className="newMeal">
            <div className="left">
                <div>
                    <input
                        type="text"
                        value={newMealName}
                        placeholder="New Meal..."
                        onChange={e => setNewMealName(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={newMealCalories}
                        placeholder="Calories..."
                        onChange={e => setNewMealCalories(e.target.value)}
                    />
                </div>
            </div>
            <div className="right">
                <button type="submit" onClick={createMeal}>
                    <BsCheck className="iconBtn"/>
                </button>
            </div>
        </form>
    )
}

export default Menu