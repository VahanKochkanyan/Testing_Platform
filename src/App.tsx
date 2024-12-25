import { ToastContainer } from "react-toastify"
import RootRouter from "./router"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  return (
    <div className="App">
      <ToastContainer autoClose={5000} />
      <RootRouter />
    </div>
  )
}

export default App
