let courseList = JSON.parse(localStorage.getItem('courseList')) || [];
let tempID = ``;
let tempSchedule = [];
let tempTimeTagDiv = [];
updateCourses(courseList);
console.log(courseList);


function updateCourses(courseList) {
  document.querySelectorAll('td').forEach(td => { td.innerHTML = `` });
  const lessonList = document.querySelector('.lessonList');

  if (lessonList.children.length < 1) {
    lessonList.classList.add('empty');
  }

  if (lessonList.classList.contains('empty')) {
    lessonList.innerHTML = `<div class="BODY" style="
            text-align: center;
            color: var(--text2);
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;">درسی وجود ندارد.<br>از دکمه پایین درس خود را اضافه کنید.</div>`;
  } else {
    lessonList.innerHTML = ``;
  }

  courseList.forEach(course => {
    addToTable(course);
    addToSidebar(course);
  });

  sumUint(courseList);
  sumLesson(courseList);
  localStorage.setItem('courseList', JSON.stringify(courseList));
}

function addLesson(timeTagDiv, schedule) {
  const lessonName = document.querySelector('#LessonNameInput').value;
  const unit = document.querySelector('#unitInput').value;
  const profossorName = document.querySelector('#profossorName').value;
  const examTime = document.querySelector('#examTimeInput').value;
  const examDate = document.querySelector('#examDateInput').value;

  const newCourse = {
    lessonID: crypto.randomUUID(),
    lessonName: lessonName,
    unit: unit,
    profossorName: profossorName,
    schedule: [...schedule],
    exam: {
      time: examTime,
      date: examDate
    },
    timeTagDiv: [...timeTagDiv],
    note: ''
  };

  courseList.unshift(newCourse);
  localStorage.setItem('courseList', JSON.stringify(courseList));

  fillSuccessModal(newCourse);
  popUpModal();
  updateCourses(courseList);
  resetInputs();
}

function removelesson(id) {
  fillWarningModal(id)
  popUpModal();
  console.log(warningModalBtn(id));
  warningModalBtn(id)



}

function removeclass(day, time, id) {
  const lessonIndex = courseList.findIndex(i => i.lessonID === id);
  // console.log(courseList[lessonIndex].schedule.length - 1 == 0);
  if (courseList[lessonIndex].schedule.length - 1 == 0) {
    removelesson(id)
  } else {
    courseList[lessonIndex].timeTagDiv = courseList[lessonIndex].timeTagDiv.filter(tag => tag.id !== `${time}-${day}`);
    courseList[lessonIndex].schedule = courseList[lessonIndex].schedule.filter(schedule => schedule.time !== time || schedule.day !== day);
    updateCourses(courseList);
  }

}

function checkFormValidity() {
  const lessonNameInput = document.querySelector('#LessonNameInput')?.value.trim() || '';
  const profossorName = document.querySelector('#profossorName')?.value.trim() || '';
  const unit = document.querySelector('#unitInput')?.value || '';
  const daySelect = document.querySelector('#timeTagDiv').innerHTML.trim();
  const addlessonBtn = document.querySelector('.add-lesson-button');
  const clearInputsBtn = document.querySelector('.clear-lesson-button');
  const confirmBtn = document.querySelector('#confirmBtn')

  if (confirmBtn) {
    if (lessonNameInput !== '' && profossorName !== '' && unit !== '' && daySelect !== '') {
      confirmBtn.classList.remove('disable-button')
    } else {
      confirmBtn.classList.add('disable-button');
    }
  }

  if (addlessonBtn && clearInputsBtn) {
    if (lessonNameInput !== '' && profossorName !== '' && unit !== '' && daySelect !== '') {
      addlessonBtn.classList.remove('disable-button');
    } else {
      addlessonBtn.classList.add('disable-button');
    }

    if (lessonNameInput !== '' || profossorName !== '' || unit !== '' || daySelect !== '') {
      clearInputsBtn.classList.remove('disable-button');
    } else {
      clearInputsBtn.classList.add('disable-button');
    }
  }
}

function popUpModal() {
  const modalBackground = document.querySelector('.modals-background');
  const modalDiv = document.querySelector('.modal-div');
  modalBackground.style.opacity = '1';
  modalBackground.style.pointerEvents = 'all';
  modalDiv.style.transform = 'scale(1)';
  closePopUp();
  modalAddNewLesson();



  const modalTextarea = document.querySelector('.modal-div textarea');
  if (modalTextarea) {
    modalTextarea.addEventListener('input', function (event) {
      courseList[0].note = event.target.value;
      localStorage.setItem('courseList', JSON.stringify(courseList));
    });
  }
}

