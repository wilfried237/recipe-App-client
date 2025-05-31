import './404.css'
import Footer from '../footer/Footer';
import { useNavigate } from "react-router-dom";

export default function F404(){
    const navigate = useNavigate();
    return(
    <>
    <div className='hwq'>
        <div style={{height: "100vh", width: "100%"}} className='d-flex flex-column text-center justify-content-center align-items-center'>
            <p className='fs-1 fw-bold'>404</p>
            <p className='fs-4 fw-medium'>Page Not Found</p>
            <button onClick={()=>{navigate('/')}} className='saveBtn btn btn-lg btn-primary px-4 px-md-5 text-uppercase fs-4 fw-medium'>Go to home page</button>
        </div>
    </div>
    <Footer/>
    </>);
}