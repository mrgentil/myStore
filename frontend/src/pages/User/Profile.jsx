import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading: loadingUpdateProfile }] =
        useProfileMutation();

    useEffect(() => {
        setUserName(userInfo.username);
        setEmail(userInfo.email);
        setPhone(userInfo.phone);
    }, [userInfo.email, userInfo.username]);

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas");
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    username,
                    email,
                    phone,
                    password,
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success("Profil mis à jour avec succès");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className="container mx-auto p-4 mt-[10rem]">
            <div className="flex justify-center align-center md:flex md:space-x-4">
                <div className="md:w-1/3">
                    <h2 className="text-2xl font-semibold mb-4">Mise à jour du profil</h2>
                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label className="block text-white mb-2">Nom</label>
                            <input
                                type="text"
                                placeholder="Entrer nom"
                                className="form-input p-4 rounded-sm w-full"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="Entrer email"
                                className="form-input p-4 rounded-sm w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white mb-2">Téléphone</label>
                            <input
                                type="tel"
                                placeholder="Entrer téléphone"
                                className="form-input p-4 rounded-sm w-full"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white mb-2">Mot de passe</label>
                            <input
                                type="password"
                                placeholder="Entrer password"
                                className="form-input p-4 rounded-sm w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white mb-2">Confirmer mot de passe</label>
                            <input
                                type="password"
                                placeholder="Confirmer mot de passe "
                                className="form-input p-4 rounded-sm w-full"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
                            >
                                Modifier
                            </button>

                            <Link
                                to="/user-orders"
                                className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
                            >
                                Mes Commandes
                            </Link>
                        </div>
                        {loadingUpdateProfile && <Loader/>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;