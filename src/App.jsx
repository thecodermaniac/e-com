import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layouts from "./components/Layouts";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import Product from "./pages/Product";

function App() {
  return (
    <BrowserRouter>
      <Layouts>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />}>
            <Route path=":id" element={<Catalog />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<Product />} />
        </Routes>
      </Layouts>
    </BrowserRouter>
  );
}

export default App;
