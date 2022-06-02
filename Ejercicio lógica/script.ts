import fs from 'fs';

const matches = fs.readFileSync('file/time_series_covid19_deaths_US.csv', {
    encoding: 'utf-8'
}).split('\n')
    .map((row: string): string[] => {
        return row.split(',');
    });

let Country_Region: string[] = [];
let Province_State: any[] = [];
let Province_State_count: number = 0;
let Pupulation_count: number = 0;

for (let i = 1; i < matches.length; i++) {
    Country_Region.push(matches[i][6]);
}

let result = Country_Region.filter((item, index) => {
    return Country_Region.indexOf(item) === index;
});

let count: number = 0;
let percentage: number = 0;
while (count < result.length) {
    for (let entry of matches) {
        if (entry[6] === result[count]) {
            Province_State_count += Number(entry.pop());
            if (entry[5] == '') {
                Pupulation_count += Number(entry[12]);
            } else {
                Pupulation_count += Number(entry[13]);
            }
        }
    }

    if (Pupulation_count == 0) {
        percentage = 0;
    } else {
        percentage = (Province_State_count / Pupulation_count) * 100;
    }

    Province_State.push([result[count], Province_State_count, Pupulation_count, percentage]);
    Province_State_count = 0;
    Pupulation_count = 0;
    count++;
}
function percentageOfDeathsByState() {
    for (let entry of Province_State) {
        console.log('En ' + entry[0] + ' murió el ' +
            entry[3].toFixed(4) + '% de ' + entry[2] + ' habitantes.');
    }
}

function stateLowestAccumulatedToDate() {
    let min: number = Province_State[0][1];
    let minName: string = "";
    for (let entry of Province_State) {
        if (min > entry[1]) {
            min = entry[1];
            minName = entry[0]
        }
    }
    console.log("El estado con el menor número de muertes acumuladas hasta la fecha es "
        + minName + " con " + min + " muertes.");
}

function stateHighestAccumulatedToDate() {
    let max: number = Province_State[0][1];
    let maxName: string = "";
    for (let entry of Province_State) {
        if (max < entry[1]) {
            max = entry[1];
            maxName = entry[0]
        }
    }
    console.log("El estado con el mayor número de muertes acumuladas hasta la fecha es "
        + maxName + " con " + max + " muertes.");
}

function stateMostAffected() {
    let max: number = Province_State[0][3];
    let maxName: string = "";
    for (let entry of Province_State) {
        if (max < entry[3]) {
            max = entry[3];
            maxName = entry[0]
        }
    }
    console.log("El estado más afectado es " + maxName + " con " +
        max.toFixed(4) + " % de muertes con respecto al total de su población.");
}

stateLowestAccumulatedToDate();
stateHighestAccumulatedToDate();
console.log("----------------------------------------------------------------------");
percentageOfDeathsByState();
console.log("----------------------------------------------------------------------");
stateMostAffected();