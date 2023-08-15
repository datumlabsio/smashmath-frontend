import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomLoader } from "../components/Loader";
import LineCharts from "./LineCharts";
import {datachartslinefromfile} from './lineChart'
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
const initialChartData = [
  { month: 'January', CohortAvg: 0, ClassAvg: 0, studentAvg: 0 },
  { month: 'February', CohortAvg: 0, ClassAvg: 0, studentAvg: 0 },
  { month: 'March', CohortAvg: 0, ClassAvg: 0, studentAvg: 0 },
  { month: 'April', CohortAvg: 0, ClassAvg: 0, studentAvg: 0 },
  { month: 'May', CohortAvg: 0, ClassAvg: 0, studentAvg: 0 },
  { month: 'June', CohortAvg: 0, ClassAvg: 0, studentAvg: 0 },
  { month: 'July', CohortAvg: 0, ClassAvg: 0, studentAvg: 0 },
  { month: 'August', CohortAvg: 0, ClassAvg: 0, studentAvg: 0 },
  { month: 'September', CohortAvg: 0, ClassAvg: 0, studentAvg: 0 },
  { month: 'October', CohortAvg: 0, ClassAvg: 0, studentAvg: 0 },
  { month: 'November', CohortAvg: 0, ClassAvg: 0, studentAvg: 0 },
  { month: 'December', CohortAvg: 0, ClassAvg: 0, studentAvg: 0 }
]

