import React from "react";
// @ts-ignore
import { Post } from "../post/post.tsx";
import { apiPost } from "../../types/apiPost.ts";
import { Navigate } from "react-router-dom";
import './main.css';

interface Props{
  dataPosts:apiPost[],
  countLoad:number,
  loadPosts:number,
  flgForLoad:boolean,
  handleClickLoadMore:void,
  getPostId:void
}

export const Main:React.FC<Props> = ({dataPosts,countLoad,loadPosts,handleClickLoadMore,getPostId}:Props) => {
    
    return(
    <div className="main">
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
            <div className='loadMore'>
              <button onClick= {() =>{handleClickLoadMore()}}>Загрузить еще</button>
            </div>
        }

    </div>
    )
}