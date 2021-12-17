import React from 'react';
import "antd/dist/antd.css"
import "./main.css"
import Diamond from "../Alsafia.png";
import {Layout, Menu} from 'antd';
// import {UserOutlined,} from '@ant-design/icons';
import {Link, Route, Switch} from "react-router-dom";
import GetBrand from "../components/getComponentCollection/getBrand";
import Category from "../components/AddComponentCollection/catagory";
import Product from "../components/AddComponentCollection/product";
import SubCategory from "../components/AddComponentCollection/subcategory";
import SubSubCategory from "../components/AddComponentCollection/subsubcategory";
import GetCategory from "../components/getComponentCollection/getCategory";
import GetProduct from "../components/getComponentCollection/getProduct";
import GetSubCategory from "../components/getComponentCollection/getSubCategory";
import GetSubSubCategory from "../components/getComponentCollection/getSubSubCategory";
import Brand from "../components/AddComponentCollection/brand";
import ShoppingDayForHomePageCarousel from "../components/AddComponentCollection/ShoppingDayForHomePageCarousel";
import GetShoppingDayForHomePageCarousel from "../components/getComponentCollection/getShoppingDayForHomePageCarousel";
import MainPagePromoForHomePageSlider from "../components/AddComponentCollection/MainPagePromoForHomePageSlider";
import GetMainPagePromoForHomePageSlider from "../components/getComponentCollection/getMainPagePromoForHomePageSlider";

import MainPagePromoForHomePage from "../components/AddComponentCollection/MainPagePromoForHomePage";
import GetMainPagePromoForHomePage from "../components/getComponentCollection/getMainPagePromoForHomePage";

import MainPagePromoForBrand from "../components/AddComponentCollection/MainPagePromoForBrand";
import ShoppingDayForBrandCarousel from "../components/AddComponentCollection/ShoppingDayForBrandCarousel";
import ShoppingDayForCategoryCarousel from "../components/AddComponentCollection/ShoppingDayForCategoryCarousel";
import AdvertisingForCategoryMenu from "../components/AddComponentCollection/AdvertisingForCategoryMenu";


function Admin() {
    const {Sider, Content} = Layout;


    return (
        <Layout>
            <Sider trigger={null} collapsible>
                
                <img src={Diamond} alt="AlSAFIA" className="w-100 bg-light Alsafialogo" />

                <Menu theme="dark" mode="inline" className='overflow-auto' defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to={"/admin/getCategory"}>Category</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={"/admin/getSubCategory"}>Sub-Category</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to={"/admin/getSubSubCategory"}>Sub-Sub-Category</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to={"/admin/getBrand"}>Brand</Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to={"/admin/getProduct"}>Product</Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link to={"/admin/getShoppingDayForHomePageCarousel"}>Home Page Carousel</Link>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Link to={"/admin/getMainPagePromoForHomePage"}>Home Page Promo</Link>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Link to={"/admin/getMainPagePromoForHomePageSlider"}>Home Page Slider</Link>
                    </Menu.Item>
                    {/* <Menu.Item key="9">
                        <Link to={"/admin/getMainPagePromoForBrand"}>ForBrand</Link>
                    </Menu.Item>
                    <Menu.Item key="10">
                        <Link to={"/admin/getShoppingDayForBrandCarousel"}>ForBrandCarousel</Link>
                    </Menu.Item>
                    <Menu.Item key="11">
                        <Link to={"/admin/getAdvertisingForCategoryMenu"}>ForCategoryMenu</Link>
                    </Menu.Item>
                    <Menu.Item key="12">
                        <Link to={"/admin/getShoppingDayForCategoryCarousel"}>ShoppingDayForCategoryCarousel</Link>
                    </Menu.Item>
                    <Menu.Item key="13">
                        <Link to={"/admin/getMainPagePromoForCategory"}>MainPagePromoForCategory</Link>
                    </Menu.Item> */}


                </Menu>
            </Sider>
            <Layout className="site-layout">

                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Switch>
                        <Route path={"/admin/getBrand"} component={GetBrand}/>
                        <Route path={"/admin/addBrand"} component={Brand}/>
                        <Route path={"/admin/getCategory"} component={GetCategory}/>
                        <Route path={"/admin/addCategory"} component={Category}/>
                        <Route path={"/admin/getProduct"} component={GetProduct}/>
                        <Route path={"/admin/addProduct"} component={Product}/>
                        <Route path={"/admin/getSubCategory"} component={GetSubCategory}/>
                        <Route path={"/admin/addSubCategory"} component={SubCategory}/>
                        <Route path={"/admin/getSubSubCategory"} component={GetSubSubCategory}/>
                        <Route path={"/admin/addSubSubCategory"} component={SubSubCategory}/>
                        <Route path={"/admin/addShoppingDayForHomePageCarousel"} component={ShoppingDayForHomePageCarousel}/>
                        <Route path={"/admin/getShoppingDayForHomePageCarousel"} component={GetShoppingDayForHomePageCarousel}/>
                        <Route path={"/admin/addMainPagePromoForHomePage"} component={MainPagePromoForHomePage}/>
                        <Route path={"/admin/getMainPagePromoForHomePage"} component={GetMainPagePromoForHomePage}/>
                        

                        <Route path={"/admin/getMainPagePromoForHomePageSlider"} component={GetMainPagePromoForHomePageSlider}/>
                        <Route path={"/admin/addMainPagePromoForHomePageSlider"} component={MainPagePromoForHomePageSlider}/>
                        <Route path={"/admin/getMainPagePromoForBrand"} component={MainPagePromoForBrand}/>
                        <Route path={"/admin/getShoppingDayForBrandCarousel"} component={ShoppingDayForBrandCarousel}/>
                        <Route path={"/admin/getAdvertisingForCategoryMenu"} component={AdvertisingForCategoryMenu}/>
                        <Route path={"/admin/getShoppingDayForCategoryCarousel"} component={ShoppingDayForCategoryCarousel}/>
                        <Route path={"/admin/getMainPagePromoForCategory"} component={AdvertisingForCategoryMenu}/>
                    </Switch>

                </Content>
            </Layout>
        </Layout>
    );
}

export default Admin;
