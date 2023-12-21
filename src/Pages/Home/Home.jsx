import React from "react";
import Banner from "./Banner/Banner";
import Navbar from "../../Components/Navbar/Navbar";
import UserBenefits from "./UserBenefitsShowcase/UserBenefits";
import Container from "../../Components/Container/Container";
import Footer from "./Footer/Footer";

const Home = () => {
  return (
    <div>
      <div
        style={{
          background: `url("https://i.postimg.cc/cJTZb0LS/Bannger.png")`,
          backgroundRepeat : 'no-repeat',
          backgroundSize : 'cover'
        }}
        className="bg-cover w-full"
      >
        <Navbar />
        <Banner />
      </div>
      <Container>
        <UserBenefits />
      </Container>
      <Footer/>
    </div>
  );
};

export default Home;
