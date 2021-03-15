import { BrowserRouter, Switch, Route, Redirect, NavLink } from 'react-router-dom'
import Order from '../features/order/Order'
import Menu from '../features/menu/Menu'

function Router() {
    return (
        <div className="app">
            <BrowserRouter>
                <header>
                    <nav>
                        <NavLink
                            to="menu"
                            activeClassName="active"
                        >
                            Menu
                        </NavLink>
                        <NavLink
                            to="order"
                            activeClassName="active"
                        >
                            Order
                        </NavLink>
                    </nav>
                </header>
                <main>
                    <Switch>
                        <Route path="/order">
                            <Order/>
                        </Route>
                        <Route path="/menu">
                            <Menu/>
                        </Route>
                        <Redirect to="/" />
                    </Switch>
                </main>
                <footer></footer>
            </BrowserRouter>
        </div>
    )
}

export default Router