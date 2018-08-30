import { compute } from './compute';

describe('compute', () => {
    it('should return zero if number is negative', () => {
        const result = compute(-5);
        expect(result).toBe(0);
    })

    it('should return increment with one if is positive number', () => {
        const result = compute(5);
        expect(result).toBe(6);
    })
})