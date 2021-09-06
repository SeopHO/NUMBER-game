const numberText = document.getElementById("numberText");
const recordText = document.getElementById("recordText");
const resultText = document.getElementById("resultText");
const resultArea = document.querySelector(".result-Area");
window.addEventListener("keydown",keydownhandler);
window.addEventListener("keyup",keyuphandler);

let ranking = new Array();
let temp;

const gsystem={
    randMax:8,
    num:0,
    victCnt:0,
    code_left:"ArrowLeft",  
    code_right:"ArrowRight",
    keyControll:null,
    nextControll:null,
    gstate:null,
    gresult:null,

    number_color:'#DAD0C2',
    contain_color:'#F4DFD0',
    vict_color:'#4FFF63',
    fail_color:'#FF3F3F',
}

function innerT(element,text,code)
{
    if(code)
    {
        element.innerText = `${text}`;
    }
    else
    {
        element.innerText = `${text} winning`;
    }
}

function makelocal()
{
    localStorage.setItem('rank_0',ranking[0]);
    localStorage.setItem('rank_1',ranking[1]);
    localStorage.setItem('rank_2',ranking[2]);
}

function init(cnt=0)
{
    gsystem.keyControll = 0;
    gsystem.num = 0;
    gsystem.victCnt=cnt;
    gsystem.gstate='START';
    gsystem.gresult=null;

    gsystem.nextControll = 0;

    numberText.style.color=gsystem.number_color;

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
                stop();
                gsystem.gresult=0;
                result(gsystem.gresult);
            }
            break;
        case gsystem.code_right:
            if(num>20)
            {
                //victory
                gsystem.gstate = 'STOP';
                if(num == 21)
                {
                    gsystem.victCnt+=2;
                    gsystem.gresult=2;
                }
                else
                {
                    gsystem.victCnt++;
                    gsystem.gresult=1;
                }
                stop();
                result(gsystem.gresult);
            }
            if(num<21)
            {
                //fail
                gsystem.gstate = 'STOP';
                stop();
                gsystem.gresult=0;
                result(gsystem.gresult);
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
    if(gsystem.gstate === 'STOP')
    {
        if(code === 1)
        {
            numberText.style.color=gsystem.vict_color;
    
            resultText.innerText = "VICTORY";
            resultArea.style.backgroundColor=gsystem.vict_color;
        }
        else if(code === 0)
        {
            numberText.style.color=gsystem.fail_color;
    
            resultText.innerText = "FAIL";
            resultArea.style.backgroundColor=gsystem.fail_color;
        }
        else if(code === 2)
        {
            numberText.style.color=gsystem.vict_color;
    
            resultText.innerText = "DOUBLE VICTORY";
            resultArea.style.backgroundColor=gsystem.vict_color;
        }
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
    randValue = Math.floor(Math.random()*gsystem.randMax+1);
    return randValue;
}
function addArray(cnt)
{
    ranking[ranking.length] = cnt;
    if(ranking.length>1)
    {
        for(let i=0;i<ranking.length-1;i++)
        {
            if(ranking[i] === ranking[ranking.length-1])
            {
                ranking.pop();
            }
        }
        sortArray();
    }
}

function compare(value1,value2)
{
    if(value1<value2)
        return -1;
    else if(value1>value2)
        return 1;
    else
        return 0;
}

function sortArray()
{
    ranking.sort(compare);
}
function keyuphandler(e)
{
    if(e.code === gsystem.code_left || e.code === gsystem.code_right)
    {
        gsystem.keyControll = 0;
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
                innerT(numberText,sum(),1);
                check(e.code,numberText.innerText);
            }
        }
    }
    if(gsystem.gstate === 'STOP')
    {
        if(e.code === gsystem.code_right || e.code === gsystem.code_left)
        {
            gsystem.nextControll++;
            if(gsystem.nextControll>1)
            {
                if(gsystem.gresult)
                    init(gsystem.victCnt);
                else
                {
                    addArray(gsystem.victCnt);
                    init();
                }
            }
        }
    }
}
init();