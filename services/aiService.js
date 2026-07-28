const Groq = require("groq-sdk");
const { buildMeetingPrompt } = require("../prompts/meetingPrompt");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const analyzeMeetingWithAI = async (transcript) => {
  const prompt = buildMeetingPrompt(transcript);

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
    max_tokens: 2048,
  });

  const rawText = response.choices?.[0]?.message?.content;
  if (!rawText) throw new Error("Empty response from AI");

  const cleaned = rawText.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error("AI returned invalid JSON. Please try again.");
  }
};

module.exports = { analyzeMeetingWithAI };
