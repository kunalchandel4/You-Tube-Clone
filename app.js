

let make;

const videoCardContainer = document.querySelector('.video-container');

let api_key = "AIzaSyDYWlfXTcB0kr76RIs-imHmgaMCG9nJz5Q";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = '${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}
// search bar

// const searchInput = document.querySelector('.search-bar');
// const searchBtn = document.querySelector('.search-btn');
// const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=40&q=${query}&key=${api_key}`;

let search = async() => {
    let query = document.getElementById("beautiOf").value ;
make =query
console.log(query)
    if(query){
        let store = await getData(make) 
      
        append(store)
        
    } else{
window.location.reload()
    }
   
    // append(store)
} ;
let getData = async (query) => {
    let url =`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=40&q=${query}&key=${api_key}`

let resolved = await fetch(url) ;
let data = await resolved.json() ;
// console.log(data)
// console.log(data)
return data.items

}

let append = (data)=> {
    console.log(data)
    let body = document.getElementById("container") ;
    body.innerHTML=null ;
    data.forEach((el)=>{
        // snippet ---> title 
        // snippet ---> thumbnails ---> medium ---> url
    let img = document.createElement("img") ;
    img.src = el.snippet.thumbnails.medium.url ;
    img.setAttribute("class","image")
    let h3= document.createElement("h3")
    h3.innerText =el.snippet.title ;
    h3.setAttribute("class","beauti")
    let div = document.createElement("div")
    div.setAttribute("class","movie") ;
    div.onclick=()=>{
        savevedio(el) ;
    }
    
    div.append(img,h3)
    body.append(div)
    })
    
    }


    let savevedio=(data)=>{
localStorage.setItem("vedio",JSON.stringify(data)) ;

window.location.href="vedioplay.html"
    }

  
    let filter = async () => {
        let data = await getData(make);
        console.log(data);
        data = data.filter((el) => {
          return el.snippet.channelId === "UCvC4D8onUfXzvjTOM-dBfEA";
        });
        append(data);
      };