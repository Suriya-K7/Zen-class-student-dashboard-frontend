import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";
import useWindowSize from "../hooks/useWindowSize";
import { roadMapData } from "../data";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    // code and functions
    const { width } = useWindowSize();
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
    const [config, setConfig] = useState({
        headers: {
            authorization: `bearer ${token}`,
        },
    })

    //for pages
    const [day, setDay] = useState(0);
    const [data, setData] = useState(roadMapData[0]);
    const [flag, setFlag] = useState(true);
    const [frontEndCode, setFrontEndCode] = useState("");
    const [frontEndURL, setFrontEndURL] = useState("");
    const [backEndCode, setBackEndCode] = useState("");
    const [backEndURL, setBackEndURL] = useState("");
    const [DBTask, setDBTask] = useState([]);
    const [trigger, setTrigger] = useState(0);
    const [webCode, setWebcode] = useState(null);
    const [capStone, setCapStone] = useState(null);
    const [queryTitle, setQueryTitle] = useState("");
    const [queryDesc, setQueryDesc] = useState("");
    const [query, setQuery] = useState([]);
    const [portfolio, setPortfolio] = useState(null);
    const [portfolioURL, setPortfolioURL] = useState("");
    const [githubURL, setGithubURL] = useState("");
    const [resumeURL, setResumeURL] = useState("");
    const [reason, setReason] = useState("");
    const [appliedOn, setAppliedOn] = useState("");
    const [leave, setLeave] = useState([]);
    const [mock, setMock] = useState([]);


    // handle signin

    useEffect(() => {
        const loggedInUserJson = localStorage.getItem("loggedInUser");
        if (loggedInUserJson) {
            const user = JSON.parse(loggedInUserJson);
            setLoggedUser(user.student);
            setToken(user.token)
            setConfig({
                headers: {
                    authorization: `bearer ${user.token}`,
                },
            })
        }
        api.get("/")
            .then((res) =>
                console.log(res.data)
            ).catch((error) =>
                console.log(error))
    }, []);

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
            setConfig({
                headers: {
                    authorization: `bearer ${response.data.token}`,
                },
            })
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
                toast.error(error.response.data.message);
                // console.log(error.response.data.message);
            }
        } else {
            toast.error("password mismatch");
            // alert("password mismatch");
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
                toast.error(error.response.data.message);
                // console.log(error.response.data.message);
            }
        } else {
            toast.error("password mismatch");
            // alert("password mismatch")
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
            toast.error(error.response.data.message);
            // console.log(error);
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

    // handling task submission

    const handleTask = async (e) => {

        e.preventDefault();

        setIsLoading(true)

        const config = {
            headers: {
                authorization: `bearer ${token}`,
            },
        };
        let check = loggedUser.email ? loggedUser.email : loggedUser.student.email;
        check = check + day;
        const newTask = {
            day,
            frontEndCode,
            frontEndURL,
            backEndCode,
            backEndURL,
            task: data.task,
            title: data.title,
            check,
        };

        try {
            const response = await api.post("/student/task", newTask, config);
            toast.success(response.data.message);
            setBackEndCode("");
            setBackEndURL("");
            setFrontEndCode("");
            setFrontEndURL("");
            setIsLoading(false);
        } catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                console.log(error);
            }
            setIsLoading(false);
        }
    }

    // fetching task
    const fetchTask = async () => {
        try {
            const fetchedTask = await api.get("student/task", config);
            if (fetchedTask) {
                setDBTask(fetchedTask.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // handling webcode submission
    const handleWebcode = async (e) => {

        e.preventDefault();

        setIsLoading(true);

        const newWebCode = {
            feUrl: frontEndURL,
            feCode: frontEndCode
        }
        try {
            const response = await api.post("student/webcode", newWebCode, config);
            toast.success(response.data.message);
            setFrontEndCode("");
            setFrontEndURL("")
            setTrigger((prev) => prev + 1);
            setIsLoading(false);
        } catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                console.log(error);
            }
            setIsLoading(false);
        }
    }

    //fecthing webcode
    const fetchWebcode = async () => {
        try {
            const fetchedWebcode = await api.get("student/webcode", config);
            if (fetchedWebcode) {
                setWebcode(fetchedWebcode.data[0]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // handling capstone submission
    const handleCapStone = async (e) => {

        e.preventDefault();

        setIsLoading(true);

        const newCapStone = {
            feUrl: frontEndURL,
            feCode: frontEndCode,
            beUrl: backEndURL,
            beCode: backEndCode,
        }

        try {
            const response = await api.post("student/capstone", newCapStone, config);
            toast.success(response.data.message);
            setFrontEndCode("");
            setFrontEndURL("");
            setBackEndCode("");
            setBackEndURL("");
            setTrigger((prev) => prev + 1);
            setIsLoading(false);
        } catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                console.log(error);
            }
            setIsLoading(false);
        }
    }

    // fetching capstone
    const fetchCapStone = async () => {
        try {
            const fetcheCapStone = await api.get("student/capstone", config);
            if (fetcheCapStone) {
                setCapStone(fetcheCapStone.data[0]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // handling query request
    const handleAddQuery = async () => {

        const data = {
            queryTitle, queryDesc
        }

        setIsLoading(true);

        try {
            const response = await api.post("student/query", data, config);
            setQueryTitle("");
            setQueryDesc("");
            setTrigger((prev) => prev + 1);
            setIsLoading(false);
            toast.success(response.data.message);
        } catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                console.log(error);
            }
            setIsLoading(false);
        }
    }

    // handling query request
    const handleQueryCancel = async (data) => {
        try {
            const response = await api.delete(`student/query/${data}`, config);
            toast.success(response.data.message);
            setTrigger((prev) => prev + 1);
        } catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                console.log(error);
            }
        }
    }

    // fetching queries
    const fetchQuery = async () => {
        try {
            const fetchedQuery = await api.get("student/query", config);
            if (fetchedQuery) {
                setQuery(fetchedQuery.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // handling portfolio submission
    const handlePortfolio = async (e) => {

        e.preventDefault();

        setIsLoading(true);

        const newPortfolio = {
            portfolioURL,
            githubURL,
            resumeURL
        }

        try {
            const response = await api.post("student/portfolio", newPortfolio, config);
            toast.success(response.data.message);
            setGithubURL("");
            setPortfolioURL("");
            setResumeURL("");
            setTrigger((prev) => prev + 1);
            setIsLoading(false);
        } catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                console.log(error);
            }
            setIsLoading(false);
        }
    }

    // fetching portfolio data
    const fetchPortfolio = async () => {
        try {
            const fetchedPortfolio = await api.get("student/portfolio", config);
            if (fetchedPortfolio) {
                setPortfolio(fetchedPortfolio.data[0]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // handling leave submission
    const handleAddLeave = async () => {

        setIsLoading(true);

        const data = {
            reason, appliedOn
        }

        try {
            const response = await api.post("student/leave", data, config);
            setReason("");
            setAppliedOn("");
            setIsLoading(false);
            toast.success(response.data.message);
            setTrigger((prev) => prev + 1);
        } catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                console.log(error);
            }
            setIsLoading(false);
        }
    }

    // handling leave canceling
    const handleLeaveCancel = async (data) => {
        try {
            const response = await api.delete(`student/leave/${data}`, config);
            toast.success(response.data.message);
            setTrigger((prev) => prev + 1);
        } catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                console.log(error);
            }
        }
    }

    // fetching leave data
    const fetchLeave = async () => {
        try {
            const fetchedLeave = await api.get("student/leave", config);
            if (fetchedLeave) {
                setLeave(fetchedLeave.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // fetching mock data
    const fetchMock = async () => {
        try {
            const fetchedMock = await api.get("student/mock", config);
            if (fetchedMock) {
                setMock(fetchedMock.data);
            }
        } catch (error) {
            console.log(error);
        }
    }


    //

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
                setIsLoading,
                width,
                day,
                setDay,
                data,
                setData,
                flag,
                setFlag,
                frontEndCode,
                setFrontEndCode,
                frontEndURL,
                setFrontEndURL,
                backEndCode,
                setBackEndCode,
                backEndURL,
                setBackEndURL,
                handleTask,
                config,
                fetchTask,
                DBTask,
                setDBTask,
                trigger,
                setTrigger,
                webCode,
                fetchWebcode,
                handleWebcode,
                capStone,
                handleCapStone,
                fetchCapStone,
                queryTitle,
                setQueryTitle,
                queryDesc,
                setQueryDesc,
                query,
                fetchQuery,
                handleAddQuery,
                handleQueryCancel,
                portfolio,
                portfolioURL,
                setPortfolioURL,
                githubURL,
                setGithubURL,
                resumeURL,
                setResumeURL,
                fetchPortfolio,
                handlePortfolio,
                leave,
                reason,
                setReason,
                appliedOn,
                setAppliedOn,
                fetchLeave,
                handleAddLeave,
                handleLeaveCancel,
                mock,
                fetchMock
            }}
        >
            {children}
        </DataContext.Provider>
    )
};

export default DataContext;