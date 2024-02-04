import './App.css';
import UnitsComponent from "./components/UnitsComponent";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import NavigationComponent from "./components/NavigationComponent";
import ProductsComponent from "./components/ProductsComponent";
import WareHousesComponent from "./components/WareHousesComponent";
import OrdersComponent from "./components/OrdersComponent";
import LoginComponent from "./components/LoginComponent";

function App() {
  return (
      <div>

          <Router>
              <NavigationComponent/>
            <Routes>
                <Route path="/login" element={<LoginComponent/>}/>
                <Route path="/units" element={<UnitsComponent/>}/>
                <Route path="/products" element={<ProductsComponent/>}/>
                <Route path="/wareHouses" element={<WareHousesComponent/>}/>
                <Route path="/orders" element={<OrdersComponent/>}/>
            </Routes>
          </Router>
      </div>
  );
}

export default App;
