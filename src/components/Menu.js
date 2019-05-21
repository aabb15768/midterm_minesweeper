import React from 'react';
import TitleBar from './TitleBar';
import FolderBar from './FolderBar';
import InfoBar from './InfoBar';



class Menu extends React.Component {
    render() {
        return(
            <React.Fragment>
                <TitleBar height={this.props.height} width={this.props.width}></TitleBar>
                <FolderBar height={this.props.height} width={this.props.width}></FolderBar>
                <InfoBar height={this.props.height} width={this.props.width} onClick={this.props.onClick}></InfoBar>
            </React.Fragment>
        );
    }
}
export default Menu;