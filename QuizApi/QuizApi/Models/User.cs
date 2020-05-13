namespace QuizApi.Models
{
	public class User
	{
		public User(
			string id, 
			string name, 
			int score)
		{
			Id = id;
			Name = name;
			Score = score;
		}

		public string Id { get; }
		public string Name { get; }
		public int Score { get; }
	}
}
