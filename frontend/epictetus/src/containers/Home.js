import React, { useState } from "react";
import Input from "../components/Input";
import Select from "../components/Select";
import HomeCard from "../components/HomeCard";
import Founder from "../components/svg/Manager _Flatline.svg";
import Salesman from "../components/svg/Salesman_Flatline.svg";
import Executive from "../components/svg/Businessman _Flatline.svg";
import Saleswoman from "../components/svg/Businesswoman_Flatline.svg";
import Manager from "../components/svg/Businessmen _Flatline.svg";
import Others from "../components/svg/Watermelon_Flatline.svg";
import Supervisor from "../components/svg/Startup_Flatline.svg";
import Loader from "../components/svg/Loader.svg";
import "../App.css";
import { useForm } from "react-hook-form";

function Home(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors)
  const onSubmit = (data) => {
    console.log(data)
  }
  console.log(props);
  const [pageOne, setpageOne] = useState(true);
  const [showLoader, setshowLoader] = useState(false);
  const showPageTwo = () => {
    setpageOne(false);
  };
  const handleClick = () => {
    setshowLoader(true);
    setTimeout(() => {
      props.history.push("/NoProspectsFound");
    }, 3000);
  };

  return showLoader ? (
    <div>
      <img src={Loader} alt="loader" className="animate-ping" id="loader" />
      <h2 className="font-medium text-2xl text-black-500 text-center">
        Setting up your account
      </h2>
      <br />
      <p className="text-base text-gray-400 text-center">Please wait a while</p>
    </div>
  ) : (
    <div>
      {pageOne ? (
        <form className="flex flex-col w-6/7 mx-auto md:w-1/3 p-5 mt-8 box-xs" onSubmit ={handleSubmit(onSubmit)}>
          <h2 className="font-bold text-2xl text-black-500 text-left">
            Sales Managment Just Got Easier!
          </h2>
          <br />
          <p className="text-base text-gray-400 text-left">
            Start by setting up your company’s personal details on Zuri Sales
            Prospect Plugin
          </p>
          <br />

          <div>
            <Input
              title="companyName"
              label="Company Name"
              placeholder="Type your company name"
              {...register("companyName", {
                required: "Name of company is required",
              })}
            />

            <Select
              title="sector"
              label="What sector is your company into?"
              {...register("sector", {
                required: "Name of sector is required",
              })}
            >
              <option disabled selected>
                Select
              </option>
              <option>Technology</option>
              <option>Education</option>
              <option>Engineering</option>
              <option>Art</option>
              <option>Business</option>
              <option>Real estate</option>
            </Select>

            <Select
              title="role"
              label="What is your position?"
              {...register("position", {
                required: "Name of role in company is required",
              })}
            >
              <option disabled selected>
                Select position
              </option>
              <option>Executive</option>
              <option>Sales Man</option>
              <option>Sales woman</option>
              <option>Founder</option>
              <option>Manager</option>
              <option>Supervisor</option>
              <option>Others</option>
            </Select>

            <div className="flex justify-end">
              <button
                className="hidden w-36 bg-primary p-3 text-white rounded-sm border-primary md:block hover:bg-green-300"
                onClick={showPageTwo}
              >
                Continue
              </button>

              <button
                className=" block w-36 bg-primary p-3 text-white rounded-sm border-primary md:hidden  hover:bg-green-300"
                onClick={handleClick}
              >
                Setup
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="md:flex flex-col w-4/5 mx-auto p-5 mt-8 hidden">
          <h2 className="font-medium text-2xl text-black-500 text-center">
            What do you do at Zuri?
          </h2>
          <br />
          <p className="text-base text-gray-400 text-center">
            We will use this to personalize your Sales Prospect experience
          </p>
          <br />
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
            <HomeCard src={Founder} text="Founder" handleClick={handleClick} />
            <HomeCard src={Manager} text="Manager" handleClick={handleClick} />
            <HomeCard
              src={Supervisor}
              text="Supervisor"
              handleClick={handleClick}
            />
            <HomeCard src={Others} text="Others" handleClick={handleClick} />
            <div className="homeCard invisible"></div>
          </div>
        </div>
      )}
    </div>
  );
    console.log(props)
    const [pageOne, setpageOne] = useState(true)
    const [showLoader, setshowLoader] = useState(false)

    const showPageTwo = ()=> {
        setpageOne(false);
    }

    const handleClick = ()=>{
        setshowLoader(true)
        setTimeout(() => {
            props.history.push("/NoProspectsFound")
        }, 3000);   
    }

    return (
        showLoader ? 
        (<div>
            <img src={Loader} alt="loader" className="animate-spin" id="loader"/>
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
            (<div className="md:flex flex-col w-4/5 mx-auto p-5 mt-5 hidden">
                <h2 className="font-medium text-2xl text-black-500 text-center" >What do you do at Zuri?</h2><br/>
                <p className="text-base text-gray-400 text-center">We will use this to personalize your Sales Prospect experience</p><br/>
                <div className="flex flex-row flex-wrap justify-around content-start w-6/7">
                    <HomeCard 
                        src={Executive}
                        text="Executive"
                        id="Executive"
                    />
                    <HomeCard 
                        src={Salesman}
                        text="Sales Man"
                        id="Salesman"
                    />
                    <HomeCard 
                        src={Saleswoman}
                        text="Sales Woman"
                        id="Saleswoman"
                    />
                    <HomeCard 
                        src={Founder}
                        text="Founder"
                        id="Founder"
                    />
                    <HomeCard 
                        src={Manager}
                        text="Manager"
                        id="Manager"
                    />
                    <HomeCard
                        src={Supervisor}
                        text="Supervisor"
                        id="Supervisor"
                    />
                    <HomeCard 
                        src={Others}
                        text="Others"
                        id="Others"
                    />
                    <div className="others-box">
                        <input className="border  border-none mt-20 outline-none h-12  w-full" type="text" placeholder="Type in your position" id="others-input"/>
                        <hr className="border-gray-500" id="others-line"/>
                    </div>
                </div>

            </div>)
            }
            
        </div>)
    )
}

export default Home;
