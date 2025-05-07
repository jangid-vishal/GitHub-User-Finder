
const searchBtn = document.getElementById('searchBtn');
const profileDiv = document.getElementById('profile');
const input = document.getElementById('username');

// 🔁 Show default loading card on page load
window.addEventListener('DOMContentLoaded', () => {
  profileDiv.innerHTML = getLoadingCard();
});

searchBtn.addEventListener('click', () => {
  const username = input.value.trim();
  if (!username) {
    profileDiv.innerHTML = `<p class="text-red-400 font-medium">Please enter a GitHub username.</p>`;
    return;
  }

  profileDiv.innerHTML = getLoadingCard(); // show loading while fetching

  fetch(`https://api.github.com/users/${username}`)
    .then(res => {
      if (!res.ok) throw new Error("User not found");
      return res.json();
    })
    .then(data => {
      profileDiv.innerHTML = `
        <div class="border border-githubBorder p-6 rounded-md bg-githubSurface">
          <div class="flex items-center gap-6">
            <img src="${data.avatar_url}" alt="${data.login}" class="w-20 h-20 rounded-full border border-githubBorder">
            <div>
              <h2 class="text-xl font-semibold text-white">${data.name || data.login}</h2>
              <p class="text-gray-400 text-sm">@${data.login}</p>
            </div>
          </div>

          <p class="mt-4 text-gray-300">${data.bio || 'No bio available.'}</p>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-sm text-gray-400">
            <div><span class="text-white font-medium">Repos:</span> ${data.public_repos}</div>
            <div><span class="text-white font-medium">Followers:</span> ${data.followers}</div>
            <div><span class="text-white font-medium">Following:</span> ${data.following}</div>
            <div><span class="text-white font-medium">Location:</span> ${data.location || 'N/A'}</div>
          </div>

          <div class="mt-6">
            <a href="${data.html_url}" target="_blank"
               class="inline-block text-githubAccent hover:underline font-medium">
              🔗 Visit GitHub Profile
            </a>
          </div>
        </div>
      `;
    })
    .catch(err => {
      profileDiv.innerHTML = `<p class="text-red-400 font-medium">Error: ${err.message}</p>`;
    });
});

function getLoadingCard() {
  return `
    <div class="animate-pulse bg-githubSurface border border-githubBorder rounded-md p-6 space-y-4">
      <div class="flex items-center gap-6">
        <div class="w-20 h-20 bg-gray-700 rounded-full"></div>
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-gray-700 rounded w-1/2"></div>
          <div class="h-3 bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>
      <div class="h-4 bg-gray-700 rounded w-full"></div>
      <div class="h-4 bg-gray-700 rounded w-5/6"></div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
        <div class="h-4 bg-gray-700 rounded w-3/4"></div>
        <div class="h-4 bg-gray-700 rounded w-3/4"></div>
        <div class="h-4 bg-gray-700 rounded w-3/4"></div>
        <div class="h-4 bg-gray-700 rounded w-3/4"></div>
      </div>
    </div>
  `;
}
