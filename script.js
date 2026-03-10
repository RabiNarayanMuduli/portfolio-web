const roles = [
    "Python Developer",
    "AI Automation Builder",
    "Freelance Software Tester"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const text = roles[roleIndex];
    const typingElement = document.querySelector(".typing");

    if (isDeleting) {
        typingElement.textContent = text.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = text.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && charIndex === text.length) {
        typeSpeed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
    loadGithub();
});

async function loadGithub() {
    const container = document.getElementById("github-projects");
    try {
        const res = await fetch("https://api.github.com/users/RabiNarayanMuduli/repos");
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const repos = await res.json();
        
        container.innerHTML = "";
        
        repos.slice(0, 6).forEach(repo => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "No description available"}</p>
                <br>
                <a href="${repo.html_url}" target="_blank" class="btn">View Repo</a>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching GitHub repos:", error);
        container.innerHTML = `<p style="color: #ef4444;">Failed to load GitHub projects. Please check your connection and try again.</p>`;
    }
}