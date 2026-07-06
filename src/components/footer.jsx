
import { FaInstagram, FaWhatsapp, FaFacebookF } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
    const galleryImages = [
        '/menu-img4.jpg',
        '/footer-food2.jpg',
        '/menu-img9.jpg',
        '/footer-food4.jpg',
        '/footer-food5.jpg',
        '/footer-food6.jpg',
    ];

    const socialLinks = [
        {
            icon: <FaInstagram size={24} />,
            href: 'https://www.instagram.com/kookwithmo?igsh=ZWw3cGt4eDZqZnVv&utm_source=qr'
        },
        {
            icon: <FaWhatsapp size={24} />,
            href: 'https://wa.me/2348136570214',

            external: true,
        },
        {
            icon: <FaFacebookF size={24} />,
            href: 'https://www.facebook.com/share/1Bmg6aCLXB/?mibextid=wwXIfr'
        },
        {
            icon: <FiMail size={24} />,
            href: 'mailto:kookwithmo@gmail.com'
        },
    ];

    return (
        <footer className="bg-white text-brand-green py-16 px-4 sm:px-8">
            <div className=" container mx-auto  grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left  ">

                <div className="flex flex-col items-center md:items-start">
                    <h3 className="font-sans font-semibold tracking-widest uppercase">Quick Links</h3>
                    <div className="w-20 h-[1px] bg-black my-3" />
                    <nav className="flex flex-col space-y-2 mt-2 font-sans text-lg">
                        <Link to="/" className="hover:text-black transition-colors">Home</Link>
                        <Link to="/menu" className="hover:text-black transition-colors">Menu</Link>
                        <Link to="/meal-plan" className="hover:text-black transition-colors">Meal Plan</Link>
                        <Link to="/order" className="hover:text-black transition-colors">Order</Link>
                    </nav>
                </div>

                <div className="flex flex-col items-center">
                    <div className="mb-4 max-w-[60%]">
                        <img src="/logo-dark.png" alt="logo" className='full' />
                    </div>
                    <p className="font-sans leading-relaxed max-w-sm mb-6">
                        Bringing healthy, delicious meals and personalized meal plans straight to your door. We believe eating well should be simple & joyful.
                    </p>
                    <h4 className="font-sans text-xl font-medium">Make Orders Here</h4>
                    <div className="w-20 h-[1px] bg-black my-3" />
                    <div className="flex space-x-3 mt-2 items-center">
                        {/* {socialLinks.map((link, index) => (
                            <Link
                                to={link.href}
                                className=" p-2.5 rounded-md"
                            >
                                {link.icon}
                            </Link>
                        ))} */}
                        {socialLinks.map((link, index) =>
                            link.external ? (
                                <a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-md hover:text-black transition-colors"
                                >
                                    {link.icon}
                                </a>
                            ) : (
                                <Link
                                    key={index}
                                    to={link.href}
                                    className="p-2.5 rounded-md hover:text-black transition-colors"
                                >
                                    {link.icon}
                                </Link>
                            )
                        )}

                    </div>
                </div>

                <div className="flex flex-col items-center md:items-start">
                    <h3 className="font-sans font-semibold tracking-widest uppercase">Latest Gallery</h3>
                    <div className="w-20 h-[1px] bg-black my-3" />
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        {galleryImages.map((src, index) => (
                            <div
                                key={index}
                                className="w-full aspect-square overflow-hidden rounded-md"
                            >
                                <img
                                    src={src}
                                    alt={`Gallery image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;