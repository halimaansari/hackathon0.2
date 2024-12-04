import { 
    signInWithPopup, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword, 
    getAuth, 
   
} from "./firebase.js";

const auth = getAuth();

document.addEventListener("DOMContentLoaded", () => {
    const signInPassword = document.getElementById("signInPassword");
    const signInEmail = document.getElementById("signInEmail");
    const loginBtn = document.getElementById("loginBtn");
    const googleSignInBtn = document.getElementById("btn");

    // Email/Password sign-in
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            const email = signInEmail.value.trim();
            const password = signInPassword.value.trim();
            
            if (email && password) {
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log(user);
                        Swal.fire({
                            title: 'Success!',
                            text: 'You have logged in successfully!',
                            icon: 'success',
                            confirmButtonText: 'Proceed to Profile'
                        }).then(() => {
                            location.href = "profile.html";  // Redirect to profile page after successful login
                        });
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.error("Error: ", errorCode, errorMessage);
                        Swal.fire({
                            title: 'Error!',
                            text: 'Error during sign-in. Please check your credentials.',
                            icon: 'error',
                            confirmButtonText: 'Try Again'
                        });
                    });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Please provide both email and password.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    }

    // Google Sign-In
    if (googleSignInBtn) {
        googleSignInBtn.addEventListener("click", () => {
            const provider = new GoogleAuthProvider();

            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    console.log(user);
                    Swal.fire({
                        title: 'Success!',
                        text: 'You have logged in with Google successfully!',
                        icon: 'success',
                        confirmButtonText: 'Proceed to Profile'
                    }).then(() => {
                        location.href = "profile.html";  // Redirect to profile page after successful Google sign-in
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Google Sign-In Error: ", errorCode, errorMessage);
                    Swal.fire({
                        title: 'Google Sign-In Failed!',
                        text: 'Google sign-in failed. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'Try Again'
                    });
                });
        });
    }
});