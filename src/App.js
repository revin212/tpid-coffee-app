import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter as Router,Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Menu from "./components/Menu";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  return (
    <Router>
    <div className="App flex justify-center bg-slate-300">
      <main className="max-w-[500px] w-full bg-white min-h-screen">
        <Routes>
          {/* Home route, if note logged in, go to login page */}
          <Route exact path="/" 
          element={
            loggedIn? 
            <Home token={token} />
            : 
            <Navigate to={{ pathname: '/login', state: { from: '/' } }} />
          } />

          {/* Menu route, if note logged in, go to login page */}
          <Route exact path="/menu" 
          element={
            loggedIn? 
            <Menu token={token} />
            : 
            <Navigate to={{ pathname: '/login', state: { from: '/menu' } }} />
          } />

          {/* Login route */}
          <Route exact path="/login" element={<Login setLoggedIn={setLoggedIn} setToken={setToken} />} />
        </Routes>
      </main>
    </div>
    </Router>
  );
}

export default App;
