import React from 'react';
import "./syllabus.css";
import syllsbusPdf from "../../utils/mernSyllabus.pdf";
import { FaDownload } from "react-icons/fa";

const Syllabus = () => {
    return (
        <section className='syllabus'>
            <div className="syllabus__container col-10 col-lg-6">
                <div className='doc'>
                    <div className="doc__title">
                        Course
                    </div>
                    <div>FSD-MERN</div>
                </div>
                <div>
                    <div className='doc__title'>Syllabus</div>
                    <div> <a href={syllsbusPdf} download="" className='downlaod__syllabus'>
                        Download <FaDownload /></a> </div>
                </div>
            </div>
        </section>
    )
}

export default Syllabus;