
import React from 'react';
import Container from '../../Components/Container/Container';
import toast from 'react-hot-toast';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const {createUser} = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const image_hosting_key = import.meta.env.VITE_IMAGE_BB_API_KEY;
  const imageBB_Hosting_Api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleRegistration = async (e) => {
    e.preventDefault();

    const form =  new FormData(e.target);
    const name = form.get('name');
    const email = form.get('email');
    const image = form.get('image');
    const password = form.get('password');
    const occupation = form.get('occupation');

    if (!name || !email || !password || !image) {
      // setProcessing(false)
      return toast.error("Please fill the form correctly.");
    }
    console.log(name, email, image, password);



    try {
      // //? Host the item image into imageBB
      // const imageFile = { image: image };
      // const res = await axiosPublic.post(imageBB_Hosting_Api, imageFile, {
      //   headers: {
      //     "content-type": "multipart/form-data",
      //   },
      // });
      // if (res.data.success) {
      //   const hostedImg = res.data.data.display_url;
      //   console.log(hostedImg);

        // //? Now create user
        const user = await createUser(email, password);
        console.log('created user',user);

        // //? if user is successfully created then update the profile.
        if (user) {
         
          await updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image,
          });

        //? Save user to database.
          const user = {
            name: name,
            email: email,
            image: image,
            // image: hostedImg,
            occupation: occupation,
          };
          const { data } = await axiosPublic.put(`/users/${email}`, user);
          console.log(data);
          if (data.modifiedCount > 0) {
            console.log(data);
          }
          // setProcessing(false)
          toast.success("Successfully Created Account.");
          navigate("/");

        // }
    

      // Clear the form after successful submission
      e.target.reset();
    }
   } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }

}

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
              <div className=" h-[100vh] lg:h-full flex-1 overflow-y-visible lg:overflow-y-auto card shrink-0 w-full shadow-none lg:shadow-2xl bg-base-100 py-6">
                <h1 className="text-4xl text-gray-800 font-bold text-center">
                  Hello! Welcome <br /> <span>Sign Up</span>
                </h1>
                <p className='text-center text-neutral-300 text-thin'>Give your information below to register</p>
                <form onSubmit={handleRegistration} className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                     name='name'
                      type="text"
                      placeholder="name"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Image URL</span>
                    </label>
                    <input
                     name='image'
                      type="text"
                      placeholder="image url"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Occupation</span>
                    </label>
                    <input
                     name='occupation'
                      type="text"
                      placeholder="occupation"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                    name='email'
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
                      name='password'
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
                    <button type='submit' className="btn bg-[#0b1a5c] text-neutral-200">
                      Sign Up
                    </button>
                    <p className="flex justify-center mt-6 font-sans text-sm antialiased font-light leading-normal text-inherit">
                      Already have an account?
                      <a
                        href="/login"
                        className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900"
                      >
                        Sign In
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

export default Register;