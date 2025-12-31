
import { FaGithub, FaEnvelope } from "react-icons/fa";
import style from "./footer.module.css";
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center">



                    <div className="flex space-x-6 mb-8 md:mb-0">
                        <a
                            href="https://github.com/JBrunnerhtl"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors duration-200"
                        >
                            <FaGithub size={24} />
                        </a>
                        <a
                            href="mailto:personal.website.github1@gmail.com"
                            className="text-gray-400 hover:text-white transition-colors duration-200"
                        >
                            <FaEnvelope size={24} />
                        </a>
                    </div>


                    <div className="text-sm text-center md:text-right">
                        <p className={style.baseStyleText}>© {new Date().getFullYear()} JBrunnerhtl. All rights reserved.</p>
                        <p className={style.baseStyleText}>
                            Built with <span className="text-white">React</span> &amp;{" "}
                            <span className="text-white">Tailwind CSS</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
