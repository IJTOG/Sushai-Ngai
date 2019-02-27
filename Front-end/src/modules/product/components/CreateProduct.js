import React from 'react'
import { Col,Form, FormGroup, Label, Input } from 'reactstrap'
import {
 compose,
 withHandlers,
 withState,
 lifecycle
} from 'recompose'
import { connect } from 'react-redux'
import { uploadGallery,upToCloud,createProduct } from '../../../redux/action'
import FileBase64 from 'react-file-base64'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import {PacmanLoader} from 'react-spinners'

const CreateProduct = ({
 name,detail,setDetail,setName,handleInput,nameOfPic,
 setUri,uri,categories,setCategoryId,categoryId,
 isFetching,isUploaded,insertProduct,uploadGallery
}) => (
    <div className='container' style={{paddingLeft:"5%",paddingRight:"5%"}}><br/>
               <h3 className="text-center">Create Categories</h3><br/>
         <Form>
             { }
             {isFetching ? <div className="container" style={{position: "fixed",
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
                                        </div> :  
                    <div>
                    {!isUploaded ? 
                    <div>
                            <FileBase64
                            multiple={ true }
                            onDone={uri => setUri(uri)} 
                            />
                        <FormGroup row>
                        
                            <Label for="alt_name" sm={2}>name of picture</Label>
                            <Col sm={3}>
                                <Input 
                                    type="text" 
                                    name="alt_name" 
                                    onChange={handleInput}
                                    />
                            </Col>
                            <Col>
                                <button onClick={(e)=>uploadGallery(uri,nameOfPic,e)}>upload</button>
                            </Col>
                        </FormGroup>
                    </div> : <h6> Upload picture already</h6>
                        
                }
           <FormGroup row>
                <Label for="name_en" sm={2}>English name</Label>
                <Col sm={5}>
                    <Input 
                         type="text" 
                         name="name_en" 
                         onChange={handleInput}
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
                    />
                 </Col>
                </FormGroup>
                <FormGroup row>
                <Label for="detail" sm={2}>category</Label>
                <Col sm={5}>
                    <Dropdown options={categories} onChange={out => setCategoryId(out['value'])} placeholder="Select category" />
                </Col>
            </FormGroup>
            <button className="btn btn-primary" onClick={insertProduct}>submit</button>
            </div>  
                                    
            }
       
          </Form>
    </div>
)
export default compose(
    withState('name_en','setNameEn',""),
    withState('isFetching','setFetching',false),
    withState('isUploaded','setUploaded',false),
    withState('name_th','setNameTh',""),
    withState('price','setPrice',""),
    withState('quantity','setQuantity',''),
    withState('categories','setCategories',[]),
    withState('categoryId','setCategoryId',""),
    withState('locationPic','setLocationPic',""),
    withState('nameOfPic','setNameOfPic',""),
    withState('uri','setUri',""),
    connect(
        ({category,gallery})=>({category,gallery}),
        (dispatch,props) => ({
            async uploadGallery(file,nameOfPic,e){
                e.preventDefault()
                props.setFetching(true)
                const uri = file[0].base64
                dispatch(uploadGallery(await upToCloud(uri),nameOfPic))
                props.setFetching(false)
                props.setUploaded(true)
            },
            dispatch
        })
    ),
    withHandlers({
    handleInput: ({setNameEn,setNameTh,setNameOfPic,setQuantity,setPrice}) => ({target}) => {
        switch (target.name) {
            case "name_en": 
               setNameEn(target.value)
                break;
            case "name_th": 
                setNameTh(target.value)
                break;
            case "quantity":
             setQuantity(target.value)
             break
            case "alt_name":
             setNameOfPic(target.value)
             break
             case "price":
             setPrice(target.value)
             break
            default:
                break;
         }
       },
       insertProduct: props => e => {
           e.preventDefault()
           if(!props.isUploaded || props.categoryId == "") alert('please upload picture before you submit or choose categories before')
           const {name_en,name_th,price,quantity,gallery,categoryId,dispatch} = props
           const categories_id = categoryId
           const galleries_id =gallery ['galleryId']
           dispatch(createProduct({
            name_en,name_th,price,quantity,categories_id,galleries_id
           }))
           setTimeout(() => {
            props.history.goBack()
        }, 2000);
       }
    }),
    lifecycle({
        componentDidMount(){
       const cat = this.props.category['items'].map(data=>({
                value: data.id,
                label: data['name_en']
            }))
            this.props.setCategories(cat)
        }
    })
)(CreateProduct)