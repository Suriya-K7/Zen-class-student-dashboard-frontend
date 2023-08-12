import React, { useContext } from 'react';
import "./profile.css"
import DataContext from '../../context/DataContext';

const Profile = () => {

    const {
        handleProfileUpdate,
        password,
        setPassword,
        cPassword,
        setcPassword,
        name,
        setName,
        lName,
        setlName,
        qualification,
        setQualification,
        experience,
        setExperience,
        contactNo,
        setContactNo,
        loggedUser,
        email,
        setEmail,
        Batch,
        setBatch
    } = useContext(DataContext);

    return (
        <section className='profile'>
            <div className='container mt-5'>
                <form onSubmit={handleProfileUpdate}>
                    <div className="detailCards">
                        <h3 style={{ color: "var(--theme" }}>
                            Profile Details :
                        </h3>
                        <div className="personalDetails">
                            <label htmlFor="fname" className="label__style mb-0">First Name</label>
                            <div>
                                <input
                                    className="code__submission"
                                    id='fname'
                                    name="Fisrt Name"
                                    placeholder={loggedUser.name}
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <label htmlFor="lname" className="label__style mb-0">Last Name</label>
                            <div>
                                <input
                                    className="code__submission"
                                    id='lname'
                                    name="Last Name"
                                    placeholder={loggedUser.lName}
                                    type="text"
                                    value={lName}
                                    onChange={(e) => setlName(e.target.value)}
                                    required
                                />
                            </div>
                            <label htmlFor="mobile" className="label__style mb-0">Contact No</label>
                            <div>
                                <input
                                    className="code__submission"
                                    id='mobile'
                                    name="mobile"
                                    placeholder={loggedUser.contactNo}
                                    type="text"
                                    value={contactNo}
                                    onChange={(e) => setContactNo(e.target.value)}
                                    required
                                />
                            </div>
                            <label htmlFor="email" className="label__style mb-0">Email</label>
                            <div>
                                <input
                                    className="code__submission"
                                    id='email'
                                    name="email"
                                    type="text"
                                    placeholder={loggedUser.email}
                                    disabled
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <label htmlFor="batch" className="label__style mb-0">Batch</label>
                            <div>
                                <input
                                    className="code__submission"
                                    id='batch'
                                    name="batch"
                                    type='text'
                                    disabled
                                    placeholder={loggedUser.batch}
                                    value={Batch}
                                    onChange={(e) => setBatch(e.target.value)}
                                    required
                                />
                            </div>
                            <label htmlFor="qualification" className="label__style mb-0">Qualification</label>
                            <div>
                                <input
                                    className="code__submission"
                                    id='qualification'
                                    name="qualification"
                                    placeholder={loggedUser.qualification}
                                    type="text"
                                    value={qualification}
                                    onChange={(e) => setQualification(e.target.value)}
                                    required
                                />
                            </div>
                            <label htmlFor="YearofExperience" className="label__style mb-0">Year of Experience</label>
                            <div>
                                <input
                                    className="code__submission"
                                    id='YearofExperience'
                                    name="Year of Experience"
                                    placeholder={loggedUser.experience}
                                    type="text"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    required
                                />
                            </div>
                            <label htmlFor="password" className="label__style mb-0">Password</label>
                            <div>
                                <input
                                    className="code__submission"
                                    id='password'
                                    name="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <label htmlFor="cpassword" className="label__style mb-0">Confirm Password</label>
                            <div>
                                <input
                                    className="code__submission"
                                    id='cpassword'
                                    name="Confirm Password"
                                    type="password"
                                    value={cPassword}
                                    onChange={(e) => setcPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="text-center mt-3"><button className="submit__capstone" type="submit">Update</button></div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Profile;