import React from 'react'
import ReactTable from 'react-table'
import {
    compose,
    lifecycle,
  } from 'recompose'
  import {connect} from 'react-redux'
  import {
    loadProducts
  } from '../../../redux/action'
  import {PacmanLoader} from 'react-spinners'
import {withRouter} from 'react-router-dom'
import withAdminCheck from '../../../lib/hoc/withAdminCheck'

const columns = [{
    Header: 'Id',
    accessor: 'id',
    maxWidth: 60,
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    Header: 'name',
    accessor: 'name_en' // String-based value accessors!
  },{
    Header: 'quantity',
    maxWidth: 100,
    accessor: 'quantity' // String-based value accessors!
  }, {
    Header: 'price',
    maxWidth: 100,
    accessor: 'price' // String-based value accessors!
  }
] // columns setting

const ProductTable = ({
 product:{items,isLoading},history:{goBack}
}) => {
    return(
      <div >
                        <button className="btn btn-danger" style={{margin:"20px"}} onClick={()=>goBack()} >Back</button>
          {isLoading ? 
                        <div className="container" 
                                style={{position: "fixed",
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
                        </div>  :              <ReactTable
                                                data={items}
                                                columns={columns}/>
                                  
        }   
      </div>
    )  
}

export default compose(
    withRouter,
    withAdminCheck,
    connect(
        ({product})=>({product}),
        dispatch => ({
           loadProducts(){
             dispatch(loadProducts())
           }
        })
      ),
      lifecycle({
          componentDidMount(){
              this.props.loadProducts()
          }
      })
)(ProductTable)