function fillSuccessModal(course) {
  const String = tagString(course);
  document.querySelector('.modal-div').innerHTML = `
      <div class="success-modalTitle-div">
        <h1 class="H1">درس شما ثبت شد!</h1>
        <svg id='closeModal' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" style="cursor:pointer">
          <g opacity="0.5">
            <path d="M8 8L24 24" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M24 8L8 24" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </g>
        </svg>
      </div>
      <div class="modalDetail-div">
        <div class="modal-lessonUnit">
          <h2 class="H2">${course.lessonName}</h2>
          <span class="BODY" style="color: var(--text2);">${course.unit} واحد</span>
        </div>
        <svg width="335" height="2" viewBox="0 0 335 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="335" y1="1" x2="-8.74228e-08" y2="0.999971" stroke="#E2E8F0" stroke-width="2" />
        </svg>
        <div class="modal-title-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g opacity="0.5">
              <path d="M11.9425 13.385C14.5341 13.385 16.635 11.2841 16.635 8.6925C16.635 6.1009 14.5341 4 11.9425 4C9.3509 4 7.25 6.1009 7.25 8.6925C7.25 11.2841 9.3509 13.385 11.9425 13.385Z" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M5.53573 20.0002C5.42507 19.3631 5.47078 18.7029 5.47078 18.0594C5.47078 15.6342 7.43674 13.6683 9.86187 13.6683H14.1377C16.5629 13.6683 18.5288 15.6342 18.5288 18.0594C18.5288 18.7029 18.5745 19.3631 18.4639 20.0002" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
          </svg>
          <span class="BODY">${course.profossorName}</span>
        </div>
        <div class="modal-title-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g opacity="0.5">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3233 6.28561H9.67659C8.92742 6.28561 8.32031 5.67849 8.32031 4.92933V4.35627C8.32031 3.60711 8.92742 3 9.67659 3H14.3233C15.0725 3 15.6796 3.60711 15.6796 4.35627V4.92933C15.6796 5.67849 15.0725 6.28561 14.3233 6.28561Z" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M15.6803 4.59375C17.7536 4.59375 19.4348 6.27498 19.4348 8.34831V17.2458C19.4348 19.3191 17.7536 21.0004 15.6803 21.0004H8.32097C6.24764 21.0004 4.56641 19.3191 4.56641 17.2458V8.34831C4.56641 6.27498 6.24764 4.59375 8.32097 4.59375" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M15.0166 14.9481H8.98242M11.9995 10.9414H8.98242" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
          </svg>
          <span class="BODY">امتحان: ${course.exam.date} - ساعت ${course.exam.time}</span>
        </div>
        <div class="modal-classDay-tag">
          <div class="modal-title-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g opacity="0.5">
                <path d="M3.70557 8.18091H20.2939" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.87646 5.68018H8.37646" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15.623 5.68018H16.123" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9053 3H8.10226C5.3953 3 3.70557 4.50741 3.70557 7.27813V16.6432C3.70557 19.4577 5.3953 21 8.10226 21H15.8973C18.6123 21 20.294 19.4846 20.294 16.7129V7.27813C20.302 4.50741 18.6202 3 15.9053 3Z" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11.7207 16.9254L13.6886 11.5706H10.3114" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </g>
            </svg>
            <span class="BODY">روزهای کلاس</span>
          </div>
          <div class="modal-time-tag-div" id="modalTimeTagDiv">
          ${String}
          </div>
        </div>
        <div class="modal-textareaFix">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g opacity="0.5">
              <path d="M20.3917 9.27057C21.6527 8.06028 20.7182 6.73422 19.7838 5.76069C18.8494 4.78717 17.5629 3.79903 16.3018 5.00931L5.0908 16.184C4.70761 16.5518 4.48718 17.0574 4.47847 17.5884L4.43466 20.259C4.42868 20.6235 4.71772 20.9246 5.08216 20.9336L7.75228 20.9995C8.28324 21.0125 8.79744 20.813 9.18063 20.4453L20.3917 9.27057Z" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M18.2491 11.4133L14.0747 7.23889" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M6.15985 3V9.32618M9.32276 6.16315H2.99658" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
          </svg>
          <textarea maxlength="100" name="" id="" class="BODY modal-noteInput" placeholder="نوشتن یادداشت..."></textarea>
        </div>
      </div>
      <div class="modal-buttons-div">
        <button class="H3 modal-editLesson-button">
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M19.8584 19.8518H13.4814C13.0674 19.8518 12.7314 20.1878 12.7314 20.6018C12.7314 21.0158 13.0674 21.3518 13.4814 21.3518H19.8584C20.2724 21.3518 20.6084 21.0158 20.6084 20.6018C20.6084 20.1878 20.2724 19.8518 19.8584 19.8518Z"
              fill="#475569" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M9.61666 8.84336C9.7161 8.7111 9.90386 8.68434 10.0363 8.78355L15.2163 12.664C15.349 12.7634 15.3759 12.9516 15.2763 13.0842L10.4566 19.504C9.29664 21.054 7.54664 21.364 6.33664 21.364C5.58664 21.364 5.04664 21.244 4.98664 21.234C4.85664 21.204 4.73664 21.114 4.66664 20.994C4.59664 20.864 2.87664 17.804 4.79664 15.254L9.61666 8.84336Z"
              fill="#475569" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M17.2067 10.514L16.5367 11.4047C16.4373 11.5369 16.2495 11.5637 16.1171 11.4645L10.9363 7.58345C10.8039 7.48428 10.7768 7.29665 10.8757 7.16403L11.5467 6.26399C12.2367 5.33399 13.3067 4.84399 14.3867 4.84399C15.1267 4.84399 15.8667 5.07399 16.5067 5.55399C17.2567 6.12399 17.7467 6.95399 17.8867 7.88399C18.0167 8.82399 17.7767 9.75399 17.2067 10.514Z"
              fill="#475569" />
          </svg>
          ویرایش درس
        </button>
        <button class="H3 modal-newLesson-button" id="modalOpenAddlessonSidebarBtn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="var(--action)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2178 3H7.78313C4.84378 3 3 5.08119 3 8.02638V15.9736C3 18.9188 4.83503 21 7.78313 21H16.2169C19.1659 21 21 18.9188 21 15.9736V8.02638C21 5.08119 19.1659 3 16.2178 3Z" stroke="var(--action)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M12 8.69434V15.2872" stroke="var(--white)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M15.2989 11.9924H8.69922" stroke="var(--white)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          درس جدید
        </button>
      </div>`;
}

