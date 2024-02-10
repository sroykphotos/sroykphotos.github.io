function addClickListeners() {

    const category_back_button = document.getElementsByClassName('gallery-back')[0];
    const category_display_container = document.getElementsByClassName('categoryDisplay')[0];
    const category_btns = [...document.getElementsByClassName('category')]
    const category_title = document.getElementsByClassName('category-title')[0];
    const category_unit = document.getElementsByClassName('categoryUnit')[0];
    const category_gallery = document.getElementsByClassName('gallery')[0];

    category_btns.forEach(element => {
        element.addEventListener('click', () => {
            category_display_container.classList.toggle('active');
            category_title.textContent = element.getAttribute('category')
            category_gallery.innerHTML = ''

            var imagesInCategoryArray = []
            category_image_dict.forEach(e => {
                if (e.category.category_name === element.getAttribute('category')) {
                    imagesInCategoryArray = e.images
                }
            });
            console.log(imagesInCategoryArray)

            imagesInCategoryArray.forEach(image => {
                const img_container_div = document.createElement('div')
                img_container_div.classList.add('img-container')

                const dark_background_div = document.createElement('div')
                dark_background_div.classList.add('dark-background')
                img_container_div.appendChild(dark_background_div)

                const imgInContainer = document.createElement('img')
                const path_to_image = "assets/categoryData/";
                imgInContainer.src = path_to_image + image.category + '/' + image.img_name;

                img_container_div.appendChild(imgInContainer)
                img_container_div.addEventListener('click', () => {
                    img_container_div.classList.toggle('active');
                });

                category_gallery.appendChild(img_container_div)
            })

            category_unit.classList.toggle('active');
        });
    })

    category_back_button.addEventListener('click', () => {
        category_display_container.classList.toggle('active');
        category_unit.classList.toggle('active');
    });
}

var category_image_dict = []

async function loadImages() {
    const response = await fetch('assets/db/photos.json')
    const json = await response.json()
    console.log(json.length + ' images found')

    await loadCategories(json)
    addClickListeners()
}

async function loadCategories(images_jsons) {
    const response = await fetch('assets/db/categories.json')
    const json = await response.json()

    console.log(json.length + ' categories found')

    const category_display_container = document.getElementsByClassName('categoryDisplay')[0];

    json.forEach(category => {
        var imagesInCategoryArray = []
        images_jsons.forEach(e => {
            if (e.category === category.category_id) imagesInCategoryArray.push(e)
        });
        console.log(imagesInCategoryArray)

        category_image_dict.push({
            category: category,
            images: imagesInCategoryArray
        });

        var randomImgNo = Math.floor(Math.random() * imagesInCategoryArray.length)
        var imgToSet = imagesInCategoryArray[randomImgNo]
        imagesInCategoryArray.forEach((e) => {
            if (e.category_display) {
                imgToSet = e
            }
        })

        const path_to_image = "assets/categoryData/";

        const categoryDiv = document.createElement('div')
        categoryDiv.classList.add('category')
        const categoryAttr = document.createAttribute('category')
        categoryAttr.value = category.category_name
        categoryDiv.setAttributeNode(categoryAttr)

        const imgInCategoryDiv = document.createElement('img')
        imgInCategoryDiv.src = path_to_image + category.category_id + '/' + imgToSet.img_name;

        const aInCategoryDiv = document.createElement('a')
        aInCategoryDiv.textContent = category.category_name

        categoryDiv.appendChild(imgInCategoryDiv)
        categoryDiv.appendChild(aInCategoryDiv)

        category_display_container.appendChild(categoryDiv)
    })
}

loadImages();