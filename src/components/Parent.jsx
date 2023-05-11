import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const ChildNames = ["Ali", "Usama", "Omair", "Talha", "Agha", "Hassan"];
const data = [
  {
    id: 1,
    email: "abc@gmail.com",
    firstname: "Ali",
    quiz1: 23,
    quiz2: 50,
    quiz3: 88,
    quiz4: 66,
    quiz5: 40,
  },
  {
    id: 2,
    email: "abc@gmail.com",
    firstname: "Usama",
    quiz1: 23,
    quiz2: 50,
    quiz3: 88,
    quiz4: 66,
    quiz5: 40,
  },
  {
    id: 3,
    email: "abc@gmail.com",
    firstname: "Ali",
    quiz1: 23,
    quiz2: 50,
    quiz3: 88,
    quiz4: 66,
    quiz5: 40,
  },
  {
    id: 4,
    email: "abc@gmail.com",
    firstname: "Talha",
    quiz1: 23,
    quiz2: 50,
    quiz3: 88,
    quiz4: 66,
    quiz5: 40,
  },
  {
    id: 5,
    email: "abc@gmail.com",
    firstname: "Omair",
    quiz1: 23,
    quiz2: 50,
    quiz3: 88,
    quiz4: 66,
    quiz5: 40,
  },
  {
    id: 6,
    email: "abc@gmail.com",
    firstname: "Omair",
    quiz1: 23,
    quiz2: 50,
    quiz3: 88,
    quiz4: 66,
    quiz5: 40,
  },
  {
    id: 7,
    email: "abc@gmail.com",
    firstname: "Talha",
    quiz1: 23,
    quiz2: 50,
    quiz3: 88,
    quiz4: 66,
    quiz5: 40,
  },
  {
    id: 8,
    email: "abc@gmail.com",
    firstname: "Agha",
    quiz1: 23,
    quiz2: 50,
    quiz3: 88,
    quiz4: 66,
    quiz5: 40,
  },
  {
    id: 9,
    email: "abc@gmail.com",
    firstname: "Hassan",
    quiz1: 23,
    quiz2: 50,
    quiz3: 88,
    quiz4: 66,
    quiz5: 40,
  },
  {
    id: 10,
    email: "abc@gmail.com",
    firstname: "Hassan",
    quiz1: 23,
    quiz2: 50,
    quiz3: 88,
    quiz4: 66,
    quiz5: 40,
  },
];

const API_URL = 'https://api-dashboard-brr3fliswa-uc.a.run.app'

