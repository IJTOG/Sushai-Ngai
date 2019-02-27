import React from 'react'
import Profilepic from '../../asset/profile.png'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { Row } from 'reactstrap'
import './style.css'

const Profile = ({ user}) => (
    <div className="container" style={{padding:"5%"}}>
    <div style={{textAlign:"center"}} ><h3>Profile</h3></div><hr/><br/><br/>
        <Row>
        <div className="col-md-6 img" style={{textAlign:"center",padding:"5%"}}>
        <img src={user['gallery_id'] == null ? Profilepic : user['gallery_id']['location_pic'] } style={{borderRadius:'50%',width:'300px',height:'300px' }} alt="profile" className="img-rounded"></img>
      </div>
      <div style={{borderLeft: "3px solid",padding:"5%"}}>
      <blockquote>
      <h5>{user.first_name} {user.last_name}</h5>
        <small><cite title="Source Title">{user.address}<i className="icon-map-marker"></i></cite></small>
      </blockquote>
      <p>
        {user.email} <br/>
        {user.tel} <br/><br/>
        <Link to='/profile/edit' className="btn btn-info btn3d">Edit address</Link>
      </p>
      </div>
        </Row>
        <br/>
     </div>
)

export default 
    connect(
      ({user}) => ({user}),
       null
    )(Profile)