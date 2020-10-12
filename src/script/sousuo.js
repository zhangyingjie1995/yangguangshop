const search = document.querySelector('.sousuo');
const list = document.querySelector('#list');
const str = document.querySelector('#str')

function taobao(data) {
    // console.log(data.result);
    let arr = data.result;
    let str = '';
    for (let value of arr) {
        str += `
                <li>${value[0]}</li>
            `;
    }
    list.innerHTML = str;
}
search.oninput = function() {


    //随着用户的输入，数据接口发送变化。
    let scriptelement = document.querySelector('#scriptelement');
    //如果存在上面的元素对象，带有此id名的script已经创建了。
    if (scriptelement) { //如果存在script元素，删除
        document.body.removeChild(scriptelement);
    }
    let cS = document.createElement('script');
    cS.src = 'https://suggest.taobao.com/sug?code=utf-8&q=' + this.value + '&_ksTS=1600326651998_256&callback=taobao';
    cS.id = 'scriptelement';
    document.body.appendChild(cS);
};

// search.onblur = function() {
//         str.style.display = 'none'
//     }
//     // search.onfocus = function() {
//     //     str.style.display = 'block'
//     // }
// let _li = document.querySelectorAll('#list li')
// list.onclick = function() {
//     search.value = _li.innerHTML
//     console.log(_li.innerHTML)
// }