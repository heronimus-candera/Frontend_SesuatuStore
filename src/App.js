import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Home";
import UploadPage from "./Upload";
import Menu from "./Menu2";
import Navbar from "./navbar";

function App() {
  return (
    <ChakraProvider>

      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/tambah" element={<UploadPage/>} />
          <Route path="/menu" element={<Menu/>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
