import ServiceFeatures from '@/components/Home/FeaturesSection';
import Footer from '@/components/Layout/Footer';
import NavbarOne from '@/components/Layout/NavbarOne';
import TermsConditions from '@/components/TermsCondition/TermsCondition';
import React from 'react';
import { MdEmail } from 'react-icons/md';

const TermsAndConditions = () => {
  return (
    <div className='relative'>
        <NavbarOne />

        <section className="relative pt-[0px] ">
        <TermsConditions />
        </section>
        
        <section className="relative pt-[0px] ">
        <ServiceFeatures />
        </section>

        <section className="relative pt-[0px] ">
        <Footer />
        </section>
        
    </div>

   
)};

export default TermsAndConditions;