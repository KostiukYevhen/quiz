using Microsoft.AspNetCore.Mvc;
using QuizApi.Models;
using System.Collections.Generic;

namespace QuizApi.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class QuestionsController : ControllerBase
	{
		[HttpGet]
		public IReadOnlyCollection<Question> Get()
		{
			var questions = new List<Question>
			{
				new Question(
					"Which color is the sky?", new List<QuestionOption>
					{
						new QuestionOption("Red", false),
						new QuestionOption("Green", false),
						new QuestionOption("Blue", true)
					}),
				new Question(
					"How many days in May?", new List<QuestionOption>
					{
						new QuestionOption("28", false),
						new QuestionOption("30", false),
						new QuestionOption("31", true),
						new QuestionOption("32", false)
					}),
				new Question(
					"Which football team is from Madrid?", new List<QuestionOption>
					{
						new QuestionOption("Atletico", true),
						new QuestionOption("Chelsea", false),
						new QuestionOption("Besiktas", false)
					})
			};

			return questions;
		}
	}
}
