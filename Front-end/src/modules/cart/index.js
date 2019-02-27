import React from 'react'
import {
 withState,
 withHandlers,
 compose,
 lifecycle,
 branch,
 renderComponent
} from 'recompose'
import { connect } from 'react-redux'
import Cart from './components/Cart'
import './style.css'
import {createBill,removeProductFromCart,removeAllProductFromCart} from '../../redux/action'
import {withRouter} from 'react-router-dom'
import {PacmanLoader} from 'react-spinners'
import { Link} from 'react-router-dom'

const style = {
    color:"black",
    textDecoration: "none"
}

const Loading = ({}) => (
    <div className="container" style={{position: "fixed",
                                        top: "50%",
                                        left:"50%",
                                        marginTop: "-50px",
                                        marginLeft: "-100px"}} >
                <PacmanLoader
             //   className={override}
            sizeUnit={"px"}
            size={70}
            color={'#36D7B7'}
            loading={true}
            />
    </div>
)
const CartBound = ({
    cart:{items},Amount,checkOut,remove,user
}) => (
    <div className="container">
   <div className="shopping-cart"><h3 className='text-center'>YOUR ORDERS</h3><br/>
   {items === "" ? 
   <div className="text-center" style={{marginTop:"20%"}}>
   <h4>No items in Cart</h4>
   <Link to="/menu" style={style}><button className="btn btn-info">Go to menu</button></Link></div> 
   : null}
   {items.map((data,index)=>(
    <div key={data.id}>
        <Cart data={data} remove={remove} index={index} />
    </div>
    ))}
            <div>
            {items === "" ? null : <div className="text-right" style={{margin: "10px"}}>
                    <button onClick={e=>checkOut(e)} className="btn btn-success btn3d pull-right">Checkout</button>
                    <div className="text-right" style={{margin: "5px"}}>
                        Total price: <b>฿{Amount()}.00</b>
                    </div>
                </div>}
            </div>
        </div>
</div>
)
export default compose(
    withRouter,
    withState('amount','setAmount',""),
    withState('isLoading',"setLoading",false),
    connect(
        ({cart,user})=>({cart,user}),
        dispatch => ({dispatch})
    ),
    withHandlers({
        Amount: ({cart:{items},setAmount})=>_=>{
            let total = 0
            items.map(data=>{
                total+=data['price']*data['qty']
            })
            return total
        },
        checkOut: ({cart:{items},dispatch,amount,user,history:{push},setLoading}) => e=> {
            e.preventDefault();
            setLoading(true)
            let idProduct =[]
            for(let i =0;i<items.length;i++){
                idProduct[i]={
                    id:items[i].id,
                    qty:items[i].qty
                }
            }
            dispatch(createBill(user,idProduct,amount))
            setTimeout(_=>{
              
              setLoading(false)
                push('/cart/bill')
            },5000)
            dispatch(removeAllProductFromCart())
        },
        remove: ({dispatch}) => (index,e) => {
            e.preventDefault();
            dispatch(removeProductFromCart(index))
        }
    }),
    lifecycle({
        componentDidMount(){
            this.props.setAmount(this.props.Amount())
        },
        componentWillReceiveProps(props){
            this.props.setAmount(this.props.Amount())
        }
    }),
    branch(
        ({isLoading}) => !isLoading ,
        renderComponent(CartBound),
        renderComponent(Loading)
    )
)()