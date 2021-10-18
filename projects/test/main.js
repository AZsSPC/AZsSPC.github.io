const max_val = 10;
let m_size = 4;
let tab = document.getElementById("as");
let matrix;

function recreate(){
    matrix = new Array(m_size);
    tab.innerHTML = m_size + "*" + m_size + "\n";
    for(let r = 0; r < m_size; r++){
        matrix[r] = new Array(m_size);
        for(let c = 0; c < m_size; c++){
            matrix[r][c] = Math.floor((Math.random() * 2 - 1) * max_val);
            tab.innerHTML += matrix[r][c] + "\t";
        }
        tab.innerHTML += "\n";
    }
    tab.innerHTML += "\ndelta: " + Determinant(matrix);
}

function Determinant(A){
    let m_size = A.length, B = [], denom = 1, exchanges = 0;
    for(let i = 0; i < m_size; ++i){
        B[i] = [];
        for(let j = 0; j < m_size; ++j) B[i][j] = A[i][j];
    }
    for(let i = 0; i < m_size - 1; ++i){
        let maxN = i, maxValue = Math.abs(B[i][i]);
        for(let j = i + 1; j < m_size; ++j){
            let value = Math.abs(B[j][i]);
            if(value > maxValue){
                maxN = j;
                maxValue = value;
            }
        }
        if(maxN > i){
            let temp = B[i];
            B[i] = B[maxN];
            B[maxN] = temp;
            ++exchanges;
        }else if(maxValue === 0) return 0;
        let value1 = B[i][i];
        for(let j = i + 1; j < m_size; ++j){
            let value2 = B[j][i];
            B[j][i] = 0;
            for(let k = i + 1; k < m_size; ++k) B[j][k] = (B[j][k] * value1 - B[i][k] * value2) / denom;
        }
        denom = value1;
    }
    return exchanges % 2 ?-B[m_size - 1][m_size - 1] :B[m_size - 1][m_size - 1];
}