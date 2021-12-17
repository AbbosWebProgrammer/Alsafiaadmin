import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API} from "../../tools/constans";
import "./css/style.css";

function Product(props) {
    //start get request
    const [getCategoryName, setGetCategoryName] = useState([]);
    const [getSubCategoryName, setGetSubCategoryName] = useState([]);
    const [getSubSubCategoryName, setGetSubSubCategoryName] = useState([]);
    const [getBrandName, setGetBrandName] = useState([]);
    //end get request
    // starts from category and ends in status
    
//////////////////////Product/////////////////////////////////////
     const [inputValCollection, setInputValCollection] = useState({
        category: "",
        subcategory: "",
        subsubcategory: "",
        brand: "",
        name: "",
        price: "",
        oldprice:"",
        delivery: "",
        generalinformation:"",
        shopping: true,
        sameprice:true,
        status: true,
        notsizeproduct:false,
        colorless: true,
        colors:[],
        description:[],
        additions:[]
    });
///////////////////////////////////////////////////////////

///////////////size////////////////////////////////////////////
const [size, setSize] = useState('');
const [quantity, setQuantity] = useState('');
const [addSizeQuantityCollect, setAddSizeQuantityCollect] = useState([]);
////////////////////////////////////////////////////////////////

///////////////////////image////////////////////////////////////
const [valueReset, setValueReset] = useState('');
const [imagesList, setImagesList] = useState([]);
///////////////////////////////////////////////////////////


//////////////////////color/////////////////////////////////////
 const [Colorname, setColorname] = useState('');
 const [Colorprice, setColorprice] = useState(0);
 const [Coloroldprice, setColoroldprice] = useState(0);
 const [Colorallquantity, setColorallquantity] = useState(0);
 const [AllColors, setAllColors] = useState([]);
///////////////////////////////////////////////////////////



    



///////////////description///////////////////////////////////////////////////
    const [descriptionName, setDescriptionName] = useState('');
    const [description, setDescription] = useState('');
    const [allDescriptionCollect, setAllDescriptionCollect] = useState([]);
///////////////////////////////////////////////////////////////////////////////   
    
    
///////////////////////////////////////////////////////////////////////////////   
    const [ProductCaption, setProdutCaption] = useState('');
    const [ProductTitle, setProductTitle] = useState('');
    const [ProductParamDescription, setProductParamDescription] = useState('');
    const [allProductParamDescriptions, setAllProductParamDescriptions] = useState([]);
    const [allProductParams, setAllProductParams] = useState([]);


/////////////////////////////////////////////////////////////////////////////// 
const [CheckProductInfo, setCheckProdutInfo] = useState(false);

    // get category
    useEffect(() => {
        axios.get(API+"api/Category/").then(res => {
            setGetCategoryName(res.data)
        });
    }, []);
    // get brand
    useEffect(() => {
        axios.get(API+'api/Brand/').then(res => {
            setGetBrandName(res.data)
        })
    }, []);

 
    function InputValueCollection(e) {
        if (e.target.name === "category") {
            axios.get(API+'api/SubcategoryByCategoryId/' + e.target.value).then(response => {
                setGetSubCategoryName(response.data)
            });
            inputValCollection.subcategory=''
            inputValCollection.subsubcategory=''

        }
        if (e.target.name === "subcategory") {
            axios.get(API+'api/SubsubcategoryBySubcategorId/' + e.target.value).then(res => {
                setGetSubSubCategoryName(res.data)
            })
            inputValCollection.subsubcategory=''
        }
        setInputValCollection({
            ...inputValCollection,
            [e.target.name]: e.target.value
        });
        
        if (e.target.type ==="checkbox") {
            setInputValCollection({
                ...inputValCollection,
                [e.target.name]: e.target.checked
            });
            if (e.target.name ==="notsizeproduct" && e.target.checked===true){
                setColorallquantity(0);
            }

        }

    }

    
    function imgCollection(e) {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            let newImg = {content_type: "IMAGE", data: e.target.result, id: Date.now()}
            setImagesList(
                imagesList.concat(newImg)
            );
            setValueReset('')

        }

    }


    function SizeQuantityCollect(e) {
        if (e.target.name === "size")
            setSize(e.target.value)
        else if (e.target.name === "quantity")
            setQuantity(e.target.value)
        else if (e.target.name === "description")
            setDescription(e.target.value)
        else if (e.target.name === "descriptionName")
            setDescriptionName(e.target.value)
        else if (e.target.name === "ProductTitle")
            setProductTitle(e.target.value)
        else if (e.target.name === "ProductParamDescription")
            setProductParamDescription(e.target.value)
        else if (e.target.name === "ProductCaption")
            setProdutCaption(e.target.value)
        else if (e.target.name === "color")
            setColorname(e.target.value)
        else if (e.target.name === "price")
            setColorprice(e.target.value)
        else if (e.target.name === "oldPrice")
            setColoroldprice(e.target.value)
        else if (e.target.name === "colorallquantity")
            setColorallquantity(e.target.value)
        else if (e.target.name === "checkproductinfo")
            setCheckProdutInfo(e.target.checked)
    }


    function AddQuantitySize(e) {
        if (e.target.name === 'quantity') {
            setAddSizeQuantityCollect(
                addSizeQuantityCollect.concat({
                    id: Date.now(),
                    size: size,
                    quantity: quantity
                })
            );
            setSize('');
            setQuantity('');
        }
        else if (e.target.name === 'description') {
            setAllDescriptionCollect(
                allDescriptionCollect.concat({
                    id:Date.now(),
                    description: description,
                    descriptionName: descriptionName
                })
            );
            setDescriptionName('');
            setDescription('');
        }
        else if (e.target.name === 'ProductParamDescription') {
            setAllProductParamDescriptions(
                allProductParamDescriptions.concat({
                    id:Date.now(),
                    ProductTitle: ProductTitle,
                    ProductParamDescription: ProductParamDescription
                })
            );
            
            setProductTitle('');
            setProductParamDescription('');
        }
        else if (e.target.name === 'ProductParamDescriptionall') {
            setAllProductParams(
                allProductParams.concat({
                id:Date.now(),
                caption:ProductCaption,
                description:allProductParamDescriptions
                }));
            setProdutCaption('');
            setAllProductParamDescriptions([]);
            document.getElementById("ProductCaption").value=''
            console.log(allProductParams)

        }
    }
    


    function checkAddProductColor(){
        console.log(AllColors)
    }

    function AddProductColor(){
        setAllColors(
            AllColors.concat({
                id:Date.now(),
                color: Colorname,
                price: Colorprice,
                oldprice: Coloroldprice,
                colorallquantity:Colorallquantity,
                images: imagesList,
                size: addSizeQuantityCollect
            })
        );
        if (Colorname!==''){
            document.getElementById("color").value=''
            setColorname('');
        }
        if (Colorprice!==0){
            document.getElementById("Price").value=''
            setColorprice(0);
        }

        if (Coloroldprice!==0){
            document.getElementById("OldPrice").value=''
            setColoroldprice(0);
        }
        console.log(Colorallquantity)
        if(Colorallquantity!==0 && Colorallquantity.toString().length!==0){
            setColorallquantity(0);
            document.getElementById("colorallquantity").value=''
        }
        setColorname('');
        setColorprice(0);
        setColoroldprice(0);
        setColorallquantity(0);
        setImagesList([]);
        setAddSizeQuantityCollect([]);


    }


    function AllProductinfo() {
           inputValCollection.colors=AllColors;
           inputValCollection.additions=allProductParams;
           inputValCollection.description=allDescriptionCollect;
           console.log(inputValCollection)
           axios.post(API+'api/AddProductJson/', {"data":inputValCollection}).then(res => {
            console.log(res.data);
            if (res.data['data']="OK"){
                window.location.replace("/admin/getProduct")
            }}
        ) 
        

    }



    return (
        <>
            <div className="product-one">
                <div className="container mt-0">
                    <h1 className="title">Add Product Page</h1>
                    <div className="row">
                        
                        <div className="col-md-6 product-body">

                            <label htmlFor="Category">Category name</label>
                            <select name="category" onChange={InputValueCollection} id="Category">
                                <option selected={true} disabled={true}>Categoryani tanlang</option>
                                {getCategoryName.map(item => {
                                    return (
                                        <option key={item.id} defaultValue="Category"
                                                value={item.id}>{item.categoryname}</option>
                                    )
                                })}
                            </select>

                            <label htmlFor="Subsubcategory">Subsubcategory name</label>
                            {inputValCollection.subcategory === "" ? <select disabled style={{opacity: '0.5'}}/> :
                                <select name="subsubcategory" onChange={InputValueCollection} id="Subsubcategory">
                                    <option >Subsubcategoryani tanlang</option>
                                    {getSubSubCategoryName.map(item => {
                                        return <option key={item.id}
                                        value={item.id}>{item.subsubcategoryname}</option>
                                    })}

                                </select>}
                            <label htmlFor="name">Name</label>
                            <input className="put" type="text" id="name" name="name" placeholder="Name"  onChange={InputValueCollection}/>
                            
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="Status" className="mt-4 pt-1">Status</label>
                                    <input type="checkbox" checked={inputValCollection.status} id="Status" onChange={InputValueCollection} name="status" className="box"/>

                                    <label htmlFor="Sameprice" className="mt-4 pt-1">Same price</label>
                                    <input type="checkbox" checked={inputValCollection.sameprice} id="Sameprice" onChange={InputValueCollection} name="sameprice" className="box"/>
                                </div>
                                <div className="col">
                                    <label htmlFor="Shopping" className="mt-3">Shopping Day</label>
                                    <input type="checkbox" id="Shopping" checked={inputValCollection.shopping} name="shopping" onChange={InputValueCollection} className="box"/>
                                    
                                    <label htmlFor="Notsizeproduct" className="mt-4 pt-1">Size</label>
                                    <input type="checkbox" checked={inputValCollection.notsizeproduct} id="Notsizeproduct" onChange={InputValueCollection} name="notsizeproduct" className="box"/>
                                </div>
                                
                            </div>
                            {inputValCollection.sameprice===true?
                            <div>
                                <label htmlFor="Price">Price</label>
                                <input className="put" type="number" name="price" id="Price" placeholder="Price"   onChange={InputValueCollection}/>

                            </div>
                            :''
                            }
                            
                            
                        </div>
                         {/*category and vendor finished start from sub category  and ends status*/}
                        <div className="col-md-6 product-body">
                            <label htmlFor="subCategory">Subcategory name</label>
                            {inputValCollection.category === '' ? <select disabled style={{opacity: '0.5'}}/> :
                                <select name="subcategory" onChange={InputValueCollection} id="subCategory">
                                    <option selected={true}>Subcategoryani tanlang</option>
                                    {getSubCategoryName.map(item => {
                                        return <option key={item.id} value={item.id}>{item.subcategoryname}</option>
                                    })}
                                </select>}

                            <label htmlFor="brand">Brand name</label>
                            <select name="brand" onChange={InputValueCollection} id="brand">
                                <option selected={true} disabled={true}>Brand tanlang</option>
                                {getBrandName.map(item => {
                                    return <option key={item.id} value={item.id}>{item.name}</option>

                                })}
                            </select>
                            <label htmlFor="delivery">Delivery day</label>
                            <input className="put" type="number" name="delivery" id="delivery" placeholder="Delivery day"    onChange={InputValueCollection}/>
                            
                            <label htmlFor="Generalinformation">Generalinformation</label>
                            <textarea className="put producttextarea" name="generalinformation" id="Generalinformation" onChange={InputValueCollection} cols="30" rows="6" placeholder="Generalinformation"/>


                            {inputValCollection.sameprice===true?
                            <div>
                                <label htmlFor="Oldprice">Oldprice</label>
                                <input className="put" type="number" name="oldprice" id="Oldprice" placeholder="Oldprice" onChange={InputValueCollection}/>
                            </div>
                            :''
                            }


                        </div>
                    </div>
                </div>
            </div>

            
            <div id="productcolors" className="product-two">

                <div id="productcolor" className="container">
                    <hr className="w-100 my-4"/>

                        <div id="productcolorname" >
                        { inputValCollection.sameprice=== false ?
                        <div className="form d-flex justify-content-between">
                            {/* colorless */}
                            
                            <div>
                                <label htmlFor="color">Color</label>
                                <input type="text" id="color" name="color" className="chooseColor"
                                    onChange={SizeQuantityCollect} placeholder="Color"/>
                            </div> 
                            
                            <div>
                                <label htmlFor="Price">Price</label>
                                <input className="put" type="number" name="price" id="Price" placeholder="Price"
                                        onChange={SizeQuantityCollect}/>
                            </div>
                            <div>
                                <label htmlFor="OldPrice">Oldprice</label>
                                <input className="put" type="number" name="oldPrice" id="OldPrice"
                                    onChange={SizeQuantityCollect} placeholder="Oldprice"/>
                            </div>
                        </div>
                        :
                        <div className="form d-flex justify-content-between">
                            
                            <div>
                                <label htmlFor="color">Color</label>
                                <input type="text" id="color" name="color" className="chooseColor"
                                    onChange={SizeQuantityCollect} placeholder="Color"/>
                            </div> 
                        </div>
                        }
                        <div className="form d-flex justify-content-between">
                        {inputValCollection.notsizeproduct=== false?<div>
                                <label htmlFor="colorallquantity">Quantity</label>
                                <input type="number" id="colorallquantity" name="colorallquantity" className="chooseColor"
                                    onChange={SizeQuantityCollect} placeholder="Quantity"/>
                            </div>:''
                                
                            }
                        </div>

                        </div>

                        <div id="productcolorimages" className="mt-3">
                            <div className=" w-25">
                                <label htmlFor="image">Image</label>
                                <input type="file" id="image" value={valueReset} onChange={imgCollection} className="img"  placeholder="Color"  multiple/>
                            </div>
                            <div className="d-block mt-3">
                                <div className="img-block d-flex w-100 overflow-auto">
                                    {imagesList.map((item) => {
                                        return <div key={item.id} id={item.id}
                                        onMouseEnter={() => {
                                            document.getElementById(item.id).classList.add("Imgbockhover") }}
                                        onMouseLeave={() => {
                                            document.getElementById(item.id).classList.remove("Imgbockhover") }}
                                        onClick={() => {
                                            let myJson = imagesList.filter(function(jsonObject) {
                                                    return jsonObject.id !== item.id});
                                            setImagesList(myJson);
                                         }}
                                        className="border border-primary m-1" >
                                            <img src={item.data} className="box imgstyle"  alt=""/>
                                        </div>
                                    })}
                                </div>
                            </div>

                            
                        </div>
                        
                        {inputValCollection.notsizeproduct===true?<div id="productcolorsizes" className="row form">
                            <div className="col-3">
                                <div className="inputText">
                                    <label htmlFor="size">Size</label>
                                    <input type="text" id="size" name="size" value={size}
                                        onChange={SizeQuantityCollect} placeholder="Size"/>
                                </div>

                                <div className="inputText">
                                    <div>
                                        <label htmlFor="Quantity">Quantity</label>
                                        <input type="number" id="Quantity" name="quantity" value={quantity} onChange={SizeQuantityCollect} placeholder="Quantity" />
                                    </div>
                                    <div className="mt-2 w-100">
                                        {size === '' || quantity === "" ?
                                        <button className="opacity-25 w-100 btn btn-info" disabled>send</button> :
                                        <button className="btn btn-info w-100" name="quantity" onClick={AddQuantitySize}>send</button>}
                                    </div>
                                    
                                    
                                </div>
                            </div>
                            
                            <div className="col-9 sizeAll">
                                {/* {addSizeQuantityCollect.length > 0 ? <h6 className="mt-3 quantity">Size</h6> : ""} */}
                                <div className="size overflow-auto d-flex mt-4">
                                    {addSizeQuantityCollect.map((item) => {
                                        return <div key={item.id} id={item.id}
                                        onMouseEnter={() => {
                                            document.getElementById(item.id).classList.add("Imgbockhover") 

                                        
                                        }}
                                        onMouseLeave={() => {
                                            document.getElementById(item.id).classList.remove("Imgbockhover") 
                                        }}
                                        onClick={() => {
                                            console.log(item.id)
                                            let size = addSizeQuantityCollect.filter(function(jsonObject) {
                                                return jsonObject.id !== item.id
                                            });
                                            setAddSizeQuantityCollect(size);
                                         }}
                                        className="sizeCollection me-2">
                                            <button className="w-8  btn border-warning mt-3 me-3" disabled>{item.size}</button>
                                            <br/>
                                            <button className="w-8  btn border-warning mt-4 me-3" disabled>{item.quantity}</button>
                                        </div>
                                    })}</div>
                                

                            </div>
                    </div>
              :''

                        }
                <hr className="w-100 d-block my-4"/>
                {/* {inputValCollection.sameprice?
                // notsizeproduct
                    imagesList.length !==0 && inputValCollection.sameprice && Colorallquantity.toString().length!==0?
                    <button className="btn mx-5 btn-info w-25" onClick={AddProductColor}>Add Color</button>
                        :<button className="btn mx-5 btn-info w-25" disabled>Add Color</button>
                :imagesList.length!==0 && Colorprice.toString().length!==0 && Coloroldprice.toString().length!==0 && Colorallquantity.toString().length!==0 ?
                    <button className="btn mx-5 btn-info w-25" onClick={AddProductColor}>Add Color</button>
                    :<button className="btn mx-5 btn-info w-25" disabled>Add Color</button>
                } */}

                
                {inputValCollection.sameprice?
                    inputValCollection.notsizeproduct?
                        imagesList.length!==0 && addSizeQuantityCollect.toString().length!==0 ? 
                                    <button className="btn mx-5 btn-info w-25" onClick={AddProductColor}>Add Color</button>
                                    :<button className="btn mx-5 btn-info w-25" disabled>Add Color</button>
                        :imagesList.length!==0 && Colorallquantity.toString().length!==0 && Colorallquantity!==0? 
                            <button className="btn mx-5 btn-info w-25" onClick={AddProductColor}>Add Color</button>
                            :<button className="btn mx-5 btn-info w-25" disabled>Add Color</button>   
                :
                inputValCollection.notsizeproduct?
                        imagesList.length!==0 && addSizeQuantityCollect.toString().length!==0 && Colorprice.toString().length!==0 && Coloroldprice.toString().length!==0 && Colorprice!==0 && Coloroldprice!==0 ? 
                                    <button className="btn mx-5 btn-info w-25" onClick={AddProductColor}>Add Color</button>
                                    :<button className="btn mx-5 btn-info w-25" disabled>Add Color</button>
                        :imagesList.length!==0 && Colorallquantity.toString().length!==0 && Colorallquantity!==0  && Colorprice.toString().length!==0 && Coloroldprice.toString().length!==0 && Colorprice!==0 && Coloroldprice!==0 ? 
                            <button className="btn mx-5 btn-info w-25" onClick={AddProductColor}>Add Color</button>
                            :<button className="btn mx-5 btn-info w-25" disabled>Add Color</button>
                }

                <button className="btn mx-5 btn-info w-25"onClick={checkAddProductColor}>Add Color</button>        
                </div>    
            </div>
            <hr/>   

            <div className="mt-2 mx-1">
                    <div className="m-1 d-flex overflow-auto d-blok">
                        {AllColors.map(item => {
                            return (
                                <div key={item.id} id={item.id}
                                                onMouseEnter={() => {
                                                    document.getElementById(item.id).classList.add("Imgbockhover") 
                                                    document.getElementById(item.id).classList.add("sizebockhover")  
                                                }}
                                                onMouseLeave={() => { 
                                                    document.getElementById(item.id).classList.remove("Imgbockhover")
                                                    document.getElementById(item.id).classList.remove("sizebockhover") 
                                                }}
                                                onDoubleClick={() => {
                                                    console.log(item.id)
                                                    let prodcolor = AllColors.filter(function(jsonObject) {
                                                        return jsonObject.id !== item.id
                                                    });
                                                    setAllColors(prodcolor);
                                                }}   className="productcolorsitems"  >

                                    {item.color!==''?<div>
                                            <label className="mt-2 d-block">Color</label>
                                            <input className="mt-2 d-block" disabled value={item.color}/>
                                        </div>:''
                                    }
                                    
                                    {item.colorallquantity!==0?
                                    <div>
                                        <label className="mt-2 d-block">Quantity</label>
                                        <input className="mt-2 d-bock" disabled value={item.colorallquantity}/>
                                    </div>
                                    :""
                                    }
                                    {item.price!==0?<input className="mt-2" value={item.price}/>:""

                                    }
                                    {item.oldprice!==0?<input className="mt-2" value={item.oldprice}/>:""}
                                    <div className="img-block d-flex w-100 mt-2 overflow-auto">
                                        {item.images.map((imgitem) => {
                                            return <div key={imgitem.id} id={imgitem.id}
                                            className="border border-primary m-1" >
                                                <img src={imgitem.data} className="box imgstyle"  alt=""/>
                                            </div>
                                        })}
                                    </div>
                                    <div className="size mt-2 overflow-auto d-flex mt-4">
                                    {item.size.map((sizeitem) => {
                                                return <div key={sizeitem.id} id={sizeitem.id} className="sizeCollection mt-2">
                                                    <div>
                                                        <label className="d-block me-3">Size</label>
                                                        <button className="w-8  btn border-warning me-3" disabled>{sizeitem.size}</button>
                                                    </div>
                                                    <div>
                                                        <label className="d-block me-3">Quantity</label>
                                                        <button className="w-8  btn border-warning  me-3" disabled>{sizeitem.quantity}</button>
                                                    </div>
                                                </div>
                                    })}
                                    </div>
                                
                                </div>
                            )})}
                    </div>
                
            </div>      
           


            <hr className="w-100 my-4"/>
            <div className="product-three product-two">
                <div className="container"> 
                <div className="row ">
                        <div className="col-5 product-two-body">

                            <label htmlFor="descriptionName">Description Name</label>
                            <input type="text" name="descriptionName" onChange={SizeQuantityCollect} value={descriptionName} id="descriptionName" placeholder="Description name"/>

                            <label htmlFor="description">Description</label>
                            <div className="inputText">
                            <textarea name="description" value={description} onChange={SizeQuantityCollect} id="description" cols="30" rows="4" placeholder="Description"/>
                                {description=== ""?
                                    <button className="opacity-25" disabled>send</button> :
                                    <button name="description" onClick={AddQuantitySize}>send</button>}
                            </div>

                        </div>
                        <div className="col-7 mt-2  product-two-body">
                            <div className="overflow-auto d-flex">
                            {allDescriptionCollect.map((item) => {
                                        return <div key={item.id} id={item.id}
                                        onMouseEnter={() => {
                                            document.getElementById(item.id).classList.add("Imgbockhover") 
                                            document.getElementById(item.id).classList.add("sizebockhover") 
                                            

                                        }}
                                        onMouseLeave={() => {
                                            document.getElementById(item.id).classList.remove("Imgbockhover")
                                            document.getElementById(item.id).classList.remove("sizebockhover")
                                             
                                        }}
                                        onDoubleClick={() => {
                                            let desc = allDescriptionCollect.filter(function(jsonObject) {
                                                return jsonObject.id !== item.id
                                            });
                                            setAllDescriptionCollect(desc);

                                         }}
                                         className="sizeCollection me-2 w-300">
                                        <textarea type="button" cols="30"  className="btn border-warning mt-4 me-3 mb-2" value={item.descriptionName}/>
                                        <br/>
                                        <textarea  cols="30" rows="4" value={item.description} className="btn border-warning mt-4 me-3" />
                                        </div>
                                    })}
                            </div>
                        </div>
                    </div>
                    

                
                
                </div>
            </div>
            


        <hr className="w-100 my-4"/>
        <div className="product-four product-two">
            <div className="container"> 

                <div className="row">
                
                    <div className="col">
                        <h3 className="title text-center">Product params</h3>
                        <div>
                            <label htmlFor="ProductCaption">Product Caption</label>
                            <input type="text" className="w-100 mb-3"
                                placeholder="Caption" onChange={SizeQuantityCollect} name="ProductCaption" id="ProductCaption"/>
                        </div>
                        
                        
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="Product title">Product title</label>
                                <input type="text" value={ProductTitle} onChange={SizeQuantityCollect} className="w-100"
                                    placeholder="title" name="ProductTitle" id="Product title"/>
                            </div>
                            <div className="col-6">
                                <label htmlFor="ProductParamDescription">Product params description</label>
                                <div className="inputTexts">
                                    <input type="text" className="w-100" onChange={SizeQuantityCollect} value={ProductParamDescription} placeholder="description" name="ProductParamDescription" id="ProductParamDescription"/>
                                    {ProductTitle === '' || ProductParamDescription === "" ?
                                        <button className="opacity-25" disabled>send</button> :
                                        <button name="ProductParamDescription" onClick={AddQuantitySize}>send</button>}
                                </div>
                            </div>
                            

                        </div>
                        <div className="mr-3 overflow-auto minheiget mt-4">
                        {allProductParamDescriptions.map((item) => {
                                        return <div key={item.id} id={item.id}
                                        onMouseEnter={() => {
                                            document.getElementById(item.id).classList.add("Imgbockhover") 
                                            document.getElementById(item.id).classList.add("sizebockhover") 
                                            

                                        }}
                                        onMouseLeave={() => {
                                            document.getElementById(item.id).classList.remove("Imgbockhover")
                                            document.getElementById(item.id).classList.remove("sizebockhover")
                                             
                                        }}
                                        onDoubleClick={() => {
                                            console.log(allProductParamDescriptions)
                                            let desc = allProductParamDescriptions.filter(function(jsonObject) {
                                                return jsonObject.id !== item.id
                                            });
                                            setAllProductParamDescriptions(desc);

                                         }}
                                         className="sizeCollection row w-100 m-0">
                                        <textarea type="button" rows="3" className="col btn border-warning m-2" value={item.ProductTitle}/>
                                        <br/>
                                        <textarea rows="3"  value={item.ProductParamDescription} className="col btn border-warning m-2 " />
                                        </div>
                                    })}
                        
                        </div>
                       {
                           allProductParamDescriptions.length!==0?
                           <button name="ProductParamDescriptionall" onClick={AddQuantitySize} className="btn btn-success W-25 mt-4 me-5">ADD</button>
                           :<button name="ProductParamDescriptionall" className="btn btn-success W-25 mt-4 me-5" disabled>ADD</button>
                       }
                        
                    </div>

                    <div className="col overflow-auto d-flex">
                    {allProductParams.map((item) => {
                                        return <div key={item.id} id={item.id}
                                        onMouseEnter={() => {
                                            document.getElementById(item.id).classList.add("Imgbockhover") 
                                            document.getElementById(item.id).classList.add("sizebockhover") 
                                        
                                        }}
                                        onMouseLeave={() => {
                                            document.getElementById(item.id).classList.remove("Imgbockhover")
                                            document.getElementById(item.id).classList.remove("sizebockhover")
                                             
                                        }}
                                        onDoubleClick={() => {
                                            console.log(allProductParams)
                                            let desc = allProductParams.filter(function(jsonObject) {
                                                return jsonObject.id !== item.id
                                            });
                                            setAllProductParams(desc);

                                         }}
                                         className="sizeCollection me-4 w-500">
                                        <textarea type="button" className="w-100 btn d-block border-warning" value={item.caption}/>
                                        <div className="d-blok">
                                            {item.description.map((items)=>{
                                                return(<div className="row w-500">
                                                        <textarea type="button" rows="3" className="col btn border-warning m-1" value={items.ProductTitle}/>
                                                        <textarea type="button" rows="3" className="col btn border-warning m-1" value={items.ProductParamDescription}/>
                                                    </div>)
                                            })}
                                        </div>
                                        
                                        
                            
                                    
                                        </div>
                                    })}
                        
                    </div>

                </div>
            </div>


            <div className="">
                <label htmlFor="checkproductinfo" className="mt-4 pt-1">Malumotlariz to'g'riligiga ishonchingiz komilmi</label>
                <input type="checkbox" checked={CheckProductInfo} id="checkproductinfo" onChange={SizeQuantityCollect} name="checkproductinfo" className=""/>
            </div>
            {inputValCollection.sameprice?
                inputValCollection.price && inputValCollection.oldprice && CheckProductInfo===true && inputValCollection.category!=="" &&inputValCollection.name!=='' && AllColors.length!==0?
                <button onClick={AllProductinfo} className="btn btn-success float-end d-block p-3 mt-4 mb-2 me-5">ADD PRODUCT</button>
                :
                <button className="btn btn-success float-end d-block p-3 mt-4 mb-2 me-5" disabled>ADD PRODUCT</button>
            
                :CheckProductInfo===true && inputValCollection.category!=="" &&inputValCollection.name!=='' && AllColors.length!==0?
                <button onClick={AllProductinfo} className="btn btn-success float-end d-block p-3 mt-4 mb-2 me-5">ADD PRODUCT</button>
                :
                <button className="btn btn-success float-end d-block p-3 mt-4 mb-2 me-5" disabled>ADD PRODUCT</button>

            }

        </div>

       


        
</> );}
export default Product;






