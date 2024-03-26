import React from "react";
import { apiPost } from "../../types/apiPost";
import PostCSS from './Post.module.css';
import { Link } from "react-router-dom";

  type Props= {
        data: apiPost,
        countLoad:number,
        getPostId:(value:number) => void,
    }

export const Post:React.FC<Props> = ({data,countLoad,getPostId}:Props) => {

    //передаем  Id posta
    const handleCliclPost = ():void =>{

            getPostId(data.id)
        
    }

    return(
        <Link  to={`/${countLoad}/${data.id+'_posts'}`} >
            <div className={PostCSS.posts} onClick={handleCliclPost}>
                <div className={PostCSS.postsBody}>{data.body}</div>   
                <div className={PostCSS.postsId}>{data.id}</div>   
                <div className={PostCSS.postsTitle}>{data.title}</div>   
                <div className={PostCSS.postUserId}>{data.userId}</div>   
            </div>
        </Link>
    )
}