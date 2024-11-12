import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="w-full h-svh">
      <Outlet />
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
