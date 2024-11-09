"use client"
import { useState } from 'react';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Footer/Footer';

export default function DehazePage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setProcessedImage(null); // Clear previous image
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('http://localhost:7000/process_image', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                setProcessedImage(imageUrl);
            } else {
                console.error("Failed to process image");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <main className="flex min-h-screen flex-col max-w-full container ">
         <Navbar/>
        <div className='bg-gray-200 py-8 h-full mt-20'>
             <h1 className='fade-in-up text-center pt-0 text-4xl sm:text-5xl lg:text-6xl mt-0 text-transparent bg-clip-text bg-gradient-to-br from-[#13163F] to-[#67E331] font-extrabold'>Dehaze X-ray Image</h1>
             <div className='p-10'>
                   <p className='text-[#13163F] text-lg p-9'>The dehazing component of this project enhances image clarity by removing noise, fog, and low-contrast areas that often obscure details in 2D medical images, such as MRI or X-ray scans. By refining visual quality, this process brings out subtle textures and underlying structures, making essential details more discernible. Dehazing applies advanced filtering and contrast adjustment techniques, amplifying image fidelity without distorting true anatomical features. This improved visibility is crucial in medical diagnostics, enabling clinicians to detect anomalies with greater accuracy, and also extends to fields like remote sensing, industrial inspection, and security imaging, where precision is vital.</p>
             </div>
             <div className={`shadow-lg  bg-[#13163F] rounded-lg shadow-white py-4 md:m-14 m-8`}>
               <h2 className='fade-in-up text-center pt-0 mt-0 text-transparent bg-clip-text bg-gradient-to-br from-[#FFFF] to-[#67E331] font-extrabold text-3xl'>Dehaze Images</h2>  
             <div className='flex justify-around mt-6 flex-wrap px-7 gap-4'>
            <input className='fade-in-up text-center pt-0  mt-0 text-transparent bg-clip-text bg-gradient-to-br from-[#FFFF] to-[#67E331] font-extrabold'
             type="file" onChange={handleFileChange} accept="image/*" />
            <button  className='px-6 py-3 my-1 w-fit rounded-full mr-4 bg-white hover:bg-slate-300  text-white bg-gradient-to-br from-[#13163F] to-[#67E331]'
             onClick={handleUpload} disabled={!selectedFile}>Upload and Process</button>
            {processedImage && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Dehazed Image:</h3>
                    <img src={processedImage} alt="Dehazed Output" style={{ maxWidth: '100%' }} />
                </div>
            )}
            </div>
          </div>
        </div>
        <Footer/>
        </main>
        
    );
}
