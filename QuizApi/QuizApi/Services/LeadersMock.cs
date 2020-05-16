using QuizApi.Models;
using System.Collections.Generic;

namespace QuizApi.Services
{
	public static class LeadersMock
	{
		public static readonly List<User> Users = new List<User>
		{
			new User("1", "David", 2),
			new User("2", "Oleg", 0),
			new User("3", "Rachel", 1)
		};
	}
}