function fillWarningModal(id) {
  const index = courseList.findIndex(course => course.lessonID === id);
  const course = courseList[index];

  document.querySelector('.modal-div').innerHTML = `
    <div class="warning-modalTitle-div">
      <h1 class="H1">هشدار</h1>
      <svg id='closeModal' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <g opacity="0.5">
          <path d="M8 8L24 24" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M24 8L8 24" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      </svg>
    </div>
    <div class="warning-modalDetail-div">
      <h2 class="H2">آیا مایلید که
        ${course.lessonName}
        را حذف کنید؟</h2>
      <p class="BODY">&#9679 با حذف کلاس، میتوانید بعداً از طریق ویرایش درس، کلاس جدیدی برای این درس تعریف کنید.</p>
      <div class="warningModal-checkMark-message-div">
        <input type="checkbox" id="deleteLessonCheckMark" name="deleteLessonCheckMark" hidden>
        <label for="deleteLessonCheckMark">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.5015 9H10.499C9.6706 9 8.99902 9.67157 8.99902 10.5V13.5025C8.99902 14.3309 9.6706 15.0025 10.499 15.0025H13.5015C14.33 15.0025 15.0015 14.3309 15.0015 13.5025V10.5C15.0015 9.67157 14.33 9 13.5015 9Z"
              fill="" />
            <path
              d="M7.78216 3H16.2169C19.165 3 21 5.08119 21 8.02638V15.9736C21 18.9188 19.165 21 16.2159 21H7.78216C4.83405 21 3 18.9188 3 15.9736V8.02638C3 5.08119 4.84281 3 7.78216 3Z"
              stroke="#475569" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </label>

        <span class="H3">این درس به طور کلی حذف شود.</span>
      </div>
    </div>
    <div class="warning-modal-buttons-div">
      <button class="H3 modal-cancel-button" id="cancel-deleteLesson">
        انصراف
      </button>
      <button class="H3 modal-deleteLesson-button disable-button" id="">
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
        حذف درس
      </button>
    </div>`



}

function sumLesson(courseList) {
  document.querySelector('#sumLesson').textContent = `${courseList.length} درس`;
}

function sumUint(courseList) {
  const totalUnit = courseList.reduce((sum, lesson) => sum + Number(lesson.unit), 0);
  document.querySelectorAll('.sumUnit').forEach(span => { span.textContent = `${totalUnit} واحد` });
}

function findPlace(day, time) {
  return document.querySelector(`#${day}`).children[time];
}

function resetInputs() {
  document.querySelectorAll('.fillInputColor input').forEach(input => {
    input.value = '';
    input.style.backgroundColor = "var(--white)";
  });
  if (document.querySelector('input[name="week"]:checked')) {
    document.querySelector('input[name="week"]:checked').checked = false;
  }
  document.querySelector('#timeTagDiv').innerHTML = '';
  document.querySelector('.time-select').selectedIndex = 0;
  document.querySelector('.evenOdd-select').selectedIndex = 0;
  document.querySelector('.examInterference').style.display = 'none'
  document.querySelector('.examDayInterference').style.display = 'none'
  document.querySelector('.dayTimeInterference').style.display = 'none'

  tempID = ``;
  tempSchedule = [];
  tempTimeTagDiv = [];

  resetProgressBar()
  checkFormValidity();
}

