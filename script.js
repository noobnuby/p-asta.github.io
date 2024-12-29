// intro animation
let emoticon = document.querySelector("#face");
let moreInfoDialog = document.querySelector("#more-info");
emoticon_txt = [":D", ":P", ":O", ":I", ":V"];
let i = 0;
const emoticon_changer = () => {
  emoticon.innerHTML = emoticon_txt[i++ % emoticon_txt.length];
  setTimeout(emoticon_changer, 1000);
};
emoticon_changer();
emoticon.innerHTML = ":D";

// my projects
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("projects-container");
    data.forEach((project) => {
      const projectDiv = document.createElement("div");
      projectDiv.className = "project";

      projectDiv.onclick = () => {
        moreInfoDialog.showModal();
        projectDiv.classList.add("active");

        moreInfoDialog.innerHTML = `
                    ${
                      project.image
                        ? `
                        <div id="header" style="--img-url: url(${project.image})">
                            <img id="close-btn" src="img/x.svg" />
                        </div>`
                        : `<img id="close-btn" src="img/x.svg" />
                    `
                    }
                    
                    <h1>${project.github.split("/").pop()}</h1>
                    <p>${project.long_description.replace("\n", "<br />")}</p>
                    <div id="pages">
                        ${
                          project.github
                            ? `
                        <a href="https://github.com${project.github}" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                        </a>`
                            : ""
                        }
                        ${
                          project.site
                            ? `
                        <a href="${project.site}" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rss"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>
                        </a>`
                            : ""
                        }    
                    </div>
                `;

        const closeButton = moreInfoDialog.querySelector("#close-btn");

        closeButton.addEventListener("mousedown", () => {
          projectDiv.classList.add("active");
        });

        closeButton.addEventListener("mouseup", () => {
          projectDiv.classList.remove("active");
        });

        moreInfoDialog.addEventListener("click", (e) => {
          let rect = moreInfoDialog.getBoundingClientRect();
          var isInDialog =
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width;
          if (!isInDialog || e.target.id == "close-btn") {
            moreInfoDialog.close();
            projectDiv.classList.remove("active");
          }
        });
      };

      projectDiv.setAttribute("target", "_blank");
      projectDiv.innerHTML = `
                <div>
                    <p>${project.github}</p>
                    <div>
                        <h2>stack</h2>
                        <hr>
                        <div>
                            ${project.stack
                              .map((tech) => `<p>${tech}</p>`)
                              .join("")}
                        </div>
                    </div>
                </div>
                <div>
                    <h2>${project.github.split("/").pop()}</h2>
                    ${project.short_description}
                </div>
            `;
      container.appendChild(projectDiv);
    });
  });
