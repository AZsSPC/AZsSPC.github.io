let startMatrix, currentMatrix, width = 0, height = 0, commands;
let mW = document.getElementById('mW'), mH = document.getElementById('mH'),
    matrixTable = document.getElementById('matrixTable'),
    initMS = document.getElementById('initMS'),
    stepCommand = document.getElementById('stepCommand'),
    initMatrixc = document.getElementById('initMatrix'),
    stepMatrixc = document.getElementById('stepMatrix');

function initMatrixSize(){
    initMS.hidden = true;
    initMatrixc.hidden = false;
    stepMatrixc.hidden = true;
    width = mW.value;
    height = mH.value;
    let mt = '';
    for(let h = 0; h < height; h++){
        mt += '<tr>';
        for(let w = 0; w < width; w++) mt += '<td id="me_i' + w + '_j' + h + '" contenteditable="true">0</td>';
        mt += '</tr>';
    }
    matrixTable.innerHTML = mt;
}

function stepMatrix(){
    let command = stepCommand.value.replaceAll(/\s/g, '').toLowerCase().match(/([rc])(\d+)([\/\-+>*])(-?\d+)/);
    stepCommand.value = '';
    command[2] = parseInt(command[2]) - 1;
    command[4] = parseInt(command[4]);
    console.log(command)
    if(command.length !== 5) return;
    commands.push(command[0]);
    if(command[1] === 'r') switch(command[3]){
        case '-':
            currentMatrix[command[2]] = currentMatrix[command[2]].map((a, i) => a - currentMatrix[command[4] - 1][i]);
            break;
        case '+':
            currentMatrix[command[2]] = currentMatrix[command[2]].map((a, i) => a + currentMatrix[command[4] - 1][i]);
            break;
        case '*':
            currentMatrix[command[2]] = currentMatrix[command[2]].map((a, i) => a * command[4]);
            break;
        case '/':
            currentMatrix[command[2]] = currentMatrix[command[2]].map((a, i) => a / command[4]);
            break;
        case '>':
            currentMatrix.splice(command[4] - 1, 0, currentMatrix.splice(command[2], 1)[0]);
            break;
    } else switch(command[3]){
        case '-':
        case '+':
        case '*':
        case '/':
        case '>':
    }
    for(let h = 0; h < height; h++) for(let w = 0; w < width; w++) document.getElementById('me_i' + w + '_j' + h).innerText = currentMatrix[h][w];

}

function initMatrix(){
    initMatrixc.hidden = true;
    stepMatrixc.hidden = false;
    commands = new Array(0);
    startMatrix = new Array(height);
    for(let h = 0; h < height; h++){
        startMatrix[h] = new Array(width);
        for(let w = 0; w < width; w++){
            let value = document.getElementById('me_i' + w + '_j' + h).innerText.replaceAll(/[^\d-]/g, '').replaceAll(/(?<=.)-/g, '');
            startMatrix[h][w] = value.length > 0 ?parseInt(value) :0;
        }
    }
    currentMatrix = matrixClone(startMatrix);
}

function matrixClone(oldM){
    let mh = oldM.length;
    let mw = oldM[0].length;
    let newM = new Array(mh);
    for(let h = 0; h < mh; h++){
        newM[h] = new Array(mw);
        for(let w = 0; w < mw; w++)
            newM[h][w] = oldM[h][w];
    }
    console.log(newM);
    return newM;
}