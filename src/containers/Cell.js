import React from 'react';
import bomb from '../images/bomb.png';
import flag from '../images/flag.png';


class Cell extends React.Component {

    colors = [
        '',
        '#0000FA',
        '#4B802D',
        '#DB1300',
        '#202081',
        '#690400',
        '#457A7A',
        '#1B1B1B',
        '#7A7A7A',
    ];

    bombImage = <img src={bomb} alt="bomb"/>;
    flagImage = <img src={flag} alt="flag"/>;
    computRet = () => {
        if (!this.props.cell.isRevealed){
            return this.props.cell.isFlagged ? this.flagImage : "";
        }
        document.getElementById(this.props.keyNum).className = "revealed";
        document.getElementById(this.props.keyNum).style.color = this.colors[this.props.cell.neighbour];
        if (this.props.cell.isMine) {
            return this.bombImage;
        }
        if(this.props.cell.neighbour === 0 ){
            return null;
        }
        return this.props.cell.neighbour;
    };
    render() {
        return(
            <td onClick={this.props.onClick} onContextMenu={this.props.onContextMenu} className="game-cell" id={this.props.keyNum} data-row={this.props.cell.row} data-col={this.props.cell.col} key={this.props.keyNum}>{this.computRet()}</td>
        );
    }
}
export default Cell;