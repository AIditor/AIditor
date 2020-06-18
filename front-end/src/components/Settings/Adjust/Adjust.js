import React, { Component } from "react";
import AdjustSliders from "./AdjustSliders";
import styled from "styled-components";
import { Button } from "@material-ui/core";

class Adjust extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: "hue",
      pre: '',
    };
  }
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  tabChannel = (e) => {
    // const _channel = e.currentTarget.id
    this.setStateAsync({
      pre: this.state.channel,
    })
    .then(
      this.setState({
        channel: e.currentTarget.id,
      })
    )
  };

  render() {
    return (
      <StAdjustCont>
        <StTabCont>
          <StBtn id='hue' 
          style={{margin: '0px', color:`${this.state.channel === 'hue' ? 'white' : '#898985'}`, background: `${this.state.channel === 'hue' ? '#b277e8' : 'white'}`}}//`${this.state.channel === 'hue' ? 'rgb(63,63,63)' : 'rgb(30,30,30)'}`}} 
          onClick={this.tabChannel}>색상</StBtn>

          <StBtn id='saturation' 
          style={{color:`${this.state.channel === 'saturation' ? 'white' : '#898985'}`, background: `${this.state.channel === 'saturation' ? '#b277e8' : 'white'}`}}//`${this.state.channel === 'hue' ? 'rgb(63,63,63)' : 'rgb(30,30,30)'}`}}
          onClick={this.tabChannel}>채도</StBtn>

          <StBtn id='luminance' 
          style={{color:`${this.state.channel === 'luminance' ? 'white' : '#898985'}`, background: `${this.state.channel === 'luminance' ? '#b277e8' : 'white'}`}}//`${this.state.channel === 'hue' ? 'rgb(63,63,63)' : 'rgb(30,30,30)'}`}}
          onClick={this.tabChannel}>명도</StBtn>

          <StBtn
            id="contrast"
            style={{color:`${this.state.channel === 'contrast' ? 'white' : '#898985'}`, background: `${this.state.channel === 'contrast' ? '#b277e8' : 'white'}`}}//`${this.state.channel === 'hue' ? 'rgb(63,63,63)' : 'rgb(30,30,30)'}`}}
            onClick={this.tabChannel}
          >
            대조
          </StBtn>

          <StBtn id='blur' 
          style={{color:`${this.state.channel === 'blur' ? 'white' : '#898985'}`, background: `${this.state.channel === 'blur' ? '#b277e8' : 'white'}`}}//`${this.state.channel === 'hue' ? 'rgb(63,63,63)' : 'rgb(30,30,30)'}`}}
          onClick={this.tabChannel}>블러</StBtn>
          
        </StTabCont>

        <StSliderCont>
          <AdjustSliders channel={this.state.channel} pre={this.state.pre}/>
          {/* <AdjustSliders channel={this.state.channel} store={this.props.store}/> */}
        </StSliderCont>
      </StAdjustCont>
    );
  }
}
export default Adjust;

const StAdjustCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StTabCont = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 4px;
  background-color: white;
`;

const StBtn = styled(Button)`
  font-family: 'Jua', sans-serif;
  color: black;
  border-radius: 10px 10px 0 0;
`;

const StSliderCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;
