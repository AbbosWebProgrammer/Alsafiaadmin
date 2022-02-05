import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {API} from "../../tools/constans";
import "./css/style.css";
import { Alert } from 'bootstrap';
function GetOrderdetail(props) {
const [product,setProduct] = useState([])
const [image,setimage] = useState('')

    useEffect(() => {
        axios.get(API+"api/OrderDetailsByOrderIdView/"+`${window.location.pathname.split('/')[3]}`).then((res) => {
                setProduct(res.data.orders_details)
                console.log(res.data.orders_details)
            }
        )
    },[] );

    // ; window.location.href = '/admin/getBrand'
    // style={{"position":"stick","top":0,"z-index": 10000000}}
    return (
        <div>
            <div className="w-100 d-flex justify-content-end mr-5">
                <button className="btn btn-success mb-4 mr-5">ADD ORDER DETAIL</button>
            </div>
                {/* <Link to={"/"} className="w-100 d-flex justify-content-end mr-5"> <button className="btn btn-success mb-4">ADD ORDER</button></Link> */}

                <div class="table-responsive text-center h_100vh" style={{}}>
                    <table class="table table-striped align-middle table-bordered ">
                        <thead className="sticky-top bg-info">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">PRODUCT_ID</th>
                                <th scope="col">IMAGE</th>
                                <th scope="col">PRODUCT</th>
                                <th scope="col">COLOR</th>
                                <th scope="col">SIZE</th>
                                <th scope="col">CATEGORY</th>
                                <th scope="col">SUBCATEGORY</th>
                                <th scope="col">SUBSUBCATEGORY</th>
                                <th scope="col">BRAND_NAME</th>
                                <th scope="col">QUANTITY</th>
                                <th scope="col">DISCOUNT</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">OLDPRICE</th>
                                <th scope="col">TOTALPRICE</th>    
                            </tr>
                        </thead>
                        <tbody>
                        {product.map(item => {
                            return <tr>
                                {/* style={{"cursor": "pointer",}} */}
                                <th scope="row">{item.id}</th>
                                <th scope="row">{item.productid}</th>
                                <td>{item.image?<img src={API.substring(0, API.length - 1)+item.image} onClick={(e) =>{ setimage(e.target.src)}}
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"  className="box imgstyle"  style={{"cursor": "pointer",}} alt=""/>:""}</td>
                                <td>{item.product}</td>
                                <td>{item.productscolor}</td>
                                <td>{item.productsize}</td>
                                <td>{item.category}</td>
                                <td>{item.subcategory}</td>
                                <td>{item.subsubcategory}</td>
                                <td>{item.brand}</td>
                                <td>{item.quantity}</td>
                                <td>{item.productdiscount}</td>
                                <td>{item.productprice}</td>
                                <td>{item.productoldprice}</td>
                                <td>{item.totalprice}</td>
                            </tr>
                        })}
                            
                        </tbody>
                    </table>
                </div>
                   
                <div className="modal fade" id="exampleModal" >
                <div className="modal-dialog bg-tran d-flex justify-content-center py-0 mt-0">
                        <div className="modal-body bg-tran d-flex justify-content-center py-0 mt-0">
                            <img src={image} className="h_100vh" alt="img"/>
                        </div>
                </div>
            </div>

        </div>
    );
}

export default GetOrderdetail;
