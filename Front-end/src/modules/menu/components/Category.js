import React from 'react'
import {Link} from 'react-router-dom'
import {
 lifecycle,
 branch,
 renderComponent,
 compose
} from 'recompose'
import {
    connect
} from 'react-redux'
import { 
    saveCategory ,
    deleteCategory ,
    loadCategories,
} from '../../../redux/action'
import {PacmanLoader} from 'react-spinners'
import './style.css'

const Style = {
    color:"white",
    backgroundColor:"#4E8586"
}

const Fetch = _ => (
    <div className="container" style={{position: "fixed",
                                        top: "50%",
                                        left:"50%",
                                        marginTop: "-50px",
                                        marginLeft: "-200px"}}>
            <PacmanLoader
             //   className={override}
            sizeUnit={"px"}
            size={70}
            color={'#36D7B7'}
            loading={true}
            />
    </div>
    
)
{/* <Link style={Style} className="font-weight-bold btn btn-danger btn3d btn-block" to={`/menu/products/${data.id}`}>Go to Menu</Link>{" "}
                {user.is_admin === true ? <Link style={Style} className="font-weight-bold btn btn-danger btn3d btn-block" to={`/menu/edit/${data.id}`}>Edit</Link> : null}
                {user.is_admin === true ?<button style={Style} className="font-weight-bold btn btn-danger btn3d btn-block" onClick={(e) => deleteCategory(data,e) }>DELETE</button>: null} */}

const Categories = ({
    deleteCategory,items,user
})=> (  
    items.map( data=>{
    return (
      <div className="container" style={{width:"330px"}} key={data.id}>
        <div className="row" id="ads">
    <div style={{width:"330px"}}>
    <Link className="text" to={`/menu/products/${data.id}`}>
        <div className="card border-Info" >
            <div className="card-image">
                <span className="card-notify-year">SALE</span>
                <img className="img-fluid rounded-top" style={{width:"100%",height:"200px"}} src={data['gallery_id']['location_pic']} alt="Alternate Text" />
            </div>
            <div className="card-body text-center">
                <div className="ad-title m-auto">
                    <h3 style={{color:"black"}}>{data['name_en']}</h3>
                </div>
            </div>
    
        </div></Link>
    </div></div>
    {user.is_admin === true ? <Link className="font-weight-bold btn btn-info btn3d btn-block" to={`/menu/edit/${data.id}`}>Edit</Link> : null}
                {user.is_admin === true ?<button className="font-weight-bold btn btn-danger btn3d btn-block" onClick={(e) => deleteCategory(data,e) }>DELETE</button>: null}

       </div>
    )
    })
)

export default compose(
    connect(
        ({category:{items,isLoading},user}) => ({items,isLoading,user}),
         dispatch => ({
            saveCategory({id,name,detail}){
                dispatch(saveCategory({id,name,detail}))
            },
            deleteCategory({id},e){
                e.preventDefault();
                dispatch(deleteCategory({id}))
            },
            loadCategories(){
                dispatch(loadCategories())
            }
        })
    ),
    lifecycle({
        componentDidMount(){
            this.props.loadCategories()
        },
        componentWillReceiveProps(nextProps){
            if((nextProps.items.length!=this.props.items.length) && this.props.items > 0)
            this.props.loadCategories()
        }
    }),
    branch(
        ({isLoading}) => !isLoading,
         renderComponent(Categories),
         renderComponent(Fetch)
    )
)()