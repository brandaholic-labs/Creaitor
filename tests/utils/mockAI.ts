export const mockAIResponse = {
  text: "This is a mocked AI response for testing purposes.",
  usage: {
    prompt_tokens: 10,
    completion_tokens: 20,
    total_tokens: 30
  }
};

export const MockAIService = {
  generateCopy: jest.fn().mockResolvedValue(mockAIResponse),
  generateImage: jest.fn().mockResolvedValue({ url: "https://example.com/mock-image.png" })
};
