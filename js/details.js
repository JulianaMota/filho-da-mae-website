const albumID = param.get("albumid");
const template = document.querySelector("#album-detail-template").content;
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

    document.querySelector(".detailsPage").appendChild(copy);
}

loadOneAlbum(albumID);