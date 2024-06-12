import "./App.css";
import Home from "./pages/home/home";
import Products from "./pages/products/products";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Conatct_Us from "./pages/contact us/contact_us";
import Gallery from "./pages/gallery/gallery";
import { UserProvider } from './userContext';
import Cart from "./pages/cart/cart";

function App() {
  return (
    <div className="App">
      <UserProvider>
      <Router scrollRestoration="manual">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products/>} />
          <Route path='contact' element={<Conatct_Us/>}/>
          <Route path='gallery' element={<Gallery/>}/>
          <Route path='cart' element={<Cart/>}/>
        </Routes>
      </Router>
      </UserProvider>
    </div>
  );
}

export default App;
