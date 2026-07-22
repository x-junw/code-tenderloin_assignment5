const ingredients = {
    oil: 'https://criscocanada.com/wp-content/uploads/Crisco-CA-Veg-Oil.png',
    lard: 'https://fondregenerative.com/cdn/shop/files/PDP-Image-Tallow-Lard.png?crop=center&height=1296&v=1764768303&width=1440',
    garlic: 'https://cdn-akamai.lkk.com/-/media/sg-site---homecook/minced-garlic-213g-sg.png?h=1000&w=777&hash=86958EFC810CD43957C9CA411E52F2A4',
    egg: 'https://www.pacefarm.com/wp-content/uploads/2025/04/egg-whole.png',
    rice: 'https://carbsandcals.com/wp-content/uploads/2025/07/White-Basmati-Rice-163g.webp',
    charsiu: 'https://static.vecteezy.com/system/resources/previews/054/721/956/non_2x/traditional-char-siu-pork-with-sweet-marinade-free-png.png',
    salt: 'https://digital.loblaws.ca/PCX/20126203_EA/en/1/20126203_en_front_400.png',
    soysauce: 'https://digital.loblaws.ca/PCX/20703399_EA/en/1/7889512878_enfr_front_centre_marketing_A_1_GS1_Ecommerce_v1_800.png',
    sesameoil: 'https://digital.loblaws.ca/PCX/20990809_EA/en/1/20990809_en_front_250.png',
    fishsauce: 'https://konradsfoodservices.com/cdn/shop/products/fish-sauce_1024x1024.png?v=1571724636',
    scallion: 'https://www.gronsaksmastarna.se/media/1674/sallatslok-web.png?anchor=center&mode=crop&width=500&rnd=131352717700000000'
}

let mousePosX;
let mousePosY;

window.onload = async () => {
    document.body.style.display = 'block';
    await addAllPreviews();
    loadList('ingredients');
    loadList('instructions');
}

document.addEventListener('mousemove', (event) => {
    mousePosX = event.clientX;
    mousePosY = event.clientY;
});

async function loadList(x) {
    await new Promise(resolve => setTimeout(resolve, 100));
    document.querySelector(`#${x} > h1`).style.display = 'revert';
    await new Promise(resolve => setTimeout(resolve, 100));
    document.querySelectorAll(`#${x}-list > li`).forEach(async (element, index) => {
        await new Promise(resolve => setTimeout(resolve, index * 50));
        element.style.display = 'revert';
    });
}

function addAllPreviews() {
    document.querySelectorAll('#ingredients-list > li > span').forEach((element) => {
        addPreview(element.id);
    });
}

class previewElement {
    constructor(ingredient) {
        this.element = document.createElement('img');
        this.element.style.display = 'none';
        this.element.className = 'preview';
        this.element.src = ingredient;
    }

    position(x, y) {
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }

    display(value) {
        if (value == null) {
            return this.element.style.display;
        } else {
            this.element.style.display = value;
        }
    }
    
    render(parentElement) {
        parentElement.appendChild(this.element);
    }

    remove() {
        this.element.remove();
    }
}

function addPreview(elementID) {
    let preview;
    let isHovering = false;
    let elm = document.getElementById(elementID);
    elm.addEventListener('mouseenter', async () => {
        preview = new previewElement(ingredients[elementID]);
        preview.render(document.body);
        isHovering = true;
        while (isHovering) {
            await new Promise(resolve => setTimeout(resolve, 0.1));
            preview.position(mousePosX, mousePosY);
            if (preview.display() == 'none') {
                preview.display('revert');
            }
        }
    });
    elm.addEventListener('mouseleave', () => {
        preview.display('none');
        isHovering = false;
        preview.remove();
    });
}

