import React from "react";
import AppRoutes from "./components/routes/AppRoutes";
import { Toaster } from "react-hot-toast";
// import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {

  function noop() { }
  (() => {
    if (process.env.NODE_ENV !== 'development') {
      console.log = noop;
      console.warn = noop;
      console.error = noop;
    }
  })();

  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  );
};

export default App;
