import React from 'react'
import ReactTable from 'react-table'
import {
  compose,
  lifecycle
} from 'recompose'
import {connect} from 'react-redux'
import { 
  loadBillsByAdmin,
  loadBillsStatusByAdmin,
  changeStatusByAdmin,
} from '../../../redux/action'
import {withRouter} from 'react-router-dom'
import {PacmanLoader} from 'react-spinners'
import withAdminCheck from '../../../lib/hoc/withAdminCheck'

const columns = [{
    Header: 'Bill Id',
    accessor: 'billId',
    maxWidth: 50,
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    Header: 'username',
    maxWidth: 180,
    accessor: 'customerName' // String-based value accessors!
  },{
    Header: 'Order',
    accessor: 'products' // String-based value accessors!
  }, {
    Header: 'price',
    maxWidth: 50,
    accessor: 'amount' // String-based value accessors!
  }, {
    Header: 'date',
    maxWidth: 140,
    accessor: 'date' // String-based value accessors!
  },{
    Header: 'status',
    maxWidth: 120,
    accessor: 'status' // String-based value accessors!
  },{
    id: 'edit',
    accessor: 'seq',
    maxWidth: 180,
    getProps: px => ({px}),
    Cell: ({original:{billId,amount,customerName,date},columnProps:{rest:{px:{changeStatus}}}}) => <div>
        <button type="button" className="btn btn-primary btn-sm btn3d" onClick={() => changeStatus({amount,date,customerName,status:"done"},billId)}>Confirm</button>
        <button type="button" className="btn btn-danger btn-sm btn3d" onClick={() => changeStatus({amount,date,customerName,status:"cancel"},billId)}>Cancel</button>
        </div>
  },
] // columns setting

const BillsTable = ({
  admin:{items,isLoading},changeStatus,loadBills,loadBillsByStatus,history:{goBack}
}) => {
    return(
      <div>
        <button className="btn btn-danger" style={{margin:"20px"}} onClick={()=>goBack()} >Back</button>

        <div class="dropdown">
            <button class="dropbtn btn">Status</button>
            <div class="dropdown-content">
             <a onClick={()=>loadBills()}>All</a>
              <a onClick={()=>loadBillsByStatus('onProgress')}>OnProgress</a>
              <a onClick={()=>loadBillsByStatus('done')}>Done</a>
              <a onClick={()=>loadBillsByStatus('cancel')}>Cancel</a>
            </div>
        </div>

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
                        </div>  :  <ReactTable
                                      data={items}
                                      columns={columns}
                                      changeStatus={changeStatus}
                                      SubComponent={ row => <div className="container">{row.original.products}</div>}/>
        }
      </div>
    )  
}

export default compose(
  withRouter,
  withAdminCheck,
  connect(
    ({admin})=>({admin}),
    dispatch => ({
       loadBills(){
          dispatch(loadBillsByAdmin())
       },
       loadBillsByStatus(status){
         dispatch(loadBillsStatusByAdmin(status))
         
       },
       changeStatus(value,id){
          dispatch(changeStatusByAdmin(value,id))
    
       }
    })
  ),
  lifecycle({
    componentDidMount(){
      this.props.loadBills()
    }
  })
)(BillsTable)