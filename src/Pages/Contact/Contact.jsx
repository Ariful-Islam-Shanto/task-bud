import React, { useRef } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import emailjs from "@emailjs/browser";
import swal from "sweetalert";
import { MdOutlineEmail } from "react-icons/md";
import { FaGithub, FaPhoneAlt } from "react-icons/fa";
import { TiSocialFacebook, TiSocialLinkedin } from "react-icons/ti";
import Container from "../../Components/Container/Container";
import Navbar from "../../Components/Navbar/Navbar";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    swal({
      title: "Are you sure?",
      text: "Once clicked, you message will send as email to Ariful Islam!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        emailjs
          .sendForm(
            "service_p8tiin2",
            "template_azoe898",
            form.current,
            "UbTME6GzJVjIOtO-k"
          )
          .then(
            (result) => {
              console.log(result.text);
              swal("Your message has been send!", {
                icon: "success",
              });
              e.target.reset();
            },
            (error) => {
              console.log(error.text);
              swal("Oops", error.text, "error");
              e.target.reset();
            }
          );
      } else {
        swal("Your message is not sent!");
        e.target.reset();
      }
    });
  };

  return (
    <div>
      <Navbar />
     
      
      <div
        id="contact"
        className="border-t-2 border-b-2 border-[#03045E] py-12 space-y-8 w-full"
      >
        {/* <h1 className="text-5xl flex items-center text-[#3b82f6] font-medium ">
          Contact <IoIosArrowRoundForward className="text-8xl" />
        </h1> */}
        <Container>
        <h2 className="text-3xl flex items-center font-semibold mb-4">Contact Us <IoIosArrowRoundForward className="text-5xl" /></h2>
          <div className="hero min-h-[calc(100vh-120px)] bg-transparent backdrop-blur-2xl  ">
            <div className="flex flex-col items-center lg:items-start lg:flex-row-reverse gap-12 w-full">
              <div className=" text-center flex flex-col gap-6 md:text-center lg:text-left justify-between  h-full">
                <h1 className="text-5xl text-center lg:text-left text-[#03045E] font-bold border-b-2 pb-6 border-[#03045E]">
                  Have questions or feedback? We'd love to hear from you! Fill
                  out the form below, and we'll get back to you as soon as
                  possible.
                </h1>

                <div className="h-full"></div>
                <p className=" flex text-center md:text-left items-center gap-3 text-[#03045E] font-semibold justify-center lg:justify-start">
                  <MdOutlineEmail /> mdarifulislam1077@gmail.com
                </p>
                <p className=" flex items-center gap-3 text-[#03045E] font-semibold justify-center lg:justify-start">
                  <FaPhoneAlt /> +01843419177
                </p>

                <div className=" text-[#03045E] text-2xl flex items-center gap-4 justify-center lg:justify-start">
                  <a href="https://web.facebook.com/mdarifulislam.shanto.96/">
                    <TiSocialFacebook />
                  </a>
                  <a href="https://www.linkedin.com/in/ariful-islam-1631a72a3/">
                    <TiSocialLinkedin />
                  </a>
                  <a href="https://github.com/Ariful-Islam-Shanto">
                    <FaGithub />
                  </a>
                </div>
              </div>
              <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-gradient-to-r h-full  from-[#13192d] to-[#1c2d5f]">
                <form
                  ref={form}
                  onSubmit={sendEmail}
                  className="card-body text-white"
                >
                  <div className="form-control text-white">
                    <label className="label">
                      <span className="label-text text-white">Your name</span>
                    </label>
                    <input
                      name="user_name"
                      type="text"
                      placeholder="your name"
                      className="p-3 text-white border-b-2 bg-transparent border-[white] rounded-lg input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control text-white">
                    <label className="label">
                      <span className="label-text text-white">Your Email</span>
                    </label>
                    <input
                      name="user_email"
                      type="email"
                      placeholder="email"
                      className="p-3  text-white border-b-2 bg-transparent border-[white] rounded-lg  input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Message</span>
                    </label>
                    <textarea
                      type="text"
                      placeholder="message"
                      className=" text-white p-3 rounded-lg border-b-2 bg-transparent border-[white] input-bordered"
                      name="message"
                      id=""
                      cols="30"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="form-control mt-6">
                    <button
                      type="submit"
                      className="btn border-none bg-[#3b82f6] text-gray-700 hover:text-white"
                    >
                      Send message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Contact;
