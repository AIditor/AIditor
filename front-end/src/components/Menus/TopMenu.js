import React, { Component } from 'react';
import {Storage} from '../Storage';
import styled from 'styled-components';
import {IconButton, Zoom} from '@material-ui/core';
import {SaveAlt, KeyboardBackspace, Undo, Redo, } from '@material-ui/icons';


class TopMenu extends Component {
  componentDidMount(){
    document.getElementById('save').addEventListener(
      'click',
      () => {
        // var stage = document.getElementsByTagName('canvas')
        // var dataURL = stage.toDataURL("image/png");
        const store = this.props.store
        const _stage = store.stageRef.getStage()
        const _ratio = store.stageHistory[store.historyIdx].ratio
        const dataURL = _stage.toDataURL({ pixelRatio: _ratio });
        this.downloadURI(dataURL, `new ${store.imgFileHistory[store.historyIdx].name}`);
      },
      false
    );
  }
  downloadURI = (uri, name) => {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  render(){
    return(
      <Storage.Consumer>
      {
        store => (
          <StTopMenuCont disabled={store.curMode !== ''}>
            <IconButton id="backToMain" onClick={store.changeMode}><KeyboardBackspace/></IconButton>
            {/* <img src="/AIditorBigCrop.png" alt="" style={{height : '80%'}}/> */}
            <div className="mid">
              <Zoom in={store.historyIdx !== 0 && store.curMode !== 'rotate'}>
                <IconButton id="undo" onClick={store.changeHistory} disabled={store.curMode !== ''} ><Undo style={{color: 'grey'}}/></IconButton>
              </Zoom>
              <Zoom in={(store.historyIdx !== store.imgHistory.length - 1) && (store.imgHistory.length !== 0 )}>
                <IconButton id="redo" onClick={store.changeHistory} disabled={store.curMode !== ''} ><Redo style={{color: 'grey'}}/></IconButton>  
              </Zoom>
            </div>

            <Zoom in={store.curMode === ''}>
              <IconButton id="save" disabled={store.curMode !== ''}><SaveAlt style={{color: 'grey'}}/></IconButton>
            </Zoom>
          </StTopMenuCont>
        )
      }
      </Storage.Consumer>
    )
  }

} export default TopMenu;

const StTopMenuCont = styled.div`

  /* z-index: 100; */
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* background-color: #ffffff; */
  width: 100%;
  height: 10%;

  .MuiTouchRipple-root{
    color: white;
  }

  .mid{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg{
    color: grey; /* white */
  }
  #undo .MuiSvgIcon-root, #redo .MuiSvgIcon-root, #save .MuiSvgIcon-root{
    color: ${props => props.disabled ? 'rgba(0,0,0,0)' : 'grey'}; /* white */
  }
`