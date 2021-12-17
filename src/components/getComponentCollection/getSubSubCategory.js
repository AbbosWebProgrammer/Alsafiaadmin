import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {API} from "../../tools/constans";
import "./css/style.css";
function GetSubSubCategory(props) {
    const [subSubCategory, setSubSubCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [inputChange, setInputChange] = useState({
        category: "",
        subcategory: '',
        subsubcategoryname: '',
        description: ""
    });
    const [item, setItem] = useState('');
    const [categoryEdit, setCategoryEdit] = useState('');
    const [subCategoryEdit, setSubCategoryEdit] = useState('');
    const [deletes, setDeletes] = useState('');
    const [inputV, setInputV] = useState('');
    const {handleSubmit} = useForm();
    const onSubmit = reset=>console.log(reset)

    useEffect(() => {
        axios.get(API+"api/Subsubcategory/").then((res) => {
                setSubSubCategory(res.data)
            }
        )
    }, []);
    useEffect(() => {
        axios.get(API+"api/Subsubcategory/").then((res) => {
                setSubSubCategory(res.data)
            }
        )
    }, [addEdit]);
    useEffect(() => {
        axios.get(API+"api/Subcategory/").then((res) => {
            setSubCategory(res.data)
        })
    }, []);
    useEffect(() => {
        axios.get(API+"api/Category/").then(res => {
            setCategoryList(res.data)
        });
    }, []);

    function handleChange(e) {
        setInputChange({
            ...inputChange,
            [e.target.name]: e.target.value
        })
    }

    function editBrand(id) {
        subSubCategory.map(item => {
            if (item.id === id) {
                setItem(item);

                categoryList.map(category => {
                    if (item.category === category.id) {
                        setCategoryEdit(category)
                    }

                });
                subCategory.map(subCategory => {
                    if (item.subcategory === subCategory.id) {
                        setSubCategoryEdit(subCategory)
                    }
                });

                inputChange.category = item.category;
                inputChange.subcategory = item.subcategory;
                inputChange.subsubcategoryname = item.subsubcategoryname;
                inputChange.description = item.description;
            }

        })
    }

    function addEdit(id) {
        console.log(inputChange)
        axios.put(API+`api/Subsubcategory/${id}/`, inputChange).then((res) => {
            axios.get(API+"api/Subsubcategory/").then((res) => {
                setSubSubCategory(res.data)
            })
            })
    }

    function deleteItems(items) {
        setDeletes(items)
    }

    function DeleteSubcategory() {
        subSubCategory.map(item => {

            if (item.id === deletes.id) {

                axios.delete(API+`api/Subsubcategory/${deletes.id}/`).then(res => {
                    console.log(res)
                });
                setInputV('');
            }

        });
    }

    function inputVal(e) {
        setInputV(e.target.value)
    }
    return (
        <div>
            <div className="getBrand">
                <div className="container">
                    <Link to={"/admin/addSubSubCategory"} className="w-100 d-flex justify-content-end">
                        <button className="btn btn-success mb-4">Add Subsubcategory</button>
                    </Link>

                    <div className="title">
                        <div className="row nav">
                            <div className="col-md-1 li">T/r</div>
                            <div className="col-md-2 li">Name</div>
                            <div className="col-md-2 li">Description</div>
                            <div className="col-md-2 li text-center">Category</div>
                            <div className="col-md-2 li text-center">SubCategory</div>
                            <div className="col-md-1 li">Edit</div>
                            <div className="col-md-1 li">Delete</div>
                        </div>
                    </div>
                    <div className="menu">
                        {subSubCategory.map(item => {
                            return <div className="row nav" key={item.id}>
                                <div className="col-md-1 nav-item">{item.id}</div>
                                <div className="col-md-2 nav-item">{item.subsubcategoryname}</div>
                                <div className="col-md-3 nav-item">{item.description}</div>
                                <div className="col-md-2 nav-item">{item.category}</div>
                                <div className="col-md-1 nav-item">{item.subcategory}</div>
                                <div className="col-md-1 nav-item">
                                    <button className="btn btn-warning" onClick={() => editBrand(item.id)}
                                            data-bs-toggle="modal" data-bs-target="#exampleModal">Edit
                                    </button>
                                </div>
                                <div className="col-md-1 nav-item">
                                    <button className="btn btn-danger" data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                            onClick={() => deleteItems(item)}>Delete
                                    </button>
                                </div>
                            </div>
                        })}

                    </div>
                </div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="subcategory">
                                    <div className="container">
                                        <h2 className="title">Edit Subsubcategory</h2>
                                        {/* <small>{JSON.stringify(inputChange)}</small> */}
                                        <div className="row">
                                            <div className="col-md-12 subcategory-body">
                                                <form onSubmit={handleSubmit(onSubmit)} className="form">
                                                    <label htmlFor="subcategory">Category</label>
                                                     <select name="category" onChange={handleChange} id="category">
                                                        <option value={categoryEdit.id}>{categoryEdit.categoryname}</option>
                                                        {categoryList.map(item => {
                                                            return <option value={item.id}
                                                                           key={item.id}>{item.categoryname}</option>
                                                        })}
                                                    </select>

                                                    <label htmlFor="subcategory">SubCategory</label>
                                                    <select name="subcategory" onChange={handleChange} id="category">
                                                        <option value={subCategoryEdit.id}>{subCategoryEdit.subcategoryname}</option>
                                                        {subCategory.map(item => {
                                                            return <option value={item.id}
                                                                           key={item.id}>{item.subcategoryname}</option>
                                                        })}
                                                    </select>

                                                    <label htmlFor="subcategory">Subsubcategory name</label>
                                                    <input type="text" defaultValue={item.subsubcategoryname}
                                                           onChange={handleChange}
                                                           name="subsubcategoryname" id="subcategory"/>
                                                    <label htmlFor="des">Description</label>
                                                    <input type="text" name="description"
                                                           defaultValue={item.description} onChange={handleChange}
                                                           id="des"/>
                                                    <button type="reset" className="btn btn-secondary d-inline-block "
                                                            data-bs-dismiss="modal" name="close"
                                                            >Close
                                                    </button>

                                                    <button className="btn btn-success mx-3" data-bs-toggle="modal"
                                                            data-bs-target="#exampleModal"
                                                            onClick={() => addEdit(item.id)}>Submit
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                     tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="text-center">Delete SubCategory</h4>
                                {/*<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>*/}
                            </div>
                            <div className="modal-body">
                                <h6>
                                    Subcategory va uning qo'shimchalari o'chgandan so'ng qaytarib bo'lmaydi. Ilovangiz
                                    nomini kiriting
                                    <br/>
                                    <b className="bg-secondary p-1 px-2 mt-1 "
                                       style={{borderRadius: "5px"}}> {deletes.subsubcategoryname} </b> uni butunlay
                                    oʻchirib tashlamoqchi ekanligingizni tasdiqlang:
                                </h6>

                                <input type="text" className="form-control  mt-2" onChange={inputVal} value={inputV}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                </button>
                                {inputV === deletes.subsubcategoryname ?
                                    <button className="btn btn-danger" onClick={DeleteSubcategory}
                                            data-bs-dismiss="modal">Delete</button> :
                                    <button className="btn btn-danger"
                                            disabled>Delete</button>}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default GetSubSubCategory;
