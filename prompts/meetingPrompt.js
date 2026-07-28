// Builds the AI prompt by injecting the transcript into the template
const buildMeetingPrompt = (transcript) => `
You are an expert Meeting Assistant AI.

Analyze the following meeting transcript and extract structured information.

Return ONLY a valid JSON object with NO markdown, NO code blocks, NO extra text.

Required JSON structure:
{
  "summary": "A concise paragraph summarizing the entire meeting",
  "key_points": ["point 1", "point 2", "point 3"],
  "decisions": ["decision 1", "decision 2"],
  "action_items": [
    {
      "task": "task description",
      "owner": "person responsible",
      "deadline": "deadline or 'Not specified'"
    }
  ],
  "risks": ["risk 1", "risk 2"],
  "next_meeting": "Suggestions for the next meeting agenda or date"
}

Rules:
- If a field has no data, use an empty array [] or empty string ""
- For action_items with no owner, use "Unassigned"
- For action_items with no deadline, use "Not specified"
- Return ONLY the JSON, nothing else

Meeting Transcript:
${transcript}
`;

module.exports = { buildMeetingPrompt };
