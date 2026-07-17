'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Header from '@/Components/Header'
import Footer from '@/Components/FooterA11y'

const Page = () => {
    const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    // Add form submission logic here (e.g., API call)
  }
  return (
    <>
    <Header />

    <div className="relative w-full h-[70vh] sm:h-[75vh] md:h-[85vh] lg:h-[90vh] xl:h-[60vh]  overflow-hidden">
                <Image
                  src="/images/pic5.jpg" // make sure this path is correct
                  alt=""
                  aria-hidden="true"
                  fill
                  className="object-cover object-center z-0"
                  priority
                />
          
                <div className="absolute inset-0 flex flex-col justify-center items-center text-gray-800 text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 z-10">
          
                  <div className="flex flex-col justify-center items-center mb-6 sm:mb-8 md:mb-7 lg:mb-7">
                    
          
                    {/* Divider - Seamlessly connected to logo */}
                    <div className="text-2xl sm:text-2xl md:text-3xl lg:text-6xl font-sans mb-2 lg:mb-4 lg:whitespace-nowrap">
                      <h1 className="leading-none">Investor Grievance</h1>
                    </div>
                    
                  </div>
          
          
                  {/* Content Container */}
                  <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8 px-2 sm:px-4">
                    {/* First Paragraph */}
                    <div className="text-sm sm:text-base md:text-lg lg:text-lg max-w-7xl">
                      <p className="leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed">
                        Client’s queries / complaints may arise due to lack of understanding or a deficiency of service experienced by clients. Deficiency of service may include lack of explanation,
                    clarifications, understanding which escalates into shortfalls in the expected delivery standards, either due to inadequacy of facilities available or through the attitude of staff 
                    towards client.
                      </p>
                    </div>
                    
                  </div>
                </div>
    </div>  


    {/*Table*/}
    <div className="space-y-8 px-4 sm:px-8 lg:px-12 mt-16">
      
      
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-6 gap-0 items-stretch">
            {/* Column 1: Details of Designation */}
            <div className="flex flex-col bg-blue-200 rounded-tl-xl">
              <div className="font-semibold text-center text-gray-800 pb-3 h-20 flex items-center justify-center px-4">
                Details of Designation
              </div>
              <div className="flex-1 pt-4">
                <div className="text-center py-3 text-gray-700 font-medium px-4 h-16 flex items-center justify-center">Proprietor</div>
                <div className="text-center py-3 text-gray-700 font-medium px-4 h-16 flex items-center justify-center">Compliance Officer</div>
                <div className="text-center py-3 text-gray-700 font-medium px-4 h-16 flex items-center justify-center">Grievance Officer</div>
                <div className="text-center py-3 text-gray-700 font-medium px-4 h-16 flex items-center justify-center">Customer Care</div>
              </div>
            </div>
            
            {/* Column 2: Contact Person Name */}
            <div className="flex flex-col">
              <div className="font-semibold text-center text-gray-800 pb-3 h-20 flex items-center justify-center bg-blue-200 px-4">
                Contact Person Name
              </div>
              <div className="flex-1 pt-4">
                <div className="text-center py-3 text-gray-700 text-base leading-relaxed px-4 h-16 flex items-center justify-center">
                  Shikha Kapur
                </div>
                <div className="text-center py-3 text-gray-700 text-base leading-relaxed px-4 h-16 flex items-center justify-center">
                 Shikha Kapur
                </div>
                <div className="text-center py-3 text-gray-700 text-base leading-relaxed px-4 h-16 flex items-center justify-center">
                 Shikha Kapur
                </div>
                <div className="text-center py-3 text-gray-700 text-base leading-relaxed px-4 h-16 flex items-center justify-center">
                 Shikha Kapur
                </div>
              </div>
            </div>
            
            {/* Column 3: Physical Address */}
            <div className="flex flex-col">
              <div className="font-semibold text-center text-gray-800 pb-3 h-20 flex items-center justify-center bg-blue-200 px-4">
                Physical Address
              </div>
              <div className="flex-1 pt-4">
                <div className="text-center py-3 text-gray-700 text-base leading-relaxed px-4 h-16 flex items-center justify-center break-words">
                  A 35 FIRST FLOOR, Chittaranjan Park, NEW
                </div>
                <div className="text-center py-3 text-gray-700 text-base leading-relaxed px-4 h-16 flex items-center justify-center break-words">
                 A 35 FIRST FLOOR, Chittaranjan Park, NEW
                </div>
                <div className="text-center py-3 text-gray-700 text-base leading-relaxed px-4 h-16 flex items-center justify-center break-words">
                 A 35 FIRST FLOOR, Chittaranjan Park, NEW
                </div>
                <div className="text-center py-3 text-gray-700 text-base leading-relaxed px-4 h-16 flex items-center justify-center break-words">
                 A 35 FIRST FLOOR, Chittaranjan Park, NEW
                </div>
              </div>
            </div>
            
            {/* Column 4: Contact No */}
            <div className="flex flex-col">
              <div className="font-semibold text-center text-gray-800 pb-3 h-20 flex items-center justify-center bg-blue-200 px-4">
                Contact No
              </div>
              <div className="flex-1 pt-4">
                <div className="text-center py-3 text-gray-700 text-base leading-relaxed px-4 h-16 flex items-center justify-center">
                  9811744587
                </div>
                <div className="text-center py-3 text-gray-700 text-bae leading-relaxed px-4 h-16 flex items-center justify-center">
                  9811744587
                </div>
                <div className="text-center py-3 text-gray-700 text-base leading-relaxed px-4 h-16 flex items-center justify-center">
                  9811744587
                </div>
                <div className="text-center py-3 text-gray-700 text-base leading-relaxed px-4 h-16 flex items-center justify-center">
                  9811744587
                </div>
              </div>
            </div>
            
            {/* Column 5: Email ID */}
            <div className="flex flex-col">
              <div className="font-semibold text-center text-gray-800 pb-3 h-20 flex items-center justify-center bg-blue-200 px-4">
                Email ID
              </div>
              <div className="flex-1 pt-4">
                <div className="text-center py-3 text-gray-700 text- base leading-relaxed px-4 h-16 flex items-center justify-center break-all">
                shikhaa.kapur@gmail.com
                </div>
                <div className="text-center py-3 text-gray-700 text-base leading-relaxed px-4 h-16 flex items-center justify-center break-all">
              shikhaa.kapur@gmail.com
                </div>
                <div className="text-center py-3 text-gray-700 text-base leading-relaxed px-4 h-16 flex items-center justify-center break-all">
                 shikhaa.kapur@gmail.com
                </div>
                <div className="text-center py-3 text-gray-700 text-base leading-relaxed px-4 h-16 flex items-center justify-center break-all">
                 shikhaa.kapur@gmail.com
                </div>
              </div>
            </div>
            
            {/* Column 6: Working Hours */}
            <div className="flex flex-col">
              <div className="font-semibold text-center text-gray-800 pb-3 h-20 flex items-center justify-center bg-blue-200 px-4 rounded-tr-xl">
            Working Hours
              </div>
              <div className="flex-1 pt-4">
                <div className="text-center py-3 text-bae text-gray-700 leading-relaxed px-4 h-16 flex items-center justify-center">
                  Monday to Friday, 11
                </div>
                <div className="text-center py-3 text-gray-700 text-base leading-relaxed px-4 h-16 flex items-center justify-center">
                 Monday to Friday, 11
                </div>
                <div className="text-center py-3 text-gray-700 text-base leading-relaxed px-4 h-16 flex items-center justify-center">
                  Monday to Friday, 11
                </div>
                <div className="text-center py-3 text-gray-700 text-base leading-relaxed px-4 h-16 flex items-center justify-center">
                  Monday to Friday, 11
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile View - Horizontally Scrollable */}
      <div className="md:hidden">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
          <div className="grid grid-cols-6 gap-0 items-stretch min-w-[800px]">
            {/* Column 1: Details of Designation */}
            <div className="flex flex-col bg-blue-200 rounded-tl-xl">
              <div className="font-semibold text-center text-gray-800 pb-3 h-20 flex items-center justify-center px-3">
                <span className="text-sm">Details of Designation</span>
              </div>
              <div className="flex-1 pt-4">
                <div className="text-center py-3 text-gray-700 font-medium px-3 text-sm h-16 flex items-center justify-center">Proprietor</div>
                <div className="text-center py-3 text-gray-700 font-medium px-3 text-sm h-16 flex items-center justify-center">Compliance Officer</div>
                <div className="text-center py-3 text-gray-700 font-medium px-3 text-sm h-16 flex items-center justify-center">Grievance Officer</div>
                <div className="text-center py-3 text-gray-700 font-medium px-3 text-sm h-16 flex items-center justify-center">Customer care</div>
              </div>
            </div>
            
            {/* Column 2: Contact Person Name */}
            <div className="flex flex-col">
              <div className="font-semibold text-center text-gray-800 pb-3 h-20 flex items-center justify-center bg-blue-200 px-3">
                <span className="text-sm">Contact Person Name</span>
              </div>
              <div className="flex-1 pt-4">
                <div className="text-center py-3 text-gray-700 text-xs leading-relaxed px-3 h-16 flex items-center justify-center">
                  Shikha Kapur
                </div>
                <div className="text-center py-3 text-gray-700 text-xs leading-relaxed px-3 h-16 flex items-center justify-center">
                  Shikha Kapur
                </div>
                <div className="text-center py-3 text-gray-700 text-xs leading-relaxed px-3 h-16 flex items-center justify-center">
                  Shikha Kapur
                </div>
                <div className="text-center py-3 text-gray-700 text-xs leading-relaxed px-3 h-16 flex items-center justify-center">
                  Shikha Kapur
                </div>
              </div>
            </div>
            
            {/* Column 3: Physical Address */}
            <div className="flex flex-col">
              <div className="font-semibold text-center text-gray-800 pb-3 h-20 flex items-center justify-center bg-blue-200 px-3">
                <span className="text-sm">Physical Address</span>
              </div>
              <div className="flex-1 pt-4">
                <div className="text-center py-3 text-gray-700 text-xs leading-relaxed px-3 h-16 flex items-center justify-center break-words">
                  A 35 FIRST FLOOR, Chittaranjan Park, NEW
                </div>
                <div className="text-center py-3 text-gray-700 text-xs leading-relaxed px-3 h-16 flex items-center justify-center break-words">
                  A 35 FIRST FLOOR, Chittaranjan Park, NEW
                </div>
                <div className="text-center py-3 text-gray-700 text-xs leading-relaxed px-3 h-16 flex items-center justify-center break-words">
                  A 35 FIRST FLOOR, Chittaranjan Park, NEW
                </div>
                <div className="text-center py-3 text-gray-700 text-xs leading-relaxed px-3 h-16 flex items-center justify-center break-words">
                  A 35 FIRST FLOOR, Chittaranjan Park, NEW
                </div>
              </div>
            </div>
            
            {/* Column 4: Contact No */}
            <div className="flex flex-col">
              <div className="font-semibold text-center text-gray-800 pb-3 h-20 flex items-center justify-center bg-blue-200 px-3">
                <span className="text-sm">Contact No</span>
              </div>
              <div className="flex-1 pt-4">
                <div className="text-center py-3 text-gray-700 text-xs leading-relaxed px-3 h-16 flex items-center justify-center">
                  9811744587
                </div>
                <div className="text-center py-3 text-gray-700 text-xs leading-relaxed px-3 h-16 flex items-center justify-center">
                  9811744587
                </div>
                <div className="text-center py-3 text-gray-700 text-xs leading-relaxed px-3 h-16 flex items-center justify-center">
                  9811744587
                </div>
                <div className="text-center py-3 text-gray-700 text-xs leading-relaxed px-3 h-16 flex items-center justify-center">
                  9811744587
                </div>
              </div>
            </div>
            
            {/* Column 5: Email ID */}
            <div className="flex flex-col">
              <div className="font-semibold text-center text-gray-800 pb-3 h-20 flex items-center justify-center bg-blue-200 px-3">
                <span className="text-sm">Email ID</span>
              </div>
              <div className="flex-1 pt-4">
                <div className="text-center py-3 text-gray-700 text-xs leading-relaxed px-3 h-16 flex items-center justify-center break-all">
                  shikhaa.kapur@gmail.com
                </div>
                <div className="text-center py-3 text-gray-700 text-xs leading-relaxed px-3 h-16 flex items-center justify-center break-all">
                  shikhaa.kapur@gmail.com
                </div>
                <div className="text-center py-3 text-gray-700 text-xs leading-relaxed px-3 h-16 flex items-center justify-center break-all">
                  shikhaa.kapur@gmail.com
                </div>
                <div className="text-center py-3 text-gray-700 text-xs leading-relaxed px-3 h-16 flex items-center justify-center break-all">
                  shikhaa.kapur@gmail.com
                </div>
              </div>
            </div>
            
            {/* Column 6: Working Hours */}
            <div className="flex flex-col">
              <div className="font-semibold text-center text-gray-800 pb-3 h-20 flex items-center justify-center bg-blue-200 px-3 rounded-tr-xl">
                <span className="text-sm">Working Hours</span>
              </div>
              <div className="flex-1 pt-4">
                <div className="text-center py-3 text-gray-700 text-xs leading-relaxed px-3 h-16 flex items-center justify-center">
                  Monday to Friday, 11
                </div>
                <div className="text-center py-3 text-gray-700 text-xs leading-relaxed px-3 h-16 flex items-center justify-center">
                  Monday to Friday, 11
                </div>
                <div className="text-center py-3 text-gray-700 text-xs leading-relaxed px-3 h-16 flex items-center justify-center">
                  Monday to Friday, 11
                </div>
                <div className="text-center py-3 text-gray-700 text-xs leading-relaxed px-3 h-16 flex items-center justify-center">
                  Monday to Friday, 11
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    {/*Info*/}
    <div className="text-sm text-gray-700 sm:text-base md:text-lg ml-12 lg:text-lg max-w-7xl">
       
        <ol className="list-decimal list-inside text-xl space-y-3 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed">
          <li>
            Clients can seek clarification to their query and are further entitled to make a complaint in writing, orally or telephonically. An email may be sent to the Client Servicing Team at <span className="font-medium">shikhaa.kapur@gmail.com</span>. Alternatively, the Investor may call on <span className="font-medium">9811744587</span>.
          </li>
          <li>
            A letter may also be written with their query/complaint and posted to the following address: <span className="font-medium">A 35 FIRST FLOOR, Chittaranjan Park, NEW DELHI, NATIONAL CAPITAL TERRITORY OF DELHI, 110019</span>.
          </li>
          <li>
            Clients can write to the research analyst at <span className="font-medium">shikhaa.kapur@gmail.com</span> if a response is not received within 10 business days of contacting the Client Servicing Team. A reply can be expected within 10 business days of approaching the research analyst.
          </li>
          <li>
            In case you are not satisfied with our response you can lodge your grievance with SEBI at https://scores.sebi.gov.in/ or you may also write to any of the offices of SEBI. SCORES may be accessed thorough SCORES mobile application as well, same can be downloaded from below link: <a href="https://play.google.com/store/apps/details?id=com.ionicframework.sebi236330" target="_blank" rel="noopener noreferrer">https://play.google.com/store/apps/details?id=com.ionicframework.sebi236330</a> ODR Portal could be accessed, if unsatisfied with the response. Your attention is drawn to the SEBI circular no. SEBI/HO/OIAE/OIAE_IAD-1/P/CIR/2023/131 dated July 31, 2023, on “Online Resolution of Disputes in the Indian Securities Market”. A common Online Dispute Resolution Portal (“ODR Portal”) which harnesses conciliation and online arbitration for resolution of disputes arising in the Indian Securities Market has been established. ODR Portal can be accessed via the following link <a className='text-bold' href='https://smartodr.in/' target="_blank" rel="noopener noreferrer">https://smartodr.in/</a>
          </li>
        </ol>
    </div>


    {/*Form*/}
    <div className="max-w-7xl mx-auto px-4 pt-10 py-2 mb-8"> 
  <h2 className="text-5xl font-semibold mb-8 text-left">Contact Us</h2>

  <form
    onSubmit={handleSubmit}
    className="bg-white space-y-8"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter your first name"
          className="w-full border border-gray-300 px-10 py-2 text-base"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter your last name"
          className="w-full border border-gray-300 px-10 py-2 text-base"
          required
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email address"
        className="w-full border border-gray-300 px-10 py-2 text-base"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Phone</label>
      <PhoneInput
        country={'91'}
        value={formData.phone}
        onChange={handlePhoneChange}
        placeholder="Enter your phone number"
        inputClass="!w-full !h-10 !text-base !px-10"
        containerClass="w-full"
        inputProps={{ required: true }}
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Message</label>
      <textarea
        name="message"
        rows="5"
        value={formData.message}
        onChange={handleChange}
        placeholder="Enter your message here..."
        className="w-full border border-gray-300 px-10 py-2 text-base"
        required
      ></textarea>
    </div>

   <div className="flex justify-start">
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-16 lg:px-52 hover:bg-blue-700 transition text-lg"
      >
        Submit
      </button>
    </div>
  </form>
    </div>


  
  
    <Footer/>
    </>
  )
}

export default Page
