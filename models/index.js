// const members = [
//     { name: "Vince", tuesday: "12:30", friday: "12:30", status: "Not Started" },
//     { name: "Melo", tuesday: "03:10", friday: "03:10", status: "Not Started" },
//     { name: "Hash", tuesday: "05:50", friday: "05:50", status: "Not Started" },
//     { name: "Jrche", tuesday: "08:30", friday: "08:30", status: "Not Started" },
//     { name: "Kyle", tuesday: "11:10", friday: "11:10", status: "Not Started" },
//     { name: "Sliv", tuesday: "14:30", friday: "14:30", status: "Not Started" },
//     { name: "Next", tuesday: "17:50", friday: "17:50", status: "Not Started" },
//     { name: "Archie", tuesday: "20:30", friday: "20:30", status: "Not Started" },
//     { name: "Yuri", tuesday: "20:30", friday: "20:30", status: "Not Started" },
// ];
// Event listener for when a member is selected
document.getElementById("memberSelect").addEventListener("change", function() {
    const selectedMemberIndex = this.value;
	
    if (selectedMemberIndex !== "") {
        const selectedMember = members[selectedMemberIndex];
        // console.log(convertTo12HourFormat(selectedMember.tuesday))
		document.getElementById("newTuesdayTimeEdit").value = selectedMember.tuesday
		document.getElementById("newFridayTimeEdit").value = selectedMember.friday
        // Auto-populate the time fields for Tuesday and Friday
        // document.getElementById("newTuesdayTimeEdit").value = convertTo12HourFormat(selectedMember.tuesday) || '';
        // document.getElementById("newFridayTimeEdit").value = convertTo12HourFormat(selectedMember.friday) || '';
    } else {
        // Clear time fields if no member is selected
        document.getElementById("newTuesdayTimeEdit").value = '';
        document.getElementById("newFridayTimeEdit").value = '';
    }
});


function detectOverlap(day) {
    const timeMap = {};
    let overlaps = new Set();

    members.forEach((member, index) => {
        const time = member[day];
        if (time) {
            if (!timeMap[time]) {
                timeMap[time] = [];
            }
            timeMap[time].push(index);
        }
    });

    Object.values(timeMap).forEach(players => {
        if (players.length > 1) {
            players.forEach(player => overlaps.add(player));
        }
    });

    return overlaps;
}
// Function to save the schedule to a JSON file
function saveScheduleToFile() {
    const blob = new Blob([JSON.stringify(members, null, 2)], { type: 'application/json' });
    saveAs(blob, "schedule.json");  // This triggers a download of the schedule as a JSON file
}

// function getNextStatus(currentStatus) {
//     switch (currentStatus) {
//         case "Not Started": return "Ongoing";
//         case "Ongoing": return "Done";
//         case "Done": return "Not Started";
//         default: return "Not Started";
//     }
// }
// Function to get the next status in the cycle
// function getNextStatus(currentStatus) {
//     const statusCycle = ['Not Started', 'In Progress', 'Completed'];
//     const currentIndex = statusCycle.indexOf(currentStatus);
//     return statusCycle[(currentIndex + 1) % statusCycle.length];
// }
 
function getNextStatus(currentStatus) {
    switch (currentStatus) {
        case "Not Started": return "Ongoing";
        case "Ongoing": return "Done";
        case "Done": return "Not Started";
        default: return "Not Started";
    }
}
function getStatusColor(status) {
    switch (status) {
        // case "Done": return "bg-green-500";
        // case "Ongoing": return "bg-yellow-500";
        // case "Not Started": return "bg-red-500";
        // default: return "";
           case "Done": return "green-500";
        case "Ongoing": return "yellow-500";
        case "Not Started": return "red-500";
        default: return "";
    }
    
}
// Function to get the text representation for each status
function getStatusText(status) {
    switch (status) {
        case "Done": return "Done";
        case "Ongoing": return "Ongoing";
        case "Not Started": return "Not Started";
        default: return "Unknown"; // Default text in case of an unexpected status
    }
}
function addNewPlayer() {
    const newPlayerName = document.getElementById("newPlayerName").value.trim();
    if (!newPlayerName) {
        alert("Please enter a valid player name.");
        return;
    }
    members.push({ name: newPlayerName, tuesday: "", friday: "", status: "Not Started" });
    document.getElementById("newPlayerName").value = "";
     // Update localStorage with the new members array
     localStorage.setItem('members', JSON.stringify(members));
     // Update localStorage with the new member data
     //updateLocalStorage();
     renderSchedule();
   
}

