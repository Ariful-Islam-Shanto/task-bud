import React from "react";
import Banner from "./Banner/Banner";
import Navbar from "../../Components/Navbar/Navbar";
import UserBenefits from "./UserBenefitsShowcase/UserBenefits";
import Container from "../../Components/Container/Container";
import Footer from "./Footer/Footer";
import { motion, useScroll, useSpring } from "framer-motion";

const Home = () => {

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });

  return (
    <div>
              <motion.div style={{
                 scaleX ,
               position: "fixed",
                 top: 0,
                 left: 0,
                 right: 0,
                 height: "10px",
                 background: "#3b82f6",
                 transformOrigin : "0%",
              }} className="progress-bar"  />
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
