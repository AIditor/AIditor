import React, { Component } from 'react';
import styled from 'styled-components';
import {Zoom} from '@material-ui/core';
import {HourglassEmpty} from '@material-ui/icons'

class Loading extends Component {
  render(){
    return(
      <>
        <Zoom in={true} timeout={500} mountOnEnter unmountOnExit>
          <StLoadingCont>
            <HourglassEmpty fontSize='large'/>
          </StLoadingCont>
        </Zoom>
      </>
    )
  }
} export default Loading

const StLoadingCont = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`