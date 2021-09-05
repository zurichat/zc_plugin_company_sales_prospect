import React, { useState } from 'react'
import Input from './input'
import Select from './Select'
import '../App.css'
import HomeCard from './HomeCard';
import Founder from './svg/Manager _Flatline.svg';
import Salesman from './svg/Salesman_Flatline.svg';
import Executive from './svg/Businessman _Flatline.svg';
import Saleswoman from './svg/Businesswoman_Flatline.svg';
import Manager from './svg/Businessmen _Flatline.svg';
import Others from './svg/Watermelon_Flatline.svg';
import Supervisor from './svg/Startup_Flatline.svg';
import Loader from './svg/Loader.svg';

export default function Home() {
    const [pageOne, setpageOne] = useState(true)
    const [showLoader, setshowLoader] = useState(false)
    const showPageTwo = ()=> {
        setpageOne(false);
    }
    const handleClick=()=>{
        setshowLoader(true)
    }
    return (
        showLoader ? 
        (<div>
            <img src={Loader} alt="loader" className="animate-ping" id="loader"/>
            <h2 className="font-medium text-2xl text-black-500 text-center" >Setting up your account</h2><br/>
                <p className="text-base text-gray-400 text-center">Please wait a while</p>
        </div>) :
        (<div>
            { pageOne ? 
            (<form className="flex flex-col w-6/7 mx-auto md:w-1/3 p-5 mt-8 ">
                <h2 className="font-medium text-2xl text-black-500 text-center" >Lets Personalize your Experience!</h2><br/>
                <p className="text-base text-gray-400 text-center">Start by setting up your company’s personal details on Zuri Sales Prospect Plugin</p><br/>
                
                
                <div>
                    <Input title="companyName" label="Company Name" placeholder="Enter your company's name"/>

                    <Select title="sector" label="What sector is your company into?">
                        <option disabled selected>Select sector</option>
                        <option>Technology</option>
                        <option>Education</option>
                        <option>Engineering</option>
                        <option>Art</option>
                        <option>Business</option>
                        <option>Real estate</option>
                    </Select>

                    <Select title="role" label="What is your position?">
                        <option disabled selected>Select position</option>
                        <option>Executive</option>
                        <option>Sales Man</option>
                        <option>Sales woman</option>
                        <option>Founder</option>
                        <option>Manager</option>
                        <option>Supervisor</option>
                        <option>Others</option>
                    </Select>

                    <button className="hidden w-full bg-primary p-3 text-white rounded-sm border-green-400 md:block hover:bg-green-300" onClick={showPageTwo}>Continue</button>

                    <button className=" block w-full bg-primary p-3 text-white rounded-sm border-green-400 md:hidden  hover:bg-green-300" onClick={handleClick}>Setup</button>
                </div>
            </form>)
            :
            (<div className="md:flex flex-col w-4/5 mx-auto p-5 mt-8 hidden">
                <h2 className="font-medium text-2xl text-black-500 text-center" >What do you do at Zuri?</h2><br/>
                <p className="text-base text-gray-400 text-center">We will use this to personalize your Sales Prospect experience</p><br/>
                <div className="flex flex-row flex-wrap justify-around content-start w-6/7">
                    <HomeCard 
                        src={Executive}
                        text="Executive"
                        handleClick={handleClick}
                    />
                    <HomeCard 
                        src={Salesman}
                        text="Sales Man"
                        handleClick={handleClick}
                    />
                    <HomeCard 
                        src={Saleswoman}
                        text="Sales Woman"
                        handleClick={handleClick}
                    />
                    <HomeCard 
                        src={Founder}
                        text="Founder"
                        handleClick={handleClick}
                    />
                    <HomeCard 
                        src={Manager}
                        text="Manager"
                        handleClick={handleClick}
                    />
                    <HomeCard 
                        src={Supervisor}
                        text="Supervisor"
                        handleClick={handleClick}
                    />
                    <HomeCard 
                        src={Others}
                        text="Others"
                        handleClick={handleClick}
                    />
                    <div className="homeCard invisible"></div>
                </div>

            </div>)
            }
            
        </div>)
    )
}
