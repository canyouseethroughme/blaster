﻿using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Blaster.WebApi.Features.Namespaces
{
    [Route("api/namespaces")]
    [ApiController]
    public class NamespaceController : ControllerBase
    {
        private readonly INamespaceRepository _namespaceRepository;

        public NamespaceController(INamespaceRepository namespaceRepository)
        {
            _namespaceRepository = namespaceRepository;
        }

        public async Task<ActionResult<Namespace[]>> Get()
        {
            var list = await _namespaceRepository.GetAll();
            return list.ToArray();
        }
    }

    #region old code

    //[Route("api/[controller]")]
    //[ApiController]
    //public class NamespacesController : ControllerBase
    //{
    //    private readonly IKubernetes _client;

    //    public NamespacesController (IKubernetes client) {
    //        _client = client;
    //    }

    //    [HttpGet]
    //    public async Task<IActionResult> Get()
    //    {
    //        var results = new List<string>();

    //        try
    //        {
    //            var namespaceList = await _client.ListNamespaceAsync();

    //            foreach (var item in namespaceList.Items)
    //            {
    //                results.Add(item.Metadata.Name);
    //            }
    //        }
    //        catch (Exception e)
    //        {
    //            Console.WriteLine(e);
    //            return StatusCode(500);
    //        }


    //        return Ok(results);
    //    }
    //}    

    #endregion
}