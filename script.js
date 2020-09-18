// Initialise Variables
const passwordOptionsForm = document.getElementById("openPWForm");
const pwLengthChoice = document.getElementById("formpwquestion");
const lowercaseChoice = document.getElementById("lowercase");
const uppercaseChoice = document.getElementById("uppercase");
const numericChoice = document.getElementById("numeric");
const specialcharChoice = document.getElementById("specialcharacters");
const generatePasswordBtn = document.getElementById("generatePWBtn");
const finalpassword = document.getElementById("password");



const outputValueFunc = {
    lowercaseFuncOutput: createLowercaseFunc,
    uppercaseFuncOutput: createUppercaseFunc,
    numericFuncOutput: createNumericFunc,
    specialcharactersFuncOutput: createSpecialCharacterFunc
};


passwordOptionsForm.addEventListener("click", function (event) {
    document.getElementById("passwordCriteriaForm").style.display = "block";
    document.getElementById("mainscreen").style.display = "none";
    document.getElementById("pwForm").reset();
});


generatePasswordBtn.addEventListener("click", (beginpwcreation) => {

    chosenPWLengthOutput = parseInt(pwLengthChoice.value);

     

    // log the entered password length and type to console
    console.log("Password Length: ", chosenPWLengthOutput, " Type: ", typeof chosenPWLengthOutput);


    const reqLowercase = lowercaseChoice.checked;
    const reqUppercase = uppercaseChoice.checked;
    const reqNumeric = numericChoice.checked;
    const reqSpecialCharacters = specialcharChoice.checked;

    // log the types req to the console
    console.log(" Lowercase: ", reqLowercase, "\n", "Uppercase: ", reqUppercase, "\n", "Numeric: ", reqNumeric, "\n", "Special Charatcer: ", reqSpecialCharacters);

    finalpassword.value = writePassword(reqLowercase, reqUppercase, reqNumeric, reqSpecialCharacters, chosenPWLengthOutput);
    console.log(finalpassword.value.length);
});

    function writePassword(lowercaseFuncOutput, uppercaseFuncOutput, numericFuncOutput, specialcharactersFuncOutput, chosenPWLengthOutput){
        let createdPW = "";
        var reqPWLengthOutcome;
        var reqChoicesOutcome;
        const reqChoiceArray = [{lowercaseFuncOutput}, {uppercaseFuncOutput}, {numericFuncOutput}, {specialcharactersFuncOutput}];
        
        // log the array to the console
        console.log(reqChoiceArray);

        const choiceCount = lowercaseFuncOutput + uppercaseFuncOutput + numericFuncOutput + specialcharactersFuncOutput;

        const reqChoiceValues = reqChoiceArray.filter((choice)=> Object.values(choice)[0]);

        // log the choices from array which are true
        console.log(reqChoiceValues);

        // show alert if there are no types selected
        if (reqChoiceValues.length === 0){
            document.getElementById("alertRedChoiceReq").style.display = "block";
            reqChoicesOutcome = false;
        }
else{
    document.getElementById("alertRedChoiceReq").style.display = "none";
    reqChoicesOutcome = true;
}
       

        // show alert if the PW Length is not between 8 and 128 or if Number is NaN
        if (chosenPWLengthOutput < 8 || chosenPWLengthOutput > 128 || Number.isNaN(chosenPWLengthOutput)){
                document.getElementById("alertRedLengthInvalid").style.display = "block";
                reqPWLengthOutcome = false;
        }
        else{
            document.getElementById("alertRedLengthInvalid").style.display = "none";
            reqPWLengthOutcome = true;
        }
               
        
       if(reqPWLengthOutcome == true && reqChoicesOutcome == true){ 
for (let i = 0; i < chosenPWLengthOutput; i +=  reqChoiceValues.length){
    reqChoiceValues.forEach(type => {
        const choiceFunc = Object.keys(type)[0];
        createdPW += outputValueFunc[choiceFunc]();
        console.log(createdPW);
    });
    
    document.getElementById("passwordCriteriaForm").style.display = "none";
    document.getElementById("mainscreen").style.display = "block";
    
}

const finalPWOutput = createdPW.slice(0, chosenPWLengthOutput);

return finalPWOutput;
       }


        }








// Create random characters by type using charset

function createLowercaseFunc() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

function createUppercaseFunc() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

function createNumericFunc() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

function createSpecialCharacterFunc() {
    const createSpecialCharacters = '!@#$%^&*';
    return createSpecialCharacters[Math.floor(Math.random() * createSpecialCharacters.length)];
};


