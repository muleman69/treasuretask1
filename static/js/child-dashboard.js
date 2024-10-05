document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');
    const treasureChest = document.getElementById('treasure-chest');
    const completedTasks = document.getElementById('completed-tasks');
    const finishButton = document.getElementById('finish-button');
    const coinCount = document.getElementById('coin-count');

    let draggedTask = null;
    let touchStartX, touchStartY;

    // Touch Event Listeners
    taskList.addEventListener('touchstart', touchStart, { passive: false });
    taskList.addEventListener('touchmove', touchMove, { passive: false });
    taskList.addEventListener('touchend', touchEnd, { passive: false });

    treasureChest.addEventListener('touchstart', preventDefault, { passive: false });
    treasureChest.addEventListener('touchmove', preventDefault, { passive: false });
    treasureChest.addEventListener('touchend', touchEnd, { passive: false });

    // Mouse Event Listeners (for desktop compatibility)
    taskList.addEventListener('mousedown', dragStart, false);
    treasureChest.addEventListener('dragover', dragOver, false);
    treasureChest.addEventListener('drop', drop, false);

    function touchStart(e) {
        if (e.target.closest('.task-card')) {
            draggedTask = e.target.closest('.task-card');
            const touch = e.touches[0];
            touchStartX = touch.clientX - draggedTask.offsetLeft;
            touchStartY = touch.clientY - draggedTask.offsetTop;
            setTimeout(() => {
                draggedTask.style.opacity = '0.5';
            }, 0);
        }
    }

    function touchMove(e) {
        if (draggedTask) {
            e.preventDefault();
            const touch = e.touches[0];
            draggedTask.style.position = 'absolute';
            draggedTask.style.left = touch.clientX - touchStartX + 'px';
            draggedTask.style.top = touch.clientY - touchStartY + 'px';
        }
    }

    function touchEnd(e) {
        if (draggedTask) {
            const touch = e.changedTouches[0];
            const treasureChestRect = treasureChest.getBoundingClientRect();
            if (
                touch.clientX >= treasureChestRect.left &&
                touch.clientX <= treasureChestRect.right &&
                touch.clientY >= treasureChestRect.top &&
                touch.clientY <= treasureChestRect.bottom
            ) {
                completeTask(draggedTask.dataset.taskId);
            } else {
                draggedTask.style.position = 'static';
                draggedTask.style.opacity = '1';
            }
            draggedTask = null;
        }
    }

    function preventDefault(e) {
        e.preventDefault();
    }

    function dragStart(e) {
        draggedTask = e.target.closest('.task-card');
        e.dataTransfer.setData('text/plain', draggedTask.dataset.taskId);
        setTimeout(() => {
            draggedTask.style.display = 'none';
        }, 0);
    }

    function dragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    function drop(e) {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('text');
        completeTask(taskId);
    }

    function completeTask(taskId) {
        fetch(`/complete_task/${taskId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateUI(taskId);
                updateCoinCount(data.points);
            } else {
                console.error('Failed to complete task:', data.message);
                if (draggedTask) {
                    draggedTask.style.display = 'block';
                    draggedTask.style.opacity = '1';
                    draggedTask.style.position = 'static';
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            if (draggedTask) {
                draggedTask.style.display = 'block';
                draggedTask.style.opacity = '1';
                draggedTask.style.position = 'static';
            }
        });
    }

    function updateUI(taskId) {
        const taskElement = document.querySelector(`.task-card[data-task-id="${taskId}"]`);
        const taskContent = taskElement.querySelector('.bg-white');
        taskContent.classList.remove('bg-white');
        taskContent.classList.add('bg-gray-100');
        completedTasks.appendChild(taskElement);
        taskElement.style.display = 'block';
        taskElement.style.opacity = '1';
        taskElement.style.position = 'static';
        draggedTask = null;
    }

    function updateCoinCount(points) {
        const currentPoints = parseInt(coinCount.textContent);
        const newPoints = currentPoints + points;
        coinCount.textContent = `${newPoints} coins`;
    }

    finishButton.addEventListener('click', function() {
        const childId = window.location.pathname.split('/').pop();
        fetch(`/finish_tasks/${childId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update UI to show completion
                const taskList = document.getElementById('task-list');
                const completedTasks = document.getElementById('completed-tasks');
                const coinCount = document.getElementById('coin-count');

                // Move all tasks to completed
                while (taskList.firstChild) {
                    completedTasks.appendChild(taskList.firstChild);
                }

                // Update coin count
                coinCount.textContent = `${data.points} coins`;

                // Show completion message
                const completionMessage = document.createElement('div');
                completionMessage.textContent = 'Great job! You have completed all your tasks!';
                completionMessage.className = 'text-2xl font-bold text-green-600 mt-4 text-center';
                document.querySelector('main').appendChild(completionMessage);

                // Disable the FINISHED! button
                finishButton.disabled = true;
                finishButton.classList.add('opacity-50', 'cursor-not-allowed');
            } else {
                console.error('Failed to finish tasks:', data.message);
                alert('Oops! Something went wrong. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    });
});
