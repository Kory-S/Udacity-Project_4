document.addEventListener('DOMContentLoaded', function(){


    
    //Pulls all sections and the one sections_ul into a variable
    const allSections = document.querySelectorAll('section');
    const navUL = document.querySelector('#sections_ul');

    function addListItem(section, index){
        //Creates the list item, anchor to be set to list item, and section heading
        const navList = document.createElement('li');
        const anchorList = document.createElement('a');
        const sectionHeading = document.createElement('h2');

        //Sets classes to each element that was created
        
        navList.setAttribute('class', 'nav_link');                              //Sets Nav list item class
        
        sectionHeading.textContent = `Section ${(index + 1)}`;                  //Sets heading text for each section

        //Determines if each section should be odd/even and apply appropriate class
        section.setAttribute('id', `section${index}`);                          //sets appropriate class for odd/even sections
        if (index % 2 === 0){
            section.setAttribute('class', 'section_odd');
        }
        else{
            section.setAttribute('class', 'section_even');
        }
    
        anchorList.setAttribute('href', `#section${index}`);                    //sets anchor class
        anchorList.setAttribute('class', 'anchorForScrolling')
        anchorList.textContent = `Section ${(index + 1)}`;

        //Adds items to the HTML document
        navList.append(anchorList);
        navUL.append(navList);
        section.insertAdjacentElement('afterbegin', sectionHeading);

    }
    //Dynamically adds each section heading and each nav list item
    allSections.forEach(addListItem);

    
    
    //smooth scrolling
    
    const navItemsLinks = document.querySelectorAll('.anchorForScrolling');


    function smoothScrolling(){
            navUL.addEventListener('click', (event) => {
                event.preventDefault();                                         //Prevents default scroll behavior to allow behavior:'smooth' later in function
                const sectionHref = event.target.getAttribute('href');
                const scrollToSection = document.querySelector(sectionHref);    
                scrollToSection.scrollIntoView({
                    behavior: "block-defaul", 
                    behavior: "smooth",
                    block: "end",
                    inline: "nearest"
                });
            })  
    }

    smoothScrolling();



    //Set section active based on scroll event
    const allNavItems = document.querySelectorAll('.nav_link')


    function setActiveView(){
        allSections.forEach((sectionInView, indexSection) => {
            allNavItems.forEach((navInView, indexNav) => {
                if (indexSection === indexNav){
                    const viewableWindow = sectionInView.getBoundingClientRect();
                    const isVisable = 
                        viewableWindow.top >= 0 &&
                        viewableWindow.left >= 0 &&
                        viewableWindow.right <= window.innerWidth &&
                        viewableWindow.bottom <= window.innerHeight;
                    //end of isVisable variable        

                    if (isVisable){
                        sectionInView.classList.add('active_section');
                        navInView.classList.add('active_nav')
                    }
                    else {
                        sectionInView.classList.remove('active_section');
                        navInView.classList.remove('active_nav');
                    }            
        
                    
                }
            })

        });
    }

    window.addEventListener('scroll', setActiveView)

    console.log(window.outerWidth);

});