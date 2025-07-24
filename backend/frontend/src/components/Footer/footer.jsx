import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-white text-center py-4 mt-10">
            <p className="text-sm">
                © {new Date().getFullYear()} Budget Buddy. All rights reserved.
                <br />
                Designed with <span className="text-red-500">❤</span> by{" "}
                <span className="font-semibold text-pink-400 hover:underline">Suhani Goyal</span>
            </p>
        </footer>
    );
};

export default Footer;
