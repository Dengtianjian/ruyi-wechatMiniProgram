export default {
  /**
   *  将 ArrayBuffer 转换为 16 进制字符串
   * @param Buffer ArrayBuffer
   * @returns string 16 进制字符串
   */
  arrayBufferToHEX(Buffer: ArrayBuffer) {
    return Array.prototype.map.call(new Uint8Array(Buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
  },
  /**
   *  将 16 进制字符串转换为普通字符串
   * @param HEX 16 进制字符串
   * @returns string 转换后的普通字符串
   */
  HEXToString(HEX: string) {
    let result: string = '';
    for (let i = 0; i < HEX.length; i += 2) {
      result += String.fromCharCode(parseInt(HEX.substr(i, 2), 16));
    }
    return result;
  },
  /**
   * 将 ArrayBuffer 转换为字符串
   * @param Buffer ArrayBuffer
   * @returns string 转换后的结果
   */
  arrayBufferToString(Buffer: ArrayBuffer) {
    return decodeURIComponent(this.HEXToString(this.arrayBufferToHEX(Buffer)));
  }
}