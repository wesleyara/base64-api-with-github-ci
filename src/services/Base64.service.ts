export class Base64Service {
  encode(data: string): string {
    return Buffer.from(data).toString("base64");
  }

  decode(encodedData: string): string {
    return Buffer.from(encodedData, "base64").toString("utf-8");
  }
}
