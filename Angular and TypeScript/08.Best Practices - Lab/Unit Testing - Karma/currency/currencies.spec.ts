import { getCurrencies } from './currency';

describe('currency', () => {
    it('should contains USD, EUR, GBP', () => {
        const array= getCurrencies();
        expect(array).toContain('USD');
        expect(array).toContain('EUR');
        expect(array).toContain('GBP');
        expect(array).toEqual(['USD', 'EUR', 'GBP']);
    })

    it('should return Length of Array equal 3', () => {
        const array = getCurrencies();
        const len = array.length;
        expect(len).toBe(3);
    })
})