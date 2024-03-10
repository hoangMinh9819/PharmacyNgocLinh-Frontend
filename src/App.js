import './App.css';
import UnitsComponent from "./components/UnitsComponent";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import NavigationComponent from "./components/NavigationComponent";
import ProductsComponent from "./components/ProductsComponent";
import WareHousesComponent from "./components/WareHousesComponent";
import OrdersComponent from "./components/OrdersComponent";
import LoginComponent from "./components/LoginComponent";
import HomeComponent from "./components/HomeComponent";
import EmployeesComponent from "./components/EmployeesComponent";

function App() {
  return (
      <div>

          <Router>
              <NavigationComponent/>
            <Routes>
                <Route path={"/home"} element={<HomeComponent/>}/>
                <Route path={"/"} element={<HomeComponent/>}/>
                <Route path="/login" element={<LoginComponent/>}/>
                <Route path="/units" element={<UnitsComponent/>}/>
                <Route path="/products" element={<ProductsComponent/>}/>
                <Route path="/wareHouses/:id" element={<WareHousesComponent/>}/>
                <Route path="/orders" element={<OrdersComponent/>}/>
                <Route path="/employees" element={<EmployeesComponent/>}/>
            </Routes>
          </Router>
      </div>
  );
}

export default App;
