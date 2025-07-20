async function loadContributors() {
  const input = document.getElementById("repoInput").value.trim();
  const match = input.match(/github\.com\/([^\/]+)\/([^\/]+)/);

  if (!match) {
    alert("Please enter a valid GitHub repo URL.");
    return;
  }

  const owner = match[1];
  const repo = match[2];
  const url = `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=5`;

  try {
    const response = await fetch(url);
    const contributors = await response.json();
    const container = document.getElementById("contributors");

    // Clear previous contributors
    container.innerHTML = "";

    contributors.forEach((contributor, index) => {
      const x = index * 2;

      // Main box
      const box = document.createElement("a-box");
      box.setAttribute("position", `${x} 1 0`);
      box.setAttribute("depth", "0.5");
      box.setAttribute("height", "1");
      box.setAttribute("width", "1.5");
      box.setAttribute("color", "#4CC3D9");

      // Name text
      const nameText = document.createElement("a-text");
      nameText.setAttribute("value", "@" + contributor.login);
      nameText.setAttribute("color", "#000");
      nameText.setAttribute("align", "center");
      nameText.setAttribute("position", `${x} 1 0.25`);
      nameText.setAttribute("width", "4");

      // Profile picture
      const img = document.createElement("a-image");
      img.setAttribute("src", contributor.avatar_url);
      img.setAttribute("position", `${x} 2.2 0`);
      img.setAttribute("width", "1.5");
      img.setAttribute("height", "1.5");

      //   finally add all the elements
      container.appendChild(img);
      container.appendChild(box);
      container.appendChild(nameText);
    });
  } catch (error) {
    console.error("Error fetching contributors:", error);
    alert("Failed to load contributors. Check if the repo exists.");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadContributors();
});
