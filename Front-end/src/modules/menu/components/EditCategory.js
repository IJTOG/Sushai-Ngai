import React from 'react'
import { Col,Form, FormGroup, Label, Input } from 'reactstrap'
import {
 compose,
 withHandlers,
 withState,
 lifecycle,
} from 'recompose'
import { connect } from 'react-redux'
import { editCategory as Edit, loadCategory } from '../../../redux/action'
import { withRouter } from 'react-router-dom'
import './style.css'

const EditCategory = ({
    handleInput,editCategory,detail
}) => (
    <div className="container"><br/>
    <h3 className='text-center'>Edit category</h3><br/>
    <Form className="container text-center"> 
       <FormGroup row>
           <Label for="name_en" sm={2}>English name</Label>
           <Col sm={5}>
               <Input 
                    type="text" 
                    name="name_en"
                    value={detail['name_en']}
                    onChange={handleInput}
               />
           </Col>
        </FormGroup>
        <FormGroup row>
           <Label for="name_th" sm={2}>Thai name</Label>
           <Col sm={5}>
               <Input 
                    type="text" 
                    name="name_th"
                    value={detail['name_th']}
                    onChange={handleInput}
               />
           </Col>
        </FormGroup>
           <FormGroup row>
           <Label for="detail" sm={2}>detail</Label>
           <Col sm={5}>
               <Input 
                   type="textarea" 
                   name="detail"
                //    size={1000}
                   value={detail['detail']}
                   onChange={handleInput}
               />
           </Col>
       </FormGroup>
       <button className="btn btn-primary btn3d" onClick={(e) => editCategory(e)}>submit</button>
     </Form>
</div>
)
export default compose(
    withRouter,
    withState('detail','setDetail',{
        name_en:'',
        name_th:'',
        detail:'',
        gallery_id:''
    }),
    connect(
        ({category:{items}},{match}) => ({items,match}),
        (dispath,props) => ({
            editCategory: (e) => {
                e.preventDefault();
                const {detail,match:{params:{id}}} = props
                const body = {
                    ...detail,
                    id
                }
                dispath(Edit(body))
                setTimeout(_ => {
                props.history.goBack()
                },1000)
            },
            loadCategory:id => {
                dispath(loadCategory(id))
            }
        })
    ),
    lifecycle({
        componentDidMount(){
            const save =  this.props.items.filter( data => data.id == this.props.match.params.id)
            this.props.setDetail({
                name_en:save[0]['name_en'],
                name_th:save[0]['name_th'],
                detail:save[0]['detail'],
                gallery_id:save[0]['gallery_id'],
            })
        }
    }),
    withHandlers({
        handleInput: ({detail,setDetail}) => ({target}) =>{
            setDetail({
                ...detail,
                [target.name]:[target.value]
            })
        }
    })
)(EditCategory)