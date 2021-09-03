const numberText = document.getElementById("numberText");
const recordText = document.getElementById("recordText");
const resultText = document.getElementById("resultText");

window.addEventListener("keydown",keyhandler);
window.addEventListener("keyup",keyController);

const Gsystem={
    num:0,
    victCnt:0,
    code_left:"ArrowLeft",
    code_right:"ArrowRight",
    keyControll:false,
    
}

function innerT(element,text,code)
{
    if(code)
    {
        element.innerText = `${text}`;
    }
    else
    {
        element.innerText = `${text} 연승`;
    }

}

function init(cnt=0)
{
    Gsystem.keyControll = false;
    Gsystem.num = 0;
    Gsystem.victCnt=cnt;

    innerT(numberText,0,1);
    innerT(recordText,cnt,0);
}

function check(code,num)
{
    switch(code)
    {
        case Gsystem.code_left:
            if(num>=21)
            {
                //fail!
                console.log('실패');
                if(Gsystem.keyControll === true)
                {
                    init();     
                }
           
            }
            break;
        case Gsystem.code_right:
            if(num>=21)
            {
                //victory!
                console.log('성공');
                Gsystem.victCnt++;
                if(Gsystem.keyControll === true)
                {
                    init(Gsystem.victCnt);
                }
            }
            if(num<21)
            {
                console.log('실패');
                if(Gsystem.keyControll === true)
                {
                    init();     
                }
            }
            break;
    }
}

function sum()
{
    Gsystem.num += randomhandler();
    return Gsystem.num;
}

function randomhandler()
{
    let randValue;
    randValue = Math.floor(Math.random()*10+1);
    return randValue;
}

function keyController(e)
{
    if(e.code === Gsystem.code_left || e.code === Gsystem.code_right)
    {
        Gsystem.keyControll = false;
    }
    
}


function keyhandler(e)
{
    if(e.code === Gsystem.code_left)
    {
        Gsystem.keyControll = true;
        if(Gsystem.keyControll === true)
        {
            innerT(numberText,sum(),1);
            check(e.code,numberText.innerText);
        }
    }

    if(e.code === Gsystem.code_right)
    {
        Gsystem.keyControll = true;
        if(Gsystem.keyControll === true)
        {
            innerT(numberText,sum(),1);
            check(e.code,numberText.innerText);
        }
    }
}

init();