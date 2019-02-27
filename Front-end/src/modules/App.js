import React from 'react'
import {Route,Switch} from 'react-router-dom'
import {
     Home,
     Header,
     Menu,
     About,
     Contact,
     Footer,
     Profile,
     NoMatch,
     Adminpanel
} from './'
import Icon from '../asset/IconSE2.jpg'
import Edit from './menu/components/EditCategory'
import ProfileEdit from './profile/EditProfile'
import CreateCategory from './menu/components/CreateCategory'
import Devtool from './Devtool';
import Pro from './product/products' 
import {translate} from 'react-i18next'
import Cart from './cart'
import Bill from './cart/components/Bill'
import BillTable from './adminPanel/components/billTable'
import UserTable from './adminPanel/components/UsersTable'
import ProductTable from './adminPanel/components/ProductTable';
import EditProduct from './product/components/EditProduct'
import CreateProduct from './product/components/CreateProduct'
import feqQuestions from './policy/feqQuestions'
import privacyPolicy from './policy/privacyPolicy'
import TermsOfUse from './policy/TermsOfUse'

const sectionStyle = {
    backgroundAttachment: 'fixed',
    backgroundColor:"#EEEEEE",
	//backgroundImage: `url(${Background})`,
	backgroundSize: 'cover',
}

const Backgroundcontent = {
    minHeight:"700px",
	padding: '0px 0px 0px 0px',
	backgroundColor: '#F0E8CE',
}

const ScrollToTop = () => {
    window.scrollTo(0, 0);
    return null;
  };

const App= (user) => (
   <div style={sectionStyle}>
        <div className="container" >
					<img src={Icon} alt="sushi" style={{width: '20%'}} />
				</div>
        <div className='container' style={Backgroundcontent}>
        <Header>
            <Switch>
             <Route exact path ='/' component={Home} />
             <Route exact path ='/menu' component={Menu} />
             <Route exact path ='/about' component={About} />
             <Route exact path ='/contact' component={Contact} />
             <Route exact path ='/menu/product/create' component={CreateProduct} />
             <Route exact path ='/menu/products/:id' component={Pro} />
             <Route exact path ='/menu/products/edit/:id' component={EditProduct} />
             <Route exact path ='/menu/create' component={CreateCategory} />
             <Route exact path ='/profile' component={Profile} />
             <Route exact path ='/menu/edit/:id' component={Edit} />
             <Route exact path ='/profile/edit' component={ProfileEdit} />
             <Route exact path ='/adminpanel' component={Adminpanel} />
             <Route exact path ='/cart' component={Cart} />
             <Route exact path ='/cart/bill' component={Bill} />
             <Route exact path = '/adminpanel/users' component ={UserTable} />
             <Route exact path = '/adminpanel/bills' component ={BillTable} />
             <Route exact path = '/adminpanel/products' component ={ProductTable} />
             <Route exact path ='/policy/privacyPolicy' component={privacyPolicy} />
             <Route exact path ='/policy/feqquestions' component={feqQuestions} />
             <Route exact path ='/policy/TermsOfUse' component={TermsOfUse} />
             <Route component={NoMatch} />
             </Switch>
        </Header>
        </div>
        <div className='container rounded-bottom' style={{height:"30px",backgroundColor:"#4E8586"}}></div>
          
        <Footer/>
    </div>
)


export default  translate()(App)
