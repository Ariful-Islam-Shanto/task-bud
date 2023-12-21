import React from "react";
import Banner from "./Banner/Banner";
import Navbar from "../../Components/Navbar/Navbar";
import UserBenefits from "./UserBenefitsShowcase/UserBenefits";
import Container from "../../Components/Container/Container";

const Home = () => {
  return (
    <div>
      <div
        style={{
          background: `url("https://i.postimg.cc/cJTZb0LS/Bannger.png")`,
        }}
        className="bg-cover"
      >
        <Navbar />
        <Banner />
      </div>
      <Container>
        <UserBenefits />
      </Container>
    </div>
  );
};

export default Home;
