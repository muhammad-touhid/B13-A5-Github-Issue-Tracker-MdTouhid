const issuesContainer = document.getElementById("issues-container");
let issuesData = [];
const setActiveTab = (activeBtnId) => {
  const allTabs = document.querySelectorAll(".tab-btn");
  allTabs.forEach((btn) => {
    btn.classList.remove("btn-primary");
  });
  document.getElementById(activeBtnId).classList.add("btn-primary");
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("issues-container").classList.add("hidden");
  } else {
    document.getElementById("issues-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadIssues = () => {
  manageSpinner(true);
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => {
      issuesData = json.data;
      displayIssues(issuesData);
    });
};

document.getElementById("all-tab-btn").addEventListener("click", function () {
  displayIssues(issuesData);
  setActiveTab("all-tab-btn");
});

document.getElementById("open-tab-btn").addEventListener("click", function () {
  const openIssues = issuesData.filter((issue) => issue.status == "open");
  displayIssues(openIssues);
  setActiveTab("open-tab-btn");
});

document
  .getElementById("closed-tab-btn")
  .addEventListener("click", function () {
    const closedIssues = issuesData.filter((issue) => issue.status == "closed");
    displayIssues(closedIssues);
    setActiveTab("closed-tab-btn");
  });

const loadSearchedIssue = (searchValue) => {
  manageSpinner(true);
  fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`,
  )
    .then((res) => res.json())
    .then((searchResult) => displayIssues(searchResult.data));
};

document.getElementById("search-btn").addEventListener("click", function () {
  const searchValue = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase();
  loadSearchedIssue(searchValue);
});

const loadIssueDetail = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

  const res = await fetch(url);
  const detials = await res.json();
  displayIssueDetail(detials.data);
};

const displayIssueDetail = (issue) => {
  let modalStatusColor = "";
  if (issue.status === "open") {
    modalStatusColor = "bg-[#00A96E]";
  } else {
    modalStatusColor = "bg-[#A855F7]";
  }

  let modalPriorityClass = "";

  if (issue.priority === "high") {
    modalPriorityClass = "bg-[#EF4444]";
  } else if (issue.priority === "medium") {
    modalPriorityClass = "bg-orange-400";
  } else {
    modalPriorityClass = "bg-blue-700";
  }

  let modalLablesElement = "";
  for (let modalLabel of issue.labels) {
    let modalLabelsClass = "";
    if (modalLabel === "bug") {
      modalLabelsClass = "badge-secondary";
    } else if (modalLabel === "help wanted") {
      modalLabelsClass = "badge-warning";
    } else if (modalLabel === "enhancement") {
      modalLabelsClass = "badge-success";
    } else {
      modalLabelsClass = "badge-accent";
    }

    modalLablesElement += `
            <div class="badge badge-soft ${modalLabelsClass}">
                <img src="./assets/card icon/${modalLabel}.png" alt="" />${modalLabel}
            </div>
        `;
  }

  const issueModalDetails = document.getElementById("modal-details-container");
  issueModalDetails.innerHTML = `
        <h3 class="text-xl font-bold">${issue.title}</h3>
              <div class="flex my-3 gap-2">
                <div class="badge ${modalStatusColor} text-white rounded-full p-3">
                  ${issue.status}
                </div>
                <span class="text-gray-400">•</span>
                <p class="text-gray-400">Opened by ${issue.author}</p>
                <span class="text-gray-400">•</span>
                <p class="text-gray-400">${issue.createdAt}</p>
              </div>
              <div class="labels flex gap-2 flex-wrap my-6">
                ${modalLablesElement}
              </div>
              <p class="text-gray-400">
                The navigation menu doesn't collapse properly on mobile devices.
                Need to fix the responsive behavior.
              </p>
              <div class="p-4 rounded-lg bg-gray-50 flex my-6">
                <div class="w-[50%]">
                  <p class="text-gray-400">Assignee:</p>
                  <h4 class="font-bold">${issue.assignee}</h4>
                </div>
                <div class="w-[50%]">
                  <p class="text-gray-400">Priority:</p>
                  <div class="badge ${modalPriorityClass} text-white rounded-full p-3">
                    ${issue.priority}
                  </div>
                </div>
              </div>
    `;
  document.getElementById("issue_modal").showModal();
};

function displayIssues(issues) {
  issuesContainer.innerHTML = "";

  for (let issue of issues) {
    let priorityClass = "";

    if (issue.priority === "high") {
      priorityClass = "badge-secondary";
    } else if (issue.priority === "medium") {
      priorityClass = "badge-warning";
    } else {
      priorityClass = "badge-primary";
    }

    let statusColor = "";

    if (issue.status === "open") {
      statusColor = "border-[#00A96E]";
    } else {
      statusColor = "border-[#A855F7]";
    }

    const issueCard = document.createElement("div");

    let lablesElement = "";
    for (let label of issue.labels) {
      let labelsClass = "";
      if (label === "bug") {
        labelsClass = "badge-secondary";
      } else if (label === "help wanted") {
        labelsClass = "badge-warning";
      } else if (label === "enhancement") {
        labelsClass = "badge-success";
      } else {
        labelsClass = "badge-accent";
      }

      lablesElement += `
            <div class="badge badge-soft ${labelsClass}">
                <img src="./assets/card icon/${label}.png" alt="" />${label}
            </div>
        `;
    }

    issueCard.innerHTML = `
        <div onclick="loadIssueDetail(${issue.id})"
              class="isseu-card bg-white rounded-md border-t-3 ${statusColor} shadow-sm cursor-pointer"
            >
              <div class="isseu-card-top p-4 border-b-2 border-gray-200">
                <div class="flex justify-between items-center">
                  <img src="./assets/Open-Status.png" alt="" />
                  <div class="badge badge-soft ${priorityClass}">${issue.priority}</div>
                </div>
                <h2 class="mt-3 text-xl font-semibold">
                  ${issue.title}
                </h2>
                <p class="mt-3 text-gray-400 line-clamp-2">
                  ${issue.description}
                </p>
                <div class="labels mt-3 flex gap-2 flex-wrap">
                  ${lablesElement}
                </div>
              </div>

              <div class="isseu-card-bottom p-4">
                <p class="text-gray-500"> by ${issue.author}</p>
                <p class="text-gray-500">${issue.createdAt}</p>
              </div>
            </div>
    `;

    issuesContainer.append(issueCard);
  }
  manageSpinner(false);

  document.getElementById("issue-card-count").innerHTML =
    issuesContainer.children.length;
}
loadIssues();
