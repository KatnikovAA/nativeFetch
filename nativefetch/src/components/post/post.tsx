import React from "react";
import { apiPost } from "../../types/apiPost";
import './post.css';
import { Link } from "react-router-dom";

  type Props= {
        data: apiPost,
        countLoad:number,
        getPostId:void,
    }

export const Post:React.FC<Props> = ({data,countLoad,getPostId}:Props) => {

    //передаем  Id posta
    const handleCliclPost = ():void =>{

            getPostId(data.id)
        
    }

    return(
        <Link  to={`/${countLoad}/${data.id+'_posts'}`} >
            <div className="posts" onClick={handleCliclPost}>
                <div className="postsBody">{data.body}</div>   
                <div className="postsId">{data.id}</div>   
                <div className="postsTitle">{data.title}</div>   
                <div className="postUserId">{data.userId}</div>   
            </div>
        </Link>
    )
}