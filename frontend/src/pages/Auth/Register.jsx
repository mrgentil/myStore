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

    return <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
            <h1 className="text-2xl font-semibold mb-4">Inscription</h1>
            <form onSubmit={submitHandler} className="container w-[40rem]">
                <div className="my-[2rem]">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-white"
                    >
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
                <div className="my-[2rem]">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-white"
                    >
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
                <div className="my-[2rem]">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-white"
                    >
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
                <div className="my-[2rem]">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-white"
                    >
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

                <div className="my-[2rem]">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-white"
                    >
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
                    className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
                >
                    {isLoading ? "Enregistrement..." : "Inscription"}
                </button>
            </form>

            <div className="mt-4">
                <p className="text-white">
                    Vous avez déjà un compte ?{" "}
                    <Link
                        to={redirect ? `/login?redirect=${redirect}` : "/login"}
                        className="text-pink-500 hover:underline"
                    >
                        Connexion
                    </Link>
                </p>
            </div>
        </div>
        <img
            src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
            alt=""
            className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
        />
    </section>
}

export default Register;