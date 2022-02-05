import React,{useState,useEffect} from 'react';
import axios from "axios";

import {API} from "../../tools/constans";


function AdvertisingForCategoryMenu(props) {
    const  [category,setCategory] = useState([]);
    const  [subCategory,setSubCategory] = useState([]);
    const  [subSubCategory,setSubSubCategory] = useState([]);
    const  [brand,setBrand] = useState([]);
    useEffect(() => {
        axios.get(API+"api/Category/").then((res) => {
                setCategory(res.data)
            }
        )
    }, []);
    useEffect(() => {
        axios.get(API+"api/Subcategory/").then((res) => {
            setSubCategory(res.data)
        })
    }, []);
    useEffect(() => {
        axios.get(API+"api/Subsubcategory/").then((res) => {
                setSubSubCategory(res.data)
            }
        )
    }, []);
    useEffect(() => {
        axios.get(API+"api/Brand/").then((res) => {
            setBrand(res.data)
        })
    }, []);
    return (
        <div className="ShoppingDayForHomePageCarousel">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name"/>
                        <label htmlFor="image">Image</label>
                        <input type="file" id="image" name="image"/>


                        <label htmlFor="category">Category</label>
                        <select name="category" id="category" className="form-select" >
                            {category.map(item=>{
                                return <option key={item.id} value={item.id}>{item.categoryname}</option>
                            })}
                        </select>
                        <label htmlFor="subcategory">Subcategory</label>
                        <select name="subcategory" id="subcategory" className="form-select" multiple={true}>
                            {subCategory.map(item=>{
                                return<option key={item.id} value={item.id}>{item.subcategoryname}</option>
                            })}
                        </select>
                        <label htmlFor="SubSubcategory">Subsubcategory</label>
                        <select name="" id="SubSubcategory" className="form-select" multiple={true}>
                            {subSubCategory.map(item=>{
                                return<option value={item.id}>{item.subsubcategoryname}</option>
                            })}
                        </select>
                        <label htmlFor="brand">Brand</label>
                        <select name="brand" id="brand" className="form-select" multiple={true}>
                            {brand.map(item=>{
                                return <option value={item.id} key={item.id}>{item.name}</option>
                            })}
                        </select>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AdvertisingForCategoryMenu;