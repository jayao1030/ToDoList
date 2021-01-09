const addBtn = document.querySelector('#addBtn');
const addInput = document.querySelector('#addInput');
const toggleBtn = document.querySelector('#toggleBtn');
const addList = document.querySelector('.list-control');
const clearAllBtn = document.querySelector('#clearAllBtn')


// 點擊事件
addBtn.addEventListener('click', addLists);

// 新增List的函式
function addLists(evt) {
    if (addInput.value === '') return;
    const li = document.createElement('li');
    li.className = "todoItem";
    li.appendChild(document.createTextNode(addInput.value));
    addList.appendChild(li);
    addInput.value = '';
    createBtn(li);
}


//刪除所有list
function clearAllList() {
    addList.innerHTML = '';
};
clearAllBtn.addEventListener('click', clearAllList);

//鍵盤事件
addInput.addEventListener('keyup', (evt) => {
    if (evt.keyCode === 13) {
        addLists();
    }
});

//顯示隱藏List切換
function displayHiedItem() {
    if (addList.style.display === 'none') {
        addList.style.display = 'block';
        toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        toggleBtn.title = '隱藏列表';
    } else {
        addList.style.display = 'none';
        toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
        toggleBtn.title = '顯示列表';
    }
}
toggleBtn.addEventListener('click', displayHiedItem);

//創建刪除和移動位置的button
const listUl = document.querySelector('.list');
const lis = listUl.children;

function createBtn(li) {
    const remove = document.createElement('button');
    remove.className = 'fas fa-times';
    li.appendChild(remove);

    const up = document.createElement('button');
    up.className = 'fas fa-angle-double-up';
    li.appendChild(up);

    const down = document.createElement('button');
    down.className = 'fas fa-angle-double-down';
    li.appendChild(down);

    return li;
}

//List單項刪除與移動
function removeItem(evt) {
    if (evt.target.tagName === 'BUTTON') {
        const button = evt.target;
        const li = button.parentNode;
        const ul = li.parentNode;
        if (button.className === 'fas fa-times') {
            ul.removeChild(li);
        } else if (button.className === 'fas fa-angle-double-up') {
            const prevList = li.previousElementSibling;
            if (prevList) {
                ul.insertBefore(li, prevList);
            }
        } else if (button.className === 'fas fa-angle-double-down') {
            const nextList = li.nextElementSibling;
            if (nextList) {
                ul.insertBefore(nextList, li);
            }
        }
    }
}
addList.addEventListener('click', removeItem);