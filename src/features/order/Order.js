import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    orderDeleted,
    selectOrderById,
    selectOrderIds,
    selectOrder
} from './orderSlice'

import { BsX } from "react-icons/bs";

export default function() {
    const history = useHistory()
    const order = useSelector(selectOrder)
    const orderIds = useSelector(selectOrderIds)

    if(orderIds.length === 0) {
        return (
            <div className="notice">
                Please order
                <Link to='/menu'>Go to Menu</Link>
            </div>
        )
    }

    const totalCalories = Object.values(order).reduce((totalCalories, {calories}) => totalCalories + calories, 0)

    const renderedOrderItems = orderIds.map(id => {
        return <OrderItem key={id} id={id}/>
    })

    return (
        <div className='order'>
            <div className="board">
                熱量: {totalCalories} Kcal
            </div>
            <div className="meals">
                <ul>
                    {renderedOrderItems}
                </ul>
            </div>
            <button onClick={() => history.push('/menu')}>
                加入更多餐點
            </button>
        </div>
    )
}

function OrderItem({id}) {
    const dispatch = useDispatch()
    const meal = useSelector(state => selectOrderById(state, id))
    const {
        name,
        calories,
    } = meal
    
    return (
        <li>
            <div>
                <div>
                    {name}
                </div>
                <div>
                    {calories} Kcal
                </div>
            </div>
            <button onClick={() => dispatch(orderDeleted(id))}>
                <BsX className="iconBtn"/>
            </button>
        </li>
    )
}