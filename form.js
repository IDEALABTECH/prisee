const scriptURL = 'https://script.google.com/macros/s/AKfycby-nlp_XuPRDPkQ5qpucdRqYfMNuMnQuBymYfhNUZxbNcfFDnFib_DiU7fjpn2s1ZIU/exec';
const form = document.forms['submit-to-google-sheet'];
const successMessage = document.querySelector('.success-message');

form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      successMessage.style.display = 'block';
      form.reset();
    })
    .catch(error => console.error('Error!', error.message));
});
