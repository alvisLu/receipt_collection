import HttpException from './HttpException';

class ReceiptNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Receipt with id ${id} not found`);
  }
}
export default ReceiptNotFoundException;