function addToSidebar(course) {
  const lessonSidebarList = document.querySelector('.lessonList');
  const String = tagString(course);

  if (lessonSidebarList.classList.contains('empty')) {
    lessonSidebarList.innerHTML = ``;
    lessonSidebarList.classList.remove("empty");
  }

  lessonSidebarList.innerHTML += `
          <div class="lessonDetails-drawer" data-id="${course.lessonID}">
            <div class="lessonDetails-eye">
            <div class="lessonName-arrow">
            <input class="lessonDetails-arrow" type="checkbox" name="lesson-checkbox" id="lessonDetails-arrow${course.lessonID}" hidden>
            <label class="lessonDetails-arrow-label" for="lessonDetails-arrow${course.lessonID}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M16 10L12 14L8 10" stroke="#2563EB" stroke-width="2" stroke-linecap="square" />
            </svg>
            </label>
            <h6 class="H3">${course.lessonName}</h6>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; white-space: nowrap;">
              <span class="BODY" style="color: var(--text2);">${course.unit} واحد</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6813 9.2379C14.4468 6.56119 11.8863 4.89844 9.0003 4.89844C6.11357 4.89844 3.55308 6.56119 2.31933 9.2379C2.14533 9.6144 2.31033 10.0599 2.68608 10.2332C3.06333 10.4072 3.50808 10.2407 3.68133 9.86648C4.66758 7.72673 6.70533 6.39844 9.0003 6.39844C11.2946 6.39844 13.3323 7.72673 14.3193 9.86648C14.4461 10.141 14.7168 10.3022 15.0011 10.3022C15.1053 10.3022 15.2126 10.2805 15.3146 10.2332C15.6903 10.0599 15.8546 9.6144 15.6813 9.2379Z" fill="#475569" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00234 8.12695C7.63284 8.12695 6.51831 9.23995 6.51831 10.6095C6.51831 11.9827 7.63284 13.0995 9.00234 13.0995C10.3726 13.0995 11.4871 11.9827 11.4871 10.6095C11.4871 9.23995 10.3726 8.12695 9.00234 8.12695Z" fill="#475569" />
                </svg>
              </div>
                </div>
            <div class="lessonDetails-div">
              <div class="title-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><g opacity="0.5"><path d="M11.9425 13.385C14.5341 13.385 16.635 11.2841 16.635 8.6925C16.635 6.1009 14.5341 4 11.9425 4C9.3509 4 7.25 6.1009 7.25 8.6925C7.25 11.2841 9.3509 13.385 11.9425 13.385Z" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M5.53573 20.0002C5.42507 19.3631 5.47078 18.7029 5.47078 18.0594C5.47078 15.6342 7.43674 13.6683 9.86187 13.6683H14.1377C16.5629 13.6683 18.5288 15.6342 18.5288 18.0594C18.5288 18.7029 18.5745 19.3631 18.4639 20.0002" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></g></svg>
                <span class="BODY">${course.profossorName}</span>
              </div>
              <div class="title-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><g opacity="0.5"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.3233 6.28561H9.67659C8.92742 6.28561 8.32031 5.67849 8.32031 4.92933V4.35627C8.32031 3.60711 8.92742 3 9.67659 3H14.3233C15.0725 3 15.6796 3.60711 15.6796 4.35627V4.92933C15.6796 5.67849 15.0725 6.28561 14.3233 6.28561Z" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M15.6803 4.59375C17.7536 4.59375 19.4348 6.27498 19.4348 8.34831V17.2458C19.4348 19.3191 17.7536 21.0004 15.6803 21.0004H8.32097C6.24764 21.0004 4.56641 19.3191 4.56641 17.2458V8.34831C4.56641 6.27498 6.24764 4.59375 8.32097 4.59375" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M15.0166 14.9481H8.98242M11.9995 10.9414H8.98242" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></g></svg>
                <span class="BODY">امتحان:  ${course.exam.date} - ساعت ${course.exam.time}</span>
              </div>
              <div class="classDay-tag">
                <div class="title-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><g opacity="0.5"><path d="M3.70557 8.18091H20.2939" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M7.87646 5.68018H8.37646" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M15.623 5.68018H16.123" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path fill-rule="evenodd" clip-rule="evenodd" d="M15.9053 3H8.10226C5.3953 3 3.70557 4.50741 3.70557 7.27813V16.6432C3.70557 19.4577 5.3953 21 8.10226 21H15.8973C18.6123 21 20.294 19.4846 20.294 16.7129V7.27813C20.302 4.50741 18.6202 3 15.9053 3Z" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M11.7207 16.9254L13.6886 11.5706H10.3114" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></g></svg>
                  <span class="BODY">روزهای کلاس</span>
                </div>
                <div class="time-tag-div" id="mainTimeTagDiv">
                ${String}
                </div>
              </div>
              <div class="textareaFix">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><g opacity="0.5"><path d="M20.3917 9.27057C21.6527 8.06028 20.7182 6.73422 19.7838 5.76069C18.8494 4.78717 17.5629 3.79903 16.3018 5.00931L5.0908 16.184C4.70761 16.5518 4.48718 17.0574 4.47847 17.5884L4.43466 20.259C4.42868 20.6235 4.71772 20.9246 5.08216 20.9336L7.75228 20.9995C8.28324 21.0125 8.79744 20.813 9.18063 20.4453L20.3917 9.27057Z" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M18.2491 11.4133L14.0747 7.23889" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M6.15985 3V9.32618M9.32276 6.16315H2.99658" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></g></svg>
                <textarea maxlength="100" name="" id="" class="BODY noteInput" placeholder="نوشتن یادداشت...">${course.note}</textarea>
              </div>
              <div class="add-delete-div">
                <button class="H3 deleteLesson-button" id="${course.lessonID}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18.9166 9.54688L18.3047 17.9235C18.1782 19.6562 16.7354 20.9988 14.9968 20.9988H9.00378C7.26619 20.9988 5.82241 19.6562 5.69594 17.9225L5.08398 9.54688" stroke="var(--wrong)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M20.2649 6.40234H3.73535" stroke="var(--wrong)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M15.7714 6.40125L15.2684 3.92523C15.1225 3.37944 14.6273 3.00001 14.063 3.00001H9.9418C9.3746 2.99806 8.87745 3.37749 8.73054 3.92523L8.23242 6.40125" stroke="var(--wrong)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M10.1016 11.7812V16.2896M13.482 11.7812V16.2896" stroke="var(--wrong)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
                  حذف درس
                </button>
                <button class="H3 editLesson-button">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.8584 19.8518H13.4814C13.0674 19.8518 12.7314 20.1878 12.7314 20.6018C12.7314 21.0158 13.0674 21.3518 13.4814 21.3518H19.8584C20.2724 21.3518 20.6084 21.0158 20.6084 20.6018C20.6084 20.1878 20.2724 19.8518 19.8584 19.8518Z" fill="#475569" /><path fill-rule="evenodd" clip-rule="evenodd" d="M9.61666 8.84336C9.7161 8.7111 9.90386 8.68434 10.0363 8.78355L15.2163 12.664C15.349 12.7634 15.3759 12.9516 15.2763 13.0842L10.4566 19.504C9.29664 21.054 7.54664 21.364 6.33664 21.364C5.58664 21.364 5.04664 21.244 4.98664 21.234C4.85664 21.204 4.73664 21.114 4.66664 20.994C4.59664 20.864 2.87664 17.804 4.79664 15.254L9.61666 8.84336Z" fill="#475569" /><path fill-rule="evenodd" clip-rule="evenodd" d="M17.2067 10.514L16.5367 11.4047C16.4373 11.5369 16.2495 11.5637 16.1171 11.4645L10.9363 7.58345C10.8039 7.48428 10.7768 7.29665 10.8757 7.16403L11.5467 6.26399C12.2367 5.33399 13.3067 4.84399 14.3867 4.84399C15.1267 4.84399 15.8667 5.07399 16.5067 5.55399C17.2567 6.12399 17.7467 6.95399 17.8867 7.88399C18.0167 8.82399 17.7767 9.75399 17.2067 10.514Z" fill="#475569" /></svg>
                  ویرایش درس
                </button>
              </div>
            </div>
          </div>`;
}

