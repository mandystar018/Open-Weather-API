export default class Temp {
  constructor(tempK) {
    this.tempK = tempK;
    this.tempF = Math.round((tempK - 273.15)*(9/5)+32);
  }
}