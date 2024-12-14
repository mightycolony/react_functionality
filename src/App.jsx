import ServerDetails from "./pages/ServerDetails"
import NavBar from "./pages/NavBar"
import Home from "./pages/Home"
import Forms from "./pages/Forms"

import KernelSpace from "./pages/KernelSpace"
function App() {
  let component
  switch (window.location.pathname) {
     case "/":
          component = <Home/>
        break 
          case "/checker":
            component = <Forms/>
            break
          case "/serverdetails":
            component =<ServerDetails/>
            break
               case "/kernelspace":
      
                  component = <KernelSpace/>
                  break 
                    case "/userspace":
                      break
  }

  return (
    <>
    <NavBar/>
    <div className="container">
      {component}
    </div> 
    </>

  )
}

export default App
