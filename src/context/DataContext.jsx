import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    // code and functions
    const [head, setHead] = useState("Class");
    const [loggedUser, setLoggedUser] = useState("");
    const [token, setToken] = useState("");

    //
    const [email, setEmail] = useState("");
    const [Batch, setBatch] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setcPassword] = useState("");
    const [resetToken, setResetToken] = useState("");
    const [name, setName] = useState("");
    const [lName, setlName] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [qualification, setQualification] = useState("");
    const [experience, setExperience] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    // handle signin

    useEffect(() => {
        const loggedInUserJson = localStorage.getItem("loggedInUser");
        if (loggedInUserJson) {
            const user = JSON.parse(loggedInUserJson);
            setLoggedUser(user.student);
            setToken(user.token)
        }
        api.get("/")
            .then((res) =>
                console.log(res.data)
            ).catch((error) =>
                console.log(error))
    }, [])

    const handleSignIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const userData = {
            email: email,
            password: password,
        };
        try {
            const response = await api.post("/student/login", userData);
            localStorage.setItem("loggedInUser", JSON.stringify(response.data));
            setLoggedUser(response.data.student);
            setToken(response.data.token);
            setPassword("");
            setEmail("");
            setIsLoading(false);
            navigate("/class");
        } catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                console.log(error);
            }
            setIsLoading(false);
        }
    };

    // handle signout
    const handleLogout = () => {
        setToken(null);
        setLoggedUser(null);
        setHead("Class")
        navigate("/");
        localStorage.clear();
    };

    // handle sign up
    const handleSignUp = async (e) => {
        e.preventDefault();
        const userData = {
            email,
            name,
            lName,
            qualification,
            experience,
            password,
            contactNo,
        };
        if (password === cPassword) {
            try {
                await api.post("/student/signup", userData);
                setEmail("");
                setName("");
                setlName("");
                setQualification("");
                setExperience("");
                setPassword("");
                setcPassword("");
                setContactNo("");
                navigate("/");
            } catch (error) {
                // toast.error(error.response.data.message);
                console.log(error.response.data.message);
            }
        } else {
            // toast.error("password mismatch");
            alert("password mismatch");
        }
    };

    // handle sign up
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const userData = {
            email,
            name,
            lName,
            contactNo,
            qualification,
            experience,
            password
        };
        if (password === cPassword) {
            try {
                await api.put("/student/update", userData);
                setEmail("");
                setName("");
                setlName("");
                setContactNo("");
                setQualification("");
                setExperience("");
                setPassword("");
                setcPassword("");
            } catch (error) {
                // toast.error(error.response.data.message);
                console.log(error.response.data.message);
            }
        } else {
            // toast.error("password mismatch");
            alert("password mismatch")
        }
    };

    // handle account confirming
    const handleConfirm = (e) => {
        e.preventDefault();
        try {
            api.patch(`/student/confirm/${resetToken}`);
            navigate("/");
            // toast("Account confirmed Successfully");
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    // handle forgot password
    const handleForgot = async (e) => {
        e.preventDefault();
        try {
            await api.put("/student/forgot", { email: email });
            toast.success("Reset link send to your mail");
            setTimeout(() => {
                setEmail("");
                navigate("/");
            }, 2000);
        } catch (error) {
            // toast.error(error.response.data.message);
            console.log(error);
        }
    };

    // handle password reset
    const handleReset = async (e) => {
        e.preventDefault();
        if (password === cPassword) {
            api.patch(`/student/reset/${resetToken}`, { password: password });
            setResetToken("");
            setPassword("");
            setcPassword("");
            navigate("/");
            toast("Password Changed Successfully");
        } else {
            alert("password not matching");
        }
    };


    return (
        <DataContext.Provider
            value={{
                head,
                setHead,
                loggedUser,
                setLoggedUser,
                token,
                setToken,
                email,
                setEmail,
                password,
                setPassword,
                cPassword,
                setcPassword,
                resetToken,
                setResetToken,
                name,
                setName,
                lName,
                setlName,
                contactNo,
                setContactNo,
                qualification,
                setQualification,
                experience,
                setExperience,
                handleSignIn,
                handleLogout,
                handleSignUp,
                handleProfileUpdate,
                handleConfirm,
                handleForgot,
                handleReset,
                isLoading,
                setIsLoading
            }}
        >
            {children}
        </DataContext.Provider>
    )
};

export default DataContext;