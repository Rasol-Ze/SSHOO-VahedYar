let courseList = JSON.parse(localStorage.getItem('courseList')) || [];


document.querySelector('#openAddlessonSidebarBtn').addEventListener('click', function () {
    const addLessonSidebar = document.querySelector('.add-lesson-container');
    addLessonSidebar.style.transform = "translateX(0)";
    addLessonSidebar.style.visibility = "visible";
});

document.querySelector('#closeAddLeassonSidebarBtn').addEventListener('click', function () {
    const addLessonSidebar = document.querySelector('.add-lesson-container');
    addLessonSidebar.style.transform = "translateX(390px)";
    addLessonSidebar.style.visibility = "hidden";
});

const lessonNameInput = document.querySelectorAll('.fillInputColor input')
lessonNameInput.forEach(input => {
    input.addEventListener('input', function () {
        if (input.value) {
            input.style.backgroundColor = "var(--white3)"

        } else {
            input.style.backgroundColor = ""
        }
    })
})

function addLesson(timeTagDiv, schedule) {
    const lessonName = document.querySelector('#LessonNameInput').value
    const unit = document.querySelector('#unitInput').value
    const profossorName = document.querySelector('#profossorName').value
    const daySelected = document.querySelector('input[name="week"]:checked').value || '';
    const evenOdd = document.querySelector('#evenOdd').value
    const classTime = document.querySelector('#classTime').value
    const examTime = document.querySelector('#examTimeInput').value
    const examDate = document.querySelector('#examDateInput').value

    const newCourse = {
        lessonID: crypto.randomUUID(),
        lessonName: lessonName,
        unit: unit,
        profossorName: profossorName,
        schedule: schedule,
        exam:
        {
            time: examTime,
            date: examDate
        },

        timeTagDiv: timeTagDiv,


    };


    courseList.unshift(newCourse)
    localStorage.setItem('courseList', JSON.stringify(courseList))
    addToSidebar(newCourse)
    addToTable(newCourse)
    sumLesson()
    sumUint(courseList)
    resetInputs()
    console.log(courseList)

}

function sumLesson() {
    const lessonListLength = document.querySelector('.lessonList').children.length
    document.querySelector('#sumLesson').textContent = `${lessonListLength} درس`
}

function sumUint(courseList) {
    const totalUnit = courseList.reduce((sum, lesson) => sum + Number(lesson.unit), 0)
    document.querySelectorAll('.sumUnit').forEach(span => { span.textContent = `${totalUnit} واحد` })
}

function findPlace(day, time) {
    return document.querySelector(`#${day}`).children[time]

}

function resetInputs() {
    document.querySelectorAll('.fillInputColor input').forEach(input => { input.value = '' })
    document.querySelector('input[name="week"]:checked').checked = false
    document.querySelector('#timeTagDiv').innerHTML = ''
    document.querySelector('.time-select').selectedIndex = 0
    document.querySelector('.evenOdd-select').selectedIndex = 0
    const addLessonSidebar = document.querySelector('.add-lesson-container');
    addLessonSidebar.style.transform = "translateX(390px)";
    addLessonSidebar.style.visibility = "hidden";
    const lessonNameInput = document.querySelectorAll('.fillInputColor input')
    lessonNameInput.forEach(input => {
        input.style.backgroundColor = "var(--white)"

    }
    )
}


