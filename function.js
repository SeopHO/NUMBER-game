const numberText = document.getElementById("numberText");
const recordText = document.getElementById("recordText");
const resultText = document.getElementById("resultText");

window.addEventListener("keydown",keydownhandler);
window.addEventListener("keyup",keyuphandler);

const gsystem={
    num:0,
    victCnt:0,
    code_left:"ArrowLeft",  
    code_right:"ArrowRight",
    keyControll:null,
    gstate:null,
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
    gsystem.keyControll = 0;
    gsystem.num = 0;
    gsystem.victCnt=cnt;
    gsystem.gstate='START';

    innerT(numberText,0,1);
    innerT(recordText,cnt,0);
}

function check(code,num)
{
    switch(code)
    {
        case gsystem.code_left:
            if(num>=21)
            {
                //fail
                console.log('실패');
                gsystem.gstate = 'STOP';
            }
            break;
        case gsystem.code_right:
            if(num>=21)
            {
                //victory
                console.log('성공');
                gsystem.victCnt++;
                console.log(gsystem.keyControll);

                init(gsystem.victCnt);
            }
            if(num<21)
            {
                //fail
                console.log('실패');
                    console.log(gsystem.keyControll);
                    init();     
            }
            break;
    }
}

function sum()
{
    gsystem.num += randomhandler();
    return gsystem.num;
}

function randomhandler()
{
    let randValue;
    randValue = Math.floor(Math.random()*8+1);
    return randValue;
}

function keyuphandler(e)
{
    if(e.code === gsystem.code_left || e.code === gsystem.code_right)
    {
        gsystem.keyControll = 0;
        console.log(gsystem.keyControll);
    }
}

function keydownhandler(e)
{
    if(e.code === gsystem.code_right || e.code === gsystem.code_left)
    {
        gsystem.keyControll++;
        if(gsystem.keyControll === 1)
        {
            console.log(gsystem.keyControll);
            innerT(numberText,sum(),1);
            check(e.code,numberText.innerText);
        }

        
    }
}

init();