const baseLink = "https://abmostudio.com/kea/2s-exame/wordpress/wp-json/wp/v2/";
const param = new URLSearchParams(window.location.search);
const catNav = document.querySelector(".dateSelector");
const categID = param.get("catid");

const templateTours = document.querySelector("#tour").content;

function getTour(){
    fetch(baseLink+"tour_dates?_embed").then(res => res.json()).then(showTour);
}

function getCat(){
    fetch(baseLink+"categories").then(res=>res.json()).then(createCatMenu);
}

function getTourByCat(categID){
    fetch(baseLink+"tour_dates?categories="+categID+"&_embed").then(e=>e.json()).then(showTour);
}

function createCatMenu(catList){
    console.log(catList);
    catList.forEach(cat=>{
        console.log(cat);
        const newATag = document.createElement("a");
        newATag.textContent=cat.name;
        newATag.href="?catid="+cat.id;
        catNav.appendChild(newATag);
    })
}

getCat();

function showTour(tourList){
    console.log(tourList);
    tourList.forEach(tour =>{
        console.log(tour);
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


        document.querySelector(".tourContainer").appendChild(copy);

    })
}

if(categID){
    getTourByCat(categID);
}else{
    getTour();
}

/*function sortData(data){
    data.sort(function(a, b){
        return a.acf.date - b.acf.date
    })
}*/

function getVideos(){
    fetch(baseLink+"videos?_embed").then(res => res.json()).then(showVideos);
}




