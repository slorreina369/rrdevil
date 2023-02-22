//display queue list
async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#art_title").value.trim();
  const author = document.querySelector("#art_author").value.trim();
  const article_url = document.querySelector("#article_url").value.trim();
  const policy = document.querySelector("#policy_cat").value.trim();
  const summary = document.querySelector("#summary-message").value.trim();
  const email = document.querySelector("#contact_email").value.trim();

  if (title && author && article_url && email) {
    fetch(`/api/queue`, {
      method: "POST",
      body: JSON.stringify({
        title,
        author,
        article_url,
        policy,
        summary,
        email,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response);
      })
      .then(() => {
        location.reload();
      });
  }
}

document
  .querySelector(".new-article-form")
  .addEventListener("submit", newFormHandler);
