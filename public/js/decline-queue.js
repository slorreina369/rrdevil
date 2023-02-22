async function deleteFormHandler(event) {
  event.preventDefault();

  const id = event.target.closest(".queue-list-itm").dataset.id;

  const response = await fetch(`/api/queue/${id}`, {
    method: "DELETE",
  });

  if (window.confirm("Are you sure?")) {
    if (response.ok) {
      document.location.replace("/queue/");
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelectorAll(".decline").forEach((el) => {
  el.addEventListener("click", deleteFormHandler);
});
