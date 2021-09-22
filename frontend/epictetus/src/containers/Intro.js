import React from 'react';
import ActiveProspect from "../components/svg/ActivePage.svg";
import EditDeal from "../components/svg/EditDeal.svg";
import ActiveProspectMobile from "../components/svg/ActiveProspectMobile.svg";
import ActiveDealMobile from "../components/svg/ActiveDealMobile.svg";
import "../App.css"
function Intro(props) {
    const handleClick=()=>{
        props.history.push("/onboarding");
    }


    if(window)
    return (
        <div className="flex  flex-col justify-center items-center mt-16 w-full px-5 md:px-10"  >
            <section className=" w-full md:w-5/6">
               <div className="text-center bg-transparent px-14  md:bg-green md:text-white text-black py-7 rounded-t-xl h-52 md:pb-24 w-full lg:px-7" >
                    <h2 className=" md:text-center text-left font-bold text-xl tracking-wide" >Sales Prospect Plugin</h2>
                    <h6 className=" md:text-center text-left text-gray-400 md:text-white  md:font-bold">Redefining Sales </h6>
               </div>

               <div className=" hidden md:flex flex-col justify-center lg:flex-row z-9 -mt-24 md:px-10">
                   <img src={ActiveProspect} alt="screen" className="m-3 border bg-white border-white shadow-md"/>
                   <img src={EditDeal} alt="screen" className="m-3 border bg-white border-white shadow-md"/>
                </div>
                 
                <div className="flex gap-3  mt-16  mb-16 justify-center md:hidden">
                 <img src={ActiveProspectMobile} alt="screen"  className="shadow-md" />
                 <img src={ActiveDealMobile} alt="screen"  className="shadow-md" />
                </div>
            </section>
            <section className=" w-5/6 md:w-4/6 lg:w-1/2 text-left mx-auto mt-8">
                    <h2 className="text-black text-lg my-2.5 font-semibold">
                      Redefining sales management in your work space
                    </h2>
                    <p className="text-gray-400 my-2.5"> 
                        This is a work space that redefines sales and customer relationship <br/> management. 
                        It helps you track your customer's journey easily and <br/> helps your team track thier sales goals efficiently.
                    </p>

                    <p className="text-gray-400 my-2.5">
                        This integraion will trigger post -notification when a deal has been <br/> achieved and a deal has been won.
                    </p>

                    <p className="text-gray-400 my-2.5">
                        -You can easily see the list of deals, click on any deal of your <br/> choice to see more details about the deal.
                    </p>

                    <p className="text-gray-400 my-5">
                        -it is well organised and easy to understand.
                    </p>
                    <button className="w-36 bg-green my-5 p-3 text-white rounded-sm border-green hover:bg-green-300" onClick={handleClick}>Get Started</button>
                </section>
        </div>
    )
}

export default Intro
