import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API} from "../../tools/constans";


function MainPagePromo() {
    
    const [ImgShow, setImgShow] = useState('');
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [subSubCategory, setSubSubCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [addcarousel, setaddcarousel] = useState({
        name: '',
        image: '',
        category: [],
        subcategory: [],
        subsubcategory: [],
        brand: '',

    });
    useEffect(() => {
        axios.get(API+"api/Category/").then((res) => {
                setCategory(res.data)
                // console.log(res.data)
            }
        )
    }, []);
    useEffect(() => {
        axios.get(API+"api/Subcategory/").then((res) => {
            setSubCategory(res.data)
            // console.log(res.data)

        })
    }, []);
    useEffect(() => {
        axios.get(API+"api/Subsubcategory/").then((res) => {
                setSubSubCategory(res.data)
            }
        )
    }, []);
    useEffect(() => {
        axios.get(API+"api/Brand/").then((res) => {
            setBrand(res.data)
        })
    }, []);

    const inputNameChanged = (e) => {
        addcarousel.name=e.target.value
    }


    const inputImageChanged=(e) =>{
        addcarousel.image=e.target.files[0]
        let files = e.target.files;
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (e) => {
                setImgShow(e.target.result)
                addcarousel.image=e.target.result
            }
    }
    const inputCategoryChanged=(e) =>{
        let listselected = e.target.selectedOptions 
        const k=[]
        for (let i = 0; i < listselected.length; i++) {
            k.push(parseInt(listselected[i].value)) 
            console.log(parseInt(listselected[i].value))
        }
        addcarousel.category=k
        console.log(addcarousel.category)

    }
    const inputSubcategoryChanged=(e) =>{
        let listselected = e.target.selectedOptions 
        const k=[]
        for (let i = 0; i < listselected.length; i++) {
            k.push(parseInt(listselected[i].value)) 
            console.log(parseInt(listselected[i].value))
        }
        addcarousel.subcategory=k
        console.log(addcarousel.subcategory)
    }
    const inputSubsubcategoryChanged=(e) =>{
        let listselected = e.target.selectedOptions 
        const k=[]
        for (let i = 0; i < listselected.length; i++) {
            k.push(parseInt(listselected[i].value)) 
            console.log(parseInt(listselected[i].value))
        }
        addcarousel.subsubcategory=k
        console.log(addcarousel.subsubcategory)
    }
    const inputBrandChanged=(e) =>{
        let listselected = parseInt(e.target.value)
        addcarousel.brand = listselected
        console.log(addcarousel.brand)
    }

    function hompagecarusel(){
        axios.post(API+'api/MainPagePromoForHomePageJson/',{"data":addcarousel}).then(res => {
            console.log(res.data);
            window.location.replace("/admin/getMainPagePromoForHomePage/");
        })
        console.log(addcarousel)
    }



    return (
            <div className="container">
            <h1 className="title mt-3 text-center">Add MainPagePromoForHomePage</h1>

                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name"  onChange={inputNameChanged}/>
                        
                        <label htmlFor="image">Image</label>
                        <input type="file" name="logo" onChange={inputImageChanged} id="image"  className="img"/>

                        <label htmlFor="brand">Brand</label>
                        <select name="brand" id="brand" onChange={inputBrandChanged} className="form-select  mb-3">
                            {brand.map(item => {
                                return <option value={item.id} key={item.id}>{item.name}</option>
                            })}
                        </select>

                    </div>
                    <div className="col">
                        <img style={{height:"198px"}} src={ImgShow} alt=""/>
                    </div>

                </div>
                        <label htmlFor="category">Category</label>
                        <select name="category" id="category" onChange={inputCategoryChanged} className="form-select  mb-3" multiple={true}>
                            {category.map(item => {
                                return <option key={item.id} value={item.id}>{item.categoryname}</option>
                            })}
                        </select>
                        <label htmlFor="subcategory">Subcategory</label>
                        <select name="subcategory" id="subcategory" onChange={inputSubcategoryChanged} className="form-select  mb-3" multiple={true}>
                            {subCategory.map(item => {
                                return <option key={item.id} value={item.id}>{item.categoryname} /// {item.subcategoryname} </option>
                            })}
                        </select>
                        <label htmlFor="SubSubcategory">Subsubcategory</label>
                        <select name="subsubcategory" id="SubSubcategory" onChange={inputSubsubcategoryChanged} className="form-select  mb-3" multiple={true}>
                            {subSubCategory.map(item => {
                                return <option value={item.id} key={item.id}>{item.categoryname} /// {item.subcategoryname} /// {item.subsubcategoryname}</option>
                            })}
                        </select>
                        {addcarousel.name.length!==0 && addcarousel.image.length!==0?
                            <button className="btn btn-info float-end w-25 mt-2" name="quantity" onClick={hompagecarusel}>send</button>
                            :
                            <button className="btn btn-info float-end w-25 mt-2 " disabled style={{opacity: ".5"}}>send</button>
                        }
                        
            </div>
    );
}

export default MainPagePromo;
