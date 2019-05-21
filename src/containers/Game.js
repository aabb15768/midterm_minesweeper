import React from 'react';
import easy from '../images/easy.png';
import medium from '../images/medium.png';
import hard from '../images/hard.png';
import Board from './Board';



class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 9,
            width: 9,
            mineNum: 10,
        }
    };

    click9 = () => {
        this.setState({
            height: 9,
            width: 9,
            mineNum: 10,
        })
    }

    click16 = () => {
        this.setState({
            height: 16,
            width: 16,
            mineNum: 40,
        })
    }

    click30 = () => {
        this.setState({
            height: 26,
            width: 26,
            mineNum: 110,
        })
    }

    render() {
        return(
            <div>
                <div className="flex-container">
                    <div className="game-board">
                        <Board height={this.state.height} width={this.state.width} mineNum={this.state.mineNum}></Board>
                    </div>
                </div>
                <section id="footer">
                    {/* <div id="start"><span id="startbuttongraphic" ></span></div> */}
                    <div id="size-btns">
                        <div id="size-btns"><button><span id="startbuttongraphic" ></span></button></div> 
                        <div id="size-btns"><button id="size-9" onClick={() => this.click9()}><img src={easy} alt="temp"/> Easy</button></div> 
                        <div id="size-btns"><button id="size-16" onClick={() => this.click16()}><img src={medium} alt="temp"/> Medium</button></div> 
                        <div id="size-btns"><button id="size-30" onClick={() => this.click30()}><img src={hard} alt="temp"/> Hard</button></div>
                    </div>
                    {/* <div id="clock"><em>"Shift + Click"</em><strong/> to toggle <img src={flag} alt="temp"/></div> */}
                </section>
            </div>
        );
    }
}

export default Game;