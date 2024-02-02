var numSelected = null;
var tileSelected = null;

var errors = 0;

const sudokuBoards = [
    ["--74916-5", "2---6-3-9", "-----7-1-", "-586----4", "--3----9-", "--62--187", "9-4-7---2", "67-83----", "81--45---"],
    ["--35--49-", "76----5-1", "-54-736-9", "-1----3--", "--7261---", "2-6-9--14", "63285----", "4----28-6", "8-5--72--"],
    ["-34--6-8-", "527-186-3", "-6---94-2", "--5-4----", "39-8--5--", "-4---2936", "1--684-2-", "2-----81-", "---2713--"],
    ["--9-1--7-", "--7-9-814", "85-6---23", "-----315-", "5---2-36-", "-26951-48", "-82-7963-", "-95---2--", "---1---9-"],
    ["--7-3-2-5", "3--5628-4", "-2--841-3", "4-82---1-", "----5--27", "9721--3-8", "--14--536", "--4--5-8-", "68-------"],
    ["------5-8", "24-5---3-", "-57632---", "57-4--26-", "--81-9---", "4--76--1-", "-8--769-2", "963254---", "--58--346"],
    ["-817--93-", "4-9821--6", "27----4-1", "76-----28", "----57---", "----83-79", "12--643-7", "9-71-82-5", "3--------"],
    ["71-----5-", "-3-2-5--1", "--4-3-9-2", "5-8-6-2-7", "-63712--9", "2---89--3", "14--57-28", "6-7-4----", "-8-12---4"]
];

const sudokuSolutions = [
    ["387491625", "241568379", "569327418", "758619234", "123784596", "496253187", "934176852", "675832941", "812945763"],
    ["123586497", "768429531", "954173628", "519748362", "347261985", "286395714", "632854179", "471932856", "895617243"],
    ["934526187", "527418693", "861739452", "615943278", "392867541", "748152936", "153684729", "276395814", "489271365"],
    ["249318576", "637295814", "851647923", "974863152", "518724369", "326951748", "482579631", "195436287", "763182495"],
    ["847931265", "319562874", "526784193", "458273619", "163859427", "972146358", "791428536", "234695781", "685317942"],
    ["316947528", "249518637", "857632194", "571483269", "638129475", "492765813", "184376952", "963254781", "725891346"],
    ["681745932", "439821756", "275396481", "763419528", "892657143", "514283679", "128564397", "947138265", "356972814"],
    ["712894356", "936275841", "854631972", "598463217", "463712589", "271589463", "149357628", "627948135", "385126794"]  
];

var random_number = Math.floor(Math.random() * sudokuBoards.length);

var board = sudokuBoards[random_number];
var solution = sudokuSolutions[random_number];

window.onload = function() {
    setGame();
}

function setGame() {
    for (let i=1; i<=9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.classList.add("number");
        number.addEventListener("click", selectNumber);
        document.getElementById("digits").appendChild(number);
    }

    for (let r=0; r<9; r++) {
        for (let c=0; c<9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");   
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            document.getElementById("board").appendChild(tile);
        }
    }
}

function selectNumber() {
    if (numSelected) {
        numSelected.classList.remove("number-selected");
    };
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText === "") {
            row = Number(this.id[0]);
            column = Number(this.id[2]);
            if (solution[row][column] == numSelected.id) {
                this.innerText = numSelected.id;
            } else {
                errors += 1;
                document.getElementById("error-count").innerText = errors;
                this.innerText = numSelected.id;
                this.classList.add("error-blink");
                setTimeout(() => {
                    this.classList.remove("error-blink");
                    this.innerText = "";
                }, "600");               
            }  
        }
    }
}

