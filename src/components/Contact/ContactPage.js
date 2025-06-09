"use client"

import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setSubmitSuccess(true)

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      setSubmitError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-[90px] sm:px-6 lg:px-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-[36px] font-semibold text-gray-900 mb-4">Get In Touch With Us</h1>
          <p className="text-gray-600 max-w-[45rem] mx-auto text-lg leading-relaxed">
            For More Information About Our Product & Services, Please Feel Free To Drop Us An Email. Our Staff Always Be
            There To Help You Out. Do Not Hesitate!
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-10">
            {/* Address */}
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img 
                      src="/asset/location.png" 
                      alt="Icon" 
                      className="h-6 w-6 object-contain text-white" 
                    />
                    
                    
                </div>
              </div>
              <div className="ml-6">
                <h3 className="text-[24px] font-medium text-black mb-2">Address</h3>
                <p className="text-gray-700 leading-relaxed">
                  236 5th SE Avenue, New York
                  <br />
                  NY10000, United States
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12  flex items-center justify-center">
                  <img 
                      src="/asset/phone.png" 
                      alt="Icon" 
                      className="h-6 w-6 object-contain text-white" 
                    />
                </div>
              </div>
              <div className="ml-6">
                <h3 className="text-[24px] font-medium text-black mb-2">Phone</h3>
                <p className="text-gray-700 leading-relaxed">Mobile: +(84) 546-6789</p>
                <p className="text-gray-700 leading-relaxed">Hotline: +(84) 456-6789</p>
              </div>
            </div>

            {/* Working Time */}
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12  flex items-center justify-center">
                  <img 
                      src="/asset/clock-fill.png" 
                      alt="Icon" 
                      className="h-6 w-6 object-contain text-white" 
                    />
                </div>
              </div>
              <div className="ml-6">
                <h3 className="text-[24px] font-medium text-black mb-2">Working Time</h3>
                <p className="text-gray-700 leading-relaxed">Monday-Friday: 9:00 - 22:00</p>
                <p className="text-gray-700 leading-relaxed">Saturday-Sunday: 9:00 - 21:00</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-[16px] font-medium text-black mb-[20px]">
                  Your name
                </label>
                <input
                 suppressHydrationWarning={true}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-colors duration-200"
                  placeholder="Abc"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-[16px] font-medium text-black mb-[20px]">
                  Email address
                </label>
                <input
                 suppressHydrationWarning={true}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-colors duration-200"
                  placeholder="Abc@def.com"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-[16px] font-medium text-black mb-[20px]">
                  Subject
                </label>
                <input
                 suppressHydrationWarning={true}
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-colors duration-200"
                  placeholder="This is an optional"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-[16px] font-medium text-black mb-[20px]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-colors duration-200 resize-none"
                  placeholder="Hi! I'd like to ask about"
                />
              </div>

              {/* Success Message */}
              {submitSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Thank you! Your message has been sent successfully.
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitError && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {submitError}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-[40%] bg-[#DF9090] hover:bg-pink-500 disabled:bg-pink-300 text-white text-[16px] py-4 px-6 rounded-lg font-[400]  transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
