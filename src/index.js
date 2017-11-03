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
import './style.css';

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

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');
    // 因为函数是传递引用，如果这里热替换printMe，其实对于上面的onclick替换是无效的，点击还是触发原来的click.
    // 参考https://doc.webpack-china.org/guides/hot-module-replacement/
    printMe();
  })
}
