import React from "react";
import AppRoutes from "./components/routes/AppRoutes";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  );
};

export default App;
