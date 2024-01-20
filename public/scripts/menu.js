	var MobileMenu = document.getElementById('MobileMenu'); 

    function openMenu(){
	MobileMenu = document.getElementById('MobileMenu')
	MobileMenu.classList.remove('closed-menu');
	}

    function closeMobileMenu(){
	MobileMenu = document.getElementById('MobileMenu')
	MobileMenu.classList.add('closed-menu');
	}

    const CheckIfClickedOutsideMobileMenu = event =>{
        const targetEvent = event.target
        const BurgerIcon = document.getElementById("burger-icon"); 
        MobileMenu = document.getElementById('MobileMenu')
        if(MobileMenu != targetEvent 
            && !BurgerIcon.contains(event.target)
            && !MobileMenu.classList.contains('closed-menu')){
            MobileMenu.classList.add('closed-menu');
        }
	}

    window.addEventListener('click', CheckIfClickedOutsideMobileMenu)