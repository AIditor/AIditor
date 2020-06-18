import React, { Component } from 'react';
import styled from 'styled-components';
import { Storage } from '../../Storage';
import { IconButton, Zoom } from '@material-ui/core';
import { RotateLeft, RotateRight } from '@material-ui/icons';

class RotateMenu extends Component {

	constructor(props) {
		super(props);
		this.state = {
			rotation: 0,
			rotate_style: '',
		}

		this.rotate = this.rotate.bind(this);
		this.rotateleft = this.rotateleft.bind(this);
	}

	rotate() {
		let newRotation = this.state.rotation + 90;
		if (newRotation >= 360) {
			newRotation = - 360;
		}
		this.setState({
			rotation: newRotation,
		})
	}

	rotateleft() {
	}


// <<<<<<< HEAD
//     render() {
//         return(
//             <Storage.Consumer>
//                 {
//                     store => (
//                         <StRotateMenuCont>
//                             <StRotateCont id="left" rotatemode = {store.rotatemode} onClick = {store.changeRotateMode}>
//                             {/* <StRotateCont id="left" rotatemode = {store.rotatemode} onClick = {this.rotateleft}> */}
//                             <RotateLeft style={{fontSize:"40px"}}/>
//                             <label>left</label>
//                             {/* <label>reverse</label> */}
//                             </StRotateCont>
//                             <StRotateCont id="right" rotatemode = {store.rotatemode} onClick = {store.changeRotateMode}>
//                             <RotateRight style={{fontSize:"40px"}}/>
//                             <label>right</label>
//                             {/* <label>clock</label> */}
//                             </StRotateCont>
//                         </StRotateMenuCont>
//                     )
//                 }
//             </Storage.Consumer>
//         )
//     }
// =======
	render() {
		return (
			<Storage.Consumer>
				{
					store => (
						<StRotateMenuCont>
							<Zoom in={true} timeout={500}>
							<StRotateCont id="left" rotatemode={store.rotatemode} onClick={store.changeRotateMode}>
								<RotateLeft fontSize='large'/>
                                <label>left</label>
							</StRotateCont>
							</Zoom>
							<Zoom in={true} timeout={500}>
							<StRotateCont id="right" rotatemode={store.rotatemode} onClick={store.changeRotateMode}>
								<RotateRight fontSize='large'/>
                                <label>right</label>
							</StRotateCont>
							</Zoom>
						</StRotateMenuCont>
					)
				}
			</Storage.Consumer>
		)
	}
// >>>>>>> 79dd74004cf429583099fb586bcb898877b1eb9e
}

export default RotateMenu;

const StRotateMenuCont = styled.div`
    font-family: 'Single Day', cursive;
    ${'' /* display: flex; */}
    flex-direction: column;
    text-align: center;
    align-items: center;
    ${'' /* background: black; */}
    ${'' /* background: linear-gradient(to right, #66ffff 22%, #ff99cc 100%); */}
    border-radius: 8px 8px 0 0;
    width: 100%;
    ${'' /* height: 39%; */}
    z-index: 2;
`

const StRotateCont = styled(IconButton)`
    display: inline-block;
    ${'' /* background: white; */}

    .MuiIconButton-label{
        display: flex;
        flex-direction:column;
        color: white;
        margin: 5px;        
    }

    label {
        fontSize: 15px;
        font-family: 'Jua', sans-serif;
        padding-top: 2px;
    }

    color: ${props => props.rotatemode === props.id ? "gray" : "white"};
    width: 4em;
    height: 4em;

    margin: 20px;

    

    ${'' /* 
    .MuiIconButton-label{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    label{
        padding-top: 2px;
        font-size: 60%;
    } */}
`