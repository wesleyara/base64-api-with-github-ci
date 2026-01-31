import { beforeEach, describe, expect, it } from "vitest";

import { Base64Service } from "../services/Base64.service.js";

describe("Base64Service", () => {
  let service: Base64Service;

  beforeEach(() => {
    service = new Base64Service();
  });

  describe("encode", () => {
    it("should encode a simple string to base64", () => {
      const input = "Hello, World!";
      const expected = "SGVsbG8sIFdvcmxkIQ==";

      const result = service.encode(input);

      expect(result).toBe(expected);
    });

    it("should encode an empty string", () => {
      const input = "";
      const expected = "";

      const result = service.encode(input);

      expect(result).toBe(expected);
    });

    it("should encode special characters", () => {
      const input = "!@#$%^&*()_+{}[];':\"<>?,./";
      const result = service.encode(input);

      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });

    it("should encode unicode characters", () => {
      const input = "こんにちは世界";
      const expected = "44GT44KT44Gr44Gh44Gv5LiW55WM";

      const result = service.encode(input);

      expect(result).toBe(expected);
    });

    it("should encode numbers as strings", () => {
      const input = "123456789";
      const expected = "MTIzNDU2Nzg5";

      const result = service.encode(input);

      expect(result).toBe(expected);
    });

    it("should encode multi-line strings", () => {
      const input = "Line 1\nLine 2\nLine 3";
      const result = service.encode(input);

      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("decode", () => {
    it("should decode a base64 string to original text", () => {
      const input = "SGVsbG8sIFdvcmxkIQ==";
      const expected = "Hello, World!";

      const result = service.decode(input);

      expect(result).toBe(expected);
    });

    it("should decode an empty string", () => {
      const input = "";
      const expected = "";

      const result = service.decode(input);

      expect(result).toBe(expected);
    });

    it("should decode special characters", () => {
      const original = "!@#$%^&*()_+{}[];':\"<>?,./";
      const encoded = service.encode(original);

      const result = service.decode(encoded);

      expect(result).toBe(original);
    });

    it("should decode unicode characters", () => {
      const input = "44GT44KT44Gr44Gh44Gv5LiW55WM";
      const expected = "こんにちは世界";

      const result = service.decode(input);

      expect(result).toBe(expected);
    });

    it("should decode numbers", () => {
      const input = "MTIzNDU2Nzg5";
      const expected = "123456789";

      const result = service.decode(input);

      expect(result).toBe(expected);
    });

    it("should handle round-trip encoding and decoding", () => {
      const original = "This is a test message with various characters: 123 !@# éçà";

      const encoded = service.encode(original);
      const decoded = service.decode(encoded);

      expect(decoded).toBe(original);
    });
  });

  describe("integration tests", () => {
    it("should correctly encode and decode the same string multiple times", () => {
      const original = "Test message";

      const encoded1 = service.encode(original);
      const decoded1 = service.decode(encoded1);
      const encoded2 = service.encode(decoded1);
      const decoded2 = service.decode(encoded2);

      expect(decoded1).toBe(original);
      expect(decoded2).toBe(original);
      expect(encoded1).toBe(encoded2);
    });

    it("should handle large strings", () => {
      const original = "a".repeat(10000);

      const encoded = service.encode(original);
      const decoded = service.decode(encoded);

      expect(decoded).toBe(original);
      expect(encoded.length).toBeGreaterThan(0);
    });

    it("should handle emojis", () => {
      const original = "Hello 👋 World 🌍 Testing 🧪";

      const encoded = service.encode(original);
      const decoded = service.decode(encoded);

      expect(decoded).toBe(original);
    });
  });
});
