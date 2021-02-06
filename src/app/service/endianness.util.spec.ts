import {swapEndianness} from './endianness.util';


describe('endianness util', () => {

  it('should swap endianness', () => {
    const arrayBuffer1 = new ArrayBuffer(1);
    const u8Array = new Uint8Array(arrayBuffer1);
    const arrayBuffer2 = new ArrayBuffer(2);
    const u16Array = new Uint16Array(arrayBuffer2);
    const arrayBuffer4 = new ArrayBuffer(4);
    const u32Array = new Uint32Array(arrayBuffer4);
    const arrayBuffer8 = new ArrayBuffer(8);
    // tslint:disable-next-line:variable-name
    const u32_2Array = new Uint32Array(arrayBuffer8);

    u8Array[0] = 0xff;
    u16Array[0] = 0x1122;
    u32Array[0] = 0x11223344;
    u32_2Array[0] = 0x11223344;
    u32_2Array[1] = 0x55667788;

    swapEndianness(arrayBuffer1);
    swapEndianness(arrayBuffer2);
    swapEndianness(arrayBuffer4);
    swapEndianness(arrayBuffer8);

    expect(u8Array[0]).toEqual(0xff);
    expect(u16Array[0]).toEqual(0x2211);
    expect(u32Array[0]).toEqual(0x44332211);
    expect(u32_2Array[0]).toEqual(0x88776655);
    expect(u32_2Array[1]).toEqual(0x44332211);
  });




});
