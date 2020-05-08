namespace QuizApi.Models
{
	public class QuestionOption
	{
		public QuestionOption(string text, bool isCorrect)
		{
			Text = text;
			IsCorrect = isCorrect;
		}

		public string Text { get; }
		public bool IsCorrect { get; }
	}
}
