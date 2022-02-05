import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {API} from "../../tools/constans";
import "./css/style.css";
import { Divider } from 'antd';
function HomePagePromoSlider() {
    const [carousel, setCarusel] = useState([]);
    const [deleteItem, setDeleteItem] = useState('');
    const [item, setItem] = useState('');
    const [inputV, setInputV] = useState('');
    const [inputCollection, setInputCollection] = useState({categoryname: "", description: "", image: ''});
    const [image,setimage] = useState('')

    useEffect(() => {
        axios.get(API+"api/MainPagePromoForHomePageSlider/").then((res) => {
                setCarusel(res.data)
                console.log(res.data)
            }
        )
    }, [])

    function deleted() {
        carousel.forEach(item => {
            if (item.id === deleteItem.id) {
                axios.delete(API+`api/MainPagePromoForHomePageSlider/${deleteItem.id}`)
                    .then(res => {
                        console.log(res)
                    })
                setInputV('')
            }
        })
    }

    function inputVal(e) {
        setInputV(e.target.value)
    }

    return (
        <div className="getBrand">
            <div className="container  d-flex align-items-center" style={{height:"70px"}}>
                <Link to={"/admin/addMainPagePromoForHomePageSlider"} className="w-100 d-flex justify-content-end">
                    <button className="btn btn-success">Add Home Page Promo Slider</button>
                </Link>
            </div>
            <div class="table-responsive text-center h_98vh" style={{}}>
                    <table class="table table-striped align-middle table-bordered ">
                        <thead className="sticky-top bg-info">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Photo</th>
                                <th scope="col">Name</th>
                                <th scope="col">Brand</th>
                                <th scope="col">Category</th>
                                <th scope="col">Subcategory</th>
                                <th scope="col">Subsubcategory</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                        {carousel.length>0?carousel.map(item => {
                            return <tr>
                                <th scope="row">{item.id}</th>
                                <td>{item.image? <img src={item.image} onClick={(e) =>{ setimage(e.target.src)}}
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"  className="box imgstyle"  style={{"cursor": "pointer",}} alt=""/>:""}</td>
                                <td>{item.name}</td>
                                <td>{item.brand}</td>
                                <td>{item.category.map((cat)=>{
                                    return <div className="d-blok">{cat}<hr/></div>})}
                                </td>
                                <td>{item.subcategory.map((cat)=>{
                                    return <div className="d-blok">{cat}<hr/></div>})}
                                </td>
                                <td>
                                    {item.subsubcategory.map((cat)=>{
                                    return(<div className="d-blok">{cat}<hr/></div>) })}
                                </td>
                                <td><Link className="btn btn-warning" to={"/admin/editMainPagePromoForHomePageSlider/"+`${item.id}`}>Edit</Link></td>
                                <td><button className="btn btn-danger"
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop"
                                        onClick={() => setDeleteItem(item)}>Delete
                                </button></td>
                            </tr>
                        }):""}
                            
                        </tbody>
                    </table>
                </div>
   
            <div className="modal fade" id="exampleModal" >
                <div className="modal-dialog bg-tran d-flex justify-content-center py-0 mb-0 h-100 mt-0">
                        <div className="modal-body bg-tran d-flex justify-content-center py-0 h-100 mt-0 mb-0">
                            <img src={image} className="h_100vh" alt="img"/>
                        </div>
                </div>
            </div>
            
            {/*delete*/}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="text-center">Delete Home Page Promo Slider</h4>
                            {/*<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>*/}
                        </div>
                        <div className="modal-body">
                            <h6>
                            Home Page Promo Slider va uning qo'shimchalari o'chgandan so'ng qaytarib bo'lmaydi.
                                <br/>
                                <b className="bg-secondary text-white p-1" style={{borderRadius: "5px"}}> {deleteItem.name}</b>  uni butunlay
                                oʻchirib tashlamoqchi ekanligingizni tasdiqlang:
                            </h6>

                            <input type="text" className="form-control  mt-2" onChange={inputVal} value={inputV}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                            </button>
                            {inputV === deleteItem.name ?
                                <button className="btn btn-danger" onClick={deleted}
                                        data-bs-dismiss="modal">Delete</button> :
                                <button className="btn btn-danger" data-bs-dsmiss="modal" disabled>Delete</button>}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default HomePagePromoSlider;
