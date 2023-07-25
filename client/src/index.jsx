import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import NavBar from "./components/Header";
import Footer from "./components/Footer";
import SearchForm from "./components/SearchForm"
import ResultsPage from "./components/ResultsPage";
import { resultsLoader } from "./components/Loader"
import "./index.css";
import ContactForm from "./components/ContactForm";
import AboutSection from "./components/AboutSection";


function Layout() {
  return (
    <>
      <NavBar />
       <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path='/' element={<SearchForm />} />
      <Route path='/results/:searchParams' loader={resultsLoader} element={<ResultsPage />} />
      <Route path='/contact' element={<ContactForm />} />
      <Route path='/about' element={<AboutSection />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
