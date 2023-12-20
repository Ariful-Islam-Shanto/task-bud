import React from "react";
import Container from "../../Components/Container/Container";

const Login = () => {
  return (
    <div>
      <Container>
        <div className="hero min-h-screen">
          <div className="flex h-[100vh] py-10 w-full flex-col lg:flex-row gap-6">
            <div className="flex-1 text-center lg:text-left h-full">
              <img
                src="https://i.postimg.cc/mrKD4Lyx/authenticaition1.png"
                alt=""
                className=" h-full w-full object-cover"
              />
            </div>
            <div className=" flex-1 card shrink-0 w-full shadow-2xl bg-base-100 py-6">
              <h1 className="text-4xl text-gray-800 font-bold text-center">
                Welcome Back <br /> <span>Sign In</span>
              </h1>

              <form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn bg-[#0b1a5c] text-neutral-200">
                    Login
                  </button>
                  <p className="flex justify-center mt-6 font-sans text-sm antialiased font-light leading-normal text-inherit">
                    Don't have an account?
                    <a
                      href="/register"
                      className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900"
                    >
                      Sign up
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
