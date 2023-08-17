import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const About = () => {
    const completedTasks = [
        "Create a 2 step form with input fields",
        "Show all input values from step one in step two",
        "File upload (CSV) for automatic input population",
        "Calculate and display max and min values of X, Y, Z",
        "Create a result page with input values displayed in a table",
        "Enable user to download the result as a PDF",
        "If the CSV file is uploaded then show the chart.",
        
    ];

    return (
        <div className='h-screen flex items-center justify-center'>
            <div className="bg-white p-8 shadow-2xl shadow-black w-full md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-3xl">
                <h1 className="text-2xl font-semibold mb-4">Completed Tasks</h1>
                <ul className="list-none pl-4">
                    {completedTasks.map((task, index) => (
                        <li key={index} className="mb-3 flex items-center">
                            <FaCheckCircle className="text-green-500 mr-2" />
                            {task}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default About;
