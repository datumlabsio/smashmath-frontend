import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = 'http://localhost:9000'

const SchoolDashboard = () => {

  const [schools, setSchools] = useState([])
  console.log('School dashboard')
  useEffect(() => {
    fetch(API_URL + '/api/parent_dashboard', {
      method: 'POST',
      body: JSON.stringify({
        "email": "caitlinhblack@gmail.com"
      })
    })
    .then(response => response.json())
    .then(response => setSchools(response))
  }, [schools])
  

  return (
    <div className="w-full overflow-hidden mb-10">
      {'HEllo '}
      {schools}
      <div className="grid  place-content-between   grid-flow-col  w-5/6  mx-auto my-8 ">
        <Link to='/'>

        <img
          className="rounded-lg lg:w-52 h-auto mx-auto mb-2"
          src="https://static.wixstatic.com/media/6caf63_a83a2388007e4bec8f789dfe7818db84~mv2.jpg/v1/crop/x_0,y_53,w_1000,h_395/fill/w_230,h_91,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/CUSTOM%20-%20Rectangle%20(22).jpg"
          alt="smashmath logo"
        />
        </Link>
        <h2 className="font-bold visible lg:text-4xl sm:text-xl md:text-2xl text-[#17026b] sm:my-6">
          School Name
        </h2>

        <div>
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            class="text-white bg-[#17026b]   font-medium rounded-sm text-sm px-4 py-2.5 text-center inline-flex items-center"
            type="button"
          >
            Username
            <svg
              class="w-4 h-4 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          <div
            id="dropdown"
            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              class="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <Link
                  to="#"
                  class="block px-4 py-2 hover:bg-gray-100  dark:hover:text-white"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[] dark:hover:text-white"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex mx-auto w-5/6">
        <div className="flex flex-col">
          <label
            for="teacher"
            class="block mb-2 text-sm font-bold text-[#17026b] dark:text-white"
          >
            Choose child
          </label>
          <select
            id="teacher"
            class=" bg-[#17026b] border border-gray-300 text-white text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Math" className="bg-white text-[#17026b]">
              john
            </option>
            <option value="physics" className="bg-white text-[#17026b]">
              wick
            </option>
          </select>
        </div>
        <div className="flex flex-col w-5/6 mx-auto">
          <label
            for="year"
            class="block mb-2 text-sm font-bold text-[#17026b] dark:text-white"
          >
            Time Frame
          </label>
          <select
            id="year"
            class=" bg-[#17026b] border border-[#17026b] text-white text-sm rounded-sm focus:ring-[#17026b] focus:border-[#17026b] block w-32 p-2.5  dark:text-white "
          >
            <option disabled className="bg-white text-gray-400">
              Choose Year
            </option>
            <option value="Since Sept" className="bg-white text-[#17026b]">
              Since Sept
            </option>
            <option value="Last 52 week" className="bg-white text-[#17026b]">
              Last 52 week
            </option>
          </select>
        </div>
      </div>


{/* tabel */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-sm lg:w-5/6 lg:mx-auto sm:w-full mt-10">
        <table className="w-full text-sm text-left text-[#17026b] table-fixed ">
          <thead className="text-xs text-white uppercase bg-[#17026b]">
            <tr>
              <th
                scope="col"
                className="sticky left-0 z-10 px-6 py-3 bg-[#17026b] w-40"
              >
                Username
              </th>
              <th
                scope="col"
                className="sticky left-40 z-10 px-6 py-3 bg-[#17026b] w-40"
              >
                First Name
              </th>
              <th scope="col" className="px-6 py-3 w-[7vw]">
                Quiz 1
              </th>
              <th scope="col" className="px-6 py-3 w-[7vw]">
                Quiz 2
              </th>
              <th scope="col" className="px-6 py-3 w-[7vw]">
                Quiz 3
              </th>
              <th scope="col" className="px-6 py-3 w-[7vw]">
                Quiz 4
              </th>
              <th scope="col" className="px-6 py-3 w-[7vw]">
                Quiz 5
              </th>
              <th scope="col" className="px-6 py-3 w-[7vw]">
                Quiz 5
              </th>
              <th scope="col" className="px-6 py-3 w-[7vw]">
                Quiz 5
              </th>
              <th scope="col" className="px-6 py-3 w-[7vw]">
                Quiz 5
              </th>
              <th scope="col" className="px-6 py-3 w-[7vw]">
                Quiz 5
              </th>
              

              {/* add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {/* add table rows and data as needed */}
            {data.map((student) => (
              <tr class="bg-white border border-[#17026b]  dark:border-gray-700 hover:bg-[#17026b] hover:text-white dark:hover:bg-gray-600">
                <td class="sticky left-0 z-10 px-6 py-3 w-40">{student.email}</td>
                <td class="sticky left-40 z-10 px-6 py-3 w-40">{student.firstname}</td>
                <td class="px-6 py-4">{student.quiz1}</td>
                <td class="px-6 py-4">{student.quiz2}</td>
                <td class="px-6 py-4">{student.quiz3}</td>
                <td class="px-6 py-4">{student.quiz4}</td>
                <td class="px-6 py-4">{student.quiz5}</td>
                <td class="px-6 py-4">{student.quiz5}</td>
                <td class="px-6 py-4">{student.quiz5}</td>
                <td class="px-6 py-4">{student.quiz5}</td>
                <td class="px-6 py-4">{student.quiz5}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchoolDashboard;
