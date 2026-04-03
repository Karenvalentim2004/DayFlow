import AppRoutes from '../routes.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  )
}

export default App;
