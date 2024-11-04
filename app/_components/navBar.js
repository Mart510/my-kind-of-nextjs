// import block
import Image from "next/image";
import Link from 'next/link';

// Nav bar
const Navbar = () => {
    return (
        <nav className="bg-blue-700">
            <div className="ml-20 my-0 w-40 h-16 relative">
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