import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomLoader } from "./Loader";
import LineCharts from "./LineCharts";
import MarkKey from "./MarkKey";
import RevisedLineChart from './RevisedLineChart'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top:'80%',
  left:'50%',
  transform: 'translate(-50%, -50%)',
  width: 1100,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
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

const SchoolParent = () => {
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
  // For Year (Like 2022) selection 
  const [isDataYearOpen, setIsDataYearOpen] = useState();
  const [dataYearList, setDataYearList] = useState([])
  const [dataSelectedYear, setDataSelectedYear] = useState()
  const dropdownRef5 = useRef(null);
  // Package Dropdown
  const [packageSelected, setPackageSelected] = useState('Premium Package');
  const [packageList, setPackageList] = useState(['Free Package', 'Premium Package']);
  const [packageOpen, setPackageOpen] = useState(false);
  const dropdownRefPackage = useRef(null);

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
  const [allUniqueUsers, setallUniqueUsers] = useState([])
  // Charts States
  const [chartsData, setChartsData] = useState([])
  const [filteredChartData, setFilteredChartData] = useState(initialChartData)
  const [chartTeacherList, setChartTeacherList] = useState([])
  const [selectedChartTeacher, setSelectedChartTeacher] = useState()
  const [chartStudentList, setChartStudentList] = useState([])
  const [chartSelectedStudent, setChartSelectedStudent] = useState()
  const [chartYearList, setChartYearList] = useState([])
  const [chartSelectedYear, setChartSelectedYear] = useState()
  const [classAverageAVG, setClassAverageAVG] = useState('-')
  const [cohortAverageAVG, setCohortAverageAVG] = useState('-')
  const [allUniqueChartUsers, setallUniqueChartUsers] = useState([])
  const [chartDataLoading, setChartDataLoading] = useState(true)

    // Revised Chart States 
    const [chart, setChart] = useState([{
      "Class Average": 0.0,
      "SMASH Maths Cohort Average": 0.0,
      "Student Average": 0.0,
      "week": 0
    }])
    const dropdownRefYear = useRef(null);
    const dropdownRefClass = useRef(null);
    const dropdownRefStudent = useRef(null);
    const [isYearChartOpen, setIsYearChartOpen] = useState(false);
    const [isClassChartOpen, setIsClassChartOpen] = useState(false);
    const [isStudentChartOpen, setIsStudentChartOpen] = useState(false);
    const [rechartTeacherList, setReChartTeacherList] = useState([])
    const [selectedReChartTeacher, setSelectedReChartTeacher] = useState('')
    const [rechartStudentList, setReChartStudentList] = useState([])
    const [rechartSelectedStudent, setReChartSelectedStudent] = useState('')
    const [rechartYearList, setReChartYearList] = useState([ 2021, 2022, 2023])
    const [rechartSelectedYear, setReChartSelectedYear] = useState('')
    // Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  //  SELECT Year (Like 2022) 
  useEffect(() => {
    let years = [];
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
    years = years.map(item => item-1)
    setDataYearList([...new Set(years)]);
  },[])
  const handleDataYearSelect = (childName) =>{
    setDataSelectedYear(childName)
    applyFilter(selectedTeacher, selectedYear, tableHeadersAll, quizesData ,childName)
    // applyFilter ( childName, selectedChartTeacher, chartSelectedStudent)
  }
  useEffect(() => {
    // Get the current year
    const currentYear = new Date().getFullYear();
    // Set the start year
    let year = 2021;
    // Create an array to store the years
    const yearList = [];
    while (year <= currentYear) {
      yearList.push(year);
      // Increment the year by 1
      year++;
      // Check if it's September 1st of the next year
      if (year <= currentYear && new Date().getMonth() >= 8) {
        yearList.push(year);
        year++;
      }
    }

    // years = years.map(item => item-1)
    setDataYearList(yearList);
  },[])

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
          const quizes = response?.quizes || [[]]
          setQuizesData(quizes)
          const teacherFilters = quizes.map(x => x.email_address)
          let yearsFilters = quizes.map(x => x.year_name)
          yearsFilters = yearsFilters.filter(item => item.includes('Year'))
          const uniqueTeacherFilters = [...new Set(teacherFilters)]
          let uniqueYearsFilters = [...new Set(yearsFilters)].sort()
          uniqueYearsFilters.push("Other")
          setTeacherFilter(uniqueTeacherFilters)
          setYearFilter(uniqueYearsFilters)

          setChartTeacherList(uniqueTeacherFilters)
          setReChartTeacherList(uniqueTeacherFilters)

          // Filter Unique Year for chart
          const uniqueYears = new Set();
          quizes.forEach(item => {
            const year = new Date(item.date_submitted).getFullYear();
            uniqueYears.add(year);
          });
          const sortedUniqueYears = Array.from(uniqueYears).sort((a, b) => a - b);
          setChartYearList(sortedUniqueYears);
          console.log(`Filtered yearssss` , sortedUniqueYears)

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
          applyFilter(uniqueTeacherFilters[0], uniqueYearsFilters[0], filterData, quizes,sortedUniqueYears[sortedUniqueYears.length-1])
          if (quizes != null) { setSchoolNama(Object.values(quizes)[0]?.school_name_small) }
          
          // setDataLoadin(false)
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
        .then(()=>{
          setDataLoadin(false)
        })
    } catch (e) {
      setDataLoadin(false)
    }
  }, [])

  useEffect(() => {
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
        })
    } catch (e) {
    }
  }, [selectedTeacher])

  // Get User's Data For Charts from DB
  useEffect(() => {
    try {
      const token = localStorage.getItem('token')
      const email = selectedReChartTeacher;
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
          setallUniqueChartUsers(response.data)
        })
    } catch (e) {
      // setDataLoadin(false)
    }
  }, [selectedReChartTeacher])

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

  const applyFilter = (email, year, headers, data, yearData ) => {
    setSelectedYear(year)
    setSelectedTeacher(email)
    setDataSelectedYear(yearData)
    const yearSelected = yearData;
    console.log(`selectedYear`, yearSelected)
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
    const filtered = filterHeader.filter(({ quiz_name }, index) => !ids.includes(quiz_name, index + 1)).sort()
    console.log('therer------>2', filtered)
    setTableHeaders(filtered)

    let filterEmailData = data.filter(({ email_address }) => email_address == email)
    let filterFinalData;
    if(year != "Other"){
      filterFinalData = filterEmailData.filter(({ year_name }) => year_name == year)
    }
    else{
      filterFinalData = filterEmailData.filter(item => !(item.year_name && item.year_name.includes('Year')))
    }
    const filteredRecords = filterFinalData.filter(record => {
      const submissionDate = new Date(record.date_submitted);
      const year = submissionDate.getFullYear();
      const month = submissionDate.getMonth() + 1; // Adding 1 because months are 0-indexed
  
      if (yearSelected === year) {
        if ( month >= 9) {
          return record;
        }
      } else if (yearSelected + 1 === year && month < 9) {
        return record;
      }
    });
    // console.log('therer------>1', filterFinalData)
    let usersObject = {}
    filteredRecords.map((item) => {
      // console.log('therer------>2', usersObject)
      if (usersObject[item?.user_name]) {
        usersObject[item?.user_name] = [...usersObject[item?.user_name], item]
      }
      else {
        usersObject[item?.user_name] = [item]
      }
    })
    // Calculate Cohort average Avg
    const QuizName = filterHeader?.map(item => item?.quiz_name)    
    const filteredQuizes = quizesAverages?.filter(quiz => QuizName?.includes(quiz?.quiz_name));
    const sumCohort = filteredQuizes?.reduce((accumulator, currentObj) => accumulator + currentObj?.average_score, 0);
    const AVGCohort = (sumCohort / (filteredQuizes?.length *100)) * 100;
    setCohortAverageAVG(AVGCohort ? `${AVGCohort?.toFixed(1)} %` : '-')
    
    // Calculate Class average Avg
    const sum = filteredRecords.reduce((accumulator, currentObj) => accumulator + currentObj?.percentage_score, 0);
    const AVG = (sum / (filteredRecords?.length *100)) * 100;
    setClassAverageAVG( AVG ? `${AVG?.toFixed(1)} %`: "-") 
    console.log(`Filtered Data`,filteredRecords)

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
  // Rolling Averages API
  useEffect(() => {
    setChartDataLoading(true)
    const year = rechartSelectedYear || rechartYearList[rechartYearList.length - 1]
    const email =  selectedReChartTeacher || "";
    const username = rechartSelectedStudent || "";
    const type = "teacherparent";
    let payload = { year, type };
    if (email !== "" && username === "") {
      payload = { year, email, type };
    } else if (email === "" && username !== "") {
      payload = { year, username, type };
    } else if (email !== "" && username !== "") {
      payload = { year, email, username, type };
    }
    try {
      const token = localStorage.getItem('token')
      fetch(testURL + '/rollingaverage', {
        method: 'POST',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Authorization": token ? `${token}` : null
        },
        body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(response => {
          console.log(`Token `, token)
          if(response?.rollingaverage.length === 0){
            setChart([{
              "SMASH Maths Cohort Average": 0.0,
              "Class Average": 0.0,
              "Student Average": 0.0,
              "week": 'Week 1'
            }])
          }
          else{
            setChart(response?.rollingaverage)
          }
          setChartDataLoading(false)
        })
    } catch (e) {
      setChartDataLoading(false)
    }
    // console.log(`Api Data fetch`, rechartSelectedYear, selectedReChartTeacher, rechartSelectedStudent)
  }, [rechartSelectedYear, selectedReChartTeacher, rechartSelectedStudent])


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
    applyFilter(selectedTeacher, childName, tableHeadersAll, quizesData, dataSelectedYear)
  }

  const handleTeacherSelect = (childName) => {
    applyFilter(childName, selectedYear, tableHeadersAll, quizesData, dataSelectedYear)
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

  const handlePackageSelect = (childName) => {
    setPackageSelected(childName)
    if(childName == 'Free Package'){
      ToParentsDashboard()
    }
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
    // console.log(`Final Data`, filteredByClass, ToSingleObj);
    // setFilteredChartData(ToSingleObj);

    // Test
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

    // Teacher AVG + Student AVG
    const data = [...quizesData];
    const modifiedArray = data?.map(item => {
      const [year, month] = item?.date_submitted.split('-');
      return {
        ...item,
        date_submitted: [parseInt(year), months[parseInt(month) - 1]]
      };
    });
    let filteredByYear = modifiedArray?.filter(item => item?.date_submitted[0] == year);
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
    let filteredStudentDataByOneQuiz = Object.values(uniqueObjectsById);
    filteredStudentDataByOneQuiz = filteredStudentDataByOneQuiz.filter(item => item.percentage_score > 0)
    const studentAvg = DataToArrayOfMonths(filteredStudentDataByOneQuiz);

    const ToSingleObj = ConvertTosingleObj(CohortAvg, ClassAvg, studentAvg);
    console.log(`Quzies` , filteredClassData )
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

  // Revised Charts
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRefYear.current && !dropdownRefYear.current.contains(event.target)) {
        setIsYearChartOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRefYear]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRefClass.current && !dropdownRefClass.current.contains(event.target)) {
        setIsClassChartOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRefClass]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRefStudent.current && !dropdownRefStudent.current.contains(event.target)) {
        setIsStudentChartOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRefStudent]);

  // Package DropDown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRefPackage.current && !dropdownRefPackage.current.contains(event.target)) {
        setPackageOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRefPackage]);

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
    if (mark == '' || mark == 0)
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
    return _avg ? `${_avg.average_score.toFixed(1)} %` : 0
  }
  const getClassAverage = (quiz) => {
    // const filterQuizeTeacherYear = quizesData.filter((record) => record.email_address == selectedTeacher  && record.year_name == selectedYear && record.quiz_name === quiz );
    let filterQuizeTeacherYear;
    if(selectedYear != "Other"){
      filterQuizeTeacherYear = quizesData.filter((record) => record.email_address == selectedTeacher  && record.year_name == selectedYear && record.quiz_name == quiz && record.percentage_score > 0);
    }
    else{
      filterQuizeTeacherYear = quizesData.filter((record) => record.email_address == selectedTeacher  && !record.year_name.includes('Year')  && record.quiz_name == quiz && record.percentage_score > 0);
    }
    // Filter Data on base of Quize Submitted date
    const finalData = filterQuizeTeacherYear?.filter(record => {
      const submissionDate = new Date(record?.date_submitted);
      const year = submissionDate.getFullYear();
      const month = submissionDate.getMonth() + 1; // Adding 1 because months are 0-indexed
      if (dataSelectedYear === year) {
        if ( month >= 9) {
          return record;
        }
      } else if (dataSelectedYear + 1 === year && month < 9) {
        return record;
      }
    });
    // console.log(`Selected Year ` ,quiz,filterQuizeTeacherYear);
    // Filter Object with unique user_name and quiz_name
    const uniqueObjectsById = finalData.reduce((acc, obj) => {
      if (!acc[obj.user_name]) {
        acc[obj.user_name] = obj;
      }
      return acc;
    }, {});
    const filteredData = Object.values(uniqueObjectsById);
    const sumOfAllQuizes = filteredData.reduce((acc, item) => acc + item['percentage_score'], 0)
    console.log(`Data Avg`,sumOfAllQuizes, filteredData?.length)
    return filteredData?.length === 0 ? '-' : `${(sumOfAllQuizes / filteredData?.length).toFixed(1)} %`;
  }

  const getMarks = (key, name) => {
    let obj = users[key]?.find(({ quiz_name }) => quiz_name == name)
    return obj ? `${obj.percentage_score.toFixed(1)} %` : ''
  }

  const getStudentaverage = (student) =>{
    let filterQuizeTeacherYear;
    if(selectedYear != "Other"){
      filterQuizeTeacherYear = quizesData.filter((record) => record.email_address == selectedTeacher  && record.year_name == selectedYear && record.user_name == student);
    }
    else{
      filterQuizeTeacherYear = quizesData.filter((record) => record.email_address == selectedTeacher  && !record.year_name.includes('Year')  && record.user_name == student);
    }
    // Filter Data on base of Quize Submitted date
    const finalData = filterQuizeTeacherYear?.filter(record => {
      const submissionDate = new Date(record?.date_submitted);
      const year = submissionDate.getFullYear();
      const month = submissionDate.getMonth() + 1; // Adding 1 because months are 0-indexed
      if (dataSelectedYear === year) {
        if ( month >= 9) {
          return record;
        }
      } else if (dataSelectedYear + 1 === year && month < 9) {
        return record;
      }
    });
    // Filter Object with unique user_name and quiz_name
    const uniqueObjectsById = finalData?.reduce((acc, obj) => {
      const key = `${obj.user_name}-${obj.quiz_name}`;
      if (!acc[key]) {
        acc[key] = obj;
      }
      return acc;
    }, {});
    let filteredData = Object.values(uniqueObjectsById);
    filteredData = filteredData?.filter(item => item?.percentage_score > 0)
    const sumOfAllQuizes = filteredData?.reduce((acc, item) => acc + item['percentage_score'], 0)
    return filteredData?.length === 0 ? '-' : `${(sumOfAllQuizes / filteredData?.length).toFixed(1)} %`;
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
      // setDataLoadin(false)
    }
  }
  const getFullName = (username) => {
    const found = allUniqueUsers.filter(item => item.user_name == username)
    return found[0]?.full_name == username ? "" :  found[0]?.full_name
  }
  const getStudentName = (username) =>{
    const found = allUniqueUsers.filter(item => item.user_name == username)
    if(!found) return `${username} - Enter Name`;
    return found[0]?.full_name == username ? `${username} - Enter Name` :  `${username} - ${found[0]?.full_name}`
  }
  const getStudentNameForChart = (username) =>{
    const found = allUniqueChartUsers.filter(item => item.user_name == username)
    if(!found) return `${username} - Enter Name`;
    return found[0]?.full_name == username ? `${username} - Enter Name` :  `${username} - ${found[0]?.full_name}`
  }

  const getStudentEffort = (student) =>{
    let studentData = [];
    if(selectedYear != "Other"){
      studentData = quizesData.filter(item => item.user_name === student && item.year_name === selectedYear && item.percentage_score > 0);
    }
    else{
      studentData = quizesData.filter((record) => !record.year_name.includes('Year')  && record.user_name == student && record.percentage_score > 0);
    }
    const finalData = studentData?.filter(record => {
      const submissionDate = new Date(record?.date_submitted);
      const year = submissionDate.getFullYear();
      const month = submissionDate.getMonth() + 1; // Adding 1 because months are 0-indexed
      if (dataSelectedYear === year) {
        if ( month >= 9) {
          return record;
        }
      } else if (dataSelectedYear + 1 === year && month < 9) {
        return record;
      }
    });
    if(finalData?.length === 0) return '-';

    const uniqueObjectsById = finalData?.reduce((acc, obj) => {
      const key = `${obj.user_name}-${obj.quiz_name}`;
      if (!acc[key]) {
        acc[key] = obj;
      }
      return acc;
    }, {});
    let filteredData = Object.values(uniqueObjectsById);
    filteredData = filteredData?.filter(item => item?.percentage_score > 0)

    // Calculate the effort score for the student user_name
    const totalQuizzes = filteredData?.length;
    const completedQuizzes = filteredData?.filter(item => item?.status === 'submitted')?.length;
    // const effortScore = (completedQuizzes / totalQuizzes) * 100;
    const effortScore = ( totalQuizzes / tableHeaders.length ) * 100;
    return effortScore === 0 ? '-' : `${effortScore.toFixed(1)} %`;
  }

  const ToParentsDashboard = () =>{
    navigate('/school-dashboard')
  }

  // Revised Charts
  const handleReChartYearSelect = (childName) => {
    setReChartSelectedYear(childName)
    console.log( childName, selectedReChartTeacher, rechartSelectedStudent, )
  }
  const handleReChartTeacherSelect = (childName) => {
    setSelectedReChartTeacher(childName)
    const teacherFilters = quizesData.filter(x => x.email_address === childName)
    const students = teacherFilters.map(x => x.user_name).sort();
    const uniqueStudents =  [...new Set(students)]
    setReChartStudentList(uniqueStudents);
    console.log(uniqueStudents)
    console.log( rechartSelectedYear, childName, rechartSelectedStudent)
  }
  const handleReChartStudentSelect = (childName) => {
    setReChartSelectedStudent(childName)
    console.log( rechartSelectedYear, selectedReChartTeacher, childName)
  } 
  const getMarkColor = (key, name) => {
    console.log(`users[key]`, users[key])
    let obj = users[key]?.find(({ quiz_name }) => quiz_name == name)
    if(!obj) return ''
    return obj.percentage_score.toFixed(1)
  } 

  return (
    <>
    <div className="md:mx-20 my-6">
      {dataLoadin && <CustomLoader />}
      {chartDataLoading && <CustomLoader /> }

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
      <div className="grid gap-1 float-right my-12">
        <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
          <li className="mr-3">
            <div className="inline-block" >
              <button
                onClick = {handleOpen}
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
        <div className="w-full flex justify-start items-center gap-4 flex-row mt-1">
            {/* Button  */}
            {/* <div className="grid gap-1 float-right">
            <label htmlFor="">Package</label>
            <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
              <li className="mr-3">
                <div className="inline-block relative" >
                  <button
                    onClick = {ToParentsDashboard}
                    className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg ">
                    Free Package
                  </button>
                </div>
              </li>
            </ul>
            </div> */}
              <div className="grid gap-1">
              <label htmlFor="">Goto Package</label>
              <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20 h-16">
                <li className="mr-3">
                  <div className="inline-block relative" ref={dropdownRefPackage}>
                    <button
                      onClick={() => setPackageOpen(!packageOpen)}
                      className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg "
                    >
                      {packageSelected ? packageSelected : "Choose Package"}
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
                    {packageOpen && (
                      <ul className="absolute right--0 mt-2 py-2 w-74 bg-white rounded-lg shadow-slate-800 shadow-md">
                        {packageList?.map((childName, index) => {
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
                                  setPackageOpen(!packageOpen)
                                  handlePackageSelect(childName)
                                }}
                              >
                                <span
                                  className="block px-4 py-1 text-gray-800 hover:bg-indigo-500 hover:text-white">
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
                                className="block px-4 py-1 text-gray-800 hover:bg-indigo-500 hover:text-white">
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

          {/* choose Year dropdown */}
          <div className="grid gap-1">
            <label htmlFor="">Academic Year</label>
            <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
              <li className="mr-3">
                <div className="inline-block relative" ref={dropdownRef5}>
                  <button
                    onClick={() => setIsDataYearOpen(!isDataYearOpen)}
                    className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg "
                  >
                    {dataSelectedYear ? `September ${dataSelectedYear} - August ${dataSelectedYear+1}` : `September ${dataYearList[dataYearList.length - 1]} - August ${dataYearList[dataYearList.length - 1]+1}`}
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
                                {`September ${childName} - August ${childName+1}`}
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
                      <ul className="absolute right-0 mt-2 py-2 w-60 bg-white rounded-lg shadow-slate-800 shadow-md">
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
}</td> shadow-md sm:rounded-sm  lg:mx-auto sm:w-full mt-5">

        {
          Boolean(tableHeaders?.length) && true && <div className="overflow-scroll" style={{ maxHeight: 'calc(100vh - 250px)' }}>
            <table className="w-full text-sm text-left table-fixed rounded-lg shadow-sm shadow-slate-400 column-2-sticky">
              <thead className="text-xs text-white uppercase bg-[#17026b] h-32">
                <tr className="items-center">
                  <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-40">User Name</th>
                  <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-40">Student Name</th>
                  {/* <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-96">Student Name</th> */}
                  <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-40">Student Avg</th>
                  <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-40">Effort Score</th>
                  {tableHeaders?.map(({ quiz_name }) => (<th scope="col" className="p-3 bg-[#17026b] text-white w-40"> {quiz_name}</th>))}
                </tr>
              </thead>
              <tbody>
                {/* SMASH Maths Cohort  */}
                <tr className="bg-white border border-[#17026b]  dark:border-gray-700 rounded-lg overflow-hidden">
                  {/* <td className="sticky left-0 z-10 px-6 py-3 w-40 font-bold"></td> */}
                  <td className="sticky left-40 z-10 px-3 py-3 w-40 font-bold">SMASH Maths Cohort Average</td>
                  <td className="sticky left-0 z-10 px-6 py-3 w-40 font-bold"></td>
                  <td className="sticky left-0 z-10 p-3 w-40 font-bold text-center" >{cohortAverageAVG}</td>
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
                
                {/* Class Average */}
                {/* Class Avarage  */}
                <tr className="bg-white border border-[#17026b]  dark:border-gray-700 rounded-lg overflow-hidden">
                  <td className="sticky left-40 z-10 px-3 py-3 w-40 font-bold">Class Average</td>
                  <td className="sticky left-0 z-10 px-6 py-3 w-40 font-bold"></td>
                  {/* <td className="sticky left-0 z-10 px-1 py-1 w-40 font-bold"></td> */}
                  <td className="sticky left-0 z-10 p-3 w-40 font-bold text-center">{classAverageAVG}</td>
                  <td className="sticky left-0 z-10 px-2 py-2 w-40 font-bold"></td>
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
                {Object.keys(users)?.length === 0 && 
                <tr className="bg-white text-blue-800 border border-[#17026b]  dark:border-gray-700  rounded-lg overflow-hidden">
                  {/* <td className="p-3"><input defaultValue={users[student][0]?.full_name} className="h-8" placeholder="Enter name here" onBlur={(e) => UpdateFullName(e, users[student][0]?.user_name ,users[student][0]?.email_address)}/></td> */}
                  <td className="p-5 text-center w-98s" rowSpan='3'></td> 
                  <td className="p-5 text-center w-98s" rowSpan='3'>No Data Avaiable.</td> 
                  <td className="p-5 text-center w-98s" rowSpan='3'></td>                  
                </tr> }
                {Object.keys(users).map((student) => (
                  <tr className="bg-white text-blue-800 border border-[#17026b] dark:border-gray-700  rounded-lg overflow-hidden">
                    <td className="p-3">{users[student][0]?.user_name}</td>
                    <td className="p-3"><input value={getFullName(users[student][0]?.user_name)} className="h-8 placeholder-red-600" placeholder="Enter first name" onChange={(e) => UpdateFullName(e, users[student][0]?.user_name)} onBlur={(e) => UpdateFullNameDB(e, users[student][0]?.user_name)}/></td>
                    {/* <td className="p-3 w-40 font-bold">{getFullName(users[student][0]?.user_name)}</td> */}
                    <td className="p-3 text-center w-40 font-bold">{getStudentaverage(users[student][0]?.user_name)}</td>
                    <td className="p-3 text-center w-40 font-bold">{getStudentEffort(users[student][0]?.user_name)}</td>
                    {tableHeaders?.map(({ quiz_name }) => (<td className="p-3 text-white w-40 text-center" style={{ backgroundColor: checkMarksColor(getMarkColor(student, quiz_name)) }}>{getMarks(student, quiz_name)}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
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
      <h2 className="my-6 mt-20 text-[#17026b] font-bold text-xl">CHART ANALYSIS</h2>
      <div className="w-full flex justify-start items-center gap-4 flex-row ">
        {/* choose Year dropdown */}
        {/* <div className="grid gap-1">
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
        </div> */}
        {/* choose teacher dropdown */}
        {/* <div className="grid gap-1">
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
        </div> */}
        {/* choose Student dropdown */}
        {/* <div className="grid gap-1">
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
        </div>         */}
      </div>
      {/* {filteredChartData.length > 0 && <LineCharts chartsData={filteredChartData}/>} */}
      <div className="w-full flex justify-start items-center gap-4 flex-row mt-10 mb-5 my-5">
        {/* choose Year dropdown */}
        <div className="grid gap-1"> 
          <label htmlFor="">Academice Year</label>
          <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
            <li className="mr-3">
              <div className="inline-block relative" ref={dropdownRefYear}>
                <button
                  onClick={() => setIsYearChartOpen(!isYearChartOpen)}
                  className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg "
                >
                  {rechartSelectedYear ? `September ${rechartSelectedYear} - August ${rechartSelectedYear+1}` : `September ${rechartYearList[rechartYearList.length - 1]} - August ${rechartYearList[rechartYearList.length - 1]+1}`}
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
                {isYearChartOpen && (
                  <ul className="absolute right--0 mt-2 py-2 w-74 bg-white rounded-lg shadow-slate-800 shadow-md">
                    {rechartYearList?.map((childName, index) => {
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
                              setIsYearChartOpen(!isYearChartOpen)
                              handleReChartYearSelect(childName)
                            }}
                          >
                            <span
                              className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                              {`September ${childName} - August ${childName+1}`}
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
              <div className="inline-block relative" ref={dropdownRefClass}>
                <button
                  onClick={() => setIsClassChartOpen(!isClassChartOpen)}
                  className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg "
                >
                  {selectedReChartTeacher ? selectedReChartTeacher : 'Select Teacher'}
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
                {isClassChartOpen && (
                  <ul className="absolute right--0 mt-2 py-2 w-74 bg-white rounded-lg shadow-slate-800 shadow-md">
                    {rechartTeacherList?.map((childName, index) => {
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
                              setIsClassChartOpen(!isClassChartOpen)
                              handleReChartTeacherSelect(childName)
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
              <div className="inline-block relative" ref={dropdownRefStudent}>
                <button
                  onClick={() => setIsStudentChartOpen(!isStudentChartOpen)}
                  className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg "
                >
                  {rechartSelectedStudent ? getStudentNameForChart(rechartSelectedStudent) : 'Select Student'}
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
                {isStudentChartOpen && (
                  <ul className="absolute right--0 mt-2 py-2 w-74 bg-white rounded-lg shadow-slate-800 shadow-md">
                    {rechartStudentList?.map((childName, index) => {
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
                              setIsStudentChartOpen(!isStudentChartOpen)
                              handleReChartStudentSelect(childName)
                            }}
                          >
                            <span
                              className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                              {getStudentNameForChart(childName)}
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
      <div className="mb-24">
        {chart.length > 0 && <RevisedLineChart chart={chart}/>} 
      </div>
    </div>
    
    <Modal
        open={open}
        onClose={handleClose}
        style={{ overflow: "auto" }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > 
        <Box> 
          <Box sx={style}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' , marginBottom: 2 }}>
              <Box >
                <Typography id="modal-modal-title" variant="h3" component="h2" sx={{color: '#17026b'}}>
                  User Guide For School Dashboard
                </Typography>
              </Box>
              <Box>
                <Button onClick={handleClose}>
                  <CloseIcon />
                </Button>
              </Box>
            </Box>
            <hr />
            <Box  sx={{ marginTop: 2 }}>
              <u>
                <Typography id="modal-modal-title" variant="h4" component="h2" sx={{color: '#17026b'}}>              
                  DATA ANALYSIS
                </Typography>
              </u>
              <Typography variant="h6" component="h6" sx={{color: 'black', margin:'2px'}}>
                To view your pupils’ data, please choose from the following options from the drop-down buttons.
                <Typography variant="h6" component="h6" sx={{color: 'black', margin:'2px'}}>
                  <strong style={{ fontSize: '16px' }}>Package:- </strong> – Free Package if your school is signed up to Free Practices (6 questions a week, published during school term time only) or Premium Practices (20+ questions a week, published every week of the calendar year).</Typography>
                <Typography variant="h6" component="h6" sx={{color: 'black', margin:'2px'}}>
                  <strong style={{ fontSize: '16px' }}>Teacher:– </strong> Choose the teacher at your school for whom you would like to view the pupils’ results.</Typography>
                <Typography variant="h6" component="h6" sx={{color: 'black', margin:'2px'}}>
                  <strong style={{ fontSize: '16px' }}>Academic Year:- </strong> Choose the academic year, beginning in September. If you choose 2023 for example, this will relate to data for the academic year September 2023 to September 2024.</Typography>
                <Typography variant="h6" component="h6" sx={{color: 'black', margin:'2px'}}>
                  <strong style={{ fontSize: '16px' }}>Year (UK) / Grade (US):– </strong> Choose the Year/Grade of the pupils. Note that the Year/Grade must relate to the Year/Grade of the teacher that has been selected. If the teacher is not teaching that Year/Grade, then no data will be shown.
                </Typography>

                Once you have chosen your options, the data table will show pupils’ scores for SMASH Maths Practices that are set each week. Here are some tips for using the table.
                <Typography variant="h6" component="h6" sx={{color: 'black', margin:'2px'}}>
                  <strong style={{ fontSize: '16px' }}>Student Name:– </strong> Please add the first names of your pupils in the boxes shown. This will help you keep track of their progress more easily. The pupils’ names must be changed in September at the beginning of each academic year (the usernames stay with the teacher, not the pupil).
                </Typography>
                <Typography variant="h6" component="h6" sx={{color: 'black', margin:'2px'}}>
                <strong style={{ fontSize: '16px' }}>Student Average:– </strong> This is the average score of all Practices that the pupil has completed.
                </Typography>
                <Typography variant="h6" component="h6" sx={{color: 'black', margin:'2px'}}>
                <strong style={{ fontSize: '16px' }}>Effort Score:– </strong> This is the percentage of Practices completed divided by the number of Practices set.
                </Typography>
                <Typography variant="h6" component="h6" sx={{color: 'black', margin:'2px'}}>
                <strong style={{ fontSize: '16px' }}>SMASH Maths Cohort Average:– </strong> You can see this average in the top row of the table. This Cohort Average is the average score of all children that have taken the Practice (across all schools, and also all children doing SMASH Maths at Home). Use this average to see how well your pupils, and the class, are performing versus the entire SMASH Maths cohort.
                </Typography>
                <Typography variant="h6" component="h6" sx={{color: 'black', margin:'2px'}}>
                <strong style={{ fontSize: '16px' }}>Class Average:– </strong> In the second row, you can see the average scores for all pupils in the teacher’s class.
                </Typography>
                <Typography variant="h6" component="h6" sx={{color: 'black', margin:'2px'}}>
                <strong style={{ fontSize: '16px' }}>Colour Coding:– </strong> In the top right, you can see the key for how the scores have been colour coded. Scores above 80% are coloured blue. Scores between 60-80% are coloured green. Scores between 40-60% are coloured orange. Scores below 40% are coloured red.
                </Typography>
                <u>
                  <Typography id="modal-modal-title" variant="h4" component="h4" sx={{color: '#17026b', marginTop:2}}>
                    CHART ANALYSIS
                  </Typography> 
                </u>           
                <Typography variant="h6" component="h6" sx={{color: 'black', margin:'2px'}}>
                  Below the Data Table, you can view the Chart Analysis. You must choose the following options.
                </Typography>
                <Typography variant="h6" component="h6" sx={{color: 'black', margin:'2px'}}>
                  <strong style={{ fontSize: '16px' }}>Academic Year:- </strong> If you choose 2023 for example, this will relate to data for the academic year September 2023 to September 2024.
                </Typography>
                <Typography variant="h6" component="h6" sx={{color: 'black', margin:'2px'}}>
                  <strong style={{ fontSize: '16px' }}>Teacher:- </strong> Choose the teacher at your school for whom you would like to view the pupil’s results.          
                </Typography>
                <Typography variant="h6" component="h6" sx={{color: 'black', margin:'2px'}}>
                  <strong style={{ fontSize: '16px' }}>Student:- </strong> Choose the pupil for that teacher. Please note that if the Academic Year chosen is not the current academic year, then this will obviously relate to the pupil of the teacher from the previous academic year.
                </Typography>

              </Typography>
              </Box>
          </Box>
        </Box>
    </Modal>
    </>
  );
};

export default SchoolParent;
