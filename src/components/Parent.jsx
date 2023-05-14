import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ChildNames = ["Ali", "Usama", "Omair", "Talha", "Agha", "Hassan"];
const data = [
  {
    id: 1,
    email: "abc@gmail.com",
    firstname: "Ali",
    quiz1: 23,
    quiz2: 20,
    quiz3: 25,
    quiz4: 30,
    quiz5: 35,
    quiz6: 36,
    quiz7: 37,
    quiz8: 38,
    quiz9: 39,
    quiz10: 310,
  },
  {
    id: 2,
    email: "abc@gmail.com",
    firstname: "Usama",
    quiz1: 23,
    quiz2: 20,
    quiz3: 25,
    quiz4: 30,
    quiz5: 35,
    quiz6: 36,
    quiz7: 37,
    quiz8: 38,
    quiz9: 39,
    quiz10: 310,
  },
  {
    id: 3,
    email: "abc@gmail.com",
    firstname: "Ali",
    quiz1: 23,
    quiz2: 20,
    quiz3: 25,
    quiz4: 30,
    quiz5: 35,
    quiz6: 36,
    quiz7: 37,
    quiz8: 38,
    quiz9: 39,
    quiz10: 310,
  },
  {
    id: 4,
    email: "abc@gmail.com",
    firstname: "Talha",
    quiz1: 23,
    quiz2: 20,
    quiz3: 25,
    quiz4: 30,
    quiz5: 35,
    quiz6: 36,
    quiz7: 37,
    quiz8: 38,
    quiz9: 39,
    quiz10: 310,
  },
  {
    id: 5,
    email: "abc@gmail.com",
    firstname: "Omair",
    quiz1: 23,
    quiz2: 20,
    quiz3: 25,
    quiz4: 30,
    quiz5: 35,
    quiz6: 36,
    quiz7: 37,
    quiz8: 38,
    quiz9: 39,
    quiz10: 310,
  },
  {
    id: 6,
    email: "abc@gmail.com",
    firstname: "Omair",
    quiz1: 23,
    quiz2: 20,
    quiz3: 25,
    quiz4: 30,
    quiz5: 35,
    quiz6: 36,
    quiz7: 37,
    quiz8: 38,
    quiz9: 39,
    quiz10: 310,
  },
  {
    id: 7,
    email: "abc@gmail.com",
    firstname: "Talha",
    quiz1: 23,
    quiz2: 20,
    quiz3: 25,
    quiz4: 30,
    quiz5: 35,
    quiz6: 36,
    quiz7: 37,
    quiz8: 38,
    quiz9: 39,
    quiz10: 310,
  },
  {
    id: 8,
    email: "abc@gmail.com",
    firstname: "Agha",
    quiz1: 23,
    quiz2: 20,
    quiz3: 25,
    quiz4: 30,
    quiz5: 35,
    quiz6: 36,
    quiz7: 37,
    quiz8: 38,
    quiz9: 39,
    quiz10: 310,
  },
  {
    id: 9,
    email: "abc@gmail.com",
    firstname: "Hassan",
    quiz1: 23,
    quiz2: 20,
    quiz3: 25,
    quiz4: 30,
    quiz5: 35,
    quiz6: 36,
    quiz7: 37,
    quiz8: 38,
    quiz9: 39,
    quiz10: 310,
  },
  {
    id: 10,
    email: "abc@gmail.com",
    firstname: "Hassan",
    quiz1: 23,
    quiz2: 20,
    quiz3: 25,
    quiz4: 30,
    quiz5: 35,
    quiz6: 36,
    quiz7: 37,
  },
];

