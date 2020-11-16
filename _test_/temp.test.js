import Temp from './../src/js/temp.js';

describe('Temp', () => {
  let temp;
  
  beforeEach(() => {
    temp=new Temp(283.15);
  });

    test('Should create a class with a parameter fro temp in Kelvin', () => {
      expect(temp.tempK).toEqual(283.15);
    });
    test('Should convert temp Kelvin into temp Fahrenheit.', () => {
      expect(temp.tempF).toEqual(51);
    });
});