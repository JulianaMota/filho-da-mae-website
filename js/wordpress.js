const catNav = document.querySelector(".dateSelector");
const categID = param.get("catid");


const modal = document.querySelector(".modal");

const templateTours = document.querySelector("#tour").content;
const templateVideo = document.querySelector("#video").content;
const templatePhotos = document.querySelector("#photo").content;
const templateDisc = document.querySelector("#record").content;
const templateAbout = document.querySelector("#aboutTemplate").content;
const templateContact = document.querySelector("#contactTemplate").content;

let allData = 0;

// TOUR SECTION //

function getTour(){
    fetch(baseLink+"tour_dates?_embed").then(res => res.json()).then(sortTour);
}

function getCat(){
    fetch(baseLink+"categories").then(res=>res.json()).then(createCatMenu);
}

function getTourByCat(categID){
    let temp = [];
    allData.forEach(cat=>{
        console.log(cat.categories[0], categID);
        if(cat.categories[0]==categID){
            console.log(cat)
            temp.push(cat)
        }
    })
    showTour(temp)
}

function createCatMenu(catList){
    //console.log(catList);
    catList.forEach(cat=>{
        //console.log(cat);
        const newATag = document.createElement("a");
        newATag.textContent=cat.name;
        newATag.href="#tours";
        newATag.addEventListener("click", ()=>getTourByCat(cat.id));
        catNav.appendChild(newATag);
    })
}

getCat();

function showTour(tourList){
    const container = document.querySelector(".tourContainer");
    container.textContent="";
    //console.log(tourList);
    tourList.forEach(tour =>{
        //console.log(tour);
        const copy = templateTours.cloneNode(true);

        if(tour._embedded['wp:featuredmedia']){
            copy.querySelector(".tourImage").src=tour._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
        }else {
            copy.querySelector(".tourImage").remove();
        }

        copy.querySelector(".tourDay").textContent=tour.acf.day;
        copy.querySelector(".tourTitle").textContent=tour.title.rendered;
        copy.querySelector(".tourMonth").textContent=tour.acf.month;
        copy.querySelector(".tourWeekDayAndHour").textContent=tour.acf.week_day_and_hour;
        copy.querySelector(".tourLocation").textContent=tour.acf.location;

        copy.querySelector(".tourTicketsBtn").href=tour.acf.ticket_link;
        container.appendChild(copy);

    })
}


getTour();
function sortTour(data){{
    allData=data;
    data.sort(function(a, b){
        return b.acf.date - a.acf.date
    })
}
    showTour(data)
}


// VIDEO SECTION //

function getVideos(){
    fetch(baseLink+"videos").then(res => res.json()).then(showVideos);
}

function showVideos(videosList){
    //console.log(videosList);
    videosList.forEach(video => {
     //console.log(video);
     const copy = templateVideo.cloneNode(true);
     copy.querySelector(".video").innerHTML=video.acf.video;
     document.querySelector(".videoSection").appendChild(copy);
    })
}

getVideos();




// PHOTOS SECTION //

function getPhotos(){
    fetch(baseLink+"photos?_embed").then(res => res.json()).then(showPhotos);
}

function showPhotos(photosList){
    //console.log(photosList);
    photosList.forEach(photo => {
        //console.log(photo.id);
        const copy = templatePhotos.cloneNode(true);

        if(photo._embedded['wp:featuredmedia']){
            copy.querySelector(".photo").src=photo._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
        }else {
            copy.querySelector(".photo").remove();
        }

        copy.querySelector(".ImageBig").addEventListener("click", ()=>  showOnePhoto(photo));


        document.querySelector(".photoSection").appendChild(copy);
    })
}

// modal function //

function showOnePhoto(photo){
    console.log(photo);

    modal.querySelector(".modal-content").id = photo.id;
    if(photo._embedded['wp:featuredmedia']){
        modal.querySelector(".imgBig").src=photo._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
    }else {
        modal.querySelector(".imgBig").src=photo._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
    }
    modal.classList.remove("hide");
}

modal.addEventListener("click", ()=> modal.classList.add("hide"));

getPhotos();


// DISCOGRAPHY SECTION //

function getDisc(){
    fetch(baseLink+"discography?_embed").then(res => res.json()).then(sortAlbums);
}

function showDisc(albumList){
    //console.log(albumList);
    albumList.forEach(album => {
        //console.log(album.id);
        const copy = templateDisc.cloneNode(true);

        if(album._embedded['wp:featuredmedia']){
            copy.querySelector(".recordCover").src=album._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
        }else {
            copy.querySelector(".recordCover").remove();
        }
        copy.querySelector(".recordTitle").innerHTML=album.title.rendered;
        copy.querySelector(".recordDate").textContent=album.acf.date;

        copy.querySelector(".recordMore").href="details.html?albumid="+album.id;
        document.querySelector(".discographySection").appendChild(copy);

    })
}

function sortAlbums(data){{
    data.sort(function(a, b){
        return b.acf.date_for_sort - a.acf.date_for_sort
    })
}
    showDisc(data)
}

getDisc();


// ABOUT SECTION //

function getAbout(){
    fetch(baseLink+"about?_embed").then(res => res.json()).then(showAbout);
}

function showAbout(aboutList){
    //console.log(aboutList);
    aboutList.forEach(data => {
        //console.log(data);
        const copy = templateAbout.cloneNode(true);

        if(data._embedded['wp:featuredmedia']){
            copy.querySelector(".aboutImage").src=data._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
        }else {
            copy.querySelector(".aboutImage").remove();
        }
        copy.querySelector(".aboutArtist").innerHTML=data.content.rendered;

        document.querySelector(".aboutSection").appendChild(copy);

    })
}

getAbout();

// CONTACTS SECTION //

function getContacts(){
    fetch(baseLink+"contacts").then(res => res.json()).then(showContacts);
}

function showContacts(contactList) {
    //console.log(contactList);
    contactList.forEach(contact => {
        //console.log(contact);
        const copy = templateContact.cloneNode(true);
        copy.querySelector(".management").textContent=contact.acf.manager_name;
        copy.querySelector(".managerContact").textContent=contact.acf.manager_contact;
        copy.querySelector(".booking").textContent=contact.acf.book_contact_rm;
        copy.querySelector(".email").textContent=contact.acf.filho_da_mae_email;
        copy.querySelector(".bandMembers").textContent=contact.acf.band_members;

        document.querySelector(".contactSection").appendChild(copy);
    })

}

getContacts();