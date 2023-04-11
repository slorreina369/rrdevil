//submit form to add an item to queue
async function newFormHandler(event) {
  event.preventDefault();

  //Get form values
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
    }).then((response) => {
      if (response.ok) {
        location.reload();
      } else {
        const article_url_input = document.querySelector("#article_url");

        //Message should only be returned if article_url is a duplicate
        response.json().then(({ message }) => {
          article_url_input.setCustomValidity(message);
          article_url_input.reportValidity();
        });
      }
    });
  }
}

document
  .querySelector(".new-article-form")
  .addEventListener("submit", newFormHandler);
