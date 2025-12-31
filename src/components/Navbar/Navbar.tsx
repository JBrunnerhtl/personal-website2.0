import { useState } from "react";
import { Menu, X } from "lucide-react";
import style from "./navbar.module.css"
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    let items = [
        { text: "Home", url: "/" },
        { text: "About", url: "/about" },
        { text: "Contact", url: "/contact" },
    ];

    let navbar = items.map((i) => (
        <a
            key={i.text}
            href={i.url}
            className={
                "block rounded-xl border border-sky-50 my-2 shadow-2xs min-w-30 text-sky-50 " +
                `hover:bg-black ${style.hoverText} ` +
                "px-4 py-2 text-lg text-center"
            }
            onClick={() => setIsOpen(false)}
        >
            {i.text}
        </a>
    ));

    return (
        <nav className="top-0 left-0 w-full z-50">
            <div className="flex items-center justify-center p-4 relative">
                <div className="hidden sm:flex space-x-6">{navbar}</div>

                {/* Burger Button */}
                <button
                    className="absolute right-4 text-sky-50 sm:hidden z-50"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            {/* Mobile Menü */}
            <div
                className={`sm:hidden absolute top-0 left-0 w-full transform transition-all duration-500 ease-in-out ${
                    isOpen
                        ? "translate-y-0 opacity-100 backdrop-blur-lg shadow-lg"
                        : "-translate-y-full opacity-0"
                }`}
            >
                <div className="flex flex-col items-center py-6">{navbar}</div>
            </div>
        </nav>
    );
}

export default Navbar;
