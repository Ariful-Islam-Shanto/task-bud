// About.js

import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { IoIosArrowRoundForward } from 'react-icons/io';

const AboutUs = () => {
  return (
    <div>
        <Navbar/>
        <div
        id="contact"
        className="border-t-2 border-b-2 border-[#03045E] py-12 space-y-8 w-full"
      >
        <div className="container mx-auto p-8 space-y-4 max-w-6xl">
        <h2 className="text-4xl flex items-center font-semibold mb-4">About Us <IoIosArrowRoundForward className="text-5xl" /></h2>
      <p className="text-gray-700 text-xl text-semibold">
        Welcome to <span className='text-blue-400 text-2xl font-bold'>Task-Bud</span>, a Task Management Platform! We are a dedicated team of
        innovators and problem solvers, passionate about simplifying task management and project
        collaboration.
      </p>
      <p className="text-gray-700 mb-4 text-xl font-semibold">
        Our mission is to provide a seamless experience for individuals and teams across various
        domains, including developers, bankers, students, and more. Whether you're looking to enhance
        project efficiency or streamline your daily tasks, our platform is designed with your needs
        in mind.
      </p>
      <p className="text-gray-700 mb-4">
        <strong className='text-2xl font-bold'>Key Features:</strong>
      </p>
      <ul className="list-disc pl-6 mb-4 text-lg text-gray-700">
        <li>Intuitive Task Management: Easily create, organize, and prioritize tasks.</li>
        <li>Collaborative Workspaces: Foster teamwork with real-time collaboration features.</li>
        <li>Customized for Your Industry: Tailored solutions for developers, bankers, students, and more.</li>
        <li>Responsive Design: Access your tasks from any device seamlessly.</li>
      </ul>
      <p className="text-gray-700 mb-4 text-xl font-thin">
        Join us on this journey of efficiency and organization. Feel free to explore our platform and
        unleash the full potential of task management.
      </p>
    </div>
    </div>
    </div>
  );
};

export default AboutUs;
