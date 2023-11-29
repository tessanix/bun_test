window.addEventListener("DOMContentLoaded", function () {
    fetch("/books", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }

    })
        .then((res) => res.json())
        .then((books) => {
            document.getElementById("bookList").innerHTML = books.map((book) => {
                return `
                <li id="${book.id}">
                    ID: ${book.id} <br> Name: ${book.name} <br> Author: ${book.author}
                </li>
            `
            }).join("");
        })
}, false);

const hamburger = document.querySelector('.hamburger');
const verticalNav = document.querySelector('.vertical-nav');
const horizontalNav = document.querySelector('.horizontal-nav');
// const iconConnexion = document.querySelector('.connexion-icon');
const connexionSubmenu = document.querySelector('#connexion-submenu');
const iconContainer = document.querySelector('.icon-container');
const loginTab = document.querySelector('#login-tab');

iconContainer.addEventListener('mouseover', () => {
    connexionSubmenu.style.display = 'flex';
});

iconContainer.addEventListener('mouseout', () => {
    connexionSubmenu.style.display = 'none';
});

connexionSubmenu.addEventListener('mouseover', () => {
    connexionSubmenu.style.display = 'flex';
});

connexionSubmenu.addEventListener('mouseout', () => {
    connexionSubmenu.style.display = 'none';
});

document.getElementById('showLoginTabButton').addEventListener('click', () => {
    loginTab.style.display = 'grid';
});
  
document.getElementById('closeLoginTabButton').addEventListener('click', () => {
    loginTab.style.display = 'none';
});

window.addEventListener("scroll", () => {
    // Calculate the scroll position as a percentage of the page height
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    // Add the 'fade-out' class to the body when the scroll position is 20% or more
    if (scrollPercentage >= 20) {
        horizontalNav.classList.add("slide-up");
        hamburger.classList.add("fade-in");
    } else {
        horizontalNav.classList.remove("slide-up");
        hamburger.classList.remove("fade-in");
        verticalNav.classList.remove("slide-left")
    }
});


hamburger.addEventListener("click", () => {
    verticalNav.classList.toggle("slide-left");
});

function goToProductsPage() {
    fetch('/products', {
        method: 'GET'
      })
      //.then(response => response.json())
      .then(data => {
        console.log('Server response:', data);
        // Handle the server response as needed
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

function submitLoginForm(isUserAlreadyRegistered) {
    var form = document.getElementById('loginForm');
    var formData = new FormData(form)
    let route = (isUserAlreadyRegistered)? '/submitLogin' : '/submitRegistration'

    // You can add additional values to the FormData object if needed
    // formData.append('additionalField', 'additionalValue');

    // Send the form data to the server using fetch or another AJAX method
    fetch(route, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Server response:', data);
      // Handle the server response as needed
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


// const addNewBook = () => {
//     const newBook = prompt("Book name & author (separated by a comma)");
//     if (newBook) {
//         const [name, author] = newBook.split(",");
//         fetch("/books", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ name, author }),
//         })
//             .then((res) => res.json())
//             .then((res) => {
//                 if (res.success) {
//                     document.getElementById("bookList").innerHTML += `
//                     <li id="${res.id}">
//                         ID: ${res.id} Name: ${name} <br> Author: ${author}
//                     </li>
//                 `
//                 }
//             });
//     }
// };


// const deleteBook = () => {
//     const bookPrompt = prompt("Book ID");
//     if (!bookPrompt) return alert("Invalid book ID");
//     const bookId = parseInt(bookPrompt);
//     if (bookId) {
//         fetch(`/books/${bookId}`, {
//             method: "DELETE",
//         })
//             .then((res) => res.json())
//             .then((res) => {
//                 if (res.success) {
//                     document.getElementById(bookId).remove();
//                 }
//             });
//     }
// };

// const updateBook = () => {
//     const bookPrompt = prompt("Book ID");
//     if (!bookPrompt) return alert("Invalid book ID");
//     const bookId = parseInt(bookPrompt);
//     if (bookId) {
//         const newBook = prompt("Book name & author (separated by a comma)");
//         if (newBook) {
//             const [name, author] = newBook.split(",");
//             fetch(`/books/${bookId}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ name, author }),
//             })
//                 .then((res) => res.json())
//                 .then((res) => {
//                     if (res.success) {
//                         document.getElementById(bookId).innerHTML = `
//                         ID: ${bookId} <br> Name: ${name} <br> Author: ${author}
//                     `
//                     }
//                 });
//         }
//     }
// };    