import React from 'react';
import "./leaderboard.css";
import { leaderBoardData } from '../../data';

const Leaderboard = () => {
    return (
        <section className='leaderboard'>
            <div className="leader__leaderboard p-3  text-center">
                <h2>Competition is a good thing; it forces us to do our best.</h2>
            </div>
            <div className="leader__leaderboard__table">
                <table >
                    <thead>
                        <tr className='p-2 text-center text-md-start'>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Batch</th>
                            <th>Learning</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leaderBoardData.map((data) => {
                                return data.rank === 1 ?
                                    (
                                        <tr key={data.rank} className="topper p-2 text-center text-md-start">
                                            <td className='px-3'>{data.rank}</td>
                                            <td>{data.name}</td>
                                            <td>{data.batch}</td>
                                            <td>{data.learning}</td>
                                        </tr>
                                    ) :
                                    (
                                        <tr key={data.rank} className="p-2 text-center text-md-start">
                                            <td className='px-3'>{data.rank}</td>
                                            <td>{data.name}</td>
                                            <td>{data.batch}</td>
                                            <td>{data.learning}</td>
                                        </tr>
                                    )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Leaderboard;