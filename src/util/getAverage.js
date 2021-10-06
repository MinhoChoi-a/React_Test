const getAverage = (grades) => {
    var sum = 0;

    grades.map(grade => {
        sum += parseInt(grade)
    })

    var average = sum/grades.length
    
    return average
}

export default getAverage


