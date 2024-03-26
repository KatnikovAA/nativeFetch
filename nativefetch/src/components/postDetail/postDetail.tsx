import React from "react";
import { apiPost } from "../../types/apiPost";
import PostDetailCSS from './PostDetail.module.css';

type Props= {
    data: apiPost 
}

export const PostDetail:React.FC<Props> = ({data}:Props) => {
    return(
        <div>
            {
            data && // проверка на пустой дата
                <div className={PostDetailCSS.postsDetail}>
                    <div className={PostDetailCSS.postsBody}>{data.body}</div>   
                    <div className={PostDetailCSS.postsId}>{data.id}</div>   
                    <div className={PostDetailCSS.postsTitle}>{data.title}</div>   
                    <div className={PostDetailCSS.postUserId}>{data.userId}</div>   
                </div>
            }
        </div>
    )
}