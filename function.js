const numberText = document.getElementById("numberText");
const recordText = document.getElementById("recordText");

window.addEventListener("keydown",keyhandler);

const Gsystem={
    num:0,
    victCnt:0,
    code_left:"ArrowLeft",
    code_right:"ArrowRight",
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
            if(num>21 || num === 21)
            {
                //fail!
                console.log('실패');
                init();
                
            }
            break;
        
        case Gsystem.code_right:
            if(num>21 || num === 21)
            {
                //victory!
                console.log('성공');
                Gsystem.victCnt++;
                init(Gsystem.victCnt);
            }
            if(num<21)
            {
                console.log('실패');
                init();
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

function keyhandler(e)
{
    if(e.code === Gsystem.code_left)
    {
        innerT(numberText,sum(),1);
        check(e.code,numberText.innerText);
    }

    if(e.code === Gsystem.code_right)
    {
        innerT(numberText,sum(),1);
        check(e.code,numberText.innerText);
    }
}

init();