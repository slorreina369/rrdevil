async function confirmFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector(".title").value.trim();
  const author = document.querySelector(".author").value.trim();
  const article_url = document.querySelector(".art_url").value.trim();
  const summary = document.querySelector("./summary").value.trim();
  const policy = document.querySelector("./policy-choice").value.trim();

  const response = await fetch(`/api/articles`, {
    method: "POST",
    body: JSON.stringify({
      title,
      author,
      article_url,
      summary,
      policy,
    }),
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    console.log(response);
  });
}
