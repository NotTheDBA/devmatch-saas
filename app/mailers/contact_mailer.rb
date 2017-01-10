class ContactMailer < ActionMailer::Base
    default to: 'notthedba@outlook.com'
    def contact_email(name, email, body)
        @name = name
        @email = email
        @body = body
        mail(from: email, subject:'Saasapp Contact Form Message')
    end
end
