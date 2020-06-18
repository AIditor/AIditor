import React from "react";
import * as Methods from "../../Methods";

import { filtersRef } from "./FilterRef";
import styled from "styled-components";
import {Slide} from "@material-ui/core";


class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterRef: [],
      checkList: [],
    };
  }

  componentDidMount() {
    this.setState({
      filterRef: filtersRef,
      checkList: filtersRef.map(() => false)
    });
    // console.log("필터 개수 : " + filtersRef.length);
  }

  changeFilter = (e) => {
    const idx = e.currentTarget.id;
    const { filterRef } = this.state;
    // console.log("적용된 필터 :" + filterRef[idx].name);
    this.props.changeFilter(
      filterRef[idx].hue,
      filterRef[idx].saturation,
      filterRef[idx].luminance,
      filterRef[idx].contrast,
      filterRef[idx].blur
    );

    this.setState({
      checkList: this.state.checkList.map((value, i) => 
        i === Number(idx) ? true : false
      )
    })

  };

  render() {
    const { filterRef } = this.state;
    const list = filterRef.map((filter, idx) => {
      const _img = new window.Image();
      _img.src = filter.src;
      const _viewW = _img.width;
      const _viewH = _img.height;
      const _style = Methods.calcSegView(_viewW, _viewH).style;
      const _width = Methods.calcSegView(_viewW, _viewH).width;
      const _height = Methods.calcSegView(_viewW, _viewH).height;

      return (
        <React.Fragment key={idx}>
        <Slide in={true} direction="down" timeout={300 + (idx * 100)}>
        <StImageCont style={_style} check={this.state.checkList[idx]}>
          <img
            // key={idx}
            id={idx}
            src={filter.src}
            alt={filter.name}
            width={`${_width}px`}
            height={`${_height}px`}
            onClick={this.changeFilter}
            loading="lazy"            
          />
        </StImageCont>
        </Slide >
        </React.Fragment>
      );
    });

    return (
      <>
        {/* <Slide in={true} direction="left" timeout={500}> */}
          <StFilterCont>
            {list}
          </StFilterCont>
        {/* </Slide> */}
      </>
    );
  }
}
export default Filter;

const StFilterCont = styled.div`
  overflow: scroll;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 0.2em solid rgba(0, 0, 0, 0);
`;

const StImageCont = styled.div`
  margin: 0.1rem;
  border: 5px solid;
  /* border-color: ${props => props.check ? 'white' : 'rgba(0, 0, 0, 0)'}; */
  border-color: ${props => props.check ? 'white' : 'rgba(0, 0, 0, 0)'};
  border-radius: 5px;
`;
