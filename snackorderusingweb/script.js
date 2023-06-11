document.addEventListener("DOMContentLoaded", function() {
    const chatDisplay = document.getElementById("chat-display");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    let order = [];
    let totalCost = 0;
  
    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        sendMessage();
      }
    });
  
    function sendMessage() {
      const message = userInput.value;
      if (message.trim() === "") return;
  
      displayMessage(message, "user");
      userInput.value = "";
  
      // Process the user's message and generate a response
      const response = generateResponse(message);
  
      displayMessage(response, "bot");
    }
  
    function displayMessage(message, sender) {
      const messageElement = document.createElement("div");
      messageElement.classList.add("message", sender);
      messageElement.textContent = message;
  
      chatDisplay.appendChild(messageElement);
  
      // Scroll to the bottom of the chat display
      chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }
  
    function generateResponse(message) {
      const formattedMessage = message.toLowerCase().trim();
  
      if (formattedMessage === "hi") {
        return "Hello! Welcome to our snack shop. What would you like to order?";
      } else if (formattedMessage.includes("menu please") || formattedMessage.includes("like what food items available?") || formattedMessage.includes("list please") || formattedMessage.includes("what snack items do you have?")) {
        return "Sure! We have pizzas, sandwiches, burgers, samosas, and drinks available. What would you like to order?";
      } else if (formattedMessage.includes("pizza")) {
        order.push("Pizza");
        totalCost = 10;
        return "Great choice! ,pay";
      } else if (formattedMessage.includes("sandwich")) {
        order.push("Sandwich");
        totalCost = 8;
        return "Awesome! ,pay";
      } else if (formattedMessage.includes("burger")) {
        order.push("Burger");
        totalCost = 6;
        return "Excellent choice! ,pay ";
      } else if (formattedMessage.includes("samosa")) {
        order.push("Samosa");
        totalCost = 2;
        return "Delicious! ,pay";
      } else if (formattedMessage.includes("drink") || formattedMessage.includes("beverage")) {
        order.push("Drink");
        totalCost = 3;
        return "Certainly! ,pay";
      } else if (formattedMessage.includes("pay") || formattedMessage.includes("payment")) {
        return "Your order is on the way. How would you like to pay? Cash or Card?";
      } else if (formattedMessage.includes("cash")) {
        const orderSummary = "Your order is: " + order.join(", ") + ". The total cost is $" + totalCost.toFixed(2) + ". Please keep the cash ready for payment. Thank you for your order!";
        order = [];
        totalCost = 0;
        return orderSummary;
      } else if (formattedMessage.includes("card")) {
        const orderSummary = "Your order is: " + order.join(", ") + ". The total cost is $" + totalCost.toFixed(2) + ". Please provide your card for payment. Thank you for your order!";
        order = [];
        totalCost = 0;
        return orderSummary;
      } else {
        const randomResponses = [
          "I'm sorry, I couldn't understand. Can you please repeat?",
          "I'm sorry, I'm not programmed to handle that request.",
          "Apologies, I can only assist with snack orders.",
          "I'm afraid I don't have the information you're looking for.",
          "Sorry, I can't process that request at the moment."
        ];
        const randomIndex = Math.floor(Math.random() * randomResponses.length);
        return randomResponses[randomIndex];
      }
    }
  });