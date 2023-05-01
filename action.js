const toggler = document.getElementsByClassName('signal');
const mainCard = document.getElementsByClassName('contact');
const contactInfo = document.querySelectorAll(".info");
const Xlose = document.querySelector(".toggler");
const addContact = document.getElementById('addContact');
const createContact = document.getElementById('createContact');
const addPerson = document.getElementById('addPerson');
let addthumbNail = document.getElementById('thumbNailUpload');
const navList = document.querySelector('.sideList');
const editContact = document.querySelector('.edit');
const deleteContact = document.querySelector('.delete');
const shuffler = document.getElementById('filter');
const shufflePick = document.querySelector('.shuffle-pick');
const searchToggler = document.getElementById('searchSignal');
const searchField = document.getElementById('search');

console.log(editContact);




let contactList = [
        ];


class contact {
    constructor(thumbnail, firstName, lastName, mobile, homeNum, workNum, email, address){
        this.thumbnail = thumbnail;
        this.firstname = firstName;
        this.lastname = lastName;
        this.mobile = mobile;
        this.homephone = homeNum;
        this.workphone = workNum;
        this.email = email;
        this.address = address;
        this.id = Date.now();
    }
}

const newContact = (thumbnail, firstName, lastName, mobile, homeNum, workNum, email, address) => {
    let person = new contact (
        thumbnail, firstName, lastName, mobile, homeNum, workNum, email, address
    );
    contactList.push(person);
    renderContent(contactList);
    connectLocal();

}
const connectLocal = () => {
    window.localStorage.setItem('contactList', JSON.stringify(contactList));
    console.log('Food Gee')
}
// connectLocal()
const retrieveLocal = () => {
    localFile = localStorage.getItem('contactList');
    localArray = JSON.parse(localFile);
    console.log(localArray)
}
const Xclose = () => {
        createContact.style.display = 'none';
}

const signal = () => {
    for(let i =0; i < contactInfo.length; i++){
        contactInfo[i].classList.toggle('unfold');
        toggler.style.rotate = "180deg";
    }
    
}


const renderContent = contactList => {

    const mainList = document.querySelector('.mainList');
    if(contactList.length === 0) return;
    let sideInfo;
    let newPerson;
    for(let i =0; i < contactList.length; i++) {
        newPerson = document.createElement('li');
        newPerson.setAttribute('data-id', `${contactList[i].id}`);
        newPerson.setAttribute('class', 'contact');
        newPerson.innerHTML = `
        <div class="top">
        <div class="mainName"><span class="firstname">${contactList[i].firstname}</span> <span class="lastname">${contactList[i].lastname}</span></div>
        <div class="signal">
            <ion-icon name="chevron-up-circle-outline"></ion-icon>
        </div>
        <div class="ctrl">
            <button class="delete" id="${i}">
                <ion-icon name="trash-outline"></ion-icon>
            </button>
            <button class="edit">
                <ion-icon name="create-outline"></ion-icon>
            </button>
        </div>
        </div>
        <span class="image">
                    <img class="contactThumb" src="${URL.createObjectURL(contactList[i].thumbnail)}">
                    </span>
                    <div class="info">
                        
                        <div class="numbers">
                            <span class="mobile">
                                <ion-icon name="call-outline"></ion-icon><label for="mobile">Mobile:</label><input type="text" disabled value="${contactList[i].mobile}">
                            </span>
                            <span class="home">
                                <ion-icon name="home-outline"></ion-icon><label for="home">Home:</label><input type="text" disabled value="${contactList[i].homephone}">
                            </span>
                            <span class="work">
                                <ion-icon name="timer-outline"></ion-icon><label for="work">Work:</label><input type="text" disabled value="${contactList[i].workphone}">
                            </span>

                        </div>
                        <div class="addresses">
                            <span>
                                <ion-icon name="mail-outline"></ion-icon>
                                <label for="Email">Email:</label>
                                <input type="email" name="email" id="email" value="${contactList[i].email}" disabled>
                            </span>
                            <span class="homeAddress">
                                <ion-icon name="location-outline"></ion-icon>
                                <label for="homeAddress">Address:</label>
                                <input type="text" value="${contactList[i].address}" disabled style="width: 20rem;">
                            </span>
                        </div>
                    </div>
        `

        sideInfo = document.createElement('li');
        sideInfo.setAttribute('data-id', `${contactList[i].id}`);
        sideInfo.innerHTML = `
        <span class="sideImage">
                            ${contactList[i].firstname[0]}
                        </span>
                        <span class="sideName">${contactList[i].firstname} ${contactList[i].lastname}</span>
                        <buttton class="actions"><ion-icon name="alert-circle-outline"></ion-icon></button>
        `
    };
    
    mainList.append(newPerson);
    navList.append(sideInfo);
}
shuffler.addEventListener('click', ()=>{
    if(shufflePick.style.display === "none"){
        shufflePick.style.display = "flex"
    } else { shufflePick.style.display = "none"}
    console.log('Hey Charlie')
})
createContact.addEventListener('submit', (e) => {
    e.preventDefault();
})
createContact.addEventListener("change", () => {
    let firstname = document.querySelector('input[name=firstname]').value;
    let lastname = document.querySelector('input[name=lastname]').value;
    let displayFirstname = document.querySelector('.firstname');
    let displayLastname = document.querySelector('.lastname');
    displayFirstname.innerHTML = firstname;
    displayLastname.innerHTML = lastname;
})
addPerson.addEventListener('click', (e) => {
    let firstname = document.querySelector('input[name=firstname]').value;
    let lastname = document.querySelector('input[name=lastname]').value;
    let email = document.querySelector('input[name=email]').value;
    let mobile = document.querySelector('input[name=mobile]').value;
    let worknumber = document.querySelector('input[name=work]').value;
    let home = document.querySelector('input[name=home]').value;
    let address = document.querySelector('input[name=address]').value;
    let thumbnail = document.getElementById('thumbNailUpload').files[0];
        newContact(thumbnail, firstname, lastname, mobile, home, worknumber, email, address);

})


addthumbNail.addEventListener('change', (e) => {
    let contactPic = document.getElementById('thumbnail');
    contactPic.src = URL.createObjectURL(e.target.files[0]);
})

Xlose.addEventListener('click', (e) => {
    Xclose();
});

addContact.addEventListener('click', (e) => {
    createContact.style.display = 'grid';
    
})
// editContact.addEventListener('click',(e) => {
//     const desCrip = e.target.parentElement.getAttribute("data-num");
//     let itemIndex = contactList.findIndex(contact => {
//         return contact.id.toString() === desCrip.toString();
//     });
//     console.log(desCrip);
//     console.log("Charles")
//     createContact.style.display = "grid"

// })
searchToggler.addEventListener('click', e => {
   searchField.classList.toggle('searchBox')
   searchField.classList.toggle('searchBoxHide')

})
console.log(mainCard);
for (var i in mainCard){
    mainCard[i].onclick = (e)=>{
        console.log(e.target.className);
    };
}





