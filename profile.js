import { db, auth } from './firebase.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import Swal from 'sweetalert2';

// Select form elements
const form = document.getElementById("addPostForm");
const titleField = document.getElementById("title");
const contentField = document.getElementById("content");

// Form submission logic
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get form data
  const title = titleField.value;
  const content = contentField.value;

  // Show SweetAlert to choose category
  const { value: category } = await Swal.fire({
    title: 'Select a Category',
    input: 'select',
    inputOptions: {
      'Health': 'Health',
      'Education': 'Education',
      'General': 'General',
      'Politics': 'Politics'
    },
    inputPlaceholder: 'Select Category...',
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to select a category!';
      }
    }
  });

  if (category) {
    try {
      // Add the post to Firestore
      const docRef = await addDoc(collection(db, "posts"), {
        title: title,
        content: content,
        category: category,
        timestamp: serverTimestamp(),
        userId: auth.currentUser.uid,  // Save the user ID for reference
      });

      console.log("Post added with ID: ", docRef.id);

      // Show SweetAlert success and redirect to main page
      Swal.fire({
        icon: 'success',
        title: 'Post Added',
        text: 'Your post has been added successfully!',
        confirmButtonText: 'Go to Home'
      }).then(() => {
        window.location.href = "index.html";  // Redirect to homepage
      });

    } catch (e) {
      console.error("Error adding post: ", e);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an issue adding your post. Please try again later.',
      });
    }
  }
});
