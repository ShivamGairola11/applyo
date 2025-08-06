export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 mt-6 relative py-10">
         <div
          className="absolute inset-0 w-full h-full 
      [background-image:radial-gradient(circle,rgba(161,161,161,0.3)_1px,transparent_1px)] 
      [background-size:16px_16px] 
      [background-position:center] "
        ></div>
      <div className="custom-container mx-auto h-full flex flex-col md:flex-row justify-between items-center text-sm">
        <span className="font-eplilogue font-semibold text-[#b3063a] text-3xl md:text-4xl lg:text-5xl ">Movie Explorer</span>
        <span className="mt-2 md:mt-0 text-gray-50 text-center md:text-right font-onset text-lg md:text-lg lg:text-xl ">
          © {new Date().getFullYear()} All rights reserved · Made in India 🇮🇳
        </span>
      </div>
    </footer>
  );
}