const Parent = () => {
  const navigate = useNavigate()
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isChildOpen, setIsChildOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState("");
  const API_URL = 'https://api-dashboard-brr3fliswa-uc.a.run.app'


  const [isTimeFrameOpen, setIsTimeFrameOpen] = useState(false);
  // const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const dropdownRef = useRef(null);
  // Calculate the averages
  const numColumns = Object.keys(data[0]).length - 2;

  // excluding the first two columns
  const averages = Array(numColumns).fill(0);
  data.forEach((student) => {
    for (let i = 2; i < numColumns + 2; i++) {
      averages[i - 2] += parseInt(student[`quiz${i - 1}`]);
    }
  });
  for (let i = 0; i < numColumns; i++) {
    averages[i] /= data.length;
  }

  const [schools, setSchools] = useState([])
  const [tableHeaders, setTableHeaders] = useState([])
  const [tableData, setTableData] = useState([])
  const [tableAverage, setTableAverage] = useState([])
  const [totalQuizCount, setTotalQuizCount] = useState(0)

  useEffect(() => {
    // caitlinhblack@gmail.com
    const email = localStorage.getItem('userEmail')
    fetch(API_URL + '/api/parent_dashboard', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email
      })
    })
      .then(response => response.json())
      .then(response => {
        if (!response.quizes.length) {
          return
        }

        setTableHeaders(Object.keys(response.quizes[0]))
        let avgArray = Array(Object.keys(response.quizes[0]).length).fill(0)
        setTableData(response.quizes)
        setSchools(response.quizes)
        setAverage(avgArray, Object.values(response.quizes))
      })
  }, [])

  const setAverage = (avgArr, dataSet) => {
    let _marksArr = []
    if (dataSet.length > 0) {
      dataSet.map((item) => {
        _marksArr.push(Object.values(item))
      })
    }

    _marksArr.map(item => {
      for(let i = 0; i< item.length; i++){
        avgArr[i] = avgArr[i] + (item[i] === null ? 0 : item[i])
      }
    })

    setTableAverage(avgArr)
    setTotalQuizCount(dataSet.length)

  }

  const handleChildSelect = (childName) => {
    setSelectedChild(childName);
    setIsChildOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsTimeFrameOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };


  let backGroundColor = {
    red: '#98485C',
    green: '#649345',
    yellow: '#A76C4F',
    blue: '#35705B',
    draft: 'white',
  }

  const checkMarksColor = (mark) => {
    if (mark == null)
      return backGroundColor['draft']
    else if (mark <= 40)
      return backGroundColor['red']
    else if (mark > 40 && mark <= 60)
      return backGroundColor['yellow']
    else if (mark > 60 && mark <= 85)
      return backGroundColor['green']
    else if (mark > 85)
      return backGroundColor['blue']

  }


  return (
    <div className="md:mx-20 my-6">
      {/* main bar starts */}
      <div className="sticky w-ful h-auto gap-4 md:h-[20vh] flex justify-between items-center flex-col md:flex-row ">
        {/* logo */}
        <Link
          className="text-white no-underline hover:text-white hover:no-underline"
          to="/"
        >
          <img
            className="rounded-lg lg:w-52 h-auto mx-auto mb-2"
            src="https://static.wixstatic.com/media/6caf63_a83a2388007e4bec8f789dfe7818db84~mv2.jpg/v1/crop/x_0,y_53,w_1000,h_395/fill/w_230,h_91,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/CUSTOM%20-%20Rectangle%20(22).jpg"
            alt="Logo"
          />
        </Link>
        {/* name */}
        <h2 className="font-bold visible lg:text-4xl sm:text-xl md:text-2xl text-[#17026b] sm:my-6 cursor-pointer hidden md:block">
          Parent Name
        </h2>

        {/* username dropdown */}
        <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400]">
          <li className="mr-3">
            <div className="inline-block relative">
              <button
                onClick={() => setIsUserOpen(!isUserOpen)}
                className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg "
              >
                User
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="white"
                  className="inline w-4 h-4 ml-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 7a1 1 0 011.707-.707l3.586 3.586 3.586-3.586A1 1 0 1115 7l-4 4a1 1 0 01-1.414 0l-4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isUserOpen && (
                <ul className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-slate-800 shadow-md">
                  <li className="border-b border-slate-400">
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                    >
                      Settings
                    </Link>
                  </li>
                  {/* <li className="border-b border-slate-400"> */}
                  <li>
                    <a
                      href="/"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                      onClick={(e) => {
                        e.preventDefault()
                        navigate('/')
                        localStorage.clear()
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </li>
        </ul>
      </div>

      {/* main bar ends */}

      {/* ----------------------------------------------------------- */}
      {/* filter bar starts here */}

      <div className="w-full md:w-[50vw] h-[15vh] flex justify-start items-center gap-4 flex-row mt-5">
        {/* choose teacher dropdown */}
        <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
          <li className="mr-3">
            <div className="inline-block relative">
              <button
                onClick={() => setIsChildOpen(!isChildOpen)}
                className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg "
              >
                Time Interval
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="white"
                  className="inline w-4 h-4 ml-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 7a1 1 0 011.707-.707l3.586 3.586 3.586-3.586A1 1 0 1115 7l-4 4a1 1 0 01-1.414 0l-4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isChildOpen && (
                <ul className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-slate-800 shadow-md">
                  {/* {ChildNames.map((childName, index) => {
                    return (
                      <>
                        <li
                          className={
                            index !== childName.length - 1
                              ? "border-b border-slate-400 cursor-pointer"
                              : "cursor-pointer"

                          }
                          key={index}
                          onClick={() => handleChildSelect(childName)}
                        >
                          <span
                            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                          >
                            {childName}
                          </span>
                        </li>
                      </>
                    );
                  })} */}
                  {['52 weeks data', 'All data since September'].map((childName, index) => {
                    return (
                      <>
                        <li
                          className={
                            index !== childName.length - 1
                              ? "border-b border-slate-400 cursor-pointer"
                              : "cursor-pointer"

                          }
                          key={index}
                          // onClick={() => handleChildSelect(childName)}
                        >
                          <span
                            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                          >
                            {childName}
                          </span>
                        </li>
                      </>
                    );
                  })}
                </ul>
              )}
            </div>
          </li>
        </ul>
        {/* choose Time Frame dropdown */}
        {false && <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
          <li className="mr-3">
            <div className="inline-block relative" ref={dropdownRef}>
              <button
                onClick={() => setIsTimeFrameOpen(!isTimeFrameOpen)}
                className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg "
              >
                Choose Year
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="white"
                  className="inline w-4 h-4 ml-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 7a1 1 0 011.707-.707l3.586 3.586 3.586-3.586A1 1 0 1115 7l-4 4a1 1 0 01-1.414 0l-4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isTimeFrameOpen && (
                <ul className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-slate-800 shadow-md">
                  <li className="">
                    <input
                      type="date"
                      name="date-range"
                      id="to-date"
                      className="block w-full px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white focus:outline-none"
                      value={toDate}
                      onChange={handleToDateChange}
                    />
                  </li>
                  {/* <li>
                    <input
                      type="date"
                      name="date-range"
                      id="from-date"
                      className="block px-4 w-full py-2 text-gray-800 hover:bg-indigo-500 hover:text-white focus:outline-none"
                      value={fromDate}
                      onChange={handleFromDateChange}
                    />
                  </li> */}
                </ul>
              )}
            </div>
          </li>
        </ul>}
      </div>
      {/* filter bar ends here */}
      {/* ----------------------------------------------------------- */}

      {/* table starts here */}
      <div className="overflow-x-autoquiz5: 35,
