// import _ from 'lodash';
// import './style.css';
// import Icon from './icon.png';

// function component() {
//   var element = document.createElement('div');
//   // lodash 是由当前 script 脚本 import 导入进来的
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   element.classList.add('hello');
//   // 将图像添加到我们现有的 div。
//   var myIcon = new Image();
//   myIcon.src = Icon;
//   element.appendChild(myIcon);
//   return element;
// }

import _ from 'lodash';
import printMe from './print.js';
function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element.appendChild(btn);
  return element;
}

document.body.appendChild(component());
