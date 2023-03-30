//getting action buttons
play_pause_btn = document.getElementById('play-pause-btn');
progress_bar=document.getElementById('play-range');
prev_btn=document.getElementById('prev-btn');
next_btn=document.getElementById('next-btn');

//initializing audio
audio_element=new Audio('songs/1.mp3');

//initializing audio_index and resetting progress bar on page load
audio_index=0;
progress_bar.value=0;

//songs info api
let songs=[
    {songName:"Bollywood Top 20", filePath:"songs/1.mp3", coverImg:"covers/top-20.jpg"},
    {songName:"All Time LoFi Hits", filePath:"songs/2.mp3", coverImg:"covers/lofi.jpg"},
    {songName:"Bollywood Sad Songs", filePath:"songs/3.mp3", coverImg:"covers/sad-songs.jpg"},
    {songName:"Bollywood Classical Hits", filePath:"songs/4.mp3", coverImg:"covers/classic.jpg"},
    {songName:"Bollywood Love Songs", filePath:"song/1.mp3", coverImg:"covers/love-songs.jpg"},
    {songName:"Allefarben", filePath:"song/1.mp3", coverImg:"covers/allerfa.jpg"},
    {songName:"Heavy Metal", filePath:"song/1.mp3", coverImg:"covers/heavy-metal.jpg"},
    {songName:"Heavy Metal", filePath:"song/1.mp3", coverImg:"covers/new-metal.jpg"},
    {songName:"New Metal", filePath:"song/1.mp3", coverImg:"covers/liverpool.jpg"},
    {songName:"Liverpool", filePath:"song/1.mp3", coverImg:"covers/dayof the dead.jpg"},
]

//Appending song names dynamically from api
let song_name = Array.from(document.getElementsByClassName('music-name'));
song_name.forEach((element,i)=>{
    element.innerText=songs[i].songName;
    element.src=songs[i].coverImg;
})

//Appending cover images dynamically from api
let song_img= Array.from(document.getElementsByClassName('music-image'));
song_img.forEach((element,i)=>{
    element.src=songs[i].coverImg;
})

//Handelling Events

//Playing song when clicked on image, name or anywhere in a container
let one_song_container = Array.from(document.getElementsByClassName('one-music-container'));
one_song_container.forEach((element,i)=>{
    element.addEventListener('click',()=>{
        audio_element.pause();
        audio_element.src=`songs/${i+1}.mp3`;
        audio_index=i+1;
        document.getElementById('current-song-info').innerText=songs[i].songName;
        audio_element.play();
        play_pause_btn.removeAttribute('src');
        play_pause_btn.setAttribute('src', 'pause-solid.svg');
    })
    
})

//Previous Button
prev_btn.addEventListener('click', ()=>{
    --audio_index;
    if(audio_index<=9 && audio_index>0){
    audio_element.pause();
    audio_element.src=`songs/${audio_index}.mp3`;
    document.getElementById('current-song-info').innerText=songs[audio_index-1].songName;
    audio_element.play();
    play_pause_btn.removeAttribute('src');
    play_pause_btn.setAttribute('src', 'pause-solid.svg');
    }
    else{
        audio_index=4;
        audio_element.src=`songs/${audio_index}.mp3`;
        document.getElementById('current-song-info').innerText=songs[audio_index-1].songName;
        audio_element.play();
        play_pause_btn.removeAttribute('src');
        play_pause_btn.setAttribute('src', 'pause-solid.svg');
    }
})

//Next Button
next_btn.addEventListener('click', ()=>{
    ++audio_index;
    if(audio_index<5){
    audio_element.pause();
    audio_element.src=`songs/${audio_index}.mp3`;
    document.getElementById('current-song-info').innerText=songs[audio_index-1].songName;
    audio_element.play();
    play_pause_btn.removeAttribute('src');
    play_pause_btn.setAttribute('src', 'pause-solid.svg');
    }
    else{
        audio_index=1;
        audio_element.src=`songs/${audio_index}.mp3`;
        document.getElementById('current-song-info').innerText=songs[audio_index-1].songName;
        audio_element.play();
        play_pause_btn.removeAttribute('src');
        play_pause_btn.setAttribute('src', 'pause-solid.svg');
    }
})

//Play Pause Button
play_pause_btn.addEventListener('click',()=>{
    if(audio_element.paused || audio_element.currentTime<=0){
        audio_element.play();
        play_pause_btn.removeAttribute('src');
        play_pause_btn.setAttribute('src', 'pause-solid.svg');
     }
     else{
        audio_element.pause();
        play_pause_btn.removeAttribute('src');
        play_pause_btn.setAttribute('src', 'circle-play-regular.svg');
     }
})

//Updating progress bar in realtime
audio_element.addEventListener('timeupdate',()=>{
    progress=(audio_element.currentTime/audio_element.duration)*100;
    progress_bar.value=progress;
})

//Skip the song to a particular time when clicked on the progress bar
progress_bar.addEventListener('change',()=>{
    audio_element.currentTime=progress_bar.value*audio_element.duration/100;
})
