import {useState, useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../components/Loader";
import {useRegisterMutation} from "../../redux/api/usersApiSlice";
import {setCredentials} from "../../redux/features/auth/authSlice";
import {toast} from "react-toastify";

const Register = () => {

    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register, {isLoading}] = useRegisterMutation();
    const {userInfo} = useSelector((state) => state.auth);

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas");
        } else {
            try {
                const res = await register({username, email, phone, password}).unwrap();
                dispatch(setCredentials({...res}));
                navigate(redirect);
                toast.success("Utilisateur enregistré avec succès");
            } catch (err) {
                console.log(err);
                toast.error(err.data.message);
            }
        }
    };

    return (
        <div>
            <section className="flex flex-wrap">
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-10">
                    <div className="w-full max-w-md">
                        <h1 className="text-2xl font-semibold mb-4">Inscription</h1>
                        <form onSubmit={submitHandler} className="w-full">
                            <div className="my-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="mt-1 p-2 border rounded w-full"
                                    placeholder="Entrer votre nom"
                                    value={username}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="my-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="mt-1 p-2 border rounded w-full"
                                    placeholder="Entrer email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="my-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Téléphone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="mt-1 p-2 border rounded w-full"
                                    placeholder="Entrer votre portable"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="my-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Mot de passe
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="mt-1 p-2 border rounded w-full"
                                    placeholder="Entrer mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="my-4">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirmation mot de passe
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className="mt-1 p-2 border rounded w-full"
                                    placeholder="Confirmer mot de passe"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-4 w-full"
                            >
                                {isLoading ? "Enregistrement..." : "Inscription"}
                            </button>
                        </form>
                        <div className="mt-4">
                            <p className="text-white">
                                Vous avez déjà un compte?{" "}
                                <Link
                                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                                    className="text-pink-500 hover:underline"
                                >
                                    Connexion
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <img
                        src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
                        alt=""
                        className="object-cover h-full w-full"
                    />
                </div>
            </section>
        </div>
    );
}

export default Register;
