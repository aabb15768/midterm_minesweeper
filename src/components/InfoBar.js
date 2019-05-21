import React from 'react';
import smileyFace from '../images/smiley-face.png';



class InfoBar extends React.Component {
    render() {
        return(
            <tr>
                <td className="menu" colSpan={this.props.width}>
                    <section id="status-bar">
                        <div id="bomb-counter">000</div>
                        <div id="reset"><img id="resetImg" src={smileyFace} alt="smile face" onClick={this.props.onClick}/></div>
                        <div id="timer">000</div>
                    </section>
                </td>
            </tr>
        );
    }
}
export default InfoBar;