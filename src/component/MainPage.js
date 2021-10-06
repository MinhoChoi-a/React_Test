import React, { useState, useEffect } from 'react';

import { getAll } from '../util/fetch'

import StudentProfile from './StudentProfile'

import './css/mainPage.css'

const MainPage = () => {
    
    const [studentList, setStudentList] = useState([])

    const [studentListDisplay, setStudentListDisplay] = useState([])

    const [nameKeyword, setNameKeyword] = useState('')
    
    const [tagKeyword, setTagKeyword] = useState('')

    useEffect(() => {

        async function fetchData() {

            const fetchData = await getAll();

            const list = fetchData.students;
            
            list.map(object => (
                object.tags = []
            ))

            setStudentList(list);

            setStudentListDisplay(list)
        }

        fetchData();

    }, [])
    
    const updateStudentListTag = (data) => {

        setStudentList(data);
    }

    const searchStudentList = (target) => {

        var searchResult = []
        
        if(target.className === 'searchName'){
            
            setNameKeyword(target.value)
            
            if(tagKeyword != '') {

            searchResult =        
            studentList
            .filter(student => (student['firstName'] +' '+ student['lastName']).toLowerCase().includes(target.value)) 
            .filter(student => (student['tags'].includes(tagKeyword)))

            }
            
            else {
            searchResult =        
            studentList
            .filter(student => (student['firstName'] +' '+ student['lastName']).toLowerCase().includes(target.value))            
            }
        }

        if(target.className === 'searchTag'){

            setTagKeyword(target.value)
            
            if(target.value != '') {

            searchResult =        
            studentList
            .filter(student => (student['firstName'] +' '+ student['lastName']).toLowerCase().includes(nameKeyword)) 
            .filter(student => (student['tags'].includes(target.value)))
            
            }


            else {
            searchResult =        
            studentList
            .filter(student => (student['firstName'] +' '+ student['lastName']).toLowerCase().includes(nameKeyword)) 

            }

        }
        
        setStudentListDisplay(searchResult);    
    }


    if(studentList === null) {
        return (
            <div className="container">
                <h1>Data loading...</h1>
            </div>
        )
    }

    return (

        <div className="container">
            
            <input className="searchName" type="text" placeholder="Search by name" 
                        onChange={(event) => searchStudentList(event.target)}/>

            <input className="searchTag" type="text" placeholder="Search by tag" 
                        onChange={(event) => searchStudentList(event.target)}/>

            {studentListDisplay.map((profile, i) => (
                <StudentProfile data = {profile} updateStudentList= {updateStudentListTag} i={i} studentList={studentList}/>
            ))}
            
        </div>

    )
}

export default MainPage