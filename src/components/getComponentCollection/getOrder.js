import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {API} from "../../tools/constans";
import "./css/style.css";
import { Alert } from 'bootstrap';
import { SyncOutlined } from '@ant-design/icons';
function GetOrder(props) {
const [orders,setOrders] = useState([])
const [statusvalue,setstatusvalue] = useState('')
const [oderid, setorderid] = useState('')
const [oderstatus, setorderstatus] = useState('')
const [buyutmaqabulqilindi, setbuyutmaqabulqilindi] = useState(true)
const [buyutmajunatildi, setbuyutmajunatildi] = useState(true)
const [buyutmayetkazildi, setbuyutmayetkazildi] = useState(false)
const [buyutmabekorqilindi, setbuyutmabekorqilindi] = useState(false)
const [checkedlist,setcheckedlist] = useState(["Buyurtma jo'natildi","Buyurtma qabul qilindi"])


    useEffect(() => {
        axios.get(API+"api/Order/").then((res) => {
                setOrders(res.data.orders)
            console.log(res.data.orders)
            }
        )
    },[] );
    function InputStatusValue(e) {
        console.log(e.target.value)
        setstatusvalue(e.target.value)    
    }
    function addPut() {
        axios.put(API+"api/Order/"+`${oderid}`+'/',{"status":statusvalue}).then((res) => {
            console.log(res.data)
        })

        axios.get(API+"api/Order/").then((res) => {
            setOrders(res.data.orders)
        console.log(res.data.orders)
        }
    )

        console.log("slnlknjkjnk")

    }
    function arrayRemove(arr, value) { 
    
        return arr.filter(function(ele){ 
            return ele != value; 
        });
    }
    function Resreshdata(e){
        axios.get(API+"api/Order/").then((res) => {
            setOrders(res.data.orders)
        console.log(res.data.orders)
        }
    )
    }
    function Inputchecked(e) {
        if(e.target.name==="Buyurtma qabul qilindi"){
            if(!buyutmaqabulqilindi===false){
                setcheckedlist(arrayRemove(checkedlist,"Buyurtma qabul qilindi"))
            }
            if(!buyutmaqabulqilindi===true)
                checkedlist.push("Buyurtma qabul qilindi")
            setbuyutmaqabulqilindi(!buyutmaqabulqilindi)
            console.log(checkedlist)    
        }    
        if(e.target.name==="Buyurtma jo'natildi"){
            if(!buyutmajunatildi===false){
                setcheckedlist(arrayRemove(checkedlist,"Buyurtma jo'natildi"))
            }
            if(!buyutmajunatildi===true)
                checkedlist.push("Buyurtma jo'natildi")
            setbuyutmajunatildi(!buyutmajunatildi)
            console.log(checkedlist) 
        } 
        if(e.target.name==="Buyurtma bekor qilindi"){
            if(!buyutmabekorqilindi===false){
                setcheckedlist(arrayRemove(checkedlist,"Buyurtma bekor qilindi"))
            }
            if(!buyutmabekorqilindi===true)
                checkedlist.push("Buyurtma bekor qilindi")
            setbuyutmabekorqilindi(!buyutmabekorqilindi)
            console.log(checkedlist) 
        } 
        if(e.target.name==="Buyurtma yetkazildi"){
            if(!buyutmayetkazildi===false){
                setcheckedlist(arrayRemove(checkedlist,"Buyurtma yetkazildi"))
            }
            if(!buyutmayetkazildi===true)
                checkedlist.push("Buyurtma yetkazildi")
            console.log(checkedlist) 
            setbuyutmayetkazildi(!buyutmayetkazildi)
        } 


    }
    // ; window.location.href = '/admin/getBrand'
    // style={{"position":"stick","top":0,"z-index": 10000000}}

    return (
        <div>
            <div className="container d-flex align-items-center" style={{height:"70px"}}>
                <div className="w-100 mb-4 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center text-white bg-warning p-1 rounded">
                        <label htmlFor="Buyurtma qabul qilindi" className="me-2">Buyurtma qabul qilindi</label>
                        <input type="checkbox" style={{height:"20px", width:"20px"}} id="Buyurtma qabul qilindi" checked={buyutmaqabulqilindi} name="Buyurtma qabul qilindi" onChange={Inputchecked} className="box"/>
                    </div>
                    <div className="d-flex align-items-center bg-info text-white p-1 rounded">
                        <label htmlFor="Buyurtma jo'natildi" className="me-2">Buyurtma jo'natildi</label>
                        <input type="checkbox" style={{height:"20px", width:"20px"}} id="Buyurtma jo'natildi" checked={buyutmajunatildi} name="Buyurtma jo'natildi" onChange={Inputchecked} className="box"/>
                    </div>
                    <div  className="d-flex align-items-center text-white p-1 bg-success rounded">
                        <label htmlFor="Buyurtma yetkazildi" className="me-2">Buyurtma yetkazildi</label>
                        <input type="checkbox" style={{height:"20px", width:"20px"}} id="Buyurtma yetkazildi" checked={buyutmayetkazildi} name="Buyurtma yetkazildi" onChange={Inputchecked} className="box"/>
                    </div>
                    <div className="d-flex align-items-center bg-danger text-white p-1 rounded">
                        <label htmlFor="Buyurtma bekor qilindi" className="me-2">Buyurtma bekor qilindi</label>
                        <input type="checkbox" style={{height:"20px", width:"20px"}} id="Buyurtma bekor qilindi" checked={buyutmabekorqilindi} name="Buyurtma bekor qilindi" onChange={Inputchecked} className="box"/>
                    </div>
                    <div style={{background:"#5bafcfd9",cursor:'pointer'}} onClick={Resreshdata} className="d-flex align-items-center text-white p-1 rounded">
                        <SyncOutlined className="reg_icon" />
                    </div>          
                    <button className="btn btn-success">ADD ORDER</button>
                </div>
            {/* <Link to={"/"} className="w-100 d-flex justify-content-end mr-5"> <button className="btn btn-success mb-4">ADD ORDER</button></Link> */}
            </div>
                <div class="table-responsive text-center h_98vh" style={{}}>
                    <table class="table table-striped align-middle table-bordered ">
                        <thead className="sticky-top bg-info">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">PHONE</th>
                                <th scope="col">FIRSTNAME</th>
                                <th scope="col">LASTNAME</th>
                                <th scope="col">EMAIL</th>
                                <th scope="col">CITY</th>
                                <th scope="col">DISTICT</th>
                                <th scope="col">STREET</th>
                                <th scope="col">ORDER_STATUS</th>
                                <th scope="col">QUANTITY</th>
                                <th scope="col">DIFFERENT</th>
                                <th scope="col">TOTALPRICE</th>
                                <th scope="col">DAY</th>
                                <th scope="col">TIME</th>
                                <th scope="col">SUPPORTED</th>
                                <th scope="col">PRODUCTS</th>
                                <th scope="col">VENDORADD</th>
                                <th scope="col">VENDOR_PHONE</th>
                                <th scope="col">VENDOR_FIRSTNAME</th>
                                <th scope="col">VENDOR_LASTNAME</th>
                            </tr>
                        </thead>
                        <tbody>

                            {orders.map(item => {
                                
                                return  checkedlist.includes(item.status)?
                                <tr>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.phone}</td>
                                    <td>{item.firstname}</td>
                                    <td>{item.lastname==="None"?'':item.lastname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.city==="None"?'':item.city}</td>
                                    <td>{item.district==="None"?'':item.district}</td>
                                    <td>{item.street==="None"?'':item.street}</td>
                                    <td>                            
                                        {
                                            item.status=="Buyurtma jo'natildi"?
                                                <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {setorderid(item.id);setorderstatus(item.status)}}>{item.status}</button>
                                                :
                                                item.status=="Buyurtma yetkazildi"?
                                                    <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {setorderid(item.id);setorderstatus(item.status)}}>{item.status}</button>
                                                    :
                                                    item.status=="Buyurtma bekor qilindi"?
                                                        <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {setorderid(item.id);setorderstatus(item.status)}}>{item.status}</button>
                                                        :
                                                        <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {setorderid(item.id);setorderstatus(item.status)}}>{item.status}</button>
                                        }
                                        
                                    </td>
                                    <td>{item.quantity}</td>
                                    <td>{item.productstypequantity}</td>
                                    <td>{item.sum}</td>
                                    <td>{item.day}</td>
                                    <td>{item.time}</td>
                                    <td>{item.supported?"TRUE":"FALSE"}</td>
                                    <td><Link className="btn btn-primary" to={"/admin/getOrderDetailByOrderID/"+`${item.id}`}>View</Link> </td>
                                    <td>{item.vendoradd?"TRUE":"FALSE"}</td>
                                    <td>{item.vendorphone}</td>
                                    <td>{item.vendorfirstname}</td>
                                    <td>{item.vendorlastname}</td>
                                </tr>
                                :""
                        })}
                            
                        </tbody>
                    </table>
                </div>
                   
                <div className="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="category">
                                <div className="container">
                                    <h2 className="title">EDIT STATUS</h2>
                    
                                        <div className="category-body">
                                            <>
                                           
                                            <select onChange={InputStatusValue} className="form-control d-blok mb-5"  id="status">
                                                {oderstatus=="Buyurtma qabul qilindi"?<option selected={true} value="Buyurtma qabul qilindi">Buyurtma qabul qilindi</option>:<option value="Buyurtma qabul qilindi">Buyurtma qabul qilindi</option>}
                                                {oderstatus=="Buyurtma jo'natildi"?<option selected={true} value="Buyurtma jo'natildi">Buyurtma jo'natildi</option>:<option value="Buyurtma jo'natildi">Buyurtma jo'natildi</option>}
                                                {oderstatus=="Buyurtma yetkazildi"?<option selected={true} value="Buyurtma yetkazildi">Buyurtma yetkazildi</option>:<option value="Buyurtma yetkazildi">Buyurtma yetkazildi</option>}
                                                {oderstatus=="Buyurtma bekor qilindi"?<option selected={true} value="Buyurtma bekor qilindi">Buyurtma bekor qilindi</option>:<option value="Buyurtma bekor qilindi">Buyurtma bekor qilindi</option>}
                                            </select>
 
                                                <button className="btn btn-success d-inline-block mx-3"
                                                        data-bs-dismiss="modal"
                                                        onClick={addPut}>Submit
                                                </button>
                                                <button className="float-end btn btn-success d-inline-block mx-3"
                                                        data-bs-dismiss="modal"
                                                        >CANSEL
                                                </button>
                                            </>
                                        </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

  




        </div>
    );
}

export default GetOrder;
