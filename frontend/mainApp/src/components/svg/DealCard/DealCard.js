import React from "react";
import "./style.css";

class DealCard extends React.Component {
  render() {
    return (
      <div className="py-2 px-2.5 cardContainer">
        <div className="cardHeader mb-3 flex justify-between items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-1/12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="dealName w-8/12  my-0 font-bold">
            {this.props.dealName}
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-1/12"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </div>
        <p className="dealDetail w-8/12 mx-auto mb-2 mt-0">
          <span className="companyName block">{this.props.companyName}</span>
          <span className="dealWorth block">$ {this.props.dealWorth}</span>
        </p>

        <div className="customerDetails flex justify-between items-center ">
          <img
            src="https://images.pexels.com/photos/6121448/pexels-photo-6121448.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="Customer Profile"
            className="profile-pic rounded-full w-6 h-6"
          />
          <p className="nameAndEmail w-10/12 my-0">
            <span className="email block lowercase">
              {this.props.customerEmail}
            </span>
            <span className="name block font-bold capitalize">
              {this.props.customerFullName}
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default DealCard;
