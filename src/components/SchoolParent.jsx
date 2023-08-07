import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomLoader } from "./Loader";

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
const SchoolParent = () => {
  const navigate = useNavigate()
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isChildOpen, setIsChildOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState("");
  const API_URL = 'https://api-dashboard-brr3fliswa-uc.a.run.app';
  const testURL = 'https://dev-api-dashboard-brr3fliswa-uc.a.run.app/api'

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
  const [tableHeadersAll, setTableHeadersAll] = useState([])
  const [tableHeaders, setTableHeaders] = useState([])
  const [tableData, setTableData] = useState([])
  const [tableAverage, setTableAverage] = useState([])
  const [yearFilter, setYearFilter] = useState([])
  const [teacherFilter, setTeacherFilter] = useState([])
  const [users, setUsers] = useState([])
  const [quizesData, setQuizesData] = useState([])
  const [totalQuizCount, setTotalQuizCount] = useState(0)
  const [selectedTeacher, setSelectedTeacher] = useState()
  const [selectedYear, setSelectedYear] = useState()
  const [dataLoadin, setDataLoadin] = useState(true)
  const [quizesAverages, setQuizesAverages] = useState()


  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    try {
      const token = localStorage.getItem('token')
      fetch(testURL + '/all_quiz_averages', {
        method: 'POST',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Authorization": token ? `${token}` : null
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
    // fetch(API_URL + '/api/parent_dashboard', {teacher_dashboard
    // "email": "jbrogan5.208@lgflmail.org"

    const token = localStorage.getItem('token')
    try {
      fetch(testURL + '/getteacherparent', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Authorization": token ? `${token}` : null
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
          const teacherFilters = quizes.map(x => x.email_address)
          let yearsFilters = quizes.map(x => x.year_name)
          yearsFilters = yearsFilters.filter(item => item.includes('Year'))
          yearsFilters.push("Other");
          const uniqueTeacherFilters = [...new Set(teacherFilters)]
          const uniqueYearsFilters = [...new Set(yearsFilters)].sort()

          setTeacherFilter(uniqueTeacherFilters)
          setYearFilter(uniqueYearsFilters)

          // console.log('bilal--->',"Year 4 - SP Autumn Term Week 14 - Christmas Practice 01"?.match(/WEEK (\d+)$/i)[1])
          let arr = "Year 4 - SP Autumn Term Week 14 - Christmas Practice 01".split(' ')
          // console.log('bilal--->', parseInt(arr[arr?.findIndex((item) => item.toLowerCase() == 'Week'.toLowerCase()) + 1]))


          let filterData = quizes?.map(({ quiz_name, year_name }, index) => {
            return {
              year_name,
              quiz_name,
              index,
              week: getWeekNumber(quiz_name)
            }
          })

          setTableHeadersAll(filterData)
          applyFilter(uniqueTeacherFilters[0], uniqueYearsFilters[0], filterData, quizes)
          if (quizes != null) { setSchoolNama(Object.values(quizes)[0]?.school_name_small) }
          return

          // let { headers, users } = response?.quizes || [[], {}]
          // setTableHeadersAll(headers)
          // setTableData(users)
          // let avgArray = Array(headers.length).fill(0)

          // setUsers(users)
          // setFilter(users, headers)
          // setAverage(avgArray, users)
          if (users != null) { setSchoolNama(Object.values(users)[0]?.school_name_small) }

        })
    } catch (e) {
      setDataLoadin(false)
    }
  }, [])

  const getWeekNumber = (quiz_name, i) => {
    let _inc = 0
    if (quiz_name?.includes('Spring')) {
      _inc = 200
    } else if (quiz_name?.includes('Autumn')) {
      _inc = 100
    } else if (quiz_name?.includes('Summer')) {
      _inc = 300
    }

    let arr = quiz_name.split(' ')
    return arr.length ? parseInt(arr[arr?.findIndex((item) => item.toLowerCase() == 'Week'.toLowerCase()) + 1]) + _inc : []
  }

  const setFilter = (dataSet, headers) => {
    let _yesrFilter = []
    let _teacherFilter = []

    Object.values(dataSet).map(item => {
      _yesrFilter.push(item.year_name)
      _teacherFilter.push(item.email_address)
    })

    let _email = [...new Set(_teacherFilter)][0]
    let _year = [...new Set(_yesrFilter)][0]

    applyFilter(_email, _year, headers, dataSet)
    setTableHeadersAll(headers)
    setYearFilter([...new Set(_yesrFilter)].sort())
    setTeacherFilter([...new Set(_teacherFilter)])
  }

  const applyFilter = (email, year, headers, data) => {
    setSelectedYear(year)
    setSelectedTeacher(email)
    let filterHeader;
    if(year != "Other"){
      filterHeader = headers.filter(({ year_name }) => year_name === year)
    }
    else{
      filterHeader = headers.filter(item => !(item.year_name && item.year_name.includes('Year')))
    }
    let sortedHeader = filterHeader.sort((a, b) =>  b.week - a.week)
    // console.log('therer------>1Header', filterHeader)
    // sortedHeader = [new Set(sortedHeader)]
    const ids = sortedHeader.map(o => o.quiz_name)
    const filtered = filterHeader.filter(({ quiz_name }, index) => !ids.includes(quiz_name, index + 1))
    // console.log('therer------>2', filtered)
    setTableHeaders(filtered)

    let filterEmailData = data.filter(({ email_address }) => email_address == email)
    let filterFinalData;
    if(year != "Other"){
      filterFinalData = filterEmailData.filter(({ year_name }) => year_name == year)
    }
    else{
      filterFinalData = filterEmailData.filter(item => !(item.year_name && item.year_name.includes('Year')))
    }
    // console.log('therer------>1', filterFinalData)
    let usersObject = {}
    filterFinalData.map((item) => {
      // console.log('therer------>2', usersObject)
      if (usersObject[item?.user_name]) {
        usersObject[item?.user_name] = [...usersObject[item?.user_name], item]
      }
      else {
        usersObject[item?.user_name] = [item]
      }
    })

    const ordered = Object.keys(usersObject).sort().reduce(
      (obj, key) => {
        obj[key] = usersObject[key];
        return obj;
      },
      {}
    );
    setUsers(ordered)
    // console.log('therer------>2', usersObject)
    // console.log('therer------>2', usersObject)
    return

    // let filterData = header?.map(({ quiz_name, year_name }, index) => {
    //   return {
    //     year_name,
    //     quiz_name,
    //     index,
    //     week: getWeekNumber(quiz_name)
    //   }
    // })

    // filterData = filterData.filter(({ year_name }) => year_name === year)
    // let sorted = filterData.sort((a, b) => a.week - b.week)

    // setTableData(_filterObj)
    // setTableHeaders(sorted)

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

  const handleYearSelect = (childName) => {
    applyFilter(selectedTeacher, childName, tableHeadersAll, quizesData)
  }

  const handleTeacherSelect = (childName) => {
    applyFilter(childName, selectedYear, tableHeadersAll, quizesData)
  }

  const handleChildSelect = (childName) => {
    setSelectedChild(childName);
    setIsChildOpen(false); summer
  };

  const setSchoolNama = (val) => {
    // let name = val.split(',')[2].substring(17)
    // name = name.slice(0, -1)
    setSchoolName(val)
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


  const getAverage = (item) => {
    let _avg = quizesAverages?.find(({ quiz_name }) => quiz_name === item)
    return _avg ? _avg.average_score.toFixed(2) : 0
  }
  const getClassAverage = (quiz) => {
    console.log(`Quizzzz `,quiz);
    // const filterQuizeTeacherYear = quizesData.filter((record) => record.email_address == selectedTeacher  && record.year_name == selectedYear && record.quiz_name === quiz );
    let filterQuizeTeacherYear;
    if(selectedYear != "Other"){
      filterQuizeTeacherYear = quizesData.filter((record) => record.email_address == selectedTeacher  && record.year_name == selectedYear && record.quiz_name == quiz && record.percentage_score > 0);
    }
    else{
      filterQuizeTeacherYear = quizesData.filter((record) => record.email_address == selectedTeacher  && !record.year_name.includes('Year')  && record.quiz_name == quiz && record.percentage_score > 0);
    }
    // console.log(`Selected Year ` ,quiz,filterQuizeTeacherYear);
    // Filter Object with unique user_name and quiz_name
    const uniqueObjectsById = filterQuizeTeacherYear.reduce((acc, obj) => {
      if (!acc[obj.user_name]) {
        acc[obj.user_name] = obj;
      }
      return acc;
    }, {});
    const filteredData = Object.values(uniqueObjectsById);
    const sumOfAllQuizes = filteredData.reduce((acc, item) => acc + item['percentage_score'], 0)
    // console.log(quiz, filterQuizeTeacherYear);
    return filterQuizeTeacherYear.length === 0 ? '-' :(sumOfAllQuizes / filteredData.length).toFixed(2);
  }

  const getMarks = (key, name) => {
    let obj = users[key]?.find(({ quiz_name }) => quiz_name == name)
    return obj ? obj.percentage_score : ''
  }

  const getStudentaverage = (student) =>{
    let filterQuizeTeacherYear;
    if(selectedYear != "Other"){
      filterQuizeTeacherYear = quizesData.filter((record) => record.email_address == selectedTeacher  && record.year_name == selectedYear && record.user_name == student && record.percentage_score > 0);
    }
    else{
      filterQuizeTeacherYear = quizesData.filter((record) => record.email_address == selectedTeacher  && !record.year_name.includes('Year')  && record.user_name == student && record.percentage_score > 0);
    }
    // Filter Object with unique user_name and quiz_name
    const uniqueObjectsById = filterQuizeTeacherYear.reduce((acc, obj) => {
      const key = `${obj.user_name}-${obj.quiz_name}`;
      if (!acc[key]) {
        acc[key] = obj;
      }
      return acc;
    }, {});
    const filteredData = Object.values(uniqueObjectsById);
    const sumOfAllQuizes = filteredData.reduce((acc, item) => acc + item['percentage_score'], 0)
    return filterQuizeTeacherYear.length === 0 ? '-' :(sumOfAllQuizes / filteredData.length).toFixed(2);
  }
  
  const UpdateFullName = (e, user_name, email_address) =>{
    const full_name = e.target.value;
    const email = localStorage.getItem('userEmail')
    try {
      const token = localStorage.getItem('token')
      fetch(testURL + '/updateuser', {
        method: 'PUT',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Authorization": token ? `${token}` : null
        },
        body: JSON.stringify({
          full_name,
          user_name,
          email_address
        })
      })
        .then(response => response.json())
        .then(response => {
          setQuizesAverages(response.quizes.averages)
        })
    } catch (e) {
      setDataLoadin(false)
    }
  }

  const ToParentsDashboard = () =>{
    navigate('/school-dashboard')
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

      <div className="w-full flex justify-start items-center gap-4 flex-row mt-10">
        {/* choose teacher dropdown */}
        <div className="grid gap-1">
          <label htmlFor="">Teacher</label>
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
                  <ul className="absolute right--0 mt-2 py-2 w-74 bg-white rounded-lg shadow-slate-800 shadow-md">
                    {teacherFilter?.map((childName, index) => {
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
                              handleTeacherSelect(childName)
                            }}
                          >
                            <span
                              className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
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
        <div className="grid gap-1">
          <label htmlFor="">Year</label>
          <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
            <li className="mr-3">
              <div className="inline-block relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsTimeFrameOpen(!isTimeFrameOpen)}
                  className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg ">

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
                      {yearFilter?.map((childName, index) => {
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

              {/* Button  */}
        <div className="grid gap-1 float-right">
          <label htmlFor="">Go-To</label>
          <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
            <li className="mr-3">
              <div className="inline-block relative" >
                <button
                  onClick = {ToParentsDashboard}
                  className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg ">
                  School Dashboard
                </button>
              </div>
            </li>
          </ul>
        </div>

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
}</td> shadow-md sm:rounded-sm  lg:mx-auto sm:w-full mt-5">

        {
          Boolean(tableHeaders?.length) && true && <div className="overflow-scroll" style={{ maxHeight: 'calc(100vh - 250px)' }}>
            <table className="w-full text-sm text-left table-fixed rounded-lg shadow-sm shadow-slate-400 column-2-sticky">
              <thead className="text-xs text-white uppercase bg-[#17026b]">
                <tr className="items-center">
                  <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-40">User Name</th>
                  <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-96">Student Name</th>
                  <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-96">Email</th>
                  <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-96">Student Avg</th>
                  {tableHeaders?.map(({ quiz_name }) => (<th scope="col" className="p-3 bg-[#17026b] text-white w-40"> {quiz_name}</th>))}
                </tr>
              </thead>
              <tbody>
                {/* SMASH Maths Cohort  */}
                <tr className="bg-white border border-[#17026b]  dark:border-gray-700 rounded-lg overflow-hidden">
                  <td className="sticky left-0 z-10 px-6 py-3 w-40 font-bold"></td>
                  <td className="sticky left-40 z-10 px-6 py-3 w-40 font-bold">SMASH Maths Cohort Average</td>
                  <td className="sticky left-0 z-10 px-6 py-3 w-40 font-bold"></td>
                  <td className="sticky left-0 z-10 px-6 py-3 w-40 font-bold"></td>
                  {selectedChild === "" ? (
                    <>
                      {
                        tableHeaders?.filter(({ year_name }) => selectedYear == 'Other' ? true : year_name == selectedYear)?.map(({ quiz_name }) => (
                          <td className="p-3 text-center">
                            {getAverage(quiz_name)}
                          </td>
                        ))
                      }
                      {/* {tableAverage?.map((average) => (
                      <td class="p-3 text-center">
                        {(average / totalQuizCount).toFixed(2)}
                      </td>
                    )
                    )} */}
                    </>
                  ) : (
                    <>
                      {averages.map(
                        (average, index) =>
                          data.some((student) => student[`quiz${index + 1}`]) && (
                            <td className="p-3 text-center">
                              {average.toFixed(2)}
                            </td>
                          )
                      )}
                    </>
                  )}
                </tr>

                {/* SMASH Maths Class Avarage  */}
                <tr className="bg-white border border-[#17026b]  dark:border-gray-700 rounded-lg overflow-hidden">
                  <td className="sticky left-0 z-10 px-6 py-3 w-40 font-bold"></td>
                  <td className="sticky left-40 z-10 px-6 py-3 w-40 font-bold">SMASH Maths Class Average</td>
                  <td className="sticky left-0 z-10 px-6 py-3 w-40 font-bold"></td>
                  <td className="sticky left-0 z-10 px-6 py-3 w-40 font-bold"></td>
                  {selectedChild === "" ? (
                    <>
                      {
                        tableHeaders?.filter(({ year_name }) => selectedYear == 'Other' ? true : year_name == selectedYear)?.map(({ quiz_name }) => (
                          <td className="p-3 text-center">
                            {getClassAverage(quiz_name)}
                          </td>
                        ))
                      }
                      {/* {tableAverage?.map((average) => (
                      <td class="p-3 text-center">
                        {(average / totalQuizCount).toFixed(2)}
                      </td>
                    )
                    )} */}
                    </>
                  ) : (
                    <>
                      {averages.map(
                        (average, index) =>
                          data.some((student) => student[`quiz${index + 1}`]) && (
                            <td className="p-3 text-center">
                              {average.toFixed(2)}
                            </td>
                          )
                      )}
                    </>
                  )}
                </tr>
                {Object.keys(users).map((student) => (
                  <tr className="bg-white border border-[#17026b]  dark:border-gray-700 hover:bg-[#17026b] hover:text-white dark:hover:bg-gray-600 rounded-lg overflow-hidden">
                    <td className="p-3">{users[student][0]?.user_name}</td>
                    <td className="p-3"><input defaultValue={users[student][0]?.full_name} className="h-8" placeholder="Enter name here" onBlur={(e) => UpdateFullName(e, users[student][0]?.user_name ,users[student][0]?.email_address)}/></td>
                    <td className="p-3">{users[student][0]?.email_address}</td>
                    <td className="p-3 w-40 font-bold">{getStudentaverage(users[student][0]?.user_name)}</td>
                    {tableHeaders?.map(({ quiz_name }) => (<td className="p-3 text-white w-40 text-center" style={{ backgroundColor: checkMarksColor(getMarks(student, quiz_name)) }}>{getMarks(student, quiz_name)}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>}
      </div>
      {/* table ends here */}
      {/* ----------------------------------------------------------- */}
    </div>
  );
};

export default SchoolParent;
