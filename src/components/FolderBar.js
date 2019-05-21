import React from 'react';



class FolderBar extends React.Component {
    render() {
        return(
            <tr>
                <td className="menu" id="folder-bar" colSpan={this.props.width}>
                    <div id="folder1"><a href="" target="blank">Read Me </a></div>
                    <div id="folder2"><a href="" target="blank">Source Code</a></div>
                </td>
            </tr>
        );
    }
}
export default FolderBar;