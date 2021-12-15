import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API} from "../../tools/constans";
function SubCategory() {

    const [inputVal,setInputVal] = useState({category:"",subcategoryname:"",description:""})
    const [response,setResponse] = useState('');
    const [categoryList,setICategoryList] = useState([]);

    function InputVal(e) {
    setInputVal({
        ...inputVal,
        [e.target.name]:e.target.value
    })
}

    function AddInputVal() {
       axios.post(API+"api/Subcategory/",inputVal).then(res=>{
           setResponse(res.statusText)
        
           if(res.statusText==="Created"){
            window.location.replace("/admin/getSubCategory");
        }
        else{
            // Alert(response)
        }
       })
    }

    useEffect(() => {
        axios.get(API+"api/Category/").then(res => {
            setICategoryList(res.data)
        });
    }, []);
    return (
        <div className="subcategory">
            <div className="container">
                <h1 className="title">Add Subcategory <br/>{response}</h1>
                <div className="row">
                    <div className="col-xl-1"/>
                    <div className="col-md-5 subcategory-body">
                        <div className="form">
                            <label htmlFor="category">Category name</label>
                            <select name="category" id="category" onChange={InputVal} >
                                <option disabled selected>Kategoriyani tanlang</option>
                                {categoryList.map(item=>{
                                    return <option value={item.id}>{item.categoryname}</option>
                                })}
                            </select>
                            <label htmlFor="subcategory">Subcategory name</label>
                            <input type="text" onChange={InputVal} name="subcategoryname" id="subcategory"/>
                            <label htmlFor="des">Description</label>
                            <input type="text" name="description" onChange={InputVal} id="des"/>
                            <button onClick={AddInputVal} className="btn btn-success">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubCategory;