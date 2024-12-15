// category.jsx
import { Outlet } from "react-router-dom";
import Select from "../components/select";
import React from 'react';
const CategoryPage = () => {
    return (
        <>
        <h1>카테고리</h1>
        <Select/>

        <Outlet />
        </>
    );
};

export default CategoryPage;