// Convert 24-hour time to AM/PM format
function convertToAMPM(timeStr) {
    if (!timeStr) return ""; // If no time is set, return an empty string

    let [hours, minutes] = timeStr.split(":");
    hours = parseInt(hours);
    minutes = minutes || "00";

    const suffix = hours >= 12 ? "PM" : "AM";
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;  // Midnight case

    return `${hours}:${minutes} ${suffix}`;
}
// Convert AM/PM time to 24-hour format
function convertTo24HourFormat(timeStr) {
    // if (!timeStr) return "";

    // const [time, suffix] = timeStr.split(" ");
    // let [hours, minutes] = time.split(":");
    // hours = parseInt(hours);
    // minutes = minutes || "00";

    // if (suffix === "PM" && hours !== 12) {
    //     hours += 12;
    // } else if (suffix === "AM" && hours === 12) {
    //     hours = 0;
    // }

    // return `${hours}:${minutes}`;
	if (!timeStr) return '';
    
    let [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(num => parseInt(num));

    // Adjust hours for PM/AM
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    // Ensure the time is in 24-hour format (HH:mm)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function convertTo24Hour(timeStr) {
    let [time, suffix] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);
    minutes = minutes || "00";

    if (suffix === "PM" && hours !== 12) {
        hours += 12;
    }
    if (suffix === "AM" && hours === 12) {
        hours = 0;  // Midnight case
    }

    return { hour: hours, minute: parseInt(minutes) };
	}
// Function to convert 24-hour time to 12-hour time format for display
function convertTo12HourFormat(time24) {
    if (!time24) return '';
    
    let [hours, minutes] = time24.split(":").map(num => parseInt(num));
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12; // Midnight case
    
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}
// Update schedule after user edits
function updateSchedule() {
    const selectedMemberIndex = document.getElementById("memberSelect").value;
    const newTuesdayTime = document.getElementById("newTuesdayTimeEdit").value;
    const newFridayTime = document.getElementById("newFridayTimeEdit").value;
	console.log(newTuesdayTime)
	if (selectedMemberIndex === "" || (!newTuesdayTime && !newFridayTime)) {
        showErrorMessage("Please select a member and at least one time.");
        return;
    }

    const selectedMember = members[selectedMemberIndex];
    // Update localStorage with the new member data
    //updateLocalStorage();
    // Convert the time back to 24-hour format before storing
    if (newTuesdayTime) selectedMember.tuesday = convertTo24HourFormat(newTuesdayTime);
    if (newFridayTime) selectedMember.friday = convertTo24HourFormat(newFridayTime);

    renderSchedule();
    highlightUpdatedRow(selectedMember.name);  // Pass the name instead of index
}


function showErrorMessage(message) {
    const errorMessageDiv = document.getElementById("errorMessage");
    errorMessageDiv.textContent = message;
    errorMessageDiv.classList.remove("hidden");

    setTimeout(() => {
        errorMessageDiv.classList.add("hidden");
    }, 5000);  // Hide the error message after 5 seconds
}

