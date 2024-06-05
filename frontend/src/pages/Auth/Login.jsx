import {useState, useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {useLoginMutation} from "../../redux/api/usersApiSlice";
import {setCredentials} from "../../redux/features/auth/authSlice";
import {toast} from "react-toastify";
import Loader from "../../components/Loader.jsx";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();
    const {userInfo} = useSelector(state => state.auth) || {};

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
        try {
            const res = await login({email, password}).unwrap();
            console.log(res);
            dispatch(setCredentials({...res}));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div>
            <section className="flex flex-wrap">
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-10">
                    <div className="w-full max-w-md">
                        <h1 className="text-2xl font-semibold mb-4">Connexion</h1>
                        <form onSubmit={submitHandler} className="w-full">
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
                            <div className="mb-4">
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
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-4 w-full"
                            >
                                {isLoading ? "Connexion..." : "Se connecter"}
                            </button>
                        </form>
                        <div className="mt-4">
                            <p className="text-white">
                                Nouveau Client?{" "}
                                <Link
                                    to={redirect ? `/register?redirect=${redirect}` : "/register"}
                                    className="text-pink-500 hover:underline"
                                >
                                    Inscription
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
                        alt=""
                        className="object-cover h-full w-full"
                    />
                </div>
            </section>
        </div>
    );
}

export default Login;
