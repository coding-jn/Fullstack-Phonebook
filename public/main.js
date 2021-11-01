var remove = document.getElementsByClassName('delete')
var add = document.getElementsByName('add')
var allContacts = document.getElementsByClassName('contact')

Array.from(remove).forEach(function(element) {
    element.addEventListener('click',  function(){
        const user = document.getElementById('user').innerText
        const first = this.parentNode.childNodes[1].childNodes[0].innerText
        const last = this.parentNode.childNodes[1].childNodes[2].innerText
        const number = this.parentNode.childNodes[3].childNodes[3].childNodes[1].innerText
        const email = this.parentNode.childNodes[3].childNodes[7].childNodes[1].innerText
        fetch('contacts', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'first': first,
            'last': last,
            'number': number,
            'email': email,
            'user': user
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

Array.from(add).forEach(function(element) {
  element.addEventListener('click',  function(){
      const first = this.parentNode.childNodes[1].childNodes[0].innerText
      const last = this.parentNode.childNodes[1].childNodes[2].innerText
      const number = this.parentNode.childNodes[3].childNodes[3].childNodes[1].innerText
      const email = this.parentNode.childNodes[3].childNodes[7].childNodes[1].innerText
      fetch('phonebook', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'first': first,
          'last': last,
          'number': number,
          'email': email
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
});

