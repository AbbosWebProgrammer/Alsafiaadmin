import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API} from "../../tools/constans";
import "./css/style.css";
import uuidv4  from "uuid";
import {
    SyncOutlined,
    DeleteOutlined
  } from '@ant-design/icons';
  
import RefreshIco from "./image/refresh-icon.ico"
import Uploadimage from "./image/img_submit.gif"

function EditProduct(props) {
    //start get request
    const [getProductAllInfo, setProductAllInfo] = useState({});
    const [getCategoryName, setGetCategoryName] = useState([]);
    const [getSubCategoryName, setGetSubCategoryName] = useState([]);
    const [SubCategorylist, setSubCategorylist] = useState([]);
    const [SubSubCategorylist, setSubSubCategorylist] = useState([]);
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
    useEffect(() => {
        axios.get(API+"api/ProductAllInfo/"+`${window.location.pathname.split('/')[3]}`).then(res => {
            if(res.data.data!==[]){
                setProductAllInfo(res.data.data[0])
                console.log(res.data.data[0])
                inputValCollection.shopping=res.data.data[0].shoppingday;
                inputValCollection.status=res.data.data[0].product_status;
                inputValCollection.sameprice=res.data.data[0].sameprice;
                inputValCollection.notsizeproduct=res.data.data[0].productsize;
                inputValCollection.delivery=res.data.data[0].delivery
                inputValCollection.generalinformation=res.data.data[0].generalinformation
            }

        });
        axios.get(API+"api/AddProductColorJson/"+`${window.location.pathname.split('/')[3]}`).then(res => {
            if(res.data.data!==[]){
                setAllColors(res.data)
            }
        });
        axios.get(API+"api/AddProductDescriptionJson/"+`${window.location.pathname.split('/')[3]}`).then(res => {
            if(res.data.data!==[]){
                setAllDescriptionCollect(res.data)
            }
        });
        axios.get(API+"api/AddProductParamJson/"+`${window.location.pathname.split('/')[3]}`).then(res => {
            if(res.data.data!==[]){
                setAllProductParams(res.data)
            }
        });
        axios.get(API+"api/Category/").then(res => {
            setGetCategoryName(res.data)
        });
        axios.get(API+"api/Subcategory/").then(res => {
            setSubCategorylist(res.data)
        });
        axios.get(API+"api/Subsubcategory/").then(res => {
            setSubSubCategorylist(res.data)
        });
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
        for (let i = 0; i < files.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = (e) => {
                setImagesList(
                    imagesList=>[...imagesList,{ 
                    image: e.target.result, 
                    id: uuidv4()}]
                            );   
            }
        }
        setValueReset('')
        console.log(imagesList)
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
            axios.post(API+'api/AddProductDescriptionJson/', {"data":{
                "product":window.location.pathname.split('/')[3],
                "description":{
                    description: description,
                    name: descriptionName}
                }}).then(res => {
                axios.get(API+"api/AddProductDescriptionJson/"+`${window.location.pathname.split('/')[3]}`).then(res => {
                    if(res.data.data!==[]){
                        setAllDescriptionCollect(res.data)
                    }
                });
            })
            setDescriptionName('');
            setDescription('');
        }
        else if (e.target.name === 'ProductParamDescription') {
            setAllProductParamDescriptions(
                allProductParamDescriptions.concat({
                    id:Date.now(),
                    paramscell: ProductTitle,
                    paramscelldecor: ProductParamDescription
                })
            );
            setProductTitle('');
            setProductParamDescription('');
        }
        else if (e.target.name === 'ProductParamDescriptionall') {
            axios.post(API+'api/AddProductParamJson/', {"data":{
                "product":window.location.pathname.split('/')[3],
                "additions":{
                    "name":ProductCaption,
                    "items":allProductParamDescriptions}
                }}).then(res => {
                axios.get(API+"api/AddProductParamJson/"+`${window.location.pathname.split('/')[3]}`).then(res => {
                    if(res.data.data!==[]){
                        setAllProductParams(res.data)
                    }
                });
            })
            setProdutCaption('');
            setAllProductParamDescriptions([]);
            document.getElementById("ProductCaption").value=''
        }
    }
    




    function AddProductColor(){
        axios.post(API+'api/AddProductColorJson/', {"data":{
            "product":window.location.pathname.split('/')[3],
            "colors":{
                "color": Colorname,
                "price": Colorprice,
                "oldprice": Coloroldprice,
                "quantity":Colorallquantity,
                "image": imagesList,
                "size": addSizeQuantityCollect}
            }}).then(res => {
            axios.get(API+"api/AddProductColorJson/"+`${window.location.pathname.split('/')[3]}`).then(res => {
                if(res.data.data!==[]){
                    setAllColors(res.data)
                }
            });
        })
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
        if(inputValCollection.category===""){
            inputValCollection.category=getProductAllInfo.categoryid;
            if(inputValCollection.subcategory===""){
                inputValCollection.subcategory=getProductAllInfo.subcategoryid;
                if(inputValCollection.subsubcategory===""){
                    inputValCollection.subsubcategory=getProductAllInfo.subsubcategoryid;
                }   
            }   
        }

        if(inputValCollection.brand===""){
            inputValCollection.brand=getProductAllInfo.brandid;
        }

        console.log(inputValCollection)
        axios.put(API+'api/AddProductJson/'+`${window.location.pathname.split('/')[3]}/`, {"data":inputValCollection}).then(res => {
        console.log(res.data);
        window.location.replace("/admin/getProduct")
        }
        ) 
    }




    return (
        <>
       
            <div className="product-one mt-3">
                <div className="container mt-0">
                    <h1 className="title">Edit Product Page</h1>
                    <div className="row">
                        
                        <div className="col-md-6 product-body">

                            <label htmlFor="Category">Category name</label>
                            <select name="category" onChange={InputValueCollection} id="Category">
                                <option disabled={true}>Categoryani tanlang</option>
                                {getCategoryName.map(item => {
                                    return (
                                        getProductAllInfo.categoryid===item.id?
                                        <option key={item.id} defaultValue="Category"  value={item.id} selected={true} >{item.categoryname}</option>
                                        :
                                        <option key={item.id}    value={item.id}>{item.categoryname}</option>
                                    )
                                })}
                            </select>

                            <label htmlFor="Subsubcategory">Subsubcategory name</label>
                            {inputValCollection.subcategory === "" ?
                                //  
                                <select disabled style={{opacity: '0.5'}} name="subsubcategory"  id="Subsubcategory">
                                    <option >Subsubcategoryani tanlang</option>
                                    {SubSubCategorylist.map(item => {
                                        return(
                                        getProductAllInfo.subsubcategoryid===item.id?
                                        <option key={item.id} selected={true}  value={item.id}>{item.subsubcategoryname}</option>
                                        :
                                        <option key={item.id} value={item.id}>{item.subsubcategoryname}</option>)
                                                
                                    })}

                                </select>
                                :
                                <select name="subsubcategory" onChange={InputValueCollection} id="Subsubcategory">
                                    <option >Subsubcategoryani tanlang</option>
                                    {getSubSubCategoryName.map(item => {
                                        return(
                                        getProductAllInfo.subsubcategory===item.subsubcategoryname?
                                        <option key={item.id} selected={true} value={item.id}>{item.subsubcategoryname}</option>
                                        :
                                        <option key={item.id}   value={item.id}>{item.subsubcategoryname}</option>)
                                                
                                    })}

                                </select>}
                            
                            <label htmlFor="name">Name</label>
                            <input className="put" type="text" id="name" name="name" defaultValue={getProductAllInfo.productname} placeholder="Name"  onChange={InputValueCollection}/>
                            
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="Status" className="mt-4 pt-1">Status</label>
                                    <input type="checkbox" checked={inputValCollection.status} id="Status" onChange={InputValueCollection} name="status" className="box"/>
                                </div>
                                <div className="col">
                                    <label htmlFor="Shopping" className="mt-3">Shopping Day</label>
                                    <input type="checkbox" id="Shopping" checked={inputValCollection.shopping} name="shopping" onChange={InputValueCollection} className="box"/>
                                </div>
                                
                            </div>
                            
                        </div>
                         {/*category and vendor finished start from sub category  and ends status*/}
                        <div className="col-md-6 product-body">
                            <label htmlFor="subCategory">Subcategory name</label>
                            {inputValCollection.category === '' ?
                            
                            <select name="subcategory"  disabled style={{opacity: '0.5'}} id="subCategory">
                                    <option>Subcategoryani tanlang</option>
                                    {SubCategorylist.map(item => {
                                        return(
                                            parseInt(getProductAllInfo.subcategoryid)===parseInt(item.id)?
                                        <option key={item.id} selected={true} value={item.id}>{item.subcategoryname}</option>
                                        :
                                        <option key={item.id} value={item.id}>{item.subcategoryname}</option> 
                                            )
                                    })}
                                </select>
                            :
                                <select name="subcategory" onChange={InputValueCollection} id="subCategory">
                                    <option selected={true}>Subcategoryani tanlang</option>
                                    {getSubCategoryName.map(item => {
                                        return(
                                            getProductAllInfo.subcategory===item.subcategoryname?
                                        <option key={item.id} selected={true}
                                        value={item.id}>{item.subcategoryname}</option>
                                        :
                                        <option key={item.id} value={item.id}>{item.subcategoryname}</option>
                                            )
                                    })}
                                </select>}

                            <label htmlFor="brand">Brand name</label>
                            <select name="brand" onChange={InputValueCollection} id="brand">
                                <option disabled={true}>Brand tanlang</option>
                                {getBrandName.map(item => {
                                    return(
                                        getProductAllInfo.brandid===item.id?
                                        <option key={item.id} selected={true}
                                        value={item.id}>{item.name}</option>
                                        :
                                         <option key={item.id} value={item.id}>{item.name}</option>)

                                })}
                            </select>
                            <label htmlFor="delivery">Delivery day</label>
                            <input className="put" type="number" name="delivery" id="delivery" defaultValue={getProductAllInfo.delivery} placeholder="Delivery day"    onChange={InputValueCollection}/>
                            
                            <label htmlFor="Generalinformation">Generalinformation</label>
                            <textarea className="put producttextarea" name="generalinformation" defaultValue={getProductAllInfo.generalinformation} id="Generalinformation" onChange={InputValueCollection} cols="30" rows="6" placeholder="Generalinformation"/>

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
                                            <img src={item.image} className="box imgstyle"  alt=""/>
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
                                        className="sizeCollection me-2 position-relative">
                                            <input className="w-8 border-info mt-3 me-3 rounded" 
                                              onChange={(e)=>{
                                                let projects = addSizeQuantityCollect.map(project => {
                                                        if (project.id == item.id) {
                                                            project.size = e.target.value;
                                                            return project;
                                                        } else {
                                                            return project;
                                                        }
                                                    });
                                                    setAddSizeQuantityCollect(projects)

                                            }} 
                                            value={item.size} />
                                            <br/>
                                            <input type="number" className="w-8  border-info mt-3 me-3 rounded" 
                                            onChange={(e)=>{
                                                let projects = addSizeQuantityCollect.map(project => {
                                                        if (project.id == item.id) {
                                                            project.quantity = e.target.value;
                                                            return project;
                                                        } else {
                                                            return project;
                                                        }
                                                    });
                                                    setAddSizeQuantityCollect(projects)

                                            }} 
                                            value={item.quantity} />
                                            <button  className="btn btn-danger d-flex justify-content-between align-items-center rounded-circle position-absolute" style={{top:"0px",right:"0px", padding:"5px"}}  
                                            onClick={() => {
                                                let size = addSizeQuantityCollect.filter(function(jsonObject) {
                                                    return jsonObject.id !== item.id
                                                });
                                                setAddSizeQuantityCollect(size);
                                         }} ><DeleteOutlined /></button> 
                                        </div>
                                    })}
                                    </div>
                                

                            </div>
                    </div>
              :''

                        }
                <hr className="w-100 d-block my-4"/>


                
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

    
                </div>    
            </div>
              
            <hr/>   
            <div className="mt-2 mx-1">
                <div className="m-1 d-flex overflow-auto d-blok">
                    {AllColors.map(item => {  
                        return (
                            <div key={item.id} id={item.id}   className="productcolorsitems position-relative"  >
                                <button  className="btn btn-danger d-flex justify-content-between align-items-center rounded-circle position-absolute" style={{top:"0px",right:"0px", padding:"5px"}} 
                                    onClick={() => {
                                        axios.delete(API+'api/ProductColor/'+`${item.id}`).then(res => {
                                            axios.get(API+"api/AddProductColorJson/"+`${window.location.pathname.split('/')[3]}`).then(res => {
                                                setAllColors(res.data)
                                                
                                            });
                                        })
                                    }} ><DeleteOutlined /></button> 
                                <div>
                                    <label className="mt-2 d-block">Color</label>
                                    <input className="d-bock  border-info rounded" value={item.color}
                                    onChange={(e)=>{
                                        let projects = AllColors.map(project => {
                                            if (project.id == item.id) {
                                                project.color = e.target.value;
                                                return project;
                                            } else {
                                                return project;
                                            }
                                        });
                                        setAllColors(projects)
                                    }} 
                                    />
                                </div>     
                                <div>
                                    <label className="mt-2 d-block">Quantity</label>
                                    <input className="d-bock  border-info rounded" type="number" value={item.quantity}
                                         onChange={(e)=>{
                                            let projects = AllColors.map(project => {
                                                if (project.id == item.id) {
                                                    project.quantity = e.target.value;
                                                    return project;
                                                } else {
                                                    return project;
                                                }
                                            });
                                            setAllColors(projects)
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="mt-2 d-block">Price</label>
                                    <input className="d-bock  border-info rounded" type="number" value={item.price}
                                     onChange={(e)=>{
                                        let projects = AllColors.map(project => {
                                            if (project.id == item.id) {
                                                project.price = e.target.value;
                                                return project;
                                            } else {
                                                return project;
                                            }
                                        });
                                        setAllColors(projects)
                                    }}
                                    />
                                </div>
                                <div>
                                    <label className="mt-2 d-block">Olprice</label>
                                    <input className="d-bock  border-info rounded" type="number" value={item.oldprice}
                                     onChange={(e)=>{
                                        let projects = AllColors.map(project => {
                                            if (project.id == item.id) {
                                                project.oldprice = e.target.value;
                                                return project;
                                            } else {
                                                return project;
                                            }
                                        });
                                        setAllColors(projects)
                                    }}
                                    />
                                </div>
                               
                                <div className="img-block d-flex align-items-center w-100 mt-2 overflow-auto">
                                <div>
                                    <label for={"refresh_image_input_add_"+`${item.id}`} className="w-8 d-flex justify-content-center m-0 me-2 " >
                                        <img src={Uploadimage} style={{width:"50px",height:'50px'}} />
                                    </label>
                                    <input id={"refresh_image_input_add_"+`${item.id}`}  className="d-none"  type="file"  onChange={(e)=>{
                                        const form_data = new FormData();
                                        form_data.append('productscolor', item.id);
                                        form_data.append('image', e.target.files[0], e.target.files[0].name);
                                        axios.post(API+'api/ProductImageFile/',form_data).then(res => {
                                            axios.get(API+"api/AddProductColorJson/"+`${window.location.pathname.split('/')[3]}`, form_data).then(res => {
                                                if(res.data.data!==[]){
                                                    setAllColors(res.data)
                                                }
                                            });
                                        })
                                        
                                        }} />
                                    
                                    </div>
                                   
                                    {item.image.map((imgitem) => {
                                        return <div className="border m-1" id={imgitem.id}>
                                            
                                            <img src={API.substring(0, API.length - 1)+imgitem.image} onClick={()=>{console.log("dsdsdgsg")}}  className="box imgstyle d-block"  alt=""/>
                                            <div className="row m-0">
                                                <div className="col p-0 refresh_image_input d-flex justify-content-center align-items-center bg-info border border-white" >
                                                <label for={"refresh_image_input_"+`${imgitem.id}`} className="w-100 d-flex justify-content-center align-items-center m-0 ">
                                                        <img src={RefreshIco} style={{width:"12px",height:'12px'}} />
                                                    </label>
                                                    <input id={"refresh_image_input_"+`${imgitem.id}`} className="d-none"  type="file"
                                                    onChange={(e)=>{
                                                        const form_data = new FormData();
                                                        form_data.append('image', e.target.files[0], e.target.files[0].name);
                                                        axios.put(API+'api/ProductImageFile/'+`${imgitem.id}`+'/',form_data).then(res => {
                                                            axios.get(API+"api/AddProductColorJson/"+`${window.location.pathname.split('/')[3]}`, form_data).then(res => {
                                                                    setAllColors(res.data)
                                                                
                                                            });
                                                        })
                                                    }} 
                                                     />
                                                </div>
                                                <div className="col p-0" >
                                                    <button  className="btn btn-danger p-1 w-100 border-white"   onClick={() => {
                                                        axios.delete(API+'api/ProductImageFile/'+`${imgitem.id}`).then(res => {
                                                            axios.get(API+"api/AddProductColorJson/"+`${window.location.pathname.split('/')[3]}`).then(res => {
                                                                setAllColors(res.data)
                                                            });
                                                        })
                                                        // let projects = AllColors.map(project => {
                                                        //     if (project.id == item.id) {
                                                        //         project.image= item.image.filter(function(Obj) {
                                                        //                         return Obj.id !== imgitem.id
                                                        //                     });
                                                        //         return project;
                                                        //     } else {
                                                        //         return project;
                                                        //     }
                                                        // });
                                                        // setAllColors(projects)
                                                }} ><DeleteOutlined /></button>
                                                </div>
                                            </div>

                                        </div>

                                    })}
                                </div>
                                
                                <div className="size mt-2 overflow-auto d-flex mt-4">
                                 {inputValCollection.notsizeproduct===true?
                                 <div  className="sizeCollection w-8 me-3">
                                 <div>
                                     <label className="w-8">Size</label>
                                     <input className="w-8  border-success rounded  h-auto py-2" value={item.sizeadd?item.sizeadd:""}
                                     onChange={(e)=>{
                                         let projects = AllColors.map(project => {
                                             if (project.id == item.id) {
                                                 project.sizeadd = e.target.value;
                                                 return project;
                                             } else {
                                                 return project;
                                             }
                                         });
                                         setAllColors(projects)
                                         
                                         }}
                                     />
                                 </div>
                                 <div>
                                     <label className="d-block w-8">Quantity</label>
                                     <input className="d-bock border-success w-8 rounded h-auto py-2" min="0" type="number" value={item.sizequantityadd?item.sizequantityadd:""}
                                     onChange={(e)=>{
                                         let projects = AllColors.map(project => {
                                             if (project.id == item.id) {
                                                 project.sizequantityadd = e.target.value;
                                                 return project;
                                             } else {
                                                 return project;
                                             }
                                         });
                                         setAllColors(projects)
                                         }}
                                     
                                     />
                                 </div>
                                 {item.sizeadd?item.sizequantityadd?
                                                                item.sizeadd === '' || item.sizequantityadd === ""?
                                                                    <button className="btn btn-info rounded mt-2 mb-1 d-bock w-100" disabled>Add</button> :
                                                                    <button className="btn btn-info rounded mt-2 mb-1 d-bock w-100" onClick={(e) => {
                                                                        const form_data = new FormData();
                                                                        form_data.append('colorid', item.id);
                                                                        form_data.append('size', item.sizeadd);
                                                                        form_data.append('quantity', item.sizequantityadd);
                                                                        axios.post(API+'api/ProductSize/',form_data).then(res => {
                                                                            axios.get(API+"api/AddProductColorJson/"+`${window.location.pathname.split('/')[3]}`, form_data).then(res => {
                                                                                if(res.data.data!==[]){
                                                                                    setAllColors(res.data)
                                                                                }
                                                                            });
                                                                        })
                                                                        
                                                                }}>Add</button>
                                                                
                                                                :<button className="btn btn-info rounded mt-2 mb-1 d-bock w-100" disabled>Add</button>
                                                            :
                                                            <button className="btn btn-info rounded mt-2 mb-1 d-bock w-100" disabled>Add</button>
                                                        }
                                        </div>:""

                                 }   
                                
                               
                                {item.size.map((sizeitem) => {
                                            return <div  className="sizeCollection w-8 me-2 position-relative w-8">
                                                <div>
                                                    <label className="d-block w-8">Size</label>
                                                    <input className="d-bock w-8 border-info rounded  h-auto py-2" value={sizeitem.size}
                                                    onChange={(e)=>{
                                                        let projects = AllColors.map(project => {
                                                            if (project.id == item.id) {
                                                                let projectitems=item.size.map(projectitem=>{
                                                                    if (projectitem.id == sizeitem.id) {
                                                                        projectitem.size=e.target.value;
                                                                        return projectitem;
                                                                    }
                                                                    else{
                                                                        return projectitem;
                                                                    }
                                                                })
                                                                project.size = projectitems;
                                                                return project;
                                                            } else {
                                                                return project;
                                                            }
                                                        });
                                                        setAllColors(projects)
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="d-block w-8">Quantity</label>
                                                    <input className="d-bock  w-8 border-info rounded h-auto py-2" min="0" type="number" value={sizeitem.quantity}
                                                    onChange={(e)=>{
                                                        let projects = AllColors.map(project => {
                                                            if (project.id == item.id) {
                                                                let projectitems=item.size.map(projectitem=>{
                                                                    if (projectitem.id == sizeitem.id) {
                                                                        projectitem.quantity=e.target.value;
                                                                        return projectitem;
                                                                    }
                                                                    else{
                                                                        return projectitem;
                                                                    }
                                                                })
                                                                project.size = projectitems;
                                                                return project;
                                                            } else {
                                                                return project;
                                                            }
                                                        });
                                                        setAllColors(projects)
                                                        }}
                                                    />
                                                </div>
                                                <button  className="btn btn-danger p-1 d-flex justify-content-between align-items-center rounded-circle position-absolute" style={{top:"0px",right:"0px", padding:"5px"}}  
                                                    onClick={() => {
                                                        axios.delete(API+'api/ProductSize/'+`${sizeitem.id}`).then(res => {
                                                            axios.get(API+"api/AddProductColorJson/"+`${window.location.pathname.split('/')[3]}`).then(res => {
                                                                if(res.data.data!==[]){
                                                                    setAllColors(res.data)
                                                                }
                                                            });
                                                        })
                                                        // let projects = AllColors.map(project => {
                                                        //     if (project.id == item.id) {
                                                        //         project.size = item.size.filter(function(Obj) {
                                                        //                         return Obj.id !== sizeitem.id
                                                        //                     });
                                                        //         return project;
                                                        //     } else {
                                                        //         return project;
                                                        //     }
                                                        // });
                                                        // setAllColors(projects)
                                                }}
                                                ><DeleteOutlined /></button> 
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
                                         className="sizeCollection me-2 w-300 position-relative">
                                        <label htmlFor="descriptionName">Description Name</label>
                                        <textarea type="button" className="btn border-info d-block w-100 mb-2  w-300" 
                                            onChange={(e)=>{
                                                let projects = allDescriptionCollect.map(project => {
                                                        if (project.id == item.id) {
                                                            project.name = e.target.value;
                                                            return project;
                                                        } else {
                                                            return project;
                                                        }
                                                    });
                                                    setAllDescriptionCollect(projects)

                                            }} 
                                            value={item.name}/>
                                        
                                        <label htmlFor="descriptionName">Description</label>
                                        <textarea rows="4"  className="btn border-info d-block w-100  w-300" 
                                            onChange={(e)=>{
                                                let projects = allDescriptionCollect.map(project => {
                                                    if (project.id == item.id) {
                                                        project.description = e.target.value;
                                                        return project;
                                                    } else {
                                                        return project;
                                                    }
                                                });
                                                setAllDescriptionCollect(projects)
                                            }} 
                                            value={item.description} />
                                            
                                            <button  className="btn btn-danger d-flex justify-content-between align-items-center rounded-circle position-absolute" style={{top:"0px",right:"0px", padding:"5px"}} 
                                            
                                            onClick={() => {
                                                axios.delete(API+'api/Description/'+`${item.id}`).then(res => {
                                                    axios.get(API+"api/AddProductDescriptionJson/"+`${window.location.pathname.split('/')[3]}`).then(res => {
                                                        if(res.data.data!==[]){
                                                            setAllDescriptionCollect(res.data)
                                                        }
                                                    });
                                                }
                                                )
                                            // let desc = allDescriptionCollect.filter(function(jsonObject) {
                                            //     return jsonObject.id !== item.id
                                            // });
                                            // setAllDescriptionCollect(desc);
                                         }} ><DeleteOutlined /></button>        
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
                                            className="sizeCollection w-100 m-0 position-relative">
                                            <div className="sizeCollection row w-100 m-0 position-relative">
                                                <textarea type="button" rows="3" className="col btn border-info m-2" value={item.paramscell}
                                                onChange={(e)=>{
                                                    let projects = allProductParamDescriptions.map(project => {
                                                        if (project.id == item.id) {
                                                            project.paramscell = e.target.value;
                                                            return project;
                                                        } else {
                                                            return project;
                                                        }
                                                    });
                                                    setAllProductParamDescriptions(projects)
                                                }} 
                                                />
                                                <textarea rows="3"  value={item.paramscelldecor} className="col btn border-info m-2 " 
                                                onChange={(e)=>{
                                                    let projects = allProductParamDescriptions.map(project => {
                                                        if (project.id == item.id) {
                                                            project.paramscelldecor = e.target.value;
                                                            return project;
                                                        } else {
                                                            return project;
                                                        }
                                                    });
                                                    setAllProductParamDescriptions(projects)
                                                }} 
                                                />
                                            </div>
                                            
                                            <button  className="btn btn-danger d-flex justify-content-between align-items-center rounded-circle position-absolute" style={{top:"0px",right:"0px", padding:"5px"}}  
                                                onClick={() => {
                                                    let desc = allProductParamDescriptions.filter(function(jsonObject) {
                                                        return jsonObject.id !== item.id
                                                    });
                                                    setAllProductParamDescriptions(desc);
                                            }}><DeleteOutlined /></button>   
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
                                         className="sizeCollection me-4 w-500 position-relative">
                                        <textarea type="button" className=" btn d-block border-info w-100 w-500" value={item.name}
                                        onChange={(e)=>{
                                            let projects = allProductParams.map(project => {
                                                if (project.id == item.id) {
                                                    project.name = e.target.value;
                                                    return project;
                                                } else {
                                                    return project;
                                                }
                                            });
                                            setAllProductParams(projects)
                                        }} 
                                        />
                                        <button  className="btn btn-danger d-flex justify-content-between align-items-center rounded-circle position-absolute" style={{top:"0px",right:"0px", padding:"5px"}}  
                                                onClick={() => {
                                                    axios.delete(API+'api/ProductParamsCaption/'+`${item.id}`).then(res => {
                                                        axios.get(API+"api/AddProductParamJson/"+`${window.location.pathname.split('/')[3]}`).then(res => {
                                                            setAllProductParams(res.data)
                                                            
                                                        });
                                                    })
                                                    // let desc = allProductParams.filter(function(jsonObject) {
                                                    //             return jsonObject.id !== item.id
                                                    //         });
                                                    //         setAllProductParams(desc);
                                            }}><DeleteOutlined /></button>  
                                        <div className="d-blok">
                                            {item.items.map((items)=>{
                                                return(<div className="w-500 position-relative" >
                                                        <div className="row p-0 m-0 mt-2 w-100">
                                                            <div className="col p-0 me-1" >
                                                                <textarea type="button" rows="3" className="w-100 btn p-1 border-info" value={items.paramscell}
                                                                 onChange={(e)=>{
                                                                    let projects = allProductParams.map(project => {
                                                                        if (project.id == item.id) {
                                                                            let projectitems=item.items.map(projectitem=>{
                                                                                if (projectitem.id == items.id) {
                                                                                    projectitem.paramscell=e.target.value;
                                                                                    return projectitem;
                                                                                }
                                                                                else{
                                                                                    return projectitem;
                                                                                }
                                                                            })
                                                                            project.items = projectitems;
                                                                            return project;
                                                                        } else {
                                                                            return project;
                                                                        }
                                                                    });
                                                                    setAllProductParams(projects)
                                                                    }}
                                                                
                                                                />
                                                            </div>
                                                            <div className="col p-0" >
                                                                <textarea type="button"  rows="3" className="w-100 btn p-1 border-info" value={items.paramscelldecor}
                                                                onChange={(e)=>{
                                                                    let projects = allProductParams.map(project => {
                                                                        if (project.id == item.id) {
                                                                            let projectitems=item.items.map(projectitem=>{
                                                                                if (projectitem.id == items.id) {
                                                                                    projectitem.paramscelldecor=e.target.value;
                                                                                    return projectitem;
                                                                                }
                                                                                else{
                                                                                    return projectitem;
                                                                                }
                                                                            })
                                                                            project.items = projectitems;
                                                                            return project;
                                                                        } else {
                                                                            return project;
                                                                        }
                                                                    });
                                                                    setAllProductParams(projects)
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <button  className="btn btn-danger d-flex justify-content-between align-items-center rounded-circle position-absolute" style={{top:"0px",right:"0px", padding:"5px"}}  
                                                                onClick={() => {
                                                                    axios.delete(API+'api/ProductParamsCaptionitems/'+`${items.id}`).then(res => {
                                                                        axios.get(API+"api/AddProductParamJson/"+`${window.location.pathname.split('/')[3]}`).then(res => {
                                                                            setAllProductParams(res.data)
                                                                            
                                                                        });
                                                                    })
                                                                    // let projects = allProductParams.map(project => {
                                                                    //     if (project.id == item.id) {
                                                                    //         let projectitems=item.items.filter(function(jsonObject) {
                                                                    //                         return jsonObject.id !== items.id
                                                                    //                     });
                                                                    //         project.items = projectitems;
                                                                    //         return project;
                                                                    //     } else {
                                                                    //         return project;
                                                                    //     }
                                                                    // });
                                                                    // setAllProductParams(projects)
                                                            }}><DeleteOutlined /></button> 
                                                    </div>)
                                            })}
                                            <div className="row">
                                                <div className="col-6">
                                                    <label htmlFor="Product title">Product title</label>
                                                    <input type="text" value={item.addProductTitle?item.addProductTitle:""} 
                                                    onChange={
                                                        (e)=>{
                                                            let projects = allProductParams.map(project => {
                                                                if (project.id == item.id) {
                                                                    project.addProductTitle= e.target.value;
                                                                    return project;
                                                                } else {
                                                                    return project;
                                                                }
                                                            });
                                                            setAllProductParams(projects)

                                                        }
                                                    } className="w-100"
                                                        placeholder="title" name="ProductTitle" id="Product title"/>
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="ProductParamDescription">Product params description</label>
                                                    <div className="inputTexts">
                                                        <input type="text" className="w-100" onChange={
                                                            (e)=>{
                                                                let projects = allProductParams.map(project => {
                                                                    if (project.id == item.id) {
                                                                        project.addProductParamDescription= e.target.value;
                                                                        return project;
                                                                    } else {
                                                                        return project;
                                                                    }
                                                                });
                                                                setAllProductParams(projects)
                                                                
                                                            }
                                                        } value={item.addProductParamDescription?item.addProductParamDescription:""}  placeholder="description" name="ProductParamDescription" id="ProductParamDescription"/>
                                                        {item.addProductTitle?
                                                            item.addProductParamDescription?
                                                                item.addProductTitle === '' || item.addProductParamDescription === ""?
                                                                    <button className="opacity-25" disabled>Add</button> :
                                                                    <button name="ProductParamDescription" onClick={()=>{
                                                                        const form_data = new FormData();
                                                                        form_data.append('id', item.id);
                                                                        form_data.append("paramscell",item.addProductTitle);
                                                                        form_data.append('paramscelldecor', item.addProductParamDescription);
                                                                        axios.post(API+'api/ProductParamsCaptionitems/',form_data).then(res => {
                                                                            axios.get(API+"api/AddProductParamJson/"+`${window.location.pathname.split('/')[3]}`).then(res => {
                                                                                if(res.data.data!==[]){
                                                                                    setAllProductParams(res.data)
                                                                                }
                                                                            });
                                                                        })
                                                                         
                                                                    }}>Add</button>
                                                                
                                                                :<button className="opacity-25" disabled>Add</button>
                                                            :
                                                            <button className="opacity-25" disabled>Add</button>
                                                        }
                                                    </div>
                                                </div>
                                             </div>
                        
                                        </div>
                                        </div>
                                    })}
                        
                    </div>

                </div>
            </div>
            
        </div>
 
        <button onClick={AllProductinfo} className="btn btn-success float-end d-block p-3 mt-4 mb-2 me-5">EDIT PRODUCT</button>



       


        
</> );}
export default EditProduct;


