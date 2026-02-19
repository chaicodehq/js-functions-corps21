export function checkNumbers(...nums) {
    return nums.some(num => typeof num !== "number" || Number.isNaN(num) || !Number.isInteger(num) || num < 0)
}

export function checkObjects(...objs) {
    return objs.some(obj => typeof obj !== "object" || Array.isArray(obj) || obj === null)
}

export function wrapFloat(num) {
    return parseFloat(num.toFixed(2))
}