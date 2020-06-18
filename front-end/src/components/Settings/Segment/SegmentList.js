import React, { Component } from 'react';
import styled from 'styled-components';
import {Zoom} from '@material-ui/core';

class SegmentList extends Component {

  render(){
    const store = this.props.store
    return(
      <Zoom in={true}>
        <StSegListCont>
        
        <StSegList>
          <StSegCont>
          {store.allSegList.map((_img, i) => { return(
              <StSeg key={i} check={store.segCheckList[i]}>
                {_img}
                <StSegLabel>
                  {store.segLabels[i]}
                </StSegLabel>
              </StSeg>
            )})
          }
          </StSegCont>
        </StSegList>
        </StSegListCont>
      </Zoom>
    )
  }
} export default SegmentList;


const StSegListCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

// const StMsg = styled.div`
//   /* font-size: 110%; */
//   color: white;
// `;

const StSegList = styled.div`
  display: flex;
  overflow: scroll;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StSegCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.2em solid rgba(0,0,0,0);
`

const StSeg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.2rem;
  border: 4px solid;
  border-color: ${props => props.check ? 'white' : 'gray'};
  /* border-color: ${props => props.check ? 'rgba(0,0,0,0)' : 'gray'}; */
  border-radius: 5px;
  /* background-image: url("MainBackground.jpg"); */
  /* background: linear-gradient(to right, #66ffff 22%, #ff99cc 100%); */
  /* background-color: gray; */
  /* width: 70%; */
`;

const StSegLabel = styled.label`
  font-family: 'Baloo Bhaina 2', cursive;
  font-size: 90%;
`;

// const StSegLabel = styled.div`
//   font-family: 'Baloo Bhaina 2', cursive;
//   font-size: 90%;
//   background-color: gray;
//   text-align: center;
//   width: 100%;
//   height: 100%;
// `;