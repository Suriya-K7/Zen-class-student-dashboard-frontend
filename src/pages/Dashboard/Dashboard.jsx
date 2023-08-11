import React, { useState } from 'react';
import "./dashboard.css";
import BarChart from '../../components/chart/BarChart';
import { taskData } from '../../data';
import { userDetails } from '../../data';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [chartData, setChartData] = useState(
        {
            labels: taskData.map((data) => data.task).slice(1),
            datasets: [{
                label: "Task Score",
                data: taskData.map((data) => data.score).slice(1),
                backgroundColor: "#4b0dba",
                borderJoinStyle: "round"
            }]
        }
    )
    return (
        <section className='dashboard pt-2'>
            <div className='activities__box container'>
                <h3 className='text-center p-2'>Activities</h3>
                <div className='problem__solved gap-5'>
                    <div className="codekata">
                        <div className="head">CodeKata Problem Solved</div>
                        <div className="score text-center">{userDetails.codeKata}</div>
                    </div>
                    <div className="webkata">
                        <div className="head ">WebKata Problem Solved</div>
                        <div className="score text-center">{userDetails.webKata}</div>
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
                        <div className="score text-center">{userDetails.mockInterview / 2}</div>
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