const Parent = () => {

  const [schools, setSchools] = useState(null)
    useEffect(() => {
      fetch(API_URL + '/api/parent_dashboard', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          "email": "caitlinhblack@gmail.com"
        })
      })
      .then(response => response.json())
      .then(response => setSchools(response))
  }, [])
  
  useEffect(() => {
    fetch(API_URL + '/api/teacher_dashboard', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        "email": "jbrogan5.208@lgflmail.org"
      })
    })
    .then(response => response.json())
    .then(response => setSchools(response))

    return () => {}
  }, [])
  // console.log(schools)
  // const [isUserOpen, setIsUserOpen] = useState(false);
  // const [isChildOpen, setIsChildOpen] = useState(false);
  // const [selectedChild, setSelectedChild] = useState("");

  // const [isTimeFrameOpen, setIsTimeFrameOpen] = useState(false);
  // const [fromDate, setFromDate] = useState("");
  // const [toDate, setToDate] = useState("");
  // const dropdownRef = useRef(null);
  // //   const [selectedChild, setSelectedChild] = useState('');

  // // Calculate the averages
  // const numColumns = Object.keys(data[0]).length - 2;
  // // excluding the first two columns
  // const averages = Array(numColumns).fill(0);
  // data.forEach((student) => {
  //   for (let i = 2; i < numColumns + 2; i++) {
  //     averages[i - 2] += parseInt(student[`quiz${i - 1}`]);
  //   }
  // });
  // for (let i = 0; i < numColumns; i++) {
  //   averages[i] /= data.length;
  // }

  // const handleChildSelect = (childName) => {
  //   setSelectedChild(childName);
  //   console.log(`Selected child: ${childName}`);
  //   setIsChildOpen(false);
  // };
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsTimeFrameOpen(false);
  //     }
  //   };

  //   window.addEventListener("click", handleClickOutside);

  //   return () => {
  //     window.removeEventListener("click", handleClickOutside);
  //   };
  // }, [dropdownRef]);

  // const handleFromDateChange = (event) => {
  //   setFromDate(event.target.value);
  //   console.log("From date:", event.target.value);
  // };

  // const handleToDateChange = (event) => {
  //   setToDate(event.target.value);
  //   console.log("To date:", event.target.value);
  // };
  
  // return (
  //   <div className="md:mx-20 my-6">
  //     {/* main bar starts */}
  //     <div className="sticky w-ful h-auto gap-4 md:h-[20vh] flex justify-between items-center flex-col md:flex-row ">
  //       {/* logo */}
  //       <Link
  //         className="text-white no-underline hover:text-white hover:no-underline"
  //         to="/"
  //       >
  //         <img
  //           className="rounded-lg lg:w-52 h-auto mx-auto mb-2"
  //           src="https://static.wixstatic.com/media/6caf63_a83a2388007e4bec8f789dfe7818db84~mv2.jpg/v1/crop/x_0,y_53,w_1000,h_395/fill/w_230,h_91,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/CUSTOM%20-%20Rectangle%20(22).jpg"
  //           alt="Logo"
  //         />
  //       </Link>
  //       {/* name */}
  //       <h2 className="font-bold visible lg:text-4xl sm:text-xl md:text-2xl text-[#17026b] sm:my-6 cursor-pointer hidden md:block">
  //         School Name
  //       </h2>

  //       {/* username dropdown */}
  //       <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400]">
  //         <li className="mr-3">
  //           <div className="inline-block relative">
  //             <button
  //               onClick={() => setIsUserOpen(!isUserOpen)}
  //               className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg "
  //             >
  //               Username
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 viewBox="0 0 20 20"
  //                 fill="white"
  //                 className="inline w-4 h-4 ml-1"
  //               >
  //                 <path
  //                   fillRule="evenodd"
  //                   d="M5 7a1 1 0 011.707-.707l3.586 3.586 3.586-3.586A1 1 0 1115 7l-4 4a1 1 0 01-1.414 0l-4-4z"
  //                   clipRule="evenodd"
  //                 />
  //               </svg>
  //             </button>
  //             {isUserOpen && (
  //               <ul className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-slate-800 shadow-md">
  //                 <li className="border-b border-slate-400">
  //                   <Link
  //                     to="/settings"
  //                     className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
  //                   >
  //                     Settings
  //                   </Link>
  //                 </li>
  //                 {/* <li className="border-b border-slate-400"> */}
  //                 <li>
  //                   <Link
  //                     to="/"
  //                     className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
  //                   >
  //                     Logout
  //                   </Link>
  //                 </li>
  //               </ul>
  //             )}
  //           </div>
  //         </li>
  //       </ul>
  //     </div>

  //     {/* main bar ends */}

  //     {/* ----------------------------------------------------------- */}
  //     {/* filter bar starts here */}

  //     <div className="w-full md:w-[50vw] h-[15vh] flex justify-start items-center gap-4 flex-row mt-5">
  //       {/* choose child dropdown */}
  //       <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
  //         <li className="mr-3">
  //           <div className="inline-block relative">
  //             <button
  //               onClick={() => setIsChildOpen(!isChildOpen)}
  //               className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg "
  //             >
  //               Choose Child
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 viewBox="0 0 20 20"
  //                 fill="white"
  //                 className="inline w-4 h-4 ml-1"
  //               >
  //                 <path
  //                   fillRule="evenodd"
  //                   d="M5 7a1 1 0 011.707-.707l3.586 3.586 3.586-3.586A1 1 0 1115 7l-4 4a1 1 0 01-1.414 0l-4-4z"
  //                   clipRule="evenodd"
  //                 />
  //               </svg>
  //             </button>
  //             {isChildOpen && (
  //               <ul className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-slate-800 shadow-md">
  //                 {ChildNames.map((childName, index) => {
  //                   return (
  //                     <>
  //                       <li
  //                         className={
  //                           index !== childName.length - 1
  //                             ? "border-b border-slate-400 cursor-pointer"
  //                             : "cursor-pointer"
  //                         }
  //                         key={index}
  //                         onClick={() => handleChildSelect(childName)}
  //                       >
  //                         <span className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
  //                           {childName}
  //                         </span>
  //                       </li>
  //                     </>
  //                   );
  //                 })}
  //               </ul>
  //             )}
  //           </div>
  //         </li>
  //       </ul>
  //       {/* choose Time Frame dropdown */}
  //       <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
  //         <li className="mr-3">
  //           <div className="inline-block relative" ref={dropdownRef}>
  //             <button
  //               onClick={() => setIsTimeFrameOpen(!isTimeFrameOpen)}
  //               className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg "
  //             >
  //               Choose Time Frame
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 viewBox="0 0 20 20"
  //                 fill="white"
  //                 className="inline w-4 h-4 ml-1"
  //               >
  //                 <path
  //                   fillRule="evenodd"
  //                   d="M5 7a1 1 0 011.707-.707l3.586 3.586 3.586-3.586A1 1 0 1115 7l-4 4a1 1 0 01-1.414 0l-4-4z"
  //                   clipRule="evenodd"
  //                 />
  //               </svg>
  //             </button>
  //             {isTimeFrameOpen && (
  //               <ul className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-slate-800 shadow-md">
  //                 <li className="border-b border-slate-400">
  //                   <input
  //                     type="date"
  //                     name="date-range"
  //                     id="to-date"
  //                     className="block w-full px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white focus:outline-none"
  //                     value={toDate}
  //                     onChange={handleToDateChange}
  //                   />
  //                 </li>
  //                 <li>
  //                   <input
  //                     type="date"
  //                     name="date-range"
  //                     id="from-date"
  //                     className="block px-4 w-full py-2 text-gray-800 hover:bg-indigo-500 hover:text-white focus:outline-none"
  //                     value={fromDate}
  //                     onChange={handleFromDateChange}
  //                   />
  //                 </li>
  //               </ul>
  //             )}
  //           </div>
  //         </li>
  //       </ul>
  //     </div>
  //     {/* filter bar ends here */}
  //     {/* ----------------------------------------------------------- */}

  //     {/* table starts here */}
  //     <div className="overflow-x-auto shadow-md sm:rounded-sm  lg:mx-auto sm:w-full mt-10">
  //       <table className="w-full text-sm text-left table-fixed rounded-lg overflow-hidden shadow-sm shadow-slate-400">
  //         <thead className="text-xs text-white uppercase bg-[#17026b]">
  //           <tr className="items-center  text-center">
  //             <th
  //               scope="col"
  //               className="sticky left-0 z-10 px-6 py-3 bg-[#17026b] text-white w-40"
  //             >
  //               Username
  //             </th>
  //             <th
  //               scope="col"
  //               className="sticky left-40 z-10 px-6 py-3 bg-[#17026b] w-40 text-white "
  //             >
  //               First Name
  //             </th>
  //             <th scope="col" className="px-6 py-3 w-[7vw] text-white ">
  //               Quiz 1
  //             </th>
  //             <th scope="col" className="px-6 py-3 w-[7vw] text-white ">
  //               Quiz 2
  //             </th>
  //             <th scope="col" className="px-6 py-3 w-[7vw] text-white ">
  //               Quiz 3
  //             </th>
  //             <th scope="col" className="px-6 py-3 w-[7vw] text-white ">
  //               Quiz 4
  //             </th>
  //             <th scope="col" className="px-6 py-3 w-[7vw] text-white ">
  //               Quiz 5
  //             </th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {data.map((student) => (
  //             <>
  //               {student.firstname === selectedChild ? (
  //                 <>
  //                   <tr className="bg-white border border-[#17026b]  dark:border-gray-700 hover:bg-[#17026b] hover:text-white dark:hover:bg-gray-600 rounded-lg overflow-hidden text-center">
  //                     <td className="sticky left-0 z-10 px-6 py-3 w-40">
  //                       {student.email}
  //                     </td>
  //                     <td className="sticky left-40 z-10 px-6 py-3 w-40">
  //                       {student.firstname}
  //                     </td>
  //                     <td className={`px-6 py-4 ${student.quiz1 < 40 ? 'bg-red-500' : student.quiz1 >= 40 && student.quiz1 < 60 ? 'bg-yellow-500' : student.quiz1 >= 60 && student.quiz1 < 85 ? 'bg-green-500' : 'bg-blue-500'}`}>{student.quiz1}</td>
  //                     <td className={`px-6 py-4 ${student.quiz2 < 40 ? 'bg-red-500' : student.quiz2 >= 40 && student.quiz2 < 60 ? 'bg-yellow-500' : student.quiz2 >= 60 && student.quiz2 < 85 ? 'bg-green-500' : 'bg-blue-500'}`}>{student.quiz2}</td>
  //                     <td className={`px-6 py-4 ${student.quiz3 < 40 ? 'bg-red-500' : student.quiz3 >= 40 && student.quiz3 < 60 ? 'bg-yellow-500' : student.quiz3 >= 60 && student.quiz3 < 85 ? 'bg-green-500' : 'bg-blue-500'}`}>{student.quiz3}</td>
  //                     <td className={`px-6 py-4 ${student.quiz4 < 40 ? 'bg-red-500' : student.quiz4 >= 40 && student.quiz4 < 60 ? 'bg-yellow-500' : student.quiz4 >= 60 && student.quiz4 < 85 ? 'bg-green-500' : 'bg-blue-500'}`}>{student.quiz4}</td>
  //                     <td className={`px-6 py-4 ${student.quiz5 < 40 ? 'bg-red-500' : student.quiz5 >= 40 && student.quiz5 < 60 ? 'bg-yellow-500' : student.quiz5 >= 60 && student.quiz5 < 85 ? 'bg-green-500' : 'bg-blue-500'}`}>{student.quiz5}</td>
                      
  //                   </tr>
  //                 </>
  //               ) : (
  //                 <></>
  //               )}
  //             </>
  //           ))}
  //           <tr className="bg-white border border-[#17026b]  dark:border-gray-700 rounded-lg overflow-hidden text-center">
  //             <td className="sticky left-0 z-10 px-6 py-3 w-40 font-bold">
  //               Average
  //             </td>
  //             <td className="sticky left-40 z-10 px-6 py-3 w-40"></td>
  //             {selectedChild === "" ? (
  //               <>
  //                 {averages.map(
  //                   (average, index) =>
  //                     data.some((student) => student[`quiz${index + 1}`]) && (
  //                       <td className="px-6 py-4 text-center">- --</td>
  //                     )
  //                 )}
  //               </>
  //             ) : (
  //               <>
  //                 {averages.map(
  //                   (average, index) =>
  //                     data.some((student) => student[`quiz${index + 1}`]) && (
  //                       <td className={`px-6 py-4 ${average.toFixed(2) < 40 ? 'bg-red-500' : average.toFixed(2) >= 40 && average.toFixed(2) < 60 ? 'bg-yellow-500' : average.toFixed(2) >= 60 && average.toFixed(2) < 85 ? 'bg-green-500' : 'bg-blue-500'}`}>
  //                         {average.toFixed(2)}
  //                       </td>
  //                     )
  //                 )}
  //               </>
  //             )}
  //           </tr>
  //         </tbody>
  //       </table>
  //     </div>
  //     {/* table ends here */}
  //     {/* ----------------------------------------------------------- */}
  //   </div>
  // );
};

export default Parent;
