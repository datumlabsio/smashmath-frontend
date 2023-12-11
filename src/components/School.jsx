import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomLoader } from "../components/Loader";
import LineCharts from "./LineCharts";
// import {datachartslinefromfile} from './lineChart'
import MarkKey from "./MarkKey";
import RevisedLineChart from "./RevisedLineChart";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-hot-toast";
import './Charts.css'
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

const School = () => {
  
  const ProductStatus = localStorage.getItem('Status')
  const navigate = useNavigate()
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isChildOpen, setIsChildOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState("");
  const [isDataYearOpen, setIsDataYearOpen] = useState();
  // const API_URL = 'https://api-dashboard-brr3fliswa-uc.a.run.app';
  // const testURL = 'https://dev-api-dashboard-brr3fliswa-uc.a.run.app/api'
  const testURL = import.meta.env.MODE === 'development' ? import.meta.env.VITE_REACT_APP_API_BASE_URL_DEV : import.meta.env.VITE_REACT_APP_API_BASE_URL_PRD;
  const [isTimeFrameOpen, setIsTimeFrameOpen] = useState(false);
  const [isChildOpen2, setIsChildOpen2] = useState(false);
  const [studentOpen, setStudentOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  // const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const dropdownRef = useRef(null);
  const dropdownRef1 = useRef(null);
  const dropdownRef5 = useRef(null);
  // For Chart dfilter drop down
  const dropdownRef2 = useRef(null);
  const dropdownRef3 = useRef(null);
  const dropdownRef4 = useRef(null);
  // Package Dropdown
  const [packageSelected, setPackageSelected] = useState('Free Package');
  const [packageList, setPackageList] = useState(['Free Package', 'Premium Package']);
  const [packageOpen, setPackageOpen] = useState(false);
  const dropdownRefPackage = useRef(null);
  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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
  const [dataYearList, setDataYearList] = useState([])
  const [dataSelectedYear, setDataSelectedYear] = useState(null)
  // const [chartsData, setChartsData] = useState(datachartslinefromfile)
  // const [filteredChartData, setFilteredChartData] = useState(initialChartData)
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
  const [chartRevisedData, setChartRevisedData] = useState([{
    "SMASH Maths Cohort Average": 0.0,
    "Class Average": 0.0,
    "Student Average": 0.0,
    "week": 'Week 1'
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


  // useEffect(() => {
  //   const email = localStorage.getItem('userEmail')
  //   try {
  //     const token = localStorage.getItem('token')
  //     fetch(testURL + '/all_quiz_averages', {
  //       method: 'POST',
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Content-Type": "application/json",
  //         "Authorization": token ? `${token}` : null
  //       }
  //     })
  //       .then(response => response.json())
  //       .then(response => {
  //         setQuizesAverages(response.quizes.averages)
  //       })
  //   } catch (e) {
  //     // setDataLoadin(false)
  //   }

  // }, [])




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
    console.log(`yearList`, yearList[yearList.length-1],yearList)
    // setDataSelectedYear(yearList[yearList.length-1])
    setDataYearList(yearList);
    setReChartYearList(yearList)
  },[])
  // Rolling Averages API
  useEffect(() => {
    setChartDataLoading(true)
    const year = rechartSelectedYear || rechartYearList[rechartYearList.length - 1]
    const email =  selectedReChartTeacher || "";
    const username = rechartSelectedStudent || "";
    const type = "teacher";
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
          if(response?.rollingaverage.length === 0){
            setChartRevisedData([{
              "SMASH Maths Cohort Average": 0.0,
              "Class Average": 0.0,
              "Student Average": 0.0,
              "week": 'Week 1'
            }])
          }
          else{
            setChartRevisedData(response?.rollingaverage)
          }
          setChartDataLoading(false)
        })
    } catch (e) {
      setChartDataLoading(false)
    }
    // console.log(`Api Data fetch`, rechartSelectedYear, selectedReChartTeacher, rechartSelectedStudent)
  }, [rechartSelectedYear, selectedReChartTeacher, rechartSelectedStudent])
  useEffect(() => {
    setDataLoadin(true)
    const email = localStorage.getItem('userEmail')
    // fetch(API_URL + '/api/parent_dashboard', {teacher_dashboard
    // "email": "jbrogan5.208@lgflmail.org"
    let quizdata = [];
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
          quizdata = response?.quizes?.averages;
          setQuizesAverages(response.quizes.averages)
        })
        .then(() => {
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
                const quizes = response?.quizes || [[]]
                setQuizesData(quizes)
                const teacherFilters = quizes.map(x => x.email_address)
                let yearsFilters = quizes.map(x => x.year_name)
                const studentFilters = quizes?.map(({date_submitted,user_name, email_address, percentage_score}) => ({date_submitted,user_name, email_address, percentage_score}))
                yearsFilters = yearsFilters?.filter(item => item?.includes('Year'))
      
                let uniqueTeacherFilters = [...new Set(teacherFilters)]
                uniqueTeacherFilters = uniqueTeacherFilters.filter(value => value !== null)
                const uniqueYearsFilters = [...new Set(yearsFilters)].sort()
                setYearFilter(uniqueYearsFilters)
                setTeacherFilter(uniqueTeacherFilters)
                setChartTeacherList(uniqueTeacherFilters)
                setReChartTeacherList(uniqueTeacherFilters)
                // setSelectedReChartTeacher(uniqueTeacherFilters[0])
                
                // Filter Unique Year for chart
                const uniqueYears = new Set();
                quizes.forEach(item => {
                  const year = new Date(item?.date_submitted).getFullYear();
                  uniqueYears.add(year);
                });
                const sortedUniqueYears = Array.from(uniqueYears).sort((a, b) => a - b);
                let filteredYears = sortedUniqueYears.filter(year => year >= 2021);
                const currentYear = new Date().getFullYear();
                filteredYears = filteredYears.length == 0 ? [currentYear] : filteredYears
                console.log(`filteredYears`, filteredYears);
                setChartYearList(sortedUniqueYears);
                // setReChartYearList(sortedUniqueYears);
      
                // console.log('bilal--->',"Year 4 - SP Autumn Term Week 14 - Christmas Practice 01"?.match(/WEEK (\d+)$/i)[1])
                let arr = "Year 4 - SP Autumn Term Week 14 - Christmas Practice 01".split(' ')
                // console.log('bilal--->', parseInt(arr[arr?.findIndex((item) => item.toLowerCase() == 'Week'.toLowerCase()) + 1]))
      
                let filterData = quizes?.map(({ quiz_name, year_name, date_submitted }, index) => {
                  return {
                    year_name,
                    quiz_name,
                    index,
                    year : new Date(date_submitted).getFullYear(),
                    month : new Date(date_submitted).getMonth() + 1,
                    day : new Date(date_submitted).getDate(),
                    week: getWeekNumber(quiz_name)
                  }
                })
                setTableHeadersAll(filterData)
                applyFilter(uniqueTeacherFilters[0], uniqueYearsFilters[0], filterData, quizes,filteredYears[filteredYears.length - 1], quizdata)
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
        })
    } catch (e) {
      // setDataLoadin(false)
    }
  }, [])

  // Get User's Data from DB
  useEffect(() => {
    // setDataLoadin(true)
    const email = selectedTeacher;
    if(email){
      try {
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
            // setallUniqueUsers(response.data)
            // setDataLoadin(false)
          })
      } catch (e) {
        // setDataLoadin(false)
      }
    }
  }, [selectedTeacher])

    // Get User's Data For Charts from DB
    useEffect(() => {
      const email = selectedReChartTeacher;
      // setDataLoadin(true)
      if(email){
        try {
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
              // setallUniqueChartUsers(response.data)
              // setDataLoadin(false)
            })
        } catch (e) {
          // setDataLoadin(false)
        }
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

  function generateCompleteWeeksData(data) {
    const completeWeeksData = [];
    // Runs 52 time and return zero if week is not present in data
    for (let i = 1; i <= 52; i++) {
      const entry = data?.find(item => item?.week == i);
      const average = entry ? entry?.average : 0;
      completeWeeksData.push({ Week: `${i}`, Average: average?.toFixed(2) });
    }

    return completeWeeksData;
  }
  function combineData(data1, data2, data3) {
    const combinedData = [];
    for (let i = 1; i < 52; i++) {
      const week = data1[i]?.Week || i;
      const CohortAvg = data1[i]?.Average || 0; // Consider 0 if data1 is missing
      const ClassAvg = data2[i]?.Average || 0;
      const StudentAvg = data3[i]?.Average || 0;
  
      combinedData.push({
        'Week': week,
        'Smash Math Cohort Average': CohortAvg,
        'Class Average': ClassAvg,
        'Student Average': StudentAvg
      });
    }
    return combinedData;
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

  const applyFilter = (email, year, headers, data , yearData, quizdata) => {
    setDataLoadin(true)
    setSelectedYear(year)
    setSelectedTeacher(email)
    setDataSelectedYear(yearData)
    console.log(`dataSelectedYear`, yearData)

    const filterUserByTeacher = data?.filter(quiz => quiz?.email_address == email );
    const userName = filterUserByTeacher?.map(quiz => quiz?.user_name);
    const uniqueuserName = [...new Set(userName)]?.sort()
    setallUniqueUsers(uniqueuserName);

    const yearSelected = yearData;
    let filterHeader = headers.filter(({ year_name }) => year_name == year)
    let sortedHeader = filterHeader.sort((a, b) =>  b.week - a.week)
    // sortedHeader = [new Set(sortedHeader)]
    const ids = sortedHeader?.map(o => o.quiz_name)
    const filtered = filterHeader?.filter(({ quiz_name }, index) => !ids.includes(quiz_name, index + 1))
    const finalHeader = sortedHeader.filter(record => {
      if (yearSelected === record.year) {
        if ( record.month >= 9) {
          if(record.month == 9){
            const firstDayOfMonth = new Date(yearSelected, record.month - 1, 1); // Month is zero-based
            // Calculate the day of the week for the first day (0 = Sunday, 1 = Monday)
            const firstDayOfWeek = firstDayOfMonth.getDay();
            // Calculate the number of days to add to reach the first Monday (if it's not already Monday)
            const daysToAdd = (8 - firstDayOfWeek) % 7;
            // Create a new date by adding the days to the first day of the month
            const firstMondayOfMonth = new Date(yearSelected, record.month - 1, 1 + daysToAdd);
            const FirstMondayDate = new Date(firstMondayOfMonth).getDate();
            if(record.day >= FirstMondayDate) {
              return record
            }
          }
          else {
            return record;
          }
        }
      } else if (yearSelected + 1 === record.year && record.month < 9) {
        return record;
      }
    })
    // Get Unique Quiz name from records
    const uniqueQuizNames = finalHeader.reduce((accumulator, currentObj) => {
      const quizName = currentObj.quiz_name;
      // Check if the quiz_name is not already in the accumulator
      if (!accumulator.some(obj => obj.quiz_name === quizName)) {
          accumulator.push(currentObj);
      }
      return accumulator;
    }, []);
    // console.log('therer------>2', uniqueQuizNames)
    setTableHeaders(uniqueQuizNames)

    let filterEmailData = data.filter(({ email_address }) => email_address == email)
    // console.log(`teacher Data in Quiz Dashboard`, filterEmailData);
    let filterFinalData = filterEmailData.filter(({ year_name }) => year_name == year)
    // console.log('therer------>1', filterFinalData)
    const filteredRecords = filterFinalData.filter(record => {
      const submissionDate = new Date(record.date_submitted);
      const year = submissionDate.getFullYear();
      const month = submissionDate.getMonth() + 1; // Adding 1 because months are 0-indexed
      const day = submissionDate.getDate();
      if (yearSelected === year) {
        if ( month >= 9) {
          if(month == 9){
            const firstDayOfMonth = new Date(yearSelected, month - 1, 1); // Month is zero-based
            // Calculate the day of the week for the first day (0 = Sunday, 1 = Monday)
            const firstDayOfWeek = firstDayOfMonth.getDay();
            // Calculate the number of days to add to reach the first Monday (if it's not already Monday)
            const daysToAdd = (8 - firstDayOfWeek) % 7;
            // Create a new date by adding the days to the first day of the month
            const firstMondayOfMonth = new Date(yearSelected, month - 1, 1 + daysToAdd);
            const FirstMondayDate = new Date(firstMondayOfMonth).getDate();
            if(day >= FirstMondayDate) {
              return record
            }
          }
          else{
            return record
          }
        }
      } else if (yearSelected + 1 === year && month < 9) {
        return record;
      }
    });
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
    const QuizName = finalHeader?.map(item => item?.quiz_name) 
    const allQuizeData = quizesAverages ? quizesAverages : quizdata;
    const filteredQuizes = allQuizeData?.filter(quiz => QuizName?.includes(quiz?.quiz_name));
    const sumCohort = filteredQuizes?.reduce((accumulator, currentObj) => accumulator + currentObj?.average_score, 0);
    const AVGCohort = (sumCohort / (filteredQuizes?.length *100)) * 100;
    setCohortAverageAVG(AVGCohort ? `${AVGCohort?.toFixed(1)} %` : '-')
    
    // Calculate Class average Avg
    const sum = filteredRecords?.reduce((accumulator, currentObj) => accumulator + currentObj?.percentage_score, 0);
    const AVG = (sum / (filteredRecords?.length *100)) * 100;
    setClassAverageAVG( AVG ? `${AVG?.toFixed(1)} %`: "-") 
    const ordered = Object.keys(usersObject).sort().reduce(
      (obj, key) => {
        obj[key] = usersObject[key];
        return obj;
      },
      {}
    );

    setUsers(ordered)
    setDataLoadin(false)
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
    applyFilter(selectedTeacher, childName, tableHeadersAll, quizesData, dataSelectedYear)
  }

  const handleTeacherSelect = (childName) => {
    applyFilter(childName, selectedYear, tableHeadersAll, quizesData, dataSelectedYear)
  }

  const handlePackageSelect = (childName) => {
    setPackageSelected(childName)
    if(childName == 'Premium Package'){
      ToParentsDashboard()
    }
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
    filterChartaData ( childName, selectedChartTeacher, chartSelectedStudent, )
  }

  const handleDataYearSelect = (childName) =>{
    setDataSelectedYear(childName)
    applyFilter(selectedTeacher, selectedYear, tableHeadersAll, quizesData ,childName)
    // applyFilter ( childName, selectedChartTeacher, chartSelectedStudent)
  }
  // Revised Charts
  const handleReChartYearSelect = (childName) => {
    setReChartSelectedYear(childName)
  }
  const handleReChartTeacherSelect = (childName) => {
    setSelectedReChartTeacher(childName)
    const teacherFilters = quizesData.filter(x => x.email_address === childName)
    const students = teacherFilters.map(x => x.user_name).sort();
    const uniqueStudents =  [...new Set(students)]
    setReChartStudentList(uniqueStudents);
  }
  const handleReChartStudentSelect = (childName) => {
    setReChartSelectedStudent(childName)
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef5.current && !dropdownRef5.current.contains(event.target)) {
        setIsDataYearOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef5]);

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
    // Filter Data on base of Teacher, Quiz Year and Quiz name
    const filterQuizeTeacherYear = quizesData.filter((record) => record.email_address == selectedTeacher  && record.year_name == selectedYear && record.quiz_name === quiz);
    // Filter Data on base of Quize Submitted date
    const finalData = filterQuizeTeacherYear?.filter(record => {
      const submissionDate = new Date(record?.date_submitted);
      const year = submissionDate.getFullYear();
      const month = submissionDate.getMonth() + 1; // Adding 1 because months are 0-indexed
      const day = submissionDate.getDate();
      if (dataSelectedYear === year) {
        if ( month >= 9) {
          if(month == 9){
            const firstDayOfMonth = new Date(dataSelectedYear, month - 1, 1); // Month is zero-based
            // Calculate the day of the week for the first day (0 = Sunday, 1 = Monday)
            const firstDayOfWeek = firstDayOfMonth.getDay();
            // Calculate the number of days to add to reach the first Monday (if it's not already Monday)
            const daysToAdd = (8 - firstDayOfWeek) % 7;
            // Create a new date by adding the days to the first day of the month
            const firstMondayOfMonth = new Date(dataSelectedYear, month - 1, 1 + daysToAdd);
            const FirstMondayDate = new Date(firstMondayOfMonth).getDate();
            if(day >= FirstMondayDate) {
              return record
            }
          }
          else{
            return record
          }
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
      // if (!acc[obj.user_name]) {
      //   acc[obj.user_name] = obj;
      // }
      return acc;
    }, {});
    let filteredData = Object.values(uniqueObjectsById);
    filteredData = filteredData.filter(item => item.percentage_score > 0)
    const sumOfAllQuizes = filteredData.reduce((acc, item) => acc + item['percentage_score'], 0)
    return filteredData?.length === 0 ? '-' : `${(sumOfAllQuizes / filteredData.length).toFixed(1)} %`;
  }

  const getMarks = (user_name, quiz_name) => {
    let obj = quizesData?.filter((item) => item?.user_name === user_name && item?.quiz_name === quiz_name && item?.email_address == selectedTeacher)
    if(obj?.length === 0) return ''
    return obj != undefined ? `${obj[0]?.percentage_score?.toFixed(1)} %` : ''
  }
  const getMarkColor = (user_name, quiz_name) => {
    let obj = quizesData?.filter((item) => item?.user_name === user_name && item?.quiz_name === quiz_name && item?.email_address == selectedTeacher)
    if(obj?.length === 0) return ''
    return obj[0]?.percentage_score?.toFixed(1)
  }

  const getStudentaverage = (student) =>{
    // Filter Data on base of Teacher, Quiz Year and Student
    const filterQuizeTeacherYear = quizesData.filter((record) => record.email_address == selectedTeacher  && record.year_name == selectedYear && record.user_name == student);
    // Filter Data on base of Quize Submitted date
    const finalData = filterQuizeTeacherYear?.filter(record => {
      const submissionDate = new Date(record?.date_submitted);
      const year = submissionDate.getFullYear();
      const month = submissionDate.getMonth() + 1; // Adding 1 because months are 0-indexed
      const day = submissionDate.getDate();
      if (dataSelectedYear === year) {
        if ( month >= 9) {
          if(month == 9){
            const firstDayOfMonth = new Date(dataSelectedYear, month - 1, 1); // Month is zero-based
            // Calculate the day of the week for the first day (0 = Sunday, 1 = Monday)
            const firstDayOfWeek = firstDayOfMonth.getDay();
            // Calculate the number of days to add to reach the first Monday (if it's not already Monday)
            const daysToAdd = (8 - firstDayOfWeek) % 7;
            // Create a new date by adding the days to the first day of the month
            const firstMondayOfMonth = new Date(dataSelectedYear, month - 1, 1 + daysToAdd);
            const FirstMondayDate = new Date(firstMondayOfMonth).getDate();
            if(day >= FirstMondayDate) {
              return record
            }
          }
          else{
            return record
          }
        }
      } else if (dataSelectedYear + 1 === year && month < 9) {
        return record;
      }
    });
    // Filter Object with unique user_name and quiz_name
    const uniqueObjectsById = finalData.reduce((acc, obj) => {
      const key = `${obj.user_name}-${obj.quiz_name}`;
      if (!acc[key]) {
        acc[key] = obj;
      }
      return acc;
    }, {});
    let filteredData = Object.values(uniqueObjectsById);
    filteredData = filteredData.filter(item => item.percentage_score > 0)
    const sumOfAllQuizes = filteredData.reduce((acc, item) => acc + item['percentage_score'], 0)
    return filteredData?.length === 0 ? '-' :`${(sumOfAllQuizes / filteredData.length).toFixed(1)} %`;
  }

  const getStudentEffort = (student) =>{
    const studentData = quizesData.filter(item => item.user_name === student && item.year_name === selectedYear);
    const finalData = studentData?.filter(record => {
      const submissionDate = new Date(record?.date_submitted);
      const year = submissionDate.getFullYear();
      const month = submissionDate.getMonth() + 1; // Adding 1 because months are 0-indexed
      const day = submissionDate.getDate();
      if (dataSelectedYear === year) {
        if ( month >= 9) {
          if(month == 9){
            const firstDayOfMonth = new Date(dataSelectedYear, month - 1, 1); // Month is zero-based
            // Calculate the day of the week for the first day (0 = Sunday, 1 = Monday)
            const firstDayOfWeek = firstDayOfMonth.getDay();
            // Calculate the number of days to add to reach the first Monday (if it's not already Monday)
            const daysToAdd = (8 - firstDayOfWeek) % 7;
            // Create a new date by adding the days to the first day of the month
            const firstMondayOfMonth = new Date(dataSelectedYear, month - 1, 1 + daysToAdd);
            const FirstMondayDate = new Date(firstMondayOfMonth).getDate();
            if(day >= FirstMondayDate) {
              return record
            }
          }
          else{
            return record
          }
        }
      } else if (dataSelectedYear + 1 === year && month < 9) {
        return record;
      }
    });
    if(finalData?.length === 0) return '-';
    // Calculate the effort score for the student user_name
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
    const totalQuizzes = filteredData?.length;
    let completedQuizzes = filteredData?.filter(item => item?.status === 'submitted')?.length;
    // completedQuizzes = completedQuizzes.filter(item => item.percentage_score > 0)
    const effortScore = ( completedQuizzes / tableHeaders.length ) * 100;
    return effortScore === 0 ? '-' : `${effortScore.toFixed(1)} %`;
  }

  const UpdateFullName = (e, username ) =>{
    const full_name = e.target.value;
    const updatedData = quizesData.map(user => {
      if (user.user_name === username) {
        const modified =  { ...user, full_name: full_name }
        return modified;
      }
      return user;
    });
    setQuizesData(updatedData);
  }

  const UpdateFullNameDB = (e, username ) =>{
    const full_name = e.target.value;
    // const email = localStorage.getItem('userEmail')
    const isUserExists = quizesData.filter(user => user.user_name == username);
    const user_id = isUserExists[0]?.user_id;
    if(user_id){
      const email = selectedTeacher
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
            user_id,
            user_name:username,
            email
          })
        })
          .then(response => {
            // window.location.reload();
            const updatedData = quizesData.map(user => {
              if (user.user_name === username) {
                const modified =  { ...user, full_name: full_name }
                return modified;
              }
              return user;
            });
            setQuizesData(updatedData);
            toast.success("User name updated successful.");
          })
      } catch (e) {
        toast.error("Unable to update username, please try later.");
        toast.error("Unable to updated username, please try later.");
      }
    }
    else{
      toast.error("Unable to updated username, please try later.");
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
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const data = [...quizesData];
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
    
    const modifiedArray = data?.map(item => {
      const [year, month] = item?.date_submitted.split('-');
      return {
        ...item,
        date_submitted: [parseInt(year), months[parseInt(month) - 1]]
      };
    });
    // Class Quize AVG
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
    // Student AVG
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
    // console.log(`Quzies -098` ,filteredData.length , filteredClassData.length, filteredStudentDataByOneQuiz.length )
    // setFilteredChartData(ToSingleObj);
    
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
    const found = quizesData.filter(item => item.user_name == username)
    const studentName = found[0]?.full_name ? found[0]?.full_name : ""
    const fullName = studentName.trim() == username.trim() ? "" : studentName
    return fullName
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

  const GetAllQuizAVG = () =>{
    // const sum = tableHeaders
  }
 
  return (
    <>
    <div className="md:mx-20 my-6">
       {dataLoadin && <CustomLoader /> }
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
        <div className="flex flex-col items-center justify-center ml-48">
          <h4 className="text-[#17026b] font-bold text-xl">ANALYTICS Console - Free Schools Package</h4>
          <p className="text-[#17026b] text-xl">To upgrade to Premium Schools Package, please <a href="https://www.smashmaths.org/smash-maths-for-schools-premium-spiral-maths-package/" target="_blank" className="text-xl underline">click here</a></p>
        </div>
        {/* <h4 className="ml-[380px] text-[#17026b] items-center font-bold text-xl">ANALYTICS Console - Free Schools Package</h4> */}
        <h2 className="mt-6 text-[#17026b] font-bold text-xl">DATA ANALYSIS</h2>
        <div className="w-full flex justify-start items-center mb-10">
          <div className="w-full flex justify-start items-center gap-4 flex-row mt-6">
            {/* { (ProductStatus === "School - premium") && (
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
            )} */}
            {/* choose teacher dropdown */}
            <div className="grid gap-1">
              <label htmlFor="">Teacher</label>
              <ul className="list-reset flex justify-between flex-1 md:flex-none items-center font-[400] z-20">
                <li className="mr-3">
                  <div className="inline-block relative" ref={dropdownRef1}>
                    <button
                      onClick={() => setIsChildOpen(!isChildOpen)}
                      className="text-white focus:outline-none bg-[#17026b] px-4 py-2 rounded-lg"
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
                      <ul className="absolute right-0 mt-2 py-2 w-74 max-h-[400px] overflow-y-auto bg-white rounded-lg shadow-slate-800 shadow-md ml-4">
                        {teacherFilter?.map((childName, index) => (
                          <li
                            className={
                              index !== teacherFilter.length - 1
                                ? "border-b border-slate-400 cursor-pointer"
                                : "cursor-pointer"
                            }
                            key={index}
                            onClick={() => {
                              setIsChildOpen(!isChildOpen);
                              handleTeacherSelect(childName);
                            }}
                          >
                            <span className="block px-4 py-1 text-gray-800 hover:bg-indigo-500 hover:text-white">
                              {childName}
                            </span>
                          </li>
                        ))}
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
                      {dataSelectedYear ? `September ${dataSelectedYear} - August ${dataSelectedYear + 1}` : `September ${dataYearList[dataYearList.length - 1]} - August ${dataYearList[dataYearList.length - 1]+1}`}
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
                                  index !== childName?.length - 1
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
                    {isTimeFrameOpen &&
                      (
                        <ul className="absolute right-0 mt-2 py-2 w-60 bg-white rounded-lg shadow-slate-800 shadow-md">
                          {yearFilter?.map((childName, index) => {
                            return (
                              <>
                                <li
                                  className={
                                    index !== childName?.length - 1
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
          <MarkKey />
      </div>

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
            Boolean(tableHeaders?.length) && true && <div className="overflow-scroll " style={{ minHeight: '120px', maxHeight: 'calc(100vh - 270px)' }}>
              <table className="w-full text-sm text-left table-fixed rounded-lg shadow-sm shadow-slate-400 column-2-sticky">
                <thead className="text-xs text-white uppercase bg-[#17026b] h-36">
                  <tr className="items-center">
                    <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-40">User Name</th>
                    <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-40">Student Name</th>
                    {/* <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-96">Email</th> */}
                    <th scope="col" className="z-10 p-3 text-center bg-[#17026b] text-white w-40">Student Avg</th>
                    <th scope="col" className="z-10 p-3 text-center bg-[#17026b] text-white w-40">Effort Score</th>
                    {tableHeaders?.map(({ quiz_name }) => (<th scope="col" className="p-3 bg-[#17026b] text-white w-40"> {quiz_name}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {/* SMASH Maths Cohort  */}
                  <tr className="bg-white border border-[#17026b]  dark:border-gray-700 rounded-lg overflow-hidden">
                    <td className="sticky left-40 z-10 px-3 py-3 w-40 font-bold h-8">SMASH Maths Cohort Average</td>
                    <td className="sticky left-0 z-10 px-3 py-3 w-40 font-bold text-center"></td>
                    {/* <td className="sticky left-0 z-10 px-1 py-1 w-40 font-bold"></td> */}
                    <td className="sticky left-0 z-10 p-3 font-bold text-center">{cohortAverageAVG}</td>
                    <td className="sticky left-0 z-10 px-6 py-3 font-bold"></td>
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
                        {averages?.map(
                          (average, index) =>
                            data?.some((student) => student[`quiz${index + 1}`]) && (
                              <td className="p-3 text-center">
                                {average?.toFixed(2)}
                              </td>
                            )
                        )}
                      </>
                    )}
                  </tr>

                  {/* Class Avarage  */}
                  <tr className="bg-white border border-[#17026b]  dark:border-gray-700 rounded-lg overflow-hidden">
                    <td className="sticky left-40 z-10 px-3 py-3 w-40 font-bold h-8">Class Average</td>
                    <td className="sticky left-0 z-10 px-3 py-3 w-40 font-bold"></td>
                    {/* <td className="sticky left-0 z-10 px-1 py-1 w-40 font-bold"></td> */}
                    <td className="sticky left-0 z-10 p-3 font-bold text-center">{classAverageAVG}</td>
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
                  {/* {Object?.keys(users)?.length === 0 && 
                  <tr className="bg-white text-blue-800 border border-[#17026b]  dark:border-gray-700  rounded-lg overflow-hidden">
                    <td className="p-3"><input defaultValue={users[student][0]?.full_name} className="h-8" placeholder="Enter name here" onBlur={(e) => UpdateFullName(e, users[student][0]?.user_name ,users[student][0]?.email_address)}/></td> *0/}
                    <td className="p-5 text-center w-98s" rowSpan='3'></td> 
                    <td className="p-5 text-center w-98s" rowSpan='3'>No Data Avaiable.</td> 
                    <td className="p-5 text-center w-98s" rowSpan='3'></td>                  
                  </tr> }
                  {Object?.keys(users)?.map((student) => (
                    <tr className="bg-white text-blue-800 border border-[#17026b]  dark:border-gray-700  rounded-lg overflow-hidden">
                      <td className="p-3">{users[student][0]?.user_name}</td>
                      <td className="p-3"><input value={getFullName(users[student][0]?.user_name)} className="h-8 placeholder-red-600" placeholder="Enter first name" onChange={(e) => UpdateFullName(e, users[student][0]?.user_name)} onBlur={(e) => UpdateFullNameDB(e, users[student][0]?.user_name)}/></td>
                      {/* <td className="p-3">{users[student][0]?.full_name}</td> *9/}
                      <td className="p-3 text-center">{getStudentaverage(users[student][0]?.user_name)}</td>
                      <td className="p-3 text-center">{getStudentEffort(users[student][0]?.user_name)}</td>
                      {tableHeaders?.map(({ quiz_name }) => (<td className="p-3 text-white w-40 text-center" style={{ backgroundColor: checkMarksColor(getMarkColor(student, quiz_name)) }}>{`${getMarks(student, quiz_name)} %`}</td>))}
                      {allUniqueUsers?.map((student) => (
                  <tr className="bg-white text-blue-800 border border-[#17026b] dark:border-gray-700  rounded-lg overflow-hidden">
                    <td className="p-3">{student?.user_name}</td>
                    <td className="p-3"><input value={getFullName(student.user_name)} className="h-8 placeholder-red-600" placeholder="Enter first name" onChange={(e) => UpdateFullName(e, student?.user_name)} onBlur={(e) => UpdateFullNameDB(e, student?.user_name)}/></td>
                    {/* <td className="p-3 w-40 font-bold">{getFullName(users[student][0]?.user_name)}</td> */}
                    {allUniqueUsers?.map((student) => (
                      <tr className="bg-white text-blue-800 border border-[#17026b] dark:border-gray-700  rounded-lg overflow-hidden">
                        <td className="p-3">{student}</td>
                        <td className="p-3"><input placeholder="Enter name" value={getFullName(student)} className="h-8 text-[#ED1C24] placeholder-[#ED1C24] bold-placeholder"  onChange={(e) => UpdateFullName(e, student)} onBlur={(e) => UpdateFullNameDB(e, student)}/></td>
                        {/* <td className="p-3 w-40 font-bold">{getFullName(users[student][0]?.user_name)}</td> */}
                        <td className="p-3 text-center w-40 font-bold">{getStudentaverage(student)}</td>
                        <td className="p-3 text-center w-40 font-bold">{getStudentEffort(student)}</td>
                        {tableHeaders?.map(({ quiz_name }) => (<td className="p-3 text-white w-40 text-center" style={{ backgroundColor: checkMarksColor(getMarkColor(student, quiz_name)) }}>{getMarks(student, quiz_name)}</td>))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>}
            {tableHeaders?.length === 0 && true && <div className="overflow-scroll" style={{ minHeight: '100px', maxHeight: 'calc(100vh - 250px)' }}>
            <table className="min-h-74 w-full text-sm text-left table-fixed rounded-lg shadow-sm shadow-slate-400 column-2-sticky">
              <thead className="text-xs text-white uppercase bg-[#17026b] h-40">
                <tr className="items-center">
                  <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-40">User Name</th>
                  <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-96">Student Name</th>
                  <th scope="col" className="z-10 p-3 bg-[#17026b] text-white w-40">Effort Score</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border border-[#17026b]  dark:border-gray-700 rounded-lg overflow-hidden">
                  {/* <td className="sticky left-0 z-10 px-6 py-3 w-40 font-bold"></td> */}
                  <td className="sticky left-40 z-10 px-6 h-16 py-3 w-40 font-bold">SMASH Maths Cohort Average</td>
                  <td className="sticky left-0 z-10 px-6 py-3 w-40 font-bold">-</td>
                  <td className="sticky left-0 z-10 px-6 py-3 w-40 font-bold">-</td>
                </tr>
                {/* SMASH Maths Cohort  */}
                {allUniqueUsers?.length > 0 && allUniqueUsers?.map((student) => (
                  <tr className="bg-white text-blue-800 border border-[#17026b] dark:border-gray-700  rounded-lg overflow-hidden">
                    <td className="p-3">{student}</td>
                    <td className="p-3"><input value={getFullName(student)} className="h-8  text-[#ED1C24] placeholder-[#ED1C24] bold-placeholder" placeholder="Enter name" onChange={(e) => UpdateFullName(e, student)} onBlur={(e) => UpdateFullNameDB(e, student)}/></td>
                    <td className="p-3 w-40 font-bold">-</td>
                  </tr>
                ))}
                {allUniqueUsers?.length == 0 &&  (
                  <tr className="bg-white text-blue-800 border border-[#17026b]  dark:border-gray-700  rounded-lg overflow-hidden">
                  <td className="p-3 text-center h-5" rowSpan='3'  style={{ height: '5rem' }}></td> 
                  <td className=" h-28">No Data Avaiable.</td> 
                  <td className="text-center h-5" rowSpan='3'  style={{ height: '5rem' }}></td>   
                </tr>
                )}
              </tbody>
            </table>
          </div>}  
        </div>
        
        {/* table ends here */}
        {/* ----------------------------------------------------------- */}
        
        <h2 className="my-6 text-[#17026b] font-bold text-xl mt-24">CHART ANALYSIS</h2>
        <div className="w-full flex justify-start items-center gap-4 flex-row m-5">
          {/* choose Year dropdown */}
          <div className="grid gap-1">
            <label htmlFor="">Academic Year</label>
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
                    {selectedReChartTeacher ? selectedReChartTeacher : "Select Teacher"}
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
                                index !== childName?.length - 1
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
                                index !== childName?.length - 1
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
          {chartRevisedData?.length > 0 && <RevisedLineChart chart={chartRevisedData}/>}
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

export default School;




// "type": "module",
//   "scripts": {
//     "dev": "vite --host 0.0.0.0 --port 8080",
//     "build": "vite build",
//     "preview": "vite preview",
//     "start": "vite preview --host 0.0.0.0 --port 8081"
//   },