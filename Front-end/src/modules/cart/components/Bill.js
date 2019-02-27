import React from 'react'
import './style.css'
import {
    compose,
    lifecycle,
    branch,
    renderComponent
} from 'recompose'
import BillTemplate from './BillTemplate'
import {connect} from 'react-redux'
import {loadBill} from '../../../redux/action'
import {PacmanLoader} from 'react-spinners'
const Loading = () => (
    <div>
    <PacmanLoader
      //   className={override}
             sizeUnit={"px"}
              size={150}
            color={'#36D7B7'}
            loading={true}
    />
    </div>
)
const Bill =({
    bill
}) => (
    <BillTemplate  bill={bill['items'][0]} />
)
export default compose(

    connect(
        ({bill})=>({bill}),
        (dispatch,props) => ({
            loadBill(id){
                dispatch(loadBill(id))
            }
        })
    ),
    lifecycle({
        async componentDidMount(){
            await this.props.loadBill(this.props.bill['billId'])
         }
    }),
    branch(
        ({bill:{isLoading}}) => !isLoading ,
        renderComponent(Bill),
        renderComponent(Loading)
    )
)()