import React from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import {API} from "../../tools/constans";


class Category extends React.Component {
    state = {
        categoryname: '',
        description: '',
        image: null,
        imgShow: '',
        response:""
    }

    render() {

        const {categoryname, description, image, imgShow} = this.state;
        
        const inputNameChanged = (e) => {
            this.setState({categoryname: e.target.value})
        }
        const inputDescriptionChanged = (e) => {
            this.setState({description: e.target.value})
        };
        const inputImageChanged = (e) => {
            this.setState({image: e.target.files[0]});
            let files = e.target.files;
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (e) => {
                this.setState({imgShow: e.target.result})
            }
        }
        const handleSubmission = () => {
            let form_data = new FormData();
            form_data.append('categoryname', categoryname);
            form_data.append('description', description);
            form_data.append('image', image, image.name);
            let url = API+'api/Category/';
            axios.post(url, form_data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then(res => {
               this.setState({response:res.statusText})
               console.log(res.statusText)
               if(res.statusText==="Created"){
                   window.location.replace("/admin/getCategory");
               }
               else{
                   // Alert(response)
               }
            
            
            })

        };
        return (
            <div>

                <div className="category">
                    <div className="container">
                        <h1 className="title">Add Category <br/>{this.state.response}</h1>
                        <div className="row">
                            <div className="col-xl-1"/>
                            <div className="col-md-5 category-body">
                                <div className="form">
                                    <label htmlFor="brand">Category name</label>
                                    <input type="text" id="brand" name="name" onChange={inputNameChanged}/>

                                    <label htmlFor="description">Description</label>
                                    <input type="text" id="description" name="description"
                                           onChange={inputDescriptionChanged}/>

                                    <label htmlFor="image">Image</label>
                                    <input type="file" name="logo" onChange={inputImageChanged} id="image"
                                           className="img"/>
                                        <button onClick={handleSubmission} className="btn btn-success">Submit</button>
                                    
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="img-block">
                                    <div className="box" style={{width: "47%", margin: "5px"}}>
                                        <img style={{width: "100%"}} src={imgShow} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Category;