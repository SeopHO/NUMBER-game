const numberText = document.getElementById("numberText");
const recordText = document.getElementById("recordText");
const resultText = document.getElementById("resultText");

window.addEventListener("keydown",keydownhandler);
window.addEventListener("onkeyup",keyuphandler);

const Gsystem={
    num:0,
    victCnt:0,
    code_left:"ArrowLeft",
    code_right:"ArrowRight",
    keyControll:null,
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
    Gsystem.keyControll = true;
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
                //fail
                console.log('실패');
                init();     
            }
            break;
        case Gsystem.code_right:
            if(num>=21)
            {
                //victory
                console.log('성공');
                Gsystem.victCnt++;
                console.log(Gsystem.keyControll);

                init(Gsystem.victCnt);
            }
            if(num<21)
            {
                //fail
                console.log('실패');
                    console.log(Gsystem.keyControll);
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

function keyuphandler(e)
{
    if(e.code === Gsystem.code_left || e.code === Gsystem.code_right)
    {
        Gsystem.keyControll = false;
        console.log(Gsystem.keyControll);

    }
}

function keydownhandler(e)
{
    if(e.code === Gsystem.code_right || e.code === Gsystem.code_left)
    {
        Gsystem.keyControll=true;
        if(Gsystem.keyControll === true)
        {
            console.log(Gsystem.keyControll);
            Gsystem.keyControll=false;
            if(Gsystem.keyControll === false)
            {
                innerT(numberText,sum(),1);
                check(e.code,numberText.innerText);
            }
        }
    }
}

init();