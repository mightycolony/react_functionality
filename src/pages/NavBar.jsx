import { Link, Route } from "react-router-dom";
import ServerDetails from "./ServerDetails";
import "./navbar.css"
function NavBar() {
  return (
   
    <nav className="nav">
            <a href="/" className="site-title">Fun checker</a>
            <ul>
                <li>
                    <a href="/checker">checker</a>
                </li>
                <li>
                    <a href="/serverdetails">Serverdetails</a>
                </li>
                <li>
                    <a href="/kernelspace">kernelspace</a>
                </li>
                <li>
                    <a href="/userpace">userspace</a>
                </li>
                <li>
                    <a href="/Foreman">Foreman_inv</a>
                </li>
            </ul>
            
    </nav>



  );
}

export default NavBar;