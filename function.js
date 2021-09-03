window.addEventListener("onload",loadValue);
window.addEventListener("keydown",keyhandler);

const Gsystem={
    num:0,
    victCnt:0,
    code_left:"ArrowLeft",
    code_right:"ArrowRight",
}

function init(cnt)
{
    
}

function check(code,num)
{
    if(code === Gsystem.code_left)
    {
        
    }
    if(code === Gsystem.code_right)
    {

    }
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

function loadValue()
{
    const numberText = document.getElementById("numberText");
    const victCtnText = document.getElementById("recordText");
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
        console.log(randomhandler());
        innerT(numberText,sum(),1);
        console.log(numberText.innerText);
        
    }

    if(e.code === Gsystem.code_right)
    {
        console.log(randomhandler());
        innerT(numberText,sum(),1);
    }
}