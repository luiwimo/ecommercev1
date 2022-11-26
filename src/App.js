import './App.css';
import Navbar from './components/Navbar';
import Product from './components/Product';
import Products from './components/Products';
import CheckoutPage from './components/CheckoutPage';
import {Routes, BrowserRouter as Router, Route} from 'react-router-dom';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import { useEffect } from 'react';
import { auth } from './firebase';
import { actionTypes } from './Reducer';
import { useStateValue } from './StateProvider';
import Checkout from './components/CheckoutForm/Checkout';

function App() {
  const [{user}, dispatch] = useStateValue();

  useEffect(()=>{
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if(authUser) {
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        });
      }
    })
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
        <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/checkout-page" element={<CheckoutPage/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/" element={<Products/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
