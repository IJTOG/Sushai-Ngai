import React from 'react'
import {connect} from 'react-redux'
import '../style.css'

const Cart = ({
data,remove,index
}) => (
        <div className="container"><br/>
                    <div className="row" style={{paddingRight:"15px"}}>
                        <div className="col text-center">
                                <img className="img-responsive" src={data['locationPic']} alt="product" width="100" height="100"></img>
                        </div>
                        <div className="col text-sm-center text-md-left ">
                            <h4 className="product-name"><strong>{data['name']}</strong></h4>
                        </div>
                        <div className=" text-sm-center col text-md-right row">
                            <div className="col text-md-right" style={{paddingTop: "5px"}}>
                                <h6><strong>฿{data['price']} x {data['qty']}</strong></h6>
                            </div>
                            <div className="col text-right">
                                <button  type="button" onClick={e=>remove(index,e)} className="btn btn-danger btn3d btn-xs">
                                    remove
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr/>
            </div>
        
)
export default connect(
     null
 )(Cart)