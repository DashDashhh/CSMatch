import './navbar.css';
import NBButton from './navbarbutton'
import NBLink from './navbarlink'



const Navbar = (props: {linkView: string, buttonView: string}) => {

    const {linkView, buttonView} = props
    const astralLeft = "<"
    const astralRight = ">"
    return (

            
        <nav className="navbar">
            <div className="navbar__container">
                <a href="/" id="navbar__logo">{astralLeft}CSMatch/{astralRight}</a>
                <div className="navbar__toggle" id="mobile-menu">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <ul className="navbar__menu">
                    <li className="navbar__item">
                        <NBLink linkText = 'Welcome' visible = {linkView}/>
                    </li>
                    <li className="navbar__item">
                        <NBLink linkText = 'About Us' visible = {linkView}/>
                    </li>
                    <li className="navbar__item">
                        <NBLink linkText = 'Companies' visible = {linkView}/>
                    </li>
                    <li>
                        <NBButton buttonText = 'Sign In' buttonLink = '/pages/login' visible = {buttonView}/>
                    </li>
                    <li>
                        <NBButton buttonText = 'Sign Up' buttonLink = '/pages/signup' visible = {buttonView} />
                    </li>

                </ul>
            </div>
        </nav>

      );
}
 
export default Navbar;