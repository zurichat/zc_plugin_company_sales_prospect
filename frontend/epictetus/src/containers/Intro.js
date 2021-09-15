import React from 'react';
import ActiveProspect from "../components/svg/ActivePage.svg";
import EditDeal from "../components/svg/EditDeal.svg";
import ActiveProspectMobile from "../components/svg/ActiveProspectMobile.svg";
import ActiveDealMobile from "../components/svg/ActiveDealMobile.svg";
import "../App.css"
function Intro() {
    return (
        <div className="flex  flex-col justify-center items-center" >
            <section>
               <div className="text-center bg-primary text-white  lg:px-96 relative md:px-64 py-7 rounded-t-xl h-52 w-full px-32" >
                    <h2 className="font-bold text-xl tracking-wide" >Sales Prospect Plugin</h2>
                    <h6 className="font-bold">Redefining Sales </h6>
               </div>
               <div className="flex flex-col justify-center lg:flex-row absolute lg:top-13.5 lg:left-40">
                   <img src={ActiveProspect} alt=""/>
                   <img src={EditDeal} alt=""/>
               </div>
                 
                <div className="flex gap-3  -mt-16  mb-16 justify-center md:hidden">
                 <img src={ActiveProspectMobile} alt="screen"  className="shadow-md" />
                 <img src={ActiveDealMobile} alt="screen"  className="shadow-md" />
                </div>
            </section>
            <section className="text-center w-full lg:text-left mar lg:my-60">
                    <h2 className="text-black text-lg my-2.5">
                      Redefining sales management in your work space
                    </h2>

                    <p className="text-gray-400 my-2.5   "> 
                        This is a work space that redefines sales and customer relationship <br/> management. 
                        It helps you track your customer's journey easily and <br/> helps your team track thier sales goals efficiently. 
                    </p>

                    <p className="text-gray-400 my-2.5">
                        This integraion will post -notification when a deal has been <br/> achieved and a deal has been won.
                    </p>

                    <p className="text-gray-400 my-2.5">
                        -You can easily see the list of deals, click on any deal of your <br/> choice to see more details about the deal.
                    </p>

                    <p className="text-gray-400 my-5">
                        -it is well organised and easy to understand.
                    </p>
                    <button className="w-36 bg-primary my-5 p-3 text-white rounded-sm border-primary hover:bg-green-300">Get Started</button>
                </section>
        </div>
    )
}

export default Intro
