
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";
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
const bookstoreList = document.getElementById('bookstore-list');
const form = document.getElementById('add-bookstore-form')

function renderBookstore(doc){
    let li = document.createElement("li");
    let name = document.createElement("span");
    let city = document.createElement("span");
    
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.name;
    city.textContent = doc.city;

    li.appendChild(name);
    li.appendChild(city);

    bookstoreList.appendChild(li);
}

const bookstores = getBookstores(db).then((snapshot) => {
    snapshot.forEach((doc) =>{
        renderBookstore(doc)
    })
})


form.addEventListener(('submit'), (e) => {
    e.preventDefault();
    const docRef = addDoc(collection(db, "bookstore"), {
        city: form.city.value,
        name: form.name.value,
    })
    
})
 
