const numberText = document.getElementById("numberText");
const recordText = document.getElementById("recordText");

const resultText = document.getElementById("resultText");
const resultArea = document.querySelector(".result-Area");

window.addEventListener("keydown",keydownhandler);
window.addEventListener("keyup",keyuphandler);

const gsystem={
    num:0,
    victCnt:0,
    code_left:"ArrowLeft",  
    code_right:"ArrowRight",
    keyControll:null,
    gstate:null,

    contain_color:'#F4DFD0',
    vict_color:'#4FFF63',
    fail_color:'#FF3F3F',
}

const color_code_1={
    background:'#E7E0C9',
    
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

    resultArea.style.backgroundColor=gsystem.contain_color;
    resultText.innerText = " ";

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
                gsystem.gstate = 'STOP';
                console.log(gsystem.gstate);
                stop();
                result(0);
            }
            break;
        case gsystem.code_right:
            if(num>=21)
            {
                //victory
                gsystem.victCnt++;
                stop();
                result(1);
            }
            if(num<21)
            {
                //fail
                stop();
                result(0);     
                init();
            }
            break;
    }
}

function stop()
{
    if(gsystem.gstate === 'STOP')
    {
        innerT(numberText,gsystem.num,1);
        innerT(recordText,gsystem.victCnt,0);
    }
}

function result(code)
{ 
    if(code)
    {
        numberText.style.color=gsystem.vict_color;

        resultText.innerText = "승리!";
        resultArea.style.backgroundColor=gsystem.vict_color;
    }
    else
    {
        numberText.style.color=gsystem.fail_color;

        resultText.innerText = "패배";
        resultArea.style.backgroundColor=gsystem.fail_color;
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
    if(gsystem.gstate === 'START')
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
}

init();