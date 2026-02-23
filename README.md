# ALPHV Tech Generalist Internship Assignment
**By: Eva Ray Siew (UKM)**

This is my submission for the Tech Generalist (Web Focused) internship assignment. I built a web application that allows admins to manage data (name, color, shape) and displays it to users in a real-time table. This web application consists of a front-end UI and a back-end REST API. It allows for data management of names, colours, and shapes in a retro-arcade styled interface.

---

## 🛠 Tech Stack
I used the following tools for this project:
- **Frontend:** HTML, CSS (Tailwind), and Vanilla JavaScript.
- **Backend:** PHP (using PDO for database connections).
- **Database:** MySQL.
- **Hosting:** Deployed on a DigitalOcean Droplet (Ubuntu/LAMP).

---

## 🚀 Live Link
I have deployed the project here:
[http://167.71.194.163/alphv_app/public/index.html](http://167.71.194.163/alphv_app/public/login.html)

---

## 📁 How to Run This Locally
If you want to test it on your machine:
1. Copy the `alphv_app` folder into your `htdocs` or local server folder.
2. Import the `database.sql` file using phpMyAdmin to create the `alphv_assessment` database and the table. 
3. Open `api/config/database.php` and make sure the localhost credentials match your setup (I set them to the default `root` and empty password).
4. Go to `http://localhost/alphv_app/public/login.html` in your browser.

---

## 💡 Features & Notes
- **Admin Portal:** You can add, edit, and delete items. I added validation to make sure the name, color, and shape fields aren't empty. 
- **User Portal:** The table updates every 3 seconds so you can see changes from the admin portal without refreshing. 
- **Security:** I used prepared statements in PHP to help prevent SQL injection and used `htmlspecialchars` to keep the inputs safe.
- **UI:** I went with a "Retro Arcade" theme for the design to make it more interesting than a standard table.
- **Authentication:** A "Start Screen" login portal to protect administrative actions.
  - **Cheat Code:** Switch to the Boss Level side and enter 'alphv2026'.

---

## 📝 Developer Notes
- **Polling:** I used client-side polling (every 3 seconds) for the real-time requirement as it provides a robust experience without the complexity of WebSockets for this scale.
- **UI Design:** The "Retro Arcade"  theme was chosen to demonstrate creative UI/UX design while meeting all technical requirements.
