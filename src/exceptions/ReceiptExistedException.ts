import HttpException from './HttpException';

class ReceiptExistedException extends HttpException {
  constructor(serialNo: string) {
    super(409, `Receipt ${serialNo} existed`);
  }
}
export default ReceiptExistedException;