function addToTable(course) {
  course.schedule.forEach(element => {
    const cell = findPlace(element.day, element.time);
    if (cell) {
      cell.innerHTML = `
              <td class="table-dataCell">
                <div class="table-dataCel-hoverDiv">
                  <button class="H3 viewButton-table">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M11.998 19C15.703 19 19.092 16.3746 21 12C19.092 7.62539 15.703 5.00002 11.998 5.00002C8.297 5.00002 4.908 7.62539 3 12C4.908 16.3766 8.297 19 12.002 19H11.998Z" stroke="#475569" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path fill-rule="evenodd" clip-rule="evenodd" d="M15.0787 12.0052C15.0787 13.6785 13.7007 15.0366 12.0027 15.0366C10.3037 15.0366 8.92566 13.6785 8.92566 12.0052C8.92566 10.3308 10.3037 8.97276 12.0027 8.97276C13.7007 8.97276 15.0787 10.3308 15.0787 12.0052Z" stroke="#475569" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    مشاهده
                  </button>
                  <button class="H3 deleteButton-table" id="${element.day}-${element.time}" data-id="${course.lessonID}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18.9166 9.54688L18.3047 17.9235C18.1782 19.6562 16.7354 20.9988 14.9968 20.9988H9.00378C7.26619 20.9988 5.82241 19.6562 5.69594 17.9225L5.08398 9.54688" stroke="var(--wrong)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20.2649 6.40234H3.73535" stroke="var(--wrong)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.7714 6.40125L15.2684 3.92523C15.1225 3.37944 14.6273 3.00001 14.063 3.00001H9.9418C9.3746 2.99806 8.87745 3.37749 8.73054 3.92523L8.23242 6.40125" stroke="var(--wrong)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.1016 11.7812V16.2896M13.482 11.7812V16.2896" stroke="var(--wrong)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    حذف کلاس
                  </button>
                </div>
                <div class="table-dataCel-mainDiv">
                  <span class="lessonName-table H3">${course.lessonName} ${element.type}</span><span class="class-place-table BODY">مکان برگزاری</span>
                </div>
              </td>`;

    }
  });
}

function tagString(course, flag = false) {
  let tagString = ``;
  if (!flag) {
    course.timeTagDiv.forEach(string => {
      tagString += string.string;
    });
  } else {
    course.timeTagDiv.forEach(string => {
      tagString += string.stringClose;
    });
  }
  return tagString;
}


function checkInterference(daySelected = null, classTime = null, examDay = null, examTime = null) {
  let examflag = 0
  if (examDay) {
    if (courseList.some(course => (course.exam.date == examDay))) {
      examflag = 1;
      if (examTime) {
        if (courseList.some(course => (course.exam.time == examTime))) {
          examflag = 2;
        }
      }
    }
  }

  if (daySelected && classTime) {
    const classflag = courseList.some(course => (course.schedule.some(schedule => (schedule.day == daySelected && schedule.time == classTime))));
    return classflag;
  }
  return examflag;
}


function addLessonSchedule() {
  const daySelected = document.querySelector('input[name="week"]:checked')?.value || '';
  const evenOdd = document.querySelector('#evenOdd').value;
  const classTime = document.querySelector('#classTime').value;
  const timeTagDiv = document.querySelector('#timeTagDiv');
  const numToTime = { '1': '۸:۰۰', '2': '۱۰:۰۰', '3': '۱۳:۳۰', '4': '۱۵:۳۰' };

  if (!daySelected || !classTime) return;

  if (tempSchedule.some(schedule => (schedule.day == daySelected && schedule.time == classTime))) {
    return
  }

  if (checkInterference(daySelected, classTime, null, null)) {
    document.querySelector('.dayTimeInterference').style.display = 'flex'
  }



  tempSchedule.unshift({
    day: daySelected,
    time: classTime,
    type: evenOdd
  });

  tempTimeTagDiv.unshift({
    id: `${classTime}-${daySelected}`,
    string: `<span class="time-tag">
                  ${daySelected} - ${evenOdd} ${numToTime[`${classTime}`]}
                  </span>`,
    stringClose: `<span class="time-tag">
                  ${daySelected} - ${evenOdd} ${numToTime[`${classTime}`]}
                  <svg id="${classTime}-${daySelected}" class="removeTime" xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none" style="cursor:pointer">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.20712 3.5001L6.85362 0.853625C7.04912 0.658125 7.04912 0.342125 6.85362 0.146625C6.65812 -0.048875 6.34212 -0.048875 6.14662 0.146625L3.50012 2.7931L0.853625 0.146625C0.658125 -0.048875 0.342125 -0.048875 0.146625 0.146625C-0.048875 0.342125 -0.048875 0.658125 0.146625 0.853625L2.79312 3.5001L0.146625 6.14665C-0.048875 6.3421 -0.048875 6.6581 0.146625 6.8536C0.244125 6.9511 0.372125 7.0001 0.500125 7.0001C0.628125 7.0001 0.756125 6.9511 0.853625 6.8536L3.50012 4.20715L6.14662 6.8536C6.24412 6.9511 6.37212 7.0001 6.50012 7.0001C6.62812 7.0001 6.75612 6.9511 6.85362 6.8536C7.04912 6.6581 7.04912 6.3421 6.85362 6.14665L4.20712 3.5001Z" fill="#475569" />
                  </svg>
                </span>`
  });

  timeTagDiv.innerHTML += `
      <span class="time-tag">
        ${daySelected} - ${evenOdd} ${numToTime[`${classTime}`]}
        <svg id="${classTime}-${daySelected}" class="removeTime" xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none" style="cursor:pointer">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.20712 3.5001L6.85362 0.853625C7.04912 0.658125 7.04912 0.342125 6.85362 0.146625C6.65812 -0.048875 6.34212 -0.048875 6.14662 0.146625L3.50012 2.7931L0.853625 0.146625C0.658125 -0.048875 0.342125 -0.048875 0.146625 0.146625C-0.048875 0.342125 -0.048875 0.658125 0.146625 0.853625L2.79312 3.5001L0.146625 6.14665C-0.048875 6.3421 -0.048875 6.6581 0.146625 6.8536C0.244125 6.9511 0.372125 7.0001 0.500125 7.0001C0.628125 7.0001 0.756125 6.9511 0.853625 6.8536L3.50012 4.20715L6.14662 6.8536C6.24412 6.9511 6.37212 7.0001 6.50012 7.0001C6.62812 7.0001 6.75612 6.9511 6.85362 6.8536C7.04912 6.6581 7.04912 6.3421 6.85362 6.14665L4.20712 3.5001Z" fill="#475569" />
        </svg>
      </span>`;

  document.querySelector(`.removeTime`).parentElement.style.transform = 'scale(0.1)';
  setTimeout(() => {
    document.querySelector(`.removeTime`).parentElement.style.transform = 'scale(1)';
  }, 100);
}

