export interface AudioResponse {
  data: {
    audio: {
      type: 'Buffer';
      data: Buffer;
    };
  };
}
