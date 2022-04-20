export const on = (element, event, handler) => {
    if (element.addEventListener) {
        element.addEventListener(event, handler, false);
    } else {
        element.attachEvent('on' + event, handler);
    }
};

export const off = (element, event, handler) => {
    if (element.removeEventListener) {
        element.removeEventListener(event, handler, false);
    } else {
        element.detachEvent('on' + event, handler);
    }
};

export const once = (element, event, handler) => {
    const fn = () => {
        handler();
        off(element, event, fn);
    };
    on(element, event, fn);
}

export const getStyle = (element, attr) => {
    let value = null;
    if (element.currentStyle) {
        value = element.currentStyle[attr];
    } else {
        value = getComputedStyle(element, false)[attr];
    }
    return value;
}

export const getByClass = (className, parent) => {
    let parentNode = parent || document;
    let result = [];
    let all = parentNode.getElementsByTagName('*');
    for (let i = 0; i < all.length; i++) {
        if (all[i].className === className) {
            result.push(all[i]);
        }
    }
    return result;
}

export const getByTag = (tagName, parent) => {
    let parentNode = parent || document;
    let result = [];
    let all = parentNode.getElementsByTagName(tagName);
    for (let i = 0; i < all.length; i++) {
        result.push(all[i]);
    }
    return result;
}

export const getByQuery = (query, parent) => {
    let parentNode = parent || document;
    return parentNode.querySelectorAll(query);
}

export const getByID = (id) => {
    return document.getElementById(id);
}

export const getByClassName = (className) => {
    return document.getElementsByClassName(className);
}

export const getByTagName = (tagName) => {
    return document.getElementsByTagName(tagName);
}

export const getByName = (name) => {
    return document.getElementsByName(name);
}

export function hasClass(element, className) {
    let classNames = element.className.split(' ');
    for (let i = 0; i < classNames.length; i++) {
        if (classNames[i] === className) {
            return true;
        }
    }
    return false;
}

export function addClass(element, className) {
    if (!hasClass(element, className)) {
        element.className += ' ' + className;
    }
}

export function removeClass(element, className) {
    let classNames = element.className.split(' ');
    for (let i = 0; i < classNames.length; i++) {
        if (classNames[i] === className) {
            classNames.splice(i, 1);
            break;
        }
    }
    element.className = classNames.join(' ');
}

// 判断节点是否溢出
export const isNodeOverflow = (node) => {
    const {clientWidth = 0, scrollWidth = 0} = node;
    return scrollWidth > clientWidth;
}