function removeclassTag(tag) {
  const [time, day] = tag.id.split('-');

  tempTimeTagDiv = tempTimeTagDiv.filter(i => i.id !== tag.id);
  tempSchedule = tempSchedule.filter(i => i.day !== day || i.time !== time);

  if (checkInterference(day, time, null, null)) {
    document.querySelector('.dayTimeInterference').style.display = 'none'
  }
  tag.parentElement.style.transform = 'scale(0.1)';
  setTimeout(() => {
    tag.parentElement.remove();
    checkFormValidity();
    progressBar()
  }, 200);
}

function modalAddNewLesson() {
  const addBtn = document.querySelector('#modalOpenAddlessonSidebarBtn');
  const editBtn = document.querySelector('.modal-editLesson-button')
  if (addBtn) {
    addBtn.addEventListener('click', function () {
      const addLessonSidebar = document.querySelector('.add-lesson-container');
      addLessonSidebar.style.transform = "translateX(0)";
      addLessonSidebar.style.visibility = "visible";

      const modalDiv = document.querySelector('.modal-div');
      const modalBackground = document.querySelector('.modals-background');
      modalBackground.style.opacity = '0';
      modalBackground.style.pointerEvents = 'none';
      modalDiv.style.transform = 'scale(0.01)';

      const buttonDiv = document.querySelector('.cancel-Btn')?.parentElement || document.querySelector('.add-lesson-button')?.parentElement;
      if (buttonDiv) {
        buttonDiv.innerHTML = `
          <button class="disable-button clear-lesson-button" id="sidebarClearInputsBtn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.866 14.864C14.72 15.01 14.528 15.084 14.336 15.084C14.143 15.084 13.952 15.01 13.805 14.864L11.999 13.057L10.198 14.858C9.905 15.151 9.43 15.151 9.137 14.858C8.845 14.565 8.845 14.091 9.137 13.798L10.938 11.997L9.136 10.194C8.843 9.901 8.843 9.427 9.136 9.134C9.429 8.841 9.903 8.841 10.196 9.134L11.998 10.936L13.8 9.135C14.093 8.842 14.567 8.842 14.86 9.135C15.153 9.427 15.153 9.902 14.86 10.195L13.059 11.997L14.866 13.803C15.159 14.096 15.159 14.571 14.866 14.864ZM12 2.5C6.762 2.5 2.5 6.761 2.5 12C2.5 17.238 6.762 21.5 12 21.5C17.238 21.5 21.5 17.238 21.5 12C21.5 6.761 17.238 2.5 12 2.5Z" fill="var(--text2)" /></svg>
            <span>پاکسازی</span>
          </button>
          <button class="disable-button add-lesson-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M16.66 2C20.06 2 22 3.92 22 7.33V16.67C22 20.06 20.07 22 16.67 22H7.33C3.92 22 2 20.06 2 16.67V7.33C2 3.92 3.92 2 7.33 2H16.66ZM11.99 7.51C11.53 7.51 11.16 7.88 11.16 8.34V11.16H8.33C8.11 11.16 7.9 11.25 7.74 11.4C7.59 11.56 7.5 11.769 7.5 11.99C7.5 12.45 7.87 12.82 8.33 12.83H11.16V15.66C11.16 16.12 11.53 16.49 11.99 16.49C12.45 16.49 12.82 16.12 12.82 15.66V12.83H15.66C16.12 12.82 16.49 12.45 16.49 11.99C16.49 11.53 16.12 11.16 15.66 11.16H12.82V8.34C12.82 7.88 12.45 7.51 11.99 7.51Z" fill="var(--action)" /></svg>
            <span>افزودن درس</span>
          </button>`;
      }
      checkFormValidity();
    });
  }

  if (editBtn) {
    editBtn.addEventListener('click', function () {
      tempID = courseList[0].lessonID
      editLesson(courseList[0].lessonID)
      const modalDiv = document.querySelector('.modal-div');
      const modalBackground = document.querySelector('.modals-background');
      modalBackground.style.opacity = '0';
      modalBackground.style.pointerEvents = 'none';
      modalDiv.style.transform = 'scale(0.01)';
    })
  }
}


function warningModalBtn(id) {
  const deleteButton = document.querySelector('.modal-deleteLesson-button');
  const cancelButton = document.querySelector('.modal-cancel-button');

  document.querySelector('#deleteLessonCheckMark').addEventListener('click', function () {
    const checkMark = document.querySelector('#deleteLessonCheckMark');
    if (checkMark.checked) {
      deleteButton.classList.remove('disable-button');
    } else {
      deleteButton.classList.add('disable-button');
    }

    if (deleteButton && !deleteButton.classList.contains('disable-button')) {
      deleteButton.addEventListener('click', function () {
        const modalDiv = document.querySelector('.modal-div');
        const modalBackground = document.querySelector('.modals-background');
        modalBackground.style.opacity = '0';
        modalBackground.style.pointerEvents = 'none';
        modalDiv.style.transform = 'scale(0.01)';
        courseList = courseList.filter(course => course.lessonID !== id);
        updateCourses(courseList);
      })
    }

  })


  if (cancelButton) {
    cancelButton.addEventListener('click', function () {
      const modalDiv = document.querySelector('.modal-div');
      const modalBackground = document.querySelector('.modals-background');
      modalBackground.style.opacity = '0';
      modalBackground.style.pointerEvents = 'none';
      modalDiv.style.transform = 'scale(0.01)';
    })
  }
}


