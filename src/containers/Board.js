import React from 'react';
import Menu from '../components/Menu';
import Cell from './Cell';
import deadFace from '../images/dead-face.png';
import coolFace from '../images/cool-face.png';
import smileyFace from '../images/smiley-face.png';

// var timeElapsed;
var elapsedTime;
var timerId;

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          cellArr: [],
          tableWidth: 0,
          mineCount: this.props.mineNum,
          win: false,
          height: 0,
          width: 0,
        }
    };

    componentWillMount() {
        console.log("willMount");

        this.setState({cellArr: this.initCellArr(this.props.height, this.props.width, this.props.mineNum)});   
        this.setState({
            height: this.props.height,
            width: this.props.width,
        });
    }

    componentDidMount() {
        console.log("didMount");
        var boardEl = document.getElementById('board');
        this.setState({tableWidth: this.props.width*28});
        boardEl.style.width = this.state.tableWidth;
        this.setState({
            height: this.props.height,
            width: this.props.width,
        });
        document.getElementById('bomb-counter').innerText = this.props.mineNum.toString().padStart(3, '0');
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
            this.setState({
                win: false,
                mineCount: nextProps.mineNum,
                height: nextProps.height,
                width: nextProps.width,
            });
            this.setState({
                cellArr: this.initCellArr(nextProps.height, nextProps.width, nextProps.mineNum),

            });
            this.changeMode(nextProps.height, nextProps.width);
            document.getElementById('bomb-counter').innerText = nextProps.mineNum.toString().padStart(3, '0');
        }
    }

    initCellArr = (height, width, mineNum) => {
        let arr =[];
        elapsedTime = 0;
        clearInterval(timerId);
        timerId = null;

        for (let i = 0; i < height; i++) {
            arr.push([]);
            for (let j = 0; j < width; j++) {
                arr[i][j] = {
                    row: i,
                    col: j,
                    isMine: false,
                    neighbour: 0,
                    isRevealed: false,
                    isEmpty: false,
                    isFlagged: false,
                };
            }
        }
        arr = this.buildMine(arr, height, width, mineNum);
        arr = this.getNeighbourMineNum(arr, height, width);
        return arr;
    };

    buildMine = (arr, height, width, mineNum) => {
        let randomx, randomy, mineBuilt = 0;

        while (mineBuilt < mineNum) {
            randomx = this.getRandomNumber(height);
            randomy = this.getRandomNumber(width);
            if (!(arr[randomx][randomy].isMine)) {
                arr[randomx][randomy].isMine = true;
                mineBuilt++;
            }
        }

        return arr;
    };

    getRandomNumber = (range) => {
        return Math.floor((Math.random() * 1000000) + 1) % range;
    };

    getNeighbourMineNum = (arr, height, width) => {
        let updatedArr = arr;
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (updatedArr[i][j].isMine !== true) {
                    let mineNum = 0;
                    const area = this.traverseBoard(updatedArr[i][j].row, updatedArr[i][j].col, updatedArr, height, width);
                    area.map(value => {
                        if (value.isMine) {
                            mineNum++;
                        }
                        return null;
                    });
                    if (mineNum === 0) {
                        updatedArr[i][j].isEmpty = true;
                    }
                    updatedArr[i][j].neighbour = mineNum;
                }
            }
        }

        return updatedArr;
    };

    traverseBoard = (row, col, cellArr, height, width) => {
        const targetArr = [];

        if (row > 0) {
            targetArr.push(cellArr[row - 1][col]);
        }

        if (row < height - 1) {
            targetArr.push(cellArr[row + 1][col]);
        }

        if (col > 0) {
            targetArr.push(cellArr[row][col - 1]);
        }

        if (col < width - 1) {
            targetArr.push(cellArr[row][col + 1]);
        }

        if (row > 0 && col > 0) {
            targetArr.push(cellArr[row - 1][col - 1]);
        }

        if (row > 0 && col < width - 1) {
            targetArr.push(cellArr[row - 1][col + 1]);
        }

        if (row < height - 1 && col < width - 1) {
            targetArr.push(cellArr[row + 1][col + 1]);
        }

        if (row < height - 1 && col > 0) {
            targetArr.push(cellArr[row + 1][col - 1]);
        }

        return targetArr;
    };

    renderBoard = (arr) => {
        return arr.map((datarow, index) => {
            return( 
                <tr key={index}>
                    {datarow.map((cell) => {
                        return (
                            <React.Fragment key={cell.row * datarow.length + cell.col}>
                                <Cell
                                    onClick={(e) => this.cellClick(cell.row, cell.col, e)}
                                    onContextMenu={(e) => this.contextMenu(e, cell.row, cell.col)}
                                    cell={cell}
                                    keyNum={cell.row * datarow.length + cell.col}
                                    restartFlag={this.state.restartFlag}
                                />
                            </React.Fragment>);
                    })}
                </tr>
            )
        });

    }

    cellClick = (row, col, elemenmt) => {
        let win = false;
        if (!timerId) setTimer();

        if (this.state.cellArr[row][col].isRevealed) return null;

        if (this.state.cellArr[row][col].isMine) {
            this.gamOver(elemenmt);
        }

        let updatedArr = this.state.cellArr;
        updatedArr[row][col].isFlagged = false;
        updatedArr[row][col].isRevealed = true;

        if (updatedArr[row][col].isEmpty) {
            updatedArr = this.recoverAdj(row, col, updatedArr);
        }

        this.setState({
            cellArr: updatedArr,
            gameWon: win,
        });
    };

    contextMenu(e, row, col) {
        e.preventDefault();
        let updatedData = this.state.cellArr;
        let mines = this.state.mineCount;
        let win = false;

        // check if already revealed
        if (updatedData[row][col].isRevealed) return;

        if (updatedData[row][col].isFlagged) {
            updatedData[row][col].isFlagged = false;
            mines++;
        } else {
            updatedData[row][col].isFlagged = true;
            mines--;
        }

        document.getElementById('bomb-counter').innerText = mines.toString().padStart(3, '0');

        if (mines === 0) {
            const mineArray = this.getMines(updatedData);
            const FlagArray = this.getFlags(updatedData);
            win = (JSON.stringify(mineArray) === JSON.stringify(FlagArray));
            if (win) {
                this.recoverBoard();
                document.getElementById('resetImg').src=`${coolFace}`;
                alert("You Win");
            }
        }

        this.setState({
            cellArr: updatedData,
            mineCount: mines,
            win: win,
        });
    }

    getMines(arr) {
        let mineArray = [];

        arr.map(datarow => {
            datarow.map((cell) => {
                if (cell.isMine) {
                    mineArray.push(cell);
                }
                return null;
            });
            return null;
        });

        return mineArray;
    }

    getFlags(arr) {
        let flagArray = [];

        arr.map(datarow => {
            datarow.map((cell) => {
                if (cell.isFlagged) {
                    flagArray.push(cell);
                }
                return null;
            });
            return null;
        });

        return flagArray;
    }

    gamOver = (elemenmt) => {
        document.getElementById('resetImg').src=`${deadFace}`;
        elemenmt.target.style.backgroundColor = 'red';
        this.recoverBoard();
    };

    recoverBoard = () => {
        let updatedData = this.state.cellArr;
        updatedData.map((datarow) => {
            datarow.map((cell) => {
                cell.isRevealed = true;
                return null;
            });
            return null;
        });
        this.setState({
            cellArr: updatedData
        })
    };

    recoverAdj = (row, col, arr) => {
        let area = this.traverseBoard(row, col, arr, this.state.height, this.state.width);
        area.map(value => {
            if (!value.isRevealed && (value.isEmpty || !value.isMine)) {
                arr[value.row][value.col].isRevealed = true;
                if (value.isEmpty) {
                    this.recoverAdj(value.row, value.col, arr);
                }
            }
            return null;
        });
        return arr;
    };

    restart = () => {
        clearInterval(timerId);
        document.getElementById('resetImg').src=`${smileyFace}`;
        this.setState({cellArr: this.initCellArr(this.props.height, this.props.width, this.props.mineNum)});
        for(let i = 0; i < this.props.height; i++) {
            for(let j = 0; j < this.props.width; j++) {
                if(document.querySelector(`[data-row="${i}"][data-col="${j}"]`) !== null) {
                    document.querySelector(`[data-row="${i}"][data-col="${j}"]`).className = "game-cell";
                    document.querySelector(`[data-row="${i}"][data-col="${j}"]`).style.backgroundColor = "#C0C0C0";
                }
                var temp = this.state.cellArr[i][j];
                temp.isRevealed = false;
            }
        }
        document.getElementById('bomb-counter').innerText = this.props.mineNum.toString().padStart(3, '0');
    };

    changeMode = (height, width) => {
        clearInterval(timerId);
        document.getElementById('resetImg').src=`${smileyFace}`;
        for(let i = 0; i < height; i++) {
            for(let j = 0; j < width; j++) {
                if(document.querySelector(`[data-row="${i}"][data-col="${j}"]`) !== null) {
                    document.querySelector(`[data-row="${i}"][data-col="${j}"]`).className = "game-cell";
                    document.querySelector(`[data-row="${i}"][data-col="${j}"]`).style.backgroundColor = "#C0C0C0";
                }
            }
        }
        document.getElementById('bomb-counter').innerText = this.props.mineNum.toString().padStart(3, '0');
    }

    render() {
        return(
            <table id="board">
                <tbody>
                    <Menu height={this.props.height} width={this.props.width} onClick={() => this.restart()}></Menu>
                    {this.renderBoard(this.state.cellArr)}
                </tbody>
            </table>
        );
    }
}
export default Board;

function setTimer () {
    timerId = setInterval(function(){
      elapsedTime += 1;
      document.getElementById('timer').innerText = elapsedTime.toString().padStart(3, '0');
    }, 1000);
};