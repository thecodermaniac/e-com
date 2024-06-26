import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layouts from "./components/Layouts";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Layouts>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layouts>
    </BrowserRouter>
  );
}

export default App;
