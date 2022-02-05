import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {API} from "../../tools/constans";
import "./css/style.css";
function GetBrand() {

    const [brand, setBrand] = useState([]);
    const [item, setItem] = useState('');
    const [images, setImages] = useState({image: null});
    const [image, setImage] = useState('');
    const [showimage,setshowimage] = useState('')
    const [imageList, setImageList] = useState('');
    const [reset, setReset] = useState('');
    const [edit, setEdit] = useState({image: "", name: "", description: ""})
    const [inputV, setInputV] = useState('')
    const [deletes, setDeletes] = useState('')
    useEffect(() => {
        axios.get(API+"api/Brand/").then((res) => {
            setBrand(res.data)
        })
    }, []);
    /* useEffect(() => {
         axios.get(API+"api/Brand/").then((res) => {
             setBrand(res.data)
         })
     }, [handleDelete]);*/
    const inputImageChanged = (e) => {
        if (e.target.name === 'close') {
            setImageList('');
        } else {
            setImages({image: e.target.files[0]});
            setImageList(e.target.files[0].name);
            let files = e.target.files;
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (e) => {
                setImage(e.target.result);
            }
        }

    }
    const {name, description} = edit;

    function editBrand(id) {
        brand.map(item => {
            if (item.id === id) {
                setItem(item)
                edit.name = item.name;
                edit.description = item.description;
                edit.image = null;
            }

        })
    }

    function changeValue(e) {
        setEdit(
            {
                ...edit,
                [e.target.name]: e.target.value
            }
        )
    }

    //put request
    function addPut() {
        const form_data = new FormData();
        form_data.append('name', name);
        form_data.append('description', description);
        if(image!==''){
            form_data.append('image', images.image, images.image.name);
        
        }
        else{
            form_data.append('image', '');
        }
        let url = API+`api/Brand/${item.id}/`;
        axios.put(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(res => {
            axios.get(API+"api/Brand/").then((res) => {
                setBrand(res.data)
            })
        })
        
    }

    function inputVal(e) {
        setInputV(e.target.value);
    }

    function handleDelete() {
        brand.forEach(items => {
            if (items.id === deletes.id) {
                axios.delete(API+`api/Brand/${deletes.id}`)
                    .then(res => {
                        axios.get(API+"api/Brand/").then((res) => {
                            setBrand(res.data)
                        })
                    })
                setInputV('')
            }
        })

    }


    return (
        <div className="getBrand">
            <div className="container  d-flex align-items-center" style={{height:"70px"}}>
                <Link to={"/admin/addBrand"} className="w-100 d-flex justify-content-end">
                    <button className="btn btn-success">Add Brand</button>
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
                        {brand.length>0?brand.map(item => {
                            return <tr>
                                <th scope="row">{item.id}</th>
                                <td>{item.image? <img src={item.image} onClick={(e) =>{ setshowimage(e.target.src)}}
                                        data-bs-toggle="modal" data-bs-target="#exampleimageModal"  className="box imgstyle"  style={{"cursor": "pointer",}} alt=""/>:""}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td><button className="btn btn-warning" onClick={() => editBrand(item.id)}
                                        data-bs-toggle="modal" data-bs-target="#exampleModal">Edit
                                    </button>
                                </td>
                                <td> <button className="btn btn-danger" data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop" onClick={() => setDeletes(item)}>Delete
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

            <div className="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="category">
                                <div className="container">
                                    <h2 className="title">Edit Brand</h2>
                                    <div className="row">
                                        <div className="col-md-12 category-body">
                                            <>
                                                <label htmlFor="brand">Brand name</label>
                                                <input type="text" id="brand" name="name" onChange={changeValue}
                                                       defaultValue={item.name}/>
                                                <label htmlFor="description">Description</label>
                                                <input type="text" id="description" onChange={changeValue}
                                                       defaultValue={item.description} name="description"/>

                                                <label htmlFor="image">Image</label>
                                                <input type="file" name="logo" value={reset} onChange={inputImageChanged} id="image"
                                                       className="img"/>
                                                <div className="box_img">{imageList === '' ?
                                                    <img src={item.image} alt="img"/> :
                                                    <img src={image} alt="img"/>}</div>
                                                <br/>
                                                <button type="button" className="btn btn-secondary d-inline-block "
                                                        name="close" onClick={inputImageChanged}
                                                        data-bs-dismiss="modal">Close
                                                </button>
                                                <button className="btn btn-success d-inline-block mx-3"
                                                        data-bs-dismiss="modal"
                                                        onClick={addPut}>Submit
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
                                <b className="bg-secondary text-white p-1" style={{borderRadius: "5px"}}>{deletes.name}</b>  uni butunlay oʻchirib tashlamoqchi ekanligingizni tasdiqlang:
                            </h6>

                            <input type="text" className="form-control  mt-2" onChange={inputVal} value={inputV}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {inputV === deletes.name ?
                                <button className="btn btn-danger" onClick={handleDelete}
                                        data-bs-dismiss="modal">Delete</button> :
                                <button className="btn btn-danger" disabled>Delete</button>}
                        </div>
                    </div>
                </div>
            </div>
       
        </div>
    );
}

export default GetBrand;
