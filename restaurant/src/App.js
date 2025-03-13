import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
//import Home from './component/pages/Home';
import LoginForm from './component/auth/login';
import RegisterForm from './component/auth/signUp';
import Home from './component/pages/Home';
import AddDish from './component/pages/AddDish';

function App() {

    const userRole = localStorage.getItem("userRole");
console.log("Rôle récupéré depuis localStorage :", userRole); // 🔍 Vérifie après stockage

    return (
        <Router>
            <nav>
                <Link to="/Home">Home</Link>
                <ScrollLink to="menu" smooth={true} duration={500}>Menu</ScrollLink>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                {userRole && userRole.toLowerCase() === "admin" && <Link to="/add-dish">Ajouter un Plat</Link>}


            </nav>
            <Routes>
                <Route path="/Home" element={<Home />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/add-dish" element={<AddDish />} />
            </Routes>
        </Router>
    );
}   

export default App;