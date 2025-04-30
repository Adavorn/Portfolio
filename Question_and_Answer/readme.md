# Question & Answer Chatbot

A simple and interactive chatbot web app built with **HTML**, **CSS**, and **vanilla JavaScript**. This project walks the user through a conversational flow with questions about their name, birthday, favorite holiday, and age — and uses date math to calculate upcoming events.

---

##  Features

-  Greets the user and asks for their name
-  Asks for the user's birthday and calculates how many days away it is
-  Prompts for the user's favorite holiday and does the same
-  Asks for the user's age and determines birth year
-  Includes a "Restart" button to reset the entire flow
-  Styled using Bootstrap 5 for clean layout and responsive design

---

##  Live Demo

>  [Try it on GitHub Pages](https://adavorn.github.io/Portfolio/Question_and_Answer/index.html)  


---

##  Technologies Used

- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES6)

---

##  How It Works

1. **User enters name** → chatbot responds
2. **User enters birthday** → chatbot calculates days away
3. **User selects favorite holiday** → chatbot calculates days away
4. **User enters age** → chatbot calculates birth year
5. **Chat ends** with a thank-you message and option to restart

---

##  Limitations

- Some holidays (e.g. Easter, Ramadan) have **static dates** instead of dynamic lunar/calendar calculations
- Input is **not validated** beyond basic type (e.g. negative age still works)

---

##  Lessons Learned

- DOM manipulation and dynamic form flow
- Date calculations in JavaScript
- Multi-step UI state handling using a single `questionNumber` variable
- Keeping JS modular with helper functions (`calculateHowManyDaysAway`, etc.)

---

##  About the Developer

Crafted by **Jacob King**, a web developer passionate about creating clean, user-friendly interfaces with clever logic behind the scenes.

>  [GitHub](https://github.com/adavorn)  
>  [Portfolio](https://adavorn.github.io/Portfolio)
