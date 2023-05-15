import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomLoader } from "../components/Loader";

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
const School = () => {

  const navigate = useNavigate()
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isChildOpen, setIsChildOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState("");
  const API_URL = 'https://api-dashboard-brr3fliswa-uc.a.run.app'

  const [isTimeFrameOpen, setIsTimeFrameOpen] = useState(false);
  // const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const dropdownRef = useRef(null);
  const dropdownRef1 = useRef(null);

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

  const [schoolName, setSchoolName] = useState()
  const [tableHeaders, setTableHeaders] = useState([])
  const [tableData, setTableData] = useState([])
  const [tableAverage, setTableAverage] = useState([])
  const [yearFilter, setYearFilter] = useState([])
  const [teacherFilter, setTeacherFilter] = useState([])
  const [users, setUsers] = useState([])
  const [totalQuizCount, setTotalQuizCount] = useState(0)
  const [selectedTeacher, setSelectedTeacher] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [dataLoadin, setDataLoadin] = useState(true)

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    try{fetch(API_URL + '/api/teacher_dashboard', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email
        // "email": "jbrogan5.208@lgflmail.org"
      })
    })
      .then(response => response.json())
      .then(response => {
        setDataLoadin(false)
        setTableHeaders(response?.quizes?.headers)
        setTableData(response?.quizes?.users)
        let avgArray = Array(response?.quizes?.headers.length).fill(0)

        setUsers(response?.quizes?.users)
        setFilter(response?.quizes?.users)
        setAverage(avgArray, response?.quizes?.users)

        if (response?.quizes?.users != null) {
          setSchoolNama(Object.values(response?.quizes?.users)[0]?.attributes_properties)
        }
      })}catch(e){
        setDataLoadin(false)
      }

  }, [])

  const setFilter = (dataSet) => {
    let _yesrFilter = []
    let _teacherFilter = []

    Object.values(dataSet).map(item => {
      _yesrFilter.push(item.year_name)
      _teacherFilter.push(item.email_address)
    })

    setYearFilter([...new Set(_yesrFilter)])
    setTeacherFilter([...new Set(_teacherFilter)])
  }

  const setAverage = (avgArr, dataSet) => {
    if (dataSet != null) {
      let _totalQuizCount = 0
      Object.values(dataSet).map(item => {

        _totalQuizCount++
        for (let i = 0; i < item.quizes.length; i++) {
          avgArr[i] = avgArr[i] + (item.quizes[i] === "" ? 0 : item.quizes[i])
        }
      })
      setTableAverage(avgArr)
      setTotalQuizCount(_totalQuizCount)
    }
  }

  const handleTeacherSelect = (childName) => {
    setSelectedTeacher(childName)
    let _filterObj = {}
    Object.keys(users).forEach((key) => {
      if(selectedTeacher != ''){
        if (users[key]?.email_address === childName && users[key]?.year_name === selectedYear ) {
          _filterObj = { ..._filterObj, [`${key}`]: users[key] }
        }
      }else{
        if (users[key]?.email_address === childName) {
          _filterObj = { ..._filterObj, [`${key}`]: users[key] }
        }
      }
      
    });

    let avgArray = Array(tableHeaders.length).fill(0)
    // setAverage(avgArray, _filterObj)
    setTableData(_filterObj)
  }

  const handleYearSelect = (childName) => {
    setSelectedYear(childName)
    let _filterObj = {}
    Object.keys(users).forEach((key) => {
      if(selectedTeacher != ''){
        if (users[key]?.year_name === childName && users[key]?.email_address === selectedTeacher) {
          _filterObj = { ..._filterObj, [`${key}`]: users[key] }
        }
      }  
      else{
        if (users[key]?.year_name === childName ) {
          _filterObj = { ..._filterObj, [`${key}`]: users[key] }
        }
      }    
    });

    let avgArray = Array(tableHeaders.length).fill(0)
    // setAverage(avgArray, _filterObj)
    setTableData(_filterObj)
  }

  const handleChildSelect = (childName) => {
    setSelectedChild(childName);
    setIsChildOpen(false);
  };

  const setSchoolNama = (val) => {
    let name = val.split(',')[2].substring(17)
    name = name.slice(0, -1)
    setSchoolName(name)
  }

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
        setIsChildOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef1]);
  

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };
  let backGroundColor = {
    red: '#f44236',
    green: '#7ec883',
    yellow: '#ffb101',
    blue: '#63b5f4',
    draft: 'white',

  }
  const checkMarksColor = (mark) => {
    if (mark == '')
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
      {dataLoadin && <CustomLoader />}

      {/* main bar starts */}
      <div className="sticky w-ful h-auto gap-4 flex justify-between items-center flex-col md:flex-row ">
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
          {schoolName}
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
                  {/* <li className="border-b border-slate-400">
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                    >
                      Settings
                    </Link>
                  </li> */}
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

      <div className="w-full flex justify-start items-center gap-4 flex-row mt-5">
        {/* choose teacher dropdown */}
        <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
            <li className="mr-3">
              <div className="inline-block relative" ref={dropdownRef1}>
                <button
                  onClick={() => setIsChildOpen(!isChildOpen)}
                  className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg "
                >
                  {selectedTeacher ? selectedTeacher : "Choose Teacher"}
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
                  <ul className="absolute right-0 mt-2 py-2 w-64 bg-white rounded-lg shadow-slate-800 shadow-md">
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
                    {teacherFilter.map((childName, index) => {
                      return (
                        <>
                          <li
                            className={
                              index !== childName.length - 1
                                ? "border-b border-slate-400 cursor-pointer"
                                : "cursor-pointer"

                            }
                            key={index}
                            onClick={() => {
                              setIsChildOpen(!isChildOpen)
                              handleTeacherSelect(childName)}}
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
        <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
          <li className="mr-3">
            <div className="inline-block relative" ref={dropdownRef}>
              <button
                onClick={() => setIsTimeFrameOpen(!isTimeFrameOpen)}
                className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg "
              >
                {selectedYear ? selectedYear : "Choose Year"}
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
              {
                isTimeFrameOpen &&
                (
                  <ul className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-slate-800 shadow-md">
                    {yearFilter.map((childName, index) => {
                      return (
                        <>
                          <li
                            className={
                              index !== childName.length - 1
                                ? "border-b border-slate-400 cursor-pointer"
                                : "cursor-pointer"

                            }
                            key={index}
                            onClick={() => {
                              setIsTimeFrameOpen(!isTimeFrameOpen)
                              handleYearSelect(childName)
                            }}
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
                    {/* <li className="">
                    <input
                      type="date"
                      name="date-range"
                      id="to-date"
                      className="block w-full px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white focus:outline-none"
                      value={toDate}
                      onChange={handleToDateChange}
                    />
                  </li>
                  <li>
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
        </ul>

        {/* <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
            <li className="mr-3">
              <div className="inline-block relative">
                <button
                  onClick={() => setTableData(users)}
                  className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg "
                >
                  Reset Filter
                </button>
              </div>
            </li>
        </ul> */}
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
        {Boolean(tableHeaders.length) && true && <div className="overflow-scroll" style={{ maxHeight: 'calc(100vh - 250px)' }}>
          <table className="w-full text-sm text-left table-fixed rounded-lg shadow-sm shadow-slate-400 column-2-sticky">
            <thead className="text-xs text-white uppercase bg-[#17026b]">
              <tr className="items-center">
                <th
                  scope="col"
                  className="z-10 px-6 py-3 bg-[#17026b] text-white w-40"
                >
                  User Name
                </th>
                <th
                  scope="col"
                  className="z-10 px-6 py-3 bg-[#17026b] text-white w-96"
                >
                  Email
                </th>
                {

                  tableHeaders?.map((item) => (
                    <th
                      scope="col"
                      className="px-6 py-3 bg-[#17026b] text-white w-40"
                    >
                      {item}
                    </th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {Object.values(tableData).map((student) => (
                <tr class="bg-white border border-[#17026b]  dark:border-gray-700 hover:bg-[#17026b] hover:text-white dark:hover:bg-gray-600 rounded-lg overflow-hidden">
                  <td class="px-6 py-4">{student?.user_name}</td>
                  <td class="px-6 py-4">{student?.email_address}</td>
                  {
                    Object.values(student?.quizes).map((item) => (
                      <td class="px-6 py-4 text-white w-40" style={{ backgroundColor: checkMarksColor(item) }}>{item}</td>
                    ))
                  }
                </tr>
              ))}
              <tr class="bg-white border border-[#17026b]  dark:border-gray-700 rounded-lg overflow-hidden">
                <td class="sticky left-0 z-10 px-6 py-3 w-40 font-bold">Average</td>
                <td class="sticky left-40 z-10 px-6 py-3 w-40"></td>
                {selectedChild === "" ? (
                  <>
                    {tableAverage?.map((average) => (
                      <td class="px-6 py-4 text-center">
                        {(average / totalQuizCount).toFixed(2)}
                      </td>
                    )
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

export default School;