function editLesson(id) {
  document.querySelector('#addTimeTagBtn').classList.add('edit');
  const addLessonSidebar = document.querySelector('.add-lesson-container');
  addLessonSidebar.style.transform = "translateX(0)";
  addLessonSidebar.style.visibility = "visible";

  const index = courseList.findIndex(course => course.lessonID == id);

  tempSchedule = [...courseList[index].schedule];
  tempTimeTagDiv = [...courseList[index].timeTagDiv];

  document.querySelector('#LessonNameInput').value = courseList[index].lessonName;
  document.querySelector('#unitInput').value = courseList[index].unit;
  document.querySelector('#profossorName').value = courseList[index].profossorName;
  document.querySelector('#examTimeInput').value = courseList[index].exam.time;
  document.querySelector('#examDateInput').value = courseList[index].exam.date;
  document.querySelector('#timeTagDiv').innerHTML = tagString(courseList[index], true);

  const buttonDiv = document.querySelector('.add-lesson-button')?.parentElement || document.querySelector('.cancel-Btn')?.parentElement;
  if (buttonDiv) {
    buttonDiv.innerHTML = `
      <button class="H3 cancel-Btn" id="cancelBtn"><span>انصراف</span></button>
      <button class="H3 confirm-Btn" id="confirmBtn"><span>ثبت</span></button>`;
  }

  document.querySelectorAll('.fillInputColor input').forEach(input => {
    if (input.value) input.style.backgroundColor = "var(--white3)";
  });
}


function confirmEdit(id) {
  const index = courseList.findIndex(course => course.lessonID == id);
  courseList[index].lessonName = document.querySelector('#LessonNameInput').value;
  courseList[index].unit = document.querySelector('#unitInput').value;
  courseList[index].profossorName = document.querySelector('#profossorName').value;
  courseList[index].exam.time = document.querySelector('#examTimeInput').value;
  courseList[index].exam.date = document.querySelector('#examDateInput').value;

  courseList[index].schedule = [...tempSchedule];
  courseList[index].timeTagDiv = [...tempTimeTagDiv];


  if (courseList[index].schedule.length == 0) {
    removelesson(id)
  }

  const addLessonSidebar = document.querySelector('.add-lesson-container');
  addLessonSidebar.style.transform = "translateX(390px)";
  addLessonSidebar.style.visibility = "hidden";

  localStorage.setItem('courseList', JSON.stringify(courseList));
  updateCourses(courseList);
  resetInputs();
}


function cancelEdit() {
  const addLessonSidebar = document.querySelector('.add-lesson-container');
  addLessonSidebar.style.transform = "translateX(390px)";
  addLessonSidebar.style.visibility = "hidden";
  resetInputs();
}


function closePopUp() {
  const closeBtn = document.querySelector('#closeModal');
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      const modalDiv = document.querySelector('.modal-div');
      const modalBackground = document.querySelector('.modals-background');
      modalBackground.style.opacity = '0';
      modalBackground.style.pointerEvents = 'none';
      modalDiv.style.transform = 'scale(0.01)';
      updateCourses(courseList);
    });
  }
}


function progressBar(input = null) {
  const daySelect = document.querySelector('#timeTagDiv');
  const line = document.querySelector('#progressBar')
  const edit = document.querySelector('.edit')
  let i = 0
  i = Number(line.style.width.split('p')[0])
  line.style.width = `${i}px`

  if (edit) {
    line.style.fill = 'var(--white3)'
    line.style.width = `382px`
    return

  }

  if (input) {
    if (input.value !== '' && !(input.classList.contains('progressed'))) {
      input.classList.add('progressed')
      if (i < 315) {
        i += 63
      } else {
        i = 382
      }
    } else if (input.value == '') {
      input.classList.remove('progressed')
      if (i <= 315) {
        i -= 63
      } else {
        i = 315
      }
    }
  } else {
    if (daySelect.innerHTML.trim() !== '' && !(daySelect.classList.contains('progressed'))) {
      daySelect.classList.add('progressed')
      if (i < 315) {
        i += 63
      } else {
        i = 382
      }
    } else if (daySelect.innerHTML.trim() == '') {
      daySelect.classList.remove('progressed')
      if (i <= 315) {
        i -= 63
      } else {
        i = 315
      }
    }
  }


  if (!(document.querySelector('.add-lesson-button')?.classList.contains('disable-button'))) {
    line.style.fill = 'var(--action)'
  } else {
    line.style.fill = 'var(--wrong)'
  }


  if (i == 382) {
    line.style.fill = 'var(--good)'
  }

  line.style.width = `${i}px`
}


function resetProgressBar() {
  const line = document.querySelector('#progressBar')
  line.style.fill = 'var(--wrong)'
  line.style.width = `0px`
  document.querySelectorAll('.progressed')?.forEach(input => {
    input.classList.remove('progressed')
  })
}




document.querySelectorAll('.fillInputColor input').forEach(input => {
  input.addEventListener('input', function () {
    checkFormValidity();
    progressBar(input)
    input.style.backgroundColor = input.value ? "var(--white3)" : "";
  });
});


document.querySelector('#resetAll').addEventListener('click', function () {
  localStorage.removeItem('courseList');
  courseList = [];
  document.querySelector('.lessonList').classList.add('empty');
  resetInputs();
  const addLessonSidebar = document.querySelector('.add-lesson-container');
  addLessonSidebar.style.transform = "translateX(390px)";
  addLessonSidebar.style.visibility = "hidden";
  updateCourses(courseList);
});


