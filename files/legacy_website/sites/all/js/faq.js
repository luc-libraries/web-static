//when the page is ready
   $(document).ready(function(){
     $(".faq_q").append('<i class="fa fa-angle-down"></i>');
     $(".faq_a").hide();
     $(".faq_q").click(function(event){
       $(this).next(".faq_a").toggle();
       
       // Stop the link click from doing its normal thing
       event.preventDefault();
     });
   });
