import React, { Component } from 'react';
import TopMenu from './Menus/TopMenu';
import BottomMenu from './Menus/BottomMenu';
import DrawerMenu from './Menus/DrawerMenu';
import {Storage} from './Storage';
import Canvas from './Canvas';
import Modal from './Modal';

import styled from 'styled-components';
import {Slide,} from '@material-ui/core';

class EditorPage extends Component {

  render(){
    sessionStorage.setItem('curPage', 'editor')
    return(
      <Storage.Consumer>
      {store => {
        let _msg = "설정한 값들을\n전부 초기화하시겠습니까?"
        if(store.imgHistory.length === 1 && 
          store.filterHistory[0].hue === 0 && 
          store.filterHistory[0].saturation === 0 && 
          store.filterHistory[0].luminance === 0 && 
          store.filterHistory[0].contrast === 0 && 
          store.filterHistory[0].blur === 0
          ) {
          _msg = "현재 원본입니다!"
        }
        if(store.curMode === "backToMain"){
          _msg = "설정한 값들을 무시하고\n뒤로 가시겠습니까?"
        }
        else if(store.curMode === "copy"){
          _msg = "클립보드에 복사 되었습니다!"
        }
        

        return(
        <Slide in={true} direction="left">
          <StEditorCont className="editor" width={store.innerW} height={store.innerH}>
            <TopMenu store={store}/>
            
            <Canvas store={store}/>

            <Slide in={true} direction="up" mountOnEnter unmountOnExit>
              <BottomMenu/>
            </Slide>
            
            <Slide in={store.curMode !== "" && store.curMode !== "origin" && store.curMode !== "backToMain"} 
              direction="up" mountOnEnter unmountOnExit>
              <DrawerMenu/>
            </Slide>

            <Modal
              msg={_msg}  
              pop={store.curMode === "origin" || 
                  store.curMode === "backToMain" || 
                  store.curMode === "copy" || 
                  store.curMode === "error"} 
              isOrg={(store.curMode === "origin" && store.imgHistory.length === 1 &&
                      store.filterHistory[store.historyIdx].hue === 0 &&
                      store.filterHistory[store.historyIdx].saturation === 0 &&
                      store.filterHistory[store.historyIdx].luminance === 0 &&
                      store.filterHistory[store.historyIdx].contrast === 0 &&
                      store.filterHistory[store.historyIdx].blur === 0 ) || 
                      store.curMode === "copy" ||
                      store.curMode === "error" }
            />

          </StEditorCont>
        </Slide>
        )
      }}
      </Storage.Consumer>
    )
  }
} export default EditorPage;

const StEditorCont = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  
  align-items: center;
  /* background-color: black; */
  /* background-image: url("MainBackground.jpg");
  background-size: cover; */
  background: white; /*rgb(63,63,63); */
  width: 100%;
  height: 100%;
  /* width: ${props => props.width}px;
  height: ${props => props.height}px; */
`;

