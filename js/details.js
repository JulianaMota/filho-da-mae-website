const albumID = param.get("albumid");
const template = document.querySelector("#albumDetailTemplate").content;
console.log(albumID);

function loadOneAlbum(albumID){
    fetch(baseLink+"discography/"+albumID).then(res=>res.json()).then(showOneAlbum);
}

function showOneAlbum(data){
    console.log(data);
    const copy = template.cloneNode(true);

    if(data.acf.image_album){
        copy.querySelector("img").src=data.acf.image_album.sizes.large;
    }else{
        copy.querySelector("img").src=data.acf.artist_photos.sizes.medium;
    }

    copy.querySelector(".albumTitle").textContent=data.title.rendered;
    copy.querySelector(".albumAuthorName").textContent=data.acf.by;
    copy.querySelector(".albumYear").textContent=data.acf.date;
    copy.querySelector(".albumSongsNumber").textContent=data.acf.songs_number;
    copy.querySelector(".buyLink1").href=data.acf.buy_link;
    copy.querySelector(".buyLink2").href=data.acf.buy_link;
    copy.querySelector(".buyLink3").href=data.acf.buy_link;
    copy.querySelector(".albumDigitalPrice").textContent=data.acf.digital_price;
    copy.querySelector(".albumCDPrice").textContent=data.acf.disc_price;
    copy.querySelector(".albumVinylPrice").textContent=data.acf.vinyl_price;
    copy.querySelector(".spotifySongs").innerHTML=data.acf.spotify_album;


    document.querySelector(".detailsPage").appendChild(copy);
}

loadOneAlbum(albumID);