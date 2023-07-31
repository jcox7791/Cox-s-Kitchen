'use strict'
const $ = (selector) => document.querySelector(selector);
// Global Page Likes from the "GET FROM SERVER".
let pageLikes;
const load = () => {
    // INPUT JSON DATA.
    getFromServer();
    // Modal posts-btn.
    document.getElementById('create_post').addEventListener("click", (e) => {
        // e.preventDefault();
        createCheeseBurger();
        document.querySelector("#close_modal").click();
    });
    // Likes-btn.
    document.getElementById('likes_btn').addEventListener("click", () => {

        createCheeseBurgerLikes();
    });


}

// Add and send Likes
// // Likes Data Storage
let likesData = {
    "likes": ""
}
const createCheeseBurgerLikes = async () => {
    // let likes = cheeseBurgerLikesCounter();
    likesData["likes"] = pageLikes + 1;
    // console.log(likesData);

    // Posting Users Data with a Promise.  
    await postLikesToServer(likesData);
    // After Promise Updating with new data from "usersLikes" POPULATE.   
    getFromServer(1);
}
// // Likes Counter.
// let count = 1;
// const cheeseBurgerLikesCounter = () => {
//     console.log("im cheese burger likes counter: ", count);
//     return count++
// }
// Posting Users likes Data.
const postLikesToServer = async (data) => {
    fetch("/api/createBaconCheeseBurgerLikes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data)
    });
}

// Users Data Storage.
let userData = {
    "comments": {
        "usersName": "",
        "date": "",
        "comment": "",
    }
    // ,
    // "likes": ""
}
const createCheeseBurger = async () => {
    // Users Values.
    let usersName = ($('#users_name').value)
    let setDate = new Date();
    let date = setDate.toLocaleDateString();
    console.log(date);
    let comment = ($('#comment_txt').value);

    // Setting Conditions for Data.
    if (usersName == "") {
        userData["comments"]["usersName"] = "Needs a User Name!";
    } else { userData["comments"]["usersName"] = usersName; }

    if (date == "") {
        userData["comments"]["date"] = "Needs a Date!";
    } else { userData["comments"]["date"] = date; }

    if (comment == "") {
        userData["comments"]["comment"] = "Needs a Comment!"
    } else { userData["comments"]["comment"] = comment; }
    // console.log(userData);

    // Posting Users Data with a Promise.  
    await postUsersDataToServer(userData);
    // After Promise Updating with new data from "usersComments" POPULATE.
    getFromServer(2);
}
// Posting Users Data.
const postUsersDataToServer = (data) => {
    fetch("/api/createBaconCheeseBurger", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data)
    });
}
// Recieving Data from Server.
const getFromServer = async (type = 0) => {
    let response = await fetch("/api/cheeseBurger");
    let body = await response.json();
    // Bacon CheeseBurger Ingredients.
    let ingredients = body["recipes"]["hamburgers"]["baconCheeseBurger"]["ingredients"];
    // Bacon CheeseBurger Ingredients.
    let preparation = body["recipes"]["hamburgers"]["baconCheeseBurger"]["preparation"];
    // Bacon CheeseBurger Comments.
    let usersComments = body["recipes"]["hamburgers"]["baconCheeseBurger"]["comments"];
    // Bacon CheeseBurger Likes.
    let usersLikes = body["recipes"]["hamburgers"]["baconCheeseBurger"]["likes"];
    pageLikes = usersLikes;
    // console.log(pageLikes)

    if (type == 0) {
        populateIngrdients(ingredients);
        populatePreparation(preparation);
        populateComments(usersComments);
        populateLikes(usersLikes);
    }
    else if (type == 1) { populateLikes(usersLikes); }
    else if (type == 2) { populateComments(usersComments); }
}
// Bacon CheeseBurger Ingredients.
const populateIngrdients = (obj) => {
    // Ingrtedients Root.  
    const sectionIngredients = document.getElementById('ingredients_root');
    // Creating a Un-Oredered List .
    const myUnOrderList = document.createElement('ul');
    // LOOP over Ingredients Data.
    for (const ingredients of obj) {
        // Creating un-order list-item.        
        const unOrderesListItem = document.createElement('li');
        // Applying Data to Elements.
        unOrderesListItem.textContent = ingredients;
        myUnOrderList.appendChild(unOrderesListItem);
    }
    sectionIngredients.appendChild(myUnOrderList);

}
// Bacon CheeseBurger Preparation.
const populatePreparation = (obj) => {
    // Preparation Root.
    const sectionPreparation = document.getElementById('preparation_root');
    // Creating a Order List.
    const myOrderList = document.createElement('ol');
    // LOOP over Preparations Data.
    for (const preparation of obj) {
        // Creating order-list item
        const orderListItem = document.createElement('li');
        // Applying Data to Elaments.
        orderListItem.textContent = preparation;
        myOrderList.appendChild(orderListItem);
    }
    sectionPreparation.appendChild(myOrderList);


}
// Bacon CheeseBurger Likes
const populateLikes = (obj) => {
    document.getElementById('likes_root').innerHTML = obj;
}
// Bacon CheeseBurger Comments
let masterComments = []
const populateComments = (obj) => {
    // Comments Root.  
    const comment_root = document.getElementById('comments_root');
    // Creating Div Element.  
    const myComments = document.createElement('div');
    // LOOP over data.
    for (const [key, value] of Object.entries(obj)) {
        if (masterComments.includes(key)) {
            continue
        }
        masterComments.push(key);
        // console.log(masterComments);

        // Creating Elements & Setting its Attribute.  
        const div1 = document.createElement('div');
        div1.setAttribute("id", key)
        div1.setAttribute("class", "comments");
        div1.style.maxWidth = "100%";
        div1.style.wordWrap = "break-word";
        div1.style.backgroundColor = "#f39494";
        div1.style.color = "whitesmoke";
        div1.style.margin = "5px";
        div1.style.borderRadius = "15px"
        // Creating Elements.
        const date = document.createElement('p');
        date.style.marginLeft = "10px"
        const userName = document.createElement('p');
        userName.style.marginLeft = "20px"
        const comment = document.createElement('p');
        comment.style.marginLeft = "30px"
        // Attaching data to Elements
        userName.textContent = value["usersName"];
        date.textContent = value["date"];
        comment.textContent = value["comment"];
        // Attaching data to a div.
        div1.appendChild(date);
        div1.appendChild(userName);
        div1.appendChild(comment);
        myComments.appendChild(div1)
        myComments.appendChild(div1)
        myComments.appendChild(div1)
    }

    comment_root.appendChild(myComments);

    // console.log(comment_root.before(myComments));
}

window.onload = load();