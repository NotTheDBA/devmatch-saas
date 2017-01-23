/* global $, Stripe */
//Document ready.
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  //Set Stripe public key.
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  //When user clicks form submit btn,
  submitBtn.click(function(event){
    //prevent default submission behavior.
    event.preventDefault();
    
    //disable the button
    submitBtn.val("Processing...").prop('disabled', true);
    
    //Collect the credit card fields.
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
    //Use Stripe js library to check for card errors
    if(!Stripe.card.validateCardNumber(ccNum)) {
      //if the card has errors, don't send to Stripe
      alert('Could not validate the card number.  Please try again.')
    }
    else if(!Stripe.card.validateCVC(cvcNum)) {
      //if the CVC has errors, don't send to Stripe
      alert('Could not validate the CVC number.  Please try again.')
    }
    else if(!Stripe.card.validateExpiry(expMonth, expYear)) {
      //if the Expire has errors, don't send to Stripe
      alert('Could not validate the expiration date.  Please try again.')
    }
    else{
      //Send the card info to Stripe.
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
  
      //reenable the button
    submitBtn.val("Sign Up").prop('disabled', false);
     
    return false;
  });
  
  
  //Stripe will return a card token.
  function stripeResponseHandler(status, response) {
    var token = response.id;

    //Inject card token as hidden field into form.
    theForm.append( $('<input type= "hidden" name="user[stripe_card_token]">').val(token) );
    theForm.get(0).submit;
  }
  
  //Submit form to our Rails app.
});