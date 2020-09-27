export default {
  playSong(state,playod){
    state.songs.unshift(playod)
  },
  delteSong(state,playod){
    
  },
  songInfo(state,playod){
    state.songInfo.unshift(playod)
  },
  songLricy(state,playod){
    state.songLyirc.unshift(playod)  
  }
}