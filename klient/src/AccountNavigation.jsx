import {Link, useLocation} from "react-router-dom";
export default function AccountNavigation() {
    const {pathname} = useLocation();
    let subpage = pathname.split('/')?.[2];
    if (subpage === undefined) {
        subpage='profile';
    }
     function linkClasses (type=null) {
        let classes = 'border border-black inline-flex gap-2 py-2 px-6 bg-primary';
        if (type === subpage) {
            classes += 'text-black';
        }
        return classes;
    }
    
    return(
        <nav className="w-full flex justify-center mt-8 gap-4 mb-8">
                <Link className={linkClasses('profile')} to ={'/account'} > Mój profil</Link>
                <Link className={linkClasses('rented')} to ={'/account/bookings'} > Moje wypozyczenia</Link>
                <Link className={linkClasses('mycars')} to ={'/account/mycars'} > Moje samochody</Link>
            </nav>
    );
}