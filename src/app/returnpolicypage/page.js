import ServiceFeatures from '@/components/Home/FeaturesSection';
import Footer from '@/components/Layout/Footer';
import NavbarOne from '@/components/Layout/NavbarOne';
import ReturnPolicy from '@/components/TermsCondition/ReturnPolicy';
import TermsConditions from '@/components/TermsCondition/TermsCondition';
import React from 'react';
import { MdEmail } from 'react-icons/md';

const ReturnAndPolicies = () => {
  return (
    <div className='relative'>
        <NavbarOne />

        <section className="relative pt-[0px] ">
        <ReturnPolicy />
        </section>
        
        <section className="relative pt-[0px] ">
        <ServiceFeatures />
        </section>

        <section className="relative pt-[0px] ">
        <Footer />
        </section>
        
    </div>

   
)};

export default ReturnAndPolicies;