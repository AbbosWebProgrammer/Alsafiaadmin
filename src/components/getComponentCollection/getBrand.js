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
            console.log(res);
        })
        axios.get(API+"api/Brand/").then((res) => {
            setBrand(res.data)
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
                        console.log(res)
                    })
                setInputV('')
            }
        })
        axios.get(API+"api/Brand/").then((res) => {
            setBrand(res.data)
        })
    }


    return (
        <div className="getBrand">
            <div className="container">
                <Link to={"/admin/addBrand"} className="w-100 d-flex justify-content-end">
                    <button className="btn btn-success mb-4">Add Brand</button>
                </Link>
                <div className="title">
                    <div className="row nav">
                        <div className="col-md-1 li">T/r</div>
                        <div className="col-md-2 li">Brand</div>
                        <div className="col-md-3 li">Name</div>
                        <div className="col-md-4 li">Description</div>
                        <div className="col-md-1 li">Edit</div>
                        <div className="col-md-1 li">Delete</div>
                    </div>
                </div>
                <div className="menu">
                    {brand.map((item, index) => {
                        return <div className="row nav" key={item.id}>
                            <div className="col-md-1 nav-item">{index + 1}</div>
                            <div className="col-md-2 nav-item"><img src={item.image} alt="logo"/></div>
                            <div className="col-md-3 nav-item">{item.name}</div>
                            <div className="col-md-4 nav-item">{item.description}</div>
                            <div className="col-md-1 nav-item">
                                <button className="btn btn-warning" onClick={() => editBrand(item.id)}
                                        data-bs-toggle="modal" data-bs-target="#exampleModal">Edit
                                </button>
                            </div>
                            <div className="col-md-1 nav-item">
                                <button className="btn btn-danger" data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop" onClick={() => setDeletes(item)}>Delete
                                </button>
                            </div>
                        </div>
                    })}

                </div>
            </div>
            <div className="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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

            {/*    delete*/}
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
                                   style={{borderRadius: "5px"}}> {deletes.name}
                                </b>
                                uni butunlay
                                oʻchirib tashlamoqchi ekanligingizni tasdiqlang:
                            </h6>

                            <input type="text" className="form-control  mt-2" onChange={inputVal} value={inputV}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                            </button>
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
