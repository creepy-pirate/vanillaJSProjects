
let clic= false;

document.getElementById("myBtn").addEventListener("click", () => {


 



 
if((document.getElementById('myBtn').innerHTML == 'Start'))
{
  document.getElementById('myBtn').innerHTML = 'Reload to Restart'
  document.getElementById('myBtn').classList.add('disabled')
  

}



const grid = document.querySelector('.grid')
    let width = 10
    let squares = []
    let bombAmount = 20
    let isGameOver = false
    let flags =0


    //Creation of Board

    function createBoard(){

        //Shuffling the array with random bombs - Doing this by concatinating two string thenn using the random function + giving a parameter

        const bombsArray = Array(bombAmount).fill('bomb')
        const emptyArray = Array(width*width - bombAmount).fill('valid')
        const gameArray = emptyArray.concat(bombsArray)
        const shuffledArray = gameArray.sort(() => Math.random() -0.5)


        for(let i = 0; i < width*width; i++){

            const square = document.createElement('div')
            square.setAttribute('id',i)
            square.classList.add(shuffledArray[i])
            grid.appendChild(square)
            squares.push(square)
           

            //Normal Click on the Square boxes
            square.addEventListener('click',function(e){
                click(square)
            })



             //Control and left click


             square.oncontextmenu = function(e) {
                e.preventDefault()
                addFlag(square)
              }

        }



       

    



        //Adding Numbers

        for(let i=0; i< squares.length; i++){


            let total =0
            const isLeftEdge = (i % width ==0)
            const isRightEdge = (i %width == width -1) 

            if(squares[i].classList.contains('valid')){
                if(i>0 && !isLeftEdge && squares[i -1].classList.contains('bomb')) total ++
                if(i>9 && !isRightEdge && squares[i +1 -width].classList.contains('bomb')) total ++
                if(i >10 && squares[i -width].classList.contains('bomb')) total ++
                if(i>11 && !isLeftEdge && squares[i-1 - width].classList.contains('bomb')) total ++
                if (i < 98 && !isRightEdge && squares[i +1].classList.contains('bomb')) total ++
                if (i < 90 && !isLeftEdge && squares[i -1 +width].classList.contains('bomb')) total ++
                if (i < 88 && !isRightEdge && squares[i +1 +width].classList.contains('bomb')) total ++
                if (i < 89 && squares[i +width].classList.contains('bomb')) total ++
                squares[i].setAttribute('data', total)
                
               
            }





        }
    }

    createBoard()




    //Add a flag with right click


    function addFlag(square) {
        if (isGameOver) return
        if (!square.classList.contains('checked') && (flags < bombAmount)) {
          if (!square.classList.contains('flag')) {
            square.classList.add('flag')
            square.innerHTML = '🚩'
            flags ++
            checkForWin()
          } else {
            square.classList.remove('flag')
            square.innerHTML = ''
            flags --
          }
        }
      }
    



    //What happens when clicked function 'Click'


    function click(square){

        let currentId = square.id

        if(isGameOver) return
        if(square.classList.contains('checked') || square.classList.contains('flag')) return


        if(square.classList.contains('bomb')){

         gameOver(square)
    }


    else{
        let total = square.getAttribute('data')
        if(total !=0){
            square.classList.add('checked')
            square.innerHTML = total
            return
        }

        checkSquare(square,currentId)
    }

   

    square.classList.add('checked')
}

//Checking the Neighbouring squares

function checkSquare(square,currentId){


    const isLeftEdge = (currentId % width ==0 )
    const isRightEdge = (currentId % width == width - 1)



    setTimeout(() => {
        if(currentId >0 && !isLeftEdge){
            const newId = squares[parseInt(currentId) - 1].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }


        if(currentId >9 && !isRightEdge){
            const newId = squares[parseInt(currentId) + 1].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        } 

        if(currentId >10 ){
            const newId = squares[parseInt(currentId) - width].id 
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }


        if(currentId > 11 && !isLeftEdge){

            const newId = squares[parseInt(currentId) - 1 - width ].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }

        if (currentId < 98 && !isRightEdge) {
            const newId = squares[parseInt(currentId) +1].id
           
            const newSquare = document.getElementById(newId)
            click(newSquare)
          }
          if (currentId < 90 && !isLeftEdge) {
            const newId = squares[parseInt(currentId) -1 +width].id
           
            const newSquare = document.getElementById(newId)
            click(newSquare)
          }
          if (currentId < 88 && !isRightEdge) {
            const newId = squares[parseInt(currentId) +1 +width].id

            const newSquare = document.getElementById(newId)
            click(newSquare)
          }
          if (currentId < 89) {
            const newId = squares[parseInt(currentId) +width].id
            
            const newSquare = document.getElementById(newId)
            click(newSquare)
          }
        
        
                
    },10)
}


//Game over

function gameOver(square){


    console.log('Boom!Gameover')
    document.getElementById('state').innerHTML = 'Sorry You LOST'
    document.getElementById('state').classList.add('won')

    isGameOver =true


    //Shows all the bombs when the game is over

    squares.forEach(square => {
        if(square.classList.contains('bomb')) {
            square.innerHTML = '💣'
        }


    })
}


//Checks for win
function checkForWin() {
    ///simplified win argument
  let matches = 0

    for (let i = 0; i < squares.length; i++) {
      if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
        matches ++
      }
      if (matches === bombAmount) {
        console.log('You win')
        document.getElementById('state').innerHTML = 'Congratulations You WON'
        document.getElementById('state').classList.add('won')

        isGameOver = true
      }
    }
  }
},{once:true})









