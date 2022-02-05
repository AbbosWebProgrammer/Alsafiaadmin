import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {API} from "../../tools/constans";
import "./css/style.css";
import { Alert } from 'bootstrap';
function GetProduct(props) {
const [product,setProduct] = useState([])
const [image,setimage] = useState('')

    useEffect(() => {
        axios.get(API+"api/ProductAllInfo/").then((res) => {
                setProduct(res.data.data)
            console.log(res.data.data)
            }
        )
    },[] );

    // ; window.location.href = '/admin/getBrand'
    // style={{"position":"stick","top":0,"z-index": 10000000}}
    return (
        <div>
            <div className="container d-flex align-items-center" style={{height:"70px"}}>
            <Link to={"/admin/addProduct"} className="w-100 d-flex justify-content-end mr-5"> <button className="btn btn-success mb-4">Add Product</button></Link>
            </div>
                <div class="table-responsive text-center h_98vh" style={{}}>
                    <table class="table table-striped align-middle table-bordered ">
                        <thead className="sticky-top bg-info">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">IMAGE</th>
                                <th scope="col">PRODUCT_NAME</th>
                                <th scope="col">CATEGORY_NAME</th>
                                <th scope="col">SUBCATEGORY_NAME</th>
                                <th scope="col">SUBSUBCATEGORY_NAME</th>
                                <th scope="col">BRAND_NAME</th>
                                <th scope="col">BUY_QUANTITY</th>
                                <th scope="col">STATUS</th>
                                <th scope="col">SHOPPINGDAY</th>
                                <th scope="col">DELIVERY</th>
                                <th scope="col">DESCRIPTION</th>
                                <th scope="col">EDIT</th>
                                <th scope="col">DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                        {product.map(item => {
                            return <tr>
                                <th scope="row">{item.id}</th>
                                <td>{item.colors[0].image[0].image? <img src={API.substring(0, API.length - 1)+item.colors[0].image[0].image} onClick={(e) =>{ setimage(e.target.src)}}
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"  className="box imgstyle"  style={{"cursor": "pointer",}} alt=""/>:""}</td>
                                <td>{item.productname}</td>
                                <td>{item.categoryname}</td>
                                <td>{item.subcategoryname}</td>
                                <td>{item.subsubcategory}</td>
                                <td>{item.brand}</td>
                                <td>{item.buy_quantity}</td>
                                <td>{item.product_status?"True":"False"}</td>
                                <td>{item.shoppingday?"True":"False"}</td>
                                <td>{item.delivery}</td>
                                <td>{item.imagealt}</td>
                                <td><Link className="btn btn-warning" to={"/admin/editProduct/"+`${item.id}`}>Edit</Link> </td>
                                <td> <button className="btn btn-danger" onClick={()=>{alert("O'CHIRISH MUMKIN EMAS")}}>Delete</button></td>
                            </tr>
                        })}
                            
                        </tbody>
                    </table>
                </div>
                   
                <div className="modal fade" id="exampleModal" >
                <div className="modal-dialog bg-tran d-flex justify-content-center py-0 mb-0 h-100 mt-0">
                        <div className="modal-body bg-tran d-flex justify-content-center py-0 mb-0 h-100 mt-0">
                            <img src={image} className="h_100vh" alt="img"/>
                        </div>
                </div>
            </div>

        </div>
    );
}

export default GetProduct;
