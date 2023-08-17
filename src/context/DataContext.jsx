import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";
import useWindowSize from "../hooks/useWindowSize";
import { roadMapData } from "../data";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    // variables and functions
    const { width } = useWindowSize();
    const [head, setHead] = useState("");
    const [loggedUser, setLoggedUser] = useState("");
    const [token, setToken] = useState("");
    const [resetToken, setResetToken] = useState("");
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
    const [toggle, setToggle] = useState(false);
    const [frontEndCode, setFrontEndCode] = useState("");
    const [frontEndURL, setFrontEndURL] = useState("");
    const [backEndCode, setBackEndCode] = useState("");
    const [backEndURL, setBackEndURL] = useState("");
    const [DBTask, setDBTask] = useState([]);
    const [trigger, setTrigger] = useState(0);
    const [webCode, setWebcode] = useState(null);
    const [capStone, setCapStone] = useState(null);
    const [query, setQuery] = useState([]);
    const [portfolio, setPortfolio] = useState(null);
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

    const handleSignIn = async (data) => {

        setIsLoading(true);

        try {
            const response = await api.post("/student/login", data);
            localStorage.setItem("loggedInUser", JSON.stringify(response.data));
            setLoggedUser(response.data.student);
            setToken(response.data.token);
            setConfig({
                headers: {
                    authorization: `bearer ${response.data.token}`,
                },
            })
            setIsLoading(false);
            if (response.data.student.isMentor) {
                navigate("/mentor")
            } else {
                navigate("/class");
            }
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
    const handleSignUp = async (data) => {

        setIsLoading(true);

        try {
            const response = await api.post("/student/signup", data);
            toast.success(response.data.message);
            toast.success("Check your Mail & Activate");
            setIsLoading(false);
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                console.log(error);
            }
            setIsLoading(false);
        }
    };

    // handle profile update
    const handleProfileUpdate = async (data) => {

        setIsLoading(true);

        try {
            const response = await api.put("/student/update", data);
            const student = response.data.matchedStudent;
            const updatedData = { token, student };
            localStorage.setItem("loggedInUser", JSON.stringify(updatedData));
            setLoggedUser(updatedData.student);
            toast.success(response.data.message);
            setIsLoading(false);
            setTimeout(() => {
                navigate("/class");
            }, 2000);
        } catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                console.log(error);
            }
            setIsLoading(false);
        }

    };

    // handle account confirming
    const handleConfirm = (e) => {

        setIsLoading(true);

        e.preventDefault();
        try {
            api.patch(`/student/confirm/${resetToken}`);
            toast.success("Account confirmed Successfully");
            setIsLoading(false);
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                console.log(error);
            }
            setIsLoading(false);
        }
    };

    // handle forgot password
    const handleForgot = async (data) => {

        setIsLoading(true);

        try {
            await api.put("/student/forgot", data);
            toast.success("Reset link send to your mail");
            setIsLoading(false);
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                console.log(error);
            }
            setIsLoading(false);
        }
    };

    // handle password reset
    const handleReset = async (data) => {

        setIsLoading(true);

        try {
            const response = await api.patch(`/student/reset/${resetToken}`, data);
            setResetToken("");
            toast.success(response.data.message);
            setIsLoading(false);
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                console.log(error);
            }
            setIsLoading(false);
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

    // fetching all task
    const fetchAllTask = async () => {
        try {
            const fetchedTask = await api.get("student/alltask");
            if (fetchedTask) {
                setDBTask(fetchedTask.data.filter((item) => item.score === "Yet to be graded"));
            }
        } catch (error) {
            console.log(error);
        }
    }

    // update task Score
    const handleTaskScore = async (data) => {

        setIsLoading(true);

        try {
            const response = await api.patch("/student/task/evaluation", data);
            toast.success(response.data.message);
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

    // handling webcode submission
    const handleWebcode = async (data) => {

        setIsLoading(true);

        try {
            const response = await api.post("student/webcode", data, config);
            toast.success(response.data.message);
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
    const handleCapStone = async (data) => {

        setIsLoading(true);

        try {
            const response = await api.post("student/capstone", data, config);
            toast.success(response.data.message);
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
    const handleAddQuery = async (data) => {

        setIsLoading(true);

        try {
            const response = await api.post("student/query", data, config);
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
    const handlePortfolio = async (data) => {

        setIsLoading(true);

        try {
            const response = await api.post("student/portfolio", data, config);
            toast.success(response.data.message);
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
    const handleAddLeave = async (data) => {

        setIsLoading(true);

        try {
            const response = await api.post("student/leave", data, config);
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

    const handleHead = (data) => {
        setHead(data);
        setToggle(false);
        localStorage.setItem("head", data);
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
                resetToken,
                setResetToken,
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
                query,
                fetchQuery,
                handleAddQuery,
                handleQueryCancel,
                portfolio,
                fetchPortfolio,
                handlePortfolio,
                leave,
                fetchLeave,
                handleAddLeave,
                handleLeaveCancel,
                mock,
                fetchMock,
                handleHead,
                toggle,
                setToggle,
                fetchAllTask,
                handleTaskScore
            }}
        >
            {children}
        </DataContext.Provider>
    )
};

export default DataContext;