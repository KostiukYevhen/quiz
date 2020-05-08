using System.Collections.Generic;

namespace QuizApi.Models
{
	public class Question
	{
		public Question(string questionText, IReadOnlyCollection<QuestionOption> options)
		{
			QuestionText = questionText;
			Options = options;
		}

		public string QuestionText { get; }
		public IReadOnlyCollection<QuestionOption> Options { get; }
	}
}
