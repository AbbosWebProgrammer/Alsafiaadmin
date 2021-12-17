import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Multiselect} from "multiselect-react-dropdown";
import {API} from "../../tools/constans";


function ShoppingDayForHomePageCarousel(props) {
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [subSubCategory, setSubSubCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [s, setS] = useState([]);
    const [addcarousel, setaddcarousel] = useState({
        category: [],
        subcategory: [],
        subsubcategory: [],
        brand: [],
        name: '',
        image: null,

    });
    const inputImageChanged=(e) =>{
        this.setState({image: e.target.files[0]})
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            this.setState({ImgShow: e.target.result})
        }

    }




    useEffect(() => {
        axios.get(API+"api/Category/").then((res) => {
                setCategory(res.data)
            }
        )
    }, []);
    useEffect(() => {
        axios.get(API+"api/Subcategory/").then((res) => {
            setSubCategory(res.data)
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
    }, [category]);

    function d(e) {
        if (s.length === 0) {
            s.push(e.target.value)
        } else {
            s.map((item, index) => {
                if (item === e.target.value) {
                    s.splice(index, 1)
                    setS(s)
                }
                else {
                    setS(
                        s.concat(e.target.value)
                    )
                }
            })
        }
    }
    function hompagecarusel(){
        console.log(s)
    }
    function addhompagecarusel(){
        console.log(s)
    }


    return (
        <div className="ShoppingDayForHomePageCarousel">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name"/>
                        <label htmlFor="image">Image</label>
                        <input type="file" onchange={inputImageChanged} id="image" name="image"/>

                        <label htmlFor="category">Category</label>
                        <select name="category" id="category" onClick={d} onChange={addhompagecarusel} className="form-select" multiple={true}>
                            {category.map(item => {
                                return <option key={item.id} value={item.id}>{item.categoryname}</option>
                            })}
                        </select>
                        <label htmlFor="subcategory">Subcategory</label>
                        <select name="subcategory" id="subcategory" onChange={addhompagecarusel} className="form-select" multiple={true}>
                            {subCategory.map(item => {
                                return <option key={item.id} value={item.id}>{item.subcategoryname}</option>
                            })}
                        </select>
                        <label htmlFor="SubSubcategory">Subsubcategory</label>
                        <select name="subsubcategory" id="SubSubcategory" onChange={addhompagecarusel} className="form-select" multiple={true}>
                            {subSubCategory.map(item => {
                                return <option value={item.id} key={item.id}>{item.subsubcategoryname}</option>
                            })}
                        </select>
                        <label htmlFor="brand">Brand</label>
                        <select name="brand" id="brand" onChange={addhompagecarusel} className="form-select" multiple={true}>
                            {brand.map(item => {
                                return <option value={item.id} key={item.id}>{item.name}</option>
                            })}
                        </select>
                        <button className="btn btn-info float-end w-25 mt-2" name="quantity" onClick={hompagecarusel}>send</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ShoppingDayForHomePageCarousel;
