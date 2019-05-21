import React from 'react';



class FolderBar extends React.Component {
    render() {
        return(
            <tr>
                <td className="menu" id="folder-bar" colSpan={this.props.width}>
                    <div id="folder1"><a href="https://github.com/aabb15768/midterm_minesweeper/blob/master/README.md" target="blank">Read Me </a></div>
                    <div id="folder2"><a href="https://github.com/aabb15768/midterm_minesweeper/tree/master/src" target="blank">Source Code</a></div>
                </td>
            </tr>
        );
    }
}
export default FolderBar;