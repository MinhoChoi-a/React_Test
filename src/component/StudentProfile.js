import React, { useState } from 'react';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import './css/studentProfile.css'

import getAverage from '../util/getAverage'

const StudentProfile = (props) => {

    const [ displayGradeList, setDisplayGradeList ] = useState(false)
    const [ updateTags, setUpdateTags ] = useState(true)

    const handleGradeList = () => {
        setDisplayGradeList(!displayGradeList);
    }

    const handleTagList = (event) => {
        
        if(event.key === 'Enter') {
            
            props.data.tags.push(event.target.value);

            event.target.value = '';
            
            var newStudentList = props.studentList
            
            var index = newStudentList.findIndex(
                student => (student['firstName'] + student['lastName']) === props.data.firstName+props.data.lastName)
            
            newStudentList[index] = props.data;

            props.updateStudentList(newStudentList);
            setUpdateTags(!updateTags)
        }        
    }

    return(
            <div className="card">

                <div className="image">
                    <img src={props.data.pic}/>
                </div>

                <div className="info">
                    <h1>{(props.data.firstName).toUpperCase()} {props.data.lastName.toUpperCase()}</h1>
                    <p>Email: {props.data.email}</p>
                    <p>Company: {props.data.company}</p>
                    <p>Skill: {props.data.skill}</p>
                    <p>Average: {getAverage(props.data.grades)}%</p>                    

                    <table className="gradeTable" style={{display: displayGradeList === false ? 'none' : 'block'}}>
                    {
                        props.data.grades.map((grade, i) => (
                            <tr><td>Test {i + 1}:</td><td className="gradeInfo">{grade}%</td></tr>                           
                        ))
                    }
                    </table>
                    
                    <div className="tagList">
                    {
                        props.data.tags.map((tag) => (
                            <div className="tag"> {tag} </div>
                        ))
                    }
                    </div>

                    <div className="addTag">
                        <input className="inputTag" type="text" placeholder="Add a tag" 
                        onKeyPress={(event) => handleTagList(event)}/>
                    </div>
                    
                </div>

                <div className="grades">
                    <button onClick={() => handleGradeList()}>{displayGradeList === false ? <AddIcon style={{fontSize:'1em'}}/> : <RemoveIcon style={{fontSize:'1em'}}/>} </button>
                </div>

            </div>
        )
}

export default StudentProfile