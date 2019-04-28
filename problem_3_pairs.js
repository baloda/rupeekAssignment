var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('testdata.in')
});

TEST_CASES = 0;
test_case_number = 0
lineReader.on('line', function (line) {
    if (!TEST_CASES) {
        TEST_CASES = line
    } else {
        findPairSolution(++test_case_number, line)
    }
});

function findPairSolution(test_case_number, number){
    solutions = []
    half = Math.floor(number/2);
    for(let a = half; a <= number; a++) {
        let A = a.toString()
        
        for (let ln = A.length-1; ln>=0; ln = ln-1){
            let B = A.substr(0, ln) + A.substr(ln + 1)
            if (parseInt(A) + parseInt(B) == number && !solutions.includes(A)){
                solutions.push(A, B)
            }
        }
    }
    console.log(`TEST #${test_case_number}`)
    console.log(`${solutions.length/2} pairs found`)
    solutions.forEach((element, index)=> {
        if (index%2==0)
            console.log(solutions[index], solutions[index+1])
    });
}