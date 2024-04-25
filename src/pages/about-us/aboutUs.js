import './aboutUs.css';
import Footer from '../../components/footer/Footer';
import Donut from '../../images/pexels-mccutcheon-1191639.jpg';
import Grape from '../../images/pexels-suzyhazelwood-1098537.jpg';
export default function AboutUs(){
    let profiles = [
        {
            image_url: "https://randomurl.com/profile1.jpg",
            name: "John Doe",
            role: "Head Chef"
        },
        {
            image_url: "https://randomurl.com/profile2.jpg",
            name: "Jane Smith",
            role: "Sous Chef"
        },
        {
            image_url: "https://randomurl.com/profile3.jpg",
            name: "Alex Johnson",
            role: "Waiter"
        },
        {
            image_url: "https://randomurl.com/profile4.jpg",
            name: "Emily Davis",
            role: "Hostess"
        },
        {
            image_url: "https://randomurl.com/profile5.jpg",
            name: "Mike Wilson",
            role: "Bartender"
        },
        {
            image_url: "https://randomurl.com/profile6.jpg",
            name: "Sarah Brown",
            role: "Server"
        },
        {
            image_url: "https://randomurl.com/profile7.jpg",
            name: "Chris Lee",
            role: "Busser"
        },
        {
            image_url: "https://randomurl.com/profile8.jpg",
            name: "Olivia Martinez",
            role: "Sommelier"
        },
        {
            image_url: "https://randomurl.com/profile9.jpg",
            name: "Michael Taylor",
            role: "Line Cook"
        },
        {
            image_url: "https://randomurl.com/profile10.jpg",
            name: "Ava Garcia",
            role: "Pastry Chef"
        },
        {
            image_url: "https://randomurl.com/profile11.jpg",
            name: "William Clark",
            role: "Food Runner"
        },
        {
            image_url: "https://randomurl.com/profile12.jpg",
            name: "Sophia Anderson",
            role: "Dishwasher"
        }
    ];
    
    return(
        <>
        <div className='container'>
            <p className='mt-5 mb-3 fs-1 fw-medium'>About</p>
            <hr/>
            <div>
                <h1 className='fw-medium mt-3'>We’re a group of foodies who love cooking and the internet</h1>
                <img src={Donut} className='img-fluid'/>
                <p className='m-0 fs-2 mt-3 mb-5'>
                    Food qualities braise chicken cuts bowl through slices butternut snack. 
                    Tender meat juicy dinners. One-pot low heat plenty of time adobo fat raw soften fruit. 
                    sweet renders bone-in marrow richness kitchen, fricassee basted pork shoulder. 
                    Delicious butternut squash hunk.
                </p>
            </div>
            <div className='row justify-content-center align-items-center my-5'>
                <div className='d-flex flex-column col'>
                    <p className='fs-1 m-0 fw-medium'>Simple, Easy Recipes for all</p>
                    <p className='fs-4 mt-3'>
                            Juicy meatballs brisket slammin' baked shoulder. Juicy smoker soy sauce burgers brisket. 
                            polenta mustard hunk greens. Wine technique snack skewers chuck excess. Oil heat slowly. 
                            slices natural delicious, set aside magic tbsp skillet, bay leaves brown centerpiece.
                    </p>
                </div>

                <img src={Grape} height="300" width="300" style={{objectPosition:"center", objectFit:"contain"}} className='col img-fluid col-md-12'/>
            </div>
            <p className='fs-1 fw-medium'>An incredible team of talented chefs and foodies</p>
            <div className='d-flex flex-wrap gap-5 align-items-center justify-content-center'>
                {profiles.map((element,index)=>{
                    return(
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <img height={150} width={150} key={index} src={Donut} alt={element.name} className='rounded-circle object-fit-cover'/>
                            <p   key={index} className='m-0 fs-4 fw-medium'>{element.name}</p>
                            <p   key={index}>{element.role}</p>
                        </div>
                    );
                })}
            </div>
        </div>
        <Footer/>
        </>

    )
}