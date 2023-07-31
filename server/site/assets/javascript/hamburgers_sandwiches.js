'use strict'
const $ = (selector) => document.querySelector(selector);

const load = () => {

    // Modal Back-btn.
    document.getElementById('back_modal').addEventListener("click", (e) => {
        // e.preventDefault();           
        document.querySelector("#close_modal").click();
    });
    // INPUT JSON DATA.
    getFromServer();
}
// #####!!!!! HAMBURGERS !!!!!#####

// Recieving Data from Server.
const getFromServer = async (type = 0) => {
    let response = await fetch("/api/hamburger_sandwiches");
    let body = await response.json();
    // console.log("Response from Server: ", body);

    // Bacon CheeseBurger Likes.
    let baconCheeseBurgerLikes = body["recipes"]["hamburgers"]["baconCheeseBurger"]["likes"];
    // Bacon CheeseBurger Comments.
    let baconCheeseBurgerComments = body["recipes"]["hamburgers"]["baconCheeseBurger"]["comments"];

    if (type == 0) {
        // !!!!! Hamburgers !!!!!
        populateCheeseBurgerLikes(baconCheeseBurgerLikes);
        populateBaconCheeseBurgerComments
            (baconCheeseBurgerComments);
        // !!!!! Sandwiches !!!!!

    } else if (type == 1) {
        // !!!!! Hamburgers !!!!!
        populateCheeseBurgerLikes(baconCheeseBurgerLikes);
        // !!!!! Sandwiches !!!!!
    } else if (type == 2) {
        // !!!!! Hamburgers !!!!!
        populateBaconCheeseBurgerComments
            (baconCheeseBurgerComments);
        // !!!!! Sandwiches !!!!!
    }
}
// ##########!!!!! Hamburgers !!!!!##########

// Bacon CheeseBurger Likes.
const populateCheeseBurgerLikes = (obj) => {
    document.getElementById('likes_root').innerHTML = obj;
}
// Bacon CheeseBurger Comments
let masterComments = []
const populateBaconCheeseBurgerComments
    = (obj) => {
        // Comments Root.  
        const comment_root = document.getElementById('baconCheeseBurgerComm_root');
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
            div1.style.backgroundColor = "black";
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
    }
// ##########!!!!! SANDWICHES !!!!!##########

window.onload = load();