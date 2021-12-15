import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API} from "../../tools/constans";
function SubSubCategory() {

    const [inputVal, setInputVal] = useState({category:"", subcategory:"", subsubcategoryname:"", description:""})
    const [category, setCategory] = useState([]);
    const [subCategoryN, setSubCategoryN] = useState([]);
    const [subCategoryId, setSubCategoryId] = useState('');

    function AddInputVal(e) {
        setInputVal({
            ...inputVal,
            [e.target.name]: e.target.value
        });
        if (e.target.name === 'category') {
            axios.get(API+"api/SubcategoryByCategoryId/" + e.target.value).then(res => {
                setSubCategoryN(res.data)
            })
        }
        if (e.target.name === 'subcategory')
            setSubCategoryId(e.target.value)
    }

// category get
    useEffect(() => {
        axios.get(API+"api/Category/").then(res => {
            setCategory(res.data)
        })
    }, [])

        function addSubSubCategory() {
            console.log(inputVal)

            axios.post(API+'api/Subsubcategory/',inputVal).then(res=>{
                console.log(res.data)
                window.location.replace("/admin/getSubSubCategory");
            })
            .catch(
                console.log('Salom')
            )
        }


    return (
        <div className="subcategory">
            <div className="container">
                <h1 className="title">Add Subsubcategory</h1>
                <div className="row">
                    <div className="col-xl-1"/>
                    <div className="col-md-5 subcategory-body">
                        <div className="form">
                            {/*category select*/}
                            <label htmlFor="category">Subsubcategory name</label>
                            <select name="category" onChange={AddInputVal} id="category">
                            <option disabled selected>Kategoriyani tanlang</option>
                                {category.map(item => {
                                    return <option value={item.id}>{item.categoryname}</option>
                                })}
                            </select>
                            {/*sub category select*/}
                            <label htmlFor="subcategory">Subsubcategory name</label>
                            {inputVal.category === '' ? <select disabled style={{opacity: '.5'}}/>
                                : <select name="subcategory" onChange={AddInputVal} id="subcategory">
                                    <option disabled selected>Subkategoriyani tanlang</option>
                                    {subCategoryN.map(item => {
                                        return <option value={item.id}>{item.subcategoryname}</option>
                                    })}
                                </select>}
                            <label htmlFor="subsubcategory">Subsubcategory name</label>
                            <input type="text" onChange={AddInputVal} name="subsubcategoryname" id="subsubcategory"/>
                            <label htmlFor="des">Description</label>
                            <input type="text" name="description" onChange={AddInputVal} id="des"/>
                            <button onClick={addSubSubCategory} className="btn btn-success">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubSubCategory;