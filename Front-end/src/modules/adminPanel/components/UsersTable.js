import React from 'react'
import ReactTable from 'react-table'
import {
    compose,
    lifecycle,
  } from 'recompose'
  import {connect} from 'react-redux'
  import {
    loadUsers
  } from '../../../redux/action'
  import {PacmanLoader} from 'react-spinners'
import {withRouter} from 'react-router-dom'
import withAdminCheck from '../../../lib/hoc/withAdminCheck'

const columns = [{
    Header: 'Id',
    accessor: 'id',
    maxWidth: 50,
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    Header: 'name',
    accessor: 'first_name' // String-based value accessors!
  },{
    Header: 'username',
    accessor: 'username' // String-based value accessors!
  }, {
    Header: 'tel',
    maxWidth: 100,
    accessor: 'tel' // String-based value accessors!
  }, {
    Header: 'email',
    maxWidth: 140,
    accessor: 'email' // String-based value accessors!
  },{
    Header: 'address',
    accessor: 'address' // String-based value accessors!
  }
] // columns setting

const UsersTable = ({
  user:{items,isLoading},history:{goBack}
}) => {
    return(
      <div>
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
                        </div>  : <ReactTable
                                    data={items}
                                    columns={columns}
                                    SubComponent={ row => <div className="container">{row.original.products}</div>}/>
        }   
      </div>
    )  
}

export default compose(
  withRouter,
  withAdminCheck,
    connect(
        ({user})=>({user}),
        dispatch => ({
           loadUsers(){
             dispatch(loadUsers())
           }
        })
      ),
      lifecycle({
          componentDidMount(){
              this.props.loadUsers()
          }
      })
)(UsersTable)