quiz5: 35,
quiz5: 35,
quiz5: 35,
quiz5: 35,
quiz5: 35,
quiz5: 35,
quiz5: 35,
quiz5: 35,
quiz5: 35,
}</td> shadow-md sm:rounded-sm  lg:mx-auto sm:w-full mt-10">
        {Boolean(schools.length) && <div className="overflow-scroll" style={{ maxHeight: 'calc(100vh - 250px)' }}>
          <table className="w-full text-sm text-left table-fixed rounded-lg overflow-hidden shadow-sm shadow-slate-400">
            <thead className="text-xs text-white uppercase bg-[#17026b]">
              <tr className="items-center">
                <th
                  scope="col"
                  className="sticky left-0 z-10 px-6 py-3 bg-[#17026b] text-white w-96"
                >
                  Email
                </th>
                {

                  tableHeaders?.map((item) => (
                    <th
                      scope="col"
                      className="sticky left-0 z-10 px-6 py-3 bg-[#17026b] text-white w-40"
                    >
                      {item}
                    </th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {tableData.map((student) => (
                <tr class="bg-white border border-[#17026b]  dark:border-gray-700 hover:bg-[#17026b] hover:text-white dark:hover:bg-gray-600 rounded-lg overflow-hidden">
                  <td class="px-6 py-4">caitlinhblack@gmail.com</td>
                  {
                    Object.values(student).map((item) => (
                      <td class="px-6 py-4 text-white w-40" style={{ backgroundColor: checkMarksColor(item) }}>{item}</td>
                    ))
                  }
                </tr>
              ))}
              <tr class="bg-white border border-[#17026b]  dark:border-gray-700 rounded-lg overflow-hidden">
                <td class="sticky left-0 z-10 px-6 py-3 w-40 font-bold">Average</td>
                {/* <td class="sticky left-40 z-10 px-6 py-3 w-40"></td> */}
                {selectedChild === "" ? (
                  <>
                  {/* tableAverage */}
                    {/* {averages.map(
                      (average, index) =>
                        data.some((student) => student[`quiz${index + 1}`]) && (
                          <td class="px-6 py-4 text-center">
                            0.00
                          </td>
                        )
                    )} */}
                    {tableAverage.map((average, index) =>
                        // data.some((student) => student[`quiz${index + 1}`]) && (
                          <td class="px-6 py-4 text-center">
                            {(average/totalQuizCount).toFixed(2)}
                          </td>
                        // )
                    )}
                  </>
                ) : (
                  <>
                    {averages.map(
                      (average, index) =>
                        data.some((student) => student[`quiz${index + 1}`]) && (
                          <td class="px-6 py-4 text-center">
                            {average.toFixed(2)}
                          </td>
                        )
                    )}
                  </>
                )}
              </tr>
            </tbody>
          </table>
        </div>}
      </div>
      {/* table ends here */}
      {/* ----------------------------------------------------------- */}
    </div>
  );
};

export default Parent;