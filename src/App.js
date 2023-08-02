import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users/Users";
import UserAdd from "./pages/Users/UserAdd";
import Login from "./pages/Auth/Login";
import AuthProvider from "./provider/AuthProvider";
import UserUpdate from "./pages/Users/UserUpdate";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<AuthProvider><Home /></AuthProvider>} />
            <Route path="/users" element={<AuthProvider><Users /></AuthProvider>}/>
            <Route path="/user/add" element={<AuthProvider><UserAdd /></AuthProvider>}/>
            <Route path="/user/update/:id" element={<AuthProvider><UserUpdate /></AuthProvider>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


