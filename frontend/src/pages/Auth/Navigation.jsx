import { useState } from "react";
import {
    AiOutlineHome,
    AiOutlineShopping,
    AiOutlineLogin,
    AiOutlineUserAdd,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";


const Navigation = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div
            style={{zIndex: 9999}}
            className={`${
                showSidebar ? "hidden" : "flex"
            } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh]  fixed `}
            id="navigation-container"
        >
            <div className="flex flex-col justify-center space-y-4">
                <Link
                    to="/"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <AiOutlineHome className="mr-2 mt-[3rem]" size={26}/>
                    <span className="hidden nav-item-name mt-[3rem]">Accueil</span>{" "}
                </Link>

                <Link
                    to="/shop"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <AiOutlineShopping className="mr-2 mt-[3rem]" size={26}/>
                    <span className="hidden nav-item-name mt-[3rem]">Boutique</span>{" "}
                </Link>

                <Link
                    to="/cart"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26}/>
                    <span className="hidden nav-item-name mt-[3rem]">Panier</span>{" "}
                </Link>

                <Link
                    to="/favorite"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <FaHeart className="mr-2 mt-[3rem]" size={26}/>
                    <span className="hidden nav-item-name mt-[3rem]">Favoris</span>{" "}
                </Link>
            </div>

            <ul>
                <li>
                    <Link
                        to="/login"
                        className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
                    >
                        <AiOutlineLogin className="mr-2 mt-[4px]" size={26}/>
                        <span className="hidden nav-item-name">Connexion</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/register"
                        className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
                    >
                        <AiOutlineUserAdd size={26}/>
                        <span className="hidden nav-item-name">Inscription</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Navigation;