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
  const dropdownRef2 = useRef(null);

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
  const [tableHeadersAll, setTableHeadersAll] = useState([])
  const [tableHeaders, setTableHeaders] = useState([])
  const [tableData, setTableData] = useState([])
  const [tableAverage, setTableAverage] = useState([])
  const [yearFilter, setYearFilter] = useState([])
  const [users, setUsers] = useState([])
  const [quizesData, setQuizesData] = useState([])
  const [totalQuizCount, setTotalQuizCount] = useState(0)
  const [selectedDuraation, setSelectedDuraation] = useState('Since Last 52 Weeks')
  const [selectedYear, setSelectedYear] = useState('')
  const [dataLoadin, setDataLoadin] = useState(true)
  const [schools, setSchools] = useState([])
  const [quizesAverages, setQuizesAverages] = useState()
  const durationOption = ['Since Last 52 Weeks', 'Since Last September']

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    try {
      const token = localStorage.getItem('token')
      fetch(API_URL + '/api/all_quiz_averages', {
        method: 'POST',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : null
        }
      })
        .then(response => response.json())
        .then(response => {
          setQuizesAverages(response.quizes.averages)
        })
    } catch (e) {
      setDataLoadin(false)
    }

  }, [])

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    try {
      const token = localStorage.getItem('token')
      fetch(API_URL + '/api/parent_dashboard', {
        method: 'POST',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : null
        },
        body: JSON.stringify({
          email
        })
      })
        .then(response => response.json())
        .then(response => {
          setDataLoadin(false)
          const quizes = response?.quizes || [[]]
          setQuizesData(quizes)
          quizes.map(x => 
            {if(x.year_name === 'Multip'){
             console.log('therer====>',x) 
            }})
          const yearsFilters = quizes.map(x => x.year_name)
          const uniqueYearsFilters = [...new Set(yearsFilters)].sort()
          setYearFilter(uniqueYearsFilters)

          let filterData = quizes?.map(({ quiz_name, year_name }, index) => {
            return {
              year_name,
              quiz_name,
              index,
              week: getWeekNumber(quiz_name)
            }
          })
          setTableHeadersAll(filterData)
          applyFilter(selectedDuraation, uniqueYearsFilters[0], filterData, quizes)



          return

          // let { headers, users } = response?.quizes || [[], {}]

          // setTableHeadersAll(headers)
          // setTableData(users)
          // let avgArray = Array(headers.length).fill(0)

          // setUsers(users)
          // setFilter(users, headers)
          // setAverage(avgArray, users)

          //////////////////////////////////////////

          // setTableHeaders(response?.quizes?.headers)
          // setTableData(response?.quizes?.users)
          // let avgArray = Array(response?.quizes?.headers.length).fill(0)

          // setUsers(response?.quizes?.users)
          // setFilter(response?.quizes?.users)
          // setAverage(avgArray, response?.quizes?.users)

          // setTableHeaders(Object.keys(response.quizes[0]))
          // let avgArray = Array(Object.keys(response.quizes[0]).length).fill(0)
          // setTableData(response.quizes)
          // setSchools(response.quizes)
          // setAverage(avgArray, Object.values(response.quizes))
        })
    } catch (e) {
      setDataLoadin(false)
    }

  }, [])

  const handleYearSelect = (childName) => {
    applyFilter(selectedDuraation, childName, tableHeadersAll, quizesData)
  }

  const handleDurationSelect = (childName) => {
    applyFilter(childName, selectedYear, tableHeadersAll, quizesData)
  }

  const getWeekNumber = (quiz_name, i) => {
    let _inc = 0
    if (quiz_name.includes('Spring')) {
      _inc = 200
    } else if (quiz_name.includes('Autumn')) {
      _inc = 100
    } else if (quiz_name.includes('Summer')) {
      _inc = 300
    }

    // console.log('week ----->', 'Year 4 - Practice 1 (Summer Week 03'?.match(/WEEK (\d+)$/i)
    console.log('week::', quiz_name?.match(/WEEK (\d+)\./i))

    // // quiz_name?.match(/WEEK (\d+)$/i) ? quiz_name?.match(/WEEK (\d+)$/i) : []
    // )
    return quiz_name?.match(/WEEK (\d+)\./i) ? parseInt(quiz_name?.match(/WEEK (\d+)\./i)[1]) + _inc : []
  }

  const setFilter = (dataSet, headers) => {
    let _yesrFilter = []

    Object.values(dataSet).map(item => {
      _yesrFilter.push(item.year_name)
    })

    let _year = [...new Set(_yesrFilter)][0]

    applyFilter(selectedDuraation, _year, headers, dataSet)
    setTableHeadersAll(headers)
    setYearFilter([...new Set(_yesrFilter)].sort())

  }

  const applyFilter = (selectedDuraationParm, year, headers, data) => {

    setSelectedYear(year)
    setSelectedDuraation(selectedDuraationParm)

    let filterHeader = headers.filter(({ year_name }) => year_name === year)
    let sortedHeader = filterHeader.sort((a, b) => a.week - b.week)
    console.log('therer------>1Header', filterHeader)
    // sortedHeader = [new Set(sortedHeader)]
    const ids = sortedHeader.map(o => o.quiz_name)
    const filtered = filterHeader.filter(({ quiz_name }, index) => !ids.includes(quiz_name, index + 1))
    console.log('filtered---->', filtered)
    setTableHeaders(filtered)

    console.log('therer------>1', data)
    let filterDurationlData = data
    if(selectedDuraationParm === 'Since Last 52 Weeks'){
      filterDurationlData = data.filter(({ date_submitted }) => new Date(date_submitted) >= addMilliseconds(new Date(), -364 * 24 * 60 * 60 * 1000, date_submitted))  
    }
    let filterFinalData = filterDurationlData.filter(({ year_name }) => year_name == year)
   
    let usersObject = {}
    filterFinalData.map((item) => {
      if (usersObject[item?.user_name]) {
        usersObject[item?.user_name] = [...usersObject[item?.user_name], item]
      }
      else {
        usersObject[item?.user_name] = [item]
      }
    })
    setUsers(usersObject)
    console.log('therer------>2', usersObject)
    return

    setSelectedYear(year)

    let _filterObj = {}

    if (selectedDuraationParm === durationOption[0]) {
      Object.keys(data).forEach((key) => {
        if (new Date(data[key]?.date_submitted) >= addMilliseconds(new Date(), -364 * 24 * 60 * 60 * 1000, data[key]?.date_submitted)) {
          _filterObj = { ..._filterObj, [`${key}`]: data[key] }
        }
      });
    }
    else {
      _filterObj = { ...data }
    }

    let filterData = header?.map(({ quiz_name, year_name }, index) => {
      return {
        year_name,
        quiz_name,
        index,
        week: getWeekNumber(quiz_name)
      }
    })

    filterData = filterData.filter(({ year_name }) => year_name === year)
    let sorted = filterData.sort((a, b) => a.week - b.week)

    setTableData(_filterObj)
    setTableHeaders(sorted)

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

  // const setAverage = (avgArr, dataSet) => {
  //   let _marksArr = []
  //   if (dataSet.length > 0) {
  //     dataSet.map((item) => {
  //       _marksArr.push(Object.values(item))
  //     })
  //   }

  //   _marksArr.map(item => {
  //     for (let i = 0; i < item.length; i++) {
  //       avgArr[i] = avgArr[i] + (item[i] === null ? 0 : item[i])
  //     }
  //   })

  //   setTableAverage(avgArr)
  //   setTotalQuizCount(dataSet.length)

  // }

  const handleChildSelect = (childName) => {
    setSelectedChild(childName);
    setIsChildOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
        setIsChildOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef2]);

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

  const addMilliseconds = (date, milliseconds = 0, date_submitted) => {
    const result = new Date(date);
    result.setMilliseconds(result.getMilliseconds() + milliseconds);
    return result;
  };

  const getAverage = (item) => {
    let _avg = quizesAverages?.find(({ quiz_name }) => quiz_name === item)
    return _avg ? _avg.average_score.toFixed(2) : 0
  }

  const getMarks = (key, name) => {
    let obj = users[key]?.find(({ quiz_name }) => quiz_name == name)
    return obj ? obj.percentage_score : ''
  }

  return (
    <div className="md:mx-20 my-6">
      {dataLoadin && <CustomLoader />}
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
          Results Analysis
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

      <div className="w-full flex justify-start items-center gap-4 flex-row mt-10">
        {/* choose teacher dropdown */}
        <div className="grid gap-1">
          <label htmlFor="">Time interval</label>
          <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
            <li className="mr-3">
              <div className="inline-block relative" ref={dropdownRef2}>
                <button
                  onClick={() => setIsChildOpen(!isChildOpen)}
                  className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg "
                >
                  {selectedDuraation}
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
                    {durationOption.map((childName, index) => {
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
                              handleDurationSelect(childName)
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
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </div>
        {/* choose Time Frame dropdown */}
        {/* choose Time Frame dropdown */}
        <div className="grid gap-1">
          <label htmlFor="">Year</label>
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
        </div>
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
        {Boolean(tableHeaders?.length) && true && <div className="overflow-scroll" style={{ maxHeight: 'calc(100vh - 250px)' }}>
          <table className="w-full text-sm text-left table-fixed rounded-lg shadow-sm shadow-slate-400 column-1-sticky">
            <thead className="text-xs text-white uppercase bg-[#17026b]">
              <tr className="items-center">
                <th scope="col" className="px-6 py-3 bg-[#17026b] text-white w-96">Email</th>
                {tableHeaders?.map(({ quiz_name }) => (<th scope="col" className="px-6 py-3 bg-[#17026b] text-white w-40">{quiz_name}</th>))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(users).map((student) => (
                  <tr class="bg-white border border-[#17026b]  dark:border-gray-700 hover:bg-[#17026b] hover:text-white dark:hover:bg-gray-600 rounded-lg overflow-hidden">
                    <td class="px-6 py-4">{users[student][0]?.user_name}</td>
                    {tableHeaders?.map(({ quiz_name }) => (<td class="px-6 py-4 text-white w-8 text-center" style={{ backgroundColor: checkMarksColor(getMarks(student, quiz_name)) }}>{getMarks(student, quiz_name)}</td>))}
                  </tr>
                ))}
              <tr class="bg-white border border-[#17026b]  dark:border-gray-700 rounded-lg overflow-hidden">
                <td class="sticky left-0 z-10 px-6 py-3 w-40 font-bold">SMASH Maths Cohort Average</td>
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
                    {
                      tableHeaders?.filter(({ year_name }) => selectedYear == 'Selected All' ? true : year_name == selectedYear)?.map(({ quiz_name }) => (
                        <td class="px-6 py-4 text-center">
                          {getAverage(quiz_name)}
                        </td>
                      ))
                    }
                    {/* {tableAverage.map((average, index) =>
                      // data.some((student) => student[`quiz${index + 1}`]) && (
                      <td class="px-6 py-4 text-center">
                        {(average / totalQuizCount).toFixed(2)}
                      </td>
                      // )
                    )} */}
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