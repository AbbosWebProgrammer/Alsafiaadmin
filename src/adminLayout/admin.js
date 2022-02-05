import React from 'react';
import "antd/dist/antd.css"
import "./main.css"
import Diamond from "../Alsafia.png";
import {Layout, Menu} from 'antd';
// import {UserOutlined,} from '@ant-design/icons';
import {Link, Route, Switch} from "react-router-dom";
import AddCategory from "../components/AddComponentCollection/catagory";
import GetCategory from "../components/getComponentCollection/getCategory";

import AddSubCategory from "../components/AddComponentCollection/subcategory";
import GetSubCategory from "../components/getComponentCollection/getSubCategory";

import AddSubSubCategory from "../components/AddComponentCollection/subsubcategory";
import GetSubSubCategory from "../components/getComponentCollection/getSubSubCategory";

import AddBrand from "../components/AddComponentCollection/brand";
import GetBrand from "../components/getComponentCollection/getBrand";


import AddProduct from "../components/AddComponentCollection/product";
import EditProduct from "../components/EditComponentCollection/editproduct";
import GetProduct from "../components/getComponentCollection/getProduct";

import AddShoppingDayForHomePageCarousel from "../components/AddComponentCollection/ShoppingDayForHomePageCarousel";
import EditShoppingDayForHomePageCarousel from "../components/EditComponentCollection/editShoppingDayForHomePageCarousel";
import GetShoppingDayForHomePageCarousel from "../components/getComponentCollection/getShoppingDayForHomePageCarousel";

import AddMainPagePromoForHomePage from "../components/AddComponentCollection/MainPagePromoForHomePage";
import EditMainPagePromoForHomePage from "../components/EditComponentCollection/editMainPagePromoForHomePage";
import GetMainPagePromoForHomePage from "../components/getComponentCollection/getMainPagePromoForHomePage";

import AddMainPagePromoForHomePageSlider from "../components/AddComponentCollection/MainPagePromoForHomePageSlider";
import EditMainPagePromoForHomePageSlider from "../components/EditComponentCollection/editMainPagePromoForHomePageSlider";
import GetMainPagePromoForHomePageSlider from "../components/getComponentCollection/getMainPagePromoForHomePageSlider";


import AdvertisingForCategoryMenu from "../components/AddComponentCollection/AdvertisingForCategoryMenu";

import GetOrder from "../components/getComponentCollection/getOrder";
import GetOrderDetail from "../components/getComponentCollection/getOrderDetail";

import GetStatistics from "../components/getComponentCollection/getStatistics";



function Admin() {
    const {Sider, Content} = Layout;


    return (
        <Layout>
            <Sider trigger={null} collapsible>
                <img src={Diamond} alt="AlSAFIA" className="w-100 bg-light Alsafialogo" />
                {/* defaultSelectedKeys={['']} */}
                <Menu theme="dark" mode="inline" className='overflow-auto' >
                    <Menu.Item key="0">
                        <Link to={"/admin/getStatistics"}>Statistics</Link>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Link to={"/admin/getOrder"}>Order</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={"/admin/getCategory"}>Category</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to={"/admin/getSubCategory"}>Sub-Category</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to={"/admin/getSubSubCategory"}>Sub-Sub-Category</Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to={"/admin/getBrand"}>Brand</Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link to={"/admin/getProduct"}>Product</Link> 
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Link to={"/admin/getShoppingDayForHomePageCarousel"}>Home Page Carousel</Link>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Link to={"/admin/getMainPagePromoForHomePage"}>Home Page Promo</Link>
                    </Menu.Item>
                    <Menu.Item key="9">
                        <Link to={"/admin/getMainPagePromoForHomePageSlider"}>Home Page Slider</Link>
                    </Menu.Item>
                    
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content className="site-layout-background padding-0px">
                    <Switch>

                        <Route path={"/admin/addCategory"} component={AddCategory}/>
                        <Route path={"/admin/getCategory"} component={GetCategory}/>

                        <Route path={"/admin/addProduct"} component={AddProduct}/>
                        <Route path={"/admin/getProduct"} component={GetProduct}/>
                        <Route path={"/admin/editProduct"} component={EditProduct}/>

                        <Route path={"/admin/addSubCategory"} component={AddSubCategory}/>
                        <Route path={"/admin/getSubCategory"} component={GetSubCategory}/>

                        <Route path={"/admin/addSubSubCategory"} component={AddSubSubCategory}/>
                        <Route path={"/admin/getSubSubCategory"} component={GetSubSubCategory}/>
                        
                        <Route path={"/admin/addBrand"} component={AddBrand}/>
                        <Route path={"/admin/getBrand"} component={GetBrand}/>

                        
                        <Route path={"/admin/addShoppingDayForHomePageCarousel"} component={AddShoppingDayForHomePageCarousel}/>
                        <Route path={"/admin/getShoppingDayForHomePageCarousel"} component={GetShoppingDayForHomePageCarousel}/>
                        <Route path={"/admin/editShoppingDayForHomePageCarousel"} component={EditShoppingDayForHomePageCarousel}/>
                        
                        <Route path={"/admin/addMainPagePromoForHomePage"} component={AddMainPagePromoForHomePage}/>
                        <Route path={"/admin/editMainPagePromoForHomePage"} component={EditMainPagePromoForHomePage}/>
                        <Route path={"/admin/getMainPagePromoForHomePage"} component={GetMainPagePromoForHomePage}/>
                        

                        <Route path={"/admin/addMainPagePromoForHomePageSlider"} component={AddMainPagePromoForHomePageSlider}/>
                        <Route path={"/admin/getMainPagePromoForHomePageSlider"} component={GetMainPagePromoForHomePageSlider}/>
                        <Route path={"/admin/editMainPagePromoForHomePageSlider"} component={EditMainPagePromoForHomePageSlider}/>


                        <Route path={"/admin/getAdvertisingForCategoryMenu"} component={AdvertisingForCategoryMenu}/>

                        <Route path={"/admin/getOrder"} component={GetOrder}/>
                        <Route path={"/admin/getOrderDetailByOrderID"} component={GetOrderDetail}/>

                        <Route path={"/admin/getStatistics"} component={GetStatistics}/>


                    </Switch>

                </Content>
            </Layout>
        </Layout>
    );
}

export default Admin;
