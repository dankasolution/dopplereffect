export const toExponentialFormat = (value) => {
    const [coefficient, exponent] = value
        .toExponential()
        .split('e')
        .map(item => Number(item));
    
    return `${Math.round(coefficient)}e^${exponent}`;
}