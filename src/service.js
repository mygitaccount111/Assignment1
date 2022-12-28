let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let count = tasks.length;

const service = {
  create: task => {
    count += 1;
    tasks.push({...task, id: count});
    localStorage.setItem("tasks", JSON.stringify(tasks))
  },
  update: data => {
    const task = tasks.find(t => t.id === data.id);
    task.title = data.title;
    task.description = data.description;
    localStorage.setItem("tasks", JSON.stringify(tasks))
  },
  delete: data => {
    tasks = tasks.filter(t => t.id !== data.id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};

export default service;