document.querySelector('#openAddlessonSidebarBtn').addEventListener('click', function () {
  const addLessonSidebar = document.querySelector('.add-lesson-container');
  addLessonSidebar.style.transform = "translateX(0)";
  addLessonSidebar.style.visibility = "visible";

  const buttonDiv = document.querySelector('.cancel-Btn')?.parentElement || document.querySelector('.add-lesson-button')?.parentElement;
  if (buttonDiv) {
    buttonDiv.innerHTML = `
        <button class="disable-button clear-lesson-button" id="sidebarClearInputsBtn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.866 14.864C14.72 15.01 14.528 15.084 14.336 15.084C14.143 15.084 13.952 15.01 13.805 14.864L11.999 13.057L10.198 14.858C9.905 15.151 9.43 15.151 9.137 14.858C8.845 14.565 8.845 14.091 9.137 13.798L10.938 11.997L9.136 10.194C8.843 9.901 8.843 9.427 9.136 9.134C9.429 8.841 9.903 8.841 10.196 9.134L11.998 10.936L13.8 9.135C14.093 8.842 14.567 8.842 14.86 9.135C15.153 9.427 15.153 9.902 14.86 10.195L13.059 11.997L14.866 13.803C15.159 14.096 15.159 14.571 14.866 14.864ZM12 2.5C6.762 2.5 2.5 6.761 2.5 12C2.5 17.238 6.762 21.5 12 21.5C17.238 21.5 21.5 17.238 21.5 12C21.5 6.761 17.238 2.5 12 2.5Z" fill="var(--text2)" /></svg>
          <span>پاکسازی</span>
        </button>
        <button class="disable-button add-lesson-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M16.66 2C20.06 2 22 3.92 22 7.33V16.67C22 20.06 20.07 22 16.67 22H7.33C3.92 22 2 20.06 2 16.67V7.33C2 3.92 3.92 2 7.33 2H16.66ZM11.99 7.51C11.53 7.51 11.16 7.88 11.16 8.34V11.16H8.33C8.11 11.16 7.9 11.25 7.74 11.4C7.59 11.56 7.5 11.769 7.5 11.99C7.5 12.45 7.87 12.82 8.33 12.83H11.16V15.66C11.16 16.12 11.53 16.49 11.99 16.49C12.45 16.49 12.82 16.12 12.82 15.66V12.83H15.66C16.12 12.82 16.49 12.45 16.49 11.99C16.49 11.53 16.12 11.16 15.66 11.16H12.82V8.34C12.82 7.88 12.45 7.51 11.99 7.51Z" fill="var(--action)" /></svg>
          <span>افزودن درس</span>
        </button>`;
  }
  checkFormValidity();
});


document.querySelector('#closeAddLeassonSidebarBtn').addEventListener('click', function () {
  const addLessonSidebar = document.querySelector('.add-lesson-container');
  addLessonSidebar.style.transform = "translateX(390px)";
  addLessonSidebar.style.visibility = "hidden";
  if (document.querySelector('#addTimeTagBtn').classList.contains('edit')) {
    resetInputs();
    document.querySelector('#addTimeTagBtn').classList.remove('edit');
  }
});


document.querySelector('.add-lesson-container').addEventListener('click', function (event) {
  const confirmBtn = event.target.closest('.confirm-Btn');
  const cancelBtn = event.target.closest('.cancel-Btn');
  const addBtn = event.target.closest('.add-lesson-button');
  const clearBtn = event.target.closest('.clear-lesson-button');

  if (confirmBtn && !confirmBtn.classList.contains('disable-button')) {
    confirmEdit(tempID);
  }

  if (cancelBtn) {
    cancelEdit();
  }

  if (addBtn && !addBtn.classList.contains('disable-button')) {
    addLesson(tempTimeTagDiv, tempSchedule);
    resetProgressBar()
    const addLessonSidebar = document.querySelector('.add-lesson-container');
    addLessonSidebar.style.transform = "translateX(390px)";
    addLessonSidebar.style.visibility = "hidden";
  }

  if (clearBtn && !clearBtn.classList.contains('disable-button')) {
    resetInputs();
  }
});


document.querySelector('#addTimeTagBtn').addEventListener('click', function () {
  addLessonSchedule();
  checkFormValidity();
  progressBar()
});


document.querySelector('#timeTagDiv').addEventListener('click', function (event) {
  const removeIcon = event.target.closest('.removeTime');
  if (removeIcon) {
    removeclassTag(removeIcon);

  }
});


document.querySelector('.lessonList').addEventListener('click', function (event) {
  const deleteBtn = event.target.closest('.deleteLesson-button');
  const editBtn = event.target.closest('.editLesson-button');

  if (deleteBtn) {
    removelesson(deleteBtn.id);
  }

  if (editBtn) {

    const id = editBtn.parentElement.querySelector('.deleteLesson-button').id;
    tempID = id;
    editLesson(id);
    progressBar()
  }
});


document.addEventListener('input', function (event) {
  if (event.target.classList.contains('noteInput')) {
    const drawer = event.target.closest('.lessonDetails-drawer');
    if (drawer) {
      const id = drawer.dataset.id;
      const index = courseList.findIndex(c => c.lessonID == id);
      if (index > -1) {
        courseList[index].note = event.target.value;
        localStorage.setItem('courseList', JSON.stringify(courseList));
      }
    }
  }

  if (event.target.id == 'examDateInput' || event.target.id == 'examTimeInput') {
    const examDate = document.querySelector('#examDateInput').value;
    const examTime = document.querySelector('#examTimeInput').value;

    if (checkInterference(null, null, examDate, examTime) == 1) {
      document.querySelector('.examInterference').style.display = 'none'
      document.querySelector('.examDayInterference').style.display = 'flex'
    } else if (checkInterference(null, null, examDate, examTime) == 2) {
      document.querySelector('.examDayInterference').style.display = 'none'
      document.querySelector('.examInterference').style.display = 'flex'
    } else {
      document.querySelector('.examInterference').style.display = 'none'
      document.querySelector('.examDayInterference').style.display = 'none'
    }
  }
});


document.querySelector('tbody').addEventListener('click', function (event) {
  const tableDeleteBtn = event.target.closest('.deleteButton-table');
  if (tableDeleteBtn) {
    const [day, time] = tableDeleteBtn.id.split('-');
    const ID = tableDeleteBtn.dataset.id;
    removeclass(day, time, ID);
  }
});
