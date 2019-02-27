import React from 'react'
import {
 compose, withHandlers, withState, lifecycle
} from 'recompose'
import {Link} from 'react-router-dom'
import './style.scss'
import styled from 'styled-components'
import {withAuth} from '../../../lib/'
import classNames from 'classnames'
import {withRouter} from 'react-router-dom'

const ButtonPush = styled.button`
background: #0087ca;
    border: 3px solid #0087ca;
    color: #fff;
    
`
const Quantity = styled.span`
background:'white';
font-color:'black';
`
const ProductCard = ({
  galleries_id:{location_pic,alt_name},
  name_th,price,qty,increment,decrement,
  addToCart,id,cancel,cancelThis,user,
  deleteProduct,stylediv
}) => (
  <div className="roll-in-blurred-left" style={{
    backgroundSize: "250px 250px"
  }}>
      <div className="col">
            <div className="product-grid2">
                <div className="product-image2">
                        <img className="rounded-top" style={{width:"100%",height:"250px"}} alt ={alt_name} src={location_pic}></img>
                  <div className={stylediv(qty)} style={{
                          display: 'flex',
                          marginLeft:'auto',
                          marginRight:'auto'
                  }}>
                    <div style ={{margin:'0 auto 0 auto'}}>
                    {
                        !cancel && 
                        <ButtonPush
                            type="button"
                            className="decrement number-button"
                            onClick={decrement}>
                            <span aria-hidden="true">-</span>
                         </ButtonPush>
                    }
                    <Quantity>{qty}</Quantity>
                    {
                        !cancel &&
                        <ButtonPush
                            type="button"
                            className="increment number-button"
                            onClick={increment}>
                            <span aria-hidden="true">+</span>
                        </ButtonPush>
                    }
                    </div>
                  </div>
                </div>
                <div>
                {cancel ?
                    <button className="btn btn-danger btn3d btn-block" onClick={(e)=>cancelThis(id)}>Cancel</button>:
                    <button className="btn btn-info btn3d btn-block" onClick={(e)=>addToCart(id,name_th,location_pic,price,qty,e)}>add</button>
                }
                {user.is_admin ?
                    <div>
                    <Link to={`/menu/products/edit/${id}`} className="btn btn-warning btn3d btn-block" >Edit</Link>
                    <button className="btn btn-danger btn3d btn-block" onClick={e=>deleteProduct(id,e)} >Delete</button>
                    </div>: null
                }
                </div>
                <div className="product-content">
                    <h3 className="title">{name_th}</h3>
                    <span className="price">฿{price}.00</span>
                </div>
            </div>
        </div>
</div>
)

export default compose(
    withRouter,
    withAuth,
    withState('product','setProduct',{}),
    withState('cancel','setCancel',false),
    withState('qty','setQty',0),
    withHandlers({
        addToCart: ({cart,setCart,auth,setCancel}) => (id,name,locationPic,price,qty,e) =>{
            if(auth.getToken()){
                if(qty !== 0){
            e.preventDefault();
            setCancel(true)
            setCart(cart.concat({id,name,locationPic,price,qty}))
             if(cart.length>0){
                 cart.find((element,index) => {
                     if(element.id === id){
                         let dubCart = cart
                         dubCart[index] = {
                            id,
                            name,
                            locationPic,
                            price,
                            qty
                        }
                        setCart(dubCart)
                    }
                    else setCart(cart.concat({id,name,locationPic,price,qty}))
                    return 
                 })
             }
             else 
             setCart(cart.concat({id,name,locationPic,price,qty}))
            }
           }else alert("Please login first")
        },
        increment: ({qty,setQty}) => _ =>{
            setQty(++qty)
        },
        decrement: ({qty,setQty}) => _ =>{
            if(qty!==0)
            setQty(--qty)
        },
        stylediv: () => (qty) =>{
            return classNames({ "add-to-cart": qty === 0},{"add-to-carts": qty !== 0})
        },
        cancelThis:({setCancel,setQty,cart})=>(ID)=>{
            const cartIndex = cart.findIndex((data) => {
                return data.id == ID
              })
            cart.splice(cartIndex, 1)
            setQty(0)
            setCancel(false)
        },
    })
)(ProductCard)