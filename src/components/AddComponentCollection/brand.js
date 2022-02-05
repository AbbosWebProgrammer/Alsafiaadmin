import React from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import {API} from "../../tools/constans";
class Brand extends React.Component {
    state = {
        name: '',
        description: '',
        image: null,
        ImgShow: ''
    }

    render() {
        const {name, description, image, ImgShow} = this.state;
        const inputNameChanged = (e) => {
            this.setState({name: e.target.value})
            console.log(e.target.value)
        }
        const inputDescriptionChanged = (e) => {
            this.setState({description: e.target.value})
        }

        const inputImageChanged=(e) =>{
            this.setState({image: e.target.files[0]})
            let files = e.target.files;
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (e) => {
                this.setState({ImgShow: e.target.result})
            }

        }
            const handleSubmission = () => {
                let form_data = new FormData();
                form_data.append('name', name);
                form_data.append('description', description);
                form_data.append('image', image, image.name);
                console.log(form_data)
                let url = API+'api/Brand/';
                axios.post(url, form_data, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }).then(res => {
                    console.log(res.data);
                    window.location.replace("/admin/getBrand");
                })
            };

            return (
                <div>
                    <div className="category">
                        <div className="container">
                            <h1 className="title">Add Brand</h1>
                            <div className="row">
                                <div className="col-xl-1"/>
                                <div className="col-md-5 category-body">
                                    <div className="form">
                                        <label htmlFor="brand">Brand name</label>
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
                                        <div className="box" style={{width: "50%", margin: "5px"}}>
                                            <img style={{width: "100%"}} src={ImgShow} alt=""/>
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

    export default Brand