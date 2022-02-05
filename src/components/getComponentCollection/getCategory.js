import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {API} from "../../tools/constans";
import "./css/style.css";
function GetCategory() {
    const [category, setCategory] = useState([]);
    const [deleteItem, setDeleteItem] = useState('');
    const [item, setItem] = useState({});
    const [inputV, setInputV] = useState('');
    const [inputCollection, setInputCollection] = useState({categoryname: "", description: "", image: ''});
    const [images, setImages] = useState({image:null});
    const [image, setImage] = useState('');
    const [showimage,setshowimage] = useState('')

    const [reset, setReset] = useState('');
    const [imageList, setImageList] = useState('');
    const [isImageChoose, setIsImageChoose] = useState(false);
    useEffect(() => {
        axios.get(API+"api/Category/").then((res) => {
                setCategory(res.data)
            }
        )
    }, [])

    const inputImageChanged = (e) => {
        if (e.target.name==="close"){
            setImageList('')
        }
       else {
            setImages({image: e.target.files[0]})
            setImageList(e.target.files[0].name)
            setIsImageChoose(true);
            let files = e.target.files;
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (e) => {
                setImage(e.target.result);
            }
        }
    }

    function deleted() {
        category.forEach(item => {
            if (item.id === deleteItem.id) {
                axios.delete(API+`api/Category/${deleteItem.id}`)
                    .then(res => {
                        axios.get(API+"api/Category/").then((res) => {
                            setCategory(res.data)
                        })
                    })
                setInputV('')
            }
        })
    }

    function inputVal(e) {
        setInputV(e.target.value)
    }

    function editCategory(item) {
        console.log(item)
        setItem(item)
        inputCollection.categoryname = item.categoryname;
        inputCollection.description = item.description;
        inputCollection.image = item.image;

    }

    function handleChange(e) {
        setInputCollection({
            ...inputCollection,
            [e.target.name]: e.target.value
        })

    }

    const {description, categoryname} = inputCollection;

    function addEdit() {

        const form_data = new FormData();
        form_data.append('categoryname', categoryname);
        form_data.append('description', description);
        if(image!==''){
            form_data.append('image', images.image, images.image.name);
        
        }
        else{
            form_data.append('image', '');
        }
        console.log(form_data)
        let url = API+`api/Category/${item.id}/`;
        axios.put(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(res => {
            axios.get(API+"api/Category/").then((res) => {setCategory(res.data)})
        })
        
        
    }

    return (
        <div className="getBrand">
            <div className="container  d-flex align-items-center" style={{height:"70px"}}>
                <Link to={"/admin/addCategory"} className="w-100 d-flex justify-content-end">
                    <button className="btn btn-success">Add Category</button>
                </Link>
            </div>
            <div class="table-responsive text-center h_98vh" style={{}}>
                    <table class="table table-striped align-middle table-bordered ">
                        <thead className="sticky-top bg-info">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Photo</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                        {category.length>0?category.map(item => {
                            return <tr>
                                <th scope="row">{item.id}</th>
                                <td>{item.image? <img src={item.image} onClick={(e) =>{ setshowimage(e.target.src)}}
                                        data-bs-toggle="modal" data-bs-target="#exampleimageModal"  className="box imgstyle"  style={{"cursor": "pointer",}} alt=""/>:""}</td>
                                <td>{item.categoryname}</td>
                                <td>{item.description}</td>
                                <td><button className="btn btn-warning" onClick={() => editCategory(item)}
                                        data-bs-toggle="modal" data-bs-target="#exampleModal">Edit
                                </button>
                                </td>
                                <td> <button className="btn btn-danger"
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop"
                                        onClick={() => setDeleteItem(item)}>Delete
                                </button></td>
                            </tr>
                        }):""}
                            
                        </tbody>
                    </table>
                </div>
   
            <div className="modal fade" id="exampleimageModal" >
                <div className="modal-dialog bg-tran d-flex justify-content-center py-0 mb-0 h-100 mt-0">
                        <div className="modal-body bg-tran d-flex justify-content-center py-0 h-100 mt-0 mb-0">
                            <img src={showimage} className="h_100vh" alt="img"/>
                        </div>
                </div>
            </div>

            {/*edited*/}
            <div className="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="category">
                                <div className="container">
                                    <h2 className="title">Edit Category</h2>
                                    <div className="row">
                                        <div className="col-md-12 category-body">
                                            <div className="form">
                                                <label htmlFor="brand">Category name</label>
                                                <input type="text" id="brand" onChange={handleChange}
                                                       defaultValue={item.categoryname}
                                                       name="categoryname"/>

                                                <label htmlFor="description">Description</label>
                                                <input type="text" id="description" onChange={handleChange}
                                                       defaultValue={item.description}
                                                       name="description"/>

                                                <label htmlFor="image">Image</label>
                                                <input type="file" value={reset} name="logo" id="image" onChange={inputImageChanged} className="img"/>
                                                <div className="box_img">{imageList===''?<img src={item.image} alt="img"/>:<img src={image} alt="img"/>}</div>
                                                <br/>


                                                <button type="button" className="btn btn-secondary d-inline-block " data-bs-dismiss="modal"  name="close" onClick={inputImageChanged}>Close</button>
                                                <button className="btn btn-success d-inline-block mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={addEdit}>Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*delete*/}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="text-center">Delete Category</h4>
                            {/*<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>*/}
                        </div>
                        <div className="modal-body">
                            <h6>
                                Category va uning qo'shimchalari o'chgandan so'ng qaytarib bo'lmaydi.
                                <br/>
                                <b className="bg-secondary text-white p-1"style={{borderRadius: "5px"}}>{deleteItem.categoryname}</b>  uni butunlay
                                oʻchirib tashlamoqchi ekanligingizni tasdiqlang:
                            </h6>

                            <input type="text" className="form-control  mt-2" onChange={inputVal} value={inputV}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                            </button>
                            {inputV === deleteItem.categoryname ?
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

export default GetCategory;
