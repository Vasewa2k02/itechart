class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

async function loadJson(url) {
  const response = await fetch(url);

  if (response.status === 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

async function demoGithubUser() {
  let user;

  while (!user) {
    const name = prompt("Login?", "iliakan");

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      alert(`Full name: ${user.name}.`);
    } catch (err) {
      if (err instanceof HttpError && err.response.status === 404) {
        alert("This user doesn't exist");
      } else {
        throw err;
      }
    }
  }

  return user;
}

demoGithubUser();
