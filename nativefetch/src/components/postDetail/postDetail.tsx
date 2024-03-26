import React from "react";
import { apiPost } from "../../types/apiPost";
import { useParams } from "react-router-dom";

import './postDetail.css';
type Props= {
    data: apiPost 
}



export const PostDetail:React.FC<Props> = ({data}:Props) => {
    return(
        <div>
            {
            data && // проверка на пустой дата
                <div className="postsDetail">
                    
                    <div className="postsBody">{data.body}</div>   
                    <div className="postsId">{data.id}</div>   
                    <div className="postsTitle">{data.title}</div>   
                    <div className="postUserId">{data.userId}</div>   
                </div>
            }
        </div>
    )
}