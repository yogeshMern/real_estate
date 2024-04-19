import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./Pages/Header";
import Home from "./Pages/Home";
import Property from "./Pages/Property";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Savedproperty from "./Pages/Savedproperty";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property" element={<Property />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/saved_property" element={<Savedproperty />} />
        </Routes>
        <Toaster position="bottom-center" />
      </BrowserRouter>
    </>
  );
};

export default App;
