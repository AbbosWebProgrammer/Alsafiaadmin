import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {API} from "../../tools/constans";
import "./css/style.css";
function GetProduct(props) {
const [product,setProduct] = useState([])
    useEffect(() => {
        axios.get(API+"api/ProductAllInfo/").then((res) => {
                setProduct(res.data.data)
            console.log(res.data.data)
            }
        )
    },[] );


    return (
        <div>
            <div className="getBrand">
                <div className="container">
                    <Link to={"/admin/addProduct"} className="w-100 d-flex justify-content-end"> <button className="btn btn-success mb-4">Add Product</button></Link>

                    <div className="title">
                        <div className="row nav ">
                            <div className="col li">T/r</div>
                            <div className="col li">Brand</div>
                            <div className="col li">Categoryname</div>
                            <div className="col li">Subcategoryname</div>
                            <div className="col li">Subsubcategoryname</div>
                            <div className="col li">Productname</div>
                            <div className="col li">Description</div>
                            <div className="col li">Edit</div>
                            <div className="col li">Delete</div>
                        </div>
                    </div>
                    <div className="menu">
                        {product.map(item => {
                            return <div className="row nav">
                                <div className="col nav-item">{item.id}</div>
                                <div className="col nav-item">{item.brand}</div>
                                <div className="col nav-item">{item.categoryname}</div>
                                <div className="col nav-item">{item.subcategoryname}</div>
                                <div className="col nav-item">{item.productname}</div>
                                <div className="col nav-item">{item.subsubcategory}</div>
                                <div className="col nav-item">{item.description}</div>
                                <div className="col nav-item">
                                    <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                                </div>
                                <div className="col-md-1 nav-item">
                                    <button className="btn btn-danger">Delete</button>
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
                                ...
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default GetProduct;
