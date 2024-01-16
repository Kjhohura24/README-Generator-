const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

const licenseOptions = [
    {
        name: 'MIT',
        badge: 'https://img.shields.io/badge/License-MIT-blue.svg'
    },
    {
        name: 'GPL',
        badge: 'https://img.shields.io/badge/License-GPL-blue.svg'
    },
    {
        name: 'Apache',
        badge: 'https://img.shields.io/badge/License-Apache-blue.svg'
    },
    {
        name: 'GNU',
        badge: 'https://img.shields.io/badge/License-GNU-blue.svg'
    },
];
// array of questions for user
const questions = [
{
    type: 'input',
    name: 'title',
    message: 'What is the name of your Project?'
},

{
    type: 'input',
    name: 'description',
    message: 'Project Description:' 
},
{
    type: 'input',
    name: 'installation',
    massage: 'Please explain the installation for you Project:'
},
{
    type: 'input',
    name: 'usage', 
    message: 'Please provide usage instructions for your Project:'
},
{
    // License 
    type: 'list',
    name: 'license',
    message: 'Please choose a license for your project',
    // choices wants an array of strings 
    // maps property maps each element in the const licenseOptions using the name property
    // option => function that takes an object and returns the value of its name property
    choices: licenseOptions.map(option => option.name)
}, 
{
    // Contributing
    type: 'input',
    name: 'contributing',
    message: 'Please provide contribution guidelines for your Project:',
},
{
    // Tests
    type: 'input',
    name: 'tests',
    message: 'Please provide test instructions for your Project:'
}, 
{
    // Questions 1 GitHub Username
    type: 'input',
    name: 'githubUsername',
    message: 'Which is your GitHub username?'
},
{
    // Questions 2 Email address
    type: 'input',
    name: 'email',
    message: 'Which is your email address?',
}
];


// function to write README file
function writeToFile(fileName, data) {

    const filePath = path.join(__dirname, fileName);

    fs.watchFile(filePath, data, err => {
        if(err) {
            console.error(err);
        } else { 
            console.log(`Successfully generated ${fileName}`);
        }
        });
    
}

// function to initialize program
function init() {
    inquirer.prompt(questions)
    // then generates a markdown file using the user's answers 
    .then(answers => {
        console.log('Generating README...');
        const markdown = generateMarkdown(answers);
        // write it to a file using writeToFile function. 
        writeToFile('README.md', markdown);
    })
    // if there is an error during the process, it is logged to the console
    .catch(err => {
        console.error(err);
    });

}

// function call to initialize program
init();
