// src/components/Footer.tsx

export default function Footer() {
  return (
    <section className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl flex flex-col md:flex-row items-center justify-between px-6">
        {/* Left: Copyright */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold">CappaTech</h2>
          <p className="text-gray-400 text-sm mt-1">
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>

        {/* Center: Quick Links */}
        <ul className="flex space-x-6 mt-4 md:mt-0">
          <li>
            <a href="/" className="text-gray-400 hover:text-white">Home</a>
          </li>
          <li>
            <a href="#services" className="text-gray-400 hover:text-white">Services</a>
          </li>
          <li>
            <a href="#pricing" className="text-gray-400 hover:text-white">Pricing</a>
          </li>
          <li>
            <a href="#contact" className="text-gray-400 hover:text-white">Contact</a>
          </li>
          <li>
            <a href="#blog" className="text-gray-400 hover:text-white">Blog</a>
          </li>
        </ul>

        {/* Right: Social Icons (optional) */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://bsky.app/profile/cappatech.bsky.social" className="hover:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 10.8c1.087-.2 2.144.46 2.64.46c-.66-.798-.795C2.566.944 1.566 1.266 0.902 1.565 0.139 1.98 0.38 0.3 0.768 0.69 0.378 0.565 0.624 0.479 0.81" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/cappatech/" className="hover:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 46 46">
              <path d="M41.4996,24.4c4.2,4.2,4.9,9.2,2.7c2.7c-5.5,5.5h32C.76,0,5.2-2.2,5.5VC46,6.4,23.76,4.4z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
