import React, { Component } from "react";
import { Storage, Msg } from "../Storage";
import Loading from "../Loading";
import Filter from "../Settings/Filter/Filter";
import Adjust from "../Settings/Adjust/Adjust";
import SegmentList from "../Settings/Segment/SegmentList";
import FaceList from "../Settings/Face/FaceList";
import TagList from "../Settings/Tag/TagList";

import styled from "styled-components";
import { IconButton, } from "@material-ui/core";
import { Clear, Check, Refresh } from "@material-ui/icons";
import RotateMenu from "../Settings/Rotate/RotateMenu";

class DrawerMenu extends Component {

  render() {
    return (
      <Storage.Consumer>
        {(store) => (
          <StDrawerMenuCont id="drawer-container">
            <StMenuCont>
              {
                !(store.curMode === 'tag') && 
                <IconButton id={store.curMode} onClick={store.applyChange}>
                  <Check fontSize="large" style={{color: 'white'}} />
                </IconButton>
              }

              {(store.curMode === "filter" || store.curMode === "adjust" ||
                store.curMode === "segment" || store.curMode === "face") && 
                <IconButton id={store.curMode} onClick={store.refreshChange}>
                  <Refresh fontSize="large" style={{color: 'white'}}/>
                </IconButton>
              }
              
              <IconButton id={store.curMode} onClick={store.cancelChange}>
                <Clear fontSize="large" style={{color: 'white'}}/>
              </IconButton>
            </StMenuCont>

            <StMsg>
            {
              Msg[`${store.curMode}`]
            }
            </StMsg>

            <StSettingCont id='setting-container'>

              {store.curMode === "rotate" && //회전 부분
                <RotateMenu />
              }

              {store.curMode === "filter" && //필터 부분
                <Filter store={store} changeFilter={store.changeFilter} />
              }

              {store.curMode === "adjust" && //조정 부분
                <Adjust store={store} />
              }

              {store.curMode === "segment" && ( //객체찾기 부분입니다.
                <>
                  {store.loading ? <Loading /> : null}
                  {store.loading ? null : <SegmentList store={store} />}
                </>
              )}

              {store.curMode === "face" && ( //얼굴찾기 부분입니다.
                <>
                  {store.loading ? <Loading /> : null}
                  {store.loading ? null : <FaceList store={store} />}
                </>
              )}

              {store.curMode === "tag" && (
                <>
                  {store.loading ? <Loading /> : null}
                  {store.loading ? null : <TagList store={store}/>}
                </>
              )}
            </StSettingCont>
          </StDrawerMenuCont>
        )}
      </Storage.Consumer>
    );
  }
}
export default DrawerMenu;

const StDrawerMenuCont = styled.div`
  font-family: 'Jua', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #8989f5;
  background-image: linear-gradient(180deg, #8989f5 0%, #f95ad2 99%, #ffffff 100%);
  border-top: 1px solid white; /**gray */
  border-radius: 8px 8px 0 0;
  color: white;
  width: 100%;
  height: 39%;
  z-index: 2;
  position: fixed;
  bottom: 0;
`;

const StMenuCont = styled.div`
  display: flex;
  align-self: flex-end;
  
  .MuiTouchRipple-root{
    color: grey; /* color: white; */
  }
  svg{
    color: grey; /*color: white;*/
  }
  .MuiButton-containedPrimary{
    background-color: white;
  }
`;

const StSettingCont = styled.div`
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StMsg = styled.div`
  margin: 5px 0 5px 0;
  color: white;
`;