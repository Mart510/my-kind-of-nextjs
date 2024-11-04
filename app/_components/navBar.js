// import block
import Image from "next/image";
import Link from 'next/link';

// Nav bar
const Navbar = () => {
    return (
        <nav className="bg-blue-700">
            <div className="ml-20 w-24 h-12 relative">
                <Link href="/">
                <Image 
                    src={`/mykindofcruiselogo.png`} 
                    layout="fill"  
                    objectFit="contain" 
                    alt="My Kind Of Cruise Logo" 
                    />
                </Link>
            </div>
        </nav>
    );
};
  
  export default Navbar;