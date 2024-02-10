const btns = [...document.getElementsByClassName('fa-plus')];
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('fa-plus');
        btn.classList.toggle('fa-minus');
    })
});

const mobile_menu_btn = document.getElementsByClassName('mobile-menu-btn')[0];
mobile_menu_btn.addEventListener('click', () => {
    mobile_menu_btn.classList.toggle('active');
});