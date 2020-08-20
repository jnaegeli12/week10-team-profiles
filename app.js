const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const validateAnswer = async (input) => {
    if (!input) {
        return "Please enter a response.";
    }
    return true;
};

const startQuestions = [
    {
        type: "list",
        message: "Add a new team member?",
        name: "role",
        choices: [
            "Intern",
            "Engineer",
            "Manager",
            "No, I'm done."
        ]
    }
]

const internQuestions = [
    {
        type: "input",
        message: "Intern Name",
        name: "name",
        validate: validateAnswer
    },
    {
        type: "input",
        message: "Intern ID Number",
        name: "id",
        validate: validateAnswer
    },
    {
        type: "input",
        message: "Intern Email Address",
        name: "email",
        validate: validateAnswer
    },
    {
        type: "input",
        message: "Intern School",
        name: "school",
        validate: validateAnswer
    }
]

const engineerQuestions = [
    {
        type: "input",
        message: "Engineer Name",
        name: "name",
        validate: validateAnswer
    },
    {
        type: "input",
        message: "Engineer ID Number",
        name: "id",
        validate: validateAnswer
    },
    {
        type: "input",
        message: "Engineer Email Address",
        name: "email",
        validate: validateAnswer
    },
    {
        type: "input",
        message: "Engineer Github Profile Name",
        name: "github",
        validate: validateAnswer
    }
]

const managerQuestions = [
    {
        type: "input",
        message: "Manager Name",
        name: "name",
        validate: validateAnswer
    },
    {
        type: "input",
        message: "Manager ID Number",
        name: "id",
        validate: validateAnswer
    },
    {
        type: "input",
        message: "Manager Email Address",
        name: "email",
        validate: validateAnswer
    },
    {
        type: "input",
        message: "Manager Office Number",
        name: "officeNumber",
        validate: validateAnswer
    }
]

function newMember() {
    inquirer.prompt(startQuestions).then(answers => {

        switch (answers.role) {
            case "Intern":
                newIntern();
                break;

            case "Engineer":
                newEngineer();
                break;

            case "Manager":
                newManager();
                break;

            case "No, I'm done.":
                console.log("Finished entering team members.");
                break;
        
            default: 
                newMember();
        }
    })
}

function newIntern() {

    inquirer.prompt(internQuestions).then(answers => {
        
        const intern = new Intern (answers.name, answers.id, answers.email, answers.school);
        employees.push(intern);

        writeToFile();
        newMember();
    });

}

function newEngineer() {

    inquirer.prompt(engineerQuestions).then(answers => {
        
        const engineer = new Engineer (answers.name, answers.id, answers.email, answers.github);
        employees.push(engineer);

        writeToFile();
        newMember();
    });

}

function newManager() {

    inquirer.prompt(managerQuestions).then(answers => {
        
        const manager = new Manager (answers.name, answers.id, answers.email, answers.officeNumber);
        employees.push(manager);

        writeToFile();
        newMember();
    });

}

function writeToFile() {
    fs.writeFile(outputPath, render(employees), function(err) {
        if (err) {
            console.log(err);
        }
    });
}

newMember();