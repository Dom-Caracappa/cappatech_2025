const Modal: React.FC<ModalProps> = ({ isOpen, onClose, planTitle }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0  flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-white hover:text-gray-400 text-xl"
                >
                    ✕
                </button>

                {/* Modal Content */}
                <h3 className="text-2xl font-semibold text-orange-400">{planTitle}</h3>
                <p className="mt-2 text-gray-300">
                    To book the <span className="font-bold">{planTitle}</span> package, please email us directly.
                </p>

                {/* Static Inputs (Disabled) */}
                <form onSubmit={(e) => e.preventDefault()} className="mt-4 space-y-4" aria-disabled="true">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        disabled
                        className="w-full p-2 rounded-md bg-gray-800 text-gray-400 border border-gray-600 cursor-not-allowed"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        disabled
                        className="w-full p-2 rounded-md bg-gray-800 text-gray-400 border border-gray-600 cursor-not-allowed"
                    />
                    <button
                        type="submit"
                        disabled
                        className="w-full bg-gray-500 text-white font-semibold py-2 rounded-md cursor-not-allowed"
                    >
                        Submit Disabled – Please Email Us
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-gray-300 font-medium">Email us to get started:</p>
                    <a
                        href="mailto:info@cappatech.net"
                        className="mt-2 inline-block text-orange-400 hover:text-orange-300 transition-colors text-lg font-semibold"
                    >
                        info@cappatech.net
                    </a>
                </div>
            </div>
        </div>
    );
};
export default Pricing;