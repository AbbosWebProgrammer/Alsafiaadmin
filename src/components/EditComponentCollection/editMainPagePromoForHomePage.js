import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API} from "../../tools/constans";


function ShoppingDayForHomePageCarousel() {
    const [ImgShow, setImgShow] = useState('');
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [subSubCategory, setSubSubCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [carusel, setcarusel] = useState({});
    const [editcarousel, seteditcarousel] = useState({
        name: '',
        image: '',
        category: [],
        subcategory: [],
        subsubcategory: [],
        brand: []
    });
    useEffect(() => {
        axios.get(API+"api/MainPagePromoForHomePage/"+`${window.location.pathname.split('/')[3]}`).then((res) => {
            setcarusel(res.data)
            editcarousel.category=res.data.category
            editcarousel.subcategory=res.data.subcategory
            editcarousel.subsubcategory=res.data.subsubcategory
            editcarousel.brand=res.data.brand
            setImgShow(res.data.image)
            }
        )
    }, []);
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
        editcarousel.name=e.target.value
    }


    const inputImageChanged=(e) =>{
        let files = e.target.files;
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (e) => {
                editcarousel.image=e.target.result
                setImgShow(e.target.result)

            }
    }
    const inputCategoryChanged=(e) =>{
        let listselected = e.target.selectedOptions 
        const k=[]
        for (let i = 0; i < listselected.length; i++) {
            k.push(parseInt(listselected[i].value)) 
            console.log(parseInt(listselected[i].value))
        }
        editcarousel.category=k
        console.log(editcarousel.category)

    }
    const inputSubcategoryChanged=(e) =>{
        let listselected = e.target.selectedOptions 
        const k=[]
        for (let i = 0; i < listselected.length; i++) {
            k.push(parseInt(listselected[i].value)) 
            console.log(parseInt(listselected[i].value))
        }
        editcarousel.subcategory=k
        console.log(editcarousel.subcategory)
    }
    const inputSubsubcategoryChanged=(e) =>{
        let listselected = e.target.selectedOptions 
        const k=[]
        for (let i = 0; i < listselected.length; i++) {
            k.push(parseInt(listselected[i].value)) 
            console.log(parseInt(listselected[i].value))
        }
        editcarousel.subsubcategory=k
        console.log(editcarousel.subsubcategory)
    }
    const inputBrandChanged=(e) =>{
        editcarousel.brand= parseInt(e.target.value )
    }

    function hompagecarusel(){
        console.log(editcarousel)
        axios.put(API+'api/MainPagePromoForHomePageJson/' +`${window.location.pathname.split('/')[3]}`+'/',{"data":editcarousel}).then(res => {
            window.location.replace("/admin/getMainPagePromoForHomePage/");
        })

    }



    return (
        <div className="container mt-2">
                <div className="row">
                    <div className="col">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" defaultValue={carusel.name} onChange={inputNameChanged}/>
                        
                        <label htmlFor="image">Image</label>
                        <input type="file" name="logo"  onChange={inputImageChanged} id="image"
                                                       className="img"/>
                        <label htmlFor="brand">Brand</label>
                        <select name="brand" id="brand" onChange={inputBrandChanged} className="form-select">
                            {brand.map(item => {
                               return ( carusel.brand===item.id?
                                <option value={item.id} key={item.id} selected={true}>{item.name}</option>
                                :
                                <option value={item.id} key={item.id} >{item.name}</option>
                               )
                                
                            })}
                        </select>

                    </div>
                    <div className="col">
                        {editcarousel.image!==''?
                            <img style={{height:"190px"}} src={editcarousel.image} alt=""/>
                            :
                            <img style={{height:"190px"}} src={carusel.image} alt=""/>
                            }
                    </div>

                </div>
                        
                        <label htmlFor="category">Category</label>
                        <select name="category" id="category" onChange={inputCategoryChanged} className="form-select" multiple={true}>
                            {category.map(item => {
                                return (
                                    carusel.category?
                                        carusel.category.includes(item.id)?
                                        <option key={item.id} value={item.id}  selected={true}>{item.categoryname}</option>
                                        :
                                        <option key={item.id} value={item.id}  >{item.categoryname}</option>
                                    :<option key={item.id} value={item.id}  >{item.categoryname}</option>

                                )
                            })}
                        </select>
                        <label htmlFor="subcategory">Subcategory</label>
                        <select name="subcategory" id="subcategory" onChange={inputSubcategoryChanged} className="form-select" multiple={true}>
                            {subCategory.map(item => {
                               return ( 
                                carusel.subcategory?
                                    carusel.subcategory.includes(item.id)?
                                        <option key={item.id} value={item.id} selected={true}>{item.categoryname} /// {item.subcategoryname} </option>
                                        :
                                        <option key={item.id} value={item.id} >{item.categoryname} /// {item.subcategoryname} </option>
                                    :<option key={item.id} value={item.id} >{item.categoryname} /// {item.subcategoryname} </option>
                                    )})}
                        </select>
                        <label htmlFor="SubSubcategory">Subsubcategory</label>
                        <select name="subsubcategory" id="SubSubcategory" onChange={inputSubsubcategoryChanged} className="form-select" multiple={true}>
                            {subSubCategory.map(item => {
                               return (
                                carusel.subsubcategory?
                                carusel.subsubcategory.includes(item.id)?
                                <option value={item.id} key={item.id} selected={true}>{item.categoryname} /// {item.subcategoryname} /// {item.subsubcategoryname}</option>
                                :
                                <option value={item.id} key={item.id}>{item.categoryname} /// {item.subcategoryname} /// {item.subsubcategoryname}</option>
                                :<option value={item.id} key={item.id}>{item.categoryname} /// {item.subcategoryname} /// {item.subsubcategoryname}</option>
                                
                                )})}
                        </select>
                        
                        {/* {editcarousel.name.length!==0 && editcarousel.image.length!==0? */}
                            <button className="btn btn-info float-end w-25 mt-2" name="quantity" onClick={hompagecarusel}>send</button>
                            {/* : */}
                            {/* <button className="btn btn-info float-end w-25 mt-2 " disabled style={{opacity: ".5"}}>send</button> */}
                        {/* } */}
                        
            </div>

    );
}

export default ShoppingDayForHomePageCarousel;
