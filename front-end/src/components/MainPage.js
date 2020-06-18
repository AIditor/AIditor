import React, { Component } from "react";
import {Storage} from "./Storage";
import MainAnimation from './MainAnimation'
import { Slide, Zoom, IconButton } from "@material-ui/core";
import { PhotoLibrary } from "@material-ui/icons";
import styled from "styled-components";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let dir = "left";
    if(sessionStorage.getItem('curPage') === 'editor'){
      dir = "right"
    }
    sessionStorage.clear()

    return (
      <Storage.Consumer>
      {store => (
        <Slide in={true} direction={dir}>
          <StMainCont className="main" width={window.innerWidth} height={window.innerHeight}>
            <MainAnimation/>
            <Zoom in={true} timeout={400}>
              <StUploadBtn>
                <input
                  id="imgUpload"
                  type="file"
                  accept="image/jpg,image/png,image/jpeg,image/gif"
                  onChange={store.imgUpload}
                />
                <IconButton>
                  <label htmlFor="imgUpload">
                    <PhotoLibrary />
                  </label>
                </IconButton>
                
                <div>불러오기</div>
              </StUploadBtn>
            </Zoom>
          </StMainCont>
        </Slide>
      )}
      </Storage.Consumer>
    );
  }
} export default MainPage;


const StMainCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* background-image: url('MainBackground.jpg'); */
  background-image: url('AppBackground.jpg');
  background-position: center; 
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  /* width: ${props => props.width}px;
  height: ${props => props.height}px; */
`;

const StUploadBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .MuiIconButton-root {
    padding: 0;
    border-radius: 10px;
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #b2dfdb; */
    background: linear-gradient(to bottom, #66ffff 22%, #ff99cc 100%);  
    border: 3px solid white;
    color: #009687;
    font-size: 80%;
    font-weight: 600;
    cursor: pointer;
    border-radius: 10px;
    /* margin: 0.5rem;
    margin-top: 10px;
    margin-bottom: 20px; */
    padding: 0.2em; 
  }

  svg {
    ${'' /* color: white; */}
    color: white;
    width: 2.5rem;
    height: 2.5rem;
  }

  div {
    margin-top: 0.4rem;
    font-family: 'Jua', sans-serif;
    font-size: 110%;
    color: white;
    text-shadow: 0 0 10px gray;
  }

`;
