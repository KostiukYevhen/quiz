using Microsoft.AspNetCore.Mvc;
using QuizApi.Models;
using System.Collections.Generic;
using QuizApi.Services;

namespace QuizApi.Controllers
{
	[ApiController]
	[Route("[controller]")]
    public class LeaderBoardController : ControllerBase
    {
	    [HttpGet]
	    public IReadOnlyCollection<User> Get()
	    {
			return LeadersMock.Users;
	    }

	    [HttpPost]
	    public string Add(UserData userData)
	    {
		    string id = (LeadersMock.Users.Count + 1).ToString();
		    LeadersMock.Users.Add(new User(id, userData.Name, userData.Score));

			return id;
	    }
    }
}