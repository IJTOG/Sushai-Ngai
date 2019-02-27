import React from 'react'
import {
 compose,
 withHandlers,
 lifecycle,
 withState,
 branch,
 renderComponent
} from 'recompose'
import {connect} from 'react-redux'
import ProductCard from './components/productCard'
import {loadProducts,saveProductToCart,deleteProduct} from '../../redux/action'
import Sidebar from './components/sidebar'
import {Row,Col} from 'reactstrap'
import {withRouter,Link} from 'react-router-dom'
import './style.css'
import {PacmanLoader, ClimbingBoxLoader} from 'react-spinners'
import  classNames  from 'classnames'
import Icon from '../../asset/IconSE2.jpg'

const Fetch = _ => (
    <div className="container" style={{position: "fixed",
                                        top: "50%",
                                        left:"50%",
                                        marginTop: "-50px",
                                        marginLeft: "-100px"}}>
            <PacmanLoader
             //   className={override}
            sizeUnit={"px"}
            size={70}
            color={'#36D7B7'}
            loading={true}
            />
    </div>
    
)

const Products = ({
    items,filterByCatelog,add,addToCart,
    decrement,increment,qty,setCart,cart,user,
    deleteProduct,stylediv,toggle,category,categorybtn
    ,submitbtn,addcartclicked
}) => (
    <div className="container" ><br/>
            <button className={categorybtn()} onClick={toggle}>category</button>
            <h3 className="text-center">Product</h3>
            { user.is_admin === true ? <Link  className="btn btn-primary btn3d" to= '/menu/product/create'>Create product</Link> : null}
            <button className={submitbtn()} onClick={add}>add to cart</button>
           <Row style={{padding:"5%"}}>
               {filterByCatelog(items).map((data,i)=>(
                    <Col xs={12} lg={4} key={data.id}> 
                    <ProductCard {...data} add={add} addToCart={addToCart} addcartclicked={addcartclicked} user={user} cart={cart} setCart={setCart} deleteProduct = {deleteProduct}/>
                   </Col>
               )
               )}
            </Row>
    <br/>
    
    <div id="wrapper" className={stylediv()} >
    <div id="sidebar-wrapper">
        <nav>
            <ul className="sidebar-nav nav"><br/>
            <li className="sidebar-brand">
                <div className="container"><img src={Icon} alt="sushi" style={{width: '50%'}} /></div>
                </li>
                <Sidebar {...category}/>
            </ul>
        </nav>
    </div>
</div>
    </div>
)

export default compose(
    withRouter,
    withState('isOpen','setOpen',false),
    withState('product',"setProduct",[]),
    withState('cart',"setCart",[]),
    withState('addcartclicked','setaddcartclicked',false),
    connect(
      ({product:{items,isLoading},user,category}) => ({items,isLoading,user,category}),
      (dispatch,props) => ({
          loadProducts(){
              dispatch(loadProducts())
          },
          add(){
            if(props.cart.length !== 0){
                console.log(props.cart)
                 props.setaddcartclicked(true)
                 dispatch(saveProductToCart(props.cart))
                 alert("add product to card success")
                 props.setCart([])
                 props.setaddcartclicked(false)
                 window.location.reload();
        }
            else alert("please choose menu first")
        },
        deleteProduct(id,e){
            e.preventDefault();
            dispatch(deleteProduct(id))
        },
      })
    ),
    withHandlers({
        toggle: ({setOpen,isOpen}) => _ => {
            setOpen(!isOpen)
        },
        filterByCatelog: ({match:{params}}) => items =>{
        let filtered = items.filter( data => data['categories_id']['id'] == params.id)
        return filtered
        },
        stylediv: ({isOpen}) => () =>{
            return classNames({ "active": isOpen == true},"")
        },
        categorybtn: ({isOpen}) => () =>{
            return classNames("btn btn-info hambur",{"hamactive": isOpen == false})
        },
        submitbtn: ({isOpen}) => () =>{
            return classNames("btn btn-primary submit",{"submitactive": isOpen == false})
        }
    }),
    lifecycle({
        async componentDidMount(){
          await  this.props.loadProducts()
        }
    }),
    branch(
        ({isLoading}) => !isLoading,
         renderComponent(Products),
         renderComponent(Fetch)
    )
)(Products)