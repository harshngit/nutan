import FAQS from '@/components/Faqs/Faqs';
import ServiceFeatures from '@/components/Home/FeaturesSection';
import Footer from '@/components/Layout/Footer';
import NavbarOne from '@/components/Layout/NavbarOne';
import React from 'react';
import { MdEmail } from 'react-icons/md';

const Faq = () => {
  return (
    <div className='relative'>
        <NavbarOne />

        <section className="relative pt-[0px] ">
        <FAQS />
        </section>
        
        <section className="relative pt-[0px] ">
        <ServiceFeatures />
        </section>

        <section className="relative pt-[0px] ">
        <Footer />
        </section>
        
    </div>

   
)};

export default Faq;