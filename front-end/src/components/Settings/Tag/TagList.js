import React, { Component } from 'react';
// import Modal from '../../Modal'
import styled from 'styled-components';
import {Button, Zoom, Fab,} from '@material-ui/core';
import {FileCopy, } from '@material-ui/icons';

class TagList extends Component {

  clickCopy = async (e) => {
    const tagList = this.props.store.tagList
    const checkList = this.props.store.tagCheckList
    console.log(checkList)
    var custom = []
    
    for(var i = 0; i < tagList.length; i++ ){
      if(checkList[i]){
        custom.push(tagList[i])
      }
    }

    // index 오름차순 정렬
    let tmpList = custom.sort(function(a, b){
      return a - b ;
    }) ;
    
    // 텍스트 추출
    var tags = '';
    for(var tag of tmpList){
      tags += "#" + tag + " "
    }

    // 복사
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = tags;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);

    this.props.store.changeMode(e);
  }

  render(){
    const store = this.props.store
    return(
      <StTagListCont>
      <StTagList>
        { 
          store.tagList.map((tag, i) => {return(
            <React.Fragment key={i}>
            <Zoom in={true}>
              <StTag 
              id={i}
              size="small"
              onClick={store.checkTag}
              style={{
                // background: `${store.tagCheckList[i] ? 'linear-gradient(to bottom right, #3399ff 0%, #ff66cc 100%)' : 'gray'}`
                background: `${store.tagCheckList[i] ? 'white' : 'transparent'}`,
                border: '2px solid white',
                margin: '5px',
                // color: `${store.tagCheckList[i] ? 'white' : '#b277e8'}`
                color: '#8989f5'
              }}
              >
                {tag}
              </StTag>
            </Zoom>
            </React.Fragment>
          )})
        }

        <Zoom in={true} timeout={500}>
          <StFab id="copy" size="small" onClick={this.clickCopy}>
            <FileCopy />
          </StFab>
        </Zoom>
        
      </StTagList>
      </StTagListCont>
    )
  }
} export default TagList;

const StTagListCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

// const StMsg = styled.div`
//   /* font-size: 110%; */
//   color: white;
// `;

const StTagList = styled.div`
  overflow: scroll;
  width: 100%;
  height: 60%;
  box-sizing: border-box;
  padding: 2%;
`;

const StTag = styled(Button)`
  border-radius: 14px;

  font-family: 'Jua', sans-serif;
  /* .MuiButton-label{
    
    font-size: 110%;
  } */
`;

const StFab = styled(Fab)`
  position: absolute;
  color: white;
  /* background: linear-gradient(to bottom, #66ffff 22%, #ff99cc 100%);   */
  background: linear-gradient(to top, #66ccff 0%, #ff99cc 100%);
  
  right: 4%;
  bottom: 5%;
`;
