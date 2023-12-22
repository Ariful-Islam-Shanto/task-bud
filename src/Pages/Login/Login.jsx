import React from "react";
import Container from "../../Components/Container/Container";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {

    const {logIn, googleLogin} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    //? Login with email password
    const handleLogin = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const email = form.get('email');
        const password = form.get('password');

        console.log(email, password);
        logIn(email, password) 
        .then(res => {
            console.log(res.user);
            toast.success('Successfully logged in.')
            navigate('/')
        })
        .catch((error) => {
            console.log(error.message);
            toast.error(error.message);
        })

    }

      //? Social login
  const handleGoogleLogin = async () => {
    const user = await googleLogin();
    // console.log(user);
    if (user) {
      console.log("User", user);
      //? Save user to database.
      const userInfo = {
        name: user.user.displayName,
        email: user.user.email,
        image: user.user.photoURL,
        role: "guest",
      };
      const { data } = await axiosPublic.put(`/users/${user?.email}`, userInfo);
      console.log(data);
      if (data.modifiedCount > 0 || data.upsertedCount > 0) {
        console.log(data);
      }
      toast.success("Successfully logged in.");
      navigate("/");
    }
  };

  return (
    <div>
      <Container>
        <div className="hero min-h-screen">
          <div className="flex h-[100vh] py-10 w-full flex-col lg:flex-row gap-6">
            <div className="hidden lg:inline flex-1 text-center lg:text-left h-full">
              <img
                src="https://i.postimg.cc/mrKD4Lyx/authenticaition1.png"
                alt=""
                className=" h-full w-full object-cover"
              />
            </div>
            <div className="h-[100vh] mb-10 md:mb-0 lg:h-full flex-1 overflow-y-visible lg:overflow-y-auto card shrink-0 w-full shadow-none lg:shadow-2xl  bg-base-100 py-6">
              <h1 className="text-4xl text-gray-800 font-bold text-center">
                Welcome Back <br /> <span>Sign In</span>
              </h1>

              <form onSubmit={handleLogin} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    name="email"
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
                  name="password"
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
                  <button type="submit" className="btn bg-[#0b1a5c] text-neutral-200">
                    Login
                  </button>
              
                </div>
              </form>
              <div className="flex flex-col items-center justify-center py-2 gap-3">
                <p>Or login with Google</p>
                <button onClick={handleGoogleLogin} className="btn text-xl">
                  <FcGoogle />
                </button>
              </div>
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
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
