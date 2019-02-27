import React from 'react'
import Category from './components/Category'
import {Row} from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './components/style.css'
const Menu = ({user}) => (
            <div className='container'>
                <h1 style={{textAlign:"center",marginTop:"30px"}}> Choose Sushi Categories</h1>
                { user.is_admin === true ? <Link  className="btn btn-primary btn3d" to= '/menu/create'>Create</Link> : null}
                <div className="container">
                    <Row width="20px">
                    <Category />
                    </Row>
                </div>
            </div>
)
export default connect(
    ({user}) => ({user}),
     null
  )(Menu)
  