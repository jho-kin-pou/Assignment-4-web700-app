/*********************************************************************************
*  WEB700 – Assignment 04
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Jeffery Ho Kin Pou
*  Student ID: jho-kin-pou (151600236)
*  Date: 6 July 2024
*
*  Online (vercel) Link: https://vercel.com/jeffery-hos-projects-8acdb51e
*
********************************************************************************/ 


var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();

const path = require('path');
const collegeData = require('./modules/collegeData');

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/students/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'addStudent.html'));
});

app.post('/students/add', (req, res) => {
    collegeData.addStudent(req.body)
        .then(() => {
            res.redirect('/students');
        })
        .catch(error => {
            console.error('Error adding student: ', error);
            res.status(500).send('Error adding student');
        });
});

app.get('/students', (req, res) => {
    const course = req.query.course;
    if (course) {
        collegeData.getStudentsByCourse(course).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ message: err });
        });
    } else {
        collegeData.getAllStudents().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ message: err });
        });
    }
});

app.get('/tas', (req, res) => {
    collegeData.getTAs().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: err });
    });
});

app.get('/courses', (req, res) => {
    collegeData.getCourses().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: err });
    });
});

app.get('/student/num', (req, res) => {
    collegeData.getStudentByNum(req.params.num).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: err });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/about.html'));
});

app.get('/htmlDemo', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/htmlDemo.html'));
});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

collegeData.initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log("server listening on port: " + HTTP_PORT);
    });
}).catch((err) => {
    console.log(`Failed to initialize data: ${err}`);
});