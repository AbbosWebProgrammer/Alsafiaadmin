import React, {useState} from 'react';
import axios from "axios";
import {API} from "../../tools/constans";
function ChooseImg(props) {
    const [imagesList,setImagesList] = useState([]);
    const [valueReset,setValueReset] = useState('');
    const [category,setCategory] = useState({category_name:'', description:''});
//allCollection post
//     let allCollection ={
//         category:category,
    // imagesList:imagesList
    // }
//imgCollection
    function imgCollection(e){
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            let newImg={content_type: "IMAGE", data: e.target.result, id:Date.now()}
            setImagesList(
                imagesList.concat(newImg)
            );
            setValueReset('')
        }
    }

//input value
    function changeInput(e) {
        setCategory({
            ...category,
            [e.target.name] : e.target.value,
        })
    }

//add category axios post
    function addCategory() {
        console.log(category)
        axios.post(API+"/api/Category/",category)
            .then((res)=>{
                console.log(res)
            }).catch((error)=>{
            console.log(error)
        })
    }









    return (

        <div className="category">
            <div className="container">
                <h1 className="title">Add Category</h1>
                <p>{JSON.stringify(category)}</p>
                <div className="row">
                    <div className="col-xl-1"/>
                    <div className="col-md-5 category-body">
                        <div className="form">
                            <label htmlFor="category">Category name</label>
                            <input type="text" id="category" name="category_name" onChange={changeInput}/>
                            <label htmlFor="description">Description</label>
                            <input type="text" id="description" name="description" onChange={changeInput}/>
                            <label htmlFor="image">Image</label>
                            <input  type="file" value={valueReset} onChange={imgCollection} id="image" className="img"/>
                            <button onClick={addCategory} className="btn btn-success">Submit</button>
                        </div>
                    </div>
                    <div className="col-md-5 ">
                        <div className="img-block">
                            { imagesList.map((item)=>{
                                return <div key={item.id} className="box" style={{width:"47%",margin:"5px"}}>
                                    <img style={{width:"100%"}} src={item.data} alt=""/>
                                </div>
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChooseImg;
