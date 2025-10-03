const mongoose = require('mongoose');
const Chat = require("./models/chats.js");

main()
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// Manually assigned usernames
const users = ["Alex", "Riya", "Sam", "Priya", "Vikram", "Anita", "Rahul", "Sneha"];

// OpenVoice discussions
const Allchats = [
  { from: users[0], to: "OpenVoice", msg: "We should promote renewable energy across cities.", created_at: new Date() },
  { from: users[1], to: "OpenVoice", msg: "Digital education can help rural students a lot.", created_at: new Date() },
  { from: users[2], to: "OpenVoice", msg: "Public transport infrastructure needs urgent improvement.", created_at: new Date() },
  { from: users[3], to: "OpenVoice", msg: "Community health awareness campaigns should be increased.", created_at: new Date() },
  { from: users[4], to: "OpenVoice", msg: "I think national parks should have more conservation programs.", created_at: new Date() },
  { from: users[5], to: "OpenVoice", msg: "Cultural festivals can be a great way to unite people.", created_at: new Date() },
  { from: users[6], to: "OpenVoice", msg: "Voting awareness should start in schools and colleges.", created_at: new Date() },
  { from: users[7], to: "OpenVoice", msg: "Government should support more local startups.", created_at: new Date() },
  { from: users[0], to: "OpenVoice", msg: "Urban greenery can improve city life quality.", created_at: new Date() },
  { from: users[1], to: "OpenVoice", msg: "Healthcare accessibility must be improved in rural areas.", created_at: new Date() },
  { from: users[2], to: "OpenVoice", msg: "National campaigns to reduce plastic waste are needed.", created_at: new Date() },
  { from: users[3], to: "OpenVoice", msg: "Libraries should be modernized with digital resources.", created_at: new Date() },
  { from: users[4], to: "OpenVoice", msg: "Open data initiatives can increase transparency.", created_at: new Date() },
  { from: users[5], to: "OpenVoice", msg: "Public art projects can boost community spirit.", created_at: new Date() },
  { from: users[6], to: "OpenVoice", msg: "Online courses for skill development should be free.", created_at: new Date() },
  { from: users[7], to: "OpenVoice", msg: "Encouraging sports in schools improves health and teamwork.", created_at: new Date() }
];

// Insert into DB
Chat.insertMany(Allchats)
    .then(() => {
        console.log("OpenVoice chats seeded successfully!");
        mongoose.connection.close();
    })
    .catch(err => console.log(err));
