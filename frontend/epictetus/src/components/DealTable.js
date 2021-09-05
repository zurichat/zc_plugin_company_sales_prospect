import DealCard from "./svg/DealCard/DealCard";
import "./styled.css";
import React from 'react'

function DealTable() {
    

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Prospects <br/> 3 deals * $1,500,000</th>
            <th>Proposals <br/> 3 deals * $563,000,000</th>
            <th>Negotiation <br/> 3 deals * $1,500,000</th>
            <th>Closed <br/> 3 deals * $99,000,000</th>
          </tr>
        </thead>
        <tbody>
          <tr>
              <td>
                  <DealCard
                   dealName="Jane's deal"
                   companyName="NNPC"
                   dealWorth="500,000"
                   customerEmail="janecooper@nnpc.com"
                   customerFullName="Jane Cooper" />
              </td>
              <td>
                  <DealCard 
                   dealName="Jane's deal"
                   companyName="NNPC"
                   dealWorth="500,000"
                   customerEmail="janecooper@nnpc.com"
                   customerFullName="Jane Cooper"/>
              </td>
              <td>
                  <DealCard
                   dealName="Jane's deal"
                   companyName="NNPC"
                   dealWorth="500,000"
                   customerEmail="janecooper@nnpc.com"
                   customerFullName="Jane Cooper" />
              </td>
              <td>
                  <DealCard  
                  dealName="Jane's deal"
                  companyName="NNPC"
                  dealWorth="500,000"
                  customerEmail="janecooper@nnpc.com"
                  customerFullName="Jane Cooper"/>
              </td>
          </tr>
            <tr>
                <td>
                    <DealCard 
                     dealName="Jane's deal"
                     companyName="NNPC"
                     dealWorth="500,000"
                     customerEmail="janecooper@nnpc.com"
                     customerFullName="Jane Cooper"/>
                </td>
            </tr>
            <tr>
                <td>
                    <DealCard 
                     dealName="Jane's deal"
                     companyName="NNPC"
                     dealWorth="500,000"
                     customerEmail="janecooper@nnpc.com"
                     customerFullName="Jane Cooper"/>
                </td>
            </tr>

        </tbody>
      </table>
    </div>
  );
}

export default DealTable;
