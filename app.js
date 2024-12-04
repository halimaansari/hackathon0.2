import { createUserWithEmailAndPassword, getAuth } from "./firebase.js"; // Import Firebase functions
import { db } from './firebase.js';
import { collection, query, where, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    // Get references to the form fields
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const signupEmail = document.getElementById("signupEmail");
    const phone = document.getElementById("phone");
    const signupPassword = document.getElementById("signupPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const signupBtn = document.getElementById("signupBtn");

    // Add event listener to signup button
    if (signupBtn) {
        signupBtn.addEventListener("click", () => {
            // Check if all fields are filled
            if (firstName.value.trim() === "" || lastName.value.trim() === "" || signupEmail.value.trim() === "" || phone.value.trim() === "" || signupPassword.value.trim() === "" || confirmPassword.value.trim() === "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Missing Data',
                    text: 'Please fill in all fields.',
                });
                return;  // Stop if any field is empty
            }

            // Check if passwords match
            if (signupPassword.value !== confirmPassword.value) {
                Swal.fire({
                    icon: 'error',
                    title: 'Password Mismatch',
                    text: 'The passwords do not match. Please try again.',
                });
                return;  // Stop if passwords don't match
            }

            const auth = getAuth();

            // Create user with email and password
            createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("User created:", user);

                    Swal.fire({
                        icon: 'success',
                        title: 'Registration Successful',
                        text: 'You have successfully created your account!',
                    });

                    // Redirect to sign-in page after 1.5 seconds
                    setTimeout(() => {
                        location.href = "signin.html";
                    }, 1500);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.error("Error:", errorMessage);

                    // Show error message using SweetAlert2
                    Swal.fire({
                        icon: 'error',
                        title: 'Registration Failed',
                        text: errorMessage,
                    });
                });
        });
    }
});
// Import necessary Firebase modules


// Select the posts containers for each category
const healthPostsContainer = document.getElementById('health-posts-container');
const generalPostsContainer = document.getElementById('general-posts-container');
const educationPostsContainer = document.getElementById('education-posts-container');
const politicsPostsContainer = document.getElementById('politics-posts-container');

// Function to fetch posts from Firestore based on category
async function fetchPostsByCategory(category, postsContainer) {
  postsContainer.innerHTML = '';  // Clear existing posts

  // Firestore query to fetch posts filtered by category
  const postsQuery = query(
    collection(db, "posts"),
    where("category", "==", category),  // Filter posts by category
    orderBy("timestamp", "desc")  // Order by timestamp
  );

  const querySnapshot = await getDocs(postsQuery);

  // Check if any posts are fetched
  if (querySnapshot.empty) {
    postsContainer.innerHTML = `<p>No posts available in the ${category} category.</p>`;
  } else {
    // Loop through the fetched posts and display them
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      const postElement = document.createElement("div");
      postElement.classList.add("post");
      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p class="category">${post.category}</p>
        <p>${post.content}</p>
        <p><small>Posted on: ${new Date(post.timestamp.seconds * 1000).toLocaleString()}</small></p>
      `;
      postsContainer.appendChild(postElement);
    });
  }
}

// Function to display posts based on categories
async function displayCategoryPosts() {
  // Fetch posts for each category and display in respective containers
  await fetchPostsByCategory("Health", healthPostsContainer);
  await fetchPostsByCategory("General", generalPostsContainer);
  await fetchPostsByCategory("Education", educationPostsContainer);
  await fetchPostsByCategory("Politics", politicsPostsContainer);
}

// Call the function to display posts on page load
displayCategoryPosts();
