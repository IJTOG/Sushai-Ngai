import React from 'react'
import axios from 'axios'
import auth from '../../../lib/auth'
import {connect} from 'react-redux'
import {
    lifecycle,
    withState,
    compose
   } from 'recompose'
import Cart from '../../../asset/cart.png'
import Profilepic from '../../../asset/profile.png'
import { Collapse, NavbarToggler, Navbar } from 'reactstrap'
import { Link} from 'react-router-dom'
import styled from 'styled-components'
import { Login } from '../../../modules'
import sushi from '../../../asset/sushi.svg'
import { translate } from 'react-i18next'
import i18n from '../../../i18n'
import { saveSession,deleteSession } from '../../../redux/action/user' 
import '../style.css'
import constants from '../../../constants';

const LoginSignin = styled.button `
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;
    outline:none;
`
const LogoutComponent = styled.button `
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;
    outline:none;
`

const Bar = ({
    Admin,handleClickLogin,isOpenLogin,toggle,isOpen,handleLogout,children,auth:{getToken},t,user
}) => (
    <div>
    <Login handleOpen={handleClickLogin} isOpen = {isOpenLogin} />
    <Navbar className="navbar navbar-expand-lg navbar-dark rounded-top" style={{backgroundColor:"#4E8586"}} sticky="top" >
        <Link to='/'><img src={sushi} alt="sushi" style={{width: '40px', }} /></Link>

            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
            
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                        <Link style={{color:"#F0E8CE"}} to="/" className="nav-link hover-underline-animation" onClick={toggle}>{t('home-navbar-home')}</Link>
                    </li>
                    <li className="nav-item">
                        <Link style={{color:"#F0E8CE"}} to="/menu" className="nav-link hover-underline-animation" onClick={toggle}>{t('home-navbar-menu')}</Link>
                    </li>
                    <li className="nav-item">
                        <Link style={{color:"#F0E8CE"}} to="/about" className="nav-link hover-underline-animation" onClick={toggle}>{t('home-navbar-about')}</Link>
                    </li>
                    <li className="nav-item">
                        <Link style={{color:"#F0E8CE"}} to="/contact" className="nav-link hover-underline-animation" onClick={toggle}>{t('home-navbar-contact')}</Link>
                    </li>
                    <li className="nav-item">
                        {Admin.is_admin === true ? <div><Link to="/adminpanel" style={{color:"#F3C059"}} className="nav-link hover-underline-animation" onClick={toggle}>ADMIN</Link></div> : ""}
                    </li>
                </ul>
                
        
                <ul className="navbar-nav ml-auto">
                <button style={{color:"white",backgroundColor:"#4E8586"}} className="btn" onClick={() => { i18n.changeLanguage('th') }}>TH</button><div style={{borderLeft: "1px solid white"}}></div>
                     <button style={{color:"white",backgroundColor:"#4E8586"}} className="btn" onClick={() => { i18n.changeLanguage('en') }}>EN</button>
                     {
                    getToken() ? 
                    <Link to="/cart" onClick={toggle} className="nav-link"><img style={{width: '26px', }} src={Cart} alt="Cart logo"/></Link>
                    : 
                    <div></div>
                     }
                {
                    getToken() ? 
                    <Link to="/profile" onClick={toggle} className="nav-link"><img style={{width: '25px',borderRadius:'50%',width:'30px',height:'30px' }} src={user['gallery_id'] == null ? Profilepic : user['gallery_id']['location_pic']} alt="profile"/></Link>
                    : 
                    <div></div>
                     }
                        {
                    getToken() ? <LogoutComponent id="font" onClick = {handleLogout} style={{color:'white'}}> Logout </LogoutComponent>   : 
                     <LoginSignin id="font" onClick={handleClickLogin} style={{color:'white'}}>Signin</LoginSignin> 
                     }
                </ul>
            </Collapse>
        </Navbar>
        {children}
  </div>
)

export default compose(translate(),
withState('Admin','setAdmin',""),
connect(
    ({user}) => ({user}),
     (dispatch) => ({
        saveUser(user){
            dispatch(saveSession(user))
        },
        deleteUser(){
            dispatch(deleteSession())
        }
     })
),
lifecycle({
    componentDidMount( deleteUser ){
        if(auth.getToken()){
        const { setAdmin } = this.props
          axios.post(`${constants.API}/users/profile`,{},
          { headers: { Authorization: auth.getToken() } })
            .then( ({data:{user}})  => {
                setAdmin(user)
                this.props.saveUser(user)
          })
          .catch( (err) => {
          if(err) {
            this.props.deleteUser()
            auth.removeToken()}}
          )
        }
    }
}),

     )(Bar)