import React, { Component } from "react";
import { Storage } from "../../Storage";
import styled from "styled-components";
import { Zoom, Slide, Slider } from "@material-ui/core";

class AdjustSliders extends Component {
  render() {
    return (
      <Storage.Consumer>
        {(store) => {
          const histIdx = store.historyIdx;
          const filterHist = store.filterHistory;
          const changeAdjust = store.changeAdjust;
          return (
            <>
              <Zoom in={true}>
                <StSliderCont>
                  {this.props.channel === "hue" && (
                    <>
                    <Slide timeout={500} in={true} direction={this.props.pre === '' ? 'left' : 'right'}>
                      <StSlider
                        id="hue"
                        min={0}
                        max={300}
                        step={0.1}
                        value={filterHist[histIdx].hue}
                        onChange={changeAdjust}
                      />
                    </Slide>
                    </>
                  )}
                  {this.props.channel === "saturation" && (
                    <>
                    <Slide timeout={500} in={true} direction={this.props.pre === 'hue' ? 'left' : 'right'}>
                    <StSlider
                      id="saturation"
                      min={-5}
                      max={5}
                      step={0.01}
                      value={filterHist[histIdx].saturation}
                      onChange={changeAdjust}
                    />
                    </Slide>
                    </>
                  )}
                  {this.props.channel === "luminance" && (
                    <>
                    <Slide timeout={500} in={true} direction={(this.props.pre === 'hue' || this.props.pre === 'saturation') ? 'left' : 'right'}>
                    <StSlider
                      id="luminance"
                      min={-1}
                      max={1}
                      step={0.01}
                      value={filterHist[histIdx].luminance}
                      onChange={changeAdjust}
                    />
                    </Slide>
                    </>
                  )}
                  {this.props.channel === "contrast" && (
                    <>
                    <Slide timeout={500} in={true} direction={this.props.pre === 'blur' ? 'right' : 'left'}>
                    <StSlider
                      id="contrast"
                      min={-100}
                      max={100}
                      step={1}
                      value={filterHist[histIdx].contrast}
                      onChange={changeAdjust}
                    />
                    </Slide>
                    </>
                  )}
                  {this.props.channel === "blur" && (
                    <>
                    <Slide timeout={500} in={true} direction={'left'}>
                    <StSlider
                      id="blur"
                      min={0}
                      max={50}
                      step={10}
                      value={filterHist[histIdx].blur}
                      onChange={changeAdjust}
                    />
                    </Slide>
                    </>
                  )}
                </StSliderCont>
              </Zoom>
            </>
          );
        }}
      </Storage.Consumer>
    );
  }
}
export default AdjustSliders;

const StSliderCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 70%;
  height: 70%;
`;

const StSlider = styled(Slider)`
  color: white;
`;
