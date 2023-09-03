# paypaldonatebutton

A simple API to create donation buttons for PayPal.

## Usage:

1. Include the `paypaldonatebutton.js` script in your HTML file:

   ```html
   <script src="paypaldonatebutton.js"></script>
   ```

2. Create a container in your HTML where the donation button will be rendered:

   ```html
   <div id="button-container-id"></div>
   ```

3. Define your options for the donation button in your JavaScript code:

   ```js
   // Define your options for the donation button
   const options = {
       debug: true, // Enable debug mode if needed
       username: "your_paypal_username", // Replace with your PayPal username
       bid: "your_button_id", // Replace with your PayPal button ID

       // Set whether to disable recurring donations (0 for false, 1 for true)
       // If set to 0, recurring donations will be enabled; if set to 1, they will be disabled
       disable_recurring: 0,

       // Set the currency in which donations will be accepted
       // Replace "USD" with the desired currency code (e.g., "EUR" for Euro, "GBP" for British Pound)
       acceptcurrency: "USD",
   };

   // Call the create method to generate the button
   PaypalDonateButton.create("button-container-id", options);
   ```

4. Customize your button's appearance and behavior by editing the `options` object as needed,
   Feel free to further customize and style the button to match your website's design.

## Files
`paypal-button-jquery.js`:

   Use this script if you're working with jQuery-based projects. It provides a way to integrate PayPal donation buttons into websites that already use jQuery.

`paypal-button-slim.js`:

   Choose this script if you want a lightweight version for minimal impact on page load times. It's ideal for projects where you need a simple PayPal donation button without any extra features or dependencies.

`paypal-button.js`:

   Use the standard paypal-button.js script for a versatile and feature-rich option. This script provides the most comprehensive functionality and flexibility for customizing your PayPal donation button. It may be the best choice for most projects unless you have specific requirements for jQuery or lightweight scripts.

## License

This project is licensed under the GNU General Public License v3.0 - see the LICENSE.md file for details.
