using Microsoft.AspNetCore.Mvc;
using QuizApi.Models;
using System.Collections.Generic;

namespace QuizApi.Controllers
{
	[ApiController]
	[Route("[controller]")]
    public class LeaderBoardController : ControllerBase
    {
	    private readonly List<User> _users = new List<User>
	    {
		    new User("1", "David", 2),
		    new User("2", "Oleg", 0),
		    new User("3", "Rachel", 1)
	    };

		[HttpGet]
	    public IReadOnlyCollection<User> Get()
	    {
			return _users;
	    }

	    [HttpPost]
	    public string Add(UserData userData)
	    {
		    string id = (_users.Count + 1).ToString();
			_users.Add(new User(id, userData.Name, userData.Score));

			return id;
	    }
    }
}