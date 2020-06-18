import React, { Component } from 'react';
import styled from 'styled-components';

class ErrorMsg extends Component {
  render() {
    return(
      <StErrMsg>{this.props.msg}</StErrMsg>
    )
  }
} export default ErrorMsg;

const StErrMsg = styled.div`
    font-family: 'Jua', sans-serif;
    color: white;
`