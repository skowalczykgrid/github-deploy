const message = document.getElementById("form_message");
const counter = document.getElementById("form_message-counter");

message.addEventListener("input", (e) => {
  const target = e.target;
  const maxLength = target.getAttribute("maxlength");

  const currentLength = target.value.length;
  console.log("asd");
  counter.innerText = `${currentLength} / ${maxLength}`;
});
