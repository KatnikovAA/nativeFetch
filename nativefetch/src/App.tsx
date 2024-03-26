import React from 'react';
import { useState , useEffect } from 'react';
import AppCss from './App.Module.css';
// @ts-ignore
import { Main } from './components/main/Main.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { PostDetail } from './components/postDetail/PostDetail.tsx';
import { fstLoadPosts,loadAfterScollPosts,loadByClickPosts } from './const/const.ts';
import { apiPost } from './types/apiPost.ts';

const App:React.FC = () => {

  const [dataPosts,setDataPosts] = useState<apiPost[]>([])
  const [loadPosts,setLoadPosts] = useState<number>(fstLoadPosts)
  const [countLoad,setCountLoad] = useState<number>(1)
  const [dataPostId,setDataPostId] = useState<number>(0)
  const [flgForLoad,setFlgForLoad] = useState<number>(0)

  useEffect(()=>{
    //использую для первых 5 прокруток страницы 
    if(countLoad < 6 ){
      handleClickLoadMore()
    }
  },[flgForLoad])
  
  useEffect(()=>{
    //обнуляю значения State
    setCountLoad(1) 
    setLoadPosts(fstLoadPosts)
    fetch('https://jsonplaceholder.typicode.com/posts/')
        .then(response => response.json())
        .then(json => setDataPosts(json))
        window.addEventListener('scroll', handleScroll);
    return () => { 
      window.removeEventListener ('scroll', handleScroll);  
    }
  },[])
  
//функция для увеличение загрузки и количества загрузок (использую по кнопки и в useEffect при прокрутке)
  const handleClickLoadMore = ():void => { 
    setLoadPosts(pref => pref + loadAfterScollPosts)
    setCountLoad(pref => pref + 1) 
  }

  //получаем Id posta по клику на него
  const getPostId = (value:number):void => { 
    setDataPostId(value)
  }

  //скролл высота окна браузера + вертикальная позиция прокрутки окна браузера >= высота html-элемента body
  const handleScroll = ():void => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight){
      setFlgForLoad(prev => prev + 1)
    }
  };

  const router = createBrowserRouter([ 
    // можно вернуть если необходимо иметь родительский URL пустой при 1 загрузке сайт из условия не понятно (например http://localhost:3000 а не http://localhost:3000/1)
  
    //  {
    //   path: `/`,
    //   element: <Main 
    //     dataPosts ={dataPosts} 
    //     countLoad={countLoad}
    //     loadPosts={loadPosts}
    //     handleClickLoadMore = {handleClickLoadMore}
    //     getPostId = {getPostId}
    //   />,

    // },
    {
      path: `/:countLoad`,
      element: <Main 
        dataPosts ={dataPosts} 
        countLoad={countLoad}
        loadPosts={loadPosts}
        handleClickLoadMore = {handleClickLoadMore}
        getPostId = {getPostId}
      />,

    },
    {
      path: `/:countLoad/:idPost`,
      element: <PostDetail data={dataPosts[dataPostId]}/>,
    },
  ]);

    return (
      <div className={AppCss.App}>
        <RouterProvider router={router}/>
      </div>
    );
}

export default  App;
