export const clean = (str) => str.split(" ").map(c => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase()).join(" ");

export const doAtOrAfter = (doAt, func) => {
    let now = Date.now();
    if(now >= doAt) {
        func();
    } else {
        // esperamos lo que quede
        setTimeout(() => {
            func();
        }, doAt-now)
    }
};