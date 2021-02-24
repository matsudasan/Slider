const SliderItems = document.getElementById('slider-items')
const back = document.getElementById('back')
const next = document.getElementById('next')
const buttons = document.getElementById('buttons').children
let SliderWidth = document.querySelector('.slider').clientWidth
let width = SliderItems.clientWidth
const itemNum = SliderItems.children.length
let number = 0
let flag=false

window.onresize=()=>{
    SliderWidth = document.querySelector('.slider').clientWidth
    width = SliderItems.clientWidth
}

const Slider =(command,num) => {
    if (num === 4 && command === "next") {
        const li = document.createElement('li')
        const img = document.createElement('img')
        img.src = SliderItems.children[0].children[0].src
        li.appendChild(img)
        SliderItems.appendChild(li)
        setTimeout(() => Remove('next'), 300)
        SliderItems.style.transition = ".3s";
        SliderItems.style.transform = `translateX(-${num * (width / itemNum)}px)`
    } else if (num === 4 && command === "back") {
        const li = document.createElement('li')
        const img = document.createElement('img')
        img.src = SliderItems.children[itemNum-1].children[0].src
        li.appendChild(img)
        SliderItems.prepend(li)
        SliderItems.style.transition = "none";
        SliderItems.style.transform = `translateX(-${SliderWidth}px)`
        setTimeout(() => {
            SliderItems.style.transition = ".3s";
            SliderItems.style.transform = `translateX(0px)`
        }, 1)
        setTimeout(() => Remove('back'), 300)

    } else {
        SliderItems.style.transition = ".3s";
        SliderItems.style.transform = `translateX(-${num * (width / itemNum)}px)`
        ButtonColor(num)
        flag=false
    }
}

const Remove = (command) => {
    if (command === "next") {
        SliderItems.style.transition = "none";
        SliderItems.style.transform = `translateX(0px)`
        SliderItems.lastElementChild.remove()
        number = 0
        ButtonColor(number)
    } else {
        SliderItems.style.transition = "none";
        SliderItems.style.transform = `translateX(-${3 * (width / itemNum)}px)`
        SliderItems.firstChild.remove()
        number = 3
        ButtonColor(number)
    }
    flag=false
}



const ButtonColor = (num) => {
    if (num === 4) {
        Array.from(buttons).forEach((ele, index) => {
            if (index===0) {
                ele.classList.add('black')
            } else {
                ele.classList.remove('black')
            }
        })
    } else{
        Array.from(buttons).forEach((ele, index) => {
            if (num === index) {
                ele.classList.add('black')
            } else {
                ele.classList.remove('black')
            }
        })
    }
}

const Back=()=>{
    if(flag){
        return
    }
    if (number === 0) {
        number = itemNum
    } else {
        number--
    }
    flag=true
    //setTimeout(() => Slider('back',number), 300)
    Slider('back',number)
}

const Next=()=>{
    if(flag){
        return
    }
    if (number === itemNum) {
        number = 0
    } else {
        number++
    }
    flag=true
    //setTimeout(() => Slider('next',number), 300)
    Slider('next',number)
}

back.addEventListener('click',Back)
next.addEventListener('click',Next)
Array.from(buttons).forEach((ele, index) => {
    ele.addEventListener('click',()=>{
        number=index
        Slider("next",number)
    })
})

setInterval(Next,2000)