// components/Faq.js
"use client";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FAQS = () => {
  const faqs = [
    {
      q: "What are your working hours?",
      a: "We’re open Monday–Saturday, 9:00 AM to 7:00 PM. Orders placed after hours are processed the next business day.",
    },
    {
      q: "Do you offer delivery services?",
      a: "Yes. We offer standard and express delivery. Shipping fees and ETA are shown at checkout based on your address.",
    },
    {
      q: "What is your return policy?",
      a: "Returns are accepted within 7 days of delivery if items are unused and in original packaging. Visit your orders page to start a return.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept major credit/debit cards, UPI, Cash on Delivery (where available), and select digital wallets.",
    },
    {
      q: "Tell me about your loyalty program",
      a: "Join for free to earn points on every purchase, unlock exclusive offers, and enjoy early access to new collections.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <div className="relative mx-auto mt-3 h-1 w-40">
            {/* <span className="absolute inset-0 mx-auto block h-1.2 w-16 rounded-full bg-blue-400"></span> */}
            <span className="absolute left-1/2 -translate-x-1/2 block h-1 w-40 rounded-full bg-[#3B3310]"></span>
          </div>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-xl bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] ring-1 ring-gray-100"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="w-full flex items-center justify-between gap-3 px-5 sm:px-6 py-4 sm:py-5 text-left"
                >
                  <span className="text-sm sm:text-base md:text-[17px] font-medium text-gray-800">
                    {item.q}
                  </span>
                  <FiChevronDown
                    className={`min-w-5 min-h-5 text-gray-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {/* Answer panel */}
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  className={`px-5 sm:px-6 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                    isOpen ? "max-h-64 opacity-100 pb-5 sm:pb-6" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm sm:text-[15px] leading-6 text-gray-600">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQS; 