const School = () => {
  
  const ProductStatus = localStorage.getItem('Status')
  const navigate = useNavigate()
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isChildOpen, setIsChildOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState("");
  const API_URL = 'https://api-dashboard-brr3fliswa-uc.a.run.app';
  const testURL = 'https://dev-api-dashboard-brr3fliswa-uc.a.run.app/api'

  const [isTimeFrameOpen, setIsTimeFrameOpen] = useState(false);
  const [isChildOpen2, setIsChildOpen2] = useState(false);
  const [studentOpen, setStudentOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  // const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const dropdownRef = useRef(null);
  const dropdownRef1 = useRef(null);
  // For Chart dfilter drop down
  const dropdownRef2 = useRef(null);
  const dropdownRef3 = useRef(null);
  const dropdownRef4 = useRef(null);

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
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [selectedYear, setSelectedYear] = useState()
  const [dataLoadin, setDataLoadin] = useState(true)
  const [quizesAverages, setQuizesAverages] = useState()
  const [allUniqueUsers, setallUniqueUsers] = useState([])
  const [chartsData, setChartsData] = useState(datachartslinefromfile)
  const [filteredChartData, setFilteredChartData] = useState(initialChartData)
  const [chartTeacherList, setChartTeacherList] = useState([])
  const [selectedChartTeacher, setSelectedChartTeacher] = useState()
  const [chartStudentList, setChartStudentList] = useState([])
  const [chartSelectedStudent, setChartSelectedStudent] = useState()
  const [chartYearList, setChartYearList] = useState([])
  const [chartSelectedYear, setChartSelectedYear] = useState()



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
      fetch(testURL + '/getteacherdashboard', {
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
          // setDataLoadin(false)
          const quizes = response?.quizes || [[]]
          setQuizesData(quizes)
          const teacherFilters = quizes.map(x => x.email_address)
          let yearsFilters = quizes.map(x => x.year_name)
          const studentFilters = quizes.map(({date_submitted,user_name, email_address, percentage_score}) => ({date_submitted,user_name, email_address, percentage_score}))
          yearsFilters = yearsFilters.filter(item => item.includes('Year'))

          const uniqueTeacherFilters = [...new Set(teacherFilters)]
          const uniqueYearsFilters = [...new Set(yearsFilters)].sort()
          setYearFilter(uniqueYearsFilters)
          setTeacherFilter(uniqueTeacherFilters)
          setChartTeacherList(uniqueTeacherFilters)
          
          // Filter Unique Year for chart
          const uniqueYears = new Set();
          quizes.forEach(item => {
            const year = new Date(item.date_submitted).getFullYear();
            uniqueYears.add(year);
          });
          const sortedUniqueYears = Array.from(uniqueYears).sort((a, b) => a - b);
          setChartYearList(sortedUniqueYears);

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

  // useEffect(() => {
  //   const email = localStorage.getItem('userEmail')
  //   try {
      
  //     setDataLoadin(true)
  //     const token = localStorage.getItem('token')
  //     fetch(testURL + '/linechart', {
  //       method: 'GET',
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Content-Type": "application/json",
  //         "Authorization": token ? `${token}` : null
  //       }
  //     })
  //       .then(response => response.json())
  //       .then(response => {
  //         // Get list of years for dropdown in choose year
          
  //         const years = response?.data.map(item => item.name[1]);
  //         const minYear = years.reduce((min, current) => (current < min ? current : min), years[0]);
  //         const maxYear = years.reduce((max, current) => (current > max ? current : max), years[0]);
  //         const allIntegersYear = [];
  //         for (let i = parseInt(minYear, 10); i <= parseInt(maxYear, 10); i++) {
  //           if (!isNaN(i)) {
  //             allIntegersYear.push(i);
  //           }
  //         }
  //         setChartYearList(allIntegersYear);
  //         setChartsData(response?.data)
  //         setDataLoadin(false)
  //       })
  //       .then( response =>{
  //         setDataLoadin(false)
  //       }

  //       )
  //   } catch (e) {
  //     setDataLoadin(false)
  //   }

  //   // Test Data.json code
  //   // const years = chartsData.map(item => item.name[1]);
  //   //       const minYear = years.reduce((min, current) => (current < min ? current : min), years[0]);
  //   //       const maxYear = years.reduce((max, current) => (current > max ? current : max), years[0]);
  //   //       const allIntegersYear = [];
  //   //       for (let i = parseInt(minYear, 10); i <= parseInt(maxYear, 10); i++) {
  //   //         if (!isNaN(i)) {
  //   //           allIntegersYear.push(i);
  //   //         }
  //   //       }
  //   //       setChartYearList(allIntegersYear);

  // }, [])

  // Get User's Data from DB
  useEffect(() => {
    setDataLoadin(true)
    try {
      const token = localStorage.getItem('token')
      const email = selectedTeacher;
      fetch(testURL + '/user', {
        method: 'POST',
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
          setallUniqueUsers(response.data)
          setDataLoadin(false)
        })
    } catch (e) {
      setDataLoadin(false)
    }
  }, [selectedTeacher])

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

    let filterHeader = headers.filter(({ year_name }) => year_name === year)
    let sortedHeader = filterHeader.sort((a, b) =>  b.week - a.week)
    // console.log('therer------>1Header', filterHeader)
    // sortedHeader = [new Set(sortedHeader)]
    const ids = sortedHeader.map(o => o.quiz_name)
    const filtered = filterHeader.filter(({ quiz_name }, index) => !ids.includes(quiz_name, index + 1))
    // console.log('therer------>2', filtered)
    setTableHeaders(filtered)

    let filterEmailData = data.filter(({ email_address }) => email_address == email)
    // console.log(`teacher Data in Quiz Dashboard`, filterEmailData);
    let filterFinalData = filterEmailData.filter(({ year_name }) => year_name == year)
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
    setIsChildOpen(false);
  };

  const setSchoolNama = (val) => {
    // let name = val.split(',')[2].substring(17)
    // name = name.slice(0, -1)
    setSchoolName(val)
  }

  const handleChartTeacherSelect = (childName) => {
    setSelectedChartTeacher(childName)
    const teacherFilters = quizesData.filter(x => x.email_address === childName)
    const students = teacherFilters.map(x => x.user_name).sort();
    const uniqueStudents =  [...new Set(students)]
    setChartStudentList(uniqueStudents);
    filterChartaData ( chartSelectedYear, childName, chartSelectedStudent)
  }

  const handleChartStudentSelect = (childName) => {
    setChartSelectedStudent(childName)
    filterChartaData ( chartSelectedYear, selectedChartTeacher, childName)
  }

  const handleChartYearSelect = (childName) => {
    setChartSelectedYear(childName)
    filterChartaData ( childName, selectedChartTeacher, chartSelectedStudent)
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
        setIsChildOpen2(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef2]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef3.current && !dropdownRef3.current.contains(event.target)) {
        setStudentOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef3]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef4.current && !dropdownRef4.current.contains(event.target)) {
        setYearOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef4]);

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
    const filterQuizeTeacherYear = quizesData.filter((record) => record.email_address == selectedTeacher  && record.year_name == selectedYear && record.quiz_name === quiz);
    // Filter Object with unique user_name and quiz_name
    const uniqueObjectsById = filterQuizeTeacherYear.reduce((acc, obj) => {
      const key = `${obj.user_name}-${obj.quiz_name}`;
      if (!acc[key]) {
        acc[key] = obj;
      }
      // if (!acc[obj.user_name]) {
      //   acc[obj.user_name] = obj;
      // }
      return acc;
    }, {});
    let filteredData = Object.values(uniqueObjectsById);
    filteredData = filteredData.filter(item => item.percentage_score > 0)
    const sumOfAllQuizes = filteredData.reduce((acc, item) => acc + item['percentage_score'], 0)
    return filteredData?.length === 0 ? '-' :(sumOfAllQuizes / filteredData.length).toFixed(2);
  }

  const getMarks = (key, name) => {
    let obj = users[key]?.find(({ quiz_name }) => quiz_name == name)
    // if(name == 'Year 6 - SP 2023 Summer Term Week 02') console.log(`Why Not Display`, obj)
    return obj ? obj.percentage_score : ''
  }

  const getStudentaverage = (student) =>{
    const filterQuizeTeacherYear = quizesData.filter((record) => record.email_address == selectedTeacher  && record.year_name == selectedYear && record.user_name == student && record.percentage_score > 0 );
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
    return filteredData?.length === 0 ? '-' :(sumOfAllQuizes / filteredData.length).toFixed(2);
  }

  const getStudentEffort = (student) =>{
    const studentData = quizesData.filter(item => item.user_name === student && item.year_name === selectedYear && item.percentage_score > 0);
    if(studentData.length === 0) return '-';
    // Calculate the effort score for the student user_name
    const totalQuizzes = studentData.length;
    let completedQuizzes = studentData.filter(item => item.status === 'submitted').length;
    // completedQuizzes = completedQuizzes.filter(item => item.percentage_score > 0)
    const effortScore = (completedQuizzes / totalQuizzes) * 100;
    return effortScore === 0 ? '-' : effortScore.toFixed(2);
  }

  const UpdateFullName = (e, username ) =>{
    const full_name = e.target.value;
    const found = allUniqueUsers.filter(item => item.user_name === username);
    const id = found[0].id;
    const email = localStorage.getItem('userEmail')
    
    // for (let i = 0; i < allUniqueUsers.length; i++) {
    //   if (array[i].id === id) {
    //     array[i].full_name = full_name;
    //     break;  // Assuming you only want to update the first occurrence with id
    //   }
    // }
    
    // let temp = [...allUniqueUsers];
    // for (let user of temp) {
    //   if (user.id === id) {
    //     console.log(user)
    //     user.full_name = full_name;
    //     console.log(user)
    //     break;
    //   }
    // }

    const updatedData = allUniqueUsers.map(user => {
      if (user.id === id) {
        const modified =  { ...user, full_name: full_name }
        return modified;
      }
      return user;
    });
    setallUniqueUsers(updatedData);
  }

  const UpdateFullNameDB = (e, username ) =>{
    const full_name = e.target.value;
    const found = allUniqueUsers.filter(item => item.user_name === username);
    const id = found[0].id;
    const email = localStorage.getItem('userEmail')
    
    // for (let i = 0; i < allUniqueUsers.length; i++) {
    //   if (array[i].id === id) {
    //     array[i].full_name = full_name;
    //     break;  // Assuming you only want to update the first occurrence with id
    //   }
    // }
    
    // let temp = [...allUniqueUsers];
    // for (let user of temp) {
    //   if (user.id === id) {
    //     console.log(user)
    //     user.full_name = full_name;
    //     console.log(user)
    //     break;
    //   }
    // }
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
          id,
        })
      })
        .then(response => {
          // window.location.reload();
          const updatedData = allUniqueUsers.map(user => {
            if (user.id === id) {
              const modified =  { ...user, full_name: full_name }
              return modified;
            }
            return user;
          });
          setallUniqueUsers(updatedData);
        })
    } catch (e) {
      setDataLoadin(false)
    }
  }

  const ToParentsDashboard = () =>{
    navigate('/extra-dashboard');
  }

  const filterChartaData = ( year, teacher, student = "NotSelected") => {
    // const filteredByYear = chartsData.filter(item => item.name[1] === year);
    // const CohortAvg = DataToArrayOfMonths(filteredByYear);
    // const filteredByClass = filteredByYear.filter(item => item.emailaddress === teacher);    
    // const ClassAvg = DataToArrayOfMonths(filteredByClass);
    // const filteredByStudent = filteredByYear.filter(item => item.username == student);    
    // const studentAvg = DataToArrayOfMonths(filteredByStudent);
    // const ToSingleObj = ConvertTosingleObj(CohortAvg, ClassAvg, studentAvg);
    // // console.log(filteredByClass)
    // console.log(`Final Data`, year, teacher, student,filteredByYear);
    // setFilteredChartData(ToSingleObj);


    // Test
    const data = [...quizesData];
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const modifiedArray = data?.map(item => {
      const [year, month] = item?.date_submitted.split('-');
      return {
        ...item,
        date_submitted: [parseInt(year), months[parseInt(month) - 1]]
      };
    });
    let filteredByYear = modifiedArray?.filter(item => item?.date_submitted[0] == year && item?.percentage_score > 0);
    const CohortAvg = DataToArrayOfMonths(filteredByYear);
    const filteredByClass = filteredByYear.filter(item => item.email_address === teacher);
    // Get Only First Quiz from Same Quiz by User
    const uniqueObjectsByQuiz = filteredByClass.reduce((acc, obj) => {
      const key = `${obj.user_name}-${obj.quiz_name}`;
      if (!acc[key]) {
        acc[key] = obj;
      }
      return acc;
    }, {});   
    const filteredClassDataByOneQuiz = Object.values(uniqueObjectsByQuiz);
    const ClassAvg = DataToArrayOfMonths(filteredClassDataByOneQuiz);

    const filteredByStudent = filteredByYear.filter(item => item.user_name == student);
    // Get Only First Quiz from Same Quiz by User
    const uniqueObjectsById = filteredByStudent.reduce((acc, obj) => {
      const key = `${obj.user_name}-${obj.quiz_name}`;
      if (!acc[key]) {
        acc[key] = obj;
      }
      return acc;
    }, {});
    const filteredStudentDataByOneQuiz = Object.values(uniqueObjectsById);
    const studentAvg = DataToArrayOfMonths(filteredStudentDataByOneQuiz);

    const ToSingleObj = ConvertTosingleObj(CohortAvg, ClassAvg, studentAvg);
    console.log(`Quzies` , filteredClassDataByOneQuiz )
    setFilteredChartData(ToSingleObj);
    
  }

  const DataToArrayOfMonths = (data) =>{
    // Create an object to store the data
    const monthsData = {};
    // Create an object to store the number of occurrences of each month
    const monthOccurrences = {};

    // Loop through the given data and store average scores for each month
    data.forEach(item => {
      const monthName = item?.date_submitted[1];
      const cohort = item.percentage_score;

      if (!monthsData[monthName]) {
        monthsData[monthName] = cohort;
        monthOccurrences[monthName] = 1;
      } else {
        monthsData[monthName] += cohort;
        monthOccurrences[monthName]++;
      }
    });

    // Loop through all the 12 months to calculate the average score for each month
    const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const newArray = allMonths.map(month => {
      const averageScore = monthsData[month] || 0;
      const occurrenceCount = monthOccurrences[month] || 0;
      return {
        name: month,
        cohort: occurrenceCount > 0 ? averageScore / occurrenceCount : 0
      };
    });

    // console.log(newArray);
    return newArray;
  }
  // Function to convert Different average to a single average
  const ConvertTosingleObj = (CohortAvg, ClassAvg, studentAvg) =>{
    const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const result = allMonths.map((month, index) => {
      return {
        month: month,
        CohortAvg: CohortAvg[index].cohort,
        ClassAvg: ClassAvg[index].cohort,
        studentAvg: studentAvg[index].cohort,
      }
    });
    return result;
  }

  const getFullName = (username) => {
    const found = allUniqueUsers.filter(item => item.user_name == username)
    return found[0]?.full_name
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
                {isTimeFrameOpen &&
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
        { (ProductStatus === "true") &&
          <div className="grid gap-1 float-right">
          <label htmlFor="">Go-To</label>
          <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
            <li className="mr-3">
              <div className="inline-block relative" >
                <button
                  onClick = {ToParentsDashboard}
                  className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg ">
                  Parent Dashboard
                </button>
              </div>
            </li>
          </ul>
          </div>
        }
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
                  {/* <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-96">Email</th> */}
                  <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-40">Student Avg</th>
                  <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-40">Effort Score</th>
                  {tableHeaders?.map(({ quiz_name }) => (<th scope="col" className="p-3 bg-[#17026b] text-white w-40"> {quiz_name}</th>))}
                </tr>
              </thead>
              <tbody>
                {/* SMASH Maths Cohort  */}
                <tr className="bg-white border border-[#17026b]  dark:border-gray-700 rounded-lg overflow-hidden">
                  <td className="sticky left-0 z-10 px-6 py-3 w-40 font-bold"></td>
                  <td className="sticky left-40 z-10 px-6 py-3 w-40 font-bold">SMASH Maths Cohort Average</td>
                  {/* <td className="sticky left-0 z-10 px-1 py-1 w-40 font-bold"></td> */}
                  <td className="sticky left-0 z-10 px-2 py-2font-bold"></td>
                  <td className="sticky left-0 z-10 px-2 py-2 font-bold"></td>
                  {selectedChild === "" ? (
                    <>
                      {
                        tableHeaders?.filter(({ year_name }) => selectedYear == 'Selected All' ? true : year_name == selectedYear)?.map(({ quiz_name }) => (
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
                  {/* <td className="sticky left-0 z-10 px-1 py-1 w-40 font-bold"></td> */}
                  <td className="sticky left-0 z-10 px-2 py-2  font-bold"></td>
                  <td className="sticky left-0 z-10 px-2 py-2 font-bold"></td>
                  {selectedChild === "" ? (
                    <>
                      {
                        tableHeaders?.filter(({ year_name }) => selectedYear == 'Selected All' ? true : year_name == selectedYear)?.map(({ quiz_name }) => (
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
                  <tr className="bg-white text-blue-800 border border-[#17026b]  dark:border-gray-700  rounded-lg overflow-hidden">
                    <td className="p-3">{users[student][0]?.user_name}</td>
                    <td className="p-3"><input value={getFullName(users[student][0]?.user_name)} className="h-8" placeholder="Enter name here" onChange={(e) => UpdateFullName(e, users[student][0]?.user_name)} onBlur={(e) => UpdateFullNameDB(e, users[student][0]?.user_name)}/></td>
                    {/* <td className="p-3">{users[student][0]?.full_name}</td> */}
                    <td className="p-3 text-center">{getStudentaverage(users[student][0]?.user_name)}</td>
                    <td className="p-3 text-center">{getStudentEffort(users[student][0]?.user_name)}</td>
                    {tableHeaders?.map(({ quiz_name }) => (<td className="p-3 text-white w-40 text-center" style={{ backgroundColor: checkMarksColor(getMarks(student, quiz_name)) }}>{getMarks(student, quiz_name)}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>}
          {tableHeaders?.length === 0 && true && <div className="overflow-scroll" style={{ maxHeight: 'calc(100vh - 250px)' }}>
          <table className="w-full text-sm text-left table-fixed rounded-lg shadow-sm shadow-slate-400 column-2-sticky">
            <thead className="text-xs text-white uppercase bg-[#17026b]">
              <tr className="items-center">
                <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-40">User Name</th>
                {/* <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-96">Student Name</th> */}
                <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-40">Student Avg</th>
                <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-40">Effort Score</th>
              </tr>
            </thead>
            <tbody>
              {/* SMASH Maths Cohort  */}
              <tr className="bg-white border border-[#17026b]  dark:border-gray-700 rounded-lg overflow-hidden">
                {/* <td className="sticky left-0 z-10 px-6 py-3 w-40 font-bold"></td> */}
                <td className="sticky left-40 z-10 px-6 py-3 w-40 font-bold">SMASH Maths Cohort Average</td>
                <td className="sticky left-0 z-10 px-6 py-3 w-40 font-bold"></td>
                <td className="sticky left-0 z-10 px-6 py-3 w-40 font-bold"></td>
              </tr>

              
                <tr className="bg-white text-blue-800 border border-[#17026b]  dark:border-gray-700  rounded-lg overflow-hidden">
                  {/* <td className="p-3"><input defaultValue={users[student][0]?.full_name} className="h-8" placeholder="Enter name here" onBlur={(e) => UpdateFullName(e, users[student][0]?.user_name ,users[student][0]?.email_address)}/></td> */}
                  <td className="p-3 text-center" rowSpan='3'>No Data Avaiable.</td>
                  
                </tr>
            </tbody>
          </table>
        </div>}  
      </div>
      {/* table ends here */}
      {/* ----------------------------------------------------------- */}
      
      <div className="w-full flex justify-start items-center gap-4 flex-row mt-10">
        {/* choose Year dropdown */}
        <div className="grid gap-1">
          <label htmlFor="">Year</label>
          <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
            <li className="mr-3">
              <div className="inline-block relative" ref={dropdownRef4}>
                <button
                  onClick={() => setYearOpen(!yearOpen)}
                  className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg "
                >
                  {chartSelectedYear ? chartSelectedYear : 'Select Year'}
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
                {yearOpen && (
                  <ul className="absolute right--0 mt-2 py-2 w-74 bg-white rounded-lg shadow-slate-800 shadow-md">
                    {chartYearList?.map((childName, index) => {
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
                              setYearOpen(!yearOpen)
                              handleChartYearSelect(childName)
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
        {/* choose teacher dropdown */}
        <div className="grid gap-1">
          <label htmlFor="">Teacher</label>
          <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
            <li className="mr-3">
              <div className="inline-block relative" ref={dropdownRef2}>
                <button
                  onClick={() => setIsChildOpen2(!isChildOpen2)}
                  className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg "
                >
                  {selectedChartTeacher ? selectedChartTeacher : 'Select Teacher'}
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
                {isChildOpen2 && (
                  <ul className="absolute right--0 mt-2 py-2 w-74 bg-white rounded-lg shadow-slate-800 shadow-md">
                    {chartTeacherList?.map((childName, index) => {
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
                              setIsChildOpen2(!isChildOpen2)
                              handleChartTeacherSelect(childName)
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
        {/* choose Student dropdown */}
        <div className="grid gap-1">
          <label htmlFor="">Student</label>
          <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
            <li className="mr-3">
              <div className="inline-block relative" ref={dropdownRef3}>
                <button
                  onClick={() => setStudentOpen(!studentOpen)}
                  className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg "
                >
                  {chartSelectedStudent ? chartSelectedStudent : 'Select Student'}
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
                {studentOpen && (
                  <ul className="absolute right--0 mt-2 py-2 w-74 bg-white rounded-lg shadow-slate-800 shadow-md">
                    {chartStudentList?.map((childName, index) => {
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
                              setStudentOpen(!studentOpen)
                              handleChartStudentSelect(childName)
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
      </div>
      {filteredChartData.length > 0 && <LineCharts chartsData={filteredChartData}/>}
    </div>
  );
};

export default School;
