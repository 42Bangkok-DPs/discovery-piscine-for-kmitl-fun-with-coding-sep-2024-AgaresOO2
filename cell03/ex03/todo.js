const ftList = document.getElementById('ft_list');
// ฟังก์ชันสำหรับบันทึก To-Do ลง cookie
function saveTasksToCookie() {
    const tasks = [];
    document.querySelectorAll('#ft_list div').forEach(task => {
        tasks.push(task.textContent);
    });
    document.cookie = `tasks=${JSON.stringify(tasks)}; path=/`;
}

// ฟังก์ชันสำหรับดึง To-Do จาก cookie
function loadTasksFromCookie() {
    const cookies = document.cookie.split('; ');
    const tasksCookie = cookies.find(row => row.startsWith('tasks='));
    if (tasksCookie) {
        const tasks = JSON.parse(tasksCookie.split('=')[1]);
        tasks.forEach(task => addTask(task));
    }
}

// ฟังก์ชันเพิ่ม To-Do เข้าไปใน DOM
function addTask(taskText) {
    if (taskText === null || taskText.trim() === "") return;
    
    const taskDiv = document.createElement('div');
    taskDiv.textContent = taskText;
    taskDiv.className ="todo-item";
    const todoText = document.createElement('span');
    taskDiv.appendChild(todoText);

    const delbtn = document.createElement("button");
    delbtn.textContent = "Delete";
    delbtn.className = "delete";
    delbtn.addEventListener('click', function() {
        if (confirm('Do you want to remove this task?')) {
            ftList.removeChild(taskDiv);
            saveTasksToCookie();
        }
    });
    taskDiv.appendChild(delbtn);
    
    ftList.insertBefore(taskDiv, ftList.firstChild);
    saveTasksToCookie();
}

// ฟังก์ชันสำหรับปุ่ม New Task
document.getElementById('newTaskBtn').addEventListener('click', function() {
    const newTask = prompt('Enter a new task:');
    if (newTask) {
        addTask(newTask);
    }
});

// โหลด To-Do จาก cookie เมื่อเริ่มต้น
window.onload = function() {
    loadTasksFromCookie();
};