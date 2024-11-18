import MPStringService from "./MPStringService";

export default {
  parseChunkData(ChunkData: ArrayBuffer) {
    const ChunkString: string = MPStringService.arrayBufferToString(ChunkData);

    const Data: Record<string, string> = {};
    if (ChunkString) {
      ChunkString.split("\n").forEach(item => {
        if (item && item.includes(":")) {
          const Key: string = item.substring(0, item.indexOf(":")).trim();
          const Value: string = item.substring(item.indexOf(":") + 1).trim();

          Data[Key] = Value;
        }
      });
    }

    return Data;
  }
}