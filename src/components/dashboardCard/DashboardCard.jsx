import React from "react";
import "./DashboardCard.css";


const DashboardCard = ({
    title,
    value,
    count,
    icon
}) => {


    return (

        <div className="dashboard-card">


            <div className="card-icon">

                {icon}

            </div>



            <div className="card-content">

                <h3>
                    {title}
                </h3>


                <h1>
                    {
                    value !== undefined
                    ?
                    value
                    :
                    count
                    }
                </h1>


            </div>



        </div>

    );

};


export default DashboardCard;