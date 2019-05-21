import React from 'react';
import mineMenuIrcon from '../images/mine-menu-icon.png';
import windowControls from '../images/window-controls.png';



class TitleBar extends React.Component {
    render() {
        return(
            <tr>
                <td className="menu" id="window-title-bar" colSpan={this.props.width}>
                    <div id="window-title"><img src={mineMenuIrcon} alt="mineMenu"/> Minesweeper</div>
                    <div id="window-controls"><img src={windowControls} alt="windowControl"/></div>
                </td>
            </tr>
        );
    }
}
export default TitleBar;