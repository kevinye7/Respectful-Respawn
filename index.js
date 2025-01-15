// Toggle Dark Mode Functionality
let themeButton = document.getElementById("theme-button");
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");

    // Save the user's preference to localStorage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Apply the saved theme on page load
const applySavedTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

themeButton.addEventListener("click", toggleDarkMode);

// Apply saved theme on page load
applySavedTheme();

// Revealable Containers Animation on Scroll
let animation = {
    revealDistance: 150,
    initialOpacity: 0,
    transitionDelay: 0,
    transitionDuration: '2s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease'
};

const revealableContainers = document.querySelectorAll('.revealable');

const reveal = () => {
    for (let i = 0; i < revealableContainers.length; i++) {
        let windowHeight = window.innerHeight;
        let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
        if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
            revealableContainers[i].classList.add('active')
        } else {
            revealableContainers[i].classList.remove('active')
        }
    }
}

window.addEventListener('scroll', reveal);

if (window.location.pathname === '/support.html') {
    // Signature Functionality
    let signNowButton = document.getElementById("sign-now-button");
    let count = 5;  // Initialize signature count

    // Function to handle adding a signature
    const addSignature = (person) => {
        count++;
        // Update the count display (assuming 'counter' is the element displaying the count)
        counter.textContent = `${count} supporters have signed this petition`;

        // Create and append the new signature element
        let newSignature = document.createElement('p');
        newSignature.textContent = `${person.name} - ${person.hometown}`;
        let signaturesSection = document.querySelector('.signature-list');
        signaturesSection.insertBefore(newSignature, signaturesSection.firstChild);

        // Clear form fields after submission
        document.getElementById('name').value = '';
        document.getElementById('hometown').value = '';
        document.getElementById('email').value = '';
    }

    // Modal functionality
    const toggleModal = (person) => {
        const modal = document.getElementById("thanks-modal");
        const modalContent = document.getElementById("thanks-modal-content");

        modal.style.display = "flex";
        modalContent.textContent = `Thank you so much ${person.name}! ${person.hometown} represent!`;

        setTimeout(() => {
            modal.style.display = "none";
            clearInterval(intervalId);
        }, 4000);

        // Start image scaling animation
        intervalId = setInterval(scaleImage, 500);
    }

    // Image scaling animation for the modal
    let scaleFactor = 1;
    const modalImage = document.querySelector('.modal img');

    const scaleImage = () => {
        scaleFactor = scaleFactor === 1 ? 0.8 : 1;
        modalImage.style.transform = `scale(${scaleFactor})`;
    };

    // TODO: Complete validation form

    const validateForm = () => {
        let containsErrors = false;
        const petitionInputs = document.getElementById("sign-petition").elements;

        let person = {
            name: petitionInputs[0].value,
            hometown: petitionInputs[1].value,
            email: petitionInputs[2].value
        }

        // Loop through form inputs and check for validation errors
        for (let i = 0; i < petitionInputs.length; i++) {
            if (petitionInputs[i].value.length < 2) {
                containsErrors = true;
                petitionInputs[i].classList.add('error');
            } 
            else {
                petitionInputs[i].classList.remove('error');
            }
        }
        
        // Validate email format
        const email = document.getElementById('email');
        if (!email.value.includes('.com')) {
            containsErrors = true;
            email.classList.add('error');
        }

        // If no errors, add signature and clear the form
        if (!containsErrors) {
            addSignature(person);
            toggleModal(person);

            // Clear form values
            for (let i = 0; i < petitionInputs.length; i++) {
                petitionInputs[i].value = "";
            }
        }
    }
    
    // Event listener for the "Sign Now" button
    signNowButton.addEventListener('click', validateForm);
}

if (window.location.pathname === '/community.html') {
    document.getElementById('postButton').addEventListener('click', function() {
        const title = document.getElementById('postTitle').value;
        const name = document.getElementById('postName').value;
        const message = document.getElementById('postMessage').value;
        
        if (title && name && message) {
            const postContainer = document.querySelector('.post-container');
            
            const newPost = document.createElement('div');
            newPost.classList.add('post');
            newPost.innerHTML = `
                <h3>${title}</h3>
                <h4>Post by ${name}</h4>
                <p>${message}</p>
                <div class="reply-section">
                    <div class="reply-form" style="display: none;">
                        <input type="text" class="replyName" placeholder="Your Name">
                        <textarea class="replyMessage" placeholder="Your Message"></textarea>
                        <button class="submitReply">Submit Reply</button>
                    </div>
                    <button class="reply-btn">Reply</button>
                </div>
            `;
            
            postContainer.appendChild(newPost);
            
            document.getElementById('postTitle').value = '';
            document.getElementById('postName').value = '';
            document.getElementById('postMessage').value = '';

            // Add reply button functionality to the newly created post
            newPost.querySelector('.reply-btn').addEventListener('click', function() {
                const replyForm = this.previousElementSibling;
                if (replyForm.style.display === 'block') {
                    replyForm.style.display = 'none';
                }
                else {
                    replyForm.style.display = 'block';
                }
            });

            // Add submit reply functionality to the newly created post
            newPost.querySelector('.submitReply').addEventListener('click', function() {
                const replyForm = this.parentElement;
                const name = replyForm.querySelector('.replyName').value;
                const message = replyForm.querySelector('.replyMessage').value;

                if (name && message) {
                    const replySection = this.parentElement.parentElement;

                    const newReply = document.createElement('div');
                    newReply.classList.add('reply');
                    newReply.innerHTML = `<h4>Reply by ${name}</h4><p>${message}</p>`;
                    replySection.insertBefore(newReply, replyForm);
                    
                    replyForm.querySelector('.replyName').value = '';
                    replyForm.querySelector('.replyMessage').value = '';
                    replyForm.style.display = 'none'; // Hide the form after submission
                } 
            });
        } 
    });

    // Existing functionality for the reply buttons in the current posts
    document.querySelectorAll('.reply-btn').forEach(button => {
        button.addEventListener('click', function() {
            const replyForm = this.previousElementSibling;
            if (replyForm.style.display === 'block') {
                replyForm.style.display = 'none';
            }
            else {
                replyForm.style.display = 'block';
            }
        });
    });

    // Existing submit reply functionality for current posts
    document.querySelectorAll('.submitReply').forEach(button => {
        button.addEventListener('click', function() {
            const replyForm = this.parentElement;
            const name = replyForm.querySelector('.replyName').value;
            const message = replyForm.querySelector('.replyMessage').value;

            if (name && message) {
                const replySection = this.parentElement.parentElement;

                const newReply = document.createElement('div');
                newReply.classList.add('reply');
                newReply.innerHTML = `<h4>Reply by ${name}</h4><p>${message}</p>`;
                replySection.insertBefore(newReply, replyForm);
                
                replyForm.querySelector('.replyName').value = '';
                replyForm.querySelector('.replyMessage').value = '';
                replyForm.style.display = 'none'; // Hide the form after submission
            } 
        });
    });
}