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
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import OnboardCompany from "../context/OnboardingContext";
import { ArrowLeft } from "react-feather";

const schema = yup.object().shape({
  company: yup.string().required(),
  position: yup.string().required(),
  sector: yup.string().required(),
});


function Home(props) {
  const [pageOne, setpageOne] = useState(true);
  const [showLoader, setshowLoader] = useState(false);
  const { register,handleSubmit, formState: { errors }, } = useForm({resolver: yupResolver(schema)});

  const showPageTwo = () => {
    setpageOne(false);
  };

  const showPageOne = () => {
    setpageOne(true);
  };

  const handleClickOthers = () => {
    document.getElementById("others-input").style.display = "block";
    document.getElementById("others-line").style.display = "block";
  }

  const handleClick = () => {
    document.getElementById("others-input").style.display = "none";
    document.getElementById("others-line").style.display = "none";
  }

  const onSubmit = (details) => {
    setshowLoader(true);
    OnboardCompany(details).then((res)=>{
      console.log(res)
    })
      setTimeout(() => {
        props.history.push("/prospects");
      }, 3000)
  };

  // const handlePageOne = () =>{

  //    //(handleSubmit(console.log(errors)))
  //   showPageTwo()
  //   //console.log(formState.errors)

  //   //if
  // }

  // const handleClickMobile = () => {
  //   onSubmit
  //   setshowLoader(true);
  //   setTimeout(() => {
  //     props.history.push("/NoProspectsFound");
  //   }, 3000);
  // };

  return showLoader ? (
    <div>
      <img src={Loader} alt="loader" className="animate-spin" id="loader" />
      <h2 className="font-medium text-2xl text-black-500 text-center">
        Setting up your account
      </h2>
      <br />
      <p className="text-base text-gray-400 text-center">Please wait a while</p>
    </div>
  ) : (
    <div>
        <form  onSubmit={handleSubmit(onSubmit)}>
        {pageOne ? (
          <div className="flex flex-col w-6/7 mx-auto md:w-1/2 p-5 mt-10 box-xs">
            <h2 className="font-bold text-xl md:text-2xl text-black-500 text-left">
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
                title="company"
                label="Company Name"
                placeholder="Type your company name"
                register={register} 
                required
              />
              <p className="text-error text-xs mb-2 -mt-3 capitalize">{errors.company?.message}</p>

              <Select
                title="sector"
                label="What sector is your company into?"
                register={register} 
                required
              >
                <option disabled selected value="">
                  Select Sector
                </option>
                <option>Technology</option>
                <option>Education</option>
                <option>Engineering</option>
                <option>Art</option>
                <option>Business</option>
                <option>Real estate</option>
              </Select>
              <p className="text-error text-xs mb-2 -mt-3 capitalize">{errors.sector?.message}</p>

              {window.innerWidth>=768 ? null :
                (<>
                  <Select
                    title="position"
                    label="What is your position?"
                    register={register} 
                    required
                  >
                    <option disabled selected value="">
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
                  <p className="text-error text-xs mb-2 -mt-3 capitalize md:hidden">{errors.position?.message}</p>
                </>)}

              <div className="flex justify-end">
                <button
                  className="hidden w-36 bg-green p-3 text-white rounded-sm border-green md:block hover:bg-green-300"
                  onClick={showPageTwo}
                >
                  Continue
                </button>

                <button
                  type="submit"
                  className=" block w-36 bg-green p-3 text-white rounded-sm border-green md:hidden  hover:bg-green-300"
                >
                  Setup
                </button>
              </div>
            </div>
          </div>
      ) : (
        <div className="md:flex flex-col w-full mx-auto px-5 pt-5 hidden">
          <h2 className="font-medium text-xl md:text-2xl text-black-500 text-center mb-3">
            What do you do at Zuri?
          </h2>
          <p className="text-base text-gray-400 text-center">
            We will use this to personalize your Sales Prospect experience
          </p>
          <br />
          <p className="error text-error text-xs mb-2 -mt-3 capitalize px-5 ">{errors.company?.message}</p>
          <p className="error text-error text-xs mb-2 -mt-3 capitalize px-5 ">{errors.sector?.message}</p>
          <p className="error text-error text-xs mb-2 -mt-3 capitalize px-5">{errors.position?.message}</p>
          <div className="flex flex-row flex-wrap justify-around content-start w-6/7 relative mb-10">
            <HomeCard
              src={Executive}
              text="Executive"
              id="Executive"
              register={register}
              handleClick={handleClick}
            />
            <HomeCard
              src={Salesman}
              text="Sales Man"
              id="Salesman"
              register={register}
              handleClick={handleClick}
            />
            <HomeCard
              src={Saleswoman}
              text="Sales Woman"
              id="Saleswoman"
              register={register}
              handleClick={handleClick}
            />
            <HomeCard
              src={Founder}
              text="Founder"
              id="Founder"
              register={register}
              handleClick={handleClick}
            />
            <HomeCard
              src={Manager}
              text="Manager"
              id="Manager"
              register={register}
              handleClick={handleClick}
            />
            <HomeCard
              src={Supervisor}
              text="Supervisor"
              id="Supervisor"
              register={register}
              handleClick={handleClick}
            />
            <HomeCard
              src={Others}
              text="Others"
              id="Others"
              register={register}
              handleClick={handleClickOthers}
            />
            <div className="others-box">
              <input className="border  border-none mt-16 outline-none h-12  w-full" type="text" placeholder="Type in your position" id="others-input" />
              <hr className="border-gray-500" id="others-line" />
            </div>

          </div>
          
          {(document.getElementsByClassName("error")) ? (<button
            onClick={showPageOne}
            className="flex absolute right-96 bottom-5  w-36 bg-green p-3 text-white rounded-sm border-green  hover:bg-green-300" 
          >
           <ArrowLeft />&nbsp; Previous 
          </button>) : null}
          <button
            type="submit"
            className="absolute right-48 bottom-5 block w-36 bg-green p-3 text-white rounded-sm border-green  hover:bg-green-300" 
          >
            Finish
          </button>
        </div>)}
      </form>
      
    </div>
  );
}


export default Home;
