import React, { useState, useEffect, useContext } from 'react';
import "./dashboard.css";
import BarChart from '../../components/chart/BarChart';
import { taskData } from '../../data';
import { userDetails } from '../../data';
import { Link } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import api from '../../api/api';

const Dashboard = () => {

    const { loggedUser, token } = useContext(DataContext);
    const [DBTask, setDBTask] = useState([]);
    const config = {
        headers: { authorization: `bearer ${token}` },
    }
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
    const [chartData, setChartData] = useState(
        {
            labels: DBTask.map((data) => data.title),
            datasets: [{
                label: "Task Score",
                data: DBTask.map((data) => data.score),
                backgroundColor: "#4b0dba",
                borderJoinStyle: "round"
            }]
        }
    )
    useEffect(() => {
        fetchTask();
    }, []);
    useEffect(() => {
        setChartData(
            {
                labels: DBTask.map((data) => `Day-${data.day}`),
                datasets: [{
                    label: "Task Score",
                    data: DBTask.map((data) => data.score),
                    backgroundColor: "#4b0dba",
                    borderJoinStyle: "round"
                }]
            }
        )
    }, [DBTask, setDBTask])

    console.log(DBTask);

    return (
        <section className='dashboard pt-2'>
            <div className='activities__box container'>
                <h3 className='text-center p-2'>Activities</h3>
                <div className='problem__solved gap-5'>
                    <div className="codekata">
                        <div className="head">CodeKata Problem Solved</div>
                        <div className="score text-center">{loggedUser.codeKata}</div>
                    </div>
                    <div className="webkata">
                        <div className="head ">WebKata Problem Solved</div>
                        <div className="score text-center">{loggedUser.webKata}</div>
                    </div>
                </div>
            </div>
            <br />
            <div className='activities__box container'>
                <h3 className='text-center p-2'>Task Status</h3>
                <BarChart chartData={chartData} />
            </div>
            <br />
            <div className='activities__box container'>
                <h3 className='text-center p-2'>Event Status</h3>
                <div className='problem__solved gap-5'>
                    <div className="codekata">
                        <div className="head">Webcode-1 Score</div>
                        <div className="score text-center">
                            {userDetails.webcode.score !== "" ?
                                userDetails.webcode.score : "Not yet Graded"
                            }
                        </div>
                        <div className='text-center mb-2'>
                            <Link to="/webcode" className='view__btn'>
                                View
                            </Link>
                        </div>
                    </div>
                    <div className="webkata">
                        <div className="head ">Capstone-1 Score</div>
                        <div className="score text-center">
                            {userDetails.capstone.score !== "" ?
                                userDetails.capstone.score : "Not yet Graded"
                            }
                        </div>
                        <div className='text-center mb-2'>
                            <Link to="/capstone" className='view__btn'>
                                View
                            </Link>
                        </div>
                    </div>
                    <div className="webkata">
                        <div className="head ">Mock Interview Avg</div>
                        <div className="score text-center">{loggedUser.mockInterview}</div>
                        <div className='text-center mb-2'>
                            <Link to="/mock" className='view__btn'>
                                View
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard;