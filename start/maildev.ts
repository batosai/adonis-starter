import MailDev from 'maildev'

const maildev = new MailDev({
  // basePathname: '/maildev'
})

// Maildev now running on localhost:1080/maildev
maildev.listen(function (err) {
  console.log('We can now sent emails to port 1025!')
})
