var remove = document.getElementsByClassName('delete')
var edit = document.getElementsByClassName('edit')
var add = document.getElementsByName('add')
var save = document.getElementsByClassName('save')
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

Array.from(edit).forEach(function(element) {
  element.addEventListener('click',  function(){
      user = document.getElementById('user').innerText
      oldFirst = this.parentNode.childNodes[1].childNodes[0].innerText
      oldLast = this.parentNode.childNodes[1].childNodes[2].innerText
      oldNumber = this.parentNode.childNodes[3].childNodes[3].innerText
      oldEmail = this.parentNode.childNodes[3].childNodes[7].innerText
      fetch('contactsedit', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'oldFirst': oldFirst,
          'oldLast': oldLast,
          'oldNumber': oldNumber,
          'oldEmail': oldEmail,
          'user': user
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
});

Array.from(save).forEach(function(element) {
  element.addEventListener('click',  function(){
      user = document.getElementById('user').innerText
      updatedFirst = this.parentNode.childNodes[1].childNodes[1].childNodes[3].value
      updatedLast = this.parentNode.childNodes[1].childNodes[3].childNodes[3].value
      updatedNumber = this.parentNode.childNodes[3].childNodes[3].value
      updatedEmail = this.parentNode.childNodes[5].childNodes[3].value

      oldFirst = this.parentNode.childNodes[1].childNodes[1].childNodes[5].innerText
      oldLast = this.parentNode.childNodes[1].childNodes[3].childNodes[5].innerText
      oldNumber = this.parentNode.childNodes[3].childNodes[5].innerText
      oldEmail = this.parentNode.childNodes[5].childNodes[5].innerText
      fetch('contacts', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'oldFirst': oldFirst,
          'oldLast': oldLast,
          'oldNumber': oldNumber,
          'oldEmail': oldEmail,
          'updatedFirst': updatedFirst,
          'updatedLast': updatedLast,
          'updatedNumber': updatedNumber,
          'updatedEmail': updatedEmail,
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

