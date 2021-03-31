import HttpException from './HttpException';

class NotUploadReceiptFile extends HttpException {
  constructor() {
    super(404, `Not upload receipt file`);
  }
}
export default NotUploadReceiptFile;