function addToSidebar(course) {
    const lessonSidebarList = document.querySelector('.lessonList')
    if (lessonSidebarList.classList.contains('empty')) {
        lessonSidebarList.innerHTML = ``
        lessonSidebarList.classList.remove("empty")
    }
    lessonSidebarList.innerHTML += `          <div class="lessonDetails-drawer">
            <div class="lessonDetails-eye">
              <div class="lessonName-arrow">
                <input class="lessonDetails-arrow" type="checkbox" name="lesson-checkbox" id="lessonDetails-arrow${course.lessonID}"
                  hidden>
                <label class="lessonDetails-arrow-label" for="lessonDetails-arrow${course.lessonID}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M16 10L12 14L8 10" stroke="#2563EB" stroke-width="2" stroke-linecap="square" />
                  </svg>
                </label>
                <h6 class="H3">${course.lessonName}</h6>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M15.6813 9.2379C14.4468 6.56119 11.8863 4.89844 9.0003 4.89844C6.11357 4.89844 3.55308 6.56119 2.31933 9.2379C2.14533 9.6144 2.31033 10.0599 2.68608 10.2332C3.06333 10.4072 3.50808 10.2407 3.68133 9.86648C4.66758 7.72673 6.70533 6.39844 9.0003 6.39844C11.2946 6.39844 13.3323 7.72673 14.3193 9.86648C14.4461 10.141 14.7168 10.3022 15.0011 10.3022C15.1053 10.3022 15.2126 10.2805 15.3146 10.2332C15.6903 10.0599 15.8546 9.6144 15.6813 9.2379Z"
                  fill="#475569" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M9.00234 8.12695C7.63284 8.12695 6.51831 9.23995 6.51831 10.6095C6.51831 11.9827 7.63284 13.0995 9.00234 13.0995C10.3726 13.0995 11.4871 11.9827 11.4871 10.6095C11.4871 9.23995 10.3726 8.12695 9.00234 8.12695Z"
                  fill="#475569" />
              </svg>
            </div>
            <div class="lessonDetails-div">
              <div class="title-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g opacity="0.5">
                    <path
                      d="M11.9425 13.385C14.5341 13.385 16.635 11.2841 16.635 8.6925C16.635 6.1009 14.5341 4 11.9425 4C9.3509 4 7.25 6.1009 7.25 8.6925C7.25 11.2841 9.3509 13.385 11.9425 13.385Z"
                      stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                      d="M5.53573 20.0002C5.42507 19.3631 5.47078 18.7029 5.47078 18.0594C5.47078 15.6342 7.43674 13.6683 9.86187 13.6683H14.1377C16.5629 13.6683 18.5288 15.6342 18.5288 18.0594C18.5288 18.7029 18.5745 19.3631 18.4639 20.0002"
                      stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                </svg>
                <span class="BODY">${course.profossorName}</span>
              </div>
              <div class="title-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g opacity="0.5">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M14.3233 6.28561H9.67659C8.92742 6.28561 8.32031 5.67849 8.32031 4.92933V4.35627C8.32031 3.60711 8.92742 3 9.67659 3H14.3233C15.0725 3 15.6796 3.60711 15.6796 4.35627V4.92933C15.6796 5.67849 15.0725 6.28561 14.3233 6.28561Z"
                      stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                      d="M15.6803 4.59375C17.7536 4.59375 19.4348 6.27498 19.4348 8.34831V17.2458C19.4348 19.3191 17.7536 21.0004 15.6803 21.0004H8.32097C6.24764 21.0004 4.56641 19.3191 4.56641 17.2458V8.34831C4.56641 6.27498 6.24764 4.59375 8.32097 4.59375"
                      stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15.0166 14.9481H8.98242M11.9995 10.9414H8.98242" stroke="#475569" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                </svg>
                <span class="BODY">امتحان:  ${course.exam.date} - ساعت ${course.exam.time}</span>
              </div>
              <div class="classDay-tag">
                <div class="title-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g opacity="0.5">
                      <path d="M3.70557 8.18091H20.2939" stroke="#475569" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path d="M7.87646 5.68018H8.37646" stroke="#475569" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path d="M15.623 5.68018H16.123" stroke="#475569" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M15.9053 3H8.10226C5.3953 3 3.70557 4.50741 3.70557 7.27813V16.6432C3.70557 19.4577 5.3953 21 8.10226 21H15.8973C18.6123 21 20.294 19.4846 20.294 16.7129V7.27813C20.302 4.50741 18.6202 3 15.9053 3Z"
                        stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M11.7207 16.9254L13.6886 11.5706H10.3114" stroke="#475569" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg>
                  <span class="BODY">روزهای کلاس</span>
                </div>
                <div class="time-tag-div" id="mainTimeTagDiv">
                ${course.timeTagDiv}
                </div>

              </div>
              <div class="textareaFix">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g opacity="0.5">
                    <path
                      d="M20.3917 9.27057C21.6527 8.06028 20.7182 6.73422 19.7838 5.76069C18.8494 4.78717 17.5629 3.79903 16.3018 5.00931L5.0908 16.184C4.70761 16.5518 4.48718 17.0574 4.47847 17.5884L4.43466 20.259C4.42868 20.6235 4.71772 20.9246 5.08216 20.9336L7.75228 20.9995C8.28324 21.0125 8.79744 20.813 9.18063 20.4453L20.3917 9.27057Z"
                      stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M18.2491 11.4133L14.0747 7.23889" stroke="#475569" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                    <path d="M6.15985 3V9.32618M9.32276 6.16315H2.99658" stroke="#475569" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                </svg>
                <textarea maxlength="100" name="" id="" class="BODY noteInput" placeholder="نوشتن یادداشت..."></textarea>
              </div>
              <div class="add-delete-div">
                <button class="H3 deleteLesson-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18.9166 9.54688L18.3047 17.9235C18.1782 19.6562 16.7354 20.9988 14.9968 20.9988H9.00378C7.26619 20.9988 5.82241 19.6562 5.69594 17.9225L5.08398 9.54688"
                      stroke="var(--wrong)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M20.2649 6.40234H3.73535" stroke="var(--wrong)" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round" />
                    <path
                      d="M15.7714 6.40125L15.2684 3.92523C15.1225 3.37944 14.6273 3.00001 14.063 3.00001H9.9418C9.3746 2.99806 8.87745 3.37749 8.73054 3.92523L8.23242 6.40125"
                      stroke="var(--wrong)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.1016 11.7812V16.2896M13.482 11.7812V16.2896" stroke="var(--wrong)" stroke-width="1.5"
                      stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  حذف درس
                </button>
                <button class="H3 editLesson-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M6.14425 19.9399C5.40992 19.9736 4.75077 19.4898 4.56381 18.7786C4.07716 16.9264 4.45299 14.9528 5.58724 13.41L11.5023 5.36036C12.5932 3.8763 14.6815 3.55732 16.1656 4.64724C17.6496 5.73909 17.9686 7.82642 16.8777 9.31049L10.9626 17.3601C9.8284 18.903 8.05715 19.8512 6.14425 19.9399Z"
                      stroke="#475569" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M13.459 20H19.6448" stroke="#475569" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                  ویرایش درس
                </button>
              </div>
            </div>
          </div>
`
}