// Highlight updated row based on the name
function highlightUpdatedRow(updatedMemberName) {
    const rows = document.querySelectorAll("tbody tr");

    // Remove the highlight from any previously updated rows
    rows.forEach(row => row.classList.remove("bg-sky-200"));

    // Find the updated row based on the member's name and highlight it
    rows.forEach(row => {
        const nameCell = row.querySelector('td'); // The first <td> contains the name
        if (nameCell && nameCell.textContent === updatedMemberName) {
            row.classList.add("bg-sky-200");
        }
    });

    // Remove highlight after 3 seconds
    setTimeout(() => {
        rows.forEach(row => row.classList.remove("bg-sky-200"));
    }, 3000);
}
// Function to render the schedule dynamically
function renderSchedule1() {
    const tableBody = document.querySelector("tbody");
    const memberSelect = document.getElementById("memberSelect");

    tableBody.innerHTML = '';
    memberSelect.innerHTML = '';

    const today = new Date();
    const dayOfWeek = today.getDay(); // 2: Tuesday, 5: Friday

    if (dayOfWeek === 2) { 
        document.getElementById("tuesdayHeader").classList.add("bg-sky-300");
        document.getElementById("fridayHeader").classList.remove("bg-sky-300");
    } else if (dayOfWeek === 5) { 
        document.getElementById("fridayHeader").classList.add("bg-sky-300");
        document.getElementById("tuesdayHeader").classList.remove("bg-sky-300");
    }

    // Sort members by time for today
    members.sort((a, b) => {
        const timeA = (dayOfWeek === 2 ? a.tuesday : a.friday);
        const timeB = (dayOfWeek === 2 ? b.tuesday : b.friday);

        const timeA24 = convertTo24Hour(timeA);
        const timeB24 = convertTo24Hour(timeB);

        // Compare hours first
        if (timeA24.hour !== timeB24.hour) {
            return timeA24.hour - timeB24.hour;
        }

        // If hours are the same, compare minutes
        return timeA24.minute - timeB24.minute;
    });

    members.forEach((member, index) => {
        const row = document.createElement('tr');
        row.classList.add('border-b');

        const nameCell = document.createElement('td');
        nameCell.classList.add('px-6', 'py-4', 'text-left');
        nameCell.textContent = member.name;
        row.appendChild(nameCell);

        const tuesdayCell = document.createElement('td');
        tuesdayCell.classList.add('px-6', 'py-4', 'text-left');
        tuesdayCell.textContent = member.tuesday ? convertToAMPM(member.tuesday) : 'Not set';
        row.appendChild(tuesdayCell);

        const fridayCell = document.createElement('td');
        fridayCell.classList.add('px-6', 'py-4', 'text-left');
        fridayCell.textContent = member.friday ? convertToAMPM(member.friday) : 'Not set';
        row.appendChild(fridayCell);

        const statusCell = document.createElement('td');
        statusCell.classList.add('px-6', 'py-4', 'text-left');

        const statusButton = document.createElement('button');
        statusButton.textContent = member.status;
        statusButton.classList.add('px-4', 'py-2', 'rounded-md', 'text-white', `bg-${getStatusColor(member.status)}`);
        statusButton.onclick = () => {
            member.status = getNextStatus(member.status);
            // Update localStorage with the new member data
            //updateLocalStorage();
            renderSchedule();
        };

        statusCell.appendChild(statusButton);
        row.appendChild(statusCell);

        const deleteCell = document.createElement('td');
        deleteCell.classList.add('px-1', 'py-1', 'text-left');
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('bg-red-500', 'text-white', 'px-1', 'py-1', 'rounded-md');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            deletePlayer(index);  // Delete the member and update localStorage
        };

        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);

        const option = document.createElement('option');
        option.value = index;
        option.textContent = member.name;
        memberSelect.appendChild(option);
    });
}

