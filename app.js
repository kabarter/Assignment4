
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, query, where, updateDoc } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9hnmJm31xwAqZKzL0YVE2aU9DzWyY7HU",
  authDomain: "assignment4-aa555.firebaseapp.com",
  projectId: "assignment4-aa555",
  storageBucket: "assignment4-aa555.appspot.com",
  messagingSenderId: "199326903854",
  appId: "1:199326903854:web:d2ce2fc31bdc5ccca539bf",
  measurementId: "G-SG7ERH8SG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
async function getBookstores(db) {
    const bookstoresCol = collection(db, "bookstore");
    const bookstoreSnapshot = await getDocs(bookstoresCol);
    const bookstoreList = bookstoreSnapshot.docs.map((doc) => doc.data());
    return bookstoreList;
}

//Accessing HTML elements for form and UL
const bookstoreList = document.getElementById('bookstore-list');
const form = document.getElementById('add-bookstore-form')


// setting up LI and creating delete
function renderBookstore(dc){
    let li = document.createElement("li");
    let name = document.createElement("span");
    let city = document.createElement("span");
    let cross = document.createElement("div");
    
    li.setAttribute('data-id', dc.id);
    name.textContent = dc.data().name;
    city.textContent = dc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    bookstoreList.appendChild(li);

    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        deleteDoc(doc(db, "bookstore", id))
    })
}

//creating snapshot
const bookstores = getDocs(collection(db, 'bookstore')).then((snapshot) => {
    snapshot.forEach((doc) =>{
        renderBookstore(doc)
    })
})

const q = query(collection(db, "bookstore"), where("city", "==", "boston"));
const querySnapshot =  await getDocs(q);
querySnapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data())
})

// const upDoc = doc(db, "bookstore", "I2UAkyzTq8vIDm8oIT9D");
// updateDoc(upDoc, {
//     name: "Unique Books"
// })


//submitting the form
form.addEventListener(('submit'), (e) => {
    e.preventDefault();
    const docRef = addDoc(collection(db, "bookstore"), {
        city: form.city.value,
        name: form.name.value,
    })
    
})
 
