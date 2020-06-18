import React, { Component } from "react";
import { Storage } from "./Storage";
import styled from "styled-components";
// import Konva from "konva";
import { Stage, Layer} from "react-konva";
import {Zoom} from '@material-ui/core'

class Canvas extends Component {
  render() {
    return (
      <Storage.Consumer>
        {(store) => (
          <>
          <Zoom in={true} timeout={500}>
          <StCanvasCont id="canvas-container">
            <Stage
              ref={(ref) => {
                store.stageRef = ref;
              }}
              style={{ display: "flex", backgroundColor: "black" }}
              width={store.stageHistory[store.historyIdx].width}
              height={store.stageHistory[store.historyIdx].height}
              scaleX={store.stageHistory[store.historyIdx].scale}
              scaleY={store.stageHistory[store.historyIdx].scale}
            >
              <Layer
                id="display-layer"
                ref={(ref) => {
                  store.layerRef = ref;
                }}
              >
                {store.imgHistory[store.historyIdx]}
                {store.segCheckList.map((value, i) =>
                  value ? store.segList[i] : null
                )}
                {store.faceCheckList.map((value, i) =>
                  value ? store.faceList[i] : null
                )}
              </Layer>

              {/* {store.curMode !== "" && <Layer id="edit-layer"></Layer>} */}

              {store.curMode === "crop" && <Layer id="crop-layer"></Layer>}
            </Stage>
          </StCanvasCont>
          </Zoom>
          </>
        )}
      </Storage.Consumer>
    );
  }
}
export default Canvas;

const StCanvasCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 50%;
  /* margin-bottom: 65%; */
`;
