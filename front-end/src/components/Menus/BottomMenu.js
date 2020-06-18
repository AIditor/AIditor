import React, { Component } from 'react';
import styled from 'styled-components';
import {Storage} from '../Storage';
import {IconButton, } from '@material-ui/core';
import {Photo, Crop, Cached, FlipToFront, Tune, NaturePeople, Face, LocalOffer} from '@material-ui/icons';

class BottomMenu extends Component {

  render(){
    return(
      <Storage.Consumer>
      {
        store => (
          <StBottomMenuCont>
            <StButtonCont id="origin" mode={store.curMode} onClick={store.changeMode}>
              <Photo fontSize='large' style={{color: 'darkgrey'}}/>
              <label>원본</label>
            </StButtonCont>

            <StButtonCont id="crop" mode={store.curMode} onClick={store.changeMode}>
              <Crop fontSize='large' style={{color: 'darkgrey'}}/>
              <label>자르기</label>
            </StButtonCont>

            <StButtonCont id="rotate" mode={store.curMode} onClick={store.changeMode}>
              <Cached fontSize='large' style={{color: 'darkgrey'}}/>
              <label>회전</label>
            </StButtonCont>

            <StButtonCont id="filter" mode={store.curMode} onClick={store.changeMode}>
              <FlipToFront fontSize='large' style={{color: 'darkgrey'}}/>
              <label>필터</label>
            </StButtonCont>

            <StButtonCont id="adjust" mode={store.curMode} onClick={store.changeMode}>
              <Tune fontSize='large' style={{color: 'darkgrey'}}/>
              <label>조정</label>
            </StButtonCont>

            <StButtonCont id="segment" mode={store.curMode} onClick={store.changeMode}>
              <NaturePeople fontSize='large' style={{color: 'darkgrey'}}/>
              <label>객체찾기</label>
            </StButtonCont>

            <StButtonCont id="face" mode={store.curMode} onClick={store.changeMode}>
              <Face fontSize='large' style={{color: 'darkgrey'}}/>
              <label>얼굴인식</label>
            </StButtonCont>

            <StButtonCont id="tag" mode={store.curMode} onClick={store.changeMode}>
              <LocalOffer fontSize='large' style={{color: 'darkgrey'}}/>
              <label>태그생성</label>
            </StButtonCont>
          </StBottomMenuCont>
        )
      }
      </Storage.Consumer>
    )
  }

} export default BottomMenu;

const StBottomMenuCont = styled.div`
  display: flex;
  overflow: scroll;
  justify-content: flex-start;
  /* background: linear-gradient(to top left, #66ffff 0%, #ff9999 100%); */
  /* background: linear-gradient(to top left, #66ccff 0%, #ff99cc 100%); */
  border-top: 1px solid white;
  background: #f5f5f5; ${'' /* backgroud: rgb(64,64,64); */}
  box-sizing: border-box;  
  border-radius: 8px 8px 0 0;
  width: 100%;
  z-index: 1;
  position: fixed;
  bottom: 0;
`;

const StButtonCont = styled(IconButton)`
  width: 3em;
  /* color: #e6e6e6; */
  color: white;
  ${'' /* color: grey; */}
  ${'' /* text-shadow: 0 0 10px black; */}
  .MuiIconButton-label{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  label{
    font-family: 'Jua', sans-serif;
    padding-top: 2px;
    font-size: 50%;
    color: gray;
  }
`