// Render the schedule dynamically
function renderSchedule2() {
    const tableBody = document.querySelector("tbody");
    const memberSelect = document.getElementById("memberSelect");

    tableBody.innerHTML = '';
    memberSelect.innerHTML = '';

    const today = new Date();
    const dayOfWeek = today.getDay(); // 2: Tuesday, 5: Friday

    if (dayOfWeek === 2) { 
        document.getElementById("tuesdayHeader").classList.add("bg-sky-300");
        document.getElementById("fridayHeader").classList.remove("bg-sky-300");
    } else if (dayOfWeek === 5) { 
        document.getElementById("fridayHeader").classList.add("bg-sky-300");
        document.getElementById("tuesdayHeader").classList.remove("bg-sky-300");
    }

    // Sort members by time for today
    members.sort((a, b) => {
        const timeA = (dayOfWeek === 2 ? a.tuesday : a.friday);
        const timeB = (dayOfWeek === 2 ? b.tuesday : b.friday);

        const timeA24 = convertTo24Hour(timeA);
        const timeB24 = convertTo24Hour(timeB);

        // Compare hours first
        if (timeA24.hour !== timeB24.hour) {
            return timeA24.hour - timeB24.hour;
        }

        // If hours are the same, compare minutes
        return timeA24.minute - timeB24.minute;
    });

    members.forEach((member, index) => {
        const row = document.createElement('tr');
        row.classList.add('border-b');

        const nameCell = document.createElement('td');
        nameCell.classList.add('px-6', 'py-4', 'text-left');
        nameCell.textContent = member.name;
        row.appendChild(nameCell);

        const tuesdayCell = document.createElement('td');
        tuesdayCell.classList.add('px-6', 'py-4', 'text-left');
        tuesdayCell.textContent = member.tuesday ? convertToAMPM(member.tuesday) : 'Not set';
        row.appendChild(tuesdayCell);

        const fridayCell = document.createElement('td');
        fridayCell.classList.add('px-6', 'py-4', 'text-left');
        fridayCell.textContent = member.friday ? convertToAMPM(member.friday) : 'Not set';
        row.appendChild(fridayCell);

        const statusCell = document.createElement('td');
        statusCell.classList.add('px-6', 'py-4', 'text-left');

        const statusButton = document.createElement('button');
        statusButton.textContent = member.status;
        statusButton.classList.add('px-4', 'py-2', 'rounded-md', 'text-white', getStatusColor(member.status));
        statusButton.onclick = () => {
            member.status = getNextStatus(member.status);
            renderSchedule();
        };

        statusCell.appendChild(statusButton);
        row.appendChild(statusCell);

        const deleteCell = document.createElement('td');
        // deleteCell.classList.add('px-6', 'py-4', 'text-left');
        
        // const deleteButton = document.createElement('button');
        // deleteButton.classList.add('bg-red-500', 'text-white', 'px-1', 'py-2', 'rounded-full');
        // deleteButton.textContent = 'Delete';
        // deleteButton.onclick = () => {
        //     members.splice(index, 1);  // Remove the member from the array
        //     ////updateLocalStorage();
        //     renderSchedule();  // Re-render the table to reflect the change
        // };

        // deleteCell.appendChild(deleteButton);
        const deleteLink = document.createElement('a');
        deleteLink.classList.add('text-blue-500', 'hover:underline');  // Styling for the link (you can adjust as needed)
        deleteLink.href = '#';  // Set the link href to '#' or to a specific URL if desired
        deleteLink.textContent = 'Delete';
        deleteLink.onclick = (event) => {
            event.preventDefault();  // Prevent the default link behavior (which would scroll to the top)
            members.splice(index, 1);  // Remove the member from the array
            // updateLocalStorage(); // You can uncomment this if you're updating local storage
            renderSchedule();  // Re-render the table to reflect the change
        };
        
        deleteCell.appendChild(deleteLink);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);

        const option = document.createElement('option');
        option.value = index;
        option.textContent = member.name;
        memberSelect.appendChild(option);
    });
}
function renderScheduleA() {
    const tableBody = document.querySelector("tbody");
    const memberSelect = document.getElementById("memberSelect");

    tableBody.innerHTML = '';
    memberSelect.innerHTML = '';

    const today = new Date();
    const dayOfWeek = today.getDay(); // 2: Tuesday, 5: Friday

    if (dayOfWeek === 2) { 
        document.getElementById("tuesdayHeader").classList.add("bg-sky-300");
        document.getElementById("fridayHeader").classList.remove("bg-sky-300");
    } else if (dayOfWeek === 5) { 
        document.getElementById("fridayHeader").classList.add("bg-sky-300");
        document.getElementById("tuesdayHeader").classList.remove("bg-sky-300");
    }

    // Sort members by time for today
    members.sort((a, b) => {
        const timeA = (dayOfWeek === 2 ? a.tuesday : a.friday);
        const timeB = (dayOfWeek === 2 ? b.tuesday : b.friday);

        const timeA24 = convertTo24Hour(timeA);
        const timeB24 = convertTo24Hour(timeB);

        // Compare hours first
        if (timeA24.hour !== timeB24.hour) {
            return timeA24.hour - timeB24.hour;
        }

        // If hours are the same, compare minutes
        return timeA24.minute - timeB24.minute;
    });

    members.forEach((member, index) => {
        const row = document.createElement('tr');
        row.classList.add('border-b');

        // Create name cell
        const nameCell = document.createElement('td');
        nameCell.classList.add('px-6', 'py-4', 'text-left');
        nameCell.textContent = member.name;
        row.appendChild(nameCell);

        // Create Tuesday cell
        const tuesdayCell = document.createElement('td');
        tuesdayCell.classList.add('px-6', 'py-4', 'text-left');
        tuesdayCell.textContent = member.tuesday ? convertToAMPM(member.tuesday) : 'Not set';
        row.appendChild(tuesdayCell);

        // Create Friday cell
        const fridayCell = document.createElement('td');
        fridayCell.classList.add('px-6', 'py-4', 'text-left');
        fridayCell.textContent = member.friday ? convertToAMPM(member.friday) : 'Not set';
        row.appendChild(fridayCell);

        // Create Status cell
         const statusCell = document.createElement('td');
        // statusCell.classList.add('px-6', 'py-4', 'text-left');

        // const statusButton = document.createElement('button');
        // statusButton.textContent = member.status;
        // statusButton.classList.add('px-4', 'py-2', 'rounded-md', 'text-white', getStatusColor(member.status));
        // statusButton.onclick = () => {
        //     member.status = getNextStatus(member.status);
        //     renderSchedule(); // Re-render the table with the updated status
        // };

        // statusCell.appendChild(statusButton);
        const statusLink = document.createElement('a');
        statusLink.href = "#"; // To make it clickable
        statusLink.classList.add('flex', 'items-center', 'space-x-2');
        
        // Create a dot span to show the color of the status
        const statusDot = document.createElement('span');
        statusDot.classList.add('w-2', 'h-2', 'rounded-full', `bg-${getStatusColor(member.status)}`); // Dot size and color
        // Add blinking animation if the status is "Ongoing"
            // if (member.status === "Ongoing") {
            //     statusDot.classList.add('animate-pulse'); // Tailwind class for the blinking effect
            // }
            if (member.status === "Ongoing") {
                statusDot.classList.add('blink'); // Custom blinking class
            }
        // Create a span for the status text (Not Started, Ongoing, Done)
        const statusText = document.createElement('span');
        console.log(member.status);
        statusText.textContent = getStatusText(member.status);
        
        // Apply the same color for the text as the dot
        const statusColor = `text-${getStatusColor(member.status)}`
        statusText.classList.add(statusColor); // Use the same color class for the text
        
        // Append the dot and status text to the link
        statusLink.appendChild(statusDot);
        statusLink.appendChild(statusText);
        
        // Update status when clicked
        statusLink.onclick = (event) => {
            event.preventDefault(); // Prevent default link behavior (page reload)
            member.status = getNextStatus(member.status); // Update status
            renderSchedule(); // Re-render the table with the updated status
        };
        // Append the clickable link to the status cell
        statusCell.appendChild(statusLink);
        row.appendChild(statusCell);

        // Create Delete cell with link
        const deleteCell = document.createElement('td');
        const deleteLink = document.createElement('a');
        deleteLink.classList.add('text-blue-500', 'hover:underline');
        deleteLink.href = '#';
        deleteLink.textContent = 'Delete';
        deleteLink.onclick = (event) => {
            event.preventDefault();
            members.splice(index, 1); // Remove member
            renderSchedule(); // Re-render the table
        };
        deleteCell.appendChild(deleteLink);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);

        // Create option for member selection dropdown
        const option = document.createElement('option');
        option.value = index;
        option.textContent = member.name;
        memberSelect.appendChild(option);

        // Add click event listener to populate the edit fields
        row.addEventListener('click', () => {
            // Populate the edit fields
            document.getElementById("newPlayerName").value = member.name;
            // document.getElementById("newTuesdayTimeEdit").value = member.tuesday ? convertToAMPM(member.tuesday) : '';
            // document.getElementById("newFridayTimeEdit").value = member.friday ? convertToAMPM(member.friday) : '';
            document.getElementById("newTuesdayTimeEdit").value = member.tuesday
		    document.getElementById("newFridayTimeEdit").value = member.friday
            document.getElementById("memberSelect").value = index;
        });
    });
}
function renderSchedule() {
    const tableBody = document.querySelector("tbody");
    const memberSelect = document.getElementById("memberSelect");

    tableBody.innerHTML = ''; // Clear existing rows
    memberSelect.innerHTML = ''; // Clear the dropdown options

    const today = new Date();
    const dayOfWeek = today.getDay(); // 2: Tuesday, 5: Friday

    // Highlight the current day (Tuesday or Friday)
    if (dayOfWeek === 2) { 
        document.getElementById("tuesdayHeader").classList.add("bg-sky-300");
        document.getElementById("fridayHeader").classList.remove("bg-sky-300");
    } else if (dayOfWeek === 5) { 
        document.getElementById("fridayHeader").classList.add("bg-sky-300");
        document.getElementById("tuesdayHeader").classList.remove("bg-sky-300");
    }

    // Sort members by time for today
    members.sort((a, b) => {
        const timeA = (dayOfWeek === 2 ? a.tuesday : a.friday);
        const timeB = (dayOfWeek === 2 ? b.tuesday : b.friday);

        const timeA24 = convertTo24Hour(timeA);
        const timeB24 = convertTo24Hour(timeB);

        // Compare hours first
        if (timeA24.hour !== timeB24.hour) {
            return timeA24.hour - timeB24.hour;
        }

        // If hours are the same, compare minutes
        return timeA24.minute - timeB24.minute;
    });

    members.forEach((member, index) => {
        const row = document.createElement('tr');
        row.classList.add('border-b');

        // Create name cell
        const nameCell = document.createElement('td');
        nameCell.classList.add('px-6', 'py-4', 'text-left');
        nameCell.textContent = member.name;
        row.appendChild(nameCell);

        // Create Tuesday cell
        const tuesdayCell = document.createElement('td');
        tuesdayCell.classList.add('px-6', 'py-4', 'text-left');
        tuesdayCell.textContent = member.tuesday ? convertToAMPM(member.tuesday) : 'Not set';
        row.appendChild(tuesdayCell);

        // Create Friday cell
        const fridayCell = document.createElement('td');
        fridayCell.classList.add('px-6', 'py-4', 'text-left');
        fridayCell.textContent = member.friday ? convertToAMPM(member.friday) : 'Not set';
        row.appendChild(fridayCell);

        // Create Status cell
        const statusCell = document.createElement('td');
        const statusLink = document.createElement('a');
        statusLink.href = "#";
        statusLink.classList.add('flex', 'items-center', 'space-x-2');

        // Create a dot span to show the color of the status
        const statusDot = document.createElement('span');
        statusDot.classList.add('w-2', 'h-2', 'rounded-full', `bg-${getStatusColor(member.status)}`); 
        if (member.status === "Ongoing") {
            statusDot.classList.add('blink'); // Custom blinking class
        }

        // Create a span for the status text (Not Started, Ongoing, Done)
        const statusText = document.createElement('span');
        statusText.textContent = getStatusText(member.status);
        
        // Apply the same color for the text as the dot
        const statusColor = `text-${getStatusColor(member.status)}`;
        statusText.classList.add(statusColor);
        
        // Append the dot and status text to the link
        statusLink.appendChild(statusDot);
        statusLink.appendChild(statusText);
        
        // Update status when clicked
        statusLink.onclick = (event) => {
            event.preventDefault();
            member.status = getNextStatus(member.status); // Update status
            localStorage.setItem('members', JSON.stringify(members)); // Update localStorage with new status
            renderSchedule(); // Re-render the table with the updated status
        };

        // Append the clickable link to the status cell
        statusCell.appendChild(statusLink);
        row.appendChild(statusCell);

        // Create Delete cell with link
        const deleteCell = document.createElement('td');
        const deleteLink = document.createElement('a');
        deleteLink.classList.add('text-blue-500', 'hover:underline');
        deleteLink.href = '#';
        deleteLink.textContent = 'Delete';
        deleteLink.onclick = (event) => {
            event.preventDefault();
            members.splice(index, 1); // Remove the member from the array
            localStorage.setItem('members', JSON.stringify(members)); // Update localStorage after deletion
            renderSchedule(); // Re-render the table after deletion
        };
        deleteCell.appendChild(deleteLink);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);

        // Create option for member selection dropdown
        const option = document.createElement('option');
        option.value = index;
        option.textContent = member.name;
        memberSelect.appendChild(option);

        // Add click event listener to populate the edit fields
        row.addEventListener('click', () => {
            document.getElementById("newPlayerName").value = member.name;
            document.getElementById("newTuesdayTimeEdit").value = member.tuesday;
            document.getElementById("newFridayTimeEdit").value = member.friday;
            document.getElementById("memberSelect").value = index;
        });
    });
}


function renderSchedule121() {
    const memberSelect = document.getElementById("memberSelect");
    memberSelect.innerHTML = ""; // Clear previous options

    // Add a default "Select a member" option
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Select a member";
    memberSelect.appendChild(defaultOption);

    // Populate the dropdown with member names from the members array
    members.forEach((member, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = member.name;
        memberSelect.appendChild(option);
    });
}

function deletePlayer(index) {
    // Check if the index is valid
    if (index >= 0 && index < members.length) {
        // Remove the member from the array
        members.splice(index, 1);
        
        // Update localStorage with the updated members array
        localStorage.setItem('members', JSON.stringify(members));
        
        // Re-render the schedule to reflect the changes
        renderSchedule();
    } else {
        alert("Invalid member selected.");
    }
}