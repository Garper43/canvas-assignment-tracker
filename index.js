async function updateAssignments() {
    var courses = await getCourses(window.location.hostname);
    var body = document.querySelector('body');

    //empty page
    body.innerHTML = '';
    body.style.whiteSpace = 'pre';

    for(const course of courses) {
        var courseAssignemnts = await getAssignments(window.location.hostname, course.id);

        for(const assignment of courseAssignemnts) {
            console.log(assignment);
            body.innerHTML = body.innerHTML + `${assignment.name} ${assignment.due_at.slice(5, 10)}` + '\n';
        } 
    }
}

async function getCourses(domain) {
    var courses = await getData(`https://${domain}/api/v1/courses/`);
    var validCourses = [];

    for(const course of courses) { 
        if(course.name != undefined) {
            validCourses.push(course);
        }
    }
    
    return validCourses;
}

async function getAssignments(domain, courseID) {
    return await getData(`https://${domain}/api/v1/courses/${courseID}/assignments?order_by=due_at&bucket=upcoming`);
}

async function getData(link) {
    var data;

    await fetch(link)
    .then((response) => {
        data = response.json();
    }).then((data) => {
        returnBoard = data;
    });

    return data;
}

updateAssignments();