function addToTable(course) {
    course.schedule.forEach(element => {
        const cell = findPlace(element.day, element.time)
        cell.innerHTML = `          <td class="table-dataCell">
                <div class="table-dataCel-hoverDiv">
                  <button class="H3 viewButton-table">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M11.998 19C15.703 19 19.092 16.3746 21 12C19.092 7.62539 15.703 5.00002 11.998 5.00002C8.297 5.00002 4.908 7.62539 3 12C4.908 16.3766 8.297 19 12.002 19H11.998Z"
                        stroke="#475569" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M15.0787 12.0052C15.0787 13.6785 13.7007 15.0366 12.0027 15.0366C10.3037 15.0366 8.92566 13.6785 8.92566 12.0052C8.92566 10.3308 10.3037 8.97276 12.0027 8.97276C13.7007 8.97276 15.0787 10.3308 15.0787 12.0052Z"
                        stroke="#475569" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    مشاهده
                  </button>
                  <button class="H3 deleteButton-table">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18.9166 9.54688L18.3047 17.9235C18.1782 19.6562 16.7354 20.9988 14.9968 20.9988H9.00378C7.26619 20.9988 5.82241 19.6562 5.69594 17.9225L5.08398 9.54688"
                        stroke="var(--wrong)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M20.2649 6.40234H3.73535" stroke="var(--wrong)" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                      <path
                        d="M15.7714 6.40125L15.2684 3.92523C15.1225 3.37944 14.6273 3.00001 14.063 3.00001H9.9418C9.3746 2.99806 8.87745 3.37749 8.73054 3.92523L8.23242 6.40125"
                        stroke="var(--wrong)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M10.1016 11.7812V16.2896M13.482 11.7812V16.2896" stroke="var(--wrong)" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    حذف کلاس
                  </button>
                </div>
                <div class="table-dataCel-mainDiv">
                  <span class="lessonName-table H3">${course.lessonName} ${element.type}</span><span class="class-place BODY">مکان
                    برگزاری</span>
                </div>
              </td>`
    });
}

