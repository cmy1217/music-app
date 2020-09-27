import axios from './axios'

export const getRecomSong = () => axios('http://120.79.162.149:3000/personalized')

export const getNewSong = () => axios('http://120.79.162.149:3000/personalized/newsong')

export const getHotSong = () => axios('http://120.79.162.149:3000/top/list?idx=1')

export const getList = (id) => axios('https://api.imjad.cn/cloudmusic/',{type:'playlist',id:id})

export const hotSong = () => axios('http://120.79.162.149:3000/search/hot')

export const songSearch = (song) => axios('http://120.79.162.149:3000/search?',{keywords:song})

export const playSong = (id) => axios('https://api.imjad.cn/cloudmusic/',{id:id})

export const getLyric = (id) => axios('https://api.imjad.cn/cloudmusic/',{type:'lyric',id:id})