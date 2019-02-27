import React from 'react'
import { HowTo , Carousel } from './components'
import { Link } from 'react-router-dom'
import {translate} from 'react-i18next'
import './style.css'

const Home = ({t}) => (
   
    <div> 
        <div className="justify-content">
            <br/>
            <h1 className="text-flicker-in-glow">
                Sushi'Ngai 
            </h1>
                <br />
            <h2 style={{color:"black",textAlign:"center"}}>
                {t('home-delivery')}
            </h2>
            <br />
        </div>
           <Carousel/>
            <br />
            <br />
        <div className="container">
         <HowTo />
        </div>
        <br />
        <br />
        <h1 style={{textAlign:"center"}}>
           <Link className="btn btn-danger font-weight-bold btn3d" style={{color:"white",backgroundColor:"#F21C34"}} to={`/menu`}>START ORDERING</Link>{" "}
        </h1>
        <div className='text-center'><a className='manual' target="_blank" href="https://docs.google.com/document/d/1NGJxP9dmlimUTRxRn5tXoqUFvvouWaVRIC1QBUGTP5U/edit">ดูคู่มือการใช้งาน</a></div>
        <br />
    </div>

    )
export default translate()(Home)