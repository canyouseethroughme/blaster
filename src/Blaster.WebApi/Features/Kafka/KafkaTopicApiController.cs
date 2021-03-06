﻿using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Blaster.WebApi.Features.Capabilities.Models;
using Blaster.WebApi.Features.Shared;
using Microsoft.AspNetCore.Mvc;

namespace Blaster.WebApi.Features.Capabilities
{
	[Route("api/capabilities")]
	[ForwardHeader]
	[ApiController]
	public class KafkaTopicApiController : ControllerBase
	{
		private readonly IKafkaServiceClient _KafkaServiceClient;

		public KafkaTopicApiController(IKafkaServiceClient kafkaServiceClient)
		{
			_KafkaServiceClient = kafkaServiceClient;
		}

		public void ForwardHeaders()
		{
			ForwardHeader.ForwardMsal(
				request: Request,
				client: _KafkaServiceClient);
		}

		[HttpGet("{id}/topics", Name = "GetByCapabilityId")]
		public async Task<ActionResult<TopicsResponse>> GetByCapabilityId(string id)
		{
			try
			{
				var topicsResponse = await _KafkaServiceClient.GetByCapabilityId(id);

				if (topicsResponse != null)
				{
					return new ActionResult<TopicsResponse>(topicsResponse);
				}

				return new ActionResult<TopicsResponse>(NotFound());
			}
			catch (UnauthorizedException)
			{
				return Unauthorized();
			}
		}
		
		[HttpGet("/api/topics", Name = "GetAll")]
		public async Task<ActionResult<TopicsResponse>> GetAll()
		{
			try
			{
				var topicsResponse = await _KafkaServiceClient.GetAll();

				if (topicsResponse != null)
				{
					return new ActionResult<TopicsResponse>(topicsResponse);
				}

				return new ActionResult<TopicsResponse>(NotFound());
			}
			catch (UnauthorizedException)
			{
				return Unauthorized();
			}
		}
		
		
		[HttpPost("{id}/topics", Name = "AddTopic")]
		public async Task<ActionResult<Topic>> AddTopic([FromRoute] string id, [FromBody] CreateTopicRequest input)
		{
			try
			{
				var configurations = new Dictionary<string, object>();
				if (input.Configurations != null)
				{
					foreach (var (key, value) in input.Configurations)
					{
						var jsonElement = (JsonElement)value;
						configurations[key] = JsonObjectTools.GetValueFromJsonElement(jsonElement);
					}
				}

				input.Configurations = configurations;
				
				var returnTopic = await _KafkaServiceClient.CreateTopic(
					capabilityId: id,
					createTopicRequest: input
				);

				return new ActionResult<Topic>(returnTopic);
			}
			catch (UnauthorizedException)
			{
				return Unauthorized();
			}
			catch (RecoverableUpstreamException ex)
			{
				return StatusCode((int)ex.HttpStatusCode, ex.Message);
			}
		}
	}
}
