import React from 'react'
import './index.css';

const DealStageColor = () => {
    return (

        <div>
            <h1 class="text-center p-6"> ISSUE #133:  Configure Tailwind Deal Stage colors according to the figma theme</h1>


            <div className="flex bg-white-700 m-6">

                <div className="box-border max-h-500 w-4/12 p-2 border-4">
                    <button className="bg-green-500 text-white py-2 px-4 rounded mb-4">Create New</button>


                    <div class="flex flex-row bg-grey-200 ml-4">
                        <div class="text-black bg-gray-100 text-center px-4 py-2 mr-1">Prospect</div>
                        <div class="text-black bg-gray-100 text-center px-4 py-2 mr-1">Proposal</div>
                        <div class="text-black bg-gray-100 text-center px-4 py-2 mr-1">Negotiation</div>
                        <div class="text-black bg-gray-100 text-center px-4 py-2">Closed</div>
                    </div>


                    <div class="box-border h-32 w-32 p-4 border-2 border-gray-100 mt-4 ml-4">
                        <h5>Card Component</h5>
                    </div>
                </div>

                <div className="bg-white max-h-500 w-2/12 p-4 border-2 ml-4">
                    <h5 >mobile view of deals template</h5>
                    <div>
                        <button className="box-border h-9 w-25 p-2 border-2 border-green-400 text-green-400 rounded mt-4 mb-4 mr-6">Deal Type</button>
                        <button className="bg-green-500 text-white py-2 px-4 rounded mb-4">Create</button>
                        <div class="box-border h-36 w-50 p-2 border-2 border-gray-100 mt-2 ">
                            <div class="box-border h-8 w-50 p-2 border-2 bg-gray-100 border-gray-100 mt-2"></div>
                            <div class="box-border h-8 w-26 p-2 border-2 border-gray-100 mt-2"></div>
                            <div class="box-border h-8 w-26 p-2 border-2 border-gray-100 mt-2 "></div>
                        </div>
                    </div>
                </div>

                <div className="bg-white max-h-500 w-2/12 p-4 border-2 ml-4">
                    <h5 className="p-4">Deals Color Types</h5>
                    <div>
                        <div class="bg-green-400 rounded-full h-8 w-8 flex items-center justify-center mb-2">
                            <p class="ml-8">Negotiations</p>
                        </div>
                        <div class="bg-blue-900 rounded-full h-8 w-8 flex items-center justify-center mb-2">
                            <p class="ml-8">Closed</p>
                        </div>
                        <div class="bg-red-600 rounded-full h-8 w-8 flex items-center justify-center mb-2">
                            <p class="ml-8">Prospect</p>
                        </div>
                        <div class="bg-yellow-400 rounded-full h-8 w-8 flex items-center justify-center mb-2">
                            <p class="ml-8">Proposal</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DealStageColor
