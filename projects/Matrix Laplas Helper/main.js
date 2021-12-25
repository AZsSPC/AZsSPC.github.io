let startMatrix,
	currentMatrix,
	commands,
	width       = 0,
	height      = 0,
	mW          = document.getElementById('mW'),
	mH          = document.getElementById('mH'),
	matrixTable = document.getElementById('matrixTable'),
	initMS      = document.getElementById('initMS'),
	stepCommand = document.getElementById('stepCommand'),
	initMatrixc = document.getElementById('initMatrix'),
	stepMatrixc = document.getElementById('stepMatrix'),
	solutionTeX = document.getElementById('solutionTeX');

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

function userStepMatrix(){
	let command = parseCommand(stepCommand.value);
	if(command.length < 4){
		return;
	}
	stepCommand.value = '';
	console.log(command)
	commands.push(command[0]);
	currentMatrix = stepMatrix(currentMatrix, command);
	for(let h = 0; h < height; h++) for(let w = 0; w < width; w++) document.getElementById('me_i' + w + '_j' + h).innerText = currentMatrix[h][w];

}

function generateSolution(){
	let TeX = '';
	let temp = matrixClone(startMatrix);
	TeX += matrixTeX(temp) + '\n';
	for(let i = 0; i < commands.length; i++) TeX += '\\overset{\\mbox{' + commands[i] + '}}{\\sim}' + matrixTeX(temp = stepMatrix(temp, parseCommand(commands[i]))) + '\n';
	solutionTeX.innerText = '$$' + TeX + '$$';
	console.log(TeX);
	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	let filename = prompt("What do you want to name the file?", 'matrix_sol_by_az');
	if(filename){
		createNDownload(filename + '.tex', TeX);
	}
}

function matrixTeX(matrix){
	let ret = '';
	let h = matrix.length;
	for(let i = 0; i < h; i++) ret += matrix[i].join(' & ') + ' \\\\\n';
	return '\\begin{pmatrix}\n' + ret + '\\end{pmatrix}';
}

function parseCommand(str){
	let command = str.replaceAll(/\s/g, '').toLowerCase().match(/([rc])(\d+)([\/\-+>*])(-?\d+)/);
	command[2] = parseInt(command[2]) - 1;
	command[4] = parseInt(command[4]);
	return command;
}

function stepMatrix(matrix, command){
	if(command[1] === 'c'){
		matrix = matrixTransponate(matrix);
	}
	switch(command[3]){
	case '-':
		matrix[command[2]] = matrix[command[2]].map((a, i) => a - matrix[command[4] - 1][i]);
		break;
	case '+':
		matrix[command[2]] = matrix[command[2]].map((a, i) => a + matrix[command[4] - 1][i]);
		break;
	case '*':
		matrix[command[2]] = matrix[command[2]].map((a, i) => a * command[4]);
		break;
	case '/':
		matrix[command[2]] = matrix[command[2]].map((a, i) => a / command[4]);
		break;
	case '>':
		matrix.splice(command[4] - 1, 0, matrix.splice(command[2], 1)[0]);
	}
	if(command[1] === 'c'){
		matrix = matrixTransponate(matrix);
	}
	return matrix;
}

function initMatrix(){
	initMatrixc.hidden = true;
	stepMatrixc.hidden = false;
	commands = new Array(0);
	startMatrix = new Array(height);
	for(let h = 0; h < height; h++){
		startMatrix[h] = new Array(width);
		for(let w = 0; w < width; w++){
			let value = document.getElementById('me_i' + w + '_j' + h)
			.innerText
			.replaceAll(/[^\d-]/g, '')
			.replaceAll(/(?<=.)-/g, '');
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
		for(let w = 0; w < mw; w++) newM[h][w] = oldM[h][w];
	}
	return newM;
}

function matrixTransponate(oldM){
	console.log(oldM);
	let mw = oldM.length;
	let mh = oldM[0].length;
	let newM = new Array(mh);
	for(let h = 0; h < mh; h++){
		newM[h] = new Array(mw);
		for(let w = 0; w < mw; w++) newM[h][w] = oldM[w][h];
	}
	return newM;
}