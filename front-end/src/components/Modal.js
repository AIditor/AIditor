import React, { Component } from 'react';
import {Storage} from './Storage';
import styled from 'styled-components';
import {Zoom, Button} from '@material-ui/core';

class Modal extends Component {

  confirmMsg = () => {
    return this.props.msg.split('\n').map(function(item, key){
      return(<span key={key}>{item}<br/></span>)
    })
  }

  render(){
    const _confirmMsg = this.confirmMsg();

    return(
      <Storage.Consumer>
      {
        store => (<>
          {
            this.props.pop ? <StOpacityBack/> : null
          }
          <Zoom in={store.curMode === "origin" || 
                    store.curMode === "backToMain" || 
                    store.curMode === "copy" ||
                    store.curMode === "error"} 
                    mountOnEnter unmountOnExit>
          <StModalCont>
            <StConfirmCont>
              <div className="top-deco"/>
              <StMsgCont>{_confirmMsg}</StMsgCont>
              <StBtnCont>
              {
                this.props.isOrg ? 
                <Button id="no" variant="outlined" onClick={store.modalConfirm}>확인</Button>
                :
                <>
                  <Button id="yes" variant="outlined" onClick={store.modalConfirm}>예</Button>
                  <Button id="no" variant="outlined" onClick={store.modalConfirm}>아니요</Button>
                </>
              }
              </StBtnCont>
            </StConfirmCont>
          </StModalCont>
          </Zoom>
        </>)
      }
      </Storage.Consumer>
    )
  }
} export default Modal;

const StOpacityBack = styled.div`
  position: fixed;
  z-index: 100;
  background-color: black;
  opacity: 0.8;
  width: 100%;
  height: 100%;
`

const StModalCont = styled.div`
  position: fixed;  
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const StConfirmCont = styled.div`
  font-family: 'Jua', sans-serif;
  z-index: 200;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  height: 30%;
  background-color: white;
  border-radius: 15px;
  opacity: 1;

  .top-deco{
    width: 100%;
    height: 20%;
    background: linear-gradient(to right, #66ffff 22%, #ff99cc 100%);
    border: 2px solid white;
    border-radius: 15px 15px 0 0;
    box-sizing: border-box;
  }
`

const StMsgCont = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem 0 1rem;
`

const StBtnCont = styled.div`
  display: flex;
  align-self: stretch;
  justify-content: space-around;
  margin: 0 1rem 1rem 1rem;
  
  .MuiButton-label{
    /* font-family: 'Noto Sans KR', sans-serif; */
    font-family: 'Jua', sans-serif;
    color: #8989f5;   
  }
`