const lessonsTime = [
    { start: [8,45], end: [9,25] },
    { start: [9,40], end: [10,20] },
    { start: [10,35], end: [11,15] },
    { start: [11,30], end: [12,10] },
    { start: [12,25], end: [13,5] },
    { start: [13,15], end: [13,50] }
];

function highlightCurrentLesson() {
    // Зняти попереднє виділення
    document.querySelectorAll('.current-lesson, .upcoming-lesson').forEach(el => {
        el.classList.remove('current-lesson', 'upcoming-lesson');
    });

    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const nowMinutes = hour * 60 + minutes;

    if (day >= 1 && day <= 5) {
        lessonsTime.forEach((lesson, index) => {
            const [sh, sm] = lesson.start;
            const [eh, em] = lesson.end;

            const startMinutes = sh * 60 + sm;
            const endMinutes = eh * 60 + em;

            const daySections = document.querySelectorAll('.timetable section');
            const todaySection = daySections[day - 1];
            if (!todaySection) return;

            const lessonItems = todaySection.querySelectorAll('li');

            // Поточний урок
            if (nowMinutes >= (startMinutes - 5) && nowMinutes <= endMinutes) {
                if (lessonItems[index]) {
                    lessonItems[index].classList.add('current-lesson');
                }
            }

            // Анімація рівно за хвилину до початку
            if (nowMinutes === (startMinutes - 1)) {
                if (lessonItems[index]) {
                    lessonItems[index].classList.add('upcoming-lesson');
                    // Зняти анімацію через 60 секунд
                    setTimeout(() => {
                        lessonItems[index].classList.remove('upcoming-lesson');
                    }, 60 * 1000);
                }
            }
        });
    }
}

highlightCurrentLesson();
setInterval(highlightCurrentLesson, 60 * 1000);