import React from 'react';
import { useState , useEffect } from 'react';
import './App.css';
// @ts-ignore
import { Main } from './components/main/main.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { PostDetail } from './components/postDetail/postDetail.tsx';
import { fstLoadPosts,loadAfterScollPosts,loadByClickPosts } from './const/const.ts';
import { apiPost } from './types/apiPost.ts';

const App:React.FC = () => {

  const [dataPosts,setDataPosts] = useState<apiPost[]>([])
  const [loadPosts,setLoadPosts] = useState<number>(fstLoadPosts)
  const [countLoad,setCountLoad] = useState<number>(0)
  const [dataPostId,setDataPostId] = useState<number>(0)
  const [flgForLoad,setFlgForLoad] = useState<number>(0)

  useEffect(()=>{

    if(countLoad < 6 ){
      console.log('countLoad < 5')
      handleClickLoadMore()
    }
  },[flgForLoad])
  
  useEffect(()=>{
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
      console.log('prev => prev + 1 ')
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
      <div className="App">
        <RouterProvider router={router}/>
        <div className='loadMore'>
    </div>
      </div>
    );
}

export default  App;
