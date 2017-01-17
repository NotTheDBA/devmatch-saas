class ContactsController < ApplicationController
  # GET request to /contact-us
  # Show new contact form
  def new
    @contact = Contact.new
  end
  
  # POST request to /contacts
  def create
    # Assignment of form fields in to contact object
    @contact = Contact.new(contact_params)
    #Save to the database
    if @contact.save
      # Store form fields via parameters into variables
       name = params[:contact][:name]
       email = params[:contact][:email]
       body = params[:contact][:comments]
       # send via contact mailer
       ContactMailer.contact_email(name, email, body).deliver
       flash[:success] = "Message sent."
       redirect_to contact_us_path
    else
      flash[:danger] = @contact.errors.full_messages.join(", ")
       redirect_to contact_us_path
    end
  end

private
  # Added strong variable permissions.
  def contact_params
     params.require(:contact).permit(:name, :email, :comments)
  end
end