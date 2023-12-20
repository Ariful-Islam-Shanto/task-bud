import React from 'react';
import Banner from './Banner/Banner';
import Navbar from '../../Components/Navbar/Navbar';



const Home = () => {

    return (
        <div>
           <div style={{
            background : `url("https://i.postimg.cc/cJTZb0LS/Bannger.png")`
           }} className='bg-cover'>
           <Navbar/>
           <Banner/>
           </div>
        </div>
    );
};

export default Home;