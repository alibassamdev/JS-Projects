const lettersContainer = document.querySelector('.letters-container')
const loadingContainer = document.querySelector('.starting-container')
const gameContainer = document.querySelector('.container')
const instruction = document.querySelector('.instruction')
const screen_start = document.querySelector('.start-screen')
const instruction_close = document.querySelector('.instruction button')
const play = document.querySelector('.play')
const help = document.querySelector('.help')
const quit = document.querySelector('.quit')

let leftPos = [10,20,30,40,50,60,70,80,90]
let alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let fail_counter = 0;

function createLetters(counter = 0){
    const leftRandom = leftPos[Math.trunc(Math.random()*leftPos.length)]
    const alphabetRandom =  alphabet[Math.trunc(Math.random()*alphabet.length)]
    const spans = document.createElement('span')
    spans.style.left = `${leftRandom}%`
    spans.innerHTML = `${alphabetRandom}`
    lettersContainer.appendChild(spans)

    const interval = setInterval(() => {
        if(fail_counter >= 5) {
            clearInterval(interval)
            spans.remove()
        }
        counter++
        spans.style.bottom = `${counter}px`
        if(counter >=560){
           spans.innerHTML = 'None'
           clearInterval(interval)
           spans.remove()
           fail_counter++;
        }

        if(counter >= 500){
            spans.style.color = 'green'
            spans.style.transform = 'scale(1.2)'
        }
    }, 0);
   
    document.body.addEventListener('keydown', (e) => {
        if(e.key === spans.innerHTML.toLowerCase() && spans.offsetTop <= 45){
            fail_counter--
            spans.remove()
        }
        
        if(e.key === spans.innerHTML.toLowerCase() && spans.offsetTop >= 45){  
            spans.style.color = 'red'
            spans.style.transform = 'scale(1.2)'
            clearInterval(interval)
            setTimeout(()=>spans.remove(),100)
            fail_counter++
        }
    })

    alphabet.splice(alphabet.indexOf(alphabetRandom),1)
    leftPos.splice(leftPos.indexOf(leftRandom),1)
}

function endGame(){
    lettersContainer.innerHTML = ''
    loadingContainer.classList.remove('closed')
    loadingContainer.classList.remove('hidden')
    gameContainer.classList.add('hidden')
    setTimeout(() => startGame(),1000);
}

function startGame(){
    alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    fail_counter = 0;
    lettersContainer.innerHTML = ''
    setTimeout(() =>  loadingContainer.classList.add('closed'),5000)
    setTimeout(() => loadingContainer.classList.add('hidden'),6000)
    setTimeout(()=> {
        gameContainer.classList.remove('hidden')
        startType()
    },7000)
}

function startType(){
    const created_letters = setInterval(() => {
        if(alphabet.length < 1) {
            clearInterval(created_letters)
            gameContainer.classList.add('hidden')
            screen_start.classList.remove('hidden')
            document.querySelector('.notification-win').classList.add('active')
            setTimeout(() => {
                document.querySelector('.notification-win').classList.remove('active')
            },1000)
        }

        if(fail_counter >= 5){
            clearInterval(created_letters)
            gameContainer.classList.add('hidden')
            screen_start.classList.remove('hidden')
            document.querySelector('.notification-lose').classList.add('active')
            setTimeout(() => {
                document.querySelector('.notification-lose').classList.remove('active')
            },1000)
        }
        if(leftPos.length <= 1) leftPos = [10,20,30,40,50,60,70,80,90]

        createLetters()
    }, 1000);
}

quit.addEventListener('click', () => window.close())

help.addEventListener('click', () => {
    instruction.classList.remove('hidden')
    screen_start.classList.add('hidden')
})

instruction_close.addEventListener('click',() => {
    instruction.classList.add('hidden')
    screen_start.classList.remove('hidden')
})

play.addEventListener('click', () => {
    screen_start.classList.add('hidden')
    endGame()
})
