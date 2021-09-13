const numberText = document.getElementById("numberText");
const recordText = document.getElementById("recordText");
const resultText = document.getElementById("resultText");
const resultArea = document.querySelector(".result-Area");

const r1Text = document.getElementById("r1Text");
const r2Text = document.getElementById("r2Text");
const r3Text = document.getElementById("r3Text");

let ranking = new Array();

const RANK_1_LS = 'ranking_1';
const RANK_2_LS = 'ranking_2';
const RANK_3_LS = 'ranking_3';
const RANK_ARR_LS = 'ranking_arr';
const SAVECHECK_LS= 'saveCheck';

window.addEventListener("keydown",keydownhandler);
window.addEventListener("keyup",keyuphandler);

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

function savelocal()
{
    console.log('saving...');
    if(ranking.length>0)
    {
        localStorage.setItem(RANK_ARR_LS,ranking);
        localStorage.setItem(SAVECHECK_LS,1);   
    }
}

function convertArray()
{
    let converted = Array.from(localStorage.getItem(RANK_ARR_LS));
    let modifyconverted = Array.from(converted,e=>e*1);
    for(let i=0;i<modifyconverted.length;i++)
    {
        if(isNaN(modifyconverted[i]))
        {
            modifyconverted.splice(i,1);
        }
    }
    console.log('변환완료 배열',modifyconverted);
    
    return modifyconverted;
}

function innerT(element,text,code)
{
    if(code)
    {
        element.innerText = `${text}`;
    }
    else
    {
        element.innerText = `${text} WINNING`;
    }
}

function init(cnt=0)
{
    gsystem.keyControll = 0;
    gsystem.num = 0;
    gsystem.victCnt=cnt;
    gsystem.gstate='START';
    // gsystem.gresult=null;
    gsystem.nextControll = 0;
    gsystem.gresult = null;
    if(localStorage.getItem(SAVECHECK_LS) == 1)
    {
        ranking = convertArray();
    }

    numberText.style.color=gsystem.number_color;

    resultArea.style.backgroundColor=gsystem.contain_color;
    resultText.innerText = " ";


    drawRanking();
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
function drawRanking()
{    
    innerT(r1Text,ranking[0],1);
    innerT(r2Text,ranking[1],1);
    innerT(r3Text,ranking[2],1);

    if(r1Text.innerText === 'undefined')
    {
        r1Text.innerText = "";
    }
    if(r2Text.innerText === 'undefined')
    {
        r2Text.innerText = "";
    }
    if(r3Text.innerText === 'undefined')
    {
        r3Text.innerText = "";
    }
}
function addArray(cnt)
{
    ranking[ranking.length] = cnt;
    if(ranking[ranking.length-1] == 0)
    {
        ranking.pop();
    }
    if(ranking.length>1)
    {
        for(let i=0;i<ranking.length-1;i++)
        {
            if(ranking[i] == ranking[ranking.length-1])
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
        return 1;
    else if(value1>value2)
        return -1;
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
                    if(gsystem.victCnt!=0)
                    {
                        savelocal();                    
                    }
                    init();
                }
            }
        }
    }
}

init();

