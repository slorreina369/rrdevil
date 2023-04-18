//Show confirmation form when clicking "accept" button
document.querySelectorAll(".accept").forEach((el) => {
  el.addEventListener(
    "click",
    () => {
      el.closest(".queue-list-itm").querySelector(".accept-dia").showModal();
    },
    false
  );
});
