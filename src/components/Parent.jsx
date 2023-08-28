import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomLoader } from "../components/Loader";
import LineCharts from "./LineCharts";
import MarkKey from "./MarkKey";

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

const Parent = () => {
  const navigate = useNavigate()
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isChildOpen, setIsChildOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState("");
  const API_URL = 'https://api-dashboard-brr3fliswa-uc.a.run.app'
  const testURL = 'https://dev-api-dashboard-brr3fliswa-uc.a.run.app/api'


  const [isTimeFrameOpen, setIsTimeFrameOpen] = useState(false);
  const [isChildOpen2, setIsChildOpen2] = useState(false);
  const [studentOpen, setStudentOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  // const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);
  // For Chart dfilter drop down
  const dropdownRef3 = useRef(null);
  const dropdownRef4 = useRef(null);
  const dropdownRef5 = useRef(null);
  // For Year (Like 2022) selection 
  const [isDataYearOpen, setIsDataYearOpen] = useState();
  const [dataYearList, setDataYearList] = useState([])
  const [dataSelectedYear, setDataSelectedYear] = useState()
  const dropdownRef6 = useRef(null);

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
  const [allUniqueUsers, setallUniqueUsers] = useState([])
  const durationOption = ['Since Last 52 Weeks', 'Since Last September']
  // Charts States
  const [chartsData, setChartsData] = useState([])
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
    const years = [];
    const startYear = 2022;
    const currentYear = new Date().getFullYear();
  
    for (let year = startYear; year <= currentYear; year++) {
      years.push(year);
  
      if (year < currentYear) {
        years.push(year + 1);
      } else if (new Date(year + 1, 8, 1) <= new Date()) {
        years.push(year + 1);
      }
    }
    setDataYearList([...new Set(years)]);
  },[])

  useEffect(() => {
    try {
      const email = localStorage.getItem('userEmail')
      const token = localStorage.getItem('token')
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
        })
    } catch (e) {
      setDataLoadin(false)
    }

  }, [])

  // useEffect(() => {
  //   const email = localStorage.getItem('userEmail')
  //   try {
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
  //   } catch (e) {
  //     setDataLoadin(false)
  //   }

  // }, [])

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    try {
      const token = localStorage.getItem('token')
      fetch(testURL + '/getparentdashboard', {
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
          const quizes = response?.quizes || [[]]
          setQuizesData(quizes)
          quizes.map(x => {
            if (x.year_name === 'Multip') {
              // console.log('therer====>', x)
            }
          })
          let yearsFilters = quizes.map(x => x.year_name)
          const teacherFilters = quizes?.map(x => x.user_name)
          yearsFilters = yearsFilters.filter(item => item.includes('Year'))
          const uniqueYearsFilters = [...new Set(yearsFilters)].sort()
          const uniqueTeacherFilters = [...new Set(teacherFilters)]
          setYearFilter(uniqueYearsFilters)
          setChartTeacherList(uniqueTeacherFilters)

          // Filter Unique Year for chart
          const uniqueYears = new Set();
          quizes.forEach(item => {
            const year = new Date(item.date_submitted).getFullYear();
            uniqueYears.add(year);
          });
          const sortedUniqueYears = Array.from(uniqueYears).sort((a, b) => a - b);
          setChartYearList(sortedUniqueYears);
          console.log(`Filtered yearssss` , sortedUniqueYears)


          let filterData = quizes?.map(({ quiz_name, year_name }, index) => {
            return {
              year_name,
              quiz_name,
              index,
              week: getWeekNumber(quiz_name)
            }
          })
          setTableHeadersAll(filterData)
          applyFilter(selectedDuraation, uniqueYearsFilters[0], filterData, quizes, dataSelectedYear)  
          setDataLoadin(false)

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
    applyFilter(selectedDuraation, childName, tableHeadersAll, quizesData, dataSelectedYear)
  }

  const handleDurationSelect = (childName) => {
    applyFilter(childName, selectedYear, tableHeadersAll, quizesData, dataSelectedYear)
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
    
    let arr = quiz_name.split(' ')
    return arr.length ? parseInt(arr[arr?.findIndex((item) => item.toLowerCase() == 'Week'.toLowerCase()) + 1]) + _inc : []
    // return quiz_name?.match(/WEEK (\d+)\./i) ? parseInt(quiz_name?.match(/WEEK (\d+)\./i)[1]) + _inc : []
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

  const handleDataYearSelect = (childName) =>{
    setDataSelectedYear(childName)
    applyFilter( selectedDuraation ,selectedYear, tableHeadersAll, quizesData ,childName)
    // applyFilter ( childName, selectedChartTeacher, chartSelectedStudent)
  }

  const applyFilter = (selectedDuraationParm, year, headers, data, yearData) => {

    setSelectedYear(year)
    setSelectedDuraation(selectedDuraationParm)
    const yearSelected = yearData;
    let filterHeader = headers.filter(({ year_name }) => year_name === year)
    let sortedHeader = filterHeader.sort((a, b) => b.week - a.week)
    const ids = sortedHeader.map(o => o.quiz_name)
    const filtered = filterHeader.filter(({ quiz_name }, index) => !ids.includes(quiz_name, index + 1))
    setTableHeaders(filtered)
    // console.log(`Filter table Header `, filtered)

    let filterDurationlData = data
    // Commented Previous Data Since last 52 Weeks
    // if (selectedDuraationParm === 'Since Last 52 Weeks') {
    //   filterDurationlData = data.filter(({ date_submitted }) => new Date(date_submitted) >= addMilliseconds(new Date(), -364 * 24 * 60 * 60 * 1000, date_submitted))
    // }
    // else {
    //   filterDurationlData = data.filter(({ date_submitted }) => new Date(date_submitted) <= new Date() && new Date(date_submitted) >= getFilterDate(date_submitted) )
    // }
    let filterFinalData = filterDurationlData.filter(({ year_name }) => year_name == year)
    filterFinalData = filterFinalData.filter(({ year_name }) => year_name == year)
    // console.log('therer------>1', filterFinalData)
    const filteredRecords = filterFinalData.filter(record => {
      const submissionDate = new Date(record.date_submitted);
      const year = submissionDate.getFullYear();
      const month = submissionDate.getMonth() + 1; // Adding 1 because months are 0-indexed
      if (yearSelected === year) {
        if ( month < 9) {
          return record;
        }
      } else if (yearSelected - 1 === year && month >= 9) {
        return record;
      }
    });

    let usersObject = {}
    filteredRecords.map((item) => {
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
      if (dropdownRef3.current && !dropdownRef3.current.contains(event.target)) {
        setIsChildOpen2(false);
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
        setStudentOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef4]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef5.current && !dropdownRef5.current.contains(event.target)) {
        setYearOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef5]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef6.current && !dropdownRef6.current.contains(event.target)) {
        setIsDataYearOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef6]);

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
    return obj ? obj.percentage_score.toFixed(1) : ''
  }

  const getStudentaverage = (student) =>{
    const filterQuizeTeacherYear = quizesData.filter((record) => record.year_name == selectedYear && record.user_name == student );
    console.log(`Avg Student `, student, filterQuizeTeacherYear)
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

  const getStudentEffort = (student) =>{
    const studentData = quizesData.filter(item => item.user_name === student && item.year_name === selectedYear);
    if(studentData?.length === 0) return '-';

    const uniqueObjectsById = studentData?.reduce((acc, obj) => {
      const key = `${obj.user_name}-${obj.quiz_name}`;
      if (!acc[key]) {
        acc[key] = obj;
      }
      return acc;
    }, {});
    let filteredData = Object.values(uniqueObjectsById);
    filteredData = filteredData?.filter(item => item?.percentage_score > 0)

    // Calculate the effort score for the student user_name
    const totalQuizzes = filteredData.length;
    const completedQuizzes = filteredData.filter(item => item.status === 'submitted').length;
    const effortScore = (completedQuizzes / totalQuizzes) * 100;
    return effortScore === 0 ? '-' : effortScore.toFixed(2);
  }

  const getFilterDate = (date) => {
    const currentDate = new Date(date);
    const monthNumber = currentDate.getMonth();

    if (monthNumber > 8) {
      let d = new Date();
      let current_year = new Date(d.setFullYear(d.getFullYear())).getFullYear()
      let new_date = new Date(current_year, 8, 1, 0, 0, 0, 0);
      return new_date

    } else {
      let d = new Date();
      let last_year = new Date(d.setFullYear(d.getFullYear() - 1)).getFullYear()
      let new_date = new Date(last_year, 8, 1, 0, 0, 0, 0);
      return new_date
    }
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
  const filterChartaData = ( year, teacher, student = "NotSelected") => {
    console.log(`Selected Student for Chart`, student)
    // const filteredByYear = chartsData.filter(item => item.name[1] === year);
    // const CohortAvg = DataToArrayOfMonths(filteredByYear);
    // const filteredByClass = [];    
    // const ClassAvg = DataToArrayOfMonths(filteredByClass);
    // const filteredByStudent = filteredByYear.filter(item => item.username == teacher);    
    // const studentAvg = DataToArrayOfMonths(filteredByStudent);
    // const ToSingleObj = ConvertTosingleObj(CohortAvg, ClassAvg, studentAvg);
    // // console.log(filteredByClass)
    // console.log(`Final Data`, filteredByClass, ToSingleObj);
    // setFilteredChartData(ToSingleObj);

   // Test

   teacher = "No Teacher";  // Since there is no teacher
   const months = [
     "January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"
   ];
  // Change Object Key names of All Quizes Api
  const AllQuizesData =  quizesAverages?.map(entry => {
    const { average_score, datesubmitted, ...rest } = entry;
    return {
      ...rest,
      percentage_score: average_score,
      date_submitted: datesubmitted
    };
  });
  // Get Month and year from Submitted Date
  const GetYearMonth = AllQuizesData?.map(item => {
    if( item?.date_submitted){
      const [year, month] = item?.date_submitted?.split('-');
      return {
        ...item,
        date_submitted: [parseInt(year), months[parseInt(month) - 1]]
      };
    }
  });
  // Corhrt AVG
  let cohortAvgByYear = GetYearMonth?.filter(item => item?.date_submitted[0] == year);
  const filteredData = cohortAvgByYear.filter(item => item.percentage_score > 0)
  const CohortAvg = DataToArrayOfMonths(filteredData);


  //  Student Graph data
   const data = [...quizesData];
   const modifiedArray = data?.map(item => {
     const [year, month] = item?.date_submitted.split('-');
     return {
       ...item,
       date_submitted: [parseInt(year), months[parseInt(month) - 1]]
     };
   });
   let filteredByYear = modifiedArray?.filter(item => item?.date_submitted[0] == year);
   const filteredByClass = filteredByYear.filter(item => item?.email_address === teacher);  
   const filteredClassDataByOneQuiz = Object.values(filteredByClass);
   const filteredClassData = filteredClassDataByOneQuiz.filter(item => item.percentage_score > 0)
   const ClassAvg = DataToArrayOfMonths(filteredClassData);

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

  return (
    <div className="md:mx-20 my-2">
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
                Logout
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
      <div className="grid gap-1 float-right my-6">
        <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
          <li className="mr-3">
            <div className="inline-block" >
              <button
                className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg ">
                User Guide
              </button>
            </div>
          </li>
        </ul>
      </div>

      {/* main bar ends */}

      {/* ----------------------------------------------------------- */}
      {/* filter bar starts here */}

      <h2 className="mt-6 text-[#17026b] font-bold text-xl">DATA ANALYSIS</h2>
      <div className="w-full flex justify-start items-center">
        <div className="w-full flex justify-start items-center gap-4 flex-row mt-2">
          {/* choose teacher dropdown */}
          {/* <div className="grid gap-1">
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
          </div> */}
          {/* Select Year like 2022 */}
          <div className="grid gap-1">
            <label htmlFor="">Year</label>
            <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
              <li className="mr-3">
                <div className="inline-block relative" ref={dropdownRef6}>
                  <button
                    onClick={() => setIsDataYearOpen(!isDataYearOpen)}
                    className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg "
                  >
                    {dataSelectedYear ? dataSelectedYear : dataYearList[dataYearList.length - 1]}
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
                  {isDataYearOpen && (
                    <ul className="absolute right--0 mt-2 py-2 w-74 bg-white rounded-lg shadow-slate-800 shadow-md">
                      {dataYearList?.map((childName, index) => {
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
                                setIsDataYearOpen(!isDataYearOpen)
                                handleDataYearSelect(childName)
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
            <label htmlFor="">Year (UK) / Grade (US)</label>
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
                      <ul className="absolute right-0 mt-2 py-2 w-60 bg-white rounded-lg shadow-slate-800 shadow-md">
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
        <MarkKey />
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
                <th scope="col" className="px-6 py-3 bg-[#17026b] text-white w-40">Student AVG</th>
                <th scope="col" className="px-6 py-3 bg-[#17026b] text-white w-40">Effort Score</th>
                {tableHeaders?.map(({ quiz_name }) => (<th scope="col" className="px-6 py-3 bg-[#17026b] text-white w-40">{quiz_name}</th>))}
              </tr>
            </thead>
            <tbody>
              
              <tr class="bg-white border border-[#17026b]  dark:border-gray-700 rounded-lg overflow-hidden">
                  <td class="sticky left-0 z-10 px-6 py-3 w-40 font-bold">SMASH Maths Cohort Average</td>
                  <td class="sticky left-0 z-10 px-6 py-3 w-40 font-bold"></td>
                  <td class="sticky left-0 z-10 px-6 py-3 w-40 font-bold"></td>
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
              {Object.keys(users).map((student) => (
                <tr className="bg-white border border-[#17026b]  dark:border-gray-700 rounded-lg overflow-hidden">
                  <td class="px-6 py-4">{users[student][0]?.user_name}</td>
                  <td className="p-3 text-center">{getStudentaverage(users[student][0]?.user_name)}</td>
                  <td className="p-3 text-center">{getStudentEffort(users[student][0]?.user_name)}</td>
                  {tableHeaders?.map(({ quiz_name }) => (<td class="px-6 py-4 text-white w-8 text-center" style={{ backgroundColor: checkMarksColor(getMarks(student, quiz_name)) }}>{getMarks(student, quiz_name)}</td>))}
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
              <div className="inline-block relative" ref={dropdownRef5}>
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
          <label htmlFor="">Student</label>
          <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
            <li className="mr-3">
              <div className="inline-block relative" ref={dropdownRef3}>
                <button
                  onClick={() => setIsChildOpen2(!isChildOpen2)}
                  className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg "
                >
                  {selectedChartTeacher ? selectedChartTeacher : 'Select Student'}
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
        {/* choose Student dropdown */}
        {/* <div className="grid gap-1">
          <label htmlFor="">Student</label>
          <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
            <li className="mr-3">
              <div className="inline-block relative" ref={dropdownRef4}>
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
        </div>         */}
      </div>
      {filteredChartData.length > 0 && <LineCharts chartsData={filteredChartData}/>}
    </div>
  );
};

export default Parent;