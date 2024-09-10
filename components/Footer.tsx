import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const emailSubject = encodeURIComponent("I love the app!");
  const emailBody = encodeURIComponent("Hi, I love the app! I want to tell you that: ");
  const emailLink = `mailto:consulta@toksol.io?subject=${emailSubject}&body=${emailBody}`;

  const socialLinks = [
    { name: 'Twitter', url: 'https://x.com/tokensolutions', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
    )},
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/truesocialsaas/?viewAsMember=true', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    )},
    { name: 'Discord', url: 'https://discord.com', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
    )},
    { name: 'Email', url: emailLink, icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
    )},
  ];

  return (
    <footer className="py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="flex justify-center space-x-4 mb-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-gray-800 transition-colors duration-300"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
          <div className="text-yellow-400 text-sm">
            © {currentYear} Tok Sol AI Agency. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;