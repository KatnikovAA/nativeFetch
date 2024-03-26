import React from "react";
import { Post } from "../post/Post.tsx";
import { apiPost } from "../../types/apiPost.ts";
import { Navigate } from "react-router-dom";
import MainCSS from './Main.module.css';

interface Props{
  dataPosts:apiPost[],
  countLoad:number,
  loadPosts:number,
  handleClickLoadMore:() => void,
  getPostId:(value:number) => void
}

export const Main:React.FC<Props> = ({dataPosts,countLoad,loadPosts,handleClickLoadMore,getPostId}:Props) => {
    
    return(
    <div className={MainCSS.main}>
        {
          <Navigate to={`/${countLoad}`}></Navigate>
        }
        {
          dataPosts &&
          dataPosts.slice(0,loadPosts).map((value) => {
            return <Post key={value.id} data={value} countLoad={countLoad} getPostId={getPostId}/>
          })
        }
        
        {
          countLoad >= 6 && countLoad < 10 &&
            <div className={MainCSS.loadMore}>
              <button className={MainCSS.button} onClick= {() =>{handleClickLoadMore()}}>Загрузить еще</button>
            </div>
        }

    </div>
    )
}