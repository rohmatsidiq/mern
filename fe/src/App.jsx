import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

export default function App() {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/add" element={<AddProduct />} />
            </Routes>
        </div>
    );
}
