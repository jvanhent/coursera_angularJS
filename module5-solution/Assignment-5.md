Module 5 Coding Assignment



First, change the 2 buttons at the top of the website to say `My Info` and `Sign Up` instead of `About` and `Awards`.

**Task 1:**
When the user clicks on the `Sign Up` button, they should be taken to a view that lets them "sign up" for the newsletter (that will never come :-) ) of the restaurant. The sign up form should ask for the following information: first name, last name, email address, and phone number. It should also ask the user to specify the menu number that's their favorite dish. (The menu number is the `short_name` attribute of each menu item).

Everything in the form (except th `short_name`) must be validate through AngularJS validation we learned in this module. When the user clicks the `Submit` button (after all other fields are validate), try to retrieve the menu item the user specified as their favorite through the following REST endpoint https://YOUR-CHOSEN-SUBDOMAIN.herokuapp.com/menu_items/SHORT-NAME.json, where `YOUR-CHOSEN-SUBDOMAIN` is the subdomain discussed in Lecture50 (Restaurant Server Setup), and the  `SHORT-NAME` is the name the user provided. If the server returns an error, you will know that the item name specified is not valid. If that's the case, display a message next to the favorite choice saying `No such menu number exists`. (See bonus for more)

If everything is valid, save the user's preference somewhere in your client app such that you can retrieve it in another view/component/controller/etc. (Hint: think service). Once saved, display a message below the form saying `Your information has been saved`.

**Task 2:**
When the user clicks on `My Info` button, they should be taken to another view where it shows them their "registered" information, including the favorite menu item they picked. When showing the favorite menu item, display the picture of the menu item as well as its title and description.

If the user hasn't yet "registered" through the `Sign Up` button, simply display a message saying: `Not Signed Up Yet. Sign up Now!`. The words "Sign up Now!" should be a link to the same view as the `Sign Up` link points to.


## Bonus (not graded)

**Bonus Task 3:**
We haven't covered this, so do some research and figure out how to setup the validation of the user's choice for the favorite item BEFORE the user hits the `Submit` button. This way, the message `No such menu number exists` should show up pretty soon after the user types something into the favorite menu item textbox and it loses focus.

(Yes, I realize, it may be better to simply present the user with the list of items, but this is an exercise, after all.)

**Bonus Task 4:**
Write a simple test which exercises the function that will determine if the favorite item exists in the menu or doesn't exist. Note, that you will need to use the $httpBackend service (and probably look up the docs for it as well) to achieve this test properly.