function addLessonTimeTag(schedule) {
    const daySelected = document.querySelector('input[name="week"]:checked').value || '';
    const evenOdd = document.querySelector('#evenOdd').value
    const classTime = document.querySelector('#classTime').value
    const timeTagDiv = document.querySelector('#timeTagDiv')
    const numToTime = { '1': '۸:۰۰', '2': '۱۰:۰۰', '3': '۱۳:۳۰', '4': '۱۵:۳۰' }
    console.log(daySelected)
    schedule.unshift({
        day: daySelected,
        time: classTime,
        type: evenOdd
    })

    timeTagDiv.innerHTML += `
                      <span class="time-tag">
                    ${daySelected} - ${evenOdd} ${numToTime[`${classTime}`]}
                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M4.20712 3.5001L6.85362 0.853625C7.04912 0.658125 7.04912 0.342125 6.85362 0.146625C6.65812 -0.048875 6.34212 -0.048875 6.14662 0.146625L3.50012 2.7931L0.853625 0.146625C0.658125 -0.048875 0.342125 -0.048875 0.146625 0.146625C-0.048875 0.342125 -0.048875 0.658125 0.146625 0.853625L2.79312 3.5001L0.146625 6.14665C-0.048875 6.3421 -0.048875 6.6581 0.146625 6.8536C0.244125 6.9511 0.372125 7.0001 0.500125 7.0001C0.628125 7.0001 0.756125 6.9511 0.853625 6.8536L3.50012 4.20715L6.14662 6.8536C6.24412 6.9511 6.37212 7.0001 6.50012 7.0001C6.62812 7.0001 6.75612 6.9511 6.85362 6.8536C7.04912 6.6581 7.04912 6.3421 6.85362 6.14665L4.20712 3.5001Z"
                        fill="#475569" />
                    </svg>`

    return timeTagDiv.innerHTML

}
let tempSchedule = []
let tempTimeTagDiv = ``
document.querySelector('#addTimeTagBtn').addEventListener('click', function () {
    tempTimeTagDiv = addLessonTimeTag(tempSchedule)
})

document.querySelector('.clear-lesson-button').addEventListener('click', function () {
    document.querySelectorAll('.fillInputColor input').forEach(input => { input.value = '' })
    document.querySelector('input[name="week"]:checked').checked = false
    document.querySelector('#timeTagDiv').innerHTML = ''
    document.querySelector('.time-select').selectedIndex = 0
    document.querySelector('.evenOdd-select').selectedIndex = 0
    const lessonNameInput = document.querySelectorAll('.fillInputColor input')
    lessonNameInput.forEach(input => {
        input.style.backgroundColor = "var(--white)"

    }
    )
})

document.querySelector('.add-lesson-button').addEventListener('click', function () {
    addLesson(tempTimeTagDiv, tempSchedule)
    tempSchedule = []
    tempTimeTagDiv = ``
})
