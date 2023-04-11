async function confirmFormHandler(event) {
  event.preventDefault();

  const form = event.target.closest("form");

  //Get form values
  const title = form.querySelector(".title").value.trim();
  const author = form.querySelector(".author").value.trim();
  const article_url = form.querySelector(".art_url").value.trim();
  const summary = form.querySelector(".summary").value.trim();
  const policy_id = form.querySelector(".policy-choice").value.trim();
  const submission_id = form.querySelector(".submission-id").value.trim();

  if (policy_id) {
    //Create article
    fetch(`/api/articles`, {
      method: "POST",
      body: JSON.stringify({
        title,
        author,
        article_url,
        summary,
        policy_id,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response);
      })
      .then(() => {
        //delete item from the queue once article is created
        return fetch(`/api/queue/${submission_id}`, {
          method: "DELETE",
        });
      })
      .then(() => {
        //refresh <3
        location.reload();
      });
  }
}

document.querySelectorAll(".accept-form").forEach((el) => {
  el.addEventListener("submit", confirmFormHandler);
});

//close acceptance form without approving information
document.querySelectorAll(".close-btn").forEach((closeButton) => {
  closeButton.addEventListener("click", (event) => {
    const dialogue = event.target.closest(".accept-dia");
    dialogue.close();
  });
});
