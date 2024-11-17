// category.jsx
import { Outlet } from "react-router-dom";
import Select from "../components/select";

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
