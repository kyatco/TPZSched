// members.js
// const members = [
//     { name: "Vince", tuesday: "12:30", friday: "12:30", status: "Not Started" },
//     { name: "Melo", tuesday: "03:10", friday: "03:10", status: "Not Started" },
//     { name: "Hash", tuesday: "05:50", friday: "05:50", status: "Not Started" },
//     { name: "Jrche", tuesday: "08:30", friday: "08:30", status: "Not Started" },
//     { name: "Kyle", tuesday: "11:10", friday: "11:10", status: "Not Started" },
//     { name: "Sliv", tuesday: "14:30", friday: "14:30", status: "Not Started" },
//     { name: "Next", tuesday: "17:50", friday: "17:50", status: "Not Started" },
//     { name: "Archie", tuesday: "19:30", friday: "20:30", status: "Not Started" },
//     { name: "Yuri", tuesday: "20:30", friday: "20:30", status: "Not Started" }
// ];

// Export the members array so it can be used in other files
// export default members;
// Load members data from localStorage when the page loads
let members = JSON.parse(localStorage.getItem('members')) || [
    { name: "Vince", tuesday: "12:30", friday: "12:30", status: "Not Started" },
    { name: "Melo", tuesday: "03:10", friday: "03:10", status: "Not Started" },
    { name: "Hash", tuesday: "05:50", friday: "05:50", status: "Not Started" },
    { name: "Jrche", tuesday: "08:30", friday: "08:30", status: "Not Started" },
    { name: "Kyle", tuesday: "11:10", friday: "11:10", status: "Not Started" },
    { name: "Sliv", tuesday: "14:30", friday: "14:30", status: "Not Started" },
    { name: "Next", tuesday: "17:50", friday: "17:50", status: "Not Started" },
    { name: "Archie", tuesday: "20:30", friday: "20:30", status: "Not Started" },
    { name: "Yuri", tuesday: "20:30", friday: "20:30", status: "Not Started" }
];

// Call renderSchedule to populate the page with the members
renderSchedule();