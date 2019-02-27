import React from 'react'
import { Col,Form, FormGroup, Label, Input } from 'reactstrap'
import {
 compose,
 withHandlers,
 withState,
 lifecycle,
} from 'recompose'
import { connect } from 'react-redux'
import { loadProduct,editProduct } from '../../../redux/action'
import { withRouter } from 'react-router-dom'
import './style.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import {PacmanLoader} from 'react-spinners'


const EditCategory = ({
    handleInput,detail:{name_en,name_th,price,quantity,category},categories,setDetail,detail,editProduct,product:{isLoading}
}) => (
    <div className="container"><br/>
    <h3 className='text-center'>Edit product</h3><br/>
    {isLoading?                             <PacmanLoader
                                            //   className={override}
                                            sizeUnit={"px"}
                                            size={150}
                                            color={'#36D7B7'}
                                            loading={true}
                                            /> :
                                            <Form className="container text-center"> 
           <FormGroup row>
                <Label for="name_en" sm={2}>English name</Label>
                <Col sm={5}>
                    <Input 
                         type="text" 
                         name="name_en" 
                         onChange={handleInput}
                         value={name_en}
                    />
                </Col>
             </FormGroup>
             <FormGroup row>
                <Label for="name_th" sm={2}>thai name</Label>
                <Col sm={5}>
                    <Input 
                         type="text" 
                         name="name_th" 
                         onChange={handleInput}
                         value={name_th}
                    />
                </Col>
             </FormGroup>
                <FormGroup row>
                <Label for="price" sm={2}>price</Label>
                <Col sm={5}>
                    <Input 
                        type="text" 
                        name="price"
                        onChange={handleInput}
                        value={price}
                    />
                </Col>
            </FormGroup>
                <FormGroup row>
                <Label for="quantity" sm={2}>qty</Label>
                <Col sm={5}>
                    <Input 
                        type="text" 
                        name="quantity"
                        onChange={handleInput}
                        value={quantity}
                    />
                 </Col>
                </FormGroup>
                <FormGroup row>
                <Label for="detail" sm={2}>category</Label>
                <Col sm={5}>
                    <Dropdown options={categories}   
                    onChange = {out => setDetail({...detail,['category']:out['label'],['categories_id']:out['label']})} 
                    placeholder={category} 
                    />
                </Col>
            </FormGroup>
            <button className="btn btn-primary" onClick={(e)=>editProduct(e,detail)}>submit</button>
     </Form>
                                        }
</div>
)
export default compose(
    withRouter,
    withState('categories','setCategories',[]),
    withState('detail','setDetail',{
        name_en:'',
        name_th:'',
        quantity:0,
        price:0,
        categories_id:'',
        galleries_id:'',
        category:''
    }),
    connect(
        ({product,category},{match}) => ({product,match,category}),
        (dispatch,props) => ({
            editProduct(e,value){
                e.preventDefault()
                const id = props.match.params.id
                const {name_en,name_th,quantity,categories_id,galleries_id,price} = value
                dispatch(editProduct({name_en,name_th,quantity,price,categories_id,galleries_id,id}))
            },
            dispatch
        })
    ),
    withHandlers({
        handleInput: ({detail,setDetail}) => e => {
            const handle = {
                ...detail,
                [e.target.name]:e.target.value
            }
            setDetail(handle)
        },
        loadProduct: props =>  _ =>{   
            const {match:{params:{id}},setDetail,product:{items},dispatch} = props
            dispatch(loadProduct(id))
                
        }
    }),
    lifecycle({
        componentDidMount(){
            this.props.loadProduct()
            const cat = this.props.category['items'].map(data=>({
                value: data.id,
                label: data['name_en'],
            }))
            this.props.setCategories(cat)
        },
        componentWillReceiveProps(nextProps){
            const items = nextProps.product.items
             if(nextProps.product.items.length !== this.props.product.items.length){
                 console.log(this.props.detail.price,"ss");
                    if(items[0])
                     nextProps.setDetail({
                        name_en:items[0]['name_en'],
                        name_th:items[0]['name_th'],
                        quantity:items[0]['quantity'],
                        price:items[0]['price'],
                        category:items[0]['categories_id']['name_en'],
                        categories_id:items[0]['categories_id']['id'],
                        galleries_id:items[0]['galleries_id']['id']
                    })

             }
        }
    })     
)(EditCategory)